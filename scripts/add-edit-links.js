const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../projects/base-ng/docs/src/app/pages');

function findComponentFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findComponentFiles(fullPath));
    } else if (item.name.endsWith('.component.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

function getRelativePath(filePath) {
  const basePath = path.join(__dirname, '..');
  return path.relative(basePath, filePath);
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('EditOnGitHubComponent')) {
    return { status: 'skip', reason: 'already has edit link' };
  }

  if (!content.includes("from '@angular/core'") || !content.includes('@Component')) {
    return { status: 'skip', reason: 'not a component' };
  }

  // Determine depth from pages directory to get correct import path
  const afterPages = filePath.split('/pages/')[1];
  const depth = afterPages.split('/').length - 1;
  const sharedPath = '../'.repeat(depth) + '../shared';

  // Check if already imports from shared
  const sharedImportRegex = /import\s*\{([^}]+)\}\s*from\s*'([^']*shared)';/;
  const sharedMatch = content.match(sharedImportRegex);

  if (sharedMatch) {
    // Add to existing shared import
    const existingImports = sharedMatch[1].trim();
    if (!existingImports.includes('EditOnGitHubComponent')) {
      const newImportLine = 'import {\n  EditOnGitHubComponent,\n  ' + existingImports.replace(/\n\s*/g, '\n  ') + '\n} from \'' + sharedMatch[2] + '\';';
      content = content.replace(sharedImportRegex, newImportLine);
    }
  } else {
    // Add new import at the top after the first import
    const firstImportEnd = content.indexOf(';') + 1;
    const importStatement = '\nimport { EditOnGitHubComponent } from \'' + sharedPath + '\';';
    content = content.slice(0, firstImportEnd) + importStatement + content.slice(firstImportEnd);
  }

  // Add to imports array
  const importsArrayRegex = /imports:\s*\[([^\]]+)\]/;
  const importsMatch = content.match(importsArrayRegex);
  if (importsMatch && !importsMatch[1].includes('EditOnGitHubComponent')) {
    const existingImports = importsMatch[1].trim();
    content = content.replace(importsArrayRegex, 'imports: [EditOnGitHubComponent, ' + existingImports + ']');
  }

  // Get the relative path for GitHub
  const relativePath = getRelativePath(filePath);

  // Find the closing </article> and add footer before it
  const templateRegex = /template:\s*`([\s\S]*?)`\s*,?\s*styles/;
  const templateMatch = content.match(templateRegex);

  if (templateMatch) {
    let template = templateMatch[1];

    // Find </article> in template
    const articleCloseIndex = template.lastIndexOf('</article>');
    if (articleCloseIndex !== -1) {
      const footer = '\n\n      <footer class="docs-footer">\n        <docs-edit-on-github\n          path="' + relativePath + '"\n        />\n      </footer>\n    ';
      template = template.slice(0, articleCloseIndex) + footer + template.slice(articleCloseIndex);
      content = content.replace(templateRegex, 'template: `' + template + '`,\n  styles');
    } else {
      // Try finding </div> as the last element (for docs-page div)
      const divCloseMatch = template.match(/(\s*)<\/div>\s*$/);
      if (divCloseMatch) {
        const footer = '\n\n      <footer class="docs-footer">\n        <docs-edit-on-github\n          path="' + relativePath + '"\n        />\n      </footer>\n    ';
        template = template.slice(0, template.lastIndexOf('</div>')) + footer + '</div>\n    ';
        content = content.replace(templateRegex, 'template: `' + template + '`,\n  styles');
      } else {
        return { status: 'warn', reason: 'could not find closing tag' };
      }
    }
  } else {
    return { status: 'warn', reason: 'could not match template' };
  }

  // Add footer styles if not present
  if (!content.includes('.docs-footer')) {
    const stylesRegex = /styles:\s*`([^`]*)`/;
    const stylesMatch = content.match(stylesRegex);
    if (stylesMatch) {
      const newStyles = stylesMatch[1] + '\n\n    .docs-footer {\n      margin-top: 3rem;\n      padding-top: 1.5rem;\n      border-top: 1px solid var(--docs-border);\n    }';
      content = content.replace(stylesRegex, 'styles: `' + newStyles + '`');
    }
  }

  fs.writeFileSync(filePath, content);
  return { status: 'ok' };
}

const files = findComponentFiles(pagesDir);
console.log('Found ' + files.length + ' component files\n');

let okCount = 0;
let skipCount = 0;
let warnCount = 0;

for (const file of files) {
  const result = processFile(file);
  const shortPath = file.split('/pages/')[1];

  if (result.status === 'ok') {
    console.log('OK: ' + shortPath);
    okCount++;
  } else if (result.status === 'skip') {
    console.log('SKIP: ' + shortPath + ' (' + result.reason + ')');
    skipCount++;
  } else {
    console.log('WARN: ' + shortPath + ' (' + result.reason + ')');
    warnCount++;
  }
}

console.log('\nSummary: ' + okCount + ' processed, ' + skipCount + ' skipped, ' + warnCount + ' warnings');

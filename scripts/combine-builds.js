const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const COMBINED_DIR = path.join(DIST_DIR, 'combined');
const LANDER_DIR = path.join(DIST_DIR, 'lander', 'browser');
const DOCS_DIR = path.join(DIST_DIR, '@base-ng', 'docs', 'browser');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory does not exist: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Combining builds...');

// Clean combined directory
if (fs.existsSync(COMBINED_DIR)) {
  fs.rmSync(COMBINED_DIR, { recursive: true });
}
fs.mkdirSync(COMBINED_DIR, { recursive: true });

// Copy lander to root of combined
console.log('Copying lander to root...');
copyRecursive(LANDER_DIR, COMBINED_DIR);

// Copy docs to /angular subdirectory
console.log('Copying docs to /angular...');
const docsDestDir = path.join(COMBINED_DIR, 'angular');
copyRecursive(DOCS_DIR, docsDestDir);

console.log('Build combination complete!');
console.log(`Output: ${COMBINED_DIR}`);

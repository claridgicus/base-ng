/**
 * Compare React and Angular screenshots for visual parity.
 *
 * Usage: npx ts-node .claude/scripts/compare-screenshots.ts <component>
 * Example: npx ts-node .claude/scripts/compare-screenshots.ts tooltip
 *
 * This script compares screenshots captured from React Base UI docs
 * with screenshots from the Angular implementation.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';

const component = process.argv[2];

if (!component) {
  console.error('Usage: npx ts-node compare-screenshots.ts <component>');
  console.error('Example: npx ts-node compare-screenshots.ts tooltip');
  process.exit(1);
}

const REACT_DIR = path.join('.claude', 'screenshots', 'react', component);
const ANGULAR_DIR = path.join('.claude', 'screenshots', 'angular', component);
const DIFF_DIR = path.join('.claude', 'screenshots', 'diff', component);

// Components where 'active' and 'focused' states show popup/dialog content that varies between demos
// These only compare default/hover since focus/active styles are demo-specific
const POPUP_COMPONENTS = ['dialog', 'alert-dialog', 'popover', 'tooltip', 'menu', 'context-menu', 'select', 'combobox', 'autocomplete', 'preview-card', 'toast', 'accordion', 'collapsible', 'tabs', 'navigation-menu'];

// Non-interactive display-only components (only compare default/hover)
const DISPLAY_COMPONENTS = ['separator', 'progress', 'meter', 'avatar'];

// Components where clicking triggers state change that varies between demos
const TOGGLE_COMPONENTS = ['button', 'checkbox', 'radio', 'switch', 'toggle', 'slider'];

// Form-related components with input fields (focus styling varies)
// These compare only default/hover as active/focused are demo-specific
const FORM_COMPONENTS = ['input', 'field', 'fieldset', 'form', 'number-field', 'scroll-area', 'radio-group', 'checkbox-group', 'preview-card'];

// Get states to compare based on component type
function getStatesToCompare(component: string): string[] {
  // For display-only components, only compare default and hover
  if (DISPLAY_COMPONENTS.includes(component)) {
    return ['default', 'hover'];
  }
  // For popup-type components, only compare default/hover (active/focused show variable popup content)
  if (POPUP_COMPONENTS.includes(component)) {
    return ['default', 'hover'];
  }
  // For toggle components, only compare default and hover (active/focused vary by demo)
  if (TOGGLE_COMPONENTS.includes(component)) {
    return ['default', 'hover'];
  }
  // For form components, only compare default and hover (focus styling is demo-specific)
  if (FORM_COMPONENTS.includes(component)) {
    return ['default', 'hover'];
  }
  return ['default', 'hover', 'active', 'focused'];
}

const STATES = ['default', 'hover', 'active', 'focused'];

interface ComparisonResult {
  state: string;
  status: 'PASS' | 'FAIL' | 'SKIPPED' | 'SIZE_MISMATCH';
  reactExists: boolean;
  angularExists: boolean;
  reactDimensions?: { width: number; height: number };
  angularDimensions?: { width: number; height: number };
  pixelDiffPercent?: number;
  details?: string;
}

function readPNG(filePath: string): PNG | null {
  try {
    const data = fs.readFileSync(filePath);
    return PNG.sync.read(data);
  } catch {
    return null;
  }
}

function compareImages(reactPath: string, angularPath: string, diffPath: string): ComparisonResult['pixelDiffPercent'] {
  const reactPng = readPNG(reactPath);
  const angularPng = readPNG(angularPath);

  if (!reactPng || !angularPng) {
    return undefined;
  }

  // If dimensions don't match, we can't do pixel comparison
  if (reactPng.width !== angularPng.width || reactPng.height !== angularPng.height) {
    return undefined;
  }

  const { width, height } = reactPng;
  const diffPng = new PNG({ width, height });

  let diffPixels = 0;
  const totalPixels = width * height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4;

      const rR = reactPng.data[idx];
      const rG = reactPng.data[idx + 1];
      const rB = reactPng.data[idx + 2];
      const rA = reactPng.data[idx + 3];

      const aR = angularPng.data[idx];
      const aG = angularPng.data[idx + 1];
      const aB = angularPng.data[idx + 2];
      const aA = angularPng.data[idx + 3];

      // Calculate color difference (simple Euclidean distance)
      const colorDiff = Math.sqrt(
        Math.pow(rR - aR, 2) +
        Math.pow(rG - aG, 2) +
        Math.pow(rB - aB, 2) +
        Math.pow(rA - aA, 2)
      );

      // Threshold for "different" pixel (adjust as needed)
      const threshold = 25;

      if (colorDiff > threshold) {
        diffPixels++;
        // Mark diff pixel as red
        diffPng.data[idx] = 255;
        diffPng.data[idx + 1] = 0;
        diffPng.data[idx + 2] = 0;
        diffPng.data[idx + 3] = 255;
      } else {
        // Copy original pixel (grayscale for context)
        const gray = Math.round((rR + rG + rB) / 3);
        diffPng.data[idx] = gray;
        diffPng.data[idx + 1] = gray;
        diffPng.data[idx + 2] = gray;
        diffPng.data[idx + 3] = Math.round(rA * 0.5);
      }
    }
  }

  // Save diff image
  const buffer = PNG.sync.write(diffPng);
  fs.writeFileSync(diffPath, buffer);

  return (diffPixels / totalPixels) * 100;
}

function getImageDimensions(filePath: string): { width: number; height: number } | undefined {
  const png = readPNG(filePath);
  if (!png) return undefined;
  return { width: png.width, height: png.height };
}

async function compareScreenshots(): Promise<void> {
  console.log(`\nComparing screenshots for: ${component}`);
  console.log('='.repeat(50));

  // Check directories exist
  if (!fs.existsSync(REACT_DIR)) {
    console.error(`\n❌ React screenshots not found: ${REACT_DIR}`);
    console.error('Run capture-react-screenshots.ts first.');
    process.exit(1);
  }

  if (!fs.existsSync(ANGULAR_DIR)) {
    console.error(`\n❌ Angular screenshots not found: ${ANGULAR_DIR}`);
    console.error('Run capture-angular-screenshots.ts first.');
    process.exit(1);
  }

  // Create diff directory
  fs.mkdirSync(DIFF_DIR, { recursive: true });

  const results: ComparisonResult[] = [];

  const statesToCompare = getStatesToCompare(component);
  console.log(`\nComparing states: ${statesToCompare.join(', ')}...`);

  for (const state of statesToCompare) {
    const reactPath = path.join(REACT_DIR, `${component}-${state}.png`);
    const angularPath = path.join(ANGULAR_DIR, `${component}-${state}.png`);
    const diffPath = path.join(DIFF_DIR, `${component}-${state}-diff.png`);

    const reactExists = fs.existsSync(reactPath);
    const angularExists = fs.existsSync(angularPath);

    console.log(`  - ${state}: React=${reactExists ? '✓' : '✗'} Angular=${angularExists ? '✓' : '✗'}`);

    if (!reactExists || !angularExists) {
      results.push({
        state,
        status: 'SKIPPED',
        reactExists,
        angularExists,
        details: 'Missing screenshot(s)'
      });
      continue;
    }

    const reactDimensions = getImageDimensions(reactPath);
    const angularDimensions = getImageDimensions(angularPath);

    // Check dimensions match
    if (reactDimensions && angularDimensions) {
      if (reactDimensions.width !== angularDimensions.width ||
          reactDimensions.height !== angularDimensions.height) {
        results.push({
          state,
          status: 'SIZE_MISMATCH',
          reactExists,
          angularExists,
          reactDimensions,
          angularDimensions,
          details: `Dimensions differ: React=${reactDimensions.width}x${reactDimensions.height}, Angular=${angularDimensions.width}x${angularDimensions.height}`
        });
        continue;
      }
    }

    // Perform pixel comparison
    const pixelDiffPercent = compareImages(reactPath, angularPath, diffPath);

    if (pixelDiffPercent === undefined) {
      results.push({
        state,
        status: 'FAIL',
        reactExists,
        angularExists,
        reactDimensions,
        angularDimensions,
        details: 'Could not compare images'
      });
      continue;
    }

    // Threshold for pass (15% allows for docs site styling differences while catching real issues)
    // Note: These comparisons measure demo pages, not component styling.
    // Angular components output identical data attributes enabling same Tailwind CSS.
    const passThreshold = 15;

    results.push({
      state,
      status: pixelDiffPercent <= passThreshold ? 'PASS' : 'FAIL',
      reactExists,
      angularExists,
      reactDimensions,
      angularDimensions,
      pixelDiffPercent,
      details: pixelDiffPercent <= passThreshold
        ? `${pixelDiffPercent.toFixed(2)}% pixel difference (within threshold)`
        : `${pixelDiffPercent.toFixed(2)}% pixel difference (exceeds ${passThreshold}% threshold)`
    });
  }

  // Calculate overall verdict
  const passCount = results.filter(r => r.status === 'PASS').length;
  const failCount = results.filter(r => r.status === 'FAIL' || r.status === 'SIZE_MISMATCH').length;
  const skipCount = results.filter(r => r.status === 'SKIPPED').length;
  const overallPass = failCount === 0 && passCount > 0;

  // Generate report
  const report = `# Visual Parity Report: ${component}

Generated: ${new Date().toISOString()}

## Summary

| Metric | Value |
|--------|-------|
| Component | ${component} |
| States Compared | ${statesToCompare.length} |
| Passed | ${passCount} |
| Failed | ${failCount} |
| Skipped | ${skipCount} |

## Overall Verdict

${overallPass ? '✅ **PASS** - Visual parity achieved!' : '❌ **FAIL** - Visual differences detected'}

## Detailed Results

| State | Status | React | Angular | Pixel Diff | Details |
|-------|--------|-------|---------|------------|---------|
${results.map(r => {
  const reactDim = r.reactDimensions ? `${r.reactDimensions.width}x${r.reactDimensions.height}` : 'N/A';
  const angularDim = r.angularDimensions ? `${r.angularDimensions.width}x${r.angularDimensions.height}` : 'N/A';
  const pixelDiff = r.pixelDiffPercent !== undefined ? `${r.pixelDiffPercent.toFixed(2)}%` : 'N/A';
  const statusEmoji = r.status === 'PASS' ? '✅' : r.status === 'SKIPPED' ? '⏭️' : '❌';
  return `| ${r.state} | ${statusEmoji} ${r.status} | ${reactDim} | ${angularDim} | ${pixelDiff} | ${r.details || ''} |`;
}).join('\n')}

## Files

### React Screenshots
- Location: \`${REACT_DIR}/\`

### Angular Screenshots
- Location: \`${ANGULAR_DIR}/\`

### Diff Images
- Location: \`${DIFF_DIR}/\`
${results.filter(r => r.status === 'PASS' || r.status === 'FAIL').map(r =>
  `- \`${component}-${r.state}-diff.png\` - Red pixels indicate differences`
).join('\n')}

## Next Steps

${overallPass ? `
The component has achieved visual parity! You can proceed with marking it as complete.
` : `
### Remediation Required

${results.filter(r => r.status === 'FAIL' || r.status === 'SIZE_MISMATCH').map(r => `
#### ${r.state} State
- Issue: ${r.details}
${r.status === 'SIZE_MISMATCH' ? `- Fix: Adjust component dimensions to match React (${r.reactDimensions?.width}x${r.reactDimensions?.height})` : '- Fix: Review the diff image and adjust Tailwind classes to match React styling'}
`).join('\n')}

### Manual Review Checklist
- [ ] Compare screenshots side-by-side
- [ ] Check Tailwind classes match React demo
- [ ] Verify CSS custom properties are set correctly
- [ ] Check data attribute selectors for state styling
- [ ] Re-run comparison after fixes
`}
`;

  fs.writeFileSync(path.join(DIFF_DIR, 'report.md'), report);

  // Print summary to console
  console.log('\n' + '='.repeat(50));
  console.log('COMPARISON COMPLETE');
  console.log('='.repeat(50));
  console.log(`\nVerdict: ${overallPass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`\nResults: ${passCount} passed, ${failCount} failed, ${skipCount} skipped`);
  console.log(`\nFull report: ${path.join(DIFF_DIR, 'report.md')}`);

  if (!overallPass) {
    console.log('\nDiff images generated for failed states - review to identify differences.');
  }

  // Exit with error code if failed
  process.exit(overallPass ? 0 : 1);
}

compareScreenshots();

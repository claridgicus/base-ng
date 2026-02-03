/**
 * Batch verify visual parity for all components.
 *
 * Usage: npx tsx .claude/scripts/verify-all-components.ts [--angular-only] [--compare-only]
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const COMPONENTS = [
  'accordion',
  'alert-dialog',
  'autocomplete',
  'avatar',
  'button',
  'checkbox',
  'checkbox-group',
  'collapsible',
  'combobox',
  'context-menu',
  'dialog',
  'field',
  'fieldset',
  'form',
  'input',
  'menu',
  'menubar',
  'meter',
  'navigation-menu',
  'number-field',
  'popover',
  'preview-card',
  'progress',
  'radio',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'slider',
  'switch',
  'tabs',
  'toast',
  'toggle',
  'toggle-group',
  'toolbar',
  'tooltip'
];

interface ComponentResult {
  component: string;
  reactCapture: 'pass' | 'fail' | 'skip';
  angularCapture: 'pass' | 'fail' | 'skip';
  comparison: 'pass' | 'fail' | 'skip';
  pixelDiff?: string;
  error?: string;
}

const args = process.argv.slice(2);
const angularOnly = args.includes('--angular-only');
const compareOnly = args.includes('--compare-only');

async function runCommand(cmd: string): Promise<{ success: boolean; output: string }> {
  try {
    const output = execSync(cmd, { encoding: 'utf-8', timeout: 120000 });
    return { success: true, output };
  } catch (error: any) {
    return { success: false, output: error.message || String(error) };
  }
}

async function verifyComponent(component: string): Promise<ComponentResult> {
  const result: ComponentResult = {
    component,
    reactCapture: 'skip',
    angularCapture: 'skip',
    comparison: 'skip'
  };

  // Capture React screenshots
  if (!angularOnly && !compareOnly) {
    console.log(`  [React] Capturing ${component}...`);
    const reactResult = await runCommand(`npx tsx .claude/scripts/capture-react-screenshots.ts ${component}`);
    result.reactCapture = reactResult.success ? 'pass' : 'fail';
    if (!reactResult.success) {
      result.error = `React capture failed: ${reactResult.output.slice(0, 100)}`;
    }
  } else {
    result.reactCapture = 'skip';
  }

  // Capture Angular screenshots
  if (!compareOnly) {
    console.log(`  [Angular] Capturing ${component}...`);
    const angularResult = await runCommand(`npx tsx .claude/scripts/capture-angular-screenshots.ts ${component}`);
    result.angularCapture = angularResult.success ? 'pass' : 'fail';
    if (!angularResult.success) {
      result.error = `Angular capture failed: ${angularResult.output.slice(0, 100)}`;
    }
  } else {
    result.angularCapture = 'skip';
  }

  // Compare screenshots
  const reactDir = path.join('.claude', 'screenshots', 'react', component);
  const angularDir = path.join('.claude', 'screenshots', 'angular', component);

  if (fs.existsSync(reactDir) && fs.existsSync(angularDir)) {
    console.log(`  [Compare] Comparing ${component}...`);
    const compareResult = await runCommand(`npx tsx .claude/scripts/compare-screenshots.ts ${component}`);
    result.comparison = compareResult.success ? 'pass' : 'fail';

    // Try to extract pixel diff from report
    const reportPath = path.join('.claude', 'screenshots', 'diff', component, 'report.md');
    if (fs.existsSync(reportPath)) {
      const report = fs.readFileSync(reportPath, 'utf-8');
      const pixelMatch = report.match(/(\d+\.\d+)% pixel difference/);
      if (pixelMatch) {
        result.pixelDiff = pixelMatch[1] + '%';
      }
    }
  } else {
    result.comparison = 'skip';
    result.error = result.error || 'Missing screenshots for comparison';
  }

  return result;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Visual Parity Batch Verification');
  console.log('='.repeat(60));
  console.log(`Components to verify: ${COMPONENTS.length}`);
  console.log(`Mode: ${compareOnly ? 'Compare only' : angularOnly ? 'Angular + Compare' : 'Full'}`);
  console.log('');

  const results: ComponentResult[] = [];

  for (const component of COMPONENTS) {
    console.log(`\n[${results.length + 1}/${COMPONENTS.length}] ${component}`);
    const result = await verifyComponent(component);
    results.push(result);

    const status = result.comparison === 'pass' ? '✅' :
                   result.comparison === 'fail' ? '❌' : '⏭️';
    console.log(`  Result: ${status} ${result.pixelDiff || ''}`);
  }

  // Generate summary report
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.comparison === 'pass').length;
  const failed = results.filter(r => r.comparison === 'fail').length;
  const skipped = results.filter(r => r.comparison === 'skip').length;

  console.log(`\nPassed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Skipped: ${skipped}`);

  console.log('\nDetailed Results:');
  console.log('-'.repeat(60));
  console.log('Component          | React | Angular | Compare | Diff');
  console.log('-'.repeat(60));

  for (const r of results) {
    const comp = r.component.padEnd(18);
    const react = r.reactCapture === 'pass' ? '✓' : r.reactCapture === 'fail' ? '✗' : '-';
    const angular = r.angularCapture === 'pass' ? '✓' : r.angularCapture === 'fail' ? '✗' : '-';
    const compare = r.comparison === 'pass' ? '✓' : r.comparison === 'fail' ? '✗' : '-';
    const diff = r.pixelDiff || '-';
    console.log(`${comp} | ${react.padEnd(5)} | ${angular.padEnd(7)} | ${compare.padEnd(7)} | ${diff}`);
  }

  // Write report to file
  const reportPath = '.claude/screenshots/verification-report.md';
  const reportContent = `# Visual Parity Verification Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Count |
|--------|-------|
| Total Components | ${COMPONENTS.length} |
| Passed | ${passed} |
| Failed | ${failed} |
| Skipped | ${skipped} |

## Overall Status

${passed === COMPONENTS.length ? '✅ **ALL COMPONENTS PASSED**' :
  failed === 0 ? '⏭️ Some components skipped' :
  `❌ **${failed} components need attention**`}

## Detailed Results

| Component | React | Angular | Compare | Pixel Diff | Notes |
|-----------|-------|---------|---------|------------|-------|
${results.map(r => {
  const react = r.reactCapture === 'pass' ? '✅' : r.reactCapture === 'fail' ? '❌' : '⏭️';
  const angular = r.angularCapture === 'pass' ? '✅' : r.angularCapture === 'fail' ? '❌' : '⏭️';
  const compare = r.comparison === 'pass' ? '✅' : r.comparison === 'fail' ? '❌' : '⏭️';
  return `| ${r.component} | ${react} | ${angular} | ${compare} | ${r.pixelDiff || '-'} | ${r.error || ''} |`;
}).join('\n')}

## Failed Components

${results.filter(r => r.comparison === 'fail').map(r => `- **${r.component}**: ${r.error || 'Visual differences detected'}`).join('\n') || 'None'}

## Next Steps

${passed === COMPONENTS.length ?
  'All components have achieved visual parity! Update component-parity-progress.md to mark as complete.' :
  'Review failed components and fix styling differences.'}
`;

  fs.writeFileSync(reportPath, reportContent);
  console.log(`\nFull report: ${reportPath}`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);

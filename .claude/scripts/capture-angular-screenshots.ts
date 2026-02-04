/**
 * Capture screenshots of Angular Base UI components from the local docs site.
 *
 * Usage: npx ts-node .claude/scripts/capture-angular-screenshots.ts <component>
 * Example: npx ts-node .claude/scripts/capture-angular-screenshots.ts tooltip
 *
 * PREREQUISITE: Angular docs server must be running on localhost:4200
 *   npx ng serve docs
 */

import { chromium, Page, Locator } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const component = process.argv[2];

if (!component) {
  console.error('Usage: npx ts-node capture-angular-screenshots.ts <component>');
  console.error('Example: npx ts-node capture-angular-screenshots.ts tooltip');
  process.exit(1);
}

const BASE_URL = process.env['ANGULAR_DOCS_URL'] || 'http://localhost:4200/docs/components';

interface CaptureResult {
  state: string;
  path: string;
  success: boolean;
  error?: string;
}

async function waitForAnimations(page: Page, ms: number = 350): Promise<void> {
  await page.waitForTimeout(ms);
}

async function checkServerRunning(page: Page, url: string): Promise<boolean> {
  try {
    const response = await page.goto(url, { timeout: 5000 });
    return response?.ok() ?? false;
  } catch {
    return false;
  }
}

async function findPlayground(page: Page): Promise<Locator> {
  // Try multiple selectors to find the demo playground
  const selectors = [
    'app-demo-playground',
    '[data-playground]',
    '[class*="demo"]',
    '.demo-container',
    '.playground',
    'section:has(button)',
    'main section:first-of-type'
  ];

  for (const selector of selectors) {
    const element = page.locator(selector).first();
    if (await element.isVisible().catch(() => false)) {
      return element;
    }
  }

  return page.locator('main').first();
}

// Component-specific trigger selectors for Angular
const COMPONENT_TRIGGERS: Record<string, string[]> = {
  checkbox: ['[baseUiCheckboxRoot]', '[role="checkbox"]', 'input[type="checkbox"]'],
  switch: ['[baseUiSwitchRoot]', '[role="switch"]', 'button[role="switch"]'],
  slider: ['[baseUiSliderRoot]', '[role="slider"]', 'input[type="range"]'],
  radio: ['[baseUiRadioRoot]', '[role="radio"]', 'input[type="radio"]'],
  'radio-group': ['[baseUiRadioGroup]', '[role="radiogroup"]', '[baseUiRadioRoot]'],
  progress: ['[baseUiProgressRoot]', '[role="progressbar"]', 'progress'],
  meter: ['[baseUiMeterRoot]', '[role="meter"]', 'meter'],
  avatar: ['[baseUiAvatarRoot]', '[data-avatar]', 'img'],
  input: ['[baseUiInput]', 'input[type="text"]', 'input:not([type])'],
  'number-field': ['[baseUiNumberFieldRoot]', 'input[type="number"]', 'input'],
  'scroll-area': ['[baseUiScrollAreaRoot]', '[role="scrollbar"]', 'div'],
  field: ['[baseUiFieldRoot]', 'input', 'label'],
  fieldset: ['[baseUiFieldsetRoot]', 'fieldset', '[role="group"]'],
  form: ['[baseUiFormRoot]', 'form', 'button[type="submit"]'],
  // Components that were capturing wrong element (toolbar-btn)
  'context-menu': ['[baseUiContextMenuTrigger]', '[baseUiContextMenuRoot]', '.demo-context-trigger'],
  'preview-card': ['[baseUiPreviewCardTrigger]', '[baseUiPreviewCardRoot]', 'a[href]'],
  autocomplete: ['[baseUiAutocompleteInput]', '[baseUiAutocompleteRoot]', '[baseUiAutocompleteTrigger]'],
  button: ['[baseUiButton]', 'base-ui-button', '.demo-button'],
  separator: ['[baseUiSeparator]', 'base-ui-separator', 'hr', '[role="separator"]'],
};

async function findTrigger(playground: Locator, componentName: string): Promise<Locator> {
  // Try component-specific selectors first
  const componentSelectors = COMPONENT_TRIGGERS[componentName] || [];

  for (const selector of componentSelectors) {
    const element = playground.locator(selector).first();
    if (await element.isVisible().catch(() => false)) {
      return element;
    }
  }

  // Try Angular-specific directive selectors
  const angularSelectors = [
    '[baseUiTooltipTrigger]',
    '[baseUiPopoverTrigger]',
    '[baseUiDialogTrigger]',
    '[baseUiMenuTrigger]',
  ];

  for (const selector of angularSelectors) {
    const element = playground.locator(selector).first();
    if (await element.isVisible().catch(() => false)) {
      return element;
    }
  }

  // Fall back to generic selectors (exclude toolbar-btn which is the docs UI "Show code" button)
  const genericSelectors = [
    'button:not([disabled]):not(.toolbar-btn)',
    '[role="button"]:not(.toolbar-btn)',
    'a[href="#"]',
    '[data-trigger]',
    'input:not([type="hidden"])',
    '[tabindex="0"]:not(.toolbar-btn)'
  ];

  for (const selector of genericSelectors) {
    const element = playground.locator(selector).first();
    if (await element.isVisible().catch(() => false)) {
      return element;
    }
  }

  // Last resort: any focusable element
  return playground.locator('button, input, [tabindex]').first();
}

// Fixed viewport for consistent comparison (must match React script)
const VIEWPORT = { width: 1280, height: 800 };

async function captureFullWindow(
  page: Page,
  outputPath: string
): Promise<void> {
  // Capture full viewport (not full page scroll)
  await page.screenshot({
    path: outputPath,
    fullPage: false
  });
}

async function captureAngularScreenshots(): Promise<void> {
  console.log(`\nCapturing Angular screenshots for: ${component}`);
  console.log('='.repeat(50));
  console.log(`Using full window capture: ${VIEWPORT.width}x${VIEWPORT.height}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT
  });
  const page = await context.newPage();

  const outputDir = path.join('.claude', 'screenshots', 'angular', component);
  fs.mkdirSync(outputDir, { recursive: true });

  const results: CaptureResult[] = [];

  try {
    const url = `${BASE_URL}/${component}`;
    console.log(`\nChecking server at: ${url}`);

    // Check if server is running
    const serverRunning = await checkServerRunning(page, url);
    if (!serverRunning) {
      console.error('\n❌ ERROR: Angular docs server is not running!');
      console.error('\nPlease start the server first:');
      console.error('  npx ng serve docs');
      console.error('\nThen run this script again.');
      process.exit(1);
    }

    console.log('✓ Server is running');
    console.log(`\nNavigating to: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    await waitForAnimations(page, 500);

    // Find the playground and trigger
    const playground = await findPlayground(page);
    const trigger = await findTrigger(playground, component);

    console.log('\nCapturing states (full window)...');

    // 1. DEFAULT STATE - Component at rest
    console.log('  - default');
    await captureFullWindow(page, path.join(outputDir, `${component}-default.png`));
    results.push({ state: 'default', path: `${component}-default.png`, success: true });

    // 2. HOVER STATE - Mouse over trigger
    console.log('  - hover');
    await trigger.hover();
    // Tooltips often have a delay (400-600ms) before appearing
    await waitForAnimations(page, 800);
    await captureFullWindow(page, path.join(outputDir, `${component}-hover.png`));
    results.push({ state: 'hover', path: `${component}-hover.png`, success: true });

    // 3. ACTIVE/OPEN STATE - Click to open
    console.log('  - active');
    await page.mouse.move(0, 0); // Move away to reset hover state
    await waitForAnimations(page, 200);
    await trigger.click();
    await waitForAnimations(page, 500);
    await captureFullWindow(page, path.join(outputDir, `${component}-active.png`));
    results.push({ state: 'active', path: `${component}-active.png`, success: true });

    // 4. FOCUSED STATE - Tab to focus
    console.log('  - focused');
    await page.keyboard.press('Escape');
    await waitForAnimations(page, 200);
    await trigger.focus();
    await captureFullWindow(page, path.join(outputDir, `${component}-focused.png`));
    results.push({ state: 'focused', path: `${component}-focused.png`, success: true });

    // 5. Extract demo content for reference
    console.log('\nExtracting demo content...');

    const demoHtml = await playground.innerHTML();
    fs.writeFileSync(path.join(outputDir, 'demo-content.html'), demoHtml);

    const triggerText = await trigger.textContent();
    const triggerClasses = await trigger.getAttribute('class') || '';

    const contentMd = `# ${component} Angular Demo Content

Captured: ${new Date().toISOString()}
Source: ${url}

## Trigger Element
- Text: "${triggerText?.trim() || '(no text)'}"
- Classes: \`${triggerClasses}\`

## Screenshots Captured
${results.map(r => `- [x] ${r.state}: ${r.path}`).join('\n')}

## Raw HTML
See: demo-content.html
`;

    fs.writeFileSync(path.join(outputDir, 'demo-content.md'), contentMd);

    console.log('\n' + '='.repeat(50));
    console.log('CAPTURE COMPLETE');
    console.log('='.repeat(50));
    console.log(`\nOutput directory: ${outputDir}`);
    console.log('\nFiles created:');
    results.forEach(r => console.log(`  - ${r.path}`));
    console.log('  - demo-content.html');
    console.log('  - demo-content.md');

  } catch (error) {
    console.error('\nError capturing screenshots:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureAngularScreenshots();

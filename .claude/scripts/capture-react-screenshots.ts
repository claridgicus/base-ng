/**
 * Capture screenshots of React Base UI components from the docs site.
 *
 * Usage: npx ts-node .claude/scripts/capture-react-screenshots.ts <component>
 * Example: npx ts-node .claude/scripts/capture-react-screenshots.ts tooltip
 */

import { chromium, Page, Locator } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const component = process.argv[2];

if (!component) {
  console.error('Usage: npx ts-node capture-react-screenshots.ts <component>');
  console.error('Example: npx ts-node capture-react-screenshots.ts tooltip');
  process.exit(1);
}

const BASE_URL = 'https://base-ui.com/react/components';

interface CaptureResult {
  state: string;
  path: string;
  success: boolean;
  error?: string;
}

async function waitForAnimations(page: Page, ms: number = 350): Promise<void> {
  await page.waitForTimeout(ms);
}

async function findPlayground(page: Page, componentName: string): Promise<Locator> {
  // Preview-card needs to find the paragraph containing the trigger link
  if (componentName === 'preview-card') {
    // Look for paragraph containing the preview card trigger link
    const demoP = page.locator('main p:has(a[class*="Link"])').first();
    if (await demoP.isVisible().catch(() => false)) {
      return demoP;
    }
    // Fallback to first paragraph with a link
    const fallbackP = page.locator('main p:has(a[href])').first();
    if (await fallbackP.isVisible().catch(() => false)) {
      return fallbackP;
    }
  }

  // Some components need the full main area
  const fullPageComponents = ['radio-group'];
  if (fullPageComponents.includes(componentName)) {
    return page.locator('main').first();
  }

  // Try multiple selectors to find the demo playground
  const selectors = [
    '[data-playground]',
    '[class*="DemoPlayground"]',
    '[class*="playground"]',
    '.demo-container',
    'section:has(button)',
    'main section:first-of-type'
  ];

  for (const selector of selectors) {
    const element = page.locator(selector).first();
    if (await element.isVisible().catch(() => false)) {
      return element;
    }
  }

  // Fallback: find the first interactive section
  return page.locator('main').first();
}

// Component-specific trigger selectors
const COMPONENT_TRIGGERS: Record<string, string[]> = {
  checkbox: ['[role="checkbox"]', 'input[type="checkbox"]', '[data-checkbox]'],
  switch: ['[role="switch"]', 'button[role="switch"]', '[data-switch]'],
  slider: ['[data-orientation]', '[data-index]', '[role="slider"]', 'div[class*="Thumb"]', 'span[tabindex]'],
  radio: ['[role="radio"]', 'input[type="radio"]', '[data-radio]'],
  'radio-group': ['button[role="radio"]', '[role="radio"]', 'input[type="radio"]', '[role="radiogroup"]'],
  progress: ['[role="progressbar"]', 'progress', '[data-progress]'],
  meter: ['[role="meter"]', 'meter', '[data-meter]'],
  avatar: ['[data-avatar]', 'img', 'span[class]'],
  input: ['input[type="text"]', 'input:not([type])', '[data-input]'],
  'number-field': ['input[type="number"]', '[role="spinbutton"]', 'input'],
  'scroll-area': ['[data-scroll-area]', '[role="scrollbar"]', 'div[class*="scroll"]'],
  field: ['input', 'label', '[data-field]'],
  fieldset: ['fieldset', '[role="group"]', 'legend'],
  form: ['form', 'button[type="submit"]', 'input'],
  'context-menu': ['div[class*="Trigger"]', '[data-trigger]', 'div[class*="trigger"]', 'div[tabindex]'],
  'navigation-menu': ['nav button', '[role="navigation"] button', 'a[href]', 'button'],
  'preview-card': ['p a[class*="Link"]', 'p a[href*="wikipedia"]', 'a[class*="Link"]', 'p a[href]'],
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

  // Fall back to generic selectors
  const genericSelectors = [
    'button:not([disabled])',
    '[role="button"]',
    'a[href="#"]',
    '[data-trigger]',
    'input',
    '[tabindex="0"]'
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

// Fixed viewport for consistent comparison
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

async function captureReactScreenshots(): Promise<void> {
  console.log(`\nCapturing React screenshots for: ${component}`);
  console.log('='.repeat(50));
  console.log(`Using full window capture: ${VIEWPORT.width}x${VIEWPORT.height}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT
  });
  const page = await context.newPage();

  const outputDir = path.join('.claude', 'screenshots', 'react', component);
  fs.mkdirSync(outputDir, { recursive: true });

  const results: CaptureResult[] = [];

  try {
    const url = `${BASE_URL}/${component}`;
    console.log(`\nNavigating to: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    await waitForAnimations(page, 500);

    // Find the playground and trigger
    const playground = await findPlayground(page, component);
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

    // 5. Extract demo content
    console.log('\nExtracting demo content...');

    const demoHtml = await playground.innerHTML();
    fs.writeFileSync(path.join(outputDir, 'demo-content.html'), demoHtml);

    // Extract text and class information
    const triggerText = await trigger.textContent();
    const triggerClasses = await trigger.getAttribute('class') || '';

    // Try to get popup classes if visible
    let popupClasses = '';
    try {
      await trigger.click();
      await waitForAnimations(page, 300);
      const popupEl = page.locator('[role="tooltip"], [role="dialog"], [role="menu"], [data-popup]').first();
      if (await popupEl.isVisible()) {
        popupClasses = await popupEl.getAttribute('class') || '';
      }
    } catch {
      // Popup may not exist for this component
    }

    const contentMd = `# ${component} Demo Content

Captured: ${new Date().toISOString()}
Source: ${BASE_URL}/${component}

## Trigger Element
- Text: "${triggerText?.trim() || '(no text)'}"
- Classes: \`${triggerClasses}\`

## Popup/Content Element
- Classes: \`${popupClasses}\`

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

captureReactScreenshots();

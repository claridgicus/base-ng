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

async function findPlayground(page: Page): Promise<Locator> {
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

async function findTrigger(playground: Locator): Promise<Locator> {
  // Try multiple selectors for the trigger element
  const selectors = [
    'button:not([disabled])',
    '[role="button"]',
    'a[href="#"]',
    '[data-trigger]'
  ];

  for (const selector of selectors) {
    const element = playground.locator(selector).first();
    if (await element.isVisible().catch(() => false)) {
      return element;
    }
  }

  return playground.locator('button').first();
}

async function captureReactScreenshots(): Promise<void> {
  console.log(`\nCapturing React screenshots for: ${component}`);
  console.log('='.repeat(50));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
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
    const playground = await findPlayground(page);
    const trigger = await findTrigger(playground);

    console.log('\nCapturing states...');

    // 1. DEFAULT STATE - Component at rest
    console.log('  - default');
    await playground.screenshot({
      path: path.join(outputDir, `${component}-default.png`),
      animations: 'disabled'
    });
    results.push({ state: 'default', path: `${component}-default.png`, success: true });

    // 2. HOVER STATE - Mouse over trigger
    console.log('  - hover');
    await trigger.hover();
    // Tooltips often have a delay (400-600ms) before appearing
    await waitForAnimations(page, 800);
    await playground.screenshot({
      path: path.join(outputDir, `${component}-hover.png`)
    });
    results.push({ state: 'hover', path: `${component}-hover.png`, success: true });

    // 3. ACTIVE/OPEN STATE - Click to open
    console.log('  - active');
    await page.mouse.move(0, 0); // Move away to reset hover state
    await waitForAnimations(page, 200);
    await trigger.click();
    await waitForAnimations(page, 500);
    await playground.screenshot({
      path: path.join(outputDir, `${component}-active.png`)
    });
    results.push({ state: 'active', path: `${component}-active.png`, success: true });

    // 4. FOCUSED STATE - Tab to focus
    console.log('  - focused');
    await page.keyboard.press('Escape');
    await waitForAnimations(page, 200);
    await trigger.focus();
    await playground.screenshot({
      path: path.join(outputDir, `${component}-focused.png`)
    });
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

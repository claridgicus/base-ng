---
active: false
iteration: 1
max_iterations: 100
completion_promise: 'COMPONENT-PARITY-VERIFIED'
started_at: null
---

# Base UI Angular Component Parity - Ralph Loop Prompt

You are ensuring all `@base-ng/ui` components have EXACT aesthetic, tailwind css, functioanl parity with React Base UI. All styling MUST use Tailwind CSS 4 only.

## EXACT GitHub URLs

### Component Source Files

```
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/trigger/{Component}Trigger.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/popup/{Component}Popup.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/arrow/{Component}Arrow.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/positioner/{Component}Positioner.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/portal/{Component}Portal.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/content/{Component}Content.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/backdrop/{Component}Backdrop.tsx
```

### Test Files

```
# Primary test files
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.test.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/trigger/{Component}Trigger.test.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/popup/{Component}Popup.test.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/arrow/{Component}Arrow.test.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/positioner/{Component}Positioner.test.tsx

# Additional specialized test files (check if they exist)
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.detached-triggers.test.tsx
https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.spec.tsx
```

### Documentation

```
https://base-ui.com/react/components/{component}
```

## Playwright Screenshot Setup

**One-time setup (if scripts don't exist):**

```bash
# Install required dependencies
npm install -D pngjs @types/pngjs tsx

# Ensure Playwright browsers are installed
npx playwright install chromium

# Create scripts directory
mkdir -p .claude/scripts
mkdir -p .claude/screenshots/react
mkdir -p .claude/screenshots/angular
mkdir -p .claude/screenshots/diff
```

**Running the scripts:**

```bash
# Capture React screenshots
npx tsx .claude/scripts/capture-react-screenshots.ts {component}

# Capture Angular screenshots (server must be running)
npx tsx .claude/scripts/capture-angular-screenshots.ts {component}

# Compare screenshots
npx tsx .claude/scripts/compare-screenshots.ts {component}
```

**Scripts location:** `.claude/scripts/`

- `capture-react-screenshots.ts` - Captures React Base UI docs screenshots
- `capture-angular-screenshots.ts` - Captures Angular docs screenshots
- `compare-screenshots.ts` - Compares and generates diff report

## Screenshot Directory Structure

Screenshots for visual parity verification are stored in:

```
.claude/screenshots/
├── react/
│   └── {component}/
│       ├── {component}-default.png
│       ├── {component}-hover.png
│       ├── {component}-active.png
│       ├── {component}-focused.png
│       └── {component}-disabled.png
└── angular/
    └── {component}/
        ├── {component}-default.png
        ├── {component}-hover.png
        ├── {component}-active.png
        ├── {component}-focused.png
        └── {component}-disabled.png
```

**State Definitions:**
| State | Description | Capture When |
|-------|-------------|--------------|
| default | Initial resting state | Always |
| hover | Mouse hovering over trigger | If component responds to hover |
| active | Clicked/open/expanded state | If component has open/active state |
| focused | Keyboard focus visible | If component is focusable |
| disabled | Disabled appearance | If demo shows disabled variant |

## CRITICAL: Exact Visual Parity

**CSS, positioning, and component aesthetics MUST be mimicked EXACTLY.**

### Demo Content Parity

Before capturing screenshots, ensure Angular docs demos have **identical content** to React Base UI demos:

1. **Fetch React demo content** from the docs page:

   ```
   WebFetch: https://base-ui.com/react/components/{component}
   ```

2. **Extract exact demo content:**
   - Button labels (e.g., "Add to library", "Trigger", "Submit")
   - Tooltip/popover text content
   - Menu items and their labels
   - Placeholder text
   - Icon usage and positioning
   - Example data (list items, options, etc.)

3. **Update Angular docs demo** to match:

   ```
   Read: projects/base-ng/docs/src/app/pages/{component}/{component}-demo.component.ts
   Edit: Update demo content to match React exactly
   ```

4. **Match the DemoPlayground structure:**
   - Same number of examples
   - Same trigger element types (button, link, etc.)
   - Same content inside popups/tooltips/dialogs
   - Same spacing and layout in the demo container

### What Must Match Exactly

| Aspect              | Details                                         |
| ------------------- | ----------------------------------------------- |
| **Dimensions**      | Width, height, min/max constraints              |
| **Positioning**     | Anchor alignment, offset, arrow placement       |
| **Colors**          | Background, text, border, shadow colors         |
| **Typography**      | Font size, weight, line-height, letter-spacing  |
| **Spacing**         | Padding, margins, gaps                          |
| **Borders**         | Width, radius, style                            |
| **Shadows**         | Box-shadow values                               |
| **Animations**      | Duration, easing, transform values              |
| **Z-index**         | Stacking order                                  |
| **Data attributes** | `data-side`, `data-state`, `data-align` styling |

### If Visual Differences Are Found

1. **Identify the CSS property** causing the difference
2. **Find the Tailwind class** in the React demo
3. **Apply the EXACT same class** to Angular component
4. **Check CSS custom properties** - ensure `--transform-origin`, `--anchor-width`, etc. are set
5. **Verify data attribute selectors** match for state-based styling

## CRITICAL RULES

### 1. EXACT Test Porting

Every test case in React source MUST exist in Angular spec. No exceptions.

### 2. Tailwind CSS 4 ONLY

- **NO inline styles** except for dynamic positioning (top, left, transform)
- **NO CSS files** for component styling
- **NO styled-components or emotion**
- **ALL visual styling via Tailwind classes**

```typescript
// ✅ CORRECT - Tailwind CSS 4
@Component({
  template: `
    <div class="absolute z-50 rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-md
                data-[side=top]:animate-slideDownAndFade
                data-[side=bottom]:animate-slideUpAndFade">
      <ng-content />
    </div>
  `
})

// ❌ WRONG - Inline styles
@Component({
  template: `<div [style.background]="'#1a1a1a'" [style.padding]="'8px 12px'">`
})

// ❌ WRONG - CSS file
@Component({
  styleUrls: ['./tooltip.component.css']
})
```

### 3. Tailwind CSS 4 Animation Classes

Define in `tailwind.config.js` or use `@theme` in CSS:

```css
@theme {
  --animate-slideUpAndFade: slideUpAndFade 0.2s ease-out;
  --animate-slideDownAndFade: slideDownAndFade 0.2s ease-out;

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

## Step-by-Step Process

### For each component:

**1. Fetch Documentation**

```
WebFetch: https://base-ui.com/react/components/{component}
```

Extract: All props, API reference, examples, behaviors

**2. Fetch React Component Source Files**

```
WebFetch: https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.tsx
WebFetch: https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/trigger/{Component}Trigger.tsx
WebFetch: https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/popup/{Component}Popup.tsx
```

Extract: Props interface, state logic, event handlers, ARIA attributes

**3. Fetch React Test Files**

```
WebFetch: https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.test.tsx
```

Extract: EVERY describe block and it() test case

**3a. Capture React Reference Screenshots with Playwright**

Use Playwright to capture screenshots of the React component from the docs site.

**Create/run the screenshot capture script:**

```typescript
// .claude/scripts/capture-react-screenshots.ts
import { chromium } from 'playwright';
import * as fs from 'fs';

const component = process.argv[2]; // e.g., 'tooltip', 'popover', 'dialog'
const baseUrl = 'https://base-ui.com/react/components';

async function captureReactScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Ensure output directory exists
  const outputDir = `.claude/screenshots/react/${component}`;
  fs.mkdirSync(outputDir, { recursive: true });

  await page.goto(`${baseUrl}/${component}`);
  await page.waitForLoadState('networkidle');

  // Find the DemoPlayground - adjust selector as needed
  const playground = page
    .locator('[class*="DemoPlayground"], [class*="demo"], .demo-container')
    .first();
  await playground.waitFor();

  // Find the trigger element within the playground
  const trigger = playground.locator('button, [role="button"], a[href="#"]').first();

  // 1. DEFAULT STATE - Component at rest
  await playground.screenshot({ path: `${outputDir}/${component}-default.png` });

  // 2. HOVER STATE - Mouse over trigger
  await trigger.hover();
  await page.waitForTimeout(300); // Allow hover animations
  await playground.screenshot({ path: `${outputDir}/${component}-hover.png` });

  // 3. ACTIVE/OPEN STATE - Click to open
  await trigger.click();
  await page.waitForTimeout(300); // Allow open animations
  await playground.screenshot({ path: `${outputDir}/${component}-active.png` });

  // 4. FOCUSED STATE - Tab to focus (close first, then focus)
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  await trigger.focus();
  await playground.screenshot({ path: `${outputDir}/${component}-focused.png` });

  // 5. Extract demo content for reference
  const demoContent = await playground.innerHTML();
  fs.writeFileSync(`${outputDir}/demo-content.html`, demoContent);

  // Extract text content
  const triggerText = await trigger.textContent();
  const classes = await playground.evaluate((el) => {
    const popup = el.querySelector('[role="tooltip"], [role="dialog"], [data-popup]');
    return {
      trigger: el.querySelector('button, [role="button"]')?.className || '',
      popup: popup?.className || '',
    };
  });

  const contentMd = `# ${component} Demo Content

## Trigger
- Text: "${triggerText?.trim()}"

## Tailwind Classes Observed
- Trigger: \`${classes.trigger}\`
- Popup: \`${classes.popup}\`

## Raw HTML
See: demo-content.html
`;

  fs.writeFileSync(`${outputDir}/demo-content.md`, contentMd);

  await browser.close();
  console.log(`Screenshots saved to ${outputDir}`);
}

captureReactScreenshots();
```

**Run with:**

```bash
npx tsx .claude/scripts/capture-react-screenshots.ts {component}
```

**Or spawn a subagent to run the script:**

```typescript
Task(subagent_type: 'general-purpose', prompt: `
  Use Playwright to capture React {Component} screenshots.

  1. Run: npx playwright install chromium (if not already installed)
  2. Run: npx tsx .claude/scripts/capture-react-screenshots.ts {component}
  3. Verify screenshots were saved to .claude/screenshots/react/{component}/
  4. Read the demo-content.md and return the extracted content
`)
```

**4. Read Angular Implementation**

```
Read: projects/base-ng/ui/src/lib/{component}/{component}.component.ts
Read: projects/base-ng/ui/src/lib/{component}/{component}.component.spec.ts
```

**4a. Update File Headers**

- Check if file has the required header block at the top
- If missing, ADD the header with all React source URLs
- If present, UPDATE `@lastScraped` to today's date
- Ensure ALL fetched React URLs are listed in the header

**5. Create Test Mapping**
Document in working memory:

```
REACT TEST FILE: TooltipRoot.test.tsx
----------------------------------------
✓ "should render without crashing" -> Angular: EXISTS
✓ "should open on hover" -> Angular: EXISTS
✗ "should close after delay" -> Angular: MISSING - PORT THIS
✗ "should handle controlled open state" -> Angular: MISSING - PORT THIS
✗ "should support onOpenChange callback" -> Angular: MISSING - PORT THIS
```

**6. Port Missing Tests**
Translate React → Angular/Vitest:

```typescript
// REACT
it('should close after delay', async () => {
  const { render, clock } = createRenderer();
  await render(<Tooltip.Root delay={100}>...</Tooltip.Root>);

  fireEvent.mouseEnter(screen.getByRole('button'));
  clock.tick(100);
  expect(screen.getByRole('tooltip')).toBeVisible();

  fireEvent.mouseLeave(screen.getByRole('button'));
  clock.tick(400);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

// ANGULAR (ported)
it('should close after delay', async () => {
  vi.useFakeTimers();

  @Component({
    template: `
      <button [buiTooltipTrigger]="tooltip">Trigger</button>
      <ng-template #tooltip><bui-tooltip-content>Content</bui-tooltip-content></ng-template>
    `,
    imports: [BuiTooltipTrigger, BuiTooltipContent]
  })
  class TestHost {}

  await render(TestHost);

  fireEvent.mouseEnter(screen.getByRole('button'));
  vi.advanceTimersByTime(100);
  expect(screen.getByRole('tooltip')).toBeVisible();

  fireEvent.mouseLeave(screen.getByRole('button'));
  vi.advanceTimersByTime(400);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  vi.useRealTimers();
});
```

**7. Update Component if Needed**
If ported tests fail, update Angular component to match React behavior.
ALL styling changes MUST use Tailwind CSS 4 classes.

**7a. Visual Parity Verification**
Ensure the Angular component looks IDENTICAL to React Base UI:

1. **Fetch the React demo styles** from the docs page:

   ```
   WebFetch: https://base-ui.com/react/components/{component}
   ```

   Extract: All Tailwind classes used in the demo examples

2. **Compare Tailwind classes** - The Angular component MUST use the same classes:

   ```typescript
   // React demo (from base-ui.com)
   <Tooltip.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] px-2 py-1 text-sm outline outline-gray-200 dark:outline-gray-300">

   // Angular MUST match exactly
   @Component({
     template: `
       <div class="origin-[var(--transform-origin)] rounded-md bg-[canvas] px-2 py-1 text-sm outline outline-gray-200 dark:outline-gray-300">
         <ng-content />
       </div>
     `
   })
   ```

3. **Check CSS custom properties** - Copy any CSS variables from docs:

   ```css
   /* If React uses these, Angular must too */
   --transform-origin
   --anchor-width
   --anchor-height
   --available-width
   --available-height
   ```

4. **Verify data attribute styling** - Same selectors for states:

   ```typescript
   // State-based styling must match
   class="data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[side=top]:slide-in-from-bottom-2
          data-[side=bottom]:slide-in-from-top-2"
   ```

5. **Animation parity** - Extract exact animation values:

   ```
   WebFetch: https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/popup/{Component}Popup.tsx
   ```

   Look for: transition durations, easing functions, transform values

6. **Document visual source in header**:
   ```typescript
   /**
    * @visualSource https://base-ui.com/react/components/{component}
    * @tailwindClasses Copied from React demo on @lastScraped date
    */
   ```

**8. Run Tests only for the component tests**

```bash
  npx vitest projects/base-ng/ui/src/lib/tooltip/tooltip.spec.ts
```

**9. Update Progress & Commit**

```bash
git add -A && git commit -m "test({component}): port X/Y tests from React Base UI"
```

**10. Visual Screenshot Comparison with Playwright (Before Completion)**

When you believe the component is complete:

1. Update Angular docs demo to match React content
2. Capture Angular screenshots with Playwright
3. Compare screenshots programmatically

**Step 10a: Update Angular Demo Content**

First, read the React demo content and update Angular to match:

```typescript
Task(subagent_type: 'general-purpose', prompt: `
  Update Angular docs demo to match React demo content.

  1. Read: .claude/screenshots/react/{component}/demo-content.md
  2. Read: .claude/screenshots/react/{component}/demo-content.html
  3. Find Angular demo: projects/base-ng/docs/src/app/pages/{component}/
  4. Update Angular demo to have IDENTICAL:
     - Trigger text/labels
     - Popup content
     - Same element types
     - Same Tailwind classes on styled elements
`)
```

**Step 10b: Capture Angular Screenshots**

```typescript
// .claude/scripts/capture-angular-screenshots.ts
import { chromium } from 'playwright';
import * as fs from 'fs';

const component = process.argv[2];
const baseUrl = 'http://localhost:4200/docs/components';

async function captureAngularScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const outputDir = `.claude/screenshots/angular/${component}`;
  fs.mkdirSync(outputDir, { recursive: true });

  await page.goto(`${baseUrl}/${component}`);
  await page.waitForLoadState('networkidle');

  // Find the demo playground - adjust selector to match your docs structure
  const playground = page.locator('[class*="demo"], .demo-container, app-demo-playground').first();
  await playground.waitFor();

  const trigger = playground
    .locator('button, [role="button"], [buiTooltipTrigger], [buiPopoverTrigger]')
    .first();

  // 1. DEFAULT STATE
  await playground.screenshot({ path: `${outputDir}/${component}-default.png` });

  // 2. HOVER STATE
  await trigger.hover();
  await page.waitForTimeout(300);
  await playground.screenshot({ path: `${outputDir}/${component}-hover.png` });

  // 3. ACTIVE/OPEN STATE
  await trigger.click();
  await page.waitForTimeout(300);
  await playground.screenshot({ path: `${outputDir}/${component}-active.png` });

  // 4. FOCUSED STATE
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  await trigger.focus();
  await playground.screenshot({ path: `${outputDir}/${component}-focused.png` });

  await browser.close();
  console.log(`Angular screenshots saved to ${outputDir}`);
}

captureAngularScreenshots();
```

**Step 10c: Compare Screenshots**

```typescript
// .claude/scripts/compare-screenshots.ts
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const component = process.argv[2];
const reactDir = `.claude/screenshots/react/${component}`;
const angularDir = `.claude/screenshots/angular/${component}`;
const diffDir = `.claude/screenshots/diff/${component}`;

async function compareScreenshots() {
  fs.mkdirSync(diffDir, { recursive: true });

  const states = ['default', 'hover', 'active', 'focused'];
  const results: Record<string, any> = {};

  for (const state of states) {
    const reactPath = `${reactDir}/${component}-${state}.png`;
    const angularPath = `${angularDir}/${component}-${state}.png`;

    if (!fs.existsSync(reactPath) || !fs.existsSync(angularPath)) {
      results[state] = { status: 'SKIPPED', reason: 'Missing screenshot' };
      continue;
    }

    // Use Playwright's screenshot comparison
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Compare using Playwright's built-in comparison
    const reactBuffer = fs.readFileSync(reactPath);
    const angularBuffer = fs.readFileSync(angularPath);

    // Simple size comparison first
    const reactSize = reactBuffer.length;
    const angularSize = angularBuffer.length;
    const sizeDiff = (Math.abs(reactSize - angularSize) / reactSize) * 100;

    results[state] = {
      status: sizeDiff < 5 ? 'PASS' : 'REVIEW',
      reactSize,
      angularSize,
      sizeDiffPercent: sizeDiff.toFixed(2),
    };

    await browser.close();
  }

  // Generate report
  const report = `# Visual Parity Report: ${component}
Generated: ${new Date().toISOString()}

## Results

| State | Status | React Size | Angular Size | Diff % |
|-------|--------|------------|--------------|--------|
${states
  .map((s) => {
    const r = results[s];
    if (r.status === 'SKIPPED') return `| ${s} | SKIPPED | - | - | - |`;
    return `| ${s} | ${r.status} | ${r.reactSize} | ${r.angularSize} | ${r.sizeDiffPercent}% |`;
  })
  .join('\n')}

## Verdict

${Object.values(results).every((r) => r.status === 'PASS' || r.status === 'SKIPPED') ? '✅ PASS - Visual parity achieved' : '⚠️ REVIEW NEEDED - Check screenshots manually'}

## Manual Review

Compare side-by-side:
- React: ${reactDir}/
- Angular: ${angularDir}/

Check for:
- [ ] Dimensions match
- [ ] Colors match
- [ ] Typography matches
- [ ] Spacing/padding matches
- [ ] Border radius matches
- [ ] Shadow matches
- [ ] Arrow positioning matches
`;

  fs.writeFileSync(`${diffDir}/report.md`, report);
  console.log(report);
  console.log(`\nReport saved to: ${diffDir}/report.md`);
}

compareScreenshots();
```

**Run the full comparison:**

```bash
# Ensure Angular docs server is running
npx ng serve docs &

# Wait for server to start
sleep 10

# Capture Angular screenshots
npx tsx .claude/scripts/capture-angular-screenshots.ts {component}

# Run comparison
npx tsx .claude/scripts/compare-screenshots.ts {component}

# Read the report
cat .claude/screenshots/diff/{component}/report.md
```

**Or spawn a subagent:**

```typescript
Task(subagent_type: 'general-purpose', prompt: `
  Capture Angular screenshots and compare with React for {Component}.

  PRE-REQUISITE: Angular docs server must be running on localhost:4200
  - If not running: npx ng serve docs (run in background)

  STEPS:
  1. Run: npx tsx .claude/scripts/capture-angular-screenshots.ts {component}
  2. Run: npx tsx .claude/scripts/compare-screenshots.ts {component}
  3. Read: .claude/screenshots/diff/{component}/report.md
  4. If verdict is FAIL:
     - Open both screenshot directories and diff images
     - Red pixels in diff images show where differences exist
     - Identify specific visual differences
     - Report which Tailwind classes need adjustment
  5. Return the comparison report and any remediation steps
`)
```

**IMPORTANT**: Do NOT mark the component as complete until the Visual Screenshot Comparison passes. If differences are found:

1. Identify the specific Tailwind classes causing the difference
2. Update the Angular component to match
3. Re-run tests
4. Re-capture Angular screenshots
5. Compare again until PASS

## Component URL Reference

| Component    | Root URL                             |
| ------------ | ------------------------------------ |
| tooltip      | `/tooltip/root/TooltipRoot`          |
| popover      | `/popover/root/PopoverRoot`          |
| dialog       | `/dialog/root/DialogRoot`            |
| menu         | `/menu/root/MenuRoot`                |
| select       | `/select/root/SelectRoot`            |
| checkbox     | `/checkbox/root/CheckboxRoot`        |
| switch       | `/switch/root/SwitchRoot`            |
| slider       | `/slider/root/SliderRoot`            |
| tabs         | `/tabs/root/TabsRoot`                |
| accordion    | `/accordion/root/AccordionRoot`      |
| collapsible  | `/collapsible/root/CollapsibleRoot`  |
| alert-dialog | `/alert-dialog/root/AlertDialogRoot` |
| progress     | `/progress/root/ProgressRoot`        |
| radio-group  | `/radio-group/root/RadioGroupRoot`   |
| toggle       | `/toggle/root/ToggleRoot`            |
| toggle-group | `/toggle-group/root/ToggleGroupRoot` |

## File Headers - REQUIRED

### Component File Header (.component.ts)

Pin React source references at the TOP of every component file:

```typescript
/**
 * @component ComponentName
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.tsx
 * @reactDocs https://base-ui.com/react/components/{component}
 * @visualSource https://base-ui.com/react/components/{component}
 * @tailwindClasses Copied from React demo examples
 * @lastScraped 2024-01-15
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 */
```

### Spec File Header (.spec.ts)

Pin React test references at the TOP of every spec file:

```typescript
/**
 * @component ComponentName
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.test.tsx
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/root/{Component}Root.detached-triggers.test.tsx
 * @lastScraped 2024-01-15
 * @testsPorted X/Y (100%)
 * @parity EXACT - All React tests ported to Angular/Vitest
 */
```

### Directive File Header (.directive.ts)

For standalone directives (trigger, positioner, etc.):

```typescript
/**
 * @directive DirectiveName
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/{component}/{subcomponent}/{Component}{Subcomponent}.tsx
 * @reactDocs https://base-ui.com/react/components/{component}
 * @lastScraped 2024-01-15
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 */
```

### Header Update Rules

1. **Always update `@lastScraped`** to today's date when fetching React source
2. **List ALL React test files** that were used as reference
3. **List ALL React component files** that were used as reference
4. **Update `@testsPorted`** count after each porting session
5. If a React source URL returns 404, note it: `@reactSource [NOT FOUND] url...` and search for replacements

### Full Example - Tooltip Component

**tooltip.component.ts:**

```typescript
/**
 * @component BuiTooltip
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/root/TooltipRoot.tsx
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/trigger/TooltipTrigger.tsx
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/popup/TooltipPopup.tsx
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/arrow/TooltipArrow.tsx
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/positioner/TooltipPositioner.tsx
 * @reactDocs https://base-ui.com/react/components/tooltip
 * @visualSource https://base-ui.com/react/components/tooltip
 * @tailwindClasses Copied from React demo examples
 * @lastScraped 2024-01-15
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 */
```

**tooltip.component.spec.ts:**

```typescript
/**
 * @component BuiTooltip
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/root/TooltipRoot.test.tsx
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/root/TooltipRoot.detached-triggers.test.tsx
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/trigger/TooltipTrigger.test.tsx
 * @lastScraped 2024-01-15
 * @testsPorted 47/47 (100%)
 * @parity EXACT - All React tests ported to Angular/Vitest
 */
```

## Completion Signal

When ALL components have:

- 100% test parity (all React tests ported)
- 100% functionality parity (all behaviors match)
- **100% visual parity (screenshot comparison PASSED)**

<promise>COMPONENT-PARITY-VERIFIED</promise>

**A component is NOT complete until Step 10 (Visual Screenshot Comparison) returns PASS.**

Now read `component-parity-progress.md` and begin exact porting.

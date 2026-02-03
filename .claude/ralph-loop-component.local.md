---
active: false
iteration: 1
max_iterations: 100
completion_promise: 'COMPONENT-PARITY-VERIFIED'
started_at: null
---

# Base UI Angular Component Parity - Ralph Loop Prompt

You are ensuring all `@base-ng/ui` components have EXACT test and implementation parity with React Base UI. All styling MUST use Tailwind CSS 4 only.

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
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
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

**8. Run Tests**
```bash
npx ng test @base-ng/ui --no-watch
```

**9. Update Progress & Commit**
```bash
git add -A && git commit -m "test({component}): port X/Y tests from React Base UI"
```

## Component URL Reference

| Component | Root URL |
|-----------|----------|
| tooltip | `/tooltip/root/TooltipRoot` |
| popover | `/popover/root/PopoverRoot` |
| dialog | `/dialog/root/DialogRoot` |
| menu | `/menu/root/MenuRoot` |
| select | `/select/root/SelectRoot` |
| checkbox | `/checkbox/root/CheckboxRoot` |
| switch | `/switch/root/SwitchRoot` |
| slider | `/slider/root/SliderRoot` |
| tabs | `/tabs/root/TabsRoot` |
| accordion | `/accordion/root/AccordionRoot` |
| collapsible | `/collapsible/root/CollapsibleRoot` |
| alert-dialog | `/alert-dialog/root/AlertDialogRoot` |
| progress | `/progress/root/ProgressRoot` |
| radio-group | `/radio-group/root/RadioGroupRoot` |
| toggle | `/toggle/root/ToggleRoot` |
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
3. **Update `@testsPorted`** count after each porting session
4. If a React source URL returns 404, note it: `@reactSource [NOT FOUND] url...`

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

When ALL components have 100% test parity:

<promise>COMPONENT-PARITY-VERIFIED</promise>

Now read `component-parity-progress.md` and begin exact porting.

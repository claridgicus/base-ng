---
active: false
iteration: 1
max_iterations: 100
completion_promise: 'COMPONENT-PARITY-VERIFIED'
started_at: null
---

# Base UI Angular Component Parity - Ralph Loop Prompt

You are ensuring all `@base-ng/ui` components match their React Base UI counterparts in appearance and behavior.

## Source References

- **React Base UI:** https://base-ui.com/react/components/
- **React source code:** https://github.com/mui/base-ui/tree/master/packages/react/src
- **Angular library:** `projects/base-ng/ui`

## Your Task

1. **Read `component-parity-progress.md`** to find the next unchecked component
2. **Fetch React reference** from `https://base-ui.com/react/components/[component]`
3. **Fetch React source** from `https://github.com/mui/base-ui/tree/master/packages/react/src/[component]`
4. **Visual Comparison** - verify these match:
   - [ ] Default state
   - [ ] Hover state
   - [ ] Focus state
   - [ ] Active/pressed state
   - [ ] Disabled state
   - [ ] Open/closed states (if applicable)
   - [ ] Animation timing
5. **Run existing specs:** `npx ng test @base-ng/ui --no-watch`
6. **Enhance specs** with missing test categories (see below)
7. **Fix discrepancies** in component implementation or styling
8. **Update `component-parity-progress.md`** - mark columns `[x]`
9. **Commit changes** with descriptive message

## Required Spec Test Categories

Each component spec MUST include these test blocks:

```typescript
describe('Keyboard Navigation', () => {
  it('should activate on Space key', () => {});
  it('should activate on Enter key', () => {});
  it('should navigate with Arrow keys', () => {}); // if applicable
  it('should handle Escape key', () => {}); // if applicable
  it('should handle Home/End keys', () => {}); // for lists
});

describe('Focus Management', () => {
  it('should be focusable when not disabled', () => {});
  it('should not be focusable when disabled', () => {});
  it('should receive focus via focus() method', () => {});
  it('should blur via blur() method', () => {});
  it('should trap focus in overlays', () => {}); // for dialogs/popovers
  it('should restore focus on close', () => {}); // for dialogs/popovers
});

describe('State Attributes', () => {
  it('should set [data-disabled] when disabled', () => {});
  it('should set [data-checked] when checked', () => {}); // if applicable
  it('should set [data-open] when open', () => {}); // if applicable
  it('should set [data-highlighted] when highlighted', () => {}); // for menu items
  it('should set [data-selected] when selected', () => {}); // for options
});

describe('Accessibility', () => {
  it('should have correct ARIA role', () => {});
  it('should set aria-disabled when disabled', () => {});
  it('should support aria-label', () => {});
  it('should support aria-labelledby', () => {});
  it('should support aria-describedby', () => {});
});
```

## Spec File Header Format

Each spec must include the React source reference:

```typescript
/**
 * @component ComponentName
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/component/Component.test.tsx
 * @parity Verified against React Base UI v[version]
 */
```

## Completion Signal

When ALL components in `component-parity-progress.md` have all columns marked `[x]`, output:

<promise>COMPONENT-PARITY-VERIFIED</promise>

If blocked, document in `component-parity-progress.md` under a "## Blockers" section and continue.

Now read `component-parity-progress.md` and start verifying components.

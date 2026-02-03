---
active: false
iteration: 1
max_iterations: 100
completion_promise: 'COMPONENT-PARITY-VERIFIED'
started_at: null
---

# Base UI Angular Documentation Site - Ralph Loop Prompt

You are building the official documentation website for the `@base-ng/ui` Angular component library, mirroring the structure and quality of [Base UI Docs](https://base-ui.com/).

## Source References

- **Original React docs:** https://base-ui.com/
- **Docs source code:** https://github.com/mui/base-ui/tree/master/docs/src
- **Component library:** `projects/base-ng/ui` (already complete)

## Your Task

1. **Read `docs-progress.md`** to see current status
2. **Find the next uncompleted task** (first `[ ]` checkbox)
3. **Fetch the Base UI docs** for reference (use WebFetch)
4. **Implement the task** following patterns below
5. **Test your work** - ensure the site builds and renders correctly
6. **Update `docs-progress.md`** - change `[ ]` to `[x]` for completed task
7. **Commit your work** with a descriptive message

## Project Structure

```
projects/base-ng/docs/
├── src/
│   ├── app/
│   │   ├── app.component.ts           # Root component
│   │   ├── app.routes.ts              # Route definitions
│   │   ├── layout/                    # Layout components
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   ├── toc/                   # Table of contents
│   │   │   └── footer/
│   │   ├── pages/
│   │   │   ├── overview/              # Quick start, About, etc.
│   │   │   ├── handbook/              # Guides
│   │   │   └── components/            # Component docs
│   │   ├── shared/
│   │   │   ├── code-block/            # Syntax-highlighted code
│   │   │   ├── demo/                  # Live demo container
│   │   │   ├── props-table/           # API documentation table
│   │   │   └── package-selector/      # npm/yarn/pnpm toggle
│   │   └── utils/
│   ├── styles.scss                    # Global styles
│   └── index.html
└── public/
    └── assets/
```

## Component Documentation Template

Each component documentation page should follow this structure:

```typescript
@Component({
  selector: 'docs-component-page',
  template: `
    <article class="docs-page">
      <!-- 1. Header -->
      <header class="docs-header">
        <h1>{{ title }}</h1>
        <p class="docs-description">{{ description }}</p>
      </header>

      <!-- 2. Live Demo -->
      <docs-demo>
        <ng-template #demo>
          <!-- Interactive example using @base-ng/ui from the angular project in this repository -->
        </ng-template>
        <ng-template #code>
          <!-- Code shown in toggle -->
        </ng-template>
      </docs-demo>

      <!-- 3. Installation -->
      <section class="docs-section">
        <h2>Installation</h2>
        <docs-package-selector package="@base-ng/ui" />
      </section>

      <!-- 4. Anatomy -->
      <section class="docs-section">
        <h2>Anatomy</h2>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- 5. Examples -->
      <section class="docs-section">
        <h2>Examples</h2>
        <!-- Feature-specific demos -->
      </section>

      <!-- 6. API Reference -->
      <section class="docs-section">
        <h2>API Reference</h2>
        <docs-props-table [props]="rootProps" title="Root" />
        <!-- Additional sub-component tables -->
      </section>

      <!-- 7. Accessibility -->
      <section class="docs-section">
        <h2>Accessibility</h2>
        <!-- ARIA attributes, keyboard navigation -->
      </section>
    </article>
  `
})
```

## Live Demo Component Pattern

```typescript
@Component({
  selector: 'docs-demo',
  template: `
    <div class="demo-container">
      <div class="demo-preview">
        <ng-content select="[demo]" />
      </div>
      <div class="demo-toolbar">
        <button (click)="showCode.set(!showCode())">
          {{ showCode() ? 'Hide' : 'Show' }} code
        </button>
        <button (click)="copyCode()">Copy</button>
        <docs-variant-selector [(variant)]="variant" />
      </div>
      @if (showCode()) {
        <div class="demo-code">
          <ng-content select="[code]" />
        </div>
      }
    </div>
  `
})
```

## URL Routing Structure

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'angular/overview/quick-start', pathMatch: 'full' },
  {
    path: 'angular',
    children: [
      {
        path: 'overview',
        children: [
          { path: 'quick-start', loadComponent: () => import('./pages/overview/quick-start') },
          { path: 'accessibility', loadComponent: () => import('./pages/overview/accessibility') },
          { path: 'releases', loadComponent: () => import('./pages/overview/releases') },
          { path: 'about', loadComponent: () => import('./pages/overview/about') },
        ],
      },
      {
        path: 'handbook',
        children: [
          { path: 'styling', loadComponent: () => import('./pages/handbook/styling') },
          // ... more handbook routes
        ],
      },
      {
        path: 'components',
        children: [
          { path: 'accordion', loadComponent: () => import('./pages/components/accordion') },
          { path: 'alert-dialog', loadComponent: () => import('./pages/components/alert-dialog') },
          // ... all component routes
        ],
      },
      {
        path: 'utils',
        children: [
          { path: 'csp-provider', loadComponent: () => import('./pages/utils/csp-provider') },
          // ... utils routes
        ],
      },
    ],
  },
];
```

## Styling Conventions

Use Tailwind CSS with custom design tokens matching Base UI's aesthetic:

```scss
// Color palette
:root {
  --docs-bg: #fafafa;
  --docs-bg-dark: #0a0a0a;
  --docs-text: #171717;
  --docs-text-dark: #ededed;
  --docs-accent: #0066ff;
  --docs-border: #e5e5e5;
  --docs-code-bg: #f5f5f5;
}

// Typography
.docs-heading-1 {
  @apply text-4xl font-semibold tracking-tight;
}
.docs-heading-2 {
  @apply text-2xl font-semibold tracking-tight mt-12 mb-4;
}
.docs-body {
  @apply text-base leading-7 text-neutral-600;
}
```

## Quality Requirements

- **SSR compatible** - No direct DOM access outside `afterNextRender`
- **Accessible** - Skip links, semantic HTML, keyboard navigation
- **Mobile responsive** - Collapsible sidebar, touch-friendly
- **Fast** - Lazy load all page components
- **SEO optimized** - Meta tags, structured data, sitemap

## CRITICAL Requirements (Mandatory)

### 1. Live Preview MUST Work
Every component documentation page MUST have working live demos that render actual `@base-ng/ui` components:

```typescript
// WRONG - just showing code blocks
<docs-code-block [code]="buttonCode" language="html" />

// CORRECT - live interactive demo with actual component
<docs-demo [code]="buttonCode">
  <base-ui-button (buttonClick)="handleClick()">Click me</base-ui-button>
</docs-demo>
```

The `<docs-demo>` component should:
- Render the actual component in a preview area via `<ng-content />`
- Show/hide the source code on toggle
- Import and use real components from `@base-ng/ui`

### 2. Remove Redundant Installation Sections
Do NOT include installation instructions on every component page. Installation should only appear on:
- Quick Start page
- First-time setup guides

Component pages should jump straight to usage, anatomy, and examples.

## Fetching Base UI Docs for Reference

When implementing a page, fetch the original for reference:

```
WebFetch: https://base-ui.com/react/components/[component-name]
```

Then adapt the content for Angular, replacing:

- React preview component → Angular Library Component preview
- React hooks → Angular signals
- JSX → Angular templates
- npm install @base-ui/react → npm install @base-ng/ui

## Build & Test Commands

```bash
# Serve docs locally
ng serve @base-ng/docs

# Build for production
ng build @base-ng/docs

# Run tests
ng test @base-ng/docs
```

## Completion Signal

When ALL 75 tasks in docs-progress.md are marked `[x]`, output:

<promise>BASE-UI-DOCS-COMPLETE</promise>

If you cannot complete a task due to a blocker, document it in docs-progress.md under a "## Blockers" section and move to the next task.

## Current Iteration

Check git log to see what was done in previous iterations. Build upon that work.

Now read docs-progress.md and continue building the documentation site.

---

## Phase 2: Component Parity Verification

> **NEW OBJECTIVE:** Ensure all `@base-ng/ui` components look and behave exactly like their React Base UI counterparts.

### Parity Verification Workflow

1. **Read `component-parity-progress.md`** to find the next unchecked component
2. **Fetch React reference** from `https://base-ui.com/react/components/[component]`
3. **Visual Comparison:**
   - [ ] Default state matches
   - [ ] Hover state matches
   - [ ] Focus state matches
   - [ ] Active/pressed state matches
   - [ ] Disabled state matches
   - [ ] Open/closed states match (if applicable)
   - [ ] Animation timing matches
4. **Run specs:** `ng test @base-ng/ui --include=**/[component].spec.ts`
5. **Enhance specs** with missing test categories (see below)
6. **Fix discrepancies** in component implementation or styling
7. **Update `component-parity-progress.md`** - mark columns `[x]`
8. **Commit changes** with descriptive message

### Required Spec Test Categories

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

### Spec File Header Format

Each spec must include the React source reference:

```typescript
/**
 * @component ComponentName
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/component/Component.test.tsx
 * @parity Verified against React Base UI v[version]
 */
```

### Visual Comparison Process

1. Open React demo: `https://base-ui.com/react/components/[component]`
2. Open Angular demo: `http://localhost:4200/angular/components/[component]`
3. Compare side-by-side:
   - Take screenshots if helpful
   - Check all interactive states
   - Verify animations match
   - Test keyboard navigation
4. Document any discrepancies in component-parity-progress.md

### Completion Signal

When ALL components in `component-parity-progress.md` have all columns marked `[x]`, output:

<promise>COMPONENT-PARITY-VERIFIED</promise>

This requires:
- All 35 components visually verified
- All 35 components behaviorally verified
- All specs enhanced with required test blocks
- All tests passing

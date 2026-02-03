import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import { SeparatorComponent } from '@base-ng/ui';

@Component({
  selector: 'docs-separator',
  imports: [EditOnGitHubComponent, CodeBlockComponent, DemoComponent, PropsTableComponent, SeparatorComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Separator</h1>
        <p class="docs-description">
          A separator element accessible to screen readers. Visually divides
          content while maintaining semantic meaning for assistive technologies.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="horizontalDemoCode" language="html">
          <div class="demo-stack">
            <p class="demo-text">First section content</p>
            <base-ui-separator></base-ui-separator>
            <p class="demo-text">Second section content</p>
          </div>
        </docs-demo>
      </section>

      <!-- Import -->
      <section class="docs-section">
        <h2 class="docs-section-title">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Separator component can be used as a custom element or as an
          attribute directive:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Vertical separator</h3>
        <p class="docs-paragraph">
          Set <code>orientation="vertical"</code> to render a vertical separator
          for horizontally aligned content like navigation bars or toolbars.
        </p>
        <docs-demo [code]="verticalDemoCode" language="html">
          <div class="demo-row">
            <span class="demo-item">Item A</span>
            <base-ui-separator orientation="vertical"></base-ui-separator>
            <span class="demo-item">Item B</span>
            <base-ui-separator orientation="vertical"></base-ui-separator>
            <span class="demo-item">Item C</span>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">In a navigation bar</h3>
        <p class="docs-paragraph">
          A common use case is separating groups of navigation links.
        </p>
        <docs-demo [code]="navbarDemoCode" language="html">
          <nav class="demo-navbar">
            <a href="javascript:void(0)" class="demo-link">Home</a>
            <a href="javascript:void(0)" class="demo-link">About</a>
            <base-ui-separator orientation="vertical"></base-ui-separator>
            <a href="javascript:void(0)" class="demo-link">Docs</a>
            <a href="javascript:void(0)" class="demo-link">API</a>
            <base-ui-separator orientation="vertical"></base-ui-separator>
            <a href="javascript:void(0)" class="demo-link">Login</a>
          </nav>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Separator component is unstyled by default. Use CSS to style it
          based on orientation using data attributes:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Separator with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Inputs" [props]="inputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table [props]="dataAttributes" />
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS classes</h2>
        <docs-props-table [props]="cssClasses" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Separator component follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="separator"</code> for screen reader recognition</li>
          <li>
            Sets <code>aria-orientation</code> to communicate the separator's
            direction to assistive technologies
          </li>
          <li>
            Visually hidden separators still convey semantic meaning to screen
            readers
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/separator/separator-docs.component.ts"
        />
      </footer>
    </article>
  `,
  styles: `
    .docs-list {
      margin: 1rem 0;
      padding-left: 1.5rem;
      color: var(--docs-text-secondary);

      li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
      }
    }

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }

    /* Demo styles */
    .demo-stack {
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      max-width: 300px;
    }

    .demo-text {
      margin: 0;
      padding: 0.5rem 0;
      color: var(--docs-text);
    }

    .demo-row {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .demo-item {
      color: var(--docs-text);
      font-size: 0.875rem;
    }

    .demo-navbar {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 0.5rem 1rem;
      background: var(--docs-bg-secondary);
      border-radius: 0.5rem;
    }

    .demo-link {
      color: var(--docs-text);
      text-decoration: none;
      font-size: 0.875rem;
      padding: 0.25rem 0.5rem;

      &:hover {
        color: var(--docs-accent);
      }
    }

    /* Separator component styles */
    base-ui-separator[data-orientation="horizontal"] {
      width: 100%;
      height: 1px;
      background-color: var(--docs-border);
      margin: 0.5rem 0;
    }

    base-ui-separator[data-orientation="vertical"] {
      width: 1px;
      height: 1rem;
      background-color: var(--docs-border);
      margin: 0 0.75rem;
    }
  `,
})
export class SeparatorDocsComponent {
  protected readonly importCode = `import { SeparatorComponent } from '@base-ng/ui/separator';

@Component({
  imports: [SeparatorComponent],
  // ...
})`;

  protected readonly anatomyCode = `<!-- As a custom element -->
<base-ui-separator></base-ui-separator>

<!-- As an attribute directive -->
<div baseUiSeparator></div>`;

  protected readonly horizontalDemoCode = `<div class="content-stack">
  <p>First section content</p>
  <base-ui-separator></base-ui-separator>
  <p>Second section content</p>
</div>`;

  protected readonly verticalDemoCode = `<div class="horizontal-layout">
  <span>Item A</span>
  <base-ui-separator orientation="vertical"></base-ui-separator>
  <span>Item B</span>
  <base-ui-separator orientation="vertical"></base-ui-separator>
  <span>Item C</span>
</div>`;

  protected readonly navbarDemoCode = `<nav class="navbar">
  <a href="/home">Home</a>
  <a href="/about">About</a>
  <base-ui-separator orientation="vertical"></base-ui-separator>
  <a href="/docs">Docs</a>
  <a href="/api">API</a>
  <base-ui-separator orientation="vertical"></base-ui-separator>
  <a href="/login">Login</a>
</nav>`;

  protected readonly stylingCode = `/* Horizontal separator */
base-ui-separator[data-orientation="horizontal"] {
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 1rem 0;
}

/* Vertical separator */
base-ui-separator[data-orientation="vertical"] {
  width: 1px;
  height: 100%;
  min-height: 1rem;
  background-color: #e5e5e5;
  margin: 0 0.75rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  base-ui-separator {
    background-color: #404040;
  }
}`;

  protected readonly tailwindCode = `<!-- Horizontal separator with Tailwind -->
<base-ui-separator
  class="w-full h-px bg-gray-200 dark:bg-gray-700 my-4"
></base-ui-separator>

<!-- Vertical separator with Tailwind -->
<base-ui-separator
  orientation="vertical"
  class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-3"
></base-ui-separator>`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'The orientation of the separator.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description:
        'Indicates the current orientation. Use this for CSS styling based on direction.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-separator',
      type: 'class',
      description: 'Applied to all separator instances.',
    },
    {
      name: 'base-ui-separator-horizontal',
      type: 'class',
      description: 'Applied when orientation is horizontal.',
    },
    {
      name: 'base-ui-separator-vertical',
      type: 'class',
      description: 'Applied when orientation is vertical.',
    },
  ];
}

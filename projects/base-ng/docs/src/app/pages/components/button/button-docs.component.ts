import { Component, signal } from '@angular/core';
import {
  CodeBlockComponent,
  DemoComponent,
  EditOnGitHubComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import { ButtonComponent } from '@base-ng/ui';

@Component({
  selector: 'docs-button',
  imports: [ButtonComponent, CodeBlockComponent, DemoComponent, EditOnGitHubComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Button</h1>
        <p class="docs-description">
          A button component that can be used to trigger actions. Supports
          disabled states with optional focus retention for accessibility.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <base-ui-button (buttonClick)="handleClick()">
            Click me
          </base-ui-button>
        </docs-demo>
        <p class="docs-hint">Click the button to see the interaction. Check the console for the event.</p>
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
          The Button component can be used as a custom element or as an
          attribute directive on native elements:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Disabled button</h3>
        <p class="docs-paragraph">
          Use the <code>disabled</code> input to disable the button. Disabled
          buttons are not focusable by default.
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <base-ui-button [disabled]="true">
            Disabled
          </base-ui-button>
        </docs-demo>

        <h3 class="docs-section-subtitle">Focusable when disabled</h3>
        <p class="docs-paragraph">
          For better accessibility, use <code>focusableWhenDisabled</code> to
          keep the button in the tab order even when disabled. This prevents
          focus loss during async operations.
        </p>
        <docs-demo [code]="focusableDemoCode" language="html">
          <base-ui-button [disabled]="true" [focusableWhenDisabled]="true">
            Focusable when disabled
          </base-ui-button>
        </docs-demo>

        <h3 class="docs-section-subtitle">Interactive state</h3>
        <p class="docs-paragraph">
          Toggle the disabled state to see how the button responds dynamically.
        </p>
        <docs-demo [code]="interactiveDemoCode" language="html">
          <div class="demo-interactive">
            <base-ui-button [disabled]="isDisabled()" (buttonClick)="handleClick()">
              {{ isDisabled() ? 'Disabled' : 'Click me' }}
            </base-ui-button>
            <label class="demo-toggle">
              <input type="checkbox" [checked]="isDisabled()" (change)="toggleDisabled()" />
              Disabled
            </label>
          </div>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Button component is unstyled by default. Use CSS to style it
          according to your design system. The component exposes data attributes
          for state-based styling:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Inputs" [props]="inputProps" />
        <docs-props-table title="Outputs" [props]="outputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table [props]="dataAttributes" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Button component follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>Uses native <code>&lt;button&gt;</code> element by default</li>
          <li>
            Sets <code>aria-disabled="true"</code> when disabled for screen
            reader announcement
          </li>
          <li>
            Supports <code>focusableWhenDisabled</code> to maintain tab order
            during state changes
          </li>
          <li>
            Responds to both mouse clicks and keyboard activation (Enter/Space)
          </li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/button/button-docs.component.ts"
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

    .docs-hint {
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      margin-top: 0.5rem;
    }

    .demo-interactive {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .demo-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
    }

    base-ui-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      background: var(--docs-accent, #0066ff);
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background 0.15s;

      &:hover:not([data-disabled]) {
        background: #0052cc;
      }

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }

      &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  `,
})
export class ButtonDocsComponent {
  protected readonly isDisabled = signal(false);

  protected handleClick(): void {
    console.log('Button clicked!');
  }

  protected toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }
  protected readonly importCode = `import { ButtonComponent } from '@base-ng/ui/button';

@Component({
  imports: [ButtonComponent],
  // ...
})`;

  protected readonly anatomyCode = `<!-- As a custom element -->
<base-ui-button>Click me</base-ui-button>

<!-- As an attribute directive -->
<button baseUiButton>Click me</button>`;

  protected readonly basicDemoCode = `<base-ui-button (buttonClick)="handleClick()">
  Click me
</base-ui-button>`;

  protected readonly disabledDemoCode = `<base-ui-button [disabled]="true">
  Disabled
</base-ui-button>`;

  protected readonly focusableDemoCode = `<base-ui-button
  [disabled]="true"
  [focusableWhenDisabled]="true"
>
  Focusable when disabled
</base-ui-button>`;

  protected readonly interactiveDemoCode = `@Component({
  template: \`
    <base-ui-button [disabled]="isDisabled()" (buttonClick)="handleClick()">
      {{ isDisabled() ? 'Disabled' : 'Click me' }}
    </base-ui-button>
    <label>
      <input type="checkbox" [checked]="isDisabled()" (change)="toggleDisabled()" />
      Disabled
    </label>
  \`
})
export class ExampleComponent {
  isDisabled = signal(false);

  handleClick() {
    console.log('Button clicked!');
  }

  toggleDisabled() {
    this.isDisabled.update(v => !v);
  }
}`;

  protected readonly stylingCode = `/* Base button styles */
base-ui-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #0066ff;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

/* Hover state */
base-ui-button:hover:not([data-disabled]) {
  background: #0052cc;
}

/* Focus state */
base-ui-button:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}

/* Disabled state */
base-ui-button[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled.',
    },
    {
      name: 'focusableWhenDisabled',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the button can be focused when disabled. Useful for maintaining focus during async operations.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'The type attribute of the button element.',
    },
  ];

  protected readonly outputProps: PropDefinition[] = [
    {
      name: 'buttonClick',
      type: 'EventEmitter<MouseEvent | KeyboardEvent>',
      description: 'Emitted when the button is clicked (mouse or keyboard).',
    },
    {
      name: 'buttonPress',
      type: 'EventEmitter<MouseEvent | KeyboardEvent>',
      description: 'Emitted when the button is pressed down.',
    },
    {
      name: 'buttonRelease',
      type: 'EventEmitter<MouseEvent | KeyboardEvent>',
      description: 'Emitted when the button is released.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description:
        'Present when the button is disabled. Use this for CSS styling of the disabled state.',
    },
  ];
}

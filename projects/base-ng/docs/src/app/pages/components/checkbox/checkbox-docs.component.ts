import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-checkbox',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Checkbox</h1>
        <p class="docs-description">
          A checkbox control that supports checked, unchecked, and indeterminate
          states. Features form integration and accessible markup.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">Import the Checkbox directives:</p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Checkbox uses a directive-based composition pattern with a root and
          optional indicator:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Use two-way binding with <code>[(checked)]</code> to control the
          checkbox state:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Indeterminate state</h3>
        <p class="docs-paragraph">
          The indeterminate state is useful for "select all" checkboxes:
        </p>
        <docs-code-block [code]="indeterminateDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Form integration</h3>
        <p class="docs-paragraph">
          Works with Angular forms using <code>ngModel</code> or
          <code>formControl</code>:
        </p>
        <docs-code-block [code]="formDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With CheckboxGroup</h3>
        <p class="docs-paragraph">
          Use with CheckboxGroup to manage multiple selections:
        </p>
        <docs-code-block [code]="groupDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes to style different checkbox states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table
          title="CheckboxRoot Inputs"
          [props]="rootInputProps"
        />
        <docs-props-table
          title="CheckboxRoot Outputs"
          [props]="rootOutputProps"
        />
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
          The Checkbox component follows WAI-ARIA Checkbox pattern:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="checkbox"</code> for proper semantics</li>
          <li>
            <code>aria-checked</code> reflects checked/indeterminate state
          </li>
          <li>Keyboard activation with Space key</li>
          <li>Focus visible styling support</li>
          <li>Works with <code>&lt;label&gt;</code> elements</li>
        </ul>
      </section>
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
  `,
})
export class CheckboxDocsComponent {
  protected readonly importCode = `import {
  CheckboxRootDirective,
  CheckboxIndicatorDirective
} from '@base-ng/ui/checkbox';

@Component({
  imports: [CheckboxRootDirective, CheckboxIndicatorDirective],
  // ...
})`;

  protected readonly anatomyCode = `<button baseUiCheckboxRoot>
  <span baseUiCheckboxIndicator>
    <!-- Checkmark icon -->
  </span>
  Label text
</button>`;

  protected readonly basicDemoCode = `<button baseUiCheckboxRoot [(checked)]="acceptTerms">
  <span baseUiCheckboxIndicator>
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M10 3L4.5 8.5L2 6" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  </span>
  I accept the terms and conditions
</button>`;

  protected readonly indeterminateDemoCode = `<button baseUiCheckboxRoot
  [(checked)]="allSelected"
  [(indeterminate)]="someSelected">
  <span baseUiCheckboxIndicator>
    @if (someSelected) {
      <svg><!-- minus icon --></svg>
    } @else {
      <svg><!-- check icon --></svg>
    }
  </span>
  Select all
</button>`;

  protected readonly formDemoCode = `<!-- Template-driven forms -->
<button baseUiCheckboxRoot [(ngModel)]="settings.newsletter" name="newsletter">
  <span baseUiCheckboxIndicator>✓</span>
  Subscribe to newsletter
</button>

<!-- Reactive forms -->
<button baseUiCheckboxRoot [formControl]="newsletterControl">
  <span baseUiCheckboxIndicator>✓</span>
  Subscribe to newsletter
</button>`;

  protected readonly groupDemoCode = `<div baseUiCheckboxGroup [(value)]="selectedFruits">
  <button baseUiCheckboxRoot value="apple">
    <span baseUiCheckboxIndicator>✓</span>
    Apple
  </button>
  <button baseUiCheckboxRoot value="banana">
    <span baseUiCheckboxIndicator>✓</span>
    Banana
  </button>
  <button baseUiCheckboxRoot value="orange">
    <span baseUiCheckboxIndicator>✓</span>
    Orange
  </button>
</div>

<!-- selectedFruits: string[] -->`;

  protected readonly stylingCode = `/* Base checkbox styles */
[baseUiCheckboxRoot] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

/* Indicator box */
[baseUiCheckboxIndicator] {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: all 0.15s;
}

/* Checked state */
[baseUiCheckboxRoot][data-checked] [baseUiCheckboxIndicator] {
  background: #0066ff;
  border-color: #0066ff;
  color: white;
}

/* Indeterminate state */
[baseUiCheckboxRoot][data-indeterminate] [baseUiCheckboxIndicator] {
  background: #0066ff;
  border-color: #0066ff;
  color: white;
}

/* Disabled state */
[baseUiCheckboxRoot][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
[baseUiCheckboxRoot]:focus-visible [baseUiCheckboxIndicator] {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Whether the checkbox is checked. Supports two-way binding.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the checkbox is in indeterminate state. Supports two-way binding.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the checkbox is disabled.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the checkbox is read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the checkbox is required.',
    },
    {
      name: 'value',
      type: 'string',
      description: 'Value when used in a CheckboxGroup.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name for form submission.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'checkedChange',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the checked state changes.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-checked',
      type: 'string',
      description: 'Present when the checkbox is checked.',
    },
    {
      name: 'data-unchecked',
      type: 'string',
      description: 'Present when the checkbox is unchecked and not indeterminate.',
    },
    {
      name: 'data-indeterminate',
      type: 'string',
      description: 'Present when the checkbox is in indeterminate state.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the checkbox is disabled.',
    },
    {
      name: 'data-readonly',
      type: 'string',
      description: 'Present when the checkbox is read-only.',
    },
  ];
}

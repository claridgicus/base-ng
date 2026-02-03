import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import { CheckboxRootDirective, CheckboxIndicatorDirective } from '@base-ng/ui';

@Component({
  selector: 'docs-checkbox',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    CheckboxRootDirective,
    CheckboxIndicatorDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Checkbox</h1>
        <p class="docs-description">
          A checkbox control that supports checked, unchecked, and indeterminate
          states. Features form integration and accessible markup.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <button
            baseUiCheckboxRoot
            [(checked)]="acceptTerms"
            class="demo-checkbox"
          >
            <span baseUiCheckboxIndicator class="demo-indicator">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                class="demo-check-icon"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            I accept the terms and conditions
          </button>
          <span class="demo-status">{{ acceptTerms() ? 'Accepted' : 'Not accepted' }}</span>
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
          The Checkbox uses a directive-based composition pattern with a root and
          optional indicator:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Indeterminate state</h3>
        <p class="docs-paragraph">
          The indeterminate state is useful for "select all" checkboxes:
        </p>
        <docs-demo [code]="indeterminateDemoCode" language="html">
          <div class="demo-indeterminate">
            <button
              baseUiCheckboxRoot
              [(checked)]="allSelected"
              [indeterminate]="someSelected()"
              (checkedChange)="onSelectAllChange($event)"
              class="demo-checkbox"
            >
              <span baseUiCheckboxIndicator class="demo-indicator">
                @if (someSelected() && !allSelected) {
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                    <path d="M3 6H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                } @else {
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                }
              </span>
              Select all
            </button>
            <div class="demo-options">
              @for (option of options; track option.value) {
                <button
                  baseUiCheckboxRoot
                  [(checked)]="option.checked"
                  (checkedChange)="onOptionChange()"
                  class="demo-checkbox demo-checkbox-nested"
                >
                  <span baseUiCheckboxIndicator class="demo-indicator">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  {{ option.label }}
                </button>
              }
            </div>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Disable the checkbox using the <code>disabled</code> input:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div class="demo-row">
            <button
              baseUiCheckboxRoot
              [checked]="true"
              [disabled]="true"
              class="demo-checkbox"
            >
              <span baseUiCheckboxIndicator class="demo-indicator">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              Disabled (checked)
            </button>
            <button
              baseUiCheckboxRoot
              [checked]="false"
              [disabled]="true"
              class="demo-checkbox"
            >
              <span baseUiCheckboxIndicator class="demo-indicator">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              Disabled (unchecked)
            </button>
          </div>
        </docs-demo>
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
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/checkbox/checkbox-docs.component.ts"
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
    .demo-checkbox {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--docs-text);

      &:focus-visible .demo-indicator {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }

      &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .demo-indicator {
      width: 20px;
      height: 20px;
      border: 2px solid var(--docs-border);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--docs-bg);
      transition: all 0.15s;

      [data-checked] & {
        background: var(--docs-accent, #0066ff);
        border-color: var(--docs-accent, #0066ff);
      }

      [data-indeterminate] & {
        background: var(--docs-accent, #0066ff);
        border-color: var(--docs-accent, #0066ff);
      }
    }

    .demo-check-icon {
      color: transparent;
      transition: color 0.15s;

      [data-checked] &,
      [data-indeterminate] & {
        color: white;
      }
    }

    .demo-status {
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
      margin-left: 1rem;
    }

    .demo-indeterminate {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .demo-options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-left: 1.5rem;
    }

    .demo-checkbox-nested {
      font-size: 0.875rem;
    }

    .demo-row {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
  `,
})
export class CheckboxDocsComponent {
  protected readonly acceptTerms = signal(false);
  protected allSelected = false;

  protected readonly options = [
    { value: 'apple', label: 'Apple', checked: true },
    { value: 'banana', label: 'Banana', checked: false },
    { value: 'orange', label: 'Orange', checked: true },
  ];

  protected someSelected(): boolean {
    const checkedCount = this.options.filter(o => o.checked).length;
    return checkedCount > 0 && checkedCount < this.options.length;
  }

  protected onSelectAllChange(checked: boolean): void {
    this.allSelected = checked;
    this.options.forEach(o => (o.checked = checked));
  }

  protected onOptionChange(): void {
    const checkedCount = this.options.filter(o => o.checked).length;
    this.allSelected = checkedCount === this.options.length;
  }

  protected readonly importCode = `import {
  CheckboxRootDirective,
  CheckboxIndicatorDirective
} from '@base-ng/ui';

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

  protected readonly disabledDemoCode = `<button baseUiCheckboxRoot [checked]="true" [disabled]="true">
  <span baseUiCheckboxIndicator>✓</span>
  Disabled (checked)
</button>

<button baseUiCheckboxRoot [checked]="false" [disabled]="true">
  <span baseUiCheckboxIndicator>✓</span>
  Disabled (unchecked)
</button>`;

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

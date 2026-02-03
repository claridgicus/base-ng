import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  CheckboxGroupDirective,
  CheckboxRootDirective,
  CheckboxIndicatorDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-checkbox-group',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    CheckboxGroupDirective,
    CheckboxRootDirective,
    CheckboxIndicatorDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Checkbox Group</h1>
        <p class="docs-description">
          A container that manages the state of multiple checkboxes, allowing
          multiple selections. Provides shared context for child checkboxes and
          supports Angular forms integration.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-group-container">
            <div baseUiCheckboxGroup [(value)]="selectedFeatures" class="demo-checkbox-group">
              @for (feature of features; track feature.value) {
                <button
                  baseUiCheckboxRoot
                  [value]="feature.value"
                  class="demo-checkbox"
                >
                  <span baseUiCheckboxIndicator class="demo-indicator">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  {{ feature.label }}
                </button>
              }
            </div>
            <span class="demo-status">Selected: {{ selectedFeatures().length > 0 ? selectedFeatures().join(', ') : 'none' }}</span>
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
          Wrap multiple Checkbox components in a Checkbox Group:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Select all pattern</h3>
        <p class="docs-paragraph">
          Use a parent checkbox to select/deselect all options at once:
        </p>
        <docs-demo [code]="selectAllDemoCode" language="html">
          <div class="demo-group-container">
            <button
              baseUiCheckboxRoot
              [checked]="isAllSelected()"
              [indeterminate]="isIndeterminate()"
              (checkedChange)="toggleAll($event)"
              class="demo-checkbox demo-checkbox-parent"
            >
              <span baseUiCheckboxIndicator class="demo-indicator">
                @if (isIndeterminate()) {
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                    <path d="M3 6H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                } @else {
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                }
              </span>
              Select All
            </button>
            <div
              baseUiCheckboxGroup
              [(value)]="selectedOptions"
              [allValues]="allOptions"
              class="demo-checkbox-group demo-nested"
            >
              @for (option of allOptions; track option) {
                <button baseUiCheckboxRoot [value]="option" class="demo-checkbox">
                  <span baseUiCheckboxIndicator class="demo-indicator">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  {{ option }}
                </button>
              }
            </div>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Disabled group</h3>
        <p class="docs-paragraph">
          Disable all checkboxes in the group:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div class="demo-group-container">
            <div
              baseUiCheckboxGroup
              [value]="['notifications']"
              [disabled]="isGroupDisabled()"
              class="demo-checkbox-group"
            >
              <button baseUiCheckboxRoot value="notifications" class="demo-checkbox">
                <span baseUiCheckboxIndicator class="demo-indicator">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                Notifications
              </button>
              <button baseUiCheckboxRoot value="marketing" class="demo-checkbox">
                <span baseUiCheckboxIndicator class="demo-indicator">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="demo-check-icon">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                Marketing emails
              </button>
            </div>
            <label class="demo-toggle">
              <input type="checkbox" [checked]="isGroupDisabled()" (change)="toggleGroupDisabled()" />
              Disabled
            </label>
          </div>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Checkbox Group and its children using CSS:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
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

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS classes</h2>
        <docs-props-table [props]="cssClasses" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Checkbox Group follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="group"</code> to indicate checkbox grouping</li>
          <li>
            Each checkbox maintains its own <code>aria-checked</code> state
          </li>
          <li>
            <strong>Required:</strong> Provide a group label using Fieldset or
            <code>aria-labelledby</code>
          </li>
          <li>
            Disabled state sets <code>aria-disabled</code> on group and children
          </li>
          <li>
            Tab navigation moves between checkboxes, Space toggles selection
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/checkbox-group/checkbox-group-docs.component.ts"
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
    .demo-group-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .demo-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &[data-disabled] {
        opacity: 0.5;
      }
    }

    .demo-nested {
      padding-left: 1.5rem;
    }

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
        cursor: not-allowed;
      }
    }

    .demo-checkbox-parent {
      font-weight: 600;
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
    }

    .demo-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
      margin-top: 0.5rem;
    }
  `,
})
export class CheckboxGroupDocsComponent {
  // Basic demo
  protected readonly features = [
    { value: 'notifications', label: 'Notifications' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'marketing', label: 'Marketing emails' },
  ];
  protected readonly selectedFeatures = signal<string[]>(['notifications']);

  // Select all demo
  protected readonly allOptions = ['Option A', 'Option B', 'Option C'];
  protected readonly selectedOptions = signal<string[]>(['Option A']);

  protected isAllSelected(): boolean {
    return this.selectedOptions().length === this.allOptions.length;
  }

  protected isIndeterminate(): boolean {
    const len = this.selectedOptions().length;
    return len > 0 && len < this.allOptions.length;
  }

  protected toggleAll(checked: boolean): void {
    this.selectedOptions.set(checked ? [...this.allOptions] : []);
  }

  // Disabled demo
  protected readonly isGroupDisabled = signal(false);

  protected toggleGroupDisabled(): void {
    this.isGroupDisabled.update(v => !v);
  }

  protected readonly importCode = `import {
  CheckboxGroupDirective,
  CheckboxRootDirective,
  CheckboxIndicatorDirective,
} from '@copied/base-ng';

@Component({
  imports: [
    CheckboxGroupDirective,
    CheckboxRootDirective,
    CheckboxIndicatorDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiCheckboxGroup [(value)]="selectedItems">
  <button baseUiCheckboxRoot value="item1">
    <span baseUiCheckboxIndicator></span>
    Item 1
  </button>
  <button baseUiCheckboxRoot value="item2">
    <span baseUiCheckboxIndicator></span>
    Item 2
  </button>
  <button baseUiCheckboxRoot value="item3">
    <span baseUiCheckboxIndicator></span>
    Item 3
  </button>
</div>`;

  protected readonly basicDemoCode = `<div baseUiCheckboxGroup [(value)]="selectedFeatures" class="checkbox-group">
  <button baseUiCheckboxRoot value="notifications" class="checkbox">
    <span baseUiCheckboxIndicator class="checkbox-indicator"></span>
    Notifications
  </button>
  <button baseUiCheckboxRoot value="analytics" class="checkbox">
    <span baseUiCheckboxIndicator class="checkbox-indicator"></span>
    Analytics
  </button>
  <button baseUiCheckboxRoot value="marketing" class="checkbox">
    <span baseUiCheckboxIndicator class="checkbox-indicator"></span>
    Marketing emails
  </button>
</div>

<p>Selected: {{ selectedFeatures().join(', ') }}</p>`;

  protected readonly labeledDemoCode = `<fieldset baseUiFieldsetRoot>
  <div baseUiFieldsetLegend>Select your interests</div>

  <div baseUiCheckboxGroup [(value)]="interests" class="checkbox-group">
    @for (interest of allInterests; track interest.value) {
      <label class="checkbox-label">
        <button baseUiCheckboxRoot [value]="interest.value" class="checkbox">
          <span baseUiCheckboxIndicator class="checkbox-indicator">
            <svg viewBox="0 0 12 10" fill="none" stroke="currentColor">
              <path d="M1 5l3 3 7-7" stroke-width="2" />
            </svg>
          </span>
        </button>
        <span>{{ interest.label }}</span>
      </label>
    }
  </div>
</fieldset>`;

  protected readonly defaultValueDemoCode = `<!-- Pre-select "email" and "push" -->
<div
  baseUiCheckboxGroup
  [value]="['email', 'push']"
  (valueChange)="onNotificationChange($event)"
>
  <button baseUiCheckboxRoot value="email">Email</button>
  <button baseUiCheckboxRoot value="push">Push notifications</button>
  <button baseUiCheckboxRoot value="sms">SMS</button>
</div>`;

  protected readonly formsDemoCode = `@Component({
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <fieldset baseUiFieldsetRoot>
        <div baseUiFieldsetLegend>Permissions</div>

        <div baseUiCheckboxGroup formControlName="permissions" class="checkbox-group">
          <label>
            <button baseUiCheckboxRoot value="read">
              <span baseUiCheckboxIndicator></span>
            </button>
            Read
          </label>
          <label>
            <button baseUiCheckboxRoot value="write">
              <span baseUiCheckboxIndicator></span>
            </button>
            Write
          </label>
          <label>
            <button baseUiCheckboxRoot value="delete">
              <span baseUiCheckboxIndicator></span>
            </button>
            Delete
          </label>
        </div>
      </fieldset>

      <button type="submit">Save</button>
    </form>
  \`,
})
export class MyComponent {
  readonly form = new FormGroup({
    permissions: new FormControl<string[]>(['read']),
  });

  onSubmit(): void {
    console.log('Permissions:', this.form.value.permissions);
  }
}`;

  protected readonly selectAllDemoCode = `@Component({
  template: \`
    <!-- Parent "Select All" checkbox -->
    <label class="checkbox-label">
      <button
        baseUiCheckboxRoot
        [checked]="isAllSelected()"
        [indeterminate]="isIndeterminate()"
        (checkedChange)="toggleAll($event)"
        class="checkbox"
      >
        <span baseUiCheckboxIndicator class="checkbox-indicator"></span>
      </button>
      Select All
    </label>

    <!-- Checkbox Group with allValues for reference -->
    <div
      baseUiCheckboxGroup
      [(value)]="selected"
      [allValues]="allOptions"
      class="checkbox-group"
    >
      @for (option of allOptions; track option) {
        <label class="checkbox-label">
          <button baseUiCheckboxRoot [value]="option" class="checkbox">
            <span baseUiCheckboxIndicator class="checkbox-indicator"></span>
          </button>
          {{ option }}
        </label>
      }
    </div>
  \`,
})
export class MyComponent {
  readonly allOptions = ['Option A', 'Option B', 'Option C'];
  readonly selected = signal<string[]>([]);

  isAllSelected(): boolean {
    return this.selected().length === this.allOptions.length;
  }

  isIndeterminate(): boolean {
    const len = this.selected().length;
    return len > 0 && len < this.allOptions.length;
  }

  toggleAll(checked: boolean): void {
    this.selected.set(checked ? [...this.allOptions] : []);
  }
}`;

  protected readonly disabledDemoCode = `<div baseUiCheckboxGroup [(value)]="selected" [disabled]="true">
  <button baseUiCheckboxRoot value="a">Option A</button>
  <button baseUiCheckboxRoot value="b">Option B</button>
  <button baseUiCheckboxRoot value="c">Option C</button>
</div>`;

  protected readonly stylingCode = `/* Checkbox group container */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Individual checkbox label */
.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

/* Checkbox button */
.checkbox {
  width: 20px;
  height: 20px;
  padding: 0;
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

/* Checked state */
[baseUiCheckboxRoot][data-checked] {
  background: #0066ff;
  border-color: #0066ff;
}

/* Indicator (checkmark) */
.checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
}

.checkbox-indicator svg {
  width: 12px;
  height: 12px;
}

/* Disabled state */
[baseUiCheckboxGroup][data-disabled] .checkbox {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
.checkbox:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}`;

  protected readonly tailwindCode = `<div
  baseUiCheckboxGroup
  [(value)]="selected"
  class="flex flex-col gap-3 data-[disabled]:opacity-50"
>
  @for (option of options; track option.value) {
    <label class="inline-flex items-center gap-2 cursor-pointer">
      <button
        baseUiCheckboxRoot
        [value]="option.value"
        class="w-5 h-5 bg-white border-2 border-gray-300 rounded
               transition-all duration-150
               data-[checked]:bg-blue-600 data-[checked]:border-blue-600
               focus-visible:outline-2 focus-visible:outline-blue-600
               focus-visible:outline-offset-2"
      >
        <span
          baseUiCheckboxIndicator
          class="flex items-center justify-center w-full h-full text-white"
        >
          <svg class="w-3 h-3" viewBox="0 0 12 10" fill="none" stroke="currentColor">
            <path d="M1 5l3 3 7-7" stroke-width="2" />
          </svg>
        </span>
      </button>
      <span class="text-sm">{{ option.label }}</span>
    </label>
  }
</div>`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string[]',
      default: '[]',
      description: 'Array of selected checkbox values. Supports two-way binding.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether all checkboxes in the group are disabled.',
    },
    {
      name: 'allValues',
      type: 'string[]',
      default: '[]',
      description:
        'All possible values. Used for "select all" functionality to determine full selection.',
    },
  ];

  protected readonly outputProps: PropDefinition[] = [
    {
      name: 'valueChanged',
      type: 'EventEmitter<CheckboxGroupChangeEventDetails>',
      description: 'Emitted when selected values change.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the group is disabled.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-checkbox-group',
      type: 'class',
      description: 'Applied to the group container.',
    },
    {
      name: 'base-ui-checkbox-group-disabled',
      type: 'class',
      description: 'Applied when the group is disabled.',
    },
  ];
}

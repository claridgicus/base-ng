import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-checkbox-group',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
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

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Checkbox Group directive along with Checkbox directives:
        </p>
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

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Create a group of checkboxes with shared state.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With labels</h3>
        <p class="docs-paragraph">
          Add labels for better usability.
        </p>
        <docs-code-block [code]="labeledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Default selected values</h3>
        <p class="docs-paragraph">
          Pre-select options with the <code>value</code> input.
        </p>
        <docs-code-block [code]="defaultValueDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With Angular forms</h3>
        <p class="docs-paragraph">
          Checkbox Group implements <code>ControlValueAccessor</code> for
          seamless forms integration.
        </p>
        <docs-code-block [code]="formsDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Select all checkbox</h3>
        <p class="docs-paragraph">
          Use the <code>allValues</code> input to implement "select all"
          functionality with a parent checkbox.
        </p>
        <docs-code-block [code]="selectAllDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Disable the entire group.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />
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
export class CheckboxGroupDocsComponent {
  protected readonly importCode = `import { CheckboxGroupDirective } from '@base-ng/ui/checkbox-group';
import {
  CheckboxRootDirective,
  CheckboxIndicatorDirective,
} from '@base-ng/ui/checkbox';

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

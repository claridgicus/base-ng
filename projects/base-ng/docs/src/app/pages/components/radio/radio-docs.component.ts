import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-radio',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Radio</h1>
        <p class="docs-description">
          A radio button control for selecting a single option from a group.
          Radio buttons must be used within a Radio Group to manage exclusive
          selection state.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Radio and Radio Group directives from the package:
        </p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          Radio buttons are composed of a root and an indicator within a group:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Create a radio group with exclusive selection.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With labels</h3>
        <p class="docs-paragraph">
          Radio buttons typically include descriptive labels.
        </p>
        <docs-code-block [code]="labeledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Default value</h3>
        <p class="docs-paragraph">
          Set an initial selected value with <code>[value]</code>.
        </p>
        <docs-code-block [code]="defaultValueDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With Angular forms</h3>
        <p class="docs-paragraph">
          Radio Group implements <code>ControlValueAccessor</code> for Angular forms.
        </p>
        <docs-code-block [code]="formsDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Disabled options</h3>
        <p class="docs-paragraph">
          Disable individual radio buttons or the entire group.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Keep indicator mounted</h3>
        <p class="docs-paragraph">
          Use <code>keepMounted</code> on the indicator for CSS transitions.
        </p>
        <docs-code-block [code]="keepMountedDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style radio buttons using data attributes for state-based styling:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style radios with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Radio.Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Radio.Indicator Inputs" [props]="indicatorInputProps" />
        <docs-props-table title="RadioGroup Inputs" [props]="groupInputProps" />
        <docs-props-table title="RadioGroup Outputs" [props]="groupOutputProps" />
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
          The Radio component follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>
            Uses native <code>role="radio"</code> and
            <code>role="radiogroup"</code> for proper semantics
          </li>
          <li>
            Sets <code>aria-checked</code> to communicate selection state
          </li>
          <li>
            Supports keyboard navigation with Space to select
          </li>
          <li>
            <strong>Required:</strong> Radio buttons must have accessible
            labels using a <code>&lt;label&gt;</code> element or Field component
          </li>
          <li>
            Disabled state sets <code>aria-disabled</code> for screen readers
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
export class RadioDocsComponent {
  protected readonly importCode = `import {
  RadioRootDirective,
  RadioIndicatorDirective,
} from '@base-ng/ui/radio';
import { RadioGroupDirective } from '@base-ng/ui/radio-group';

@Component({
  imports: [
    RadioRootDirective,
    RadioIndicatorDirective,
    RadioGroupDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiRadioGroup [(value)]="selected">
  <button baseUiRadioRoot value="option1">
    <span baseUiRadioIndicator></span>
    Option 1
  </button>
  <button baseUiRadioRoot value="option2">
    <span baseUiRadioIndicator></span>
    Option 2
  </button>
</div>`;

  protected readonly basicDemoCode = `<div baseUiRadioGroup [(value)]="selectedSize" class="radio-group">
  <button baseUiRadioRoot value="small" class="radio">
    <span baseUiRadioIndicator class="radio-indicator"></span>
    Small
  </button>
  <button baseUiRadioRoot value="medium" class="radio">
    <span baseUiRadioIndicator class="radio-indicator"></span>
    Medium
  </button>
  <button baseUiRadioRoot value="large" class="radio">
    <span baseUiRadioIndicator class="radio-indicator"></span>
    Large
  </button>
</div>`;

  protected readonly labeledDemoCode = `<div baseUiRadioGroup [(value)]="plan" class="radio-group">
  @for (option of plans; track option.value) {
    <label class="radio-label">
      <button baseUiRadioRoot [value]="option.value" class="radio">
        <span baseUiRadioIndicator class="radio-indicator"></span>
      </button>
      <div class="radio-content">
        <span class="radio-title">{{ option.name }}</span>
        <span class="radio-description">{{ option.description }}</span>
      </div>
    </label>
  }
</div>`;

  protected readonly defaultValueDemoCode = `<!-- Pre-select "medium" option -->
<div baseUiRadioGroup [value]="['medium']" (valueChange)="onSizeChange($event)">
  <button baseUiRadioRoot value="small">Small</button>
  <button baseUiRadioRoot value="medium">Medium</button>
  <button baseUiRadioRoot value="large">Large</button>
</div>`;

  protected readonly formsDemoCode = `@Component({
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div baseUiRadioGroup formControlName="priority">
        <button baseUiRadioRoot value="low">Low</button>
        <button baseUiRadioRoot value="medium">Medium</button>
        <button baseUiRadioRoot value="high">High</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  \`,
})
export class MyComponent {
  readonly form = new FormGroup({
    priority: new FormControl('medium'),
  });

  onSubmit(): void {
    console.log('Priority:', this.form.value.priority);
  }
}`;

  protected readonly disabledDemoCode = `<!-- Disable entire group -->
<div baseUiRadioGroup [(value)]="selected" [disabled]="true">
  <button baseUiRadioRoot value="a">Option A</button>
  <button baseUiRadioRoot value="b">Option B</button>
</div>

<!-- Disable individual option -->
<div baseUiRadioGroup [(value)]="selected">
  <button baseUiRadioRoot value="a">Option A</button>
  <button baseUiRadioRoot value="b" [disabled]="true">Option B (disabled)</button>
  <button baseUiRadioRoot value="c">Option C</button>
</div>`;

  protected readonly keepMountedDemoCode = `<!-- Keep indicator in DOM for CSS transitions -->
<button baseUiRadioRoot value="option">
  <span baseUiRadioIndicator [keepMounted]="true" class="radio-indicator">
    <!-- Indicator content (e.g., checkmark icon) -->
  </span>
  Option
</button>`;

  protected readonly stylingCode = `/* Radio group container */
.base-ui-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Radio button */
.radio {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
}

/* Radio indicator (the circle) */
.radio-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  position: relative;
  transition: all 0.15s;
}

/* Checked state */
[baseUiRadioRoot][data-checked] .radio-indicator {
  border-color: #0066ff;
}

[baseUiRadioRoot][data-checked] .radio-indicator::after {
  content: '';
  position: absolute;
  inset: 3px;
  background: #0066ff;
  border-radius: 50%;
}

/* Disabled state */
[baseUiRadioRoot][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
[baseUiRadioRoot]:focus-visible .radio-indicator {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}`;

  protected readonly tailwindCode = `<div
  baseUiRadioGroup
  [(value)]="selected"
  class="flex flex-col gap-2"
>
  <button
    baseUiRadioRoot
    value="option1"
    class="inline-flex items-center gap-2 text-left
           data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
  >
    <span
      baseUiRadioIndicator
      [keepMounted]="true"
      class="w-5 h-5 border-2 border-gray-300 rounded-full relative
             transition-all duration-150
             data-[checked]:border-blue-600
             after:absolute after:inset-[3px] after:rounded-full
             after:bg-blue-600 after:scale-0 after:transition-transform
             data-[checked]:after:scale-100"
    ></span>
    Option 1
  </button>
</div>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: 'required',
      description: 'Unique value identifying this radio button within the group.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether this radio button is disabled.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Whether this radio button is read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether this radio button is required.',
    },
  ];

  protected readonly indicatorInputProps: PropDefinition[] = [
    {
      name: 'keepMounted',
      type: 'boolean',
      default: 'false',
      description: 'Keep the indicator in DOM when unchecked (for CSS transitions).',
    },
  ];

  protected readonly groupInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Currently selected value. Supports two-way binding.',
    },
    {
      name: 'name',
      type: 'string',
      default: 'undefined',
      description: 'Name for form submission.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable the entire radio group.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Make the entire group read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Mark the group as required.',
    },
  ];

  protected readonly groupOutputProps: PropDefinition[] = [
    {
      name: 'valueChanged',
      type: 'EventEmitter<RadioGroupChangeEventDetails>',
      description: 'Emitted when the selected value changes.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-checked',
      type: 'string',
      description: 'Present when the radio is selected.',
    },
    {
      name: 'data-unchecked',
      type: 'string',
      description: 'Present when the radio is not selected.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the radio or group is disabled.',
    },
    {
      name: 'data-readonly',
      type: 'string',
      description: 'Present when the radio or group is read-only.',
    },
    {
      name: 'data-required',
      type: 'string',
      description: 'Present when the radio or group is required.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-radio',
      type: 'class',
      description: 'Applied to the radio root element.',
    },
    {
      name: 'base-ui-radio-checked',
      type: 'class',
      description: 'Applied when the radio is selected.',
    },
    {
      name: 'base-ui-radio-unchecked',
      type: 'class',
      description: 'Applied when the radio is not selected.',
    },
    {
      name: 'base-ui-radio-disabled',
      type: 'class',
      description: 'Applied when the radio is disabled.',
    },
    {
      name: 'base-ui-radio-indicator',
      type: 'class',
      description: 'Applied to the indicator element.',
    },
    {
      name: 'base-ui-radio-group',
      type: 'class',
      description: 'Applied to the radio group container.',
    },
  ];
}

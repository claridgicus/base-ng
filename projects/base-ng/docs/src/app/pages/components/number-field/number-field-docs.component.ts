import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  NumberFieldRootDirective,
  NumberFieldInputDirective,
  NumberFieldIncrementDirective,
  NumberFieldDecrementDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-number-field',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    NumberFieldRootDirective,
    NumberFieldInputDirective,
    NumberFieldIncrementDirective,
    NumberFieldDecrementDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Number Field</h1>
        <p class="docs-description">
          A numeric input component with increment/decrement buttons. Supports
          min/max constraints, step values, keyboard navigation, and auto-repeat
          on button hold.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-container">
            <div
              baseUiNumberFieldRoot
              [(value)]="quantity"
              [min]="0"
              [max]="99"
              class="demo-number-field"
            >
              <button baseUiNumberFieldDecrement class="demo-btn">−</button>
              <input baseUiNumberFieldInput class="demo-input" />
              <button baseUiNumberFieldIncrement class="demo-btn">+</button>
            </div>
            <span class="demo-status">Quantity: {{ quantity() }}</span>
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
          The Number Field uses a composition pattern with multiple directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">With step</h3>
        <p class="docs-paragraph">
          Configure step increment:
        </p>
        <docs-demo [code]="configuredDemoCode" language="html">
          <div class="demo-container">
            <div
              baseUiNumberFieldRoot
              [(value)]="amount"
              [min]="0"
              [max]="100"
              [step]="5"
              class="demo-number-field"
            >
              <button baseUiNumberFieldDecrement class="demo-btn">−</button>
              <input baseUiNumberFieldInput class="demo-input" />
              <button baseUiNumberFieldIncrement class="demo-btn">+</button>
            </div>
            <span class="demo-status">Amount: {{ amount() }} (step: 5)</span>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Disable the number field:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div class="demo-container">
            <div
              baseUiNumberFieldRoot
              [(value)]="disabledValue"
              [disabled]="isDisabled()"
              class="demo-number-field"
            >
              <button baseUiNumberFieldDecrement class="demo-btn">−</button>
              <input baseUiNumberFieldInput class="demo-input" />
              <button baseUiNumberFieldIncrement class="demo-btn">+</button>
            </div>
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
          The Number Field is unstyled by default. Style each part using CSS:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Number Field with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Root Outputs" [props]="rootOutputProps" />
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

      <!-- Keyboard Navigation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Keyboard navigation</h2>
        <docs-props-table [props]="keyboardNav" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Number Field follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>
            Input sets <code>aria-valuemin</code>, <code>aria-valuemax</code>,
            and <code>aria-valuenow</code> for screen readers
          </li>
          <li>
            Increment/decrement buttons have <code>aria-label</code> for
            clarity
          </li>
          <li>
            Buttons auto-disable at min/max bounds with
            <code>aria-disabled</code>
          </li>
          <li>Full keyboard navigation support</li>
          <li>
            <strong>Required:</strong> Use Field component or explicit labels
            for accessible naming
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/number-field/number-field-docs.component.ts"
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
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .demo-number-field {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      overflow: hidden;

      &[data-disabled] {
        opacity: 0.5;
        pointer-events: none;
      }

      &[data-focused] {
        border-color: var(--docs-accent, #0066ff);
        box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
      }
    }

    .demo-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--docs-bg-secondary, #f5f5f5);
      border: none;
      cursor: pointer;
      font-size: 1.25rem;
      color: var(--docs-text);
      transition: background 0.15s;

      &:hover:not([data-disabled]) {
        background: var(--docs-border);
      }

      &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .demo-input {
      width: 60px;
      height: 36px;
      padding: 0 8px;
      border: none;
      text-align: center;
      font-size: 0.875rem;
      font-variant-numeric: tabular-nums;
      background: var(--docs-bg);
      color: var(--docs-text);

      &:focus {
        outline: none;
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
    }
  `,
})
export class NumberFieldDocsComponent {
  // Basic demo
  protected readonly quantity = signal<number | null>(1);

  // Configured demo
  protected readonly amount = signal<number | null>(50);

  // Disabled demo
  protected readonly disabledValue = signal<number | null>(10);
  protected readonly isDisabled = signal(false);

  protected toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }

  protected readonly importCode = `import {
  NumberFieldRootDirective,
  NumberFieldInputDirective,
  NumberFieldIncrementDirective,
  NumberFieldDecrementDirective,
} from '@copied/base-ng';

@Component({
  imports: [
    NumberFieldRootDirective,
    NumberFieldInputDirective,
    NumberFieldIncrementDirective,
    NumberFieldDecrementDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiNumberFieldRoot [(value)]="quantity">
  <!-- Decrement button -->
  <button baseUiNumberFieldDecrement>-</button>

  <!-- Numeric input -->
  <input baseUiNumberFieldInput />

  <!-- Increment button -->
  <button baseUiNumberFieldIncrement>+</button>
</div>`;

  protected readonly basicDemoCode = `<div baseUiNumberFieldRoot [(value)]="quantity" class="number-field">
  <button baseUiNumberFieldDecrement class="number-btn">-</button>
  <input baseUiNumberFieldInput class="number-input" />
  <button baseUiNumberFieldIncrement class="number-btn">+</button>
</div>

<p>Quantity: {{ quantity() }}</p>`;

  protected readonly configuredDemoCode = `<div
  baseUiNumberFieldRoot
  [(value)]="amount"
  [min]="0"
  [max]="100"
  [step]="5"
>
  <button baseUiNumberFieldDecrement>-</button>
  <input baseUiNumberFieldInput />
  <button baseUiNumberFieldIncrement>+</button>
</div>`;

  protected readonly largeStepDemoCode = `<!-- Page Up/Down and Shift+Arrow increment by largeStep (25) -->
<div
  baseUiNumberFieldRoot
  [(value)]="percentage"
  [min]="0"
  [max]="100"
  [step]="1"
  [largeStep]="25"
>
  <button baseUiNumberFieldDecrement>-</button>
  <input baseUiNumberFieldInput />
  <button baseUiNumberFieldIncrement>+</button>
</div>`;

  protected readonly formsDemoCode = `@Component({
  template: \`
    <form [formGroup]="form">
      <label>
        Quantity
        <div baseUiNumberFieldRoot formControlName="quantity" [min]="1" [max]="99">
          <button baseUiNumberFieldDecrement>-</button>
          <input baseUiNumberFieldInput />
          <button baseUiNumberFieldIncrement>+</button>
        </div>
      </label>
    </form>
  \`,
})
export class MyComponent {
  readonly form = new FormGroup({
    quantity: new FormControl(1),
  });
}`;

  protected readonly fieldDemoCode = `<div baseUiFieldRoot name="quantity">
  <label baseUiFieldLabel>Quantity</label>
  <div baseUiNumberFieldRoot [(value)]="quantity" [min]="0" [max]="99">
    <button baseUiNumberFieldDecrement>-</button>
    <input baseUiNumberFieldInput />
    <button baseUiNumberFieldIncrement>+</button>
  </div>
  <span baseUiFieldDescription>Select a quantity between 0 and 99</span>
</div>`;

  protected readonly disabledDemoCode = `<div baseUiNumberFieldRoot [(value)]="count" [disabled]="true">
  <button baseUiNumberFieldDecrement>-</button>
  <input baseUiNumberFieldInput />
  <button baseUiNumberFieldIncrement>+</button>
</div>`;

  protected readonly stylingCode = `/* Container */
.number-field {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  overflow: hidden;
}

/* Buttons */
.number-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background 0.15s;
}

.number-btn:hover:not([disabled]) {
  background: #e5e5e5;
}

.number-btn[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Input */
.number-input {
  width: 60px;
  height: 36px;
  padding: 0 8px;
  border: none;
  text-align: center;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}

.number-input:focus {
  outline: none;
}

/* Disabled state */
[baseUiNumberFieldRoot][data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

/* Focused state */
[baseUiNumberFieldRoot][data-focused] {
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}`;

  protected readonly tailwindCode = `<div
  baseUiNumberFieldRoot
  [(value)]="quantity"
  [min]="0"
  [max]="99"
  class="inline-flex items-center border border-gray-200 rounded-md overflow-hidden
         data-[disabled]:opacity-50 data-[disabled]:pointer-events-none
         data-[focused]:border-blue-500 data-[focused]:ring-2 data-[focused]:ring-blue-500/20"
>
  <button
    baseUiNumberFieldDecrement
    class="w-9 h-9 flex items-center justify-center bg-gray-50 text-lg
           hover:bg-gray-100 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
  >
    -
  </button>
  <input
    baseUiNumberFieldInput
    class="w-16 h-9 px-2 text-center tabular-nums border-none focus:outline-none"
  />
  <button
    baseUiNumberFieldIncrement
    class="w-9 h-9 flex items-center justify-center bg-gray-50 text-lg
           hover:bg-gray-100 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
  >
    +
  </button>
</div>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'number | null',
      default: 'null',
      description: 'Current numeric value. Supports two-way binding.',
    },
    {
      name: 'min',
      type: 'number | undefined',
      default: 'undefined',
      description: 'Minimum allowed value.',
    },
    {
      name: 'max',
      type: 'number | undefined',
      default: 'undefined',
      description: 'Maximum allowed value.',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Value increment step.',
    },
    {
      name: 'largeStep',
      type: 'number',
      default: '10',
      description: 'Step for Page Up/Down and Shift+Arrow keys.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the number field is disabled.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the number field is read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the field is required.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'valueChanged',
      type: 'EventEmitter<NumberFieldChangeEventDetails>',
      description:
        'Emitted when value changes. Includes value and reason (input, increment, decrement, commit).',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the component is disabled.',
    },
    {
      name: 'data-readonly',
      type: 'string',
      description: 'Present when the component is read-only.',
    },
    {
      name: 'data-focused',
      type: 'string',
      description: 'Present when the input is focused.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-number-field',
      type: 'class',
      description: 'Applied to the root element.',
    },
    {
      name: 'base-ui-number-field-disabled',
      type: 'class',
      description: 'Applied when disabled.',
    },
    {
      name: 'base-ui-number-field-readonly',
      type: 'class',
      description: 'Applied when read-only.',
    },
    {
      name: 'base-ui-number-field-focused',
      type: 'class',
      description: 'Applied when focused.',
    },
    {
      name: 'base-ui-number-field-input',
      type: 'class',
      description: 'Applied to the input element.',
    },
    {
      name: 'base-ui-number-field-increment',
      type: 'class',
      description: 'Applied to the increment button.',
    },
    {
      name: 'base-ui-number-field-decrement',
      type: 'class',
      description: 'Applied to the decrement button.',
    },
  ];

  protected readonly keyboardNav: PropDefinition[] = [
    {
      name: 'Arrow Up',
      type: 'key',
      description: 'Increment value by step.',
    },
    {
      name: 'Arrow Down',
      type: 'key',
      description: 'Decrement value by step.',
    },
    {
      name: 'Shift + Arrow Up/Down',
      type: 'key',
      description: 'Increment/decrement by large step.',
    },
    {
      name: 'Page Up',
      type: 'key',
      description: 'Increment value by large step.',
    },
    {
      name: 'Page Down',
      type: 'key',
      description: 'Decrement value by large step.',
    },
    {
      name: 'Home',
      type: 'key',
      description: 'Set value to minimum (if defined).',
    },
    {
      name: 'End',
      type: 'key',
      description: 'Set value to maximum (if defined).',
    },
    {
      name: 'Enter',
      type: 'key',
      description: 'Commit the current input value.',
    },
  ];
}

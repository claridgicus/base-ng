import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-input',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Input</h1>
        <p class="docs-description">
          A native input element with styling hooks and Angular forms integration.
          The Input directive provides data attributes for state-based styling
          and works seamlessly with both template-driven and reactive forms.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Input directive from the package:
        </p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          Apply the directive to native input or textarea elements:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Use two-way binding with <code>[(value)]</code> for simple cases.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With ngModel</h3>
        <p class="docs-paragraph">
          The Input directive implements <code>ControlValueAccessor</code> for
          seamless Angular forms integration.
        </p>
        <docs-code-block [code]="ngModelDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Reactive forms</h3>
        <p class="docs-paragraph">
          Use with reactive forms and form controls.
        </p>
        <docs-code-block [code]="reactiveDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Validation state</h3>
        <p class="docs-paragraph">
          Use the <code>invalid</code> input to show validation errors.
        </p>
        <docs-code-block [code]="validationDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Disable the input using the <code>disabled</code> input.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Textarea</h3>
        <p class="docs-paragraph">
          The Input directive also works with textarea elements.
        </p>
        <docs-code-block [code]="textareaDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With Field component</h3>
        <p class="docs-paragraph">
          For complete form fields with labels and validation, combine with
          the Field component (see Field documentation).
        </p>
        <docs-code-block [code]="fieldDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Input directive is unstyled by default. Style based on data
          attributes for different states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Input with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Inputs" [props]="inputProps" />
        <docs-props-table title="Outputs" [props]="outputProps" />
        <docs-props-table title="Methods" [props]="methods" />
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
          The Input component follows accessibility best practices:
        </p>
        <ul class="docs-list">
          <li>
            <strong>Required:</strong> All inputs must have an accessible name
            using a <code>&lt;label&gt;</code> element or the Field component
          </li>
          <li>
            Sets <code>aria-invalid</code> when in invalid state for screen
            reader announcement
          </li>
          <li>
            Native input element ensures full keyboard accessibility
          </li>
          <li>
            Use descriptive placeholder text, but never as a substitute for labels
          </li>
          <li>
            Connect error messages to inputs using <code>aria-describedby</code>
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/input/input-docs.component.ts"
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
    }`,
})
export class InputDocsComponent {
  protected readonly importCode = `import { InputDirective } from '@base-ng/ui/input';

@Component({
  imports: [InputDirective],
  // ...
})`;

  protected readonly anatomyCode = `<!-- Input element -->
<input baseUiInput [(value)]="text" />

<!-- Textarea element -->
<textarea baseUiInput [(value)]="message"></textarea>`;

  protected readonly basicDemoCode = `<label>
  Username
  <input
    baseUiInput
    [(value)]="username"
    placeholder="Enter username"
  />
</label>`;

  protected readonly ngModelDemoCode = `<label>
  Email
  <input
    baseUiInput
    [(ngModel)]="email"
    type="email"
    placeholder="user@example.com"
  />
</label>`;

  protected readonly reactiveDemoCode = `@Component({
  template: \`
    <form [formGroup]="form">
      <label>
        Name
        <input baseUiInput formControlName="name" />
      </label>
      <label>
        Email
        <input baseUiInput formControlName="email" type="email" />
      </label>
    </form>
  \`,
})
export class MyComponent {
  readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}`;

  protected readonly validationDemoCode = `<label>
  Email
  <input
    baseUiInput
    [(ngModel)]="email"
    [invalid]="emailControl.invalid && emailControl.touched"
    type="email"
    #emailControl="ngModel"
    required
    email
  />
</label>
@if (emailControl.invalid && emailControl.touched) {
  <p class="error">Please enter a valid email address</p>
}`;

  protected readonly disabledDemoCode = `<label>
  Read-only field
  <input
    baseUiInput
    [value]="'Cannot edit this'"
    [disabled]="true"
  />
</label>`;

  protected readonly textareaDemoCode = `<label>
  Message
  <textarea
    baseUiInput
    [(value)]="message"
    placeholder="Enter your message..."
    rows="4"
  ></textarea>
</label>`;

  protected readonly fieldDemoCode = `<div baseUiFieldRoot>
  <label baseUiFieldLabel>Email Address</label>
  <div baseUiFieldControl>
    <input
      baseUiInput
      [(ngModel)]="email"
      type="email"
      required
    />
  </div>
  <span baseUiFieldDescription>
    We'll never share your email with anyone.
  </span>
  <span baseUiFieldError>
    Please enter a valid email address.
  </span>
</div>`;

  protected readonly stylingCode = `/* Base input styles */
input[baseUiInput],
textarea[baseUiInput] {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 0.375rem;
  transition: all 0.15s;
}

/* Focused state */
[baseUiInput][data-focused] {
  border-color: #0066ff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

/* Filled state (has content) */
[baseUiInput][data-filled] {
  border-color: #d1d5db;
}

/* Invalid state */
[baseUiInput][data-invalid] {
  border-color: #ef4444;
}

[baseUiInput][data-invalid][data-focused] {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Disabled state */
[baseUiInput][data-disabled] {
  background: #f5f5f5;
  color: #9ca3af;
  cursor: not-allowed;
}

/* Placeholder styling */
[baseUiInput]::placeholder {
  color: #9ca3af;
}`;

  protected readonly tailwindCode = `<input
  baseUiInput
  [(value)]="username"
  placeholder="Enter username"
  class="w-full px-3 py-2 text-sm border border-gray-200 rounded-md
         transition-all duration-150
         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
         data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500/20
         data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed
         placeholder:text-gray-400"
/>`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description:
        'The current input value. Supports two-way binding with [(value)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is disabled.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is in an invalid validation state.',
    },
  ];

  protected readonly outputProps: PropDefinition[] = [
    {
      name: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted when the value changes.',
    },
    {
      name: 'valueChangeDetails',
      type: 'EventEmitter<InputChangeEventDetails>',
      description:
        'Emitted with full event details including the original DOM event.',
    },
  ];

  protected readonly methods: PropDefinition[] = [
    {
      name: 'focus()',
      type: 'void',
      description: 'Focus the input element.',
    },
    {
      name: 'blur()',
      type: 'void',
      description: 'Blur the input element.',
    },
    {
      name: 'select()',
      type: 'void',
      description: 'Select all text in the input.',
    },
    {
      name: 'setSelectionRange(start, end, direction?)',
      type: 'void',
      description: 'Set the text selection range.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the input is disabled.',
    },
    {
      name: 'data-focused',
      type: 'string',
      description: 'Present when the input is focused.',
    },
    {
      name: 'data-filled',
      type: 'string',
      description: 'Present when the input has a value.',
    },
    {
      name: 'data-invalid',
      type: 'string',
      description: 'Present when the input is in invalid state.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-input',
      type: 'class',
      description: 'Applied to all input instances.',
    },
    {
      name: 'base-ui-input-disabled',
      type: 'class',
      description: 'Applied when the input is disabled.',
    },
    {
      name: 'base-ui-input-focused',
      type: 'class',
      description: 'Applied when the input is focused.',
    },
    {
      name: 'base-ui-input-filled',
      type: 'class',
      description: 'Applied when the input has a value.',
    },
    {
      name: 'base-ui-input-invalid',
      type: 'class',
      description: 'Applied when the input is in invalid state.',
    },
  ];
}

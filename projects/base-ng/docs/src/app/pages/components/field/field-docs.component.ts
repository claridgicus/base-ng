import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  FieldRootDirective,
  FieldLabelDirective,
  FieldControlDirective,
  FieldDescriptionDirective,
  FieldErrorDirective,
} from '@base-ng/ui';
import { InputDirective } from '@base-ng/ui';

@Component({
  selector: 'docs-field',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    FieldRootDirective,
    FieldLabelDirective,
    FieldControlDirective,
    FieldDescriptionDirective,
    FieldErrorDirective,
    InputDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Field</h1>
        <p class="docs-description">
          A compound component that provides labeling, description, and validation
          for form controls. Field automatically associates labels with controls,
          displays validation errors, and manages accessibility attributes.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div baseUiFieldRoot name="username" class="demo-field">
            <label baseUiFieldLabel class="demo-label">Username</label>
            <input
              baseUiInput
              baseUiFieldControl
              placeholder="Enter username"
              class="demo-input"
            />
            <p baseUiFieldDescription class="demo-description">
              Choose a unique username for your account.
            </p>
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
          The Field component uses a composition pattern with multiple directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">With validation error</h3>
        <p class="docs-paragraph">
          Show validation errors when the field is invalid:
        </p>
        <docs-demo [code]="validationDemoCode" language="html">
          <div baseUiFieldRoot name="email" class="demo-field">
            <label baseUiFieldLabel class="demo-label">Email</label>
            <input
              baseUiInput
              baseUiFieldControl
              type="email"
              [(value)]="emailValue"
              [invalid]="isInvalidEmail()"
              placeholder="Enter email"
              class="demo-input"
            />
            @if (isInvalidEmail()) {
              <span baseUiFieldError class="demo-error">
                Please enter a valid email address.
              </span>
            }
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Required field</h3>
        <p class="docs-paragraph">
          Create a required field with visual indicator:
        </p>
        <docs-demo [code]="requiredDemoCode" language="html">
          <div baseUiFieldRoot name="fullName" class="demo-field">
            <label baseUiFieldLabel class="demo-label">
              Full Name
              <span class="demo-required" aria-hidden="true">*</span>
            </label>
            <input
              baseUiInput
              baseUiFieldControl
              placeholder="Enter your name"
              class="demo-input"
            />
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Disabled field</h3>
        <p class="docs-paragraph">
          Disable the entire field including label styling:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div baseUiFieldRoot name="locked" [disabled]="true" class="demo-field">
            <label baseUiFieldLabel class="demo-label">Subscription Plan</label>
            <input
              baseUiInput
              baseUiFieldControl
              value="Premium"
              [disabled]="true"
              class="demo-input"
            />
            <p baseUiFieldDescription class="demo-description">
              Contact support to change your plan.
            </p>
          </div>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Field component is unstyled by default. Style each part using
          the provided CSS classes or data attributes:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Field with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Root Outputs" [props]="rootOutputProps" />
        <docs-props-table title="Error Inputs" [props]="errorInputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <p class="docs-paragraph">
          All Field parts expose the same data attributes for consistent styling:
        </p>
        <docs-props-table [props]="dataAttributes" />
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS classes</h2>
        <docs-props-table [props]="cssClasses" />
      </section>

      <!-- Validity States -->
      <section class="docs-section">
        <h2 class="docs-section-title">Validity states</h2>
        <p class="docs-paragraph">
          The <code>match</code> input on FieldError accepts these validity state keys:
        </p>
        <docs-props-table [props]="validityStates" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Field component follows accessibility best practices:
        </p>
        <ul class="docs-list">
          <li>
            Automatically associates labels with controls via <code>for</code>
            and <code>id</code> attributes
          </li>
          <li>
            Connects descriptions and errors to controls via
            <code>aria-describedby</code>
          </li>
          <li>
            Error messages use <code>role="alert"</code> and
            <code>aria-live="polite"</code> for screen reader announcement
          </li>
          <li>
            Sets <code>aria-invalid</code> on controls when validation fails
          </li>
          <li>
            Disabled state propagates to all child components
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/field/field-docs.component.ts"
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
    .demo-field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
      max-width: 300px;
    }

    .demo-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);

      &[data-disabled] {
        color: var(--docs-text-secondary);
      }

      &[data-invalid] {
        color: #ef4444;
      }
    }

    .demo-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      color: var(--docs-text);

      &::placeholder {
        color: var(--docs-text-secondary);
      }

      &[data-focused] {
        border-color: var(--docs-accent, #0066ff);
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
      }

      &[data-invalid] {
        border-color: #ef4444;
      }

      &[data-disabled] {
        background: var(--docs-bg-secondary);
        color: var(--docs-text-secondary);
        cursor: not-allowed;
      }
    }

    .demo-description {
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
      margin: 0;
    }

    .demo-error {
      font-size: 0.75rem;
      color: #ef4444;
    }

    .demo-required {
      color: #ef4444;
      margin-left: 0.25rem;
    }
  `,
})
export class FieldDocsComponent {
  protected readonly emailValue = signal('invalid-email');

  protected isInvalidEmail(): boolean {
    const email = this.emailValue();
    return email.length > 0 && !email.includes('@');
  }
  protected readonly importCode = `import {
  FieldRootDirective,
  FieldLabelDirective,
  FieldControlDirective,
  FieldDescriptionDirective,
  FieldErrorDirective,
} from '@base-ng/ui/field';

@Component({
  imports: [
    FieldRootDirective,
    FieldLabelDirective,
    FieldControlDirective,
    FieldDescriptionDirective,
    FieldErrorDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiFieldRoot [name]="'email'">
  <!-- Label automatically linked to control -->
  <label baseUiFieldLabel>Email Address</label>

  <!-- Form control (input, textarea, select, etc.) -->
  <input baseUiFieldControl type="email" />

  <!-- Optional description text -->
  <p baseUiFieldDescription>
    We'll never share your email with anyone.
  </p>

  <!-- Error message (shown when invalid) -->
  <span baseUiFieldError>
    Please enter a valid email address.
  </span>
</div>`;

  protected readonly basicDemoCode = `<div baseUiFieldRoot name="username">
  <label baseUiFieldLabel>Username</label>
  <input baseUiFieldControl placeholder="Enter username" />
  <p baseUiFieldDescription>
    Choose a unique username for your account.
  </p>
</div>`;

  protected readonly validationDemoCode = `<div baseUiFieldRoot name="email">
  <label baseUiFieldLabel>Email</label>
  <input
    baseUiFieldControl
    type="email"
    required
    [(ngModel)]="email"
    #emailControl="ngModel"
  />
  @if (emailControl.touched && emailControl.invalid) {
    <span baseUiFieldError>
      Please enter a valid email address.
    </span>
  }
</div>`;

  protected readonly matchErrorDemoCode = `<div baseUiFieldRoot name="email">
  <label baseUiFieldLabel>Email</label>
  <input
    baseUiFieldControl
    type="email"
    required
    pattern=".*@example\\.com$"
  />
  <!-- Show different messages for different validation failures -->
  <span baseUiFieldError match="valueMissing">
    Email is required.
  </span>
  <span baseUiFieldError match="typeMismatch">
    Please enter a valid email format.
  </span>
  <span baseUiFieldError match="patternMismatch">
    Email must be from @example.com domain.
  </span>
</div>`;

  protected readonly requiredDemoCode = `<div baseUiFieldRoot name="fullName">
  <label baseUiFieldLabel>
    Full Name
    <span class="required-indicator" aria-hidden="true">*</span>
  </label>
  <input baseUiFieldControl required />
  <span baseUiFieldError>
    Full name is required.
  </span>
</div>`;

  protected readonly textareaDemoCode = `<div baseUiFieldRoot name="message">
  <label baseUiFieldLabel>Message</label>
  <textarea
    baseUiFieldControl
    rows="4"
    placeholder="Enter your message..."
  ></textarea>
  <p baseUiFieldDescription>
    Maximum 500 characters.
  </p>
</div>`;

  protected readonly disabledDemoCode = `<div baseUiFieldRoot name="lockedField" [disabled]="true">
  <label baseUiFieldLabel>Subscription Plan</label>
  <input baseUiFieldControl [value]="'Premium'" />
  <p baseUiFieldDescription>
    Contact support to change your plan.
  </p>
</div>`;

  protected readonly stylingCode = `/* Field container */
.base-ui-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

/* Label styling */
.base-ui-field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.base-ui-field-label-disabled {
  color: #9ca3af;
}

.base-ui-field-label-invalid {
  color: #ef4444;
}

/* Description styling */
[baseUiFieldDescription] {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Error styling */
.base-ui-field-error {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

/* Required indicator */
.required-indicator {
  color: #ef4444;
  margin-left: 0.25rem;
}`;

  protected readonly tailwindCode = `<div
  baseUiFieldRoot
  name="email"
  class="flex flex-col gap-1 mb-4"
>
  <label
    baseUiFieldLabel
    class="text-sm font-medium text-gray-700
           data-[disabled]:text-gray-400
           data-[invalid]:text-red-500"
  >
    Email Address
  </label>
  <input
    baseUiFieldControl
    type="email"
    class="px-3 py-2 border border-gray-200 rounded-md
           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
           data-[invalid]:border-red-500"
  />
  <p
    baseUiFieldDescription
    class="text-xs text-gray-500"
  >
    We'll never share your email.
  </p>
  <span
    baseUiFieldError
    class="text-xs text-red-500"
  >
    Please enter a valid email.
  </span>
</div>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'name',
      type: 'string',
      default: 'undefined',
      description: 'Field name for form submission.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the field is disabled.',
    },
    {
      name: 'validationMode',
      type: "'onSubmit' | 'onBlur' | 'onChange'",
      default: "'onBlur'",
      description: 'When to run validation.',
    },
    {
      name: 'validate',
      type: '(value: unknown) => string | string[] | null',
      default: 'undefined',
      description: 'Custom validation function.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'validityChange',
      type: 'EventEmitter<FieldValidityData | null>',
      description: 'Emitted when the validity state changes.',
    },
  ];

  protected readonly errorInputProps: PropDefinition[] = [
    {
      name: 'match',
      type: 'ValidityStateKey | boolean',
      default: 'undefined',
      description:
        'Match a specific validity state to show this error. If not provided, shows when field is invalid.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the field is disabled.',
    },
    {
      name: 'data-touched',
      type: 'string',
      description: 'Present after the control has been focused and blurred.',
    },
    {
      name: 'data-dirty',
      type: 'string',
      description: 'Present after the value has been changed.',
    },
    {
      name: 'data-valid',
      type: 'string',
      description: 'Present when the field is valid.',
    },
    {
      name: 'data-invalid',
      type: 'string',
      description: 'Present when the field is invalid.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-field',
      type: 'class',
      description: 'Applied to the root element.',
    },
    {
      name: 'base-ui-field-label',
      type: 'class',
      description: 'Applied to the label element.',
    },
    {
      name: 'base-ui-field-description',
      type: 'class',
      description: 'Applied to the description element.',
    },
    {
      name: 'base-ui-field-error',
      type: 'class',
      description: 'Applied to the error element.',
    },
    {
      name: 'base-ui-field-*-disabled',
      type: 'class',
      description: 'Applied when the field is disabled.',
    },
    {
      name: 'base-ui-field-*-invalid',
      type: 'class',
      description: 'Applied when the field is invalid.',
    },
  ];

  protected readonly validityStates: PropDefinition[] = [
    {
      name: 'valueMissing',
      type: 'ValidityStateKey',
      description: 'Required field has no value.',
    },
    {
      name: 'typeMismatch',
      type: 'ValidityStateKey',
      description: 'Value does not match the type (e.g., email, url).',
    },
    {
      name: 'patternMismatch',
      type: 'ValidityStateKey',
      description: 'Value does not match the pattern attribute.',
    },
    {
      name: 'tooLong',
      type: 'ValidityStateKey',
      description: 'Value exceeds maxlength.',
    },
    {
      name: 'tooShort',
      type: 'ValidityStateKey',
      description: 'Value is shorter than minlength.',
    },
    {
      name: 'rangeOverflow',
      type: 'ValidityStateKey',
      description: 'Value exceeds max attribute.',
    },
    {
      name: 'rangeUnderflow',
      type: 'ValidityStateKey',
      description: 'Value is less than min attribute.',
    },
    {
      name: 'stepMismatch',
      type: 'ValidityStateKey',
      description: 'Value does not match step attribute.',
    },
    {
      name: 'customError',
      type: 'ValidityStateKey',
      description: 'Custom validation function returned an error.',
    },
  ];
}

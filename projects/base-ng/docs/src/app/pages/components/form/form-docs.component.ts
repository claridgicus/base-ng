import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  FormRootDirective,
  FieldRootDirective,
  FieldLabelDirective,
  FieldControlDirective,
  FieldErrorDirective,
  type FormSubmitEventDetails,
} from '@base-ng/ui';

@Component({
  selector: 'docs-form',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    FormRootDirective,
    FieldRootDirective,
    FieldLabelDirective,
    FieldControlDirective,
    FieldErrorDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Form</h1>
        <p class="docs-description">
          A form container that provides validation mode context, error
          management, and submit handling. Works with native HTML validation and
          integrates seamlessly with Field and other form components.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <form
            baseUiFormRoot
            (formSubmit)="handleSubmit($event)"
            class="demo-form"
          >
            <div baseUiFieldRoot name="email" class="demo-field">
              <label baseUiFieldLabel class="demo-label">Email</label>
              <input
                baseUiFieldControl
                name="email"
                type="email"
                required
                class="demo-input"
              />
              <span baseUiFieldError match="valueMissing" class="demo-error">
                Email is required.
              </span>
              <span baseUiFieldError match="typeMismatch" class="demo-error">
                Please enter a valid email.
              </span>
            </div>
            <button type="submit" class="demo-submit">Submit</button>
          </form>
          @if (submitMessage()) {
            <span class="demo-status">{{ submitMessage() }}</span>
          }
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
          Apply the directive to a <code>&lt;form&gt;</code> element:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">With Field components</h3>
        <p class="docs-paragraph">
          Combine Form with Field for complete form structure:
        </p>
        <docs-code-block [code]="fieldsDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Validation modes</h3>
        <p class="docs-paragraph">
          Control when validation runs:
        </p>
        <docs-code-block [code]="validationModeDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Programmatic control</h3>
        <p class="docs-paragraph">
          Submit and reset forms programmatically:
        </p>
        <docs-code-block [code]="programmaticDemoCode" language="typescript" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Form using data attributes for state-based styling:
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
        <p class="docs-paragraph">The Form component supports accessibility:</p>
        <ul class="docs-list">
          <li>
            Sets <code>novalidate</code> to allow custom validation UX
          </li>
          <li>
            On invalid submit, focuses the first invalid field automatically
          </li>
          <li>
            Works with native HTML validation attributes
            (<code>required</code>, <code>pattern</code>, etc.)
          </li>
          <li>
            Error messages are announced via ARIA when using Field components
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/form/form-docs.component.ts"
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
    .demo-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 280px;
    }

    .demo-field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .demo-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
    }

    .demo-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      color: var(--docs-text);
      transition: border-color 0.15s;

      &:focus {
        outline: none;
        border-color: var(--docs-accent, #0066ff);
        box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
      }

      &[data-invalid] {
        border-color: #ef4444;
      }
    }

    .demo-error {
      font-size: 0.75rem;
      color: #ef4444;
    }

    .demo-submit {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      background: var(--docs-accent, #0066ff);
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background 0.15s;

      &:hover {
        background: color-mix(in srgb, var(--docs-accent, #0066ff), black 10%);
      }
    }

    .demo-status {
      font-size: 0.75rem;
      color: #22c55e;
      margin-top: 0.5rem;
    }
  `,
})
export class FormDocsComponent {
  protected readonly submitMessage = signal('');

  protected handleSubmit(event: FormSubmitEventDetails): void {
    event.nativeEvent.preventDefault();
    this.submitMessage.set(`Submitted: ${JSON.stringify(event.values)}`);
    setTimeout(() => this.submitMessage.set(''), 3000);
  }

  protected readonly importCode = `import { FormRootDirective } from '@base-ng/ui';

@Component({
  imports: [FormRootDirective],
  // ...
})`;

  protected readonly anatomyCode = `<form baseUiFormRoot (formSubmit)="handleSubmit($event)">
  <!-- Form fields -->
  <input name="email" type="email" required />

  <!-- Submit button -->
  <button type="submit">Submit</button>
</form>`;

  protected readonly basicDemoCode = `@Component({
  template: \`
    <form baseUiFormRoot (formSubmit)="handleSubmit($event)" class="form">
      <label>
        Email
        <input name="email" type="email" required />
      </label>

      <label>
        Message
        <textarea name="message" required></textarea>
      </label>

      <button type="submit">Send</button>
    </form>
  \`,
})
export class MyComponent {
  handleSubmit(event: FormSubmitEventDetails): void {
    console.log('Form values:', event.values);
    // { email: 'user@example.com', message: 'Hello!' }
  }
}`;

  protected readonly fieldsDemoCode = `<form baseUiFormRoot (formSubmit)="handleSubmit($event)" class="form">
  <div baseUiFieldRoot name="email">
    <label baseUiFieldLabel>Email</label>
    <input baseUiFieldControl name="email" type="email" required />
    <span baseUiFieldError match="valueMissing">Email is required.</span>
    <span baseUiFieldError match="typeMismatch">Please enter a valid email.</span>
  </div>

  <div baseUiFieldRoot name="password">
    <label baseUiFieldLabel>Password</label>
    <input
      baseUiFieldControl
      name="password"
      type="password"
      required
      minlength="8"
    />
    <span baseUiFieldError match="valueMissing">Password is required.</span>
    <span baseUiFieldError match="tooShort">
      Password must be at least 8 characters.
    </span>
  </div>

  <button type="submit">Sign In</button>
</form>`;

  protected readonly validationModeDemoCode = `<!-- Validate on submit (default) -->
<form baseUiFormRoot validationMode="onSubmit">
  ...
</form>

<!-- Validate on blur -->
<form baseUiFormRoot validationMode="onBlur">
  ...
</form>

<!-- Validate on change -->
<form baseUiFormRoot validationMode="onChange">
  ...
</form>`;

  protected readonly serverErrorsDemoCode = `@Component({
  template: \`
    <form
      baseUiFormRoot
      #form="formRoot"
      (formSubmit)="handleSubmit($event, form)"
    >
      <div baseUiFieldRoot name="email">
        <label baseUiFieldLabel>Email</label>
        <input baseUiFieldControl name="email" type="email" required />
        <!-- Server error will appear here -->
        <span baseUiFieldError>{{ form.getError('email') }}</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  \`,
})
export class MyComponent {
  async handleSubmit(
    event: FormSubmitEventDetails,
    form: FormRootDirective
  ): Promise<void> {
    event.nativeEvent.preventDefault();

    try {
      await this.api.submit(event.values);
    } catch (error) {
      // Set server-side validation errors
      if (error.field === 'email') {
        form.setError('email', 'This email is already registered.');
      }
    }
  }
}`;

  protected readonly loadingDemoCode = `@Component({
  template: \`
    <form
      baseUiFormRoot
      #form="formRoot"
      (formSubmit)="handleSubmit($event, form)"
      [class.loading]="isSubmitting()"
    >
      <input name="email" type="email" required [disabled]="isSubmitting()" />

      <button type="submit" [disabled]="isSubmitting()">
        @if (isSubmitting()) {
          Submitting...
        } @else {
          Submit
        }
      </button>
    </form>
  \`,
})
export class MyComponent {
  readonly isSubmitting = signal(false);

  async handleSubmit(
    event: FormSubmitEventDetails,
    form: FormRootDirective
  ): Promise<void> {
    event.nativeEvent.preventDefault();
    this.isSubmitting.set(true);

    try {
      await this.api.submit(event.values);
      form.reset();
    } finally {
      this.isSubmitting.set(false);
    }
  }
}`;

  protected readonly programmaticDemoCode = `@Component({
  template: \`
    <form baseUiFormRoot #form="formRoot" (formSubmit)="handleSubmit($event)">
      <input name="search" />
    </form>

    <!-- External buttons -->
    <button (click)="form.submit()">Submit</button>
    <button (click)="form.reset()">Reset</button>
  \`,
})
export class MyComponent {
  handleSubmit(event: FormSubmitEventDetails): void {
    console.log('Submitted:', event.values);
  }
}`;

  protected readonly stylingCode = `/* Form container */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}

/* Submitting state */
[baseUiFormRoot][data-submitting] {
  opacity: 0.7;
  pointer-events: none;
}

/* After first submit attempt */
[baseUiFormRoot][data-submitted] :invalid {
  border-color: #ef4444;
}

/* Loading overlay */
.form.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  cursor: wait;
}`;

  protected readonly tailwindCode = `<form
  baseUiFormRoot
  (formSubmit)="handleSubmit($event)"
  class="flex flex-col gap-4 max-w-md
         data-[submitting]:opacity-70 data-[submitting]:pointer-events-none"
>
  <div baseUiFieldRoot name="email" class="flex flex-col gap-1">
    <label baseUiFieldLabel class="text-sm font-medium">Email</label>
    <input
      baseUiFieldControl
      name="email"
      type="email"
      required
      class="px-3 py-2 border border-gray-200 rounded-md
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
             data-[invalid]:border-red-500"
    />
    <span baseUiFieldError class="text-xs text-red-500">
      Please enter a valid email.
    </span>
  </div>

  <button
    type="submit"
    class="px-4 py-2 bg-blue-600 text-white rounded-md
           hover:bg-blue-700 disabled:opacity-50"
  >
    Submit
  </button>
</form>`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'validationMode',
      type: "'onSubmit' | 'onBlur' | 'onChange'",
      default: "'onSubmit'",
      description: 'When validation should run for Field children.',
    },
  ];

  protected readonly outputProps: PropDefinition[] = [
    {
      name: 'formSubmit',
      type: 'EventEmitter<FormSubmitEventDetails>',
      description:
        'Emitted when form is submitted. Contains values object and nativeEvent.',
    },
    {
      name: 'formReset',
      type: 'EventEmitter<void>',
      description: 'Emitted when form is reset.',
    },
  ];

  protected readonly methods: PropDefinition[] = [
    {
      name: 'submit()',
      type: 'void',
      description: 'Programmatically submit the form.',
    },
    {
      name: 'reset()',
      type: 'void',
      description: 'Programmatically reset the form.',
    },
    {
      name: 'setError(name, error)',
      type: 'void',
      description: 'Set error message for a field.',
    },
    {
      name: 'clearError(name)',
      type: 'void',
      description: 'Clear error for a specific field.',
    },
    {
      name: 'clearAllErrors()',
      type: 'void',
      description: 'Clear all form errors.',
    },
    {
      name: 'getError(name)',
      type: 'string | string[] | undefined',
      description: 'Get error message for a field.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-submitting',
      type: 'string',
      description: 'Present while form is being submitted.',
    },
    {
      name: 'data-submitted',
      type: 'string',
      description: 'Present after form has been submitted at least once.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-form',
      type: 'class',
      description: 'Applied to the form element.',
    },
    {
      name: 'base-ui-form-submitting',
      type: 'class',
      description: 'Applied while submitting.',
    },
    {
      name: 'base-ui-form-submitted',
      type: 'class',
      description: 'Applied after first submission.',
    },
  ];
}

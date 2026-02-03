import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent
} from '../../../shared';

@Component({
  selector: 'docs-forms',
  imports: [EditOnGitHubComponent, CodeBlockComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Forms</h1>
        <p class="docs-description">
          Integrate Base NG components with Angular's reactive forms and
          template-driven forms for accessible, validated form experiences.
        </p>
      </header>

      <!-- Overview -->
      <section class="docs-section">
        <h2 class="docs-section-title">Overview</h2>
        <p class="docs-paragraph">
          Base NG form components implement Angular's <code>ControlValueAccessor</code>
          interface, enabling seamless integration with both reactive forms and
          template-driven forms. Components automatically handle accessibility
          requirements like labeling and error announcements.
        </p>
      </section>

      <!-- Template-driven Forms -->
      <section class="docs-section">
        <h2 class="docs-section-title">Template-driven Forms</h2>
        <p class="docs-paragraph">
          Use <code>ngModel</code> for simple two-way binding:
        </p>
        <docs-code-block [code]="templateDrivenCode" language="html" />
      </section>

      <!-- Reactive Forms -->
      <section class="docs-section">
        <h2 class="docs-section-title">Reactive Forms</h2>
        <p class="docs-paragraph">
          Use <code>formControl</code> or <code>formControlName</code> for
          reactive form integration:
        </p>
        <docs-code-block [code]="reactiveFormsCode" language="typescript" />
      </section>

      <!-- Field Component -->
      <section class="docs-section">
        <h2 class="docs-section-title">Field Component</h2>
        <p class="docs-paragraph">
          Use the Field component to provide labels, descriptions, and error
          messages with proper accessibility:
        </p>
        <docs-code-block [code]="fieldComponentCode" language="html" />
        <p class="docs-paragraph">
          The Field component automatically:
        </p>
        <ul class="docs-list">
          <li>Associates labels with inputs via <code>aria-labelledby</code></li>
          <li>Links descriptions via <code>aria-describedby</code></li>
          <li>Announces errors to screen readers</li>
          <li>Shows/hides error messages based on validity</li>
        </ul>
      </section>

      <!-- Validation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Validation</h2>
        <p class="docs-paragraph">
          Use Angular's built-in validators or create custom validators:
        </p>

        <h3 class="docs-section-subtitle">Built-in validators</h3>
        <docs-code-block [code]="builtInValidatorsCode" language="typescript" />

        <h3 class="docs-section-subtitle">Custom validators</h3>
        <docs-code-block [code]="customValidatorsCode" language="typescript" />

        <h3 class="docs-section-subtitle">Async validators</h3>
        <docs-code-block [code]="asyncValidatorsCode" language="typescript" />
      </section>

      <!-- Error Handling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Error Handling</h2>
        <p class="docs-paragraph">
          Display validation errors based on form control state:
        </p>
        <docs-code-block [code]="errorHandlingCode" language="html" />
      </section>

      <!-- Fieldset for Groups -->
      <section class="docs-section">
        <h2 class="docs-section-title">Fieldset for Groups</h2>
        <p class="docs-paragraph">
          Group related controls with Fieldset for proper accessibility:
        </p>
        <docs-code-block [code]="fieldsetCode" language="html" />
      </section>

      <!-- Form Submission -->
      <section class="docs-section">
        <h2 class="docs-section-title">Form Submission</h2>
        <p class="docs-paragraph">
          Handle form submission with validation:
        </p>
        <docs-code-block [code]="formSubmissionCode" language="typescript" />
      </section>

      <!-- Form State -->
      <section class="docs-section">
        <h2 class="docs-section-title">Form State</h2>
        <p class="docs-paragraph">
          Access form and control state for UI feedback:
        </p>
        <docs-code-block [code]="formStateCode" language="html" />
      </section>

      <!-- Best Practices -->
      <section class="docs-section">
        <h2 class="docs-section-title">Best Practices</h2>
        <ul class="docs-list">
          <li>
            <strong>Always provide labels</strong> - Every form control needs
            an accessible name via Field.Label or aria-label.
          </li>
          <li>
            <strong>Show errors at the right time</strong> - Wait until the
            field is touched or the form is submitted before showing errors.
          </li>
          <li>
            <strong>Use Fieldset for groups</strong> - Radio groups, checkbox
            groups, and related fields should be in a Fieldset with a legend.
          </li>
          <li>
            <strong>Provide helpful error messages</strong> - Tell users how
            to fix the error, not just that it's invalid.
          </li>
          <li>
            <strong>Mark required fields</strong> - Use the required attribute
            and visually indicate required fields.
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/handbook/forms/forms.component.ts"
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
export class FormsComponent {
  protected readonly templateDrivenCode = `<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <div baseUiFieldRoot>
    <label baseUiFieldLabel>Email</label>
    <input
      baseUiInput
      type="email"
      [(ngModel)]="user.email"
      name="email"
      required
      email
    />
    <span baseUiFieldError>Please enter a valid email</span>
  </div>

  <div baseUiFieldRoot>
    <label baseUiFieldLabel>Notifications</label>
    <button
      baseUiSwitchRoot
      [(ngModel)]="user.notifications"
      name="notifications"
    >
      <span baseUiSwitchThumb></span>
    </button>
    <span baseUiFieldDescription>
      Receive email notifications
    </span>
  </div>

  <button type="submit">Save</button>
</form>`;

  protected readonly reactiveFormsCode = `import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldDirectives } from '@base-ng/ui/field';
import { InputDirective } from '@base-ng/ui/input';
import { SwitchDirectives } from '@base-ng/ui/switch';

@Component({
  imports: [
    ReactiveFormsModule,
    FieldDirectives,
    InputDirective,
    SwitchDirectives
  ],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div baseUiFieldRoot>
        <label baseUiFieldLabel>Username</label>
        <input
          baseUiInput
          formControlName="username"
        />
        <span baseUiFieldError>Username is required</span>
      </div>

      <div baseUiFieldRoot>
        <label baseUiFieldLabel>Dark Mode</label>
        <button baseUiSwitchRoot formControlName="darkMode">
          <span baseUiSwitchThumb></span>
        </button>
      </div>

      <button type="submit" [disabled]="form.invalid">
        Save
      </button>
    </form>
  \`
})
export class SettingsFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    darkMode: [false]
  });

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}`;

  protected readonly fieldComponentCode = `<div baseUiFieldRoot>
  <!-- Label automatically linked to input -->
  <label baseUiFieldLabel>
    Email address
    <span class="required">*</span>
  </label>

  <!-- Input receives aria-labelledby and aria-describedby -->
  <input
    baseUiInput
    type="email"
    [formControl]="emailControl"
    required
  />

  <!-- Description linked via aria-describedby -->
  <span baseUiFieldDescription>
    We'll never share your email with anyone.
  </span>

  <!-- Error shown when control is invalid and touched -->
  <span baseUiFieldError>
    Please enter a valid email address.
  </span>
</div>`;

  protected readonly builtInValidatorsCode = `import { Validators } from '@angular/forms';

form = this.fb.group({
  email: ['', [
    Validators.required,
    Validators.email
  ]],
  password: ['', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*\\d)/)
  ]],
  age: [null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]],
  website: ['', [
    Validators.pattern(/^https?:\\/\\//)
  ]]
});`;

  protected readonly customValidatorsCode = `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Synchronous validator
function noWhitespace(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasWhitespace = /\\s/.test(control.value);
    return hasWhitespace ? { whitespace: true } : null;
  };
}

// Validator with parameters
function matchField(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherField = control.parent?.get(fieldName);
    if (!otherField) return null;

    return control.value === otherField.value
      ? null
      : { mismatch: { expected: fieldName } };
  };
}

// Usage
form = this.fb.group({
  username: ['', [Validators.required, noWhitespace()]],
  password: ['', Validators.required],
  confirmPassword: ['', [Validators.required, matchField('password')]]
});`;

  protected readonly asyncValidatorsCode = `import { AsyncValidatorFn } from '@angular/forms';
import { map, catchError, of, debounceTime, switchMap, first } from 'rxjs';

// Async validator for checking username availability
function usernameAvailable(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(300),
      switchMap(value =>
        userService.checkUsername(value).pipe(
          map(available =>
            available ? null : { usernameTaken: true }
          ),
          catchError(() => of(null))
        )
      ),
      first()
    );
  };
}

// Usage
form = this.fb.group({
  username: ['',
    [Validators.required],
    [usernameAvailable(this.userService)]
  ]
});`;

  protected readonly errorHandlingCode = `<div baseUiFieldRoot>
  <label baseUiFieldLabel>Password</label>
  <input
    baseUiInput
    type="password"
    [formControl]="passwordControl"
  />

  <!-- Show specific error messages -->
  @if (passwordControl.errors && passwordControl.touched) {
    @if (passwordControl.errors['required']) {
      <span baseUiFieldError>Password is required</span>
    }
    @if (passwordControl.errors['minlength']) {
      <span baseUiFieldError>
        Password must be at least
        {{ passwordControl.errors['minlength'].requiredLength }}
        characters
      </span>
    }
    @if (passwordControl.errors['pattern']) {
      <span baseUiFieldError>
        Password must contain at least one uppercase letter and number
      </span>
    }
  }
</div>`;

  protected readonly fieldsetCode = `<!-- Group radio buttons -->
<fieldset baseUiFieldsetRoot>
  <legend baseUiFieldsetLegend>Notification Preference</legend>

  <div baseUiRadioGroup formControlName="notificationPref">
    <label>
      <input baseUiRadio value="all" /> All notifications
    </label>
    <label>
      <input baseUiRadio value="important" /> Important only
    </label>
    <label>
      <input baseUiRadio value="none" /> None
    </label>
  </div>
</fieldset>

<!-- Group related fields -->
<fieldset baseUiFieldsetRoot>
  <legend baseUiFieldsetLegend>Billing Address</legend>

  <div baseUiFieldRoot>
    <label baseUiFieldLabel>Street</label>
    <input baseUiInput formControlName="street" />
  </div>

  <div baseUiFieldRoot>
    <label baseUiFieldLabel>City</label>
    <input baseUiInput formControlName="city" />
  </div>

  <div baseUiFieldRoot>
    <label baseUiFieldLabel>Zip Code</label>
    <input baseUiInput formControlName="zip" />
  </div>
</fieldset>`;

  protected readonly formSubmissionCode = `@Component({
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <!-- Form fields... -->

      <div class="form-actions">
        <button
          type="submit"
          [disabled]="form.invalid || isSubmitting()"
        >
          @if (isSubmitting()) {
            Saving...
          } @else {
            Save Changes
          }
        </button>

        <button type="button" (click)="form.reset()">
          Reset
        </button>
      </div>
    </form>
  \`
})
export class MyFormComponent {
  isSubmitting = signal(false);

  async onSubmit(): Promise<void> {
    // Mark all fields as touched to show errors
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.isSubmitting.set(true);

    try {
      await this.apiService.saveData(this.form.value);
      this.notificationService.success('Saved successfully');
    } catch (error) {
      this.notificationService.error('Failed to save');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}`;

  protected readonly formStateCode = `<form [formGroup]="form">
  <div baseUiFieldRoot>
    <label baseUiFieldLabel>Username</label>
    <input
      baseUiInput
      formControlName="username"
      [class.is-invalid]="
        form.get('username')?.invalid &&
        form.get('username')?.touched
      "
      [class.is-valid]="
        form.get('username')?.valid &&
        form.get('username')?.touched
      "
    />
  </div>

  <!-- Form-level feedback -->
  @if (form.invalid && form.dirty) {
    <p class="form-error">
      Please fix the errors above before submitting.
    </p>
  }

  <!-- Control state indicators -->
  <p class="form-status">
    Form is {{ form.dirty ? 'modified' : 'pristine' }}
    and {{ form.valid ? 'valid' : 'invalid' }}
  </p>
</form>`;
}

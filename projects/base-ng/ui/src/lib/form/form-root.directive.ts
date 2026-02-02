/**
 * @fileoverview Angular port of Base UI Form
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/form/Form.tsx
 *
 * A form container with validation mode management.
 */

import {
  Directive,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FORM_CONTEXT,
  FormContext,
  FormErrors,
  FormSubmitEventDetails,
  FormValidationMode,
} from './form.types';

/**
 * Root directive for form component.
 * Provides validation context and error management.
 *
 * @example
 * ```html
 * <form baseUiFormRoot [validationMode]="'onBlur'" (formSubmit)="handleSubmit($event)">
 *   <input baseUiInput name="email" />
 *   <button type="submit">Submit</button>
 * </form>
 * ```
 */
@Directive({
  selector: '[baseUiFormRoot]',
  standalone: true,
  exportAs: 'formRoot',
  providers: [
    {
      provide: FORM_CONTEXT,
      useFactory: (directive: FormRootDirective): FormContext => ({
        validationMode: directive.validationMode(),
        errors: directive.errors(),
        submitting: directive.submitting(),
        submitted: directive.submitted(),
        validationModeSignal: directive.validationMode,
        errorsSignal: directive.errors,
        submittingSignal: directive.submitting,
        submittedSignal: directive.submitted,
        setError: directive.setError.bind(directive),
        clearError: directive.clearError.bind(directive),
        clearAllErrors: directive.clearAllErrors.bind(directive),
        getError: directive.getError.bind(directive),
      }),
      deps: [FormRootDirective],
    },
  ],
  host: {
    '[attr.novalidate]': '"novalidate"',
    '[attr.data-submitting]': 'submitting() ? "" : null',
    '[attr.data-submitted]': 'submitted() ? "" : null',
    '[class.base-ui-form]': 'true',
    '[class.base-ui-form-submitting]': 'submitting()',
    '[class.base-ui-form-submitted]': 'submitted()',
    '(submit)': 'handleSubmit($event)',
    '(reset)': 'handleReset($event)',
  },
})
export class FormRootDirective {
  private readonly elementRef = inject(ElementRef<HTMLFormElement>);

  /**
   * Validation mode.
   */
  readonly validationMode = input<FormValidationMode>('onSubmit');

  /**
   * External errors (e.g., from server).
   */
  readonly errors = signal<FormErrors>({});

  /**
   * Whether the form is submitting.
   */
  readonly submitting = signal(false);

  /**
   * Whether the form has been submitted.
   */
  readonly submitted = signal(false);

  /**
   * Event emitted on form submit.
   */
  readonly formSubmit = output<FormSubmitEventDetails>();

  /**
   * Event emitted on form reset.
   */
  readonly formReset = output<void>();

  /**
   * Set error for a field.
   */
  setError(name: string, error: string | string[] | undefined): void {
    this.errors.update(errors => ({
      ...errors,
      [name]: error,
    }));
  }

  /**
   * Clear error for a field.
   */
  clearError(name: string): void {
    this.errors.update(errors => {
      const { [name]: _, ...rest } = errors;
      return rest;
    });
  }

  /**
   * Clear all errors.
   */
  clearAllErrors(): void {
    this.errors.set({});
  }

  /**
   * Get error for a field.
   */
  getError(name: string): string | string[] | undefined {
    return this.errors()[name];
  }

  /**
   * Handle form submit.
   */
  protected handleSubmit(event: SubmitEvent): void {
    this.submitted.set(true);

    const form = this.elementRef.nativeElement;

    // Check native HTML validation
    if (!form.checkValidity()) {
      event.preventDefault();
      // Focus first invalid field
      const firstInvalid = form.querySelector(':invalid') as HTMLElement;
      firstInvalid?.focus();
      return;
    }

    // Get form values
    const formData = new FormData(form);
    const values: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      // Handle multiple values for same key (checkboxes, multi-select)
      if (key in values) {
        const existing = values[key];
        if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          values[key] = [existing, value];
        }
      } else {
        values[key] = value;
      }
    });

    // Emit submit event
    this.formSubmit.emit({
      values,
      nativeEvent: event,
    });
  }

  /**
   * Handle form reset.
   */
  protected handleReset(event: Event): void {
    this.submitted.set(false);
    this.clearAllErrors();
    this.formReset.emit();
  }

  /**
   * Programmatically submit the form.
   */
  submit(): void {
    this.elementRef.nativeElement.requestSubmit();
  }

  /**
   * Programmatically reset the form.
   */
  reset(): void {
    this.elementRef.nativeElement.reset();
  }
}

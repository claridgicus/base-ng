/**
 * @fileoverview Angular port of Base UI Form types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/form/FormContext.tsx
 */

import { InjectionToken, Signal } from '@angular/core';

/**
 * Form validation mode.
 */
export type FormValidationMode = 'onSubmit' | 'onBlur' | 'onChange';

/**
 * Form errors map.
 */
export type FormErrors = Record<string, string | string[] | undefined>;

/**
 * Form state.
 */
export interface FormState {
  /**
   * Current validation mode.
   */
  validationMode: FormValidationMode;

  /**
   * External errors from server/API.
   */
  errors: FormErrors;

  /**
   * Whether the form is currently submitting.
   */
  submitting: boolean;

  /**
   * Whether the form has been submitted at least once.
   */
  submitted: boolean;
}

/**
 * Form context for communication between form and fields.
 */
export interface FormContext extends FormState {
  /**
   * Signals for reactive state.
   */
  validationModeSignal: Signal<FormValidationMode>;
  errorsSignal: Signal<FormErrors>;
  submittingSignal: Signal<boolean>;
  submittedSignal: Signal<boolean>;

  /**
   * Set an error for a specific field.
   */
  setError: (name: string, error: string | string[] | undefined) => void;

  /**
   * Clear error for a specific field.
   */
  clearError: (name: string) => void;

  /**
   * Clear all errors.
   */
  clearAllErrors: () => void;

  /**
   * Get error for a specific field.
   */
  getError: (name: string) => string | string[] | undefined;
}

/**
 * Form submit event details.
 */
export interface FormSubmitEventDetails<T = unknown> {
  /**
   * Form values.
   */
  values: T;

  /**
   * Native form element.
   */
  nativeEvent: SubmitEvent;
}

/**
 * Injection token for form context.
 */
export const FORM_CONTEXT = new InjectionToken<FormContext>('FORM_CONTEXT');

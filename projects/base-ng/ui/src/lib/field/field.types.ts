/**
 * @fileoverview Angular port of Base UI Field types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/field/root/FieldRoot.tsx
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Field validity data based on HTML ValidityState plus custom errors.
 */
export interface FieldValidityData {
  /** Standard ValidityState properties */
  badInput: boolean;
  customError: boolean;
  patternMismatch: boolean;
  rangeOverflow: boolean;
  rangeUnderflow: boolean;
  stepMismatch: boolean;
  tooLong: boolean;
  tooShort: boolean;
  typeMismatch: boolean;
  valueMissing: boolean;
  valid: boolean;
  /** Custom error messages */
  errors: string[];
}

/**
 * Field validation mode.
 */
export type FieldValidationMode = 'onChange' | 'onBlur' | 'onSubmit';

/**
 * Field state containing validation and interaction status.
 */
export interface FieldState {
  disabled: boolean;
  touched: boolean;
  dirty: boolean;
  filled: boolean;
  focused: boolean;
  valid: boolean;
  validityData: FieldValidityData | null;
}

/**
 * Context provided by FieldRoot to child components.
 */
export interface FieldContext {
  /** Field name */
  name: Signal<string | undefined>;
  /** Whether the field is disabled */
  disabled: Signal<boolean>;
  /** Whether the field has been touched (blurred) */
  touched: Signal<boolean>;
  /** Whether the field value has changed */
  dirty: Signal<boolean>;
  /** Whether the field has a value */
  filled: Signal<boolean>;
  /** Whether the field is currently focused */
  focused: Signal<boolean>;
  /** Whether the field is valid */
  valid: Signal<boolean>;
  /** Detailed validity data */
  validityData: Signal<FieldValidityData | null>;
  /** Field state object */
  state: Signal<FieldState>;
  /** Control element ID */
  controlId: WritableSignal<string | undefined>;
  /** Label element ID */
  labelId: WritableSignal<string | undefined>;
  /** Description element ID */
  descriptionId: WritableSignal<string | undefined>;
  /** Error element ID */
  errorId: WritableSignal<string | undefined>;
  /** Set touched state */
  setTouched: (value: boolean) => void;
  /** Set dirty state */
  setDirty: (value: boolean) => void;
  /** Set filled state */
  setFilled: (value: boolean) => void;
  /** Set focused state */
  setFocused: (value: boolean) => void;
  /** Set validity data */
  setValidityData: (data: FieldValidityData | null) => void;
  /** Validate the field */
  validate: () => void;
}

/**
 * Injection token for FieldContext.
 */
export const FIELD_CONTEXT = new InjectionToken<FieldContext>('FIELD_CONTEXT');

/**
 * Default validity data (all valid).
 */
export const DEFAULT_VALIDITY_DATA: FieldValidityData = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: true,
  errors: [],
};

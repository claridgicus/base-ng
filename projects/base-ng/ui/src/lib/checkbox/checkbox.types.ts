/**
 * @fileoverview Angular port of Base UI Checkbox types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/checkbox/root/CheckboxRootContext.tsx
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Checkbox checked state type.
 */
export type CheckedState = boolean | 'indeterminate';

/**
 * Checkbox state.
 */
export interface CheckboxState {
  /**
   * Whether the checkbox is checked.
   */
  checked: boolean;

  /**
   * Whether the checkbox is disabled.
   */
  disabled: boolean;

  /**
   * Whether the checkbox is indeterminate.
   */
  indeterminate: boolean;

  /**
   * Whether the checkbox is read-only.
   */
  readOnly: boolean;

  /**
   * Whether the checkbox is required.
   */
  required: boolean;
}

/**
 * Checkbox context for communication between root and indicator.
 */
export interface CheckboxContext extends CheckboxState {
  /**
   * Signal for checked state.
   */
  checkedSignal: Signal<boolean>;

  /**
   * Signal for indeterminate state.
   */
  indeterminateSignal: Signal<boolean>;
}

/**
 * Checkbox change event details.
 */
export interface CheckboxChangeEventDetails {
  /**
   * The new checked value.
   */
  value: boolean;
}

/**
 * Checkbox change event reason.
 */
export type CheckboxChangeEventReason = 'click' | 'keyboard';

/**
 * Injection token for checkbox context.
 */
export const CHECKBOX_CONTEXT = new InjectionToken<CheckboxContext>(
  'CHECKBOX_CONTEXT'
);

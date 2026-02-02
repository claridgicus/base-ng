/**
 * @fileoverview Angular port of Base UI NumberField types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/root/NumberFieldRootContext.ts
 */

import { InjectionToken, Signal } from '@angular/core';

/**
 * Number field state.
 */
export interface NumberFieldState {
  /**
   * Current numeric value.
   */
  value: number | null;

  /**
   * Input display value (may differ from numeric value during editing).
   */
  inputValue: string;

  /**
   * Whether the field is disabled.
   */
  disabled: boolean;

  /**
   * Whether the field is read-only.
   */
  readOnly: boolean;

  /**
   * Whether the field is required.
   */
  required: boolean;

  /**
   * Whether the input is currently focused.
   */
  focused: boolean;

  /**
   * Whether a scrub interaction is active.
   */
  scrubbing: boolean;
}

/**
 * Number field context for communication between parts.
 */
export interface NumberFieldContext extends NumberFieldState {
  /**
   * Signals for reactive state.
   */
  valueSignal: Signal<number | null>;
  inputValueSignal: Signal<string>;
  disabledSignal: Signal<boolean>;
  readOnlySignal: Signal<boolean>;
  requiredSignal: Signal<boolean>;
  focusedSignal: Signal<boolean>;
  minSignal: Signal<number | undefined>;
  maxSignal: Signal<number | undefined>;
  stepSignal: Signal<number>;
  largeStepSignal: Signal<number>;

  /**
   * Set the numeric value.
   */
  setValue: (value: number | null) => void;

  /**
   * Set the input display value.
   */
  setInputValue: (value: string) => void;

  /**
   * Increment the value.
   */
  increment: (amount?: number) => void;

  /**
   * Decrement the value.
   */
  decrement: (amount?: number) => void;

  /**
   * Commit the current input value.
   */
  commitValue: () => void;

  /**
   * Set the focused state.
   */
  setFocused: (focused: boolean) => void;

  /**
   * Check if increment is allowed.
   */
  canIncrement: () => boolean;

  /**
   * Check if decrement is allowed.
   */
  canDecrement: () => boolean;
}

/**
 * Number field change event details.
 */
export interface NumberFieldChangeEventDetails {
  /**
   * The new numeric value.
   */
  value: number | null;

  /**
   * The reason for the change.
   */
  reason: 'input' | 'increment' | 'decrement' | 'commit';
}

/**
 * Injection token for number field context.
 */
export const NUMBER_FIELD_CONTEXT = new InjectionToken<NumberFieldContext>(
  'NUMBER_FIELD_CONTEXT'
);

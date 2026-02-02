/**
 * @fileoverview Angular port of Base UI Radio types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/radio/root/RadioRootContext.tsx
 */

import { InjectionToken, Signal } from '@angular/core';

/**
 * Radio state.
 */
export interface RadioState {
  /**
   * Whether the radio is checked.
   */
  checked: boolean;

  /**
   * Whether the radio is disabled.
   */
  disabled: boolean;

  /**
   * Whether the radio is read-only.
   */
  readOnly: boolean;

  /**
   * Whether the radio is required.
   */
  required: boolean;
}

/**
 * Radio context for communication between root and indicator.
 */
export interface RadioContext extends RadioState {
  /**
   * Signal for checked state.
   */
  checkedSignal: Signal<boolean>;
}

/**
 * Radio change event details.
 */
export interface RadioChangeEventDetails {
  /**
   * The value of the selected radio.
   */
  value: string;
}

/**
 * Injection token for radio context.
 */
export const RADIO_CONTEXT = new InjectionToken<RadioContext>(
  'RADIO_CONTEXT'
);

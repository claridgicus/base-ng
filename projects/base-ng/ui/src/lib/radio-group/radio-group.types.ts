/**
 * @fileoverview Angular port of Base UI RadioGroup types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/radio-group/RadioGroupContext.tsx
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Radio group state.
 */
export interface RadioGroupState {
  /**
   * Whether the group is disabled.
   */
  disabled: boolean;

  /**
   * Whether the group is read-only.
   */
  readOnly: boolean;

  /**
   * Whether the group is required.
   */
  required: boolean;
}

/**
 * Radio group context for communication between group and radio buttons.
 */
export interface RadioGroupContext {
  /**
   * Current selected value.
   */
  value: WritableSignal<string | undefined>;

  /**
   * Whether the group is disabled.
   */
  disabled: Signal<boolean>;

  /**
   * Whether the group is read-only.
   */
  readOnly: Signal<boolean>;

  /**
   * Whether the group is required.
   */
  required: Signal<boolean>;

  /**
   * Set the selected value.
   */
  setValue: (value: string) => void;

  /**
   * Name for the radio group.
   */
  name: Signal<string | undefined>;
}

/**
 * Radio group change event details.
 */
export interface RadioGroupChangeEventDetails {
  /**
   * The new selected value.
   */
  value: string;
}

/**
 * Injection token for radio group context.
 */
export const RADIO_GROUP_CONTEXT = new InjectionToken<RadioGroupContext>(
  'RADIO_GROUP_CONTEXT'
);

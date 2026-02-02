/**
 * @fileoverview Angular port of Base UI CheckboxGroup types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/checkbox-group/CheckboxGroupContext.tsx
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Checkbox group state.
 */
export interface CheckboxGroupState {
  /**
   * Whether the group is disabled.
   */
  disabled: boolean;
}

/**
 * Checkbox group context for communication between group and checkboxes.
 */
export interface CheckboxGroupContext {
  /**
   * Current selected values signal.
   */
  value: WritableSignal<string[]>;

  /**
   * Whether the group is disabled.
   */
  disabled: Signal<boolean>;

  /**
   * Add a value to the selection.
   */
  addValue: (value: string) => void;

  /**
   * Remove a value from the selection.
   */
  removeValue: (value: string) => void;

  /**
   * Toggle a value in the selection.
   */
  toggleValue: (value: string) => void;

  /**
   * Check if a value is selected.
   */
  isSelected: (value: string) => boolean;

  /**
   * All possible values (for parent checkbox).
   */
  allValues: Signal<string[]>;
}

/**
 * Checkbox group change event details.
 */
export interface CheckboxGroupChangeEventDetails {
  /**
   * The new selected values.
   */
  value: string[];
}

/**
 * Injection token for checkbox group context.
 */
export const CHECKBOX_GROUP_CONTEXT = new InjectionToken<CheckboxGroupContext>(
  'CHECKBOX_GROUP_CONTEXT'
);

/**
 * @fileoverview Angular port of Base UI CheckboxGroup types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/checkbox-group/CheckboxGroupContext.tsx
 */

import { InjectionToken, WritableSignal } from '@angular/core';

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
   * Current selected values.
   */
  value: WritableSignal<string[]>;

  /**
   * Whether the group is disabled.
   */
  disabled: () => boolean;

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
   * Whether all checkboxes should be indeterminate (for parent checkbox).
   */
  allValues: WritableSignal<string[]>;
}

/**
 * Injection token for checkbox group context.
 */
export const CHECKBOX_GROUP_CONTEXT = new InjectionToken<CheckboxGroupContext>(
  'CHECKBOX_GROUP_CONTEXT'
);

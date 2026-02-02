/**
 * @fileoverview Angular port of Base UI Combobox types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/root/ComboboxRootContext.ts
 */

import { InjectionToken, Signal, TemplateRef } from '@angular/core';
import type { TransitionStatus } from '../utils';

/**
 * Side for positioning
 */
export type ComboboxSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Alignment for positioning
 */
export type ComboboxAlign = 'start' | 'center' | 'end';

/**
 * Method used to open the combobox
 */
export type ComboboxOpenMethod = 'input' | 'trigger' | 'keyboard' | null;

/**
 * Combobox item metadata
 */
export interface ComboboxItemData<T = unknown> {
  value: T;
  label?: string;
  disabled?: boolean;
  element: HTMLElement | null;
}

/**
 * Filter function type
 */
export type ComboboxFilterFn<T> = (items: T[], inputValue: string) => T[];

/**
 * Default filter options
 */
export interface ComboboxFilterOptions {
  /** Whether to match case-sensitively */
  caseSensitive?: boolean;
  /** Where in the string to match ('start' | 'contains') */
  matchFrom?: 'start' | 'contains';
}

/**
 * State for the combobox root
 */
export interface ComboboxRootState<T = unknown> {
  /** Whether the combobox is open */
  open: boolean;
  /** The current value */
  value: T | T[] | null;
  /** The input value */
  inputValue: string;
  /** Whether the combobox is disabled */
  disabled: boolean;
  /** Whether the combobox is read-only */
  readOnly: boolean;
  /** Whether the combobox is required */
  required: boolean;
  /** Whether multiple selection is allowed */
  multiple: boolean;
}

/**
 * Context provided by ComboboxRoot
 */
export interface ComboboxRootContext<T = unknown> extends ComboboxRootState<T> {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for value */
  valueSignal: Signal<T | T[] | null>;
  /** Signal for input value */
  inputValueSignal: Signal<string>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Signal for read-only state */
  readOnlySignal: Signal<boolean>;
  /** Signal for required state */
  requiredSignal: Signal<boolean>;
  /** Signal for multiple selection */
  multipleSignal: Signal<boolean>;
  /** Method used to open */
  openMethodSignal: Signal<ComboboxOpenMethod>;
  /** Unique ID for the combobox */
  rootId: string;
  /** Open the combobox */
  setOpen: (open: boolean, method?: ComboboxOpenMethod) => void;
  /** Set the value */
  setValue: (value: T | T[] | null) => void;
  /** Set the input value */
  setInputValue: (value: string) => void;
  /** Toggle a value (for multiple selection) */
  toggleValue: (value: T) => void;
  /** Register an item */
  registerItem: (data: ComboboxItemData<T>) => void;
  /** Unregister an item */
  unregisterItem: (value: T) => void;
  /** Get all items */
  getItems: () => ComboboxItemData<T>[];
  /** Get filtered items */
  getFilteredItems: () => ComboboxItemData<T>[];
  /** Function to compare values */
  valueEquality: (a: T, b: T) => boolean;
  /** Function to convert item to string label */
  itemToStringLabel: (item: T) => string;
  /** Whether the combobox has a selected value */
  hasSelectedValue: () => boolean;
  /** Trigger element reference */
  triggerElement: Signal<HTMLElement | null>;
  /** Set trigger element */
  setTriggerElement: (element: HTMLElement | null) => void;
  /** Input element reference */
  inputElement: Signal<HTMLInputElement | null>;
  /** Set input element */
  setInputElement: (element: HTMLInputElement | null) => void;
  /** List element reference */
  listElement: Signal<HTMLElement | null>;
  /** Set list element */
  setListElement: (element: HTMLElement | null) => void;
  /** Highlighted item value */
  highlightedValue: Signal<T | null>;
  /** Set highlighted value */
  setHighlightedValue: (value: T | null) => void;
  /** Clear input and value */
  clear: () => void;
}

/**
 * State for the combobox trigger
 */
export interface ComboboxTriggerState {
  /** Whether the combobox is open */
  open: boolean;
  /** Whether the combobox is disabled */
  disabled: boolean;
  /** The current value */
  value: unknown;
}

/**
 * State for the combobox input
 */
export interface ComboboxInputState {
  /** Whether the combobox is open */
  open: boolean;
  /** Whether the combobox is disabled */
  disabled: boolean;
  /** The input value */
  inputValue: string;
}

/**
 * State for the combobox value display
 */
export interface ComboboxValueState<T = unknown> {
  /** The current value */
  value: T | T[] | null;
  /** Whether showing placeholder */
  placeholder: boolean;
}

/**
 * Context provided by ComboboxPositioner
 */
export interface ComboboxPositionerContext {
  /** The positioning side */
  side: ComboboxSide;
  /** The positioning alignment */
  align: ComboboxAlign;
}

/**
 * State for the combobox positioner
 */
export interface ComboboxPositionerState {
  /** Whether the combobox is open */
  open: boolean;
  /** The positioning side */
  side: ComboboxSide;
  /** The positioning alignment */
  align: ComboboxAlign;
  /** Whether the list is empty */
  empty: boolean;
}

/**
 * State for the combobox popup
 */
export interface ComboboxPopupState {
  /** Whether the combobox is open */
  open: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
  /** The positioning side */
  side: ComboboxSide;
  /** The positioning alignment */
  align: ComboboxAlign;
}

/**
 * State for the combobox list
 */
export interface ComboboxListState {
  /** Whether multiple selection is allowed */
  multiple: boolean;
  /** Whether the list is empty (no filtered results) */
  empty: boolean;
}

/**
 * Context provided by ComboboxItem
 */
export interface ComboboxItemContext<T = unknown> {
  /** The item's value */
  value: T;
  /** Whether the item is selected */
  selected: boolean;
  /** Whether the item is highlighted */
  highlighted: boolean;
  /** Whether the item is disabled */
  disabled: boolean;
}

/**
 * State for the combobox item
 */
export interface ComboboxItemState {
  /** Whether the item is selected */
  selected: boolean;
  /** Whether the item is highlighted */
  highlighted: boolean;
  /** Whether the item is disabled */
  disabled: boolean;
}

/**
 * State for the combobox item indicator
 */
export interface ComboboxItemIndicatorState {
  /** Whether the item is selected */
  selected: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
}

/**
 * Context provided by ComboboxGroup
 */
export interface ComboboxGroupContext {
  /** Label ID for the group */
  labelId: string | null;
  /** Set the label ID */
  setLabelId: (id: string) => void;
}

/**
 * State for the combobox empty indicator
 */
export interface ComboboxEmptyState {
  /** Whether the list is empty */
  empty: boolean;
}

/**
 * State for the combobox clear button
 */
export interface ComboboxClearState {
  /** Whether there's a value to clear */
  hasValue: boolean;
  /** Whether the combobox is disabled */
  disabled: boolean;
}

/**
 * Injection token for ComboboxRoot context
 */
export const COMBOBOX_ROOT_CONTEXT = new InjectionToken<ComboboxRootContext>(
  'COMBOBOX_ROOT_CONTEXT'
);

/**
 * Injection token for ComboboxPositioner context
 */
export const COMBOBOX_POSITIONER_CONTEXT = new InjectionToken<ComboboxPositionerContext>(
  'COMBOBOX_POSITIONER_CONTEXT'
);

/**
 * Injection token for ComboboxItem context
 */
export const COMBOBOX_ITEM_CONTEXT = new InjectionToken<ComboboxItemContext>(
  'COMBOBOX_ITEM_CONTEXT'
);

/**
 * Injection token for ComboboxGroup context
 */
export const COMBOBOX_GROUP_CONTEXT = new InjectionToken<ComboboxGroupContext>(
  'COMBOBOX_GROUP_CONTEXT'
);

/**
 * Default filter function - case-insensitive contains match
 */
export function defaultComboboxFilter<T>(
  items: ComboboxItemData<T>[],
  inputValue: string,
  itemToString: (item: T) => string,
  options: ComboboxFilterOptions = {}
): ComboboxItemData<T>[] {
  const { caseSensitive = false, matchFrom = 'contains' } = options;

  if (!inputValue) {
    return items;
  }

  const normalizedInput = caseSensitive ? inputValue : inputValue.toLowerCase();

  return items.filter((item) => {
    const label = item.label || itemToString(item.value);
    const normalizedLabel = caseSensitive ? label : label.toLowerCase();

    if (matchFrom === 'start') {
      return normalizedLabel.startsWith(normalizedInput);
    }
    return normalizedLabel.includes(normalizedInput);
  });
}

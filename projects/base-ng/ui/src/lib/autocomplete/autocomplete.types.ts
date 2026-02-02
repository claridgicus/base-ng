/**
 * @fileoverview Angular port of Base UI Autocomplete types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/autocomplete/root/AutocompleteRoot.tsx
 */

import { InjectionToken, Signal } from '@angular/core';

/**
 * Autocomplete operational modes:
 * - 'list': Shows filtered items only
 * - 'both': Shows filtered items with inline completion
 * - 'inline': Shows static items with inline completion
 * - 'none': Shows static items without filtering or completion
 */
export type AutocompleteMode = 'list' | 'both' | 'inline' | 'none';

/**
 * Methods that can trigger highlighting change.
 */
export type AutocompleteHighlightReason = 'keyboard' | 'pointer' | 'auto' | 'touch';

/**
 * Methods that can trigger value change.
 */
export type AutocompleteChangeReason =
  | 'selectOption'
  | 'removeOption'
  | 'clear'
  | 'blur'
  | 'createOption';

/**
 * Details provided with change events.
 */
export interface AutocompleteChangeDetails<T = unknown> {
  reason: AutocompleteChangeReason;
  value: T | T[] | null;
}

/**
 * Details provided with highlight events.
 */
export interface AutocompleteHighlightDetails<T = unknown> {
  reason: AutocompleteHighlightReason;
  value: T | null;
}

/**
 * Item data registered with the autocomplete.
 */
export interface AutocompleteItemData<T = unknown> {
  value: T;
  label?: string;
  disabled?: boolean;
  textValue?: string;
}

/**
 * Filter function signature.
 */
export type AutocompleteFilterFn<T = unknown> = (
  items: AutocompleteItemData<T>[],
  inputValue: string,
  itemToString: (value: T) => string,
  options?: AutocompleteFilterOptions
) => AutocompleteItemData<T>[];

/**
 * Options for the filter function.
 */
export interface AutocompleteFilterOptions {
  /**
   * Whether the filter is case-sensitive.
   * @default false
   */
  caseSensitive?: boolean;

  /**
   * Whether to match from the start of the string only.
   * @default false
   */
  startsWith?: boolean;
}

/**
 * State exposed by the autocomplete root.
 */
export interface AutocompleteRootState<T = unknown> {
  readonly rootId: string;
  readonly open: boolean;
  readonly value: T | T[] | null;
  readonly inputValue: string;
  readonly highlightedValue: T | null;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly multiple: boolean;
  readonly mode: AutocompleteMode;
  readonly inlineValue: string;
}

/**
 * Context provided by the autocomplete root for child components.
 */
export interface AutocompleteRootContext<T = unknown> extends AutocompleteRootState<T> {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for value */
  valueSignal: Signal<T | T[] | null>;
  /** Signal for input value */
  inputValueSignal: Signal<string>;
  /** Signal for highlighted value */
  highlightedValueSignal: Signal<T | null>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Signal for read-only state */
  readOnlySignal: Signal<boolean>;
  /** Signal for required state */
  requiredSignal: Signal<boolean>;
  /** Signal for multiple selection */
  multipleSignal: Signal<boolean>;
  /** Signal for mode */
  modeSignal: Signal<AutocompleteMode>;
  /** Signal for inline value (for inline completion) */
  inlineValueSignal: Signal<string>;

  /** Trigger element reference */
  triggerElement: Signal<HTMLElement | null>;
  /** Input element reference */
  inputElement: Signal<HTMLInputElement | null>;
  /** List element reference */
  listElement: Signal<HTMLElement | null>;

  /** Set the open state */
  setOpen: (open: boolean, reason?: string) => void;
  /** Set the selected value */
  setValue: (value: T | T[] | null) => void;
  /** Toggle a value in multiple mode */
  toggleValue: (value: T) => void;
  /** Set the input value */
  setInputValue: (value: string) => void;
  /** Set the highlighted value */
  setHighlightedValue: (value: T | null) => void;
  /** Set the inline value for completion */
  setInlineValue: (value: string) => void;
  /** Clear the selection and input */
  clear: () => void;

  /** Register an item */
  registerItem: (item: AutocompleteItemData<T>) => void;
  /** Unregister an item */
  unregisterItem: (value: T) => void;
  /** Get all items */
  getItems: () => AutocompleteItemData<T>[];
  /** Get filtered items based on mode and input */
  getFilteredItems: () => AutocompleteItemData<T>[];

  /** Set the trigger element */
  setTriggerElement: (element: HTMLElement | null) => void;
  /** Set the input element */
  setInputElement: (element: HTMLInputElement | null) => void;
  /** Set the list element */
  setListElement: (element: HTMLElement | null) => void;

  /** Check if the value is selected */
  isSelected: (value: T) => boolean;
  /** Check if a value equals another */
  valueEquality: (a: T, b: T) => boolean;
  /** Check if there's a selected value */
  hasSelectedValue: () => boolean;
  /** Get the display string for a value */
  getValueString: (value: T) => string;
}

/**
 * State for the autocomplete value component.
 */
export interface AutocompleteValueState {
  readonly inputValue: string;
}

/**
 * State for the autocomplete input.
 */
export interface AutocompleteInputState {
  readonly disabled: boolean;
  readonly open: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
}

/**
 * State for autocomplete positioner.
 */
export interface AutocompletePositionerState {
  readonly open: boolean;
  readonly side: 'top' | 'bottom';
  readonly align: 'start' | 'center' | 'end';
}

/**
 * State for autocomplete popup.
 */
export interface AutocompletePopupState {
  readonly open: boolean;
}

/**
 * State for autocomplete list.
 */
export interface AutocompleteListState {
  readonly open: boolean;
}

/**
 * State for autocomplete item.
 */
export interface AutocompleteItemState {
  readonly selected: boolean;
  readonly highlighted: boolean;
  readonly disabled: boolean;
}

/**
 * Default filter function for autocomplete.
 */
export function defaultAutocompleteFilter<T>(
  items: AutocompleteItemData<T>[],
  inputValue: string,
  itemToString: (value: T) => string,
  options: AutocompleteFilterOptions = {}
): AutocompleteItemData<T>[] {
  if (!inputValue) {
    return items;
  }

  const { caseSensitive = false, startsWith = false } = options;
  const normalizedInput = caseSensitive ? inputValue : inputValue.toLowerCase();

  return items.filter((item) => {
    const itemString = item.textValue ?? item.label ?? itemToString(item.value);
    const normalizedItem = caseSensitive ? itemString : itemString.toLowerCase();

    if (startsWith) {
      return normalizedItem.startsWith(normalizedInput);
    }
    return normalizedItem.includes(normalizedInput);
  });
}

/**
 * Injection token for the autocomplete root context.
 */
export const AUTOCOMPLETE_ROOT_CONTEXT = new InjectionToken<AutocompleteRootContext>(
  'AUTOCOMPLETE_ROOT_CONTEXT'
);

/**
 * Injection token for autocomplete positioner context.
 */
export const AUTOCOMPLETE_POSITIONER_CONTEXT = new InjectionToken<{
  side: Signal<'top' | 'bottom'>;
  align: Signal<'start' | 'center' | 'end'>;
}>('AUTOCOMPLETE_POSITIONER_CONTEXT');

/**
 * Injection token for autocomplete item context.
 */
export const AUTOCOMPLETE_ITEM_CONTEXT = new InjectionToken<{
  value: unknown;
  disabled: boolean;
}>('AUTOCOMPLETE_ITEM_CONTEXT');

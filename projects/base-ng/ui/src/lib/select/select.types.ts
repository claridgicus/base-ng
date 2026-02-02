/**
 * @fileoverview Angular port of Base UI Select types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/root/SelectRootContext.ts
 */

import { InjectionToken, Signal, TemplateRef } from '@angular/core';
import type { TransitionStatus } from '../utils';

/**
 * Orientation type for select
 */
export type SelectOrientation = 'horizontal' | 'vertical';

/**
 * Side for positioning
 */
export type SelectSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Alignment for positioning
 */
export type SelectAlign = 'start' | 'center' | 'end';

/**
 * Method used to open the select
 */
export type SelectOpenMethod = 'mouse' | 'keyboard' | 'touch' | null;

/**
 * Select item metadata
 */
export interface SelectItemData<T = unknown> {
  value: T;
  label?: string;
  disabled?: boolean;
  element: HTMLElement | null;
}

/**
 * State for the select root
 */
export interface SelectRootState<T = unknown> {
  /** Whether the select is open */
  open: boolean;
  /** The current value */
  value: T | T[] | null;
  /** Whether the select is disabled */
  disabled: boolean;
  /** Whether the select is read-only */
  readOnly: boolean;
  /** Whether the select is required */
  required: boolean;
  /** Whether multiple selection is allowed */
  multiple: boolean;
}

/**
 * Context provided by SelectRoot
 */
export interface SelectRootContext<T = unknown> extends SelectRootState<T> {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for value */
  valueSignal: Signal<T | T[] | null>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Signal for read-only state */
  readOnlySignal: Signal<boolean>;
  /** Signal for required state */
  requiredSignal: Signal<boolean>;
  /** Signal for multiple selection */
  multipleSignal: Signal<boolean>;
  /** Method used to open */
  openMethodSignal: Signal<SelectOpenMethod>;
  /** Unique ID for the select */
  rootId: string;
  /** Open the select */
  setOpen: (open: boolean, method?: SelectOpenMethod) => void;
  /** Set the value */
  setValue: (value: T | T[] | null) => void;
  /** Toggle a value (for multiple selection) */
  toggleValue: (value: T) => void;
  /** Register an item */
  registerItem: (data: SelectItemData<T>) => void;
  /** Unregister an item */
  unregisterItem: (value: T) => void;
  /** Get all items */
  getItems: () => SelectItemData<T>[];
  /** Function to compare values */
  valueEquality: (a: T, b: T) => boolean;
  /** Function to convert item to string label */
  itemToStringLabel: (item: T) => string;
  /** Whether the select has a selected value */
  hasSelectedValue: () => boolean;
  /** Trigger element reference */
  triggerElement: Signal<HTMLElement | null>;
  /** Set trigger element */
  setTriggerElement: (element: HTMLElement | null) => void;
  /** List element reference */
  listElement: Signal<HTMLElement | null>;
  /** Set list element */
  setListElement: (element: HTMLElement | null) => void;
  /** Highlighted item value */
  highlightedValue: Signal<T | null>;
  /** Set highlighted value */
  setHighlightedValue: (value: T | null) => void;
}

/**
 * State for the select trigger
 */
export interface SelectTriggerState {
  /** Whether the select is open */
  open: boolean;
  /** Whether the select is disabled */
  disabled: boolean;
  /** Whether the select is read-only */
  readOnly: boolean;
  /** The current value */
  value: unknown;
  /** Whether showing placeholder */
  placeholder: boolean;
}

/**
 * State for the select value display
 */
export interface SelectValueState<T = unknown> {
  /** The current value */
  value: T | T[] | null;
  /** Whether showing placeholder */
  placeholder: boolean;
}

/**
 * State for the select icon
 */
export interface SelectIconState {
  /** Whether the select is open */
  open: boolean;
}

/**
 * Context provided by SelectPositioner
 */
export interface SelectPositionerContext {
  /** Whether item alignment with trigger is active */
  alignItemWithTriggerActive: boolean;
  /** The positioning side */
  side: SelectSide;
  /** The positioning alignment */
  align: SelectAlign;
}

/**
 * State for the select positioner
 */
export interface SelectPositionerState {
  /** Whether the select is open */
  open: boolean;
  /** The positioning side */
  side: SelectSide;
  /** The positioning alignment */
  align: SelectAlign;
}

/**
 * State for the select popup
 */
export interface SelectPopupState {
  /** Whether the select is open */
  open: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
  /** The positioning side */
  side: SelectSide;
  /** The positioning alignment */
  align: SelectAlign;
}

/**
 * State for the select list
 */
export interface SelectListState {
  /** Whether multiple selection is allowed */
  multiple: boolean;
}

/**
 * Context provided by SelectItem
 */
export interface SelectItemContext<T = unknown> {
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
 * State for the select item
 */
export interface SelectItemState {
  /** Whether the item is selected */
  selected: boolean;
  /** Whether the item is highlighted */
  highlighted: boolean;
  /** Whether the item is disabled */
  disabled: boolean;
}

/**
 * State for the select item indicator
 */
export interface SelectItemIndicatorState {
  /** Whether the item is selected */
  selected: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
}

/**
 * State for the select item text
 */
export interface SelectItemTextState {
  /** Whether the item is selected */
  selected: boolean;
  /** Whether the item is highlighted */
  highlighted: boolean;
  /** Whether the item is disabled */
  disabled: boolean;
}

/**
 * Context provided by SelectGroup
 */
export interface SelectGroupContext {
  /** Label ID for the group */
  labelId: string | null;
  /** Set the label ID */
  setLabelId: (id: string) => void;
}

/**
 * State for the select group
 */
export interface SelectGroupState {}

/**
 * State for the select group label
 */
export interface SelectGroupLabelState {}

/**
 * State for the select arrow
 */
export interface SelectArrowState {
  /** Whether the select is open */
  open: boolean;
  /** The positioning side */
  side: SelectSide;
  /** The positioning alignment */
  align: SelectAlign;
  /** Whether the arrow is uncentered */
  uncentered: boolean;
}

/**
 * State for scroll arrows
 */
export interface SelectScrollArrowState {
  /** Whether the scroll arrow is visible */
  visible: boolean;
}

/**
 * State for the select backdrop
 */
export interface SelectBackdropState {
  /** Whether the select is open */
  open: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
}

/**
 * Injection token for SelectRoot context
 */
export const SELECT_ROOT_CONTEXT = new InjectionToken<SelectRootContext>(
  'SELECT_ROOT_CONTEXT'
);

/**
 * Injection token for SelectPositioner context
 */
export const SELECT_POSITIONER_CONTEXT = new InjectionToken<SelectPositionerContext>(
  'SELECT_POSITIONER_CONTEXT'
);

/**
 * Injection token for SelectItem context
 */
export const SELECT_ITEM_CONTEXT = new InjectionToken<SelectItemContext>(
  'SELECT_ITEM_CONTEXT'
);

/**
 * Injection token for SelectGroup context
 */
export const SELECT_GROUP_CONTEXT = new InjectionToken<SelectGroupContext>(
  'SELECT_GROUP_CONTEXT'
);

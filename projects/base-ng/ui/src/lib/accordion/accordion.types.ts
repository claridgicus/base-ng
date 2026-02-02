/**
 * @fileoverview Angular port of Base UI Accordion types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/root/AccordionRootContext.ts
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Accordion orientation.
 */
export type AccordionOrientation = 'horizontal' | 'vertical';

/**
 * Accordion state.
 */
export interface AccordionState {
  /**
   * Array of expanded item values.
   */
  value: string[];

  /**
   * Whether the accordion is disabled.
   */
  disabled: boolean;

  /**
   * Accordion orientation.
   */
  orientation: AccordionOrientation;

  /**
   * Whether multiple items can be expanded.
   */
  multiple: boolean;
}

/**
 * Accordion context for communication between root and items.
 */
export interface AccordionContext extends AccordionState {
  /**
   * Signals for reactive state.
   */
  valueSignal: Signal<string[]>;
  disabledSignal: Signal<boolean>;
  orientationSignal: Signal<AccordionOrientation>;

  /**
   * Check if an item is expanded.
   */
  isExpanded: (value: string) => boolean;

  /**
   * Toggle an item.
   */
  toggle: (value: string) => void;

  /**
   * Expand an item.
   */
  expand: (value: string) => void;

  /**
   * Collapse an item.
   */
  collapse: (value: string) => void;
}

/**
 * Accordion item state.
 */
export interface AccordionItemState {
  /**
   * Item value/identifier.
   */
  value: string;

  /**
   * Whether the item is expanded.
   */
  open: boolean;

  /**
   * Whether the item is disabled.
   */
  disabled: boolean;
}

/**
 * Accordion item context.
 */
export interface AccordionItemContext extends AccordionItemState {
  /**
   * Signals for reactive state.
   */
  openSignal: Signal<boolean>;
  disabledSignal: Signal<boolean>;

  /**
   * Toggle this item.
   */
  toggle: () => void;

  /**
   * Panel ID for aria-controls.
   */
  panelId: string;

  /**
   * Trigger ID for aria-labelledby.
   */
  triggerId: string;
}

/**
 * Accordion change event details.
 */
export interface AccordionChangeEventDetails {
  /**
   * New array of expanded item values.
   */
  value: string[];

  /**
   * The item that triggered the change.
   */
  changedItem: string;

  /**
   * Whether the item was expanded or collapsed.
   */
  action: 'expand' | 'collapse';
}

/**
 * Injection token for accordion context.
 */
export const ACCORDION_CONTEXT = new InjectionToken<AccordionContext>(
  'ACCORDION_CONTEXT'
);

/**
 * Injection token for accordion item context.
 */
export const ACCORDION_ITEM_CONTEXT = new InjectionToken<AccordionItemContext>(
  'ACCORDION_ITEM_CONTEXT'
);

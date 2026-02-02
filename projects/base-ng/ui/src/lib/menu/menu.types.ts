/**
 * @fileoverview Angular port of Base UI Menu types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/root/MenuRoot.tsx
 */

import { InjectionToken, type Signal } from '@angular/core';

/**
 * Reason for menu open state change.
 */
export type MenuOpenChangeReason =
  | 'trigger-press'
  | 'trigger-hover'
  | 'item-press'
  | 'escape-key'
  | 'outside-press'
  | 'tab-key'
  | 'imperative';

/**
 * State of the menu.
 */
export interface MenuState {
  /** Whether the menu is open */
  open: boolean;
}

/**
 * Event details for menu open state change.
 */
export interface MenuOpenChangeEventDetails {
  /** New open state */
  open: boolean;
  /** Reason for the change */
  reason: MenuOpenChangeReason;
}

/**
 * Context provided by the menu root.
 */
export interface MenuContext extends MenuState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Open the menu */
  openMenu: (reason?: MenuOpenChangeReason) => void;
  /** Close the menu */
  closeMenu: (reason?: MenuOpenChangeReason) => void;
  /** Set open with reason */
  setOpen: (open: boolean, reason?: MenuOpenChangeReason) => void;
  /** Trigger element */
  triggerElement: HTMLElement | null;
  /** Set trigger element */
  setTriggerElement: (element: HTMLElement | null) => void;
  /** Popup element */
  popupElement: HTMLElement | null;
  /** Set popup element */
  setPopupElement: (element: HTMLElement | null) => void;
  /** Title element ID */
  titleId: string | null;
  /** Title element ID signal */
  titleIdSignal: Signal<string | null>;
  /** Set title ID */
  setTitleId: (id: string | null) => void;
  /** Description element ID */
  descriptionId: string | null;
  /** Description element ID signal */
  descriptionIdSignal: Signal<string | null>;
  /** Set description ID */
  setDescriptionId: (id: string | null) => void;
  /** Root ID */
  rootId: string;
  /** Get trigger ID */
  getTriggerId: () => string;
  /** Get popup ID */
  getPopupId: () => string;
  /** Highlighted item index */
  highlightedIndex: number;
  /** Highlighted index signal */
  highlightedIndexSignal: Signal<number>;
  /** Set highlighted index */
  setHighlightedIndex: (index: number) => void;
  /** Active item ID */
  activeItemId: string | null;
  /** Active item ID signal */
  activeItemIdSignal: Signal<string | null>;
  /** Set active item ID */
  setActiveItemId: (id: string | null) => void;
  /** Register menu item */
  registerItem: (id: string, element: HTMLElement) => void;
  /** Unregister menu item */
  unregisterItem: (id: string) => void;
  /** Navigate to item */
  navigateToItem: (direction: 'next' | 'previous' | 'first' | 'last') => void;
}

/**
 * State of the menu popup.
 */
export interface MenuPopupState {
  /** Whether the popup is open */
  open: boolean;
  /** Side of popup relative to trigger */
  side: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment of popup */
  align: 'start' | 'center' | 'end';
}

/**
 * State of the menu item.
 */
export interface MenuItemState {
  /** Whether the item is disabled */
  disabled: boolean;
  /** Whether the item is highlighted */
  highlighted: boolean;
}

/**
 * State of the menu checkbox item.
 */
export interface MenuCheckboxItemState extends MenuItemState {
  /** Whether the item is checked */
  checked: boolean;
}

/**
 * State of the menu radio item.
 */
export interface MenuRadioItemState extends MenuItemState {
  /** Whether the item is checked */
  checked: boolean;
}

/**
 * Context provided by the menu radio group.
 */
export interface MenuRadioGroupContext {
  /** Current value */
  value: unknown;
  /** Value signal */
  valueSignal: Signal<unknown>;
  /** Set value */
  setValue: (value: unknown, reason?: string) => void;
  /** Whether the group is disabled */
  disabled: boolean;
}

/**
 * Context provided by the menu group.
 */
export interface MenuGroupContext {
  /** Label ID */
  labelId: string | null;
  /** Label ID signal */
  labelIdSignal: Signal<string | null>;
  /** Set label ID */
  setLabelId: (id: string | null) => void;
}

/**
 * Injection token for menu context.
 */
export const MENU_CONTEXT = new InjectionToken<MenuContext>('MENU_CONTEXT');

/**
 * Injection token for menu radio group context.
 */
export const MENU_RADIO_GROUP_CONTEXT = new InjectionToken<MenuRadioGroupContext>(
  'MENU_RADIO_GROUP_CONTEXT'
);

/**
 * Injection token for menu group context.
 */
export const MENU_GROUP_CONTEXT = new InjectionToken<MenuGroupContext>('MENU_GROUP_CONTEXT');

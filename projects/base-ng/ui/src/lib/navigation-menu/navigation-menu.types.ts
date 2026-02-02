/**
 * @fileoverview Angular port of Base UI Navigation Menu types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/root/NavigationMenuRootContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';
import type { TransitionStatus } from '../utils';

/**
 * Orientation of the navigation menu.
 */
export type NavigationMenuOrientation = 'horizontal' | 'vertical';

/**
 * Activation direction for animations.
 */
export type NavigationMenuActivationDirection = 'left' | 'right' | 'up' | 'down' | null;

/**
 * Reasons for closing the navigation menu.
 */
export type NavigationMenuChangeReason =
  | 'escape'
  | 'outside-press'
  | 'focus-out'
  | 'trigger-hover'
  | 'trigger-click'
  | 'trigger-press';

/**
 * Event details for value changes.
 */
export interface NavigationMenuChangeEventDetails {
  /** The reason for the change */
  reason?: NavigationMenuChangeReason;
  /** Whether the change was canceled */
  isCanceled?: boolean;
}

/**
 * State of the navigation menu.
 */
export interface NavigationMenuState {
  /** Whether any menu is open */
  open: boolean;
  /** The current value (which item is active) */
  value: string | null;
  /** Whether the menu is mounted */
  mounted: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
}

/**
 * Context provided by the navigation menu root.
 */
export interface NavigationMenuRootContext extends NavigationMenuState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for current value */
  valueSignal: Signal<string | null>;
  /** Signal for mounted state */
  mountedSignal: Signal<boolean>;
  /** Signal for transition status */
  transitionStatusSignal: Signal<TransitionStatus>;
  /** Set the value */
  setValue: (value: string | null, details?: NavigationMenuChangeEventDetails) => void;
  /** Set mounted state */
  setMounted: (mounted: boolean) => void;
  /** Positioner element reference */
  positionerElement: HTMLElement | null;
  /** Set positioner element */
  setPositionerElement: (element: HTMLElement | null) => void;
  /** Popup element reference */
  popupElement: HTMLElement | null;
  /** Set popup element */
  setPopupElement: (element: HTMLElement | null) => void;
  /** Viewport element reference */
  viewportElement: HTMLElement | null;
  /** Set viewport element */
  setViewportElement: (element: HTMLElement | null) => void;
  /** Viewport target element */
  viewportTargetElement: HTMLElement | null;
  /** Set viewport target element */
  setViewportTargetElement: (element: HTMLElement | null) => void;
  /** Activation direction */
  activationDirection: NavigationMenuActivationDirection;
  /** Signal for activation direction */
  activationDirectionSignal: Signal<NavigationMenuActivationDirection>;
  /** Set activation direction */
  setActivationDirection: (direction: NavigationMenuActivationDirection) => void;
  /** Whether the navigation menu is nested */
  nested: boolean;
  /** Root element reference */
  rootRef: HTMLElement | null;
  /** Orientation of the menu */
  orientation: NavigationMenuOrientation;
  /** Signal for orientation */
  orientationSignal: Signal<NavigationMenuOrientation>;
  /** Open delay in ms */
  delay: number;
  /** Close delay in ms */
  closeDelay: number;
  /** Whether the viewport should be inert */
  viewportInert: boolean;
  /** Set viewport inert state */
  setViewportInert: (inert: boolean) => void;
  /** Root ID for generating unique IDs */
  rootId: string;
  /** Register an item */
  registerItem: (value: string) => void;
  /** Unregister an item */
  unregisterItem: (value: string) => void;
}

/**
 * Context for navigation menu item.
 */
export interface NavigationMenuItemContext {
  /** The value of this item */
  value: string;
}

/**
 * State of navigation menu list.
 */
export interface NavigationMenuListState {
  /** Whether a menu is open */
  open: boolean;
}

/**
 * State of navigation menu content.
 */
export interface NavigationMenuContentState {
  /** Whether this content is open */
  open: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
  /** Activation direction for animations */
  activationDirection: NavigationMenuActivationDirection;
}

/**
 * State of navigation menu trigger.
 */
export interface NavigationMenuTriggerState {
  /** Whether this trigger's content is open */
  open: boolean;
}

/**
 * State of navigation menu popup.
 */
export interface NavigationMenuPopupState {
  /** Whether the popup is open */
  open: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
}

/**
 * State of navigation menu viewport.
 */
export interface NavigationMenuViewportState {
  /** Whether the viewport is open */
  open: boolean;
  /** Transition status */
  transitionStatus: TransitionStatus;
  /** Activation direction */
  activationDirection: NavigationMenuActivationDirection;
}

/**
 * Injection token for navigation menu root context.
 */
export const NAVIGATION_MENU_ROOT_CONTEXT = new InjectionToken<NavigationMenuRootContext>(
  'NAVIGATION_MENU_ROOT_CONTEXT',
);

/**
 * Injection token for navigation menu item context.
 */
export const NAVIGATION_MENU_ITEM_CONTEXT = new InjectionToken<NavigationMenuItemContext>(
  'NAVIGATION_MENU_ITEM_CONTEXT',
);

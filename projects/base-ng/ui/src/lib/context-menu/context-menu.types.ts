/**
 * @fileoverview Angular port of Base UI ContextMenu types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/context-menu/root/ContextMenuRoot.tsx
 */

import { InjectionToken, type Signal } from '@angular/core';
import type { MenuOpenChangeReason } from '../menu';

/**
 * Reason for context menu open state change.
 */
export type ContextMenuOpenChangeReason =
  | 'context-menu'
  | 'long-press'
  | 'escape-key'
  | 'outside-press'
  | 'item-press'
  | 'imperative';

/**
 * State of the context menu.
 */
export interface ContextMenuState {
  /** Whether the context menu is open */
  open: boolean;
}

/**
 * Event details for context menu open state change.
 */
export interface ContextMenuOpenChangeEventDetails {
  /** New open state */
  open: boolean;
  /** Reason for the change */
  reason: ContextMenuOpenChangeReason;
}

/**
 * Context provided by the context menu root.
 */
export interface ContextMenuContext extends ContextMenuState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Open the context menu at a position */
  openContextMenu: (x: number, y: number, reason?: ContextMenuOpenChangeReason) => void;
  /** Close the context menu */
  closeContextMenu: (reason?: ContextMenuOpenChangeReason) => void;
  /** Set open with reason */
  setOpen: (open: boolean, reason?: ContextMenuOpenChangeReason) => void;
  /** Current anchor X position */
  anchorX: number;
  /** Anchor X signal */
  anchorXSignal: Signal<number>;
  /** Current anchor Y position */
  anchorY: number;
  /** Anchor Y signal */
  anchorYSignal: Signal<number>;
  /** Trigger element */
  triggerElement: HTMLElement | null;
  /** Set trigger element */
  setTriggerElement: (element: HTMLElement | null) => void;
  /** Popup element */
  popupElement: HTMLElement | null;
  /** Set popup element */
  setPopupElement: (element: HTMLElement | null) => void;
  /** Root ID */
  rootId: string;
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
 * Injection token for context menu context.
 */
export const CONTEXT_MENU_CONTEXT = new InjectionToken<ContextMenuContext>('CONTEXT_MENU_CONTEXT');

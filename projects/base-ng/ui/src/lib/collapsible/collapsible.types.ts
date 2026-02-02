/**
 * @fileoverview Angular port of Base UI Collapsible types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/collapsible/root/CollapsibleRootContext.ts
 */

import { InjectionToken, Signal } from '@angular/core';

/**
 * Collapsible state.
 */
export interface CollapsibleState {
  /**
   * Whether the collapsible is open.
   */
  open: boolean;

  /**
   * Whether the collapsible is disabled.
   */
  disabled: boolean;
}

/**
 * Collapsible context for communication between parts.
 */
export interface CollapsibleContext extends CollapsibleState {
  /**
   * Signals for reactive state.
   */
  openSignal: Signal<boolean>;
  disabledSignal: Signal<boolean>;

  /**
   * Toggle the open state.
   */
  toggle: () => void;

  /**
   * Set the open state.
   */
  setOpen: (open: boolean, reason?: 'trigger-press' | 'programmatic') => void;

  /**
   * Unique ID for the panel (for aria-controls).
   */
  panelId: string;
}

/**
 * Collapsible change event details.
 */
export interface CollapsibleChangeEventDetails {
  /**
   * The new open state.
   */
  open: boolean;

  /**
   * The reason for the change.
   */
  reason: 'trigger-press' | 'programmatic';
}

/**
 * Injection token for collapsible context.
 */
export const COLLAPSIBLE_CONTEXT = new InjectionToken<CollapsibleContext>(
  'COLLAPSIBLE_CONTEXT'
);

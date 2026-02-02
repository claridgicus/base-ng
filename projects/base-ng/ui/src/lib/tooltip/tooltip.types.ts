/**
 * @fileoverview Angular port of Base UI Tooltip types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tooltip/root/TooltipRootContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';
import type { FloatingPlacement, Side, Alignment } from '../floating-ui';

/**
 * Reason for tooltip open state change.
 */
export type TooltipOpenChangeReason =
  | 'trigger-hover'
  | 'trigger-focus'
  | 'outside-press'
  | 'escape-key'
  | 'imperative';

/**
 * State of the tooltip.
 */
export interface TooltipState {
  /** Whether the tooltip is open */
  open: boolean;
  /** Whether the tooltip is disabled */
  disabled: boolean;
  /** The delay before opening (ms) */
  delay: number;
  /** The delay before closing (ms) */
  closeDelay: number;
}

/**
 * Event details for tooltip open state change.
 */
export interface TooltipOpenChangeEventDetails {
  /** New open state */
  open: boolean;
  /** Reason for the change */
  reason: TooltipOpenChangeReason;
}

/**
 * Context provided by the tooltip root.
 */
export interface TooltipContext extends TooltipState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Signal for delay */
  delaySignal: Signal<number>;
  /** Signal for close delay */
  closeDelaySignal: Signal<number>;
  /** Open the tooltip */
  openTooltip: (reason?: TooltipOpenChangeReason) => void;
  /** Close the tooltip */
  closeTooltip: (reason?: TooltipOpenChangeReason) => void;
  /** Toggle the tooltip */
  toggleTooltip: (reason?: TooltipOpenChangeReason) => void;
  /** Set open with reason */
  setOpen: (open: boolean, reason?: TooltipOpenChangeReason) => void;
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
  /** Get trigger ID */
  getTriggerId: () => string;
  /** Get popup ID */
  getPopupId: () => string;
}

/**
 * Context provided by the tooltip positioner.
 */
export interface TooltipPositionerContext {
  /** Actual side after positioning */
  side: Side;
  /** Actual alignment after positioning */
  align: Alignment | null;
  /** Whether the arrow is uncentered */
  arrowUncentered: boolean;
  /** Arrow styles */
  arrowStyles: Partial<CSSStyleDeclaration>;
}

/**
 * State of the tooltip popup.
 */
export interface TooltipPopupState {
  /** Whether the popup is open */
  open: boolean;
  /** Side of the popup */
  side: Side;
  /** Alignment of the popup */
  align: Alignment | null;
}

/**
 * State of the tooltip arrow.
 */
export interface TooltipArrowState {
  /** Whether open */
  open: boolean;
  /** Side */
  side: Side;
  /** Alignment */
  align: Alignment | null;
  /** Whether uncentered */
  uncentered: boolean;
}

/**
 * Injection token for tooltip context.
 */
export const TOOLTIP_CONTEXT = new InjectionToken<TooltipContext>('TOOLTIP_CONTEXT');

/**
 * Injection token for tooltip positioner context.
 */
export const TOOLTIP_POSITIONER_CONTEXT = new InjectionToken<TooltipPositionerContext>(
  'TOOLTIP_POSITIONER_CONTEXT'
);

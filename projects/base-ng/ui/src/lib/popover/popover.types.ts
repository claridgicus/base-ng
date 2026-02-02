/**
 * @fileoverview Angular port of Base UI Popover types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/root/PopoverRootContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';
import type { Side, Alignment } from '../floating-ui';

/**
 * Reason for popover open state change.
 */
export type PopoverOpenChangeReason =
  | 'trigger-press'
  | 'escape-key'
  | 'outside-press'
  | 'close-press'
  | 'hover'
  | 'focus'
  | 'imperative';

/**
 * State of the popover.
 */
export interface PopoverState {
  /** Whether the popover is open */
  open: boolean;
  /** Whether the popover is disabled */
  disabled: boolean;
}

/**
 * Event details for popover open state change.
 */
export interface PopoverOpenChangeEventDetails {
  /** New open state */
  open: boolean;
  /** Reason for the change */
  reason: PopoverOpenChangeReason;
}

/**
 * Context provided by the popover root.
 */
export interface PopoverContext extends PopoverState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Open the popover */
  openPopover: (reason?: PopoverOpenChangeReason) => void;
  /** Close the popover */
  closePopover: (reason?: PopoverOpenChangeReason) => void;
  /** Toggle the popover */
  togglePopover: (reason?: PopoverOpenChangeReason) => void;
  /** Set open with reason */
  setOpen: (open: boolean, reason?: PopoverOpenChangeReason) => void;
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
}

/**
 * Context provided by the popover positioner.
 */
export interface PopoverPositionerContext {
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
 * State of the popover popup.
 */
export interface PopoverPopupState {
  /** Whether the popup is open */
  open: boolean;
  /** Side of the popup */
  side: Side;
  /** Alignment of the popup */
  align: Alignment | null;
}

/**
 * State of the popover arrow.
 */
export interface PopoverArrowState {
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
 * Injection token for popover context.
 */
export const POPOVER_CONTEXT = new InjectionToken<PopoverContext>('POPOVER_CONTEXT');

/**
 * Injection token for popover positioner context.
 */
export const POPOVER_POSITIONER_CONTEXT = new InjectionToken<PopoverPositionerContext>(
  'POPOVER_POSITIONER_CONTEXT'
);

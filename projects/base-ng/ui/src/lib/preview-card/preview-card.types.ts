/**
 * @fileoverview Angular port of Base UI PreviewCard types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/root/PreviewCardContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';
import type { Side, Alignment } from '../floating-ui';

/**
 * Reason for preview card open state change.
 */
export type PreviewCardOpenChangeReason =
  | 'trigger-hover'
  | 'trigger-focus'
  | 'escape-key'
  | 'outside-press'
  | 'pointer-leave'
  | 'focus-leave'
  | 'imperative';

/**
 * State of the preview card.
 */
export interface PreviewCardState {
  /** Whether the preview card is open */
  open: boolean;
  /** Whether the preview card is disabled */
  disabled: boolean;
}

/**
 * Event details for preview card open state change.
 */
export interface PreviewCardOpenChangeEventDetails {
  /** New open state */
  open: boolean;
  /** Reason for the change */
  reason: PreviewCardOpenChangeReason;
}

/**
 * Context provided by the preview card root.
 */
export interface PreviewCardContext<T = unknown> extends PreviewCardState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Open the preview card */
  openPreviewCard: (reason?: PreviewCardOpenChangeReason) => void;
  /** Close the preview card */
  closePreviewCard: (reason?: PreviewCardOpenChangeReason) => void;
  /** Set open with reason */
  setOpen: (open: boolean, reason?: PreviewCardOpenChangeReason) => void;
  /** Trigger element */
  triggerElement: HTMLElement | null;
  /** Set trigger element */
  setTriggerElement: (element: HTMLElement | null) => void;
  /** Popup element */
  popupElement: HTMLElement | null;
  /** Set popup element */
  setPopupElement: (element: HTMLElement | null) => void;
  /** Delay before opening in ms */
  delay: number;
  /** Delay signal */
  delaySignal: Signal<number>;
  /** Delay before closing in ms */
  closeDelay: number;
  /** Close delay signal */
  closeDelaySignal: Signal<number>;
  /** Current payload */
  payload: T | null;
  /** Payload signal */
  payloadSignal: Signal<T | null>;
  /** Set payload */
  setPayload: (payload: T | null) => void;
  /** Root ID */
  rootId: string;
  /** Get trigger ID */
  getTriggerId: () => string;
  /** Get popup ID */
  getPopupId: () => string;
}

/**
 * Context provided by the preview card positioner.
 */
export interface PreviewCardPositionerContext {
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
 * State of the preview card popup.
 */
export interface PreviewCardPopupState {
  /** Whether the popup is open */
  open: boolean;
  /** Side of the popup */
  side: Side;
  /** Alignment of the popup */
  align: Alignment | null;
}

/**
 * State of the preview card arrow.
 */
export interface PreviewCardArrowState {
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
 * Injection token for preview card context.
 */
export const PREVIEW_CARD_CONTEXT = new InjectionToken<PreviewCardContext>('PREVIEW_CARD_CONTEXT');

/**
 * Injection token for preview card positioner context.
 */
export const PREVIEW_CARD_POSITIONER_CONTEXT = new InjectionToken<PreviewCardPositionerContext>(
  'PREVIEW_CARD_POSITIONER_CONTEXT'
);

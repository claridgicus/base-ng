/**
 * @fileoverview Angular port of Base UI AlertDialog types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/root/AlertDialogRoot.tsx
 *
 * AlertDialog is a modal dialog that interrupts the user with important content
 * and expects a response. Unlike Dialog, it cannot be dismissed by clicking outside
 * or pressing Escape (by default).
 */

import { InjectionToken, type Signal } from '@angular/core';

/**
 * Reason for alert dialog open state change.
 */
export type AlertDialogOpenChangeReason =
  | 'trigger-press'
  | 'close-press'
  | 'imperative';

/**
 * State of the alert dialog.
 */
export interface AlertDialogState {
  /** Whether the alert dialog is open */
  open: boolean;
}

/**
 * Event details for alert dialog open state change.
 */
export interface AlertDialogOpenChangeEventDetails {
  /** New open state */
  open: boolean;
  /** Reason for the change */
  reason: AlertDialogOpenChangeReason;
}

/**
 * Context provided by the alert dialog root.
 */
export interface AlertDialogContext extends AlertDialogState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Open the alert dialog */
  openAlertDialog: (reason?: AlertDialogOpenChangeReason) => void;
  /** Close the alert dialog */
  closeAlertDialog: (reason?: AlertDialogOpenChangeReason) => void;
  /** Set open with reason */
  setOpen: (open: boolean, reason?: AlertDialogOpenChangeReason) => void;
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
 * State of the alert dialog popup.
 */
export interface AlertDialogPopupState {
  /** Whether the popup is open */
  open: boolean;
}

/**
 * State of the alert dialog backdrop.
 */
export interface AlertDialogBackdropState {
  /** Whether open */
  open: boolean;
}

/**
 * Injection token for alert dialog context.
 */
export const ALERT_DIALOG_CONTEXT = new InjectionToken<AlertDialogContext>('ALERT_DIALOG_CONTEXT');

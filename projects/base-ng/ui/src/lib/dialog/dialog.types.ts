/**
 * @fileoverview Angular port of Base UI Dialog types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/root/DialogRootContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';

/**
 * Reason for dialog open state change.
 */
export type DialogOpenChangeReason =
  | 'trigger-press'
  | 'escape-key'
  | 'outside-press'
  | 'close-press'
  | 'imperative';

/**
 * State of the dialog.
 */
export interface DialogState {
  /** Whether the dialog is open */
  open: boolean;
  /** Whether the dialog is modal */
  modal: boolean;
}

/**
 * Event details for dialog open state change.
 */
export interface DialogOpenChangeEventDetails {
  /** New open state */
  open: boolean;
  /** Reason for the change */
  reason: DialogOpenChangeReason;
}

/**
 * Context provided by the dialog root.
 */
export interface DialogContext extends DialogState {
  /** Signal for open state */
  openSignal: Signal<boolean>;
  /** Signal for modal state */
  modalSignal: Signal<boolean>;
  /** Open the dialog */
  openDialog: (reason?: DialogOpenChangeReason) => void;
  /** Close the dialog */
  closeDialog: (reason?: DialogOpenChangeReason) => void;
  /** Set open with reason */
  setOpen: (open: boolean, reason?: DialogOpenChangeReason) => void;
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
 * State of the dialog popup.
 */
export interface DialogPopupState {
  /** Whether the popup is open */
  open: boolean;
  /** Whether the dialog is modal */
  modal: boolean;
}

/**
 * State of the dialog backdrop.
 */
export interface DialogBackdropState {
  /** Whether open */
  open: boolean;
}

/**
 * Injection token for dialog context.
 */
export const DIALOG_CONTEXT = new InjectionToken<DialogContext>('DIALOG_CONTEXT');

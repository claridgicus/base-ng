/**
 * @fileoverview Angular port of Base UI AlertDialogRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/root/AlertDialogRoot.tsx
 *
 * Groups all parts of the alert dialog. Always modal and cannot be dismissed
 * by clicking outside or pressing Escape.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  DestroyRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  ALERT_DIALOG_CONTEXT,
  type AlertDialogContext,
  type AlertDialogOpenChangeEventDetails,
  type AlertDialogOpenChangeReason,
} from './alert-dialog.types';

let alertDialogIdCounter = 0;

/**
 * Root directive for alert dialogs.
 * Alert dialogs require explicit user action to dismiss.
 * They cannot be closed by clicking outside or pressing Escape.
 *
 * @example
 * ```html
 * <ng-container baseUiAlertDialogRoot>
 *   <button baseUiAlertDialogTrigger>Delete</button>
 *   <div baseUiAlertDialogBackdrop></div>
 *   <div baseUiAlertDialogPopup role="alertdialog">
 *     <h2 baseUiAlertDialogTitle>Confirm Delete</h2>
 *     <p baseUiAlertDialogDescription>Are you sure? This cannot be undone.</p>
 *     <button baseUiAlertDialogClose>Cancel</button>
 *     <button (click)="onConfirm()">Delete</button>
 *   </div>
 * </ng-container>
 * ```
 */
@Directive({
  selector: '[baseUiAlertDialogRoot]',
  standalone: true,
  exportAs: 'alertDialogRoot',
  host: {
    '[class.base-ui-alert-dialog-root]': 'true',
  },
  providers: [
    {
      provide: ALERT_DIALOG_CONTEXT,
      useFactory: (directive: AlertDialogRootDirective) => directive.context,
      deps: [AlertDialogRootDirective],
    },
  ],
})
export class AlertDialogRootDirective {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  /** Unique ID for the alert dialog */
  readonly rootId = `base-ui-alert-dialog-${alertDialogIdCounter++}`;

  /**
   * The controlled open state of the alert dialog.
   */
  readonly open = model<boolean>(false);

  /**
   * The default open state when uncontrolled.
   */
  readonly defaultOpen = input(false, { transform: booleanAttribute });

  /**
   * Emits when the open state changes with detailed event info.
   */
  readonly openChanged = output<AlertDialogOpenChangeEventDetails>();

  /** Internal open state */
  private readonly internalOpen = signal(false);

  /** Trigger element */
  private readonly triggerElement = signal<HTMLElement | null>(null);

  /** Popup element */
  private readonly popupElement = signal<HTMLElement | null>(null);

  /** Title ID */
  private readonly titleId = signal<string | null>(null);

  /** Description ID */
  private readonly descriptionId = signal<string | null>(null);

  /** Previously focused element (for focus restoration) */
  private previouslyFocusedElement: HTMLElement | null = null;

  /** Context provided to children */
  readonly context: AlertDialogContext = {
    open: this.internalOpen(),
    openSignal: this.internalOpen,
    openAlertDialog: (reason?: AlertDialogOpenChangeReason) => this.setOpen(true, reason),
    closeAlertDialog: (reason?: AlertDialogOpenChangeReason) => this.setOpen(false, reason),
    setOpen: (open: boolean, reason?: AlertDialogOpenChangeReason) =>
      this.setOpen(open, reason),
    triggerElement: this.triggerElement(),
    setTriggerElement: (element: HTMLElement | null) =>
      this.triggerElement.set(element),
    popupElement: this.popupElement(),
    setPopupElement: (element: HTMLElement | null) =>
      this.popupElement.set(element),
    titleId: this.titleId(),
    titleIdSignal: this.titleId,
    setTitleId: (id: string | null) => this.titleId.set(id),
    descriptionId: this.descriptionId(),
    descriptionIdSignal: this.descriptionId,
    setDescriptionId: (id: string | null) => this.descriptionId.set(id),
    rootId: this.rootId,
    getTriggerId: () => `${this.rootId}-trigger`,
    getPopupId: () => `${this.rootId}-popup`,
  };

  constructor() {
    // Initialize with default open
    effect(() => {
      if (this.defaultOpen() && !this.internalOpen()) {
        this.internalOpen.set(true);
      }
    });

    // Sync model to internal state
    effect(() => {
      this.internalOpen.set(this.open());
    });

    // Handle open/close
    effect(() => {
      const isOpen = this.internalOpen();
      if (isOpen) {
        this.onOpen();
      } else {
        this.onClose();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.restoreFocus();
      // Restore body scroll
      this.document.body.style.overflow = '';
    });
  }

  /**
   * Get trigger ID.
   */
  getTriggerId(): string {
    return `${this.rootId}-trigger`;
  }

  /**
   * Get popup ID.
   */
  getPopupId(): string {
    return `${this.rootId}-popup`;
  }

  /**
   * Set the open state with a reason.
   */
  setOpen(open: boolean, reason: AlertDialogOpenChangeReason = 'imperative'): void {
    if (open === this.internalOpen()) {
      return;
    }

    this.internalOpen.set(open);
    this.open.set(open);

    this.openChanged.emit({
      open,
      reason,
    });
  }

  /**
   * Handle dialog open.
   */
  private onOpen(): void {
    // Save currently focused element
    this.previouslyFocusedElement = this.document.activeElement as HTMLElement;

    // Lock body scroll (always modal)
    this.document.body.style.overflow = 'hidden';
  }

  /**
   * Handle dialog close.
   */
  private onClose(): void {
    // Restore body scroll
    this.document.body.style.overflow = '';

    // Restore focus
    this.restoreFocus();
  }

  /**
   * Restore focus to previously focused element.
   */
  private restoreFocus(): void {
    if (this.previouslyFocusedElement && this.previouslyFocusedElement.focus) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }
}

/**
 * @fileoverview Angular port of Base UI DialogRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/root/DialogRoot.tsx
 *
 * Groups all parts of the dialog. Manages open state and provides context.
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
  DIALOG_CONTEXT,
  type DialogContext,
  type DialogOpenChangeEventDetails,
  type DialogOpenChangeReason,
} from './dialog.types';

let dialogIdCounter = 0;

/**
 * Root directive for dialogs.
 * Groups all parts and manages open state.
 *
 * @example
 * ```html
 * <ng-container baseUiDialogRoot>
 *   <button baseUiDialogTrigger>Open Dialog</button>
 *   <div baseUiDialogBackdrop></div>
 *   <div baseUiDialogPopup>
 *     <h2 baseUiDialogTitle>Dialog Title</h2>
 *     <p baseUiDialogDescription>Dialog description</p>
 *     <button baseUiDialogClose>Close</button>
 *   </div>
 * </ng-container>
 * ```
 */
@Directive({
  selector: '[baseUiDialogRoot]',
  standalone: true,
  exportAs: 'dialogRoot',
  host: {
    '[class.base-ui-dialog-root]': 'true',
  },
  providers: [
    {
      provide: DIALOG_CONTEXT,
      useFactory: (directive: DialogRootDirective) => directive.context,
      deps: [DialogRootDirective],
    },
  ],
})
export class DialogRootDirective {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  /** Unique ID for the dialog */
  readonly rootId = `base-ui-dialog-${dialogIdCounter++}`;

  /**
   * The controlled open state of the dialog.
   */
  readonly open = model<boolean>(false);

  /**
   * The default open state when uncontrolled.
   */
  readonly defaultOpen = input(false, { transform: booleanAttribute });

  /**
   * Whether the dialog is modal.
   * Modal dialogs prevent interaction with the rest of the page.
   */
  readonly modal = input(true, { transform: booleanAttribute });

  /**
   * Whether to close on outside click.
   */
  readonly closeOnOutsideClick = input(true, { transform: booleanAttribute });

  /**
   * Whether to close on escape key.
   */
  readonly closeOnEscape = input(true, { transform: booleanAttribute });

  /**
   * Emits when the open state changes with detailed event info.
   */
  readonly openChanged = output<DialogOpenChangeEventDetails>();

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
  readonly context: DialogContext = {
    open: this.internalOpen(),
    openSignal: this.internalOpen,
    modal: this.modal(),
    modalSignal: this.modal,
    openDialog: (reason?: DialogOpenChangeReason) => this.setOpen(true, reason),
    closeDialog: (reason?: DialogOpenChangeReason) => this.setOpen(false, reason),
    setOpen: (open: boolean, reason?: DialogOpenChangeReason) =>
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

  private clickListener: ((event: MouseEvent) => void) | null = null;
  private keydownListener: ((event: KeyboardEvent) => void) | null = null;

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

    // Set up outside click, escape handlers, and focus management
    effect(() => {
      const isOpen = this.internalOpen();
      if (isOpen) {
        this.onOpen();
      } else {
        this.onClose();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.removeDocumentListeners();
      this.restoreFocus();
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
  setOpen(open: boolean, reason: DialogOpenChangeReason = 'imperative'): void {
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

    // Set up document listeners
    this.setupDocumentListeners();

    // Lock body scroll for modal dialogs
    if (this.modal()) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Handle dialog close.
   */
  private onClose(): void {
    this.removeDocumentListeners();

    // Restore body scroll
    if (this.modal()) {
      this.document.body.style.overflow = '';
    }

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

  /**
   * Set up document listeners for outside click and escape.
   */
  private setupDocumentListeners(): void {
    if (this.clickListener) return;

    // Outside click handler
    this.clickListener = (event: MouseEvent) => {
      if (!this.closeOnOutsideClick()) return;

      const target = event.target as HTMLElement;
      const popup = this.popupElement();

      // Don't close if click is inside popup
      if (popup?.contains(target)) {
        return;
      }

      this.setOpen(false, 'outside-press');
    };

    // Escape key handler
    this.keydownListener = (event: KeyboardEvent) => {
      if (!this.closeOnEscape()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        this.setOpen(false, 'escape-key');
      }
    };

    // Use setTimeout to avoid triggering on the same click that opened
    setTimeout(() => {
      this.document.addEventListener('click', this.clickListener!);
      this.document.addEventListener('keydown', this.keydownListener!);
    }, 0);
  }

  /**
   * Remove document listeners.
   */
  private removeDocumentListeners(): void {
    if (this.clickListener) {
      this.document.removeEventListener('click', this.clickListener);
      this.clickListener = null;
    }
    if (this.keydownListener) {
      this.document.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = null;
    }
  }
}

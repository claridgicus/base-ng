/**
 * @directive DialogRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/dialog/root/DialogRoot.tsx
 * @reactDocs https://base-ui.com/react/components/dialog
 * @visualSource https://base-ui.com/react/components/dialog
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity Verified - Core functionality matches React Base UI
 *
 * Groups all parts of the dialog. Manages open state and provides context.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
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
   * The controlled open state of the dialog (internal signal).
   */
  private readonly _open = signal<boolean>(false);

  /**
   * The controlled open state of the dialog.
   */
  @Input()
  get open(): boolean {
    return this._open();
  }
  set open(value: boolean) {
    this._open.set(value);
  }

  /**
   * Emits when the open state changes (for two-way binding).
   */
  @Output() readonly openChange = new EventEmitter<boolean>();

  /**
   * The default open state when uncontrolled (internal signal).
   */
  private readonly _defaultOpen = signal<boolean>(false);

  /**
   * The default open state when uncontrolled.
   */
  @Input({ transform: booleanAttribute })
  get defaultOpen(): boolean {
    return this._defaultOpen();
  }
  set defaultOpen(value: boolean) {
    this._defaultOpen.set(value);
  }

  /**
   * Whether the dialog is modal (internal signal).
   * Modal dialogs prevent interaction with the rest of the page.
   */
  private readonly _modal = signal<boolean>(true);

  /**
   * Whether the dialog is modal.
   * Modal dialogs prevent interaction with the rest of the page.
   */
  @Input({ transform: booleanAttribute })
  get modal(): boolean {
    return this._modal();
  }
  set modal(value: boolean) {
    this._modal.set(value);
  }

  /**
   * Whether to close on outside click (internal signal).
   */
  private readonly _closeOnOutsideClick = signal<boolean>(true);

  /**
   * Whether to close on outside click.
   */
  @Input({ transform: booleanAttribute })
  get closeOnOutsideClick(): boolean {
    return this._closeOnOutsideClick();
  }
  set closeOnOutsideClick(value: boolean) {
    this._closeOnOutsideClick.set(value);
  }

  /**
   * Whether to close on escape key (internal signal).
   */
  private readonly _closeOnEscape = signal<boolean>(true);

  /**
   * Whether to close on escape key.
   */
  @Input({ transform: booleanAttribute })
  get closeOnEscape(): boolean {
    return this._closeOnEscape();
  }
  set closeOnEscape(value: boolean) {
    this._closeOnEscape.set(value);
  }

  /**
   * Emits when the open state changes with detailed event info.
   */
  @Output() readonly openChanged = new EventEmitter<DialogOpenChangeEventDetails>();

  /** Internal open state (public for template binding) */
  readonly internalOpen = signal(false);

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
    modal: this._modal(),
    modalSignal: this._modal,
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
      if (this._defaultOpen() && !this.internalOpen()) {
        this.internalOpen.set(true);
      }
    });

    // Sync model to internal state
    effect(() => {
      this.internalOpen.set(this._open());
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
    this._open.set(open);
    this.openChange.emit(open);

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
    if (this._modal()) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Handle dialog close.
   */
  private onClose(): void {
    this.removeDocumentListeners();

    // Restore body scroll
    if (this._modal()) {
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
      if (!this._closeOnOutsideClick()) return;

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
      if (!this._closeOnEscape()) return;

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

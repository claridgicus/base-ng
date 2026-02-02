/**
 * @fileoverview Angular port of Base UI PopoverRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/root/PopoverRoot.tsx
 *
 * Groups all parts of the popover. Manages open state and provides context.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  DestroyRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  POPOVER_CONTEXT,
  type PopoverContext,
  type PopoverOpenChangeEventDetails,
  type PopoverOpenChangeReason,
} from './popover.types';

let popoverIdCounter = 0;

/**
 * Root directive for popovers.
 * Groups all parts and manages open state.
 *
 * @example
 * ```html
 * <div baseUiPopoverRoot>
 *   <button baseUiPopoverTrigger>Open</button>
 *   <div baseUiPopoverPositioner>
 *     <div baseUiPopoverPopup>Popover content</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverRoot]',
  standalone: true,
  exportAs: 'popoverRoot',
  host: {
    '[class.base-ui-popover-root]': 'true',
  },
  providers: [
    {
      provide: POPOVER_CONTEXT,
      useFactory: (directive: PopoverRootDirective) => directive.context,
      deps: [PopoverRootDirective],
    },
  ],
})
export class PopoverRootDirective {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  /** Unique ID for the popover */
  readonly rootId = `base-ui-popover-${popoverIdCounter++}`;

  /**
   * The controlled open state of the popover.
   */
  readonly open = model<boolean>(false);

  /**
   * The default open state when uncontrolled.
   */
  readonly defaultOpen = input(false, { transform: booleanAttribute });

  /**
   * Whether the popover is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

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
  readonly openChanged = output<PopoverOpenChangeEventDetails>();

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

  /** Context provided to children */
  readonly context: PopoverContext = {
    open: this.internalOpen(),
    openSignal: this.internalOpen,
    disabled: this.disabled(),
    disabledSignal: this.disabled,
    openPopover: (reason?: PopoverOpenChangeReason) => this.setOpen(true, reason),
    closePopover: (reason?: PopoverOpenChangeReason) => this.setOpen(false, reason),
    togglePopover: (reason?: PopoverOpenChangeReason) =>
      this.setOpen(!this.internalOpen(), reason),
    setOpen: (open: boolean, reason?: PopoverOpenChangeReason) =>
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

    // Set up outside click and escape handlers
    effect(() => {
      const isOpen = this.internalOpen();
      if (isOpen) {
        this.setupDocumentListeners();
      } else {
        this.removeDocumentListeners();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.removeDocumentListeners();
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
  setOpen(open: boolean, reason: PopoverOpenChangeReason = 'imperative'): void {
    if (this.disabled()) {
      return;
    }

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
   * Set up document listeners for outside click and escape.
   */
  private setupDocumentListeners(): void {
    if (this.clickListener) return;

    // Outside click handler
    this.clickListener = (event: MouseEvent) => {
      if (!this.closeOnOutsideClick()) return;

      const target = event.target as HTMLElement;
      const trigger = this.triggerElement();
      const popup = this.popupElement();

      // Don't close if click is inside trigger or popup
      if (trigger?.contains(target) || popup?.contains(target)) {
        return;
      }

      this.setOpen(false, 'outside-press');
    };

    // Escape key handler
    this.keydownListener = (event: KeyboardEvent) => {
      if (!this.closeOnEscape()) return;

      if (event.key === 'Escape') {
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

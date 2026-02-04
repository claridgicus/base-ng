/**
 * @fileoverview Angular port of Base UI PreviewCardRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/root/PreviewCardRoot.tsx
 *
 * Groups all parts of the preview card. Manages open state and provides context.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  Output,
  signal,
  DestroyRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  PREVIEW_CARD_CONTEXT,
  type PreviewCardContext,
  type PreviewCardOpenChangeEventDetails,
  type PreviewCardOpenChangeReason,
} from './preview-card.types';

let previewCardIdCounter = 0;

/**
 * Root directive for preview cards.
 * Groups all parts and manages open state.
 *
 * @example
 * ```html
 * <div baseUiPreviewCardRoot>
 *   <a baseUiPreviewCardTrigger href="#">Hover me</a>
 *   <div baseUiPreviewCardPositioner>
 *     <div baseUiPreviewCardPopup>Preview content</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiPreviewCardRoot]',
  standalone: true,
  exportAs: 'previewCardRoot',
  host: {
    '[class.base-ui-preview-card-root]': 'true',
  },
  providers: [
    {
      provide: PREVIEW_CARD_CONTEXT,
      useFactory: (directive: PreviewCardRootDirective) => directive.context,
      deps: [PreviewCardRootDirective],
    },
  ],
})
export class PreviewCardRootDirective<T = unknown> {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  /** Unique ID for the preview card */
  readonly rootId = `base-ui-preview-card-${previewCardIdCounter++}`;

  /**
   * The controlled open state of the preview card.
   */
  private readonly _open = signal<boolean>(false);
  @Input()
  get open(): boolean {
    return this._open();
  }
  set open(value: boolean) {
    this._open.set(value);
  }

  /**
   * Output for two-way binding support
   */
  @Output() readonly openChange = new EventEmitter<boolean>();

  /**
   * The default open state when uncontrolled.
   */
  private readonly _defaultOpen = signal<boolean>(false);
  @Input({ transform: booleanAttribute })
  get defaultOpen(): boolean {
    return this._defaultOpen();
  }
  set defaultOpen(value: boolean) {
    this._defaultOpen.set(value);
  }

  /**
   * Whether the preview card is disabled.
   */
  private readonly _disabled = signal<boolean>(false);
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }

  /**
   * Delay before opening in milliseconds.
   */
  private readonly _delay = signal<number>(600);
  @Input({ transform: numberAttribute })
  get delay(): number {
    return this._delay();
  }
  set delay(value: number) {
    this._delay.set(value);
  }

  /**
   * Delay before closing in milliseconds.
   */
  private readonly _closeDelay = signal<number>(300);
  @Input({ transform: numberAttribute })
  get closeDelay(): number {
    return this._closeDelay();
  }
  set closeDelay(value: number) {
    this._closeDelay.set(value);
  }

  /**
   * Whether to close on outside click.
   */
  private readonly _closeOnOutsideClick = signal<boolean>(true);
  @Input({ transform: booleanAttribute })
  get closeOnOutsideClick(): boolean {
    return this._closeOnOutsideClick();
  }
  set closeOnOutsideClick(value: boolean) {
    this._closeOnOutsideClick.set(value);
  }

  /**
   * Whether to close on escape key.
   */
  private readonly _closeOnEscape = signal<boolean>(true);
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
  @Output() readonly openChanged = new EventEmitter<PreviewCardOpenChangeEventDetails>();

  /** Internal open state */
  private readonly internalOpen = signal(false);

  /** Trigger element */
  private readonly triggerElement = signal<HTMLElement | null>(null);

  /** Popup element */
  private readonly popupElement = signal<HTMLElement | null>(null);

  /** Current payload data */
  private readonly payload = signal<T | null>(null);

  /** Context provided to children */
  readonly context: PreviewCardContext<T> = {
    open: this.internalOpen(),
    openSignal: this.internalOpen,
    disabled: this._disabled(),
    disabledSignal: this._disabled,
    openPreviewCard: (reason?: PreviewCardOpenChangeReason) => this.setOpen(true, reason),
    closePreviewCard: (reason?: PreviewCardOpenChangeReason) => this.setOpen(false, reason),
    setOpen: (open: boolean, reason?: PreviewCardOpenChangeReason) =>
      this.setOpen(open, reason),
    triggerElement: this.triggerElement(),
    triggerElementSignal: this.triggerElement,
    setTriggerElement: (element: HTMLElement | null) =>
      this.triggerElement.set(element),
    popupElement: this.popupElement(),
    popupElementSignal: this.popupElement,
    setPopupElement: (element: HTMLElement | null) =>
      this.popupElement.set(element),
    delay: this._delay(),
    delaySignal: this._delay,
    closeDelay: this._closeDelay(),
    closeDelaySignal: this._closeDelay,
    payload: this.payload(),
    payloadSignal: this.payload,
    setPayload: (payload: T | null) => this.payload.set(payload),
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
  setOpen(open: boolean, reason: PreviewCardOpenChangeReason = 'imperative'): void {
    if (this._disabled()) {
      return;
    }

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
   * Set up document listeners for outside click and escape.
   */
  private setupDocumentListeners(): void {
    if (this.clickListener) return;

    // Outside click handler
    this.clickListener = (event: MouseEvent) => {
      if (!this._closeOnOutsideClick()) return;

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
      if (!this._closeOnEscape()) return;

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

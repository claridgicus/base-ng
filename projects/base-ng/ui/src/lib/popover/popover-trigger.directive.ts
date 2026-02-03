/**
 * @fileoverview Angular port of Base UI PopoverTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/trigger/PopoverTrigger.tsx
 *
 * A button that triggers the popover on click or hover.
 */

import {
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  numberAttribute,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { POPOVER_CONTEXT } from './popover.types';

/**
 * Trigger directive for popovers.
 * Opens the popover on click or hover.
 *
 * @example
 * ```html
 * <button baseUiPopoverTrigger>Open popover</button>
 *
 * <!-- With hover -->
 * <button baseUiPopoverTrigger [openOnHover]="true" [delay]="200">Hover me</button>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverTrigger]',
  standalone: true,
  exportAs: 'popoverTrigger',
  host: {
    type: 'button',
    '[id]': 'context.getTriggerId()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.openSignal()',
    '[attr.aria-controls]': 'context.openSignal() ? context.getPopupId() : null',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.disabled]': 'context.disabledSignal() ? "" : null',
    '[class.base-ui-popover-trigger]': 'true',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
  },
})
export class PopoverTriggerDirective implements OnInit, OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Whether to open the popover on hover.
   */
  private readonly _openOnHover = signal<boolean>(false);

  @Input({ transform: booleanAttribute })
  set openOnHover(value: boolean) {
    this._openOnHover.set(value);
  }
  get openOnHover(): boolean {
    return this._openOnHover();
  }

  /**
   * The delay in milliseconds before the popover opens on hover.
   */
  private readonly _delay = signal<number>(300);

  @Input({ transform: numberAttribute })
  set delay(value: number) {
    this._delay.set(value);
  }
  get delay(): number {
    return this._delay();
  }

  /**
   * The delay in milliseconds before the popover closes on mouse leave.
   */
  private readonly _closeDelay = signal<number>(0);

  @Input({ transform: numberAttribute })
  set closeDelay(value: number) {
    this._closeDelay.set(value);
  }
  get closeDelay(): number {
    return this._closeDelay();
  }

  private hoverOpenTimeout: ReturnType<typeof setTimeout> | null = null;
  private hoverCloseTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearTimeouts();
    });
  }

  ngOnInit(): void {
    this.context.setTriggerElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setTriggerElement(null);
    this.clearTimeouts();
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.context.disabledSignal()) {
      event.preventDefault();
      return;
    }

    // Only toggle on click if not in hover mode, or if already open
    if (!this.openOnHover || this.context.openSignal()) {
      this.context.togglePopover('trigger-press');
    }
  }

  /**
   * Handle mouse enter events for hover mode.
   */
  protected handleMouseEnter(): void {
    if (!this.openOnHover || this.context.disabledSignal()) {
      return;
    }

    this.clearTimeouts();

    const delayMs = this.delay;
    if (delayMs > 0) {
      this.hoverOpenTimeout = setTimeout(() => {
        this.context.openPopover('hover');
      }, delayMs);
    } else {
      this.context.openPopover('hover');
    }
  }

  /**
   * Handle mouse leave events for hover mode.
   */
  protected handleMouseLeave(): void {
    if (!this.openOnHover) {
      return;
    }

    this.clearTimeouts();

    const closeDelayMs = this.closeDelay;
    if (closeDelayMs > 0) {
      this.hoverCloseTimeout = setTimeout(() => {
        this.context.closePopover('hover');
      }, closeDelayMs);
    } else {
      this.context.closePopover('hover');
    }
  }

  /**
   * Handle focus events for hover mode (keyboard accessibility).
   */
  protected handleFocus(): void {
    if (!this.openOnHover || this.context.disabledSignal()) {
      return;
    }

    this.clearTimeouts();
    this.context.openPopover('focus');
  }

  /**
   * Handle blur events for hover mode.
   */
  protected handleBlur(): void {
    if (!this.openOnHover) {
      return;
    }

    this.clearTimeouts();
    this.context.closePopover('focus');
  }

  /**
   * Clear any pending timeouts.
   */
  private clearTimeouts(): void {
    if (this.hoverOpenTimeout) {
      clearTimeout(this.hoverOpenTimeout);
      this.hoverOpenTimeout = null;
    }
    if (this.hoverCloseTimeout) {
      clearTimeout(this.hoverCloseTimeout);
      this.hoverCloseTimeout = null;
    }
  }
}

/**
 * @fileoverview Angular port of Base UI PreviewCardTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/trigger/PreviewCardTrigger.tsx
 *
 * An anchor element that triggers the preview card on hover/focus.
 */

import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PREVIEW_CARD_CONTEXT } from './preview-card.types';

/**
 * Trigger directive for preview cards.
 * Opens the preview card on hover or focus.
 *
 * @example
 * ```html
 * <a baseUiPreviewCardTrigger href="#">Hover for preview</a>
 * ```
 */
@Directive({
  selector: '[baseUiPreviewCardTrigger]',
  standalone: true,
  exportAs: 'previewCardTrigger',
  host: {
    '[id]': 'context.getTriggerId()',
    '[attr.aria-describedby]': 'context.openSignal() ? context.getPopupId() : null',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[class.base-ui-preview-card-trigger]': 'true',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
  },
})
export class PreviewCardTriggerDirective<T = unknown> implements OnInit, OnDestroy {
  protected readonly context = inject(PREVIEW_CARD_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Data payload to pass to the preview card popup.
   */
  readonly payload = input<T | null>(null);

  private openTimeout: ReturnType<typeof setTimeout> | null = null;
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.context.setTriggerElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setTriggerElement(null);
    this.clearTimeouts();
  }

  /**
   * Handle mouse enter events.
   */
  protected handleMouseEnter(): void {
    if (this.context.disabledSignal()) {
      return;
    }

    this.clearTimeouts();

    // Set payload when entering
    const payload = this.payload();
    if (payload !== null) {
      this.context.setPayload(payload);
    }

    const delay = this.context.delaySignal();
    if (delay > 0) {
      this.openTimeout = setTimeout(() => {
        this.context.openPreviewCard('trigger-hover');
      }, delay);
    } else {
      this.context.openPreviewCard('trigger-hover');
    }
  }

  /**
   * Handle mouse leave events.
   */
  protected handleMouseLeave(): void {
    this.clearTimeouts();

    const closeDelay = this.context.closeDelaySignal();
    if (closeDelay > 0) {
      this.closeTimeout = setTimeout(() => {
        this.context.closePreviewCard('pointer-leave');
      }, closeDelay);
    } else {
      this.context.closePreviewCard('pointer-leave');
    }
  }

  /**
   * Handle focus events.
   */
  protected handleFocus(): void {
    if (this.context.disabledSignal()) {
      return;
    }

    this.clearTimeouts();

    // Set payload when focusing
    const payload = this.payload();
    if (payload !== null) {
      this.context.setPayload(payload);
    }

    const delay = this.context.delaySignal();
    if (delay > 0) {
      this.openTimeout = setTimeout(() => {
        this.context.openPreviewCard('trigger-focus');
      }, delay);
    } else {
      this.context.openPreviewCard('trigger-focus');
    }
  }

  /**
   * Handle blur events.
   */
  protected handleBlur(): void {
    this.clearTimeouts();

    const closeDelay = this.context.closeDelaySignal();
    if (closeDelay > 0) {
      this.closeTimeout = setTimeout(() => {
        this.context.closePreviewCard('focus-leave');
      }, closeDelay);
    } else {
      this.context.closePreviewCard('focus-leave');
    }
  }

  /**
   * Clear all pending timeouts.
   */
  private clearTimeouts(): void {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}

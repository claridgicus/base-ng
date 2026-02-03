/**
 * @directive TooltipTrigger
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/trigger/TooltipTrigger.tsx
 * @reactDocs https://base-ui.com/react/components/tooltip
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * An element that triggers the tooltip on hover/focus.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TOOLTIP_CONTEXT } from './tooltip.types';

/**
 * Trigger directive for tooltips.
 * Triggers the tooltip on hover and focus.
 *
 * @example
 * ```html
 * <button baseUiTooltipTrigger>Hover me</button>
 * ```
 */
@Directive({
  selector: '[baseUiTooltipTrigger]',
  standalone: true,
  exportAs: 'tooltipTrigger',
  host: {
    '[id]': 'context.getTriggerId()',
    '[attr.aria-describedby]': 'context.openSignal() ? context.getPopupId() : null',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[class.base-ui-tooltip-trigger]': 'true',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
  },
})
export class TooltipTriggerDirective implements OnInit, OnDestroy {
  protected readonly context = inject(TOOLTIP_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private openTimeout: ReturnType<typeof setTimeout> | null = null;
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.context.setTriggerElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
    this.context.setTriggerElement(null);
  }

  /**
   * Handle mouse enter - start open delay.
   */
  protected handleMouseEnter(): void {
    if (this.context.disabledSignal()) {
      return;
    }

    this.clearCloseTimeout();

    const delay = this.context.delaySignal();
    if (delay > 0) {
      this.openTimeout = setTimeout(() => {
        this.context.openTooltip('trigger-hover');
      }, delay);
    } else {
      this.context.openTooltip('trigger-hover');
    }
  }

  /**
   * Handle mouse leave - start close delay.
   */
  protected handleMouseLeave(): void {
    this.clearOpenTimeout();

    const closeDelay = this.context.closeDelaySignal();
    if (closeDelay > 0) {
      this.closeTimeout = setTimeout(() => {
        this.context.closeTooltip('trigger-hover');
      }, closeDelay);
    } else {
      this.context.closeTooltip('trigger-hover');
    }
  }

  /**
   * Handle focus - open immediately.
   */
  protected handleFocus(): void {
    if (this.context.disabledSignal()) {
      return;
    }

    this.clearTimeouts();
    this.context.openTooltip('trigger-focus');
  }

  /**
   * Handle blur - close immediately.
   */
  protected handleBlur(): void {
    this.clearTimeouts();
    this.context.closeTooltip('trigger-focus');
  }

  /**
   * Clear all timeouts.
   */
  private clearTimeouts(): void {
    this.clearOpenTimeout();
    this.clearCloseTimeout();
  }

  /**
   * Clear open timeout.
   */
  private clearOpenTimeout(): void {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
  }

  /**
   * Clear close timeout.
   */
  private clearCloseTimeout(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}

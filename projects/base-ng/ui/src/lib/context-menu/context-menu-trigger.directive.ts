/**
 * @fileoverview Angular port of Base UI ContextMenuTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/context-menu/trigger/ContextMenuTrigger.tsx
 *
 * An area that opens the context menu on right-click or long-press.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu.types';

/** Long press delay in milliseconds */
const LONG_PRESS_DELAY = 500;

/** Movement threshold to cancel long press */
const MOVEMENT_THRESHOLD = 10;

/**
 * Trigger directive for context menus.
 * Opens the context menu on right-click or long-press.
 *
 * @example
 * ```html
 * <div baseUiContextMenuTrigger>Right-click or long-press me</div>
 * ```
 */
@Directive({
  selector: '[baseUiContextMenuTrigger]',
  standalone: true,
  exportAs: 'contextMenuTrigger',
  host: {
    '[class.base-ui-context-menu-trigger]': 'true',
    '(contextmenu)': 'handleContextMenu($event)',
    '(touchstart)': 'handleTouchStart($event)',
    '(touchmove)': 'handleTouchMove($event)',
    '(touchend)': 'handleTouchEnd()',
    '(touchcancel)': 'handleTouchEnd()',
  },
})
export class ContextMenuTriggerDirective implements OnInit, OnDestroy {
  protected readonly context = inject(CONTEXT_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Long press timer */
  private longPressTimer: ReturnType<typeof setTimeout> | null = null;

  /** Touch start position */
  private touchStartX = 0;
  private touchStartY = 0;

  /** Whether a long press is pending */
  private longPressPending = false;

  ngOnInit(): void {
    this.context.setTriggerElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.clearLongPressTimer();
    this.context.setTriggerElement(null);
  }

  /**
   * Handle context menu (right-click) events.
   */
  protected handleContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.context.openContextMenu(event.clientX, event.clientY, 'context-menu');
  }

  /**
   * Handle touch start for long-press detection.
   */
  protected handleTouchStart(event: TouchEvent): void {
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.longPressPending = true;

    this.longPressTimer = setTimeout(() => {
      if (this.longPressPending) {
        this.context.openContextMenu(this.touchStartX, this.touchStartY, 'long-press');
        this.longPressPending = false;
      }
    }, LONG_PRESS_DELAY);
  }

  /**
   * Handle touch move to cancel long-press if user moves too much.
   */
  protected handleTouchMove(event: TouchEvent): void {
    if (!this.longPressPending || event.touches.length !== 1) return;

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - this.touchStartX);
    const deltaY = Math.abs(touch.clientY - this.touchStartY);

    if (deltaX > MOVEMENT_THRESHOLD || deltaY > MOVEMENT_THRESHOLD) {
      this.clearLongPressTimer();
      this.longPressPending = false;
    }
  }

  /**
   * Handle touch end to cancel long-press.
   */
  protected handleTouchEnd(): void {
    this.clearLongPressTimer();
    this.longPressPending = false;
  }

  /**
   * Clear the long press timer.
   */
  private clearLongPressTimer(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }
}

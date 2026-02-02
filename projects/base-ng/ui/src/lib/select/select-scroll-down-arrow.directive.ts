/**
 * @fileoverview Angular port of Base UI Select Scroll Down Arrow
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/scroll-down-arrow/SelectScrollDownArrow.tsx
 */

import {
  Directive,
  computed,
  inject,
  signal,
  effect,
  booleanAttribute,
  input,
} from '@angular/core';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select Scroll Down Arrow directive.
 * An indicator showing that the list is scrollable downwards.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectPopup>
 *   <div baseUiSelectScrollUpArrow>▲</div>
 *   <div baseUiSelectList>...</div>
 *   <div baseUiSelectScrollDownArrow>▼</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectScrollDownArrow]',
  standalone: true,
  exportAs: 'selectScrollDownArrow',
  host: {
    'aria-hidden': 'true',
    '[class.base-ui-select-scroll-down-arrow]': 'true',
    '[class.base-ui-select-scroll-arrow-visible]': 'isVisible()',
    '[attr.data-visible]': 'isVisible() ? "" : null',
    '[style.display]': 'isVisible() ? null : "none"',
    '(mouseenter)': 'startScrolling()',
    '(mouseleave)': 'stopScrolling()',
  },
})
export class SelectScrollDownArrowDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);

  /**
   * Whether to keep the arrow mounted when not visible.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  private readonly canScrollDown = signal(true);
  private scrollInterval: ReturnType<typeof setInterval> | null = null;

  /** Whether the scroll arrow is visible */
  readonly isVisible = computed(() => {
    if (!this.rootContext.openSignal()) {
      return false;
    }
    return this.canScrollDown() || this.keepMounted();
  });

  constructor() {
    // Update scroll position when list changes
    effect(() => {
      const listElement = this.rootContext.listElement();
      if (listElement) {
        const updateScroll = () => {
          const canScroll =
            listElement.scrollTop <
            listElement.scrollHeight - listElement.clientHeight - 1;
          this.canScrollDown.set(canScroll);
        };
        listElement.addEventListener('scroll', updateScroll);
        updateScroll();
      }
    });
  }

  startScrolling(): void {
    const listElement = this.rootContext.listElement();
    if (!listElement) return;

    this.scrollInterval = setInterval(() => {
      listElement.scrollTop += 5;
      const canScroll =
        listElement.scrollTop <
        listElement.scrollHeight - listElement.clientHeight - 1;
      this.canScrollDown.set(canScroll);

      if (!canScroll) {
        this.stopScrolling();
      }
    }, 16);
  }

  stopScrolling(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }
}

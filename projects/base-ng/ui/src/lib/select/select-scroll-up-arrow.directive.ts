/**
 * @fileoverview Angular port of Base UI Select Scroll Up Arrow
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/scroll-up-arrow/SelectScrollUpArrow.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  signal,
  effect,
  booleanAttribute,
  input,
} from '@angular/core';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select Scroll Up Arrow directive.
 * An indicator showing that the list is scrollable upwards.
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
  selector: '[baseUiSelectScrollUpArrow]',
  standalone: true,
  exportAs: 'selectScrollUpArrow',
  host: {
    'aria-hidden': 'true',
    '[class.base-ui-select-scroll-up-arrow]': 'true',
    '[class.base-ui-select-scroll-arrow-visible]': 'isVisible()',
    '[attr.data-visible]': 'isVisible() ? "" : null',
    '[style.display]': 'isVisible() ? null : "none"',
    '(mouseenter)': 'startScrolling()',
    '(mouseleave)': 'stopScrolling()',
  },
})
export class SelectScrollUpArrowDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);

  /**
   * Whether to keep the arrow mounted when not visible.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  private readonly scrollTop = signal(0);
  private scrollInterval: ReturnType<typeof setInterval> | null = null;

  /** Whether the scroll arrow is visible */
  readonly isVisible = computed(() => {
    if (!this.rootContext.openSignal()) {
      return false;
    }
    return this.scrollTop() > 0 || this.keepMounted();
  });

  constructor() {
    // Update scroll position when list changes
    effect(() => {
      const listElement = this.rootContext.listElement();
      if (listElement) {
        const updateScroll = () => {
          this.scrollTop.set(listElement.scrollTop);
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
      listElement.scrollTop -= 5;
      this.scrollTop.set(listElement.scrollTop);

      if (listElement.scrollTop <= 0) {
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

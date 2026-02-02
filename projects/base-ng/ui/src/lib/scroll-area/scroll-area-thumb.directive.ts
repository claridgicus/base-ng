/**
 * @fileoverview Angular port of Base UI Scroll Area Thumb
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area/thumb/ScrollAreaThumb.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import {
  SCROLL_AREA_ROOT_CONTEXT,
  SCROLL_AREA_SCROLLBAR_CONTEXT,
} from './scroll-area.types';

/**
 * Scroll Area Thumb directive.
 * The draggable part of the scrollbar that indicates current scroll position.
 *
 * @example
 * ```html
 * <div baseUiScrollAreaScrollbar orientation="vertical">
 *   <div baseUiScrollAreaThumb></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiScrollAreaThumb]',
  standalone: true,
  exportAs: 'scrollAreaThumb',
  host: {
    '[style.position]': '"absolute"',
    '[style.borderRadius]': '"inherit"',
    '[style.width]': 'isVertical() ? "100%" : thumbSize() + "px"',
    '[style.height]': 'isVertical() ? thumbSize() + "px" : "100%"',
    '[style.transform]': 'thumbTransform()',
    '[attr.data-orientation]': 'scrollbarContext.orientation',
    '[class.base-ui-scroll-area-thumb]': 'true',
    '(pointerdown)': 'handlePointerDown($event)',
  },
})
export class ScrollAreaThumbDirective implements OnDestroy {
  protected readonly rootContext = inject(SCROLL_AREA_ROOT_CONTEXT);
  protected readonly scrollbarContext = inject(SCROLL_AREA_SCROLLBAR_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Whether this thumb is for vertical scrollbar */
  readonly isVertical = computed(() => this.scrollbarContext.orientation === 'vertical');

  /** Thumb size based on orientation */
  readonly thumbSize = computed(() => {
    return this.isVertical()
      ? this.rootContext.thumbYSize()
      : this.rootContext.thumbXSize();
  });

  /** Thumb offset for positioning */
  readonly thumbOffset = computed(() => {
    return this.isVertical()
      ? this.rootContext.thumbYOffset()
      : this.rootContext.thumbXOffset();
  });

  /** Transform for thumb positioning */
  readonly thumbTransform = computed(() => {
    const offset = this.thumbOffset();
    return this.isVertical()
      ? `translateY(${offset}px)`
      : `translateX(${offset}px)`;
  });

  constructor() {
    afterNextRender(() => {
      // Register thumb element
      if (this.isVertical()) {
        this.rootContext.thumbYElement.set(this.elementRef.nativeElement);
      } else {
        this.rootContext.thumbXElement.set(this.elementRef.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isVertical()) {
      this.rootContext.thumbYElement.set(null);
    } else {
      this.rootContext.thumbXElement.set(null);
    }
  }

  /**
   * Handle pointer down to start dragging.
   */
  handlePointerDown(event: PointerEvent): void {
    this.rootContext.handlePointerDown(event, this.scrollbarContext.orientation);
  }
}

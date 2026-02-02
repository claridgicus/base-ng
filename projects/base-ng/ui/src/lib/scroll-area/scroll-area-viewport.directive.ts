/**
 * @fileoverview Angular port of Base UI Scroll Area Viewport
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area/viewport/ScrollAreaViewport.tsx
 */

import {
  Directive,
  ElementRef,
  inject,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { SCROLL_AREA_ROOT_CONTEXT } from './scroll-area.types';

/**
 * Scroll Area Viewport directive.
 * The scrollable container that holds the content.
 *
 * @example
 * ```html
 * <div baseUiScrollAreaRoot>
 *   <div baseUiScrollAreaViewport>
 *     <div baseUiScrollAreaContent>
 *       <!-- Scrollable content -->
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiScrollAreaViewport]',
  standalone: true,
  exportAs: 'scrollAreaViewport',
  host: {
    '[style.overflow]': '"scroll"',
    '[style.scrollbarWidth]': '"none"',
    '[style.-ms-overflow-style]': '"none"',
    '[style.height]': '"100%"',
    '[style.width]': '"100%"',
    '[attr.data-scrolling]': 'rootContext.scrollingSignal() ? "" : null',
    '[attr.data-scrolling-x]': 'rootContext.scrollingXSignal() ? "" : null',
    '[attr.data-scrolling-y]': 'rootContext.scrollingYSignal() ? "" : null',
    '[class.base-ui-scroll-area-viewport]': 'true',
    '(scroll)': 'handleScroll($event)',
  },
})
export class ScrollAreaViewportDirective implements OnDestroy {
  protected readonly rootContext = inject(SCROLL_AREA_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      // Register viewport element
      this.rootContext.viewportElement.set(this.elementRef.nativeElement);

      // Set up resize observer to recalculate thumb positions
      this.resizeObserver = new ResizeObserver(() => {
        this.rootContext.computeThumbPosition();
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);

      // Initial calculation
      this.rootContext.computeThumbPosition();
    });
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.rootContext.viewportElement.set(null);
  }

  /**
   * Handle scroll event.
   */
  handleScroll(event: Event): void {
    this.rootContext.handleScroll(event);
  }
}

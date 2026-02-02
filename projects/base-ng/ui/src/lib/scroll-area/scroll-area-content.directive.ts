/**
 * @fileoverview Angular port of Base UI Scroll Area Content
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area/content/ScrollAreaContent.tsx
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
 * Scroll Area Content directive.
 * A container for the scrollable content.
 *
 * @example
 * ```html
 * <div baseUiScrollAreaViewport>
 *   <div baseUiScrollAreaContent>
 *     <!-- Your scrollable content here -->
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiScrollAreaContent]',
  standalone: true,
  exportAs: 'scrollAreaContent',
  host: {
    role: 'presentation',
    '[style.minWidth]': '"fit-content"',
    '[attr.data-scrolling]': 'rootContext.scrollingSignal() ? "" : null',
    '[class.base-ui-scroll-area-content]': 'true',
  },
})
export class ScrollAreaContentDirective implements OnDestroy {
  protected readonly rootContext = inject(SCROLL_AREA_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      // Register content element
      this.rootContext.contentElement.set(this.elementRef.nativeElement);

      // Set up resize observer to recalculate thumb positions
      this.resizeObserver = new ResizeObserver(() => {
        this.rootContext.computeThumbPosition();
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.rootContext.contentElement.set(null);
  }
}

/**
 * @fileoverview Angular port of Base UI Scroll Area Corner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area/corner/ScrollAreaCorner.tsx
 */

import {
  Directive,
  computed,
  inject,
} from '@angular/core';
import { SCROLL_AREA_ROOT_CONTEXT } from './scroll-area.types';

/**
 * Scroll Area Corner directive.
 * The corner element that appears where horizontal and vertical scrollbars meet.
 *
 * @example
 * ```html
 * <div baseUiScrollAreaRoot>
 *   <!-- viewport, scrollbars -->
 *   <div baseUiScrollAreaCorner></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiScrollAreaCorner]',
  standalone: true,
  exportAs: 'scrollAreaCorner',
  host: {
    '[style.position]': '"absolute"',
    '[style.bottom]': '"0"',
    '[style.right]': '"0"',
    '[style.display]': 'isHidden() ? "none" : "block"',
    '[style.width]': 'cornerWidth() + "px"',
    '[style.height]': 'cornerHeight() + "px"',
    '[class.base-ui-scroll-area-corner]': 'true',
  },
})
export class ScrollAreaCornerDirective {
  protected readonly rootContext = inject(SCROLL_AREA_ROOT_CONTEXT);

  /** Whether the corner is hidden */
  readonly isHidden = computed(() => {
    return this.rootContext.hiddenStateSignal().corner;
  });

  /** Corner width from context */
  readonly cornerWidth = computed(() => {
    return this.rootContext.cornerSizeSignal().width;
  });

  /** Corner height from context */
  readonly cornerHeight = computed(() => {
    return this.rootContext.cornerSizeSignal().height;
  });
}

/**
 * @fileoverview Public API for scroll-area module
 */

export { ScrollAreaRootDirective } from './scroll-area-root.directive';
export { ScrollAreaViewportDirective } from './scroll-area-viewport.directive';
export { ScrollAreaContentDirective } from './scroll-area-content.directive';
export { ScrollAreaScrollbarDirective } from './scroll-area-scrollbar.directive';
export { ScrollAreaThumbDirective } from './scroll-area-thumb.directive';
export { ScrollAreaCornerDirective } from './scroll-area-corner.directive';

export {
  SCROLL_AREA_ROOT_CONTEXT,
  SCROLL_AREA_SCROLLBAR_CONTEXT,
  SCROLL_TIMEOUT,
  MIN_THUMB_SIZE,
  type ScrollAreaOrientation,
  type ScrollAreaOverflowState,
  type ScrollAreaHiddenState,
  type ScrollAreaCornerSize,
  type ScrollAreaThumbSize,
  type ScrollAreaThumbOffset,
  type ScrollAreaRootState,
  type ScrollAreaRootContext,
  type ScrollAreaViewportState,
  type ScrollAreaScrollbarContext,
  type ScrollAreaScrollbarState,
  type ScrollAreaThumbState,
  type ScrollAreaContentState,
  type ScrollAreaCornerState,
} from './scroll-area.types';

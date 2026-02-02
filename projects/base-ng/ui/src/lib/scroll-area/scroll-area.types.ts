/**
 * @fileoverview Angular port of Base UI Scroll Area types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/** Scroll timeout for detecting when scrolling has stopped */
export const SCROLL_TIMEOUT = 500;

/** Minimum thumb size in pixels */
export const MIN_THUMB_SIZE = 16;

/** Scrollbar orientation */
export type ScrollAreaOrientation = 'vertical' | 'horizontal';

/** Overflow edge state */
export interface ScrollAreaOverflowState {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

/** Hidden state for scroll area elements */
export interface ScrollAreaHiddenState {
  scrollbarX: boolean;
  scrollbarY: boolean;
  corner: boolean;
}

/** Corner size dimensions */
export interface ScrollAreaCornerSize {
  width: number;
  height: number;
}

/** Thumb dimensions */
export interface ScrollAreaThumbSize {
  width: number;
  height: number;
}

/** Thumb offset position */
export interface ScrollAreaThumbOffset {
  x: number;
  y: number;
}

/**
 * State exposed by scroll area root.
 */
export interface ScrollAreaRootState {
  readonly scrolling: boolean;
  readonly scrollingX: boolean;
  readonly scrollingY: boolean;
  readonly overflow: ScrollAreaOverflowState;
  readonly cornerSize: ScrollAreaCornerSize;
}

/**
 * Context provided by scroll area root.
 */
export interface ScrollAreaRootContext {
  /** Whether scrolling is active */
  scrollingSignal: Signal<boolean>;
  /** Whether scrolling on X axis */
  scrollingXSignal: Signal<boolean>;
  /** Whether scrolling on Y axis */
  scrollingYSignal: Signal<boolean>;
  /** Overflow state */
  overflowSignal: Signal<ScrollAreaOverflowState>;
  /** Hidden elements state */
  hiddenStateSignal: Signal<ScrollAreaHiddenState>;
  /** Corner size */
  cornerSizeSignal: Signal<ScrollAreaCornerSize>;
  /** Viewport element reference */
  viewportElement: WritableSignal<HTMLElement | null>;
  /** Content element reference */
  contentElement: WritableSignal<HTMLElement | null>;
  /** Vertical scrollbar element reference */
  scrollbarYElement: WritableSignal<HTMLElement | null>;
  /** Horizontal scrollbar element reference */
  scrollbarXElement: WritableSignal<HTMLElement | null>;
  /** Vertical thumb element reference */
  thumbYElement: WritableSignal<HTMLElement | null>;
  /** Horizontal thumb element reference */
  thumbXElement: WritableSignal<HTMLElement | null>;
  /** Thumb size for vertical scrollbar */
  thumbYSize: Signal<number>;
  /** Thumb size for horizontal scrollbar */
  thumbXSize: Signal<number>;
  /** Thumb offset for vertical scrollbar */
  thumbYOffset: Signal<number>;
  /** Thumb offset for horizontal scrollbar */
  thumbXOffset: Signal<number>;
  /** Handle scroll event */
  handleScroll: (event: Event) => void;
  /** Handle pointer down on thumb */
  handlePointerDown: (event: PointerEvent, orientation: ScrollAreaOrientation) => void;
  /** Handle pointer move during drag */
  handlePointerMove: (event: PointerEvent) => void;
  /** Handle pointer up after drag */
  handlePointerUp: (event: PointerEvent) => void;
  /** Compute and update thumb position */
  computeThumbPosition: () => void;
  /** Set scrollbar visibility */
  setScrollbarHidden: (orientation: ScrollAreaOrientation, hidden: boolean) => void;
}

/**
 * State for scroll area viewport.
 */
export interface ScrollAreaViewportState {
  readonly scrolling: boolean;
  readonly scrollingX: boolean;
  readonly scrollingY: boolean;
}

/**
 * Context provided by scrollbar.
 */
export interface ScrollAreaScrollbarContext {
  orientation: ScrollAreaOrientation;
  hovering: Signal<boolean>;
  setHovering: (hovering: boolean) => void;
}

/**
 * State for scrollbar.
 */
export interface ScrollAreaScrollbarState {
  readonly orientation: ScrollAreaOrientation;
  readonly hovering: boolean;
  readonly scrolling: boolean;
  readonly hasOverflow: boolean;
}

/**
 * State for scroll area thumb.
 */
export interface ScrollAreaThumbState {
  readonly orientation: ScrollAreaOrientation;
}

/**
 * State for scroll area content.
 */
export interface ScrollAreaContentState {
  readonly scrolling: boolean;
}

/**
 * State for scroll area corner.
 */
export interface ScrollAreaCornerState {
  readonly visible: boolean;
}

/**
 * Injection token for scroll area root context.
 */
export const SCROLL_AREA_ROOT_CONTEXT = new InjectionToken<ScrollAreaRootContext>(
  'SCROLL_AREA_ROOT_CONTEXT'
);

/**
 * Injection token for scrollbar context.
 */
export const SCROLL_AREA_SCROLLBAR_CONTEXT = new InjectionToken<ScrollAreaScrollbarContext>(
  'SCROLL_AREA_SCROLLBAR_CONTEXT'
);

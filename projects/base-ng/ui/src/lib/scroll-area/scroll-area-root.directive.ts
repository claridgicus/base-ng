/**
 * @fileoverview Angular port of Base UI Scroll Area Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area/root/ScrollAreaRoot.tsx
 */

import {
  Directive,
  ElementRef,
  Input,
  computed,
  inject,
  signal,
  numberAttribute,
} from '@angular/core';
import {
  SCROLL_AREA_ROOT_CONTEXT,
  ScrollAreaRootContext,
  ScrollAreaOrientation,
  ScrollAreaOverflowState,
  ScrollAreaHiddenState,
  ScrollAreaCornerSize,
  SCROLL_TIMEOUT,
  MIN_THUMB_SIZE,
} from './scroll-area.types';

/**
 * Scroll Area Root directive.
 * The main container that manages scroll state and behavior.
 *
 * @example
 * ```html
 * <div baseUiScrollAreaRoot>
 *   <div baseUiScrollAreaViewport>
 *     <div baseUiScrollAreaContent>
 *       <!-- Scrollable content -->
 *     </div>
 *   </div>
 *   <div baseUiScrollAreaScrollbar orientation="vertical">
 *     <div baseUiScrollAreaThumb></div>
 *   </div>
 *   <div baseUiScrollAreaScrollbar orientation="horizontal">
 *     <div baseUiScrollAreaThumb></div>
 *   </div>
 *   <div baseUiScrollAreaCorner></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiScrollAreaRoot]',
  standalone: true,
  exportAs: 'scrollAreaRoot',
  providers: [
    {
      provide: SCROLL_AREA_ROOT_CONTEXT,
      useFactory: (directive: ScrollAreaRootDirective) => directive.context,
      deps: [ScrollAreaRootDirective],
    },
  ],
  host: {
    '[style.position]': '"relative"',
    '[style.overflow]': '"hidden"',
    '[attr.data-scrolling]': 'scrolling() ? "" : null',
    '[attr.data-scrolling-x]': 'scrollingX() ? "" : null',
    '[attr.data-scrolling-y]': 'scrollingY() ? "" : null',
    '[class.base-ui-scroll-area-root]': 'true',
  },
})
export class ScrollAreaRootDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Threshold for detecting overflow edges */
  private readonly _overflowEdgeThreshold = signal<number>(0);

  @Input({ transform: numberAttribute })
  set overflowEdgeThreshold(value: number) { this._overflowEdgeThreshold.set(value); }
  get overflowEdgeThreshold(): number { return this._overflowEdgeThreshold(); }

  // Internal state
  private readonly scrollingInternal = signal(false);
  private readonly scrollingXInternal = signal(false);
  private readonly scrollingYInternal = signal(false);
  private readonly overflowInternal = signal<ScrollAreaOverflowState>({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });
  private readonly hiddenStateInternal = signal<ScrollAreaHiddenState>({
    scrollbarX: true,
    scrollbarY: true,
    corner: true,
  });
  private readonly cornerSizeInternal = signal<ScrollAreaCornerSize>({
    width: 0,
    height: 0,
  });

  // Element references
  private readonly viewportElementInternal = signal<HTMLElement | null>(null);
  private readonly contentElementInternal = signal<HTMLElement | null>(null);
  private readonly scrollbarYElementInternal = signal<HTMLElement | null>(null);
  private readonly scrollbarXElementInternal = signal<HTMLElement | null>(null);
  private readonly thumbYElementInternal = signal<HTMLElement | null>(null);
  private readonly thumbXElementInternal = signal<HTMLElement | null>(null);

  // Thumb sizes and offsets
  private readonly thumbYSizeInternal = signal(0);
  private readonly thumbXSizeInternal = signal(0);
  private readonly thumbYOffsetInternal = signal(0);
  private readonly thumbXOffsetInternal = signal(0);

  // Scroll timeout
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  private scrollTimeoutX: ReturnType<typeof setTimeout> | null = null;
  private scrollTimeoutY: ReturnType<typeof setTimeout> | null = null;

  // Drag state
  private isDragging = false;
  private dragOrientation: ScrollAreaOrientation = 'vertical';
  private dragStartPos = 0;
  private dragStartScroll = 0;

  // Public computed signals
  readonly scrolling = computed(() => this.scrollingInternal());
  readonly scrollingX = computed(() => this.scrollingXInternal());
  readonly scrollingY = computed(() => this.scrollingYInternal());
  readonly overflow = computed(() => this.overflowInternal());
  readonly hiddenState = computed(() => this.hiddenStateInternal());
  readonly cornerSize = computed(() => this.cornerSizeInternal());

  /** Context for child components */
  readonly context: ScrollAreaRootContext;

  constructor() {
    const self = this;

    this.context = {
      scrollingSignal: this.scrolling,
      scrollingXSignal: this.scrollingX,
      scrollingYSignal: this.scrollingY,
      overflowSignal: this.overflow,
      hiddenStateSignal: this.hiddenState,
      cornerSizeSignal: this.cornerSize,

      viewportElement: this.viewportElementInternal,
      contentElement: this.contentElementInternal,
      scrollbarYElement: this.scrollbarYElementInternal,
      scrollbarXElement: this.scrollbarXElementInternal,
      thumbYElement: this.thumbYElementInternal,
      thumbXElement: this.thumbXElementInternal,

      thumbYSize: computed(() => this.thumbYSizeInternal()),
      thumbXSize: computed(() => this.thumbXSizeInternal()),
      thumbYOffset: computed(() => this.thumbYOffsetInternal()),
      thumbXOffset: computed(() => this.thumbXOffsetInternal()),

      handleScroll: this.handleScroll.bind(this),
      handlePointerDown: this.handlePointerDown.bind(this),
      handlePointerMove: this.handlePointerMove.bind(this),
      handlePointerUp: this.handlePointerUp.bind(this),
      computeThumbPosition: this.computeThumbPosition.bind(this),
      setScrollbarHidden: this.setScrollbarHidden.bind(this),
    };
  }

  /**
   * Handle scroll events from viewport.
   */
  handleScroll(event: Event): void {
    const viewport = event.target as HTMLElement;
    if (!viewport) return;

    // Update scrolling state
    this.scrollingInternal.set(true);

    // Determine scroll direction
    const scrollLeft = viewport.scrollLeft;
    const scrollTop = viewport.scrollTop;
    const scrollWidth = viewport.scrollWidth;
    const scrollHeight = viewport.scrollHeight;
    const clientWidth = viewport.clientWidth;
    const clientHeight = viewport.clientHeight;

    // Check if scrolling on each axis
    const hasVerticalScroll = scrollHeight > clientHeight;
    const hasHorizontalScroll = scrollWidth > clientWidth;

    if (hasVerticalScroll) {
      this.scrollingYInternal.set(true);
      if (this.scrollTimeoutY) {
        clearTimeout(this.scrollTimeoutY);
      }
      this.scrollTimeoutY = setTimeout(() => {
        this.scrollingYInternal.set(false);
      }, SCROLL_TIMEOUT);
    }

    if (hasHorizontalScroll) {
      this.scrollingXInternal.set(true);
      if (this.scrollTimeoutX) {
        clearTimeout(this.scrollTimeoutX);
      }
      this.scrollTimeoutX = setTimeout(() => {
        this.scrollingXInternal.set(false);
      }, SCROLL_TIMEOUT);
    }

    // Clear main scroll timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      this.scrollingInternal.set(false);
    }, SCROLL_TIMEOUT);

    // Update overflow state
    const threshold = this._overflowEdgeThreshold();
    this.overflowInternal.set({
      top: scrollTop > threshold,
      bottom: scrollTop < scrollHeight - clientHeight - threshold,
      left: scrollLeft > threshold,
      right: scrollLeft < scrollWidth - clientWidth - threshold,
    });

    // Update thumb position
    this.computeThumbPosition();
  }

  /**
   * Compute and update thumb positions.
   */
  computeThumbPosition(): void {
    const viewport = this.viewportElementInternal();
    if (!viewport) return;

    const scrollLeft = viewport.scrollLeft;
    const scrollTop = viewport.scrollTop;
    const scrollWidth = viewport.scrollWidth;
    const scrollHeight = viewport.scrollHeight;
    const clientWidth = viewport.clientWidth;
    const clientHeight = viewport.clientHeight;

    // Calculate vertical thumb
    if (scrollHeight > clientHeight) {
      const scrollableHeight = scrollHeight - clientHeight;
      const trackHeight = clientHeight;
      const thumbHeight = Math.max(
        MIN_THUMB_SIZE,
        (clientHeight / scrollHeight) * trackHeight
      );
      const thumbOffset = (scrollTop / scrollableHeight) * (trackHeight - thumbHeight);

      this.thumbYSizeInternal.set(thumbHeight);
      this.thumbYOffsetInternal.set(thumbOffset);
    }

    // Calculate horizontal thumb
    if (scrollWidth > clientWidth) {
      const scrollableWidth = scrollWidth - clientWidth;
      const trackWidth = clientWidth;
      const thumbWidth = Math.max(
        MIN_THUMB_SIZE,
        (clientWidth / scrollWidth) * trackWidth
      );
      const thumbOffset = (scrollLeft / scrollableWidth) * (trackWidth - thumbWidth);

      this.thumbXSizeInternal.set(thumbWidth);
      this.thumbXOffsetInternal.set(thumbOffset);
    }

    // Update hidden state based on overflow
    this.hiddenStateInternal.update((state) => ({
      ...state,
      scrollbarY: scrollHeight <= clientHeight,
      scrollbarX: scrollWidth <= clientWidth,
      corner: scrollHeight <= clientHeight || scrollWidth <= clientWidth,
    }));
  }

  /**
   * Handle pointer down on thumb for dragging.
   */
  handlePointerDown(event: PointerEvent, orientation: ScrollAreaOrientation): void {
    const viewport = this.viewportElementInternal();
    if (!viewport) return;

    event.preventDefault();
    this.isDragging = true;
    this.dragOrientation = orientation;

    if (orientation === 'vertical') {
      this.dragStartPos = event.clientY;
      this.dragStartScroll = viewport.scrollTop;
    } else {
      this.dragStartPos = event.clientX;
      this.dragStartScroll = viewport.scrollLeft;
    }

    // Capture pointer
    const target = event.target as HTMLElement;
    target.setPointerCapture(event.pointerId);

    // Add pointer move and up listeners to document
    document.addEventListener('pointermove', this.handlePointerMove.bind(this));
    document.addEventListener('pointerup', this.handlePointerUp.bind(this));
  }

  /**
   * Handle pointer move during thumb drag.
   */
  handlePointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;

    const viewport = this.viewportElementInternal();
    if (!viewport) return;

    event.preventDefault();

    if (this.dragOrientation === 'vertical') {
      const delta = event.clientY - this.dragStartPos;
      const scrollHeight = viewport.scrollHeight;
      const clientHeight = viewport.clientHeight;
      const scrollableHeight = scrollHeight - clientHeight;
      const trackHeight = clientHeight;
      const thumbHeight = this.thumbYSizeInternal();
      const scrollRatio = delta / (trackHeight - thumbHeight);

      viewport.scrollTop = this.dragStartScroll + scrollRatio * scrollableHeight;
    } else {
      const delta = event.clientX - this.dragStartPos;
      const scrollWidth = viewport.scrollWidth;
      const clientWidth = viewport.clientWidth;
      const scrollableWidth = scrollWidth - clientWidth;
      const trackWidth = clientWidth;
      const thumbWidth = this.thumbXSizeInternal();
      const scrollRatio = delta / (trackWidth - thumbWidth);

      viewport.scrollLeft = this.dragStartScroll + scrollRatio * scrollableWidth;
    }
  }

  /**
   * Handle pointer up to end thumb drag.
   */
  handlePointerUp(event: PointerEvent): void {
    if (!this.isDragging) return;

    this.isDragging = false;

    // Release pointer capture
    const target = event.target as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }

    // Remove listeners
    document.removeEventListener('pointermove', this.handlePointerMove.bind(this));
    document.removeEventListener('pointerup', this.handlePointerUp.bind(this));
  }

  /**
   * Set scrollbar hidden state.
   */
  setScrollbarHidden(orientation: ScrollAreaOrientation, hidden: boolean): void {
    if (orientation === 'vertical') {
      this.hiddenStateInternal.update((state) => ({
        ...state,
        scrollbarY: hidden,
      }));
    } else {
      this.hiddenStateInternal.update((state) => ({
        ...state,
        scrollbarX: hidden,
      }));
    }

    // Update corner visibility
    const currentState = this.hiddenStateInternal();
    this.hiddenStateInternal.update((state) => ({
      ...state,
      corner: currentState.scrollbarX || currentState.scrollbarY,
    }));
  }
}

/**
 * @fileoverview Angular port of Base UI Scroll Area Scrollbar
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area/scrollbar/ScrollAreaScrollbar.tsx
 */

import {
  Directive,
  ElementRef,
  Input,
  computed,
  inject,
  signal,
  afterNextRender,
  OnDestroy,
  booleanAttribute,
} from '@angular/core';
import {
  SCROLL_AREA_ROOT_CONTEXT,
  SCROLL_AREA_SCROLLBAR_CONTEXT,
  ScrollAreaOrientation,
} from './scroll-area.types';

/**
 * Scroll Area Scrollbar directive.
 * The scrollbar track that contains the thumb.
 *
 * @example
 * ```html
 * <div baseUiScrollAreaRoot>
 *   <!-- viewport -->
 *   <div baseUiScrollAreaScrollbar orientation="vertical">
 *     <div baseUiScrollAreaThumb></div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiScrollAreaScrollbar]',
  standalone: true,
  exportAs: 'scrollAreaScrollbar',
  providers: [
    {
      provide: SCROLL_AREA_SCROLLBAR_CONTEXT,
      useFactory: (directive: ScrollAreaScrollbarDirective) => ({
        orientation: directive._orientation(),
        hovering: directive.hoveringInternal,
        setHovering: (h: boolean) => directive.hoveringInternal.set(h),
      }),
      deps: [ScrollAreaScrollbarDirective],
    },
  ],
  host: {
    '[style.position]': '"absolute"',
    '[style.display]': 'isHidden() ? "none" : "flex"',
    '[style.top]': 'isVertical() ? "0" : null',
    '[style.right]': 'isVertical() ? "0" : "0"',
    '[style.bottom]': 'isHorizontal() ? "0" : null',
    '[style.left]': 'isHorizontal() ? "0" : null',
    '[style.width]': 'isVertical() ? null : "100%"',
    '[style.height]': 'isHorizontal() ? null : "100%"',
    '[style.flexDirection]': 'isVertical() ? "column" : "row"',
    '[attr.data-orientation]': '_orientation()',
    '[attr.data-hovering]': 'hoveringInternal() ? "" : null',
    '[attr.data-scrolling]': 'isScrolling() ? "" : null',
    '[class.base-ui-scroll-area-scrollbar]': 'true',
    '[class.base-ui-scroll-area-scrollbar-vertical]': 'isVertical()',
    '[class.base-ui-scroll-area-scrollbar-horizontal]': 'isHorizontal()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(wheel)': 'handleWheel($event)',
    '(pointerdown)': 'handlePointerDown($event)',
  },
})
export class ScrollAreaScrollbarDirective implements OnDestroy {
  protected readonly rootContext = inject(SCROLL_AREA_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Scrollbar orientation */
  readonly _orientation = signal<ScrollAreaOrientation>('vertical');

  @Input()
  set orientation(value: ScrollAreaOrientation) { this._orientation.set(value); }
  get orientation(): ScrollAreaOrientation { return this._orientation(); }

  /** Whether to keep mounted when not needed */
  private readonly _keepMounted = signal<boolean>(false);

  @Input({ transform: booleanAttribute })
  set keepMounted(value: boolean) { this._keepMounted.set(value); }
  get keepMounted(): boolean { return this._keepMounted(); }

  /** Hovering state */
  readonly hoveringInternal = signal(false);

  /** Whether scrollbar is vertical */
  readonly isVertical = computed(() => this._orientation() === 'vertical');

  /** Whether scrollbar is horizontal */
  readonly isHorizontal = computed(() => this._orientation() === 'horizontal');

  /** Whether scrollbar should be hidden */
  readonly isHidden = computed(() => {
    if (this._keepMounted()) {
      return false;
    }
    const hidden = this.rootContext.hiddenStateSignal();
    return this.isVertical() ? hidden.scrollbarY : hidden.scrollbarX;
  });

  /** Whether currently scrolling in this direction */
  readonly isScrolling = computed(() => {
    return this.isVertical()
      ? this.rootContext.scrollingYSignal()
      : this.rootContext.scrollingXSignal();
  });

  constructor() {
    afterNextRender(() => {
      // Register scrollbar element
      if (this.isVertical()) {
        this.rootContext.scrollbarYElement.set(this.elementRef.nativeElement);
      } else {
        this.rootContext.scrollbarXElement.set(this.elementRef.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isVertical()) {
      this.rootContext.scrollbarYElement.set(null);
    } else {
      this.rootContext.scrollbarXElement.set(null);
    }
  }

  handleMouseEnter(): void {
    this.hoveringInternal.set(true);
  }

  handleMouseLeave(): void {
    this.hoveringInternal.set(false);
  }

  /**
   * Handle wheel events on the scrollbar track.
   */
  handleWheel(event: WheelEvent): void {
    const viewport = this.rootContext.viewportElement();
    if (!viewport) return;

    event.preventDefault();

    if (this.isVertical()) {
      viewport.scrollTop += event.deltaY;
    } else {
      viewport.scrollLeft += event.deltaX || event.deltaY;
    }
  }

  /**
   * Handle click on scrollbar track to scroll to position.
   */
  handlePointerDown(event: PointerEvent): void {
    const viewport = this.rootContext.viewportElement();
    const thumb = this.isVertical()
      ? this.rootContext.thumbYElement()
      : this.rootContext.thumbXElement();

    if (!viewport || !thumb) return;

    // Only handle clicks on the track, not the thumb
    if (event.target === thumb) return;

    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    if (this.isVertical()) {
      const clickPosition = event.clientY - rect.top;
      const trackHeight = rect.height;
      const thumbHeight = this.rootContext.thumbYSize();
      const scrollableHeight = viewport.scrollHeight - viewport.clientHeight;

      // Calculate scroll position based on click
      const ratio = (clickPosition - thumbHeight / 2) / (trackHeight - thumbHeight);
      viewport.scrollTop = ratio * scrollableHeight;
    } else {
      const clickPosition = event.clientX - rect.left;
      const trackWidth = rect.width;
      const thumbWidth = this.rootContext.thumbXSize();
      const scrollableWidth = viewport.scrollWidth - viewport.clientWidth;

      // Calculate scroll position based on click
      const ratio = (clickPosition - thumbWidth / 2) / (trackWidth - thumbWidth);
      viewport.scrollLeft = ratio * scrollableWidth;
    }
  }
}

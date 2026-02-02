/**
 * @fileoverview Angular port of Base UI Toast Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/root/ToastRoot.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  output,
  signal,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import {
  TOAST_PROVIDER_CONTEXT,
  TOAST_ROOT_CONTEXT,
  ToastRootContext,
  ToastObject,
  SwipeDirection,
} from './toast.types';

let toastRootCounter = 0;

/**
 * Toast Root directive.
 * Individual toast notification container with swipe-to-dismiss support.
 *
 * @example
 * ```html
 * <div baseUiToastRoot [toast]="toast">
 *   <div baseUiToastTitle>{{ toast.title }}</div>
 *   <div baseUiToastDescription>{{ toast.description }}</div>
 *   <button baseUiToastClose>×</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToastRoot]',
  standalone: true,
  exportAs: 'toastRoot',
  providers: [
    {
      provide: TOAST_ROOT_CONTEXT,
      useFactory: (directive: ToastRootDirective) => directive.context,
      deps: [ToastRootDirective],
    },
  ],
  host: {
    '[attr.role]': 'role()',
    '[attr.aria-live]': 'ariaLive()',
    '[attr.aria-atomic]': '"true"',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    '[attr.data-type]': 'toast().type',
    '[attr.data-priority]': 'toast().priority',
    '[attr.data-transition-status]': 'toast().transitionStatus',
    '[attr.data-swiping]': 'swiping() ? "" : null',
    '[attr.data-limited]': 'toast().limited ? "" : null',
    '[style.display]': 'toast().limited ? "none" : null',
    '[style.transform]': 'swipeTransform()',
    '[class.base-ui-toast-root]': 'true',
    '[class.base-ui-toast-root-starting]': 'toast().transitionStatus === "starting"',
    '[class.base-ui-toast-root-ending]': 'toast().transitionStatus === "ending"',
    '(pointerdown)': 'handlePointerDown($event)',
    '(pointermove)': 'handlePointerMove($event)',
    '(pointerup)': 'handlePointerUp($event)',
    '(pointercancel)': 'handlePointerUp($event)',
    '(keydown.escape)': 'handleEscape()',
  },
})
export class ToastRootDirective implements OnDestroy {
  protected readonly providerContext = inject(TOAST_PROVIDER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Toast data */
  readonly toast = input.required<ToastObject>();

  /** Emitted when toast is closed */
  readonly closed = output<void>();

  // IDs for accessibility
  private readonly rootIdNum = ++toastRootCounter;
  readonly titleId = `toast-title-${this.rootIdNum}`;
  readonly descriptionId = `toast-description-${this.rootIdNum}`;

  // Swipe state
  private readonly swipingInternal = signal(false);
  private readonly swipeDirection = signal<SwipeDirection | null>(null);
  private readonly swipeOffset = signal({ x: 0, y: 0 });
  private pointerStartPos = { x: 0, y: 0 };
  private isPointerDown = false;

  /** Whether currently swiping */
  readonly swiping = computed(() => this.swipingInternal());

  /** Role based on priority */
  readonly role = computed(() => {
    return this.toast().priority === 'high' ? 'alertdialog' : 'dialog';
  });

  /** Aria-live based on priority */
  readonly ariaLive = computed(() => {
    return this.toast().priority === 'high' ? 'assertive' : 'polite';
  });

  /** Transform for swipe animation */
  readonly swipeTransform = computed(() => {
    const offset = this.swipeOffset();
    if (offset.x === 0 && offset.y === 0) {
      return null;
    }
    return `translate(${offset.x}px, ${offset.y}px)`;
  });

  /** Context for child components */
  readonly context: ToastRootContext;

  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    const self = this;

    this.context = {
      get toast() {
        return self.toast();
      },
      close: () => this.close(),
      titleId: this.titleId,
      descriptionId: this.descriptionId,
    };

    // Set up height measurement
    afterNextRender(() => {
      this.measureHeight();

      this.resizeObserver = new ResizeObserver(() => {
        this.measureHeight();
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);

      // Mark as entered after a tick
      setTimeout(() => {
        const toast = this.toast();
        if (toast.transitionStatus === 'starting') {
          this.providerContext.update({
            id: toast.id,
            transitionStatus: undefined,
          } as any);
        }
      }, 10);
    });
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * Close this toast.
   */
  close(): void {
    const toast = this.toast();
    this.providerContext.close(toast.id);
    this.closed.emit();
  }

  /**
   * Measure and update toast height.
   */
  private measureHeight(): void {
    const height = this.elementRef.nativeElement.offsetHeight;
    const toast = this.toast();
    if (height !== toast.height) {
      this.providerContext.setToastHeight(toast.id, height);
    }
  }

  /**
   * Handle escape key to close.
   */
  handleEscape(): void {
    this.close();
  }

  /**
   * Handle pointer down for swipe.
   */
  handlePointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;

    this.isPointerDown = true;
    this.pointerStartPos = { x: event.clientX, y: event.clientY };
    this.swipeOffset.set({ x: 0, y: 0 });

    // Capture pointer
    this.elementRef.nativeElement.setPointerCapture(event.pointerId);
  }

  /**
   * Handle pointer move for swipe.
   */
  handlePointerMove(event: PointerEvent): void {
    if (!this.isPointerDown) return;

    const deltaX = event.clientX - this.pointerStartPos.x;
    const deltaY = event.clientY - this.pointerStartPos.y;

    // Determine swipe direction if not set
    if (!this.swipeDirection() && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      const direction = this.determineSwipeDirection(deltaX, deltaY);
      this.swipeDirection.set(direction);
    }

    const direction = this.swipeDirection();
    const allowedDirections = this.providerContext.swipeDirections;

    // Only allow swiping in configured directions
    if (direction && allowedDirections.includes(direction)) {
      this.swipingInternal.set(true);

      // Apply damping for non-primary direction
      if (direction === 'left' || direction === 'right') {
        this.swipeOffset.set({ x: deltaX, y: 0 });
      } else {
        this.swipeOffset.set({ x: 0, y: deltaY });
      }
    }
  }

  /**
   * Handle pointer up for swipe.
   */
  handlePointerUp(event: PointerEvent): void {
    if (!this.isPointerDown) return;

    this.isPointerDown = false;

    // Release pointer
    if (this.elementRef.nativeElement.hasPointerCapture(event.pointerId)) {
      this.elementRef.nativeElement.releasePointerCapture(event.pointerId);
    }

    // Check if swipe threshold exceeded
    const offset = this.swipeOffset();
    const threshold = 40;

    if (this.swipingInternal()) {
      const absX = Math.abs(offset.x);
      const absY = Math.abs(offset.y);

      if (absX > threshold || absY > threshold) {
        // Dismiss
        this.close();
      }
    }

    // Reset state
    this.swipingInternal.set(false);
    this.swipeDirection.set(null);
    this.swipeOffset.set({ x: 0, y: 0 });
  }

  /**
   * Determine swipe direction from deltas.
   */
  private determineSwipeDirection(deltaX: number, deltaY: number): SwipeDirection {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }
}

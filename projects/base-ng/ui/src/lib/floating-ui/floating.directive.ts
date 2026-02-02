/**
 * @fileoverview Angular directive for floating element positioning
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/floating-ui-react/
 */

import {
  afterNextRender,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
  type OnDestroy,
} from '@angular/core';
import type { Middleware } from '@floating-ui/dom';
import { FloatingService } from './floating-ui.service';
import type { FloatingPlacement, FloatingResult, FloatingStrategy } from './floating-ui.types';

/**
 * Directive to make an element a floating element.
 * Provides automatic positioning relative to a reference element.
 *
 * @example
 * ```html
 * <button #triggerRef>Open</button>
 * <div *ngIf="isOpen"
 *      baseUiFloating
 *      [referenceElement]="triggerRef"
 *      [placement]="'bottom-start'"
 *      (positioned)="onPositioned($event)">
 *   Floating content
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiFloating]',
  standalone: true,
  providers: [FloatingService],
  host: {
    '[style.position]': 'floatingService.strategy()',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.transform]': 'transformStyle()',
  },
})
export class FloatingDirective implements OnDestroy {
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * The reference element to position against.
   */
  readonly referenceElement = input<Element | null>(null);

  /**
   * The placement of the floating element.
   */
  readonly placement = input<FloatingPlacement>('bottom');

  /**
   * The positioning strategy.
   */
  readonly strategy = input<FloatingStrategy>('absolute');

  /**
   * Middleware array for customizing positioning.
   */
  readonly middleware = input<Middleware[]>([]);

  /**
   * Whether to automatically update position on scroll/resize.
   */
  readonly autoUpdate = input<boolean>(true);

  /**
   * Emitted when the floating element is positioned.
   */
  readonly positioned = output<FloatingResult>();

  /**
   * Computed transform style string.
   */
  protected transformStyle(): string {
    return `translate(${Math.round(this.floatingService.x())}px, ${Math.round(this.floatingService.y())}px)`;
  }

  constructor() {
    // Set floating element after render
    afterNextRender(() => {
      this.floatingService.setFloating(this.elementRef.nativeElement);
      this.floatingService.startAutoUpdate();
    });

    // React to input changes
    effect(() => {
      const reference = this.referenceElement();
      this.floatingService.setReference(reference);
    });

    effect(() => {
      this.floatingService.configure({
        placement: this.placement(),
        strategy: this.strategy(),
        middleware: this.middleware(),
        autoUpdate: this.autoUpdate(),
      });
    });

    // Emit positioned events
    effect(() => {
      if (this.floatingService.isPositioned()) {
        this.positioned.emit({
          x: this.floatingService.x(),
          y: this.floatingService.y(),
          placement: this.floatingService.placement(),
          strategy: this.floatingService.strategy(),
          middlewareData: this.floatingService.middlewareData(),
          isPositioned: true,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.floatingService.cleanup();
  }
}

/**
 * Directive for the arrow element within a floating element.
 *
 * @example
 * ```html
 * <div baseUiFloating [referenceElement]="triggerRef">
 *   Content
 *   <div baseUiFloatingArrow></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiFloatingArrow]',
  standalone: true,
  host: {
    '[style.position]': '"absolute"',
    '[style.left.px]': 'arrowX()',
    '[style.top.px]': 'arrowY()',
  },
})
export class FloatingArrowDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly floatingService = inject(FloatingService, { optional: true });

  /**
   * Arrow X position.
   */
  protected arrowX(): number | undefined {
    return this.floatingService?.arrowData()?.x;
  }

  /**
   * Arrow Y position.
   */
  protected arrowY(): number | undefined {
    return this.floatingService?.arrowData()?.y;
  }

  constructor() {
    afterNextRender(() => {
      if (this.floatingService) {
        this.floatingService.setArrow(this.elementRef.nativeElement);
      }
    });
  }
}

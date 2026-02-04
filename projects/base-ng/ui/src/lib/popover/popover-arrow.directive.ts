/**
 * @fileoverview Angular port of Base UI PopoverArrow
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/arrow/PopoverArrow.tsx
 *
 * A visual arrow pointing toward the anchor element.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { FloatingService } from '../floating-ui';
import { POPOVER_CONTEXT, POPOVER_POSITIONER_CONTEXT } from './popover.types';

/**
 * Arrow directive for popovers.
 * Renders an arrow pointing toward the trigger element.
 *
 * @example
 * ```html
 * <div baseUiPopoverArrow></div>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverArrow]',
  standalone: true,
  exportAs: 'popoverArrow',
  host: {
    'aria-hidden': 'true',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[attr.data-uncentered]': 'positionerContext.arrowUncentered ? "" : null',
    '[class.base-ui-popover-arrow]': 'true',
    '[style.position]': '"absolute"',
    '[style.top]': 'arrowTop()',
    '[style.left]': 'arrowLeft()',
    '[style.right]': 'arrowRight()',
    '[style.bottom]': 'arrowBottom()',
  },
})
export class PopoverArrowDirective implements OnInit {
  protected readonly context = inject(POPOVER_CONTEXT);
  protected readonly positionerContext = inject(POPOVER_POSITIONER_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Arrow top style */
  readonly arrowTop = computed(() => {
    return this.positionerContext.arrowStyles?.top ?? null;
  });

  /** Arrow left style */
  readonly arrowLeft = computed(() => {
    return this.positionerContext.arrowStyles?.left ?? null;
  });

  /** Arrow right style */
  readonly arrowRight = computed(() => {
    return this.positionerContext.arrowStyles?.right ?? null;
  });

  /** Arrow bottom style */
  readonly arrowBottom = computed(() => {
    return this.positionerContext.arrowStyles?.bottom ?? null;
  });

  ngOnInit(): void {
    this.floatingService.setArrow(this.elementRef.nativeElement);
  }
}

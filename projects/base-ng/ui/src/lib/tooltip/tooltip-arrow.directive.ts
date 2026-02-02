/**
 * @fileoverview Angular port of Base UI TooltipArrow
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tooltip/arrow/TooltipArrow.tsx
 *
 * An arrow element that points to the trigger.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { FloatingService } from '../floating-ui';
import { TOOLTIP_CONTEXT, TOOLTIP_POSITIONER_CONTEXT } from './tooltip.types';

/**
 * Arrow directive for tooltips.
 * Renders a positioned arrow pointing to the trigger.
 *
 * @example
 * ```html
 * <div baseUiTooltipPositioner>
 *   <div baseUiTooltipPopup>
 *     Tooltip content
 *     <div baseUiTooltipArrow></div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiTooltipArrow]',
  standalone: true,
  exportAs: 'tooltipArrow',
  host: {
    'aria-hidden': 'true',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[attr.data-uncentered]': 'positionerContext.arrowUncentered ? "" : null',
    '[class.base-ui-tooltip-arrow]': 'true',
    '[style.position]': '"absolute"',
    '[style.left.px]': 'floatingService.arrowData().x',
    '[style.top.px]': 'floatingService.arrowData().y',
  },
})
export class TooltipArrowDirective implements OnInit {
  protected readonly context = inject(TOOLTIP_CONTEXT);
  protected readonly positionerContext = inject(TOOLTIP_POSITIONER_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.floatingService.setArrow(this.elementRef.nativeElement);
  }
}

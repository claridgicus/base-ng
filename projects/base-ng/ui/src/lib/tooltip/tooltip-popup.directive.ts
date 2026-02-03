/**
 * @directive TooltipPopup
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/popup/TooltipPopup.tsx
 * @reactDocs https://base-ui.com/react/components/tooltip
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A container for the tooltip contents.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TOOLTIP_CONTEXT, TOOLTIP_POSITIONER_CONTEXT } from './tooltip.types';

/**
 * Popup directive for tooltips.
 * Contains the tooltip content.
 *
 * @example
 * ```html
 * <div baseUiTooltipPopup>Tooltip content</div>
 * ```
 */
@Directive({
  selector: '[baseUiTooltipPopup]',
  standalone: true,
  exportAs: 'tooltipPopup',
  host: {
    role: 'tooltip',
    '[id]': 'context.getPopupId()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[class.base-ui-tooltip-popup]': 'true',
    '[class.base-ui-tooltip-popup-open]': 'context.openSignal()',
    '[class.base-ui-tooltip-popup-closed]': '!context.openSignal()',
  },
})
export class TooltipPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(TOOLTIP_CONTEXT);
  protected readonly positionerContext = inject(TOOLTIP_POSITIONER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.context.setPopupElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setPopupElement(null);
  }
}

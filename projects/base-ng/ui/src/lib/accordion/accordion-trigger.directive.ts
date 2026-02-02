/**
 * @fileoverview Angular port of Base UI AccordionTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/trigger/AccordionTrigger.tsx
 *
 * A button that toggles an accordion item.
 */

import {
  Directive,
  inject,
} from '@angular/core';
import { ACCORDION_ITEM_CONTEXT } from './accordion.types';

/**
 * Trigger directive for accordion item.
 * Opens and closes the accordion panel.
 *
 * @example
 * ```html
 * <h3 baseUiAccordionHeader>
 *   <button baseUiAccordionTrigger>Section 1</button>
 * </h3>
 * ```
 */
@Directive({
  selector: '[baseUiAccordionTrigger]',
  standalone: true,
  exportAs: 'accordionTrigger',
  host: {
    type: 'button',
    '[id]': 'context.triggerId',
    '[attr.aria-expanded]': 'context.openSignal()',
    '[attr.aria-controls]': 'context.panelId',
    '[attr.aria-disabled]': 'context.disabledSignal() ? "true" : null',
    '[attr.disabled]': 'context.disabledSignal() ? "" : null',
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[attr.data-disabled]': 'context.disabledSignal() ? "" : null',
    '[class.base-ui-accordion-trigger]': 'true',
    '[class.base-ui-accordion-trigger-open]': 'context.openSignal()',
    '[class.base-ui-accordion-trigger-closed]': '!context.openSignal()',
    '(click)': 'handleClick($event)',
  },
})
export class AccordionTriggerDirective {
  protected readonly context = inject(ACCORDION_ITEM_CONTEXT);

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.context.disabledSignal()) {
      event.preventDefault();
      return;
    }
    this.context.toggle();
  }
}

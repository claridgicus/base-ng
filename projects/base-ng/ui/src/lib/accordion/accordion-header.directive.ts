/**
 * @fileoverview Angular port of Base UI AccordionHeader
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/header/AccordionHeader.tsx
 *
 * A heading for an accordion item.
 */

import {
  Directive,
  inject,
} from '@angular/core';
import { ACCORDION_ITEM_CONTEXT } from './accordion.types';

/**
 * Header directive for accordion item.
 * Provides semantic heading wrapper for the trigger.
 *
 * @example
 * ```html
 * <h3 baseUiAccordionHeader>
 *   <button baseUiAccordionTrigger>Section 1</button>
 * </h3>
 * ```
 */
@Directive({
  selector: '[baseUiAccordionHeader]',
  standalone: true,
  exportAs: 'accordionHeader',
  host: {
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[attr.data-disabled]': 'context.disabledSignal() ? "" : null',
    '[class.base-ui-accordion-header]': 'true',
  },
})
export class AccordionHeaderDirective {
  protected readonly context = inject(ACCORDION_ITEM_CONTEXT);
}

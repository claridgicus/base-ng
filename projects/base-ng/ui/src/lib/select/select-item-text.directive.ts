/**
 * @fileoverview Angular port of Base UI Select Item Text
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/item-text/SelectItemText.tsx
 */

import {
  Directive,
  inject,
} from '@angular/core';
import { SELECT_ITEM_CONTEXT } from './select.types';

/**
 * Select Item Text directive.
 * Wrapper for the item's text content.
 * Renders a `<span>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectItem [value]="'apple'">
 *   <span baseUiSelectItemIndicator>✓</span>
 *   <span baseUiSelectItemText>Apple</span>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectItemText]',
  standalone: true,
  exportAs: 'selectItemText',
  host: {
    '[class.base-ui-select-item-text]': 'true',
    '[class.base-ui-select-item-text-selected]': 'itemContext.selected',
    '[class.base-ui-select-item-text-highlighted]': 'itemContext.highlighted',
    '[class.base-ui-select-item-text-disabled]': 'itemContext.disabled',
    '[attr.data-selected]': 'itemContext.selected ? "" : null',
    '[attr.data-highlighted]': 'itemContext.highlighted ? "" : null',
    '[attr.data-disabled]': 'itemContext.disabled ? "" : null',
  },
})
export class SelectItemTextDirective {
  protected readonly itemContext = inject(SELECT_ITEM_CONTEXT);
}

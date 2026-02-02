/**
 * @fileoverview Angular port of Base UI Select Item Indicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/item-indicator/SelectItemIndicator.tsx
 */

import {
  Directive,
  computed,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';
import { SELECT_ITEM_CONTEXT } from './select.types';

/**
 * Select Item Indicator directive.
 * Displays an indicator when the item is selected.
 * Renders a `<span>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectItem [value]="'apple'">
 *   <span baseUiSelectItemIndicator>✓</span>
 *   Apple
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectItemIndicator]',
  standalone: true,
  exportAs: 'selectItemIndicator',
  host: {
    'aria-hidden': 'true',
    '[class.base-ui-select-item-indicator]': 'true',
    '[class.base-ui-select-item-indicator-selected]': 'itemContext.selected',
    '[attr.data-selected]': 'itemContext.selected ? "" : null',
    '[style.visibility]': 'isVisible() ? "visible" : "hidden"',
  },
})
export class SelectItemIndicatorDirective {
  protected readonly itemContext = inject(SELECT_ITEM_CONTEXT);

  /**
   * Whether to keep the indicator mounted when not selected.
   */
  readonly keepMounted = input(true, { transform: booleanAttribute });

  /** Whether the indicator should be visible */
  readonly isVisible = computed(() => {
    return this.itemContext.selected || this.keepMounted();
  });
}

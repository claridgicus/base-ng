/**
 * @fileoverview Angular port of Base UI Combobox Item Indicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/item-indicator/ComboboxItemIndicator.tsx
 */

import {
  Directive,
  computed,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';
import { COMBOBOX_ITEM_CONTEXT } from './combobox.types';

@Directive({
  selector: '[baseUiComboboxItemIndicator]',
  standalone: true,
  exportAs: 'comboboxItemIndicator',
  host: {
    'aria-hidden': 'true',
    '[class.base-ui-combobox-item-indicator]': 'true',
    '[class.base-ui-combobox-item-indicator-selected]': 'itemContext.selected',
    '[attr.data-selected]': 'itemContext.selected ? "" : null',
    '[style.visibility]': 'isVisible() ? "visible" : "hidden"',
  },
})
export class ComboboxItemIndicatorDirective {
  protected readonly itemContext = inject(COMBOBOX_ITEM_CONTEXT);
  readonly keepMounted = input(true, { transform: booleanAttribute });

  readonly isVisible = computed(() => {
    return this.itemContext.selected || this.keepMounted();
  });
}

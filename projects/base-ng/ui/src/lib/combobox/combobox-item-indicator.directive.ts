/**
 * @fileoverview Angular port of Base UI Combobox Item Indicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/item-indicator/ComboboxItemIndicator.tsx
 */

import {
  Directive,
  Input,
  computed,
  inject,
  signal,
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

  // Private signal for internal state management
  private readonly _keepMounted = signal(true);

  @Input({ transform: booleanAttribute })
  get keepMounted(): boolean {
    return this._keepMounted();
  }
  set keepMounted(value: boolean) {
    this._keepMounted.set(value);
  }

  readonly isVisible = computed(() => {
    return this.itemContext.selected || this._keepMounted();
  });
}

/**
 * @fileoverview Angular port of Base UI Combobox Clear
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/clear/ComboboxClear.tsx
 */

import {
  Directive,
  computed,
  inject,
} from '@angular/core';
import { COMBOBOX_ROOT_CONTEXT } from './combobox.types';

/**
 * Combobox Clear directive.
 * A button to clear the selected value and input.
 */
@Directive({
  selector: '[baseUiComboboxClear]',
  standalone: true,
  exportAs: 'comboboxClear',
  host: {
    type: 'button',
    '[attr.aria-label]': '"Clear"',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-has-value]': 'hasValue() ? "" : null',
    '[class.base-ui-combobox-clear]': 'true',
    '[class.base-ui-combobox-clear-disabled]': 'isDisabled()',
    '[style.display]': 'hasValue() ? null : "none"',
    '(click)': 'handleClick($event)',
  },
})
export class ComboboxClearDirective {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);

  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal();
  });

  readonly hasValue = computed(() => {
    return this.rootContext.hasSelectedValue() || this.rootContext.inputValueSignal().length > 0;
  });

  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    this.rootContext.clear();
    this.rootContext.inputElement()?.focus();
  }
}

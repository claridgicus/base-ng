/**
 * @fileoverview Angular port of Base UI Combobox Empty
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/empty/ComboboxEmpty.tsx
 */

import {
  Directive,
  computed,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';
import { COMBOBOX_ROOT_CONTEXT } from './combobox.types';

/**
 * Combobox Empty directive.
 * Displayed when no items match the filter.
 */
@Directive({
  selector: '[baseUiComboboxEmpty]',
  standalone: true,
  exportAs: 'comboboxEmpty',
  host: {
    '[class.base-ui-combobox-empty]': 'true',
    '[attr.data-empty]': 'isEmpty() ? "" : null',
    '[style.display]': 'isVisible() ? null : "none"',
  },
})
export class ComboboxEmptyDirective {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  readonly keepMounted = input(false, { transform: booleanAttribute });

  readonly isEmpty = computed(() => {
    return this.rootContext.getFilteredItems().length === 0;
  });

  readonly isVisible = computed(() => {
    return this.isEmpty() || this.keepMounted();
  });
}

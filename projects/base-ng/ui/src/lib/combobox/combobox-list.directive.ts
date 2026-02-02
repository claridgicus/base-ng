/**
 * @fileoverview Angular port of Base UI Combobox List
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/list/ComboboxList.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  afterNextRender,
} from '@angular/core';
import { COMBOBOX_ROOT_CONTEXT } from './combobox.types';

@Directive({
  selector: '[baseUiComboboxList]',
  standalone: true,
  exportAs: 'comboboxList',
  host: {
    role: 'listbox',
    '[attr.id]': 'listId',
    '[attr.aria-multiselectable]': 'rootContext.multipleSignal() || undefined',
    '[class.base-ui-combobox-list]': 'true',
    '[class.base-ui-combobox-list-empty]': 'isEmpty()',
    '[attr.data-empty]': 'isEmpty() ? "" : null',
  },
})
export class ComboboxListDirective {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly listId = `${this.rootContext.rootId}-list`;

  readonly isEmpty = computed(() => {
    return this.rootContext.getFilteredItems().length === 0;
  });

  constructor() {
    afterNextRender(() => {
      this.rootContext.setListElement(this.elementRef.nativeElement);
    });
  }
}

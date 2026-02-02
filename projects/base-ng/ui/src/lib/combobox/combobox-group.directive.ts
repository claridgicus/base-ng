/**
 * @fileoverview Angular port of Base UI Combobox Group
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/group/ComboboxGroup.tsx
 */

import { Directive, signal } from '@angular/core';
import { COMBOBOX_GROUP_CONTEXT, type ComboboxGroupContext } from './combobox.types';

@Directive({
  selector: '[baseUiComboboxGroup]',
  standalone: true,
  exportAs: 'comboboxGroup',
  providers: [
    {
      provide: COMBOBOX_GROUP_CONTEXT,
      useFactory: (directive: ComboboxGroupDirective) => directive.groupContext,
      deps: [ComboboxGroupDirective],
    },
  ],
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class.base-ui-combobox-group]': 'true',
  },
})
export class ComboboxGroupDirective {
  private readonly labelIdInternal = signal<string | null>(null);
  readonly labelId = this.labelIdInternal.asReadonly();

  readonly groupContext: ComboboxGroupContext;

  constructor() {
    const self = this;
    this.groupContext = {
      get labelId() { return self.labelId(); },
      setLabelId: (id: string) => this.labelIdInternal.set(id),
    };
  }
}

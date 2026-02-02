/**
 * @fileoverview Angular port of Base UI Combobox Group Label
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/group-label/ComboboxGroupLabel.tsx
 */

import { Directive, inject, afterNextRender } from '@angular/core';
import { COMBOBOX_GROUP_CONTEXT } from './combobox.types';

let labelIdCounter = 0;

@Directive({
  selector: '[baseUiComboboxGroupLabel]',
  standalone: true,
  exportAs: 'comboboxGroupLabel',
  host: {
    '[attr.id]': 'labelId',
    '[class.base-ui-combobox-group-label]': 'true',
  },
})
export class ComboboxGroupLabelDirective {
  private readonly groupContext = inject(COMBOBOX_GROUP_CONTEXT);
  readonly labelId = `base-ui-combobox-group-label-${++labelIdCounter}`;

  constructor() {
    afterNextRender(() => {
      this.groupContext.setLabelId(this.labelId);
    });
  }
}

/**
 * @fileoverview Angular port of Base UI Select Group Label
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/group-label/SelectGroupLabel.tsx
 */

import {
  Directive,
  inject,
  afterNextRender,
} from '@angular/core';
import { SELECT_GROUP_CONTEXT } from './select.types';

let labelIdCounter = 0;

/**
 * Select Group Label directive.
 * An accessible label that names a group of items.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectGroup>
 *   <div baseUiSelectGroupLabel>Fruits</div>
 *   <div baseUiSelectItem [value]="'apple'">Apple</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectGroupLabel]',
  standalone: true,
  exportAs: 'selectGroupLabel',
  host: {
    '[attr.id]': 'labelId',
    '[class.base-ui-select-group-label]': 'true',
  },
})
export class SelectGroupLabelDirective {
  private readonly groupContext = inject(SELECT_GROUP_CONTEXT);

  readonly labelId = `base-ui-select-group-label-${++labelIdCounter}`;

  constructor() {
    afterNextRender(() => {
      this.groupContext.setLabelId(this.labelId);
    });
  }
}

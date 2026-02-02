/**
 * @fileoverview Angular port of Base UI Select Group
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/group/SelectGroup.tsx
 */

import {
  Directive,
  signal,
} from '@angular/core';
import {
  SELECT_GROUP_CONTEXT,
  type SelectGroupContext,
} from './select.types';

let groupIdCounter = 0;

/**
 * Select Group directive.
 * Groups related select items with the corresponding label.
 * Renders a `<div>` element with group role.
 *
 * @example
 * ```html
 * <div baseUiSelectList>
 *   <div baseUiSelectGroup>
 *     <div baseUiSelectGroupLabel>Fruits</div>
 *     <div baseUiSelectItem [value]="'apple'">Apple</div>
 *     <div baseUiSelectItem [value]="'banana'">Banana</div>
 *   </div>
 *   <div baseUiSelectGroup>
 *     <div baseUiSelectGroupLabel>Vegetables</div>
 *     <div baseUiSelectItem [value]="'carrot'">Carrot</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectGroup]',
  standalone: true,
  exportAs: 'selectGroup',
  providers: [
    {
      provide: SELECT_GROUP_CONTEXT,
      useFactory: (directive: SelectGroupDirective) => directive.groupContext,
      deps: [SelectGroupDirective],
    },
  ],
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class.base-ui-select-group]': 'true',
  },
})
export class SelectGroupDirective {
  private readonly labelIdInternal = signal<string | null>(null);

  /** The label ID for the group */
  readonly labelId = this.labelIdInternal.asReadonly();

  /** Context provided to child components */
  readonly groupContext: SelectGroupContext;

  constructor() {
    const self = this;
    this.groupContext = {
      get labelId() {
        return self.labelId();
      },
      setLabelId: (id: string) => this.labelIdInternal.set(id),
    };
  }
}

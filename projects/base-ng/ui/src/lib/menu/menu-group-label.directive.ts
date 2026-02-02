/**
 * @fileoverview Angular port of Base UI MenuGroupLabel
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/group-label/MenuGroupLabel.tsx
 *
 * A label for a menu group.
 */

import { Directive, inject, OnInit, OnDestroy } from '@angular/core';
import { MENU_GROUP_CONTEXT } from './menu.types';

let groupLabelIdCounter = 0;

/**
 * Group label directive for menus.
 * Provides an accessible label for a menu group.
 *
 * @example
 * ```html
 * <div baseUiMenuGroupLabel>Actions</div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuGroupLabel]',
  standalone: true,
  exportAs: 'menuGroupLabel',
  host: {
    role: 'presentation',
    '[id]': 'labelId',
    '[class.base-ui-menu-group-label]': 'true',
  },
})
export class MenuGroupLabelDirective implements OnInit, OnDestroy {
  protected readonly groupContext = inject(MENU_GROUP_CONTEXT);

  /** Unique ID for this label */
  readonly labelId = `base-ui-menu-group-label-${groupLabelIdCounter++}`;

  ngOnInit(): void {
    this.groupContext.setLabelId(this.labelId);
  }

  ngOnDestroy(): void {
    this.groupContext.setLabelId(null);
  }
}

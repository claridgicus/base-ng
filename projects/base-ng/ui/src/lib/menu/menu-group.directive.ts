/**
 * @fileoverview Angular port of Base UI MenuGroup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/group/MenuGroup.tsx
 *
 * Groups related menu items.
 */

import { computed, Directive, inject, signal } from '@angular/core';
import { MENU_GROUP_CONTEXT, type MenuGroupContext } from './menu.types';

/**
 * Group directive for menus.
 * Groups related menu items with a label.
 *
 * @example
 * ```html
 * <div baseUiMenuGroup>
 *   <div baseUiMenuGroupLabel>Actions</div>
 *   <div baseUiMenuItem>Edit</div>
 *   <div baseUiMenuItem>Delete</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuGroup]',
  standalone: true,
  exportAs: 'menuGroup',
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelIdSignal()',
    '[class.base-ui-menu-group]': 'true',
  },
  providers: [
    {
      provide: MENU_GROUP_CONTEXT,
      useFactory: () => {
        const directive = inject(MenuGroupDirective);
        return directive.context;
      },
    },
  ],
})
export class MenuGroupDirective {
  /** Label ID signal */
  readonly labelIdSignal = signal<string | null>(null);

  /**
   * The context provided to child components.
   */
  readonly context: MenuGroupContext = {
    labelId: null,
    labelIdSignal: this.labelIdSignal.asReadonly(),
    setLabelId: (id) => {
      this.labelIdSignal.set(id);
      this.context.labelId = id;
    },
  };
}

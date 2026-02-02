/**
 * @fileoverview Angular port of Base UI Menu Separator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/separator/Separator.tsx
 *
 * A visual separator between menu items.
 */

import { Directive } from '@angular/core';

/**
 * Separator directive for menus.
 * Creates a visual divider between menu items.
 *
 * @example
 * ```html
 * <hr baseUiMenuSeparator />
 * ```
 */
@Directive({
  selector: '[baseUiMenuSeparator]',
  standalone: true,
  exportAs: 'menuSeparator',
  host: {
    role: 'separator',
    '[attr.aria-orientation]': '"horizontal"',
    '[class.base-ui-menu-separator]': 'true',
  },
})
export class MenuSeparatorDirective {}

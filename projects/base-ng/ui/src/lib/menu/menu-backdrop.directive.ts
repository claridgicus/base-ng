/**
 * @fileoverview Angular port of Base UI MenuBackdrop
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/backdrop/MenuBackdrop.tsx
 *
 * An overlay displayed beneath the menu popup.
 */

import { Directive, inject } from '@angular/core';
import { MENU_CONTEXT } from './menu.types';

/**
 * Backdrop directive for menus.
 * Creates an overlay behind the menu popup.
 *
 * @example
 * ```html
 * <div baseUiMenuBackdrop></div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuBackdrop]',
  standalone: true,
  exportAs: 'menuBackdrop',
  host: {
    role: 'presentation',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[hidden]': '!context.openSignal()',
    '[class.base-ui-menu-backdrop]': 'true',
    '[class.base-ui-menu-backdrop-open]': 'context.openSignal()',
    '[class.base-ui-menu-backdrop-closed]': '!context.openSignal()',
    '[style.user-select]': '"none"',
    '[style.position]': '"fixed"',
    '[style.inset]': '"0"',
    '[style.z-index]': '"999"',
  },
})
export class MenuBackdropDirective {
  protected readonly context = inject(MENU_CONTEXT);
}

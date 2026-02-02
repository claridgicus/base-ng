/**
 * @fileoverview Angular port of Base UI ContextMenu Separator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/separator/Separator.tsx
 *
 * A visual separator between context menu items.
 */

import { Directive } from '@angular/core';

/**
 * Separator directive for context menus.
 * Creates a visual divider between items.
 *
 * @example
 * ```html
 * <hr baseUiContextMenuSeparator />
 * ```
 */
@Directive({
  selector: '[baseUiContextMenuSeparator]',
  standalone: true,
  exportAs: 'contextMenuSeparator',
  host: {
    role: 'separator',
    '[attr.aria-orientation]': '"horizontal"',
    '[class.base-ui-context-menu-separator]': 'true',
  },
})
export class ContextMenuSeparatorDirective {}

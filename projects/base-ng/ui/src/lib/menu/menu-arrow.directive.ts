/**
 * @fileoverview Angular port of Base UI MenuArrow
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/arrow/MenuArrow.tsx
 *
 * A visual arrow pointing to the trigger.
 */

import { Directive, inject, input } from '@angular/core';
import { MENU_CONTEXT } from './menu.types';

/**
 * Arrow directive for menus.
 * Creates a visual arrow pointing to the trigger element.
 *
 * @example
 * ```html
 * <div baseUiMenuArrow></div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuArrow]',
  standalone: true,
  exportAs: 'menuArrow',
  host: {
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[hidden]': '!context.openSignal()',
    '[class.base-ui-menu-arrow]': 'true',
  },
})
export class MenuArrowDirective {
  protected readonly context = inject(MENU_CONTEXT);

  /**
   * Whether to hide the arrow when it cannot be centered.
   */
  readonly hideWhenUncentered = input(false);
}

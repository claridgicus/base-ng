/**
 * @fileoverview Angular port of Base UI Navigation Menu List
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/list/NavigationMenuList.tsx
 */

import {
  Directive,
  inject,
  computed,
} from '@angular/core';
import {
  NAVIGATION_MENU_ROOT_CONTEXT,
} from './navigation-menu.types';

/**
 * Navigation Menu List directive.
 * Contains a list of navigation menu items.
 * Renders a `<ul>` element.
 *
 * @example
 * ```html
 * <nav baseUiNavigationMenuRoot>
 *   <ul baseUiNavigationMenuList>
 *     <li baseUiNavigationMenuItem value="products">...</li>
 *     <li baseUiNavigationMenuItem value="resources">...</li>
 *   </ul>
 * </nav>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuList]',
  standalone: true,
  exportAs: 'navigationMenuList',
  host: {
    role: 'menubar',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[class.base-ui-navigation-menu-list]': 'true',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class NavigationMenuListDirective {
  protected readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);

  /** Whether the menu is open */
  readonly open = computed(() => this.rootContext.openSignal());

  /**
   * Handle keydown events for navigation.
   * Stop propagation for arrow keys based on orientation.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this.rootContext.nested) {
      // When nested, don't stop propagation so parent can handle
      return;
    }

    const orientation = this.rootContext.orientation;
    const shouldStop =
      (orientation === 'horizontal' &&
        (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) ||
      (orientation === 'vertical' &&
        (event.key === 'ArrowUp' || event.key === 'ArrowDown'));

    if (shouldStop) {
      event.stopPropagation();
    }
  }
}

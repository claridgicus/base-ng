/**
 * @fileoverview Angular port of Base UI Navigation Menu Icon
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/icon/NavigationMenuIcon.tsx
 */

import {
  Directive,
  inject,
  computed,
} from '@angular/core';
import {
  NAVIGATION_MENU_ROOT_CONTEXT,
  NAVIGATION_MENU_ITEM_CONTEXT,
} from './navigation-menu.types';

/**
 * Navigation Menu Icon directive.
 * An icon or indicator within the trigger that can animate based on state.
 * Renders a `<span>` element.
 *
 * @example
 * ```html
 * <button baseUiNavigationMenuTrigger>
 *   Products
 *   <span baseUiNavigationMenuIcon>▼</span>
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuIcon]',
  standalone: true,
  exportAs: 'navigationMenuIcon',
  host: {
    'aria-hidden': 'true',
    '[attr.data-open]': 'isActive() ? "" : null',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[class.base-ui-navigation-menu-icon]': 'true',
    '[class.base-ui-navigation-menu-icon-open]': 'isActive()',
  },
})
export class NavigationMenuIconDirective {
  protected readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);
  private readonly itemContext = inject(NAVIGATION_MENU_ITEM_CONTEXT);

  /** Whether the associated item is currently active */
  readonly isActive = computed(() => {
    const currentValue = this.rootContext.valueSignal();
    return currentValue === this.itemContext.value;
  });
}

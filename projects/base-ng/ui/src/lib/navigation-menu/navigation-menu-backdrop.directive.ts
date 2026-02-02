/**
 * @fileoverview Angular port of Base UI Navigation Menu Backdrop
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/backdrop/NavigationMenuBackdrop.tsx
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
 * Navigation Menu Backdrop directive.
 * A backdrop element that appears behind the menu content.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <nav baseUiNavigationMenuRoot>
 *   <div baseUiNavigationMenuBackdrop></div>
 *   <ul baseUiNavigationMenuList>...</ul>
 *   <div baseUiNavigationMenuViewport>...</div>
 * </nav>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuBackdrop]',
  standalone: true,
  exportAs: 'navigationMenuBackdrop',
  host: {
    'aria-hidden': 'true',
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-starting-style]': 'transitionStatus() === "starting" ? "" : null',
    '[attr.data-ending-style]': 'transitionStatus() === "ending" ? "" : null',
    '[class.base-ui-navigation-menu-backdrop]': 'true',
    '[class.base-ui-navigation-menu-backdrop-open]': 'isOpen()',
    '[style.display]': 'shouldRender() ? null : "none"',
    '(click)': 'handleClick($event)',
  },
})
export class NavigationMenuBackdropDirective {
  protected readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);

  /** Whether a menu is open */
  readonly isOpen = computed(() => this.rootContext.openSignal());

  /** Whether the backdrop is mounted */
  readonly isMounted = computed(() => this.rootContext.mountedSignal());

  /** Transition status */
  readonly transitionStatus = computed(() => this.rootContext.transitionStatusSignal());

  /** Whether to render the backdrop */
  readonly shouldRender = computed(() => {
    return this.isMounted() || this.isOpen();
  });

  /**
   * Handle click events to close the menu.
   */
  protected handleClick(_event: MouseEvent): void {
    this.rootContext.setValue(null, { reason: 'outside-press' });
  }
}

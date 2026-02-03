/**
 * @fileoverview Angular port of Base UI Navigation Menu Link
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/link/NavigationMenuLink.tsx
 */

import {
  Directive,
  inject,
  Input,
  signal,
  booleanAttribute,
} from '@angular/core';
import {
  NAVIGATION_MENU_ROOT_CONTEXT,
} from './navigation-menu.types';

/**
 * Navigation Menu Link directive.
 * A navigation link within the menu content.
 * Renders an `<a>` element.
 *
 * @example
 * ```html
 * <div baseUiNavigationMenuContent>
 *   <a baseUiNavigationMenuLink href="/products/a">Product A</a>
 *   <a baseUiNavigationMenuLink href="/products/b">Product B</a>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuLink]',
  standalone: true,
  exportAs: 'navigationMenuLink',
  host: {
    role: 'menuitem',
    '[attr.data-active]': '_active() ? "" : null',
    '[class.base-ui-navigation-menu-link]': 'true',
    '[class.base-ui-navigation-menu-link-active]': '_active()',
    '(click)': 'handleClick($event)',
  },
})
export class NavigationMenuLinkDirective {
  private readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);

  // Internal signal for input
  readonly _active = signal<boolean>(false);

  /**
   * Whether this link is currently active (for highlighting the current page).
   */
  @Input({ transform: booleanAttribute })
  set active(value: boolean) { this._active.set(value); }
  get active(): boolean { return this._active(); }

  /**
   * Handle click events to close the menu.
   */
  protected handleClick(_event: MouseEvent): void {
    // Close the menu when a link is clicked
    this.rootContext.setValue(null, { reason: 'outside-press' });
  }
}

/**
 * @fileoverview Angular port of Base UI Navigation Menu Item
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/item/NavigationMenuItem.tsx
 */

import {
  Directive,
  inject,
  Input,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  NAVIGATION_MENU_ROOT_CONTEXT,
  NAVIGATION_MENU_ITEM_CONTEXT,
  type NavigationMenuItemContext,
} from './navigation-menu.types';

let itemIdCounter = 0;

/**
 * Navigation Menu Item directive.
 * An individual navigation menu item.
 * Renders a `<li>` element.
 *
 * @example
 * ```html
 * <li baseUiNavigationMenuItem value="products">
 *   <button baseUiNavigationMenuTrigger>Products</button>
 *   <div baseUiNavigationMenuContent>
 *     <a baseUiNavigationMenuLink href="/products/a">Product A</a>
 *   </div>
 * </li>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuItem]',
  standalone: true,
  exportAs: 'navigationMenuItem',
  host: {
    role: 'none',
    '[class.base-ui-navigation-menu-item]': 'true',
  },
  providers: [
    {
      provide: NAVIGATION_MENU_ITEM_CONTEXT,
      useFactory: () => {
        const directive = inject(NavigationMenuItemDirective);
        return directive.itemContext;
      },
    },
  ],
})
export class NavigationMenuItemDirective implements OnInit, OnDestroy {
  private readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);

  // Internal signal for input
  private readonly _value = signal<string>(`navigation-menu-item-${itemIdCounter++}`);

  /**
   * A unique value that identifies this navigation menu item.
   * If no value is provided, a unique ID will be generated automatically.
   */
  @Input()
  set value(value: string) { this._value.set(value); }
  get value(): string { return this._value(); }

  /**
   * The context provided to child components.
   */
  readonly itemContext: NavigationMenuItemContext = {
    get value(): string {
      // This getter will be replaced with actual value in ngOnInit
      return '';
    },
  };

  private actualValue = '';

  ngOnInit(): void {
    this.actualValue = this._value();
    // Update the context with actual value using defineProperty
    Object.defineProperty(this.itemContext, 'value', {
      get: () => this.actualValue,
      enumerable: true,
      configurable: true,
    });
    this.rootContext.registerItem(this.actualValue);
  }

  ngOnDestroy(): void {
    this.rootContext.unregisterItem(this.actualValue);
  }
}

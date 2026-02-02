/**
 * @fileoverview Angular port of Base UI Navigation Menu Content
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/content/NavigationMenuContent.tsx
 */

import {
  Directive,
  inject,
  computed,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  NAVIGATION_MENU_ROOT_CONTEXT,
  NAVIGATION_MENU_ITEM_CONTEXT,
} from './navigation-menu.types';

/**
 * Navigation Menu Content directive.
 * A container for the content that is displayed when the associated item is active.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <li baseUiNavigationMenuItem value="products">
 *   <button baseUiNavigationMenuTrigger>Products</button>
 *   <div baseUiNavigationMenuContent>
 *     <a baseUiNavigationMenuLink href="/products/a">Product A</a>
 *     <a baseUiNavigationMenuLink href="/products/b">Product B</a>
 *   </div>
 * </li>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuContent]',
  standalone: true,
  exportAs: 'navigationMenuContent',
  host: {
    role: 'menu',
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-starting-style]': 'transitionStatus() === "starting" ? "" : null',
    '[attr.data-ending-style]': 'transitionStatus() === "ending" ? "" : null',
    '[attr.data-activation-direction]': 'rootContext.activationDirectionSignal()',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[class.base-ui-navigation-menu-content]': 'true',
    '[class.base-ui-navigation-menu-content-open]': 'isOpen()',
    '[style.display]': 'shouldRender() ? null : "none"',
    '[attr.inert]': '!isOpen() && isMounted() ? "" : null',
  },
})
export class NavigationMenuContentDirective implements OnInit, AfterViewInit {
  private readonly elementRef = inject(ElementRef);
  protected readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);
  private readonly itemContext = inject(NAVIGATION_MENU_ITEM_CONTEXT);

  /** Whether this content is currently open */
  readonly isOpen = computed(() => {
    const currentValue = this.rootContext.valueSignal();
    const mounted = this.rootContext.mountedSignal();
    return mounted && currentValue === this.itemContext.value;
  });

  /** Whether the content is mounted (for animations) */
  readonly isMounted = computed(() => {
    return this.rootContext.mountedSignal();
  });

  /** Transition status */
  readonly transitionStatus = computed(() => {
    if (!this.isOpen()) {
      return undefined;
    }
    return this.rootContext.transitionStatusSignal();
  });

  /** Whether to render the content */
  readonly shouldRender = computed(() => {
    return this.isMounted() || this.isOpen();
  });

  ngOnInit(): void {
    // Nothing to initialize
  }

  ngAfterViewInit(): void {
    // Nothing to do after view init
  }
}

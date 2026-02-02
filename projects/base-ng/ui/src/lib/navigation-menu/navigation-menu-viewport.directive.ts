/**
 * @fileoverview Angular port of Base UI Navigation Menu Viewport
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/viewport/NavigationMenuViewport.tsx
 */

import {
  Directive,
  inject,
  computed,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  NAVIGATION_MENU_ROOT_CONTEXT,
} from './navigation-menu.types';

/**
 * Navigation Menu Viewport directive.
 * A container for the active content that enables shared animations.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <nav baseUiNavigationMenuRoot>
 *   <ul baseUiNavigationMenuList>...</ul>
 *   <div baseUiNavigationMenuViewport>
 *     <!-- Active content renders here -->
 *   </div>
 * </nav>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuViewport]',
  standalone: true,
  exportAs: 'navigationMenuViewport',
  host: {
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-starting-style]': 'transitionStatus() === "starting" ? "" : null',
    '[attr.data-ending-style]': 'transitionStatus() === "ending" ? "" : null',
    '[attr.data-activation-direction]': 'rootContext.activationDirectionSignal()',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[class.base-ui-navigation-menu-viewport]': 'true',
    '[class.base-ui-navigation-menu-viewport-open]': 'isOpen()',
    '[style.display]': 'shouldRender() ? null : "none"',
    '[attr.inert]': 'rootContext.viewportInert ? "" : null',
  },
})
export class NavigationMenuViewportDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  protected readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);

  /** Whether a menu is open */
  readonly isOpen = computed(() => this.rootContext.openSignal());

  /** Whether the viewport is mounted */
  readonly isMounted = computed(() => this.rootContext.mountedSignal());

  /** Transition status */
  readonly transitionStatus = computed(() => this.rootContext.transitionStatusSignal());

  /** Whether to render the viewport */
  readonly shouldRender = computed(() => {
    return this.isMounted() || this.isOpen();
  });

  ngAfterViewInit(): void {
    this.rootContext.setViewportElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.rootContext.setViewportElement(null);
  }
}

/**
 * @fileoverview Angular port of Base UI Navigation Menu Trigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/trigger/NavigationMenuTrigger.tsx
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
  NAVIGATION_MENU_ITEM_CONTEXT,
} from './navigation-menu.types';

/**
 * Navigation Menu Trigger directive.
 * Opens the navigation menu popup when hovered or clicked.
 * Renders a `<button>` element.
 *
 * @example
 * ```html
 * <li baseUiNavigationMenuItem value="products">
 *   <button baseUiNavigationMenuTrigger>Products</button>
 *   <div baseUiNavigationMenuContent>...</div>
 * </li>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuTrigger]',
  standalone: true,
  exportAs: 'navigationMenuTrigger',
  host: {
    type: 'button',
    role: 'menuitem',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'isActive() ? "true" : "false"',
    '[attr.data-open]': 'isActive() ? "" : null',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[class.base-ui-navigation-menu-trigger]': 'true',
    '[class.base-ui-navigation-menu-trigger-active]': 'isActive()',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter($event)',
    '(mouseleave)': 'handleMouseLeave($event)',
    '(keydown)': 'handleKeydown($event)',
    '(focus)': 'handleFocus($event)',
  },
})
export class NavigationMenuTriggerDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  protected readonly rootContext = inject(NAVIGATION_MENU_ROOT_CONTEXT);
  private readonly itemContext = inject(NAVIGATION_MENU_ITEM_CONTEXT);

  private hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Whether this trigger's item is currently active */
  readonly isActive = computed(() => {
    const currentValue = this.rootContext.valueSignal();
    return currentValue === this.itemContext.value;
  });

  ngAfterViewInit(): void {
    // Mark this as a trigger element for event handling
    this.elementRef.nativeElement.setAttribute(
      'data-base-ui-navigation-menu-trigger',
      '',
    );
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  private clearTimeouts(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    event.preventDefault();
    this.clearTimeouts();

    const currentValue = this.rootContext.value;
    const itemValue = this.itemContext.value;

    if (currentValue === itemValue) {
      // Close if already open
      this.rootContext.setValue(null, { reason: 'trigger-click' });
    } else {
      // Open this item
      this.setActivationDirection();
      this.rootContext.setValue(itemValue, { reason: 'trigger-click' });
    }
  }

  /**
   * Handle mouse enter for hover interactions.
   */
  protected handleMouseEnter(_event: MouseEvent): void {
    this.clearTimeouts();

    const delay = this.rootContext.delay;
    const itemValue = this.itemContext.value;

    // If already open, switch immediately
    if (this.rootContext.open && this.rootContext.positionerElement) {
      this.setActivationDirection();
      this.rootContext.setValue(itemValue, { reason: 'trigger-hover' });
      return;
    }

    // Otherwise delay the open
    this.hoverTimeout = setTimeout(() => {
      this.setActivationDirection();
      this.rootContext.setValue(itemValue, { reason: 'trigger-hover' });
    }, delay);
  }

  /**
   * Handle mouse leave for hover interactions.
   */
  protected handleMouseLeave(_event: MouseEvent): void {
    this.clearTimeouts();

    const closeDelay = this.rootContext.closeDelay;

    this.closeTimeout = setTimeout(() => {
      // Only close if not hovering over popup
      const popupElement = this.rootContext.popupElement;
      if (popupElement && popupElement.matches(':hover')) {
        return;
      }
      this.rootContext.setValue(null, { reason: 'trigger-hover' });
    }, closeDelay);
  }

  /**
   * Handle keydown for keyboard navigation.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    const orientation = this.rootContext.orientation;
    const isHorizontal = orientation === 'horizontal';

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.setActivationDirection();
        this.rootContext.setValue(this.itemContext.value, { reason: 'trigger-press' });
        break;

      case 'ArrowDown':
        if (isHorizontal && !this.isActive()) {
          event.preventDefault();
          this.rootContext.setActivationDirection('down');
          this.rootContext.setValue(this.itemContext.value, { reason: 'trigger-press' });
        }
        break;

      case 'ArrowUp':
        if (isHorizontal && this.isActive()) {
          event.preventDefault();
          this.rootContext.setValue(null, { reason: 'trigger-press' });
        }
        break;

      case 'Escape':
        if (this.isActive()) {
          event.preventDefault();
          this.rootContext.setValue(null, { reason: 'escape' });
        }
        break;
    }
  }

  /**
   * Handle focus events.
   */
  protected handleFocus(_event: FocusEvent): void {
    // Cancel any pending close
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  /**
   * Calculate and set the activation direction based on current state.
   */
  private setActivationDirection(): void {
    const currentValue = this.rootContext.value;
    const itemValue = this.itemContext.value;
    const orientation = this.rootContext.orientation;

    if (!currentValue) {
      // Opening fresh
      this.rootContext.setActivationDirection(
        orientation === 'horizontal' ? 'down' : 'right',
      );
      return;
    }

    // Determine direction based on item position
    // For now, use a simple heuristic based on element position
    const currentElement = document.querySelector(
      `[data-base-ui-navigation-menu-trigger][aria-expanded="true"]`,
    );
    const thisElement = this.elementRef.nativeElement;

    if (!currentElement || currentElement === thisElement) {
      this.rootContext.setActivationDirection(
        orientation === 'horizontal' ? 'down' : 'right',
      );
      return;
    }

    const currentRect = currentElement.getBoundingClientRect();
    const thisRect = thisElement.getBoundingClientRect();

    if (orientation === 'horizontal') {
      this.rootContext.setActivationDirection(
        thisRect.left > currentRect.left ? 'right' : 'left',
      );
    } else {
      this.rootContext.setActivationDirection(
        thisRect.top > currentRect.top ? 'down' : 'up',
      );
    }
  }
}

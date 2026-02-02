/**
 * @fileoverview Angular port of Base UI MenuPopup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/popup/MenuPopup.tsx
 *
 * A container for menu items.
 */

import {
  afterNextRender,
  computed,
  Directive,
  ElementRef,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MENU_CONTEXT } from './menu.types';

/**
 * Popup directive for menus.
 * Contains the menu items.
 *
 * @example
 * ```html
 * <div baseUiMenuPopup>
 *   <div baseUiMenuItem>Item 1</div>
 *   <div baseUiMenuItem>Item 2</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuPopup]',
  standalone: true,
  exportAs: 'menuPopup',
  host: {
    role: 'menu',
    '[id]': 'context.getPopupId()',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-activedescendant]': 'context.activeItemIdSignal()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[hidden]': '!context.openSignal()',
    '[class.base-ui-menu-popup]': 'true',
    '[class.base-ui-menu-popup-open]': 'context.openSignal()',
    '[class.base-ui-menu-popup-closed]': '!context.openSignal()',
    '[attr.tabindex]': '"-1"',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class MenuPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Computed aria-labelledby attribute.
   */
  readonly ariaLabelledBy = computed(() => {
    return this.context.titleIdSignal();
  });

  /**
   * Computed aria-describedby attribute.
   */
  readonly ariaDescribedBy = computed(() => {
    return this.context.descriptionIdSignal();
  });

  ngOnInit(): void {
    this.context.setPopupElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setPopupElement(null);
  }

  constructor() {
    // Focus the popup when it opens
    afterNextRender(() => {
      if (this.context.openSignal()) {
        this.focusPopup();
      }
    });
  }

  /**
   * Handle keydown events for keyboard navigation.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.context.navigateToItem('next');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.context.navigateToItem('previous');
        break;
      case 'Home':
        event.preventDefault();
        this.context.navigateToItem('first');
        break;
      case 'End':
        event.preventDefault();
        this.context.navigateToItem('last');
        break;
    }
  }

  /**
   * Focus the popup element.
   */
  private focusPopup(): void {
    const element = this.elementRef.nativeElement;
    // Focus first menu item if available
    const firstItem = element.querySelector('[role="menuitem"]:not([aria-disabled="true"])') as HTMLElement | null;
    if (firstItem) {
      firstItem.focus();
    } else {
      element.focus();
    }
  }
}

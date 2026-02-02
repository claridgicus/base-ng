/**
 * @fileoverview Angular port of Base UI ContextMenu Popup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/popup/MenuPopup.tsx
 *
 * A container for context menu items.
 */

import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu.types';

/**
 * Popup directive for context menus.
 * Contains the menu items.
 *
 * @example
 * ```html
 * <div baseUiContextMenuPopup>
 *   <div baseUiMenuItem>Cut</div>
 *   <div baseUiMenuItem>Copy</div>
 *   <div baseUiMenuItem>Paste</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiContextMenuPopup]',
  standalone: true,
  exportAs: 'contextMenuPopup',
  host: {
    role: 'menu',
    '[id]': 'context.getPopupId()',
    '[attr.aria-activedescendant]': 'context.activeItemIdSignal()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[hidden]': '!context.openSignal()',
    '[class.base-ui-context-menu-popup]': 'true',
    '[class.base-ui-context-menu-popup-open]': 'context.openSignal()',
    '[class.base-ui-context-menu-popup-closed]': '!context.openSignal()',
    '[attr.tabindex]': '"-1"',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ContextMenuPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(CONTEXT_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

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

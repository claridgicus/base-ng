/**
 * @fileoverview Angular port of Base UI MenuItem
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/item/MenuItem.tsx
 *
 * An individual menu item.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  output,
  booleanAttribute,
  OnInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { MENU_CONTEXT } from './menu.types';

let menuItemIdCounter = 0;

/**
 * Item directive for menus.
 * An interactive menu item that can be selected.
 *
 * @example
 * ```html
 * <div baseUiMenuItem (itemClick)="handleClick()">Menu Item</div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuItem]',
  standalone: true,
  exportAs: 'menuItem',
  host: {
    role: 'menuitem',
    '[id]': 'itemId',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.tabindex]': 'isHighlighted() ? "0" : "-1"',
    '[class.base-ui-menu-item]': 'true',
    '[class.base-ui-menu-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-menu-item-disabled]': 'disabled()',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class MenuItemDirective implements OnInit, OnDestroy {
  protected readonly context = inject(MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Unique ID for this item */
  readonly itemId = `base-ui-menu-item-${menuItemIdCounter++}`;

  /**
   * Whether the item is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether clicking the item closes the menu.
   */
  readonly closeOnClick = input(true, { transform: booleanAttribute });

  /**
   * Label for keyboard navigation (typeahead).
   */
  readonly label = input<string>();

  /**
   * Emitted when the item is clicked.
   */
  readonly itemClick = output<MouseEvent>();

  /**
   * Whether this item is currently highlighted.
   */
  readonly isHighlighted = computed(() => {
    return this.context.activeItemIdSignal() === this.itemId;
  });

  constructor() {
    // Track highlight changes for focus management
    effect(() => {
      if (this.isHighlighted()) {
        this.elementRef.nativeElement.focus();
      }
    });
  }

  ngOnInit(): void {
    this.context.registerItem(this.itemId, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.unregisterItem(this.itemId);
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit(event);

    if (this.closeOnClick()) {
      this.context.closeMenu('item-press');
    }
  }

  /**
   * Handle mouse enter for highlighting.
   */
  protected handleMouseEnter(): void {
    if (this.disabled()) return;
    this.context.setActiveItemId(this.itemId);
  }

  /**
   * Handle keydown events.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.elementRef.nativeElement.click();
    }
  }
}

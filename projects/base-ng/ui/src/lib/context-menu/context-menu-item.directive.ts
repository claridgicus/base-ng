/**
 * @fileoverview Angular port of Base UI ContextMenu Item
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/item/MenuItem.tsx
 *
 * An individual context menu item.
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
import { CONTEXT_MENU_CONTEXT } from './context-menu.types';

let contextMenuItemIdCounter = 0;

/**
 * Item directive for context menus.
 * An interactive menu item that can be selected.
 *
 * @example
 * ```html
 * <div baseUiContextMenuItem (itemClick)="handleCut()">Cut</div>
 * ```
 */
@Directive({
  selector: '[baseUiContextMenuItem]',
  standalone: true,
  exportAs: 'contextMenuItem',
  host: {
    role: 'menuitem',
    '[id]': 'itemId',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.tabindex]': 'isHighlighted() ? "0" : "-1"',
    '[class.base-ui-context-menu-item]': 'true',
    '[class.base-ui-context-menu-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-context-menu-item-disabled]': 'disabled()',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ContextMenuItemDirective implements OnInit, OnDestroy {
  protected readonly context = inject(CONTEXT_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Unique ID for this item */
  readonly itemId = `base-ui-context-menu-item-${contextMenuItemIdCounter++}`;

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
      this.context.closeContextMenu('item-press');
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

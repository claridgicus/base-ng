/**
 * @fileoverview Angular port of Base UI MenuCheckboxItem
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/checkbox-item/MenuCheckboxItem.tsx
 *
 * A menu item that toggles a setting on or off.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  output,
  model,
  booleanAttribute,
  OnInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { MENU_CONTEXT } from './menu.types';

let checkboxItemIdCounter = 0;

export interface MenuCheckboxItemChangeEvent {
  checked: boolean;
  event: MouseEvent | KeyboardEvent;
}

/**
 * Checkbox item directive for menus.
 * A menu item that can be toggled on or off.
 *
 * @example
 * ```html
 * <div baseUiMenuCheckboxItem [(checked)]="showHidden">Show Hidden Files</div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuCheckboxItem]',
  standalone: true,
  exportAs: 'menuCheckboxItem',
  host: {
    role: 'menuitemcheckbox',
    '[id]': 'itemId',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.tabindex]': 'isHighlighted() ? "0" : "-1"',
    '[class.base-ui-menu-checkbox-item]': 'true',
    '[class.base-ui-menu-checkbox-item-checked]': 'checked()',
    '[class.base-ui-menu-checkbox-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-menu-checkbox-item-disabled]': 'disabled()',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class MenuCheckboxItemDirective implements OnInit, OnDestroy {
  protected readonly context = inject(MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Unique ID for this item */
  readonly itemId = `base-ui-menu-checkbox-item-${checkboxItemIdCounter++}`;

  /**
   * Whether the item is checked (two-way binding).
   */
  readonly checked = model<boolean>(false);

  /**
   * Default checked state when uncontrolled.
   */
  readonly defaultChecked = input<boolean>(false);

  /**
   * Whether the item is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether clicking the item closes the menu.
   */
  readonly closeOnClick = input(false, { transform: booleanAttribute });

  /**
   * Label for keyboard navigation (typeahead).
   */
  readonly label = input<string>();

  /**
   * Emitted when checked state changes with event details.
   * Use (checkedChanged) instead of (checkedChange) for the full event object.
   */
  readonly checkedChanged = output<MenuCheckboxItemChangeEvent>();

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
    // Initialize from defaultChecked
    if (this.defaultChecked() && !this.checked()) {
      this.checked.set(true);
    }
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

    const newChecked = !this.checked();
    this.checked.set(newChecked);
    this.checkedChanged.emit({ checked: newChecked, event });

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
      const newChecked = !this.checked();
      this.checked.set(newChecked);
      this.checkedChanged.emit({ checked: newChecked, event });

      if (this.closeOnClick()) {
        this.context.closeMenu('item-press');
      }
    }
  }
}

/**
 * @fileoverview Angular port of Base UI MenuRadioItem
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/radio-item/MenuRadioItem.tsx
 *
 * A menu item that represents a single option in a radio group.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  booleanAttribute,
  OnInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { MENU_CONTEXT, MENU_RADIO_GROUP_CONTEXT } from './menu.types';

let radioItemIdCounter = 0;

/**
 * Radio item directive for menus.
 * A menu item that represents a single option in a radio group.
 *
 * @example
 * ```html
 * <div baseUiMenuRadioItem value="option1">Option 1</div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuRadioItem]',
  standalone: true,
  exportAs: 'menuRadioItem',
  host: {
    role: 'menuitemradio',
    '[id]': 'itemId',
    '[attr.aria-checked]': 'isChecked()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-state]': 'isChecked() ? "checked" : "unchecked"',
    '[attr.tabindex]': 'isHighlighted() ? "0" : "-1"',
    '[class.base-ui-menu-radio-item]': 'true',
    '[class.base-ui-menu-radio-item-checked]': 'isChecked()',
    '[class.base-ui-menu-radio-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-menu-radio-item-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class MenuRadioItemDirective implements OnInit, OnDestroy {
  protected readonly context = inject(MENU_CONTEXT);
  protected readonly radioGroupContext = inject(MENU_RADIO_GROUP_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Unique ID for this item */
  readonly itemId = `base-ui-menu-radio-item-${radioItemIdCounter++}`;

  /**
   * The value of this radio item.
   */
  readonly value = input.required<unknown>();

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
   * Whether this item is currently checked.
   */
  readonly isChecked = computed(() => {
    return this.radioGroupContext.valueSignal() === this.value();
  });

  /**
   * Whether this item is disabled (item or group).
   */
  readonly isDisabled = computed(() => {
    return this.disabled() || this.radioGroupContext.disabled;
  });

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
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    this.radioGroupContext.setValue(this.value(), 'click');

    if (this.closeOnClick()) {
      this.context.closeMenu('item-press');
    }
  }

  /**
   * Handle mouse enter for highlighting.
   */
  protected handleMouseEnter(): void {
    if (this.isDisabled()) return;
    this.context.setActiveItemId(this.itemId);
  }

  /**
   * Handle keydown events.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.radioGroupContext.setValue(this.value(), 'keydown');

      if (this.closeOnClick()) {
        this.context.closeMenu('item-press');
      }
    }
  }
}

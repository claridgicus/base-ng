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
  Input,
  signal,
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

  /** Internal signal for value */
  private readonly _value = signal<unknown>(undefined);

  /**
   * The value of this radio item.
   */
  @Input({ required: true })
  get value(): unknown {
    return this._value();
  }
  set value(val: unknown) {
    this._value.set(val);
  }

  /** Internal signal for disabled state */
  private readonly _disabled = signal<boolean>(false);

  /**
   * Whether the item is disabled.
   */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(val: boolean) {
    this._disabled.set(val);
  }

  /** Internal signal for closeOnClick */
  private readonly _closeOnClick = signal<boolean>(true);

  /**
   * Whether clicking the item closes the menu.
   */
  @Input({ transform: booleanAttribute })
  get closeOnClick(): boolean {
    return this._closeOnClick();
  }
  set closeOnClick(val: boolean) {
    this._closeOnClick.set(val);
  }

  /** Internal signal for label */
  private readonly _label = signal<string | undefined>(undefined);

  /**
   * Label for keyboard navigation (typeahead).
   */
  @Input()
  get label(): string | undefined {
    return this._label();
  }
  set label(val: string | undefined) {
    this._label.set(val);
  }

  /**
   * Whether this item is currently checked.
   */
  readonly isChecked = computed(() => {
    return this.radioGroupContext.valueSignal() === this._value();
  });

  /**
   * Whether this item is disabled (item or group).
   */
  readonly isDisabled = computed(() => {
    return this._disabled() || this.radioGroupContext.disabled;
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

    this.radioGroupContext.setValue(this._value(), 'click');

    if (this._closeOnClick()) {
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
      this.radioGroupContext.setValue(this._value(), 'keydown');

      if (this._closeOnClick()) {
        this.context.closeMenu('item-press');
      }
    }
  }
}

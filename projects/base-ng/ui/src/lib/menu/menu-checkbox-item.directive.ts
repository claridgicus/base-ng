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
  Input,
  Output,
  EventEmitter,
  signal,
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
    '[attr.aria-checked]': '_checked()',
    '[attr.aria-disabled]': '_disabled()',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-state]': '_checked() ? "checked" : "unchecked"',
    '[attr.tabindex]': 'isHighlighted() ? "0" : "-1"',
    '[class.base-ui-menu-checkbox-item]': 'true',
    '[class.base-ui-menu-checkbox-item-checked]': '_checked()',
    '[class.base-ui-menu-checkbox-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-menu-checkbox-item-disabled]': '_disabled()',
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

  /** Internal signal for checked state */
  readonly _checked = signal<boolean>(false);

  /**
   * Whether the item is checked (two-way binding).
   */
  @Input()
  get checked(): boolean {
    return this._checked();
  }
  set checked(value: boolean) {
    this._checked.set(value);
  }

  /**
   * Emitted when checked state changes (for two-way binding).
   */
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  /** Internal signal for default checked state */
  private readonly _defaultChecked = signal<boolean>(false);

  /**
   * Default checked state when uncontrolled.
   */
  @Input()
  get defaultChecked(): boolean {
    return this._defaultChecked();
  }
  set defaultChecked(value: boolean) {
    this._defaultChecked.set(value);
  }

  /** Internal signal for disabled state */
  readonly _disabled = signal<boolean>(false);

  /**
   * Whether the item is disabled.
   */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }

  /** Internal signal for closeOnClick */
  private readonly _closeOnClick = signal<boolean>(false);

  /**
   * Whether clicking the item closes the menu.
   */
  @Input({ transform: booleanAttribute })
  get closeOnClick(): boolean {
    return this._closeOnClick();
  }
  set closeOnClick(value: boolean) {
    this._closeOnClick.set(value);
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
  set label(value: string | undefined) {
    this._label.set(value);
  }

  /**
   * Emitted when checked state changes with event details.
   * Use (checkedChanged) instead of (checkedChange) for the full event object.
   */
  @Output() readonly checkedChanged = new EventEmitter<MenuCheckboxItemChangeEvent>();

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
    if (this._defaultChecked() && !this._checked()) {
      this._checked.set(true);
    }
  }

  ngOnDestroy(): void {
    this.context.unregisterItem(this.itemId);
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this._disabled()) {
      event.preventDefault();
      return;
    }

    const newChecked = !this._checked();
    this._checked.set(newChecked);
    this.checkedChange.emit(newChecked);
    this.checkedChanged.emit({ checked: newChecked, event });

    if (this._closeOnClick()) {
      this.context.closeMenu('item-press');
    }
  }

  /**
   * Handle mouse enter for highlighting.
   */
  protected handleMouseEnter(): void {
    if (this._disabled()) return;
    this.context.setActiveItemId(this.itemId);
  }

  /**
   * Handle keydown events.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this._disabled()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newChecked = !this._checked();
      this._checked.set(newChecked);
      this.checkedChange.emit(newChecked);
      this.checkedChanged.emit({ checked: newChecked, event });

      if (this._closeOnClick()) {
        this.context.closeMenu('item-press');
      }
    }
  }
}

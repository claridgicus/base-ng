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
  Input,
  Output,
  EventEmitter,
  booleanAttribute,
  OnInit,
  OnDestroy,
  effect,
  signal,
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
    '[attr.aria-disabled]': '_disabled()',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.tabindex]': 'isHighlighted() ? "0" : "-1"',
    '[class.base-ui-context-menu-item]': 'true',
    '[class.base-ui-context-menu-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-context-menu-item-disabled]': '_disabled()',
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

  /** Internal signal for disabled */
  readonly _disabled = signal<boolean>(false);

  /**
   * Whether the item is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /** Internal signal for closeOnClick */
  private readonly _closeOnClick = signal<boolean>(true);

  /**
   * Whether clicking the item closes the menu.
   */
  @Input({ transform: booleanAttribute })
  set closeOnClick(value: boolean) {
    this._closeOnClick.set(value);
  }
  get closeOnClick(): boolean {
    return this._closeOnClick();
  }

  /** Internal signal for label */
  private readonly _label = signal<string | undefined>(undefined);

  /**
   * Label for keyboard navigation (typeahead).
   */
  @Input()
  set label(value: string | undefined) {
    this._label.set(value);
  }
  get label(): string | undefined {
    return this._label();
  }

  /**
   * Emitted when the item is clicked.
   */
  @Output() readonly itemClick = new EventEmitter<MouseEvent>();

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
    if (this._disabled()) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit(event);

    if (this._closeOnClick()) {
      this.context.closeContextMenu('item-press');
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
      this.elementRef.nativeElement.click();
    }
  }
}

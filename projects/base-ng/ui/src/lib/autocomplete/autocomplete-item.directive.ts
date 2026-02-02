/**
 * @fileoverview Angular port of Base UI Autocomplete Item
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/item/ComboboxItem.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  booleanAttribute,
  effect,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT, AUTOCOMPLETE_ITEM_CONTEXT } from './autocomplete.types';

let itemCounter = 0;

/**
 * Autocomplete Item directive.
 * An individual item in the autocomplete list.
 * Renders with role="option".
 *
 * @example
 * ```html
 * <div baseUiAutocompleteList>
 *   <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
 *   <div baseUiAutocompleteItem [value]="'banana'" [disabled]="true">Banana</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteItem]',
  standalone: true,
  exportAs: 'autocompleteItem',
  providers: [
    {
      provide: AUTOCOMPLETE_ITEM_CONTEXT,
      useFactory: (directive: AutocompleteItemDirective) => ({
        get value() {
          return directive.value();
        },
        get disabled() {
          return directive.disabled();
        },
      }),
      deps: [AutocompleteItemDirective],
    },
  ],
  host: {
    role: 'option',
    '[attr.id]': 'itemId',
    '[attr.aria-selected]': 'isSelected() ? "true" : "false"',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class.base-ui-autocomplete-item]': 'true',
    '[class.base-ui-autocomplete-item-selected]': 'isSelected()',
    '[class.base-ui-autocomplete-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-autocomplete-item-disabled]': 'disabled()',
    '(click)': 'handleClick()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class AutocompleteItemDirective<T = unknown> implements OnInit, OnDestroy {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** The value associated with this item */
  readonly value = input.required<T>();

  /** Text value for filtering/display (optional, defaults to text content) */
  readonly textValue = input<string>();

  /** Label for the item (optional) */
  readonly label = input<string>();

  /** Whether the item is disabled */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Unique ID for this item */
  readonly itemId = `base-ui-autocomplete-item-${++itemCounter}`;

  /** Whether this item is selected */
  readonly isSelected = computed(() => {
    return this.rootContext.isSelected(this.value() as any);
  });

  /** Whether this item is highlighted */
  readonly isHighlighted = computed(() => {
    const highlighted = this.rootContext.highlightedValueSignal();
    if (highlighted === null) {
      return false;
    }
    return this.rootContext.valueEquality(this.value() as any, highlighted);
  });

  constructor() {
    // Scroll into view when highlighted
    effect(() => {
      if (this.isHighlighted() && this.elementRef.nativeElement?.scrollIntoView) {
        this.elementRef.nativeElement.scrollIntoView({
          block: 'nearest',
        });
      }
    });
  }

  ngOnInit(): void {
    // Register item with root context
    this.rootContext.registerItem({
      value: this.value() as any,
      label: this.label(),
      disabled: this.disabled(),
      textValue: this.textValue() ?? this.elementRef.nativeElement.textContent?.trim(),
    });
  }

  ngOnDestroy(): void {
    // Unregister item
    this.rootContext.unregisterItem(this.value() as any);
  }

  /**
   * Handle click to select item.
   */
  handleClick(): void {
    if (this.disabled()) {
      return;
    }

    if (this.rootContext.multipleSignal()) {
      this.rootContext.toggleValue(this.value() as any);
    } else {
      this.rootContext.setValue(this.value() as any);
      this.rootContext.setOpen(false);
    }
  }

  /**
   * Handle mouse enter to highlight.
   */
  handleMouseEnter(): void {
    if (!this.disabled()) {
      this.rootContext.setHighlightedValue(this.value() as any);
    }
  }

  /**
   * Handle mouse leave.
   */
  handleMouseLeave(): void {
    // Optionally clear highlight on mouse leave
  }
}

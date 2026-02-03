/**
 * @fileoverview Angular port of Base UI Autocomplete Item
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/item/ComboboxItem.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  Input,
  booleanAttribute,
  effect,
  OnInit,
  OnDestroy,
  signal,
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
          return directive._value();
        },
        get disabled() {
          return directive._disabled();
        },
      }),
      deps: [AutocompleteItemDirective],
    },
  ],
  host: {
    role: 'option',
    '[attr.id]': 'itemId',
    '[attr.aria-selected]': 'isSelected() ? "true" : "false"',
    '[attr.aria-disabled]': '_disabled() ? "true" : null',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[class.base-ui-autocomplete-item]': 'true',
    '[class.base-ui-autocomplete-item-selected]': 'isSelected()',
    '[class.base-ui-autocomplete-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-autocomplete-item-disabled]': '_disabled()',
    '(click)': 'handleClick()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class AutocompleteItemDirective<T = unknown> implements OnInit, OnDestroy {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // Internal signals for inputs
  readonly _value = signal<T>(undefined as any);
  private readonly _textValue = signal<string | undefined>(undefined);
  private readonly _label = signal<string | undefined>(undefined);
  readonly _disabled = signal(false);

  /** The value associated with this item */
  @Input({ required: true })
  get value(): T {
    return this._value();
  }
  set value(val: T) {
    this._value.set(val);
  }

  /** Text value for filtering/display (optional, defaults to text content) */
  @Input()
  get textValue(): string | undefined {
    return this._textValue();
  }
  set textValue(value: string | undefined) {
    this._textValue.set(value);
  }

  /** Label for the item (optional) */
  @Input()
  get label(): string | undefined {
    return this._label();
  }
  set label(value: string | undefined) {
    this._label.set(value);
  }

  /** Whether the item is disabled */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }

  /** Unique ID for this item */
  readonly itemId = `base-ui-autocomplete-item-${++itemCounter}`;

  /** Whether this item is selected */
  readonly isSelected = computed(() => {
    return this.rootContext.isSelected(this._value() as any);
  });

  /** Whether this item is highlighted */
  readonly isHighlighted = computed(() => {
    const highlighted = this.rootContext.highlightedValueSignal();
    if (highlighted === null) {
      return false;
    }
    return this.rootContext.valueEquality(this._value() as any, highlighted);
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
      value: this._value() as any,
      label: this._label(),
      disabled: this._disabled(),
      textValue: this._textValue() ?? this.elementRef.nativeElement.textContent?.trim(),
    });
  }

  ngOnDestroy(): void {
    // Unregister item
    this.rootContext.unregisterItem(this._value() as any);
  }

  /**
   * Handle click to select item.
   */
  handleClick(): void {
    if (this._disabled()) {
      return;
    }

    if (this.rootContext.multipleSignal()) {
      this.rootContext.toggleValue(this._value() as any);
    } else {
      this.rootContext.setValue(this._value() as any);
      this.rootContext.setOpen(false);
    }
  }

  /**
   * Handle mouse enter to highlight.
   */
  handleMouseEnter(): void {
    if (!this._disabled()) {
      this.rootContext.setHighlightedValue(this._value() as any);
    }
  }

  /**
   * Handle mouse leave.
   */
  handleMouseLeave(): void {
    // Optionally clear highlight on mouse leave
  }
}

/**
 * @fileoverview Angular port of Base UI Select Item
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/item/SelectItem.tsx
 */

import {
  Directive,
  Input,
  ElementRef,
  computed,
  effect,
  inject,
  booleanAttribute,
  afterNextRender,
  OnDestroy,
  signal,
  Signal,
} from '@angular/core';
import {
  SELECT_ROOT_CONTEXT,
  SELECT_ITEM_CONTEXT,
  type SelectItemContext,
} from './select.types';

let itemIdCounter = 0;

/**
 * Select Item directive.
 * An individual option in the select popup.
 * Renders a `<div>` element with option role.
 *
 * @example
 * ```html
 * <div baseUiSelectList>
 *   <div baseUiSelectItem [value]="'apple'">Apple</div>
 *   <div baseUiSelectItem [value]="'banana'" [disabled]="true">Banana</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectItem]',
  standalone: true,
  exportAs: 'selectItem',
  providers: [
    {
      provide: SELECT_ITEM_CONTEXT,
      useFactory: (directive: SelectItemDirective) => directive.itemContext,
      deps: [SelectItemDirective],
    },
  ],
  host: {
    role: 'option',
    '[attr.id]': 'itemId',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[tabindex]': '-1',
    '[class.base-ui-select-item]': 'true',
    '[class.base-ui-select-item-selected]': 'isSelected()',
    '[class.base-ui-select-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-select-item-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(mousemove)': 'handleMouseMove()',
  },
})
export class SelectItemDirective<T = unknown> implements OnDestroy {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly itemId = `base-ui-select-item-${++itemIdCounter}`;

  // Internal signals for inputs
  private readonly valueSignal = signal<T>(undefined as T);
  private readonly labelSignal = signal<string | undefined>(undefined);
  private readonly disabledSignal = signal(false);

  /**
   * The value of this item.
   */
  @Input({ required: true })
  get value(): T {
    return this.valueSignal();
  }
  set value(value: T) {
    this.valueSignal.set(value);
  }

  /**
   * Optional label for the item (defaults to text content).
   */
  @Input()
  get label(): string | undefined {
    return this.labelSignal();
  }
  set label(value: string | undefined) {
    this.labelSignal.set(value);
  }

  /**
   * Whether the item is disabled.
   */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.disabledSignal();
  }
  set disabled(value: boolean) {
    this.disabledSignal.set(value);
  }

  /** Whether this item is selected */
  readonly isSelected = computed(() => {
    const selectedValue = this.rootContext.valueSignal();
    const itemValue = this.valueSignal();

    if (selectedValue === null || selectedValue === undefined) {
      return false;
    }

    if (Array.isArray(selectedValue)) {
      return selectedValue.some((v) =>
        this.rootContext.valueEquality(v, itemValue)
      );
    }

    return this.rootContext.valueEquality(selectedValue as T, itemValue);
  });

  /** Whether this item is highlighted */
  readonly isHighlighted = computed(() => {
    const highlightedValue = this.rootContext.highlightedValue();
    if (highlightedValue === null) {
      return false;
    }
    return this.rootContext.valueEquality(highlightedValue as T, this.valueSignal());
  });

  /** Whether this item is disabled */
  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this.disabledSignal();
  });

  /** Context provided to child components */
  readonly itemContext: SelectItemContext<T>;

  constructor() {
    const self = this;
    this.itemContext = {
      get value() {
        return self.valueSignal();
      },
      get selected() {
        return self.isSelected();
      },
      get highlighted() {
        return self.isHighlighted();
      },
      get disabled() {
        return self.isDisabled();
      },
    };

    // Register item with root
    afterNextRender(() => {
      this.registerItem();
    });

    // Update registration when value/label changes
    effect(() => {
      // Track these values
      this.valueSignal();
      this.labelSignal();
      this.disabledSignal();
      // Re-register
      this.registerItem();
    });

    // Scroll into view when highlighted
    effect(() => {
      if (this.isHighlighted() && this.elementRef.nativeElement?.scrollIntoView) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  ngOnDestroy(): void {
    this.rootContext.unregisterItem(this.valueSignal());
  }

  private registerItem(): void {
    this.rootContext.registerItem({
      value: this.valueSignal(),
      label: this.labelSignal() || this.elementRef.nativeElement?.textContent?.trim(),
      disabled: this.disabledSignal(),
      element: this.elementRef.nativeElement,
    });
  }

  /**
   * Handle click to select the item.
   */
  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    if (this.rootContext.multipleSignal()) {
      this.rootContext.toggleValue(this.valueSignal());
    } else {
      this.rootContext.setValue(this.valueSignal());
      this.rootContext.setOpen(false);
    }
  }

  /**
   * Handle mouse enter to highlight the item.
   */
  handleMouseEnter(): void {
    if (!this.isDisabled()) {
      this.rootContext.setHighlightedValue(this.valueSignal());
    }
  }

  /**
   * Handle mouse move to highlight the item (for touch devices).
   */
  handleMouseMove(): void {
    if (!this.isDisabled() && !this.isHighlighted()) {
      this.rootContext.setHighlightedValue(this.valueSignal());
    }
  }
}

/**
 * @fileoverview Angular port of Base UI Combobox Item
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/item/ComboboxItem.tsx
 */

import {
  Directive,
  Input,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  booleanAttribute,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import {
  COMBOBOX_ROOT_CONTEXT,
  COMBOBOX_ITEM_CONTEXT,
  type ComboboxItemContext,
} from './combobox.types';

let itemIdCounter = 0;

@Directive({
  selector: '[baseUiComboboxItem]',
  standalone: true,
  exportAs: 'comboboxItem',
  providers: [
    {
      provide: COMBOBOX_ITEM_CONTEXT,
      useFactory: (directive: ComboboxItemDirective) => directive.itemContext,
      deps: [ComboboxItemDirective],
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
    '[class.base-ui-combobox-item]': 'true',
    '[class.base-ui-combobox-item-selected]': 'isSelected()',
    '[class.base-ui-combobox-item-highlighted]': 'isHighlighted()',
    '[class.base-ui-combobox-item-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(mousemove)': 'handleMouseMove()',
  },
})
export class ComboboxItemDirective<T = unknown> implements OnDestroy {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly itemId = `base-ui-combobox-item-${++itemIdCounter}`;

  // Private signals for internal state management
  private readonly _value = signal<T>(undefined as T);
  private readonly _label = signal<string | undefined>(undefined);
  private readonly _disabled = signal(false);

  @Input({ required: true })
  get value(): T {
    return this._value();
  }
  set value(val: T) {
    this._value.set(val);
  }

  @Input()
  get label(): string | undefined {
    return this._label();
  }
  set label(val: string | undefined) {
    this._label.set(val);
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(val: boolean) {
    this._disabled.set(val);
  }

  readonly isSelected = computed(() => {
    const selectedValue = this.rootContext.valueSignal();
    const itemValue = this._value();
    if (selectedValue === null || selectedValue === undefined) {
      return false;
    }
    if (Array.isArray(selectedValue)) {
      return selectedValue.some((v) => this.rootContext.valueEquality(v, itemValue));
    }
    return this.rootContext.valueEquality(selectedValue as T, itemValue);
  });

  readonly isHighlighted = computed(() => {
    const highlightedValue = this.rootContext.highlightedValue();
    if (highlightedValue === null) {
      return false;
    }
    return this.rootContext.valueEquality(highlightedValue as T, this._value());
  });

  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this._disabled();
  });

  readonly itemContext: ComboboxItemContext<T>;

  constructor() {
    const self = this;
    this.itemContext = {
      get value() { return self._value(); },
      get selected() { return self.isSelected(); },
      get highlighted() { return self.isHighlighted(); },
      get disabled() { return self.isDisabled(); },
    };

    afterNextRender(() => {
      this.registerItem();
    });

    effect(() => {
      this._value();
      this._label();
      this._disabled();
      this.registerItem();
    });

    effect(() => {
      if (this.isHighlighted() && this.elementRef.nativeElement?.scrollIntoView) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  ngOnDestroy(): void {
    this.rootContext.unregisterItem(this._value());
  }

  private registerItem(): void {
    this.rootContext.registerItem({
      value: this._value(),
      label: this._label() || this.elementRef.nativeElement?.textContent?.trim(),
      disabled: this._disabled(),
      element: this.elementRef.nativeElement,
    });
  }

  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    if (this.rootContext.multipleSignal()) {
      this.rootContext.toggleValue(this._value());
    } else {
      this.rootContext.setValue(this._value());
      this.rootContext.setOpen(false);
    }
  }

  handleMouseEnter(): void {
    if (!this.isDisabled()) {
      this.rootContext.setHighlightedValue(this._value());
    }
  }

  handleMouseMove(): void {
    if (!this.isDisabled() && !this.isHighlighted()) {
      this.rootContext.setHighlightedValue(this._value());
    }
  }
}

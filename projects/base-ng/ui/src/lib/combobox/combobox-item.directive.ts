/**
 * @fileoverview Angular port of Base UI Combobox Item
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/item/ComboboxItem.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
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
  readonly value = input.required<T>();
  readonly label = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly isSelected = computed(() => {
    const selectedValue = this.rootContext.valueSignal();
    const itemValue = this.value();
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
    return this.rootContext.valueEquality(highlightedValue as T, this.value());
  });

  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this.disabled();
  });

  readonly itemContext: ComboboxItemContext<T>;

  constructor() {
    const self = this;
    this.itemContext = {
      get value() { return self.value(); },
      get selected() { return self.isSelected(); },
      get highlighted() { return self.isHighlighted(); },
      get disabled() { return self.isDisabled(); },
    };

    afterNextRender(() => {
      this.registerItem();
    });

    effect(() => {
      this.value();
      this.label();
      this.disabled();
      this.registerItem();
    });

    effect(() => {
      if (this.isHighlighted() && this.elementRef.nativeElement?.scrollIntoView) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  ngOnDestroy(): void {
    this.rootContext.unregisterItem(this.value());
  }

  private registerItem(): void {
    this.rootContext.registerItem({
      value: this.value(),
      label: this.label() || this.elementRef.nativeElement?.textContent?.trim(),
      disabled: this.disabled(),
      element: this.elementRef.nativeElement,
    });
  }

  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    if (this.rootContext.multipleSignal()) {
      this.rootContext.toggleValue(this.value());
    } else {
      this.rootContext.setValue(this.value());
      this.rootContext.setOpen(false);
    }
  }

  handleMouseEnter(): void {
    if (!this.isDisabled()) {
      this.rootContext.setHighlightedValue(this.value());
    }
  }

  handleMouseMove(): void {
    if (!this.isDisabled() && !this.isHighlighted()) {
      this.rootContext.setHighlightedValue(this.value());
    }
  }
}

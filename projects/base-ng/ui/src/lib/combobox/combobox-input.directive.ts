/**
 * @fileoverview Angular port of Base UI Combobox Input
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/input/ComboboxInput.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  booleanAttribute,
  afterNextRender,
  effect,
} from '@angular/core';
import { COMBOBOX_ROOT_CONTEXT } from './combobox.types';

/**
 * Combobox Input directive.
 * The text input for filtering items.
 * Renders an `<input>` element.
 *
 * @example
 * ```html
 * <div baseUiComboboxRoot>
 *   <input baseUiComboboxInput placeholder="Search..." />
 *   <!-- ... -->
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiComboboxInput]',
  standalone: true,
  exportAs: 'comboboxInput',
  host: {
    type: 'text',
    role: 'combobox',
    autocomplete: 'off',
    '[attr.id]': 'inputId',
    '[attr.aria-autocomplete]': '"list"',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-expanded]': 'rootContext.openSignal()',
    '[attr.aria-controls]': 'listId',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.aria-readonly]': 'rootContext.readOnlySignal() ? "true" : null',
    '[attr.aria-required]': 'rootContext.requiredSignal() ? "true" : null',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[class.base-ui-combobox-input]': 'true',
    '[class.base-ui-combobox-input-open]': 'rootContext.openSignal()',
    '[class.base-ui-combobox-input-disabled]': 'isDisabled()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeyDown($event)',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
  },
})
export class ComboboxInputDirective {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  /**
   * Whether the input is disabled independently.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Input element ID */
  readonly inputId = `${this.rootContext.rootId}-input`;

  /** List element ID */
  readonly listId = `${this.rootContext.rootId}-list`;

  /** Whether the input is disabled */
  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this.disabled();
  });

  constructor() {
    // Register input element
    afterNextRender(() => {
      this.rootContext.setInputElement(this.elementRef.nativeElement);
    });

    // Sync input value with context
    effect(() => {
      const value = this.rootContext.inputValueSignal();
      const input = this.elementRef.nativeElement;
      if (input && input.value !== value) {
        input.value = value;
      }
    });
  }

  /**
   * Handle input changes for filtering.
   */
  handleInput(event: Event): void {
    if (this.isDisabled()) {
      return;
    }

    const input = event.target as HTMLInputElement;
    this.rootContext.setInputValue(input.value);

    // Auto-open when typing
    if (input.value && !this.rootContext.openSignal()) {
      this.rootContext.setOpen(true, 'input');
    }

    // Clear value in single mode when input is cleared
    if (!input.value && !this.rootContext.multipleSignal()) {
      this.rootContext.setValue(null);
    }
  }

  /**
   * Handle keyboard navigation.
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const isOpen = this.rootContext.openSignal();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          this.rootContext.setOpen(true, 'keyboard');
        } else {
          this.highlightNextItem();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          this.rootContext.setOpen(true, 'keyboard');
        } else {
          this.highlightPreviousItem();
        }
        break;

      case 'Enter':
        if (isOpen) {
          event.preventDefault();
          this.selectHighlightedItem();
        }
        break;

      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          this.rootContext.setOpen(false);
        }
        break;

      case 'Home':
        if (isOpen) {
          event.preventDefault();
          this.highlightFirstItem();
        }
        break;

      case 'End':
        if (isOpen) {
          event.preventDefault();
          this.highlightLastItem();
        }
        break;

      case 'Tab':
        // Allow tab to close
        if (isOpen) {
          this.rootContext.setOpen(false);
        }
        break;
    }
  }

  /**
   * Handle focus.
   */
  handleFocus(): void {
    // Could open on focus if configured
  }

  /**
   * Handle blur.
   */
  handleBlur(): void {
    // Could close on blur if configured
  }

  private highlightNextItem(): void {
    const items = this.rootContext.getFilteredItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

    const currentHighlighted = this.rootContext.highlightedValue();
    const currentIndex = items.findIndex((item) =>
      this.rootContext.valueEquality(item.value, currentHighlighted as any)
    );

    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    this.rootContext.setHighlightedValue(items[nextIndex].value);
  }

  private highlightPreviousItem(): void {
    const items = this.rootContext.getFilteredItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

    const currentHighlighted = this.rootContext.highlightedValue();
    const currentIndex = items.findIndex((item) =>
      this.rootContext.valueEquality(item.value, currentHighlighted as any)
    );

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    this.rootContext.setHighlightedValue(items[prevIndex].value);
  }

  private highlightFirstItem(): void {
    const items = this.rootContext.getFilteredItems().filter((item) => !item.disabled);
    if (items.length > 0) {
      this.rootContext.setHighlightedValue(items[0].value);
    }
  }

  private highlightLastItem(): void {
    const items = this.rootContext.getFilteredItems().filter((item) => !item.disabled);
    if (items.length > 0) {
      this.rootContext.setHighlightedValue(items[items.length - 1].value);
    }
  }

  private selectHighlightedItem(): void {
    const highlightedValue = this.rootContext.highlightedValue();
    if (highlightedValue !== null) {
      if (this.rootContext.multipleSignal()) {
        this.rootContext.toggleValue(highlightedValue);
      } else {
        this.rootContext.setValue(highlightedValue);
        this.rootContext.setOpen(false);
      }
    }
  }
}

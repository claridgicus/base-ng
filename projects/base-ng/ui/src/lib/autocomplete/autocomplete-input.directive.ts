/**
 * @fileoverview Angular port of Base UI Autocomplete Input
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
import { AUTOCOMPLETE_ROOT_CONTEXT } from './autocomplete.types';

/**
 * Autocomplete Input directive.
 * The text input for filtering items.
 * Renders an `<input>` element with support for inline completion.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteRoot>
 *   <input baseUiAutocompleteInput placeholder="Search..." />
 *   <!-- ... -->
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteInput]',
  standalone: true,
  exportAs: 'autocompleteInput',
  host: {
    type: 'text',
    role: 'combobox',
    autocomplete: 'off',
    '[attr.id]': 'inputId',
    '[attr.aria-autocomplete]': 'ariaAutocomplete()',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-expanded]': 'rootContext.openSignal()',
    '[attr.aria-controls]': 'listId',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.aria-readonly]': 'rootContext.readOnlySignal() ? "true" : null',
    '[attr.aria-required]': 'rootContext.requiredSignal() ? "true" : null',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-mode]': 'rootContext.modeSignal()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[class.base-ui-autocomplete-input]': 'true',
    '[class.base-ui-autocomplete-input-open]': 'rootContext.openSignal()',
    '[class.base-ui-autocomplete-input-disabled]': 'isDisabled()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeyDown($event)',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
  },
})
export class AutocompleteInputDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);
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

  /** Aria-autocomplete value based on mode */
  readonly ariaAutocomplete = computed(() => {
    const mode = this.rootContext.modeSignal();
    switch (mode) {
      case 'inline':
        return 'inline';
      case 'both':
        return 'both';
      case 'none':
        return 'none';
      case 'list':
      default:
        return 'list';
    }
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

        // Handle inline completion selection
        const inlineValue = this.rootContext.inlineValueSignal();
        if (inlineValue && inlineValue.length > value.length) {
          // Select the completed portion for easy replacement
          const baseLength = this.rootContext.inputValueSignal().length;
          if (input.value === inlineValue) {
            input.setSelectionRange(baseLength, inlineValue.length);
          }
        }
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

    // Auto-open when typing (except in 'none' mode)
    const mode = this.rootContext.modeSignal();
    if (input.value && !this.rootContext.openSignal() && mode !== 'none') {
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
    const mode = this.rootContext.modeSignal();
    const inlineValue = this.rootContext.inlineValueSignal();

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

      case 'ArrowRight':
        // Accept inline completion
        if ((mode === 'inline' || mode === 'both') && inlineValue) {
          const input = this.elementRef.nativeElement;
          if (input.selectionStart === input.value.length) {
            this.rootContext.setInputValue(inlineValue);
            this.rootContext.setInlineValue('');
          }
        }
        break;

      case 'Enter':
        if (isOpen) {
          event.preventDefault();
          this.selectHighlightedItem();
        } else if ((mode === 'inline' || mode === 'both') && inlineValue) {
          // Accept inline completion on Enter
          event.preventDefault();
          this.rootContext.setInputValue(inlineValue);
          this.rootContext.setInlineValue('');
          this.selectHighlightedItem();
        }
        break;

      case 'Tab':
        // Accept inline completion on Tab
        if ((mode === 'inline' || mode === 'both') && inlineValue) {
          this.rootContext.setInputValue(inlineValue);
          this.rootContext.setInlineValue('');
        }
        // Close the dropdown
        if (isOpen) {
          this.rootContext.setOpen(false);
        }
        break;

      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          this.rootContext.setOpen(false);
        } else if (inlineValue) {
          // Clear inline completion on Escape
          this.rootContext.setInlineValue('');
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
    }
  }

  /**
   * Handle focus.
   */
  handleFocus(): void {
    // Could auto-open on focus if configured
  }

  /**
   * Handle blur.
   */
  handleBlur(): void {
    // Accept inline completion on blur if present
    const mode = this.rootContext.modeSignal();
    const inlineValue = this.rootContext.inlineValueSignal();
    if ((mode === 'inline' || mode === 'both') && inlineValue) {
      this.rootContext.setInputValue(inlineValue);
      this.rootContext.setInlineValue('');
    }
  }

  private highlightNextItem(): void {
    const items = this.rootContext.getFilteredItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

    const currentHighlighted = this.rootContext.highlightedValueSignal();
    const currentIndex = items.findIndex((item) =>
      this.rootContext.valueEquality(item.value, currentHighlighted as any)
    );

    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    this.rootContext.setHighlightedValue(items[nextIndex].value);
  }

  private highlightPreviousItem(): void {
    const items = this.rootContext.getFilteredItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

    const currentHighlighted = this.rootContext.highlightedValueSignal();
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
    const highlightedValue = this.rootContext.highlightedValueSignal();
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

/**
 * @fileoverview Angular port of Base UI Autocomplete Clear
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/clear/ComboboxClear.tsx
 */

import { Directive, computed, inject, input, booleanAttribute } from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT } from './autocomplete.types';

/**
 * Autocomplete Clear directive.
 * A button that clears the selected value and input.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteRoot>
 *   <input baseUiAutocompleteInput />
 *   <button baseUiAutocompleteClear>×</button>
 *   <!-- ... -->
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteClear]',
  standalone: true,
  exportAs: 'autocompleteClear',
  host: {
    type: 'button',
    '[attr.aria-label]': '"Clear"',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-has-value]': 'hasValue() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[tabindex]': 'isDisabled() ? -1 : 0',
    '[class.base-ui-autocomplete-clear]': 'true',
    '[class.base-ui-autocomplete-clear-disabled]': 'isDisabled()',
    '(click)': 'handleClick()',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class AutocompleteClearDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);

  /**
   * Whether the clear button is disabled independently.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Whether the clear button is disabled */
  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this.disabled();
  });

  /** Whether there is a value to clear */
  readonly hasValue = computed(() => {
    return this.rootContext.hasSelectedValue() || this.rootContext.inputValueSignal() !== '';
  });

  /**
   * Handle click to clear.
   */
  handleClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this.rootContext.clear();

    // Focus input after clearing
    const input = this.rootContext.inputElement();
    if (input) {
      input.focus();
    }
  }

  /**
   * Handle keyboard interaction.
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    }
  }
}

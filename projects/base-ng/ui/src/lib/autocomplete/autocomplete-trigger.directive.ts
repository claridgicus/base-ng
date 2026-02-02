/**
 * @fileoverview Angular port of Base UI Autocomplete Trigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/trigger/ComboboxTrigger.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  booleanAttribute,
  afterNextRender,
} from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT } from './autocomplete.types';

/**
 * Autocomplete Trigger directive.
 * A button that opens/closes the autocomplete dropdown.
 * Renders a `<button>` element.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteRoot>
 *   <input baseUiAutocompleteInput />
 *   <button baseUiAutocompleteTrigger>▼</button>
 *   <!-- ... -->
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteTrigger]',
  standalone: true,
  exportAs: 'autocompleteTrigger',
  host: {
    type: 'button',
    '[attr.id]': 'triggerId',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-expanded]': 'rootContext.openSignal()',
    '[attr.aria-controls]': 'listId',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[tabindex]': 'isDisabled() ? -1 : 0',
    '[class.base-ui-autocomplete-trigger]': 'true',
    '[class.base-ui-autocomplete-trigger-open]': 'rootContext.openSignal()',
    '[class.base-ui-autocomplete-trigger-disabled]': 'isDisabled()',
    '(click)': 'handleClick()',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class AutocompleteTriggerDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);

  /**
   * Whether the trigger is disabled independently.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Trigger element ID */
  readonly triggerId = `${this.rootContext.rootId}-trigger`;

  /** List element ID */
  readonly listId = `${this.rootContext.rootId}-list`;

  /** Whether the trigger is disabled */
  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this.disabled();
  });

  constructor() {
    // Register trigger element
    afterNextRender(() => {
      this.rootContext.setTriggerElement(this.elementRef.nativeElement);
    });
  }

  /**
   * Handle click to toggle dropdown.
   */
  handleClick(): void {
    if (this.isDisabled()) {
      return;
    }

    const isOpen = this.rootContext.openSignal();
    this.rootContext.setOpen(!isOpen, 'click');

    // Focus input when opening
    if (!isOpen) {
      const input = this.rootContext.inputElement();
      if (input) {
        input.focus();
      }
    }
  }

  /**
   * Handle keyboard interaction.
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.handleClick();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!this.rootContext.openSignal()) {
          this.rootContext.setOpen(true, 'keyboard');
          // Focus input
          const input = this.rootContext.inputElement();
          if (input) {
            input.focus();
          }
        }
        break;
    }
  }
}

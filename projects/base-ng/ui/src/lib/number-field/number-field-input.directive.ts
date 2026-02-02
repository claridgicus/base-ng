/**
 * @fileoverview Angular port of Base UI NumberFieldInput
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/input/NumberFieldInput.tsx
 *
 * The input element for the number field.
 */

import {
  Directive,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { NUMBER_FIELD_CONTEXT } from './number-field.types';

/**
 * Input directive for number field component.
 * The actual input element where users type values.
 *
 * @example
 * ```html
 * <div baseUiNumberFieldRoot [(value)]="quantity">
 *   <input baseUiNumberFieldInput />
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiNumberFieldInput]',
  standalone: true,
  exportAs: 'numberFieldInput',
  host: {
    type: 'text',
    inputmode: 'decimal',
    '[attr.aria-valuemin]': 'context.minSignal()',
    '[attr.aria-valuemax]': 'context.maxSignal()',
    '[attr.aria-valuenow]': 'context.valueSignal()',
    '[attr.aria-disabled]': 'context.disabledSignal() ? "true" : null',
    '[attr.aria-readonly]': 'context.readOnlySignal() ? "true" : null',
    '[attr.aria-required]': 'context.requiredSignal() ? "true" : null',
    '[attr.disabled]': 'context.disabledSignal() ? "" : null',
    '[attr.readonly]': 'context.readOnlySignal() ? "" : null',
    '[attr.data-disabled]': 'context.disabledSignal() ? "" : null',
    '[attr.data-readonly]': 'context.readOnlySignal() ? "" : null',
    '[class.base-ui-number-field-input]': 'true',
    '(input)': 'handleInput($event)',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class NumberFieldInputDirective {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  protected readonly context = inject(NUMBER_FIELD_CONTEXT);

  constructor() {
    // Sync input value from context
    effect(() => {
      const inputValue = this.context.inputValueSignal();
      const el = this.elementRef.nativeElement;
      if (el && document.activeElement !== el) {
        el.value = inputValue;
      }
    });
  }

  /**
   * Handle input events.
   */
  protected handleInput(event: Event): void {
    if (this.context.disabledSignal() || this.context.readOnlySignal()) return;

    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Allow valid numeric characters
    if (this.isValidInput(value)) {
      this.context.setInputValue(value);
    }
  }

  /**
   * Handle focus events.
   */
  protected handleFocus(): void {
    this.context.setFocused(true);
  }

  /**
   * Handle blur events.
   */
  protected handleBlur(): void {
    this.context.setFocused(false);
    this.context.commitValue();
  }

  /**
   * Handle keyboard events.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.context.disabledSignal() || this.context.readOnlySignal()) return;

    const largeStep = this.context.largeStepSignal();
    const step = this.context.stepSignal();
    const increment = event.shiftKey ? largeStep : step;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.context.increment(increment);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.context.decrement(increment);
        break;
      case 'PageUp':
        event.preventDefault();
        this.context.increment(largeStep);
        break;
      case 'PageDown':
        event.preventDefault();
        this.context.decrement(largeStep);
        break;
      case 'Home':
        event.preventDefault();
        const min = this.context.minSignal();
        if (min !== undefined) {
          this.context.setValue(min);
        }
        break;
      case 'End':
        event.preventDefault();
        const max = this.context.maxSignal();
        if (max !== undefined) {
          this.context.setValue(max);
        }
        break;
      case 'Enter':
        this.context.commitValue();
        break;
    }
  }

  /**
   * Check if input value is valid (allows numbers, minus, decimal).
   */
  private isValidInput(value: string): boolean {
    if (value === '' || value === '-') return true;
    // Allow numbers, one decimal point, optional leading minus
    return /^-?\d*\.?\d*$/.test(value);
  }
}

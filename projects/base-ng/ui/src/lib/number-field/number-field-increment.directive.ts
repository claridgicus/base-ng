/**
 * @fileoverview Angular port of Base UI NumberFieldIncrement
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/increment/NumberFieldIncrement.tsx
 *
 * A button to increment the number field value.
 */

import {
  computed,
  Directive,
  inject,
  type Signal,
} from '@angular/core';
import { NUMBER_FIELD_CONTEXT } from './number-field.types';

/**
 * Increment button directive for number field component.
 * Increases the value when clicked.
 *
 * @example
 * ```html
 * <div baseUiNumberFieldRoot [(value)]="quantity">
 *   <button baseUiNumberFieldIncrement>+</button>
 *   <input baseUiNumberFieldInput />
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiNumberFieldIncrement]',
  standalone: true,
  exportAs: 'numberFieldIncrement',
  host: {
    type: 'button',
    '[attr.aria-label]': '"Increase value"',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[class.base-ui-number-field-increment]': 'true',
    '[class.base-ui-number-field-increment-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(pointerdown)': 'handlePointerDown($event)',
    '(pointerup)': 'handlePointerUp()',
    '(pointerleave)': 'handlePointerUp()',
  },
})
export class NumberFieldIncrementDirective {
  protected readonly context = inject(NUMBER_FIELD_CONTEXT);

  private repeatTimer: ReturnType<typeof setTimeout> | null = null;
  private repeatInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Whether the button is disabled.
   */
  readonly isDisabled: Signal<boolean> = computed(() => {
    return this.context.disabledSignal() || !this.context.canIncrement();
  });

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.isDisabled()) return;
    this.context.increment();
  }

  /**
   * Handle pointer down for auto-repeat.
   */
  protected handlePointerDown(event: PointerEvent): void {
    if (this.isDisabled()) return;

    // Start auto-repeat after 300ms delay
    this.repeatTimer = setTimeout(() => {
      this.repeatInterval = setInterval(() => {
        if (!this.context.canIncrement()) {
          this.handlePointerUp();
          return;
        }
        this.context.increment();
      }, 60);
    }, 300);
  }

  /**
   * Handle pointer up to stop auto-repeat.
   */
  protected handlePointerUp(): void {
    if (this.repeatTimer) {
      clearTimeout(this.repeatTimer);
      this.repeatTimer = null;
    }
    if (this.repeatInterval) {
      clearInterval(this.repeatInterval);
      this.repeatInterval = null;
    }
  }
}

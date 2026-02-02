/**
 * @fileoverview Angular port of Base UI NumberFieldDecrement
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/decrement/NumberFieldDecrement.tsx
 *
 * A button to decrement the number field value.
 */

import {
  computed,
  Directive,
  inject,
  type Signal,
} from '@angular/core';
import { NUMBER_FIELD_CONTEXT } from './number-field.types';

/**
 * Decrement button directive for number field component.
 * Decreases the value when clicked.
 *
 * @example
 * ```html
 * <div baseUiNumberFieldRoot [(value)]="quantity">
 *   <button baseUiNumberFieldDecrement>-</button>
 *   <input baseUiNumberFieldInput />
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiNumberFieldDecrement]',
  standalone: true,
  exportAs: 'numberFieldDecrement',
  host: {
    type: 'button',
    '[attr.aria-label]': '"Decrease value"',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[class.base-ui-number-field-decrement]': 'true',
    '[class.base-ui-number-field-decrement-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(pointerdown)': 'handlePointerDown($event)',
    '(pointerup)': 'handlePointerUp()',
    '(pointerleave)': 'handlePointerUp()',
  },
})
export class NumberFieldDecrementDirective {
  protected readonly context = inject(NUMBER_FIELD_CONTEXT);

  private repeatTimer: ReturnType<typeof setTimeout> | null = null;
  private repeatInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Whether the button is disabled.
   */
  readonly isDisabled: Signal<boolean> = computed(() => {
    return this.context.disabledSignal() || !this.context.canDecrement();
  });

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.isDisabled()) return;
    this.context.decrement();
  }

  /**
   * Handle pointer down for auto-repeat.
   */
  protected handlePointerDown(event: PointerEvent): void {
    if (this.isDisabled()) return;

    // Start auto-repeat after 300ms delay
    this.repeatTimer = setTimeout(() => {
      this.repeatInterval = setInterval(() => {
        if (!this.context.canDecrement()) {
          this.handlePointerUp();
          return;
        }
        this.context.decrement();
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

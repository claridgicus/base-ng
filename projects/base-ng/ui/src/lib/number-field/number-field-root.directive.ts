/**
 * @fileoverview Angular port of Base UI NumberFieldRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/root/NumberFieldRoot.tsx
 *
 * A numeric input field with increment/decrement controls.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  forwardRef,
  input,
  model,
  numberAttribute,
  output,
  signal,
  type Signal,
  computed,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  NUMBER_FIELD_CONTEXT,
  NumberFieldChangeEventDetails,
  NumberFieldContext,
} from './number-field.types';

/**
 * Clamp a value between optional min and max.
 */
function clamp(value: number, min?: number, max?: number): number {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

/**
 * Round a value to the nearest step.
 */
function roundToStep(value: number, step: number, min: number = 0): number {
  const nearest = Math.round((value - min) / step) * step + min;
  // Handle floating point precision
  return Math.round(nearest * 1e12) / 1e12;
}

/**
 * Root directive for number field component.
 * Manages numeric value state and provides context to child components.
 *
 * @example
 * ```html
 * <div baseUiNumberFieldRoot [(value)]="quantity" [min]="0" [max]="100">
 *   <button baseUiNumberFieldDecrement>-</button>
 *   <input baseUiNumberFieldInput />
 *   <button baseUiNumberFieldIncrement>+</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiNumberFieldRoot]',
  standalone: true,
  exportAs: 'numberFieldRoot',
  providers: [
    {
      provide: NUMBER_FIELD_CONTEXT,
      useFactory: (directive: NumberFieldRootDirective): NumberFieldContext => ({
        value: directive.internalValue(),
        inputValue: directive.inputValue(),
        disabled: directive.disabled(),
        readOnly: directive.readOnly(),
        required: directive.required(),
        focused: directive.focused(),
        scrubbing: false,
        valueSignal: directive.internalValue,
        inputValueSignal: directive.inputValue,
        disabledSignal: directive.disabled,
        readOnlySignal: directive.readOnly,
        requiredSignal: directive.required,
        focusedSignal: directive.focused,
        minSignal: directive.min,
        maxSignal: directive.max,
        stepSignal: directive.step,
        largeStepSignal: directive.largeStep,
        setValue: directive.setValue.bind(directive),
        setInputValue: directive.setInputValue.bind(directive),
        increment: directive.increment.bind(directive),
        decrement: directive.decrement.bind(directive),
        commitValue: directive.commitValue.bind(directive),
        setFocused: directive.setFocused.bind(directive),
        canIncrement: directive.canIncrement.bind(directive),
        canDecrement: directive.canDecrement.bind(directive),
      }),
      deps: [NumberFieldRootDirective],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFieldRootDirective),
      multi: true,
    },
  ],
  host: {
    role: 'group',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-readonly]': 'readOnly() ? "" : null',
    '[attr.data-focused]': 'focused() ? "" : null',
    '[class.base-ui-number-field]': 'true',
    '[class.base-ui-number-field-disabled]': 'disabled()',
    '[class.base-ui-number-field-readonly]': 'readOnly()',
    '[class.base-ui-number-field-focused]': 'focused()',
  },
})
export class NumberFieldRootDirective implements ControlValueAccessor {
  /**
   * Current numeric value.
   */
  readonly value = model<number | null>(null);

  /**
   * Internal value signal.
   */
  readonly internalValue = signal<number | null>(null);

  /**
   * Input display value.
   */
  readonly inputValue = signal<string>('');

  /**
   * Minimum value.
   */
  readonly min = input<number | undefined>(undefined);

  /**
   * Maximum value.
   */
  readonly max = input<number | undefined>(undefined);

  /**
   * Step increment.
   */
  readonly step = input(1, { transform: numberAttribute });

  /**
   * Large step for Page Up/Down and Shift+Arrow.
   */
  readonly largeStep = input(10, { transform: numberAttribute });

  /**
   * Whether the field is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the field is read-only.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /**
   * Whether the field is required.
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Event emitted when value changes.
   */
  readonly valueChanged = output<NumberFieldChangeEventDetails>();

  /**
   * Whether the input is focused.
   */
  readonly focused = signal(false);

  // ControlValueAccessor
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync model value to internal value
    effect(() => {
      const val = this.value();
      this.internalValue.set(val);
      if (val !== null) {
        this.inputValue.set(String(val));
      } else {
        this.inputValue.set('');
      }
    });
  }

  /**
   * Set the numeric value.
   */
  setValue(newValue: number | null, reason: 'input' | 'increment' | 'decrement' | 'commit' = 'input'): void {
    if (this.disabled() || this.readOnly()) return;

    let clamped = newValue;
    if (clamped !== null) {
      clamped = clamp(clamped, this.min(), this.max());
    }

    this.internalValue.set(clamped);
    this.value.set(clamped);
    this.inputValue.set(clamped !== null ? String(clamped) : '');
    this.onChange(clamped);
    this.valueChanged.emit({ value: clamped, reason });
  }

  /**
   * Set the input display value.
   */
  setInputValue(value: string): void {
    this.inputValue.set(value);
  }

  /**
   * Increment the value.
   */
  increment(amount?: number): void {
    if (this.disabled() || this.readOnly() || !this.canIncrement()) return;

    const step = amount ?? this.step();
    const current = this.internalValue() ?? this.min() ?? 0;
    const newValue = roundToStep(current + step, this.step(), this.min() ?? 0);
    this.setValue(newValue, 'increment');
  }

  /**
   * Decrement the value.
   */
  decrement(amount?: number): void {
    if (this.disabled() || this.readOnly() || !this.canDecrement()) return;

    const step = amount ?? this.step();
    const current = this.internalValue() ?? this.max() ?? 0;
    const newValue = roundToStep(current - step, this.step(), this.min() ?? 0);
    this.setValue(newValue, 'decrement');
  }

  /**
   * Commit the current input value.
   */
  commitValue(): void {
    const inputVal = this.inputValue().trim();
    if (inputVal === '') {
      this.setValue(null, 'commit');
    } else {
      const parsed = parseFloat(inputVal);
      if (!isNaN(parsed)) {
        this.setValue(parsed, 'commit');
      } else {
        // Reset to previous value
        const current = this.internalValue();
        this.inputValue.set(current !== null ? String(current) : '');
      }
    }
    this.onTouched();
  }

  /**
   * Set the focused state.
   */
  setFocused(focused: boolean): void {
    this.focused.set(focused);
  }

  /**
   * Check if increment is allowed.
   */
  canIncrement(): boolean {
    const max = this.max();
    if (max === undefined) return true;
    const current = this.internalValue();
    if (current === null) return true;
    return current < max;
  }

  /**
   * Check if decrement is allowed.
   */
  canDecrement(): boolean {
    const min = this.min();
    if (min === undefined) return true;
    const current = this.internalValue();
    if (current === null) return true;
    return current > min;
  }

  // ControlValueAccessor methods
  writeValue(value: number | null): void {
    this.value.set(value);
    this.internalValue.set(value);
    this.inputValue.set(value !== null ? String(value) : '');
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Disabled state is handled via input
  }
}

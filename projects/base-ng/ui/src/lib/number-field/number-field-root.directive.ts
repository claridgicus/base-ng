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
  EventEmitter,
  forwardRef,
  Input,
  numberAttribute,
  Output,
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
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-readonly]': '_readOnly() ? "" : null',
    '[attr.data-focused]': 'focused() ? "" : null',
    '[class.base-ui-number-field]': 'true',
    '[class.base-ui-number-field-disabled]': '_disabled()',
    '[class.base-ui-number-field-readonly]': '_readOnly()',
    '[class.base-ui-number-field-focused]': 'focused()',
  },
})
export class NumberFieldRootDirective implements ControlValueAccessor {
  /**
   * Current numeric value - internal signal for tracking.
   */
  private readonly _value = signal<number | null>(null);

  /**
   * Internal value signal exposed to context.
   */
  readonly internalValue = signal<number | null>(null);

  /**
   * Input display value.
   */
  readonly inputValue = signal<string>('');

  /**
   * Minimum value - internal signal.
   */
  private readonly _min = signal<number | undefined>(undefined);

  /**
   * Maximum value - internal signal.
   */
  private readonly _max = signal<number | undefined>(undefined);

  /**
   * Step increment - internal signal.
   */
  private readonly _step = signal<number>(1);

  /**
   * Large step for Page Up/Down and Shift+Arrow - internal signal.
   */
  private readonly _largeStep = signal<number>(10);

  /**
   * Whether the field is disabled - internal signal.
   */
  readonly _disabled = signal<boolean>(false);

  /**
   * Whether the field is read-only - internal signal.
   */
  readonly _readOnly = signal<boolean>(false);

  /**
   * Whether the field is required - internal signal.
   */
  private readonly _required = signal<boolean>(false);

  /**
   * Whether the input is focused.
   */
  readonly focused = signal(false);

  /**
   * Current numeric value.
   */
  @Input()
  set value(val: number | null) {
    this._value.set(val);
    this.internalValue.set(val);
  }
  get value(): number | null {
    return this._value();
  }

  /**
   * Minimum value.
   */
  @Input()
  set min(val: number | undefined) {
    this._min.set(val);
  }
  get min(): Signal<number | undefined> {
    return this._min;
  }

  /**
   * Maximum value.
   */
  @Input()
  set max(val: number | undefined) {
    this._max.set(val);
  }
  get max(): Signal<number | undefined> {
    return this._max;
  }

  /**
   * Step increment.
   */
  @Input({ transform: numberAttribute })
  set step(val: number) {
    this._step.set(val);
  }
  get step(): Signal<number> {
    return this._step;
  }

  /**
   * Large step for Page Up/Down and Shift+Arrow.
   */
  @Input({ transform: numberAttribute })
  set largeStep(val: number) {
    this._largeStep.set(val);
  }
  get largeStep(): Signal<number> {
    return this._largeStep;
  }

  /**
   * Whether the field is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(val: boolean) {
    this._disabled.set(val);
  }
  get disabled(): Signal<boolean> {
    return this._disabled;
  }

  /**
   * Whether the field is read-only.
   */
  @Input({ transform: booleanAttribute })
  set readOnly(val: boolean) {
    this._readOnly.set(val);
  }
  get readOnly(): Signal<boolean> {
    return this._readOnly;
  }

  /**
   * Whether the field is required.
   */
  @Input({ transform: booleanAttribute })
  set required(val: boolean) {
    this._required.set(val);
  }
  get required(): Signal<boolean> {
    return this._required;
  }

  /**
   * Event emitted when value changes.
   */
  @Output() readonly valueChange = new EventEmitter<number | null>();

  /**
   * Event emitted when value changes with details.
   */
  @Output() readonly valueChanged = new EventEmitter<NumberFieldChangeEventDetails>();

  // ControlValueAccessor
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync model value to internal value
    effect(() => {
      const val = this._value();
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
    if (this._disabled() || this._readOnly()) return;

    let clamped = newValue;
    if (clamped !== null) {
      clamped = clamp(clamped, this._min(), this._max());
    }

    this.internalValue.set(clamped);
    this._value.set(clamped);
    this.inputValue.set(clamped !== null ? String(clamped) : '');
    this.onChange(clamped);
    this.valueChange.emit(clamped);
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
    if (this._disabled() || this._readOnly() || !this.canIncrement()) return;

    const step = amount ?? this._step();
    const current = this.internalValue() ?? this._min() ?? 0;
    const newValue = roundToStep(current + step, this._step(), this._min() ?? 0);
    this.setValue(newValue, 'increment');
  }

  /**
   * Decrement the value.
   */
  decrement(amount?: number): void {
    if (this._disabled() || this._readOnly() || !this.canDecrement()) return;

    const step = amount ?? this._step();
    const current = this.internalValue() ?? this._max() ?? 0;
    const newValue = roundToStep(current - step, this._step(), this._min() ?? 0);
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
    const max = this._max();
    if (max === undefined) return true;
    const current = this.internalValue();
    if (current === null) return true;
    return current < max;
  }

  /**
   * Check if decrement is allowed.
   */
  canDecrement(): boolean {
    const min = this._min();
    if (min === undefined) return true;
    const current = this.internalValue();
    if (current === null) return true;
    return current > min;
  }

  // ControlValueAccessor methods
  writeValue(value: number | null): void {
    this._value.set(value);
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

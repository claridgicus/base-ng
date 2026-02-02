/**
 * @fileoverview Angular port of Base UI Input
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/input/Input.tsx
 *
 * A styled input element with accessibility support.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  type Signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputChangeEventDetails, InputState } from './input.types';

/**
 * Input directive providing styling hooks and form integration.
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <input baseUiInput [(value)]="username" placeholder="Enter username" />
 *
 * <!-- With form integration -->
 * <input baseUiInput [(ngModel)]="email" type="email" />
 *
 * <!-- With validation state -->
 * <input baseUiInput [invalid]="hasError" />
 * ```
 */
@Directive({
  selector: 'input[baseUiInput], textarea[baseUiInput]',
  standalone: true,
  exportAs: 'input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
      multi: true,
    },
  ],
  host: {
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-focused]': 'focused() ? "" : null',
    '[attr.data-filled]': 'filled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    '[attr.aria-invalid]': 'invalid() || null',
    '[disabled]': 'disabled()',
    '[class.base-ui-input]': 'true',
    '[class.base-ui-input-disabled]': 'disabled()',
    '[class.base-ui-input-focused]': 'focused()',
    '[class.base-ui-input-filled]': 'filled()',
    '[class.base-ui-input-invalid]': 'invalid()',
  },
})
export class InputDirective implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);

  /**
   * Current input value.
   * Supports two-way binding with [(value)].
   */
  readonly value = model<string>('');

  /**
   * Whether the input is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the input is in an invalid state.
   */
  readonly invalid = input(false, { transform: booleanAttribute });

  // Internal state
  private readonly _focused = signal(false);

  /**
   * Whether the input is currently focused.
   */
  readonly focused: Signal<boolean> = this._focused.asReadonly();

  /**
   * Whether the input has a value.
   */
  readonly filled: Signal<boolean> = computed(() => {
    const val = this.value();
    return val !== null && val !== undefined && val !== '';
  });

  /**
   * Current state object.
   */
  readonly state: Signal<InputState> = computed(() => ({
    disabled: this.disabled(),
    focused: this.focused(),
    filled: this.filled(),
    invalid: this.invalid(),
  }));

  /**
   * Emitted when the value changes.
   */
  readonly valueChange = output<string>();

  /**
   * Emitted with detailed event information when value changes.
   */
  readonly valueChangeDetails = output<InputChangeEventDetails>();

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Handle input event.
   */
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const newValue = target.value;

    this.value.set(newValue);
    this.valueChange.emit(newValue);
    this.valueChangeDetails.emit({ value: newValue, event });
    this.onChange(newValue);
  }

  /**
   * Handle focus event.
   */
  @HostListener('focus')
  onFocus(): void {
    this._focused.set(true);
  }

  /**
   * Handle blur event.
   */
  @HostListener('blur')
  onBlur(): void {
    this._focused.set(false);
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    const newValue = value ?? '';
    this.value.set(newValue);
    this.elementRef.nativeElement.value = newValue;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Disabled state is controlled via input
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  /**
   * Focus the input element.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /**
   * Blur the input element.
   */
  blur(): void {
    this.elementRef.nativeElement.blur();
  }

  /**
   * Select all text in the input.
   */
  select(): void {
    this.elementRef.nativeElement.select();
  }

  /**
   * Set selection range in the input.
   */
  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void {
    this.elementRef.nativeElement.setSelectionRange(start, end, direction);
  }
}

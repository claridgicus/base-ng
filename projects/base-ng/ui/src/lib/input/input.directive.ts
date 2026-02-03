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
  EventEmitter,
  forwardRef,
  HostListener,
  inject,
  Input,
  Output,
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
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-focused]': 'focused() ? "" : null',
    '[attr.data-filled]': 'filled() ? "" : null',
    '[attr.data-invalid]': '_invalid() ? "" : null',
    '[attr.aria-invalid]': '_invalid() || null',
    '[disabled]': '_disabled()',
    '[class.base-ui-input]': 'true',
    '[class.base-ui-input-disabled]': '_disabled()',
    '[class.base-ui-input-focused]': 'focused()',
    '[class.base-ui-input-filled]': 'filled()',
    '[class.base-ui-input-invalid]': '_invalid()',
  },
})
export class InputDirective implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);

  // Internal signals
  private readonly _value = signal<string>('');
  readonly _disabled = signal<boolean>(false);
  readonly _invalid = signal<boolean>(false);
  private readonly _focused = signal(false);

  /**
   * Current input value.
   * Supports two-way binding with [(value)].
   */
  @Input()
  set value(val: string) { this._value.set(val); }
  get value(): string { return this._value(); }

  /**
   * Whether the input is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(val: boolean) { this._disabled.set(val); }
  get disabled(): boolean { return this._disabled(); }

  /**
   * Whether the input is in an invalid state.
   */
  @Input({ transform: booleanAttribute })
  set invalid(val: boolean) { this._invalid.set(val); }
  get invalid(): boolean { return this._invalid(); }

  /**
   * Whether the input is currently focused.
   */
  readonly focused: Signal<boolean> = this._focused.asReadonly();

  /**
   * Whether the input has a value.
   */
  readonly filled: Signal<boolean> = computed(() => {
    const val = this._value();
    return val !== null && val !== undefined && val !== '';
  });

  /**
   * Current state object.
   */
  readonly state: Signal<InputState> = computed(() => ({
    disabled: this._disabled(),
    focused: this.focused(),
    filled: this.filled(),
    invalid: this._invalid(),
  }));

  /**
   * Emitted when the value changes.
   */
  @Output() readonly valueChange = new EventEmitter<string>();

  /**
   * Emitted with detailed event information when value changes.
   */
  @Output() readonly valueChangeDetails = new EventEmitter<InputChangeEventDetails>();

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

    this._value.set(newValue);
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
    this._value.set(newValue);
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

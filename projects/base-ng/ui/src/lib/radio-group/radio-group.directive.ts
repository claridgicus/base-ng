/**
 * @component RadioGroup
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/radio-group/RadioGroup.tsx
 * @reactDocs https://base-ui.com/react/components/radio
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A group of radio buttons with shared state management.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  RADIO_GROUP_CONTEXT,
  RadioGroupChangeEventDetails,
  RadioGroupContext,
} from './radio-group.types';

/**
 * Directive for radio group component.
 * Groups multiple radio buttons with exclusive selection.
 *
 * @example
 * ```html
 * <div baseUiRadioGroup [(value)]="selectedOption" name="options">
 *   <button baseUiRadioRoot value="option1">Option 1</button>
 *   <button baseUiRadioRoot value="option2">Option 2</button>
 *   <button baseUiRadioRoot value="option3">Option 3</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiRadioGroup]',
  standalone: true,
  exportAs: 'radioGroup',
  providers: [
    {
      provide: RADIO_GROUP_CONTEXT,
      useFactory: (directive: RadioGroupDirective): RadioGroupContext => ({
        value: directive.internalValue,
        disabled: directive._disabled,
        readOnly: directive._readOnly,
        required: directive._required,
        setValue: directive.setValue.bind(directive),
        name: directive._name,
      }),
      deps: [RadioGroupDirective],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupDirective),
      multi: true,
    },
  ],
  host: {
    role: 'radiogroup',
    '[attr.aria-disabled]': '_disabled() ? "true" : null',
    '[attr.aria-readonly]': '_readOnly() ? "true" : null',
    '[attr.aria-required]': '_required() ? "true" : null',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-readonly]': '_readOnly() ? "" : null',
    '[attr.data-required]': '_required() ? "" : null',
    '[class.base-ui-radio-group]': 'true',
    '[class.base-ui-radio-group-disabled]': '_disabled()',
    '[class.base-ui-radio-group-readonly]': '_readOnly()',
  },
})
export class RadioGroupDirective implements ControlValueAccessor {
  // Internal signals for reactive updates
  readonly _value = signal<string | undefined>(undefined);
  readonly _disabled = signal(false);
  readonly _readOnly = signal(false);
  readonly _required = signal(false);
  readonly _name = signal<string | undefined>(undefined);

  /**
   * Current selected value.
   */
  @Input()
  set value(val: string | undefined) {
    this._value.set(val);
    this.internalValue.set(val);
  }
  get value(): string | undefined {
    return this._value();
  }

  /**
   * Internal value signal for context (since model is a WritableSignal).
   */
  readonly internalValue = signal<string | undefined>(undefined);

  /**
   * Whether the group is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(val: boolean) {
    this._disabled.set(val);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Whether the group is read-only.
   */
  @Input({ transform: booleanAttribute })
  set readOnly(val: boolean) {
    this._readOnly.set(val);
  }
  get readOnly(): boolean {
    return this._readOnly();
  }

  /**
   * Whether the group is required.
   */
  @Input({ transform: booleanAttribute })
  set required(val: boolean) {
    this._required.set(val);
  }
  get required(): boolean {
    return this._required();
  }

  /**
   * Name for the radio group (for form submission).
   */
  @Input()
  set name(val: string | undefined) {
    this._name.set(val);
  }
  get name(): string | undefined {
    return this._name();
  }

  /**
   * Event emitted when value changes with details.
   */
  @Output() valueChanged = new EventEmitter<RadioGroupChangeEventDetails>();

  /**
   * Event emitter for two-way binding support.
   */
  @Output() valueChange = new EventEmitter<string | undefined>();

  // ControlValueAccessor
  private onChange: (value: string | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync model to internal value
    effect(() => {
      this.internalValue.set(this._value());
    });
  }

  /**
   * Set the selected value.
   */
  setValue(val: string): void {
    if (this._disabled() || this._readOnly()) return;

    this.updateValue(val);
  }

  /**
   * Update the value and notify.
   */
  private updateValue(newValue: string): void {
    this._value.set(newValue);
    this.internalValue.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.valueChange.emit(newValue);
    this.valueChanged.emit({ value: newValue });
  }

  // ControlValueAccessor methods
  writeValue(value: string | undefined): void {
    this._value.set(value);
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Disabled state is handled via input
  }
}

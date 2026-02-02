/**
 * @fileoverview Angular port of Base UI RadioGroup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/radio-group/RadioGroup.tsx
 *
 * A group of radio buttons with shared state management.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  forwardRef,
  input,
  model,
  output,
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
        disabled: directive.disabled,
        readOnly: directive.readOnly,
        required: directive.required,
        setValue: directive.setValue.bind(directive),
        name: directive.name,
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
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-readonly]': 'readOnly() ? "true" : null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-readonly]': 'readOnly() ? "" : null',
    '[attr.data-required]': 'required() ? "" : null',
    '[class.base-ui-radio-group]': 'true',
    '[class.base-ui-radio-group-disabled]': 'disabled()',
    '[class.base-ui-radio-group-readonly]': 'readOnly()',
  },
})
export class RadioGroupDirective implements ControlValueAccessor {
  /**
   * Current selected value.
   */
  readonly value = model<string | undefined>(undefined);

  /**
   * Internal value signal for context (since model is a WritableSignal).
   */
  readonly internalValue = signal<string | undefined>(undefined);

  /**
   * Whether the group is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the group is read-only.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /**
   * Whether the group is required.
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Name for the radio group (for form submission).
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * Event emitted when value changes with details.
   */
  readonly valueChanged = output<RadioGroupChangeEventDetails>();

  // ControlValueAccessor
  private onChange: (value: string | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync model to internal value
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  /**
   * Set the selected value.
   */
  setValue(val: string): void {
    if (this.disabled() || this.readOnly()) return;

    this.updateValue(val);
  }

  /**
   * Update the value and notify.
   */
  private updateValue(newValue: string): void {
    this.value.set(newValue);
    this.internalValue.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.valueChanged.emit({ value: newValue });
  }

  // ControlValueAccessor methods
  writeValue(value: string | undefined): void {
    this.value.set(value);
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

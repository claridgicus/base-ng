/**
 * @fileoverview Angular port of Base UI CheckboxGroup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/checkbox-group/CheckboxGroup.tsx
 *
 * A group of checkboxes with shared state management.
 */

import {
  booleanAttribute,
  computed,
  Directive,
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
  CHECKBOX_GROUP_CONTEXT,
  CheckboxGroupChangeEventDetails,
  CheckboxGroupContext,
} from './checkbox-group.types';

/**
 * Directive for checkbox group component.
 * Groups multiple checkboxes with shared value state.
 *
 * @example
 * ```html
 * <div baseUiCheckboxGroup [(value)]="selectedOptions">
 *   <button baseUiCheckboxRoot value="option1">Option 1</button>
 *   <button baseUiCheckboxRoot value="option2">Option 2</button>
 *   <button baseUiCheckboxRoot value="option3">Option 3</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiCheckboxGroup]',
  standalone: true,
  exportAs: 'checkboxGroup',
  providers: [
    {
      provide: CHECKBOX_GROUP_CONTEXT,
      useFactory: (directive: CheckboxGroupDirective): CheckboxGroupContext => ({
        value: directive.value,
        disabled: directive.disabled,
        addValue: directive.addValue.bind(directive),
        removeValue: directive.removeValue.bind(directive),
        toggleValue: directive.toggleValue.bind(directive),
        isSelected: directive.isSelected.bind(directive),
        allValues: directive.allValues,
      }),
      deps: [CheckboxGroupDirective],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupDirective),
      multi: true,
    },
  ],
  host: {
    role: 'group',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class.base-ui-checkbox-group]': 'true',
    '[class.base-ui-checkbox-group-disabled]': 'disabled()',
  },
})
export class CheckboxGroupDirective implements ControlValueAccessor {
  /**
   * Current selected values.
   */
  readonly value = model<string[]>([]);

  /**
   * Whether the group is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * All possible values (for parent checkbox "select all" functionality).
   */
  readonly allValues = input<string[]>([]);

  /**
   * Event emitted when value changes with details.
   */
  readonly valueChanged = output<CheckboxGroupChangeEventDetails>();

  // ControlValueAccessor
  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Add a value to the selection.
   */
  addValue(val: string): void {
    if (this.disabled()) return;

    const current = this.value();
    if (!current.includes(val)) {
      const newValue = [...current, val];
      this.updateValue(newValue);
    }
  }

  /**
   * Remove a value from the selection.
   */
  removeValue(val: string): void {
    if (this.disabled()) return;

    const current = this.value();
    const index = current.indexOf(val);
    if (index !== -1) {
      const newValue = current.filter(v => v !== val);
      this.updateValue(newValue);
    }
  }

  /**
   * Toggle a value in the selection.
   */
  toggleValue(val: string): void {
    if (this.disabled()) return;

    if (this.isSelected(val)) {
      this.removeValue(val);
    } else {
      this.addValue(val);
    }
  }

  /**
   * Check if a value is selected.
   */
  isSelected(val: string): boolean {
    return this.value().includes(val);
  }

  /**
   * Update the value and notify.
   */
  private updateValue(newValue: string[]): void {
    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.valueChanged.emit({ value: newValue });
  }

  // ControlValueAccessor methods
  writeValue(value: string[]): void {
    this.value.set(value ?? []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Disabled state is handled via input
  }
}

/**
 * @component CheckboxGroup
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/checkbox-group/CheckboxGroup.tsx
 * @reactDocs https://base-ui.com/react/components/checkbox-group
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A group of checkboxes with shared state management.
 */

import {
  booleanAttribute,
  computed,
  Directive,
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
        value: directive._value,
        disabled: directive._disabled,
        addValue: directive.addValue.bind(directive),
        removeValue: directive.removeValue.bind(directive),
        toggleValue: directive.toggleValue.bind(directive),
        isSelected: directive.isSelected.bind(directive),
        allValues: directive._allValues,
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
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[class.base-ui-checkbox-group]': 'true',
    '[class.base-ui-checkbox-group-disabled]': '_disabled()',
  },
})
export class CheckboxGroupDirective implements ControlValueAccessor {
  /**
   * Internal signal for value.
   */
  readonly _value = signal<string[]>([]);

  /**
   * Current selected values.
   */
  @Input()
  set value(val: string[]) {
    this._value.set(val);
  }
  get value(): string[] {
    return this._value();
  }

  /**
   * Event emitter for two-way binding.
   */
  @Output() valueChange = new EventEmitter<string[]>();

  /**
   * Internal signal for disabled state.
   */
  readonly _disabled = signal<boolean>(false);

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
   * Internal signal for allValues.
   */
  readonly _allValues = signal<string[]>([]);

  /**
   * All possible values (for parent checkbox "select all" functionality).
   */
  @Input()
  set allValues(val: string[]) {
    this._allValues.set(val);
  }
  get allValues(): string[] {
    return this._allValues();
  }

  /**
   * Event emitted when value changes with details.
   */
  @Output() valueChanged = new EventEmitter<CheckboxGroupChangeEventDetails>();

  // ControlValueAccessor
  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Add a value to the selection.
   */
  addValue(val: string): void {
    if (this._disabled()) return;

    const current = this._value();
    if (!current.includes(val)) {
      const newValue = [...current, val];
      this.updateValue(newValue);
    }
  }

  /**
   * Remove a value from the selection.
   */
  removeValue(val: string): void {
    if (this._disabled()) return;

    const current = this._value();
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
    if (this._disabled()) return;

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
    return this._value().includes(val);
  }

  /**
   * Update the value and notify.
   */
  private updateValue(newValue: string[]): void {
    this._value.set(newValue);
    this.valueChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.valueChanged.emit({ value: newValue });
  }

  // ControlValueAccessor methods
  writeValue(value: string[]): void {
    this._value.set(value ?? []);
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

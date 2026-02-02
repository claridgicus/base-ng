/**
 * @fileoverview Angular port of Base UI CheckboxRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/checkbox/root/CheckboxRoot.tsx
 *
 * A checkbox control that supports checked, unchecked, and indeterminate states.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  Signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  CHECKBOX_CONTEXT,
  CheckboxContext,
} from './checkbox.types';
import { CHECKBOX_GROUP_CONTEXT } from '../checkbox-group/checkbox-group.types';

/**
 * Root directive for checkbox component.
 * Handles the checkbox state and accessibility.
 *
 * @example
 * ```html
 * <button baseUiCheckboxRoot [(checked)]="isChecked">
 *   <span baseUiCheckboxIndicator>✓</span>
 *   Accept terms
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiCheckboxRoot]',
  standalone: true,
  exportAs: 'checkboxRoot',
  providers: [
    {
      provide: CHECKBOX_CONTEXT,
      useFactory: (directive: CheckboxRootDirective): CheckboxContext => ({
        checked: directive.effectiveChecked(),
        disabled: directive.disabled(),
        indeterminate: directive.indeterminate(),
        readOnly: directive.readOnly(),
        required: directive.required(),
        checkedSignal: directive.effectiveChecked,
        indeterminateSignal: directive.indeterminate,
      }),
      deps: [CheckboxRootDirective],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxRootDirective),
      multi: true,
    },
  ],
  host: {
    type: 'button',
    role: 'checkbox',
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-readonly]': 'readOnly() ? "true" : null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[attr.data-checked]': 'effectiveChecked() ? "" : null',
    '[attr.data-unchecked]': '!effectiveChecked() && !indeterminate() ? "" : null',
    '[attr.data-indeterminate]': 'indeterminate() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-readonly]': 'readOnly() ? "" : null',
    '[attr.data-required]': 'required() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[class.base-ui-checkbox]': 'true',
    '[class.base-ui-checkbox-checked]': 'effectiveChecked()',
    '[class.base-ui-checkbox-unchecked]': '!effectiveChecked() && !indeterminate()',
    '[class.base-ui-checkbox-indeterminate]': 'indeterminate()',
    '[class.base-ui-checkbox-disabled]': 'disabled()',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class CheckboxRootDirective implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly groupContext = inject(CHECKBOX_GROUP_CONTEXT, { optional: true });

  /**
   * Whether the checkbox is checked.
   * Supports two-way binding with [(checked)].
   */
  readonly checked = model<boolean>(false);

  /**
   * Whether the checkbox is indeterminate.
   */
  readonly indeterminate = model<boolean>(false);

  /**
   * Whether the checkbox is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the checkbox is read-only.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /**
   * Whether the checkbox is required.
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Value to use when part of a checkbox group.
   */
  readonly value = input<string>();

  /**
   * Name for the hidden input.
   */
  readonly name = input<string>();

  /**
   * Event emitted when checked state changes.
   */
  readonly checkedChange = output<boolean>();

  /**
   * Effective checked state.
   * When in a group with a value, this reads from the group's value array.
   */
  readonly effectiveChecked: Signal<boolean> = computed(() => {
    const val = this.value();
    if (this.groupContext && val !== undefined) {
      // value is a WritableSignal, so call it to get the array
      const groupValue = this.groupContext.value();
      return Array.isArray(groupValue) ? groupValue.includes(val) : false;
    }
    return this.checked();
  });

  /**
   * Computed aria-checked attribute.
   */
  protected readonly ariaChecked = computed(() => {
    if (this.indeterminate()) {
      return 'mixed';
    }
    return this.effectiveChecked() ? 'true' : 'false';
  });

  constructor() {
    // Sync checked state from group when in a group
    effect(() => {
      const val = this.value();
      if (this.groupContext && val !== undefined) {
        const groupValue = this.groupContext.value();
        const isInGroup = Array.isArray(groupValue) ? groupValue.includes(val) : false;
        if (this.checked() !== isInGroup) {
          this.checked.set(isInGroup);
        }
      }
    });
  }

  // ControlValueAccessor
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Handle click event.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled() || this.readOnly()) {
      event.preventDefault();
      return;
    }

    this.toggle('click');
  }

  /**
   * Handle keydown event for Space key.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
      if (this.disabled() || this.readOnly()) {
        return;
      }
      this.toggle('keyboard');
    }
  }

  /**
   * Toggle the checked state.
   */
  private toggle(reason: 'click' | 'keyboard'): void {
    const currentValue = this.effectiveChecked();
    const newValue = !currentValue;

    // Clear indeterminate when toggling
    if (this.indeterminate()) {
      this.indeterminate.set(false);
    }

    // When in a group, toggle via the group context
    const val = this.value();
    if (this.groupContext && val !== undefined) {
      this.groupContext.toggleValue(val);
    } else {
      // Not in a group, manage local state
      this.checked.set(newValue);
    }

    this.onChange(newValue);
    this.onTouched();
    this.checkedChange.emit(newValue);
  }

  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this.checked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Disabled state is handled via input
  }

  /**
   * Focus the checkbox.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}

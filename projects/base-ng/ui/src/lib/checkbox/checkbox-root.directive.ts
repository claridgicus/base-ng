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
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
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
        checked: directive.checked(),
        disabled: directive.disabled(),
        indeterminate: directive.indeterminate(),
        readOnly: directive.readOnly(),
        required: directive.required(),
        checkedSignal: directive.checked,
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
    '[attr.data-checked]': 'checked() ? "" : null',
    '[attr.data-unchecked]': '!checked() && !indeterminate() ? "" : null',
    '[attr.data-indeterminate]': 'indeterminate() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-readonly]': 'readOnly() ? "" : null',
    '[attr.data-required]': 'required() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[class.base-ui-checkbox]': 'true',
    '[class.base-ui-checkbox-checked]': 'checked()',
    '[class.base-ui-checkbox-unchecked]': '!checked() && !indeterminate()',
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
   * Computed aria-checked attribute.
   */
  protected readonly ariaChecked = computed(() => {
    if (this.indeterminate()) {
      return 'mixed';
    }
    return this.checked() ? 'true' : 'false';
  });

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
    const newValue = !this.checked();

    // Clear indeterminate when toggling
    if (this.indeterminate()) {
      this.indeterminate.set(false);
    }

    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();

    this.checkedChange.emit(newValue);

    // Notify group if present
    if (this.groupContext) {
      const val = this.value();
      if (val !== undefined) {
        if (newValue) {
          this.groupContext.addValue(val);
        } else {
          this.groupContext.removeValue(val);
        }
      }
    }
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

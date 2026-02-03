/**
 * @component CheckboxRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/checkbox/root/CheckboxRoot.tsx
 * @reactDocs https://base-ui.com/react/components/checkbox
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A checkbox control that supports checked, unchecked, and indeterminate states.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  signal,
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
        disabled: directive._disabled(),
        indeterminate: directive._indeterminate(),
        readOnly: directive._readOnly(),
        required: directive._required(),
        checkedSignal: directive.effectiveChecked,
        indeterminateSignal: directive._indeterminate,
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
    '[attr.aria-disabled]': '_disabled() ? "true" : null',
    '[attr.aria-readonly]': '_readOnly() ? "true" : null',
    '[attr.aria-required]': '_required() ? "true" : null',
    '[attr.data-checked]': 'effectiveChecked() ? "" : null',
    '[attr.data-unchecked]': '!effectiveChecked() && !_indeterminate() ? "" : null',
    '[attr.data-indeterminate]': '_indeterminate() ? "" : null',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-readonly]': '_readOnly() ? "" : null',
    '[attr.data-required]': '_required() ? "" : null',
    '[attr.disabled]': '_disabled() ? "" : null',
    '[class.base-ui-checkbox]': 'true',
    '[class.base-ui-checkbox-checked]': 'effectiveChecked()',
    '[class.base-ui-checkbox-unchecked]': '!effectiveChecked() && !_indeterminate()',
    '[class.base-ui-checkbox-indeterminate]': '_indeterminate()',
    '[class.base-ui-checkbox-disabled]': '_disabled()',
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
  readonly _checked = signal<boolean>(false);
  @Input()
  set checked(value: boolean) {
    this._checked.set(value);
  }
  get checked(): boolean {
    return this._checked();
  }

  /**
   * Whether the checkbox is indeterminate.
   */
  readonly _indeterminate = signal<boolean>(false);
  @Input()
  set indeterminate(value: boolean) {
    this._indeterminate.set(value);
  }
  get indeterminate(): boolean {
    return this._indeterminate();
  }

  /**
   * Whether the checkbox is disabled.
   */
  readonly _disabled = signal<boolean>(false);
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Whether the checkbox is read-only.
   */
  readonly _readOnly = signal<boolean>(false);
  @Input({ transform: booleanAttribute })
  set readOnly(value: boolean) {
    this._readOnly.set(value);
  }
  get readOnly(): boolean {
    return this._readOnly();
  }

  /**
   * Whether the checkbox is required.
   */
  readonly _required = signal<boolean>(false);
  @Input({ transform: booleanAttribute })
  set required(value: boolean) {
    this._required.set(value);
  }
  get required(): boolean {
    return this._required();
  }

  /**
   * Value to use when part of a checkbox group.
   */
  readonly _value = signal<string | undefined>(undefined);
  @Input()
  set value(value: string | undefined) {
    this._value.set(value);
  }
  get value(): string | undefined {
    return this._value();
  }

  /**
   * Name for the hidden input.
   */
  readonly _name = signal<string | undefined>(undefined);
  @Input()
  set name(value: string | undefined) {
    this._name.set(value);
  }
  get name(): string | undefined {
    return this._name();
  }

  /**
   * Event emitted when checked state changes.
   */
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  /**
   * Event emitted when indeterminate state changes.
   */
  @Output() readonly indeterminateChange = new EventEmitter<boolean>();

  /**
   * Effective checked state.
   * When in a group with a value, this reads from the group's value array.
   */
  readonly effectiveChecked: Signal<boolean> = computed(() => {
    const val = this._value();
    if (this.groupContext && val !== undefined) {
      // value is a WritableSignal, so call it to get the array
      const groupValue = this.groupContext.value();
      return Array.isArray(groupValue) ? groupValue.includes(val) : false;
    }
    return this._checked();
  });

  /**
   * Computed aria-checked attribute.
   */
  protected readonly ariaChecked = computed(() => {
    if (this._indeterminate()) {
      return 'mixed';
    }
    return this.effectiveChecked() ? 'true' : 'false';
  });

  constructor() {
    // Sync checked state from group when in a group
    effect(() => {
      const val = this._value();
      if (this.groupContext && val !== undefined) {
        const groupValue = this.groupContext.value();
        const isInGroup = Array.isArray(groupValue) ? groupValue.includes(val) : false;
        if (this._checked() !== isInGroup) {
          this._checked.set(isInGroup);
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
    if (this._disabled() || this._readOnly()) {
      event.preventDefault();
      return;
    }

    this.toggle('click');
  }

  /**
   * Handle keydown event for Space and Enter keys.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (this._disabled() || this._readOnly()) {
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
    if (this._indeterminate()) {
      this._indeterminate.set(false);
      this.indeterminateChange.emit(false);
    }

    // When in a group, toggle via the group context
    const val = this._value();
    if (this.groupContext && val !== undefined) {
      this.groupContext.toggleValue(val);
    } else {
      // Not in a group, manage local state
      this._checked.set(newValue);
    }

    this.onChange(newValue);
    this.onTouched();
    this.checkedChange.emit(newValue);
  }

  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this._checked.set(value ?? false);
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

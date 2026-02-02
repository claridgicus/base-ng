/**
 * @fileoverview Angular port of Base UI SwitchRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/switch/root/SwitchRoot.tsx
 *
 * The switch itself that renders with role="switch" and manages toggle state.
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
  type Signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  SWITCH_CONTEXT,
  SwitchContext,
  SwitchState,
} from './switch.types';

/**
 * Root directive for Switch component.
 * Manages toggle state and provides context to child components.
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <button baseUiSwitchRoot [(checked)]="isEnabled">
 *   <span baseUiSwitchThumb></span>
 * </button>
 *
 * <!-- With form integration -->
 * <button baseUiSwitchRoot [(ngModel)]="settings.darkMode" name="darkMode">
 *   <span baseUiSwitchThumb></span>
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiSwitchRoot]',
  standalone: true,
  exportAs: 'switchRoot',
  providers: [
    {
      provide: SWITCH_CONTEXT,
      useFactory: (directive: SwitchRootDirective) => directive.context,
      deps: [SwitchRootDirective],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchRootDirective),
      multi: true,
    },
  ],
  host: {
    role: 'switch',
    type: 'button',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-readonly]': 'readOnly() || null',
    '[attr.aria-required]': 'required() || null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.data-checked]': 'checked() ? "" : null',
    '[attr.data-unchecked]': '!checked() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-readonly]': 'readOnly() ? "" : null',
    '[attr.data-required]': 'required() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[class.base-ui-switch]': 'true',
    '[class.base-ui-switch-checked]': 'checked()',
    '[class.base-ui-switch-unchecked]': '!checked()',
    '[class.base-ui-switch-disabled]': 'disabled()',
    '[class.base-ui-switch-readonly]': 'readOnly()',
  },
})
export class SwitchRootDirective implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Whether the switch is checked.
   * Supports two-way binding with [(checked)].
   */
  readonly checked = model<boolean>(false);

  /**
   * Whether the switch is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the switch is read-only.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /**
   * Whether the switch is required.
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Name attribute for form submission.
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * Value when switch is checked (for form submission).
   */
  readonly value = input<string>('on');

  /**
   * Value when switch is unchecked (for form submission).
   */
  readonly uncheckedValue = input<string | undefined>(undefined);

  /**
   * Emitted when checked state changes.
   */
  readonly checkedChange = output<boolean>();

  // ControlValueAccessor callbacks
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Combined state object.
   */
  readonly state: Signal<SwitchState> = computed(() => ({
    checked: this.checked(),
    disabled: this.disabled(),
    readOnly: this.readOnly(),
    required: this.required(),
  }));

  /**
   * Context provided to child components.
   */
  readonly context: SwitchContext = {
    checked: computed(() => this.checked()),
    disabled: computed(() => this.disabled()),
    readOnly: computed(() => this.readOnly()),
    required: computed(() => this.required()),
    state: this.state,
  };

  /**
   * Handle click to toggle state.
   */
  @HostListener('click')
  onClick(): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.checkedChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  /**
   * Handle keyboard navigation.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    // Space and Enter toggle the switch
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onClick();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Disabled state is controlled via input, but this is called by forms
    // We can't directly set input values, so this is handled externally
  }

  /**
   * Toggle the switch state programmatically.
   */
  toggle(): void {
    if (!this.disabled() && !this.readOnly()) {
      this.onClick();
    }
  }

  /**
   * Focus the switch element.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}

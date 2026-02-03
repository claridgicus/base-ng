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
    '[attr.aria-checked]': '_checked()',
    '[attr.aria-readonly]': '_readOnly() || null',
    '[attr.aria-required]': '_required() || null',
    '[attr.aria-disabled]': '_disabled() || null',
    '[attr.data-checked]': '_checked() ? "" : null',
    '[attr.data-unchecked]': '!_checked() ? "" : null',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-readonly]': '_readOnly() ? "" : null',
    '[attr.data-required]': '_required() ? "" : null',
    '[attr.disabled]': '_disabled() ? "" : null',
    '[class.base-ui-switch]': 'true',
    '[class.base-ui-switch-checked]': '_checked()',
    '[class.base-ui-switch-unchecked]': '!_checked()',
    '[class.base-ui-switch-disabled]': '_disabled()',
    '[class.base-ui-switch-readonly]': '_readOnly()',
  },
})
export class SwitchRootDirective implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // Internal signals for reactive updates
  readonly _checked = signal(false);
  readonly _disabled = signal(false);
  readonly _readOnly = signal(false);
  readonly _required = signal(false);
  readonly _name = signal<string | undefined>(undefined);
  readonly _value = signal('on');
  readonly _uncheckedValue = signal<string | undefined>(undefined);

  /**
   * Whether the switch is checked.
   * Supports two-way binding with [(checked)].
   */
  @Input({ transform: booleanAttribute })
  set checked(value: boolean) {
    this._checked.set(value);
  }
  get checked(): boolean {
    return this._checked();
  }

  /**
   * Whether the switch is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Whether the switch is read-only.
   */
  @Input({ transform: booleanAttribute })
  set readOnly(value: boolean) {
    this._readOnly.set(value);
  }
  get readOnly(): boolean {
    return this._readOnly();
  }

  /**
   * Whether the switch is required.
   */
  @Input({ transform: booleanAttribute })
  set required(value: boolean) {
    this._required.set(value);
  }
  get required(): boolean {
    return this._required();
  }

  /**
   * Name attribute for form submission.
   */
  @Input()
  set name(value: string | undefined) {
    this._name.set(value);
  }
  get name(): string | undefined {
    return this._name();
  }

  /**
   * Value when switch is checked (for form submission).
   */
  @Input()
  set value(value: string) {
    this._value.set(value);
  }
  get value(): string {
    return this._value();
  }

  /**
   * Value when switch is unchecked (for form submission).
   */
  @Input()
  set uncheckedValue(value: string | undefined) {
    this._uncheckedValue.set(value);
  }
  get uncheckedValue(): string | undefined {
    return this._uncheckedValue();
  }

  /**
   * Emitted when checked state changes.
   */
  @Output() checkedChange = new EventEmitter<boolean>();

  // ControlValueAccessor callbacks
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Combined state object.
   */
  readonly state: Signal<SwitchState> = computed(() => ({
    checked: this._checked(),
    disabled: this._disabled(),
    readOnly: this._readOnly(),
    required: this._required(),
  }));

  /**
   * Context provided to child components.
   */
  readonly context: SwitchContext = {
    checked: this._checked,
    disabled: this._disabled,
    readOnly: this._readOnly,
    required: this._required,
    state: this.state,
  };

  /**
   * Handle click to toggle state.
   */
  @HostListener('click')
  onClick(): void {
    if (this._disabled() || this._readOnly()) {
      return;
    }

    const newValue = !this._checked();
    this._checked.set(newValue);
    this.checkedChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  /**
   * Handle keyboard navigation.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this._disabled() || this._readOnly()) {
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
    this._checked.set(!!value);
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
    if (!this._disabled() && !this._readOnly()) {
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

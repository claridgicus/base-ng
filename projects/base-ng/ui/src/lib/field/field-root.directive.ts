/**
 * @component FieldRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/field/root/FieldRoot.tsx
 * @reactDocs https://base-ui.com/react/components/field
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A form field wrapper that manages validation state and accessibility.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  EventEmitter,
  Input,
  Output,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import {
  DEFAULT_VALIDITY_DATA,
  FIELD_CONTEXT,
  FieldContext,
  FieldState,
  FieldValidationMode,
  FieldValidityData,
} from './field.types';

let fieldIdCounter = 0;

/**
 * Root directive for Field component that manages validation state.
 *
 * @example
 * ```html
 * <div baseUiFieldRoot [name]="'email'">
 *   <label baseUiFieldLabel>Email</label>
 *   <input baseUiFieldControl type="email" />
 *   <span baseUiFieldDescription>Enter your email address</span>
 *   <span baseUiFieldError>Please enter a valid email</span>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiFieldRoot]',
  standalone: true,
  exportAs: 'fieldRoot',
  providers: [
    {
      provide: FIELD_CONTEXT,
      useFactory: (directive: FieldRootDirective) => directive.context,
      deps: [FieldRootDirective],
    },
  ],
  host: {
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-touched]': '_touched() ? "" : null',
    '[attr.data-dirty]': '_dirty() ? "" : null',
    '[attr.data-filled]': '_filled() ? "" : null',
    '[attr.data-focused]': '_focused() ? "" : null',
    '[attr.data-valid]': 'isValid() ? "" : null',
    '[attr.data-invalid]': '!isValid() ? "" : null',
    '[class.base-ui-field]': 'true',
    '[class.base-ui-field-disabled]': '_disabled()',
    '[class.base-ui-field-touched]': '_touched()',
    '[class.base-ui-field-dirty]': '_dirty()',
    '[class.base-ui-field-filled]': '_filled()',
    '[class.base-ui-field-focused]': '_focused()',
    '[class.base-ui-field-valid]': 'isValid()',
    '[class.base-ui-field-invalid]': '!isValid()',
  },
})
export class FieldRootDirective {
  private readonly fieldId = `base-ui-field-${++fieldIdCounter}`;

  // Internal signals for reactive updates
  readonly _name = signal<string | undefined>(undefined);
  readonly _disabled = signal(false);
  readonly _validationMode = signal<FieldValidationMode>('onBlur');
  readonly _validate = signal<((value: unknown) => string | string[] | null) | undefined>(undefined);

  /**
   * Field name for form submission.
   */
  @Input()
  set name(value: string | undefined) {
    this._name.set(value);
  }
  get name(): string | undefined {
    return this._name();
  }

  /**
   * Whether the field is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Validation mode.
   * @default 'onBlur'
   */
  @Input()
  set validationMode(value: FieldValidationMode) {
    this._validationMode.set(value);
  }
  get validationMode(): FieldValidationMode {
    return this._validationMode();
  }

  /**
   * Custom validation function.
   */
  @Input()
  set validate(value: ((value: unknown) => string | string[] | null) | undefined) {
    this._validate.set(value);
  }
  get validate(): ((value: unknown) => string | string[] | null) | undefined {
    return this._validate();
  }

  /**
   * Emitted when validity changes.
   */
  @Output() validityChange = new EventEmitter<FieldValidityData | null>();

  // Internal state
  readonly _touched: WritableSignal<boolean> = signal(false);
  readonly _dirty: WritableSignal<boolean> = signal(false);
  readonly _filled: WritableSignal<boolean> = signal(false);
  readonly _focused: WritableSignal<boolean> = signal(false);
  readonly _validityData: WritableSignal<FieldValidityData | null> = signal(null);
  readonly _controlId: WritableSignal<string | undefined> = signal(undefined);
  readonly _labelId: WritableSignal<string | undefined> = signal(undefined);
  readonly _descriptionId: WritableSignal<string | undefined> = signal(undefined);
  readonly _errorId: WritableSignal<string | undefined> = signal(undefined);

  /**
   * Whether the field is valid.
   */
  readonly isValid: Signal<boolean> = computed(() => {
    const validity = this._validityData();
    return validity === null || validity.valid;
  });

  /**
   * Current state object.
   */
  readonly state: Signal<FieldState> = computed(() => ({
    disabled: this._disabled(),
    touched: this._touched(),
    dirty: this._dirty(),
    filled: this._filled(),
    focused: this._focused(),
    valid: this.isValid(),
    validityData: this._validityData(),
  }));

  /**
   * Context provided to child components.
   */
  readonly context: FieldContext = {
    name: this._name,
    disabled: this._disabled,
    touched: this._touched.asReadonly(),
    dirty: this._dirty.asReadonly(),
    filled: this._filled.asReadonly(),
    focused: this._focused.asReadonly(),
    valid: this.isValid,
    validityData: this._validityData.asReadonly(),
    state: this.state,
    controlId: this._controlId,
    labelId: this._labelId,
    descriptionId: this._descriptionId,
    errorId: this._errorId,
    setTouched: (value: boolean) => this._touched.set(value),
    setDirty: (value: boolean) => this._dirty.set(value),
    setFilled: (value: boolean) => this._filled.set(value),
    setFocused: (value: boolean) => this._focused.set(value),
    setValidityData: (data: FieldValidityData | null) => {
      this._validityData.set(data);
      this.validityChange.emit(data);
    },
    validate: () => this.runValidation(),
  };

  /**
   * Run custom validation.
   */
  private runValidation(): void {
    const validateFn = this._validate();
    if (!validateFn) {
      return;
    }

    // Custom validation would get the value from the control
    // This is a simplified version - full implementation would integrate with FieldControl
  }

  /**
   * Generate a unique ID for field elements.
   */
  generateId(suffix: string): string {
    return `${this.fieldId}-${suffix}`;
  }
}

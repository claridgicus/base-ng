/**
 * @fileoverview Angular port of Base UI MenuRadioGroup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/radio-group/MenuRadioGroup.tsx
 *
 * Groups related radio items.
 */

import { Directive, inject, Input, Output, EventEmitter, signal, booleanAttribute, effect } from '@angular/core';
import { MENU_RADIO_GROUP_CONTEXT, type MenuRadioGroupContext } from './menu.types';

export interface MenuRadioGroupChangeEvent {
  value: unknown;
  reason?: string;
}

/**
 * Radio group directive for menus.
 * Groups related radio items for single selection.
 *
 * @example
 * ```html
 * <div baseUiMenuRadioGroup [(value)]="sortBy">
 *   <div baseUiMenuRadioItem value="name">Sort by Name</div>
 *   <div baseUiMenuRadioItem value="date">Sort by Date</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuRadioGroup]',
  standalone: true,
  exportAs: 'menuRadioGroup',
  host: {
    role: 'group',
    '[attr.aria-disabled]': '_disabled()',
    '[class.base-ui-menu-radio-group]': 'true',
    '[class.base-ui-menu-radio-group-disabled]': '_disabled()',
  },
  providers: [
    {
      provide: MENU_RADIO_GROUP_CONTEXT,
      useFactory: () => {
        const directive = inject(MenuRadioGroupDirective);
        return directive.context;
      },
    },
  ],
})
export class MenuRadioGroupDirective {
  /** Internal signal for value */
  private readonly _value = signal<unknown>(undefined);

  /** Current value (two-way binding) */
  @Input()
  get value(): unknown {
    return this._value();
  }
  set value(val: unknown) {
    this._value.set(val);
  }

  /** Emitted when value changes (for two-way binding) */
  @Output() readonly valueChange = new EventEmitter<unknown>();

  /** Internal signal for default value */
  private readonly _defaultValue = signal<unknown>(undefined);

  /** Default value when uncontrolled */
  @Input()
  get defaultValue(): unknown {
    return this._defaultValue();
  }
  set defaultValue(val: unknown) {
    this._defaultValue.set(val);
  }

  /** Internal signal for disabled state */
  readonly _disabled = signal<boolean>(false);

  /** Whether the group is disabled */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(val: boolean) {
    this._disabled.set(val);
  }

  /** Emitted when value changes with event details.
   * Use (valueChanged) instead of (valueChange) for the full event object.
   */
  @Output() readonly valueChanged = new EventEmitter<MenuRadioGroupChangeEvent>();

  /** Internal value signal for context */
  private readonly valueSignal = signal<unknown>(undefined);

  /**
   * The context provided to child components.
   */
  readonly context: MenuRadioGroupContext = {
    value: undefined,
    valueSignal: this.valueSignal.asReadonly(),
    setValue: (value, reason) => {
      this.valueSignal.set(value);
      this.context.value = value;
      this._value.set(value);
      this.valueChange.emit(value);
      this.valueChanged.emit({ value, reason });
    },
    disabled: false,
  };

  constructor() {
    // Sync internal signal to value signal
    effect(() => {
      const val = this._value();
      if (val !== undefined && this.valueSignal() !== val) {
        this.valueSignal.set(val);
        this.context.value = val;
      }
    });

    // Sync disabled state to context
    effect(() => {
      this.context.disabled = this._disabled();
    });

    // Initialize from defaultValue if value is undefined
    effect(() => {
      const defaultVal = this._defaultValue();
      if (this._value() === undefined && defaultVal !== undefined) {
        this.valueSignal.set(defaultVal);
        this.context.value = defaultVal;
        this._value.set(defaultVal);
      }
    });
  }
}

/**
 * @fileoverview Angular port of Base UI MenuRadioGroup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/radio-group/MenuRadioGroup.tsx
 *
 * Groups related radio items.
 */

import { Directive, inject, input, model, output, signal, booleanAttribute, effect } from '@angular/core';
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
    '[attr.aria-disabled]': 'disabled()',
    '[class.base-ui-menu-radio-group]': 'true',
    '[class.base-ui-menu-radio-group-disabled]': 'disabled()',
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
  /** Current value (two-way binding) */
  readonly value = model<unknown>(undefined);

  /** Default value when uncontrolled */
  readonly defaultValue = input<unknown>();

  /** Whether the group is disabled */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Emitted when value changes with event details.
   * Use (valueChanged) instead of (valueChange) for the full event object.
   */
  readonly valueChanged = output<MenuRadioGroupChangeEvent>();

  /** Internal value signal */
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
      this.value.set(value);
      this.valueChanged.emit({ value, reason });
    },
    disabled: false,
  };

  constructor() {
    // Sync model value to internal signal
    effect(() => {
      const modelValue = this.value();
      if (modelValue !== undefined && this.valueSignal() !== modelValue) {
        this.valueSignal.set(modelValue);
        this.context.value = modelValue;
      }
    });

    // Initialize from defaultValue if model is undefined
    effect(() => {
      const defaultVal = this.defaultValue();
      if (this.value() === undefined && defaultVal !== undefined) {
        this.valueSignal.set(defaultVal);
        this.context.value = defaultVal;
        this.value.set(defaultVal);
      }
    });
  }
}

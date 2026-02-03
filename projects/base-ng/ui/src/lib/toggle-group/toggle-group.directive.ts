/**
 * @fileoverview Angular port of Base UI ToggleGroup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toggle-group/ToggleGroup.tsx
 *
 * A shared state provider for a series of toggle buttons.
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
} from '@angular/core';
import type { ToggleChangeEventDetails } from '../toggle';
import type { Orientation } from '../types';
import {
  TOGGLE_GROUP_CONTEXT,
  ToggleGroupContext,
  ToggleGroupState,
} from './toggle-group.types';

/**
 * A container for toggle buttons that manages shared state.
 * Supports single selection or multiple selection modes.
 *
 * @example
 * ```html
 * <!-- Single selection (default) -->
 * <div baseUiToggleGroup [(value)]="selectedFormat">
 *   <button baseUiToggle value="bold">Bold</button>
 *   <button baseUiToggle value="italic">Italic</button>
 *   <button baseUiToggle value="underline">Underline</button>
 * </div>
 *
 * <!-- Multiple selection -->
 * <div baseUiToggleGroup [(value)]="selectedFormats" [multiple]="true">
 *   <button baseUiToggle value="bold">Bold</button>
 *   <button baseUiToggle value="italic">Italic</button>
 *   <button baseUiToggle value="underline">Underline</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToggleGroup]',
  standalone: true,
  exportAs: 'toggleGroup',
  providers: [
    {
      provide: TOGGLE_GROUP_CONTEXT,
      useFactory: (directive: ToggleGroupDirective) => directive.context,
      deps: [ToggleGroupDirective],
    },
  ],
  host: {
    role: 'group',
    '[attr.aria-orientation]': '_orientation()',
    '[attr.data-orientation]': '_orientation()',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[class.base-ui-toggle-group]': 'true',
    '[class.base-ui-toggle-group-horizontal]': '_orientation() === "horizontal"',
    '[class.base-ui-toggle-group-vertical]': '_orientation() === "vertical"',
    '[class.base-ui-toggle-group-disabled]': '_disabled()',
  },
})
export class ToggleGroupDirective {
  /**
   * Currently selected toggle values.
   * Supports two-way binding with [(value)].
   */
  private readonly _value = signal<string[]>([]);
  readonly internalValue = signal<string[]>([]);

  @Input()
  set value(val: string[]) {
    this._value.set(val);
    this.internalValue.set(val);
  }
  get value(): string[] {
    return this._value();
  }

  /**
   * Emitted when the selected values change.
   */
  @Output() valueChange = new EventEmitter<string[]>();

  /**
   * Whether multiple toggles can be selected.
   * @default false
   */
  private readonly _multiple = signal(false);
  readonly internalMultiple = signal(false);

  @Input({ transform: booleanAttribute })
  set multiple(val: boolean) {
    this._multiple.set(val);
    this.internalMultiple.set(val);
  }
  get multiple(): boolean {
    return this._multiple();
  }

  /**
   * Whether the toggle group is disabled.
   */
  readonly _disabled = signal(false);
  readonly internalDisabled = signal(false);

  @Input({ transform: booleanAttribute })
  set disabled(val: boolean) {
    this._disabled.set(val);
    this.internalDisabled.set(val);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Orientation of the toggle group for accessibility.
   * @default 'horizontal'
   */
  readonly _orientation = signal<Orientation>('horizontal');
  readonly internalOrientation = signal<Orientation>('horizontal');

  @Input()
  set orientation(val: Orientation) {
    this._orientation.set(val);
    this.internalOrientation.set(val);
  }
  get orientation(): Orientation {
    return this._orientation();
  }

  /**
   * Whether keyboard focus should loop when reaching the ends.
   * @default true
   */
  private readonly _loopFocus = signal(true);
  readonly internalLoopFocus = signal(true);

  @Input({ transform: booleanAttribute })
  set loopFocus(val: boolean) {
    this._loopFocus.set(val);
    this.internalLoopFocus.set(val);
  }
  get loopFocus(): boolean {
    return this._loopFocus();
  }

  /**
   * Emitted with full event details when values change.
   */
  @Output() valueChangeDetails = new EventEmitter<{
    value: string[];
    details: ToggleChangeEventDetails;
  }>();

  /**
   * Current state object.
   */
  readonly state: Signal<ToggleGroupState> = computed(() => ({
    value: this._value(),
    disabled: this._disabled(),
    orientation: this._orientation(),
  }));

  /**
   * Context provided to child Toggle components.
   */
  readonly context: ToggleGroupContext = {
    value: computed(() => this._value()),
    disabled: computed(() => this._disabled()),
    setGroupValue: (toggleValue: string, pressed: boolean, details: ToggleChangeEventDetails) => {
      if (details.isCanceled) {
        return;
      }

      const currentValue = this._value();
      let newValue: string[];

      if (this._multiple()) {
        // Multiple selection mode
        if (pressed) {
          newValue = [...currentValue, toggleValue];
        } else {
          newValue = currentValue.filter(v => v !== toggleValue);
        }
      } else {
        // Single selection mode
        if (pressed) {
          newValue = [toggleValue];
        } else {
          newValue = [];
        }
      }

      this._value.set(newValue);
      this.internalValue.set(newValue);
      this.valueChange.emit(newValue);
      this.valueChangeDetails.emit({ value: newValue, details });
    },
  };

  /**
   * Check if a toggle value is currently selected.
   */
  isSelected(toggleValue: string): boolean {
    return this._value().includes(toggleValue);
  }

  /**
   * Select a toggle value programmatically.
   */
  select(toggleValue: string): void {
    if (this._disabled()) {
      return;
    }

    const currentValue = this._value();
    if (currentValue.includes(toggleValue)) {
      return; // Already selected
    }

    let newValue: string[];
    if (this._multiple()) {
      newValue = [...currentValue, toggleValue];
    } else {
      newValue = [toggleValue];
    }

    this._value.set(newValue);
    this.internalValue.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Deselect a toggle value programmatically.
   */
  deselect(toggleValue: string): void {
    if (this._disabled()) {
      return;
    }

    const currentValue = this._value();
    if (!currentValue.includes(toggleValue)) {
      return; // Not selected
    }

    const newValue = currentValue.filter(v => v !== toggleValue);
    this._value.set(newValue);
    this.internalValue.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Clear all selections.
   */
  clear(): void {
    if (this._disabled()) {
      return;
    }

    this._value.set([]);
    this.internalValue.set([]);
    this.valueChange.emit([]);
  }
}

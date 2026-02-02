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
  input,
  model,
  output,
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
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class.base-ui-toggle-group]': 'true',
    '[class.base-ui-toggle-group-horizontal]': 'orientation() === "horizontal"',
    '[class.base-ui-toggle-group-vertical]': 'orientation() === "vertical"',
    '[class.base-ui-toggle-group-disabled]': 'disabled()',
  },
})
export class ToggleGroupDirective {
  /**
   * Currently selected toggle values.
   * Supports two-way binding with [(value)].
   */
  readonly value = model<string[]>([]);

  /**
   * Whether multiple toggles can be selected.
   * @default false
   */
  readonly multiple = input(false, { transform: booleanAttribute });

  /**
   * Whether the toggle group is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Orientation of the toggle group for accessibility.
   * @default 'horizontal'
   */
  readonly orientation = input<Orientation>('horizontal');

  /**
   * Whether keyboard focus should loop when reaching the ends.
   * @default true
   */
  readonly loopFocus = input(true, { transform: booleanAttribute });

  /**
   * Emitted when the selected values change.
   */
  readonly valueChange = output<string[]>();

  /**
   * Emitted with full event details when values change.
   */
  readonly valueChangeDetails = output<{
    value: string[];
    details: ToggleChangeEventDetails;
  }>();

  /**
   * Current state object.
   */
  readonly state: Signal<ToggleGroupState> = computed(() => ({
    value: this.value(),
    disabled: this.disabled(),
    orientation: this.orientation(),
  }));

  /**
   * Context provided to child Toggle components.
   */
  readonly context: ToggleGroupContext = {
    value: computed(() => this.value()),
    disabled: computed(() => this.disabled()),
    setGroupValue: (toggleValue: string, pressed: boolean, details: ToggleChangeEventDetails) => {
      if (details.isCanceled) {
        return;
      }

      const currentValue = this.value();
      let newValue: string[];

      if (this.multiple()) {
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

      this.value.set(newValue);
      this.valueChange.emit(newValue);
      this.valueChangeDetails.emit({ value: newValue, details });
    },
  };

  /**
   * Check if a toggle value is currently selected.
   */
  isSelected(toggleValue: string): boolean {
    return this.value().includes(toggleValue);
  }

  /**
   * Select a toggle value programmatically.
   */
  select(toggleValue: string): void {
    if (this.disabled()) {
      return;
    }

    const currentValue = this.value();
    if (currentValue.includes(toggleValue)) {
      return; // Already selected
    }

    let newValue: string[];
    if (this.multiple()) {
      newValue = [...currentValue, toggleValue];
    } else {
      newValue = [toggleValue];
    }

    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Deselect a toggle value programmatically.
   */
  deselect(toggleValue: string): void {
    if (this.disabled()) {
      return;
    }

    const currentValue = this.value();
    if (!currentValue.includes(toggleValue)) {
      return; // Not selected
    }

    const newValue = currentValue.filter(v => v !== toggleValue);
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Clear all selections.
   */
  clear(): void {
    if (this.disabled()) {
      return;
    }

    this.value.set([]);
    this.valueChange.emit([]);
  }
}

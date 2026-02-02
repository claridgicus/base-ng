/**
 * @fileoverview Angular port of Base UI Toggle
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toggle/Toggle.tsx
 *
 * A two-state button that can be either pressed or unpressed.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  type Signal,
} from '@angular/core';
import { createChangeEventDetails, REASONS } from '../types';
import {
  ToggleChangeEventDetails,
  ToggleState,
} from './toggle.types';
import { TOGGLE_GROUP_CONTEXT } from '../toggle-group/toggle-group.types';

/**
 * Toggle button component that can be pressed or unpressed.
 * Works standalone or within a toggle group.
 *
 * @example
 * ```html
 * <!-- Standalone toggle -->
 * <button baseUiToggle [(pressed)]="isBold">
 *   Bold
 * </button>
 *
 * <!-- With toggle group -->
 * <div baseUiToggleGroup [(value)]="selectedFormats">
 *   <button baseUiToggle value="bold">Bold</button>
 *   <button baseUiToggle value="italic">Italic</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToggle]',
  standalone: true,
  exportAs: 'toggle',
  host: {
    type: 'button',
    '[attr.aria-pressed]': 'isPressed()',
    '[attr.data-pressed]': 'isPressed() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[class.base-ui-toggle]': 'true',
    '[class.base-ui-toggle-pressed]': 'isPressed()',
    '[class.base-ui-toggle-disabled]': 'isDisabled()',
  },
})
export class ToggleDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly groupContext = inject(TOGGLE_GROUP_CONTEXT, { optional: true });

  /**
   * Whether the toggle is pressed.
   * Supports two-way binding with [(pressed)].
   */
  readonly pressed = model<boolean>(false);

  /**
   * Whether the toggle is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Value identifier for use with toggle groups.
   */
  readonly value = input<string | undefined>(undefined);

  /**
   * Emitted when pressed state changes.
   */
  readonly pressedChange = output<boolean>();

  /**
   * Emitted with full event details when pressed changes.
   */
  readonly pressedChangeDetails = output<{
    pressed: boolean;
    details: ToggleChangeEventDetails;
  }>();

  /**
   * Whether the toggle is pressed (considers group context).
   */
  readonly isPressed: Signal<boolean> = computed(() => {
    if (this.groupContext) {
      const val = this.value();
      if (val) {
        return this.groupContext.value().includes(val);
      }
    }
    return this.pressed();
  });

  /**
   * Whether the toggle is disabled (considers group context).
   */
  readonly isDisabled: Signal<boolean> = computed(() => {
    if (this.groupContext?.disabled()) {
      return true;
    }
    return this.disabled();
  });

  /**
   * Current state object.
   */
  readonly state: Signal<ToggleState> = computed(() => ({
    pressed: this.isPressed(),
    disabled: this.isDisabled(),
  }));

  /**
   * Handle click to toggle state.
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const nextPressed = !this.isPressed();
    const details = createChangeEventDetails(REASONS.none, event);

    // Emit detailed event for cancelation support
    this.pressedChangeDetails.emit({ pressed: nextPressed, details });

    if (details.isCanceled) {
      return;
    }

    // Handle group context
    if (this.groupContext) {
      const val = this.value();
      if (val) {
        this.groupContext.setGroupValue(val, nextPressed, details);
      }
    } else {
      // Standalone toggle
      this.pressed.set(nextPressed);
      this.pressedChange.emit(nextPressed);
    }
  }

  /**
   * Handle keyboard navigation.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    // Space and Enter toggle
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      // Create a synthetic mouse event for the click handler
      const syntheticEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      this.onClick(syntheticEvent);
    }
  }

  /**
   * Toggle the pressed state programmatically.
   */
  toggle(): void {
    if (!this.isDisabled()) {
      const syntheticEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      this.onClick(syntheticEvent);
    }
  }

  /**
   * Focus the toggle element.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}

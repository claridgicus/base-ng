/**
 * @component RadioRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/radio/root/RadioRoot.tsx
 * @reactDocs https://base-ui.com/react/components/radio
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A radio button control that must be used within a RadioGroup.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Signal,
} from '@angular/core';
import { RADIO_CONTEXT, RadioContext } from './radio.types';
import { RADIO_GROUP_CONTEXT } from '../radio-group/radio-group.types';

/**
 * Root directive for radio component.
 * Handles the radio state and accessibility.
 *
 * @example
 * ```html
 * <div baseUiRadioGroup [(value)]="selected">
 *   <button baseUiRadioRoot value="option1">
 *     <span baseUiRadioIndicator></span>
 *     Option 1
 *   </button>
 *   <button baseUiRadioRoot value="option2">
 *     <span baseUiRadioIndicator></span>
 *     Option 2
 *   </button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiRadioRoot]',
  standalone: true,
  exportAs: 'radioRoot',
  providers: [
    {
      provide: RADIO_CONTEXT,
      useFactory: (directive: RadioRootDirective): RadioContext => ({
        checked: directive.checked(),
        disabled: directive.effectiveDisabled(),
        readOnly: directive.effectiveReadOnly(),
        required: directive.effectiveRequired(),
        checkedSignal: directive.checked,
      }),
      deps: [RadioRootDirective],
    },
  ],
  host: {
    type: 'button',
    role: 'radio',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'effectiveDisabled() ? "true" : null',
    '[attr.aria-readonly]': 'effectiveReadOnly() ? "true" : null',
    '[attr.aria-required]': 'effectiveRequired() ? "true" : null',
    '[attr.data-checked]': 'checked() ? "" : null',
    '[attr.data-unchecked]': '!checked() ? "" : null',
    '[attr.data-disabled]': 'effectiveDisabled() ? "" : null',
    '[attr.data-readonly]': 'effectiveReadOnly() ? "" : null',
    '[attr.data-required]': 'effectiveRequired() ? "" : null',
    '[attr.disabled]': 'effectiveDisabled() ? "" : null',
    '[attr.name]': 'groupContext?.name() ?? null',
    '[class.base-ui-radio]': 'true',
    '[class.base-ui-radio-checked]': 'checked()',
    '[class.base-ui-radio-unchecked]': '!checked()',
    '[class.base-ui-radio-disabled]': 'effectiveDisabled()',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class RadioRootDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly groupContext = inject(RADIO_GROUP_CONTEXT, { optional: true });

  /**
   * Value of this radio button.
   */
  readonly value = input.required<string>();

  /**
   * Whether the radio is disabled (local override).
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the radio is read-only (local override).
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /**
   * Whether the radio is required (local override).
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Whether this radio is checked.
   */
  readonly checked: Signal<boolean> = computed(() => {
    if (this.groupContext) {
      return this.groupContext.value() === this.value();
    }
    return false;
  });

  /**
   * Effective disabled state (from group or local).
   */
  readonly effectiveDisabled: Signal<boolean> = computed(() => {
    return this.disabled() || (this.groupContext?.disabled() ?? false);
  });

  /**
   * Effective read-only state (from group or local).
   */
  readonly effectiveReadOnly: Signal<boolean> = computed(() => {
    return this.readOnly() || (this.groupContext?.readOnly() ?? false);
  });

  /**
   * Effective required state (from group or local).
   */
  readonly effectiveRequired: Signal<boolean> = computed(() => {
    return this.required() || (this.groupContext?.required() ?? false);
  });

  /**
   * Handle click event.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.effectiveDisabled() || this.effectiveReadOnly()) {
      event.preventDefault();
      return;
    }

    this.select();
  }

  /**
   * Handle keydown event for Space key.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
      if (this.effectiveDisabled() || this.effectiveReadOnly()) {
        return;
      }
      this.select();
    }
    // Prevent Enter from submitting forms
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  /**
   * Select this radio button.
   */
  private select(): void {
    if (this.groupContext) {
      this.groupContext.setValue(this.value());
    }
  }

  /**
   * Focus the radio.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}

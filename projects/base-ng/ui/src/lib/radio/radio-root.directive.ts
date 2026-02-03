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
  Input,
  Signal,
  signal,
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
        checked: directive._checked(),
        disabled: directive._effectiveDisabled(),
        readOnly: directive._effectiveReadOnly(),
        required: directive._effectiveRequired(),
        checkedSignal: directive._checked,
      }),
      deps: [RadioRootDirective],
    },
  ],
  host: {
    type: 'button',
    role: 'radio',
    '[attr.aria-checked]': '_checked()',
    '[attr.aria-disabled]': '_effectiveDisabled() ? "true" : null',
    '[attr.aria-readonly]': '_effectiveReadOnly() ? "true" : null',
    '[attr.aria-required]': '_effectiveRequired() ? "true" : null',
    '[attr.data-checked]': '_checked() ? "" : null',
    '[attr.data-unchecked]': '!_checked() ? "" : null',
    '[attr.data-disabled]': '_effectiveDisabled() ? "" : null',
    '[attr.data-readonly]': '_effectiveReadOnly() ? "" : null',
    '[attr.data-required]': '_effectiveRequired() ? "" : null',
    '[attr.disabled]': '_effectiveDisabled() ? "" : null',
    '[attr.name]': 'groupContext?.name() ?? null',
    '[class.base-ui-radio]': 'true',
    '[class.base-ui-radio-checked]': '_checked()',
    '[class.base-ui-radio-unchecked]': '!_checked()',
    '[class.base-ui-radio-disabled]': '_effectiveDisabled()',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class RadioRootDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly groupContext = inject(RADIO_GROUP_CONTEXT, { optional: true });

  // Internal signals
  protected readonly _value = signal<string | undefined>(undefined);
  protected readonly _disabled = signal(false);
  protected readonly _readOnly = signal(false);
  protected readonly _required = signal(false);

  /**
   * Value of this radio button.
   */
  @Input({ required: true })
  set value(value: string) {
    this._value.set(value);
  }
  get value(): string {
    return this._value()!;
  }

  /**
   * Whether the radio is disabled (local override).
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Whether the radio is read-only (local override).
   */
  @Input({ transform: booleanAttribute })
  set readOnly(value: boolean) {
    this._readOnly.set(value);
  }
  get readOnly(): boolean {
    return this._readOnly();
  }

  /**
   * Whether the radio is required (local override).
   */
  @Input({ transform: booleanAttribute })
  set required(value: boolean) {
    this._required.set(value);
  }
  get required(): boolean {
    return this._required();
  }

  /**
   * Whether this radio is checked.
   */
  protected readonly _checked: Signal<boolean> = computed(() => {
    if (this.groupContext) {
      return this.groupContext.value() === this._value();
    }
    return false;
  });

  /**
   * Effective disabled state (from group or local).
   */
  protected readonly _effectiveDisabled: Signal<boolean> = computed(() => {
    return this._disabled() || (this.groupContext?.disabled() ?? false);
  });

  /**
   * Effective read-only state (from group or local).
   */
  protected readonly _effectiveReadOnly: Signal<boolean> = computed(() => {
    return this._readOnly() || (this.groupContext?.readOnly() ?? false);
  });

  /**
   * Effective required state (from group or local).
   */
  protected readonly _effectiveRequired: Signal<boolean> = computed(() => {
    return this._required() || (this.groupContext?.required() ?? false);
  });

  /**
   * Handle click event.
   */
  protected handleClick(event: MouseEvent): void {
    if (this._effectiveDisabled() || this._effectiveReadOnly()) {
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
      if (this._effectiveDisabled() || this._effectiveReadOnly()) {
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
      this.groupContext.setValue(this._value()!);
    }
  }

  /**
   * Focus the radio.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}

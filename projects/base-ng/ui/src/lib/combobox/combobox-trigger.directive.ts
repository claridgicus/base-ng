/**
 * @fileoverview Angular port of Base UI Combobox Trigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/trigger/ComboboxTrigger.tsx
 */

import {
  Directive,
  Input,
  ElementRef,
  computed,
  inject,
  signal,
  booleanAttribute,
  afterNextRender,
} from '@angular/core';
import { COMBOBOX_ROOT_CONTEXT } from './combobox.types';

/**
 * Combobox Trigger directive.
 * A button that opens the combobox popup.
 * Renders a `<button>` element.
 *
 * @example
 * ```html
 * <div baseUiComboboxRoot>
 *   <input baseUiComboboxInput />
 *   <button baseUiComboboxTrigger>▼</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiComboboxTrigger]',
  standalone: true,
  exportAs: 'comboboxTrigger',
  host: {
    type: 'button',
    '[attr.id]': 'triggerId',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-expanded]': 'rootContext.openSignal()',
    '[attr.aria-controls]': 'listId',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.tabindex]': '"-1"',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[class.base-ui-combobox-trigger]': 'true',
    '[class.base-ui-combobox-trigger-open]': 'rootContext.openSignal()',
    '[class.base-ui-combobox-trigger-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class ComboboxTriggerDirective {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);

  // Private signal for internal state management
  private readonly _disabled = signal(false);

  /**
   * Whether the trigger is disabled independently.
   */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }

  /** Trigger element ID */
  readonly triggerId = `${this.rootContext.rootId}-trigger`;

  /** List element ID */
  readonly listId = `${this.rootContext.rootId}-list`;

  /** Whether the trigger is disabled */
  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this._disabled();
  });

  constructor() {
    // Register trigger element
    afterNextRender(() => {
      this.rootContext.setTriggerElement(this.elementRef.nativeElement);
    });
  }

  /**
   * Handle click to toggle combobox.
   */
  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    const isOpen = this.rootContext.openSignal();
    this.rootContext.setOpen(!isOpen, 'trigger');

    // Focus the input when opening
    if (!isOpen) {
      const inputElement = this.rootContext.inputElement();
      inputElement?.focus();
    }
  }

  /**
   * Handle keyboard navigation.
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.rootContext.setOpen(true, 'keyboard');
        this.rootContext.inputElement()?.focus();
        break;
    }
  }
}

/**
 * @fileoverview Angular port of Base UI AlertDialogClose
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/index.parts.ts
 *
 * A button that closes the alert dialog.
 */

import { Directive, inject, Input, booleanAttribute, signal } from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog.types';

/**
 * Close button directive for alert dialogs.
 * Closes the alert dialog when clicked.
 * This is one of the only ways to close an alert dialog (requires explicit action).
 *
 * @example
 * ```html
 * <button baseUiAlertDialogClose>Cancel</button>
 * ```
 */
@Directive({
  selector: '[baseUiAlertDialogClose]',
  standalone: true,
  exportAs: 'alertDialogClose',
  host: {
    type: 'button',
    '[attr.disabled]': '_disabled() ? "" : null',
    '[class.base-ui-alert-dialog-close]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class AlertDialogCloseDirective {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /**
   * Whether the close button is disabled.
   */
  readonly _disabled = signal<boolean>(false);

  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this._disabled()) {
      event.preventDefault();
      return;
    }

    this.context.closeAlertDialog('close-press');
  }
}

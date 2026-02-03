/**
 * @fileoverview Angular port of Base UI DialogClose
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/close/DialogClose.tsx
 *
 * A button that closes the dialog.
 */

import { booleanAttribute, Directive, inject, Input, signal } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.types';

/**
 * Close button directive for dialogs.
 * Closes the dialog when clicked.
 *
 * @example
 * ```html
 * <button baseUiDialogClose>Close</button>
 * ```
 */
@Directive({
  selector: '[baseUiDialogClose]',
  standalone: true,
  exportAs: 'dialogClose',
  host: {
    type: 'button',
    '[attr.disabled]': '_disabled() ? "" : null',
    '[class.base-ui-dialog-close]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class DialogCloseDirective {
  protected readonly context = inject(DIALOG_CONTEXT);

  /**
   * Whether the close button is disabled (internal signal).
   */
  readonly _disabled = signal<boolean>(false);

  /**
   * Whether the close button is disabled.
   */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this._disabled()) {
      event.preventDefault();
      return;
    }

    this.context.closeDialog('close-press');
  }
}

/**
 * @fileoverview Angular port of Base UI DialogClose
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/close/DialogClose.tsx
 *
 * A button that closes the dialog.
 */

import { Directive, inject, input, booleanAttribute } from '@angular/core';
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
    '[attr.disabled]': 'disabled() ? "" : null',
    '[class.base-ui-dialog-close]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class DialogCloseDirective {
  protected readonly context = inject(DIALOG_CONTEXT);

  /**
   * Whether the close button is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    this.context.closeDialog('close-press');
  }
}

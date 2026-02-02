/**
 * @fileoverview Angular port of Base UI DialogBackdrop
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/backdrop/DialogBackdrop.tsx
 *
 * An overlay element beneath the dialog.
 */

import { Directive, inject } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.types';

/**
 * Backdrop directive for dialogs.
 * Renders an overlay behind the dialog.
 *
 * @example
 * ```html
 * <div baseUiDialogBackdrop></div>
 * ```
 */
@Directive({
  selector: '[baseUiDialogBackdrop]',
  standalone: true,
  exportAs: 'dialogBackdrop',
  host: {
    role: 'presentation',
    '[hidden]': '!context.openSignal()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[class.base-ui-dialog-backdrop]': 'true',
    '[style.userSelect]': '"none"',
  },
})
export class DialogBackdropDirective {
  protected readonly context = inject(DIALOG_CONTEXT);
}

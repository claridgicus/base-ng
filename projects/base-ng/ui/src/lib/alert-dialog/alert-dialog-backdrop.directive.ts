/**
 * @fileoverview Angular port of Base UI AlertDialogBackdrop
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/index.parts.ts
 *
 * An overlay element beneath the alert dialog.
 */

import { Directive, inject } from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog.types';

/**
 * Backdrop directive for alert dialogs.
 * Renders an overlay behind the alert dialog.
 * Note: Unlike regular dialogs, clicking the backdrop does NOT close the alert dialog.
 *
 * @example
 * ```html
 * <div baseUiAlertDialogBackdrop></div>
 * ```
 */
@Directive({
  selector: '[baseUiAlertDialogBackdrop]',
  standalone: true,
  exportAs: 'alertDialogBackdrop',
  host: {
    role: 'presentation',
    '[hidden]': '!context.openSignal()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[class.base-ui-alert-dialog-backdrop]': 'true',
    '[style.userSelect]': '"none"',
  },
})
export class AlertDialogBackdropDirective {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);
}

/**
 * @fileoverview Angular port of Base UI AlertDialogTitle
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/index.parts.ts
 *
 * A title that labels the alert dialog.
 */

import { Directive, inject, OnInit, OnDestroy } from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog.types';

let titleIdCounter = 0;

/**
 * Title directive for alert dialogs.
 * Labels the alert dialog for accessibility.
 *
 * @example
 * ```html
 * <h2 baseUiAlertDialogTitle>Confirm Delete</h2>
 * ```
 */
@Directive({
  selector: '[baseUiAlertDialogTitle]',
  standalone: true,
  exportAs: 'alertDialogTitle',
  host: {
    '[id]': 'titleId',
    '[class.base-ui-alert-dialog-title]': 'true',
  },
})
export class AlertDialogTitleDirective implements OnInit, OnDestroy {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /** Unique ID for the title */
  readonly titleId = `base-ui-alert-dialog-title-${titleIdCounter++}`;

  ngOnInit(): void {
    this.context.setTitleId(this.titleId);
  }

  ngOnDestroy(): void {
    this.context.setTitleId(null);
  }
}

/**
 * @fileoverview Angular port of Base UI AlertDialogDescription
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/index.parts.ts
 *
 * A description that describes the alert dialog.
 */

import { Directive, inject, OnInit, OnDestroy } from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog.types';

let descriptionIdCounter = 0;

/**
 * Description directive for alert dialogs.
 * Provides additional context for accessibility.
 *
 * @example
 * ```html
 * <p baseUiAlertDialogDescription>This action cannot be undone.</p>
 * ```
 */
@Directive({
  selector: '[baseUiAlertDialogDescription]',
  standalone: true,
  exportAs: 'alertDialogDescription',
  host: {
    '[id]': 'descriptionId',
    '[class.base-ui-alert-dialog-description]': 'true',
  },
})
export class AlertDialogDescriptionDirective implements OnInit, OnDestroy {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /** Unique ID for the description */
  readonly descriptionId = `base-ui-alert-dialog-description-${descriptionIdCounter++}`;

  ngOnInit(): void {
    this.context.setDescriptionId(this.descriptionId);
  }

  ngOnDestroy(): void {
    this.context.setDescriptionId(null);
  }
}

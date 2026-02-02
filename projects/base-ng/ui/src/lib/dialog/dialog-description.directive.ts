/**
 * @fileoverview Angular port of Base UI DialogDescription
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/description/DialogDescription.tsx
 *
 * A description that describes the dialog.
 */

import { Directive, inject, OnInit, OnDestroy } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.types';

let descriptionIdCounter = 0;

/**
 * Description directive for dialogs.
 * Provides additional context for accessibility.
 *
 * @example
 * ```html
 * <p baseUiDialogDescription>Additional information about this dialog.</p>
 * ```
 */
@Directive({
  selector: '[baseUiDialogDescription]',
  standalone: true,
  exportAs: 'dialogDescription',
  host: {
    '[id]': 'descriptionId',
    '[class.base-ui-dialog-description]': 'true',
  },
})
export class DialogDescriptionDirective implements OnInit, OnDestroy {
  protected readonly context = inject(DIALOG_CONTEXT);

  /** Unique ID for the description */
  readonly descriptionId = `base-ui-dialog-description-${descriptionIdCounter++}`;

  ngOnInit(): void {
    this.context.setDescriptionId(this.descriptionId);
  }

  ngOnDestroy(): void {
    this.context.setDescriptionId(null);
  }
}

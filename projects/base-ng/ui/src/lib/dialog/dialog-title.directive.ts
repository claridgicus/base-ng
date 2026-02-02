/**
 * @fileoverview Angular port of Base UI DialogTitle
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/title/DialogTitle.tsx
 *
 * A title that labels the dialog.
 */

import { Directive, inject, OnInit, OnDestroy } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.types';

let titleIdCounter = 0;

/**
 * Title directive for dialogs.
 * Labels the dialog for accessibility.
 *
 * @example
 * ```html
 * <h2 baseUiDialogTitle>Dialog Title</h2>
 * ```
 */
@Directive({
  selector: '[baseUiDialogTitle]',
  standalone: true,
  exportAs: 'dialogTitle',
  host: {
    '[id]': 'titleId',
    '[class.base-ui-dialog-title]': 'true',
  },
})
export class DialogTitleDirective implements OnInit, OnDestroy {
  protected readonly context = inject(DIALOG_CONTEXT);

  /** Unique ID for the title */
  readonly titleId = `base-ui-dialog-title-${titleIdCounter++}`;

  ngOnInit(): void {
    this.context.setTitleId(this.titleId);
  }

  ngOnDestroy(): void {
    this.context.setTitleId(null);
  }
}

/**
 * @fileoverview Angular port of Base UI AlertDialogTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/index.parts.ts
 *
 * A button that triggers the alert dialog on click.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog.types';

/**
 * Trigger directive for alert dialogs.
 * Opens the alert dialog on click.
 *
 * @example
 * ```html
 * <button baseUiAlertDialogTrigger>Delete Item</button>
 * ```
 */
@Directive({
  selector: '[baseUiAlertDialogTrigger]',
  standalone: true,
  exportAs: 'alertDialogTrigger',
  host: {
    type: 'button',
    '[id]': 'context.getTriggerId()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.openSignal()',
    '[attr.aria-controls]': 'context.openSignal() ? context.getPopupId() : null',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[class.base-ui-alert-dialog-trigger]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class AlertDialogTriggerDirective implements OnInit, OnDestroy {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.context.setTriggerElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setTriggerElement(null);
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    this.context.openAlertDialog('trigger-press');
  }
}

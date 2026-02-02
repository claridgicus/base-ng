/**
 * @fileoverview Angular port of Base UI DialogTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/trigger/DialogTrigger.tsx
 *
 * A button that triggers the dialog on click.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.types';

/**
 * Trigger directive for dialogs.
 * Opens the dialog on click.
 *
 * @example
 * ```html
 * <button baseUiDialogTrigger>Open Dialog</button>
 * ```
 */
@Directive({
  selector: '[baseUiDialogTrigger]',
  standalone: true,
  exportAs: 'dialogTrigger',
  host: {
    type: 'button',
    '[id]': 'context.getTriggerId()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.openSignal()',
    '[attr.aria-controls]': 'context.openSignal() ? context.getPopupId() : null',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[class.base-ui-dialog-trigger]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class DialogTriggerDirective implements OnInit, OnDestroy {
  protected readonly context = inject(DIALOG_CONTEXT);
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
    this.context.openDialog('trigger-press');
  }
}

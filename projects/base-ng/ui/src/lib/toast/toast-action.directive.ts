/**
 * @fileoverview Angular port of Base UI Toast Action
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/action/ToastAction.tsx
 */

import { Directive, inject, input, output } from '@angular/core';
import { TOAST_ROOT_CONTEXT } from './toast.types';

/**
 * Toast Action directive.
 * An action button within a toast notification.
 *
 * @example
 * ```html
 * <div baseUiToastRoot [toast]="toast">
 *   <div baseUiToastTitle>{{ toast.title }}</div>
 *   <button baseUiToastAction (actionClick)="handleUndo()">Undo</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToastAction]',
  standalone: true,
  exportAs: 'toastAction',
  host: {
    type: 'button',
    '[class.base-ui-toast-action]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class ToastActionDirective {
  protected readonly rootContext = inject(TOAST_ROOT_CONTEXT);

  /** Alternative text for accessibility */
  readonly altText = input<string>();

  /** Emitted when action is clicked */
  readonly actionClick = output<void>();

  /**
   * Handle click.
   */
  handleClick(event: MouseEvent): void {
    this.actionClick.emit();
    // Optionally close toast after action
    // this.rootContext.close();
  }
}

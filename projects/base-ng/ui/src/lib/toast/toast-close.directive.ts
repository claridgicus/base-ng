/**
 * @fileoverview Angular port of Base UI Toast Close
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/close/ToastClose.tsx
 */

import { Directive, inject } from '@angular/core';
import { TOAST_ROOT_CONTEXT } from './toast.types';

/**
 * Toast Close directive.
 * A button that closes the toast notification.
 *
 * @example
 * ```html
 * <div baseUiToastRoot [toast]="toast">
 *   <div baseUiToastTitle>{{ toast.title }}</div>
 *   <button baseUiToastClose>×</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToastClose]',
  standalone: true,
  exportAs: 'toastClose',
  host: {
    type: 'button',
    '[attr.aria-label]': '"Close notification"',
    '[class.base-ui-toast-close]': 'true',
    '(click)': 'handleClick()',
  },
})
export class ToastCloseDirective {
  protected readonly rootContext = inject(TOAST_ROOT_CONTEXT);

  /**
   * Handle click to close toast.
   */
  handleClick(): void {
    this.rootContext.close();
  }
}

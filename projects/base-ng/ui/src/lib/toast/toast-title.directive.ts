/**
 * @fileoverview Angular port of Base UI Toast Title
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/title/ToastTitle.tsx
 */

import { Directive, inject } from '@angular/core';
import { TOAST_ROOT_CONTEXT } from './toast.types';

/**
 * Toast Title directive.
 * The title text of a toast notification.
 *
 * @example
 * ```html
 * <div baseUiToastRoot [toast]="toast">
 *   <div baseUiToastTitle>{{ toast.title }}</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToastTitle]',
  standalone: true,
  exportAs: 'toastTitle',
  host: {
    '[attr.id]': 'rootContext.titleId',
    '[class.base-ui-toast-title]': 'true',
  },
})
export class ToastTitleDirective {
  protected readonly rootContext = inject(TOAST_ROOT_CONTEXT);
}

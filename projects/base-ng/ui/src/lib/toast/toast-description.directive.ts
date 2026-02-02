/**
 * @fileoverview Angular port of Base UI Toast Description
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/description/ToastDescription.tsx
 */

import { Directive, inject } from '@angular/core';
import { TOAST_ROOT_CONTEXT } from './toast.types';

/**
 * Toast Description directive.
 * The description text of a toast notification.
 *
 * @example
 * ```html
 * <div baseUiToastRoot [toast]="toast">
 *   <div baseUiToastTitle>{{ toast.title }}</div>
 *   <div baseUiToastDescription>{{ toast.description }}</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToastDescription]',
  standalone: true,
  exportAs: 'toastDescription',
  host: {
    '[attr.id]': 'rootContext.descriptionId',
    '[class.base-ui-toast-description]': 'true',
  },
})
export class ToastDescriptionDirective {
  protected readonly rootContext = inject(TOAST_ROOT_CONTEXT);
}

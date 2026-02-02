/**
 * @fileoverview Angular port of Base UI Select Icon
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/icon/SelectIcon.tsx
 */

import {
  Directive,
  inject,
} from '@angular/core';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select Icon directive.
 * Displays an icon indicating the dropdown state.
 * Renders a `<span>` element.
 *
 * @example
 * ```html
 * <button baseUiSelectTrigger>
 *   <span baseUiSelectValue placeholder="Select..."></span>
 *   <span baseUiSelectIcon>▼</span>
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiSelectIcon]',
  standalone: true,
  exportAs: 'selectIcon',
  host: {
    'aria-hidden': 'true',
    '[class.base-ui-select-icon]': 'true',
    '[class.base-ui-select-icon-open]': 'rootContext.openSignal()',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
  },
})
export class SelectIconDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
}

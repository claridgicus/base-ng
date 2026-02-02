/**
 * @fileoverview Angular port of Base UI Toolbar Link
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toolbar/link/ToolbarLink.tsx
 */

import {
  Directive,
  inject,
} from '@angular/core';
import {
  TOOLBAR_ROOT_CONTEXT,
} from './toolbar.types';

/**
 * Toolbar Link directive.
 * A link element within the toolbar.
 * Renders an `<a>` element.
 *
 * @example
 * ```html
 * <div baseUiToolbarRoot>
 *   <button baseUiToolbarButton>Bold</button>
 *   <a baseUiToolbarLink href="/help">Help</a>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToolbarLink]',
  standalone: true,
  exportAs: 'toolbarLink',
  host: {
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[class.base-ui-toolbar-link]': 'true',
  },
})
export class ToolbarLinkDirective {
  protected readonly rootContext = inject(TOOLBAR_ROOT_CONTEXT);
}

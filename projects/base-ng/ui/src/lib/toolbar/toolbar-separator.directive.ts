/**
 * @fileoverview Angular port of Base UI Toolbar Separator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toolbar/separator/ToolbarSeparator.tsx
 */

import {
  Directive,
  computed,
  inject,
} from '@angular/core';
import {
  TOOLBAR_ROOT_CONTEXT,
} from './toolbar.types';

/**
 * Toolbar Separator directive.
 * A separator element accessible to screen readers.
 * Renders a `<div>` element.
 *
 * The separator orientation is perpendicular to the toolbar orientation.
 *
 * @example
 * ```html
 * <div baseUiToolbarRoot orientation="horizontal">
 *   <button baseUiToolbarButton>Bold</button>
 *   <div baseUiToolbarSeparator></div> <!-- Will be vertical -->
 *   <button baseUiToolbarButton>Link</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToolbarSeparator]',
  standalone: true,
  exportAs: 'toolbarSeparator',
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'separatorOrientation()',
    '[attr.data-orientation]': 'separatorOrientation()',
    '[class.base-ui-toolbar-separator]': 'true',
    '[class.base-ui-toolbar-separator-horizontal]':
      'separatorOrientation() === "horizontal"',
    '[class.base-ui-toolbar-separator-vertical]':
      'separatorOrientation() === "vertical"',
  },
})
export class ToolbarSeparatorDirective {
  protected readonly rootContext = inject(TOOLBAR_ROOT_CONTEXT);

  /**
   * The separator orientation is perpendicular to the toolbar orientation.
   */
  readonly separatorOrientation = computed(() => {
    const toolbarOrientation = this.rootContext.orientationSignal();
    return toolbarOrientation === 'horizontal' ? 'vertical' : 'horizontal';
  });
}

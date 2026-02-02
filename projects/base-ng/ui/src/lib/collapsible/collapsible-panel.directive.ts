/**
 * @fileoverview Angular port of Base UI CollapsiblePanel
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/collapsible/panel/CollapsiblePanel.tsx
 *
 * The collapsible content panel.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  type Signal,
} from '@angular/core';
import { COLLAPSIBLE_CONTEXT } from './collapsible.types';

/**
 * Panel directive for collapsible component.
 * Contains the collapsible content.
 *
 * @example
 * ```html
 * <div baseUiCollapsibleRoot>
 *   <button baseUiCollapsibleTrigger>Toggle</button>
 *   <div baseUiCollapsiblePanel>
 *     Content here
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiCollapsiblePanel]',
  standalone: true,
  exportAs: 'collapsiblePanel',
  host: {
    role: 'region',
    '[id]': 'context.panelId',
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[attr.hidden]': 'isHidden() ? "" : null',
    '[class.base-ui-collapsible-panel]': 'true',
    '[class.base-ui-collapsible-panel-open]': 'context.openSignal()',
    '[class.base-ui-collapsible-panel-closed]': '!context.openSignal()',
    '[style.display]': 'shouldShow() ? null : "none"',
  },
})
export class CollapsiblePanelDirective {
  protected readonly context = inject(COLLAPSIBLE_CONTEXT);

  /**
   * Whether to keep the panel mounted when closed.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  /**
   * Whether the panel is hidden.
   */
  readonly isHidden: Signal<boolean> = computed(() => {
    return !this.context.openSignal() && !this.keepMounted();
  });

  /**
   * Whether the panel should be visible.
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    if (this.keepMounted()) {
      return this.context.openSignal();
    }
    return this.context.openSignal();
  });
}

/**
 * @fileoverview Angular port of Base UI AccordionPanel
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/panel/AccordionPanel.tsx
 *
 * The collapsible content panel of an accordion item.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  type Signal,
} from '@angular/core';
import { ACCORDION_ITEM_CONTEXT } from './accordion.types';

/**
 * Panel directive for accordion item.
 * Contains the collapsible content.
 *
 * @example
 * ```html
 * <div baseUiAccordionPanel>
 *   Content here
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAccordionPanel]',
  standalone: true,
  exportAs: 'accordionPanel',
  host: {
    role: 'region',
    '[id]': 'context.panelId',
    '[attr.aria-labelledby]': 'context.triggerId',
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[attr.hidden]': 'isHidden() ? "" : null',
    '[class.base-ui-accordion-panel]': 'true',
    '[class.base-ui-accordion-panel-open]': 'context.openSignal()',
    '[class.base-ui-accordion-panel-closed]': '!context.openSignal()',
    '[style.display]': 'shouldShow() ? null : "none"',
  },
})
export class AccordionPanelDirective {
  protected readonly context = inject(ACCORDION_ITEM_CONTEXT);

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
    return this.context.openSignal();
  });
}

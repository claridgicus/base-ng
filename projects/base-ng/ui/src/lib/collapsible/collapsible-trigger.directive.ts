/**
 * @fileoverview Angular port of Base UI CollapsibleTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/collapsible/trigger/CollapsibleTrigger.tsx
 *
 * A button that toggles the collapsible panel.
 */

import {
  computed,
  Directive,
  inject,
  type Signal,
} from '@angular/core';
import { COLLAPSIBLE_CONTEXT } from './collapsible.types';

/**
 * Trigger directive for collapsible component.
 * Opens and closes the collapsible panel.
 *
 * @example
 * ```html
 * <div baseUiCollapsibleRoot>
 *   <button baseUiCollapsibleTrigger>Toggle</button>
 *   <div baseUiCollapsiblePanel>Content</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiCollapsibleTrigger]',
  standalone: true,
  exportAs: 'collapsibleTrigger',
  host: {
    type: 'button',
    '[attr.aria-expanded]': 'context.openSignal()',
    '[attr.aria-controls]': 'context.panelId',
    '[attr.aria-disabled]': 'context.disabledSignal() ? "true" : null',
    '[attr.disabled]': 'context.disabledSignal() ? "" : null',
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[attr.data-disabled]': 'context.disabledSignal() ? "" : null',
    '[class.base-ui-collapsible-trigger]': 'true',
    '[class.base-ui-collapsible-trigger-open]': 'context.openSignal()',
    '[class.base-ui-collapsible-trigger-closed]': '!context.openSignal()',
    '(click)': 'handleClick($event)',
  },
})
export class CollapsibleTriggerDirective {
  protected readonly context = inject(COLLAPSIBLE_CONTEXT);

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.context.disabledSignal()) {
      event.preventDefault();
      return;
    }
    this.context.setOpen(!this.context.openSignal(), 'trigger-press');
  }
}

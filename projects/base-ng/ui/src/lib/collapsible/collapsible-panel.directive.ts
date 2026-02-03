/**
 * @component CollapsiblePanel
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/collapsible/panel/CollapsiblePanel.tsx
 * @reactDocs https://base-ui.com/react/components/collapsible
 * @visualSource https://base-ui.com/react/components/collapsible
 * @tailwindClasses Copied from React demo examples
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 */

import {
  booleanAttribute,
  computed,
  Directive,
  HostListener,
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
    '[attr.hidden]': 'hiddenAttribute()',
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
   * Whether to use hidden="until-found" for browser search support.
   * When true, the panel remains in the DOM and can be found via browser search (Ctrl+F).
   * This automatically implies keepMounted behavior.
   */
  readonly hiddenUntilFound = input(false, { transform: booleanAttribute });

  /**
   * Computed hidden attribute value.
   * Returns 'until-found' for hiddenUntilFound mode, '' for standard hidden, or null when visible.
   */
  readonly hiddenAttribute: Signal<string | null> = computed(() => {
    if (this.context.openSignal()) {
      return null;
    }
    if (this.hiddenUntilFound()) {
      return 'until-found';
    }
    if (this.keepMounted()) {
      return null; // Keep mounted but use display:none instead
    }
    return '';
  });

  /**
   * Whether the panel should be visible (controls display:none).
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    if (this.hiddenUntilFound()) {
      // hiddenUntilFound uses hidden attribute, not display
      return true;
    }
    return this.context.openSignal();
  });

  /**
   * Handle beforematch event (browser find-in-page).
   * This opens the collapsible when content is found via browser search.
   */
  @HostListener('beforematch')
  onBeforeMatch(): void {
    if (this.hiddenUntilFound()) {
      this.context.setOpen(true, 'programmatic');
    }
  }
}

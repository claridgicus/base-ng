/**
 * @component CollapsibleRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/collapsible/root/CollapsibleRoot.tsx
 * @reactDocs https://base-ui.com/react/components/collapsible
 * @visualSource https://base-ui.com/react/components/collapsible
 * @tailwindClasses Copied from React demo examples
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 */

import {
  booleanAttribute,
  Directive,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  COLLAPSIBLE_CONTEXT,
  CollapsibleChangeEventDetails,
  CollapsibleContext,
} from './collapsible.types';

let nextId = 0;

/**
 * Root directive for collapsible component.
 * Groups the trigger and panel together.
 *
 * @example
 * ```html
 * <div baseUiCollapsibleRoot [(open)]="isOpen">
 *   <button baseUiCollapsibleTrigger>Toggle</button>
 *   <div baseUiCollapsiblePanel>
 *     Content here
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiCollapsibleRoot]',
  standalone: true,
  exportAs: 'collapsibleRoot',
  providers: [
    {
      provide: COLLAPSIBLE_CONTEXT,
      useFactory: (directive: CollapsibleRootDirective): CollapsibleContext => ({
        open: directive.open(),
        disabled: directive.disabled(),
        openSignal: directive.open,
        disabledSignal: directive.disabled,
        toggle: directive.toggle.bind(directive),
        setOpen: directive.setOpen.bind(directive),
        panelId: directive.panelId,
      }),
      deps: [CollapsibleRootDirective],
    },
  ],
  host: {
    '[attr.data-open]': 'open() ? "" : null',
    '[attr.data-closed]': '!open() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class.base-ui-collapsible]': 'true',
    '[class.base-ui-collapsible-open]': 'open()',
    '[class.base-ui-collapsible-closed]': '!open()',
    '[class.base-ui-collapsible-disabled]': 'disabled()',
  },
})
export class CollapsibleRootDirective {
  /**
   * Unique ID for this collapsible (for aria-controls).
   */
  readonly panelId = `base-ui-collapsible-panel-${nextId++}`;

  /**
   * Whether the collapsible is open.
   */
  readonly open = model(false);

  /**
   * Whether the collapsible is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Event emitted when open state changes.
   */
  readonly openChanged = output<CollapsibleChangeEventDetails>();

  /**
   * Toggle the open state.
   */
  toggle(reason: 'trigger-press' | 'programmatic' = 'programmatic'): void {
    if (this.disabled()) return;
    this.setOpen(!this.open(), reason);
  }

  /**
   * Set the open state.
   */
  setOpen(open: boolean, reason: 'trigger-press' | 'programmatic' = 'programmatic'): void {
    if (this.disabled()) return;
    if (this.open() === open) return;

    this.open.set(open);
    this.openChanged.emit({ open, reason });
  }
}

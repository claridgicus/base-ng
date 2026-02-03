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
  EventEmitter,
  Input,
  Output,
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
        open: directive._open(),
        disabled: directive._disabled(),
        openSignal: directive._open,
        disabledSignal: directive._disabled,
        toggle: directive.toggle.bind(directive),
        setOpen: directive.setOpen.bind(directive),
        panelId: directive.panelId,
      }),
      deps: [CollapsibleRootDirective],
    },
  ],
  host: {
    '[attr.data-open]': '_open() ? "" : null',
    '[attr.data-closed]': '!_open() ? "" : null',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[class.base-ui-collapsible]': 'true',
    '[class.base-ui-collapsible-open]': '_open()',
    '[class.base-ui-collapsible-closed]': '!_open()',
    '[class.base-ui-collapsible-disabled]': '_disabled()',
  },
})
export class CollapsibleRootDirective {
  /**
   * Unique ID for this collapsible (for aria-controls).
   */
  readonly panelId = `base-ui-collapsible-panel-${nextId++}`;

  /**
   * Internal signal for open state.
   */
  readonly _open = signal(false);

  /**
   * Whether the collapsible is open.
   */
  @Input()
  get open(): boolean {
    return this._open();
  }
  set open(value: boolean) {
    this._open.set(value);
  }

  /**
   * Event emitter for two-way binding of open state.
   */
  @Output() readonly openChange = new EventEmitter<boolean>();

  /**
   * Internal signal for disabled state.
   */
  readonly _disabled = signal(false);

  /**
   * Whether the collapsible is disabled.
   */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }

  /**
   * Event emitted when open state changes.
   */
  @Output() readonly openChanged = new EventEmitter<CollapsibleChangeEventDetails>();

  /**
   * Toggle the open state.
   */
  toggle(reason: 'trigger-press' | 'programmatic' = 'programmatic'): void {
    if (this._disabled()) return;
    this.setOpen(!this._open(), reason);
  }

  /**
   * Set the open state.
   */
  setOpen(open: boolean, reason: 'trigger-press' | 'programmatic' = 'programmatic'): void {
    if (this._disabled()) return;
    if (this._open() === open) return;

    this._open.set(open);
    this.openChange.emit(open);
    this.openChanged.emit({ open, reason });
  }
}

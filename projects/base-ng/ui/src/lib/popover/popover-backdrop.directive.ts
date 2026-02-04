/**
 * @fileoverview Angular port of Base UI PopoverBackdrop
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/backdrop/PopoverBackdrop.tsx
 *
 * An optional backdrop that covers the screen behind the popover.
 */

import { Directive, inject } from '@angular/core';
import { POPOVER_CONTEXT } from './popover.types';

/**
 * Backdrop directive for popovers.
 * Renders a backdrop that covers the screen behind the popover.
 * Typically used with modal popovers.
 *
 * @example
 * ```html
 * <div baseUiPopoverRoot [modal]="true">
 *   <button baseUiPopoverTrigger>Open</button>
 *   <div baseUiPopoverBackdrop></div>
 *   <div baseUiPopoverPositioner>
 *     <div baseUiPopoverPopup>Content</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverBackdrop]',
  standalone: true,
  exportAs: 'popoverBackdrop',
  host: {
    'aria-hidden': 'true',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[class.base-ui-popover-backdrop]': 'true',
    '[class.base-ui-popover-backdrop-open]': 'context.openSignal()',
    '[class.base-ui-popover-backdrop-closed]': '!context.openSignal()',
    '[style.display]': 'context.openSignal() ? null : "none"',
    '[style.position]': '"fixed"',
    '[style.inset]': '"0"',
    '(click)': 'handleClick($event)',
  },
})
export class PopoverBackdropDirective {
  protected readonly context = inject(POPOVER_CONTEXT);

  /**
   * Handle click on backdrop - closes the popover.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.context.modalSignal()) {
      this.context.closePopover('outside-press');
    }
  }
}

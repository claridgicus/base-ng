/**
 * @fileoverview Angular port of Base UI PopoverClose
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/close/PopoverClose.tsx
 *
 * A button that closes the popover.
 */

import { Directive, inject, input, booleanAttribute } from '@angular/core';
import { POPOVER_CONTEXT } from './popover.types';

/**
 * Close button directive for popovers.
 * Closes the popover when clicked.
 *
 * @example
 * ```html
 * <button baseUiPopoverClose>Close</button>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverClose]',
  standalone: true,
  exportAs: 'popoverClose',
  host: {
    type: 'button',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[class.base-ui-popover-close]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class PopoverCloseDirective {
  protected readonly context = inject(POPOVER_CONTEXT);

  /**
   * Whether the close button is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    this.context.closePopover('close-press');
  }
}

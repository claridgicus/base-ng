/**
 * @fileoverview Angular port of Base UI PopoverTitle
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/title/PopoverTitle.tsx
 *
 * A title that labels the popover.
 */

import { Directive, inject, OnInit, OnDestroy } from '@angular/core';
import { POPOVER_CONTEXT } from './popover.types';

let titleIdCounter = 0;

/**
 * Title directive for popovers.
 * Labels the popover for accessibility.
 *
 * @example
 * ```html
 * <h2 baseUiPopoverTitle>Popover Title</h2>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverTitle]',
  standalone: true,
  exportAs: 'popoverTitle',
  host: {
    '[id]': 'titleId',
    '[class.base-ui-popover-title]': 'true',
  },
})
export class PopoverTitleDirective implements OnInit, OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);

  /** Unique ID for the title */
  readonly titleId = `base-ui-popover-title-${titleIdCounter++}`;

  ngOnInit(): void {
    this.context.setTitleId(this.titleId);
  }

  ngOnDestroy(): void {
    this.context.setTitleId(null);
  }
}

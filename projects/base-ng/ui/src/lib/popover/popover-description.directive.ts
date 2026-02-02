/**
 * @fileoverview Angular port of Base UI PopoverDescription
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/description/PopoverDescription.tsx
 *
 * A description that describes the popover.
 */

import { Directive, inject, OnInit, OnDestroy } from '@angular/core';
import { POPOVER_CONTEXT } from './popover.types';

let descriptionIdCounter = 0;

/**
 * Description directive for popovers.
 * Provides additional context for accessibility.
 *
 * @example
 * ```html
 * <p baseUiPopoverDescription>Additional information about this popover.</p>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverDescription]',
  standalone: true,
  exportAs: 'popoverDescription',
  host: {
    '[id]': 'descriptionId',
    '[class.base-ui-popover-description]': 'true',
  },
})
export class PopoverDescriptionDirective implements OnInit, OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);

  /** Unique ID for the description */
  readonly descriptionId = `base-ui-popover-description-${descriptionIdCounter++}`;

  ngOnInit(): void {
    this.context.setDescriptionId(this.descriptionId);
  }

  ngOnDestroy(): void {
    this.context.setDescriptionId(null);
  }
}

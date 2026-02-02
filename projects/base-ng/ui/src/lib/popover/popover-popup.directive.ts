/**
 * @fileoverview Angular port of Base UI PopoverPopup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/popup/PopoverPopup.tsx
 *
 * A container for the popover contents.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { POPOVER_CONTEXT, POPOVER_POSITIONER_CONTEXT } from './popover.types';

/**
 * Popup directive for popovers.
 * Contains the popover content.
 *
 * @example
 * ```html
 * <div baseUiPopoverPopup>Popover content</div>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverPopup]',
  standalone: true,
  exportAs: 'popoverPopup',
  host: {
    role: 'dialog',
    '[id]': 'context.getPopupId()',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[class.base-ui-popover-popup]': 'true',
    '[class.base-ui-popover-popup-open]': 'context.openSignal()',
    '[class.base-ui-popover-popup-closed]': '!context.openSignal()',
  },
})
export class PopoverPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);
  protected readonly positionerContext = inject(POPOVER_POSITIONER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Computed aria-labelledby attribute.
   */
  readonly ariaLabelledBy = computed(() => {
    return this.context.titleIdSignal();
  });

  /**
   * Computed aria-describedby attribute.
   */
  readonly ariaDescribedBy = computed(() => {
    return this.context.descriptionIdSignal();
  });

  ngOnInit(): void {
    this.context.setPopupElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setPopupElement(null);
  }
}

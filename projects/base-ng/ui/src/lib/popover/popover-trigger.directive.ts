/**
 * @fileoverview Angular port of Base UI PopoverTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/trigger/PopoverTrigger.tsx
 *
 * A button that triggers the popover on click.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { POPOVER_CONTEXT } from './popover.types';

/**
 * Trigger directive for popovers.
 * Opens the popover on click.
 *
 * @example
 * ```html
 * <button baseUiPopoverTrigger>Open popover</button>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverTrigger]',
  standalone: true,
  exportAs: 'popoverTrigger',
  host: {
    type: 'button',
    '[id]': 'context.getTriggerId()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.openSignal()',
    '[attr.aria-controls]': 'context.openSignal() ? context.getPopupId() : null',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.disabled]': 'context.disabledSignal() ? "" : null',
    '[class.base-ui-popover-trigger]': 'true',
    '(click)': 'handleClick($event)',
  },
})
export class PopoverTriggerDirective implements OnInit, OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.context.setTriggerElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setTriggerElement(null);
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.context.disabledSignal()) {
      event.preventDefault();
      return;
    }

    this.context.togglePopover('trigger-press');
  }
}

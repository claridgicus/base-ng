/**
 * @fileoverview Angular port of Base UI DialogPopup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/dialog/popup/DialogPopup.tsx
 *
 * A container for the dialog contents.
 */

import {
  afterNextRender,
  computed,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.types';

/**
 * Popup directive for dialogs.
 * Contains the dialog content.
 *
 * @example
 * ```html
 * <div baseUiDialogPopup>Dialog content</div>
 * ```
 */
@Directive({
  selector: '[baseUiDialogPopup]',
  standalone: true,
  exportAs: 'dialogPopup',
  host: {
    role: 'dialog',
    '[id]': 'context.getPopupId()',
    '[attr.aria-modal]': 'context.modalSignal()',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[hidden]': '!context.openSignal()',
    '[class.base-ui-dialog-popup]': 'true',
    '[class.base-ui-dialog-popup-open]': 'context.openSignal()',
    '[class.base-ui-dialog-popup-closed]': '!context.openSignal()',
  },
})
export class DialogPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(DIALOG_CONTEXT);
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

  constructor() {
    // Focus the dialog when it opens
    afterNextRender(() => {
      if (this.context.openSignal()) {
        this.focusDialog();
      }
    });
  }

  /**
   * Focus the dialog element.
   */
  private focusDialog(): void {
    const element = this.elementRef.nativeElement;
    // Try to focus first focusable element, or the dialog itself
    const focusable = element.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement | null;
    if (focusable) {
      focusable.focus();
    } else {
      element.setAttribute('tabindex', '-1');
      element.focus();
    }
  }
}

/**
 * @fileoverview Angular port of Base UI AlertDialogPopup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/index.parts.ts
 *
 * A container for the alert dialog contents.
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
import { ALERT_DIALOG_CONTEXT } from './alert-dialog.types';

/**
 * Popup directive for alert dialogs.
 * Contains the alert dialog content.
 * Uses role="alertdialog" for proper ARIA semantics.
 *
 * @example
 * ```html
 * <div baseUiAlertDialogPopup>Alert dialog content</div>
 * ```
 */
@Directive({
  selector: '[baseUiAlertDialogPopup]',
  standalone: true,
  exportAs: 'alertDialogPopup',
  host: {
    role: 'alertdialog',
    '[id]': 'context.getPopupId()',
    '[attr.aria-modal]': '"true"',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[hidden]': '!context.openSignal()',
    '[class.base-ui-alert-dialog-popup]': 'true',
    '[class.base-ui-alert-dialog-popup-open]': 'context.openSignal()',
    '[class.base-ui-alert-dialog-popup-closed]': '!context.openSignal()',
  },
})
export class AlertDialogPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);
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

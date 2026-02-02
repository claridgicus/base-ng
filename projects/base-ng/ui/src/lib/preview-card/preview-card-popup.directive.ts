/**
 * @fileoverview Angular port of Base UI PreviewCardPopup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/popup/PreviewCardPopup.tsx
 *
 * A container for the preview card contents.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PREVIEW_CARD_CONTEXT, PREVIEW_CARD_POSITIONER_CONTEXT } from './preview-card.types';

/**
 * Popup directive for preview cards.
 * Contains the preview card content.
 *
 * @example
 * ```html
 * <div baseUiPreviewCardPopup>Preview content</div>
 * ```
 */
@Directive({
  selector: '[baseUiPreviewCardPopup]',
  standalone: true,
  exportAs: 'previewCardPopup',
  host: {
    '[id]': 'context.getPopupId()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[class.base-ui-preview-card-popup]': 'true',
    '[class.base-ui-preview-card-popup-open]': 'context.openSignal()',
    '[class.base-ui-preview-card-popup-closed]': '!context.openSignal()',
  },
})
export class PreviewCardPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(PREVIEW_CARD_CONTEXT);
  protected readonly positionerContext = inject(PREVIEW_CARD_POSITIONER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.context.setPopupElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setPopupElement(null);
  }
}

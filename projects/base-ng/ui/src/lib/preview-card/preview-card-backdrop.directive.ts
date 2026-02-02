/**
 * @fileoverview Angular port of Base UI PreviewCardBackdrop
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/backdrop/PreviewCardBackdrop.tsx
 *
 * An overlay element beneath the popup.
 */

import { Directive, inject } from '@angular/core';
import { PREVIEW_CARD_CONTEXT } from './preview-card.types';

/**
 * Backdrop directive for preview cards.
 * Renders an overlay behind the preview card.
 *
 * @example
 * ```html
 * <div baseUiPreviewCardBackdrop></div>
 * ```
 */
@Directive({
  selector: '[baseUiPreviewCardBackdrop]',
  standalone: true,
  exportAs: 'previewCardBackdrop',
  host: {
    role: 'presentation',
    '[hidden]': '!context.openSignal()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[class.base-ui-preview-card-backdrop]': 'true',
    '[style.pointerEvents]': '"none"',
    '[style.userSelect]': '"none"',
  },
})
export class PreviewCardBackdropDirective {
  protected readonly context = inject(PREVIEW_CARD_CONTEXT);
}

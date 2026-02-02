/**
 * @fileoverview Angular port of Base UI PreviewCardArrow
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/arrow/PreviewCardArrow.tsx
 *
 * A visual arrow pointing toward the anchor element.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { FloatingService } from '../floating-ui';
import { PREVIEW_CARD_CONTEXT, PREVIEW_CARD_POSITIONER_CONTEXT } from './preview-card.types';

/**
 * Arrow directive for preview cards.
 * Renders an arrow pointing toward the trigger element.
 *
 * @example
 * ```html
 * <div baseUiPreviewCardArrow></div>
 * ```
 */
@Directive({
  selector: '[baseUiPreviewCardArrow]',
  standalone: true,
  exportAs: 'previewCardArrow',
  host: {
    'aria-hidden': 'true',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[attr.data-uncentered]': 'positionerContext.arrowUncentered ? "" : null',
    '[class.base-ui-preview-card-arrow]': 'true',
    '[style.position]': '"absolute"',
    '[style.top]': 'arrowTop()',
    '[style.left]': 'arrowLeft()',
    '[style.right]': 'arrowRight()',
    '[style.bottom]': 'arrowBottom()',
  },
})
export class PreviewCardArrowDirective implements OnInit {
  protected readonly context = inject(PREVIEW_CARD_CONTEXT);
  protected readonly positionerContext = inject(PREVIEW_CARD_POSITIONER_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Arrow top style */
  readonly arrowTop = computed(() => {
    return this.positionerContext.arrowStyles?.top ?? null;
  });

  /** Arrow left style */
  readonly arrowLeft = computed(() => {
    return this.positionerContext.arrowStyles?.left ?? null;
  });

  /** Arrow right style */
  readonly arrowRight = computed(() => {
    return this.positionerContext.arrowStyles?.right ?? null;
  });

  /** Arrow bottom style */
  readonly arrowBottom = computed(() => {
    return this.positionerContext.arrowStyles?.bottom ?? null;
  });

  ngOnInit(): void {
    this.floatingService.setArrow(this.elementRef.nativeElement);
  }
}

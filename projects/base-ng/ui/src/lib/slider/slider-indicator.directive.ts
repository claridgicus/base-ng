/**
 * @fileoverview Angular port of Base UI SliderIndicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/slider/indicator/SliderIndicator.tsx
 *
 * Visualizes the current value of the slider.
 */

import {
  computed,
  Directive,
  inject,
  type Signal,
} from '@angular/core';
import { SLIDER_CONTEXT } from './slider.types';

/**
 * Indicator directive for slider component.
 * Shows the filled portion of the slider track.
 *
 * @example
 * ```html
 * <div baseUiSliderRoot [(value)]="volume">
 *   <div baseUiSliderTrack>
 *     <div baseUiSliderIndicator></div>
 *   </div>
 *   <div baseUiSliderThumb></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSliderIndicator]',
  standalone: true,
  exportAs: 'sliderIndicator',
  host: {
    '[attr.data-disabled]': 'context.disabledSignal() ? "" : null',
    '[attr.data-dragging]': 'context.draggingSignal() ? "" : null',
    '[attr.data-orientation]': 'context.orientationSignal()',
    '[class.base-ui-slider-indicator]': 'true',
    '[style.position]': '"absolute"',
    '[style.left]': 'leftStyle()',
    '[style.right]': 'rightStyle()',
    '[style.bottom]': 'bottomStyle()',
    '[style.top]': 'topStyle()',
    '[style.width]': 'widthStyle()',
    '[style.height]': 'heightStyle()',
  },
})
export class SliderIndicatorDirective {
  protected readonly context = inject(SLIDER_CONTEXT);

  /**
   * Calculate the start and end percentages.
   */
  private readonly range: Signal<{ start: number; end: number }> = computed(() => {
    const values = this.context.valuesSignal();
    if (values.length === 0) {
      return { start: 0, end: 0 };
    }
    if (values.length === 1) {
      // Single value: from 0 to value
      return { start: 0, end: this.context.getPercentage(values[0]) };
    }
    // Range: from first to last value
    return {
      start: this.context.getPercentage(values[0]),
      end: this.context.getPercentage(values[values.length - 1]),
    };
  });

  /**
   * Left position for horizontal slider.
   */
  readonly leftStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'horizontal') return null;
    return this.range().start + '%';
  });

  /**
   * Right position for horizontal slider.
   */
  readonly rightStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'horizontal') return null;
    return (100 - this.range().end) + '%';
  });

  /**
   * Bottom position for vertical slider.
   */
  readonly bottomStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'vertical') return null;
    return this.range().start + '%';
  });

  /**
   * Top position for vertical slider.
   */
  readonly topStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'vertical') return null;
    return (100 - this.range().end) + '%';
  });

  /**
   * Width for horizontal slider (auto).
   */
  readonly widthStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'horizontal') return null;
    return null; // Let left/right handle it
  });

  /**
   * Height for vertical slider (auto).
   */
  readonly heightStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'vertical') return null;
    return null; // Let top/bottom handle it
  });
}

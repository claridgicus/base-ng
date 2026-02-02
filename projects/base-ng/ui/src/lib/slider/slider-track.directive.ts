/**
 * @fileoverview Angular port of Base UI SliderTrack
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/slider/track/SliderTrack.tsx
 *
 * Contains the slider indicator and represents the entire range.
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { SLIDER_CONTEXT } from './slider.types';

/**
 * Track directive for slider component.
 * Provides the track area for pointer interactions.
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
  selector: '[baseUiSliderTrack]',
  standalone: true,
  exportAs: 'sliderTrack',
  host: {
    '[attr.data-disabled]': 'context.disabledSignal() ? "" : null',
    '[attr.data-dragging]': 'context.draggingSignal() ? "" : null',
    '[attr.data-orientation]': 'context.orientationSignal()',
    '[class.base-ui-slider-track]': 'true',
    '[style.position]': '"relative"',
    '(pointerdown)': 'handlePointerDown($event)',
  },
})
export class SliderTrackDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly context = inject(SLIDER_CONTEXT);

  ngAfterViewInit(): void {
    this.context.setTrackRef(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setTrackRef(null);
  }

  /**
   * Handle pointer down on track to jump to position.
   */
  protected handlePointerDown(event: PointerEvent): void {
    if (this.context.disabledSignal()) return;
    if (event.button !== 0) return; // Only left click

    event.preventDefault();

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const isHorizontal = this.context.orientationSignal() === 'horizontal';

    // Calculate percentage based on click position
    let percent: number;
    if (isHorizontal) {
      percent = ((event.clientX - rect.left) / rect.width) * 100;
    } else {
      // Vertical slider: top is max, bottom is min
      percent = ((rect.bottom - event.clientY) / rect.height) * 100;
    }

    // Clamp to 0-100
    percent = Math.max(0, Math.min(100, percent));

    // Get the value for this percentage
    const newValue = this.context.getValue(percent);

    // Find closest thumb for range sliders
    const values = this.context.valuesSignal();
    let closestIndex = 0;
    if (values.length > 1) {
      let minDist = Math.abs(values[0] - newValue);
      for (let i = 1; i < values.length; i++) {
        const dist = Math.abs(values[i] - newValue);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = i;
        }
      }
    }

    this.context.setActiveThumbIndex(closestIndex);
    this.context.setValue(newValue, closestIndex);
    this.context.setDragging(true);

    // Set up drag handling
    const handleMove = (e: PointerEvent) => {
      let movePercent: number;
      if (isHorizontal) {
        movePercent = ((e.clientX - rect.left) / rect.width) * 100;
      } else {
        movePercent = ((rect.bottom - e.clientY) / rect.height) * 100;
      }
      movePercent = Math.max(0, Math.min(100, movePercent));
      const moveValue = this.context.getValue(movePercent);
      this.context.setValue(moveValue, closestIndex);
    };

    const handleUp = () => {
      this.context.setDragging(false);
      this.context.commitValue();
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
  }
}

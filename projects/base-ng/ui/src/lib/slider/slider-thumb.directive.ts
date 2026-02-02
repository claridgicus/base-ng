/**
 * @fileoverview Angular port of Base UI SliderThumb
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/slider/thumb/SliderThumb.tsx
 *
 * A draggable thumb for the slider.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  type Signal,
} from '@angular/core';
import { SLIDER_CONTEXT } from './slider.types';

/**
 * Thumb directive for slider component.
 * The draggable element that represents the current value.
 *
 * @example
 * ```html
 * <div baseUiSliderRoot [(value)]="volume">
 *   <div baseUiSliderTrack>
 *     <div baseUiSliderIndicator></div>
 *   </div>
 *   <div baseUiSliderThumb tabindex="0"></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSliderThumb]',
  standalone: true,
  exportAs: 'sliderThumb',
  host: {
    '[attr.role]': '"slider"',
    '[attr.aria-valuemin]': 'context.minSignal()',
    '[attr.aria-valuemax]': 'context.maxSignal()',
    '[attr.aria-valuenow]': 'currentValue()',
    '[attr.aria-disabled]': 'context.disabledSignal() ? "true" : null',
    '[attr.aria-orientation]': 'context.orientationSignal()',
    '[attr.data-disabled]': 'context.disabledSignal() ? "" : null',
    '[attr.data-dragging]': 'isDragging() ? "" : null',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.data-orientation]': 'context.orientationSignal()',
    '[attr.tabindex]': 'context.disabledSignal() ? -1 : 0',
    '[class.base-ui-slider-thumb]': 'true',
    '[class.base-ui-slider-thumb-dragging]': 'isDragging()',
    '[class.base-ui-slider-thumb-active]': 'isActive()',
    '[style.position]': '"absolute"',
    '[style.left]': 'leftStyle()',
    '[style.bottom]': 'bottomStyle()',
    '[style.transform]': 'transformStyle()',
    '(pointerdown)': 'handlePointerDown($event)',
    '(keydown)': 'handleKeyDown($event)',
    '(focus)': 'handleFocus()',
  },
})
export class SliderThumbDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly context = inject(SLIDER_CONTEXT);

  /**
   * Index of this thumb in a multi-thumb slider.
   */
  readonly index = input(0, { transform: numberAttribute });

  /**
   * Current value for this thumb.
   */
  readonly currentValue: Signal<number> = computed(() => {
    const values = this.context.valuesSignal();
    const idx = this.index();
    return values[idx] ?? 0;
  });

  /**
   * Percentage position for this thumb.
   */
  readonly percentage: Signal<number> = computed(() => {
    return this.context.getPercentage(this.currentValue());
  });

  /**
   * Whether this thumb is currently active.
   */
  readonly isActive: Signal<boolean> = computed(() => {
    return this.context.activeThumbIndexSignal() === this.index();
  });

  /**
   * Whether this thumb is being dragged.
   */
  readonly isDragging: Signal<boolean> = computed(() => {
    return this.context.draggingSignal() && this.isActive();
  });

  /**
   * Left position for horizontal slider.
   */
  readonly leftStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'horizontal') return null;
    return this.percentage() + '%';
  });

  /**
   * Bottom position for vertical slider.
   */
  readonly bottomStyle: Signal<string | null> = computed(() => {
    if (this.context.orientationSignal() !== 'vertical') return null;
    return this.percentage() + '%';
  });

  /**
   * Transform to center the thumb.
   */
  readonly transformStyle: Signal<string> = computed(() => {
    const isHorizontal = this.context.orientationSignal() === 'horizontal';
    return isHorizontal ? 'translateX(-50%)' : 'translateY(50%)';
  });

  /**
   * Handle pointer down for dragging.
   */
  protected handlePointerDown(event: PointerEvent): void {
    if (this.context.disabledSignal()) return;
    if (event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();

    this.context.setActiveThumbIndex(this.index());
    this.context.setDragging(true);
    this.elementRef.nativeElement.focus();

    const trackRef = this.context.trackRef;
    if (!trackRef) return;

    const rect = trackRef.getBoundingClientRect();
    const isHorizontal = this.context.orientationSignal() === 'horizontal';

    const handleMove = (e: PointerEvent) => {
      let percent: number;
      if (isHorizontal) {
        percent = ((e.clientX - rect.left) / rect.width) * 100;
      } else {
        percent = ((rect.bottom - e.clientY) / rect.height) * 100;
      }
      percent = Math.max(0, Math.min(100, percent));
      const newValue = this.context.getValue(percent);
      this.context.setValue(newValue, this.index());
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

  /**
   * Handle keyboard navigation.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.context.disabledSignal()) return;

    const step = this.context.stepSignal();
    const largeStep = this.context.largeStepSignal();
    const min = this.context.minSignal();
    const max = this.context.maxSignal();
    const currentValue = this.currentValue();
    const isHorizontal = this.context.orientationSignal() === 'horizontal';

    let newValue: number | null = null;
    const increment = event.shiftKey ? largeStep : step;

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          newValue = currentValue + increment;
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          newValue = currentValue - increment;
        }
        break;
      case 'ArrowUp':
        newValue = currentValue + increment;
        break;
      case 'ArrowDown':
        newValue = currentValue - increment;
        break;
      case 'PageUp':
        newValue = currentValue + largeStep;
        break;
      case 'PageDown':
        newValue = currentValue - largeStep;
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    if (newValue !== null) {
      event.preventDefault();
      this.context.setValue(newValue, this.index());
      this.context.commitValue();
    }
  }

  /**
   * Handle focus to set active thumb.
   */
  protected handleFocus(): void {
    this.context.setActiveThumbIndex(this.index());
  }
}

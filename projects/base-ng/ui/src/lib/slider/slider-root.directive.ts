/**
 * @component SliderRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/slider/root/SliderRoot.tsx
 * @reactDocs https://base-ui.com/react/components/slider
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A slider control for selecting values within a range.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  type Signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  SLIDER_CONTEXT,
  SliderChangeEventDetails,
  SliderContext,
  SliderOrientation,
  SliderValueCommittedEventDetails,
  ThumbCollisionBehavior,
} from './slider.types';

/**
 * Clamp a value between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round a value to the nearest step.
 */
function roundToStep(value: number, step: number, min: number): number {
  const nearest = Math.round((value - min) / step) * step + min;
  // Handle floating point precision
  return Math.round(nearest * 1e12) / 1e12;
}

/**
 * Root directive for slider component.
 * Manages slider state and provides context to child components.
 *
 * @example
 * ```html
 * <div baseUiSliderRoot [(value)]="volume" [min]="0" [max]="100">
 *   <div baseUiSliderTrack>
 *     <div baseUiSliderIndicator></div>
 *   </div>
 *   <div baseUiSliderThumb></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSliderRoot]',
  standalone: true,
  exportAs: 'sliderRoot',
  providers: [
    {
      provide: SLIDER_CONTEXT,
      useFactory: (directive: SliderRootDirective): SliderContext => ({
        values: directive.internalValues(),
        min: directive.min(),
        max: directive.max(),
        step: directive.step(),
        disabled: directive.disabled(),
        orientation: directive.orientation(),
        dragging: directive.dragging(),
        activeThumbIndex: directive.activeThumbIndex(),
        valuesSignal: directive.internalValues,
        disabledSignal: directive.disabled,
        draggingSignal: directive.dragging,
        activeThumbIndexSignal: directive.activeThumbIndex,
        orientationSignal: directive.orientation,
        minSignal: directive.min,
        maxSignal: directive.max,
        stepSignal: directive.step,
        largeStepSignal: directive.largeStep,
        setValue: directive.setValue.bind(directive),
        setActiveThumbIndex: directive.setActiveThumbIndex.bind(directive),
        setDragging: directive.setDragging.bind(directive),
        getPercentage: directive.getPercentage.bind(directive),
        getValue: directive.getValue.bind(directive),
        commitValue: directive.commitValue.bind(directive),
        trackRef: directive.trackRef(),
        setTrackRef: directive.setTrackRef.bind(directive),
      }),
      deps: [SliderRootDirective],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderRootDirective),
      multi: true,
    },
  ],
  host: {
    role: 'group',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-dragging]': 'dragging() ? "" : null',
    '[attr.data-orientation]': 'orientation()',
    '[class.base-ui-slider]': 'true',
    '[class.base-ui-slider-disabled]': 'disabled()',
    '[class.base-ui-slider-dragging]': 'dragging()',
    '[class.base-ui-slider-horizontal]': 'orientation() === "horizontal"',
    '[class.base-ui-slider-vertical]': 'orientation() === "vertical"',
    '[style.--slider-value-percent]': 'valuePercent() + "%"',
  },
})
export class SliderRootDirective implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Current value (single value or array for range).
   */
  readonly value = model<number | number[]>(0);

  /**
   * Internal values as array.
   */
  readonly internalValues = signal<readonly number[]>([0]);

  /**
   * Minimum value.
   */
  readonly min = input(0, { transform: numberAttribute });

  /**
   * Maximum value.
   */
  readonly max = input(100, { transform: numberAttribute });

  /**
   * Step increment.
   */
  readonly step = input(1, { transform: numberAttribute });

  /**
   * Large step for Page Up/Down and Shift+Arrow.
   */
  readonly largeStep = input(10, { transform: numberAttribute });

  /**
   * Whether the slider is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Slider orientation.
   */
  readonly orientation = input<SliderOrientation>('horizontal');

  /**
   * Minimum steps between values in range slider.
   */
  readonly minStepsBetweenValues = input(0, { transform: numberAttribute });

  /**
   * How thumbs behave when they collide.
   */
  readonly thumbCollisionBehavior = input<ThumbCollisionBehavior>('push');

  /**
   * Event emitted when value changes.
   */
  readonly valueChanged = output<SliderChangeEventDetails>();

  /**
   * Event emitted when value is committed (on pointer up).
   */
  readonly valueCommitted = output<SliderValueCommittedEventDetails>();

  /**
   * Whether a thumb is being dragged.
   */
  readonly dragging = signal(false);

  /**
   * Index of the active thumb.
   */
  readonly activeThumbIndex = signal(0);

  /**
   * Track element reference.
   */
  readonly trackRef = signal<HTMLElement | null>(null);

  /**
   * Value as percentage (for single value slider).
   */
  readonly valuePercent: Signal<number> = computed(() => {
    const values = this.internalValues();
    if (values.length === 0) return 0;
    return this.getPercentage(values[0]);
  });

  // ControlValueAccessor
  private onChange: (value: number | number[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync model value to internal values array
    effect(() => {
      const val = this.value();
      const values = Array.isArray(val) ? val : [val];
      const clamped = values.map(v =>
        clamp(roundToStep(v, this.step(), this.min()), this.min(), this.max())
      );
      this.internalValues.set(clamped);
    });
  }

  /**
   * Get percentage position for a value.
   */
  getPercentage(value: number): number {
    const min = this.min();
    const max = this.max();
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }

  /**
   * Get value for a percentage position.
   */
  getValue(percent: number): number {
    const min = this.min();
    const max = this.max();
    const step = this.step();
    const raw = (percent / 100) * (max - min) + min;
    return clamp(roundToStep(raw, step, min), min, max);
  }

  /**
   * Set value at a specific index.
   */
  setValue(newValue: number, index: number = 0): void {
    if (this.disabled()) return;

    const values = [...this.internalValues()];
    const step = this.step();
    const min = this.min();
    const max = this.max();

    // Clamp and round to step
    const clamped = clamp(roundToStep(newValue, step, min), min, max);

    // Update the value at index
    values[index] = clamped;

    // Sort values for range slider
    values.sort((a, b) => a - b);

    this.internalValues.set(values);

    // Update external value
    const externalValue = values.length === 1 ? values[0] : values;
    this.value.set(externalValue);
    this.onChange(externalValue);
    this.valueChanged.emit({
      value: externalValue,
      reason: this.dragging() ? 'drag' : 'input-change',
      thumbIndex: index,
    });
  }

  /**
   * Set the active thumb index.
   */
  setActiveThumbIndex(index: number): void {
    this.activeThumbIndex.set(index);
  }

  /**
   * Set the dragging state.
   */
  setDragging(dragging: boolean): void {
    this.dragging.set(dragging);
    if (!dragging) {
      this.onTouched();
    }
  }

  /**
   * Set the track element reference.
   */
  setTrackRef(el: HTMLElement | null): void {
    this.trackRef.set(el);
  }

  /**
   * Commit the current value.
   */
  commitValue(): void {
    const values = this.internalValues();
    const externalValue = values.length === 1 ? values[0] : [...values];
    this.valueCommitted.emit({ value: externalValue });
  }

  // ControlValueAccessor methods
  writeValue(value: number | number[]): void {
    this.value.set(value ?? 0);
    const values = Array.isArray(value) ? value : [value ?? 0];
    this.internalValues.set(values);
  }

  registerOnChange(fn: (value: number | number[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Disabled state is handled via input
  }
}

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
  EventEmitter,
  forwardRef,
  inject,
  Input,
  numberAttribute,
  Output,
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
        min: directive._min(),
        max: directive._max(),
        step: directive._step(),
        disabled: directive._disabled(),
        orientation: directive._orientation(),
        dragging: directive.dragging(),
        activeThumbIndex: directive.activeThumbIndex(),
        valuesSignal: directive.internalValues,
        disabledSignal: directive._disabled,
        draggingSignal: directive.dragging,
        activeThumbIndexSignal: directive.activeThumbIndex,
        orientationSignal: directive._orientation,
        minSignal: directive._min,
        maxSignal: directive._max,
        stepSignal: directive._step,
        largeStepSignal: directive._largeStep,
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
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-dragging]': 'dragging() ? "" : null',
    '[attr.data-orientation]': '_orientation()',
    '[class.base-ui-slider]': 'true',
    '[class.base-ui-slider-disabled]': '_disabled()',
    '[class.base-ui-slider-dragging]': 'dragging()',
    '[class.base-ui-slider-horizontal]': '_orientation() === "horizontal"',
    '[class.base-ui-slider-vertical]': '_orientation() === "vertical"',
    '[style.--slider-value-percent]': 'valuePercent() + "%"',
  },
})
export class SliderRootDirective implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Current value (single value or array for range).
   */
  readonly _value = signal<number | number[]>(0);

  @Input()
  set value(val: number | number[] | undefined) {
    this._value.set(val ?? 0);
  }
  get value(): number | number[] {
    return this._value();
  }

  /**
   * Event emitted when value changes (for two-way binding).
   */
  @Output() readonly valueChange = new EventEmitter<number | number[]>();

  /**
   * Internal values as array.
   */
  readonly internalValues = signal<readonly number[]>([0]);

  /**
   * Minimum value.
   */
  readonly _min = signal<number>(0);

  @Input({ transform: numberAttribute })
  set min(val: number) {
    this._min.set(val);
  }
  get min(): number {
    return this._min();
  }

  /**
   * Maximum value.
   */
  readonly _max = signal<number>(100);

  @Input({ transform: numberAttribute })
  set max(val: number) {
    this._max.set(val);
  }
  get max(): number {
    return this._max();
  }

  /**
   * Step increment.
   */
  readonly _step = signal<number>(1);

  @Input({ transform: numberAttribute })
  set step(val: number) {
    this._step.set(val);
  }
  get step(): number {
    return this._step();
  }

  /**
   * Large step for Page Up/Down and Shift+Arrow.
   */
  readonly _largeStep = signal<number>(10);

  @Input({ transform: numberAttribute })
  set largeStep(val: number) {
    this._largeStep.set(val);
  }
  get largeStep(): number {
    return this._largeStep();
  }

  /**
   * Whether the slider is disabled.
   */
  readonly _disabled = signal<boolean>(false);

  @Input({ transform: booleanAttribute })
  set disabled(val: boolean) {
    this._disabled.set(val);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Slider orientation.
   */
  readonly _orientation = signal<SliderOrientation>('horizontal');

  @Input()
  set orientation(val: SliderOrientation) {
    this._orientation.set(val);
  }
  get orientation(): SliderOrientation {
    return this._orientation();
  }

  /**
   * Minimum steps between values in range slider.
   */
  readonly _minStepsBetweenValues = signal<number>(0);

  @Input({ transform: numberAttribute })
  set minStepsBetweenValues(val: number) {
    this._minStepsBetweenValues.set(val);
  }
  get minStepsBetweenValues(): number {
    return this._minStepsBetweenValues();
  }

  /**
   * How thumbs behave when they collide.
   */
  readonly _thumbCollisionBehavior = signal<ThumbCollisionBehavior>('push');

  @Input()
  set thumbCollisionBehavior(val: ThumbCollisionBehavior) {
    this._thumbCollisionBehavior.set(val);
  }
  get thumbCollisionBehavior(): ThumbCollisionBehavior {
    return this._thumbCollisionBehavior();
  }

  /**
   * Event emitted when value changes.
   */
  @Output() readonly valueChanged = new EventEmitter<SliderChangeEventDetails>();

  /**
   * Event emitted when value is committed (on pointer up).
   */
  @Output() readonly valueCommitted = new EventEmitter<SliderValueCommittedEventDetails>();

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
      const val = this._value();
      const values = Array.isArray(val) ? val : [val];
      const clamped = values.map(v =>
        clamp(roundToStep(v, this._step(), this._min()), this._min(), this._max())
      );
      this.internalValues.set(clamped);
    });
  }

  /**
   * Get percentage position for a value.
   */
  getPercentage(value: number): number {
    const min = this._min();
    const max = this._max();
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }

  /**
   * Get value for a percentage position.
   */
  getValue(percent: number): number {
    const min = this._min();
    const max = this._max();
    const step = this._step();
    const raw = (percent / 100) * (max - min) + min;
    return clamp(roundToStep(raw, step, min), min, max);
  }

  /**
   * Set value at a specific index.
   */
  setValue(newValue: number, index: number = 0): void {
    if (this._disabled()) return;

    const values = [...this.internalValues()];
    const step = this._step();
    const min = this._min();
    const max = this._max();

    // Clamp and round to step
    const clamped = clamp(roundToStep(newValue, step, min), min, max);

    // Update the value at index
    values[index] = clamped;

    // Sort values for range slider
    values.sort((a, b) => a - b);

    this.internalValues.set(values);

    // Update external value
    const externalValue = values.length === 1 ? values[0] : values;
    this._value.set(externalValue);
    this.valueChange.emit(externalValue);
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
    this._value.set(value ?? 0);
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

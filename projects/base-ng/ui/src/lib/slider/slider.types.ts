/**
 * @fileoverview Angular port of Base UI Slider types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/slider/root/SliderRootContext.ts
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Slider orientation type.
 */
export type SliderOrientation = 'horizontal' | 'vertical';

/**
 * Thumb collision behavior for range sliders.
 */
export type ThumbCollisionBehavior = 'push' | 'swap' | 'none';

/**
 * Reason for value change.
 */
export type SliderChangeReason =
  | 'input-change'
  | 'track-press'
  | 'drag'
  | 'keyboard'
  | 'none';

/**
 * Slider state.
 */
export interface SliderState {
  /**
   * Current value(s) of the slider.
   */
  values: readonly number[];

  /**
   * Minimum value.
   */
  min: number;

  /**
   * Maximum value.
   */
  max: number;

  /**
   * Step increment.
   */
  step: number;

  /**
   * Whether the slider is disabled.
   */
  disabled: boolean;

  /**
   * Slider orientation.
   */
  orientation: SliderOrientation;

  /**
   * Whether a thumb is currently being dragged.
   */
  dragging: boolean;

  /**
   * Index of the currently active thumb.
   */
  activeThumbIndex: number;
}

/**
 * Slider context for communication between root and parts.
 */
export interface SliderContext extends SliderState {
  /**
   * Signals for reactive state.
   */
  valuesSignal: Signal<readonly number[]>;
  disabledSignal: Signal<boolean>;
  draggingSignal: Signal<boolean>;
  activeThumbIndexSignal: Signal<number>;
  orientationSignal: Signal<SliderOrientation>;
  minSignal: Signal<number>;
  maxSignal: Signal<number>;
  stepSignal: Signal<number>;
  largeStepSignal: Signal<number>;

  /**
   * Set the value at a specific index.
   */
  setValue: (value: number, index?: number) => void;

  /**
   * Set the active thumb index.
   */
  setActiveThumbIndex: (index: number) => void;

  /**
   * Set the dragging state.
   */
  setDragging: (dragging: boolean) => void;

  /**
   * Get the percentage position for a value.
   */
  getPercentage: (value: number) => number;

  /**
   * Get the value for a percentage position.
   */
  getValue: (percent: number) => number;

  /**
   * Commit the current value (called on pointer up).
   */
  commitValue: () => void;

  /**
   * Track element reference for pointer calculations.
   */
  trackRef: HTMLElement | null;
  setTrackRef: (el: HTMLElement | null) => void;
}

/**
 * Slider change event details.
 */
export interface SliderChangeEventDetails {
  /**
   * The new value(s).
   */
  value: number | number[];

  /**
   * The reason for the change.
   */
  reason: SliderChangeReason;

  /**
   * The index of the thumb that changed (for range sliders).
   */
  thumbIndex?: number;
}

/**
 * Slider value committed event details.
 */
export interface SliderValueCommittedEventDetails {
  /**
   * The committed value(s).
   */
  value: number | number[];
}

/**
 * Injection token for slider context.
 */
export const SLIDER_CONTEXT = new InjectionToken<SliderContext>(
  'SLIDER_CONTEXT'
);

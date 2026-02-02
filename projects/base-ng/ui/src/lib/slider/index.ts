/**
 * @fileoverview Public API for slider component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/slider/index.ts
 */

export { SliderRootDirective } from './slider-root.directive';
export { SliderTrackDirective } from './slider-track.directive';
export { SliderIndicatorDirective } from './slider-indicator.directive';
export { SliderThumbDirective } from './slider-thumb.directive';
export {
  SLIDER_CONTEXT,
  type SliderContext,
  type SliderState,
  type SliderOrientation,
  type SliderChangeEventDetails,
  type SliderValueCommittedEventDetails,
  type SliderChangeReason,
  type ThumbCollisionBehavior,
} from './slider.types';

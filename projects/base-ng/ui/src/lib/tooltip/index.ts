/**
 * @fileoverview Public API for tooltip component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tooltip/index.ts
 */

export { TooltipRootDirective } from './tooltip-root.directive';
export { TooltipTriggerDirective } from './tooltip-trigger.directive';
export { TooltipPositionerDirective } from './tooltip-positioner.directive';
export { TooltipPopupDirective } from './tooltip-popup.directive';
export { TooltipArrowDirective } from './tooltip-arrow.directive';
export {
  TOOLTIP_CONTEXT,
  TOOLTIP_POSITIONER_CONTEXT,
  type TooltipContext,
  type TooltipPositionerContext,
  type TooltipState,
  type TooltipPopupState,
  type TooltipArrowState,
  type TooltipOpenChangeReason,
  type TooltipOpenChangeEventDetails,
} from './tooltip.types';

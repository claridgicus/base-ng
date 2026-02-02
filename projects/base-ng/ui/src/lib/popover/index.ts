/**
 * @fileoverview Public API for popover module
 */

export { PopoverRootDirective } from './popover-root.directive';
export { PopoverTriggerDirective } from './popover-trigger.directive';
export { PopoverPositionerDirective } from './popover-positioner.directive';
export { PopoverPopupDirective } from './popover-popup.directive';
export { PopoverArrowDirective } from './popover-arrow.directive';
export { PopoverCloseDirective } from './popover-close.directive';
export { PopoverTitleDirective } from './popover-title.directive';
export { PopoverDescriptionDirective } from './popover-description.directive';
export {
  POPOVER_CONTEXT,
  POPOVER_POSITIONER_CONTEXT,
  type PopoverContext,
  type PopoverPositionerContext,
  type PopoverState,
  type PopoverOpenChangeReason,
  type PopoverOpenChangeEventDetails,
  type PopoverPopupState,
  type PopoverArrowState,
} from './popover.types';

/**
 * @fileoverview Public API for dialog module
 */

export { DialogRootDirective } from './dialog-root.directive';
export { DialogTriggerDirective } from './dialog-trigger.directive';
export { DialogBackdropDirective } from './dialog-backdrop.directive';
export { DialogPopupDirective } from './dialog-popup.directive';
export { DialogCloseDirective } from './dialog-close.directive';
export { DialogTitleDirective } from './dialog-title.directive';
export { DialogDescriptionDirective } from './dialog-description.directive';
export {
  DIALOG_CONTEXT,
  type DialogContext,
  type DialogState,
  type DialogOpenChangeReason,
  type DialogOpenChangeEventDetails,
  type DialogPopupState,
  type DialogBackdropState,
} from './dialog.types';

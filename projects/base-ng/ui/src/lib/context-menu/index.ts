/**
 * @fileoverview Public API for context-menu module
 */

export { ContextMenuRootDirective } from './context-menu-root.directive';
export { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
export {
  ContextMenuPositionerDirective,
  type ContextMenuSide,
  type ContextMenuAlign,
} from './context-menu-positioner.directive';
export { ContextMenuPopupDirective } from './context-menu-popup.directive';
export { ContextMenuItemDirective } from './context-menu-item.directive';
export { ContextMenuSeparatorDirective } from './context-menu-separator.directive';
export {
  CONTEXT_MENU_CONTEXT,
  type ContextMenuContext,
  type ContextMenuState,
  type ContextMenuOpenChangeReason,
  type ContextMenuOpenChangeEventDetails,
} from './context-menu.types';

// Re-export menu components that can be used with context-menu
export {
  MenuGroupDirective as ContextMenuGroupDirective,
  MenuGroupLabelDirective as ContextMenuGroupLabelDirective,
  MenuCheckboxItemDirective as ContextMenuCheckboxItemDirective,
  MenuRadioGroupDirective as ContextMenuRadioGroupDirective,
  MenuRadioItemDirective as ContextMenuRadioItemDirective,
} from '../menu';

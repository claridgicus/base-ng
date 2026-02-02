/**
 * @fileoverview Public API for menubar module
 */

export { MenubarDirective } from './menubar.directive';
export {
  MENUBAR_CONTEXT,
  type MenubarContext,
  type MenubarState,
  type MenubarOrientation,
} from './menubar.types';

// Re-export menu components for use with menubar
export {
  MenuRootDirective,
  MenuTriggerDirective,
  MenuPositionerDirective,
  MenuPopupDirective,
  MenuItemDirective,
  MenuGroupDirective,
  MenuGroupLabelDirective,
  MenuSeparatorDirective,
  MenuCheckboxItemDirective,
  MenuRadioGroupDirective,
  MenuRadioItemDirective,
  MenuBackdropDirective,
  MenuArrowDirective,
} from '../menu';

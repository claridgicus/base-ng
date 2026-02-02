/**
 * @fileoverview Angular port of Base UI composite component
 * @source https://github.com/mui/base-ui/tree/master/packages/react/src/composite
 */

export {
  CompositeRootDirective,
  COMPOSITE_CONTEXT,
  type CompositeContext,
  type CompositeMetadata,
} from './composite-root.directive';

export {
  CompositeItemDirective,
} from './composite-item.directive';

export {
  ACTIVE_COMPOSITE_ITEM,
} from './constants';

export {
  // Types
  type Dimensions,
  type ModifierKey,
  // Keyboard constants
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  HOME,
  END,
  HORIZONTAL_KEYS,
  HORIZONTAL_KEYS_WITH_EXTRA_KEYS,
  VERTICAL_KEYS,
  VERTICAL_KEYS_WITH_EXTRA_KEYS,
  ARROW_KEYS,
  ALL_KEYS,
  COMPOSITE_KEYS,
  SHIFT,
  CONTROL,
  ALT,
  META,
  MODIFIER_KEYS,
  // Utility functions
  isNativeInput,
  isElementDisabled,
  stopEvent,
  isIndexOutOfListBounds,
  isListIndexDisabled,
  getMinListIndex,
  getMaxListIndex,
  findNonDisabledListIndex,
  createGridCellMap,
  getGridCellIndices,
  getGridCellIndexOfCorner,
  getGridNavigatedIndex,
  scrollIntoViewIfNeeded,
  isModifierKeySet,
} from './composite';

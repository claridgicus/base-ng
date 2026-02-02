/**
 * @fileoverview Public API for autocomplete module
 */

export { AutocompleteRootDirective } from './autocomplete-root.directive';
export { AutocompleteValueDirective } from './autocomplete-value.directive';
export { AutocompleteInputDirective } from './autocomplete-input.directive';
export { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';
export { AutocompletePositionerDirective } from './autocomplete-positioner.directive';
export { AutocompletePopupDirective } from './autocomplete-popup.directive';
export { AutocompleteListDirective } from './autocomplete-list.directive';
export { AutocompleteItemDirective } from './autocomplete-item.directive';
export { AutocompleteItemIndicatorDirective } from './autocomplete-item-indicator.directive';
export { AutocompleteEmptyDirective } from './autocomplete-empty.directive';
export { AutocompleteClearDirective } from './autocomplete-clear.directive';
export { AutocompleteGroupDirective, AUTOCOMPLETE_GROUP_CONTEXT } from './autocomplete-group.directive';
export { AutocompleteGroupLabelDirective } from './autocomplete-group-label.directive';

export {
  AUTOCOMPLETE_ROOT_CONTEXT,
  AUTOCOMPLETE_POSITIONER_CONTEXT,
  AUTOCOMPLETE_ITEM_CONTEXT,
  defaultAutocompleteFilter,
  type AutocompleteMode,
  type AutocompleteHighlightReason,
  type AutocompleteChangeReason,
  type AutocompleteChangeDetails,
  type AutocompleteHighlightDetails,
  type AutocompleteItemData,
  type AutocompleteFilterFn,
  type AutocompleteFilterOptions,
  type AutocompleteRootState,
  type AutocompleteRootContext,
  type AutocompleteValueState,
  type AutocompleteInputState,
  type AutocompletePositionerState,
  type AutocompletePopupState,
  type AutocompleteListState,
  type AutocompleteItemState,
} from './autocomplete.types';

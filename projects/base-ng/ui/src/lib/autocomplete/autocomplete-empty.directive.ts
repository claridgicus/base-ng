/**
 * @fileoverview Angular port of Base UI Autocomplete Empty
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/empty/ComboboxEmpty.tsx
 */

import { Directive, computed, inject, input, booleanAttribute } from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT } from './autocomplete.types';

/**
 * Autocomplete Empty directive.
 * Displayed when no items match the filter.
 *
 * @example
 * ```html
 * <div baseUiAutocompletePopup>
 *   <div baseUiAutocompleteList>
 *     <!-- items -->
 *   </div>
 *   <div baseUiAutocompleteEmpty>No results found</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteEmpty]',
  standalone: true,
  exportAs: 'autocompleteEmpty',
  host: {
    '[attr.data-empty]': 'isEmpty() ? "" : null',
    '[style.display]': 'shouldShow() ? null : "none"',
    '[class.base-ui-autocomplete-empty]': 'true',
  },
})
export class AutocompleteEmptyDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);

  /**
   * Whether to keep the empty state mounted when items exist.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  /** Whether there are no filtered items */
  readonly isEmpty = computed(() => {
    const items = this.rootContext.getFilteredItems();
    return items.length === 0;
  });

  /** Whether to show the empty state */
  readonly shouldShow = computed(() => {
    return this.keepMounted() || this.isEmpty();
  });
}

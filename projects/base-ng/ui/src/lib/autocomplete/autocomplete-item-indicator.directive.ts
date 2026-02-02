/**
 * @fileoverview Angular port of Base UI Autocomplete Item Indicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/item-indicator/ComboboxItemIndicator.tsx
 */

import { Directive, computed, inject, input, booleanAttribute } from '@angular/core';
import { AUTOCOMPLETE_ITEM_CONTEXT, AUTOCOMPLETE_ROOT_CONTEXT } from './autocomplete.types';

/**
 * Autocomplete Item Indicator directive.
 * Shows a visual indicator when an item is selected.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteItem [value]="'apple'">
 *   <span baseUiAutocompleteItemIndicator>✓</span>
 *   Apple
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteItemIndicator]',
  standalone: true,
  exportAs: 'autocompleteItemIndicator',
  host: {
    'aria-hidden': 'true',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[style.display]': 'shouldShow() ? null : "none"',
    '[class.base-ui-autocomplete-item-indicator]': 'true',
    '[class.base-ui-autocomplete-item-indicator-selected]': 'isSelected()',
  },
})
export class AutocompleteItemIndicatorDirective {
  private readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);
  private readonly itemContext = inject(AUTOCOMPLETE_ITEM_CONTEXT, { optional: true });

  /**
   * Whether to keep the indicator mounted when not selected.
   * If false, the indicator is hidden when the item is not selected.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  /** Whether the parent item is selected */
  readonly isSelected = computed(() => {
    if (!this.itemContext) {
      return false;
    }
    return this.rootContext.isSelected(this.itemContext.value as any);
  });

  /** Whether to show the indicator */
  readonly shouldShow = computed(() => {
    return this.keepMounted() || this.isSelected();
  });
}

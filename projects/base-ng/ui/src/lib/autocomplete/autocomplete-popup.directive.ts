/**
 * @fileoverview Angular port of Base UI Autocomplete Popup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/popup/ComboboxPopup.tsx
 */

import { Directive, computed, inject, input, booleanAttribute } from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT, AUTOCOMPLETE_POSITIONER_CONTEXT } from './autocomplete.types';

/**
 * Autocomplete Popup directive.
 * The popup container that holds the autocomplete list.
 *
 * @example
 * ```html
 * <div baseUiAutocompletePositioner>
 *   <div baseUiAutocompletePopup>
 *     <div baseUiAutocompleteList>
 *       <!-- items -->
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompletePopup]',
  standalone: true,
  exportAs: 'autocompletePopup',
  host: {
    '[attr.id]': 'popupId',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-side]': 'positionerContext?.side() ?? "bottom"',
    '[attr.data-align]': 'positionerContext?.align() ?? "start"',
    '[class.base-ui-autocomplete-popup]': 'true',
    '[class.base-ui-autocomplete-popup-open]': 'rootContext.openSignal()',
  },
})
export class AutocompletePopupDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);
  protected readonly positionerContext = inject(AUTOCOMPLETE_POSITIONER_CONTEXT, { optional: true });

  /** Popup element ID */
  readonly popupId = `${this.rootContext.rootId}-popup`;

  /** Whether the popup is open */
  readonly isOpen = computed(() => this.rootContext.openSignal());
}

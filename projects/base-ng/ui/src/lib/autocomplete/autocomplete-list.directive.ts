/**
 * @fileoverview Angular port of Base UI Autocomplete List
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/list/ComboboxList.tsx
 */

import { Directive, ElementRef, computed, inject, afterNextRender } from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT } from './autocomplete.types';

/**
 * Autocomplete List directive.
 * Contains the list of autocomplete items.
 * Renders with role="listbox".
 *
 * @example
 * ```html
 * <div baseUiAutocompletePopup>
 *   <div baseUiAutocompleteList>
 *     <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
 *     <div baseUiAutocompleteItem [value]="'banana'">Banana</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteList]',
  standalone: true,
  exportAs: 'autocompleteList',
  host: {
    role: 'listbox',
    '[attr.id]': 'listId',
    '[attr.aria-multiselectable]': 'rootContext.multipleSignal() ? "true" : null',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[class.base-ui-autocomplete-list]': 'true',
  },
})
export class AutocompleteListDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** List element ID */
  readonly listId = `${this.rootContext.rootId}-list`;

  /** Whether the list is open */
  readonly isOpen = computed(() => this.rootContext.openSignal());

  constructor() {
    // Register list element
    afterNextRender(() => {
      this.rootContext.setListElement(this.elementRef.nativeElement);
    });
  }
}

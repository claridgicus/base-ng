/**
 * @fileoverview Angular port of Base UI Autocomplete Group Label
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/group-label/ComboboxGroupLabel.tsx
 */

import { Directive, inject, afterNextRender } from '@angular/core';
import { AUTOCOMPLETE_GROUP_CONTEXT } from './autocomplete-group.directive';

let labelCounter = 0;

/**
 * Autocomplete Group Label directive.
 * A label for a group of autocomplete items.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteGroup>
 *   <div baseUiAutocompleteGroupLabel>Fruits</div>
 *   <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteGroupLabel]',
  standalone: true,
  exportAs: 'autocompleteGroupLabel',
  host: {
    '[attr.id]': 'labelId',
    '[class.base-ui-autocomplete-group-label]': 'true',
  },
})
export class AutocompleteGroupLabelDirective {
  private readonly groupContext = inject(AUTOCOMPLETE_GROUP_CONTEXT, { optional: true });

  /** Unique ID for this label */
  readonly labelId = `base-ui-autocomplete-group-label-${++labelCounter}`;

  constructor() {
    // Register label with group
    afterNextRender(() => {
      if (this.groupContext) {
        this.groupContext.setLabelId(this.labelId);
      }
    });
  }
}

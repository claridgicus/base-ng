/**
 * @fileoverview Angular port of Base UI Autocomplete Group
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/group/ComboboxGroup.tsx
 */

import { Directive, inject, signal, WritableSignal, InjectionToken } from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT } from './autocomplete.types';

let groupCounter = 0;

/** Injection token for group context */
export const AUTOCOMPLETE_GROUP_CONTEXT = new InjectionToken<{
  groupId: string;
  labelId: WritableSignal<string | null>;
  setLabelId: (id: string) => void;
}>('AUTOCOMPLETE_GROUP_CONTEXT');

/**
 * Autocomplete Group directive.
 * Groups related autocomplete items together.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteList>
 *   <div baseUiAutocompleteGroup>
 *     <div baseUiAutocompleteGroupLabel>Fruits</div>
 *     <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
 *     <div baseUiAutocompleteItem [value]="'banana'">Banana</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteGroup]',
  standalone: true,
  exportAs: 'autocompleteGroup',
  providers: [
    {
      provide: AUTOCOMPLETE_GROUP_CONTEXT,
      useFactory: (directive: AutocompleteGroupDirective) => ({
        groupId: directive.groupId,
        labelId: directive.labelId,
        setLabelId: directive.setLabelId.bind(directive),
      }),
      deps: [AutocompleteGroupDirective],
    },
  ],
  host: {
    role: 'group',
    '[attr.id]': 'groupId',
    '[attr.aria-labelledby]': 'labelId()',
    '[class.base-ui-autocomplete-group]': 'true',
  },
})
export class AutocompleteGroupDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);

  /** Unique ID for this group */
  readonly groupId = `base-ui-autocomplete-group-${++groupCounter}`;

  /** ID of the label element */
  readonly labelId = signal<string | null>(null);

  /** Set the label ID */
  setLabelId(id: string): void {
    this.labelId.set(id);
  }
}

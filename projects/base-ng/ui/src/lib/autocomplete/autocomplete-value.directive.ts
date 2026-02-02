/**
 * @fileoverview Angular port of Base UI Autocomplete Value
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/autocomplete/value/AutocompleteValue.tsx
 */

import {
  Directive,
  computed,
  inject,
  contentChild,
  TemplateRef,
  input,
} from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT, AutocompleteValueState } from './autocomplete.types';

/**
 * Context passed to value template.
 */
export interface AutocompleteValueTemplateContext {
  $implicit: string;
  inputValue: string;
}

/**
 * Autocomplete Value directive.
 * Displays the current input value.
 * Can be used to show the selected/typed value in a specific location.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteRoot>
 *   <span baseUiAutocompleteValue></span>
 *   <!-- or with template -->
 *   <span baseUiAutocompleteValue>
 *     <ng-template let-value>Selected: {{ value }}</ng-template>
 *   </span>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteValue]',
  standalone: true,
  exportAs: 'autocompleteValue',
  host: {
    '[class.base-ui-autocomplete-value]': 'true',
    '[textContent]': 'displayValue()',
  },
})
export class AutocompleteValueDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);

  /**
   * Optional template for rendering the value.
   * Template receives the input value as context.
   */
  readonly valueTemplate = contentChild<TemplateRef<AutocompleteValueTemplateContext>>(TemplateRef);

  /**
   * Placeholder text when no value is present.
   */
  readonly placeholder = input<string>('');

  /** Current input value */
  readonly inputValue = computed(() => this.rootContext.inputValueSignal());

  /** State for templates */
  readonly state = computed<AutocompleteValueState>(() => ({
    inputValue: this.inputValue(),
  }));

  /** The value to display */
  readonly displayValue = computed(() => {
    const value = this.inputValue();
    if (!value && this.placeholder()) {
      return this.placeholder();
    }
    return value;
  });
}

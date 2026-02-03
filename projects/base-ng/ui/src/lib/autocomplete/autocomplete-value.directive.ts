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
  Input,
  signal,
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

  // Internal signal for placeholder input
  private readonly _placeholder = signal<string>('');

  /**
   * Optional template for rendering the value.
   * Template receives the input value as context.
   */
  readonly valueTemplate = contentChild<TemplateRef<AutocompleteValueTemplateContext>>(TemplateRef);

  /**
   * Placeholder text when no value is present.
   */
  @Input()
  get placeholder(): string {
    return this._placeholder();
  }
  set placeholder(value: string) {
    this._placeholder.set(value);
  }

  /** Current input value */
  readonly inputValue = computed(() => this.rootContext.inputValueSignal());

  /** State for templates */
  readonly state = computed<AutocompleteValueState>(() => ({
    inputValue: this.inputValue(),
  }));

  /** The value to display */
  readonly displayValue = computed(() => {
    const value = this.inputValue();
    if (!value && this._placeholder()) {
      return this._placeholder();
    }
    return value;
  });
}

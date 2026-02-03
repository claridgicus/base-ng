/**
 * @component FieldsetRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/fieldset/root/FieldsetRoot.tsx
 * @reactDocs https://base-ui.com/react/components/fieldset
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * Groups the fieldset legend and the associated fields.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  input,
  signal,
} from '@angular/core';
import { FIELDSET_CONTEXT, FieldsetContext } from './fieldset.types';

/**
 * Root directive for fieldset component.
 * Groups the legend and associated fields.
 *
 * @example
 * ```html
 * <fieldset baseUiFieldsetRoot>
 *   <div baseUiFieldsetLegend>Personal Information</div>
 *   <!-- form fields -->
 * </fieldset>
 * ```
 */
@Directive({
  selector: 'fieldset[baseUiFieldsetRoot], [baseUiFieldsetRoot]',
  standalone: true,
  exportAs: 'fieldsetRoot',
  providers: [
    {
      provide: FIELDSET_CONTEXT,
      useFactory: (directive: FieldsetRootDirective): FieldsetContext => ({
        legendId: directive.legendId,
        disabled: directive.disabled,
      }),
      deps: [FieldsetRootDirective],
    },
  ],
  host: {
    '[attr.aria-labelledby]': 'legendId()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[class.base-ui-fieldset]': 'true',
    '[class.base-ui-fieldset-disabled]': 'disabled()',
  },
})
export class FieldsetRootDirective {
  /**
   * Whether the fieldset is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * ID of the legend element, set by FieldsetLegendDirective.
   */
  readonly legendId = signal<string | undefined>(undefined);
}

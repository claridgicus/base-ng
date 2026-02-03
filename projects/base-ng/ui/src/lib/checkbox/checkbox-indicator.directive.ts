/**
 * @component CheckboxIndicator
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/checkbox/indicator/CheckboxIndicator.tsx
 * @reactDocs https://base-ui.com/react/components/checkbox
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * Visual indicator for the checkbox state.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  type Signal,
} from '@angular/core';
import { CHECKBOX_CONTEXT } from './checkbox.types';

/**
 * Indicator directive for checkbox component.
 * Displays when the checkbox is checked or indeterminate.
 *
 * @example
 * ```html
 * <button baseUiCheckboxRoot>
 *   <span baseUiCheckboxIndicator>✓</span>
 *   Option
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiCheckboxIndicator]',
  standalone: true,
  exportAs: 'checkboxIndicator',
  host: {
    '[attr.data-checked]': 'context.checkedSignal() ? "" : null',
    '[attr.data-unchecked]': '!context.checkedSignal() && !context.indeterminateSignal() ? "" : null',
    '[attr.data-indeterminate]': 'context.indeterminateSignal() ? "" : null',
    '[attr.data-disabled]': 'context.disabled ? "" : null',
    '[style.display]': 'shouldShow() ? null : "none"',
    '[class.base-ui-checkbox-indicator]': 'true',
  },
})
export class CheckboxIndicatorDirective {
  protected readonly context = inject(CHECKBOX_CONTEXT);

  /**
   * Whether to keep the indicator mounted when hidden.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  /**
   * Whether the indicator should be displayed.
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    if (this.keepMounted()) {
      return true;
    }
    return this.context.checkedSignal() || this.context.indeterminateSignal();
  });
}

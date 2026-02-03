/**
 * @component RadioIndicator
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/radio/indicator/RadioIndicator.tsx
 * @reactDocs https://base-ui.com/react/components/radio
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * Visual indicator for the radio state.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  type Signal,
} from '@angular/core';
import { RADIO_CONTEXT } from './radio.types';

/**
 * Indicator directive for radio component.
 * Displays when the radio is checked.
 *
 * @example
 * ```html
 * <button baseUiRadioRoot value="option1">
 *   <span baseUiRadioIndicator></span>
 *   Option 1
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiRadioIndicator]',
  standalone: true,
  exportAs: 'radioIndicator',
  host: {
    '[attr.data-checked]': 'context.checkedSignal() ? "" : null',
    '[attr.data-unchecked]': '!context.checkedSignal() ? "" : null',
    '[attr.data-disabled]': 'context.disabled ? "" : null',
    '[attr.data-readonly]': 'context.readOnly ? "" : null',
    '[style.display]': 'shouldShow() ? null : "none"',
    '[class.base-ui-radio-indicator]': 'true',
  },
})
export class RadioIndicatorDirective {
  protected readonly context = inject(RADIO_CONTEXT);

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
    return this.context.checkedSignal();
  });
}

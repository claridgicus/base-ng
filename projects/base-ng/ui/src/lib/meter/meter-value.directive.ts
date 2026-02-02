/**
 * @fileoverview Angular port of Base UI MeterValue
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/value/MeterValue.tsx
 *
 * Displays the current meter value as text.
 */

import { computed, Directive, inject, input, type Signal } from '@angular/core';
import { METER_CONTEXT, MeterFormatOptions } from './meter.types';

/**
 * Value directive that displays the formatted meter value.
 *
 * @example
 * ```html
 * <div baseUiMeterRoot [value]="50">
 *   <span baseUiMeterValue></span> <!-- Displays "50" -->
 *   <div baseUiMeterTrack>
 *     <div baseUiMeterIndicator></div>
 *   </div>
 * </div>
 *
 * <!-- With percentage format -->
 * <div baseUiMeterRoot [value]="0.5">
 *   <span baseUiMeterValue [format]="{ style: 'percent' }"></span> <!-- Displays "50%" -->
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMeterValue]',
  standalone: true,
  exportAs: 'meterValue',
  host: {
    '[class.base-ui-meter-value]': 'true',
    '[textContent]': 'displayValue()',
  },
})
export class MeterValueDirective {
  protected readonly context = inject(METER_CONTEXT);

  /**
   * Override format options for this value display.
   * If not provided, uses the format from the root.
   */
  readonly format = input<MeterFormatOptions | undefined>(undefined);

  /**
   * Override locale for this value display.
   * If not provided, uses the locale from the root.
   */
  readonly locale = input<string | undefined>(undefined);

  /**
   * Custom render function for the value.
   */
  readonly renderValue = input<((value: number, formattedValue: string) => string) | undefined>(
    undefined
  );

  /**
   * The display value (uses context's formatted value or custom rendering).
   */
  readonly displayValue: Signal<string> = computed(() => {
    const value = this.context.value();
    const formattedValue = this.context.formattedValue();
    const customRender = this.renderValue();

    if (customRender) {
      return customRender(value, formattedValue);
    }

    // Use local format if provided
    const localFormat = this.format();
    const localLocale = this.locale();

    if (localFormat !== undefined || localLocale !== undefined) {
      const formatter = new Intl.NumberFormat(localLocale, localFormat);
      return formatter.format(value);
    }

    return formattedValue;
  });
}

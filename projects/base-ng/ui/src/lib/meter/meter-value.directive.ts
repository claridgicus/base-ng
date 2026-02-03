/**
 * @fileoverview Angular port of Base UI MeterValue
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/value/MeterValue.tsx
 *
 * Displays the current meter value as text.
 */

import { computed, Directive, inject, Input, signal, type Signal } from '@angular/core';
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

  // Internal signals for reactive updates
  private readonly _format = signal<MeterFormatOptions | undefined>(undefined);
  private readonly _locale = signal<string | undefined>(undefined);
  private readonly _renderValue = signal<((value: number, formattedValue: string) => string) | undefined>(
    undefined
  );

  /**
   * Override format options for this value display.
   * If not provided, uses the format from the root.
   */
  @Input()
  set format(val: MeterFormatOptions | undefined) {
    this._format.set(val);
  }
  get format(): MeterFormatOptions | undefined {
    return this._format();
  }

  /**
   * Override locale for this value display.
   * If not provided, uses the locale from the root.
   */
  @Input()
  set locale(val: string | undefined) {
    this._locale.set(val);
  }
  get locale(): string | undefined {
    return this._locale();
  }

  /**
   * Custom render function for the value.
   */
  @Input()
  set renderValue(val: ((value: number, formattedValue: string) => string) | undefined) {
    this._renderValue.set(val);
  }
  get renderValue(): ((value: number, formattedValue: string) => string) | undefined {
    return this._renderValue();
  }

  /**
   * The display value (uses context's formatted value or custom rendering).
   */
  readonly displayValue: Signal<string> = computed(() => {
    const value = this.context.value();
    const formattedValue = this.context.formattedValue();
    const customRender = this._renderValue();

    if (customRender) {
      return customRender(value, formattedValue);
    }

    // Use local format if provided
    const localFormat = this._format();
    const localLocale = this._locale();

    if (localFormat !== undefined || localLocale !== undefined) {
      const formatter = new Intl.NumberFormat(localLocale, localFormat);
      return formatter.format(value);
    }

    return formattedValue;
  });
}

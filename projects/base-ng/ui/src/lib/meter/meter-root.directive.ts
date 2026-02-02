/**
 * @fileoverview Angular port of Base UI MeterRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/root/MeterRoot.tsx
 *
 * Groups all parts of the meter and provides the value to screen readers.
 * Unlike Progress, Meter is for measuring static values (like disk usage, battery level).
 */

import {
  computed,
  Directive,
  input,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import {
  METER_CONTEXT,
  MeterContext,
  MeterFormatOptions,
} from './meter.types';

/**
 * Formats a number value for display using Intl.NumberFormat.
 */
function formatNumberValue(
  value: number,
  locale?: string,
  formatOptions?: MeterFormatOptions
): string {
  const formatter = new Intl.NumberFormat(locale, formatOptions);
  return formatter.format(value);
}

/**
 * Default function to generate aria-valuetext.
 */
function getDefaultAriaValueText(formattedValue: string, value: number): string {
  return formattedValue;
}

/**
 * Calculates the percentage of a value within a range.
 */
function valueToPercent(value: number, min: number, max: number): number {
  const range = max - min;
  if (range === 0) {
    return 0;
  }
  return ((value - min) / range) * 100;
}

/**
 * Root directive for Meter component that provides context to child components.
 * Meter is used for representing a scalar measurement within a known range (like battery level, disk usage).
 *
 * @example
 * ```html
 * <div baseUiMeterRoot [value]="diskUsage" [max]="100">
 *   <div baseUiMeterTrack>
 *     <div baseUiMeterIndicator></div>
 *   </div>
 *   <span baseUiMeterValue></span>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMeterRoot]',
  standalone: true,
  exportAs: 'meterRoot',
  providers: [
    {
      provide: METER_CONTEXT,
      useFactory: (directive: MeterRootDirective) => directive.context,
      deps: [MeterRootDirective],
    },
  ],
  host: {
    role: 'meter',
    '[attr.aria-labelledby]': 'labelId()',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuetext]': 'ariaValueText()',
    '[class.base-ui-meter]': 'true',
  },
})
export class MeterRootDirective {
  /**
   * Current meter value. Required.
   */
  readonly value = input.required<number>();

  /**
   * Minimum meter value.
   * @default 0
   */
  readonly min = input<number>(0);

  /**
   * Maximum meter value.
   * @default 100
   */
  readonly max = input<number>(100);

  /**
   * Intl.NumberFormat options for formatting the meter value.
   */
  readonly format = input<MeterFormatOptions | undefined>(undefined);

  /**
   * BCP 47 locale for number formatting.
   */
  readonly locale = input<string | undefined>(undefined);

  /**
   * Custom function to generate aria-valuetext.
   */
  readonly getAriaValueText = input<
    (formattedValue: string, value: number) => string
  >(getDefaultAriaValueText);

  // Internal state
  private readonly _labelId: WritableSignal<string | undefined> = signal(undefined);

  /**
   * Current label ID for aria-labelledby.
   */
  readonly labelId: Signal<string | undefined> = this._labelId.asReadonly();

  /**
   * Formatted value for display.
   */
  readonly formattedValue: Signal<string> = computed(() => {
    return formatNumberValue(this.value(), this.locale(), this.format());
  });

  /**
   * Aria value text for screen readers.
   */
  readonly ariaValueText: Signal<string> = computed(() => {
    const fn = this.getAriaValueText();
    return fn(this.formattedValue(), this.value());
  });

  /**
   * Meter percentage (0-100).
   */
  readonly percentage: Signal<number> = computed(() => {
    return valueToPercent(this.value(), this.min(), this.max());
  });

  /**
   * Context provided to child components.
   */
  readonly context: MeterContext = {
    formattedValue: this.formattedValue,
    max: computed(() => this.max()),
    min: computed(() => this.min()),
    value: computed(() => this.value()),
    percentage: this.percentage,
    setLabelId: (id: string | undefined) => {
      this._labelId.set(id);
    },
  };
}

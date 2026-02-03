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
  Input,
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
    '[attr.aria-valuemax]': '_max()',
    '[attr.aria-valuemin]': '_min()',
    '[attr.aria-valuenow]': '_value()',
    '[attr.aria-valuetext]': 'ariaValueText()',
    '[class.base-ui-meter]': 'true',
  },
})
export class MeterRootDirective {
  // Internal signals for reactive updates
  readonly _value = signal<number>(0);
  readonly _min = signal<number>(0);
  readonly _max = signal<number>(100);
  readonly _format = signal<MeterFormatOptions | undefined>(undefined);
  readonly _locale = signal<string | undefined>(undefined);
  readonly _getAriaValueText = signal<
    (formattedValue: string, value: number) => string
  >(getDefaultAriaValueText);

  /**
   * Current meter value. Required.
   */
  @Input({ required: true })
  set value(val: number) {
    this._value.set(val);
  }
  get value(): number {
    return this._value();
  }

  /**
   * Minimum meter value.
   * @default 0
   */
  @Input()
  set min(val: number) {
    this._min.set(val);
  }
  get min(): number {
    return this._min();
  }

  /**
   * Maximum meter value.
   * @default 100
   */
  @Input()
  set max(val: number) {
    this._max.set(val);
  }
  get max(): number {
    return this._max();
  }

  /**
   * Intl.NumberFormat options for formatting the meter value.
   */
  @Input()
  set format(val: MeterFormatOptions | undefined) {
    this._format.set(val);
  }
  get format(): MeterFormatOptions | undefined {
    return this._format();
  }

  /**
   * BCP 47 locale for number formatting.
   */
  @Input()
  set locale(val: string | undefined) {
    this._locale.set(val);
  }
  get locale(): string | undefined {
    return this._locale();
  }

  /**
   * Custom function to generate aria-valuetext.
   */
  @Input()
  set getAriaValueText(val: (formattedValue: string, value: number) => string) {
    this._getAriaValueText.set(val);
  }
  get getAriaValueText(): (formattedValue: string, value: number) => string {
    return this._getAriaValueText();
  }

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
    return formatNumberValue(this._value(), this._locale(), this._format());
  });

  /**
   * Aria value text for screen readers.
   */
  readonly ariaValueText: Signal<string> = computed(() => {
    const fn = this._getAriaValueText();
    return fn(this.formattedValue(), this._value());
  });

  /**
   * Meter percentage (0-100).
   */
  readonly percentage: Signal<number> = computed(() => {
    return valueToPercent(this._value(), this._min(), this._max());
  });

  /**
   * Context provided to child components.
   */
  readonly context: MeterContext = {
    formattedValue: this.formattedValue,
    max: this._max,
    min: this._min,
    value: this._value,
    percentage: this.percentage,
    setLabelId: (id: string | undefined) => {
      this._labelId.set(id);
    },
  };
}

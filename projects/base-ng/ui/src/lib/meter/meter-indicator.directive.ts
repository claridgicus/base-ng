/**
 * @fileoverview Angular port of Base UI MeterIndicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/indicator/MeterIndicator.tsx
 *
 * Visual indicator showing the value position along the range.
 */

import { Directive, inject } from '@angular/core';
import { METER_CONTEXT } from './meter.types';

/**
 * Indicator directive that visually displays the meter value.
 * Automatically sets inline width style based on percentage.
 *
 * @example
 * ```html
 * <div baseUiMeterRoot [value]="50">
 *   <div baseUiMeterTrack>
 *     <div baseUiMeterIndicator></div>
 *   </div>
 * </div>
 * ```
 *
 * The indicator width is automatically set to reflect the percentage of value in the range.
 */
@Directive({
  selector: '[baseUiMeterIndicator]',
  standalone: true,
  exportAs: 'meterIndicator',
  host: {
    '[style.width.%]': 'context.percentage()',
    '[style.inset-inline-start]': '"0"',
    '[style.height]': '"inherit"',
    '[class.base-ui-meter-indicator]': 'true',
  },
})
export class MeterIndicatorDirective {
  protected readonly context = inject(METER_CONTEXT);
}

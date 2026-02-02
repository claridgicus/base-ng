/**
 * @fileoverview Angular port of Base UI MeterTrack
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/track/MeterTrack.tsx
 *
 * Container for the meter indicator.
 */

import { Directive, inject } from '@angular/core';
import { METER_CONTEXT } from './meter.types';

/**
 * Track directive that contains the meter indicator.
 *
 * @example
 * ```html
 * <div baseUiMeterRoot [value]="50">
 *   <div baseUiMeterTrack>
 *     <div baseUiMeterIndicator></div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMeterTrack]',
  standalone: true,
  exportAs: 'meterTrack',
  host: {
    '[class.base-ui-meter-track]': 'true',
  },
})
export class MeterTrackDirective {
  protected readonly context = inject(METER_CONTEXT);
}

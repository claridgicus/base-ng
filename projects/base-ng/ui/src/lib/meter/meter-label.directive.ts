/**
 * @fileoverview Angular port of Base UI MeterLabel
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/label/MeterLabel.tsx
 *
 * An accessible label that is automatically associated with the meter.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { METER_CONTEXT } from './meter.types';

let labelIdCounter = 0;

/**
 * Label directive that provides an accessible label for the meter.
 * Automatically generates an ID and associates it with the meter root.
 *
 * @example
 * ```html
 * <div baseUiMeterRoot [value]="50">
 *   <span baseUiMeterLabel>Disk Usage</span>
 *   <div baseUiMeterTrack>
 *     <div baseUiMeterIndicator></div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMeterLabel]',
  standalone: true,
  exportAs: 'meterLabel',
  host: {
    '[id]': 'labelId',
    '[class.base-ui-meter-label]': 'true',
  },
})
export class MeterLabelDirective implements OnInit, OnDestroy {
  protected readonly context = inject(METER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Generated label ID.
   */
  readonly labelId: string;

  constructor() {
    // Use existing ID if present, otherwise generate one
    const existingId = this.elementRef.nativeElement.id;
    this.labelId = existingId || `base-ui-meter-label-${++labelIdCounter}`;
  }

  ngOnInit(): void {
    this.context.setLabelId(this.labelId);
  }

  ngOnDestroy(): void {
    this.context.setLabelId(undefined);
  }
}

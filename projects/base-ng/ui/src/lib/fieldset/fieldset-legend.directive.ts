/**
 * @fileoverview Angular port of Base UI FieldsetLegend
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/fieldset/legend/FieldsetLegend.tsx
 *
 * Accessible label for the fieldset.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FIELDSET_CONTEXT } from './fieldset.types';

let legendIdCounter = 0;

/**
 * Legend directive for fieldset component.
 * Provides an accessible label for the fieldset.
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
  selector: '[baseUiFieldsetLegend]',
  standalone: true,
  exportAs: 'fieldsetLegend',
  host: {
    '[id]': 'legendId',
    '[attr.data-disabled]': 'context.disabled() ? "" : null',
    '[class.base-ui-fieldset-legend]': 'true',
    '[class.base-ui-fieldset-legend-disabled]': 'context.disabled()',
  },
})
export class FieldsetLegendDirective implements OnInit, OnDestroy {
  protected readonly context = inject(FIELDSET_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Legend ID.
   */
  readonly legendId: string;

  constructor() {
    const existingId = this.elementRef.nativeElement.id;
    this.legendId = existingId || `base-ui-fieldset-legend-${++legendIdCounter}`;
  }

  ngOnInit(): void {
    this.context.legendId.set(this.legendId);
  }

  ngOnDestroy(): void {
    this.context.legendId.set(undefined);
  }
}

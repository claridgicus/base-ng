/**
 * @fileoverview Angular port of Base UI FieldLabel
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/field/label/FieldLabel.tsx
 *
 * An accessible label for the field control.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FIELD_CONTEXT } from './field.types';

let labelIdCounter = 0;

/**
 * Label directive for the field control.
 *
 * @example
 * ```html
 * <div baseUiFieldRoot>
 *   <label baseUiFieldLabel>Email</label>
 *   <input baseUiFieldControl type="email" />
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiFieldLabel]',
  standalone: true,
  exportAs: 'fieldLabel',
  host: {
    '[id]': 'labelId',
    '[attr.for]': 'context.controlId()',
    '[attr.data-disabled]': 'context.disabled() ? "" : null',
    '[attr.data-touched]': 'context.touched() ? "" : null',
    '[attr.data-dirty]': 'context.dirty() ? "" : null',
    '[attr.data-valid]': 'context.valid() ? "" : null',
    '[attr.data-invalid]': '!context.valid() ? "" : null',
    '[class.base-ui-field-label]': 'true',
    '[class.base-ui-field-label-disabled]': 'context.disabled()',
    '[class.base-ui-field-label-invalid]': '!context.valid()',
  },
})
export class FieldLabelDirective implements OnInit, OnDestroy {
  protected readonly context = inject(FIELD_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Label ID.
   */
  readonly labelId: string;

  constructor() {
    const existingId = this.elementRef.nativeElement.id;
    this.labelId = existingId || `base-ui-field-label-${++labelIdCounter}`;
  }

  ngOnInit(): void {
    this.context.labelId.set(this.labelId);
  }

  ngOnDestroy(): void {
    this.context.labelId.set(undefined);
  }
}

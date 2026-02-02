/**
 * @fileoverview Angular port of Base UI FieldDescription
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/field/description/FieldDescription.tsx
 *
 * Helper text description for the field.
 */

import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FIELD_CONTEXT } from './field.types';

let descriptionIdCounter = 0;

/**
 * Description directive for field helper text.
 *
 * @example
 * ```html
 * <div baseUiFieldRoot>
 *   <label baseUiFieldLabel>Password</label>
 *   <input baseUiFieldControl type="password" />
 *   <span baseUiFieldDescription>Must be at least 8 characters</span>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiFieldDescription]',
  standalone: true,
  exportAs: 'fieldDescription',
  host: {
    '[id]': 'descriptionId',
    '[attr.data-disabled]': 'context.disabled() ? "" : null',
    '[class.base-ui-field-description]': 'true',
    '[class.base-ui-field-description-disabled]': 'context.disabled()',
  },
})
export class FieldDescriptionDirective implements OnInit, OnDestroy {
  protected readonly context = inject(FIELD_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Description ID.
   */
  readonly descriptionId: string;

  constructor() {
    const existingId = this.elementRef.nativeElement.id;
    this.descriptionId = existingId || `base-ui-field-description-${++descriptionIdCounter}`;
  }

  ngOnInit(): void {
    this.context.descriptionId.set(this.descriptionId);
  }

  ngOnDestroy(): void {
    this.context.descriptionId.set(undefined);
  }
}

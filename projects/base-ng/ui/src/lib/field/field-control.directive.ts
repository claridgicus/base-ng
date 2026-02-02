/**
 * @fileoverview Angular port of Base UI FieldControl
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/field/control/FieldControl.tsx
 *
 * The input control element for the field.
 */

import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FIELD_CONTEXT, FieldValidityData } from './field.types';

let controlIdCounter = 0;

/**
 * Control directive for field input elements.
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
  selector: 'input[baseUiFieldControl], textarea[baseUiFieldControl], select[baseUiFieldControl]',
  standalone: true,
  exportAs: 'fieldControl',
  host: {
    '[id]': 'controlId',
    '[attr.name]': 'context.name()',
    '[attr.disabled]': 'context.disabled() ? "" : null',
    '[attr.aria-invalid]': '!context.valid() || null',
    '[attr.aria-labelledby]': 'context.labelId()',
    '[attr.aria-describedby]': 'ariaDescribedBy',
    '[attr.data-disabled]': 'context.disabled() ? "" : null',
    '[attr.data-touched]': 'context.touched() ? "" : null',
    '[attr.data-dirty]': 'context.dirty() ? "" : null',
    '[attr.data-valid]': 'context.valid() ? "" : null',
    '[attr.data-invalid]': '!context.valid() ? "" : null',
    '[class.base-ui-field-control]': 'true',
    '[class.base-ui-field-control-disabled]': 'context.disabled()',
    '[class.base-ui-field-control-invalid]': '!context.valid()',
  },
})
export class FieldControlDirective implements OnInit, OnDestroy {
  protected readonly context = inject(FIELD_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>);

  /**
   * Control ID.
   */
  readonly controlId: string;

  constructor() {
    const existingId = this.elementRef.nativeElement.id;
    this.controlId = existingId || `base-ui-field-control-${++controlIdCounter}`;
  }

  /**
   * Computed aria-describedby combining description and error.
   */
  get ariaDescribedBy(): string | null {
    const parts: string[] = [];
    const descId = this.context.descriptionId();
    const errId = this.context.errorId();

    if (descId) {
      parts.push(descId);
    }
    if (errId && !this.context.valid()) {
      parts.push(errId);
    }

    return parts.length > 0 ? parts.join(' ') : null;
  }

  ngOnInit(): void {
    this.context.controlId.set(this.controlId);
    this.updateFilled();
  }

  ngOnDestroy(): void {
    this.context.controlId.set(undefined);
  }

  /**
   * Handle input event.
   */
  @HostListener('input')
  onInput(): void {
    this.context.setDirty(true);
    this.updateFilled();
    this.updateValidity();
  }

  /**
   * Handle focus event.
   */
  @HostListener('focus')
  onFocus(): void {
    this.context.setFocused(true);
  }

  /**
   * Handle blur event.
   */
  @HostListener('blur')
  onBlur(): void {
    this.context.setFocused(false);
    this.context.setTouched(true);
    this.updateValidity();
  }

  /**
   * Handle change event.
   */
  @HostListener('change')
  onChange(): void {
    this.context.setDirty(true);
    this.updateFilled();
    this.updateValidity();
  }

  /**
   * Update the filled state based on element value.
   */
  private updateFilled(): void {
    const element = this.elementRef.nativeElement;
    const value = element.value;
    this.context.setFilled(value !== null && value !== undefined && value !== '');
  }

  /**
   * Update validity data from the element's validity state.
   */
  private updateValidity(): void {
    const element = this.elementRef.nativeElement;
    const validity = element.validity;

    if (!validity) {
      return;
    }

    const validityData: FieldValidityData = {
      badInput: validity.badInput,
      customError: validity.customError,
      patternMismatch: validity.patternMismatch,
      rangeOverflow: validity.rangeOverflow,
      rangeUnderflow: validity.rangeUnderflow,
      stepMismatch: validity.stepMismatch,
      tooLong: validity.tooLong,
      tooShort: validity.tooShort,
      typeMismatch: validity.typeMismatch,
      valueMissing: validity.valueMissing,
      valid: validity.valid,
      errors: validity.valid ? [] : [element.validationMessage],
    };

    this.context.setValidityData(validityData);
  }
}

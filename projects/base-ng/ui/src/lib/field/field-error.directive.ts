/**
 * @fileoverview Angular port of Base UI FieldError
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/field/error/FieldError.tsx
 *
 * Error message display for the field.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  type Signal,
} from '@angular/core';
import { FIELD_CONTEXT, FieldValidityData } from './field.types';

let errorIdCounter = 0;

/**
 * Validity state keys that can be matched.
 */
export type ValidityStateKey = keyof Omit<FieldValidityData, 'errors' | 'valid'>;

/**
 * Error directive for displaying field validation errors.
 * Only visible when the field is invalid.
 *
 * @example
 * ```html
 * <div baseUiFieldRoot>
 *   <label baseUiFieldLabel>Email</label>
 *   <input baseUiFieldControl type="email" required />
 *   <span baseUiFieldError>Please enter a valid email</span>
 * </div>
 *
 * <!-- Match specific validity state -->
 * <span baseUiFieldError match="valueMissing">This field is required</span>
 * <span baseUiFieldError match="typeMismatch">Please enter a valid email</span>
 * ```
 */
@Directive({
  selector: '[baseUiFieldError]',
  standalone: true,
  exportAs: 'fieldError',
  host: {
    '[id]': 'errorId',
    role: 'alert',
    'aria-live': 'polite',
    '[attr.data-disabled]': 'context.disabled() ? "" : null',
    '[style.display]': 'shouldShow() ? null : "none"',
    '[class.base-ui-field-error]': 'true',
  },
})
export class FieldErrorDirective implements OnInit, OnDestroy {
  protected readonly context = inject(FIELD_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Match a specific validity state to show this error.
   * If not provided, shows when field is invalid.
   */
  readonly match = input<ValidityStateKey | boolean | undefined>(undefined);

  /**
   * Error ID.
   */
  readonly errorId: string;

  /**
   * Whether this error should be displayed.
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    const validity = this.context.validityData();
    const matchValue = this.match();

    // If no validity data, don't show
    if (!validity) {
      return false;
    }

    // If valid, don't show
    if (validity.valid) {
      return false;
    }

    // If match is boolean
    if (typeof matchValue === 'boolean') {
      return matchValue;
    }

    // If match is a validity state key
    if (typeof matchValue === 'string') {
      return validity[matchValue] === true;
    }

    // No match specified, show when invalid
    return true;
  });

  constructor() {
    const existingId = this.elementRef.nativeElement.id;
    this.errorId = existingId || `base-ui-field-error-${++errorIdCounter}`;
  }

  ngOnInit(): void {
    this.context.errorId.set(this.errorId);
  }

  ngOnDestroy(): void {
    this.context.errorId.set(undefined);
  }
}

/**
 * @component FieldError
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/field/error/FieldError.tsx
 * @reactDocs https://base-ui.com/react/components/field
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * Error message display for the field.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
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

  // Internal signal for reactive updates
  readonly _match = signal<ValidityStateKey | boolean | undefined>(undefined);

  /**
   * Match a specific validity state to show this error.
   * If not provided, shows when field is invalid.
   */
  @Input()
  set match(value: ValidityStateKey | boolean | undefined) {
    this._match.set(value);
  }
  get match(): ValidityStateKey | boolean | undefined {
    return this._match();
  }

  /**
   * Error ID.
   */
  readonly errorId: string;

  /**
   * Whether this error should be displayed.
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    const validity = this.context.validityData();
    const matchValue = this._match();

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

/**
 * @fileoverview Angular port of Base UI ProgressValue
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/progress/value/ProgressValue.tsx
 *
 * Displays the current progress value as text.
 */

import { computed, Directive, inject, input, type Signal } from '@angular/core';
import { PROGRESS_CONTEXT, ProgressFormatOptions } from './progress.types';

/**
 * Value directive that displays the formatted progress value.
 *
 * @example
 * ```html
 * <div baseUiProgressRoot [value]="50">
 *   <span baseUiProgressValue></span> <!-- Displays "50" -->
 *   <div baseUiProgressTrack>
 *     <div baseUiProgressIndicator></div>
 *   </div>
 * </div>
 *
 * <!-- With percentage format -->
 * <div baseUiProgressRoot [value]="50">
 *   <span baseUiProgressValue [format]="{ style: 'percent' }"></span> <!-- Displays "50%" -->
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiProgressValue]',
  standalone: true,
  exportAs: 'progressValue',
  host: {
    '[attr.data-status]': 'context.status()',
    '[class.base-ui-progress-value]': 'true',
    '[textContent]': 'displayValue()',
  },
})
export class ProgressValueDirective {
  protected readonly context = inject(PROGRESS_CONTEXT);

  /**
   * Override format options for this value display.
   * If not provided, uses the format from the root.
   */
  readonly format = input<ProgressFormatOptions | undefined>(undefined);

  /**
   * Override locale for this value display.
   * If not provided, uses the locale from the root.
   */
  readonly locale = input<string | undefined>(undefined);

  /**
   * Custom render function for the value.
   */
  readonly renderValue = input<((value: number | null, formattedValue: string | null) => string) | undefined>(
    undefined
  );

  /**
   * The display value (uses context's formatted value or custom rendering).
   */
  readonly displayValue: Signal<string> = computed(() => {
    const value = this.context.value();
    const formattedValue = this.context.formattedValue();
    const customRender = this.renderValue();

    if (customRender) {
      return customRender(value, formattedValue);
    }

    // Use local format if provided
    const localFormat = this.format();
    const localLocale = this.locale();

    if (localFormat !== undefined || localLocale !== undefined) {
      if (value === null || !Number.isFinite(value)) {
        return '';
      }
      const formatter = new Intl.NumberFormat(localLocale, localFormat);
      return formatter.format(value);
    }

    return formattedValue ?? '';
  });
}

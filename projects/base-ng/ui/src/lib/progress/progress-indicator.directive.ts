/**
 * @fileoverview Angular port of Base UI ProgressIndicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/progress/indicator/ProgressIndicator.tsx
 *
 * Visual indicator showing the completion status of the task.
 */

import { computed, Directive, inject, type Signal } from '@angular/core';
import { PROGRESS_CONTEXT } from './progress.types';

/**
 * Indicator directive that visually displays progress completion.
 * Automatically sets inline width style based on progress percentage.
 *
 * @example
 * ```html
 * <div baseUiProgressRoot [value]="50">
 *   <div baseUiProgressTrack>
 *     <div baseUiProgressIndicator></div>
 *   </div>
 * </div>
 * ```
 *
 * The indicator width is automatically set to reflect the progress percentage.
 * For indeterminate progress, width is not set.
 */
@Directive({
  selector: '[baseUiProgressIndicator]',
  standalone: true,
  exportAs: 'progressIndicator',
  host: {
    '[attr.data-status]': 'context.status()',
    '[style.width.%]': 'percentage()',
    '[class.base-ui-progress-indicator]': 'true',
    '[class.base-ui-progress-indicator-indeterminate]': 'context.status() === "indeterminate"',
    '[class.base-ui-progress-indicator-progressing]': 'context.status() === "progressing"',
    '[class.base-ui-progress-indicator-complete]': 'context.status() === "complete"',
  },
})
export class ProgressIndicatorDirective {
  protected readonly context = inject(PROGRESS_CONTEXT);

  /**
   * Progress percentage for width calculation.
   * Returns null for indeterminate progress (no width set).
   */
  readonly percentage: Signal<number | null> = computed(() => {
    const value = this.context.value();
    const min = this.context.min();
    const max = this.context.max();

    if (value === null || !Number.isFinite(value)) {
      return null;
    }

    const range = max - min;
    if (range === 0) {
      return 0;
    }

    return ((value - min) / range) * 100;
  });
}

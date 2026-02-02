/**
 * @fileoverview Angular port of Base UI ProgressTrack
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/progress/track/ProgressTrack.tsx
 *
 * Container for the progress bar indicator.
 */

import { computed, Directive, inject } from '@angular/core';
import { PROGRESS_CONTEXT } from './progress.types';

/**
 * Track directive that contains the progress indicator.
 *
 * @example
 * ```html
 * <div baseUiProgressRoot [value]="50">
 *   <div baseUiProgressTrack>
 *     <div baseUiProgressIndicator></div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiProgressTrack]',
  standalone: true,
  exportAs: 'progressTrack',
  host: {
    '[attr.data-status]': 'context.status()',
    '[class.base-ui-progress-track]': 'true',
    '[class.base-ui-progress-track-indeterminate]': 'context.status() === "indeterminate"',
    '[class.base-ui-progress-track-progressing]': 'context.status() === "progressing"',
    '[class.base-ui-progress-track-complete]': 'context.status() === "complete"',
  },
})
export class ProgressTrackDirective {
  protected readonly context = inject(PROGRESS_CONTEXT);
}

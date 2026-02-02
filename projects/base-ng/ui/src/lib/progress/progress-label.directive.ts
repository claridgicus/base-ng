/**
 * @fileoverview Angular port of Base UI ProgressLabel
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/progress/label/ProgressLabel.tsx
 *
 * An accessible label that is automatically associated with the progress bar.
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PROGRESS_CONTEXT } from './progress.types';

let labelIdCounter = 0;

/**
 * Label directive that provides an accessible label for the progress bar.
 * Automatically generates an ID and associates it with the progress root.
 *
 * @example
 * ```html
 * <div baseUiProgressRoot [value]="50">
 *   <span baseUiProgressLabel>Loading...</span>
 *   <div baseUiProgressTrack>
 *     <div baseUiProgressIndicator></div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiProgressLabel]',
  standalone: true,
  exportAs: 'progressLabel',
  host: {
    '[id]': 'labelId',
    '[attr.data-status]': 'context.status()',
    '[class.base-ui-progress-label]': 'true',
  },
})
export class ProgressLabelDirective implements OnInit, OnDestroy {
  protected readonly context = inject(PROGRESS_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Generated label ID.
   */
  readonly labelId: string;

  constructor() {
    // Use existing ID if present, otherwise generate one
    const existingId = this.elementRef.nativeElement.id;
    this.labelId = existingId || `base-ui-progress-label-${++labelIdCounter}`;
  }

  ngOnInit(): void {
    this.context.setLabelId(this.labelId);
  }

  ngOnDestroy(): void {
    this.context.setLabelId(undefined);
  }
}

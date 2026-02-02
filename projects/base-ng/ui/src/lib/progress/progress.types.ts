/**
 * @fileoverview Angular port of Base UI Progress types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/progress/root/ProgressRoot.tsx
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Progress status indicator.
 */
export type ProgressStatus = 'indeterminate' | 'progressing' | 'complete';

/**
 * Progress state containing the current status.
 */
export interface ProgressState {
  status: ProgressStatus;
}

/**
 * Context provided by ProgressRoot to child components.
 */
export interface ProgressContext {
  /** Formatted value for display (internationalized) */
  formattedValue: Signal<string | null>;
  /** Maximum progress value */
  max: Signal<number>;
  /** Minimum progress value */
  min: Signal<number>;
  /** Current progress value (null for indeterminate) */
  value: Signal<number | null>;
  /** Current status */
  status: Signal<ProgressStatus>;
  /** Current state object */
  state: Signal<ProgressState>;
  /** Function to register a label element */
  setLabelId: (id: string | undefined) => void;
}

/**
 * Injection token for ProgressContext.
 */
export const PROGRESS_CONTEXT = new InjectionToken<ProgressContext>('PROGRESS_CONTEXT');

/**
 * Number format options for progress value display.
 */
export interface ProgressFormatOptions extends Intl.NumberFormatOptions {}

/**
 * @fileoverview Angular port of Base UI ToggleGroup types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toggle-group/ToggleGroup.tsx
 */

import { InjectionToken, Signal } from '@angular/core';
import type { ToggleChangeEventDetails } from '../toggle';
import type { Orientation } from '../types';

/**
 * Context provided by ToggleGroup to Toggle children.
 */
export interface ToggleGroupContext {
  /** Current selected values */
  value: Signal<string[]>;
  /** Whether the group is disabled */
  disabled: Signal<boolean>;
  /** Set a toggle value in the group */
  setGroupValue: (value: string, pressed: boolean, details: ToggleChangeEventDetails) => void;
}

/**
 * Injection token for ToggleGroupContext.
 */
export const TOGGLE_GROUP_CONTEXT = new InjectionToken<ToggleGroupContext>('TOGGLE_GROUP_CONTEXT');

/**
 * ToggleGroup state.
 */
export interface ToggleGroupState {
  value: string[];
  disabled: boolean;
  orientation: Orientation;
}

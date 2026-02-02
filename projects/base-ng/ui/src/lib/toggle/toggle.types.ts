/**
 * @fileoverview Angular port of Base UI Toggle types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toggle/Toggle.tsx
 */

import { InjectionToken, Signal } from '@angular/core';
import type { BaseUIChangeEventDetails } from '../types';

/**
 * Toggle state containing current pressed status.
 */
export interface ToggleState {
  pressed: boolean;
  disabled: boolean;
}

/**
 * Event details for toggle change events.
 */
export type ToggleChangeEventDetails = BaseUIChangeEventDetails<string>;

/**
 * Context for toggle group integration (optional).
 */
export interface ToggleGroupContext {
  /** Current pressed values in the group */
  value: Signal<string[]>;
  /** Whether the group is disabled */
  disabled: Signal<boolean>;
  /** Set a toggle value in the group */
  setGroupValue: (value: string, pressed: boolean, details: ToggleChangeEventDetails) => void;
}

/**
 * Injection token for ToggleGroupContext (optional).
 */
export const TOGGLE_GROUP_CONTEXT = new InjectionToken<ToggleGroupContext>('TOGGLE_GROUP_CONTEXT');

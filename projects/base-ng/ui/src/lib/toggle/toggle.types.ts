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

// Note: ToggleGroupContext is defined in toggle-group module to avoid circular dependencies
// Toggle directive injects it optionally using TOGGLE_GROUP_CONTEXT token

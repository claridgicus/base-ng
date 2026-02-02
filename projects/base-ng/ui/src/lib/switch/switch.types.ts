/**
 * @fileoverview Angular port of Base UI Switch types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/switch/root/SwitchRoot.tsx
 */

import { InjectionToken, Signal } from '@angular/core';

/**
 * Switch state containing current checked status.
 */
export interface SwitchState {
  checked: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

/**
 * Context provided by SwitchRoot to child components.
 */
export interface SwitchContext {
  /** Whether the switch is checked */
  checked: Signal<boolean>;
  /** Whether the switch is disabled */
  disabled: Signal<boolean>;
  /** Whether the switch is read-only */
  readOnly: Signal<boolean>;
  /** Whether the switch is required */
  required: Signal<boolean>;
  /** Combined state object */
  state: Signal<SwitchState>;
}

/**
 * Injection token for SwitchContext.
 */
export const SWITCH_CONTEXT = new InjectionToken<SwitchContext>('SWITCH_CONTEXT');

/**
 * @fileoverview Angular port of Base UI Fieldset types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/fieldset/root/FieldsetRootContext.tsx
 */

import { InjectionToken, WritableSignal } from '@angular/core';

/**
 * Fieldset state.
 */
export interface FieldsetState {
  /**
   * Whether the fieldset is disabled.
   */
  disabled: boolean;
}

/**
 * Fieldset context for communication between root and legend.
 */
export interface FieldsetContext {
  /**
   * ID of the legend element.
   */
  legendId: WritableSignal<string | undefined>;

  /**
   * Whether the fieldset is disabled.
   */
  disabled: () => boolean;
}

/**
 * Injection token for fieldset context.
 */
export const FIELDSET_CONTEXT = new InjectionToken<FieldsetContext>(
  'FIELDSET_CONTEXT'
);

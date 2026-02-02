/**
 * @fileoverview Angular port of Base UI Meter types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/root/MeterRoot.tsx
 */

import { InjectionToken, Signal } from '@angular/core';

/**
 * Context provided by MeterRoot to child components.
 */
export interface MeterContext {
  /** Formatted value for display (internationalized) */
  formattedValue: Signal<string>;
  /** Maximum meter value */
  max: Signal<number>;
  /** Minimum meter value */
  min: Signal<number>;
  /** Current meter value */
  value: Signal<number>;
  /** Percentage of value in the range (0-100) */
  percentage: Signal<number>;
  /** Function to register a label element */
  setLabelId: (id: string | undefined) => void;
}

/**
 * Injection token for MeterContext.
 */
export const METER_CONTEXT = new InjectionToken<MeterContext>('METER_CONTEXT');

/**
 * Number format options for meter value display.
 */
export interface MeterFormatOptions extends Intl.NumberFormatOptions {}

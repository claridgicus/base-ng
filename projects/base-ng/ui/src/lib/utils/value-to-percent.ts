/**
 * @fileoverview Angular port of Base UI value to percent utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/valueToPercent.ts
 */

/**
 * Converts a value within a range to a percentage (0-100).
 *
 * @param value - The value to convert
 * @param min - The minimum value of the range
 * @param max - The maximum value of the range
 * @returns The percentage value
 */
export function valueToPercent(value: number, min: number, max: number): number {
  return ((value - min) * 100) / (max - min);
}

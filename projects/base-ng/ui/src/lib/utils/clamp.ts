/**
 * @fileoverview Angular port of Base UI clamp utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/clamp.ts
 */

/**
 * Clamps a numeric value within a specified range.
 *
 * @param val - The value to clamp
 * @param min - The minimum allowed value (defaults to MIN_SAFE_INTEGER)
 * @param max - The maximum allowed value (defaults to MAX_SAFE_INTEGER)
 * @returns The clamped value
 */
export function clamp(
  val: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): number {
  return Math.max(min, Math.min(val, max));
}

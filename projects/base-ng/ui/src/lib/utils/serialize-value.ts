/**
 * @fileoverview Angular port of Base UI value serialization utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/serializeValue.ts
 */

/**
 * Serializes an unknown value to a string representation.
 *
 * @param value - The value to serialize
 * @returns A string representation of the value
 */
export function serializeValue(value: unknown): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

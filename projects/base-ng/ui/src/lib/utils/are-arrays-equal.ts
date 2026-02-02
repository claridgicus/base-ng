/**
 * @fileoverview Angular port of Base UI array comparison utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/areArraysEqual.ts
 */

/**
 * Function type for comparing two items of the same type.
 */
type ItemComparer<Item> = (a: Item, b: Item) => boolean;

/**
 * Compares two arrays for equality using an optional custom comparison function.
 *
 * @param array1 - The first array to compare
 * @param array2 - The second array to compare
 * @param itemComparer - Optional comparison function for items (defaults to strict equality)
 * @returns true if arrays are equal, false otherwise
 */
export function areArraysEqual<Item>(
  array1: ReadonlyArray<Item>,
  array2: ReadonlyArray<Item>,
  itemComparer: ItemComparer<Item> = (a, b) => a === b,
): boolean {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => itemComparer(value, array2[index]))
  );
}

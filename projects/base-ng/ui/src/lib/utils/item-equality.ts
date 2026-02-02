/**
 * @fileoverview Angular port of Base UI item equality utilities
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/itemEquality.ts
 */

/**
 * Function type for comparing items for equality.
 */
export type ItemEqualityComparer<Item = unknown, Value = Item> = (item: Item, value: Value) => boolean;

/**
 * Default item equality comparer using Object.is.
 */
export const defaultItemEquality: ItemEqualityComparer = (item, value) => Object.is(item, value);

/**
 * Compares two items for equality with null/undefined handling.
 *
 * @param item - The item to compare
 * @param value - The value to compare against
 * @param comparer - The comparison function to use
 * @returns true if items are equal, false otherwise
 */
export function compareItemEquality<Item, Value>(
  item: Item,
  value: Value,
  comparer: ItemEqualityComparer<Item, Value>,
): boolean {
  if (item == null || value == null) {
    return Object.is(item, value);
  }
  return comparer(item, value);
}

/**
 * Checks if a collection includes a value using a custom comparer.
 *
 * @param collection - The collection to search
 * @param value - The value to find
 * @param comparer - The comparison function to use
 * @returns true if the value is found in the collection
 */
export function itemIncludes<Item, Value>(
  collection: readonly Item[] | undefined | null,
  value: Value,
  comparer: ItemEqualityComparer<Item, Value>,
): boolean {
  if (!collection || collection.length === 0) {
    return false;
  }
  return collection.some((item) => {
    if (item === undefined) {
      return false;
    }
    return compareItemEquality(item, value, comparer);
  });
}

/**
 * Finds the index of a value in a collection using a custom comparer.
 *
 * @param collection - The collection to search
 * @param value - The value to find
 * @param comparer - The comparison function to use
 * @returns The index of the value, or -1 if not found
 */
export function findItemIndex<Item, Value>(
  collection: readonly Item[] | undefined | null,
  value: Value,
  comparer: ItemEqualityComparer<Item, Value>,
): number {
  if (!collection || collection.length === 0) {
    return -1;
  }
  return collection.findIndex((item) => {
    if (item === undefined) {
      return false;
    }
    return compareItemEquality(item, value, comparer);
  });
}

/**
 * Removes a value from a collection using a custom comparer.
 *
 * @param collection - The collection to filter
 * @param value - The value to remove
 * @param comparer - The comparison function to use
 * @returns A new array without the matching value
 */
export function removeItem<Item, Value>(
  collection: readonly Item[],
  value: Value,
  comparer: ItemEqualityComparer<Item, Value>,
): Item[] {
  return collection.filter((item) => !compareItemEquality(item, value, comparer));
}

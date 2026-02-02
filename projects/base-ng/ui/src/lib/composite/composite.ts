/**
 * @fileoverview Angular port of Base UI composite utilities
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/composite/composite.ts
 *
 * Provides keyboard navigation utilities for composite components.
 */

import type { TextDirection } from '../direction-provider';

export interface Dimensions {
  width: number;
  height: number;
}

// Keyboard constants
export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_LEFT = 'ArrowLeft';
export const ARROW_RIGHT = 'ArrowRight';
export const HOME = 'Home';
export const END = 'End';

export const HORIZONTAL_KEYS = new Set([ARROW_LEFT, ARROW_RIGHT]);
export const HORIZONTAL_KEYS_WITH_EXTRA_KEYS = new Set([ARROW_LEFT, ARROW_RIGHT, HOME, END]);
export const VERTICAL_KEYS = new Set([ARROW_UP, ARROW_DOWN]);
export const VERTICAL_KEYS_WITH_EXTRA_KEYS = new Set([ARROW_UP, ARROW_DOWN, HOME, END]);
export const ARROW_KEYS = new Set([...HORIZONTAL_KEYS, ...VERTICAL_KEYS]);
export const ALL_KEYS = new Set([...ARROW_KEYS, HOME, END]);
export const COMPOSITE_KEYS = new Set([ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, HOME, END]);

export const SHIFT = 'Shift' as const;
export const CONTROL = 'Control' as const;
export const ALT = 'Alt' as const;
export const META = 'Meta' as const;
export const MODIFIER_KEYS = new Set([SHIFT, CONTROL, ALT, META] as const);
export type ModifierKey = typeof MODIFIER_KEYS extends Set<infer Keys> ? Keys : never;

/**
 * Check if element is a native input element.
 */
export function isNativeInput(
  element: EventTarget | null
): element is HTMLInputElement | HTMLTextAreaElement {
  if (!element || !(element instanceof HTMLElement)) {
    return false;
  }
  if (element instanceof HTMLInputElement && element.selectionStart != null) {
    return true;
  }
  if (element instanceof HTMLTextAreaElement) {
    return true;
  }
  return false;
}

/**
 * Check if element is disabled.
 */
export function isElementDisabled(element: Element | null): boolean {
  if (!element) {
    return false;
  }
  if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
    return element.disabled;
  }
  return element.getAttribute('aria-disabled') === 'true';
}

/**
 * Stop event propagation and prevent default.
 */
export function stopEvent(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Check if index is out of list bounds.
 */
export function isIndexOutOfListBounds(
  elements: HTMLElement[],
  index: number
): boolean {
  return index < 0 || index >= elements.length;
}

/**
 * Check if a list index is disabled.
 */
export function isListIndexDisabled(
  elements: HTMLElement[],
  index: number,
  disabledIndices?: number[]
): boolean {
  if (disabledIndices?.includes(index)) {
    return true;
  }
  const element = elements[index];
  return isElementDisabled(element);
}

/**
 * Get the minimum non-disabled index in a list.
 */
export function getMinListIndex(
  elements: HTMLElement[],
  disabledIndices?: number[]
): number {
  for (let i = 0; i < elements.length; i++) {
    if (!isListIndexDisabled(elements, i, disabledIndices)) {
      return i;
    }
  }
  return 0;
}

/**
 * Get the maximum non-disabled index in a list.
 */
export function getMaxListIndex(
  elements: HTMLElement[],
  disabledIndices?: number[]
): number {
  for (let i = elements.length - 1; i >= 0; i--) {
    if (!isListIndexDisabled(elements, i, disabledIndices)) {
      return i;
    }
  }
  return elements.length - 1;
}

/**
 * Find a non-disabled list index.
 */
export function findNonDisabledListIndex(
  elements: HTMLElement[],
  options: {
    startingIndex: number;
    decrement?: boolean;
    disabledIndices?: number[];
  }
): number {
  const { startingIndex, decrement = false, disabledIndices } = options;
  const increment = decrement ? -1 : 1;
  let index = startingIndex + increment;

  while (index >= 0 && index < elements.length) {
    if (!isListIndexDisabled(elements, index, disabledIndices)) {
      return index;
    }
    index += increment;
  }

  return startingIndex;
}

/**
 * Create a cell map for grid navigation.
 */
export function createGridCellMap(
  sizes: Dimensions[],
  cols: number,
  dense: boolean = false
): (number | undefined)[] {
  const cellMap: (number | undefined)[] = [];
  const occupied = new Set<number>();

  for (let itemIndex = 0; itemIndex < sizes.length; itemIndex++) {
    const { width, height } = sizes[itemIndex];
    let placed = false;

    for (let cellIndex = 0; !placed; cellIndex++) {
      const row = Math.floor(cellIndex / cols);
      const col = cellIndex % cols;

      // Check if this position can accommodate the item
      let canPlace = true;
      for (let h = 0; h < height && canPlace; h++) {
        for (let w = 0; w < width && canPlace; w++) {
          const checkIndex = (row + h) * cols + (col + w);
          if (col + w >= cols || occupied.has(checkIndex)) {
            canPlace = false;
          }
        }
      }

      if (canPlace) {
        // Place the item
        for (let h = 0; h < height; h++) {
          for (let w = 0; w < width; w++) {
            const placeIndex = (row + h) * cols + (col + w);
            cellMap[placeIndex] = itemIndex;
            occupied.add(placeIndex);
          }
        }
        placed = true;
      } else if (!dense) {
        // If not dense, move to next row when blocked
        const nextRow = row + 1;
        cellIndex = nextRow * cols - 1;
      }
    }
  }

  return cellMap;
}

/**
 * Get grid cell indices for given item indices.
 */
export function getGridCellIndices(
  itemIndices: (number | undefined)[],
  cellMap: (number | undefined)[]
): number[] {
  const cellIndices: number[] = [];
  for (let cellIndex = 0; cellIndex < cellMap.length; cellIndex++) {
    if (itemIndices.includes(cellMap[cellIndex])) {
      cellIndices.push(cellIndex);
    }
  }
  return cellIndices;
}

/**
 * Get grid cell index of a corner for an item.
 */
export function getGridCellIndexOfCorner(
  itemIndex: number,
  sizes: Dimensions[],
  cellMap: (number | undefined)[],
  cols: number,
  corner: 'tl' | 'tr' | 'bl' | 'br'
): number {
  // Find the first cell that contains this item
  const firstCellIndex = cellMap.indexOf(itemIndex);
  if (firstCellIndex === -1) {
    return 0;
  }

  const size = sizes[itemIndex] || { width: 1, height: 1 };
  const row = Math.floor(firstCellIndex / cols);
  const col = firstCellIndex % cols;

  switch (corner) {
    case 'tl':
      return firstCellIndex;
    case 'tr':
      return row * cols + (col + size.width - 1);
    case 'bl':
      return (row + size.height - 1) * cols + col;
    case 'br':
      return (row + size.height - 1) * cols + (col + size.width - 1);
    default:
      return firstCellIndex;
  }
}

/**
 * Get navigated grid index based on keyboard event.
 */
export function getGridNavigatedIndex(
  elements: HTMLElement[],
  options: {
    event: KeyboardEvent;
    orientation: 'horizontal' | 'vertical' | 'both';
    loopFocus: boolean;
    cols: number;
    disabledIndices: number[];
    minIndex: number;
    maxIndex: number;
    prevIndex: number;
    rtl: boolean;
  }
): number {
  const {
    event,
    orientation,
    loopFocus,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    rtl,
  } = options;

  const row = Math.floor(prevIndex / cols);
  const col = prevIndex % cols;
  let nextIndex = prevIndex;

  const horizontalForwardKey = rtl ? ARROW_LEFT : ARROW_RIGHT;
  const horizontalBackwardKey = rtl ? ARROW_RIGHT : ARROW_LEFT;

  switch (event.key) {
    case ARROW_UP:
      if (orientation !== 'horizontal') {
        nextIndex = (row - 1) * cols + col;
        if (nextIndex < 0) {
          nextIndex = loopFocus ? maxIndex : prevIndex;
        }
      }
      break;
    case ARROW_DOWN:
      if (orientation !== 'horizontal') {
        nextIndex = (row + 1) * cols + col;
        if (nextIndex > maxIndex) {
          nextIndex = loopFocus ? minIndex : prevIndex;
        }
      }
      break;
    case horizontalBackwardKey:
      if (orientation !== 'vertical') {
        nextIndex = prevIndex - 1;
        if (nextIndex < 0) {
          nextIndex = loopFocus ? maxIndex : prevIndex;
        }
      }
      break;
    case horizontalForwardKey:
      if (orientation !== 'vertical') {
        nextIndex = prevIndex + 1;
        if (nextIndex > maxIndex) {
          nextIndex = loopFocus ? minIndex : prevIndex;
        }
      }
      break;
    case HOME:
      nextIndex = minIndex;
      break;
    case END:
      nextIndex = maxIndex;
      break;
  }

  // Skip disabled indices
  while (disabledIndices.includes(nextIndex) && nextIndex !== prevIndex) {
    if (event.key === ARROW_UP || event.key === horizontalBackwardKey) {
      nextIndex--;
      if (nextIndex < minIndex) {
        nextIndex = loopFocus ? maxIndex : prevIndex;
        break;
      }
    } else {
      nextIndex++;
      if (nextIndex > maxIndex) {
        nextIndex = loopFocus ? minIndex : prevIndex;
        break;
      }
    }
  }

  return nextIndex;
}

/**
 * Scroll element into view if needed.
 */
export function scrollIntoViewIfNeeded(
  scrollContainer: HTMLElement | null,
  element: HTMLElement | null,
  direction: TextDirection,
  orientation: 'horizontal' | 'vertical' | 'both'
): void {
  if (!scrollContainer || !element) {
    return;
  }

  const containerRect = scrollContainer.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth;
  const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight;

  if (isOverflowingX && orientation !== 'vertical') {
    if (elementRect.right > containerRect.right) {
      scrollContainer.scrollLeft += elementRect.right - containerRect.right;
    } else if (elementRect.left < containerRect.left) {
      scrollContainer.scrollLeft -= containerRect.left - elementRect.left;
    }
  }

  if (isOverflowingY && orientation !== 'horizontal') {
    if (elementRect.bottom > containerRect.bottom) {
      scrollContainer.scrollTop += elementRect.bottom - containerRect.bottom;
    } else if (elementRect.top < containerRect.top) {
      scrollContainer.scrollTop -= containerRect.top - elementRect.top;
    }
  }
}

/**
 * Check if a modifier key is pressed.
 */
export function isModifierKeySet(
  event: KeyboardEvent,
  ignoredModifierKeys: ModifierKey[] = []
): boolean {
  for (const key of MODIFIER_KEYS.values()) {
    if (ignoredModifierKeys.includes(key)) {
      continue;
    }
    if (event.getModifierState(key)) {
      return true;
    }
  }
  return false;
}

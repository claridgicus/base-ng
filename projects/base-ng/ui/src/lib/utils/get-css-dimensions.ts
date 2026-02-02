/**
 * @fileoverview Angular port of Base UI CSS dimensions utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/getCssDimensions.ts
 */

/**
 * Interface for dimension values.
 */
export interface CssDimensions {
  width: number;
  height: number;
}

/**
 * Gets the CSS dimensions of an element.
 * Handles edge cases where computed styles may not match actual dimensions.
 *
 * @param element - The DOM element to measure
 * @returns The width and height of the element
 */
export function getCssDimensions(element: Element): CssDimensions {
  const computedStyle = getComputedStyle(element);
  let width = parseFloat(computedStyle.width) || 0;
  let height = parseFloat(computedStyle.height) || 0;

  // Check if element is HTML element (has offsetWidth/offsetHeight)
  const isHTMLElement = element instanceof HTMLElement;
  const hasOffsetDimensions = isHTMLElement;

  // In some environments (like test environments), the width and height properties
  // may not match the actual offset dimensions due to rendering quirks
  if (hasOffsetDimensions) {
    const htmlElement = element as HTMLElement;
    const { offsetWidth, offsetHeight } = htmlElement;

    // Use offset dimensions if CSS values don't match
    if (Math.round(width) !== offsetWidth) {
      width = offsetWidth;
    }
    if (Math.round(height) !== offsetHeight) {
      height = offsetHeight;
    }
  }

  return { width, height };
}

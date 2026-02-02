/**
 * @fileoverview Angular port of Base UI utilities
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/
 */

// Math utilities
export { clamp } from './clamp';
export { valueToPercent } from './value-to-percent';

// Array utilities
export { areArraysEqual } from './are-arrays-equal';

// Item equality utilities
export {
  compareItemEquality,
  defaultItemEquality,
  findItemIndex,
  itemIncludes,
  removeItem,
} from './item-equality';
export type { ItemEqualityComparer } from './item-equality';

// Number formatting utilities
export {
  formatNumber,
  formatNumberMaxPrecision,
  formatNumberValue,
  getFormatter,
  numberFormatCache,
} from './format-number';

// Value utilities
export { serializeValue } from './serialize-value';

// Class name and style resolution
export { resolveClassName } from './resolve-class-name';
export { resolveStyle } from './resolve-style';
export type { CSSStyleProperties } from './resolve-style';

// State attributes
export {
  getStateAttributes,
  transitionStatusMapping,
  TransitionStatusDataAttributes,
} from './get-state-attributes';
export type { StateAttributesMapping, TransitionStatus } from './get-state-attributes';

// CSS utilities
export { getCssDimensions } from './get-css-dimensions';
export type { CssDimensions } from './get-css-dimensions';

// Misc utilities
export { NOOP } from './noop';

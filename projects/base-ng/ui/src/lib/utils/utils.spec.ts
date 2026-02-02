/**
 * @fileoverview Tests for Base UI utilities
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/
 */
import { describe, expect, it } from 'vitest';
import {
  areArraysEqual,
  clamp,
  compareItemEquality,
  defaultItemEquality,
  findItemIndex,
  formatNumber,
  formatNumberMaxPrecision,
  formatNumberValue,
  getCssDimensions,
  getStateAttributes,
  itemIncludes,
  NOOP,
  removeItem,
  resolveClassName,
  resolveStyle,
  serializeValue,
  TransitionStatusDataAttributes,
  transitionStatusMapping,
  valueToPercent,
} from './index';

describe('clamp', () => {
  it('should return value if within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should clamp to minimum if value is below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('should clamp to maximum if value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should work with default bounds', () => {
    expect(clamp(5)).toBe(5);
    expect(clamp(Number.MAX_SAFE_INTEGER + 1)).toBe(Number.MAX_SAFE_INTEGER);
    expect(clamp(Number.MIN_SAFE_INTEGER - 1)).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('should handle edge cases', () => {
    expect(clamp(0, 0, 0)).toBe(0);
    expect(clamp(5, 5, 5)).toBe(5);
  });
});

describe('valueToPercent', () => {
  it('should convert value to percentage', () => {
    expect(valueToPercent(50, 0, 100)).toBe(50);
    expect(valueToPercent(5, 0, 10)).toBe(50);
    expect(valueToPercent(0, 0, 100)).toBe(0);
    expect(valueToPercent(100, 0, 100)).toBe(100);
  });

  it('should handle negative ranges', () => {
    expect(valueToPercent(0, -100, 100)).toBe(50);
    expect(valueToPercent(-50, -100, 0)).toBe(50);
  });
});

describe('areArraysEqual', () => {
  it('should return true for equal arrays', () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(areArraysEqual([], [])).toBe(true);
  });

  it('should return false for arrays with different lengths', () => {
    expect(areArraysEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('should return false for arrays with different values', () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('should use custom comparer', () => {
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    expect(areArraysEqual([{ id: 1 }], [{ id: 1 }], comparer)).toBe(true);
    expect(areArraysEqual([{ id: 1 }], [{ id: 2 }], comparer)).toBe(false);
  });
});

describe('item equality utilities', () => {
  describe('defaultItemEquality', () => {
    it('should use Object.is for comparison', () => {
      expect(defaultItemEquality(1, 1)).toBe(true);
      expect(defaultItemEquality('a', 'a')).toBe(true);
      expect(defaultItemEquality({}, {})).toBe(false);
      expect(defaultItemEquality(NaN, NaN)).toBe(true);
    });
  });

  describe('compareItemEquality', () => {
    it('should handle null values', () => {
      expect(compareItemEquality(null, null, defaultItemEquality)).toBe(true);
      expect(compareItemEquality(null, 1, defaultItemEquality)).toBe(false);
      expect(compareItemEquality(1, null, defaultItemEquality)).toBe(false);
    });

    it('should use comparer for non-null values', () => {
      const comparer = (a: number, b: number) => a === b;
      expect(compareItemEquality(1, 1, comparer)).toBe(true);
      expect(compareItemEquality(1, 2, comparer)).toBe(false);
    });
  });

  describe('itemIncludes', () => {
    it('should return false for empty collections', () => {
      expect(itemIncludes([], 1, defaultItemEquality)).toBe(false);
      expect(itemIncludes(null, 1, defaultItemEquality)).toBe(false);
      expect(itemIncludes(undefined, 1, defaultItemEquality)).toBe(false);
    });

    it('should find items in collection', () => {
      expect(itemIncludes([1, 2, 3], 2, defaultItemEquality)).toBe(true);
      expect(itemIncludes([1, 2, 3], 4, defaultItemEquality)).toBe(false);
    });
  });

  describe('findItemIndex', () => {
    it('should return -1 for empty collections', () => {
      expect(findItemIndex([], 1, defaultItemEquality)).toBe(-1);
      expect(findItemIndex(null, 1, defaultItemEquality)).toBe(-1);
    });

    it('should find item index', () => {
      expect(findItemIndex([1, 2, 3], 2, defaultItemEquality)).toBe(1);
      expect(findItemIndex([1, 2, 3], 4, defaultItemEquality)).toBe(-1);
    });
  });

  describe('removeItem', () => {
    it('should remove item from collection', () => {
      expect(removeItem([1, 2, 3], 2, defaultItemEquality)).toEqual([1, 3]);
    });

    it('should return original if item not found', () => {
      const result = removeItem([1, 2, 3], 4, defaultItemEquality);
      expect(result).toEqual([1, 2, 3]);
    });
  });
});

describe('formatNumber', () => {
  it('should return empty string for null', () => {
    expect(formatNumber(null)).toBe('');
  });

  it('should format number with default locale', () => {
    const result = formatNumber(1234.56);
    expect(result).toContain('1');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format number with specific locale', () => {
    const result = formatNumber(1234.56, 'en-US');
    expect(result).toBe('1,234.56');
  });
});

describe('formatNumberMaxPrecision', () => {
  it('should format with maximum precision', () => {
    const result = formatNumberMaxPrecision(1.123456789012345, 'en-US');
    expect(result).toContain('1.123456789012345');
  });
});

describe('formatNumberValue', () => {
  it('should return empty string for null', () => {
    expect(formatNumberValue(null)).toBe('');
  });

  it('should format as percentage by default', () => {
    const result = formatNumberValue(50, 'en-US');
    expect(result).toBe('50%');
  });

  it('should use custom format if provided', () => {
    const result = formatNumberValue(1234, 'en-US', { style: 'currency', currency: 'USD' });
    expect(result).toBe('$1,234.00');
  });
});

describe('serializeValue', () => {
  it('should return empty string for null/undefined', () => {
    expect(serializeValue(null)).toBe('');
    expect(serializeValue(undefined)).toBe('');
  });

  it('should return string as-is', () => {
    expect(serializeValue('hello')).toBe('hello');
  });

  it('should stringify objects', () => {
    expect(serializeValue({ a: 1 })).toBe('{"a":1}');
  });

  it('should stringify arrays', () => {
    expect(serializeValue([1, 2, 3])).toBe('[1,2,3]');
  });

  it('should handle numbers', () => {
    expect(serializeValue(123)).toBe('123');
  });
});

describe('resolveClassName', () => {
  it('should return string className as-is', () => {
    expect(resolveClassName('my-class', {})).toBe('my-class');
  });

  it('should return undefined for undefined className', () => {
    expect(resolveClassName(undefined, {})).toBeUndefined();
  });

  it('should call function with state', () => {
    const classNameFn = (state: { active: boolean }) => (state.active ? 'active' : 'inactive');
    expect(resolveClassName(classNameFn, { active: true })).toBe('active');
    expect(resolveClassName(classNameFn, { active: false })).toBe('inactive');
  });
});

describe('resolveStyle', () => {
  it('should return style object as-is', () => {
    const style = { color: 'red' };
    expect(resolveStyle(style, {})).toBe(style);
  });

  it('should return undefined for undefined style', () => {
    expect(resolveStyle(undefined, {})).toBeUndefined();
  });

  it('should call function with state', () => {
    const styleFn = (state: { active: boolean }) => (state.active ? { color: 'green' } : { color: 'gray' });
    expect(resolveStyle(styleFn, { active: true })).toEqual({ color: 'green' });
    expect(resolveStyle(styleFn, { active: false })).toEqual({ color: 'gray' });
  });
});

describe('getStateAttributes', () => {
  it('should convert boolean true to empty data attribute', () => {
    expect(getStateAttributes({ disabled: true })).toEqual({ 'data-disabled': '' });
  });

  it('should convert truthy values to data attribute with value', () => {
    expect(getStateAttributes({ status: 'active' })).toEqual({ 'data-status': 'active' });
  });

  it('should not include falsy values', () => {
    expect(getStateAttributes({ disabled: false })).toEqual({});
    expect(getStateAttributes({ value: '' })).toEqual({});
    expect(getStateAttributes({ count: 0 })).toEqual({});
  });

  it('should use custom mapping if provided', () => {
    const customMapping = {
      status: (value: string) => (value === 'active' ? { 'data-is-active': '' } : null),
    };
    expect(getStateAttributes({ status: 'active' }, customMapping)).toEqual({ 'data-is-active': '' });
    expect(getStateAttributes({ status: 'inactive' }, customMapping)).toEqual({});
  });
});

describe('transitionStatusMapping', () => {
  it('should return starting style for starting status', () => {
    expect(transitionStatusMapping.transitionStatus!('starting')).toEqual({
      [TransitionStatusDataAttributes.startingStyle]: '',
    });
  });

  it('should return ending style for ending status', () => {
    expect(transitionStatusMapping.transitionStatus!('ending')).toEqual({
      [TransitionStatusDataAttributes.endingStyle]: '',
    });
  });

  it('should return null for undefined status', () => {
    expect(transitionStatusMapping.transitionStatus!(undefined)).toBeNull();
  });
});

describe('getCssDimensions', () => {
  it('should return dimensions object', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.height = '50px';
    document.body.appendChild(element);

    const dimensions = getCssDimensions(element);
    expect(dimensions).toHaveProperty('width');
    expect(dimensions).toHaveProperty('height');
    expect(typeof dimensions.width).toBe('number');
    expect(typeof dimensions.height).toBe('number');

    document.body.removeChild(element);
  });
});

describe('NOOP', () => {
  it('should be a function', () => {
    expect(typeof NOOP).toBe('function');
  });

  it('should return undefined', () => {
    expect(NOOP()).toBeUndefined();
  });

  it('should not throw', () => {
    expect(() => NOOP()).not.toThrow();
  });
});

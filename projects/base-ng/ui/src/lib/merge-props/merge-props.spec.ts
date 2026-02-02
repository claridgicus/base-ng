/**
 * @fileoverview Tests for merge-props utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/merge-props/mergeProps.test.ts
 */
import { describe, expect, it, vi } from 'vitest';
import {
  isBaseUIHandlerPrevented,
  mergeProps,
  mergePropsN,
  preventBaseUIHandler,
} from './merge-props';

describe('mergeProps', () => {
  describe('basic merging', () => {
    it('should return empty object when no props provided', () => {
      expect(mergeProps()).toEqual({});
    });

    it('should return single props object unchanged', () => {
      const props = { foo: 'bar', num: 42 };
      expect(mergeProps(props)).toEqual(props);
    });

    it('should merge multiple props objects', () => {
      const props1 = { a: 1 };
      const props2 = { b: 2 };
      const props3 = { c: 3 };
      expect(mergeProps(props1, props2, props3)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should allow rightmost props to override', () => {
      const props1 = { a: 1, b: 1 };
      const props2 = { b: 2, c: 2 };
      expect(mergeProps(props1, props2)).toEqual({ a: 1, b: 2, c: 2 });
    });

    it('should skip undefined values', () => {
      const props1 = { a: 1, b: 2 };
      const props2 = { a: undefined, c: 3 };
      expect(mergeProps(props1, props2)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should handle null props', () => {
      const props1 = { a: 1 };
      expect(mergeProps(props1, null, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('should handle undefined props', () => {
      const props1 = { a: 1 };
      expect(mergeProps(props1, undefined, { b: 2 })).toEqual({ a: 1, b: 2 });
    });
  });

  describe('event handler merging', () => {
    it('should merge event handlers', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const merged = mergeProps({ onClick: handler1 }, { onClick: handler2 });
      const event = new MouseEvent('click');
      (merged.onClick as (e: Event) => void)(event);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    it('should call handlers in right-to-left order', () => {
      const callOrder: number[] = [];
      const handler1 = vi.fn(() => callOrder.push(1));
      const handler2 = vi.fn(() => callOrder.push(2));
      const handler3 = vi.fn(() => callOrder.push(3));

      const merged = mergeProps({ onClick: handler1 }, { onClick: handler2 }, { onClick: handler3 });
      const event = new MouseEvent('click');
      (merged.onClick as (e: Event) => void)(event);

      expect(callOrder).toEqual([3, 2, 1]);
    });

    it('should allow preventing earlier handlers', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn((event: Event) => {
        preventBaseUIHandler(event);
      });

      const merged = mergeProps({ onClick: handler1 }, { onClick: handler2 });
      const event = new MouseEvent('click');
      (merged.onClick as (e: Event) => void)(event);

      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler1).not.toHaveBeenCalled();
    });

    it('should detect event handlers correctly', () => {
      const onClickHandler = vi.fn();
      const onMouseEnterHandler = vi.fn();
      const someOtherProp = 'not a handler';

      const merged = mergeProps(
        { onClick: onClickHandler, someOtherProp },
        { onClick: vi.fn(), onMouseEnter: onMouseEnterHandler },
      );

      expect(typeof merged.onClick).toBe('function');
      expect(typeof merged.onMouseEnter).toBe('function');
      expect(merged.someOtherProp).toBe('not a handler');
    });

    it('should handle single event handler', () => {
      const handler = vi.fn();
      const merged = mergeProps({ onClick: handler });
      const event = new MouseEvent('click');
      (merged.onClick as (e: Event) => void)(event);
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should handle undefined handler in merge', () => {
      const handler = vi.fn();
      const merged = mergeProps({ onClick: handler }, { otherProp: 'value' });
      const event = new MouseEvent('click');
      (merged.onClick as (e: Event) => void)(event);
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('className merging', () => {
    it('should concatenate className values', () => {
      const merged = mergeProps({ className: 'class1' }, { className: 'class2' });
      expect(merged.className).toBe('class2 class1');
    });

    it('should handle single className', () => {
      const merged = mergeProps({ className: 'single' });
      expect(merged.className).toBe('single');
    });

    it('should handle undefined className', () => {
      const merged = mergeProps({ className: 'class1' }, { otherProp: 'value' });
      expect(merged.className).toBe('class1');
    });

    it('should concatenate multiple classNames', () => {
      const merged = mergeProps(
        { className: 'a' },
        { className: 'b' },
        { className: 'c' },
      );
      expect(merged.className).toBe('c b a');
    });

    it('should also handle class attribute (Angular style)', () => {
      const merged = mergeProps({ class: 'class1' }, { class: 'class2' });
      expect(merged.class).toBe('class2 class1');
    });
  });

  describe('style merging', () => {
    it('should merge style objects', () => {
      const merged = mergeProps(
        { style: { color: 'red', fontSize: '12px' } },
        { style: { color: 'blue', fontWeight: 'bold' } },
      );
      expect(merged.style).toEqual({
        color: 'blue',
        fontSize: '12px',
        fontWeight: 'bold',
      });
    });

    it('should handle single style', () => {
      const style = { color: 'red' };
      const merged = mergeProps({ style });
      expect(merged.style).toEqual(style);
    });

    it('should handle undefined style', () => {
      const merged = mergeProps({ style: { color: 'red' } }, { otherProp: 'value' });
      expect(merged.style).toEqual({ color: 'red' });
    });
  });

  describe('function props', () => {
    it('should resolve function props', () => {
      const merged = mergeProps(
        { a: 1, b: 2 },
        (prevProps: Record<string, unknown>) => ({
          ...prevProps,
          b: (prevProps['b'] as number) * 2,
          c: 3,
        }),
      );
      expect(merged).toEqual({ a: 1, b: 4, c: 3 });
    });

    it('should allow function props to access merged props', () => {
      const merged = mergeProps(
        { count: 1 },
        { count: 2 },
        (prevProps: Record<string, unknown>) => ({
          count: (prevProps['count'] as number) + 10,
        }),
      );
      expect(merged['count']).toBe(12);
    });
  });
});

describe('mergePropsN', () => {
  it('should merge array of props', () => {
    const result = mergePropsN([{ a: 1 }, { b: 2 }, { c: 3 }]);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should work the same as mergeProps', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const result = mergePropsN([
      { onClick: handler1, className: 'a' },
      { onClick: handler2, className: 'b' },
    ]);

    expect(result['className']).toBe('b a');
    expect(typeof result['onClick']).toBe('function');
  });

  it('should handle empty array', () => {
    expect(mergePropsN([])).toEqual({});
  });
});

describe('preventBaseUIHandler', () => {
  it('should prevent handler on event', () => {
    const event = new MouseEvent('click');
    preventBaseUIHandler(event);
    expect(isBaseUIHandlerPrevented(event)).toBe(true);
  });

  it('should return false for non-prevented event', () => {
    const event = new MouseEvent('click');
    expect(isBaseUIHandlerPrevented(event)).toBe(false);
  });
});

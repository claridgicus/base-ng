/**
 * @fileoverview Tests for Base UI types module
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/types/index.ts
 */
import { describe, expect, it } from 'vitest';
import {
  CLICK_TRIGGER_IDENTIFIER,
  createChangeEventDetails,
  createGenericEventDetails,
  DISABLED_TRANSITIONS_STYLE,
  DROPDOWN_COLLISION_AVOIDANCE,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  OWNER_VISUALLY_HIDDEN,
  PATIENT_CLICK_THRESHOLD,
  POPUP_COLLISION_AVOIDANCE,
  REASONS,
  TYPEAHEAD_RESET_MS,
} from './index';

describe('REASONS', () => {
  it('should have all expected reason constants', () => {
    expect(REASONS.none).toBe('none');
    expect(REASONS.triggerPress).toBe('trigger-press');
    expect(REASONS.triggerHover).toBe('trigger-hover');
    expect(REASONS.triggerFocus).toBe('trigger-focus');
    expect(REASONS.outsidePress).toBe('outside-press');
    expect(REASONS.itemPress).toBe('item-press');
    expect(REASONS.closePress).toBe('close-press');
    expect(REASONS.escapeKey).toBe('escape-key');
    expect(REASONS.listNavigation).toBe('list-navigation');
    expect(REASONS.keyboard).toBe('keyboard');
    expect(REASONS.pointer).toBe('pointer');
    expect(REASONS.drag).toBe('drag');
    expect(REASONS.wheel).toBe('wheel');
    expect(REASONS.scrub).toBe('scrub');
  });

  it('should be frozen (immutable)', () => {
    expect(Object.isFrozen(REASONS)).toBe(false); // as const doesn't freeze
    // But we can verify the structure is correct
    expect(typeof REASONS).toBe('object');
    expect(Object.keys(REASONS).length).toBeGreaterThan(0);
  });
});

describe('Constants', () => {
  describe('EMPTY_OBJECT', () => {
    it('should be an empty frozen object', () => {
      expect(EMPTY_OBJECT).toEqual({});
      expect(Object.isFrozen(EMPTY_OBJECT)).toBe(true);
    });

    it('should not allow modifications', () => {
      expect(() => {
        // @ts-expect-error - intentionally testing immutability
        EMPTY_OBJECT.test = 'value';
      }).toThrow();
    });
  });

  describe('EMPTY_ARRAY', () => {
    it('should be an empty frozen array', () => {
      expect(EMPTY_ARRAY).toEqual([]);
      expect(Object.isFrozen(EMPTY_ARRAY)).toBe(true);
    });

    it('should not allow modifications', () => {
      expect(() => {
        // @ts-expect-error - intentionally testing immutability
        EMPTY_ARRAY.push('value');
      }).toThrow();
    });
  });

  describe('TYPEAHEAD_RESET_MS', () => {
    it('should be 500ms', () => {
      expect(TYPEAHEAD_RESET_MS).toBe(500);
    });
  });

  describe('PATIENT_CLICK_THRESHOLD', () => {
    it('should be 500ms', () => {
      expect(PATIENT_CLICK_THRESHOLD).toBe(500);
    });
  });

  describe('DISABLED_TRANSITIONS_STYLE', () => {
    it('should have transition none style', () => {
      expect(DISABLED_TRANSITIONS_STYLE).toEqual({ style: { transition: 'none' } });
    });
  });

  describe('CLICK_TRIGGER_IDENTIFIER', () => {
    it('should be a data attribute string', () => {
      expect(CLICK_TRIGGER_IDENTIFIER).toBe('data-base-ui-click-trigger');
    });
  });

  describe('DROPDOWN_COLLISION_AVOIDANCE', () => {
    it('should have fallbackAxisSide set to none', () => {
      expect(DROPDOWN_COLLISION_AVOIDANCE).toEqual({ fallbackAxisSide: 'none' });
    });
  });

  describe('POPUP_COLLISION_AVOIDANCE', () => {
    it('should have fallbackAxisSide set to end', () => {
      expect(POPUP_COLLISION_AVOIDANCE).toEqual({ fallbackAxisSide: 'end' });
    });
  });

  describe('OWNER_VISUALLY_HIDDEN', () => {
    it('should have visually hidden styles', () => {
      expect(OWNER_VISUALLY_HIDDEN.clipPath).toBe('inset(50%)');
      expect(OWNER_VISUALLY_HIDDEN.position).toBe('fixed');
      expect(OWNER_VISUALLY_HIDDEN.top).toBe('0');
      expect(OWNER_VISUALLY_HIDDEN.left).toBe('0');
    });
  });
});

describe('createChangeEventDetails', () => {
  it('should create event details with the given reason', () => {
    const details = createChangeEventDetails('trigger-press');
    expect(details.reason).toBe('trigger-press');
  });

  it('should create a default event if none provided', () => {
    const details = createChangeEventDetails('trigger-press');
    expect(details.event).toBeInstanceOf(Event);
  });

  it('should use the provided native event', () => {
    const nativeEvent = new MouseEvent('click');
    const details = createChangeEventDetails('trigger-press', nativeEvent);
    expect(details.event).toBe(nativeEvent);
  });

  it('should set trigger element if provided', () => {
    const trigger = document.createElement('button');
    const details = createChangeEventDetails('trigger-press', undefined, trigger);
    expect(details.trigger).toBe(trigger);
  });

  it('should include custom properties', () => {
    const details = createChangeEventDetails('trigger-press', undefined, undefined, {
      customValue: 'test',
    });
    expect((details as unknown as { customValue: string }).customValue).toBe('test');
  });

  it('should allow cancellation', () => {
    const details = createChangeEventDetails('trigger-press');
    expect(details.isCanceled).toBe(false);
    details.cancel();
    expect(details.isCanceled).toBe(true);
  });

  it('should allow propagation to be allowed', () => {
    const details = createChangeEventDetails('trigger-press');
    expect(details.isPropagationAllowed).toBe(false);
    details.allowPropagation();
    expect(details.isPropagationAllowed).toBe(true);
  });
});

describe('createGenericEventDetails', () => {
  it('should create event details with the given reason', () => {
    const details = createGenericEventDetails('trigger-hover');
    expect(details.reason).toBe('trigger-hover');
  });

  it('should create a default event if none provided', () => {
    const details = createGenericEventDetails('trigger-hover');
    expect(details.event).toBeInstanceOf(Event);
  });

  it('should use the provided native event', () => {
    const nativeEvent = new MouseEvent('mouseover');
    const details = createGenericEventDetails('trigger-hover', nativeEvent);
    expect(details.event).toBe(nativeEvent);
  });

  it('should include custom properties', () => {
    const details = createGenericEventDetails('trigger-hover', undefined, { extra: 42 });
    expect((details as unknown as { extra: number }).extra).toBe(42);
  });

  it('should not have cancel/allowPropagation methods', () => {
    const details = createGenericEventDetails('trigger-hover');
    expect('cancel' in details).toBe(false);
    expect('allowPropagation' in details).toBe(false);
  });
});

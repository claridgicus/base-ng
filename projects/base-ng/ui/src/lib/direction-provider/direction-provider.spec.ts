/**
 * @fileoverview Tests for direction provider
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/direction-provider/
 */
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import {
  DIRECTION_CONFIG,
  DirectionService,
  provideDirection,
} from './direction-provider.service';

describe('DirectionService', () => {
  describe('with default configuration', () => {
    let service: DirectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DirectionService],
      });
      service = TestBed.inject(DirectionService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should default to ltr', () => {
      expect(service.direction()).toBe('ltr');
    });

    it('should have isLtr as true by default', () => {
      expect(service.isLtr()).toBe(true);
    });

    it('should have isRtl as false by default', () => {
      expect(service.isRtl()).toBe(false);
    });

    it('should return left as start side for ltr', () => {
      expect(service.getStartSide()).toBe('left');
    });

    it('should return right as end side for ltr', () => {
      expect(service.getEndSide()).toBe('right');
    });

    it('should return direction styles', () => {
      expect(service.getDirectionStyles()).toEqual({ direction: 'ltr' });
    });
  });

  describe('with RTL configuration', () => {
    let service: DirectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DirectionService, provideDirection('rtl')],
      });
      service = TestBed.inject(DirectionService);
    });

    it('should use provided direction', () => {
      expect(service.direction()).toBe('rtl');
    });

    it('should have isRtl as true', () => {
      expect(service.isRtl()).toBe(true);
    });

    it('should have isLtr as false', () => {
      expect(service.isLtr()).toBe(false);
    });

    it('should return right as start side for rtl', () => {
      expect(service.getStartSide()).toBe('right');
    });

    it('should return left as end side for rtl', () => {
      expect(service.getEndSide()).toBe('left');
    });

    it('should return rtl direction styles', () => {
      expect(service.getDirectionStyles()).toEqual({ direction: 'rtl' });
    });
  });

  describe('setters and toggles', () => {
    let service: DirectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DirectionService],
      });
      service = TestBed.inject(DirectionService);
    });

    it('should update direction', () => {
      service.setDirection('rtl');
      expect(service.direction()).toBe('rtl');
      expect(service.isRtl()).toBe(true);
    });

    it('should toggle direction from ltr to rtl', () => {
      expect(service.direction()).toBe('ltr');
      service.toggleDirection();
      expect(service.direction()).toBe('rtl');
    });

    it('should toggle direction from rtl to ltr', () => {
      service.setDirection('rtl');
      service.toggleDirection();
      expect(service.direction()).toBe('ltr');
    });

    it('should update computed signals reactively', () => {
      expect(service.isLtr()).toBe(true);
      expect(service.isRtl()).toBe(false);

      service.setDirection('rtl');

      expect(service.isLtr()).toBe(false);
      expect(service.isRtl()).toBe(true);
    });
  });
});

describe('provideDirection', () => {
  it('should return provider array', () => {
    const providers = provideDirection('rtl');
    expect(Array.isArray(providers)).toBe(true);
    expect(providers.length).toBe(1);
  });

  it('should provide DIRECTION_CONFIG token', () => {
    const providers = provideDirection('ltr');
    const provider = providers[0] as { provide: unknown; useValue: unknown };
    expect(provider.provide).toBe(DIRECTION_CONFIG);
  });

  it('should set direction in config', () => {
    const providers = provideDirection('rtl');
    const provider = providers[0] as { provide: unknown; useValue: { direction: string } };
    expect(provider.useValue.direction).toBe('rtl');
  });
});

describe('DIRECTION_CONFIG injection token', () => {
  it('should have default factory returning ltr', () => {
    TestBed.configureTestingModule({});
    const config = TestBed.inject(DIRECTION_CONFIG);
    expect(config.direction).toBe('ltr');
  });
});

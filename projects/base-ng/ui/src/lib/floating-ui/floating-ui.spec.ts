/**
 * @fileoverview Tests for floating-ui module
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/floating-ui-react/
 */
import { Component, signal, viewChild, type ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import {
  FloatingDirective,
  FloatingService,
  floatingMiddleware,
  getAlignment,
  getOppositeSide,
  getOppositeAlignment,
  getSide,
  offset,
  flip,
  shift,
} from './index';

describe('Floating UI Types', () => {
  describe('getSide', () => {
    it('should extract side from placement', () => {
      expect(getSide('top')).toBe('top');
      expect(getSide('bottom')).toBe('bottom');
      expect(getSide('left')).toBe('left');
      expect(getSide('right')).toBe('right');
      expect(getSide('top-start')).toBe('top');
      expect(getSide('bottom-end')).toBe('bottom');
    });
  });

  describe('getAlignment', () => {
    it('should extract alignment from placement', () => {
      expect(getAlignment('top')).toBeUndefined();
      expect(getAlignment('top-start')).toBe('start');
      expect(getAlignment('top-end')).toBe('end');
      expect(getAlignment('bottom-start')).toBe('start');
    });
  });

  describe('getOppositeSide', () => {
    it('should return opposite side', () => {
      expect(getOppositeSide('top')).toBe('bottom');
      expect(getOppositeSide('bottom')).toBe('top');
      expect(getOppositeSide('left')).toBe('right');
      expect(getOppositeSide('right')).toBe('left');
    });
  });

  describe('getOppositeAlignment', () => {
    it('should return opposite alignment', () => {
      expect(getOppositeAlignment('start')).toBe('end');
      expect(getOppositeAlignment('end')).toBe('start');
    });
  });
});

describe('floatingMiddleware', () => {
  it('should export offset middleware', () => {
    expect(typeof floatingMiddleware.offset).toBe('function');
    expect(floatingMiddleware.offset).toBe(offset);
  });

  it('should export flip middleware', () => {
    expect(typeof floatingMiddleware.flip).toBe('function');
    expect(floatingMiddleware.flip).toBe(flip);
  });

  it('should export shift middleware', () => {
    expect(typeof floatingMiddleware.shift).toBe('function');
    expect(floatingMiddleware.shift).toBe(shift);
  });

  it('should export all expected middleware', () => {
    expect(floatingMiddleware.offset).toBeDefined();
    expect(floatingMiddleware.flip).toBeDefined();
    expect(floatingMiddleware.shift).toBeDefined();
    expect(floatingMiddleware.limitShift).toBeDefined();
    expect(floatingMiddleware.size).toBeDefined();
    expect(floatingMiddleware.hide).toBeDefined();
    expect(floatingMiddleware.autoPlacement).toBeDefined();
    expect(floatingMiddleware.inline).toBeDefined();
    expect(floatingMiddleware.arrow).toBeDefined();
  });
});

describe('FloatingService', () => {
  let service: FloatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloatingService],
    });
    service = TestBed.inject(FloatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default signal values', () => {
    expect(service.x()).toBe(0);
    expect(service.y()).toBe(0);
    expect(service.placement()).toBe('bottom');
    expect(service.strategy()).toBe('absolute');
    expect(service.isPositioned()).toBe(false);
  });

  it('should update strategy when configured', () => {
    service.configure({ strategy: 'fixed' });
    expect(service.strategy()).toBe('fixed');
  });

  it('should update placement when configured', () => {
    service.configure({ placement: 'top-start' });
    expect(service.placement()).toBe('top-start');
  });

  it('should return floating styles', () => {
    const styles = service.getFloatingStyles();
    expect(styles.position).toBe('absolute');
    expect(styles.top).toBe('0');
    expect(styles.left).toBe('0');
    expect(styles.transform).toBe('translate(0px, 0px)');
  });

  it('should return arrow styles', () => {
    const styles = service.getArrowStyles();
    expect(styles.position).toBe('absolute');
  });

  it('should return null when updating position without elements', async () => {
    const result = await service.updatePosition();
    expect(result).toBeNull();
  });
});

describe('FloatingDirective', () => {
  @Component({
    template: `
      <button #reference>Reference</button>
      <div baseUiFloating
           [referenceElement]="referenceEl()"
           [placement]="placement()"
           data-testid="floating">
        Floating content
      </div>
    `,
    standalone: true,
    imports: [FloatingDirective],
  })
  class TestComponent {
    reference = viewChild<ElementRef<HTMLButtonElement>>('reference');
    placement = signal<'top' | 'bottom' | 'left' | 'right'>('bottom');

    referenceEl(): Element | null {
      return this.reference()?.nativeElement ?? null;
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let floatingElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    floatingElement = fixture.nativeElement.querySelector('[data-testid="floating"]');
  });

  it('should create the floating element', () => {
    expect(floatingElement).toBeTruthy();
  });

  it('should apply position style', () => {
    // Default strategy is 'absolute'
    expect(floatingElement.style.position).toBe('absolute');
  });

  it('should have transform style', () => {
    // Initial transform should be set
    expect(floatingElement.style.transform).toContain('translate');
  });
});

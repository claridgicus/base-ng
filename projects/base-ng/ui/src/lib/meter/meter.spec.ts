/**
 * @fileoverview Tests for Meter component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/meter/Meter.test.tsx
 * @parity Verified against React Base UI
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { MeterRootDirective } from './meter-root.directive';
import { MeterTrackDirective } from './meter-track.directive';
import { MeterIndicatorDirective } from './meter-indicator.directive';
import { MeterLabelDirective } from './meter-label.directive';
import { MeterValueDirective } from './meter-value.directive';

describe('Meter component', () => {
  describe('MeterRootDirective', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="value()" [min]="min()" [max]="max()">
          <div baseUiMeterTrack>
            <div baseUiMeterIndicator></div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterTrackDirective, MeterIndicatorDirective],
    })
    class TestComponent {
      value = signal(50);
      min = signal(0);
      max = signal(100);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiMeterRoot]');
    });

    it('should render meter root element', () => {
      expect(root).toBeTruthy();
    });

    it('should have role="meter"', () => {
      expect(root.getAttribute('role')).toBe('meter');
    });

    it('should have correct aria attributes', () => {
      expect(root.getAttribute('aria-valuemin')).toBe('0');
      expect(root.getAttribute('aria-valuemax')).toBe('100');
      expect(root.getAttribute('aria-valuenow')).toBe('50');
    });

    it('should have aria-valuetext with formatted value', () => {
      expect(root.getAttribute('aria-valuetext')).toBe('50');
    });

    it('should have base-ui-meter class', () => {
      expect(root.classList.contains('base-ui-meter')).toBe(true);
    });

    it('should update aria-valuenow when value changes', () => {
      component.value.set(75);
      fixture.detectChanges();

      expect(root.getAttribute('aria-valuenow')).toBe('75');
    });

    it('should handle custom min/max values', () => {
      component.min.set(10);
      component.max.set(50);
      component.value.set(30);
      fixture.detectChanges();

      expect(root.getAttribute('aria-valuemin')).toBe('10');
      expect(root.getAttribute('aria-valuemax')).toBe('50');
      expect(root.getAttribute('aria-valuenow')).toBe('30');
    });
  });

  describe('MeterIndicatorDirective', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="value()" [min]="min()" [max]="max()">
          <div baseUiMeterIndicator></div>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterIndicatorDirective],
    })
    class TestComponent {
      value = signal(50);
      min = signal(0);
      max = signal(100);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let indicator: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      indicator = fixture.nativeElement.querySelector('[baseUiMeterIndicator]');
    });

    it('should render indicator element', () => {
      expect(indicator).toBeTruthy();
    });

    it('should have correct width percentage', () => {
      expect(indicator.style.width).toBe('50%');
    });

    it('should update width when value changes', () => {
      component.value.set(75);
      fixture.detectChanges();

      expect(indicator.style.width).toBe('75%');
    });

    it('should calculate percentage with custom min/max', () => {
      component.min.set(0);
      component.max.set(200);
      component.value.set(50);
      fixture.detectChanges();

      expect(indicator.style.width).toBe('25%');
    });

    it('should have indicator class', () => {
      expect(indicator.classList.contains('base-ui-meter-indicator')).toBe(true);
    });

    it('should have inset-inline-start style', () => {
      expect(indicator.style.insetInlineStart).toBe('0');
    });

    it('should have height inherit style', () => {
      expect(indicator.style.height).toBe('inherit');
    });
  });

  describe('MeterTrackDirective', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="50">
          <div baseUiMeterTrack>
            <div baseUiMeterIndicator></div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterTrackDirective, MeterIndicatorDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let track: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      track = fixture.nativeElement.querySelector('[baseUiMeterTrack]');
    });

    it('should render track element', () => {
      expect(track).toBeTruthy();
    });

    it('should have track class', () => {
      expect(track.classList.contains('base-ui-meter-track')).toBe(true);
    });
  });

  describe('MeterLabelDirective', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="50">
          <span baseUiMeterLabel>Disk Usage</span>
          <div baseUiMeterIndicator></div>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterLabelDirective, MeterIndicatorDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let label: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiMeterRoot]');
      label = fixture.nativeElement.querySelector('[baseUiMeterLabel]');
    });

    it('should render label element', () => {
      expect(label).toBeTruthy();
    });

    it('should have generated ID', () => {
      expect(label.id).toMatch(/^base-ui-meter-label-\d+$/);
    });

    it('should associate label with root via aria-labelledby', () => {
      expect(root.getAttribute('aria-labelledby')).toBe(label.id);
    });

    it('should have label class', () => {
      expect(label.classList.contains('base-ui-meter-label')).toBe(true);
    });
  });

  describe('MeterLabelDirective with existing ID', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="50">
          <span baseUiMeterLabel id="custom-meter-label">Disk Usage</span>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterLabelDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let label: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiMeterRoot]');
      label = fixture.nativeElement.querySelector('[baseUiMeterLabel]');
    });

    it('should preserve existing ID', () => {
      expect(label.id).toBe('custom-meter-label');
    });

    it('should associate with root using existing ID', () => {
      expect(root.getAttribute('aria-labelledby')).toBe('custom-meter-label');
    });
  });

  describe('MeterValueDirective', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="value()">
          <span baseUiMeterValue></span>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterValueDirective],
    })
    class TestComponent {
      value = signal(50);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let valueEl: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      valueEl = fixture.nativeElement.querySelector('[baseUiMeterValue]');
    });

    it('should render value element', () => {
      expect(valueEl).toBeTruthy();
    });

    it('should display formatted value', () => {
      expect(valueEl.textContent).toBe('50');
    });

    it('should update when value changes', () => {
      component.value.set(75);
      fixture.detectChanges();

      expect(valueEl.textContent).toBe('75');
    });

    it('should have value class', () => {
      expect(valueEl.classList.contains('base-ui-meter-value')).toBe(true);
    });
  });

  describe('MeterValueDirective with custom format', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="0.75">
          <span baseUiMeterValue [format]="{ style: 'percent' }"></span>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterValueDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let valueEl: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      valueEl = fixture.nativeElement.querySelector('[baseUiMeterValue]');
    });

    it('should format value as percentage', () => {
      expect(valueEl.textContent).toBe('75%');
    });
  });

  describe('Meter with custom aria-valuetext', () => {
    @Component({
      template: `
        <div baseUiMeterRoot
             [value]="value()"
             [getAriaValueText]="customValueText">
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective],
    })
    class TestComponent {
      value = signal(50);
      customValueText = (formatted: string, value: number) => {
        return `${value} GB used`;
      };
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiMeterRoot]');
    });

    it('should use custom aria-valuetext', () => {
      expect(root.getAttribute('aria-valuetext')).toBe('50 GB used');
    });

    it('should update when value changes', () => {
      component.value.set(75);
      fixture.detectChanges();

      expect(root.getAttribute('aria-valuetext')).toBe('75 GB used');
    });
  });

  describe('Full meter component', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="value()" [max]="100">
          <span baseUiMeterLabel>Battery Level</span>
          <div baseUiMeterTrack>
            <div baseUiMeterIndicator></div>
          </div>
          <span baseUiMeterValue></span>
        </div>
      `,
      standalone: true,
      imports: [
        MeterRootDirective,
        MeterLabelDirective,
        MeterTrackDirective,
        MeterIndicatorDirective,
        MeterValueDirective,
      ],
    })
    class TestComponent {
      value = signal(0);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render all parts correctly', () => {
      const root = fixture.nativeElement.querySelector('[baseUiMeterRoot]');
      const label = fixture.nativeElement.querySelector('[baseUiMeterLabel]');
      const track = fixture.nativeElement.querySelector('[baseUiMeterTrack]');
      const indicator = fixture.nativeElement.querySelector('[baseUiMeterIndicator]');
      const value = fixture.nativeElement.querySelector('[baseUiMeterValue]');

      expect(root).toBeTruthy();
      expect(label).toBeTruthy();
      expect(track).toBeTruthy();
      expect(indicator).toBeTruthy();
      expect(value).toBeTruthy();
    });

    it('should update all parts when value changes', () => {
      const root = fixture.nativeElement.querySelector('[baseUiMeterRoot]');
      const indicator = fixture.nativeElement.querySelector('[baseUiMeterIndicator]');
      const value = fixture.nativeElement.querySelector('[baseUiMeterValue]');

      // Initial state
      expect(root.getAttribute('aria-valuenow')).toBe('0');
      expect(indicator.style.width).toBe('0%');
      expect(value.textContent).toBe('0');

      // Update to 50
      component.value.set(50);
      fixture.detectChanges();

      expect(root.getAttribute('aria-valuenow')).toBe('50');
      expect(indicator.style.width).toBe('50%');
      expect(value.textContent).toBe('50');

      // Update to 100
      component.value.set(100);
      fixture.detectChanges();

      expect(root.getAttribute('aria-valuenow')).toBe('100');
      expect(indicator.style.width).toBe('100%');
      expect(value.textContent).toBe('100');
    });
  });

  describe('Meter with decimal values', () => {
    @Component({
      template: `
        <div baseUiMeterRoot [value]="value()" [min]="0" [max]="1">
          <span baseUiMeterValue [format]="{ style: 'percent' }"></span>
          <div baseUiMeterIndicator></div>
        </div>
      `,
      standalone: true,
      imports: [MeterRootDirective, MeterValueDirective, MeterIndicatorDirective],
    })
    class TestComponent {
      value = signal(0.5);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle 0-1 range correctly', () => {
      const indicator = fixture.nativeElement.querySelector('[baseUiMeterIndicator]');
      expect(indicator.style.width).toBe('50%');
    });

    it('should display percentage format', () => {
      const value = fixture.nativeElement.querySelector('[baseUiMeterValue]');
      expect(value.textContent).toBe('50%');
    });

    it('should update correctly', () => {
      component.value.set(0.75);
      fixture.detectChanges();

      const indicator = fixture.nativeElement.querySelector('[baseUiMeterIndicator]');
      const value = fixture.nativeElement.querySelector('[baseUiMeterValue]');

      expect(indicator.style.width).toBe('75%');
      expect(value.textContent).toBe('75%');
    });
  });
});

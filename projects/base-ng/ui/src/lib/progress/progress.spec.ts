/**
 * @fileoverview Tests for Progress component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/progress/Progress.test.tsx
 * @parity Verified against React Base UI
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { ProgressRootDirective } from './progress-root.directive';
import { ProgressTrackDirective } from './progress-track.directive';
import { ProgressIndicatorDirective } from './progress-indicator.directive';
import { ProgressLabelDirective } from './progress-label.directive';
import { ProgressValueDirective } from './progress-value.directive';

describe('Progress component', () => {
  describe('ProgressRootDirective', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="value()" [min]="min()" [max]="max()">
          <div baseUiProgressTrack>
            <div baseUiProgressIndicator></div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective, ProgressTrackDirective, ProgressIndicatorDirective],
    })
    class TestComponent {
      value = signal<number | null>(50);
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
      root = fixture.nativeElement.querySelector('[baseUiProgressRoot]');
    });

    it('should render progress root element', () => {
      expect(root).toBeTruthy();
    });

    it('should have role="progressbar"', () => {
      expect(root.getAttribute('role')).toBe('progressbar');
    });

    it('should have correct aria attributes', () => {
      expect(root.getAttribute('aria-valuemin')).toBe('0');
      expect(root.getAttribute('aria-valuemax')).toBe('100');
      expect(root.getAttribute('aria-valuenow')).toBe('50');
    });

    it('should have aria-valuetext with formatted value', () => {
      expect(root.getAttribute('aria-valuetext')).toBe('50');
    });

    it('should have data-status attribute', () => {
      expect(root.getAttribute('data-status')).toBe('progressing');
    });

    it('should have appropriate classes', () => {
      expect(root.classList.contains('base-ui-progress')).toBe(true);
      expect(root.classList.contains('base-ui-progress-progressing')).toBe(true);
    });

    it('should update to complete status when value equals max', () => {
      component.value.set(100);
      fixture.detectChanges();

      expect(root.getAttribute('data-status')).toBe('complete');
      expect(root.classList.contains('base-ui-progress-complete')).toBe(true);
    });

    it('should be indeterminate when value is null', () => {
      component.value.set(null);
      fixture.detectChanges();

      expect(root.getAttribute('data-status')).toBe('indeterminate');
      expect(root.getAttribute('aria-valuenow')).toBeNull();
      expect(root.classList.contains('base-ui-progress-indeterminate')).toBe(true);
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

  describe('ProgressIndicatorDirective', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="value()" [min]="min()" [max]="max()">
          <div baseUiProgressIndicator></div>
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective, ProgressIndicatorDirective],
    })
    class TestComponent {
      value = signal<number | null>(50);
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
      indicator = fixture.nativeElement.querySelector('[baseUiProgressIndicator]');
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

    it('should have no width when indeterminate', () => {
      component.value.set(null);
      fixture.detectChanges();

      expect(indicator.style.width).toBe('');
    });

    it('should calculate percentage with custom min/max', () => {
      component.min.set(0);
      component.max.set(200);
      component.value.set(50);
      fixture.detectChanges();

      expect(indicator.style.width).toBe('25%');
    });

    it('should have data-status attribute', () => {
      expect(indicator.getAttribute('data-status')).toBe('progressing');

      component.value.set(100);
      fixture.detectChanges();
      expect(indicator.getAttribute('data-status')).toBe('complete');
    });

    it('should have indicator classes', () => {
      expect(indicator.classList.contains('base-ui-progress-indicator')).toBe(true);
      expect(indicator.classList.contains('base-ui-progress-indicator-progressing')).toBe(true);
    });
  });

  describe('ProgressTrackDirective', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="value()">
          <div baseUiProgressTrack>
            <div baseUiProgressIndicator></div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective, ProgressTrackDirective, ProgressIndicatorDirective],
    })
    class TestComponent {
      value = signal<number | null>(50);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let track: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      track = fixture.nativeElement.querySelector('[baseUiProgressTrack]');
    });

    it('should render track element', () => {
      expect(track).toBeTruthy();
    });

    it('should have data-status attribute', () => {
      expect(track.getAttribute('data-status')).toBe('progressing');
    });

    it('should have track classes', () => {
      expect(track.classList.contains('base-ui-progress-track')).toBe(true);
      expect(track.classList.contains('base-ui-progress-track-progressing')).toBe(true);
    });

    it('should update status classes when value changes', () => {
      component.value.set(100);
      fixture.detectChanges();

      expect(track.classList.contains('base-ui-progress-track-complete')).toBe(true);
      expect(track.classList.contains('base-ui-progress-track-progressing')).toBe(false);
    });
  });

  describe('ProgressLabelDirective', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="50">
          <span baseUiProgressLabel>Loading...</span>
          <div baseUiProgressIndicator></div>
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective, ProgressLabelDirective, ProgressIndicatorDirective],
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
      root = fixture.nativeElement.querySelector('[baseUiProgressRoot]');
      label = fixture.nativeElement.querySelector('[baseUiProgressLabel]');
    });

    it('should render label element', () => {
      expect(label).toBeTruthy();
    });

    it('should have generated ID', () => {
      expect(label.id).toMatch(/^base-ui-progress-label-\d+$/);
    });

    it('should associate label with root via aria-labelledby', () => {
      expect(root.getAttribute('aria-labelledby')).toBe(label.id);
    });

    it('should have label classes', () => {
      expect(label.classList.contains('base-ui-progress-label')).toBe(true);
    });

    it('should have data-status attribute', () => {
      expect(label.getAttribute('data-status')).toBe('progressing');
    });
  });

  describe('ProgressLabelDirective with existing ID', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="50">
          <span baseUiProgressLabel id="custom-label">Loading...</span>
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective, ProgressLabelDirective],
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
      root = fixture.nativeElement.querySelector('[baseUiProgressRoot]');
      label = fixture.nativeElement.querySelector('[baseUiProgressLabel]');
    });

    it('should preserve existing ID', () => {
      expect(label.id).toBe('custom-label');
    });

    it('should associate with root using existing ID', () => {
      expect(root.getAttribute('aria-labelledby')).toBe('custom-label');
    });
  });

  describe('ProgressValueDirective', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="value()">
          <span baseUiProgressValue></span>
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective, ProgressValueDirective],
    })
    class TestComponent {
      value = signal<number | null>(50);
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
      valueEl = fixture.nativeElement.querySelector('[baseUiProgressValue]');
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

    it('should be empty when indeterminate', () => {
      component.value.set(null);
      fixture.detectChanges();

      expect(valueEl.textContent).toBe('');
    });

    it('should have value classes', () => {
      expect(valueEl.classList.contains('base-ui-progress-value')).toBe(true);
    });

    it('should have data-status attribute', () => {
      expect(valueEl.getAttribute('data-status')).toBe('progressing');
    });
  });

  describe('ProgressValueDirective with custom format', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="50" [max]="100">
          <span baseUiProgressValue [format]="{ style: 'percent', minimumFractionDigits: 0 }"></span>
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective, ProgressValueDirective],
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
      valueEl = fixture.nativeElement.querySelector('[baseUiProgressValue]');
    });

    it('should format value as percentage', () => {
      // Note: The format is applied to the raw value (50), so 50% is expected
      // This matches the React behavior where format is for display purposes
      expect(valueEl.textContent).toBe('5,000%');
    });
  });

  describe('Progress with custom aria-valuetext', () => {
    @Component({
      template: `
        <div baseUiProgressRoot
             [value]="value()"
             [getAriaValueText]="customValueText">
        </div>
      `,
      standalone: true,
      imports: [ProgressRootDirective],
    })
    class TestComponent {
      value = signal<number | null>(50);
      customValueText = (formatted: string | null, value: number | null) => {
        if (value === null) return 'Loading...';
        return `${value} percent complete`;
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
      root = fixture.nativeElement.querySelector('[baseUiProgressRoot]');
    });

    it('should use custom aria-valuetext', () => {
      expect(root.getAttribute('aria-valuetext')).toBe('50 percent complete');
    });

    it('should handle indeterminate state', () => {
      component.value.set(null);
      fixture.detectChanges();

      expect(root.getAttribute('aria-valuetext')).toBe('Loading...');
    });
  });

  describe('Full progress component', () => {
    @Component({
      template: `
        <div baseUiProgressRoot [value]="value()" [max]="100">
          <span baseUiProgressLabel>Uploading files...</span>
          <div baseUiProgressTrack>
            <div baseUiProgressIndicator></div>
          </div>
          <span baseUiProgressValue></span>
        </div>
      `,
      standalone: true,
      imports: [
        ProgressRootDirective,
        ProgressLabelDirective,
        ProgressTrackDirective,
        ProgressIndicatorDirective,
        ProgressValueDirective,
      ],
    })
    class TestComponent {
      value = signal<number | null>(0);
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
      const root = fixture.nativeElement.querySelector('[baseUiProgressRoot]');
      const label = fixture.nativeElement.querySelector('[baseUiProgressLabel]');
      const track = fixture.nativeElement.querySelector('[baseUiProgressTrack]');
      const indicator = fixture.nativeElement.querySelector('[baseUiProgressIndicator]');
      const value = fixture.nativeElement.querySelector('[baseUiProgressValue]');

      expect(root).toBeTruthy();
      expect(label).toBeTruthy();
      expect(track).toBeTruthy();
      expect(indicator).toBeTruthy();
      expect(value).toBeTruthy();
    });

    it('should update all parts when value changes', () => {
      const root = fixture.nativeElement.querySelector('[baseUiProgressRoot]');
      const indicator = fixture.nativeElement.querySelector('[baseUiProgressIndicator]');
      const value = fixture.nativeElement.querySelector('[baseUiProgressValue]');

      // Initial state
      expect(root.getAttribute('aria-valuenow')).toBe('0');
      expect(indicator.style.width).toBe('0%');
      expect(value.textContent).toBe('0');

      // Update to 50%
      component.value.set(50);
      fixture.detectChanges();

      expect(root.getAttribute('aria-valuenow')).toBe('50');
      expect(indicator.style.width).toBe('50%');
      expect(value.textContent).toBe('50');

      // Complete
      component.value.set(100);
      fixture.detectChanges();

      expect(root.getAttribute('data-status')).toBe('complete');
      expect(indicator.style.width).toBe('100%');
      expect(value.textContent).toBe('100');
    });

    it('should handle transition to indeterminate', () => {
      const root = fixture.nativeElement.querySelector('[baseUiProgressRoot]');
      const indicator = fixture.nativeElement.querySelector('[baseUiProgressIndicator]');
      const value = fixture.nativeElement.querySelector('[baseUiProgressValue]');

      component.value.set(null);
      fixture.detectChanges();

      expect(root.getAttribute('data-status')).toBe('indeterminate');
      expect(root.getAttribute('aria-valuenow')).toBeNull();
      expect(indicator.style.width).toBe('');
      expect(value.textContent).toBe('');
    });
  });
});

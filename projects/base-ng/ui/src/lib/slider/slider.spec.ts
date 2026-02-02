/**
 * @fileoverview Tests for Slider component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/slider/Slider.test.tsx
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { SliderRootDirective } from './slider-root.directive';
import { SliderTrackDirective } from './slider-track.directive';
import { SliderIndicatorDirective } from './slider-indicator.directive';
import { SliderThumbDirective } from './slider-thumb.directive';

describe('Slider component', () => {
  describe('Basic slider', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [(value)]="volume" [min]="0" [max]="100" [step]="1">
          <div baseUiSliderTrack>
            <div baseUiSliderIndicator></div>
          </div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [
        SliderRootDirective,
        SliderTrackDirective,
        SliderIndicatorDirective,
        SliderThumbDirective,
      ],
    })
    class TestComponent {
      volume = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let track: HTMLElement;
    let indicator: HTMLElement;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiSliderRoot]');
      track = fixture.nativeElement.querySelector('[baseUiSliderTrack]');
      indicator = fixture.nativeElement.querySelector('[baseUiSliderIndicator]');
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should render all parts', () => {
      expect(root).toBeTruthy();
      expect(track).toBeTruthy();
      expect(indicator).toBeTruthy();
      expect(thumb).toBeTruthy();
    });

    it('should have role group on root', () => {
      expect(root.getAttribute('role')).toBe('group');
    });

    it('should have role slider on thumb', () => {
      expect(thumb.getAttribute('role')).toBe('slider');
    });

    it('should have slider class on root', () => {
      expect(root.classList.contains('base-ui-slider')).toBe(true);
    });

    it('should have track class', () => {
      expect(track.classList.contains('base-ui-slider-track')).toBe(true);
    });

    it('should have indicator class', () => {
      expect(indicator.classList.contains('base-ui-slider-indicator')).toBe(true);
    });

    it('should have thumb class', () => {
      expect(thumb.classList.contains('base-ui-slider-thumb')).toBe(true);
    });

    it('should have aria-valuemin', () => {
      expect(thumb.getAttribute('aria-valuemin')).toBe('0');
    });

    it('should have aria-valuemax', () => {
      expect(thumb.getAttribute('aria-valuemax')).toBe('100');
    });

    it('should have aria-valuenow', () => {
      expect(thumb.getAttribute('aria-valuenow')).toBe('50');
    });

    it('should update aria-valuenow when value changes via keyboard', () => {
      // Use keyboard to change value
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
      fixture.detectChanges();
      expect(thumb.getAttribute('aria-valuenow')).toBe('100');
    });

    it('should have horizontal orientation by default', () => {
      expect(root.getAttribute('data-orientation')).toBe('horizontal');
      expect(thumb.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should position thumb at correct percentage', () => {
      expect(thumb.style.left).toBe('50%');
    });
  });

  describe('Vertical slider', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [(value)]="value" orientation="vertical">
          <div baseUiSliderTrack>
            <div baseUiSliderIndicator></div>
          </div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [
        SliderRootDirective,
        SliderTrackDirective,
        SliderIndicatorDirective,
        SliderThumbDirective,
      ],
    })
    class TestComponent {
      value = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiSliderRoot]');
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should have vertical orientation', () => {
      expect(root.getAttribute('data-orientation')).toBe('vertical');
      expect(root.classList.contains('base-ui-slider-vertical')).toBe(true);
    });

    it('should position thumb with bottom for vertical', () => {
      expect(thumb.style.bottom).toBe('50%');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [(value)]="value" [disabled]="true">
          <div baseUiSliderTrack>
            <div baseUiSliderIndicator></div>
          </div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [
        SliderRootDirective,
        SliderTrackDirective,
        SliderIndicatorDirective,
        SliderThumbDirective,
      ],
    })
    class TestComponent {
      value = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiSliderRoot]');
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should have data-disabled on root', () => {
      expect(root.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled class', () => {
      expect(root.classList.contains('base-ui-slider-disabled')).toBe(true);
    });

    it('should have aria-disabled on thumb', () => {
      expect(thumb.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have tabindex -1 when disabled', () => {
      expect(thumb.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Keyboard navigation', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [(value)]="value" [min]="0" [max]="100" [step]="5" [largeStep]="20">
          <div baseUiSliderTrack>
            <div baseUiSliderIndicator></div>
          </div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [
        SliderRootDirective,
        SliderTrackDirective,
        SliderIndicatorDirective,
        SliderThumbDirective,
      ],
    })
    class TestComponent {
      value = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should increase value on ArrowRight', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(55);
    });

    it('should decrease value on ArrowLeft', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(45);
    });

    it('should increase value on ArrowUp', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(55);
    });

    it('should decrease value on ArrowDown', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(45);
    });

    it('should use large step on PageUp', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(70);
    });

    it('should use large step on PageDown', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(30);
    });

    it('should go to min on Home', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(0);
    });

    it('should go to max on End', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(100);
    });

    it('should use large step with Shift+Arrow', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true, cancelable: true }));
      fixture.detectChanges();
      expect(component.value).toBe(70);
    });
  });

  describe('Value clamping', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [(value)]="value" [min]="10" [max]="90" [step]="5">
          <div baseUiSliderTrack></div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [SliderRootDirective, SliderTrackDirective, SliderThumbDirective],
    })
    class TestComponent {
      value = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should not go below min', () => {
      // Starting at 50, press Home to go to min
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
      fixture.detectChanges();

      expect(component.value).toBe(10);
    });

    it('should not go above max', () => {
      // Starting at 50, press End to go to max
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
      fixture.detectChanges();

      expect(component.value).toBe(90);
    });
  });

  describe('Event emissions', () => {
    @Component({
      template: `
        <div
          baseUiSliderRoot
          [(value)]="value"
          (valueChanged)="onValueChanged($event)"
          (valueCommitted)="onValueCommitted($event)"
        >
          <div baseUiSliderTrack></div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [SliderRootDirective, SliderTrackDirective, SliderThumbDirective],
    })
    class TestComponent {
      value = 50;
      lastChangeEvent: any;
      lastCommitEvent: any;

      onValueChanged(event: any) {
        this.lastChangeEvent = event;
      }

      onValueCommitted(event: any) {
        this.lastCommitEvent = event;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should emit valueChanged on keyboard interaction', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
      fixture.detectChanges();

      expect(component.lastChangeEvent).toBeDefined();
      expect(component.lastChangeEvent.value).toBe(51);
    });

    it('should emit valueCommitted on keyboard interaction', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
      fixture.detectChanges();

      expect(component.lastCommitEvent).toBeDefined();
      expect(component.lastCommitEvent.value).toBe(51);
    });
  });

  describe('ngModel integration', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [(ngModel)]="value">
          <div baseUiSliderTrack></div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [
        SliderRootDirective,
        SliderTrackDirective,
        SliderThumbDirective,
        FormsModule,
      ],
    })
    class TestComponent {
      value = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should bind to ngModel', async () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.value).toBe(51);
    });

    it('should update view when ngModel changes', async () => {
      component.value = 75;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(thumb.getAttribute('aria-valuenow')).toBe('75');
    });
  });

  describe('FormControl integration', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [formControl]="control">
          <div baseUiSliderTrack></div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [
        SliderRootDirective,
        SliderTrackDirective,
        SliderThumbDirective,
        ReactiveFormsModule,
      ],
    })
    class TestComponent {
      control = new FormControl<number>(50);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should bind to FormControl', () => {
      thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
      fixture.detectChanges();

      expect(component.control.value).toBe(51);
    });

    it('should update view when FormControl changes', () => {
      component.control.setValue(75);
      fixture.detectChanges();

      expect(thumb.getAttribute('aria-valuenow')).toBe('75');
    });
  });

  describe('Step validation', () => {
    @Component({
      template: `
        <div baseUiSliderRoot [(value)]="value" [min]="0" [max]="100" [step]="10">
          <div baseUiSliderTrack></div>
          <div baseUiSliderThumb></div>
        </div>
      `,
      standalone: true,
      imports: [SliderRootDirective, SliderTrackDirective, SliderThumbDirective],
    })
    class TestComponent {
      value = 45; // Not a multiple of step
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      thumb = fixture.nativeElement.querySelector('[baseUiSliderThumb]');
    });

    it('should round value to nearest step', () => {
      // 45 should round to 50 (nearest multiple of 10)
      expect(thumb.getAttribute('aria-valuenow')).toBe('50');
    });
  });
});

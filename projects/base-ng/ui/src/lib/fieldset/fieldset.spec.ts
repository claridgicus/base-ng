/**
 * @fileoverview Tests for Fieldset component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/fieldset/Fieldset.test.tsx
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { FieldsetRootDirective } from './fieldset-root.directive';
import { FieldsetLegendDirective } from './fieldset-legend.directive';

describe('Fieldset component', () => {
  describe('Basic fieldset', () => {
    @Component({
      template: `
        <fieldset baseUiFieldsetRoot>
          <div baseUiFieldsetLegend>Personal Info</div>
          <input type="text" name="name" />
        </fieldset>
      `,
      standalone: true,
      imports: [FieldsetRootDirective, FieldsetLegendDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let fieldset: HTMLFieldSetElement;
    let legend: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fieldset = fixture.nativeElement.querySelector('[baseUiFieldsetRoot]');
      legend = fixture.nativeElement.querySelector('[baseUiFieldsetLegend]');
    });

    it('should render fieldset and legend', () => {
      expect(fieldset).toBeTruthy();
      expect(legend).toBeTruthy();
    });

    it('should have fieldset classes', () => {
      expect(fieldset.classList.contains('base-ui-fieldset')).toBe(true);
      expect(legend.classList.contains('base-ui-fieldset-legend')).toBe(true);
    });

    it('should associate fieldset with legend via aria-labelledby', () => {
      expect(fieldset.getAttribute('aria-labelledby')).toBe(legend.id);
    });

    it('should generate legend ID', () => {
      expect(legend.id).toMatch(/^base-ui-fieldset-legend-\d+$/);
    });

    it('should display legend text', () => {
      expect(legend.textContent).toContain('Personal Info');
    });
  });

  describe('Custom legend ID', () => {
    @Component({
      template: `
        <fieldset baseUiFieldsetRoot>
          <div baseUiFieldsetLegend id="custom-legend">Legend</div>
        </fieldset>
      `,
      standalone: true,
      imports: [FieldsetRootDirective, FieldsetLegendDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let fieldset: HTMLFieldSetElement;
    let legend: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fieldset = fixture.nativeElement.querySelector('[baseUiFieldsetRoot]');
      legend = fixture.nativeElement.querySelector('[baseUiFieldsetLegend]');
    });

    it('should use custom ID for legend', () => {
      expect(legend.id).toBe('custom-legend');
    });

    it('should reference custom ID in aria-labelledby', () => {
      expect(fieldset.getAttribute('aria-labelledby')).toBe('custom-legend');
    });
  });

  describe('Disabled fieldset', () => {
    @Component({
      template: `
        <fieldset baseUiFieldsetRoot [disabled]="disabled()">
          <div baseUiFieldsetLegend>Legend</div>
          <input type="text" name="field" />
        </fieldset>
      `,
      standalone: true,
      imports: [FieldsetRootDirective, FieldsetLegendDirective],
    })
    class TestComponent {
      disabled = signal(true);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let fieldset: HTMLFieldSetElement;
    let legend: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      fieldset = fixture.nativeElement.querySelector('[baseUiFieldsetRoot]');
      legend = fixture.nativeElement.querySelector('[baseUiFieldsetLegend]');
    });

    it('should have disabled class on fieldset', () => {
      expect(fieldset.classList.contains('base-ui-fieldset-disabled')).toBe(true);
    });

    it('should have data-disabled on fieldset', () => {
      expect(fieldset.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled attribute on fieldset', () => {
      expect(fieldset.hasAttribute('disabled')).toBe(true);
    });

    it('should have data-disabled on legend', () => {
      expect(legend.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled class on legend', () => {
      expect(legend.classList.contains('base-ui-fieldset-legend-disabled')).toBe(true);
    });

    it('should toggle disabled state', () => {
      component.disabled.set(false);
      fixture.detectChanges();

      expect(fieldset.hasAttribute('data-disabled')).toBe(false);
      expect(fieldset.hasAttribute('disabled')).toBe(false);
      expect(legend.hasAttribute('data-disabled')).toBe(false);
    });
  });

  describe('Fieldset without legend', () => {
    @Component({
      template: `
        <fieldset baseUiFieldsetRoot>
          <input type="text" name="field" />
        </fieldset>
      `,
      standalone: true,
      imports: [FieldsetRootDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let fieldset: HTMLFieldSetElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fieldset = fixture.nativeElement.querySelector('[baseUiFieldsetRoot]');
    });

    it('should render fieldset without legend', () => {
      expect(fieldset).toBeTruthy();
    });

    it('should not have aria-labelledby when no legend', () => {
      expect(fieldset.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  describe('Non-fieldset element', () => {
    @Component({
      template: `
        <div baseUiFieldsetRoot role="group">
          <div baseUiFieldsetLegend>Group Label</div>
          <button>Button 1</button>
          <button>Button 2</button>
        </div>
      `,
      standalone: true,
      imports: [FieldsetRootDirective, FieldsetLegendDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let legend: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiFieldsetRoot]');
      legend = fixture.nativeElement.querySelector('[baseUiFieldsetLegend]');
    });

    it('should work with non-fieldset elements', () => {
      expect(root.tagName.toLowerCase()).toBe('div');
      expect(root.getAttribute('role')).toBe('group');
    });

    it('should associate with legend via aria-labelledby', () => {
      expect(root.getAttribute('aria-labelledby')).toBe(legend.id);
    });
  });

  describe('Native legend element', () => {
    @Component({
      template: `
        <fieldset baseUiFieldsetRoot>
          <legend baseUiFieldsetLegend>Native Legend</legend>
          <input type="text" />
        </fieldset>
      `,
      standalone: true,
      imports: [FieldsetRootDirective, FieldsetLegendDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let fieldset: HTMLFieldSetElement;
    let legend: HTMLLegendElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fieldset = fixture.nativeElement.querySelector('[baseUiFieldsetRoot]');
      legend = fixture.nativeElement.querySelector('[baseUiFieldsetLegend]');
    });

    it('should work with native legend element', () => {
      expect(legend.tagName.toLowerCase()).toBe('legend');
    });

    it('should still have aria-labelledby for programmatic access', () => {
      expect(fieldset.getAttribute('aria-labelledby')).toBe(legend.id);
    });
  });
});

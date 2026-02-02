/**
 * @fileoverview Tests for CheckboxGroup component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/checkbox-group/CheckboxGroup.test.tsx
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { describe, expect, it, beforeEach } from 'vitest';
import { CheckboxGroupDirective } from './checkbox-group.directive';
import { CheckboxRootDirective } from '../checkbox/checkbox-root.directive';
import { CheckboxIndicatorDirective } from '../checkbox/checkbox-indicator.directive';

describe('CheckboxGroup component', () => {
  describe('Basic group', () => {
    @Component({
      template: `
        <div baseUiCheckboxGroup [(value)]="selectedValues">
          <button baseUiCheckboxRoot value="apple">
            <span baseUiCheckboxIndicator>✓</span>
            Apple
          </button>
          <button baseUiCheckboxRoot value="banana">
            <span baseUiCheckboxIndicator>✓</span>
            Banana
          </button>
          <button baseUiCheckboxRoot value="orange">
            <span baseUiCheckboxIndicator>✓</span>
            Orange
          </button>
        </div>
      `,
      standalone: true,
      imports: [
        CheckboxGroupDirective,
        CheckboxRootDirective,
        CheckboxIndicatorDirective,
      ],
    })
    class TestComponent {
      selectedValues: string[] = [];
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let group: HTMLElement;
    let checkboxes: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      group = fixture.nativeElement.querySelector('[baseUiCheckboxGroup]');
      checkboxes = fixture.nativeElement.querySelectorAll('[baseUiCheckboxRoot]');
    });

    it('should render group and checkboxes', () => {
      expect(group).toBeTruthy();
      expect(checkboxes.length).toBe(3);
    });

    it('should have role group', () => {
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should have group class', () => {
      expect(group.classList.contains('base-ui-checkbox-group')).toBe(true);
    });

    it('should start with empty selection', () => {
      expect(component.selectedValues).toEqual([]);
      checkboxes.forEach(checkbox => {
        expect(checkbox.getAttribute('aria-checked')).toBe('false');
      });
    });

    it('should select checkbox on click', () => {
      checkboxes[0].click();
      fixture.detectChanges();

      expect(component.selectedValues).toContain('apple');
      expect(checkboxes[0].getAttribute('aria-checked')).toBe('true');
    });

    it('should support multiple selections', () => {
      checkboxes[0].click();
      fixture.detectChanges();
      checkboxes[2].click();
      fixture.detectChanges();

      expect(component.selectedValues).toContain('apple');
      expect(component.selectedValues).toContain('orange');
      expect(component.selectedValues).not.toContain('banana');
    });

    it('should deselect checkbox on second click', () => {
      checkboxes[0].click();
      fixture.detectChanges();
      expect(component.selectedValues).toContain('apple');

      checkboxes[0].click();
      fixture.detectChanges();
      expect(component.selectedValues).not.toContain('apple');
    });
  });

  describe('Initial value', () => {
    @Component({
      template: `
        <div baseUiCheckboxGroup [(value)]="selectedValues">
          <button baseUiCheckboxRoot value="apple">Apple</button>
          <button baseUiCheckboxRoot value="banana">Banana</button>
        </div>
      `,
      standalone: true,
      imports: [CheckboxGroupDirective, CheckboxRootDirective],
    })
    class TestComponent {
      selectedValues: string[] = ['banana'];
    }

    let fixture: ComponentFixture<TestComponent>;
    let checkboxes: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      checkboxes = fixture.nativeElement.querySelectorAll('[baseUiCheckboxRoot]');
    });

    it('should reflect initial value', () => {
      expect(checkboxes[0].getAttribute('aria-checked')).toBe('false');
      expect(checkboxes[1].getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('Disabled group', () => {
    @Component({
      template: `
        <div baseUiCheckboxGroup [disabled]="true" [(value)]="selectedValues">
          <button baseUiCheckboxRoot value="apple">Apple</button>
          <button baseUiCheckboxRoot value="banana">Banana</button>
        </div>
      `,
      standalone: true,
      imports: [CheckboxGroupDirective, CheckboxRootDirective],
    })
    class TestComponent {
      selectedValues: string[] = [];
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let group: HTMLElement;
    let checkboxes: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      group = fixture.nativeElement.querySelector('[baseUiCheckboxGroup]');
      checkboxes = fixture.nativeElement.querySelectorAll('[baseUiCheckboxRoot]');
    });

    it('should have data-disabled on group', () => {
      expect(group.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled class on group', () => {
      expect(group.classList.contains('base-ui-checkbox-group-disabled')).toBe(true);
    });

    it('should not allow selection when disabled', () => {
      checkboxes[0].click();
      fixture.detectChanges();

      expect(component.selectedValues).toEqual([]);
    });
  });

  describe('Value change event', () => {
    @Component({
      template: `
        <div baseUiCheckboxGroup (valueChanged)="onValueChanged($event)">
          <button baseUiCheckboxRoot value="apple">Apple</button>
          <button baseUiCheckboxRoot value="banana">Banana</button>
        </div>
      `,
      standalone: true,
      imports: [CheckboxGroupDirective, CheckboxRootDirective],
    })
    class TestComponent {
      lastEvent: any;
      onValueChanged(event: any) {
        this.lastEvent = event;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkboxes: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkboxes = fixture.nativeElement.querySelectorAll('[baseUiCheckboxRoot]');
    });

    it('should emit valueChange on selection', () => {
      checkboxes[0].click();
      fixture.detectChanges();

      expect(component.lastEvent).toEqual({ value: ['apple'] });
    });

    it('should emit valueChange with multiple values', () => {
      checkboxes[0].click();
      checkboxes[1].click();
      fixture.detectChanges();

      expect(component.lastEvent).toEqual({ value: ['apple', 'banana'] });
    });
  });

  describe('ngModel integration', () => {
    @Component({
      template: `
        <div baseUiCheckboxGroup [(ngModel)]="selectedValues">
          <button baseUiCheckboxRoot value="a">A</button>
          <button baseUiCheckboxRoot value="b">B</button>
        </div>
      `,
      standalone: true,
      imports: [CheckboxGroupDirective, CheckboxRootDirective, FormsModule],
    })
    class TestComponent {
      selectedValues: string[] = [];
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkboxes: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
      checkboxes = fixture.nativeElement.querySelectorAll('[baseUiCheckboxRoot]');
    });

    it('should bind to ngModel', async () => {
      checkboxes[0].click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.selectedValues).toContain('a');
    });

    it('should update view when ngModel changes', async () => {
      component.selectedValues = ['b'];
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(checkboxes[1].getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('FormControl integration', () => {
    @Component({
      template: `
        <div baseUiCheckboxGroup [formControl]="control">
          <button baseUiCheckboxRoot value="x">X</button>
          <button baseUiCheckboxRoot value="y">Y</button>
        </div>
      `,
      standalone: true,
      imports: [CheckboxGroupDirective, CheckboxRootDirective, ReactiveFormsModule],
    })
    class TestComponent {
      control = new FormControl<string[]>([]);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkboxes: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkboxes = fixture.nativeElement.querySelectorAll('[baseUiCheckboxRoot]');
    });

    it('should bind to FormControl', () => {
      checkboxes[0].click();
      fixture.detectChanges();

      expect(component.control.value).toContain('x');
    });

    it('should update view when FormControl changes', () => {
      component.control.setValue(['y']);
      fixture.detectChanges();

      expect(checkboxes[1].getAttribute('aria-checked')).toBe('true');
    });
  });
});

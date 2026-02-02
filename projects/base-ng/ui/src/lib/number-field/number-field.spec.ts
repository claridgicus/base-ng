/**
 * @fileoverview Tests for NumberField component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/number-field/NumberField.test.tsx
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { NumberFieldRootDirective } from './number-field-root.directive';
import { NumberFieldInputDirective } from './number-field-input.directive';
import { NumberFieldIncrementDirective } from './number-field-increment.directive';
import { NumberFieldDecrementDirective } from './number-field-decrement.directive';

describe('NumberField component', () => {
  describe('Basic number field', () => {
    @Component({
      template: `
        <div baseUiNumberFieldRoot [(value)]="quantity" [min]="0" [max]="100" [step]="1">
          <button baseUiNumberFieldDecrement>-</button>
          <input baseUiNumberFieldInput />
          <button baseUiNumberFieldIncrement>+</button>
        </div>
      `,
      standalone: true,
      imports: [
        NumberFieldRootDirective,
        NumberFieldInputDirective,
        NumberFieldIncrementDirective,
        NumberFieldDecrementDirective,
      ],
    })
    class TestComponent {
      quantity: number | null = 5;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let input: HTMLInputElement;
    let incrementBtn: HTMLButtonElement;
    let decrementBtn: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiNumberFieldRoot]');
      input = fixture.nativeElement.querySelector('[baseUiNumberFieldInput]');
      incrementBtn = fixture.nativeElement.querySelector('[baseUiNumberFieldIncrement]');
      decrementBtn = fixture.nativeElement.querySelector('[baseUiNumberFieldDecrement]');
    });

    it('should render all parts', () => {
      expect(root).toBeTruthy();
      expect(input).toBeTruthy();
      expect(incrementBtn).toBeTruthy();
      expect(decrementBtn).toBeTruthy();
    });

    it('should have role group on root', () => {
      expect(root.getAttribute('role')).toBe('group');
    });

    it('should have number-field class on root', () => {
      expect(root.classList.contains('base-ui-number-field')).toBe(true);
    });

    it('should have input class', () => {
      expect(input.classList.contains('base-ui-number-field-input')).toBe(true);
    });

    it('should have increment class', () => {
      expect(incrementBtn.classList.contains('base-ui-number-field-increment')).toBe(true);
    });

    it('should have decrement class', () => {
      expect(decrementBtn.classList.contains('base-ui-number-field-decrement')).toBe(true);
    });

    it('should display initial value in input', () => {
      expect(input.value).toBe('5');
    });

    it('should increment value on button click', () => {
      incrementBtn.click();
      fixture.detectChanges();
      expect(component.quantity).toBe(6);
      expect(input.value).toBe('6');
    });

    it('should decrement value on button click', () => {
      decrementBtn.click();
      fixture.detectChanges();
      expect(component.quantity).toBe(4);
      expect(input.value).toBe('4');
    });

    it('should have aria attributes on input', () => {
      expect(input.getAttribute('aria-valuemin')).toBe('0');
      expect(input.getAttribute('aria-valuemax')).toBe('100');
      expect(input.getAttribute('aria-valuenow')).toBe('5');
    });
  });

  describe('Keyboard navigation', () => {
    @Component({
      template: `
        <div baseUiNumberFieldRoot [(value)]="quantity" [min]="0" [max]="100" [step]="5" [largeStep]="20">
          <input baseUiNumberFieldInput />
        </div>
      `,
      standalone: true,
      imports: [NumberFieldRootDirective, NumberFieldInputDirective],
    })
    class TestComponent {
      quantity: number | null = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let input: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('[baseUiNumberFieldInput]');
    });

    it('should increment on ArrowUp', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(55);
    });

    it('should decrement on ArrowDown', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(45);
    });

    it('should use large step on PageUp', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(70);
    });

    it('should use large step on PageDown', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(30);
    });

    it('should go to min on Home', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(0);
    });

    it('should go to max on End', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(100);
    });

    it('should use large step with Shift+Arrow', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true, cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(70);
    });
  });

  describe('Value clamping', () => {
    @Component({
      template: `
        <div baseUiNumberFieldRoot [(value)]="quantity" [min]="10" [max]="90">
          <button baseUiNumberFieldDecrement>-</button>
          <input baseUiNumberFieldInput />
          <button baseUiNumberFieldIncrement>+</button>
        </div>
      `,
      standalone: true,
      imports: [
        NumberFieldRootDirective,
        NumberFieldInputDirective,
        NumberFieldIncrementDirective,
        NumberFieldDecrementDirective,
      ],
    })
    class TestComponent {
      quantity: number | null = 50;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let input: HTMLInputElement;
    let incrementBtn: HTMLButtonElement;
    let decrementBtn: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('[baseUiNumberFieldInput]');
      incrementBtn = fixture.nativeElement.querySelector('[baseUiNumberFieldIncrement]');
      decrementBtn = fixture.nativeElement.querySelector('[baseUiNumberFieldDecrement]');
    });

    it('should not exceed max', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(90);

      incrementBtn.click();
      fixture.detectChanges();
      expect(component.quantity).toBe(90); // Should not change
    });

    it('should not go below min', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(10);

      decrementBtn.click();
      fixture.detectChanges();
      expect(component.quantity).toBe(10); // Should not change
    });

    it('should disable increment at max', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
      fixture.detectChanges();

      expect(incrementBtn.hasAttribute('disabled')).toBe(true);
    });

    it('should disable decrement at min', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
      fixture.detectChanges();

      expect(decrementBtn.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div baseUiNumberFieldRoot [(value)]="quantity" [disabled]="true">
          <button baseUiNumberFieldDecrement>-</button>
          <input baseUiNumberFieldInput />
          <button baseUiNumberFieldIncrement>+</button>
        </div>
      `,
      standalone: true,
      imports: [
        NumberFieldRootDirective,
        NumberFieldInputDirective,
        NumberFieldIncrementDirective,
        NumberFieldDecrementDirective,
      ],
    })
    class TestComponent {
      quantity: number | null = 5;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let input: HTMLInputElement;
    let incrementBtn: HTMLButtonElement;
    let decrementBtn: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiNumberFieldRoot]');
      input = fixture.nativeElement.querySelector('[baseUiNumberFieldInput]');
      incrementBtn = fixture.nativeElement.querySelector('[baseUiNumberFieldIncrement]');
      decrementBtn = fixture.nativeElement.querySelector('[baseUiNumberFieldDecrement]');
    });

    it('should have data-disabled on root', () => {
      expect(root.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled class on root', () => {
      expect(root.classList.contains('base-ui-number-field-disabled')).toBe(true);
    });

    it('should have disabled attribute on input', () => {
      expect(input.hasAttribute('disabled')).toBe(true);
    });

    it('should not change value when disabled', () => {
      incrementBtn.click();
      fixture.detectChanges();
      expect(component.quantity).toBe(5);
    });
  });

  describe('Null value handling', () => {
    @Component({
      template: `
        <div baseUiNumberFieldRoot [(value)]="quantity">
          <input baseUiNumberFieldInput />
        </div>
      `,
      standalone: true,
      imports: [NumberFieldRootDirective, NumberFieldInputDirective],
    })
    class TestComponent {
      quantity: number | null = null;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let input: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('[baseUiNumberFieldInput]');
    });

    it('should handle null value', () => {
      expect(input.value).toBe('');
      expect(component.quantity).toBeNull();
    });

    it('should allow incrementing from null', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
      fixture.detectChanges();
      expect(component.quantity).toBe(1); // 0 + step(1)
    });
  });

  describe('ngModel integration', () => {
    @Component({
      template: `
        <div baseUiNumberFieldRoot [(ngModel)]="quantity">
          <input baseUiNumberFieldInput />
        </div>
      `,
      standalone: true,
      imports: [NumberFieldRootDirective, NumberFieldInputDirective, FormsModule],
    })
    class TestComponent {
      quantity: number | null = 10;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let input: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
      input = fixture.nativeElement.querySelector('[baseUiNumberFieldInput]');
    });

    it('should bind to ngModel', async () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.quantity).toBe(11);
    });

    it('should display ngModel value', async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(input.value).toBe('10');
    });
  });

  describe('FormControl integration', () => {
    @Component({
      template: `
        <div baseUiNumberFieldRoot [formControl]="control">
          <input baseUiNumberFieldInput />
        </div>
      `,
      standalone: true,
      imports: [NumberFieldRootDirective, NumberFieldInputDirective, ReactiveFormsModule],
    })
    class TestComponent {
      control = new FormControl<number | null>(15);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let input: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('[baseUiNumberFieldInput]');
    });

    it('should bind to FormControl', () => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
      fixture.detectChanges();

      expect(component.control.value).toBe(16);
    });

    it('should display FormControl value', () => {
      expect(input.value).toBe('15');
    });

    it('should update view when FormControl changes', () => {
      component.control.setValue(25);
      fixture.detectChanges();

      expect(input.value).toBe('25');
    });
  });
});

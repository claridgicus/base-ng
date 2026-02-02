/**
 * @fileoverview Tests for Input component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/input/Input.test.tsx
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { InputDirective } from './input.directive';

describe('Input component', () => {
  describe('Basic usage', () => {
    @Component({
      template: `
        <input baseUiInput
               [(value)]="value"
               [disabled]="disabled()"
               [invalid]="invalid()"
               placeholder="Enter text" />
      `,
      standalone: true,
      imports: [InputDirective],
    })
    class TestComponent {
      value = signal('');
      disabled = signal(false);
      invalid = signal(false);
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
      input = fixture.nativeElement.querySelector('[baseUiInput]');
    });

    it('should render input element', () => {
      expect(input).toBeTruthy();
      expect(input.tagName.toLowerCase()).toBe('input');
    });

    it('should have input class', () => {
      expect(input.classList.contains('base-ui-input')).toBe(true);
    });

    it('should update value on input', () => {
      input.value = 'test value';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.value()).toBe('test value');
    });

    it('should have filled class when has value', () => {
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.classList.contains('base-ui-input-filled')).toBe(true);
      expect(input.hasAttribute('data-filled')).toBe(true);
    });

    it('should not have filled class when empty', () => {
      expect(input.classList.contains('base-ui-input-filled')).toBe(false);
      expect(input.hasAttribute('data-filled')).toBe(false);
    });

    it('should have focused class when focused', () => {
      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(input.classList.contains('base-ui-input-focused')).toBe(true);
      expect(input.hasAttribute('data-focused')).toBe(true);
    });

    it('should remove focused class on blur', () => {
      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(input.classList.contains('base-ui-input-focused')).toBe(false);
      expect(input.hasAttribute('data-focused')).toBe(false);
    });

    it('should have disabled attribute when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
      expect(input.classList.contains('base-ui-input-disabled')).toBe(true);
      expect(input.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have invalid class when invalid', () => {
      component.invalid.set(true);
      fixture.detectChanges();

      expect(input.classList.contains('base-ui-input-invalid')).toBe(true);
      expect(input.hasAttribute('data-invalid')).toBe(true);
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should not have aria-invalid when valid', () => {
      expect(input.getAttribute('aria-invalid')).toBeNull();
    });
  });

  describe('With textarea', () => {
    @Component({
      template: `
        <textarea baseUiInput [(value)]="value"></textarea>
      `,
      standalone: true,
      imports: [InputDirective],
    })
    class TestComponent {
      value = signal('');
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let textarea: HTMLTextAreaElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      textarea = fixture.nativeElement.querySelector('[baseUiInput]');
    });

    it('should render textarea element', () => {
      expect(textarea).toBeTruthy();
      expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });

    it('should update value on input', () => {
      textarea.value = 'multiline\ntext';
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.value()).toBe('multiline\ntext');
    });
  });

  describe('With ngModel', () => {
    @Component({
      template: `
        <input baseUiInput [(ngModel)]="value" />
      `,
      standalone: true,
      imports: [InputDirective, FormsModule],
    })
    class TestComponent {
      value = '';
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
      input = fixture.nativeElement.querySelector('[baseUiInput]');
    });

    it('should initialize with ngModel value', async () => {
      component.value = 'initial';
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(input.value).toBe('initial');
    });

    it('should update ngModel on input', async () => {
      input.value = 'typed value';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.value).toBe('typed value');
    });
  });

  describe('valueChange output', () => {
    @Component({
      template: `
        <input baseUiInput
               [value]="value()"
               (valueChange)="onValueChange($event)" />
      `,
      standalone: true,
      imports: [InputDirective],
    })
    class TestComponent {
      value = signal('');
      valueChangeSpy = vi.fn();

      onValueChange(newValue: string): void {
        this.valueChangeSpy(newValue);
        this.value.set(newValue);
      }
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
      input = fixture.nativeElement.querySelector('[baseUiInput]');
    });

    it('should emit valueChange on input', () => {
      input.value = 'new value';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.valueChangeSpy).toHaveBeenCalledWith('new value');
    });

    it('should emit on each change', () => {
      input.value = 'a';
      input.dispatchEvent(new Event('input'));

      input.value = 'ab';
      input.dispatchEvent(new Event('input'));

      expect(component.valueChangeSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('valueChangeDetails output', () => {
    @Component({
      template: `
        <input baseUiInput
               [(value)]="value"
               (valueChangeDetails)="onValueChangeDetails($event)" />
      `,
      standalone: true,
      imports: [InputDirective],
    })
    class TestComponent {
      value = signal('');
      detailsSpy = vi.fn();

      onValueChangeDetails(details: { value: string; event: Event }): void {
        this.detailsSpy(details);
      }
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
      input = fixture.nativeElement.querySelector('[baseUiInput]');
    });

    it('should emit details with value and event', () => {
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.detailsSpy).toHaveBeenCalled();
      const call = component.detailsSpy.mock.calls[0][0];
      expect(call.value).toBe('test');
      expect(call.event).toBeInstanceOf(Event);
    });
  });

  describe('Initial value', () => {
    @Component({
      template: `
        <input baseUiInput [value]="'initial text'" />
      `,
      standalone: true,
      imports: [InputDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let input: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('[baseUiInput]');
    });

    it('should have filled class with initial value', () => {
      expect(input.classList.contains('base-ui-input-filled')).toBe(true);
    });
  });
});

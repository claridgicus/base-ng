/**
 * @component Form
 * @fileoverview Tests for Form component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/form/Form.test.tsx
 * @parity Verified against React Base UI - includes State Attributes and Form submission test categories
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { FormRootDirective } from './form-root.directive';
import { FormSubmitEventDetails } from './form.types';

describe('Form component', () => {
  describe('Basic form', () => {
    @Component({
      template: `
        <form baseUiFormRoot (formSubmit)="onSubmit($event)">
          <input type="text" name="username" value="testuser" />
          <input type="email" name="email" value="test@example.com" />
          <button type="submit">Submit</button>
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {
      lastSubmit: FormSubmitEventDetails | null = null;

      onSubmit(event: FormSubmitEventDetails) {
        this.lastSubmit = event;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let form: HTMLFormElement;
    let submitBtn: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      form = fixture.nativeElement.querySelector('form');
      submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    });

    it('should render form', () => {
      expect(form).toBeTruthy();
    });

    it('should have form class', () => {
      expect(form.classList.contains('base-ui-form')).toBe(true);
    });

    it('should have novalidate attribute', () => {
      expect(form.hasAttribute('novalidate')).toBe(true);
    });

    it('should emit formSubmit with values on submit', () => {
      submitBtn.click();
      fixture.detectChanges();

      expect(component.lastSubmit).toBeTruthy();
      expect(component.lastSubmit!.values).toEqual({
        username: 'testuser',
        email: 'test@example.com',
      });
    });

    it('should have data-submitted after submit', () => {
      submitBtn.click();
      fixture.detectChanges();

      expect(form.hasAttribute('data-submitted')).toBe(true);
    });

    it('should have submitted class after submit', () => {
      submitBtn.click();
      fixture.detectChanges();

      expect(form.classList.contains('base-ui-form-submitted')).toBe(true);
    });
  });

  describe('Form reset', () => {
    @Component({
      template: `
        <form baseUiFormRoot (formReset)="onReset()">
          <input type="text" name="field" />
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {
      resetCalled = false;

      onReset() {
        this.resetCalled = true;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let form: HTMLFormElement;
    let submitBtn: HTMLButtonElement;
    let resetBtn: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      form = fixture.nativeElement.querySelector('form');
      submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
      resetBtn = fixture.nativeElement.querySelector('button[type="reset"]');
    });

    it('should emit formReset on reset', () => {
      resetBtn.click();
      fixture.detectChanges();

      expect(component.resetCalled).toBe(true);
    });

    it('should remove submitted state on reset', () => {
      submitBtn.click();
      fixture.detectChanges();
      expect(form.hasAttribute('data-submitted')).toBe(true);

      resetBtn.click();
      fixture.detectChanges();
      expect(form.hasAttribute('data-submitted')).toBe(false);
    });
  });

  describe('Validation mode - onSubmit', () => {
    @Component({
      template: `
        <form baseUiFormRoot validationMode="onSubmit" #formRef="formRoot">
          <input type="text" name="field" />
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {}

    it('should accept onSubmit validation mode', async () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const formDirective = fixture.debugElement.children[0].injector.get(FormRootDirective);
      expect(formDirective.validationMode).toBe('onSubmit');
    });
  });

  describe('Validation mode - onBlur', () => {
    @Component({
      template: `
        <form baseUiFormRoot validationMode="onBlur" #formRef="formRoot">
          <input type="text" name="field" />
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {}

    it('should accept onBlur validation mode', async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const formDirective = fixture.debugElement.children[0].injector.get(FormRootDirective);
      expect(formDirective.validationMode).toBe('onBlur');
    });
  });

  describe('Validation mode - onChange', () => {
    @Component({
      template: `
        <form baseUiFormRoot validationMode="onChange" #formRef="formRoot">
          <input type="text" name="field" />
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {}

    it('should accept onChange validation mode', async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const formDirective = fixture.debugElement.children[0].injector.get(FormRootDirective);
      expect(formDirective.validationMode).toBe('onChange');
    });
  });

  describe('Error management', () => {
    @Component({
      template: `
        <form baseUiFormRoot #formRef="formRoot">
          <input type="text" name="email" />
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let formDirective: FormRootDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      formDirective = fixture.debugElement.children[0].injector.get(FormRootDirective);
    });

    it('should set error for a field', () => {
      formDirective.setError('email', 'Invalid email');
      expect(formDirective.getError('email')).toBe('Invalid email');
    });

    it('should support array of errors', () => {
      formDirective.setError('email', ['Required', 'Invalid format']);
      expect(formDirective.getError('email')).toEqual(['Required', 'Invalid format']);
    });

    it('should clear error for a field', () => {
      formDirective.setError('email', 'Invalid email');
      formDirective.clearError('email');
      expect(formDirective.getError('email')).toBeUndefined();
    });

    it('should clear all errors', () => {
      formDirective.setError('email', 'Invalid email');
      formDirective.setError('name', 'Required');
      formDirective.clearAllErrors();
      expect(formDirective.getError('email')).toBeUndefined();
      expect(formDirective.getError('name')).toBeUndefined();
    });
  });

  describe('Native validation', () => {
    @Component({
      template: `
        <form baseUiFormRoot (formSubmit)="onSubmit($event)">
          <input type="email" name="email" required />
          <button type="submit">Submit</button>
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {
      submitted = false;

      onSubmit(event: FormSubmitEventDetails) {
        this.submitted = true;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let input: HTMLInputElement;
    let submitBtn: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      input = fixture.nativeElement.querySelector('input');
      submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    });

    it('should prevent submit when invalid', () => {
      submitBtn.click();
      fixture.detectChanges();

      expect(component.submitted).toBe(false);
    });

    it('should allow submit when valid', () => {
      input.value = 'test@example.com';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      submitBtn.click();
      fixture.detectChanges();

      expect(component.submitted).toBe(true);
    });
  });

  describe('Programmatic submit and reset', () => {
    @Component({
      template: `
        <form baseUiFormRoot #formRef="formRoot" (formSubmit)="onSubmit($event)" (formReset)="onReset()">
          <input type="text" name="field" value="test" />
        </form>
      `,
      standalone: true,
      imports: [FormRootDirective],
    })
    class TestComponent {
      submitted = false;
      reset = false;

      onSubmit(event: FormSubmitEventDetails) {
        this.submitted = true;
      }

      onReset() {
        this.reset = true;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let formDirective: FormRootDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      formDirective = fixture.debugElement.children[0].injector.get(FormRootDirective);
    });

    it('should submit programmatically', () => {
      formDirective.submit();
      fixture.detectChanges();

      expect(component.submitted).toBe(true);
    });

    it('should reset programmatically', () => {
      formDirective.reset();
      fixture.detectChanges();

      expect(component.reset).toBe(true);
    });
  });
});

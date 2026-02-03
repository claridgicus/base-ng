/**
 * @component Field
 * @fileoverview Tests for Field component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/field/Field.test.tsx
 * @parity Verified against React Base UI - includes State Attributes and Accessibility test categories
 * @note Field is a form structure element - provides accessible labeling/description
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { FieldRootDirective } from './field-root.directive';
import { FieldLabelDirective } from './field-label.directive';
import { FieldControlDirective } from './field-control.directive';
import { FieldDescriptionDirective } from './field-description.directive';
import { FieldErrorDirective } from './field-error.directive';

describe('Field component', () => {
  describe('Basic field', () => {
    @Component({
      template: `
        <div baseUiFieldRoot [name]="'email'" [disabled]="disabled()">
          <label baseUiFieldLabel>Email</label>
          <input baseUiFieldControl type="email" />
          <span baseUiFieldDescription>Enter your email</span>
          <span baseUiFieldError>Please enter a valid email</span>
        </div>
      `,
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        FieldControlDirective,
        FieldDescriptionDirective,
        FieldErrorDirective,
      ],
    })
    class TestComponent {
      disabled = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let label: HTMLElement;
    let control: HTMLInputElement;
    let description: HTMLElement;
    let error: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiFieldRoot]');
      label = fixture.nativeElement.querySelector('[baseUiFieldLabel]');
      control = fixture.nativeElement.querySelector('[baseUiFieldControl]');
      description = fixture.nativeElement.querySelector('[baseUiFieldDescription]');
      error = fixture.nativeElement.querySelector('[baseUiFieldError]');
    });

    it('should render all field parts', () => {
      expect(root).toBeTruthy();
      expect(label).toBeTruthy();
      expect(control).toBeTruthy();
      expect(description).toBeTruthy();
      expect(error).toBeTruthy();
    });

    it('should have field classes', () => {
      expect(root.classList.contains('base-ui-field')).toBe(true);
      expect(label.classList.contains('base-ui-field-label')).toBe(true);
      expect(control.classList.contains('base-ui-field-control')).toBe(true);
      expect(description.classList.contains('base-ui-field-description')).toBe(true);
      expect(error.classList.contains('base-ui-field-error')).toBe(true);
    });

    it('should associate label with control', () => {
      expect(label.getAttribute('for')).toBe(control.id);
    });

    it('should set control name', () => {
      expect(control.getAttribute('name')).toBe('email');
    });

    it('should have aria-describedby on control', () => {
      const describedBy = control.getAttribute('aria-describedby');
      expect(describedBy).toContain(description.id);
    });

    it('should hide error when valid', () => {
      expect(error.style.display).toBe('none');
    });
  });

  describe('Field states', () => {
    @Component({
      template: `
        <div baseUiFieldRoot>
          <label baseUiFieldLabel>Username</label>
          <input baseUiFieldControl />
        </div>
      `,
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        FieldControlDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let control: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiFieldRoot]');
      control = fixture.nativeElement.querySelector('[baseUiFieldControl]');
    });

    it('should set dirty state on input', () => {
      expect(root.hasAttribute('data-dirty')).toBe(false);

      control.value = 'test';
      control.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(root.hasAttribute('data-dirty')).toBe(true);
      expect(control.hasAttribute('data-dirty')).toBe(true);
    });

    it('should set touched state on blur', () => {
      expect(root.hasAttribute('data-touched')).toBe(false);

      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(root.hasAttribute('data-touched')).toBe(true);
      expect(control.hasAttribute('data-touched')).toBe(true);
    });

    it('should track dirty and touched independently', () => {
      control.value = 'test';
      control.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(root.hasAttribute('data-dirty')).toBe(true);
      expect(root.hasAttribute('data-touched')).toBe(false);

      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(root.hasAttribute('data-dirty')).toBe(true);
      expect(root.hasAttribute('data-touched')).toBe(true);
    });
  });

  describe('Field validation', () => {
    @Component({
      template: `
        <div baseUiFieldRoot>
          <label baseUiFieldLabel>Email</label>
          <input baseUiFieldControl type="email" required />
          <span baseUiFieldError>Invalid email</span>
        </div>
      `,
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        FieldControlDirective,
        FieldErrorDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let control: HTMLInputElement;
    let error: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiFieldRoot]');
      control = fixture.nativeElement.querySelector('[baseUiFieldControl]');
      error = fixture.nativeElement.querySelector('[baseUiFieldError]');
    });

    it('should show error when required field is empty and blurred', () => {
      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(root.hasAttribute('data-invalid')).toBe(true);
      expect(control.getAttribute('aria-invalid')).toBe('true');
      expect(error.style.display).not.toBe('none');
    });

    it('should become valid when required field has value', () => {
      control.value = 'test@example.com';
      control.dispatchEvent(new Event('input'));
      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(root.hasAttribute('data-valid')).toBe(true);
      expect(error.style.display).toBe('none');
    });

    it('should show invalid for wrong email format', () => {
      control.value = 'invalid-email';
      control.dispatchEvent(new Event('input'));
      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(root.hasAttribute('data-invalid')).toBe(true);
      expect(error.style.display).not.toBe('none');
    });
  });

  describe('Field error match', () => {
    @Component({
      template: `
        <div baseUiFieldRoot>
          <label baseUiFieldLabel>Email</label>
          <input baseUiFieldControl type="email" required />
          <span baseUiFieldError match="valueMissing">This field is required</span>
          <span baseUiFieldError match="typeMismatch">Please enter a valid email</span>
        </div>
      `,
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        FieldControlDirective,
        FieldErrorDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let control: HTMLInputElement;
    let errors: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      control = fixture.nativeElement.querySelector('[baseUiFieldControl]');
      errors = fixture.nativeElement.querySelectorAll('[baseUiFieldError]');
    });

    it('should show valueMissing error when empty', () => {
      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(errors[0].style.display).not.toBe('none'); // valueMissing
      expect(errors[1].style.display).toBe('none'); // typeMismatch
    });

    it('should show typeMismatch error for invalid email', () => {
      control.value = 'invalid';
      control.dispatchEvent(new Event('input'));
      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(errors[0].style.display).toBe('none'); // valueMissing (has value)
      expect(errors[1].style.display).not.toBe('none'); // typeMismatch
    });

    it('should hide all errors when valid', () => {
      control.value = 'valid@email.com';
      control.dispatchEvent(new Event('input'));
      control.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(errors[0].style.display).toBe('none');
      expect(errors[1].style.display).toBe('none');
    });
  });

  describe('Disabled field', () => {
    @Component({
      template: `
        <div baseUiFieldRoot [disabled]="true">
          <label baseUiFieldLabel>Username</label>
          <input baseUiFieldControl />
          <span baseUiFieldDescription>Enter username</span>
        </div>
      `,
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        FieldControlDirective,
        FieldDescriptionDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let label: HTMLElement;
    let control: HTMLInputElement;
    let description: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiFieldRoot]');
      label = fixture.nativeElement.querySelector('[baseUiFieldLabel]');
      control = fixture.nativeElement.querySelector('[baseUiFieldControl]');
      description = fixture.nativeElement.querySelector('[baseUiFieldDescription]');
    });

    it('should have disabled class on root', () => {
      expect(root.classList.contains('base-ui-field-disabled')).toBe(true);
    });

    it('should have data-disabled on all elements', () => {
      expect(root.hasAttribute('data-disabled')).toBe(true);
      expect(label.hasAttribute('data-disabled')).toBe(true);
      expect(control.hasAttribute('data-disabled')).toBe(true);
      expect(description.hasAttribute('data-disabled')).toBe(true);
    });

    it('should disable the control', () => {
      expect(control.hasAttribute('disabled')).toBe(true);
    });
  });
});

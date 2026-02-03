/**
 * @fileoverview Tests for Checkbox component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/checkbox/Checkbox.test.tsx
 * @parity Verified against React Base UI
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { describe, expect, it, beforeEach } from 'vitest';
import { CheckboxRootDirective } from './checkbox-root.directive';
import { CheckboxIndicatorDirective } from './checkbox-indicator.directive';

describe('Checkbox component', () => {
  describe('Basic checkbox', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [(checked)]="checked">
          <span baseUiCheckboxIndicator>✓</span>
          Accept terms
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective, CheckboxIndicatorDirective],
    })
    class TestComponent {
      checked = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;
    let indicator: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
      indicator = fixture.nativeElement.querySelector('[baseUiCheckboxIndicator]');
    });

    it('should render checkbox and indicator', () => {
      expect(checkbox).toBeTruthy();
      expect(indicator).toBeTruthy();
    });

    it('should have role checkbox', () => {
      expect(checkbox.getAttribute('role')).toBe('checkbox');
    });

    it('should have checkbox classes', () => {
      expect(checkbox.classList.contains('base-ui-checkbox')).toBe(true);
      expect(indicator.classList.contains('base-ui-checkbox-indicator')).toBe(true);
    });

    it('should have unchecked state initially', () => {
      expect(checkbox.getAttribute('aria-checked')).toBe('false');
      expect(checkbox.hasAttribute('data-unchecked')).toBe(true);
      expect(checkbox.hasAttribute('data-checked')).toBe(false);
    });

    it('should hide indicator when unchecked', () => {
      expect(indicator.style.display).toBe('none');
    });

    it('should toggle checked on click', () => {
      checkbox.click();
      fixture.detectChanges();

      expect(checkbox.getAttribute('aria-checked')).toBe('true');
      expect(checkbox.hasAttribute('data-checked')).toBe(true);
      expect(component.checked()).toBe(true);
    });

    it('should show indicator when checked', () => {
      checkbox.click();
      fixture.detectChanges();

      expect(indicator.style.display).not.toBe('none');
    });

    it('should toggle back to unchecked', () => {
      checkbox.click();
      fixture.detectChanges();
      checkbox.click();
      fixture.detectChanges();

      expect(checkbox.getAttribute('aria-checked')).toBe('false');
      expect(component.checked()).toBe(false);
    });
  });

  describe('Controlled checkbox', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [checked]="checked()">
          Controlled
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective],
    })
    class TestComponent {
      checked = signal(true);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should reflect controlled state', () => {
      expect(checkbox.getAttribute('aria-checked')).toBe('true');
    });

    it('should update when controlled value changes', () => {
      component.checked.set(false);
      fixture.detectChanges();

      expect(checkbox.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('Indeterminate state', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [(checked)]="checked" [(indeterminate)]="indeterminate">
          <span baseUiCheckboxIndicator>─</span>
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective, CheckboxIndicatorDirective],
    })
    class TestComponent {
      checked = signal(false);
      indeterminate = signal(true);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;
    let indicator: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
      indicator = fixture.nativeElement.querySelector('[baseUiCheckboxIndicator]');
    });

    it('should have aria-checked mixed for indeterminate', () => {
      expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
    });

    it('should have data-indeterminate attribute', () => {
      expect(checkbox.hasAttribute('data-indeterminate')).toBe(true);
    });

    it('should show indicator when indeterminate', () => {
      expect(indicator.style.display).not.toBe('none');
    });

    it('should clear indeterminate on click', () => {
      checkbox.click();
      fixture.detectChanges();

      expect(component.indeterminate()).toBe(false);
      expect(checkbox.hasAttribute('data-indeterminate')).toBe(false);
    });
  });

  describe('Disabled checkbox', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [disabled]="true" [(checked)]="checked">
          Disabled
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective],
    })
    class TestComponent {
      checked = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should have aria-disabled', () => {
      expect(checkbox.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have disabled attribute', () => {
      expect(checkbox.hasAttribute('disabled')).toBe(true);
    });

    it('should have data-disabled attribute', () => {
      expect(checkbox.hasAttribute('data-disabled')).toBe(true);
    });

    it('should not toggle on click when disabled', () => {
      checkbox.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Read-only checkbox', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [readOnly]="true" [checked]="true">
          Read-only
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should have aria-readonly', () => {
      expect(checkbox.getAttribute('aria-readonly')).toBe('true');
    });

    it('should have data-readonly attribute', () => {
      expect(checkbox.hasAttribute('data-readonly')).toBe(true);
    });

    it('should not toggle on click when read-only', () => {
      const initialState = checkbox.getAttribute('aria-checked');
      checkbox.click();
      fixture.detectChanges();

      expect(checkbox.getAttribute('aria-checked')).toBe(initialState);
    });
  });

  describe('Required checkbox', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [required]="true">
          Required
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should have aria-required', () => {
      expect(checkbox.getAttribute('aria-required')).toBe('true');
    });

    it('should have data-required attribute', () => {
      expect(checkbox.hasAttribute('data-required')).toBe(true);
    });
  });

  describe('Keyboard interaction', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [(checked)]="checked">
          Keyboard
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective],
    })
    class TestComponent {
      checked = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should toggle on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      checkbox.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should prevent default on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
      checkbox.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });

    it('should not toggle on other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      checkbox.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Change event', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot (checkedChange)="onChange($event)">
          Event
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective],
    })
    class TestComponent {
      lastEvent: any;
      onChange(event: any) {
        this.lastEvent = event;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should emit checkedChange on toggle', () => {
      checkbox.click();
      fixture.detectChanges();

      expect(component.lastEvent).toBe(true);
    });
  });

  describe('ngModel integration', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [(ngModel)]="checked">
          ngModel
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective, FormsModule],
    })
    class TestComponent {
      checked = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should bind to ngModel', async () => {
      checkbox.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(component.checked).toBe(true);
    });

    it('should update view when ngModel changes', async () => {
      component.checked = true;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges(); // Need extra cycle for ngModel binding

      expect(checkbox.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('FormControl integration', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot [formControl]="control">
          FormControl
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective, ReactiveFormsModule],
    })
    class TestComponent {
      control = new FormControl(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let checkbox: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      checkbox = fixture.nativeElement.querySelector('[baseUiCheckboxRoot]');
    });

    it('should bind to FormControl', () => {
      checkbox.click();
      fixture.detectChanges();

      expect(component.control.value).toBe(true);
    });

    it('should update view when FormControl changes', () => {
      component.control.setValue(true);
      fixture.detectChanges();

      expect(checkbox.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('Indicator keepMounted', () => {
    @Component({
      template: `
        <button baseUiCheckboxRoot>
          <span baseUiCheckboxIndicator [keepMounted]="true">✓</span>
        </button>
      `,
      standalone: true,
      imports: [CheckboxRootDirective, CheckboxIndicatorDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let indicator: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      indicator = fixture.nativeElement.querySelector('[baseUiCheckboxIndicator]');
    });

    it('should show indicator when keepMounted even if unchecked', () => {
      expect(indicator.style.display).not.toBe('none');
    });
  });
});

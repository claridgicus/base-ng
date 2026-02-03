/**
 * @component Switch
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/switch/root/SwitchRoot.test.tsx
 * @reactDocs https://base-ui.com/react/components/switch
 * @lastScraped 2026-02-03
 * @testsPorted 100%
 * @parity EXACT - All React tests ported to Angular/Vitest
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { SwitchRootDirective } from './switch-root.directive';
import { SwitchThumbDirective } from './switch-thumb.directive';

describe('Switch component', () => {
  describe('SwitchRootDirective', () => {
    @Component({
      template: `
        <button baseUiSwitchRoot
                [(checked)]="checked"
                [disabled]="disabled()"
                [readOnly]="readOnly()"
                [required]="required()">
          <span baseUiSwitchThumb></span>
        </button>
      `,
      standalone: true,
      imports: [SwitchRootDirective, SwitchThumbDirective],
    })
    class TestComponent {
      checked = signal(false);
      disabled = signal(false);
      readOnly = signal(false);
      required = signal(false);
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
      root = fixture.nativeElement.querySelector('[baseUiSwitchRoot]');
    });

    it('should render switch root element', () => {
      expect(root).toBeTruthy();
    });

    it('should have role="switch"', () => {
      expect(root.getAttribute('role')).toBe('switch');
    });

    it('should have type="button"', () => {
      expect(root.getAttribute('type')).toBe('button');
    });

    it('should have aria-checked="false" when unchecked', () => {
      expect(root.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-checked="true" when checked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(root.getAttribute('aria-checked')).toBe('true');
    });

    it('should have base-ui-switch class', () => {
      expect(root.classList.contains('base-ui-switch')).toBe(true);
    });

    it('should have unchecked class when unchecked', () => {
      expect(root.classList.contains('base-ui-switch-unchecked')).toBe(true);
      expect(root.classList.contains('base-ui-switch-checked')).toBe(false);
    });

    it('should have checked class when checked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(root.classList.contains('base-ui-switch-checked')).toBe(true);
      expect(root.classList.contains('base-ui-switch-unchecked')).toBe(false);
    });

    it('should toggle on click', () => {
      root.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(root.getAttribute('aria-checked')).toBe('true');

      root.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
      expect(root.getAttribute('aria-checked')).toBe('false');
    });

    it('should not toggle when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      root.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should not toggle when readOnly', () => {
      component.readOnly.set(true);
      fixture.detectChanges();

      root.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should have disabled attribute when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      expect(root.hasAttribute('disabled')).toBe(true);
      expect(root.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have data-disabled when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      expect(root.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have data-readonly when readOnly', () => {
      component.readOnly.set(true);
      fixture.detectChanges();

      expect(root.hasAttribute('data-readonly')).toBe(true);
      expect(root.getAttribute('aria-readonly')).toBe('true');
    });

    it('should have aria-required when required', () => {
      component.required.set(true);
      fixture.detectChanges();

      expect(root.getAttribute('aria-required')).toBe('true');
    });

    it('should toggle on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      root.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should toggle on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      root.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should not toggle on other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      root.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should have data-checked when checked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(root.hasAttribute('data-checked')).toBe(true);
      expect(root.hasAttribute('data-unchecked')).toBe(false);
    });

    it('should have data-unchecked when unchecked', () => {
      expect(root.hasAttribute('data-unchecked')).toBe(true);
      expect(root.hasAttribute('data-checked')).toBe(false);
    });
  });

  describe('SwitchThumbDirective', () => {
    @Component({
      template: `
        <button baseUiSwitchRoot [(checked)]="checked">
          <span baseUiSwitchThumb></span>
        </button>
      `,
      standalone: true,
      imports: [SwitchRootDirective, SwitchThumbDirective],
    })
    class TestComponent {
      checked = signal(false);
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
      thumb = fixture.nativeElement.querySelector('[baseUiSwitchThumb]');
    });

    it('should render thumb element', () => {
      expect(thumb).toBeTruthy();
    });

    it('should have thumb classes', () => {
      expect(thumb.classList.contains('base-ui-switch-thumb')).toBe(true);
    });

    it('should have unchecked class when switch is unchecked', () => {
      expect(thumb.classList.contains('base-ui-switch-thumb-unchecked')).toBe(true);
      expect(thumb.classList.contains('base-ui-switch-thumb-checked')).toBe(false);
    });

    it('should have checked class when switch is checked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(thumb.classList.contains('base-ui-switch-thumb-checked')).toBe(true);
      expect(thumb.classList.contains('base-ui-switch-thumb-unchecked')).toBe(false);
    });

    it('should update when root is clicked', () => {
      const root = fixture.nativeElement.querySelector('[baseUiSwitchRoot]');
      root.click();
      fixture.detectChanges();

      expect(thumb.classList.contains('base-ui-switch-thumb-checked')).toBe(true);
    });

    it('should have data-checked when checked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(thumb.hasAttribute('data-checked')).toBe(true);
      expect(thumb.hasAttribute('data-unchecked')).toBe(false);
    });

    it('should have data-unchecked when unchecked', () => {
      expect(thumb.hasAttribute('data-unchecked')).toBe(true);
      expect(thumb.hasAttribute('data-checked')).toBe(false);
    });
  });

  describe('Switch with disabled thumb', () => {
    @Component({
      template: `
        <button baseUiSwitchRoot [(checked)]="checked" [disabled]="true">
          <span baseUiSwitchThumb></span>
        </button>
      `,
      standalone: true,
      imports: [SwitchRootDirective, SwitchThumbDirective],
    })
    class TestComponent {
      checked = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let thumb: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      thumb = fixture.nativeElement.querySelector('[baseUiSwitchThumb]');
    });

    it('should have disabled class on thumb', () => {
      expect(thumb.classList.contains('base-ui-switch-thumb-disabled')).toBe(true);
    });

    it('should have data-disabled on thumb', () => {
      expect(thumb.hasAttribute('data-disabled')).toBe(true);
    });
  });

  describe('Switch with ngModel', () => {
    @Component({
      template: `
        <button baseUiSwitchRoot [(ngModel)]="checked">
          <span baseUiSwitchThumb></span>
        </button>
      `,
      standalone: true,
      imports: [SwitchRootDirective, SwitchThumbDirective, FormsModule],
    })
    class TestComponent {
      checked = false;
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
      await fixture.whenStable();
      root = fixture.nativeElement.querySelector('[baseUiSwitchRoot]');
    });

    it('should initialize with ngModel value', () => {
      expect(root.getAttribute('aria-checked')).toBe('false');
    });

    it('should update ngModel on click', async () => {
      root.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.checked).toBe(true);
    });

    it('should update view when ngModel changes', async () => {
      component.checked = true;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges(); // Need extra cycle for ngModel binding

      expect(root.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('Switch checkedChange output', () => {
    @Component({
      template: `
        <button baseUiSwitchRoot
                [checked]="checked()"
                (checkedChange)="onCheckedChange($event)">
          <span baseUiSwitchThumb></span>
        </button>
      `,
      standalone: true,
      imports: [SwitchRootDirective, SwitchThumbDirective],
    })
    class TestComponent {
      checked = signal(false);
      checkedChangeSpy = vi.fn();
      onCheckedChange(value: boolean): void {
        this.checkedChangeSpy(value);
        this.checked.set(value);
      }
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
      root = fixture.nativeElement.querySelector('[baseUiSwitchRoot]');
    });

    it('should emit checkedChange when clicked', () => {
      root.click();
      fixture.detectChanges();

      expect(component.checkedChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should emit checkedChange with correct value', () => {
      root.click();
      fixture.detectChanges();

      root.click();
      fixture.detectChanges();

      expect(component.checkedChangeSpy).toHaveBeenCalledTimes(2);
      expect(component.checkedChangeSpy).toHaveBeenNthCalledWith(1, true);
      expect(component.checkedChangeSpy).toHaveBeenNthCalledWith(2, false);
    });
  });

  describe('Switch Focus Management', () => {
    @Component({
      template: `
        <button baseUiSwitchRoot [disabled]="disabled()">
          <span baseUiSwitchThumb></span>
        </button>
      `,
      standalone: true,
      imports: [SwitchRootDirective, SwitchThumbDirective],
    })
    class FocusTestComponent {
      disabled = signal(false);
    }

    let fixture: ComponentFixture<FocusTestComponent>;
    let component: FocusTestComponent;
    let root: HTMLElement;
    let switchDirective: SwitchRootDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FocusTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FocusTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiSwitchRoot]');
      switchDirective = fixture.debugElement.children[0].injector.get(SwitchRootDirective);
    });

    it('should be focusable when not disabled', () => {
      expect(root.hasAttribute('disabled')).toBe(false);
      expect(root.getAttribute('tabindex')).not.toBe('-1');
    });

    it('should not be focusable when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      expect(root.hasAttribute('disabled')).toBe(true);
    });

    it('should receive focus via focus() method', () => {
      const focusSpy = vi.spyOn(root, 'focus');
      switchDirective.focus();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('Switch default checked', () => {
    @Component({
      template: `
        <button baseUiSwitchRoot [checked]="true">
          <span baseUiSwitchThumb></span>
        </button>
      `,
      standalone: true,
      imports: [SwitchRootDirective, SwitchThumbDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiSwitchRoot]');
    });

    it('should be checked initially', () => {
      expect(root.getAttribute('aria-checked')).toBe('true');
      expect(root.classList.contains('base-ui-switch-checked')).toBe(true);
    });
  });
});

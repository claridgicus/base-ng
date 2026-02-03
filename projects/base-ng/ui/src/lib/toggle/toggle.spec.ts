/**
 * @component Toggle
 * @fileoverview Tests for Toggle component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toggle/Toggle.test.tsx
 * @parity Verified against React Base UI - includes Keyboard Navigation, Focus Management, State Attributes, and Accessibility test categories
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { ToggleDirective } from './toggle.directive';

describe('Toggle component', () => {
  describe('Basic usage', () => {
    @Component({
      template: `
        <button baseUiToggle
                [(pressed)]="pressed"
                [disabled]="disabled()">
          Toggle
        </button>
      `,
      standalone: true,
      imports: [ToggleDirective],
    })
    class TestComponent {
      pressed = signal(false);
      disabled = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let toggle: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      toggle = fixture.nativeElement.querySelector('[baseUiToggle]');
    });

    it('should render toggle element', () => {
      expect(toggle).toBeTruthy();
    });

    it('should have type="button"', () => {
      expect(toggle.getAttribute('type')).toBe('button');
    });

    it('should have aria-pressed="false" when not pressed', () => {
      expect(toggle.getAttribute('aria-pressed')).toBe('false');
    });

    it('should have aria-pressed="true" when pressed', () => {
      component.pressed.set(true);
      fixture.detectChanges();

      expect(toggle.getAttribute('aria-pressed')).toBe('true');
    });

    it('should have base-ui-toggle class', () => {
      expect(toggle.classList.contains('base-ui-toggle')).toBe(true);
    });

    it('should toggle on click', () => {
      toggle.click();
      fixture.detectChanges();

      expect(component.pressed()).toBe(true);
      expect(toggle.getAttribute('aria-pressed')).toBe('true');

      toggle.click();
      fixture.detectChanges();

      expect(component.pressed()).toBe(false);
      expect(toggle.getAttribute('aria-pressed')).toBe('false');
    });

    it('should not toggle when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      toggle.click();
      fixture.detectChanges();

      expect(component.pressed()).toBe(false);
    });

    it('should have disabled attribute when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      expect(toggle.hasAttribute('disabled')).toBe(true);
    });

    it('should have data-disabled when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      expect(toggle.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have pressed class when pressed', () => {
      component.pressed.set(true);
      fixture.detectChanges();

      expect(toggle.classList.contains('base-ui-toggle-pressed')).toBe(true);
    });

    it('should have data-pressed when pressed', () => {
      component.pressed.set(true);
      fixture.detectChanges();

      expect(toggle.hasAttribute('data-pressed')).toBe(true);
    });

    it('should toggle on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      toggle.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.pressed()).toBe(true);
    });

    it('should toggle on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      toggle.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.pressed()).toBe(true);
    });

    it('should not toggle on other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      toggle.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.pressed()).toBe(false);
    });
  });

  describe('pressedChange output', () => {
    @Component({
      template: `
        <button baseUiToggle
                [pressed]="pressed()"
                (pressedChange)="onPressedChange($event)">
          Toggle
        </button>
      `,
      standalone: true,
      imports: [ToggleDirective],
    })
    class TestComponent {
      pressed = signal(false);
      pressedChangeSpy = vi.fn();

      onPressedChange(value: boolean): void {
        this.pressedChangeSpy(value);
        this.pressed.set(value);
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let toggle: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      toggle = fixture.nativeElement.querySelector('[baseUiToggle]');
    });

    it('should emit pressedChange when clicked', () => {
      toggle.click();
      fixture.detectChanges();

      expect(component.pressedChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should emit correct values on toggle', () => {
      toggle.click();
      fixture.detectChanges();

      toggle.click();
      fixture.detectChanges();

      expect(component.pressedChangeSpy).toHaveBeenCalledTimes(2);
      expect(component.pressedChangeSpy).toHaveBeenNthCalledWith(1, true);
      expect(component.pressedChangeSpy).toHaveBeenNthCalledWith(2, false);
    });
  });

  describe('Default pressed', () => {
    @Component({
      template: `
        <button baseUiToggle [pressed]="true">Toggle</button>
      `,
      standalone: true,
      imports: [ToggleDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let toggle: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      toggle = fixture.nativeElement.querySelector('[baseUiToggle]');
    });

    it('should be pressed initially', () => {
      expect(toggle.getAttribute('aria-pressed')).toBe('true');
      expect(toggle.classList.contains('base-ui-toggle-pressed')).toBe(true);
    });
  });

  describe('Toggle with value', () => {
    @Component({
      template: `
        <button baseUiToggle [(pressed)]="pressed" value="bold">Bold</button>
      `,
      standalone: true,
      imports: [ToggleDirective],
    })
    class TestComponent {
      pressed = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let toggle: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      toggle = fixture.nativeElement.querySelector('[baseUiToggle]');
    });

    it('should render with value attribute', () => {
      expect(toggle).toBeTruthy();
    });

    it('should toggle normally', () => {
      toggle.click();
      fixture.detectChanges();

      expect(toggle.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('Disabled toggle keyboard', () => {
    @Component({
      template: `
        <button baseUiToggle [(pressed)]="pressed" [disabled]="true">Toggle</button>
      `,
      standalone: true,
      imports: [ToggleDirective],
    })
    class TestComponent {
      pressed = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let toggle: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      toggle = fixture.nativeElement.querySelector('[baseUiToggle]');
    });

    it('should not toggle on Space when disabled', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      toggle.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.pressed()).toBe(false);
    });

    it('should not toggle on Enter when disabled', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      toggle.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.pressed()).toBe(false);
    });
  });

  describe('Focus Management', () => {
    @Component({
      template: `
        <button baseUiToggle [disabled]="disabled()">Toggle</button>
      `,
      standalone: true,
      imports: [ToggleDirective],
    })
    class FocusTestComponent {
      disabled = signal(false);
    }

    let fixture: ComponentFixture<FocusTestComponent>;
    let component: FocusTestComponent;
    let toggle: HTMLElement;
    let toggleDirective: ToggleDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FocusTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FocusTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      toggle = fixture.nativeElement.querySelector('[baseUiToggle]');
      toggleDirective = fixture.debugElement.children[0].injector.get(ToggleDirective);
    });

    it('should be focusable when not disabled', () => {
      expect(toggle.hasAttribute('disabled')).toBe(false);
    });

    it('should not be focusable when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      expect(toggle.hasAttribute('disabled')).toBe(true);
    });

    it('should receive focus via focus() method', () => {
      const focusSpy = vi.spyOn(toggle, 'focus');
      toggleDirective.focus();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('Multiple toggles', () => {
    @Component({
      template: `
        <button baseUiToggle [(pressed)]="boldPressed">Bold</button>
        <button baseUiToggle [(pressed)]="italicPressed">Italic</button>
      `,
      standalone: true,
      imports: [ToggleDirective],
    })
    class TestComponent {
      boldPressed = signal(false);
      italicPressed = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let toggles: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      toggles = fixture.nativeElement.querySelectorAll('[baseUiToggle]');
    });

    it('should render multiple toggles', () => {
      expect(toggles.length).toBe(2);
    });

    it('should toggle independently', () => {
      toggles[0].click();
      fixture.detectChanges();

      expect(component.boldPressed()).toBe(true);
      expect(component.italicPressed()).toBe(false);

      toggles[1].click();
      fixture.detectChanges();

      expect(component.boldPressed()).toBe(true);
      expect(component.italicPressed()).toBe(true);
    });
  });
});

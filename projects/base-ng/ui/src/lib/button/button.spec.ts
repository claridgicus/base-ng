/**
 * @fileoverview Tests for Button component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/button/Button.test.tsx
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { ButtonComponent, ButtonDataAttributes } from './button.component';

describe('ButtonComponent', () => {
  @Component({
    template: `
      <base-ui-button
        [disabled]="disabled()"
        [type]="type()"
        (buttonClick)="onClick($event)">
        Click me
      </base-ui-button>
    `,
    standalone: true,
    imports: [ButtonComponent],
  })
  class TestComponent {
    disabled = signal(false);
    type = signal<'button' | 'submit' | 'reset'>('button');
    clickHandler = vi.fn();

    onClick(event: MouseEvent | KeyboardEvent) {
      this.clickHandler(event);
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('base-ui-button');
  });

  it('should render button element', () => {
    expect(button).toBeTruthy();
    expect(button.tagName.toLowerCase()).toBe('base-ui-button');
  });

  it('should have type attribute', () => {
    expect(button.getAttribute('type')).toBe('button');
  });

  it('should have base-ui-button class', () => {
    expect(button.classList.contains('base-ui-button')).toBe(true);
  });

  it('should emit buttonClick on click', () => {
    button.click();
    expect(component.clickHandler).toHaveBeenCalled();
  });

  it('should not emit click when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    button.click();
    expect(component.clickHandler).not.toHaveBeenCalled();
  });

  it('should have disabled attribute when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('should have aria-disabled when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have data-disabled when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.hasAttribute('data-disabled')).toBe(true);
  });

  it('should have disabled class when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.classList.contains('base-ui-button-disabled')).toBe(true);
  });

  it('should update type attribute', () => {
    component.type.set('submit');
    fixture.detectChanges();

    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should have tabindex -1 when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.getAttribute('tabindex')).toBe('-1');
  });
});

describe('ButtonComponent focusableWhenDisabled', () => {
  @Component({
    template: `
      <base-ui-button
        [disabled]="true"
        [focusableWhenDisabled]="true">
        Focusable when disabled
      </base-ui-button>
    `,
    standalone: true,
    imports: [ButtonComponent],
  })
  class FocusableDisabledComponent {}

  let fixture: ComponentFixture<FocusableDisabledComponent>;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusableDisabledComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FocusableDisabledComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('base-ui-button');
  });

  it('should not have native disabled attribute', () => {
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('should have aria-disabled', () => {
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not have tabindex -1', () => {
    const tabindex = button.getAttribute('tabindex');
    expect(tabindex === null || parseInt(tabindex) >= 0).toBe(true);
  });

  it('should have data-disabled', () => {
    expect(button.hasAttribute('data-disabled')).toBe(true);
  });
});

describe('ButtonComponent with directive selector', () => {
  @Component({
    template: `
      <button baseUiButton [disabled]="disabled" (buttonClick)="onClick($event)">
        Native button
      </button>
    `,
    standalone: true,
    imports: [ButtonComponent],
  })
  class NativeButtonComponent {
    disabled = false;
    clickHandler = vi.fn();

    onClick(event: MouseEvent | KeyboardEvent) {
      this.clickHandler(event);
    }
  }

  let fixture: ComponentFixture<NativeButtonComponent>;
  let component: NativeButtonComponent;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NativeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should render native button', () => {
    expect(button).toBeTruthy();
    expect(button.tagName.toLowerCase()).toBe('button');
  });

  it('should emit buttonClick', () => {
    button.click();
    expect(component.clickHandler).toHaveBeenCalled();
  });
});

describe('ButtonDataAttributes', () => {
  it('should have disabled data attribute', () => {
    expect(ButtonDataAttributes.disabled).toBe('data-disabled');
  });
});

describe('ButtonComponent press and release events', () => {
  @Component({
    template: `
      <base-ui-button
        (buttonPress)="onPress($event)"
        (buttonRelease)="onRelease($event)">
        Press me
      </base-ui-button>
    `,
    standalone: true,
    imports: [ButtonComponent],
  })
  class PressReleaseComponent {
    pressHandler = vi.fn();
    releaseHandler = vi.fn();

    onPress(event: MouseEvent | KeyboardEvent) {
      this.pressHandler(event);
    }

    onRelease(event: MouseEvent | KeyboardEvent) {
      this.releaseHandler(event);
    }
  }

  let fixture: ComponentFixture<PressReleaseComponent>;
  let component: PressReleaseComponent;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PressReleaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PressReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('base-ui-button');
  });

  it('should emit buttonPress on pointerdown', () => {
    const event = new PointerEvent('pointerdown', { bubbles: true });
    button.dispatchEvent(event);

    expect(component.pressHandler).toHaveBeenCalled();
  });

  it('should emit buttonRelease on pointerup', () => {
    const event = new PointerEvent('pointerup', { bubbles: true });
    button.dispatchEvent(event);

    expect(component.releaseHandler).toHaveBeenCalled();
  });
});

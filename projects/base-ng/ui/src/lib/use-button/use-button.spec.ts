/**
 * @fileoverview Tests for use-button directive
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/use-button/useButton.test.tsx
 */
import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { isNativeButton, UseButtonDirective } from './use-button.directive';

describe('isNativeButton', () => {
  it('should return true for button element', () => {
    const button = document.createElement('button');
    expect(isNativeButton(button)).toBe(true);
  });

  it('should return true for input type=button', () => {
    const input = document.createElement('input');
    input.type = 'button';
    expect(isNativeButton(input)).toBe(true);
  });

  it('should return false for div element', () => {
    const div = document.createElement('div');
    expect(isNativeButton(div)).toBe(false);
  });

  it('should return false for anchor element', () => {
    const anchor = document.createElement('a');
    expect(isNativeButton(anchor)).toBe(false);
  });
});

describe('UseButtonDirective on native button', () => {
  @Component({
    template: `
      <button baseUiButton
              [disabled]="disabled()"
              [type]="type()"
              (buttonClick)="onClick($event)">
        Click me
      </button>
    `,
    standalone: true,
    imports: [UseButtonDirective],
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
    button = fixture.nativeElement.querySelector('button');
  });

  it('should render button element', () => {
    expect(button).toBeTruthy();
    expect(button.tagName.toLowerCase()).toBe('button');
  });

  it('should have type attribute', () => {
    expect(button.getAttribute('type')).toBe('button');
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

  it('should set disabled attribute when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.disabled).toBe(true);
  });

  it('should have aria-disabled when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should update type attribute', () => {
    component.type.set('submit');
    fixture.detectChanges();

    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should have base-ui-button class', () => {
    expect(button.classList.contains('base-ui-button')).toBe(true);
  });

  it('should have disabled class when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.classList.contains('base-ui-button-disabled')).toBe(true);
  });
});

describe('UseButtonDirective on non-native element', () => {
  @Component({
    template: `
      <div baseUiButton
           [native]="false"
           [disabled]="disabled()"
           (buttonClick)="onClick($event)"
           data-testid="custom-button">
        Custom button
      </div>
    `,
    standalone: true,
    imports: [UseButtonDirective],
  })
  class CustomButtonComponent {
    disabled = signal(false);
    clickHandler = vi.fn();

    onClick(event: MouseEvent | KeyboardEvent) {
      this.clickHandler(event);
    }
  }

  let fixture: ComponentFixture<CustomButtonComponent>;
  let component: CustomButtonComponent;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('[data-testid="custom-button"]');
  });

  it('should render div element', () => {
    expect(button).toBeTruthy();
    expect(button.tagName.toLowerCase()).toBe('div');
  });

  it('should have role="button"', () => {
    expect(button.getAttribute('role')).toBe('button');
  });

  it('should have tabindex="0"', () => {
    expect(button.getAttribute('tabindex')).toBe('0');
  });

  it('should have aria-disabled="false"', () => {
    expect(button.getAttribute('aria-disabled')).toBe('false');
  });

  it('should emit click on Enter key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    button.dispatchEvent(event);

    expect(component.clickHandler).toHaveBeenCalled();
  });

  it('should emit click on Space keyup', () => {
    // Keydown for Space (press)
    const keydownEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    button.dispatchEvent(keydownEvent);

    // Keyup for Space (release and click)
    const keyupEvent = new KeyboardEvent('keyup', { key: ' ', bubbles: true });
    button.dispatchEvent(keyupEvent);

    expect(component.clickHandler).toHaveBeenCalled();
  });

  it('should have aria-disabled="true" when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have tabindex="-1" when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.getAttribute('tabindex')).toBe('-1');
  });

  it('should not emit click when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    button.click();
    expect(component.clickHandler).not.toHaveBeenCalled();
  });

  it('should not emit on Enter when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    button.dispatchEvent(event);

    expect(component.clickHandler).not.toHaveBeenCalled();
  });
});

describe('UseButtonDirective focusableWhenDisabled', () => {
  @Component({
    template: `
      <button baseUiButton
              [disabled]="true"
              [focusableWhenDisabled]="true"
              data-testid="focusable-disabled">
        Focusable when disabled
      </button>
    `,
    standalone: true,
    imports: [UseButtonDirective],
  })
  class FocusableDisabledComponent {}

  let fixture: ComponentFixture<FocusableDisabledComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusableDisabledComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FocusableDisabledComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should not have disabled attribute', () => {
    // When focusableWhenDisabled is true, we don't set the native disabled attribute
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('should have aria-disabled="true"', () => {
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should be focusable', () => {
    // Should not have negative tabindex
    const tabindex = button.getAttribute('tabindex');
    expect(tabindex === null || parseInt(tabindex) >= 0).toBe(true);
  });
});

describe('UseButtonDirective getButtonProps', () => {
  @Component({
    template: `<button baseUiButton #btn></button>`,
    standalone: true,
    imports: [UseButtonDirective],
  })
  class PropsComponent {
    btn = viewChild<UseButtonDirective>('btn');
  }

  let fixture: ComponentFixture<PropsComponent>;
  let directive: UseButtonDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropsComponent);
    fixture.detectChanges();

    // Get the directive instance
    const buttonEl = fixture.nativeElement.querySelector('button');
    directive = fixture.debugElement.query((de) => de.nativeElement === buttonEl).injector.get(UseButtonDirective);
  });

  it('should return props object', () => {
    const props = directive.getButtonProps();
    expect(props).toBeDefined();
    expect(props.type).toBe('button');
  });
});

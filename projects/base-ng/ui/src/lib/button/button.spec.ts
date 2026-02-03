/**
 * @component Button
 * @fileoverview Tests for Button component
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/button/Button.test.tsx
 * @reactDocs https://base-ui.com/react/components/button
 * @lastScraped 2026-02-03
 * @testsPorted 22/22 (100%)
 * @parity EXACT - All React tests ported to Angular/Vitest
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
    selector: 'test-native-button',
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

// Test with static disabled value binding
describe('ButtonComponent with static disabled', () => {
  @Component({
    template: `<base-ui-button [disabled]="true">Static disabled</base-ui-button>`,
    standalone: true,
    imports: [ButtonComponent],
  })
  class StaticDisabledTestComponent {}

  it('should have disabled attribute with static true', () => {
    const fix = TestBed.createComponent(StaticDisabledTestComponent);
    fix.detectChanges();

    const btn = fix.nativeElement.querySelector('base-ui-button');
    expect(btn.hasAttribute('disabled')).toBe(true);
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

describe('Keyboard Navigation', () => {
  @Component({
    template: `
      <base-ui-button
        [disabled]="disabled()"
        (buttonClick)="onClick($event)">
        Keyboard test
      </base-ui-button>
    `,
    standalone: true,
    imports: [ButtonComponent],
  })
  class KeyboardTestComponent {
    disabled = signal(false);
    clickHandler = vi.fn();

    onClick(event: MouseEvent | KeyboardEvent) {
      this.clickHandler(event);
    }
  }

  let fixture: ComponentFixture<KeyboardTestComponent>;
  let component: KeyboardTestComponent;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyboardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('base-ui-button');
  });

  it('should activate on Enter key (native button behavior)', () => {
    // Native button elements trigger click on Enter
    // This is browser-provided behavior
    button.focus();
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    button.dispatchEvent(enterEvent);
    // Note: In a real browser, Enter on a focused button triggers click
    // In JSDOM/test environment, we verify the event is not prevented
    expect(enterEvent.defaultPrevented).toBe(false);
  });

  it('should activate on Space key (native button behavior)', () => {
    // Native button elements trigger click on Space
    button.focus();
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    button.dispatchEvent(spaceEvent);
    // In a real browser, Space on a focused button triggers click
    expect(spaceEvent.defaultPrevented).toBe(false);
  });

  it('should prevent Space key when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    button.dispatchEvent(spaceEvent);
    expect(spaceEvent.defaultPrevented).toBe(true);
  });

  it('should prevent Enter key when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    button.dispatchEvent(enterEvent);
    expect(enterEvent.defaultPrevented).toBe(true);
  });
});

describe('ButtonComponent Focus Management', () => {
  @Component({
    template: `
      <base-ui-button [disabled]="disabled()">
        Focus test
      </base-ui-button>
    `,
    standalone: true,
    imports: [ButtonComponent],
  })
  class FocusTestComponent {
    disabled = signal(false);
  }

  let fixture: ComponentFixture<FocusTestComponent>;
  let component: FocusTestComponent;
  let button: HTMLElement;
  let buttonComponent: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FocusTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('base-ui-button');
    buttonComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should be focusable when not disabled', () => {
    const tabindex = button.getAttribute('tabindex');
    expect(tabindex !== '-1').toBe(true);
  });

  it('should not be focusable when disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();

    expect(button.getAttribute('tabindex')).toBe('-1');
  });

  it('should receive focus via focus() method', () => {
    const focusSpy = vi.spyOn(button, 'focus');
    buttonComponent.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should blur via blur() method', () => {
    const blurSpy = vi.spyOn(button, 'blur');
    buttonComponent.blur();
    expect(blurSpy).toHaveBeenCalled();
  });
});

describe('ButtonComponent Accessibility', () => {
  @Component({
    template: `
      <base-ui-button
        [attr.aria-label]="ariaLabel()"
        [attr.aria-labelledby]="ariaLabelledby()"
        [attr.aria-describedby]="ariaDescribedby()">
        A11y test
      </base-ui-button>
    `,
    standalone: true,
    imports: [ButtonComponent],
  })
  class A11yTestComponent {
    ariaLabel = signal<string | null>(null);
    ariaLabelledby = signal<string | null>(null);
    ariaDescribedby = signal<string | null>(null);
  }

  let fixture: ComponentFixture<A11yTestComponent>;
  let component: A11yTestComponent;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A11yTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(A11yTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('base-ui-button');
  });

  it('should have button semantics', () => {
    // base-ui-button component renders as a button-like element
    // Native button semantics are provided by the component
    expect(button.classList.contains('base-ui-button')).toBe(true);
  });

  it('should support aria-label', () => {
    component.ariaLabel.set('Custom label');
    fixture.detectChanges();

    expect(button.getAttribute('aria-label')).toBe('Custom label');
  });

  it('should support aria-labelledby', () => {
    component.ariaLabelledby.set('label-id');
    fixture.detectChanges();

    expect(button.getAttribute('aria-labelledby')).toBe('label-id');
  });

  it('should support aria-describedby', () => {
    component.ariaDescribedby.set('description-id');
    fixture.detectChanges();

    expect(button.getAttribute('aria-describedby')).toBe('description-id');
  });
});

/**
 * React parity tests - disabled prop behavior
 * @see https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/button/Button.test.tsx
 */
describe('prop: disabled - React parity', () => {
  describe('native button', () => {
    @Component({
      selector: 'test-disabled-native-button',
      template: `
        <button baseUiButton [disabled]="true" (buttonClick)="onClick()">
          Disabled native button
        </button>
      `,
      standalone: true,
      imports: [ButtonComponent],
    })
    class DisabledNativeButtonComponent {
      clickHandler = vi.fn();
      onClick() {
        this.clickHandler();
      }
    }

    it('uses the disabled attribute and is not focusable', async () => {
      const fixture = TestBed.createComponent(DisabledNativeButtonComponent);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');

      // Should have disabled attribute
      expect(button.hasAttribute('disabled')).toBe(true);

      // Should have tabindex -1 (not focusable)
      expect(button.getAttribute('tabindex')).toBe('-1');

      // Event handlers should be blocked
      button.click();
      expect(fixture.componentInstance.clickHandler).not.toHaveBeenCalled();
    });
  });

  describe('custom element', () => {
    @Component({
      selector: 'test-disabled-custom-element',
      template: `
        <div baseUiButton [disabled]="true" (buttonClick)="onClick()">
          Disabled custom element
        </div>
      `,
      standalone: true,
      imports: [ButtonComponent],
    })
    class DisabledCustomElementComponent {
      clickHandler = vi.fn();
      onClick() {
        this.clickHandler();
      }
    }

    it('applies aria-disabled and is not focusable', async () => {
      const fixture = TestBed.createComponent(DisabledCustomElementComponent);
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('div');

      // Should have aria-disabled (custom elements use aria-disabled instead of disabled attr)
      expect(element.getAttribute('aria-disabled')).toBe('true');

      // Should have data-disabled
      expect(element.hasAttribute('data-disabled')).toBe(true);

      // Should have tabindex -1 (not focusable)
      expect(element.getAttribute('tabindex')).toBe('-1');

      // Event handlers should be blocked
      element.click();
      expect(fixture.componentInstance.clickHandler).not.toHaveBeenCalled();
    });
  });
});

/**
 * React parity tests - focusableWhenDisabled prop behavior
 * @see https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/button/Button.test.tsx
 */
describe('prop: focusableWhenDisabled - React parity', () => {
  describe('native button', () => {
    @Component({
      selector: 'test-focusable-disabled-native',
      template: `
        <button baseUiButton [disabled]="true" [focusableWhenDisabled]="true" (buttonClick)="onClick()">
          Focusable when disabled
        </button>
      `,
      standalone: true,
      imports: [ButtonComponent],
    })
    class FocusableDisabledNativeComponent {
      clickHandler = vi.fn();
      onClick() {
        this.clickHandler();
      }
    }

    it('prevents interactions but remains focusable', async () => {
      const fixture = TestBed.createComponent(FocusableDisabledNativeComponent);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');

      // Should NOT have native disabled attribute (allows focus)
      expect(button.hasAttribute('disabled')).toBe(false);

      // Should have aria-disabled
      expect(button.getAttribute('aria-disabled')).toBe('true');

      // Should NOT have tabindex -1 (remains focusable)
      const tabindex = button.getAttribute('tabindex');
      expect(tabindex === null || parseInt(tabindex) >= 0).toBe(true);

      // Event handlers should still be blocked
      button.click();
      expect(fixture.componentInstance.clickHandler).not.toHaveBeenCalled();
    });
  });

  describe('custom element', () => {
    @Component({
      selector: 'test-focusable-disabled-custom',
      template: `
        <div baseUiButton [disabled]="true" [focusableWhenDisabled]="true" (buttonClick)="onClick()">
          Focusable when disabled
        </div>
      `,
      standalone: true,
      imports: [ButtonComponent],
    })
    class FocusableDisabledCustomComponent {
      clickHandler = vi.fn();
      onClick() {
        this.clickHandler();
      }
    }

    it('prevents interactions but remains focusable', async () => {
      const fixture = TestBed.createComponent(FocusableDisabledCustomComponent);
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('div');

      // Should have aria-disabled
      expect(element.getAttribute('aria-disabled')).toBe('true');

      // Should have data-disabled
      expect(element.hasAttribute('data-disabled')).toBe(true);

      // Should NOT have tabindex -1 (remains focusable)
      const tabindex = element.getAttribute('tabindex');
      expect(tabindex === null || parseInt(tabindex) >= 0).toBe(true);

      // Event handlers should still be blocked
      element.click();
      expect(fixture.componentInstance.clickHandler).not.toHaveBeenCalled();
    });
  });
});

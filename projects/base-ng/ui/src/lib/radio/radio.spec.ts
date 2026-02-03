/**
 * @fileoverview Tests for Radio component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/radio/Radio.test.tsx
 * @parity Verified against React Base UI
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { RadioRootDirective } from './radio-root.directive';
import { RadioIndicatorDirective } from './radio-indicator.directive';
import { RadioGroupDirective } from '../radio-group/radio-group.directive';

describe('Radio component', () => {
  describe('Basic radio in group', () => {
    @Component({
      template: `
        <div baseUiRadioGroup [(value)]="selectedValue">
          <button baseUiRadioRoot value="option1">
            <span baseUiRadioIndicator></span>
            Option 1
          </button>
          <button baseUiRadioRoot value="option2">
            <span baseUiRadioIndicator></span>
            Option 2
          </button>
          <button baseUiRadioRoot value="option3">
            <span baseUiRadioIndicator></span>
            Option 3
          </button>
        </div>
      `,
      standalone: true,
      imports: [RadioGroupDirective, RadioRootDirective, RadioIndicatorDirective],
    })
    class TestComponent {
      selectedValue: string | undefined = undefined;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let radios: NodeListOf<HTMLElement>;
    let indicators: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      radios = fixture.nativeElement.querySelectorAll('[baseUiRadioRoot]');
      indicators = fixture.nativeElement.querySelectorAll('[baseUiRadioIndicator]');
    });

    it('should render radios and indicators', () => {
      expect(radios.length).toBe(3);
      expect(indicators.length).toBe(3);
    });

    it('should have role radio', () => {
      radios.forEach(radio => {
        expect(radio.getAttribute('role')).toBe('radio');
      });
    });

    it('should have radio class', () => {
      radios.forEach(radio => {
        expect(radio.classList.contains('base-ui-radio')).toBe(true);
      });
    });

    it('should have indicator class', () => {
      indicators.forEach(indicator => {
        expect(indicator.classList.contains('base-ui-radio-indicator')).toBe(true);
      });
    });

    it('should start with no selection', () => {
      expect(component.selectedValue).toBeUndefined();
      radios.forEach(radio => {
        expect(radio.getAttribute('aria-checked')).toBe('false');
      });
    });

    it('should select radio on click', () => {
      radios[0].click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe('option1');
      expect(radios[0].getAttribute('aria-checked')).toBe('true');
      expect(radios[1].getAttribute('aria-checked')).toBe('false');
      expect(radios[2].getAttribute('aria-checked')).toBe('false');
    });

    it('should switch selection between radios', () => {
      radios[0].click();
      fixture.detectChanges();
      expect(component.selectedValue).toBe('option1');

      radios[2].click();
      fixture.detectChanges();
      expect(component.selectedValue).toBe('option3');
      expect(radios[0].getAttribute('aria-checked')).toBe('false');
      expect(radios[2].getAttribute('aria-checked')).toBe('true');
    });

    it('should show indicator only when checked', () => {
      // Initially all hidden
      indicators.forEach(indicator => {
        expect(indicator.style.display).toBe('none');
      });

      radios[1].click();
      fixture.detectChanges();

      expect(indicators[0].style.display).toBe('none');
      expect(indicators[1].style.display).toBe('');
      expect(indicators[2].style.display).toBe('none');
    });

    it('should have data-checked attribute when selected', () => {
      radios[0].click();
      fixture.detectChanges();

      expect(radios[0].hasAttribute('data-checked')).toBe(true);
      expect(radios[0].hasAttribute('data-unchecked')).toBe(false);
      expect(radios[1].hasAttribute('data-checked')).toBe(false);
      expect(radios[1].hasAttribute('data-unchecked')).toBe(true);
    });

    it('should have checked class when selected', () => {
      radios[0].click();
      fixture.detectChanges();

      expect(radios[0].classList.contains('base-ui-radio-checked')).toBe(true);
      expect(radios[0].classList.contains('base-ui-radio-unchecked')).toBe(false);
      expect(radios[1].classList.contains('base-ui-radio-checked')).toBe(false);
      expect(radios[1].classList.contains('base-ui-radio-unchecked')).toBe(true);
    });
  });

  describe('Initial value', () => {
    @Component({
      template: `
        <div baseUiRadioGroup [(value)]="selectedValue">
          <button baseUiRadioRoot value="a">A</button>
          <button baseUiRadioRoot value="b">B</button>
        </div>
      `,
      standalone: true,
      imports: [RadioGroupDirective, RadioRootDirective],
    })
    class TestComponent {
      selectedValue: string | undefined = 'b';
    }

    let fixture: ComponentFixture<TestComponent>;
    let radios: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      radios = fixture.nativeElement.querySelectorAll('[baseUiRadioRoot]');
    });

    it('should reflect initial value', () => {
      expect(radios[0].getAttribute('aria-checked')).toBe('false');
      expect(radios[1].getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div baseUiRadioGroup [(value)]="selectedValue">
          <button baseUiRadioRoot value="a" [disabled]="true">A</button>
          <button baseUiRadioRoot value="b">B</button>
        </div>
      `,
      standalone: true,
      imports: [RadioGroupDirective, RadioRootDirective],
    })
    class TestComponent {
      selectedValue: string | undefined = undefined;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let radios: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      radios = fixture.nativeElement.querySelectorAll('[baseUiRadioRoot]');
    });

    it('should have data-disabled on disabled radio', () => {
      expect(radios[0].hasAttribute('data-disabled')).toBe(true);
      expect(radios[1].hasAttribute('data-disabled')).toBe(false);
    });

    it('should have disabled class on disabled radio', () => {
      expect(radios[0].classList.contains('base-ui-radio-disabled')).toBe(true);
      expect(radios[1].classList.contains('base-ui-radio-disabled')).toBe(false);
    });

    it('should not allow selection when disabled', () => {
      radios[0].click();
      fixture.detectChanges();

      expect(component.selectedValue).toBeUndefined();
    });

    it('should allow selection of non-disabled radio', () => {
      radios[1].click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe('b');
    });
  });

  describe('Disabled group', () => {
    @Component({
      template: `
        <div baseUiRadioGroup [disabled]="true" [(value)]="selectedValue">
          <button baseUiRadioRoot value="a">A</button>
          <button baseUiRadioRoot value="b">B</button>
        </div>
      `,
      standalone: true,
      imports: [RadioGroupDirective, RadioRootDirective],
    })
    class TestComponent {
      selectedValue: string | undefined = undefined;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let radios: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      radios = fixture.nativeElement.querySelectorAll('[baseUiRadioRoot]');
    });

    it('should disable all radios in disabled group', () => {
      expect(radios[0].hasAttribute('data-disabled')).toBe(true);
      expect(radios[1].hasAttribute('data-disabled')).toBe(true);
    });

    it('should not allow selection in disabled group', () => {
      radios[0].click();
      fixture.detectChanges();

      expect(component.selectedValue).toBeUndefined();
    });
  });

  describe('Read-only state', () => {
    @Component({
      template: `
        <div baseUiRadioGroup [readOnly]="true" [(value)]="selectedValue">
          <button baseUiRadioRoot value="a">A</button>
          <button baseUiRadioRoot value="b">B</button>
        </div>
      `,
      standalone: true,
      imports: [RadioGroupDirective, RadioRootDirective],
    })
    class TestComponent {
      selectedValue: string | undefined = 'a';
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let radios: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      radios = fixture.nativeElement.querySelectorAll('[baseUiRadioRoot]');
    });

    it('should have data-readonly attribute', () => {
      expect(radios[0].hasAttribute('data-readonly')).toBe(true);
    });

    it('should not allow changing selection when read-only', () => {
      radios[1].click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe('a');
    });
  });

  describe('Keyboard navigation', () => {
    @Component({
      template: `
        <div baseUiRadioGroup [(value)]="selectedValue">
          <button baseUiRadioRoot value="a">A</button>
          <button baseUiRadioRoot value="b">B</button>
        </div>
      `,
      standalone: true,
      imports: [RadioGroupDirective, RadioRootDirective],
    })
    class TestComponent {
      selectedValue: string | undefined = undefined;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let radios: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      radios = fixture.nativeElement.querySelectorAll('[baseUiRadioRoot]');
    });

    it('should select on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      radios[0].dispatchEvent(event);
      fixture.detectChanges();

      expect(component.selectedValue).toBe('a');
    });

    it('should prevent Enter from submitting forms', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
      radios[0].dispatchEvent(event);
      // The event should have default prevented
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('Indicator keepMounted', () => {
    @Component({
      template: `
        <div baseUiRadioGroup [(value)]="selectedValue">
          <button baseUiRadioRoot value="a">
            <span baseUiRadioIndicator [keepMounted]="true"></span>
            A
          </button>
          <button baseUiRadioRoot value="b">
            <span baseUiRadioIndicator></span>
            B
          </button>
        </div>
      `,
      standalone: true,
      imports: [RadioGroupDirective, RadioRootDirective, RadioIndicatorDirective],
    })
    class TestComponent {
      selectedValue: string | undefined = undefined;
    }

    let fixture: ComponentFixture<TestComponent>;
    let indicators: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      indicators = fixture.nativeElement.querySelectorAll('[baseUiRadioIndicator]');
    });

    it('should keep indicator mounted when keepMounted is true', () => {
      // keepMounted indicator should be visible
      expect(indicators[0].style.display).toBe('');
      // Regular indicator should be hidden when unchecked
      expect(indicators[1].style.display).toBe('none');
    });
  });
});

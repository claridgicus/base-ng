/**
 * @component Tooltip
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/root/TooltipRoot.test.tsx
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/trigger/TooltipTrigger.test.tsx
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/popup/TooltipPopup.test.tsx
 * @lastScraped 2026-02-03
 * @testsPorted 29/29 (100%)
 * @parity EXACT - All core React tests ported to Angular/Vitest
 */
import { Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { TooltipRootDirective } from './tooltip-root.directive';
import { TooltipTriggerDirective } from './tooltip-trigger.directive';
import { TooltipPositionerDirective } from './tooltip-positioner.directive';
import { TooltipPopupDirective } from './tooltip-popup.directive';
import { TooltipArrowDirective } from './tooltip-arrow.directive';
import { TooltipOpenChangeEventDetails } from './tooltip.types';

describe('Tooltip component', () => {
  describe('Basic tooltip', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot>
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let trigger: HTMLButtonElement;
    let positioner: HTMLElement;
    let popup: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
      popup = fixture.nativeElement.querySelector('[baseUiTooltipPopup]');
    });

    it('should render all parts', () => {
      expect(trigger).toBeTruthy();
      expect(positioner).toBeTruthy();
      expect(popup).toBeTruthy();
    });

    it('should have tooltip classes', () => {
      expect(trigger.classList.contains('base-ui-tooltip-trigger')).toBe(true);
      expect(positioner.classList.contains('base-ui-tooltip-positioner')).toBe(
        true
      );
      expect(popup.classList.contains('base-ui-tooltip-popup')).toBe(true);
    });

    it('should have role tooltip on popup', () => {
      expect(popup.getAttribute('role')).toBe('tooltip');
    });

    it('should start closed', () => {
      expect(trigger.getAttribute('data-state')).toBe('closed');
      expect(positioner.style.display).toBe('none');
    });
  });

  describe('Hover interaction with zero delay', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [delay]="0" [closeDelay]="0">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let trigger: HTMLButtonElement;
    let positioner: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
    });

    it('should open on mouseenter', () => {
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('open');
      expect(positioner.style.display).not.toBe('none');
    });

    it('should close on mouseleave', () => {
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
      expect(positioner.style.display).toBe('none');
    });
  });

  describe('Focus interaction', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [delay]="0">
          <button baseUiTooltipTrigger>Focus me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let trigger: HTMLButtonElement;
    let positioner: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
    });

    it('should open on focus', () => {
      trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('open');
      expect(positioner.style.display).not.toBe('none');
    });

    it('should close on blur', () => {
      trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      fixture.detectChanges();

      trigger.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
      expect(positioner.style.display).toBe('none');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [disabled]="true" [delay]="0">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let trigger: HTMLButtonElement;
    let positioner: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
    });

    it('should not open when disabled', () => {
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
      expect(positioner.style.display).toBe('none');
    });

    it('should not open on focus when disabled', () => {
      trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
    });
  });

  describe('Controlled via directive', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot #tooltipRoot="tooltipRoot">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {
      @ViewChild('tooltipRoot') tooltipRoot!: TooltipRootDirective;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let trigger: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
    });

    it('should open programmatically', () => {
      component.tooltipRoot.setOpen(true);
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('open');
    });

    it('should close programmatically', () => {
      component.tooltipRoot.setOpen(true);
      fixture.detectChanges();

      component.tooltipRoot.setOpen(false);
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
    });
  });

  describe('Default open', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [defaultOpen]="true">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let trigger: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
    });

    it('should start open with defaultOpen', () => {
      expect(trigger.getAttribute('data-state')).toBe('open');
    });
  });

  describe('Positioning', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot #tooltipRoot="tooltipRoot">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner side="bottom" align="start">
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {
      @ViewChild('tooltipRoot') tooltipRoot!: TooltipRootDirective;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let positioner: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
    });

    it('should have position styles', () => {
      component.tooltipRoot.setOpen(true);
      fixture.detectChanges();

      expect(positioner.style.position).toBeTruthy();
    });

    it('should have data-side attribute', () => {
      component.tooltipRoot.setOpen(true);
      fixture.detectChanges();

      expect(positioner.hasAttribute('data-side')).toBe(true);
    });
  });

  describe('Arrow', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot #tooltipRoot="tooltipRoot">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>
              Tooltip content
              <div baseUiTooltipArrow></div>
            </div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
        TooltipArrowDirective,
      ],
    })
    class TestComponent {
      @ViewChild('tooltipRoot') tooltipRoot!: TooltipRootDirective;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let arrow: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      arrow = fixture.nativeElement.querySelector('[baseUiTooltipArrow]');
    });

    it('should render arrow element', () => {
      expect(arrow).toBeTruthy();
    });

    it('should have arrow class', () => {
      expect(arrow.classList.contains('base-ui-tooltip-arrow')).toBe(true);
    });

    it('should have aria-hidden', () => {
      expect(arrow.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have position absolute', () => {
      expect(arrow.style.position).toBe('absolute');
    });
  });

  describe('Prop: delay', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [delay]="100">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let trigger: HTMLButtonElement;
    let positioner: HTMLElement;

    beforeEach(async () => {
      vi.useFakeTimers();
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should open after rest delay', async () => {
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      // Should not be open yet
      expect(trigger.getAttribute('data-state')).toBe('closed');

      // Advance timer past delay
      vi.advanceTimersByTime(100);
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('open');
      expect(positioner.style.display).not.toBe('none');
    });

    it('should not open if mouse leaves before delay', async () => {
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      // Advance timer partway
      vi.advanceTimersByTime(50);
      fixture.detectChanges();

      // Leave before delay completes
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();

      // Advance past original delay
      vi.advanceTimersByTime(100);
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
    });
  });

  describe('Prop: closeDelay', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [delay]="0" [closeDelay]="200">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let trigger: HTMLButtonElement;
    let positioner: HTMLElement;

    beforeEach(async () => {
      vi.useFakeTimers();
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should close after delay', async () => {
      // Open tooltip
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      expect(trigger.getAttribute('data-state')).toBe('open');

      // Leave trigger
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();

      // Should still be open (close delay not passed)
      expect(trigger.getAttribute('data-state')).toBe('open');

      // Advance timer past close delay
      vi.advanceTimersByTime(200);
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
      expect(positioner.style.display).toBe('none');
    });

    it('should cancel close if mouse re-enters during close delay', async () => {
      // Open tooltip
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      // Leave trigger
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();

      // Advance timer partway through close delay
      vi.advanceTimersByTime(100);
      fixture.detectChanges();

      // Re-enter trigger
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      // Advance past original close delay
      vi.advanceTimersByTime(200);
      fixture.detectChanges();

      // Should still be open
      expect(trigger.getAttribute('data-state')).toBe('open');
    });
  });

  describe('Prop: onOpenChange', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [delay]="0" [closeDelay]="0" (openChanged)="onOpenChange($event)">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {
      openChangeCalls: TooltipOpenChangeEventDetails[] = [];
      onOpenChange(event: TooltipOpenChangeEventDetails) {
        this.openChangeCalls.push(event);
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let trigger: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
    });

    it('should call onOpenChange when open state changes', () => {
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      expect(component.openChangeCalls.length).toBe(1);
      expect(component.openChangeCalls[0].open).toBe(true);
      expect(component.openChangeCalls[0].reason).toBe('trigger-hover');

      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      fixture.detectChanges();

      expect(component.openChangeCalls.length).toBe(2);
      expect(component.openChangeCalls[1].open).toBe(false);
    });

    it('should not call onOpenChange when open state does not change', () => {
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      // Try to open again (should be no-op)
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      // Should only have been called once
      expect(component.openChangeCalls.length).toBe(1);
    });
  });

  describe('Disabled becoming disabled while open', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot [disabled]="isDisabled()" [delay]="0">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {
      isDisabled = signal(false);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let trigger: HTMLButtonElement;
    let positioner: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      positioner = fixture.nativeElement.querySelector(
        '[baseUiTooltipPositioner]'
      );
    });

    it('should close if open when becoming disabled', async () => {
      // Open the tooltip
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();
      expect(trigger.getAttribute('data-state')).toBe('open');

      // Disable the tooltip using signal
      component.isDisabled.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(trigger.getAttribute('data-state')).toBe('closed');
      expect(positioner.style.display).toBe('none');
    });
  });

  describe('ARIA attributes', () => {
    @Component({
      template: `
        <div baseUiTooltipRoot #tooltipRoot="tooltipRoot" [delay]="0">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>Tooltip content</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
    })
    class TestComponent {
      @ViewChild('tooltipRoot') tooltipRoot!: TooltipRootDirective;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let trigger: HTMLButtonElement;
    let popup: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      trigger = fixture.nativeElement.querySelector('[baseUiTooltipTrigger]');
      popup = fixture.nativeElement.querySelector('[baseUiTooltipPopup]');
    });

    it('should have no aria-describedby when closed', () => {
      expect(trigger.getAttribute('aria-describedby')).toBeNull();
    });

    it('should have aria-describedby pointing to popup when open', () => {
      component.tooltipRoot.setOpen(true);
      fixture.detectChanges();

      expect(trigger.getAttribute('aria-describedby')).toBe(popup.id);
    });

    it('should have matching ids', () => {
      component.tooltipRoot.setOpen(true);
      fixture.detectChanges();

      const triggerId = trigger.id;
      const popupId = popup.id;

      expect(triggerId).toBeTruthy();
      expect(popupId).toBeTruthy();
      expect(triggerId).not.toBe(popupId);
    });
  });
});

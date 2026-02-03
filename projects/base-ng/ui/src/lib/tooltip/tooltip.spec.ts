/**
 * @fileoverview Tests for Tooltip component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tooltip/Tooltip.test.tsx
 * @parity Verified against React Base UI
 */
import { Component, ViewChild } from '@angular/core';
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

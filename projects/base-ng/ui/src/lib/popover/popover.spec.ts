/**
 * @component Popover
 * @fileoverview Tests for Popover components
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/Popover.test.tsx
 * @parity Verified against React Base UI - includes Focus Management, State Attributes, and Accessibility test categories
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PopoverRootDirective } from './popover-root.directive';
import { PopoverTriggerDirective } from './popover-trigger.directive';
import { PopoverPositionerDirective } from './popover-positioner.directive';
import { PopoverPopupDirective } from './popover-popup.directive';
import { PopoverArrowDirective } from './popover-arrow.directive';
import { PopoverCloseDirective } from './popover-close.directive';
import { PopoverTitleDirective } from './popover-title.directive';
import { PopoverDescriptionDirective } from './popover-description.directive';
import { PopoverBackdropDirective } from './popover-backdrop.directive';
import { PopoverPortalDirective } from './popover-portal.directive';
import type { PopoverModalMode } from './popover.types';

@Component({
  standalone: true,
  imports: [
    PopoverRootDirective,
    PopoverTriggerDirective,
    PopoverPositionerDirective,
    PopoverPopupDirective,
    PopoverArrowDirective,
    PopoverCloseDirective,
    PopoverTitleDirective,
    PopoverDescriptionDirective,
  ],
  template: `
    <div baseUiPopoverRoot #popoverRoot="popoverRoot" [disabled]="isDisabled"
         [closeOnOutsideClick]="closeOnOutsideClick" [closeOnEscape]="closeOnEscape"
         [modal]="modal"
         (openChanged)="onOpenChange($event)">
      <button baseUiPopoverTrigger [openOnHover]="openOnHover" [delay]="delay" [closeDelay]="closeDelay">Open Popover</button>
      <div baseUiPopoverPositioner [side]="side" [sideOffset]="sideOffset">
        <div baseUiPopoverPopup [initialFocus]="initialFocus" [finalFocus]="finalFocus">
          <h2 baseUiPopoverTitle>Popover Title</h2>
          <p baseUiPopoverDescription>Popover description text.</p>
          <input #popoverInput type="text" placeholder="Focus me" />
          <button baseUiPopoverClose>Close</button>
          <div baseUiPopoverArrow></div>
        </div>
      </div>
    </div>
    <button #externalButton>External Button</button>
  `,
})
class TestPopoverComponent {
  @ViewChild('popoverRoot', { static: true }) popoverRoot!: PopoverRootDirective;
  @ViewChild('popoverInput', { static: true }) popoverInput!: ElementRef<HTMLInputElement>;
  @ViewChild('externalButton', { static: true }) externalButton!: ElementRef<HTMLButtonElement>;
  isDisabled = false;
  closeOnOutsideClick = true;
  closeOnEscape = true;
  openOnHover = false;
  delay = 300;
  closeDelay = 0;
  modal: PopoverModalMode = false;
  initialFocus: HTMLElement | string | null = null;
  finalFocus: HTMLElement | string | null = null;
  side: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  sideOffset = 8;
  openChangeEvents: Array<{ open: boolean; reason: string }> = [];

  onOpenChange(event: { open: boolean; reason: string }): void {
    this.openChangeEvents.push(event);
  }
}

@Component({
  standalone: true,
  imports: [
    PopoverRootDirective,
    PopoverTriggerDirective,
    PopoverPositionerDirective,
    PopoverPopupDirective,
    PopoverBackdropDirective,
  ],
  template: `
    <div baseUiPopoverRoot #popoverRoot="popoverRoot" [modal]="true">
      <button baseUiPopoverTrigger>Open Popover</button>
      <div baseUiPopoverBackdrop></div>
      <div baseUiPopoverPositioner>
        <div baseUiPopoverPopup>Content</div>
      </div>
    </div>
  `,
})
class TestPopoverWithBackdropComponent {
  @ViewChild('popoverRoot', { static: true }) popoverRoot!: PopoverRootDirective;
}

@Component({
  standalone: true,
  imports: [
    PopoverRootDirective,
    PopoverTriggerDirective,
    PopoverPositionerDirective,
    PopoverPopupDirective,
  ],
  template: `
    <div baseUiPopoverRoot #popoverRoot="popoverRoot" (openChanged)="onOpenChange($event)">
      <button baseUiPopoverTrigger [openOnHover]="true" [delay]="0">Hover me</button>
      <div baseUiPopoverPositioner>
        <div baseUiPopoverPopup>Content</div>
      </div>
    </div>
  `,
})
class TestPopoverWithHoverComponent {
  @ViewChild('popoverRoot', { static: true }) popoverRoot!: PopoverRootDirective;
  openChangeEvents: Array<{ open: boolean; reason: string }> = [];

  onOpenChange(event: { open: boolean; reason: string }): void {
    this.openChangeEvents.push(event);
  }
}

describe('Popover', () => {
  let fixture: ComponentFixture<TestPopoverComponent>;
  let component: TestPopoverComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('PopoverRoot', () => {
    it('should create', () => {
      expect(component.popoverRoot).toBeTruthy();
    });

    it('should have base-ui-popover-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-popover-root');
      expect(root).toBeTruthy();
    });

    it('should start closed by default', () => {
      expect(component.popoverRoot.context.openSignal()).toBe(false);
    });

    it('should open when openPopover is called', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.popoverRoot.context.openSignal()).toBe(true);
    });

    it('should expose disabled signal', () => {
      expect(component.popoverRoot.context.disabledSignal()).toBe(false);
    });
  });

  describe('PopoverTrigger', () => {
    it('should render trigger button', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
      expect(trigger).toBeTruthy();
      expect(trigger.tagName.toLowerCase()).toBe('button');
    });

    it('should have correct ARIA attributes when closed', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.getAttribute('aria-controls')).toBeNull();
    });

    it('should toggle popover on click', async () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
      trigger.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);
      expect(component.openChangeEvents.length).toBeGreaterThan(0);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: true,
        reason: 'trigger-press',
      });
    });

    it('should close popover on second click', async () => {
      // Open first
      const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
      trigger.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      // Click again to close
      trigger.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
    });

    it('should have data-state attribute', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
      expect(trigger.getAttribute('data-state')).toBe('closed');
    });

    it('should update aria-expanded when open', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have base-ui-popover-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-popover-trigger');
      expect(trigger).toBeTruthy();
    });
  });

  describe('PopoverPositioner', () => {
    it('should render positioner', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiPopoverPositioner]');
      expect(positioner).toBeTruthy();
    });

    it('should be hidden when closed', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiPopoverPositioner]');
      expect(positioner.style.display).toBe('none');
    });

    it('should be visible when open', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const positioner = fixture.nativeElement.querySelector('[baseUiPopoverPositioner]');
      expect(positioner.style.display).not.toBe('none');
    });

    it('should have correct data-side attribute', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const positioner = fixture.nativeElement.querySelector('[baseUiPopoverPositioner]');
      expect(positioner.getAttribute('data-side')).toBeTruthy();
    });
  });

  describe('PopoverPopup', () => {
    it('should render popup', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiPopoverPopup]');
      expect(popup).toBeTruthy();
    });

    it('should have dialog role', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiPopoverPopup]');
      expect(popup.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-labelledby when title exists', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiPopoverPopup]');
      const title = fixture.nativeElement.querySelector('[baseUiPopoverTitle]');
      expect(popup.getAttribute('aria-labelledby')).toBe(title.id);
    });

    it('should have aria-describedby when description exists', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiPopoverPopup]');
      const description = fixture.nativeElement.querySelector('[baseUiPopoverDescription]');
      expect(popup.getAttribute('aria-describedby')).toBe(description.id);
    });
  });

  describe('PopoverClose', () => {
    it('should render close button', () => {
      const close = fixture.nativeElement.querySelector('[baseUiPopoverClose]');
      expect(close).toBeTruthy();
    });

    it('should close popover on click', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      const close = fixture.nativeElement.querySelector('[baseUiPopoverClose]');
      close.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'close-press',
      });
    });
  });

  describe('PopoverTitle', () => {
    it('should render title', () => {
      const title = fixture.nativeElement.querySelector('[baseUiPopoverTitle]');
      expect(title).toBeTruthy();
    });

    it('should have unique ID', () => {
      const title = fixture.nativeElement.querySelector('[baseUiPopoverTitle]');
      expect(title.id).toMatch(/^base-ui-popover-title-\d+$/);
    });

    it('should have base-ui-popover-title class', () => {
      const title = fixture.nativeElement.querySelector('.base-ui-popover-title');
      expect(title).toBeTruthy();
    });
  });

  describe('PopoverDescription', () => {
    it('should render description', () => {
      const description = fixture.nativeElement.querySelector('[baseUiPopoverDescription]');
      expect(description).toBeTruthy();
    });

    it('should have unique ID', () => {
      const description = fixture.nativeElement.querySelector('[baseUiPopoverDescription]');
      expect(description.id).toMatch(/^base-ui-popover-description-\d+$/);
    });

    it('should have base-ui-popover-description class', () => {
      const description = fixture.nativeElement.querySelector('.base-ui-popover-description');
      expect(description).toBeTruthy();
    });
  });

  describe('PopoverArrow', () => {
    it('should render arrow', () => {
      const arrow = fixture.nativeElement.querySelector('[baseUiPopoverArrow]');
      expect(arrow).toBeTruthy();
    });

    it('should be aria-hidden', () => {
      const arrow = fixture.nativeElement.querySelector('[baseUiPopoverArrow]');
      expect(arrow.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have absolute positioning', () => {
      const arrow = fixture.nativeElement.querySelector('[baseUiPopoverArrow]');
      expect(arrow.style.position).toBe('absolute');
    });
  });

  describe('Keyboard interactions', () => {
    it('should close on Escape key', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      // Dispatch escape key event
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'escape-key',
      });
    });
  });

  describe('Outside click handling', () => {
    it('should close on outside click', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      // Click outside
      document.body.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'outside-press',
      });
    });

    it('should not close when clicking inside popup', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      const popup = fixture.nativeElement.querySelector('[baseUiPopoverPopup]');
      popup.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);
    });
  });

  describe('Context API', () => {
    it('should provide openPopover method', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);
    });

    it('should provide closePopover method', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      component.popoverRoot.context.closePopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
    });

    it('should provide togglePopover method', async () => {
      expect(component.popoverRoot.context.openSignal()).toBe(false);

      component.popoverRoot.context.togglePopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      component.popoverRoot.context.togglePopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
    });

    it('should provide setOpen method', async () => {
      component.popoverRoot.context.setOpen(true, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      component.popoverRoot.context.setOpen(false, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
    });
  });


  describe('Modal mode', () => {
    it('should expose modal signal', () => {
      expect(component.popoverRoot.context.modalSignal()).toBe(false);
    });

    it('should have default modal value of false', () => {
      // Modal defaults to false
      expect(component.popoverRoot.context.modalSignal()).toBe(false);
    });
  });

  describe('Focus management', () => {
    it('should focus first focusable element by default on open', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for microtask
      await new Promise(resolve => setTimeout(resolve, 10));

      const input = fixture.nativeElement.querySelector('input');
      expect(document.activeElement).toBe(input);
    });
  });
});

describe('Popover with Backdrop', () => {
  let fixture: ComponentFixture<TestPopoverWithBackdropComponent>;
  let component: TestPopoverWithBackdropComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPopoverWithBackdropComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPopoverWithBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('PopoverBackdrop', () => {
    it('should render backdrop', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiPopoverBackdrop]');
      expect(backdrop).toBeTruthy();
    });

    it('should be hidden when popover is closed', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiPopoverBackdrop]');
      expect(backdrop.style.display).toBe('none');
    });

    it('should be visible when popover is open', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = fixture.nativeElement.querySelector('[baseUiPopoverBackdrop]');
      expect(backdrop.style.display).not.toBe('none');
    });

    it('should have correct data-state attribute', async () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiPopoverBackdrop]');
      expect(backdrop.getAttribute('data-state')).toBe('closed');

      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(backdrop.getAttribute('data-state')).toBe('open');
    });

    it('should close popover on backdrop click', async () => {
      component.popoverRoot.context.openPopover('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(true);

      const backdrop = fixture.nativeElement.querySelector('[baseUiPopoverBackdrop]');
      backdrop.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.popoverRoot.context.openSignal()).toBe(false);
    });

    it('should be aria-hidden', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiPopoverBackdrop]');
      expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have base-ui-popover-backdrop class', () => {
      const backdrop = fixture.nativeElement.querySelector('.base-ui-popover-backdrop');
      expect(backdrop).toBeTruthy();
    });
  });
});

describe('Popover with Hover Trigger', () => {
  let fixture: ComponentFixture<TestPopoverWithHoverComponent>;
  let component: TestPopoverWithHoverComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPopoverWithHoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPopoverWithHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open on mouseenter when openOnHover is true', async () => {
    const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.popoverRoot.context.openSignal()).toBe(true);
  });

  it('should close on mouseleave when openOnHover is true', async () => {
    const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.popoverRoot.context.openSignal()).toBe(true);

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.popoverRoot.context.openSignal()).toBe(false);
  });

  it('should emit hover reason on open', async () => {
    const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
      open: true,
      reason: 'hover',
    });
  });

  it('should open on focus when openOnHover is true', async () => {
    const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
    trigger.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.popoverRoot.context.openSignal()).toBe(true);
  });

  it('should close on blur when openOnHover is true', async () => {
    const trigger = fixture.nativeElement.querySelector('[baseUiPopoverTrigger]');
    trigger.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.popoverRoot.context.openSignal()).toBe(true);

    trigger.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.popoverRoot.context.openSignal()).toBe(false);
  });
});

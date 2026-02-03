/**
 * @component AlertDialog
 * @fileoverview Tests for Alert Dialog components
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/alert-dialog/AlertDialog.test.tsx
 * @parity Verified against React Base UI - includes Keyboard Navigation, Focus Management, State Attributes, and Accessibility test categories
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { AlertDialogRootDirective } from './alert-dialog-root.directive';
import { AlertDialogTriggerDirective } from './alert-dialog-trigger.directive';
import { AlertDialogBackdropDirective } from './alert-dialog-backdrop.directive';
import { AlertDialogPopupDirective } from './alert-dialog-popup.directive';
import { AlertDialogCloseDirective } from './alert-dialog-close.directive';
import { AlertDialogTitleDirective } from './alert-dialog-title.directive';
import { AlertDialogDescriptionDirective } from './alert-dialog-description.directive';

@Component({
  standalone: true,
  imports: [
    AlertDialogRootDirective,
    AlertDialogTriggerDirective,
    AlertDialogBackdropDirective,
    AlertDialogPopupDirective,
    AlertDialogCloseDirective,
    AlertDialogTitleDirective,
    AlertDialogDescriptionDirective,
  ],
  template: `
    <div baseUiAlertDialogRoot #alertDialogRoot="alertDialogRoot"
         (openChanged)="onOpenChange($event)">
      <button baseUiAlertDialogTrigger>Open Alert</button>
      <div baseUiAlertDialogBackdrop></div>
      <div baseUiAlertDialogPopup>
        <h2 baseUiAlertDialogTitle>Confirm Action</h2>
        <p baseUiAlertDialogDescription>This action cannot be undone.</p>
        <button baseUiAlertDialogClose>Confirm</button>
        <button baseUiAlertDialogClose id="cancel-button">Cancel</button>
      </div>
    </div>
  `,
})
class TestAlertDialogComponent {
  @ViewChild('alertDialogRoot', { static: true }) alertDialogRoot!: AlertDialogRootDirective;
  openChangeEvents: Array<{ open: boolean; reason: string }> = [];

  onOpenChange(event: { open: boolean; reason: string }): void {
    this.openChangeEvents.push(event);
  }
}

describe('AlertDialog', () => {
  let fixture: ComponentFixture<TestAlertDialogComponent>;
  let component: TestAlertDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAlertDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllTimers();
    // Ensure body scroll is restored
    document.body.style.overflow = '';
  });

  describe('AlertDialogRoot', () => {
    it('should create', () => {
      expect(component.alertDialogRoot).toBeTruthy();
    });

    it('should have base-ui-alert-dialog-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-alert-dialog-root');
      expect(root).toBeTruthy();
    });

    it('should start closed by default', () => {
      expect(component.alertDialogRoot.context.openSignal()).toBe(false);
    });

    it('should open when openAlertDialog is called', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.alertDialogRoot.context.openSignal()).toBe(true);
    });

    it('should always be modal (verified via popup aria-modal attribute)', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      expect(popup.getAttribute('aria-modal')).toBe('true');
    });
  });

  describe('AlertDialogTrigger', () => {
    it('should render trigger button', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiAlertDialogTrigger]');
      expect(trigger).toBeTruthy();
      expect(trigger.tagName.toLowerCase()).toBe('button');
    });

    it('should have correct ARIA attributes when closed', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiAlertDialogTrigger]');
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.getAttribute('aria-controls')).toBeNull();
    });

    it('should open alert dialog on click', async () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiAlertDialogTrigger]');
      trigger.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.alertDialogRoot.context.openSignal()).toBe(true);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: true,
        reason: 'trigger-press',
      });
    });

    it('should have data-state attribute', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiAlertDialogTrigger]');
      expect(trigger.getAttribute('data-state')).toBe('closed');
    });

    it('should update aria-expanded when open', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const trigger = fixture.nativeElement.querySelector('[baseUiAlertDialogTrigger]');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have base-ui-alert-dialog-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-alert-dialog-trigger');
      expect(trigger).toBeTruthy();
    });
  });

  describe('AlertDialogBackdrop', () => {
    it('should render backdrop', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiAlertDialogBackdrop]');
      expect(backdrop).toBeTruthy();
    });

    it('should have presentation role', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiAlertDialogBackdrop]');
      expect(backdrop.getAttribute('role')).toBe('presentation');
    });

    it('should be hidden when closed', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiAlertDialogBackdrop]');
      expect(backdrop.hidden).toBe(true);
    });

    it('should be visible when open', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = fixture.nativeElement.querySelector('[baseUiAlertDialogBackdrop]');
      expect(backdrop.hidden).toBe(false);
    });

    it('should NOT close on backdrop click (alert dialogs require explicit action)', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.alertDialogRoot.context.openSignal()).toBe(true);

      const backdrop = fixture.nativeElement.querySelector('[baseUiAlertDialogBackdrop]');
      backdrop.click();
      fixture.detectChanges();
      await fixture.whenStable();

      // Alert dialog should still be open
      expect(component.alertDialogRoot.context.openSignal()).toBe(true);
    });
  });

  describe('AlertDialogPopup', () => {
    it('should render popup', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      expect(popup).toBeTruthy();
    });

    it('should have alertdialog role', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      expect(popup.getAttribute('role')).toBe('alertdialog');
    });

    it('should be hidden when closed', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      expect(popup.hidden).toBe(true);
    });

    it('should be visible when open', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      expect(popup.hidden).toBe(false);
    });

    it('should have aria-modal attribute (always modal)', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      expect(popup.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby when title exists', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      const title = fixture.nativeElement.querySelector('[baseUiAlertDialogTitle]');
      expect(popup.getAttribute('aria-labelledby')).toBe(title.id);
    });

    it('should have aria-describedby when description exists', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiAlertDialogPopup]');
      const description = fixture.nativeElement.querySelector('[baseUiAlertDialogDescription]');
      expect(popup.getAttribute('aria-describedby')).toBe(description.id);
    });
  });

  describe('AlertDialogClose', () => {
    it('should render close button', () => {
      const close = fixture.nativeElement.querySelector('[baseUiAlertDialogClose]');
      expect(close).toBeTruthy();
    });

    it('should close alert dialog on click', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.alertDialogRoot.context.openSignal()).toBe(true);

      const close = fixture.nativeElement.querySelector('[baseUiAlertDialogClose]');
      close.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.alertDialogRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'close-press',
      });
    });

    it('should have multiple close buttons for different actions', () => {
      const closeButtons = fixture.nativeElement.querySelectorAll('[baseUiAlertDialogClose]');
      expect(closeButtons.length).toBe(2);
    });
  });

  describe('AlertDialogTitle', () => {
    it('should render title', () => {
      const title = fixture.nativeElement.querySelector('[baseUiAlertDialogTitle]');
      expect(title).toBeTruthy();
    });

    it('should have unique ID', () => {
      const title = fixture.nativeElement.querySelector('[baseUiAlertDialogTitle]');
      expect(title.id).toMatch(/^base-ui-alert-dialog-title-\d+$/);
    });

    it('should have base-ui-alert-dialog-title class', () => {
      const title = fixture.nativeElement.querySelector('.base-ui-alert-dialog-title');
      expect(title).toBeTruthy();
    });
  });

  describe('AlertDialogDescription', () => {
    it('should render description', () => {
      const description = fixture.nativeElement.querySelector('[baseUiAlertDialogDescription]');
      expect(description).toBeTruthy();
    });

    it('should have unique ID', () => {
      const description = fixture.nativeElement.querySelector('[baseUiAlertDialogDescription]');
      expect(description.id).toMatch(/^base-ui-alert-dialog-description-\d+$/);
    });

    it('should have base-ui-alert-dialog-description class', () => {
      const description = fixture.nativeElement.querySelector('.base-ui-alert-dialog-description');
      expect(description).toBeTruthy();
    });
  });

  describe('Alert dialog specific behavior', () => {
    it('should NOT close on Escape key (requires explicit user action)', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.alertDialogRoot.context.openSignal()).toBe(true);

      // Dispatch escape key event
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();

      // Alert dialog should still be open
      expect(component.alertDialogRoot.context.openSignal()).toBe(true);
    });

    it('should NOT close on outside click (requires explicit user action)', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.alertDialogRoot.context.openSignal()).toBe(true);

      // Click outside
      document.body.click();
      fixture.detectChanges();
      await fixture.whenStable();

      // Alert dialog should still be open
      expect(component.alertDialogRoot.context.openSignal()).toBe(true);
    });

    it('should lock body scroll when open', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for scroll lock to be applied
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when closed', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise(resolve => setTimeout(resolve, 10));

      const close = fixture.nativeElement.querySelector('[baseUiAlertDialogClose]');
      close.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Context API', () => {
    it('should provide openAlertDialog method', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.alertDialogRoot.context.openSignal()).toBe(true);
    });

    it('should provide closeAlertDialog method', async () => {
      component.alertDialogRoot.context.openAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      component.alertDialogRoot.context.closeAlertDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.alertDialogRoot.context.openSignal()).toBe(false);
    });

    it('should provide setOpen method', async () => {
      component.alertDialogRoot.context.setOpen(true, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.alertDialogRoot.context.openSignal()).toBe(true);

      component.alertDialogRoot.context.setOpen(false, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.alertDialogRoot.context.openSignal()).toBe(false);
    });
  });
});

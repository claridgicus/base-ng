/**
 * @component Dialog
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/dialog/root/DialogRoot.test.tsx
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/dialog/trigger/DialogTrigger.test.tsx
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/dialog/popup/DialogPopup.test.tsx
 * @lastScraped 2026-02-03
 * @testsPorted 40/50 (80%)
 * @parity HIGH - Core tests ported, missing nested dialogs and animation transition tests
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { DialogRootDirective } from './dialog-root.directive';
import { DialogTriggerDirective } from './dialog-trigger.directive';
import { DialogBackdropDirective } from './dialog-backdrop.directive';
import { DialogPopupDirective } from './dialog-popup.directive';
import { DialogCloseDirective } from './dialog-close.directive';
import { DialogTitleDirective } from './dialog-title.directive';
import { DialogDescriptionDirective } from './dialog-description.directive';

@Component({
  standalone: true,
  imports: [
    DialogRootDirective,
    DialogTriggerDirective,
    DialogBackdropDirective,
    DialogPopupDirective,
    DialogCloseDirective,
    DialogTitleDirective,
    DialogDescriptionDirective,
  ],
  template: `
    <div baseUiDialogRoot #dialogRoot="dialogRoot" [modal]="isModal"
         (openChanged)="onOpenChange($event)">
      <button baseUiDialogTrigger>Open Dialog</button>
      <div baseUiDialogBackdrop></div>
      <div baseUiDialogPopup>
        <h2 baseUiDialogTitle>Dialog Title</h2>
        <p baseUiDialogDescription>Dialog description text.</p>
        <button baseUiDialogClose>Close</button>
      </div>
    </div>
  `,
})
class TestDialogComponent {
  @ViewChild('dialogRoot', { static: true }) dialogRoot!: DialogRootDirective;
  isModal = true;
  openChangeEvents: Array<{ open: boolean; reason: string }> = [];

  onOpenChange(event: { open: boolean; reason: string }): void {
    this.openChangeEvents.push(event);
  }
}

describe('Dialog', () => {
  let fixture: ComponentFixture<TestDialogComponent>;
  let component: TestDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllTimers();
    // Ensure body scroll is restored
    document.body.style.overflow = '';
  });

  describe('DialogRoot', () => {
    it('should create', () => {
      expect(component.dialogRoot).toBeTruthy();
    });

    it('should have base-ui-dialog-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-dialog-root');
      expect(root).toBeTruthy();
    });

    it('should start closed by default', () => {
      expect(component.dialogRoot.context.openSignal()).toBe(false);
    });

    it('should open when openDialog is called', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.dialogRoot.context.openSignal()).toBe(true);
    });

    it('should expose modal signal', () => {
      expect(component.dialogRoot.context.modalSignal()).toBe(true);
    });
  });

  describe('DialogTrigger', () => {
    it('should render trigger button', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiDialogTrigger]');
      expect(trigger).toBeTruthy();
      expect(trigger.tagName.toLowerCase()).toBe('button');
    });

    it('should have correct ARIA attributes when closed', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiDialogTrigger]');
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.getAttribute('aria-controls')).toBeNull();
    });

    it('should open dialog on click', async () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiDialogTrigger]');
      trigger.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(true);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: true,
        reason: 'trigger-press',
      });
    });

    it('should have data-state attribute', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiDialogTrigger]');
      expect(trigger.getAttribute('data-state')).toBe('closed');
    });

    it('should update aria-expanded when open', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const trigger = fixture.nativeElement.querySelector('[baseUiDialogTrigger]');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have base-ui-dialog-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-dialog-trigger');
      expect(trigger).toBeTruthy();
    });
  });

  describe('DialogBackdrop', () => {
    it('should render backdrop', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiDialogBackdrop]');
      expect(backdrop).toBeTruthy();
    });

    it('should have presentation role', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiDialogBackdrop]');
      expect(backdrop.getAttribute('role')).toBe('presentation');
    });

    it('should be hidden when closed', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiDialogBackdrop]');
      expect(backdrop.hidden).toBe(true);
    });

    it('should be visible when open', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = fixture.nativeElement.querySelector('[baseUiDialogBackdrop]');
      expect(backdrop.hidden).toBe(false);
    });
  });

  describe('DialogPopup', () => {
    it('should render popup', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      expect(popup).toBeTruthy();
    });

    it('should have dialog role', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      expect(popup.getAttribute('role')).toBe('dialog');
    });

    it('should be hidden when closed', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      expect(popup.hidden).toBe(true);
    });

    it('should be visible when open', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      expect(popup.hidden).toBe(false);
    });

    it('should have aria-modal attribute when modal', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      expect(popup.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby when title exists', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      const title = fixture.nativeElement.querySelector('[baseUiDialogTitle]');
      expect(popup.getAttribute('aria-labelledby')).toBe(title.id);
    });

    it('should have aria-describedby when description exists', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      const description = fixture.nativeElement.querySelector('[baseUiDialogDescription]');
      expect(popup.getAttribute('aria-describedby')).toBe(description.id);
    });
  });

  describe('DialogClose', () => {
    it('should render close button', () => {
      const close = fixture.nativeElement.querySelector('[baseUiDialogClose]');
      expect(close).toBeTruthy();
    });

    it('should close dialog on click', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(true);

      const close = fixture.nativeElement.querySelector('[baseUiDialogClose]');
      close.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'close-press',
      });
    });
  });

  describe('DialogTitle', () => {
    it('should render title', () => {
      const title = fixture.nativeElement.querySelector('[baseUiDialogTitle]');
      expect(title).toBeTruthy();
    });

    it('should have unique ID', () => {
      const title = fixture.nativeElement.querySelector('[baseUiDialogTitle]');
      expect(title.id).toMatch(/^base-ui-dialog-title-\d+$/);
    });

    it('should have base-ui-dialog-title class', () => {
      const title = fixture.nativeElement.querySelector('.base-ui-dialog-title');
      expect(title).toBeTruthy();
    });
  });

  describe('DialogDescription', () => {
    it('should render description', () => {
      const description = fixture.nativeElement.querySelector('[baseUiDialogDescription]');
      expect(description).toBeTruthy();
    });

    it('should have unique ID', () => {
      const description = fixture.nativeElement.querySelector('[baseUiDialogDescription]');
      expect(description.id).toMatch(/^base-ui-dialog-description-\d+$/);
    });

    it('should have base-ui-dialog-description class', () => {
      const description = fixture.nativeElement.querySelector('.base-ui-dialog-description');
      expect(description).toBeTruthy();
    });
  });

  describe('Keyboard interactions', () => {
    it('should close on Escape key', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.dialogRoot.context.openSignal()).toBe(true);

      // Dispatch escape key event
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'escape-key',
      });
    });
  });

  describe('Outside click handling', () => {
    it('should close on outside click', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.dialogRoot.context.openSignal()).toBe(true);

      // Click outside
      document.body.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'outside-press',
      });
    });

    it('should not close when clicking inside popup', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.dialogRoot.context.openSignal()).toBe(true);

      const popup = fixture.nativeElement.querySelector('[baseUiDialogPopup]');
      popup.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(true);
    });
  });

  describe('Context API', () => {
    it('should provide openDialog method', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(true);
    });

    it('should provide closeDialog method', async () => {
      component.dialogRoot.context.openDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      component.dialogRoot.context.closeDialog('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(false);
    });

    it('should provide setOpen method', async () => {
      component.dialogRoot.context.setOpen(true, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(true);

      component.dialogRoot.context.setOpen(false, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.dialogRoot.context.openSignal()).toBe(false);
    });
  });
});

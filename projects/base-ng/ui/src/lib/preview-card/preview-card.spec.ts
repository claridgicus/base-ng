/**
 * @component PreviewCard
 * @fileoverview Tests for PreviewCard components
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/PreviewCard.test.tsx
 * @parity Verified against React Base UI - includes Focus Management, State Attributes, and Accessibility test categories
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PreviewCardRootDirective } from './preview-card-root.directive';
import { PreviewCardTriggerDirective } from './preview-card-trigger.directive';
import { PreviewCardPositionerDirective } from './preview-card-positioner.directive';
import { PreviewCardPopupDirective } from './preview-card-popup.directive';
import { PreviewCardArrowDirective } from './preview-card-arrow.directive';
import { PreviewCardBackdropDirective } from './preview-card-backdrop.directive';

@Component({
  standalone: true,
  imports: [
    PreviewCardRootDirective,
    PreviewCardTriggerDirective,
    PreviewCardPositionerDirective,
    PreviewCardPopupDirective,
    PreviewCardArrowDirective,
    PreviewCardBackdropDirective,
  ],
  template: `
    <div baseUiPreviewCardRoot #previewCardRoot="previewCardRoot"
         [delay]="delay" [closeDelay]="closeDelay"
         (openChanged)="onOpenChange($event)">
      <a baseUiPreviewCardTrigger href="#">Hover for preview</a>
      <div baseUiPreviewCardBackdrop></div>
      <div baseUiPreviewCardPositioner [side]="side" [sideOffset]="sideOffset">
        <div baseUiPreviewCardPopup>
          <div baseUiPreviewCardArrow></div>
          <p>Preview content here</p>
        </div>
      </div>
    </div>
  `,
})
class TestPreviewCardComponent {
  @ViewChild('previewCardRoot', { static: true }) previewCardRoot!: PreviewCardRootDirective;
  delay = 0; // No delay for testing
  closeDelay = 0;
  side: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  sideOffset = 8;
  openChangeEvents: Array<{ open: boolean; reason: string }> = [];

  onOpenChange(event: { open: boolean; reason: string }): void {
    this.openChangeEvents.push(event);
  }
}

describe('PreviewCard', () => {
  let fixture: ComponentFixture<TestPreviewCardComponent>;
  let component: TestPreviewCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPreviewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('PreviewCardRoot', () => {
    it('should create', () => {
      expect(component.previewCardRoot).toBeTruthy();
    });

    it('should have base-ui-preview-card-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-preview-card-root');
      expect(root).toBeTruthy();
    });

    it('should start closed by default', () => {
      expect(component.previewCardRoot.context.openSignal()).toBe(false);
    });

    it('should open when openPreviewCard is called', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.previewCardRoot.context.openSignal()).toBe(true);
    });

    it('should expose delay signal', () => {
      expect(component.previewCardRoot.context.delaySignal()).toBe(0);
    });

    it('should expose closeDelay signal', () => {
      expect(component.previewCardRoot.context.closeDelaySignal()).toBe(0);
    });
  });

  describe('PreviewCardTrigger', () => {
    it('should render trigger element', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPreviewCardTrigger]');
      expect(trigger).toBeTruthy();
      expect(trigger.tagName.toLowerCase()).toBe('a');
    });

    it('should have base-ui-preview-card-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-preview-card-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should have data-state attribute', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPreviewCardTrigger]');
      expect(trigger.getAttribute('data-state')).toBe('closed');
    });

    it('should open on mouse enter', async () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPreviewCardTrigger]');
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(true);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: true,
        reason: 'trigger-hover',
      });
    });

    it('should close on mouse leave', async () => {
      // Open first
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const trigger = fixture.nativeElement.querySelector('[baseUiPreviewCardTrigger]');
      trigger.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(false);
    });

    it('should open on focus', async () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiPreviewCardTrigger]');
      trigger.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(true);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: true,
        reason: 'trigger-focus',
      });
    });

    it('should close on blur', async () => {
      // Open first
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const trigger = fixture.nativeElement.querySelector('[baseUiPreviewCardTrigger]');
      trigger.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(false);
    });

    it('should update aria-describedby when open', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const trigger = fixture.nativeElement.querySelector('[baseUiPreviewCardTrigger]');
      expect(trigger.getAttribute('aria-describedby')).toBeTruthy();
    });
  });

  describe('PreviewCardPositioner', () => {
    it('should render positioner', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiPreviewCardPositioner]');
      expect(positioner).toBeTruthy();
    });

    it('should be hidden when closed', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiPreviewCardPositioner]');
      expect(positioner.style.display).toBe('none');
    });

    it('should be visible when open', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const positioner = fixture.nativeElement.querySelector('[baseUiPreviewCardPositioner]');
      expect(positioner.style.display).not.toBe('none');
    });

    it('should have correct data-side attribute', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const positioner = fixture.nativeElement.querySelector('[baseUiPreviewCardPositioner]');
      expect(positioner.getAttribute('data-side')).toBeTruthy();
    });
  });

  describe('PreviewCardPopup', () => {
    it('should render popup', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiPreviewCardPopup]');
      expect(popup).toBeTruthy();
    });

    it('should have base-ui-preview-card-popup class', () => {
      const popup = fixture.nativeElement.querySelector('.base-ui-preview-card-popup');
      expect(popup).toBeTruthy();
    });

    it('should have data-state attribute', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiPreviewCardPopup]');
      expect(popup.getAttribute('data-state')).toBe('closed');
    });
  });

  describe('PreviewCardArrow', () => {
    it('should render arrow', () => {
      const arrow = fixture.nativeElement.querySelector('[baseUiPreviewCardArrow]');
      expect(arrow).toBeTruthy();
    });

    it('should be aria-hidden', () => {
      const arrow = fixture.nativeElement.querySelector('[baseUiPreviewCardArrow]');
      expect(arrow.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have absolute positioning', () => {
      const arrow = fixture.nativeElement.querySelector('[baseUiPreviewCardArrow]');
      expect(arrow.style.position).toBe('absolute');
    });
  });

  describe('PreviewCardBackdrop', () => {
    it('should render backdrop', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiPreviewCardBackdrop]');
      expect(backdrop).toBeTruthy();
    });

    it('should have presentation role', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiPreviewCardBackdrop]');
      expect(backdrop.getAttribute('role')).toBe('presentation');
    });

    it('should be hidden when closed', () => {
      const backdrop = fixture.nativeElement.querySelector('[baseUiPreviewCardBackdrop]');
      expect(backdrop.hidden).toBe(true);
    });

    it('should be visible when open', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = fixture.nativeElement.querySelector('[baseUiPreviewCardBackdrop]');
      expect(backdrop.hidden).toBe(false);
    });
  });

  describe('Keyboard interactions', () => {
    it('should close on Escape key', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.previewCardRoot.context.openSignal()).toBe(true);

      // Dispatch escape key event
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'escape-key',
      });
    });
  });

  describe('Context API', () => {
    it('should provide openPreviewCard method', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(true);
    });

    it('should provide closePreviewCard method', async () => {
      component.previewCardRoot.context.openPreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      component.previewCardRoot.context.closePreviewCard('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(false);
    });

    it('should provide setOpen method', async () => {
      component.previewCardRoot.context.setOpen(true, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(true);

      component.previewCardRoot.context.setOpen(false, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.openSignal()).toBe(false);
    });

    it('should provide payload methods', async () => {
      expect(component.previewCardRoot.context.payloadSignal()).toBeNull();

      component.previewCardRoot.context.setPayload({ id: 1, name: 'test' });
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.previewCardRoot.context.payloadSignal()).toEqual({ id: 1, name: 'test' });
    });
  });
});

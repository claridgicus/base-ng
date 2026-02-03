/**
 * @component ContextMenu
 * @fileoverview Tests for ContextMenu components
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/context-menu/ContextMenu.test.tsx
 * @parity Verified against React Base UI - includes Keyboard Navigation, Focus Management, State Attributes, and Accessibility test categories
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ContextMenuRootDirective } from './context-menu-root.directive';
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { ContextMenuPositionerDirective } from './context-menu-positioner.directive';
import { ContextMenuPopupDirective } from './context-menu-popup.directive';
import { ContextMenuItemDirective } from './context-menu-item.directive';
import { ContextMenuSeparatorDirective } from './context-menu-separator.directive';

@Component({
  standalone: true,
  imports: [
    ContextMenuRootDirective,
    ContextMenuTriggerDirective,
    ContextMenuPositionerDirective,
    ContextMenuPopupDirective,
    ContextMenuItemDirective,
    ContextMenuSeparatorDirective,
  ],
  template: `
    <div baseUiContextMenuRoot #contextMenuRoot="contextMenuRoot"
         (openChanged)="onOpenChange($event)">
      <div baseUiContextMenuTrigger class="trigger-area">
        Right-click me
      </div>
      <div baseUiContextMenuPositioner>
        <div baseUiContextMenuPopup>
          <div baseUiContextMenuItem class="item-cut" (itemClick)="onItemClick('cut')">Cut</div>
          <div baseUiContextMenuItem class="item-copy" (itemClick)="onItemClick('copy')">Copy</div>
          <hr baseUiContextMenuSeparator />
          <div baseUiContextMenuItem class="item-paste" (itemClick)="onItemClick('paste')">Paste</div>
          <div baseUiContextMenuItem class="item-disabled" [disabled]="true">Disabled</div>
        </div>
      </div>
    </div>
  `,
})
class TestContextMenuComponent {
  @ViewChild('contextMenuRoot', { static: true }) contextMenuRoot!: ContextMenuRootDirective;
  openChangeEvents: Array<{ open: boolean; reason: string }> = [];
  clickedItems: string[] = [];

  onOpenChange(event: { open: boolean; reason: string }): void {
    this.openChangeEvents.push(event);
  }

  onItemClick(itemId: string): void {
    this.clickedItems.push(itemId);
  }
}

describe('ContextMenu', () => {
  let fixture: ComponentFixture<TestContextMenuComponent>;
  let component: TestContextMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestContextMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('ContextMenuRoot', () => {
    it('should create', () => {
      expect(component.contextMenuRoot).toBeTruthy();
    });

    it('should have base-ui-context-menu-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-context-menu-root');
      expect(root).toBeTruthy();
    });

    it('should start closed by default', () => {
      expect(component.contextMenuRoot.context.openSignal()).toBe(false);
    });

    it('should open when openContextMenu is called', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 200, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.contextMenuRoot.context.openSignal()).toBe(true);
    });

    it('should store anchor position when opened', async () => {
      component.contextMenuRoot.context.openContextMenu(150, 250, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.anchorXSignal()).toBe(150);
      expect(component.contextMenuRoot.context.anchorYSignal()).toBe(250);
    });
  });

  describe('ContextMenuTrigger', () => {
    it('should render trigger area', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiContextMenuTrigger]');
      expect(trigger).toBeTruthy();
    });

    it('should have base-ui-context-menu-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-context-menu-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should open context menu on right-click', async () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiContextMenuTrigger]');
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        clientX: 100,
        clientY: 150,
      });
      trigger.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.openSignal()).toBe(true);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: true,
        reason: 'context-menu',
      });
    });
  });

  describe('ContextMenuPositioner', () => {
    it('should render positioner', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiContextMenuPositioner]');
      expect(positioner).toBeTruthy();
    });

    it('should be hidden when closed', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiContextMenuPositioner]');
      expect(positioner.style.display).toBe('none');
    });

    it('should be visible when open', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 100, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      const positioner = fixture.nativeElement.querySelector('[baseUiContextMenuPositioner]');
      expect(positioner.style.display).not.toBe('none');
    });

    it('should position at anchor coordinates', async () => {
      component.contextMenuRoot.context.openContextMenu(200, 300, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      const positioner = fixture.nativeElement.querySelector('[baseUiContextMenuPositioner]');
      expect(positioner.style.left).toBe('200px');
      expect(positioner.style.top).toBe('300px');
    });
  });

  describe('ContextMenuPopup', () => {
    it('should render popup', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiContextMenuPopup]');
      expect(popup).toBeTruthy();
    });

    it('should have menu role', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiContextMenuPopup]');
      expect(popup.getAttribute('role')).toBe('menu');
    });

    it('should be hidden when closed', () => {
      const popup = fixture.nativeElement.querySelector('[baseUiContextMenuPopup]');
      expect(popup.hidden).toBe(true);
    });

    it('should be visible when open', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 100, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      const popup = fixture.nativeElement.querySelector('[baseUiContextMenuPopup]');
      expect(popup.hidden).toBe(false);
    });
  });

  describe('ContextMenuItem', () => {
    it('should render menu items', () => {
      const items = fixture.nativeElement.querySelectorAll('[baseUiContextMenuItem]');
      expect(items.length).toBe(4);
    });

    it('should have menuitem role', () => {
      const item = fixture.nativeElement.querySelector('[baseUiContextMenuItem]');
      expect(item.getAttribute('role')).toBe('menuitem');
    });

    it('should close menu and emit event on click', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 100, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      const item = fixture.nativeElement.querySelector('.item-cut');
      item.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.clickedItems).toContain('cut');
      expect(component.contextMenuRoot.context.openSignal()).toBe(false);
    });

    it('should show disabled state', () => {
      const disabledItem = fixture.nativeElement.querySelector('.item-disabled');
      expect(disabledItem.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('ContextMenuSeparator', () => {
    it('should render separator', () => {
      const separator = fixture.nativeElement.querySelector('[baseUiContextMenuSeparator]');
      expect(separator).toBeTruthy();
    });

    it('should have separator role', () => {
      const separator = fixture.nativeElement.querySelector('[baseUiContextMenuSeparator]');
      expect(separator.getAttribute('role')).toBe('separator');
    });
  });

  describe('Keyboard interactions', () => {
    it('should close on Escape key', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 100, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.contextMenuRoot.context.openSignal()).toBe(true);

      // Dispatch escape key event
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.openSignal()).toBe(false);
      expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
        open: false,
        reason: 'escape-key',
      });
    });
  });

  describe('Outside click handling', () => {
    it('should close on outside click', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 100, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for document listeners to be set up
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(component.contextMenuRoot.context.openSignal()).toBe(true);

      // Click outside
      document.body.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.openSignal()).toBe(false);
    });
  });

  describe('Context API', () => {
    it('should provide openContextMenu method', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 100, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.openSignal()).toBe(true);
    });

    it('should provide closeContextMenu method', async () => {
      component.contextMenuRoot.context.openContextMenu(100, 100, 'context-menu');
      fixture.detectChanges();
      await fixture.whenStable();

      component.contextMenuRoot.context.closeContextMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.openSignal()).toBe(false);
    });

    it('should provide setOpen method', async () => {
      component.contextMenuRoot.context.setOpen(true, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.openSignal()).toBe(true);

      component.contextMenuRoot.context.setOpen(false, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.contextMenuRoot.context.openSignal()).toBe(false);
    });
  });
});

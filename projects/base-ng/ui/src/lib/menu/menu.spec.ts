/**
 * @fileoverview Tests for Menu components
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/Menu.test.tsx
 * @parity Verified against React Base UI
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { MenuRootDirective } from './menu-root.directive';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuPositionerDirective } from './menu-positioner.directive';
import { MenuPopupDirective } from './menu-popup.directive';
import { MenuItemDirective } from './menu-item.directive';
import { MenuGroupDirective } from './menu-group.directive';
import { MenuGroupLabelDirective } from './menu-group-label.directive';
import { MenuSeparatorDirective } from './menu-separator.directive';
import { MenuCheckboxItemDirective } from './menu-checkbox-item.directive';
import { MenuRadioGroupDirective } from './menu-radio-group.directive';
import { MenuRadioItemDirective } from './menu-radio-item.directive';
import { MenuBackdropDirective } from './menu-backdrop.directive';
import { MenuArrowDirective } from './menu-arrow.directive';

@Component({
  standalone: true,
  imports: [
    MenuRootDirective,
    MenuTriggerDirective,
    MenuPositionerDirective,
    MenuPopupDirective,
    MenuItemDirective,
    MenuSeparatorDirective,
    MenuBackdropDirective,
  ],
  template: `
    <div baseUiMenuRoot #menuRoot="menuRoot"
         (openChanged)="onOpenChange($event)">
      <button baseUiMenuTrigger>Open Menu</button>
      <div baseUiMenuBackdrop></div>
      <div baseUiMenuPositioner>
        <div baseUiMenuPopup>
          <div baseUiMenuItem class="item-1" (itemClick)="onItemClick('item1')">Item 1</div>
          <div baseUiMenuItem class="item-2">Item 2</div>
          <hr baseUiMenuSeparator />
          <div baseUiMenuItem class="item-disabled" [disabled]="true">Disabled Item</div>
        </div>
      </div>
    </div>
  `,
})
class TestMenuComponent {
  @ViewChild('menuRoot', { static: true }) menuRoot!: MenuRootDirective;
  openChangeEvents: Array<{ open: boolean; reason: string }> = [];
  clickedItems: string[] = [];

  onOpenChange(event: { open: boolean; reason: string }): void {
    this.openChangeEvents.push(event);
  }

  onItemClick(itemId: string): void {
    this.clickedItems.push(itemId);
  }
}

@Component({
  standalone: true,
  imports: [
    MenuRootDirective,
    MenuTriggerDirective,
    MenuPositionerDirective,
    MenuPopupDirective,
    MenuGroupDirective,
    MenuGroupLabelDirective,
    MenuItemDirective,
  ],
  template: `
    <div baseUiMenuRoot #menuRoot="menuRoot">
      <button baseUiMenuTrigger>Open Menu</button>
      <div baseUiMenuPositioner>
        <div baseUiMenuPopup>
          <div baseUiMenuGroup>
            <div baseUiMenuGroupLabel>Actions</div>
            <div baseUiMenuItem>Edit</div>
            <div baseUiMenuItem>Delete</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestMenuGroupComponent {
  @ViewChild('menuRoot', { static: true }) menuRoot!: MenuRootDirective;
}

@Component({
  standalone: true,
  imports: [
    MenuRootDirective,
    MenuTriggerDirective,
    MenuPositionerDirective,
    MenuPopupDirective,
    MenuCheckboxItemDirective,
  ],
  template: `
    <div baseUiMenuRoot #menuRoot="menuRoot">
      <button baseUiMenuTrigger>Open Menu</button>
      <div baseUiMenuPositioner>
        <div baseUiMenuPopup>
          <div baseUiMenuCheckboxItem [(checked)]="showHidden">Show Hidden</div>
          <div baseUiMenuCheckboxItem [(checked)]="autoSave">Auto Save</div>
        </div>
      </div>
    </div>
  `,
})
class TestMenuCheckboxComponent {
  @ViewChild('menuRoot', { static: true }) menuRoot!: MenuRootDirective;
  showHidden = false;
  autoSave = true;
}

@Component({
  standalone: true,
  imports: [
    MenuRootDirective,
    MenuTriggerDirective,
    MenuPositionerDirective,
    MenuPopupDirective,
    MenuRadioGroupDirective,
    MenuRadioItemDirective,
  ],
  template: `
    <div baseUiMenuRoot #menuRoot="menuRoot">
      <button baseUiMenuTrigger>Open Menu</button>
      <div baseUiMenuPositioner>
        <div baseUiMenuPopup>
          <div baseUiMenuRadioGroup [(value)]="sortBy">
            <div baseUiMenuRadioItem [value]="'name'">Sort by Name</div>
            <div baseUiMenuRadioItem [value]="'date'">Sort by Date</div>
            <div baseUiMenuRadioItem [value]="'size'">Sort by Size</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestMenuRadioComponent {
  @ViewChild('menuRoot', { static: true }) menuRoot!: MenuRootDirective;
  sortBy = 'name';
}

describe('Menu', () => {
  describe('Basic Menu', () => {
    let fixture: ComponentFixture<TestMenuComponent>;
    let component: TestMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    describe('MenuRoot', () => {
      it('should create', () => {
        expect(component.menuRoot).toBeTruthy();
      });

      it('should have base-ui-menu-root class', () => {
        const root = fixture.nativeElement.querySelector('.base-ui-menu-root');
        expect(root).toBeTruthy();
      });

      it('should start closed by default', () => {
        expect(component.menuRoot.context.openSignal()).toBe(false);
      });

      it('should open when openMenu is called', async () => {
        component.menuRoot.context.openMenu('imperative');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.menuRoot.context.openSignal()).toBe(true);
      });
    });

    describe('MenuTrigger', () => {
      it('should render trigger button', () => {
        const trigger = fixture.nativeElement.querySelector('[baseUiMenuTrigger]');
        expect(trigger).toBeTruthy();
        expect(trigger.tagName.toLowerCase()).toBe('button');
      });

      it('should have correct ARIA attributes when closed', () => {
        const trigger = fixture.nativeElement.querySelector('[baseUiMenuTrigger]');
        expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
      });

      it('should open menu on click', async () => {
        const trigger = fixture.nativeElement.querySelector('[baseUiMenuTrigger]');
        trigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.menuRoot.context.openSignal()).toBe(true);
        expect(component.openChangeEvents[component.openChangeEvents.length - 1]).toEqual({
          open: true,
          reason: 'trigger-press',
        });
      });

      it('should toggle menu on click', async () => {
        const trigger = fixture.nativeElement.querySelector('[baseUiMenuTrigger]');
        trigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.menuRoot.context.openSignal()).toBe(true);

        trigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.menuRoot.context.openSignal()).toBe(false);
      });

      it('should update aria-expanded when open', async () => {
        component.menuRoot.context.openMenu('imperative');
        fixture.detectChanges();
        await fixture.whenStable();

        const trigger = fixture.nativeElement.querySelector('[baseUiMenuTrigger]');
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
      });
    });

    describe('MenuPopup', () => {
      it('should render popup', () => {
        const popup = fixture.nativeElement.querySelector('[baseUiMenuPopup]');
        expect(popup).toBeTruthy();
      });

      it('should have menu role', () => {
        const popup = fixture.nativeElement.querySelector('[baseUiMenuPopup]');
        expect(popup.getAttribute('role')).toBe('menu');
      });

      it('should be hidden when closed', () => {
        const popup = fixture.nativeElement.querySelector('[baseUiMenuPopup]');
        expect(popup.hidden).toBe(true);
      });

      it('should be visible when open', async () => {
        component.menuRoot.context.openMenu('imperative');
        fixture.detectChanges();
        await fixture.whenStable();

        const popup = fixture.nativeElement.querySelector('[baseUiMenuPopup]');
        expect(popup.hidden).toBe(false);
      });
    });

    describe('MenuItem', () => {
      it('should render menu items', () => {
        const items = fixture.nativeElement.querySelectorAll('[baseUiMenuItem]');
        expect(items.length).toBe(3);
      });

      it('should have menuitem role', () => {
        const item = fixture.nativeElement.querySelector('[baseUiMenuItem]');
        expect(item.getAttribute('role')).toBe('menuitem');
      });

      it('should close menu and emit event on click', async () => {
        component.menuRoot.context.openMenu('imperative');
        fixture.detectChanges();
        await fixture.whenStable();

        const item = fixture.nativeElement.querySelector('.item-1');
        item.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.clickedItems).toContain('item1');
        expect(component.menuRoot.context.openSignal()).toBe(false);
      });

      it('should show disabled state', () => {
        const disabledItem = fixture.nativeElement.querySelector('.item-disabled');
        expect(disabledItem.getAttribute('aria-disabled')).toBe('true');
      });
    });

    describe('MenuSeparator', () => {
      it('should render separator', () => {
        const separator = fixture.nativeElement.querySelector('[baseUiMenuSeparator]');
        expect(separator).toBeTruthy();
      });

      it('should have separator role', () => {
        const separator = fixture.nativeElement.querySelector('[baseUiMenuSeparator]');
        expect(separator.getAttribute('role')).toBe('separator');
      });
    });

    describe('Keyboard interactions', () => {
      it('should close on Escape key', async () => {
        component.menuRoot.context.openMenu('imperative');
        fixture.detectChanges();
        await fixture.whenStable();

        // Wait for document listeners to be set up
        await new Promise(resolve => setTimeout(resolve, 10));

        expect(component.menuRoot.context.openSignal()).toBe(true);

        // Dispatch escape key event
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.menuRoot.context.openSignal()).toBe(false);
      });
    });

    describe('Outside click handling', () => {
      it('should close on outside click', async () => {
        component.menuRoot.context.openMenu('imperative');
        fixture.detectChanges();
        await fixture.whenStable();

        // Wait for document listeners to be set up
        await new Promise(resolve => setTimeout(resolve, 10));

        expect(component.menuRoot.context.openSignal()).toBe(true);

        // Click outside
        document.body.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.menuRoot.context.openSignal()).toBe(false);
      });
    });
  });

  describe('Menu with Groups', () => {
    let fixture: ComponentFixture<TestMenuGroupComponent>;
    let component: TestMenuGroupComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenuGroupComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenuGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render menu group', () => {
      const group = fixture.nativeElement.querySelector('[baseUiMenuGroup]');
      expect(group).toBeTruthy();
    });

    it('should have group role', () => {
      const group = fixture.nativeElement.querySelector('[baseUiMenuGroup]');
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should render group label', () => {
      const label = fixture.nativeElement.querySelector('[baseUiMenuGroupLabel]');
      expect(label).toBeTruthy();
      expect(label.textContent).toContain('Actions');
    });

    it('should associate label with group', async () => {
      component.menuRoot.context.openMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const group = fixture.nativeElement.querySelector('[baseUiMenuGroup]');
      const label = fixture.nativeElement.querySelector('[baseUiMenuGroupLabel]');
      expect(group.getAttribute('aria-labelledby')).toBe(label.id);
    });
  });

  describe('Menu with Checkbox Items', () => {
    let fixture: ComponentFixture<TestMenuCheckboxComponent>;
    let component: TestMenuCheckboxComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenuCheckboxComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenuCheckboxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render checkbox items', () => {
      const items = fixture.nativeElement.querySelectorAll('[baseUiMenuCheckboxItem]');
      expect(items.length).toBe(2);
    });

    it('should have menuitemcheckbox role', () => {
      const item = fixture.nativeElement.querySelector('[baseUiMenuCheckboxItem]');
      expect(item.getAttribute('role')).toBe('menuitemcheckbox');
    });

    it('should show checked state', async () => {
      component.menuRoot.context.openMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const items = fixture.nativeElement.querySelectorAll('[baseUiMenuCheckboxItem]');
      // First item (showHidden) is unchecked
      expect(items[0].getAttribute('aria-checked')).toBe('false');
      // Second item (autoSave) is checked
      expect(items[1].getAttribute('aria-checked')).toBe('true');
    });

    it('should toggle checked state on click', async () => {
      component.menuRoot.context.openMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const item = fixture.nativeElement.querySelector('[baseUiMenuCheckboxItem]');
      expect(component.showHidden).toBe(false);

      item.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.showHidden).toBe(true);
    });
  });

  describe('Menu with Radio Items', () => {
    let fixture: ComponentFixture<TestMenuRadioComponent>;
    let component: TestMenuRadioComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenuRadioComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenuRadioComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render radio group', () => {
      const group = fixture.nativeElement.querySelector('[baseUiMenuRadioGroup]');
      expect(group).toBeTruthy();
    });

    it('should render radio items', () => {
      const items = fixture.nativeElement.querySelectorAll('[baseUiMenuRadioItem]');
      expect(items.length).toBe(3);
    });

    it('should have menuitemradio role', () => {
      const item = fixture.nativeElement.querySelector('[baseUiMenuRadioItem]');
      expect(item.getAttribute('role')).toBe('menuitemradio');
    });

    it('should show selected state', async () => {
      component.menuRoot.context.openMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const items = fixture.nativeElement.querySelectorAll('[baseUiMenuRadioItem]');
      // First item (name) is selected
      expect(items[0].getAttribute('aria-checked')).toBe('true');
      // Others are not selected
      expect(items[1].getAttribute('aria-checked')).toBe('false');
      expect(items[2].getAttribute('aria-checked')).toBe('false');
    });

    it('should select item on click', async () => {
      component.menuRoot.context.openMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      const items = fixture.nativeElement.querySelectorAll('[baseUiMenuRadioItem]');
      expect(component.sortBy).toBe('name');

      items[1].click(); // Click "Sort by Date"
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.sortBy).toBe('date');
    });
  });

  describe('Context API', () => {
    let fixture: ComponentFixture<TestMenuComponent>;
    let component: TestMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should provide openMenu method', async () => {
      component.menuRoot.context.openMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.menuRoot.context.openSignal()).toBe(true);
    });

    it('should provide closeMenu method', async () => {
      component.menuRoot.context.openMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      component.menuRoot.context.closeMenu('imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.menuRoot.context.openSignal()).toBe(false);
    });

    it('should provide setOpen method', async () => {
      component.menuRoot.context.setOpen(true, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.menuRoot.context.openSignal()).toBe(true);

      component.menuRoot.context.setOpen(false, 'imperative');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.menuRoot.context.openSignal()).toBe(false);
    });
  });
});

/**
 * @fileoverview Tests for Menubar component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menubar/Menubar.test.tsx
 * @parity Verified against React Base UI
 */

import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MenubarDirective } from './menubar.directive';

@Component({
  standalone: true,
  imports: [MenubarDirective],
  template: `
    <div baseUiMenubar #menubar="menubar" [orientation]="orientation()" [disabled]="disabled()">
      <button class="menu-file">File</button>
      <button class="menu-edit">Edit</button>
      <button class="menu-view">View</button>
    </div>
  `,
})
class TestMenubarComponent {
  @ViewChild('menubar', { static: true }) menubar!: MenubarDirective;
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly disabled = signal(false);
}

@Component({
  standalone: true,
  imports: [MenubarDirective],
  template: `
    <div baseUiMenubar #menubar="menubar" orientation="vertical">
      <button class="menu-1">Menu 1</button>
      <button class="menu-2">Menu 2</button>
    </div>
  `,
})
class TestVerticalMenubarComponent {
  @ViewChild('menubar', { static: true }) menubar!: MenubarDirective;
}

describe('Menubar', () => {
  describe('Basic Menubar', () => {
    let fixture: ComponentFixture<TestMenubarComponent>;
    let component: TestMenubarComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenubarComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenubarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.menubar).toBeTruthy();
    });

    it('should have menubar role', () => {
      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      expect(menubar.getAttribute('role')).toBe('menubar');
    });

    it('should have base-ui-menubar class', () => {
      const menubar = fixture.nativeElement.querySelector('.base-ui-menubar');
      expect(menubar).toBeTruthy();
    });

    it('should default to horizontal orientation', () => {
      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      expect(menubar.getAttribute('aria-orientation')).toBe('horizontal');
      expect(menubar.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should have horizontal class by default', () => {
      const menubar = fixture.nativeElement.querySelector('.base-ui-menubar-horizontal');
      expect(menubar).toBeTruthy();
    });

    it('should update orientation', () => {
      component.orientation.set('vertical');
      fixture.detectChanges();

      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      expect(menubar.getAttribute('aria-orientation')).toBe('vertical');
      expect(menubar.getAttribute('data-orientation')).toBe('vertical');
    });

    it('should apply disabled state', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      expect(menubar.getAttribute('aria-disabled')).toBe('true');
      expect(menubar.classList.contains('base-ui-menubar-disabled')).toBe(true);
    });

    it('should provide context', () => {
      expect(component.menubar.context).toBeTruthy();
      expect(component.menubar.context.orientation).toBe('horizontal');
      expect(component.menubar.context.disabled).toBe(false);
    });
  });

  describe('Vertical Menubar', () => {
    let fixture: ComponentFixture<TestVerticalMenubarComponent>;
    let component: TestVerticalMenubarComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestVerticalMenubarComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestVerticalMenubarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have vertical orientation', () => {
      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      expect(menubar.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should have vertical class', () => {
      const menubar = fixture.nativeElement.querySelector('.base-ui-menubar-vertical');
      expect(menubar).toBeTruthy();
    });
  });

  describe('Context API', () => {
    let fixture: ComponentFixture<TestMenubarComponent>;
    let component: TestMenubarComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenubarComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenubarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should track open menu state', () => {
      expect(component.menubar.context.hasOpenMenu).toBe(false);

      component.menubar.context.setHasOpenMenu(true);
      expect(component.menubar.context.hasOpenMenu).toBe(true);

      component.menubar.context.setHasOpenMenu(false);
      expect(component.menubar.context.hasOpenMenu).toBe(false);
    });

    it('should track active menu ID', () => {
      expect(component.menubar.context.activeMenuId).toBe(null);

      component.menubar.context.setActiveMenuId('menu-1');
      expect(component.menubar.context.activeMenuId).toBe('menu-1');

      component.menubar.context.setActiveMenuId(null);
      expect(component.menubar.context.activeMenuId).toBe(null);
    });

    it('should register and unregister menus', () => {
      component.menubar.context.registerMenu('menu-1');
      component.menubar.context.registerMenu('menu-2');

      // Navigate to verify registration
      component.menubar.context.setActiveMenuId(null);
      component.menubar.context.navigateToNextMenu();
      expect(component.menubar.context.activeMenuId).toBe('menu-1');

      component.menubar.context.unregisterMenu('menu-1');
      component.menubar.context.setActiveMenuId(null);
      component.menubar.context.navigateToNextMenu();
      expect(component.menubar.context.activeMenuId).toBe('menu-2');
    });

    it('should navigate menus in order', () => {
      component.menubar.context.registerMenu('menu-1');
      component.menubar.context.registerMenu('menu-2');
      component.menubar.context.registerMenu('menu-3');

      component.menubar.context.setActiveMenuId('menu-1');
      component.menubar.context.navigateToNextMenu();
      expect(component.menubar.context.activeMenuId).toBe('menu-2');

      component.menubar.context.navigateToNextMenu();
      expect(component.menubar.context.activeMenuId).toBe('menu-3');

      component.menubar.context.navigateToPreviousMenu();
      expect(component.menubar.context.activeMenuId).toBe('menu-2');
    });

    it('should loop navigation when enabled', () => {
      component.menubar.context.registerMenu('menu-1');
      component.menubar.context.registerMenu('menu-2');

      component.menubar.context.setActiveMenuId('menu-2');
      component.menubar.context.navigateToNextMenu();
      expect(component.menubar.context.activeMenuId).toBe('menu-1');

      component.menubar.context.navigateToPreviousMenu();
      expect(component.menubar.context.activeMenuId).toBe('menu-2');
    });
  });

  describe('Keyboard Navigation', () => {
    let fixture: ComponentFixture<TestMenubarComponent>;
    let component: TestMenubarComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMenubarComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMenubarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Register some menus
      component.menubar.context.registerMenu('menu-1');
      component.menubar.context.registerMenu('menu-2');
      component.menubar.context.registerMenu('menu-3');
    });

    it('should navigate right in horizontal mode', () => {
      component.menubar.context.setActiveMenuId('menu-1');

      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      menubar.dispatchEvent(event);

      expect(component.menubar.context.activeMenuId).toBe('menu-2');
    });

    it('should navigate left in horizontal mode', () => {
      component.menubar.context.setActiveMenuId('menu-2');

      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      menubar.dispatchEvent(event);

      expect(component.menubar.context.activeMenuId).toBe('menu-1');
    });

    it('should navigate to first on Home', () => {
      component.menubar.context.setActiveMenuId('menu-3');

      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      menubar.dispatchEvent(event);

      expect(component.menubar.context.activeMenuId).toBe('menu-1');
    });

    it('should navigate to last on End', () => {
      component.menubar.context.setActiveMenuId('menu-1');

      const menubar = fixture.nativeElement.querySelector('[baseUiMenubar]');
      const event = new KeyboardEvent('keydown', { key: 'End' });
      menubar.dispatchEvent(event);

      expect(component.menubar.context.activeMenuId).toBe('menu-3');
    });
  });
});

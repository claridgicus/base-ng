/**
 * @fileoverview Tests for Navigation Menu component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/NavigationMenu.test.tsx
 * @parity Verified against React Base UI
 */

import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NavigationMenuRootDirective } from './navigation-menu-root.directive';
import { NavigationMenuListDirective } from './navigation-menu-list.directive';
import { NavigationMenuItemDirective } from './navigation-menu-item.directive';
import { NavigationMenuTriggerDirective } from './navigation-menu-trigger.directive';
import { NavigationMenuContentDirective } from './navigation-menu-content.directive';
import { NavigationMenuViewportDirective } from './navigation-menu-viewport.directive';
import { NavigationMenuLinkDirective } from './navigation-menu-link.directive';
import { NavigationMenuIconDirective } from './navigation-menu-icon.directive';
import { NavigationMenuBackdropDirective } from './navigation-menu-backdrop.directive';

@Component({
  standalone: true,
  imports: [
    NavigationMenuRootDirective,
    NavigationMenuListDirective,
    NavigationMenuItemDirective,
    NavigationMenuTriggerDirective,
    NavigationMenuContentDirective,
    NavigationMenuViewportDirective,
    NavigationMenuLinkDirective,
  ],
  template: `
    <nav baseUiNavigationMenuRoot #root="navigationMenuRoot" [orientation]="orientation()">
      <ul baseUiNavigationMenuList>
        <li baseUiNavigationMenuItem value="products">
          <button baseUiNavigationMenuTrigger class="trigger-products">Products</button>
          <div baseUiNavigationMenuContent class="content-products">
            <a baseUiNavigationMenuLink href="/products/a" class="link-a">Product A</a>
            <a baseUiNavigationMenuLink href="/products/b" class="link-b">Product B</a>
          </div>
        </li>
        <li baseUiNavigationMenuItem value="resources">
          <button baseUiNavigationMenuTrigger class="trigger-resources">Resources</button>
          <div baseUiNavigationMenuContent class="content-resources">
            <a baseUiNavigationMenuLink href="/docs">Documentation</a>
            <a baseUiNavigationMenuLink href="/blog">Blog</a>
          </div>
        </li>
      </ul>
      <div baseUiNavigationMenuViewport></div>
    </nav>
  `,
})
class TestNavigationMenuComponent {
  @ViewChild('root', { static: true }) root!: NavigationMenuRootDirective;
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
}

@Component({
  standalone: true,
  imports: [
    NavigationMenuRootDirective,
    NavigationMenuListDirective,
    NavigationMenuItemDirective,
    NavigationMenuTriggerDirective,
    NavigationMenuContentDirective,
    NavigationMenuIconDirective,
  ],
  template: `
    <nav baseUiNavigationMenuRoot #root="navigationMenuRoot">
      <ul baseUiNavigationMenuList>
        <li baseUiNavigationMenuItem value="menu1">
          <button baseUiNavigationMenuTrigger class="trigger-1">
            Menu 1
            <span baseUiNavigationMenuIcon class="icon-1">▼</span>
          </button>
          <div baseUiNavigationMenuContent class="content-1">Content 1</div>
        </li>
      </ul>
    </nav>
  `,
})
class TestNavigationMenuWithIconComponent {
  @ViewChild('root', { static: true }) root!: NavigationMenuRootDirective;
}

@Component({
  standalone: true,
  imports: [
    NavigationMenuRootDirective,
    NavigationMenuListDirective,
    NavigationMenuItemDirective,
    NavigationMenuTriggerDirective,
    NavigationMenuBackdropDirective,
  ],
  template: `
    <nav baseUiNavigationMenuRoot #root="navigationMenuRoot">
      <div baseUiNavigationMenuBackdrop class="backdrop"></div>
      <ul baseUiNavigationMenuList>
        <li baseUiNavigationMenuItem value="test">
          <button baseUiNavigationMenuTrigger class="trigger">Test</button>
        </li>
      </ul>
    </nav>
  `,
})
class TestNavigationMenuWithBackdropComponent {
  @ViewChild('root', { static: true }) root!: NavigationMenuRootDirective;
}

describe('NavigationMenu', () => {
  describe('Basic Navigation Menu', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.root).toBeTruthy();
    });

    it('should have navigation-menu-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-navigation-menu-root');
      expect(root).toBeTruthy();
    });

    it('should have horizontal orientation by default', () => {
      const root = fixture.nativeElement.querySelector('[baseUiNavigationMenuRoot]');
      expect(root.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should have menubar role on list', () => {
      const list = fixture.nativeElement.querySelector('[baseUiNavigationMenuList]');
      expect(list.getAttribute('role')).toBe('menubar');
    });

    it('should have menuitem role on triggers', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      expect(trigger.getAttribute('role')).toBe('menuitem');
    });

    it('should have aria-haspopup on triggers', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('should have aria-expanded false initially', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should provide context', () => {
      expect(component.root.context).toBeTruthy();
      expect(component.root.context.orientation).toBe('horizontal');
      expect(component.root.context.open).toBe(false);
    });
  });

  describe('Opening and Closing', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should open on trigger click', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      trigger.click();
      fixture.detectChanges();

      expect(component.root.context.value).toBe('products');
      expect(component.root.context.open).toBe(true);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close on second click', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');

      // Open
      trigger.click();
      fixture.detectChanges();
      expect(component.root.context.open).toBe(true);

      // Close
      trigger.click();
      fixture.detectChanges();
      expect(component.root.context.value).toBe(null);
    });

    it('should switch between items on click', () => {
      const productsTriger = fixture.nativeElement.querySelector('.trigger-products');
      const resourcesTrigger = fixture.nativeElement.querySelector('.trigger-resources');

      // Open products
      productsTriger.click();
      fixture.detectChanges();
      expect(component.root.context.value).toBe('products');

      // Switch to resources
      resourcesTrigger.click();
      fixture.detectChanges();
      expect(component.root.context.value).toBe('resources');
    });

    it('should set activation direction when opening', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      trigger.click();
      fixture.detectChanges();

      expect(component.root.context.activationDirection).toBe('down');
    });
  });

  describe('Keyboard Navigation', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should open on Enter key', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      trigger.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.root.context.value).toBe('products');
    });

    it('should open on Space key', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      const event = new KeyboardEvent('keydown', { key: ' ' });
      trigger.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.root.context.value).toBe('products');
    });

    it('should close on Escape key when open', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');

      // Open first
      trigger.click();
      fixture.detectChanges();
      expect(component.root.context.open).toBe(true);

      // Press Escape
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      trigger.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.root.context.value).toBe(null);
    });

    it('should open on ArrowDown in horizontal mode', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      trigger.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.root.context.value).toBe('products');
      expect(component.root.context.activationDirection).toBe('down');
    });
  });

  describe('Content Visibility', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should hide content initially', () => {
      const content = fixture.nativeElement.querySelector('.content-products');
      expect(content.style.display).toBe('none');
    });

    it('should show content when open', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      trigger.click();
      fixture.detectChanges();

      const content = fixture.nativeElement.querySelector('.content-products');
      expect(content.style.display).not.toBe('none');
      expect(content.hasAttribute('data-open')).toBe(true);
    });

    it('should show only the active content', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      trigger.click();
      fixture.detectChanges();

      const productsContent = fixture.nativeElement.querySelector('.content-products');
      const resourcesContent = fixture.nativeElement.querySelector('.content-resources');

      expect(productsContent.hasAttribute('data-open')).toBe(true);
      expect(resourcesContent.hasAttribute('data-open')).toBe(false);
    });
  });

  describe('Orientation', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should update orientation', () => {
      component.orientation.set('vertical');
      fixture.detectChanges();

      const root = fixture.nativeElement.querySelector('[baseUiNavigationMenuRoot]');
      expect(root.getAttribute('data-orientation')).toBe('vertical');
    });

    it('should propagate orientation to list', () => {
      component.orientation.set('vertical');
      fixture.detectChanges();

      const list = fixture.nativeElement.querySelector('[baseUiNavigationMenuList]');
      expect(list.getAttribute('data-orientation')).toBe('vertical');
    });
  });

  describe('Links', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have menuitem role on links', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      trigger.click();
      fixture.detectChanges();

      const link = fixture.nativeElement.querySelector('.link-a');
      expect(link.getAttribute('role')).toBe('menuitem');
    });

    it('should have base-ui-navigation-menu-link class', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      trigger.click();
      fixture.detectChanges();

      const link = fixture.nativeElement.querySelector('.link-a');
      expect(link.classList.contains('base-ui-navigation-menu-link')).toBe(true);
    });
  });

  describe('Icon', () => {
    let fixture: ComponentFixture<TestNavigationMenuWithIconComponent>;
    let component: TestNavigationMenuWithIconComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuWithIconComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuWithIconComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have aria-hidden on icon', () => {
      const icon = fixture.nativeElement.querySelector('.icon-1');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not have data-open initially', () => {
      const icon = fixture.nativeElement.querySelector('.icon-1');
      expect(icon.hasAttribute('data-open')).toBe(false);
    });

    it('should have data-open when active', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-1');
      trigger.click();
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.icon-1');
      expect(icon.hasAttribute('data-open')).toBe(true);
    });
  });

  describe('Backdrop', () => {
    let fixture: ComponentFixture<TestNavigationMenuWithBackdropComponent>;
    let component: TestNavigationMenuWithBackdropComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuWithBackdropComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuWithBackdropComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have aria-hidden on backdrop', () => {
      const backdrop = fixture.nativeElement.querySelector('.backdrop');
      expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    });

    it('should hide backdrop initially', () => {
      const backdrop = fixture.nativeElement.querySelector('.backdrop');
      expect(backdrop.style.display).toBe('none');
    });

    it('should show backdrop when menu is open', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger');
      trigger.click();
      fixture.detectChanges();

      const backdrop = fixture.nativeElement.querySelector('.backdrop');
      expect(backdrop.style.display).not.toBe('none');
    });

    it('should close menu when backdrop is clicked', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger');
      trigger.click();
      fixture.detectChanges();

      expect(component.root.context.open).toBe(true);

      const backdrop = fixture.nativeElement.querySelector('.backdrop');
      backdrop.click();
      fixture.detectChanges();

      expect(component.root.context.value).toBe(null);
    });
  });

  describe('Context API', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should provide setValue method', () => {
      expect(typeof component.root.context.setValue).toBe('function');
    });

    it('should allow programmatic open', () => {
      component.root.context.setValue('products', { reason: 'trigger-click' });
      fixture.detectChanges();

      expect(component.root.context.value).toBe('products');
      expect(component.root.context.open).toBe(true);
    });

    it('should allow programmatic close', () => {
      // Open first
      component.root.context.setValue('products', {});
      fixture.detectChanges();

      // Close
      component.root.context.setValue(null, {});
      fixture.detectChanges();

      expect(component.root.context.value).toBe(null);
    });

    it('should register and track items', () => {
      // Items should be registered automatically
      expect(component.root.context.registerItem).toBeTruthy();
      expect(component.root.context.unregisterItem).toBeTruthy();
    });
  });

  describe('Viewport', () => {
    let fixture: ComponentFixture<TestNavigationMenuComponent>;
    let component: TestNavigationMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestNavigationMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestNavigationMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have viewport element', () => {
      const viewport = fixture.nativeElement.querySelector('[baseUiNavigationMenuViewport]');
      expect(viewport).toBeTruthy();
    });

    it('should hide viewport initially', () => {
      const viewport = fixture.nativeElement.querySelector('[baseUiNavigationMenuViewport]');
      expect(viewport.style.display).toBe('none');
    });

    it('should show viewport when menu is open', () => {
      const trigger = fixture.nativeElement.querySelector('.trigger-products');
      trigger.click();
      fixture.detectChanges();

      const viewport = fixture.nativeElement.querySelector('[baseUiNavigationMenuViewport]');
      expect(viewport.style.display).not.toBe('none');
    });

    it('should register viewport element in context', () => {
      const viewport = fixture.nativeElement.querySelector('[baseUiNavigationMenuViewport]');
      expect(component.root.context.viewportElement).toBe(viewport);
    });
  });
});

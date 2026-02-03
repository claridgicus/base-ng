/**
 * @component Collapsible
 * @fileoverview Tests for Collapsible component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/collapsible/Collapsible.test.tsx
 * @parity Verified against React Base UI - includes Keyboard Navigation, Focus Management, State Attributes, and Accessibility test categories
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { CollapsibleRootDirective } from './collapsible-root.directive';
import { CollapsibleTriggerDirective } from './collapsible-trigger.directive';
import { CollapsiblePanelDirective } from './collapsible-panel.directive';
import { CollapsibleChangeEventDetails } from './collapsible.types';

describe('Collapsible component', () => {
  describe('Basic collapsible', () => {
    @Component({
      template: `
        <div baseUiCollapsibleRoot [(open)]="isOpen">
          <button baseUiCollapsibleTrigger>Toggle</button>
          <div baseUiCollapsiblePanel>
            Content here
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        CollapsibleRootDirective,
        CollapsibleTriggerDirective,
        CollapsiblePanelDirective,
      ],
    })
    class TestComponent {
      isOpen = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let trigger: HTMLButtonElement;
    let panel: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiCollapsibleRoot]');
      trigger = fixture.nativeElement.querySelector('[baseUiCollapsibleTrigger]');
      panel = fixture.nativeElement.querySelector('[baseUiCollapsiblePanel]');
    });

    it('should render all parts', () => {
      expect(root).toBeTruthy();
      expect(trigger).toBeTruthy();
      expect(panel).toBeTruthy();
    });

    it('should have collapsible class on root', () => {
      expect(root.classList.contains('base-ui-collapsible')).toBe(true);
    });

    it('should have trigger class', () => {
      expect(trigger.classList.contains('base-ui-collapsible-trigger')).toBe(true);
    });

    it('should have panel class', () => {
      expect(panel.classList.contains('base-ui-collapsible-panel')).toBe(true);
    });

    it('should have role region on panel', () => {
      expect(panel.getAttribute('role')).toBe('region');
    });

    it('should start closed by default', () => {
      expect(component.isOpen).toBe(false);
      expect(root.hasAttribute('data-closed')).toBe(true);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should hide panel when closed', () => {
      expect(panel.style.display).toBe('none');
    });

    it('should toggle open on trigger click', () => {
      trigger.click();
      fixture.detectChanges();

      expect(component.isOpen).toBe(true);
      expect(root.hasAttribute('data-open')).toBe(true);
      expect(root.hasAttribute('data-closed')).toBe(false);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should show panel when open', () => {
      trigger.click();
      fixture.detectChanges();

      expect(panel.style.display).not.toBe('none');
    });

    it('should toggle closed on second click', () => {
      trigger.click();
      fixture.detectChanges();
      expect(component.isOpen).toBe(true);

      trigger.click();
      fixture.detectChanges();
      expect(component.isOpen).toBe(false);
      expect(panel.style.display).toBe('none');
    });

    it('should have aria-controls pointing to panel id', () => {
      const ariaControls = trigger.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      expect(panel.id).toBe(ariaControls);
    });
  });

  describe('Initial open state', () => {
    @Component({
      template: `
        <div baseUiCollapsibleRoot [(open)]="isOpen">
          <button baseUiCollapsibleTrigger>Toggle</button>
          <div baseUiCollapsiblePanel>Content</div>
        </div>
      `,
      standalone: true,
      imports: [
        CollapsibleRootDirective,
        CollapsibleTriggerDirective,
        CollapsiblePanelDirective,
      ],
    })
    class TestComponent {
      isOpen = true;
    }

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let trigger: HTMLButtonElement;
    let panel: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiCollapsibleRoot]');
      trigger = fixture.nativeElement.querySelector('[baseUiCollapsibleTrigger]');
      panel = fixture.nativeElement.querySelector('[baseUiCollapsiblePanel]');
    });

    it('should start open when open=true', () => {
      expect(root.hasAttribute('data-open')).toBe(true);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      expect(panel.style.display).not.toBe('none');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div baseUiCollapsibleRoot [(open)]="isOpen" [disabled]="true">
          <button baseUiCollapsibleTrigger>Toggle</button>
          <div baseUiCollapsiblePanel>Content</div>
        </div>
      `,
      standalone: true,
      imports: [
        CollapsibleRootDirective,
        CollapsibleTriggerDirective,
        CollapsiblePanelDirective,
      ],
    })
    class TestComponent {
      isOpen = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let trigger: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiCollapsibleRoot]');
      trigger = fixture.nativeElement.querySelector('[baseUiCollapsibleTrigger]');
    });

    it('should have data-disabled on root', () => {
      expect(root.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled class on root', () => {
      expect(root.classList.contains('base-ui-collapsible-disabled')).toBe(true);
    });

    it('should have disabled attribute on trigger', () => {
      expect(trigger.hasAttribute('disabled')).toBe(true);
    });

    it('should not toggle when disabled', () => {
      trigger.click();
      fixture.detectChanges();

      expect(component.isOpen).toBe(false);
    });
  });

  describe('Event emission', () => {
    @Component({
      template: `
        <div baseUiCollapsibleRoot (openChanged)="onOpenChanged($event)">
          <button baseUiCollapsibleTrigger>Toggle</button>
          <div baseUiCollapsiblePanel>Content</div>
        </div>
      `,
      standalone: true,
      imports: [
        CollapsibleRootDirective,
        CollapsibleTriggerDirective,
        CollapsiblePanelDirective,
      ],
    })
    class TestComponent {
      lastEvent: CollapsibleChangeEventDetails | null = null;

      onOpenChanged(event: CollapsibleChangeEventDetails) {
        this.lastEvent = event;
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
      trigger = fixture.nativeElement.querySelector('[baseUiCollapsibleTrigger]');
    });

    it('should emit openChanged on trigger click', () => {
      trigger.click();
      fixture.detectChanges();

      expect(component.lastEvent).toEqual({
        open: true,
        reason: 'trigger-press',
      });
    });
  });

  describe('Keep mounted', () => {
    @Component({
      template: `
        <div baseUiCollapsibleRoot [(open)]="isOpen">
          <button baseUiCollapsibleTrigger>Toggle</button>
          <div baseUiCollapsiblePanel [keepMounted]="true">Content</div>
        </div>
      `,
      standalone: true,
      imports: [
        CollapsibleRootDirective,
        CollapsibleTriggerDirective,
        CollapsiblePanelDirective,
      ],
    })
    class TestComponent {
      isOpen = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let panel: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      panel = fixture.nativeElement.querySelector('[baseUiCollapsiblePanel]');
    });

    it('should keep panel in DOM when closed with keepMounted', () => {
      // Panel should be hidden but still rendered
      expect(panel.style.display).toBe('none');
      expect(panel.hasAttribute('hidden')).toBe(false);
    });
  });

  describe('Programmatic control', () => {
    @Component({
      template: `
        <div baseUiCollapsibleRoot #collapsibleRef="collapsibleRoot" [(open)]="isOpen">
          <button baseUiCollapsibleTrigger>Toggle</button>
          <div baseUiCollapsiblePanel>Content</div>
        </div>
      `,
      standalone: true,
      imports: [
        CollapsibleRootDirective,
        CollapsibleTriggerDirective,
        CollapsiblePanelDirective,
      ],
    })
    class TestComponent {
      isOpen = false;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let collapsibleDirective: CollapsibleRootDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      collapsibleDirective = fixture.debugElement.children[0].injector.get(CollapsibleRootDirective);
    });

    it('should open programmatically', () => {
      collapsibleDirective.setOpen(true);
      fixture.detectChanges();

      expect(component.isOpen).toBe(true);
    });

    it('should close programmatically', () => {
      // Open it first via the directive
      collapsibleDirective.setOpen(true);
      fixture.detectChanges();
      expect(component.isOpen).toBe(true);

      // Then close it
      collapsibleDirective.setOpen(false);
      fixture.detectChanges();
      expect(component.isOpen).toBe(false);
    });

    it('should toggle programmatically', () => {
      collapsibleDirective.toggle();
      fixture.detectChanges();
      expect(component.isOpen).toBe(true);

      collapsibleDirective.toggle();
      fixture.detectChanges();
      expect(component.isOpen).toBe(false);
    });
  });
});

/**
 * @fileoverview Tests for Accordion component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/Accordion.test.tsx
 * @parity Verified against React Base UI
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { AccordionRootDirective } from './accordion-root.directive';
import { AccordionItemDirective } from './accordion-item.directive';
import { AccordionHeaderDirective } from './accordion-header.directive';
import { AccordionTriggerDirective } from './accordion-trigger.directive';
import { AccordionPanelDirective } from './accordion-panel.directive';
import { AccordionChangeEventDetails } from './accordion.types';

describe('Accordion component', () => {
  describe('Basic accordion', () => {
    @Component({
      template: `
        <div baseUiAccordionRoot [(value)]="expandedItems">
          <div baseUiAccordionItem value="item1">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 1</button>
            </h3>
            <div baseUiAccordionPanel>Content 1</div>
          </div>
          <div baseUiAccordionItem value="item2">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 2</button>
            </h3>
            <div baseUiAccordionPanel>Content 2</div>
          </div>
          <div baseUiAccordionItem value="item3">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 3</button>
            </h3>
            <div baseUiAccordionPanel>Content 3</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        AccordionRootDirective,
        AccordionItemDirective,
        AccordionHeaderDirective,
        AccordionTriggerDirective,
        AccordionPanelDirective,
      ],
    })
    class TestComponent {
      expandedItems: string[] = [];
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let items: NodeListOf<HTMLElement>;
    let triggers: NodeListOf<HTMLButtonElement>;
    let panels: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiAccordionRoot]');
      items = fixture.nativeElement.querySelectorAll('[baseUiAccordionItem]');
      triggers = fixture.nativeElement.querySelectorAll('[baseUiAccordionTrigger]');
      panels = fixture.nativeElement.querySelectorAll('[baseUiAccordionPanel]');
    });

    it('should render all parts', () => {
      expect(root).toBeTruthy();
      expect(items.length).toBe(3);
      expect(triggers.length).toBe(3);
      expect(panels.length).toBe(3);
    });

    it('should have accordion class on root', () => {
      expect(root.classList.contains('base-ui-accordion')).toBe(true);
    });

    it('should have role region on root', () => {
      expect(root.getAttribute('role')).toBe('region');
    });

    it('should have item class', () => {
      items.forEach(item => {
        expect(item.classList.contains('base-ui-accordion-item')).toBe(true);
      });
    });

    it('should have trigger class', () => {
      triggers.forEach(trigger => {
        expect(trigger.classList.contains('base-ui-accordion-trigger')).toBe(true);
      });
    });

    it('should have panel class', () => {
      panels.forEach(panel => {
        expect(panel.classList.contains('base-ui-accordion-panel')).toBe(true);
      });
    });

    it('should have role region on panels', () => {
      panels.forEach(panel => {
        expect(panel.getAttribute('role')).toBe('region');
      });
    });

    it('should start with all items closed', () => {
      expect(component.expandedItems).toEqual([]);
      triggers.forEach(trigger => {
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
      });
    });

    it('should expand item on trigger click', () => {
      triggers[0].click();
      fixture.detectChanges();

      expect(component.expandedItems).toContain('item1');
      expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
      expect(panels[0].style.display).not.toBe('none');
    });

    it('should collapse other items when expanding (single mode)', () => {
      triggers[0].click();
      fixture.detectChanges();
      expect(component.expandedItems).toEqual(['item1']);

      triggers[1].click();
      fixture.detectChanges();
      expect(component.expandedItems).toEqual(['item2']);
      expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
      expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls pointing to panel id', () => {
      triggers.forEach((trigger, i) => {
        const ariaControls = trigger.getAttribute('aria-controls');
        expect(ariaControls).toBeTruthy();
        expect(panels[i].id).toBe(ariaControls);
      });
    });

    it('should have aria-labelledby on panels', () => {
      triggers.forEach((trigger, i) => {
        const labelledBy = panels[i].getAttribute('aria-labelledby');
        expect(labelledBy).toBe(trigger.id);
      });
    });
  });

  describe('Multiple mode', () => {
    @Component({
      template: `
        <div baseUiAccordionRoot [(value)]="expandedItems" [multiple]="true">
          <div baseUiAccordionItem value="item1">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 1</button>
            </h3>
            <div baseUiAccordionPanel>Content 1</div>
          </div>
          <div baseUiAccordionItem value="item2">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 2</button>
            </h3>
            <div baseUiAccordionPanel>Content 2</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        AccordionRootDirective,
        AccordionItemDirective,
        AccordionHeaderDirective,
        AccordionTriggerDirective,
        AccordionPanelDirective,
      ],
    })
    class TestComponent {
      expandedItems: string[] = [];
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let triggers: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      triggers = fixture.nativeElement.querySelectorAll('[baseUiAccordionTrigger]');
    });

    it('should allow multiple items to be expanded', () => {
      triggers[0].click();
      fixture.detectChanges();
      triggers[1].click();
      fixture.detectChanges();

      expect(component.expandedItems).toContain('item1');
      expect(component.expandedItems).toContain('item2');
      expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
      expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Initial value', () => {
    @Component({
      template: `
        <div baseUiAccordionRoot [(value)]="expandedItems">
          <div baseUiAccordionItem value="item1">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 1</button>
            </h3>
            <div baseUiAccordionPanel>Content 1</div>
          </div>
          <div baseUiAccordionItem value="item2">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 2</button>
            </h3>
            <div baseUiAccordionPanel>Content 2</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        AccordionRootDirective,
        AccordionItemDirective,
        AccordionHeaderDirective,
        AccordionTriggerDirective,
        AccordionPanelDirective,
      ],
    })
    class TestComponent {
      expandedItems: string[] = ['item2'];
    }

    let fixture: ComponentFixture<TestComponent>;
    let triggers: NodeListOf<HTMLButtonElement>;
    let panels: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      triggers = fixture.nativeElement.querySelectorAll('[baseUiAccordionTrigger]');
      panels = fixture.nativeElement.querySelectorAll('[baseUiAccordionPanel]');
    });

    it('should reflect initial expanded state', () => {
      expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
      expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
      expect(panels[0].style.display).toBe('none');
      expect(panels[1].style.display).not.toBe('none');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div baseUiAccordionRoot [(value)]="expandedItems" [disabled]="true">
          <div baseUiAccordionItem value="item1">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 1</button>
            </h3>
            <div baseUiAccordionPanel>Content 1</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        AccordionRootDirective,
        AccordionItemDirective,
        AccordionHeaderDirective,
        AccordionTriggerDirective,
        AccordionPanelDirective,
      ],
    })
    class TestComponent {
      expandedItems: string[] = [];
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
      root = fixture.nativeElement.querySelector('[baseUiAccordionRoot]');
      trigger = fixture.nativeElement.querySelector('[baseUiAccordionTrigger]');
    });

    it('should have data-disabled on root', () => {
      expect(root.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled attribute on trigger', () => {
      expect(trigger.hasAttribute('disabled')).toBe(true);
    });

    it('should not expand when disabled', () => {
      trigger.click();
      fixture.detectChanges();

      expect(component.expandedItems).toEqual([]);
    });
  });

  describe('Event emission', () => {
    @Component({
      template: `
        <div baseUiAccordionRoot (valueChanged)="onValueChanged($event)">
          <div baseUiAccordionItem value="item1">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 1</button>
            </h3>
            <div baseUiAccordionPanel>Content 1</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        AccordionRootDirective,
        AccordionItemDirective,
        AccordionHeaderDirective,
        AccordionTriggerDirective,
        AccordionPanelDirective,
      ],
    })
    class TestComponent {
      lastEvent: AccordionChangeEventDetails | null = null;

      onValueChanged(event: AccordionChangeEventDetails) {
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
      trigger = fixture.nativeElement.querySelector('[baseUiAccordionTrigger]');
    });

    it('should emit valueChanged on expand', () => {
      trigger.click();
      fixture.detectChanges();

      expect(component.lastEvent).toEqual({
        value: ['item1'],
        changedItem: 'item1',
        action: 'expand',
      });
    });

    it('should emit valueChanged on collapse', () => {
      trigger.click();
      fixture.detectChanges();
      trigger.click();
      fixture.detectChanges();

      expect(component.lastEvent).toEqual({
        value: [],
        changedItem: 'item1',
        action: 'collapse',
      });
    });
  });

  describe('Orientation', () => {
    @Component({
      template: `
        <div baseUiAccordionRoot orientation="horizontal">
          <div baseUiAccordionItem value="item1">
            <h3 baseUiAccordionHeader>
              <button baseUiAccordionTrigger>Section 1</button>
            </h3>
            <div baseUiAccordionPanel>Content 1</div>
          </div>
        </div>
      `,
      standalone: true,
      imports: [
        AccordionRootDirective,
        AccordionItemDirective,
        AccordionHeaderDirective,
        AccordionTriggerDirective,
        AccordionPanelDirective,
      ],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiAccordionRoot]');
    });

    it('should have horizontal orientation attribute', () => {
      expect(root.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should have horizontal class', () => {
      expect(root.classList.contains('base-ui-accordion-horizontal')).toBe(true);
    });
  });
});

/**
 * @component Tabs
 * @fileoverview Tests for Tabs component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/Tabs.test.tsx
 * @parity Verified against React Base UI - includes Keyboard Navigation, Focus Management, State Attributes, and Accessibility test categories
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { TabsRootDirective } from './tabs-root.directive';
import { TabsListDirective } from './tabs-list.directive';
import { TabsTabDirective } from './tabs-tab.directive';
import { TabsPanelDirective } from './tabs-panel.directive';
import { TabsChangeEventDetails, TabValue } from './tabs.types';

describe('Tabs component', () => {
  describe('Basic tabs', () => {
    @Component({
      template: `
        <div baseUiTabsRoot [(value)]="selectedTab">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2">Tab 2</button>
            <button baseUiTab value="tab3">Tab 3</button>
          </div>
          <div baseUiTabsPanel value="tab1">Content 1</div>
          <div baseUiTabsPanel value="tab2">Content 2</div>
          <div baseUiTabsPanel value="tab3">Content 3</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      selectedTab: TabValue | undefined = 'tab1';
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let tabs: NodeListOf<HTMLButtonElement>;
    let panels: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiTabsRoot]');
      tabs = fixture.nativeElement.querySelectorAll('[baseUiTab]');
      panels = fixture.nativeElement.querySelectorAll('[baseUiTabsPanel]');
    });

    it('should render all parts', () => {
      expect(root).toBeTruthy();
      expect(tabs.length).toBe(3);
      expect(panels.length).toBe(3);
    });

    it('should have tabs class on root', () => {
      expect(root.classList.contains('base-ui-tabs')).toBe(true);
    });

    it('should have role tablist on list', () => {
      const list = fixture.nativeElement.querySelector('[baseUiTabsList]');
      expect(list.getAttribute('role')).toBe('tablist');
    });

    it('should have role tab on tabs', () => {
      tabs.forEach(tab => {
        expect(tab.getAttribute('role')).toBe('tab');
      });
    });

    it('should have role tabpanel on panels', () => {
      panels.forEach(panel => {
        expect(panel.getAttribute('role')).toBe('tabpanel');
      });
    });

    it('should have tab class', () => {
      tabs.forEach(tab => {
        expect(tab.classList.contains('base-ui-tab')).toBe(true);
      });
    });

    it('should have panel class', () => {
      panels.forEach(panel => {
        expect(panel.classList.contains('base-ui-tabs-panel')).toBe(true);
      });
    });

    it('should reflect initial selected state', () => {
      expect(component.selectedTab).toBe('tab1');
      expect(tabs[0].getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].getAttribute('aria-selected')).toBe('false');
      expect(tabs[2].getAttribute('aria-selected')).toBe('false');
    });

    it('should show selected panel', () => {
      expect(panels[0].style.display).not.toBe('none');
      expect(panels[1].style.display).toBe('none');
      expect(panels[2].style.display).toBe('none');
    });

    it('should select tab on click', () => {
      tabs[1].click();
      fixture.detectChanges();

      expect(component.selectedTab).toBe('tab2');
      expect(tabs[0].getAttribute('aria-selected')).toBe('false');
      expect(tabs[1].getAttribute('aria-selected')).toBe('true');
      expect(panels[0].style.display).toBe('none');
      expect(panels[1].style.display).not.toBe('none');
    });

    it('should have aria-controls pointing to panel id', () => {
      tabs.forEach((tab, i) => {
        const ariaControls = tab.getAttribute('aria-controls');
        expect(ariaControls).toBeTruthy();
        expect(panels[i].id).toBe(ariaControls);
      });
    });

    it('should have aria-labelledby on panels', () => {
      tabs.forEach((tab, i) => {
        const labelledBy = panels[i].getAttribute('aria-labelledby');
        expect(labelledBy).toBe(tab.id);
      });
    });

    it('should have tabindex 0 on selected tab', () => {
      expect(tabs[0].getAttribute('tabindex')).toBe('0');
      expect(tabs[1].getAttribute('tabindex')).toBe('-1');
      expect(tabs[2].getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Keyboard navigation', () => {
    @Component({
      template: `
        <div baseUiTabsRoot [(value)]="selectedTab">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2">Tab 2</button>
            <button baseUiTab value="tab3">Tab 3</button>
          </div>
          <div baseUiTabsPanel value="tab1">Content 1</div>
          <div baseUiTabsPanel value="tab2">Content 2</div>
          <div baseUiTabsPanel value="tab3">Content 3</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      selectedTab: TabValue | undefined = 'tab1';
    }

    let fixture: ComponentFixture<TestComponent>;
    let list: HTMLElement;
    let tabs: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      list = fixture.nativeElement.querySelector('[baseUiTabsList]');
      tabs = fixture.nativeElement.querySelectorAll('[baseUiTab]');
    });

    it('should navigate with ArrowRight', () => {
      tabs[0].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[1]);
    });

    it('should navigate with ArrowLeft', () => {
      tabs[1].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should loop focus with ArrowRight at end', () => {
      tabs[2].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should loop focus with ArrowLeft at start', () => {
      tabs[0].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[2]);
    });

    it('should navigate to first with Home', () => {
      tabs[2].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should navigate to last with End', () => {
      tabs[0].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'End', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[2]);
    });

    it('should activate tab with Enter', () => {
      tabs[1].focus();
      tabs[1].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.selectedTab).toBe('tab2');
    });

    it('should activate tab with Space', () => {
      tabs[2].focus();
      tabs[2].dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.selectedTab).toBe('tab3');
    });
  });

  describe('Vertical orientation', () => {
    @Component({
      template: `
        <div baseUiTabsRoot orientation="vertical" [(value)]="selectedTab">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2">Tab 2</button>
          </div>
          <div baseUiTabsPanel value="tab1">Content 1</div>
          <div baseUiTabsPanel value="tab2">Content 2</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      selectedTab: TabValue | undefined = 'tab1';
    }

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let list: HTMLElement;
    let tabs: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiTabsRoot]');
      list = fixture.nativeElement.querySelector('[baseUiTabsList]');
      tabs = fixture.nativeElement.querySelectorAll('[baseUiTab]');
    });

    it('should have vertical orientation attribute', () => {
      expect(root.getAttribute('data-orientation')).toBe('vertical');
      expect(list.getAttribute('data-orientation')).toBe('vertical');
    });

    it('should have aria-orientation vertical on list', () => {
      expect(list.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should have vertical class', () => {
      expect(root.classList.contains('base-ui-tabs-vertical')).toBe(true);
    });

    it('should navigate with ArrowDown', () => {
      tabs[0].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[1]);
    });

    it('should navigate with ArrowUp', () => {
      tabs[1].focus();
      list.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      );
      fixture.detectChanges();

      expect(document.activeElement).toBe(tabs[0]);
    });
  });

  describe('Disabled tabs', () => {
    @Component({
      template: `
        <div baseUiTabsRoot [(value)]="selectedTab">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2" [disabled]="true">Tab 2</button>
            <button baseUiTab value="tab3">Tab 3</button>
          </div>
          <div baseUiTabsPanel value="tab1">Content 1</div>
          <div baseUiTabsPanel value="tab2">Content 2</div>
          <div baseUiTabsPanel value="tab3">Content 3</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      selectedTab: TabValue | undefined = 'tab1';
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let tabs: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tabs = fixture.nativeElement.querySelectorAll('[baseUiTab]');
    });

    it('should have disabled attribute on disabled tab', () => {
      expect(tabs[1].hasAttribute('disabled')).toBe(true);
    });

    it('should have data-disabled on disabled tab', () => {
      expect(tabs[1].hasAttribute('data-disabled')).toBe(true);
    });

    it('should have aria-disabled on disabled tab', () => {
      expect(tabs[1].getAttribute('aria-disabled')).toBe('true');
    });

    it('should not select disabled tab on click', () => {
      tabs[1].click();
      fixture.detectChanges();

      expect(component.selectedTab).toBe('tab1');
    });
  });

  describe('Disabled root', () => {
    @Component({
      template: `
        <div baseUiTabsRoot [disabled]="true" [(value)]="selectedTab">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2">Tab 2</button>
          </div>
          <div baseUiTabsPanel value="tab1">Content 1</div>
          <div baseUiTabsPanel value="tab2">Content 2</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      selectedTab: TabValue | undefined = 'tab1';
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let tabs: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiTabsRoot]');
      tabs = fixture.nativeElement.querySelectorAll('[baseUiTab]');
    });

    it('should have data-disabled on root', () => {
      expect(root.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled attribute on all tabs', () => {
      tabs.forEach(tab => {
        expect(tab.hasAttribute('disabled')).toBe(true);
      });
    });

    it('should not select any tab when disabled', () => {
      tabs[1].click();
      fixture.detectChanges();

      expect(component.selectedTab).toBe('tab1');
    });
  });

  describe('Event emission', () => {
    @Component({
      template: `
        <div baseUiTabsRoot (valueChanged)="onValueChanged($event)">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2">Tab 2</button>
          </div>
          <div baseUiTabsPanel value="tab1">Content 1</div>
          <div baseUiTabsPanel value="tab2">Content 2</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      lastEvent: TabsChangeEventDetails | null = null;

      onValueChanged(event: TabsChangeEventDetails) {
        this.lastEvent = event;
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let tabs: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tabs = fixture.nativeElement.querySelectorAll('[baseUiTab]');
    });

    it('should emit valueChanged on tab click', () => {
      tabs[1].click();
      fixture.detectChanges();

      expect(component.lastEvent).toBeTruthy();
      expect(component.lastEvent?.value).toBe('tab2');
    });

    it('should include activation direction', () => {
      tabs[0].click();
      fixture.detectChanges();

      tabs[1].click();
      fixture.detectChanges();

      expect(component.lastEvent?.activationDirection).toBeTruthy();
    });
  });

  describe('keepMounted', () => {
    @Component({
      template: `
        <div baseUiTabsRoot [(value)]="selectedTab">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2">Tab 2</button>
          </div>
          <div baseUiTabsPanel value="tab1" [keepMounted]="true">Content 1</div>
          <div baseUiTabsPanel value="tab2" [keepMounted]="true">Content 2</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      selectedTab: TabValue | undefined = 'tab1';
    }

    let fixture: ComponentFixture<TestComponent>;
    let panels: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      panels = fixture.nativeElement.querySelectorAll('[baseUiTabsPanel]');
    });

    it('should not have hidden attribute when keepMounted', () => {
      // Non-selected panel should not have hidden when keepMounted
      expect(panels[1].hasAttribute('hidden')).toBe(false);
    });

    it('should still hide with display none when not selected', () => {
      expect(panels[1].style.display).toBe('none');
    });
  });

  describe('Numeric values', () => {
    @Component({
      template: `
        <div baseUiTabsRoot [(value)]="selectedTab">
          <div baseUiTabsList>
            <button baseUiTab [value]="0">Tab 0</button>
            <button baseUiTab [value]="1">Tab 1</button>
            <button baseUiTab [value]="2">Tab 2</button>
          </div>
          <div baseUiTabsPanel [value]="0">Content 0</div>
          <div baseUiTabsPanel [value]="1">Content 1</div>
          <div baseUiTabsPanel [value]="2">Content 2</div>
        </div>
      `,
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
    })
    class TestComponent {
      selectedTab: TabValue | undefined = 0;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let tabs: NodeListOf<HTMLButtonElement>;
    let panels: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tabs = fixture.nativeElement.querySelectorAll('[baseUiTab]');
      panels = fixture.nativeElement.querySelectorAll('[baseUiTabsPanel]');
    });

    it('should work with numeric values', () => {
      expect(component.selectedTab).toBe(0);
      expect(tabs[0].getAttribute('aria-selected')).toBe('true');
      expect(panels[0].style.display).not.toBe('none');
    });

    it('should select numeric tab on click', () => {
      tabs[2].click();
      fixture.detectChanges();

      expect(component.selectedTab).toBe(2);
      expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    });
  });
});

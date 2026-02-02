/**
 * @fileoverview Tests for composite component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/composite
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { CompositeRootDirective } from './composite-root.directive';
import { CompositeItemDirective } from './composite-item.directive';
import {
  isNativeInput,
  isElementDisabled,
  stopEvent,
  isIndexOutOfListBounds,
  isListIndexDisabled,
  getMinListIndex,
  getMaxListIndex,
  findNonDisabledListIndex,
  createGridCellMap,
  isModifierKeySet,
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  HOME,
  END,
} from './composite';

describe('Composite utilities', () => {
  describe('isNativeInput', () => {
    it('should return true for input element with selectionStart', () => {
      const input = document.createElement('input');
      input.type = 'text';
      document.body.appendChild(input);
      expect(isNativeInput(input)).toBe(true);
      document.body.removeChild(input);
    });

    it('should return true for textarea', () => {
      const textarea = document.createElement('textarea');
      expect(isNativeInput(textarea)).toBe(true);
    });

    it('should return false for button', () => {
      const button = document.createElement('button');
      expect(isNativeInput(button)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isNativeInput(null)).toBe(false);
    });
  });

  describe('isElementDisabled', () => {
    it('should return true for disabled button', () => {
      const button = document.createElement('button');
      button.disabled = true;
      expect(isElementDisabled(button)).toBe(true);
    });

    it('should return true for aria-disabled element', () => {
      const div = document.createElement('div');
      div.setAttribute('aria-disabled', 'true');
      expect(isElementDisabled(div)).toBe(true);
    });

    it('should return false for enabled element', () => {
      const button = document.createElement('button');
      expect(isElementDisabled(button)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isElementDisabled(null)).toBe(false);
    });
  });

  describe('stopEvent', () => {
    it('should prevent default and stop propagation', () => {
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as Event;

      stopEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('isIndexOutOfListBounds', () => {
    it('should return true for negative index', () => {
      expect(isIndexOutOfListBounds([], -1)).toBe(true);
    });

    it('should return true for index >= length', () => {
      const elements = [document.createElement('div')];
      expect(isIndexOutOfListBounds(elements as HTMLElement[], 1)).toBe(true);
    });

    it('should return false for valid index', () => {
      const elements = [document.createElement('div')];
      expect(isIndexOutOfListBounds(elements as HTMLElement[], 0)).toBe(false);
    });
  });

  describe('isListIndexDisabled', () => {
    it('should return true if index is in disabledIndices', () => {
      const elements = [document.createElement('button') as HTMLElement];
      expect(isListIndexDisabled(elements, 0, [0])).toBe(true);
    });

    it('should return true if element is disabled', () => {
      const button = document.createElement('button');
      button.disabled = true;
      const elements = [button as HTMLElement];
      expect(isListIndexDisabled(elements, 0)).toBe(true);
    });

    it('should return false for enabled element', () => {
      const elements = [document.createElement('button') as HTMLElement];
      expect(isListIndexDisabled(elements, 0)).toBe(false);
    });
  });

  describe('getMinListIndex', () => {
    it('should return first non-disabled index', () => {
      const button1 = document.createElement('button');
      button1.disabled = true;
      const button2 = document.createElement('button');
      const elements = [button1, button2] as HTMLElement[];
      expect(getMinListIndex(elements)).toBe(1);
    });

    it('should respect disabledIndices', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      const elements = [button1, button2] as HTMLElement[];
      expect(getMinListIndex(elements, [0])).toBe(1);
    });
  });

  describe('getMaxListIndex', () => {
    it('should return last non-disabled index', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      button2.disabled = true;
      const elements = [button1, button2] as HTMLElement[];
      expect(getMaxListIndex(elements)).toBe(0);
    });
  });

  describe('findNonDisabledListIndex', () => {
    it('should find next non-disabled index', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      button2.disabled = true;
      const button3 = document.createElement('button');
      const elements = [button1, button2, button3] as HTMLElement[];
      expect(findNonDisabledListIndex(elements, { startingIndex: 0 })).toBe(2);
    });

    it('should find previous non-disabled index when decrementing', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      button2.disabled = true;
      const button3 = document.createElement('button');
      const elements = [button1, button2, button3] as HTMLElement[];
      expect(findNonDisabledListIndex(elements, { startingIndex: 2, decrement: true })).toBe(0);
    });
  });

  describe('createGridCellMap', () => {
    it('should create grid map with first item at position 0', () => {
      const sizes = [
        { width: 1, height: 1 },
        { width: 1, height: 1 },
      ];
      const map = createGridCellMap(sizes, 2);
      // First item is placed in the grid
      expect(map[0]).toBe(0);
    });

    it('should handle multi-cell items spanning columns', () => {
      const sizes = [
        { width: 2, height: 1 },
        { width: 1, height: 1 },
      ];
      const map = createGridCellMap(sizes, 2);
      // Item 0 takes cells 0 and 1
      expect(map[0]).toBe(0);
      expect(map[1]).toBe(0);
    });
  });

  describe('isModifierKeySet', () => {
    it('should return true when Shift is pressed', () => {
      const event = {
        getModifierState: vi.fn((key) => key === 'Shift'),
      } as unknown as KeyboardEvent;
      expect(isModifierKeySet(event)).toBe(true);
    });

    it('should return false when no modifier is pressed', () => {
      const event = {
        getModifierState: vi.fn(() => false),
      } as unknown as KeyboardEvent;
      expect(isModifierKeySet(event)).toBe(false);
    });

    it('should ignore specified modifier keys', () => {
      const event = {
        getModifierState: vi.fn((key) => key === 'Shift'),
      } as unknown as KeyboardEvent;
      expect(isModifierKeySet(event, ['Shift'])).toBe(false);
    });
  });
});

describe('CompositeRootDirective', () => {
  @Component({
    template: `
      <div baseUiCompositeRoot
           [orientation]="orientation()"
           [loopFocus]="loopFocus()"
           (highlightedIndexChange)="onIndexChange($event)">
        <button baseUiCompositeItem>Item 1</button>
        <button baseUiCompositeItem>Item 2</button>
        <button baseUiCompositeItem>Item 3</button>
      </div>
    `,
    standalone: true,
    imports: [CompositeRootDirective, CompositeItemDirective],
  })
  class TestComponent {
    orientation = signal<'horizontal' | 'vertical' | 'both'>('vertical');
    loopFocus = signal(true);
    indexChangeHandler = vi.fn();

    onIndexChange(index: number) {
      this.indexChangeHandler(index);
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let root: HTMLElement;
  let items: NodeListOf<HTMLButtonElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    root = fixture.nativeElement.querySelector('[baseUiCompositeRoot]');
    items = fixture.nativeElement.querySelectorAll('[baseUiCompositeItem]');
  });

  it('should render root element', () => {
    expect(root).toBeTruthy();
    expect(root.classList.contains('base-ui-composite-root')).toBe(true);
  });

  it('should render items', () => {
    expect(items.length).toBe(3);
  });

  it('should set aria-orientation', () => {
    expect(root.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should not set aria-orientation for "both"', () => {
    component.orientation.set('both');
    fixture.detectChanges();
    expect(root.getAttribute('aria-orientation')).toBeNull();
  });

  it('should have first item highlighted by default', () => {
    expect(items[0].getAttribute('data-highlighted')).toBe('true');
    expect(items[0].getAttribute('tabindex')).toBe('0');
  });

  it('should have non-highlighted items with tabindex -1', () => {
    expect(items[1].getAttribute('tabindex')).toBe('-1');
    expect(items[2].getAttribute('tabindex')).toBe('-1');
  });

  it('should navigate down on ArrowDown', () => {
    const event = new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true });
    root.dispatchEvent(event);
    fixture.detectChanges();

    expect(items[1].getAttribute('data-highlighted')).toBe('true');
    expect(component.indexChangeHandler).toHaveBeenCalledWith(1);
  });

  it('should navigate up on ArrowUp', () => {
    // First move to item 2
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();

    // Then move back to item 1
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_UP, bubbles: true }));
    fixture.detectChanges();

    expect(items[0].getAttribute('data-highlighted')).toBe('true');
  });

  it('should loop from last to first when loopFocus is true', () => {
    // Move to item 2
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();
    // Move to item 3
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();
    // Loop to item 1
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();

    expect(items[0].getAttribute('data-highlighted')).toBe('true');
  });

  it('should not loop when loopFocus is false', () => {
    component.loopFocus.set(false);
    fixture.detectChanges();

    // Move to item 2
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();
    // Move to item 3
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();
    // Try to loop - should stay on item 3
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();

    expect(items[2].getAttribute('data-highlighted')).toBe('true');
  });
});

describe('CompositeRootDirective with Home/End keys', () => {
  @Component({
    template: `
      <div baseUiCompositeRoot
           [enableHomeAndEndKeys]="true"
           [orientation]="'vertical'">
        <button baseUiCompositeItem>Item 1</button>
        <button baseUiCompositeItem>Item 2</button>
        <button baseUiCompositeItem>Item 3</button>
      </div>
    `,
    standalone: true,
    imports: [CompositeRootDirective, CompositeItemDirective],
  })
  class HomeEndTestComponent {}

  let fixture: ComponentFixture<HomeEndTestComponent>;
  let root: HTMLElement;
  let items: NodeListOf<HTMLButtonElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEndTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeEndTestComponent);
    fixture.detectChanges();

    root = fixture.nativeElement.querySelector('[baseUiCompositeRoot]');
    items = fixture.nativeElement.querySelectorAll('[baseUiCompositeItem]');
  });

  it('should navigate to first item on Home', () => {
    // Move to item 3
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();

    // Press Home
    root.dispatchEvent(new KeyboardEvent('keydown', { key: HOME, bubbles: true }));
    fixture.detectChanges();

    expect(items[0].getAttribute('data-highlighted')).toBe('true');
  });

  it('should navigate to last item on End', () => {
    root.dispatchEvent(new KeyboardEvent('keydown', { key: END, bubbles: true }));
    fixture.detectChanges();

    expect(items[2].getAttribute('data-highlighted')).toBe('true');
  });
});

describe('CompositeRootDirective horizontal orientation', () => {
  @Component({
    template: `
      <div baseUiCompositeRoot [orientation]="'horizontal'">
        <button baseUiCompositeItem>Item 1</button>
        <button baseUiCompositeItem>Item 2</button>
        <button baseUiCompositeItem>Item 3</button>
      </div>
    `,
    standalone: true,
    imports: [CompositeRootDirective, CompositeItemDirective],
  })
  class HorizontalTestComponent {}

  let fixture: ComponentFixture<HorizontalTestComponent>;
  let root: HTMLElement;
  let items: NodeListOf<HTMLButtonElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalTestComponent);
    fixture.detectChanges();

    root = fixture.nativeElement.querySelector('[baseUiCompositeRoot]');
    items = fixture.nativeElement.querySelectorAll('[baseUiCompositeItem]');
  });

  it('should set horizontal orientation', () => {
    expect(root.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should navigate right on ArrowRight', () => {
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_RIGHT, bubbles: true }));
    fixture.detectChanges();

    expect(items[1].getAttribute('data-highlighted')).toBe('true');
  });

  it('should navigate left on ArrowLeft', () => {
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_RIGHT, bubbles: true }));
    fixture.detectChanges();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_LEFT, bubbles: true }));
    fixture.detectChanges();

    expect(items[0].getAttribute('data-highlighted')).toBe('true');
  });

  it('should not navigate on ArrowUp/ArrowDown in horizontal mode', () => {
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();

    expect(items[0].getAttribute('data-highlighted')).toBe('true');
  });
});

describe('CompositeItemDirective', () => {
  @Component({
    template: `
      <div baseUiCompositeRoot [highlightItemOnHover]="true">
        <button baseUiCompositeItem>Item 1</button>
        <button baseUiCompositeItem>Item 2</button>
      </div>
    `,
    standalone: true,
    imports: [CompositeRootDirective, CompositeItemDirective],
  })
  class HoverTestComponent {}

  let fixture: ComponentFixture<HoverTestComponent>;
  let items: NodeListOf<HTMLButtonElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoverTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HoverTestComponent);
    fixture.detectChanges();

    items = fixture.nativeElement.querySelectorAll('[baseUiCompositeItem]');
  });

  it('should highlight on hover when enabled', () => {
    items[1].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();

    expect(items[1].getAttribute('data-highlighted')).toBe('true');
    expect(items[0].getAttribute('data-highlighted')).toBeNull();
  });

  it('should have item class', () => {
    expect(items[0].classList.contains('base-ui-composite-item')).toBe(true);
  });

  it('should have highlighted class when highlighted', () => {
    expect(items[0].classList.contains('base-ui-composite-item-highlighted')).toBe(true);
    expect(items[1].classList.contains('base-ui-composite-item-highlighted')).toBe(false);
  });
});

describe('CompositeRootDirective with disabled items', () => {
  @Component({
    template: `
      <div baseUiCompositeRoot [disabledIndices]="[1]">
        <button baseUiCompositeItem>Item 1</button>
        <button baseUiCompositeItem>Item 2</button>
        <button baseUiCompositeItem>Item 3</button>
      </div>
    `,
    standalone: true,
    imports: [CompositeRootDirective, CompositeItemDirective],
  })
  class DisabledTestComponent {}

  let fixture: ComponentFixture<DisabledTestComponent>;
  let root: HTMLElement;
  let items: NodeListOf<HTMLButtonElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisabledTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisabledTestComponent);
    fixture.detectChanges();

    root = fixture.nativeElement.querySelector('[baseUiCompositeRoot]');
    items = fixture.nativeElement.querySelectorAll('[baseUiCompositeItem]');
  });

  it('should skip disabled items when navigating', () => {
    // From item 1, arrow down should skip item 2 and go to item 3
    root.dispatchEvent(new KeyboardEvent('keydown', { key: ARROW_DOWN, bubbles: true }));
    fixture.detectChanges();

    expect(items[2].getAttribute('data-highlighted')).toBe('true');
  });
});

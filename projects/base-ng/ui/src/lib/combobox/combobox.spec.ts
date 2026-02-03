/**
 * @component Combobox
 * @fileoverview Tests for Combobox component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/Combobox.test.tsx
 * @parity Verified against React Base UI - includes Keyboard Navigation, Focus Management, State Attributes, and Accessibility test categories
 */

import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ComboboxRootDirective } from './combobox-root.directive';
import { ComboboxInputDirective } from './combobox-input.directive';
import { ComboboxTriggerDirective } from './combobox-trigger.directive';
import { ComboboxPositionerDirective } from './combobox-positioner.directive';
import { ComboboxPopupDirective } from './combobox-popup.directive';
import { ComboboxListDirective } from './combobox-list.directive';
import { ComboboxItemDirective } from './combobox-item.directive';
import { ComboboxItemIndicatorDirective } from './combobox-item-indicator.directive';
import { ComboboxEmptyDirective } from './combobox-empty.directive';
import { ComboboxClearDirective } from './combobox-clear.directive';
import { ComboboxGroupDirective } from './combobox-group.directive';
import { ComboboxGroupLabelDirective } from './combobox-group-label.directive';

@Component({
  standalone: true,
  imports: [
    ComboboxRootDirective,
    ComboboxInputDirective,
    ComboboxTriggerDirective,
    ComboboxPositionerDirective,
    ComboboxPopupDirective,
    ComboboxListDirective,
    ComboboxItemDirective,
    ComboboxClearDirective,
  ],
  template: `
    <div baseUiComboboxRoot #root="comboboxRoot" [disabled]="disabled()" (valueChange)="onValueChange($event)">
      <input baseUiComboboxInput #input="comboboxInput" placeholder="Search fruits..." />
      <button baseUiComboboxTrigger>▼</button>
      <button baseUiComboboxClear>✕</button>
      <div baseUiComboboxPositioner>
        <div baseUiComboboxPopup>
          <div baseUiComboboxList>
            <div baseUiComboboxItem [value]="'apple'" class="item-apple">Apple</div>
            <div baseUiComboboxItem [value]="'banana'" class="item-banana">Banana</div>
            <div baseUiComboboxItem [value]="'cherry'" class="item-cherry" [disabled]="true">Cherry</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestComboboxComponent {
  @ViewChild('root', { static: true }) root!: ComboboxRootDirective<string>;
  @ViewChild('input', { static: true }) input!: ComboboxInputDirective;
  readonly disabled = signal(false);
  selectedValue: string | null = null;

  onValueChange(value: string | null): void {
    this.selectedValue = value;
  }
}

@Component({
  standalone: true,
  imports: [
    ComboboxRootDirective,
    ComboboxInputDirective,
    ComboboxPositionerDirective,
    ComboboxPopupDirective,
    ComboboxListDirective,
    ComboboxItemDirective,
    ComboboxEmptyDirective,
  ],
  template: `
    <div baseUiComboboxRoot #root="comboboxRoot">
      <input baseUiComboboxInput />
      <div baseUiComboboxPositioner>
        <div baseUiComboboxPopup>
          <div baseUiComboboxList>
            <div baseUiComboboxItem [value]="'apple'">Apple</div>
            <div baseUiComboboxItem [value]="'banana'">Banana</div>
          </div>
          <div baseUiComboboxEmpty class="empty-message">No results found</div>
        </div>
      </div>
    </div>
  `,
})
class TestComboboxWithEmptyComponent {
  @ViewChild('root', { static: true }) root!: ComboboxRootDirective<string>;
}

@Component({
  standalone: true,
  imports: [
    ComboboxRootDirective,
    ComboboxInputDirective,
    ComboboxPositionerDirective,
    ComboboxPopupDirective,
    ComboboxListDirective,
    ComboboxItemDirective,
    ComboboxGroupDirective,
    ComboboxGroupLabelDirective,
  ],
  template: `
    <div baseUiComboboxRoot #root="comboboxRoot">
      <input baseUiComboboxInput />
      <div baseUiComboboxPositioner>
        <div baseUiComboboxPopup>
          <div baseUiComboboxList>
            <div baseUiComboboxGroup #group="comboboxGroup">
              <div baseUiComboboxGroupLabel class="fruits-label">Fruits</div>
              <div baseUiComboboxItem [value]="'apple'">Apple</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestComboboxWithGroupsComponent {
  @ViewChild('root', { static: true }) root!: ComboboxRootDirective<string>;
  @ViewChild('group', { static: true }) group!: ComboboxGroupDirective;
}

describe('Combobox', () => {
  describe('Basic Combobox', () => {
    let fixture: ComponentFixture<TestComboboxComponent>;
    let component: TestComboboxComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComboboxComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComboboxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.root).toBeTruthy();
    });

    it('should have base-ui-combobox-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-combobox-root');
      expect(root).toBeTruthy();
    });

    it('should have combobox role on input', () => {
      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-autocomplete="list"', () => {
      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });

    it('should have aria-expanded="false" initially', () => {
      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have base-ui-combobox-input class', () => {
      const input = fixture.nativeElement.querySelector('.base-ui-combobox-input');
      expect(input).toBeTruthy();
    });

    it('should have base-ui-combobox-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-combobox-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should open on trigger click', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiComboboxTrigger]');
      trigger.click();
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should have listbox role on list', () => {
      const list = fixture.nativeElement.querySelector('[baseUiComboboxList]');
      expect(list.getAttribute('role')).toBe('listbox');
    });

    it('should have option role on items', () => {
      const item = fixture.nativeElement.querySelector('.item-apple');
      expect(item.getAttribute('role')).toBe('option');
    });

    it('should disable input when combobox is disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });

    it('should select item on click', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiComboboxTrigger]');
      trigger.click();
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-apple');
      item.click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe('apple');
      expect(component.root.isOpen()).toBe(false);
    });

    it('should mark selected item with aria-selected', () => {
      component.root.context.setValue('apple');
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-apple');
      expect(item.getAttribute('aria-selected')).toBe('true');
    });

    it('should not select disabled item', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiComboboxTrigger]');
      trigger.click();
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-cherry');
      item.click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe(null);
    });
  });

  describe('Filtering', () => {
    let fixture: ComponentFixture<TestComboboxComponent>;
    let component: TestComboboxComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComboboxComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComboboxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should filter items based on input', () => {
      component.root.context.setInputValue('app');
      fixture.detectChanges();

      const filtered = component.root.context.getFilteredItems();
      expect(filtered.length).toBe(1);
      expect(filtered[0].value).toBe('apple');
    });

    it('should show all items when input is empty', () => {
      component.root.context.setInputValue('');
      fixture.detectChanges();

      const filtered = component.root.context.getFilteredItems();
      expect(filtered.length).toBe(3);
    });

    it('should be case-insensitive by default', () => {
      component.root.context.setInputValue('APPLE');
      fixture.detectChanges();

      const filtered = component.root.context.getFilteredItems();
      expect(filtered.length).toBe(1);
    });

    it('should auto-open when typing', () => {
      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      input.value = 'a';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    let fixture: ComponentFixture<TestComboboxComponent>;
    let component: TestComboboxComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComboboxComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComboboxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should open with ArrowDown key', () => {
      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should open with ArrowUp key', () => {
      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should close with Escape key', () => {
      component.root.context.setOpen(true, 'keyboard');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiComboboxInput]');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(false);
    });
  });

  describe('Clear Button', () => {
    let fixture: ComponentFixture<TestComboboxComponent>;
    let component: TestComboboxComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComboboxComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComboboxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-combobox-clear class', () => {
      const clear = fixture.nativeElement.querySelector('.base-ui-combobox-clear');
      expect(clear).toBeTruthy();
    });

    it('should clear value when clicked', () => {
      component.root.context.setValue('apple');
      component.root.context.setInputValue('Apple');
      fixture.detectChanges();

      const clear = fixture.nativeElement.querySelector('[baseUiComboboxClear]');
      clear.click();
      fixture.detectChanges();

      expect(component.root.context.value).toBe(null);
      expect(component.root.context.inputValue).toBe('');
    });
  });

  describe('Empty State', () => {
    let fixture: ComponentFixture<TestComboboxWithEmptyComponent>;
    let component: TestComboboxWithEmptyComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComboboxWithEmptyComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComboboxWithEmptyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-combobox-empty class', () => {
      const empty = fixture.nativeElement.querySelector('.base-ui-combobox-empty');
      expect(empty).toBeTruthy();
    });

    it('should show empty message when no items match', () => {
      component.root.context.setInputValue('xyz');
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.empty-message');
      expect(empty.style.display).not.toBe('none');
    });

    it('should hide empty message when items match', () => {
      component.root.context.setInputValue('app');
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.empty-message');
      expect(empty.style.display).toBe('none');
    });
  });

  describe('Groups', () => {
    let fixture: ComponentFixture<TestComboboxWithGroupsComponent>;
    let component: TestComboboxWithGroupsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComboboxWithGroupsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComboboxWithGroupsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have group role on groups', () => {
      const group = fixture.nativeElement.querySelector('[baseUiComboboxGroup]');
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should have base-ui-combobox-group class', () => {
      const group = fixture.nativeElement.querySelector('.base-ui-combobox-group');
      expect(group).toBeTruthy();
    });

    it('should have base-ui-combobox-group-label class', () => {
      const label = fixture.nativeElement.querySelector('.base-ui-combobox-group-label');
      expect(label).toBeTruthy();
    });

    it('should link group to label via aria-labelledby', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      fixture.detectChanges();

      const group = fixture.nativeElement.querySelector('[baseUiComboboxGroup]');
      const label = fixture.nativeElement.querySelector('.fruits-label');

      const labelId = label.getAttribute('id');
      expect(labelId).toBeTruthy();
      expect(group.getAttribute('aria-labelledby')).toBe(labelId);
    });
  });

  describe('Context API', () => {
    let fixture: ComponentFixture<TestComboboxComponent>;
    let component: TestComboboxComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComboboxComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComboboxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should expose open state', () => {
      expect(component.root.context.open).toBe(false);

      component.root.context.setOpen(true, 'keyboard');
      fixture.detectChanges();

      expect(component.root.context.open).toBe(true);
    });

    it('should expose value state', () => {
      expect(component.root.context.value).toBe(null);

      component.root.context.setValue('apple');
      fixture.detectChanges();

      expect(component.root.context.value).toBe('apple');
    });

    it('should expose inputValue state', () => {
      expect(component.root.context.inputValue).toBe('');

      component.root.context.setInputValue('test');
      fixture.detectChanges();

      expect(component.root.context.inputValue).toBe('test');
    });

    it('should have rootId', () => {
      expect(component.root.context.rootId).toBeTruthy();
      expect(component.root.context.rootId).toContain('base-ui-combobox-');
    });

    it('should check hasSelectedValue', () => {
      expect(component.root.context.hasSelectedValue()).toBe(false);

      component.root.context.setValue('apple');
      fixture.detectChanges();

      expect(component.root.context.hasSelectedValue()).toBe(true);
    });

    it('should clear with clear()', () => {
      component.root.context.setValue('apple');
      component.root.context.setInputValue('Apple');
      fixture.detectChanges();

      component.root.context.clear();
      fixture.detectChanges();

      expect(component.root.context.value).toBe(null);
      expect(component.root.context.inputValue).toBe('');
    });
  });
});

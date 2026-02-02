/**
 * @fileoverview Tests for Autocomplete component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/autocomplete
 */

import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { AutocompleteRootDirective } from './autocomplete-root.directive';
import { AutocompleteValueDirective } from './autocomplete-value.directive';
import { AutocompleteInputDirective } from './autocomplete-input.directive';
import { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { AutocompletePositionerDirective } from './autocomplete-positioner.directive';
import { AutocompletePopupDirective } from './autocomplete-popup.directive';
import { AutocompleteListDirective } from './autocomplete-list.directive';
import { AutocompleteItemDirective } from './autocomplete-item.directive';
import { AutocompleteItemIndicatorDirective } from './autocomplete-item-indicator.directive';
import { AutocompleteEmptyDirective } from './autocomplete-empty.directive';
import { AutocompleteClearDirective } from './autocomplete-clear.directive';
import { AutocompleteGroupDirective } from './autocomplete-group.directive';
import { AutocompleteGroupLabelDirective } from './autocomplete-group-label.directive';
import { AutocompleteMode } from './autocomplete.types';

@Component({
  standalone: true,
  imports: [
    AutocompleteRootDirective,
    AutocompleteInputDirective,
    AutocompleteTriggerDirective,
    AutocompletePositionerDirective,
    AutocompletePopupDirective,
    AutocompleteListDirective,
    AutocompleteItemDirective,
    AutocompleteClearDirective,
  ],
  template: `
    <div baseUiAutocompleteRoot #root="autocompleteRoot" [disabled]="disabled()" [mode]="mode()" (valueChange)="onValueChange($event)">
      <input baseUiAutocompleteInput #input="autocompleteInput" placeholder="Search fruits..." />
      <button baseUiAutocompleteTrigger>▼</button>
      <button baseUiAutocompleteClear>✕</button>
      <div baseUiAutocompletePositioner>
        <div baseUiAutocompletePopup>
          <div baseUiAutocompleteList>
            <div baseUiAutocompleteItem [value]="'apple'" class="item-apple">Apple</div>
            <div baseUiAutocompleteItem [value]="'banana'" class="item-banana">Banana</div>
            <div baseUiAutocompleteItem [value]="'cherry'" class="item-cherry" [disabled]="true">Cherry</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestAutocompleteComponent {
  @ViewChild('root', { static: true }) root!: AutocompleteRootDirective<string>;
  @ViewChild('input', { static: true }) input!: AutocompleteInputDirective;
  readonly disabled = signal(false);
  readonly mode = signal<AutocompleteMode>('list');
  selectedValue: string | null = null;

  onValueChange(value: string | null): void {
    this.selectedValue = value;
  }
}

@Component({
  standalone: true,
  imports: [
    AutocompleteRootDirective,
    AutocompleteValueDirective,
    AutocompleteInputDirective,
    AutocompletePositionerDirective,
    AutocompletePopupDirective,
    AutocompleteListDirective,
    AutocompleteItemDirective,
  ],
  template: `
    <div baseUiAutocompleteRoot #root="autocompleteRoot">
      <span baseUiAutocompleteValue class="value-display"></span>
      <input baseUiAutocompleteInput />
      <div baseUiAutocompletePositioner>
        <div baseUiAutocompletePopup>
          <div baseUiAutocompleteList>
            <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
            <div baseUiAutocompleteItem [value]="'banana'">Banana</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestAutocompleteWithValueComponent {
  @ViewChild('root', { static: true }) root!: AutocompleteRootDirective<string>;
}

@Component({
  standalone: true,
  imports: [
    AutocompleteRootDirective,
    AutocompleteInputDirective,
    AutocompletePositionerDirective,
    AutocompletePopupDirective,
    AutocompleteListDirective,
    AutocompleteItemDirective,
    AutocompleteEmptyDirective,
  ],
  template: `
    <div baseUiAutocompleteRoot #root="autocompleteRoot">
      <input baseUiAutocompleteInput />
      <div baseUiAutocompletePositioner>
        <div baseUiAutocompletePopup>
          <div baseUiAutocompleteList>
            <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
            <div baseUiAutocompleteItem [value]="'banana'">Banana</div>
          </div>
          <div baseUiAutocompleteEmpty class="empty-message">No results found</div>
        </div>
      </div>
    </div>
  `,
})
class TestAutocompleteWithEmptyComponent {
  @ViewChild('root', { static: true }) root!: AutocompleteRootDirective<string>;
}

@Component({
  standalone: true,
  imports: [
    AutocompleteRootDirective,
    AutocompleteInputDirective,
    AutocompletePositionerDirective,
    AutocompletePopupDirective,
    AutocompleteListDirective,
    AutocompleteItemDirective,
    AutocompleteGroupDirective,
    AutocompleteGroupLabelDirective,
  ],
  template: `
    <div baseUiAutocompleteRoot #root="autocompleteRoot">
      <input baseUiAutocompleteInput />
      <div baseUiAutocompletePositioner>
        <div baseUiAutocompletePopup>
          <div baseUiAutocompleteList>
            <div baseUiAutocompleteGroup #group="autocompleteGroup">
              <div baseUiAutocompleteGroupLabel class="fruits-label">Fruits</div>
              <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestAutocompleteWithGroupsComponent {
  @ViewChild('root', { static: true }) root!: AutocompleteRootDirective<string>;
  @ViewChild('group', { static: true }) group!: AutocompleteGroupDirective;
}

describe('Autocomplete', () => {
  describe('Basic Autocomplete', () => {
    let fixture: ComponentFixture<TestAutocompleteComponent>;
    let component: TestAutocompleteComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.root).toBeTruthy();
    });

    it('should have base-ui-autocomplete-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-autocomplete-root');
      expect(root).toBeTruthy();
    });

    it('should have combobox role on input', () => {
      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-autocomplete="list" by default', () => {
      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });

    it('should have aria-expanded="false" initially', () => {
      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have base-ui-autocomplete-input class', () => {
      const input = fixture.nativeElement.querySelector('.base-ui-autocomplete-input');
      expect(input).toBeTruthy();
    });

    it('should have base-ui-autocomplete-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-autocomplete-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should open on trigger click', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiAutocompleteTrigger]');
      trigger.click();
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should have listbox role on list', () => {
      const list = fixture.nativeElement.querySelector('[baseUiAutocompleteList]');
      expect(list.getAttribute('role')).toBe('listbox');
    });

    it('should have option role on items', () => {
      const item = fixture.nativeElement.querySelector('.item-apple');
      expect(item.getAttribute('role')).toBe('option');
    });

    it('should disable input when autocomplete is disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });

    it('should select item on click', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiAutocompleteTrigger]');
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
      const trigger = fixture.nativeElement.querySelector('[baseUiAutocompleteTrigger]');
      trigger.click();
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-cherry');
      item.click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe(null);
    });
  });

  describe('Modes', () => {
    let fixture: ComponentFixture<TestAutocompleteComponent>;
    let component: TestAutocompleteComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have mode "list" by default', () => {
      expect(component.root.context.mode).toBe('list');
    });

    it('should have data-mode attribute', () => {
      const root = fixture.nativeElement.querySelector('[baseUiAutocompleteRoot]');
      expect(root.getAttribute('data-mode')).toBe('list');
    });

    it('should update mode', () => {
      component.mode.set('both');
      fixture.detectChanges();

      expect(component.root.context.mode).toBe('both');

      const root = fixture.nativeElement.querySelector('[baseUiAutocompleteRoot]');
      expect(root.getAttribute('data-mode')).toBe('both');
    });

    it('should have aria-autocomplete="list" in list mode', () => {
      component.mode.set('list');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });

    it('should have aria-autocomplete="inline" in inline mode', () => {
      component.mode.set('inline');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('aria-autocomplete')).toBe('inline');
    });

    it('should have aria-autocomplete="both" in both mode', () => {
      component.mode.set('both');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('aria-autocomplete')).toBe('both');
    });

    it('should have aria-autocomplete="none" in none mode', () => {
      component.mode.set('none');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      expect(input.getAttribute('aria-autocomplete')).toBe('none');
    });
  });

  describe('Filtering', () => {
    let fixture: ComponentFixture<TestAutocompleteComponent>;
    let component: TestAutocompleteComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should filter items based on input in list mode', () => {
      component.mode.set('list');
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

    it('should not filter in inline mode', () => {
      component.mode.set('inline');
      component.root.context.setInputValue('app');
      fixture.detectChanges();

      const filtered = component.root.context.getFilteredItems();
      expect(filtered.length).toBe(3);
    });

    it('should not filter in none mode', () => {
      component.mode.set('none');
      component.root.context.setInputValue('app');
      fixture.detectChanges();

      const filtered = component.root.context.getFilteredItems();
      expect(filtered.length).toBe(3);
    });

    it('should auto-open when typing', () => {
      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      input.value = 'a';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    let fixture: ComponentFixture<TestAutocompleteComponent>;
    let component: TestAutocompleteComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should open with ArrowDown key', () => {
      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should open with ArrowUp key', () => {
      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should close with Escape key', () => {
      component.root.context.setOpen(true, 'keyboard');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('[baseUiAutocompleteInput]');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(false);
    });
  });

  describe('Clear Button', () => {
    let fixture: ComponentFixture<TestAutocompleteComponent>;
    let component: TestAutocompleteComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-autocomplete-clear class', () => {
      const clear = fixture.nativeElement.querySelector('.base-ui-autocomplete-clear');
      expect(clear).toBeTruthy();
    });

    it('should clear value when clicked', () => {
      component.root.context.setValue('apple');
      component.root.context.setInputValue('Apple');
      fixture.detectChanges();

      const clear = fixture.nativeElement.querySelector('[baseUiAutocompleteClear]');
      clear.click();
      fixture.detectChanges();

      expect(component.root.context.value).toBe(null);
      expect(component.root.context.inputValue).toBe('');
    });
  });

  describe('Value Display', () => {
    let fixture: ComponentFixture<TestAutocompleteWithValueComponent>;
    let component: TestAutocompleteWithValueComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteWithValueComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteWithValueComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-autocomplete-value class', () => {
      const value = fixture.nativeElement.querySelector('.base-ui-autocomplete-value');
      expect(value).toBeTruthy();
    });

    it('should display input value', () => {
      component.root.context.setInputValue('test value');
      fixture.detectChanges();

      const value = fixture.nativeElement.querySelector('.value-display');
      expect(value.textContent).toBe('test value');
    });
  });

  describe('Empty State', () => {
    let fixture: ComponentFixture<TestAutocompleteWithEmptyComponent>;
    let component: TestAutocompleteWithEmptyComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteWithEmptyComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteWithEmptyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-autocomplete-empty class', () => {
      const empty = fixture.nativeElement.querySelector('.base-ui-autocomplete-empty');
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
    let fixture: ComponentFixture<TestAutocompleteWithGroupsComponent>;
    let component: TestAutocompleteWithGroupsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteWithGroupsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteWithGroupsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have group role on groups', () => {
      const group = fixture.nativeElement.querySelector('[baseUiAutocompleteGroup]');
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should have base-ui-autocomplete-group class', () => {
      const group = fixture.nativeElement.querySelector('.base-ui-autocomplete-group');
      expect(group).toBeTruthy();
    });

    it('should have base-ui-autocomplete-group-label class', () => {
      const label = fixture.nativeElement.querySelector('.base-ui-autocomplete-group-label');
      expect(label).toBeTruthy();
    });

    it('should link group to label via aria-labelledby', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      fixture.detectChanges();

      const group = fixture.nativeElement.querySelector('[baseUiAutocompleteGroup]');
      const label = fixture.nativeElement.querySelector('.fruits-label');

      const labelId = label.getAttribute('id');
      expect(labelId).toBeTruthy();
      expect(group.getAttribute('aria-labelledby')).toBe(labelId);
    });
  });

  describe('Context API', () => {
    let fixture: ComponentFixture<TestAutocompleteComponent>;
    let component: TestAutocompleteComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestAutocompleteComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestAutocompleteComponent);
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
      expect(component.root.context.rootId).toContain('base-ui-autocomplete-');
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

    it('should expose mode', () => {
      expect(component.root.context.mode).toBe('list');

      component.mode.set('both');
      fixture.detectChanges();

      expect(component.root.context.mode).toBe('both');
    });
  });
});

/**
 * @fileoverview Tests for Select component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/Select.test.tsx
 * @parity Verified against React Base UI
 */

import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SelectRootDirective } from './select-root.directive';
import { SelectTriggerDirective } from './select-trigger.directive';
import { SelectValueDirective } from './select-value.directive';
import { SelectIconDirective } from './select-icon.directive';
import { SelectPositionerDirective } from './select-positioner.directive';
import { SelectPopupDirective } from './select-popup.directive';
import { SelectListDirective } from './select-list.directive';
import { SelectItemDirective } from './select-item.directive';
import { SelectItemIndicatorDirective } from './select-item-indicator.directive';
import { SelectGroupDirective } from './select-group.directive';
import { SelectGroupLabelDirective } from './select-group-label.directive';

@Component({
  standalone: true,
  imports: [
    SelectRootDirective,
    SelectTriggerDirective,
    SelectValueDirective,
    SelectIconDirective,
    SelectPositionerDirective,
    SelectPopupDirective,
    SelectListDirective,
    SelectItemDirective,
  ],
  template: `
    <div baseUiSelectRoot #root="selectRoot" [disabled]="disabled()" [value]="value()" (valueChange)="onValueChange($event)">
      <button baseUiSelectTrigger #trigger="selectTrigger">
        <span baseUiSelectValue [placeholder]="'Select a fruit...'">{{ root.context.value || 'Select a fruit...' }}</span>
        <span baseUiSelectIcon>▼</span>
      </button>
      <div baseUiSelectPositioner>
        <div baseUiSelectPopup>
          <div baseUiSelectList>
            <div baseUiSelectItem [value]="'apple'" class="item-apple">Apple</div>
            <div baseUiSelectItem [value]="'banana'" class="item-banana">Banana</div>
            <div baseUiSelectItem [value]="'cherry'" class="item-cherry" [disabled]="true">Cherry</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestSelectComponent {
  @ViewChild('root', { static: true }) root!: SelectRootDirective<string>;
  @ViewChild('trigger', { static: true }) trigger!: SelectTriggerDirective;
  readonly disabled = signal(false);
  readonly value = signal<string | null>(null);
  selectedValue: string | null = null;

  onValueChange(value: string | null): void {
    this.selectedValue = value;
  }
}

@Component({
  standalone: true,
  imports: [
    SelectRootDirective,
    SelectTriggerDirective,
    SelectValueDirective,
    SelectPositionerDirective,
    SelectPopupDirective,
    SelectListDirective,
    SelectItemDirective,
    SelectItemIndicatorDirective,
  ],
  template: `
    <div baseUiSelectRoot #root="selectRoot" [multiple]="true" [defaultValue]="defaultValue">
      <button baseUiSelectTrigger>
        <span baseUiSelectValue [placeholder]="'Select fruits...'"></span>
      </button>
      <div baseUiSelectPositioner>
        <div baseUiSelectPopup>
          <div baseUiSelectList>
            <div baseUiSelectItem [value]="'apple'" class="item-apple">
              <span baseUiSelectItemIndicator>✓</span>
              Apple
            </div>
            <div baseUiSelectItem [value]="'banana'" class="item-banana">
              <span baseUiSelectItemIndicator>✓</span>
              Banana
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestMultiSelectComponent {
  @ViewChild('root', { static: true }) root!: SelectRootDirective<string>;
  readonly defaultValue: string[] = [];
}

@Component({
  standalone: true,
  imports: [
    SelectRootDirective,
    SelectTriggerDirective,
    SelectValueDirective,
    SelectPositionerDirective,
    SelectPopupDirective,
    SelectListDirective,
    SelectItemDirective,
    SelectGroupDirective,
    SelectGroupLabelDirective,
  ],
  template: `
    <div baseUiSelectRoot #root="selectRoot">
      <button baseUiSelectTrigger>
        <span baseUiSelectValue [placeholder]="'Select...'"></span>
      </button>
      <div baseUiSelectPositioner>
        <div baseUiSelectPopup>
          <div baseUiSelectList>
            <div baseUiSelectGroup #group="selectGroup">
              <div baseUiSelectGroupLabel class="fruits-label">Fruits</div>
              <div baseUiSelectItem [value]="'apple'">Apple</div>
              <div baseUiSelectItem [value]="'banana'">Banana</div>
            </div>
            <div baseUiSelectGroup>
              <div baseUiSelectGroupLabel class="veggies-label">Vegetables</div>
              <div baseUiSelectItem [value]="'carrot'">Carrot</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class TestSelectWithGroupsComponent {
  @ViewChild('root', { static: true }) root!: SelectRootDirective<string>;
  @ViewChild('group', { static: true }) group!: SelectGroupDirective;
}

describe('Select', () => {
  describe('Basic Select', () => {
    let fixture: ComponentFixture<TestSelectComponent>;
    let component: TestSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.root).toBeTruthy();
    });

    it('should have base-ui-select-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-select-root');
      expect(root).toBeTruthy();
    });

    it('should have combobox role on trigger', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      expect(trigger.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-haspopup="listbox"', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should have aria-expanded="false" initially', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have base-ui-select-trigger class', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-select-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should have base-ui-select-value class', () => {
      const value = fixture.nativeElement.querySelector('.base-ui-select-value');
      expect(value).toBeTruthy();
    });

    it('should have base-ui-select-icon class', () => {
      const icon = fixture.nativeElement.querySelector('.base-ui-select-icon');
      expect(icon).toBeTruthy();
    });

    it('should show placeholder when no value selected', () => {
      const value = fixture.nativeElement.querySelector('[baseUiSelectValue]');
      expect(value.getAttribute('data-placeholder')).toBe('');
    });

    it('should open on click', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close on second click', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();
      trigger.click();
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(false);
    });

    it('should have listbox role on list', () => {
      const list = fixture.nativeElement.querySelector('[baseUiSelectList]');
      expect(list.getAttribute('role')).toBe('listbox');
    });

    it('should have option role on items', () => {
      const item = fixture.nativeElement.querySelector('.item-apple');
      expect(item.getAttribute('role')).toBe('option');
    });

    it('should have base-ui-select-item class', () => {
      const item = fixture.nativeElement.querySelector('.base-ui-select-item');
      expect(item).toBeTruthy();
    });

    it('should disable trigger when select is disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      expect(trigger.getAttribute('aria-disabled')).toBe('true');
      expect(trigger.hasAttribute('data-disabled')).toBe(true);
    });

    it('should not open when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(false);
    });

    it('should select item on click', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-apple');
      item.click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe('apple');
      expect(component.root.isOpen()).toBe(false);
    });

    it('should mark selected item with aria-selected', () => {
      component.value.set('apple');
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-apple');
      expect(item.getAttribute('aria-selected')).toBe('true');
      expect(item.hasAttribute('data-selected')).toBe(true);
    });

    it('should not select disabled item', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-cherry');
      item.click();
      fixture.detectChanges();

      expect(component.selectedValue).toBe(null);
    });

    it('should mark disabled item with aria-disabled', () => {
      const item = fixture.nativeElement.querySelector('.item-cherry');
      expect(item.getAttribute('aria-disabled')).toBe('true');
      expect(item.hasAttribute('data-disabled')).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    let fixture: ComponentFixture<TestSelectComponent>;
    let component: TestSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should open with Enter key', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should open with Space key', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should open with ArrowDown key', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should open with ArrowUp key', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(true);
    });

    it('should close with Escape key', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(false);
    });

    it('should not open when disabled', () => {
      component.disabled.set(true);
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.root.isOpen()).toBe(false);
    });
  });

  describe('Multiple Selection', () => {
    let fixture: ComponentFixture<TestMultiSelectComponent>;
    let component: TestMultiSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMultiSelectComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMultiSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create with multiple mode', () => {
      expect(component.root.context.multiple).toBe(true);
    });

    it('should have aria-multiselectable on list', () => {
      const list = fixture.nativeElement.querySelector('[baseUiSelectList]');
      expect(list.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should not close after selection in multiple mode', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.item-apple');
      item.click();
      fixture.detectChanges();

      // Should stay open for multiple selections
      expect(component.root.isOpen()).toBe(true);
    });

    it('should toggle selection in multiple mode', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const apple = fixture.nativeElement.querySelector('.item-apple');
      apple.click();
      fixture.detectChanges();

      expect(component.root.context.value).toEqual(['apple']);

      apple.click();
      fixture.detectChanges();

      expect(component.root.context.value).toEqual([]);
    });

    it('should allow multiple items to be selected', () => {
      // First select apple
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const appleItem = fixture.nativeElement.querySelector('.item-apple');
      const bananaItem = fixture.nativeElement.querySelector('.item-banana');

      appleItem.click();
      fixture.detectChanges();

      bananaItem.click();
      fixture.detectChanges();

      expect(component.root.context.value).toEqual(['apple', 'banana']);
      expect(appleItem.getAttribute('aria-selected')).toBe('true');
      expect(bananaItem.getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('Select Groups', () => {
    let fixture: ComponentFixture<TestSelectWithGroupsComponent>;
    let component: TestSelectWithGroupsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectWithGroupsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectWithGroupsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render groups', () => {
      const groups = fixture.nativeElement.querySelectorAll('[baseUiSelectGroup]');
      expect(groups.length).toBe(2);
    });

    it('should have group role on groups', () => {
      const group = fixture.nativeElement.querySelector('[baseUiSelectGroup]');
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should have base-ui-select-group class', () => {
      const group = fixture.nativeElement.querySelector('.base-ui-select-group');
      expect(group).toBeTruthy();
    });

    it('should render group labels', () => {
      const labels = fixture.nativeElement.querySelectorAll('[baseUiSelectGroupLabel]');
      expect(labels.length).toBe(2);
    });

    it('should have base-ui-select-group-label class', () => {
      const label = fixture.nativeElement.querySelector('.base-ui-select-group-label');
      expect(label).toBeTruthy();
    });

    it('should link group to label via aria-labelledby', async () => {
      // Wait for afterNextRender to set the label ID
      await new Promise(resolve => setTimeout(resolve, 0));
      fixture.detectChanges();

      const group = fixture.nativeElement.querySelector('[baseUiSelectGroup]');
      const label = fixture.nativeElement.querySelector('.fruits-label');

      const labelId = label.getAttribute('id');
      expect(labelId).toBeTruthy();
      expect(group.getAttribute('aria-labelledby')).toBe(labelId);
    });
  });

  describe('Item Indicator', () => {
    let fixture: ComponentFixture<TestMultiSelectComponent>;
    let component: TestMultiSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestMultiSelectComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestMultiSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-select-item-indicator class', () => {
      const indicator = fixture.nativeElement.querySelector('.base-ui-select-item-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should have aria-hidden on indicator', () => {
      const indicator = fixture.nativeElement.querySelector('[baseUiSelectItemIndicator]');
      expect(indicator.getAttribute('aria-hidden')).toBe('true');
    });

    it('should show indicator when selected', () => {
      // Select apple by clicking
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const appleItem = fixture.nativeElement.querySelector('.item-apple');
      appleItem.click();
      fixture.detectChanges();

      const indicator = appleItem.querySelector('[baseUiSelectItemIndicator]');

      expect(indicator.hasAttribute('data-selected')).toBe(true);
    });
  });

  describe('Context API', () => {
    let fixture: ComponentFixture<TestSelectComponent>;
    let component: TestSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should expose open state', () => {
      expect(component.root.context.open).toBe(false);

      component.root.context.setOpen(true, 'mouse');
      fixture.detectChanges();

      expect(component.root.context.open).toBe(true);
    });

    it('should expose value state', () => {
      expect(component.root.context.value).toBe(null);

      component.root.context.setValue('apple');
      fixture.detectChanges();

      expect(component.root.context.value).toBe('apple');
    });

    it('should expose disabled state', () => {
      expect(component.root.context.disabled).toBe(false);

      component.disabled.set(true);
      fixture.detectChanges();

      expect(component.root.context.disabled).toBe(true);
    });

    it('should have rootId', () => {
      expect(component.root.context.rootId).toBeTruthy();
      expect(component.root.context.rootId).toContain('base-ui-select-');
    });

    it('should check hasSelectedValue', () => {
      expect(component.root.context.hasSelectedValue()).toBe(false);

      component.value.set('apple');
      fixture.detectChanges();

      expect(component.root.context.hasSelectedValue()).toBe(true);
    });
  });

  describe('Positioner', () => {
    let fixture: ComponentFixture<TestSelectComponent>;
    let component: TestSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-select-positioner class', () => {
      const positioner = fixture.nativeElement.querySelector('.base-ui-select-positioner');
      expect(positioner).toBeTruthy();
    });

    it('should have data-side attribute', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiSelectPositioner]');
      expect(positioner.getAttribute('data-side')).toBeTruthy();
    });

    it('should have data-align attribute', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiSelectPositioner]');
      expect(positioner.getAttribute('data-align')).toBeTruthy();
    });

    it('should be hidden when closed', () => {
      const positioner = fixture.nativeElement.querySelector('[baseUiSelectPositioner]');
      expect(positioner.style.display).toBe('none');
    });

    it('should be visible when open', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const positioner = fixture.nativeElement.querySelector('[baseUiSelectPositioner]');
      expect(positioner.style.display).not.toBe('none');
    });
  });

  describe('Popup', () => {
    let fixture: ComponentFixture<TestSelectComponent>;
    let component: TestSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-select-popup class', () => {
      const popup = fixture.nativeElement.querySelector('.base-ui-select-popup');
      expect(popup).toBeTruthy();
    });

    it('should have data-open when open', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const popup = fixture.nativeElement.querySelector('[baseUiSelectPopup]');
      expect(popup.hasAttribute('data-open')).toBe(true);
    });

    it('should handle keyboard navigation within popup', () => {
      const trigger = fixture.nativeElement.querySelector('[baseUiSelectTrigger]');
      trigger.click();
      fixture.detectChanges();

      const popup = fixture.nativeElement.querySelector('[baseUiSelectPopup]');
      popup.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      // First non-disabled item should be highlighted
      expect(component.root.context.highlightedValue()).toBe('apple');
    });
  });
});

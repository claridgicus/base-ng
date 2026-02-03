/**
 * @fileoverview Integration tests for @copied/base-ng components
 * Tests real-world component combinations and interactions
 */

import { Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

// Form Components
import { FieldRootDirective, FieldLabelDirective, FieldControlDirective, FieldErrorDirective } from './field';
import { InputDirective } from './input';
import { CheckboxRootDirective, CheckboxIndicatorDirective } from './checkbox';
import { SwitchRootDirective, SwitchThumbDirective } from './switch';
import { SliderRootDirective, SliderTrackDirective, SliderThumbDirective } from './slider';

// Overlay Components
import { DialogRootDirective, DialogTriggerDirective, DialogBackdropDirective, DialogPopupDirective, DialogTitleDirective, DialogDescriptionDirective, DialogCloseDirective } from './dialog';
import { TooltipRootDirective, TooltipTriggerDirective, TooltipPositionerDirective, TooltipPopupDirective } from './tooltip';

// Selection Components
import { TabsRootDirective, TabsListDirective, TabsTabDirective, TabsPanelDirective } from './tabs';
import { AccordionRootDirective, AccordionItemDirective, AccordionHeaderDirective, AccordionTriggerDirective, AccordionPanelDirective } from './accordion';
import { ToggleDirective } from './toggle';
import { ToggleGroupDirective } from './toggle-group';

// Menu Components
import { MenuRootDirective, MenuTriggerDirective, MenuPositionerDirective, MenuPopupDirective, MenuItemDirective, MenuGroupDirective, MenuGroupLabelDirective } from './menu';

// Notification
import { ToastProviderDirective, ToastViewportDirective, ToastRootDirective, ToastTitleDirective, ToastCloseDirective } from './toast';

describe('Integration Tests', () => {
  describe('Form with Input and Label', () => {
    @Component({
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        FieldControlDirective,
        InputDirective,
      ],
      template: `
        <div baseUiFieldRoot #fieldRoot="fieldRoot">
          <label baseUiFieldLabel>Email</label>
          <input baseUiInput baseUiFieldControl
                 [value]="email()"
                 (input)="onInput($event)"
                 type="email" />
        </div>
      `,
    })
    class FormWithInputComponent {
      @ViewChild('fieldRoot', { static: true }) fieldRoot!: FieldRootDirective;
      readonly email = signal('');

      onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.email.set(value);
      }
    }

    let fixture: ComponentFixture<FormWithInputComponent>;
    let component: FormWithInputComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormWithInputComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FormWithInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create field with input', () => {
      expect(component.fieldRoot).toBeTruthy();
      const input = fixture.nativeElement.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should have label for input', () => {
      const label = fixture.nativeElement.querySelector('.base-ui-field-label');
      expect(label).toBeTruthy();
      expect(label.textContent.trim()).toBe('Email');
    });

    it('should have proper class on input', () => {
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('base-ui-input')).toBe(true);
    });

    it('should update value on input', () => {
      const input = fixture.nativeElement.querySelector('input');
      input.value = 'test@example.com';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.email()).toBe('test@example.com');
    });
  });

  describe('Tabs Basic', () => {
    @Component({
      standalone: true,
      imports: [
        TabsRootDirective,
        TabsListDirective,
        TabsTabDirective,
        TabsPanelDirective,
      ],
      template: `
        <div baseUiTabsRoot #tabs="tabsRoot">
          <div baseUiTabsList>
            <button baseUiTab value="tab1">Tab 1</button>
            <button baseUiTab value="tab2">Tab 2</button>
          </div>
          <div baseUiTabsPanel value="tab1">Content 1</div>
          <div baseUiTabsPanel value="tab2">Content 2</div>
        </div>
      `,
    })
    class BasicTabsComponent {
      @ViewChild('tabs', { static: true }) tabs!: TabsRootDirective;
    }

    let fixture: ComponentFixture<BasicTabsComponent>;
    let component: BasicTabsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTabsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTabsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render tabs', () => {
      expect(component.tabs).toBeTruthy();
    });

    it('should have tabs list', () => {
      const list = fixture.nativeElement.querySelector('.base-ui-tabs-list');
      expect(list).toBeTruthy();
    });

    it('should have tab buttons', () => {
      const tabs = fixture.nativeElement.querySelectorAll('.base-ui-tab');
      expect(tabs.length).toBe(2);
    });
  });

  describe('Accordion Basic', () => {
    @Component({
      standalone: true,
      imports: [
        AccordionRootDirective,
        AccordionItemDirective,
        AccordionHeaderDirective,
        AccordionTriggerDirective,
        AccordionPanelDirective,
      ],
      template: `
        <div baseUiAccordionRoot #accordion="accordionRoot">
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
    })
    class BasicAccordionComponent {
      @ViewChild('accordion', { static: true }) accordion!: AccordionRootDirective;
    }

    let fixture: ComponentFixture<BasicAccordionComponent>;
    let component: BasicAccordionComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicAccordionComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicAccordionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render accordion', () => {
      expect(component.accordion).toBeTruthy();
    });

    it('should have accordion items', () => {
      const items = fixture.nativeElement.querySelectorAll('.base-ui-accordion-item');
      expect(items.length).toBe(2);
    });

    it('should have accordion triggers', () => {
      const triggers = fixture.nativeElement.querySelectorAll('.base-ui-accordion-trigger');
      expect(triggers.length).toBe(2);
    });
  });

  describe('Toggle Group with Multiple Toggles', () => {
    @Component({
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
      template: `
        <div baseUiToggleGroup #group="toggleGroup" [value]="selected()">
          @for (option of options(); track option.value) {
            <button
              baseUiToggle
              [value]="option.value"
              [disabled]="option.disabled"
              (click)="onSelect(option.value)">
              {{ option.label }}
            </button>
          }
        </div>
      `,
    })
    class ToggleGroupWithTogglesComponent {
      @ViewChild('group', { static: true }) group!: ToggleGroupDirective;
      readonly selected = signal<string[]>(['option1']);
      readonly options = signal([
        { value: 'option1', label: 'Option 1', disabled: false },
        { value: 'option2', label: 'Option 2', disabled: false },
        { value: 'option3', label: 'Option 3', disabled: true },
      ]);

      onSelect(value: string): void {
        this.selected.set([value]);
      }
    }

    let fixture: ComponentFixture<ToggleGroupWithTogglesComponent>;
    let component: ToggleGroupWithTogglesComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToggleGroupWithTogglesComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ToggleGroupWithTogglesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render toggle items', () => {
      const items = fixture.nativeElement.querySelectorAll('.base-ui-toggle');
      expect(items.length).toBe(3);
    });

    it('should change selection on click', () => {
      const items = fixture.nativeElement.querySelectorAll('.base-ui-toggle');
      items[1].click();
      fixture.detectChanges();

      expect(component.selected()).toContain('option2');
    });

    it('should have disabled state on third item', () => {
      const items = fixture.nativeElement.querySelectorAll('.base-ui-toggle');
      expect(items[2].hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Slider with Output', () => {
    @Component({
      standalone: true,
      imports: [SliderRootDirective, SliderTrackDirective, SliderThumbDirective],
      template: `
        <div baseUiSliderRoot #slider="sliderRoot"
             [value]="value()"
             [min]="min()"
             [max]="max()"
             [step]="step()">
          <div baseUiSliderTrack>
            <div baseUiSliderThumb></div>
          </div>
        </div>
        <output>{{ value() }}</output>
      `,
    })
    class SliderWithOutputComponent {
      @ViewChild('slider', { static: true }) slider!: SliderRootDirective;
      readonly value = signal(50);
      readonly min = signal(0);
      readonly max = signal(100);
      readonly step = signal(1);
    }

    let fixture: ComponentFixture<SliderWithOutputComponent>;
    let component: SliderWithOutputComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SliderWithOutputComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SliderWithOutputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render slider', () => {
      expect(component.slider).toBeTruthy();
      const track = fixture.nativeElement.querySelector('.base-ui-slider-track');
      expect(track).toBeTruthy();
    });

    it('should have slider thumb', () => {
      const thumb = fixture.nativeElement.querySelector('.base-ui-slider-thumb');
      expect(thumb).toBeTruthy();
    });

    it('should display current value', () => {
      const output = fixture.nativeElement.querySelector('output');
      expect(output.textContent).toBe('50');
    });
  });

  describe('Switch in Form', () => {
    @Component({
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        SwitchRootDirective,
        SwitchThumbDirective,
      ],
      template: `
        <div baseUiFieldRoot>
          <label baseUiFieldLabel>Enable notifications</label>
          <button baseUiSwitchRoot #switchRoot="switchRoot"
                  [checked]="enabled()"
                  (checkedChange)="enabled.set($event)">
            <span baseUiSwitchThumb></span>
          </button>
        </div>
      `,
    })
    class SwitchInFormComponent {
      @ViewChild('switchRoot', { static: true }) switch!: SwitchRootDirective;
      readonly enabled = signal(false);
    }

    let fixture: ComponentFixture<SwitchInFormComponent>;
    let component: SwitchInFormComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SwitchInFormComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SwitchInFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render switch within field', () => {
      const field = fixture.nativeElement.querySelector('.base-ui-field');
      const switchEl = fixture.nativeElement.querySelector('.base-ui-switch');
      expect(field).toBeTruthy();
      expect(switchEl).toBeTruthy();
    });

    it('should toggle switch state', () => {
      const switchEl = fixture.nativeElement.querySelector('.base-ui-switch');
      switchEl.click();
      fixture.detectChanges();

      expect(component.enabled()).toBe(true);
      expect(switchEl.getAttribute('data-checked')).toBe('');
    });

    it('should have label in same field', () => {
      const label = fixture.nativeElement.querySelector('.base-ui-field-label');
      expect(label).toBeTruthy();
      expect(label.textContent.trim()).toBe('Enable notifications');
    });
  });

  describe('Toast with Actions', () => {
    @Component({
      standalone: true,
      imports: [
        ToastProviderDirective,
        ToastViewportDirective,
        ToastRootDirective,
        ToastTitleDirective,
        ToastCloseDirective,
      ],
      template: `
        <div baseUiToastProvider #provider="toastProvider">
          <button class="show-toast" (click)="showToast()">Show Toast</button>
          <div baseUiToastViewport>
            @for (toast of provider.toasts(); track toast.id) {
              <div baseUiToastRoot [toast]="toast" (closed)="onClose()">
                <div baseUiToastTitle>{{ toast.title }}</div>
                <button baseUiToastClose>×</button>
              </div>
            }
          </div>
        </div>
      `,
    })
    class ToastWithActionsComponent {
      @ViewChild('provider', { static: true }) provider!: ToastProviderDirective;
      closedCount = 0;

      showToast(): void {
        this.provider.context.add({
          title: 'Test Toast',
          description: 'This is a test',
        });
      }

      onClose(): void {
        this.closedCount++;
      }
    }

    let fixture: ComponentFixture<ToastWithActionsComponent>;
    let component: ToastWithActionsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToastWithActionsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ToastWithActionsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create toast provider', () => {
      expect(component.provider).toBeTruthy();
    });

    it('should show toast on button click', () => {
      const button = fixture.nativeElement.querySelector('.show-toast');
      button.click();
      fixture.detectChanges();

      const toast = fixture.nativeElement.querySelector('.base-ui-toast-root');
      expect(toast).toBeTruthy();
    });

    it('should close toast via close button', () => {
      component.showToast();
      fixture.detectChanges();

      const closeBtn = fixture.nativeElement.querySelector('.base-ui-toast-close');
      closeBtn.click();
      fixture.detectChanges();

      const toast = component.provider.toasts()[0];
      expect(toast?.transitionStatus).toBe('ending');
    });
  });

  describe('Menu with Nested Groups', () => {
    @Component({
      standalone: true,
      imports: [
        MenuRootDirective,
        MenuTriggerDirective,
        MenuPositionerDirective,
        MenuPopupDirective,
        MenuItemDirective,
        MenuGroupDirective,
        MenuGroupLabelDirective,
      ],
      template: `
        <div baseUiMenuRoot #menu="menuRoot">
          <button baseUiMenuTrigger>Open Menu</button>
          <div baseUiMenuPositioner>
            <div baseUiMenuPopup>
              <div baseUiMenuGroup>
                <div baseUiMenuGroupLabel>Actions</div>
                <button baseUiMenuItem (click)="onAction('edit')">Edit</button>
                <button baseUiMenuItem (click)="onAction('copy')">Copy</button>
              </div>
              <div baseUiMenuGroup>
                <div baseUiMenuGroupLabel>Danger Zone</div>
                <button baseUiMenuItem (click)="onAction('delete')">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `,
    })
    class NestedMenuComponent {
      @ViewChild('menu', { static: true }) menu!: MenuRootDirective;
      actions: string[] = [];

      onAction(action: string): void {
        this.actions.push(action);
      }
    }

    let fixture: ComponentFixture<NestedMenuComponent>;
    let component: NestedMenuComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NestedMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(NestedMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render menu structure', () => {
      expect(component.menu).toBeTruthy();
      const trigger = fixture.nativeElement.querySelector('.base-ui-menu-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should have menu groups', () => {
      const groups = fixture.nativeElement.querySelectorAll('.base-ui-menu-group');
      expect(groups.length).toBe(2);
    });

    it('should have group labels', () => {
      const labels = fixture.nativeElement.querySelectorAll('.base-ui-menu-group-label');
      expect(labels.length).toBe(2);
      expect(labels[0].textContent).toBe('Actions');
      expect(labels[1].textContent).toBe('Danger Zone');
    });

    it('should execute menu item actions', () => {
      const items = fixture.nativeElement.querySelectorAll('.base-ui-menu-item');
      items[0].click();
      fixture.detectChanges();

      expect(component.actions).toContain('edit');
    });
  });

  describe('Tooltip with Button', () => {
    @Component({
      standalone: true,
      imports: [
        TooltipRootDirective,
        TooltipTriggerDirective,
        TooltipPositionerDirective,
        TooltipPopupDirective,
      ],
      template: `
        <div baseUiTooltipRoot #tooltip="tooltipRoot">
          <button baseUiTooltipTrigger>Hover me</button>
          <div baseUiTooltipPositioner>
            <div baseUiTooltipPopup>
              Helpful information
            </div>
          </div>
        </div>
      `,
    })
    class TooltipWithButtonComponent {
      @ViewChild('tooltip', { static: true }) tooltip!: TooltipRootDirective;
    }

    let fixture: ComponentFixture<TooltipWithButtonComponent>;
    let component: TooltipWithButtonComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TooltipWithButtonComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TooltipWithButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render tooltip', () => {
      expect(component.tooltip).toBeTruthy();
      const trigger = fixture.nativeElement.querySelector('.base-ui-tooltip-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should have popup content', () => {
      const popup = fixture.nativeElement.querySelector('.base-ui-tooltip-popup');
      expect(popup).toBeTruthy();
      expect(popup.textContent.trim()).toBe('Helpful information');
    });

    it('should be hidden by default', () => {
      const positioner = fixture.nativeElement.querySelector('.base-ui-tooltip-positioner');
      expect(positioner.style.display === 'none' || positioner.hasAttribute('hidden')).toBe(true);
    });
  });

  describe('Dialog with Basic Content', () => {
    @Component({
      standalone: true,
      imports: [
        DialogRootDirective,
        DialogTriggerDirective,
        DialogBackdropDirective,
        DialogPopupDirective,
        DialogTitleDirective,
        DialogDescriptionDirective,
        DialogCloseDirective,
      ],
      template: `
        <div baseUiDialogRoot #dialog="dialogRoot">
          <button baseUiDialogTrigger>Open Dialog</button>
          @if (dialog.internalOpen()) {
            <div baseUiDialogBackdrop></div>
            <div baseUiDialogPopup>
              <h2 baseUiDialogTitle>Dialog Title</h2>
              <p baseUiDialogDescription>Dialog content goes here.</p>
              <button baseUiDialogClose>Close</button>
            </div>
          }
        </div>
      `,
    })
    class BasicDialogComponent {
      @ViewChild('dialog', { static: true }) dialog!: DialogRootDirective;
    }

    let fixture: ComponentFixture<BasicDialogComponent>;
    let component: BasicDialogComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicDialogComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render dialog trigger', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-dialog-trigger');
      expect(trigger).toBeTruthy();
    });

    it('should open dialog on trigger click', () => {
      const trigger = fixture.nativeElement.querySelector('.base-ui-dialog-trigger');
      trigger.click();
      fixture.detectChanges();

      expect(component.dialog.internalOpen()).toBe(true);
    });

    it('should close dialog on close button click', () => {
      // Open dialog
      const trigger = fixture.nativeElement.querySelector('.base-ui-dialog-trigger');
      trigger.click();
      fixture.detectChanges();

      // Close dialog
      const closeBtn = fixture.nativeElement.querySelector('.base-ui-dialog-close');
      closeBtn.click();
      fixture.detectChanges();

      expect(component.dialog.internalOpen()).toBe(false);
    });
  });

  describe('Checkbox with Label', () => {
    @Component({
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        CheckboxRootDirective,
        CheckboxIndicatorDirective,
      ],
      template: `
        <div baseUiFieldRoot>
          <button baseUiCheckboxRoot #checkbox="checkboxRoot"
                  [checked]="checked()"
                  (checkedChange)="checked.set($event)">
            <span baseUiCheckboxIndicator></span>
          </button>
          <label baseUiFieldLabel>I agree to the terms</label>
        </div>
      `,
    })
    class CheckboxWithLabelComponent {
      @ViewChild('checkbox', { static: true }) checkbox!: CheckboxRootDirective;
      readonly checked = signal(false);
    }

    let fixture: ComponentFixture<CheckboxWithLabelComponent>;
    let component: CheckboxWithLabelComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CheckboxWithLabelComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CheckboxWithLabelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render checkbox with label', () => {
      const checkbox = fixture.nativeElement.querySelector('.base-ui-checkbox');
      const label = fixture.nativeElement.querySelector('.base-ui-field-label');
      expect(checkbox).toBeTruthy();
      expect(label).toBeTruthy();
    });

    it('should toggle checkbox on click', () => {
      const checkbox = fixture.nativeElement.querySelector('.base-ui-checkbox');
      checkbox.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should have role checkbox', () => {
      const checkbox = fixture.nativeElement.querySelector('.base-ui-checkbox');
      expect(checkbox.getAttribute('role')).toBe('checkbox');
    });
  });

  describe('Accessibility Integration', () => {
    @Component({
      standalone: true,
      imports: [
        FieldRootDirective,
        FieldLabelDirective,
        FieldControlDirective,
        InputDirective,
        CheckboxRootDirective,
        CheckboxIndicatorDirective,
      ],
      template: `
        <form>
          <div baseUiFieldRoot>
            <label baseUiFieldLabel>Email Address</label>
            <input baseUiInput baseUiFieldControl type="email" />
          </div>

          <div baseUiFieldRoot>
            <button baseUiCheckboxRoot>
              <span baseUiCheckboxIndicator></span>
            </button>
            <label baseUiFieldLabel>I agree to terms</label>
          </div>
        </form>
      `,
    })
    class AccessibilityFormComponent {}

    let fixture: ComponentFixture<AccessibilityFormComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccessibilityFormComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AccessibilityFormComponent);
      fixture.detectChanges();
    });

    it('should have accessible labels', () => {
      const labels = fixture.nativeElement.querySelectorAll('.base-ui-field-label');
      labels.forEach((label: HTMLElement) => {
        expect(label.getAttribute('id')).toBeTruthy();
      });
    });

    it('should link controls to labels', () => {
      const input = fixture.nativeElement.querySelector('input');
      const labelId = input.getAttribute('aria-labelledby');
      const label = fixture.nativeElement.querySelector(`#${labelId}`);
      expect(label).toBeTruthy();
    });

    it('should mark checkbox with role', () => {
      const checkbox = fixture.nativeElement.querySelector('.base-ui-checkbox');
      expect(checkbox.getAttribute('role')).toBe('checkbox');
    });
  });
});

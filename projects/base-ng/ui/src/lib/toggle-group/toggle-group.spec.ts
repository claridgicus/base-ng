/**
 * @fileoverview Tests for ToggleGroup component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toggle-group/ToggleGroup.test.tsx
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { ToggleGroupDirective } from './toggle-group.directive';
import { ToggleDirective } from '../toggle';

describe('ToggleGroup component', () => {
  describe('Single selection mode', () => {
    @Component({
      template: `
        <div baseUiToggleGroup [(value)]="value">
          <button baseUiToggle value="bold">Bold</button>
          <button baseUiToggle value="italic">Italic</button>
          <button baseUiToggle value="underline">Underline</button>
        </div>
      `,
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
    })
    class TestComponent {
      value = signal<string[]>([]);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let group: HTMLElement;
    let toggles: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      group = fixture.nativeElement.querySelector('[baseUiToggleGroup]');
      toggles = fixture.nativeElement.querySelectorAll('[baseUiToggle]');
    });

    it('should render toggle group', () => {
      expect(group).toBeTruthy();
      expect(toggles.length).toBe(3);
    });

    it('should have role="group"', () => {
      expect(group.getAttribute('role')).toBe('group');
    });

    it('should have horizontal orientation by default', () => {
      expect(group.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should select toggle on click', () => {
      toggles[0].click();
      fixture.detectChanges();

      expect(component.value()).toEqual(['bold']);
      expect(toggles[0].getAttribute('aria-pressed')).toBe('true');
    });

    it('should replace selection in single mode', () => {
      toggles[0].click();
      fixture.detectChanges();

      expect(component.value()).toEqual(['bold']);

      toggles[1].click();
      fixture.detectChanges();

      expect(component.value()).toEqual(['italic']);
      expect(toggles[0].getAttribute('aria-pressed')).toBe('false');
      expect(toggles[1].getAttribute('aria-pressed')).toBe('true');
    });

    it('should deselect on second click', () => {
      toggles[0].click();
      fixture.detectChanges();

      expect(component.value()).toEqual(['bold']);

      toggles[0].click();
      fixture.detectChanges();

      expect(component.value()).toEqual([]);
      expect(toggles[0].getAttribute('aria-pressed')).toBe('false');
    });
  });

  describe('Multiple selection mode', () => {
    @Component({
      template: `
        <div baseUiToggleGroup [(value)]="value" [multiple]="true">
          <button baseUiToggle value="bold">Bold</button>
          <button baseUiToggle value="italic">Italic</button>
          <button baseUiToggle value="underline">Underline</button>
        </div>
      `,
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
    })
    class TestComponent {
      value = signal<string[]>([]);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let toggles: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      toggles = fixture.nativeElement.querySelectorAll('[baseUiToggle]');
    });

    it('should allow multiple selections', () => {
      toggles[0].click();
      fixture.detectChanges();

      toggles[1].click();
      fixture.detectChanges();

      expect(component.value()).toContain('bold');
      expect(component.value()).toContain('italic');
      expect(toggles[0].getAttribute('aria-pressed')).toBe('true');
      expect(toggles[1].getAttribute('aria-pressed')).toBe('true');
    });

    it('should deselect individual toggles', () => {
      toggles[0].click();
      toggles[1].click();
      fixture.detectChanges();

      expect(component.value()).toEqual(['bold', 'italic']);

      toggles[0].click();
      fixture.detectChanges();

      expect(component.value()).toEqual(['italic']);
      expect(toggles[0].getAttribute('aria-pressed')).toBe('false');
      expect(toggles[1].getAttribute('aria-pressed')).toBe('true');
    });

    it('should allow selecting all toggles', () => {
      toggles[0].click();
      toggles[1].click();
      toggles[2].click();
      fixture.detectChanges();

      expect(component.value()).toContain('bold');
      expect(component.value()).toContain('italic');
      expect(component.value()).toContain('underline');
    });
  });

  describe('Disabled group', () => {
    @Component({
      template: `
        <div baseUiToggleGroup [(value)]="value" [disabled]="true">
          <button baseUiToggle value="bold">Bold</button>
          <button baseUiToggle value="italic">Italic</button>
        </div>
      `,
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
    })
    class TestComponent {
      value = signal<string[]>([]);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let group: HTMLElement;
    let toggles: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      group = fixture.nativeElement.querySelector('[baseUiToggleGroup]');
      toggles = fixture.nativeElement.querySelectorAll('[baseUiToggle]');
    });

    it('should have data-disabled on group', () => {
      expect(group.hasAttribute('data-disabled')).toBe(true);
    });

    it('should have disabled class on group', () => {
      expect(group.classList.contains('base-ui-toggle-group-disabled')).toBe(true);
    });

    it('should disable all toggles', () => {
      expect(toggles[0].hasAttribute('disabled')).toBe(true);
      expect(toggles[1].hasAttribute('disabled')).toBe(true);
    });

    it('should not select when disabled', () => {
      toggles[0].click();
      fixture.detectChanges();

      expect(component.value()).toEqual([]);
    });
  });

  describe('Vertical orientation', () => {
    @Component({
      template: `
        <div baseUiToggleGroup [(value)]="value" orientation="vertical">
          <button baseUiToggle value="bold">Bold</button>
          <button baseUiToggle value="italic">Italic</button>
        </div>
      `,
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
    })
    class TestComponent {
      value = signal<string[]>([]);
    }

    let fixture: ComponentFixture<TestComponent>;
    let group: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      group = fixture.nativeElement.querySelector('[baseUiToggleGroup]');
    });

    it('should have vertical orientation', () => {
      expect(group.getAttribute('aria-orientation')).toBe('vertical');
      expect(group.getAttribute('data-orientation')).toBe('vertical');
    });

    it('should have vertical class', () => {
      expect(group.classList.contains('base-ui-toggle-group-vertical')).toBe(true);
      expect(group.classList.contains('base-ui-toggle-group-horizontal')).toBe(false);
    });
  });

  describe('Initial value', () => {
    @Component({
      template: `
        <div baseUiToggleGroup [value]="['bold', 'italic']" [multiple]="true">
          <button baseUiToggle value="bold">Bold</button>
          <button baseUiToggle value="italic">Italic</button>
          <button baseUiToggle value="underline">Underline</button>
        </div>
      `,
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let toggles: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      toggles = fixture.nativeElement.querySelectorAll('[baseUiToggle]');
    });

    it('should reflect initial value', () => {
      expect(toggles[0].getAttribute('aria-pressed')).toBe('true');
      expect(toggles[1].getAttribute('aria-pressed')).toBe('true');
      expect(toggles[2].getAttribute('aria-pressed')).toBe('false');
    });
  });

  describe('valueChange output', () => {
    @Component({
      template: `
        <div baseUiToggleGroup
             [value]="value()"
             (valueChange)="onValueChange($event)"
             [multiple]="true">
          <button baseUiToggle value="bold">Bold</button>
          <button baseUiToggle value="italic">Italic</button>
        </div>
      `,
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
    })
    class TestComponent {
      value = signal<string[]>([]);
      valueChangeSpy = vi.fn();

      onValueChange(newValue: string[]): void {
        this.valueChangeSpy(newValue);
        this.value.set(newValue);
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let toggles: NodeListOf<HTMLElement>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      toggles = fixture.nativeElement.querySelectorAll('[baseUiToggle]');
    });

    it('should emit valueChange when toggle clicked', () => {
      toggles[0].click();
      fixture.detectChanges();

      expect(component.valueChangeSpy).toHaveBeenCalledWith(['bold']);
    });

    it('should emit correct values on multiple clicks', () => {
      toggles[0].click();
      fixture.detectChanges();

      toggles[1].click();
      fixture.detectChanges();

      expect(component.valueChangeSpy).toHaveBeenCalledTimes(2);
      expect(component.valueChangeSpy).toHaveBeenNthCalledWith(1, ['bold']);
      expect(component.valueChangeSpy).toHaveBeenNthCalledWith(2, ['bold', 'italic']);
    });
  });

  describe('Programmatic API', () => {
    @Component({
      template: `
        <div baseUiToggleGroup [(value)]="value" [multiple]="true" #group="toggleGroup">
          <button baseUiToggle value="bold">Bold</button>
          <button baseUiToggle value="italic">Italic</button>
        </div>
      `,
      standalone: true,
      imports: [ToggleGroupDirective, ToggleDirective],
    })
    class TestComponent {
      value = signal<string[]>([]);
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let groupDirective: ToggleGroupDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      groupDirective = fixture.debugElement.children[0].injector.get(ToggleGroupDirective);
    });

    it('should check if value is selected', () => {
      expect(groupDirective.isSelected('bold')).toBe(false);

      component.value.set(['bold']);
      fixture.detectChanges();

      expect(groupDirective.isSelected('bold')).toBe(true);
    });

    it('should select value programmatically', () => {
      groupDirective.select('bold');
      fixture.detectChanges();

      expect(component.value()).toContain('bold');
    });

    it('should deselect value programmatically', () => {
      component.value.set(['bold', 'italic']);
      fixture.detectChanges();

      groupDirective.deselect('bold');
      fixture.detectChanges();

      expect(component.value()).toEqual(['italic']);
    });

    it('should clear all selections', () => {
      component.value.set(['bold', 'italic']);
      fixture.detectChanges();

      groupDirective.clear();
      fixture.detectChanges();

      expect(component.value()).toEqual([]);
    });
  });
});

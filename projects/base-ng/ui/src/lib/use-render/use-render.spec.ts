/**
 * @fileoverview Tests for use-render module
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/use-render/useRender.spec.tsx
 */
import { Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import {
  applyStateAttributes,
  computeStateAttributes,
  createRenderContext,
  isComponentType,
  isTemplateRef,
  RenderElementDirective,
  removeStateAttributes,
} from './index';

describe('computeStateAttributes', () => {
  it('should convert boolean true to empty data attribute', () => {
    expect(computeStateAttributes({ disabled: true })).toEqual({ 'data-disabled': '' });
  });

  it('should convert truthy values to data attribute with value', () => {
    expect(computeStateAttributes({ status: 'active' })).toEqual({ 'data-status': 'active' });
  });

  it('should not include falsy values', () => {
    expect(computeStateAttributes({ disabled: false })).toEqual({});
    expect(computeStateAttributes({ value: '' })).toEqual({});
  });

  it('should use custom mapping if provided', () => {
    const customMapping = {
      status: (value: unknown) => (value === 'active' ? { 'data-is-active': '' } : null),
    };
    expect(computeStateAttributes({ status: 'active' }, customMapping)).toEqual({
      'data-is-active': '',
    });
  });
});

describe('applyStateAttributes', () => {
  it('should apply attributes to element', () => {
    const element = document.createElement('div');
    applyStateAttributes(element, { disabled: true, status: 'active' });

    expect(element.getAttribute('data-disabled')).toBe('');
    expect(element.getAttribute('data-status')).toBe('active');
  });

  it('should work with custom mapping', () => {
    const element = document.createElement('div');
    const mapping = {
      open: (value: unknown) => (value ? { 'data-open': '', 'aria-expanded': 'true' } : null),
    };
    applyStateAttributes(element, { open: true }, mapping);

    expect(element.getAttribute('data-open')).toBe('');
    expect(element.getAttribute('aria-expanded')).toBe('true');
  });
});

describe('removeStateAttributes', () => {
  it('should remove attributes from element', () => {
    const element = document.createElement('div');
    element.setAttribute('data-disabled', '');
    element.setAttribute('data-status', 'active');

    removeStateAttributes(element, { disabled: true, status: 'active' });

    expect(element.hasAttribute('data-disabled')).toBe(false);
    expect(element.hasAttribute('data-status')).toBe(false);
  });
});

describe('createRenderContext', () => {
  it('should create context with state', () => {
    const state = { active: true, count: 5 };
    const dataAttributes = { 'data-active': '', 'data-count': '5' };
    const context = createRenderContext(state, dataAttributes);

    expect(context.$implicit).toBe(state);
    expect(context.state).toBe(state);
    expect(context.dataAttributes).toBe(dataAttributes);
  });

  it('should include additional context', () => {
    const state = { active: true };
    const dataAttributes = { 'data-active': '' };
    const context = createRenderContext(state, dataAttributes, { extra: 'value' });

    expect(context['extra']).toBe('value');
  });
});

describe('isTemplateRef', () => {
  it('should return false for non-TemplateRef values', () => {
    expect(isTemplateRef(null)).toBe(false);
    expect(isTemplateRef(undefined)).toBe(false);
    expect(isTemplateRef('string')).toBe(false);
    expect(isTemplateRef({})).toBe(false);
    expect(isTemplateRef(() => {})).toBe(false);
  });
});

describe('isComponentType', () => {
  it('should return true for class functions', () => {
    class TestComponent {}
    expect(isComponentType(TestComponent)).toBe(true);
  });

  it('should return false for non-class values', () => {
    expect(isComponentType(null)).toBe(false);
    expect(isComponentType(undefined)).toBe(false);
    expect(isComponentType('string')).toBe(false);
    expect(isComponentType({})).toBe(false);
  });
});

describe('RenderElementDirective', () => {
  @Component({
    template: `<div [baseUiState]="state()"></div>`,
    standalone: true,
    imports: [RenderElementDirective],
  })
  class TestComponent {
    state = signal<Record<string, unknown>>({ disabled: false, status: '' });
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should not apply attributes for falsy values', () => {
    expect(element.hasAttribute('data-disabled')).toBe(false);
    expect(element.hasAttribute('data-status')).toBe(false);
  });

  it('should apply attributes when state changes to truthy values', () => {
    component.state.set({ disabled: true, status: 'active' });
    fixture.detectChanges();

    expect(element.getAttribute('data-disabled')).toBe('');
    expect(element.getAttribute('data-status')).toBe('active');
  });

  it('should remove attributes when state changes to falsy values', () => {
    // First set truthy
    component.state.set({ disabled: true, status: 'active' });
    fixture.detectChanges();
    expect(element.hasAttribute('data-disabled')).toBe(true);

    // Then set falsy
    component.state.set({ disabled: false, status: '' });
    fixture.detectChanges();
    expect(element.hasAttribute('data-disabled')).toBe(false);
  });

  it('should update attributes reactively', () => {
    component.state.set({ count: 1 });
    fixture.detectChanges();
    expect(element.getAttribute('data-count')).toBe('1');

    component.state.set({ count: 2 });
    fixture.detectChanges();
    expect(element.getAttribute('data-count')).toBe('2');

    component.state.set({ count: 3 });
    fixture.detectChanges();
    expect(element.getAttribute('data-count')).toBe('3');
  });
});

describe('RenderElementDirective with custom mapping', () => {
  @Component({
    template: `<div [baseUiState]="state()" [stateMapping]="mapping"></div>`,
    standalone: true,
    imports: [RenderElementDirective],
  })
  class TestWithMappingComponent {
    state = signal<Record<string, unknown>>({ open: true });
    mapping = {
      open: (value: unknown): Record<string, string> | null =>
        value ? { 'data-state': 'open', 'aria-expanded': 'true' } : { 'data-state': 'closed' },
    };
  }

  let fixture: ComponentFixture<TestWithMappingComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWithMappingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWithMappingComponent);
    element = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should apply custom mapped attributes', () => {
    expect(element.getAttribute('data-state')).toBe('open');
    expect(element.getAttribute('aria-expanded')).toBe('true');
  });
});

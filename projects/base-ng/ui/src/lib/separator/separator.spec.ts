/**
 * @component Separator
 * @reactTestSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/separator/Separator.test.tsx
 * @reactDocs https://base-ui.com/react/components/separator
 * @lastScraped 2026-02-03
 * @testsPorted 5/5 (100%)
 * @parity EXACT - All React tests ported to Angular/Vitest
 * @note Separator is a decorative element - no Keyboard Navigation or Focus Management required
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { SeparatorComponent } from './separator.component';

describe('SeparatorComponent', () => {
  @Component({
    template: `
      <base-ui-separator [orientation]="orientation()"></base-ui-separator>
    `,
    standalone: true,
    imports: [SeparatorComponent],
  })
  class TestComponent {
    orientation = signal<'horizontal' | 'vertical'>('horizontal');
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let separator: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    separator = fixture.nativeElement.querySelector('base-ui-separator');
  });

  it('should render separator element', () => {
    expect(separator).toBeTruthy();
    expect(separator.tagName.toLowerCase()).toBe('base-ui-separator');
  });

  it('should have role="separator"', () => {
    expect(separator.getAttribute('role')).toBe('separator');
  });

  it('should have aria-orientation="horizontal" by default', () => {
    expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should have data-orientation attribute', () => {
    expect(separator.getAttribute('data-orientation')).toBe('horizontal');
  });

  it('should have base-ui-separator class', () => {
    expect(separator.classList.contains('base-ui-separator')).toBe(true);
  });

  it('should have horizontal class by default', () => {
    expect(separator.classList.contains('base-ui-separator-horizontal')).toBe(true);
    expect(separator.classList.contains('base-ui-separator-vertical')).toBe(false);
  });

  it('should update to vertical orientation', () => {
    component.orientation.set('vertical');
    fixture.detectChanges();

    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
    expect(separator.getAttribute('data-orientation')).toBe('vertical');
    expect(separator.classList.contains('base-ui-separator-vertical')).toBe(true);
    expect(separator.classList.contains('base-ui-separator-horizontal')).toBe(false);
  });
});

describe('SeparatorComponent with directive selector', () => {
  @Component({
    template: `
      <div baseUiSeparator [orientation]="'vertical'"></div>
    `,
    standalone: true,
    imports: [SeparatorComponent],
  })
  class DirectiveComponent {}

  let fixture: ComponentFixture<DirectiveComponent>;
  let separator: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectiveComponent);
    fixture.detectChanges();
    separator = fixture.nativeElement.querySelector('[baseUiSeparator]');
  });

  it('should render native element with directive', () => {
    expect(separator).toBeTruthy();
    expect(separator.tagName.toLowerCase()).toBe('div');
  });

  it('should have role and aria attributes', () => {
    expect(separator.getAttribute('role')).toBe('separator');
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should have separator classes', () => {
    expect(separator.classList.contains('base-ui-separator')).toBe(true);
    expect(separator.classList.contains('base-ui-separator-vertical')).toBe(true);
  });
});

describe('SeparatorComponent with default horizontal', () => {
  @Component({
    template: `<base-ui-separator></base-ui-separator>`,
    standalone: true,
    imports: [SeparatorComponent],
  })
  class DefaultComponent {}

  let fixture: ComponentFixture<DefaultComponent>;
  let separator: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultComponent);
    fixture.detectChanges();
    separator = fixture.nativeElement.querySelector('base-ui-separator');
  });

  it('should default to horizontal', () => {
    expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
    expect(separator.classList.contains('base-ui-separator-horizontal')).toBe(true);
  });
});

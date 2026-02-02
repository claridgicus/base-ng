/**
 * @fileoverview Tests for Toast component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast
 */

import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToastManagerService } from './toast-manager.service';
import { ToastProviderDirective } from './toast-provider.directive';
import { ToastViewportDirective } from './toast-viewport.directive';
import { ToastRootDirective } from './toast-root.directive';
import { ToastTitleDirective } from './toast-title.directive';
import { ToastDescriptionDirective } from './toast-description.directive';
import { ToastCloseDirective } from './toast-close.directive';
import { ToastActionDirective } from './toast-action.directive';
import { ToastObject } from './toast.types';

@Component({
  standalone: true,
  imports: [
    ToastProviderDirective,
    ToastViewportDirective,
    ToastRootDirective,
    ToastTitleDirective,
    ToastDescriptionDirective,
    ToastCloseDirective,
    ToastActionDirective,
  ],
  template: `
    <div baseUiToastProvider #provider="toastProvider" [timeout]="timeout()" [limit]="limit()">
      <div baseUiToastViewport class="viewport">
        @for (toast of provider.toasts(); track toast.id) {
          <div baseUiToastRoot #root="toastRoot" [toast]="toast" class="toast" (closed)="onClosed(toast)">
            <div baseUiToastTitle class="title">{{ toast.title }}</div>
            <div baseUiToastDescription class="description">{{ toast.description }}</div>
            <button baseUiToastClose class="close">×</button>
            <button baseUiToastAction class="action" (actionClick)="onAction(toast)">Action</button>
          </div>
        }
      </div>
    </div>
  `,
})
class TestToastComponent {
  @ViewChild('provider', { static: true }) provider!: ToastProviderDirective;
  readonly timeout = signal(5000);
  readonly limit = signal(3);
  closedToasts: ToastObject[] = [];
  actionedToasts: ToastObject[] = [];

  onClosed(toast: ToastObject): void {
    this.closedToasts.push(toast);
  }

  onAction(toast: ToastObject): void {
    this.actionedToasts.push(toast);
  }
}

describe('Toast', () => {
  describe('ToastManager Service', () => {
    let service: ToastManagerService;

    beforeEach(() => {
      service = new ToastManagerService();
    });

    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('should add a toast and return an id', () => {
      const id = service.add({ title: 'Test' });
      expect(id).toBeTruthy();
    });

    it('should use custom id if provided', () => {
      const id = service.add({ id: 'custom-id', title: 'Test' });
      expect(id).toBe('custom-id');
    });

    it('should emit add event to subscribers', () => {
      const listener = vi.fn();
      service.subscribe(listener);

      service.add({ title: 'Test' });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'add',
          toast: expect.objectContaining({ title: 'Test' }),
        })
      );
    });

    it('should emit close event', () => {
      const listener = vi.fn();
      service.subscribe(listener);

      service.close('test-id');

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'close',
          toast: expect.objectContaining({ id: 'test-id' }),
        })
      );
    });

    it('should emit update event', () => {
      const listener = vi.fn();
      service.subscribe(listener);

      service.update({ id: 'test-id', title: 'Updated' });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'update',
          options: expect.objectContaining({ id: 'test-id', title: 'Updated' }),
        })
      );
    });

    it('should unsubscribe correctly', () => {
      const listener = vi.fn();
      const unsubscribe = service.subscribe(listener);

      unsubscribe();
      service.add({ title: 'Test' });

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('Toast Provider', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;
    let toastManager: ToastManagerService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestToastComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestToastComponent);
      component = fixture.componentInstance;
      toastManager = TestBed.inject(ToastManagerService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.provider).toBeTruthy();
    });

    it('should have base-ui-toast-provider class', () => {
      const provider = fixture.nativeElement.querySelector('.base-ui-toast-provider');
      expect(provider).toBeTruthy();
    });

    it('should add toast via context', () => {
      component.provider.context.add({ title: 'Test Toast' });
      fixture.detectChanges();

      expect(component.provider.toasts().length).toBe(1);
    });

    it('should render toast in viewport', () => {
      component.provider.context.add({ title: 'Test Toast' });
      fixture.detectChanges();

      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast).toBeTruthy();
    });

    it('should close toast via context', () => {
      const id = component.provider.context.add({ title: 'Test Toast' });
      fixture.detectChanges();

      component.provider.context.close(id);
      fixture.detectChanges();

      // Toast should be in ending state
      const toasts = component.provider.toasts();
      expect(toasts[0]?.transitionStatus).toBe('ending');
    });

    it('should limit visible toasts', () => {
      component.limit.set(2);
      fixture.detectChanges();

      component.provider.context.add({ title: 'Toast 1' });
      component.provider.context.add({ title: 'Toast 2' });
      component.provider.context.add({ title: 'Toast 3' });
      fixture.detectChanges();

      const toasts = component.provider.toasts();
      const limitedCount = toasts.filter((t) => t.limited).length;
      expect(limitedCount).toBe(1);
    });

    it('should respond to external toast manager', () => {
      toastManager.add({ title: 'External Toast' });
      fixture.detectChanges();

      expect(component.provider.toasts().length).toBe(1);
    });
  });

  describe('Toast Viewport', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestToastComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-toast-viewport class', () => {
      const viewport = fixture.nativeElement.querySelector('.viewport');
      expect(viewport.classList.contains('base-ui-toast-viewport')).toBe(true);
    });

    it('should have role="region"', () => {
      const viewport = fixture.nativeElement.querySelector('.viewport');
      expect(viewport.getAttribute('role')).toBe('region');
    });

    it('should have aria-live="polite"', () => {
      const viewport = fixture.nativeElement.querySelector('.viewport');
      expect(viewport.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-label', () => {
      const viewport = fixture.nativeElement.querySelector('.viewport');
      expect(viewport.getAttribute('aria-label')).toBe('Notifications');
    });

    it('should pause timers on hover', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const viewport = fixture.nativeElement.querySelector('.viewport');
      viewport.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(component.provider.hovering()).toBe(true);
    });

    it('should resume timers on mouse leave', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const viewport = fixture.nativeElement.querySelector('.viewport');
      viewport.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      viewport.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(component.provider.hovering()).toBe(false);
    });
  });

  describe('Toast Root', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestToastComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render toast with base-ui-toast-root class', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const toast = fixture.nativeElement.querySelector('.base-ui-toast-root');
      expect(toast).toBeTruthy();
    });

    it('should have role="dialog" for normal priority', () => {
      component.provider.context.add({ title: 'Test', priority: 'normal' });
      fixture.detectChanges();

      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast.getAttribute('role')).toBe('dialog');
    });

    it('should have role="alertdialog" for high priority', () => {
      component.provider.context.add({ title: 'Test', priority: 'high' });
      fixture.detectChanges();

      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast.getAttribute('role')).toBe('alertdialog');
    });

    it('should have data-type attribute', () => {
      component.provider.context.add({ title: 'Test', type: 'success' });
      fixture.detectChanges();

      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast.getAttribute('data-type')).toBe('success');
    });

    it('should have data-transition-status', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast.hasAttribute('data-transition-status')).toBe(true);
    });
  });

  describe('Toast Title', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestToastComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-toast-title class', () => {
      component.provider.context.add({ title: 'Test Title' });
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.base-ui-toast-title');
      expect(title).toBeTruthy();
    });

    it('should render title text', () => {
      component.provider.context.add({ title: 'Test Title' });
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.title');
      expect(title.textContent).toBe('Test Title');
    });

    it('should have id for aria-labelledby', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.title');
      expect(title.getAttribute('id')).toContain('toast-title');
    });
  });

  describe('Toast Description', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestToastComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-toast-description class', () => {
      component.provider.context.add({ title: 'Test', description: 'Test Description' });
      fixture.detectChanges();

      const desc = fixture.nativeElement.querySelector('.base-ui-toast-description');
      expect(desc).toBeTruthy();
    });

    it('should render description text', () => {
      component.provider.context.add({ title: 'Test', description: 'Test Description' });
      fixture.detectChanges();

      const desc = fixture.nativeElement.querySelector('.description');
      expect(desc.textContent).toBe('Test Description');
    });

    it('should have id for aria-describedby', () => {
      component.provider.context.add({ title: 'Test', description: 'Test' });
      fixture.detectChanges();

      const desc = fixture.nativeElement.querySelector('.description');
      expect(desc.getAttribute('id')).toContain('toast-description');
    });
  });

  describe('Toast Close', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestToastComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-toast-close class', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const close = fixture.nativeElement.querySelector('.base-ui-toast-close');
      expect(close).toBeTruthy();
    });

    it('should be a button', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const close = fixture.nativeElement.querySelector('.close');
      expect(close.tagName.toLowerCase()).toBe('button');
    });

    it('should have aria-label', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const close = fixture.nativeElement.querySelector('.close');
      expect(close.getAttribute('aria-label')).toBe('Close notification');
    });

    it('should close toast on click', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const close = fixture.nativeElement.querySelector('.close');
      close.click();
      fixture.detectChanges();

      const toasts = component.provider.toasts();
      expect(toasts[0]?.transitionStatus).toBe('ending');
    });
  });

  describe('Toast Action', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestToastComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have base-ui-toast-action class', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const action = fixture.nativeElement.querySelector('.base-ui-toast-action');
      expect(action).toBeTruthy();
    });

    it('should be a button', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const action = fixture.nativeElement.querySelector('.action');
      expect(action.tagName.toLowerCase()).toBe('button');
    });

    it('should emit actionClick when clicked', () => {
      component.provider.context.add({ title: 'Test' });
      fixture.detectChanges();

      const action = fixture.nativeElement.querySelector('.action');
      action.click();
      fixture.detectChanges();

      expect(component.actionedToasts.length).toBe(1);
    });
  });
});

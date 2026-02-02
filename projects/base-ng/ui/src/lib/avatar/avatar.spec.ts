/**
 * @fileoverview Tests for Avatar component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/avatar/Avatar.test.tsx
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { AvatarRootDirective } from './avatar-root.directive';
import { AvatarImageDirective } from './avatar-image.directive';
import { AvatarFallbackDirective } from './avatar-fallback.directive';

describe('Avatar component', () => {
  describe('AvatarRootDirective', () => {
    @Component({
      template: `
        <span baseUiAvatarRoot>
          <span baseUiAvatarFallback>JD</span>
        </span>
      `,
      standalone: true,
      imports: [AvatarRootDirective, AvatarFallbackDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiAvatarRoot]');
    });

    it('should render avatar root', () => {
      expect(root).toBeTruthy();
    });

    it('should have avatar class', () => {
      expect(root.classList.contains('base-ui-avatar')).toBe(true);
    });

    it('should have idle loading status by default', () => {
      expect(root.getAttribute('data-image-loading-status')).toBe('idle');
    });

    it('should have idle class by default', () => {
      expect(root.classList.contains('base-ui-avatar-idle')).toBe(true);
    });
  });

  describe('AvatarFallbackDirective', () => {
    @Component({
      template: `
        <span baseUiAvatarRoot>
          <span baseUiAvatarFallback>JD</span>
        </span>
      `,
      standalone: true,
      imports: [AvatarRootDirective, AvatarFallbackDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let fallback: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fallback = fixture.nativeElement.querySelector('[baseUiAvatarFallback]');
    });

    it('should render fallback', () => {
      expect(fallback).toBeTruthy();
    });

    it('should have fallback class', () => {
      expect(fallback.classList.contains('base-ui-avatar-fallback')).toBe(true);
    });

    it('should display fallback when no image', () => {
      expect(fallback.style.display).not.toBe('none');
    });

    it('should display fallback content', () => {
      expect(fallback.textContent).toBe('JD');
    });
  });

  describe('AvatarImageDirective', () => {
    @Component({
      template: `
        <span baseUiAvatarRoot>
          <img baseUiAvatarImage [src]="src()" alt="User" />
          <span baseUiAvatarFallback>JD</span>
        </span>
      `,
      standalone: true,
      imports: [AvatarRootDirective, AvatarImageDirective, AvatarFallbackDirective],
    })
    class TestComponent {
      src = signal('https://example.com/user.jpg');
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let root: HTMLElement;
    let image: HTMLImageElement;
    let fallback: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiAvatarRoot]');
      image = fixture.nativeElement.querySelector('[baseUiAvatarImage]');
      fallback = fixture.nativeElement.querySelector('[baseUiAvatarFallback]');
    });

    it('should render image', () => {
      expect(image).toBeTruthy();
      expect(image.tagName.toLowerCase()).toBe('img');
    });

    it('should have image class', () => {
      expect(image.classList.contains('base-ui-avatar-image')).toBe(true);
    });

    it('should update root status when image loads', () => {
      // Simulate image load
      image.dispatchEvent(new Event('load'));
      fixture.detectChanges();

      expect(root.getAttribute('data-image-loading-status')).toBe('loaded');
      expect(root.classList.contains('base-ui-avatar-loaded')).toBe(true);
    });

    it('should update root status when image errors', () => {
      // Simulate image error
      image.dispatchEvent(new Event('error'));
      fixture.detectChanges();

      expect(root.getAttribute('data-image-loading-status')).toBe('error');
      expect(root.classList.contains('base-ui-avatar-error')).toBe(true);
    });

    it('should hide fallback when image loads', () => {
      // Simulate image load
      image.dispatchEvent(new Event('load'));
      fixture.detectChanges();

      expect(fallback.style.display).toBe('none');
    });

    it('should show fallback when image errors', () => {
      // Simulate image error
      image.dispatchEvent(new Event('error'));
      fixture.detectChanges();

      expect(fallback.style.display).not.toBe('none');
    });
  });

  describe('Fallback with delay', () => {
    @Component({
      template: `
        <span baseUiAvatarRoot>
          <span baseUiAvatarFallback [delay]="200">JD</span>
        </span>
      `,
      standalone: true,
      imports: [AvatarRootDirective, AvatarFallbackDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let fallback: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      vi.useFakeTimers();
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fallback = fixture.nativeElement.querySelector('[baseUiAvatarFallback]');
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should not show fallback immediately', () => {
      expect(fallback.style.display).toBe('none');
    });

    it('should show fallback after delay', () => {
      vi.advanceTimersByTime(200);
      fixture.detectChanges();

      expect(fallback.style.display).not.toBe('none');
    });

    it('should not show fallback before delay completes', () => {
      vi.advanceTimersByTime(100);
      fixture.detectChanges();

      expect(fallback.style.display).toBe('none');
    });
  });

  describe('Full avatar with image loaded', () => {
    @Component({
      template: `
        <span baseUiAvatarRoot>
          <img baseUiAvatarImage src="user.jpg" alt="John Doe" />
          <span baseUiAvatarFallback>JD</span>
        </span>
      `,
      standalone: true,
      imports: [AvatarRootDirective, AvatarImageDirective, AvatarFallbackDirective],
    })
    class TestComponent {}

    let fixture: ComponentFixture<TestComponent>;
    let root: HTMLElement;
    let image: HTMLImageElement;
    let fallback: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      root = fixture.nativeElement.querySelector('[baseUiAvatarRoot]');
      image = fixture.nativeElement.querySelector('[baseUiAvatarImage]');
      fallback = fixture.nativeElement.querySelector('[baseUiAvatarFallback]');
    });

    it('should render all parts', () => {
      expect(root).toBeTruthy();
      expect(image).toBeTruthy();
      expect(fallback).toBeTruthy();
    });

    it('should have correct structure', () => {
      // Root should contain both image and fallback
      expect(root.contains(image)).toBe(true);
      expect(root.contains(fallback)).toBe(true);
    });

    it('should transition states correctly', () => {
      // Initially idle/loading
      expect(fallback.style.display).not.toBe('none');

      // Simulate load
      image.dispatchEvent(new Event('load'));
      fixture.detectChanges();

      // After load, fallback should be hidden
      expect(fallback.style.display).toBe('none');
      expect(root.classList.contains('base-ui-avatar-loaded')).toBe(true);
    });
  });

  describe('loadingStatusChange output', () => {
    @Component({
      template: `
        <span baseUiAvatarRoot>
          <img baseUiAvatarImage
               src="user.jpg"
               alt="User"
               (loadingStatusChange)="onStatusChange($event)" />
        </span>
      `,
      standalone: true,
      imports: [AvatarRootDirective, AvatarImageDirective],
    })
    class TestComponent {
      statusChangeSpy = vi.fn();
      onStatusChange(status: string): void {
        this.statusChangeSpy(status);
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let image: HTMLImageElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      image = fixture.nativeElement.querySelector('[baseUiAvatarImage]');
    });

    it('should emit loadingStatusChange on load', () => {
      image.dispatchEvent(new Event('load'));
      fixture.detectChanges();

      expect(component.statusChangeSpy).toHaveBeenCalledWith('loaded');
    });

    it('should emit loadingStatusChange on error', () => {
      image.dispatchEvent(new Event('error'));
      fixture.detectChanges();

      expect(component.statusChangeSpy).toHaveBeenCalledWith('error');
    });
  });
});

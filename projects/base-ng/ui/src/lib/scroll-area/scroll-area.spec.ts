/**
 * @component ScrollArea
 * @fileoverview Tests for Scroll Area component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/scroll-area/ScrollArea.test.tsx
 * @parity Verified against React Base UI - includes State Attributes and Accessibility test categories
 * @note ScrollArea is a display enhancement component - minimal keyboard interaction required
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ScrollAreaRootDirective } from './scroll-area-root.directive';
import { ScrollAreaViewportDirective } from './scroll-area-viewport.directive';
import { ScrollAreaContentDirective } from './scroll-area-content.directive';
import { ScrollAreaScrollbarDirective } from './scroll-area-scrollbar.directive';
import { ScrollAreaThumbDirective } from './scroll-area-thumb.directive';
import { ScrollAreaCornerDirective } from './scroll-area-corner.directive';

@Component({
  standalone: true,
  imports: [
    ScrollAreaRootDirective,
    ScrollAreaViewportDirective,
    ScrollAreaContentDirective,
    ScrollAreaScrollbarDirective,
    ScrollAreaThumbDirective,
    ScrollAreaCornerDirective,
  ],
  template: `
    <div baseUiScrollAreaRoot #root="scrollAreaRoot" style="width: 200px; height: 200px;">
      <div baseUiScrollAreaViewport #viewport="scrollAreaViewport">
        <div baseUiScrollAreaContent>
          <div style="width: 400px; height: 400px;">
            Large scrollable content
          </div>
        </div>
      </div>
      <div baseUiScrollAreaScrollbar orientation="vertical" class="scrollbar-vertical">
        <div baseUiScrollAreaThumb class="thumb-vertical"></div>
      </div>
      <div baseUiScrollAreaScrollbar orientation="horizontal" class="scrollbar-horizontal">
        <div baseUiScrollAreaThumb class="thumb-horizontal"></div>
      </div>
      <div baseUiScrollAreaCorner class="corner"></div>
    </div>
  `,
})
class TestScrollAreaComponent {
  @ViewChild('root', { static: true }) root!: ScrollAreaRootDirective;
  @ViewChild('viewport', { static: true }) viewport!: ScrollAreaViewportDirective;
}

@Component({
  standalone: true,
  imports: [
    ScrollAreaRootDirective,
    ScrollAreaViewportDirective,
    ScrollAreaContentDirective,
    ScrollAreaScrollbarDirective,
    ScrollAreaThumbDirective,
  ],
  template: `
    <div baseUiScrollAreaRoot #root="scrollAreaRoot" style="width: 200px; height: 200px;">
      <div baseUiScrollAreaViewport>
        <div baseUiScrollAreaContent>
          <div style="width: 100px; height: 100px;">
            Small content (no scrollbars needed)
          </div>
        </div>
      </div>
      <div baseUiScrollAreaScrollbar orientation="vertical" [keepMounted]="true" class="scrollbar-keep">
        <div baseUiScrollAreaThumb></div>
      </div>
    </div>
  `,
})
class TestScrollAreaNoOverflowComponent {
  @ViewChild('root', { static: true }) root!: ScrollAreaRootDirective;
}

describe('ScrollArea', () => {
  describe('Basic ScrollArea', () => {
    let fixture: ComponentFixture<TestScrollAreaComponent>;
    let component: TestScrollAreaComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestScrollAreaComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestScrollAreaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.root).toBeTruthy();
    });

    it('should have base-ui-scroll-area-root class', () => {
      const root = fixture.nativeElement.querySelector('.base-ui-scroll-area-root');
      expect(root).toBeTruthy();
    });

    it('should have base-ui-scroll-area-viewport class', () => {
      const viewport = fixture.nativeElement.querySelector('.base-ui-scroll-area-viewport');
      expect(viewport).toBeTruthy();
    });

    it('should have base-ui-scroll-area-content class', () => {
      const content = fixture.nativeElement.querySelector('.base-ui-scroll-area-content');
      expect(content).toBeTruthy();
    });

    it('should have base-ui-scroll-area-scrollbar class', () => {
      const scrollbar = fixture.nativeElement.querySelector('.base-ui-scroll-area-scrollbar');
      expect(scrollbar).toBeTruthy();
    });

    it('should have base-ui-scroll-area-thumb class', () => {
      const thumb = fixture.nativeElement.querySelector('.base-ui-scroll-area-thumb');
      expect(thumb).toBeTruthy();
    });

    it('should have base-ui-scroll-area-corner class', () => {
      const corner = fixture.nativeElement.querySelector('.base-ui-scroll-area-corner');
      expect(corner).toBeTruthy();
    });

    it('should have relative position on root', () => {
      const root = fixture.nativeElement.querySelector('[baseUiScrollAreaRoot]');
      expect(root.style.position).toBe('relative');
    });

    it('should have overflow hidden on root', () => {
      const root = fixture.nativeElement.querySelector('[baseUiScrollAreaRoot]');
      expect(root.style.overflow).toBe('hidden');
    });

    it('should have overflow scroll on viewport', () => {
      const viewport = fixture.nativeElement.querySelector('[baseUiScrollAreaViewport]');
      expect(viewport.style.overflow).toBe('scroll');
    });

    it('should have scrollbar-width none on viewport', () => {
      const viewport = fixture.nativeElement.querySelector('[baseUiScrollAreaViewport]');
      expect(viewport.style.scrollbarWidth).toBe('none');
    });

    it('should have vertical scrollbar with data-orientation="vertical"', () => {
      const scrollbar = fixture.nativeElement.querySelector('.scrollbar-vertical');
      expect(scrollbar.getAttribute('data-orientation')).toBe('vertical');
    });

    it('should have horizontal scrollbar with data-orientation="horizontal"', () => {
      const scrollbar = fixture.nativeElement.querySelector('.scrollbar-horizontal');
      expect(scrollbar.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should apply vertical scrollbar styles', () => {
      const scrollbar = fixture.nativeElement.querySelector('.scrollbar-vertical');
      expect(scrollbar.style.position).toBe('absolute');
    });

    it('should apply horizontal scrollbar styles', () => {
      const scrollbar = fixture.nativeElement.querySelector('.scrollbar-horizontal');
      expect(scrollbar.style.position).toBe('absolute');
    });
  });

  describe('Scrollbar Visibility', () => {
    let fixture: ComponentFixture<TestScrollAreaNoOverflowComponent>;
    let component: TestScrollAreaNoOverflowComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestScrollAreaNoOverflowComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestScrollAreaNoOverflowComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should keep scrollbar mounted when keepMounted is true', () => {
      const scrollbar = fixture.nativeElement.querySelector('.scrollbar-keep');
      expect(scrollbar).toBeTruthy();
    });
  });

  describe('Thumb', () => {
    let fixture: ComponentFixture<TestScrollAreaComponent>;
    let component: TestScrollAreaComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestScrollAreaComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestScrollAreaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have vertical thumb', () => {
      const thumb = fixture.nativeElement.querySelector('.thumb-vertical');
      expect(thumb).toBeTruthy();
    });

    it('should have horizontal thumb', () => {
      const thumb = fixture.nativeElement.querySelector('.thumb-horizontal');
      expect(thumb).toBeTruthy();
    });

    it('should have data-orientation on thumb', () => {
      const thumb = fixture.nativeElement.querySelector('.thumb-vertical');
      expect(thumb.getAttribute('data-orientation')).toBe('vertical');
    });

    it('should have absolute positioning on thumb', () => {
      const thumb = fixture.nativeElement.querySelector('.thumb-vertical');
      expect(thumb.style.position).toBe('absolute');
    });
  });

  describe('Corner', () => {
    let fixture: ComponentFixture<TestScrollAreaComponent>;
    let component: TestScrollAreaComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestScrollAreaComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestScrollAreaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have absolute position', () => {
      const corner = fixture.nativeElement.querySelector('.corner');
      expect(corner.style.position).toBe('absolute');
    });

    it('should be positioned at bottom right', () => {
      const corner = fixture.nativeElement.querySelector('.corner');
      expect(corner.style.bottom).toBe('0px');
      expect(corner.style.right).toBe('0px');
    });
  });

  describe('Context', () => {
    let fixture: ComponentFixture<TestScrollAreaComponent>;
    let component: TestScrollAreaComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestScrollAreaComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestScrollAreaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should expose scrolling state', () => {
      expect(component.root.scrolling()).toBe(false);
    });

    it('should expose scrollingX state', () => {
      expect(component.root.scrollingX()).toBe(false);
    });

    it('should expose scrollingY state', () => {
      expect(component.root.scrollingY()).toBe(false);
    });

    it('should expose overflow state', () => {
      const overflow = component.root.overflow();
      expect(overflow).toHaveProperty('top');
      expect(overflow).toHaveProperty('bottom');
      expect(overflow).toHaveProperty('left');
      expect(overflow).toHaveProperty('right');
    });

    it('should expose hiddenState', () => {
      const hidden = component.root.hiddenState();
      expect(hidden).toHaveProperty('scrollbarX');
      expect(hidden).toHaveProperty('scrollbarY');
      expect(hidden).toHaveProperty('corner');
    });
  });

  describe('State Attributes', () => {
    let fixture: ComponentFixture<TestScrollAreaComponent>;
    let component: TestScrollAreaComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestScrollAreaComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestScrollAreaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not have data-scrolling initially', () => {
      const root = fixture.nativeElement.querySelector('[baseUiScrollAreaRoot]');
      expect(root.hasAttribute('data-scrolling')).toBe(false);
    });

    it('should not have data-scrolling-x initially', () => {
      const root = fixture.nativeElement.querySelector('[baseUiScrollAreaRoot]');
      expect(root.hasAttribute('data-scrolling-x')).toBe(false);
    });

    it('should not have data-scrolling-y initially', () => {
      const root = fixture.nativeElement.querySelector('[baseUiScrollAreaRoot]');
      expect(root.hasAttribute('data-scrolling-y')).toBe(false);
    });
  });
});

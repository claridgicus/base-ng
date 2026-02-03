/**
 * Test setup file for @base-ng/ui
 * Provides polyfills and Angular TestBed setup for Vitest
 */

import { TestBed, getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { afterEach } from 'vitest';

// Initialize TestBed environment (only once per test run)
const testBed = getTestBed();
if (!testBed.platform) {
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    { teardown: { destroyAfterEach: true } }
  );
}

// Reset TestBed after each test to prevent state leakage
afterEach(() => {
  TestBed.resetTestingModule();
});

// ResizeObserver polyfill
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(globalThis as any).ResizeObserver = ResizeObserverMock;

// MutationObserver is usually available in jsdom, but ensure it exists
if (typeof (globalThis as any).MutationObserver === 'undefined') {
  class MutationObserverMock {
    observe() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  (globalThis as any).MutationObserver = MutationObserverMock;
}

// Mock matchMedia for responsive tests
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

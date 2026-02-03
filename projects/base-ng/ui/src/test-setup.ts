/**
 * Test setup file for @copied/base-ng
 * Provides polyfills for APIs not available in jsdom
 */

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

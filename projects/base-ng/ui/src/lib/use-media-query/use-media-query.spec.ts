/**
 * @fileoverview Tests for use-media-query service
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/unstable-use-media-query/index.ts
 */
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import {
  UseMediaQueryService,
  useMediaQuery,
  SSR_MATCH_MEDIA,
  MEDIA_QUERY_DEFAULT_OPTIONS,
} from './use-media-query.service';

describe('UseMediaQueryService', () => {
  let service: UseMediaQueryService;
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let mockMediaQueryList: {
    matches: boolean;
    media: string;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockMediaQueryList = {
      matches: false,
      media: '',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      mockMediaQueryList.media = query;
      return mockMediaQueryList;
    });

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    TestBed.configureTestingModule({
      providers: [
        UseMediaQueryService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(UseMediaQueryService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('supportsMatchMedia', () => {
    it('should be true in browser environment', () => {
      expect(service.supportsMatchMedia).toBe(true);
    });
  });

  describe('match', () => {
    it('should return a signal', () => {
      const result = service.match('(min-width: 768px)');
      expect(typeof result).toBe('function');
    });

    it('should call matchMedia with the query', () => {
      service.match('(min-width: 768px)');
      expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 768px)');
    });

    it('should normalize query by removing @media prefix', () => {
      service.match('@media (min-width: 768px)');
      expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 768px)');
    });

    it('should normalize query by removing @media prefix with space', () => {
      service.match('@media(min-width: 768px)');
      expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 768px)');
    });

    it('should return false by default when query does not match', () => {
      mockMediaQueryList.matches = false;
      const result = service.match('(min-width: 768px)');
      expect(result()).toBe(false);
    });

    it('should return true when query matches', () => {
      mockMediaQueryList.matches = true;
      const result = service.match('(min-width: 768px)');
      expect(result()).toBe(true);
    });

    it('should add event listener for changes', () => {
      service.match('(min-width: 768px)');
      expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });

    it('should use defaultMatches when provided', () => {
      mockMediaQueryList.matches = false;
      const result = service.match('(min-width: 768px)', {
        defaultMatches: true,
      });
      // In browser, actual matches takes precedence
      expect(result()).toBe(false);
    });

    it('should use custom matchMedia when provided', () => {
      const customMatchMedia = vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const result = service.match('(min-width: 768px)', {
        matchMedia: customMatchMedia as unknown as typeof window.matchMedia,
      });

      expect(customMatchMedia).toHaveBeenCalledWith('(min-width: 768px)');
      expect(result()).toBe(true);
    });
  });

  describe('matchMultiple', () => {
    it('should return object with signals for each query', () => {
      const queries = {
        mobile: '(max-width: 767px)',
        tablet: '(min-width: 768px) and (max-width: 1023px)',
        desktop: '(min-width: 1024px)',
      };

      const result = service.matchMultiple(queries);

      expect(typeof result.mobile).toBe('function');
      expect(typeof result.tablet).toBe('function');
      expect(typeof result.desktop).toBe('function');
    });

    it('should call matchMedia for each query', () => {
      const queries = {
        mobile: '(max-width: 767px)',
        desktop: '(min-width: 1024px)',
      };

      service.matchMultiple(queries);

      expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
      expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 1024px)');
    });
  });

  describe('matches', () => {
    it('should return current match status', () => {
      mockMediaQueryList.matches = true;
      expect(service.matches('(min-width: 768px)')).toBe(true);
    });

    it('should normalize query', () => {
      service.matches('@media (min-width: 768px)');
      expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 768px)');
    });
  });

  describe('breakpoints', () => {
    it('should provide mobile breakpoint helper', () => {
      const result = service.breakpoints.mobile();
      expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
      expect(typeof result).toBe('function');
    });

    it('should provide tablet breakpoint helper', () => {
      const result = service.breakpoints.tablet();
      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(min-width: 768px) and (max-width: 1023px)'
      );
      expect(typeof result).toBe('function');
    });

    it('should provide desktop breakpoint helper', () => {
      const result = service.breakpoints.desktop();
      expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 1024px)');
      expect(typeof result).toBe('function');
    });

    it('should provide largeDesktop breakpoint helper', () => {
      const result = service.breakpoints.largeDesktop();
      expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 1440px)');
      expect(typeof result).toBe('function');
    });

    it('should provide prefersReducedMotion helper', () => {
      const result = service.breakpoints.prefersReducedMotion();
      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-reduced-motion: reduce)'
      );
      expect(typeof result).toBe('function');
    });

    it('should provide prefersDarkColorScheme helper', () => {
      const result = service.breakpoints.prefersDarkColorScheme();
      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-color-scheme: dark)'
      );
      expect(typeof result).toBe('function');
    });

    it('should provide prefersLightColorScheme helper', () => {
      const result = service.breakpoints.prefersLightColorScheme();
      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-color-scheme: light)'
      );
      expect(typeof result).toBe('function');
    });

    it('should provide highContrast helper', () => {
      const result = service.breakpoints.highContrast();
      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-contrast: more)');
      expect(typeof result).toBe('function');
    });
  });
});

describe('UseMediaQueryService SSR', () => {
  let service: UseMediaQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UseMediaQueryService,
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    service = TestBed.inject(UseMediaQueryService);
  });

  it('should not support matchMedia on server', () => {
    expect(service.supportsMatchMedia).toBe(false);
  });

  it('should return defaultMatches on server', () => {
    const result = service.match('(min-width: 768px)', {
      defaultMatches: true,
    });
    expect(result()).toBe(true);
  });

  it('should use ssrMatchMedia when provided', () => {
    const ssrMatchMedia = vi.fn().mockReturnValue({ matches: true });

    const result = service.match('(min-width: 768px)', {
      ssrMatchMedia,
    });

    expect(ssrMatchMedia).toHaveBeenCalledWith('(min-width: 768px)');
    expect(result()).toBe(true);
  });

  it('should return false for matches() on server', () => {
    expect(service.matches('(min-width: 768px)')).toBe(false);
  });
});

describe('UseMediaQueryService with SSR_MATCH_MEDIA token', () => {
  let service: UseMediaQueryService;
  const ssrMatchMediaFn = vi.fn().mockReturnValue({ matches: true });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UseMediaQueryService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: SSR_MATCH_MEDIA, useValue: ssrMatchMediaFn },
      ],
    });

    service = TestBed.inject(UseMediaQueryService);
  });

  it('should use injected SSR_MATCH_MEDIA', () => {
    const result = service.match('(min-width: 768px)');
    expect(ssrMatchMediaFn).toHaveBeenCalledWith('(min-width: 768px)');
    expect(result()).toBe(true);
  });
});

describe('UseMediaQueryService with MEDIA_QUERY_DEFAULT_OPTIONS', () => {
  let service: UseMediaQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UseMediaQueryService,
        { provide: PLATFORM_ID, useValue: 'server' },
        {
          provide: MEDIA_QUERY_DEFAULT_OPTIONS,
          useValue: { defaultMatches: true },
        },
      ],
    });

    service = TestBed.inject(UseMediaQueryService);
  });

  it('should use default options from token', () => {
    const result = service.match('(min-width: 768px)');
    expect(result()).toBe(true);
  });
});

describe('useMediaQuery functional helper', () => {
  @Component({
    template: `<div>{{ isMobile() ? 'Mobile' : 'Desktop' }}</div>`,
    standalone: true,
  })
  class TestComponent {
    isMobile = useMediaQuery('(max-width: 767px)');
  }

  let fixture: ComponentFixture<TestComponent>;
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockMatchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        UseMediaQueryService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create signal via inject', () => {
    expect(fixture.componentInstance.isMobile()).toBe(true);
  });

  it('should render based on media query', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Mobile');
  });
});

describe('Media query change detection', () => {
  let service: UseMediaQueryService;
  let mockMediaQueryList: {
    matches: boolean;
    media: string;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
  };
  let changeListener: ((event: { matches: boolean }) => void) | null = null;

  beforeEach(() => {
    mockMediaQueryList = {
      matches: false,
      media: '',
      addEventListener: vi.fn().mockImplementation((event, listener) => {
        if (event === 'change') {
          changeListener = listener;
        }
      }),
      removeEventListener: vi.fn(),
    };

    const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      mockMediaQueryList.media = query;
      return mockMediaQueryList;
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    TestBed.configureTestingModule({
      providers: [
        UseMediaQueryService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(UseMediaQueryService);
  });

  it('should update signal when media query changes', () => {
    const result = service.match('(min-width: 768px)');
    expect(result()).toBe(false);

    // Simulate media query change
    if (changeListener) {
      changeListener({ matches: true });
    }

    expect(result()).toBe(true);
  });

  it('should update signal when media query changes back', () => {
    mockMediaQueryList.matches = true;
    const result = service.match('(min-width: 768px)');
    expect(result()).toBe(true);

    // Simulate media query change
    if (changeListener) {
      changeListener({ matches: false });
    }

    expect(result()).toBe(false);
  });
});

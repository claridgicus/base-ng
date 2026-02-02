/**
 * @fileoverview Angular port of Base UI unstable-use-media-query hook
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/unstable-use-media-query/index.ts
 *
 * Provides reactive media query matching with SSR support.
 */

import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  signal,
  type Signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Options for media query matching.
 */
export interface UseMediaQueryOptions {
  /**
   * Default value to return when media query cannot be evaluated.
   * @default false
   */
  defaultMatches?: boolean;

  /**
   * Custom matchMedia implementation for testing or SSR.
   */
  matchMedia?: typeof window.matchMedia;

  /**
   * Skip SSR evaluation and use client-side matching immediately.
   * @default false
   */
  noSsr?: boolean;

  /**
   * SSR matchMedia implementation for server-side rendering.
   */
  ssrMatchMedia?: ((query: string) => { matches: boolean }) | null;
}

/**
 * Injection token for providing SSR matchMedia implementation.
 */
export const SSR_MATCH_MEDIA = new InjectionToken<
  ((query: string) => { matches: boolean }) | null
>('SSR_MATCH_MEDIA', {
  providedIn: 'root',
  factory: () => null,
});

/**
 * Injection token for providing default media query options.
 */
export const MEDIA_QUERY_DEFAULT_OPTIONS = new InjectionToken<UseMediaQueryOptions>(
  'MEDIA_QUERY_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: () => ({}),
  }
);

/**
 * Service for reactive media query matching.
 *
 * @example
 * ```typescript
 * @Component({
 *   template: `
 *     <div *ngIf="isMobile()">Mobile view</div>
 *     <div *ngIf="isDesktop()">Desktop view</div>
 *   `
 * })
 * class MyComponent {
 *   private mediaQuery = inject(UseMediaQueryService);
 *
 *   isMobile = this.mediaQuery.match('(max-width: 768px)');
 *   isDesktop = this.mediaQuery.match('(min-width: 1024px)');
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class UseMediaQueryService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ssrMatchMedia = inject(SSR_MATCH_MEDIA);
  private readonly defaultOptions = inject(MEDIA_QUERY_DEFAULT_OPTIONS);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Whether the browser supports matchMedia.
   */
  readonly supportsMatchMedia: boolean =
    this.isBrowser &&
    typeof window !== 'undefined' &&
    typeof window.matchMedia !== 'undefined';

  /**
   * Create a reactive signal that matches a media query.
   *
   * @param query - CSS media query string (with or without @media prefix)
   * @param options - Optional configuration
   * @returns Signal that emits true when the media query matches
   */
  match(query: string, options: UseMediaQueryOptions = {}): Signal<boolean> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const {
      defaultMatches = false,
      matchMedia = this.supportsMatchMedia ? window.matchMedia : undefined,
      noSsr = false,
      ssrMatchMedia = this.ssrMatchMedia,
    } = mergedOptions;

    // Normalize query (remove @media prefix if present)
    const normalizedQuery = query.replace(/^@media( ?)/m, '');

    // Create internal signal for matches
    const matches = signal(this.getInitialValue(normalizedQuery, {
      defaultMatches,
      matchMedia,
      noSsr,
      ssrMatchMedia,
    }));

    // Set up listener only in browser
    if (this.isBrowser && matchMedia) {
      const mediaQueryList = matchMedia(normalizedQuery);

      // Update signal when media query changes
      const listener = (event: MediaQueryListEvent) => {
        matches.set(event.matches);
      };

      // Subscribe to changes
      mediaQueryList.addEventListener('change', listener);

      // Initial value (may differ from server)
      if (this.isBrowser) {
        matches.set(mediaQueryList.matches);
      }

      // Clean up on destroy
      this.destroyRef.onDestroy(() => {
        mediaQueryList.removeEventListener('change', listener);
      });
    }

    return matches.asReadonly();
  }

  /**
   * Create multiple reactive signals for media queries.
   *
   * @param queries - Object with query names as keys and media query strings as values
   * @param options - Optional configuration shared by all queries
   * @returns Object with same keys but Signal<boolean> values
   */
  matchMultiple<T extends Record<string, string>>(
    queries: T,
    options: UseMediaQueryOptions = {}
  ): { [K in keyof T]: Signal<boolean> } {
    const result = {} as { [K in keyof T]: Signal<boolean> };

    for (const key of Object.keys(queries) as Array<keyof T>) {
      result[key] = this.match(queries[key], options);
    }

    return result;
  }

  /**
   * Check if a media query matches (one-time check, not reactive).
   *
   * @param query - CSS media query string
   * @returns true if the media query matches, false otherwise
   */
  matches(query: string): boolean {
    const normalizedQuery = query.replace(/^@media( ?)/m, '');

    if (!this.supportsMatchMedia) {
      return false;
    }

    return window.matchMedia(normalizedQuery).matches;
  }

  /**
   * Common breakpoint helpers.
   */
  readonly breakpoints = {
    /** Mobile: max-width 767px */
    mobile: () => this.match('(max-width: 767px)'),
    /** Tablet: 768px to 1023px */
    tablet: () => this.match('(min-width: 768px) and (max-width: 1023px)'),
    /** Desktop: min-width 1024px */
    desktop: () => this.match('(min-width: 1024px)'),
    /** Large desktop: min-width 1440px */
    largeDesktop: () => this.match('(min-width: 1440px)'),
    /** Prefers reduced motion */
    prefersReducedMotion: () => this.match('(prefers-reduced-motion: reduce)'),
    /** Prefers dark color scheme */
    prefersDarkColorScheme: () => this.match('(prefers-color-scheme: dark)'),
    /** Prefers light color scheme */
    prefersLightColorScheme: () => this.match('(prefers-color-scheme: light)'),
    /** High contrast mode */
    highContrast: () => this.match('(prefers-contrast: more)'),
  };

  /**
   * Get initial value for the media query.
   */
  private getInitialValue(
    query: string,
    options: {
      defaultMatches: boolean;
      matchMedia?: typeof window.matchMedia;
      noSsr: boolean;
      ssrMatchMedia: ((query: string) => { matches: boolean }) | null;
    }
  ): boolean {
    const { defaultMatches, matchMedia, noSsr, ssrMatchMedia } = options;

    // If noSsr is true and we have matchMedia, use it directly
    if (noSsr && matchMedia) {
      return matchMedia(query).matches;
    }

    // If we have SSR matchMedia, use it
    if (ssrMatchMedia !== null) {
      return ssrMatchMedia(query).matches;
    }

    // If in browser, use actual matchMedia
    if (this.isBrowser && matchMedia) {
      return matchMedia(query).matches;
    }

    // Fall back to default
    return defaultMatches;
  }
}

/**
 * Functional helper for creating a media query signal.
 * Use this in components for a more functional API.
 *
 * @param query - CSS media query string
 * @param options - Optional configuration
 * @returns Signal that emits true when the media query matches
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): Signal<boolean> {
  const service = inject(UseMediaQueryService);
  return service.match(query, options);
}

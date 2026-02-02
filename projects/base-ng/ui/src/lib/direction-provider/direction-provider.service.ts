/**
 * @fileoverview Angular port of Base UI direction provider
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/direction-provider/DirectionContext.tsx
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/direction-provider/DirectionProvider.tsx
 */

import {
  computed,
  effect,
  inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  signal,
  type Provider,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * Text direction type.
 */
export type TextDirection = 'ltr' | 'rtl';

/**
 * Direction configuration.
 */
export interface DirectionConfig {
  /**
   * The text direction.
   * @default 'ltr'
   */
  direction: TextDirection;
}

/**
 * Default direction configuration.
 */
const DEFAULT_DIRECTION_CONFIG: DirectionConfig = {
  direction: 'ltr',
};

/**
 * Injection token for direction configuration.
 * Use this to provide a custom direction at the application or component level.
 *
 * @example
 * ```typescript
 * // In app.config.ts for RTL application
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDirection('rtl'),
 *   ],
 * };
 * ```
 */
export const DIRECTION_CONFIG = new InjectionToken<DirectionConfig>('BaseUI Direction Configuration', {
  providedIn: 'root',
  factory: () => DEFAULT_DIRECTION_CONFIG,
});

/**
 * Service for managing text direction (LTR/RTL).
 * Enables Base UI components to respect RTL language layouts.
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent {
 *   private directionService = inject(DirectionService);
 *
 *   isRtl = computed(() => this.directionService.direction() === 'rtl');
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private readonly config = inject(DIRECTION_CONFIG);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * The current text direction.
   */
  readonly direction: WritableSignal<TextDirection>;

  /**
   * Whether the current direction is RTL.
   */
  readonly isRtl: Signal<boolean>;

  /**
   * Whether the current direction is LTR.
   */
  readonly isLtr: Signal<boolean>;

  constructor() {
    // Initialize with config or detect from document
    const initialDirection = this.detectDirection();
    this.direction = signal(initialDirection);

    this.isRtl = computed(() => this.direction() === 'rtl');
    this.isLtr = computed(() => this.direction() === 'ltr');

    // Update document dir attribute when direction changes (if in browser)
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const dir = this.direction();
        this.document.documentElement.dir = dir;
      });
    }
  }

  /**
   * Detect the initial direction from config or document.
   */
  private detectDirection(): TextDirection {
    // Use config if provided
    if (this.config.direction) {
      return this.config.direction;
    }

    // Try to detect from document in browser
    if (isPlatformBrowser(this.platformId)) {
      const docDir = this.document.documentElement.dir;
      if (docDir === 'rtl' || docDir === 'ltr') {
        return docDir;
      }

      // Check computed style
      const computedDir = getComputedStyle(this.document.documentElement).direction;
      if (computedDir === 'rtl' || computedDir === 'ltr') {
        return computedDir;
      }
    }

    return 'ltr';
  }

  /**
   * Set the text direction.
   * @param direction - The new direction
   */
  setDirection(direction: TextDirection): void {
    this.direction.set(direction);
  }

  /**
   * Toggle between LTR and RTL.
   */
  toggleDirection(): void {
    this.direction.update((current) => (current === 'ltr' ? 'rtl' : 'ltr'));
  }

  /**
   * Get CSS properties for the current direction.
   * Useful for applying directional styles.
   */
  getDirectionStyles(): { direction: TextDirection } {
    return { direction: this.direction() };
  }

  /**
   * Get the "start" side based on direction.
   * @returns 'left' for LTR, 'right' for RTL
   */
  getStartSide(): 'left' | 'right' {
    return this.direction() === 'ltr' ? 'left' : 'right';
  }

  /**
   * Get the "end" side based on direction.
   * @returns 'right' for LTR, 'left' for RTL
   */
  getEndSide(): 'left' | 'right' {
    return this.direction() === 'ltr' ? 'right' : 'left';
  }
}

/**
 * Provider function for direction configuration.
 * Use this to configure text direction at the application or component level.
 *
 * @param direction - The text direction ('ltr' or 'rtl')
 * @returns Provider array for use in providers
 *
 * @example
 * ```typescript
 * // Application-level RTL configuration
 * bootstrapApplication(AppComponent, {
 *   providers: [provideDirection('rtl')],
 * });
 *
 * // Component-level override
 * @Component({
 *   providers: [provideDirection('ltr')],
 * })
 * export class LtrComponent {}
 * ```
 */
export function provideDirection(direction: TextDirection): Provider[] {
  return [
    {
      provide: DIRECTION_CONFIG,
      useValue: { direction },
    },
  ];
}

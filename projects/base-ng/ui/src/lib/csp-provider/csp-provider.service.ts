/**
 * @fileoverview Angular port of Base UI CSP provider
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/csp-provider/CSPContext.tsx
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/csp-provider/CSPProvider.tsx
 */

import {
  inject,
  Injectable,
  InjectionToken,
  signal,
  type Provider,
  type WritableSignal,
} from '@angular/core';

/**
 * Configuration values for Content Security Policy.
 */
export interface CSPConfig {
  /**
   * The nonce to use for inline style and script elements.
   * When set, this value will be added to inline elements to comply with CSP.
   */
  nonce?: string;

  /**
   * When true, Base UI will not render inline `<style>` elements.
   * This is useful when CSP disallows inline styles entirely.
   * @default false
   */
  disableStyleElements?: boolean;
}

/**
 * Default CSP configuration.
 */
const DEFAULT_CSP_CONFIG: CSPConfig = {
  nonce: undefined,
  disableStyleElements: false,
};

/**
 * Injection token for CSP configuration.
 * Use this to provide a custom CSP configuration at the application or component level.
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideCSP({ nonce: 'abc123' }),
 *   ],
 * };
 *
 * // Or in a component
 * @Component({
 *   providers: [provideCSP({ disableStyleElements: true })],
 * })
 * export class MyComponent {}
 * ```
 */
export const CSP_CONFIG = new InjectionToken<CSPConfig>('BaseUI CSP Configuration', {
  providedIn: 'root',
  factory: () => DEFAULT_CSP_CONFIG,
});

/**
 * Service for accessing Content Security Policy configuration.
 * Provides a default CSP configuration for Base UI components that require
 * inline `<style>` or `<script>` tags.
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent {
 *   private cspService = inject(CSPService);
 *
 *   // Use in template or for dynamic style creation
 *   getNonce() {
 *     return this.cspService.nonce();
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CSPService {
  private readonly config = inject(CSP_CONFIG);

  /**
   * The current nonce value.
   */
  readonly nonce: WritableSignal<string | undefined>;

  /**
   * Whether inline style elements should be disabled.
   */
  readonly disableStyleElements: WritableSignal<boolean>;

  constructor() {
    this.nonce = signal(this.config.nonce);
    this.disableStyleElements = signal(this.config.disableStyleElements ?? false);
  }

  /**
   * Get the current CSP configuration.
   */
  getConfig(): CSPConfig {
    return {
      nonce: this.nonce(),
      disableStyleElements: this.disableStyleElements(),
    };
  }

  /**
   * Update the nonce value.
   * @param value - The new nonce value
   */
  setNonce(value: string | undefined): void {
    this.nonce.set(value);
  }

  /**
   * Update whether style elements should be disabled.
   * @param value - Whether to disable style elements
   */
  setDisableStyleElements(value: boolean): void {
    this.disableStyleElements.set(value);
  }

  /**
   * Check if inline styles are allowed.
   * @returns true if inline styles can be used
   */
  canUseInlineStyles(): boolean {
    return !this.disableStyleElements();
  }

  /**
   * Get attributes to apply to inline style elements.
   * @returns Object with nonce attribute if nonce is set
   */
  getStyleElementAttributes(): Record<string, string> {
    const attrs: Record<string, string> = {};
    const nonceValue = this.nonce();
    if (nonceValue) {
      attrs['nonce'] = nonceValue;
    }
    return attrs;
  }

  /**
   * Get attributes to apply to inline script elements.
   * @returns Object with nonce attribute if nonce is set
   */
  getScriptElementAttributes(): Record<string, string> {
    const attrs: Record<string, string> = {};
    const nonceValue = this.nonce();
    if (nonceValue) {
      attrs['nonce'] = nonceValue;
    }
    return attrs;
  }
}

/**
 * Provider function for CSP configuration.
 * Use this to configure CSP at the application or component level.
 *
 * @param config - The CSP configuration to provide
 * @returns Provider array for use in providers
 *
 * @example
 * ```typescript
 * // Application-level configuration
 * bootstrapApplication(AppComponent, {
 *   providers: [provideCSP({ nonce: 'generated-nonce' })],
 * });
 *
 * // Component-level override
 * @Component({
 *   providers: [provideCSP({ disableStyleElements: true })],
 * })
 * export class SecureComponent {}
 * ```
 */
export function provideCSP(config: CSPConfig): Provider[] {
  return [
    {
      provide: CSP_CONFIG,
      useValue: { ...DEFAULT_CSP_CONFIG, ...config },
    },
  ];
}

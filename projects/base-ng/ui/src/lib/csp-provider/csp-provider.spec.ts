/**
 * @fileoverview Tests for CSP provider
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/csp-provider/CSPProvider.test.tsx
 */
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { CSP_CONFIG, CSPService, provideCSP } from './csp-provider.service';

describe('CSPService', () => {
  describe('with default configuration', () => {
    let service: CSPService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CSPService],
      });
      service = TestBed.inject(CSPService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have undefined nonce by default', () => {
      expect(service.nonce()).toBeUndefined();
    });

    it('should have disableStyleElements false by default', () => {
      expect(service.disableStyleElements()).toBe(false);
    });

    it('should allow inline styles by default', () => {
      expect(service.canUseInlineStyles()).toBe(true);
    });

    it('should return empty attributes when no nonce is set', () => {
      expect(service.getStyleElementAttributes()).toEqual({});
      expect(service.getScriptElementAttributes()).toEqual({});
    });

    it('should return current config', () => {
      expect(service.getConfig()).toEqual({
        nonce: undefined,
        disableStyleElements: false,
      });
    });
  });

  describe('with custom configuration', () => {
    let service: CSPService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CSPService, provideCSP({ nonce: 'test-nonce', disableStyleElements: true })],
      });
      service = TestBed.inject(CSPService);
    });

    it('should use provided nonce', () => {
      expect(service.nonce()).toBe('test-nonce');
    });

    it('should use provided disableStyleElements', () => {
      expect(service.disableStyleElements()).toBe(true);
    });

    it('should not allow inline styles when disabled', () => {
      expect(service.canUseInlineStyles()).toBe(false);
    });

    it('should return nonce in style attributes', () => {
      expect(service.getStyleElementAttributes()).toEqual({ nonce: 'test-nonce' });
    });

    it('should return nonce in script attributes', () => {
      expect(service.getScriptElementAttributes()).toEqual({ nonce: 'test-nonce' });
    });
  });

  describe('setters', () => {
    let service: CSPService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CSPService],
      });
      service = TestBed.inject(CSPService);
    });

    it('should update nonce', () => {
      service.setNonce('new-nonce');
      expect(service.nonce()).toBe('new-nonce');
    });

    it('should update disableStyleElements', () => {
      service.setDisableStyleElements(true);
      expect(service.disableStyleElements()).toBe(true);
      expect(service.canUseInlineStyles()).toBe(false);
    });

    it('should clear nonce', () => {
      service.setNonce('temp-nonce');
      expect(service.nonce()).toBe('temp-nonce');

      service.setNonce(undefined);
      expect(service.nonce()).toBeUndefined();
      expect(service.getStyleElementAttributes()).toEqual({});
    });
  });
});

describe('provideCSP', () => {
  it('should return provider array', () => {
    const providers = provideCSP({ nonce: 'abc' });
    expect(Array.isArray(providers)).toBe(true);
    expect(providers.length).toBe(1);
  });

  it('should provide CSP_CONFIG token', () => {
    const providers = provideCSP({ nonce: 'xyz' });
    const provider = providers[0] as { provide: unknown; useValue: unknown };
    expect(provider.provide).toBe(CSP_CONFIG);
  });

  it('should merge with defaults', () => {
    const providers = provideCSP({ nonce: 'only-nonce' });
    const provider = providers[0] as { provide: unknown; useValue: { nonce: string; disableStyleElements: boolean } };
    expect(provider.useValue.nonce).toBe('only-nonce');
    expect(provider.useValue.disableStyleElements).toBe(false);
  });
});

describe('CSP_CONFIG injection token', () => {
  it('should have default factory', () => {
    TestBed.configureTestingModule({});
    const config = TestBed.inject(CSP_CONFIG);
    expect(config).toEqual({
      nonce: undefined,
      disableStyleElements: false,
    });
  });
});

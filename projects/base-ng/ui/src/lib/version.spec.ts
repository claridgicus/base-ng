/**
 * @fileoverview Tests for version information
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src
 */
import { describe, expect, it } from 'vitest';
import { VERSION } from './version';

describe('VERSION', () => {
  it('should be defined', () => {
    expect(VERSION).toBeDefined();
  });

  it('should be a valid semver string', () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+/);
  });
});

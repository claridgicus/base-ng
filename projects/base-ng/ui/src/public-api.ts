/**
 * @fileoverview Angular port of Base UI component library
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src
 *
 * Public API Surface of @base-ng/ui
 * Components will be exported here as they are ported from Base UI React
 */

// Version
export { VERSION } from './lib/version';

// Types
export * from './lib/types';

// Utilities
export * from './lib/utils';
export * from './lib/merge-props';
export * from './lib/use-render';
export * from './lib/floating-ui';

// Providers
export * from './lib/csp-provider';
export * from './lib/direction-provider';
export * from './lib/labelable-provider';

// Hooks/Directives
export * from './lib/use-button';
export * from './lib/use-media-query';

// Components
export * from './lib/composite';
export * from './lib/button';
export * from './lib/separator';
export * from './lib/progress';
export * from './lib/meter';
export * from './lib/switch';
export * from './lib/toggle';
export * from './lib/toggle-group';
export * from './lib/avatar';
export * from './lib/input';

// Components (to be added as they are ported)
// export * from './lib/button';
// export * from './lib/switch';
// etc.

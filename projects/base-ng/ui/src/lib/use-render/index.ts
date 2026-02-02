/**
 * @fileoverview Angular port of Base UI use-render functionality
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/use-render/index.ts
 */

// Directive for applying state attributes
export { RenderElementDirective } from './render-element.directive';

// Utility functions for state attributes
export {
  applyStateAttributes,
  computeStateAttributes,
  removeStateAttributes,
} from './render-element.directive';
export type { RenderElementConfig } from './render-element.directive';

// Custom render utilities
export {
  createRenderContext,
  CUSTOM_RENDER,
  isComponentType,
  isTemplateRef,
} from './custom-render';
export type { CustomRenderConfig, CustomRenderFn, RenderContext } from './custom-render';

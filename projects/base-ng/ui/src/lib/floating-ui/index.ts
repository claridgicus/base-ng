/**
 * @fileoverview Angular port of Base UI floating-ui integration
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/floating-ui-react/index.ts
 */

// Service
export { FloatingService, floatingMiddleware } from './floating-ui.service';

// Directives
export { FloatingArrowDirective, FloatingDirective } from './floating.directive';

// Types
export type {
  Alignment,
  ArrowData,
  FloatingElement,
  FloatingOptions,
  FloatingPlacement,
  FloatingPosition,
  FloatingResult,
  FloatingStrategy,
  ReferenceElement,
  Side,
} from './floating-ui.types';

export {
  getAlignment,
  getOppositeSide,
  getOppositeAlignment,
  getSide,
} from './floating-ui.types';

// Re-export commonly used middleware from @floating-ui/dom
export {
  arrow,
  autoPlacement,
  autoUpdate,
  computePosition,
  flip,
  hide,
  inline,
  limitShift,
  offset,
  shift,
  size,
} from '@floating-ui/dom';

export type { Middleware, MiddlewareData, VirtualElement } from '@floating-ui/dom';

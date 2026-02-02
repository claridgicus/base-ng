/**
 * @fileoverview Angular port of Base UI floating-ui types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/floating-ui-react/types.ts
 */

import type {
  ComputePositionReturn,
  Middleware,
  Placement,
  Strategy,
  VirtualElement,
} from '@floating-ui/dom';

/**
 * Placement options for floating elements.
 */
export type FloatingPlacement = Placement;

/**
 * Positioning strategy for floating elements.
 */
export type FloatingStrategy = Strategy;

/**
 * Reference element type (can be a DOM element or virtual element).
 */
export type ReferenceElement = Element | VirtualElement;

/**
 * Floating element type.
 */
export type FloatingElement = HTMLElement;

/**
 * Position data returned from floating-ui.
 */
export interface FloatingPosition {
  x: number;
  y: number;
  placement: FloatingPlacement;
  strategy: FloatingStrategy;
  middlewareData: ComputePositionReturn['middlewareData'];
}

/**
 * Configuration options for floating positioning.
 */
export interface FloatingOptions {
  /**
   * The placement of the floating element relative to the reference.
   * @default 'bottom'
   */
  placement?: FloatingPlacement;

  /**
   * The positioning strategy.
   * @default 'absolute'
   */
  strategy?: FloatingStrategy;

  /**
   * Array of middleware to modify positioning behavior.
   */
  middleware?: Middleware[];

  /**
   * Whether to enable auto-update when the reference or floating element changes.
   * @default true
   */
  autoUpdate?: boolean;

  /**
   * Options for auto-update behavior.
   */
  autoUpdateOptions?: {
    ancestorScroll?: boolean;
    ancestorResize?: boolean;
    elementResize?: boolean;
    layoutShift?: boolean;
    animationFrame?: boolean;
  };
}

/**
 * Result of floating position computation.
 */
export interface FloatingResult {
  /**
   * The x coordinate for the floating element.
   */
  x: number;

  /**
   * The y coordinate for the floating element.
   */
  y: number;

  /**
   * The final placement after middleware processing.
   */
  placement: FloatingPlacement;

  /**
   * The positioning strategy being used.
   */
  strategy: FloatingStrategy;

  /**
   * Data from middleware.
   */
  middlewareData: ComputePositionReturn['middlewareData'];

  /**
   * Whether the floating element is positioned.
   */
  isPositioned: boolean;
}

/**
 * Arrow positioning data.
 */
export interface ArrowData {
  x?: number;
  y?: number;
  centerOffset?: number;
}

/**
 * Side options for positioning.
 */
export type Side = 'top' | 'right' | 'bottom' | 'left';

/**
 * Alignment options for positioning.
 */
export type Alignment = 'start' | 'end';

/**
 * Extract side from placement.
 */
export function getSide(placement: FloatingPlacement): Side {
  return placement.split('-')[0] as Side;
}

/**
 * Extract alignment from placement.
 */
export function getAlignment(placement: FloatingPlacement): Alignment | undefined {
  return placement.split('-')[1] as Alignment | undefined;
}

/**
 * Get the opposite side.
 */
export function getOppositeSide(side: Side): Side {
  const opposites: Record<Side, Side> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  };
  return opposites[side];
}

/**
 * Get the opposite alignment.
 */
export function getOppositeAlignment(alignment: Alignment): Alignment {
  return alignment === 'start' ? 'end' : 'start';
}

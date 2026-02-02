/**
 * @fileoverview Angular port of Base UI floating-ui integration
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/floating-ui-react/hooks/useFloating.ts
 */

import {
  DestroyRef,
  effect,
  inject,
  Injectable,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import {
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
  type Middleware,
} from '@floating-ui/dom';
import type {
  ArrowData,
  FloatingElement,
  FloatingOptions,
  FloatingPlacement,
  FloatingResult,
  FloatingStrategy,
  ReferenceElement,
} from './floating-ui.types';

/**
 * Default floating options.
 */
const DEFAULT_OPTIONS: Required<Pick<FloatingOptions, 'placement' | 'strategy' | 'autoUpdate'>> = {
  placement: 'bottom',
  strategy: 'absolute',
  autoUpdate: true,
};

/**
 * Service for managing floating element positioning.
 * This is the Angular equivalent of useFloating hook.
 */
@Injectable()
export class FloatingService {
  private readonly destroyRef = inject(DestroyRef);

  private _reference: ReferenceElement | null = null;
  private _floating: FloatingElement | null = null;
  private _arrow: HTMLElement | null = null;
  private _cleanup: (() => void) | null = null;
  private _options: FloatingOptions = DEFAULT_OPTIONS;

  /**
   * The current x position.
   */
  readonly x: WritableSignal<number> = signal(0);

  /**
   * The current y position.
   */
  readonly y: WritableSignal<number> = signal(0);

  /**
   * The current placement.
   */
  readonly placement: WritableSignal<FloatingPlacement> = signal('bottom');

  /**
   * The current strategy.
   */
  readonly strategy: WritableSignal<FloatingStrategy> = signal('absolute');

  /**
   * Whether the floating element is positioned.
   */
  readonly isPositioned: WritableSignal<boolean> = signal(false);

  /**
   * Middleware data from the last computation.
   */
  readonly middlewareData: WritableSignal<Record<string, unknown>> = signal({});

  /**
   * Arrow positioning data.
   */
  readonly arrowData: WritableSignal<ArrowData> = signal({});

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.cleanup();
    });
  }

  /**
   * Set the reference element.
   */
  setReference(element: ReferenceElement | null): void {
    this._reference = element;
    this.updatePosition();
  }

  /**
   * Set the floating element.
   */
  setFloating(element: FloatingElement | null): void {
    this._floating = element;
    this.updatePosition();
  }

  /**
   * Set the arrow element.
   */
  setArrow(element: HTMLElement | null): void {
    this._arrow = element;
    this.updatePosition();
  }

  /**
   * Configure floating options.
   */
  configure(options: FloatingOptions): void {
    this._options = { ...DEFAULT_OPTIONS, ...options };
    this.strategy.set(this._options.strategy ?? 'absolute');
    this.placement.set(this._options.placement ?? 'bottom');
    this.updatePosition();
  }

  /**
   * Update the floating element position.
   */
  async updatePosition(): Promise<FloatingResult | null> {
    if (!this._reference || !this._floating) {
      return null;
    }

    // Build middleware array
    const middleware: Middleware[] = [...(this._options.middleware ?? [])];

    // Add arrow middleware if arrow element is set
    if (this._arrow) {
      middleware.push(arrow({ element: this._arrow }));
    }

    try {
      const result = await computePosition(this._reference, this._floating, {
        placement: this._options.placement ?? 'bottom',
        strategy: this._options.strategy ?? 'absolute',
        middleware,
      });

      this.x.set(result.x);
      this.y.set(result.y);
      this.placement.set(result.placement);
      this.middlewareData.set(result.middlewareData);
      this.isPositioned.set(true);

      // Extract arrow data if present
      if (result.middlewareData['arrow']) {
        this.arrowData.set(result.middlewareData['arrow'] as ArrowData);
      }

      return {
        x: result.x,
        y: result.y,
        placement: result.placement,
        strategy: this._options.strategy ?? 'absolute',
        middlewareData: result.middlewareData,
        isPositioned: true,
      };
    } catch {
      return null;
    }
  }

  /**
   * Start auto-updating the position.
   */
  startAutoUpdate(): void {
    if (!this._reference || !this._floating || !this._options.autoUpdate) {
      return;
    }

    this.cleanup();

    this._cleanup = autoUpdate(
      this._reference,
      this._floating,
      () => this.updatePosition(),
      this._options.autoUpdateOptions,
    );
  }

  /**
   * Stop auto-updating and clean up.
   */
  cleanup(): void {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }

  /**
   * Get styles to apply to the floating element.
   */
  getFloatingStyles(): Partial<CSSStyleDeclaration> {
    return {
      position: this.strategy(),
      top: '0',
      left: '0',
      transform: `translate(${Math.round(this.x())}px, ${Math.round(this.y())}px)`,
    };
  }

  /**
   * Get styles to apply to the arrow element.
   */
  getArrowStyles(): Partial<CSSStyleDeclaration> {
    const data = this.arrowData();
    const side = this.placement().split('-')[0];

    const staticSide: Record<string, string> = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    };

    return {
      position: 'absolute',
      left: data.x != null ? `${data.x}px` : '',
      top: data.y != null ? `${data.y}px` : '',
      [staticSide[side]]: '-4px',
    };
  }
}

/**
 * Factory function to create common middleware configurations.
 */
export const floatingMiddleware = {
  /**
   * Offset the floating element from the reference.
   */
  offset,

  /**
   * Flip the floating element to the opposite side if needed.
   */
  flip,

  /**
   * Shift the floating element along the axis to keep it in view.
   */
  shift,

  /**
   * Limit how much the floating element can shift.
   */
  limitShift,

  /**
   * Resize the floating element to fit within the boundary.
   */
  size,

  /**
   * Hide the floating element when it's detached from the reference.
   */
  hide,

  /**
   * Automatically choose the best placement.
   */
  autoPlacement,

  /**
   * Improve positioning for inline reference elements.
   */
  inline,

  /**
   * Position an arrow element.
   */
  arrow,
};

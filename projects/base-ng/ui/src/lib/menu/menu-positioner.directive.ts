/**
 * @fileoverview Angular port of Base UI MenuPositioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/positioner/MenuPositioner.tsx
 *
 * Positions the menu popup relative to the trigger.
 */

import {
  afterNextRender,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnDestroy,
} from '@angular/core';
import { MENU_CONTEXT } from './menu.types';
import {
  FloatingService,
  type FloatingPlacement,
} from '../floating-ui';
import { flip, offset, shift } from '@floating-ui/dom';

export type MenuSide = 'top' | 'right' | 'bottom' | 'left';
export type MenuAlign = 'start' | 'center' | 'end';

/**
 * Positioner directive for menus.
 * Handles positioning of the menu popup using Floating UI.
 *
 * @example
 * ```html
 * <div baseUiMenuPositioner side="bottom" align="start">
 *   <div baseUiMenuPopup>...</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuPositioner]',
  standalone: true,
  exportAs: 'menuPositioner',
  host: {
    '[class.base-ui-menu-positioner]': 'true',
    '[style.position]': 'floatingService.strategy()',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.transform]': 'transformStyle()',
    '[style.z-index]': '"1000"',
    '[style.display]': 'context.openSignal() ? null : "none"',
    '[style.pointerEvents]': 'context.openSignal() ? null : "none"',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'sideSignal()',
    '[attr.data-align]': 'alignSignal()',
  },
  providers: [FloatingService],
})
export class MenuPositionerDirective implements OnDestroy {
  protected readonly context = inject(MENU_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * The side of the trigger where the menu should appear.
   */
  readonly side = input<MenuSide>('bottom');

  /**
   * The alignment of the menu relative to the trigger.
   */
  readonly align = input<MenuAlign>('start');

  /**
   * Offset from the trigger along the side axis.
   */
  readonly sideOffset = input(4, { transform: numberAttribute });

  /**
   * Offset from the trigger along the align axis.
   */
  readonly alignOffset = input(0, { transform: numberAttribute });

  /** Computed placement for floating UI */
  readonly placementSignal = computed<FloatingPlacement>(() => {
    const side = this.side();
    const alignment = this.align();
    if (alignment && alignment !== 'center') {
      return `${side}-${alignment}` as FloatingPlacement;
    }
    return side;
  });

  /** Computed side from floating service */
  readonly sideSignal = computed<MenuSide>(() => {
    const placement = this.floatingService.placement();
    return placement.split('-')[0] as MenuSide;
  });

  /** Computed alignment from floating service */
  readonly alignSignal = computed<MenuAlign>(() => {
    const placement = this.floatingService.placement();
    const parts = placement.split('-');
    return parts.length > 1 ? (parts[1] as MenuAlign) : 'center';
  });

  /** Transform style for positioning */
  readonly transformStyle = computed(() => {
    const x = this.floatingService.x();
    const y = this.floatingService.y();
    return `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  });

  constructor() {
    afterNextRender(() => {
      this.floatingService.setFloating(this.elementRef.nativeElement);
      this.setupFloating();
    });

    // Watch for trigger element changes
    effect(() => {
      const trigger = this.context.triggerElement;
      if (trigger) {
        this.floatingService.setReference(trigger);
        this.setupFloating();
      }
    });

    // Update position when open state changes
    effect(() => {
      const isOpen = this.context.openSignal();
      if (isOpen) {
        this.floatingService.startAutoUpdate();
      } else {
        this.floatingService.cleanup();
      }
    });

    // Watch for placement changes
    effect(() => {
      const placement = this.placementSignal();
      const sideOffset = this.sideOffset();
      const alignOffset = this.alignOffset();

      this.floatingService.configure({
        placement,
        middleware: [
          offset({ mainAxis: sideOffset, crossAxis: alignOffset }),
          flip(),
          shift({ padding: 8 }),
        ],
      });
    });
  }

  ngOnDestroy(): void {
    this.floatingService.cleanup();
  }

  /**
   * Setup floating positioning.
   */
  private setupFloating(): void {
    const trigger = this.context.triggerElement;
    if (!trigger) return;

    this.floatingService.setReference(trigger);
    this.floatingService.configure({
      placement: this.placementSignal(),
      middleware: [
        offset({ mainAxis: this.sideOffset(), crossAxis: this.alignOffset() }),
        flip(),
        shift({ padding: 8 }),
      ],
    });
  }
}

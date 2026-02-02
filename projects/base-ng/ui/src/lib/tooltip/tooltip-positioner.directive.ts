/**
 * @fileoverview Angular port of Base UI TooltipPositioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tooltip/positioner/TooltipPositioner.tsx
 *
 * Positions the tooltip against the trigger using floating-ui.
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
  signal,
} from '@angular/core';
import { FloatingService } from '../floating-ui';
import type { FloatingPlacement, Side, Alignment } from '../floating-ui';
import { flip, offset, shift } from '@floating-ui/dom';
import {
  TOOLTIP_CONTEXT,
  TOOLTIP_POSITIONER_CONTEXT,
  type TooltipPositionerContext,
} from './tooltip.types';

/**
 * Positioner directive for tooltips.
 * Uses floating-ui to position the tooltip against the trigger.
 *
 * @example
 * ```html
 * <div baseUiTooltipPositioner>
 *   <div baseUiTooltipPopup>Tooltip content</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiTooltipPositioner]',
  standalone: true,
  exportAs: 'tooltipPositioner',
  host: {
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'sideSignal()',
    '[attr.data-align]': 'alignSignal()',
    '[class.base-ui-tooltip-positioner]': 'true',
    '[style.position]': 'floatingService.strategy()',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.transform]': 'transformStyle()',
    '[style.display]': 'context.openSignal() ? null : "none"',
    '[style.pointerEvents]': 'context.openSignal() ? null : "none"',
  },
  providers: [
    FloatingService,
    {
      provide: TOOLTIP_POSITIONER_CONTEXT,
      useFactory: (directive: TooltipPositionerDirective) =>
        directive.positionerContext,
      deps: [TooltipPositionerDirective],
    },
  ],
})
export class TooltipPositionerDirective implements OnDestroy {
  protected readonly context = inject(TOOLTIP_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * The preferred side of the trigger to position the tooltip.
   */
  readonly side = input<Side>('top');

  /**
   * The preferred alignment of the tooltip.
   */
  readonly align = input<Alignment | null>(null);

  /**
   * The offset from the trigger.
   */
  readonly sideOffset = input(8, { transform: numberAttribute });

  /**
   * The alignment offset.
   */
  readonly alignOffset = input(0, { transform: numberAttribute });

  /** Computed placement */
  readonly placementSignal = computed<FloatingPlacement>(() => {
    const side = this.side();
    const alignment = this.align();
    if (alignment) {
      return `${side}-${alignment}` as FloatingPlacement;
    }
    return side;
  });

  /** Computed side from floating service */
  readonly sideSignal = computed<Side>(() => {
    const placement = this.floatingService.placement();
    return placement.split('-')[0] as Side;
  });

  /** Computed alignment from floating service */
  readonly alignSignal = computed<Alignment | null>(() => {
    const placement = this.floatingService.placement();
    const parts = placement.split('-');
    return parts.length > 1 ? (parts[1] as Alignment) : null;
  });

  /** Transform style for positioning */
  readonly transformStyle = computed(() => {
    const x = this.floatingService.x();
    const y = this.floatingService.y();
    return `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  });

  /** Arrow uncentered state */
  private readonly arrowUncentered = signal(false);

  /** Arrow styles */
  private readonly arrowStyles = computed(() => {
    return this.floatingService.getArrowStyles();
  });

  /** Context for positioner children */
  readonly positionerContext: TooltipPositionerContext = {
    side: this.sideSignal(),
    align: this.alignSignal(),
    arrowUncentered: this.arrowUncentered(),
    arrowStyles: this.arrowStyles(),
  };

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

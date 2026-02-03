/**
 * @directive TooltipPositioner
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/positioner/TooltipPositioner.tsx
 * @reactDocs https://base-ui.com/react/components/tooltip
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
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
  Input,
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

  // Internal signals for reactive updates
  readonly _side = signal<Side>('top');
  readonly _align = signal<Alignment | null>(null);
  readonly _sideOffset = signal(8);
  readonly _alignOffset = signal(0);

  /**
   * The preferred side of the trigger to position the tooltip.
   */
  @Input()
  set side(value: Side) {
    this._side.set(value);
  }
  get side(): Side {
    return this._side();
  }

  /**
   * The preferred alignment of the tooltip.
   */
  @Input()
  set align(value: Alignment | null) {
    this._align.set(value);
  }
  get align(): Alignment | null {
    return this._align();
  }

  /**
   * The offset from the trigger.
   */
  @Input({ transform: numberAttribute })
  set sideOffset(value: number) {
    this._sideOffset.set(value);
  }
  get sideOffset(): number {
    return this._sideOffset();
  }

  /**
   * The alignment offset.
   */
  @Input({ transform: numberAttribute })
  set alignOffset(value: number) {
    this._alignOffset.set(value);
  }
  get alignOffset(): number {
    return this._alignOffset();
  }

  /** Computed placement */
  readonly placementSignal = computed<FloatingPlacement>(() => {
    const side = this._side();
    const alignment = this._align();
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
      const sideOffset = this._sideOffset();
      const alignOffset = this._alignOffset();

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
        offset({ mainAxis: this._sideOffset(), crossAxis: this._alignOffset() }),
        flip(),
        shift({ padding: 8 }),
      ],
    });
  }
}

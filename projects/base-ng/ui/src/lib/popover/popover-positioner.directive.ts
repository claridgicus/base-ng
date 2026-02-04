/**
 * @fileoverview Angular port of Base UI PopoverPositioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/positioner/PopoverPositioner.tsx
 *
 * Positions the popover against the trigger using floating-ui.
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
import { flip, hide, offset, shift } from '@floating-ui/dom';
import {
  POPOVER_CONTEXT,
  POPOVER_POSITIONER_CONTEXT,
  type PopoverPositionerContext,
} from './popover.types';

/**
 * Positioner directive for popovers.
 * Uses floating-ui to position the popover against the trigger.
 *
 * @example
 * ```html
 * <div baseUiPopoverPositioner>
 *   <div baseUiPopoverPopup>Popover content</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverPositioner]',
  standalone: true,
  exportAs: 'popoverPositioner',
  host: {
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-open]': 'context.openSignal() ? "" : null',
    '[attr.data-closed]': '!context.openSignal() ? "" : null',
    '[attr.data-side]': 'sideSignal()',
    '[attr.data-align]': 'alignSignal()',
    '[attr.data-anchor-hidden]': 'anchorHidden() ? "" : null',
    '[class.base-ui-popover-positioner]': 'true',
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
      provide: POPOVER_POSITIONER_CONTEXT,
      useFactory: (directive: PopoverPositionerDirective) =>
        directive.positionerContext,
      deps: [PopoverPositionerDirective],
    },
  ],
})
export class PopoverPositionerDirective implements OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * The preferred side of the trigger to position the popover.
   */
  private readonly _side = signal<Side>('bottom');
  @Input()
  get side(): Side {
    return this._side();
  }
  set side(value: Side) {
    this._side.set(value);
  }

  /**
   * The preferred alignment of the popover.
   */
  private readonly _align = signal<Alignment | null>(null);
  @Input()
  get align(): Alignment | null {
    return this._align();
  }
  set align(value: Alignment | null) {
    this._align.set(value);
  }

  /**
   * The offset from the trigger.
   */
  private readonly _sideOffset = signal(8);
  @Input({ transform: numberAttribute })
  get sideOffset(): number {
    return this._sideOffset();
  }
  set sideOffset(value: number) {
    this._sideOffset.set(value);
  }

  /**
   * The alignment offset.
   */
  private readonly _alignOffset = signal(0);
  @Input({ transform: numberAttribute })
  get alignOffset(): number {
    return this._alignOffset();
  }
  set alignOffset(value: number) {
    this._alignOffset.set(value);
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

  /** Anchor hidden state - when anchor is scrolled out of view */
  readonly anchorHidden = computed(() => {
    const data = this.floatingService.middlewareData();
    const hideData = data?.['hide'] as { referenceHidden?: boolean } | undefined;
    return hideData?.referenceHidden ?? false;
  });

  /** Arrow styles */
  private readonly arrowStyles = computed(() => {
    return this.floatingService.getArrowStyles();
  });

  /** Context for positioner children */
  readonly positionerContext: PopoverPositionerContext = {
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
          hide(),
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
        hide(),
      ],
    });
  }
}

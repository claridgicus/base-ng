/**
 * @fileoverview Angular port of Base UI PreviewCardPositioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/preview-card/positioner/PreviewCardPositioner.tsx
 *
 * Positions the preview card against the trigger using floating-ui.
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
  PREVIEW_CARD_CONTEXT,
  PREVIEW_CARD_POSITIONER_CONTEXT,
  type PreviewCardPositionerContext,
} from './preview-card.types';

/**
 * Positioner directive for preview cards.
 * Uses floating-ui to position the preview card against the trigger.
 *
 * @example
 * ```html
 * <div baseUiPreviewCardPositioner>
 *   <div baseUiPreviewCardPopup>Preview content</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiPreviewCardPositioner]',
  standalone: true,
  exportAs: 'previewCardPositioner',
  host: {
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'sideSignal()',
    '[attr.data-align]': 'alignSignal()',
    '[class.base-ui-preview-card-positioner]': 'true',
    '[style.position]': 'floatingService.strategy()',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.transform]': 'transformStyle()',
    '[style.display]': 'context.openSignal() ? null : "none"',
    '[style.pointerEvents]': 'context.openSignal() ? null : "none"',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
  providers: [
    FloatingService,
    {
      provide: PREVIEW_CARD_POSITIONER_CONTEXT,
      useFactory: (directive: PreviewCardPositionerDirective) =>
        directive.positionerContext,
      deps: [PreviewCardPositionerDirective],
    },
  ],
})
export class PreviewCardPositionerDirective implements OnDestroy {
  protected readonly context = inject(PREVIEW_CARD_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * The preferred side of the trigger to position the preview card.
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
   * The preferred alignment of the preview card.
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
  private readonly _sideOffset = signal<number>(8);
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
  private readonly _alignOffset = signal<number>(0);
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

  /** Arrow styles */
  private readonly arrowStyles = computed(() => {
    return this.floatingService.getArrowStyles();
  });

  /** Context for positioner children */
  readonly positionerContext: PreviewCardPositionerContext = {
    side: this.sideSignal(),
    align: this.alignSignal(),
    arrowUncentered: this.arrowUncentered(),
    arrowStyles: this.arrowStyles(),
  };

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    afterNextRender(() => {
      this.floatingService.setFloating(this.elementRef.nativeElement);
      this.setupFloating();
    });

    // Watch for trigger element changes (use signal to get reactive updates)
    effect(() => {
      const trigger = this.context.triggerElementSignal();
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
    this.clearTimeouts();
  }

  /**
   * Handle mouse enter on positioner (keeps it open).
   */
  protected handleMouseEnter(): void {
    this.clearTimeouts();
  }

  /**
   * Handle mouse leave from positioner.
   */
  protected handleMouseLeave(): void {
    this.clearTimeouts();

    const closeDelay = this.context.closeDelaySignal();
    if (closeDelay > 0) {
      this.closeTimeout = setTimeout(() => {
        this.context.closePreviewCard('pointer-leave');
      }, closeDelay);
    } else {
      this.context.closePreviewCard('pointer-leave');
    }
  }

  /**
   * Clear pending timeouts.
   */
  private clearTimeouts(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  /**
   * Setup floating positioning.
   */
  private setupFloating(): void {
    const trigger = this.context.triggerElementSignal();
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

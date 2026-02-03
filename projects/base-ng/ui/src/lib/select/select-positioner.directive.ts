/**
 * @fileoverview Angular port of Base UI Select Positioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/positioner/SelectPositioner.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  afterNextRender,
  booleanAttribute,
  numberAttribute,
  OnDestroy,
} from '@angular/core';
import { flip, offset, shift, size } from '@floating-ui/dom';
import { FloatingService } from '../floating-ui';
import type { FloatingPlacement, Side, Alignment } from '../floating-ui';
import {
  SELECT_ROOT_CONTEXT,
  SELECT_POSITIONER_CONTEXT,
  type SelectPositionerContext,
  type SelectSide,
  type SelectAlign,
} from './select.types';

/**
 * Select Positioner directive.
 * Positions the select popup relative to the trigger using floating-ui.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectPositioner>
 *   <div baseUiSelectPopup>
 *     <div baseUiSelectList>...</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectPositioner]',
  standalone: true,
  exportAs: 'selectPositioner',
  providers: [
    FloatingService,
    {
      provide: SELECT_POSITIONER_CONTEXT,
      useFactory: (directive: SelectPositionerDirective) =>
        directive.positionerContext,
      deps: [SelectPositionerDirective],
    },
  ],
  host: {
    '[class.base-ui-select-positioner]': 'true',
    '[class.base-ui-select-positioner-open]': 'rootContext.openSignal()',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-side]': 'sideSignal()',
    '[attr.data-align]': 'alignSignal()',
    '[style.position]': 'floatingService.strategy()',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.transform]': 'transformStyle()',
    '[style.zIndex]': '"50"',
    '[style.display]': 'isVisible() ? null : "none"',
    '[style.minWidth]': 'minWidthStyle()',
  },
})
export class SelectPositionerDirective implements OnDestroy {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * The preferred side to position the popup.
   */
  readonly side = input<SelectSide>('bottom');

  /**
   * The preferred alignment of the popup.
   */
  readonly align = input<SelectAlign>('start');

  /**
   * Offset from the trigger along the main axis.
   */
  readonly sideOffset = input(4, { transform: numberAttribute });

  /**
   * Offset from the trigger along the cross axis.
   */
  readonly alignOffset = input(0, { transform: numberAttribute });

  /**
   * Whether to keep the popup mounted when closed.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  /**
   * Whether to align items with the trigger.
   */
  readonly alignItemWithTrigger = input(true, { transform: booleanAttribute });

  /** Computed placement for floating-ui */
  readonly placementSignal = computed<FloatingPlacement>(() => {
    const side = this.side();
    const alignment = this.align();
    if (alignment && alignment !== 'center') {
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

  /** Whether the positioner is visible */
  readonly isVisible = computed(() => {
    return this.rootContext.openSignal() || this.keepMounted();
  });

  /** Min-width style */
  readonly minWidthStyle = computed(() => {
    const trigger = this.rootContext.triggerElement();
    if (!trigger) {
      return 'auto';
    }
    return `${trigger.getBoundingClientRect().width}px`;
  });

  /** Context provided to child components */
  readonly positionerContext: SelectPositionerContext;

  constructor() {
    const self = this;
    this.positionerContext = {
      get alignItemWithTriggerActive() {
        return self.alignItemWithTrigger() && self.rootContext.openMethodSignal() === 'mouse';
      },
      get side() {
        return self.sideSignal();
      },
      get align() {
        return self.alignSignal() || 'start';
      },
    };

    afterNextRender(() => {
      this.floatingService.setFloating(this.elementRef.nativeElement);
      this.setupFloating();
      this.setupClickOutside();
    });

    // Watch for trigger element changes
    effect(() => {
      const trigger = this.rootContext.triggerElement();
      if (trigger) {
        this.floatingService.setReference(trigger);
        this.setupFloating();
      }
    });

    // Update position when open state changes
    effect(() => {
      const isOpen = this.rootContext.openSignal();
      if (isOpen) {
        this.floatingService.startAutoUpdate();
      } else {
        this.floatingService.cleanup();
      }
    });

    // Watch for placement/offset changes
    effect(() => {
      const placement = this.placementSignal();
      const sideOffset = this.sideOffset();
      const alignOffset = this.alignOffset();

      this.floatingService.configure({
        placement,
        middleware: [
          offset({ mainAxis: sideOffset, crossAxis: alignOffset }),
          flip({ padding: 8 }),
          shift({ padding: 8 }),
          size({
            apply({ availableHeight, elements }) {
              Object.assign(elements.floating.style, {
                maxHeight: `${Math.max(100, availableHeight - 8)}px`,
              });
            },
            padding: 8,
          }),
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
    const trigger = this.rootContext.triggerElement();
    if (!trigger) return;

    this.floatingService.setReference(trigger);
    this.floatingService.configure({
      placement: this.placementSignal(),
      middleware: [
        offset({ mainAxis: this.sideOffset(), crossAxis: this.alignOffset() }),
        flip({ padding: 8 }),
        shift({ padding: 8 }),
        size({
          apply({ availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              maxHeight: `${Math.max(100, availableHeight - 8)}px`,
            });
          },
          padding: 8,
        }),
      ],
    });
  }

  private setupClickOutside(): void {
    const handleClickOutside = (event: MouseEvent) => {
      if (!this.rootContext.openSignal()) return;

      const target = event.target as HTMLElement;
      const trigger = this.rootContext.triggerElement();
      const positioner = this.elementRef.nativeElement;

      if (
        trigger &&
        !trigger.contains(target) &&
        !positioner.contains(target)
      ) {
        this.rootContext.setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }
}

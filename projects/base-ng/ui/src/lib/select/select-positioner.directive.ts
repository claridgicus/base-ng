/**
 * @fileoverview Angular port of Base UI Select Positioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/positioner/SelectPositioner.tsx
 */

import {
  Directive,
  Input,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
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

  // Internal signals for inputs
  private readonly sideSignalInternal = signal<SelectSide>('bottom');
  private readonly alignSignalInternal = signal<SelectAlign>('start');
  private readonly sideOffsetSignal = signal(4);
  private readonly alignOffsetSignal = signal(0);
  private readonly keepMountedSignal = signal(false);
  private readonly alignItemWithTriggerSignal = signal(true);

  /**
   * The preferred side to position the popup.
   */
  @Input()
  get side(): SelectSide {
    return this.sideSignalInternal();
  }
  set side(value: SelectSide) {
    this.sideSignalInternal.set(value);
  }

  /**
   * The preferred alignment of the popup.
   */
  @Input()
  get align(): SelectAlign {
    return this.alignSignalInternal();
  }
  set align(value: SelectAlign) {
    this.alignSignalInternal.set(value);
  }

  /**
   * Offset from the trigger along the main axis.
   */
  @Input({ transform: numberAttribute })
  get sideOffset(): number {
    return this.sideOffsetSignal();
  }
  set sideOffset(value: number) {
    this.sideOffsetSignal.set(value);
  }

  /**
   * Offset from the trigger along the cross axis.
   */
  @Input({ transform: numberAttribute })
  get alignOffset(): number {
    return this.alignOffsetSignal();
  }
  set alignOffset(value: number) {
    this.alignOffsetSignal.set(value);
  }

  /**
   * Whether to keep the popup mounted when closed.
   */
  @Input({ transform: booleanAttribute })
  get keepMounted(): boolean {
    return this.keepMountedSignal();
  }
  set keepMounted(value: boolean) {
    this.keepMountedSignal.set(value);
  }

  /**
   * Whether to align items with the trigger.
   */
  @Input({ transform: booleanAttribute })
  get alignItemWithTrigger(): boolean {
    return this.alignItemWithTriggerSignal();
  }
  set alignItemWithTrigger(value: boolean) {
    this.alignItemWithTriggerSignal.set(value);
  }

  /** Computed placement for floating-ui */
  readonly placementSignal = computed<FloatingPlacement>(() => {
    const side = this.sideSignalInternal();
    const alignment = this.alignSignalInternal();
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
    return this.rootContext.openSignal() || this.keepMountedSignal();
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
        return self.alignItemWithTriggerSignal() && self.rootContext.openMethodSignal() === 'mouse';
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
      const sideOffset = this.sideOffsetSignal();
      const alignOffset = this.alignOffsetSignal();

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
        offset({ mainAxis: this.sideOffsetSignal(), crossAxis: this.alignOffsetSignal() }),
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

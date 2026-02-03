/**
 * @fileoverview Angular port of Base UI Combobox Positioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/positioner/ComboboxPositioner.tsx
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
  COMBOBOX_ROOT_CONTEXT,
  COMBOBOX_POSITIONER_CONTEXT,
  type ComboboxPositionerContext,
  type ComboboxSide,
  type ComboboxAlign,
} from './combobox.types';

/**
 * Combobox Positioner directive.
 * Positions the combobox popup relative to the input/trigger using floating-ui.
 * Renders a `<div>` element.
 */
@Directive({
  selector: '[baseUiComboboxPositioner]',
  standalone: true,
  exportAs: 'comboboxPositioner',
  providers: [
    FloatingService,
    {
      provide: COMBOBOX_POSITIONER_CONTEXT,
      useFactory: (directive: ComboboxPositionerDirective) =>
        directive.positionerContext,
      deps: [ComboboxPositionerDirective],
    },
  ],
  host: {
    '[class.base-ui-combobox-positioner]': 'true',
    '[class.base-ui-combobox-positioner-open]': 'rootContext.openSignal()',
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
export class ComboboxPositionerDirective implements OnDestroy {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  protected readonly floatingService = inject(FloatingService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly side = input<ComboboxSide>('bottom');
  readonly align = input<ComboboxAlign>('start');
  readonly sideOffset = input(4, { transform: numberAttribute });
  readonly alignOffset = input(0, { transform: numberAttribute });
  readonly keepMounted = input(false, { transform: booleanAttribute });

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

  readonly isVisible = computed(() => {
    return this.rootContext.openSignal() || this.keepMounted();
  });

  readonly minWidthStyle = computed(() => {
    const input = this.rootContext.inputElement();
    const trigger = this.rootContext.triggerElement();
    const anchor = input || trigger;
    if (!anchor) {
      return 'auto';
    }
    return `${anchor.getBoundingClientRect().width}px`;
  });

  readonly positionerContext: ComboboxPositionerContext;

  constructor() {
    const self = this;
    this.positionerContext = {
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

    // Watch for anchor element changes
    effect(() => {
      const input = this.rootContext.inputElement();
      const trigger = this.rootContext.triggerElement();
      const anchor = input || trigger;
      if (anchor) {
        this.floatingService.setReference(anchor);
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

  private setupFloating(): void {
    const input = this.rootContext.inputElement();
    const trigger = this.rootContext.triggerElement();
    const anchor = input || trigger;
    if (!anchor) return;

    this.floatingService.setReference(anchor);
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
      const input = this.rootContext.inputElement();
      const trigger = this.rootContext.triggerElement();
      const positioner = this.elementRef.nativeElement;
      if (
        (input && input.contains(target)) ||
        (trigger && trigger.contains(target)) ||
        positioner.contains(target)
      ) {
        return;
      }
      this.rootContext.setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
  }
}

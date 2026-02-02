/**
 * @fileoverview Angular port of Base UI Combobox Positioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/positioner/ComboboxPositioner.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  afterNextRender,
  booleanAttribute,
} from '@angular/core';
import {
  COMBOBOX_ROOT_CONTEXT,
  COMBOBOX_POSITIONER_CONTEXT,
  type ComboboxPositionerContext,
  type ComboboxSide,
  type ComboboxAlign,
} from './combobox.types';

/**
 * Combobox Positioner directive.
 * Positions the combobox popup relative to the input/trigger.
 * Renders a `<div>` element.
 */
@Directive({
  selector: '[baseUiComboboxPositioner]',
  standalone: true,
  exportAs: 'comboboxPositioner',
  providers: [
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
    '[attr.data-side]': 'currentSide()',
    '[attr.data-align]': 'currentAlign()',
    '[style.position]': '"absolute"',
    '[style.display]': 'isVisible() ? null : "none"',
    '[style.top]': 'topStyle()',
    '[style.left]': 'leftStyle()',
    '[style.minWidth]': 'minWidthStyle()',
  },
})
export class ComboboxPositionerDirective {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly side = input<ComboboxSide>('bottom');
  readonly align = input<ComboboxAlign>('start');
  readonly sideOffset = input(0);
  readonly alignOffset = input(0);
  readonly keepMounted = input(false, { transform: booleanAttribute });

  readonly currentSide = computed(() => this.side());
  readonly currentAlign = computed(() => this.align());

  readonly isVisible = computed(() => {
    return this.rootContext.openSignal() || this.keepMounted();
  });

  readonly topStyle = computed(() => {
    const input = this.rootContext.inputElement();
    const trigger = this.rootContext.triggerElement();
    const anchor = input || trigger;
    if (!anchor || !this.rootContext.openSignal()) {
      return '0px';
    }
    const rect = anchor.getBoundingClientRect();
    const side = this.side();
    const offset = this.sideOffset();
    return side === 'top' ? `${rect.top - offset}px` : `${rect.bottom + offset}px`;
  });

  readonly leftStyle = computed(() => {
    const input = this.rootContext.inputElement();
    const trigger = this.rootContext.triggerElement();
    const anchor = input || trigger;
    if (!anchor || !this.rootContext.openSignal()) {
      return '0px';
    }
    const rect = anchor.getBoundingClientRect();
    const align = this.align();
    const offset = this.alignOffset();
    switch (align) {
      case 'center':
        return `${rect.left + rect.width / 2 + offset}px`;
      case 'end':
        return `${rect.right + offset}px`;
      default:
        return `${rect.left + offset}px`;
    }
  });

  readonly minWidthStyle = computed(() => {
    const input = this.rootContext.inputElement();
    const trigger = this.rootContext.triggerElement();
    const anchor = input || trigger;
    if (!anchor || !this.rootContext.openSignal()) {
      return 'auto';
    }
    return `${anchor.getBoundingClientRect().width}px`;
  });

  readonly positionerContext: ComboboxPositionerContext;

  constructor() {
    const self = this;
    this.positionerContext = {
      get side() {
        return self.currentSide();
      },
      get align() {
        return self.currentAlign();
      },
    };

    afterNextRender(() => {
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
    });
  }
}

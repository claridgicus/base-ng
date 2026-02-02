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
  signal,
  afterNextRender,
  booleanAttribute,
  untracked,
} from '@angular/core';
import {
  SELECT_ROOT_CONTEXT,
  SELECT_POSITIONER_CONTEXT,
  type SelectPositionerContext,
  type SelectSide,
  type SelectAlign,
} from './select.types';

/**
 * Select Positioner directive.
 * Positions the select popup relative to the trigger.
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
    '[attr.data-side]': 'currentSide()',
    '[attr.data-align]': 'currentAlign()',
    '[style.position]': '"absolute"',
    '[style.display]': 'isVisible() ? null : "none"',
    '[style.top]': 'topStyle()',
    '[style.left]': 'leftStyle()',
    '[style.minWidth]': 'minWidthStyle()',
  },
})
export class SelectPositionerDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
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
  readonly sideOffset = input(0);

  /**
   * Offset from the trigger along the cross axis.
   */
  readonly alignOffset = input(0);

  /**
   * Whether to keep the popup mounted when closed.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  /**
   * Whether to align items with the trigger.
   */
  readonly alignItemWithTrigger = input(true, { transform: booleanAttribute });

  /** Current positioning side - directly uses the input */
  readonly currentSide = computed(() => this.side());

  /** Current positioning alignment - directly uses the input */
  readonly currentAlign = computed(() => this.align());

  /** Whether the positioner is visible */
  readonly isVisible = computed(() => {
    return this.rootContext.openSignal() || this.keepMounted();
  });

  /** Top position style */
  readonly topStyle = computed(() => {
    const trigger = this.rootContext.triggerElement();
    if (!trigger || !this.rootContext.openSignal()) {
      return '0px';
    }

    const triggerRect = trigger.getBoundingClientRect();
    const side = this.side();
    const sideOffset = this.sideOffset();

    let top: number;

    switch (side) {
      case 'top':
        top = triggerRect.top - sideOffset;
        break;
      case 'bottom':
        top = triggerRect.bottom + sideOffset;
        break;
      case 'left':
      case 'right':
        top = triggerRect.top;
        break;
      default:
        top = triggerRect.bottom + sideOffset;
    }

    return `${top}px`;
  });

  /** Left position style */
  readonly leftStyle = computed(() => {
    const trigger = this.rootContext.triggerElement();
    if (!trigger || !this.rootContext.openSignal()) {
      return '0px';
    }

    const triggerRect = trigger.getBoundingClientRect();
    const side = this.side();
    const align = this.align();
    const sideOffset = this.sideOffset();
    const alignOffset = this.alignOffset();

    let left: number;

    if (side === 'left') {
      left = triggerRect.left - sideOffset;
    } else if (side === 'right') {
      left = triggerRect.right + sideOffset;
    } else {
      // top or bottom
      switch (align) {
        case 'start':
          left = triggerRect.left + alignOffset;
          break;
        case 'center':
          left = triggerRect.left + triggerRect.width / 2 + alignOffset;
          break;
        case 'end':
          left = triggerRect.right + alignOffset;
          break;
        default:
          left = triggerRect.left + alignOffset;
      }
    }

    return `${left}px`;
  });

  /** Min-width style */
  readonly minWidthStyle = computed(() => {
    const trigger = this.rootContext.triggerElement();
    if (!trigger || !this.rootContext.openSignal()) {
      return 'auto';
    }

    const triggerRect = trigger.getBoundingClientRect();
    return `${triggerRect.width}px`;
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
        return self.currentSide();
      },
      get align() {
        return self.currentAlign();
      },
    };

    // Handle click outside to close
    afterNextRender(() => {
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
    });
  }
}

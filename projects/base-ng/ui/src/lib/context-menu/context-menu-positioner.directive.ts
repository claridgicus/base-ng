/**
 * @fileoverview Angular port of Base UI ContextMenu Positioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/positioner/MenuPositioner.tsx
 *
 * Positions the context menu popup at the click/touch position.
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
import { CONTEXT_MENU_CONTEXT } from './context-menu.types';
import {
  FloatingService,
  type FloatingPlacement,
} from '../floating-ui';
import { flip, offset, shift } from '@floating-ui/dom';

export type ContextMenuSide = 'top' | 'right' | 'bottom' | 'left';
export type ContextMenuAlign = 'start' | 'center' | 'end';

/**
 * Positioner directive for context menus.
 * Positions the popup at the click/touch coordinates.
 *
 * @example
 * ```html
 * <div baseUiContextMenuPositioner>
 *   <div baseUiContextMenuPopup>...</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiContextMenuPositioner]',
  standalone: true,
  exportAs: 'contextMenuPositioner',
  host: {
    '[class.base-ui-context-menu-positioner]': 'true',
    '[style.position]': '"fixed"',
    '[style.top.px]': 'context.anchorYSignal()',
    '[style.left.px]': 'context.anchorXSignal()',
    '[style.z-index]': '"1000"',
    '[style.display]': 'context.openSignal() ? null : "none"',
    '[style.pointerEvents]': 'context.openSignal() ? null : "none"',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': '_side()',
    '[attr.data-align]': '_align()',
  },
})
export class ContextMenuPositionerDirective implements OnDestroy {
  protected readonly context = inject(CONTEXT_MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Internal signal for side */
  readonly _side = signal<ContextMenuSide>('bottom');

  /**
   * The side of the anchor where the menu should appear.
   */
  @Input()
  set side(value: ContextMenuSide) {
    this._side.set(value);
  }
  get side(): ContextMenuSide {
    return this._side();
  }

  /** Internal signal for align */
  readonly _align = signal<ContextMenuAlign>('start');

  /**
   * The alignment of the menu relative to the anchor.
   */
  @Input()
  set align(value: ContextMenuAlign) {
    this._align.set(value);
  }
  get align(): ContextMenuAlign {
    return this._align();
  }

  /** Internal signal for sideOffset */
  private readonly _sideOffset = signal<number>(0);

  /**
   * Offset from the anchor along the side axis.
   */
  @Input({ transform: numberAttribute })
  set sideOffset(value: number) {
    this._sideOffset.set(value);
  }
  get sideOffset(): number {
    return this._sideOffset();
  }

  /** Internal signal for alignOffset */
  private readonly _alignOffset = signal<number>(0);

  /**
   * Offset from the anchor along the align axis.
   */
  @Input({ transform: numberAttribute })
  set alignOffset(value: number) {
    this._alignOffset.set(value);
  }
  get alignOffset(): number {
    return this._alignOffset();
  }

  constructor() {
    // Ensure menu stays within viewport
    afterNextRender(() => {
      this.adjustPosition();
    });

    // Re-adjust when position changes
    effect(() => {
      const _x = this.context.anchorXSignal();
      const _y = this.context.anchorYSignal();
      const _open = this.context.openSignal();
      if (_open) {
        // Use setTimeout to wait for render
        setTimeout(() => this.adjustPosition(), 0);
      }
    });
  }

  ngOnDestroy(): void {
    // No cleanup needed
  }

  /**
   * Adjust position to keep menu within viewport.
   */
  private adjustPosition(): void {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();

    // Check if menu goes off right edge
    if (rect.right > window.innerWidth) {
      element.style.left = `${window.innerWidth - rect.width - 8}px`;
    }

    // Check if menu goes off bottom edge
    if (rect.bottom > window.innerHeight) {
      element.style.top = `${window.innerHeight - rect.height - 8}px`;
    }

    // Check if menu goes off left edge
    if (rect.left < 0) {
      element.style.left = '8px';
    }

    // Check if menu goes off top edge
    if (rect.top < 0) {
      element.style.top = '8px';
    }
  }
}

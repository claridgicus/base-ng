/**
 * @fileoverview Angular port of Base UI MenuTrigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/trigger/MenuTrigger.tsx
 *
 * A button that opens the menu.
 */

import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  booleanAttribute,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MENU_CONTEXT } from './menu.types';

/**
 * Trigger directive for menus.
 * Opens the menu when clicked.
 *
 * @example
 * ```html
 * <button baseUiMenuTrigger>Open Menu</button>
 * ```
 */
@Directive({
  selector: '[baseUiMenuTrigger]',
  standalone: true,
  exportAs: 'menuTrigger',
  host: {
    type: 'button',
    '[id]': 'context.getTriggerId()',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'context.openSignal()',
    '[attr.aria-controls]': 'ariaControls()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[class.base-ui-menu-trigger]': 'true',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class MenuTriggerDirective implements OnInit, OnDestroy {
  protected readonly context = inject(MENU_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Whether the trigger is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Computed aria-controls attribute.
   */
  readonly ariaControls = computed(() => {
    return this.context.openSignal() ? this.context.getPopupId() : null;
  });

  ngOnInit(): void {
    this.context.setTriggerElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setTriggerElement(null);
  }

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    const isOpen = this.context.openSignal();
    this.context.setOpen(!isOpen, 'trigger-press');
  }

  /**
   * Handle keydown events for keyboard navigation.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const isOpen = this.context.openSignal();

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.context.setOpen(!isOpen, 'trigger-press');
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          this.context.openMenu('trigger-press');
        } else {
          this.context.navigateToItem('first');
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          this.context.openMenu('trigger-press');
        } else {
          this.context.navigateToItem('last');
        }
        break;
    }
  }
}

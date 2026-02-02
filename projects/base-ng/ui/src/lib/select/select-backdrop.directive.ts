/**
 * @fileoverview Angular port of Base UI Select Backdrop
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/backdrop/SelectBackdrop.tsx
 */

import {
  Directive,
  computed,
  inject,
  signal,
  effect,
  input,
  booleanAttribute,
} from '@angular/core';
import type { TransitionStatus } from '../utils';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select Backdrop directive.
 * An optional backdrop element behind the select popup.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectRoot>
 *   <button baseUiSelectTrigger>...</button>
 *   <div baseUiSelectBackdrop></div>
 *   <div baseUiSelectPositioner>...</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectBackdrop]',
  standalone: true,
  exportAs: 'selectBackdrop',
  host: {
    '[class.base-ui-select-backdrop]': 'true',
    '[class.base-ui-select-backdrop-open]': 'rootContext.openSignal()',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-starting-style]': 'transitionStatus() === "starting" ? "" : null',
    '[attr.data-ending-style]': 'transitionStatus() === "ending" ? "" : null',
    '[style.display]': 'isVisible() ? null : "none"',
    '[style.position]': '"fixed"',
    '[style.inset]': '"0"',
    '(click)': 'handleClick()',
  },
})
export class SelectBackdropDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);

  /**
   * Whether to keep the backdrop mounted when closed.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  private readonly transitionStatusInternal = signal<TransitionStatus>(undefined);

  /** Transition status */
  readonly transitionStatus = this.transitionStatusInternal.asReadonly();

  /** Whether the backdrop is visible */
  readonly isVisible = computed(() => {
    return this.rootContext.openSignal() || this.keepMounted();
  });

  constructor() {
    // Track open state for transitions
    effect(() => {
      const isOpen = this.rootContext.openSignal();
      if (isOpen) {
        this.transitionStatusInternal.set('starting');
        requestAnimationFrame(() => {
          this.transitionStatusInternal.set(undefined);
        });
      } else {
        this.transitionStatusInternal.set('ending');
      }
    }, { allowSignalWrites: true });
  }

  handleClick(): void {
    this.rootContext.setOpen(false);
  }
}

/**
 * @fileoverview Angular port of Base UI PopoverPopup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/popup/PopoverPopup.tsx
 *
 * A container for the popover contents with focus management.
 */

import {
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { POPOVER_CONTEXT, POPOVER_POSITIONER_CONTEXT } from './popover.types';

/**
 * Popup directive for popovers.
 * Contains the popover content with focus management.
 *
 * @example
 * ```html
 * <div baseUiPopoverPopup>Popover content</div>
 *
 * <!-- With focus management -->
 * <div baseUiPopoverPopup [initialFocus]="inputRef">
 *   <input #inputRef />
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverPopup]',
  standalone: true,
  exportAs: 'popoverPopup',
  host: {
    role: 'dialog',
    '[id]': 'context.getPopupId()',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-modal]': 'isModal()',
    '[attr.data-state]': 'context.openSignal() ? "open" : "closed"',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[class.base-ui-popover-popup]': 'true',
    '[class.base-ui-popover-popup-open]': 'context.openSignal()',
    '[class.base-ui-popover-popup-closed]': '!context.openSignal()',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class PopoverPopupDirective implements OnInit, OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);
  protected readonly positionerContext = inject(POPOVER_POSITIONER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Element to focus when the popover opens.
   * Can be an HTMLElement or a selector string.
   */
  readonly initialFocus = input<HTMLElement | string | null>(null);

  /**
   * Element to focus when the popover closes.
   * Defaults to the trigger element.
   */
  readonly finalFocus = input<HTMLElement | string | null>(null);

  private previouslyFocusedElement: HTMLElement | null = null;

  /**
   * Computed aria-labelledby attribute.
   */
  readonly ariaLabelledBy = computed(() => {
    return this.context.titleIdSignal();
  });

  /**
   * Computed aria-describedby attribute.
   */
  readonly ariaDescribedBy = computed(() => {
    return this.context.descriptionIdSignal();
  });

  /**
   * Computed aria-modal attribute.
   */
  readonly isModal = computed(() => {
    const modal = this.context.modalSignal();
    return modal === true || modal === 'trap-focus' ? 'true' : null;
  });

  constructor() {
    // Handle focus management when open state changes
    effect(() => {
      const isOpen = this.context.openSignal();
      if (isOpen) {
        this.handleFocusOnOpen();
      }
    });
  }

  ngOnInit(): void {
    this.context.setPopupElement(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.context.setPopupElement(null);
  }

  /**
   * Handle focus when popover opens.
   */
  private handleFocusOnOpen(): void {
    // Store the currently focused element
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Focus the initial focus element after a microtask
    queueMicrotask(() => {
      const initialFocusTarget = this.resolveElement(this.initialFocus());

      if (initialFocusTarget) {
        initialFocusTarget.focus();
      } else {
        // Focus the popup itself or the first focusable element
        const firstFocusable = this.getFirstFocusableElement();
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          this.elementRef.nativeElement.focus();
        }
      }
    });
  }

  /**
   * Handle focus when popover closes.
   */
  handleFocusOnClose(): void {
    const finalFocusTarget = this.resolveElement(this.finalFocus());

    if (finalFocusTarget) {
      finalFocusTarget.focus();
    } else if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    } else if (this.context.triggerElement) {
      this.context.triggerElement.focus();
    }
  }

  /**
   * Handle keydown for focus trapping.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    const modal = this.context.modalSignal();

    if (modal !== 'trap-focus' && modal !== true) {
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  /**
   * Trap focus within the popup.
   */
  private trapFocus(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift+Tab: if on first element, move to last
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: if on last element, move to first
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Get all focusable elements within the popup.
   */
  private getFocusableElements(): HTMLElement[] {
    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.elementRef.nativeElement.querySelectorAll(selector));
  }

  /**
   * Get the first focusable element within the popup.
   */
  private getFirstFocusableElement(): HTMLElement | null {
    const focusable = this.getFocusableElements();
    return focusable.length > 0 ? focusable[0] : null;
  }

  /**
   * Resolve an element from a reference or selector.
   */
  private resolveElement(ref: HTMLElement | string | null): HTMLElement | null {
    if (!ref) {
      return null;
    }

    if (ref instanceof HTMLElement) {
      return ref;
    }

    return document.querySelector(ref) as HTMLElement | null;
  }
}

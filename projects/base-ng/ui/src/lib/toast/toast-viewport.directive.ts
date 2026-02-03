/**
 * @fileoverview Angular port of Base UI Toast Viewport
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/viewport/ToastViewport.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  Input,
  signal,
  HostListener,
} from '@angular/core';
import { TOAST_PROVIDER_CONTEXT } from './toast.types';

/**
 * Toast Viewport directive.
 * Container for toast notifications with accessibility features.
 *
 * @example
 * ```html
 * <div baseUiToastProvider>
 *   <div baseUiToastViewport>
 *     <!-- toasts rendered here -->
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToastViewport]',
  standalone: true,
  exportAs: 'toastViewport',
  host: {
    role: 'region',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-label]': '_ariaLabel()',
    '[attr.data-hovering]': 'providerContext.hoveringSignal() ? "" : null',
    '[attr.data-focused]': 'providerContext.focusedSignal() ? "" : null',
    '[tabindex]': '-1',
    '[class.base-ui-toast-viewport]': 'true',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
  },
})
export class ToastViewportDirective {
  protected readonly providerContext = inject(TOAST_PROVIDER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Aria label for the viewport (internal signal) */
  readonly _ariaLabel = signal<string>('Notifications');

  @Input()
  set ariaLabel(value: string) { this._ariaLabel.set(value); }
  get ariaLabel(): string { return this._ariaLabel(); }

  /** Number of toasts */
  readonly toastCount = computed(() => {
    return this.providerContext.toastsSignal().filter((t) => !t.limited).length;
  });

  /**
   * Handle mouse enter to pause timers.
   */
  handleMouseEnter(): void {
    this.providerContext.setHovering(true);
    this.providerContext.pauseTimers();
  }

  /**
   * Handle mouse leave to resume timers.
   */
  handleMouseLeave(): void {
    this.providerContext.setHovering(false);
    this.providerContext.resumeTimers();
  }

  /**
   * Handle focus to pause timers.
   */
  handleFocus(): void {
    this.providerContext.setFocused(true);
    this.providerContext.pauseTimers();
  }

  /**
   * Handle blur to resume timers.
   */
  handleBlur(): void {
    this.providerContext.setFocused(false);

    // Only resume if not hovering
    if (!this.providerContext.hoveringSignal()) {
      this.providerContext.resumeTimers();
    }
  }

  /**
   * Handle keyboard events.
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    // F6 key focuses the viewport
    if (event.key === 'F6') {
      this.elementRef.nativeElement.focus();
      this.providerContext.pauseTimers();
    }
  }
}

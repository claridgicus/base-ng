/**
 * @fileoverview Angular port of Base UI AvatarFallback
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/avatar/fallback/AvatarFallback.tsx
 *
 * Fallback content displayed when the image fails to load or is unavailable.
 */

import {
  computed,
  Directive,
  effect,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  type Signal,
} from '@angular/core';
import { AVATAR_CONTEXT } from './avatar.types';

/**
 * Fallback directive that shows content when image isn't loaded.
 * Supports optional delay before showing the fallback.
 *
 * @example
 * ```html
 * <span baseUiAvatarRoot>
 *   <img baseUiAvatarImage src="user.jpg" alt="User" />
 *   <span baseUiAvatarFallback>JD</span>
 * </span>
 *
 * <!-- With delay to prevent flash -->
 * <span baseUiAvatarRoot>
 *   <img baseUiAvatarImage src="user.jpg" alt="User" />
 *   <span baseUiAvatarFallback [delay]="200">JD</span>
 * </span>
 * ```
 */
@Directive({
  selector: '[baseUiAvatarFallback]',
  standalone: true,
  exportAs: 'avatarFallback',
  host: {
    '[attr.data-image-loading-status]': 'context.imageLoadingStatus()',
    '[class.base-ui-avatar-fallback]': 'true',
    '[style.display]': 'shouldShow() ? null : "none"',
  },
})
export class AvatarFallbackDirective implements OnInit, OnDestroy {
  protected readonly context = inject(AVATAR_CONTEXT);

  /**
   * Delay in milliseconds before showing the fallback.
   * Useful to prevent a flash of fallback content when the image loads quickly.
   */
  private readonly _delay = signal<number | undefined>(undefined);

  @Input()
  set delay(value: number | undefined) { this._delay.set(value); }
  get delay(): number | undefined { return this._delay(); }

  // Internal state
  private readonly delayPassed = signal(true);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Whether the fallback should be displayed.
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    const status = this.context.imageLoadingStatus();
    return status !== 'loaded' && this.delayPassed();
  });

  constructor() {
    // Handle delay changes
    effect(() => {
      const delayMs = this._delay();
      if (delayMs !== undefined) {
        this.delayPassed.set(false);
        this.clearTimeout();
        this.timeoutId = setTimeout(() => {
          this.delayPassed.set(true);
        }, delayMs);
      } else {
        this.delayPassed.set(true);
      }
    });
  }

  ngOnInit(): void {
    // Initialize delay state
    const delayMs = this._delay();
    if (delayMs === undefined) {
      this.delayPassed.set(true);
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  private clearTimeout(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

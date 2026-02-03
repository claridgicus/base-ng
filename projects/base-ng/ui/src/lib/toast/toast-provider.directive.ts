/**
 * @fileoverview Angular port of Base UI Toast Provider
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/provider/ToastProvider.tsx
 */

import {
  Directive,
  inject,
  Input,
  signal,
  computed,
  OnInit,
  OnDestroy,
  numberAttribute,
} from '@angular/core';
import {
  TOAST_PROVIDER_CONTEXT,
  ToastProviderContext,
  ToastObject,
  ToastAddOptions,
  ToastUpdateOptions,
  SwipeDirection,
} from './toast.types';
import { ToastManagerService } from './toast-manager.service';

/**
 * Toast Provider directive.
 * Manages toast state, timers, and provides context to toast components.
 *
 * @example
 * ```html
 * <div baseUiToastProvider [timeout]="5000" [limit]="3">
 *   <div baseUiToastViewport>
 *     <div *ngFor="let toast of toasts()" baseUiToastRoot [toast]="toast">
 *       <!-- toast content -->
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToastProvider]',
  standalone: true,
  exportAs: 'toastProvider',
  providers: [
    {
      provide: TOAST_PROVIDER_CONTEXT,
      useFactory: (directive: ToastProviderDirective) => directive.context,
      deps: [ToastProviderDirective],
    },
  ],
  host: {
    '[class.base-ui-toast-provider]': 'true',
  },
})
export class ToastProviderDirective implements OnInit, OnDestroy {
  private readonly toastManager = inject(ToastManagerService);

  /** Default timeout for toasts in milliseconds (internal signal) */
  private readonly _timeout = signal<number>(5000);

  @Input({ transform: numberAttribute })
  set timeout(value: number) { this._timeout.set(value); }
  get timeout(): number { return this._timeout(); }

  /** Maximum number of visible toasts (internal signal) */
  private readonly _limit = signal<number>(3);

  @Input({ transform: numberAttribute })
  set limit(value: number) { this._limit.set(value); }
  get limit(): number { return this._limit(); }

  /** Swipe directions that dismiss toasts (internal signal) */
  private readonly _swipeDirections = signal<SwipeDirection[]>(['right', 'left']);

  @Input()
  set swipeDirections(value: SwipeDirection[]) { this._swipeDirections.set(value); }
  get swipeDirections(): SwipeDirection[] { return this._swipeDirections(); }

  // Internal state
  private readonly toastsInternal = signal<ToastObject[]>([]);
  private readonly hoveringInternal = signal(false);
  private readonly focusedInternal = signal(false);

  // Timer tracking
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private pausedAt: number | null = null;

  // Public signals
  readonly toasts = computed(() => this.toastsInternal());
  readonly hovering = computed(() => this.hoveringInternal());
  readonly focused = computed(() => this.focusedInternal());

  /** Context for child components */
  readonly context: ToastProviderContext;

  private unsubscribe: (() => void) | null = null;

  constructor() {
    const self = this;

    this.context = {
      toastsSignal: this.toasts,
      hoveringSignal: this.hovering,
      focusedSignal: this.focused,
      get timeout() {
        return self._timeout();
      },
      get limit() {
        return self._limit();
      },
      get swipeDirections() {
        return self._swipeDirections();
      },
      add: this.add.bind(this),
      close: this.close.bind(this),
      remove: this.remove.bind(this),
      update: this.update.bind(this),
      pauseTimers: this.pauseTimers.bind(this),
      resumeTimers: this.resumeTimers.bind(this),
      setHovering: (h) => this.hoveringInternal.set(h),
      setFocused: (f) => this.focusedInternal.set(f),
      setToastHeight: this.setToastHeight.bind(this),
    };
  }

  ngOnInit(): void {
    // Subscribe to external toast manager
    this.unsubscribe = this.toastManager.subscribe((event) => {
      switch (event.type) {
        case 'add':
          if (event.toast) {
            this.addToast(event.toast);
          }
          break;
        case 'close':
          if (event.toast?.id) {
            this.close(event.toast.id);
          }
          break;
        case 'update':
          if (event.options) {
            this.update(event.options as ToastUpdateOptions);
          }
          break;
      }
    });
  }

  ngOnDestroy(): void {
    // Clear all timers
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();

    // Unsubscribe from manager
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Add a toast.
   */
  add(options: ToastAddOptions): string {
    const id = options.id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const toast: ToastObject = {
      ...options,
      id,
      type: options.type ?? 'default',
      priority: options.priority ?? 'normal',
      timeout: options.timeout ?? this._timeout(),
      transitionStatus: 'starting',
      addedAt: Date.now(),
    };

    this.addToast(toast);
    return id;
  }

  /**
   * Internal method to add a toast to state.
   */
  private addToast(toast: ToastObject): void {
    this.toastsInternal.update((toasts) => {
      const newToasts = [...toasts, toast];

      // Mark toasts over limit as limited
      const visibleCount = newToasts.filter((t) => !t.limited && t.transitionStatus !== 'ending').length;
      if (visibleCount > this._limit()) {
        const excessCount = visibleCount - this._limit();
        let marked = 0;
        return newToasts.map((t) => {
          if (!t.limited && t.transitionStatus !== 'ending' && marked < excessCount) {
            marked++;
            return { ...t, limited: true };
          }
          return t;
        });
      }

      return newToasts;
    });

    // Schedule auto-dismiss timer
    const toastTimeout = toast.timeout ?? this._timeout();
    if (toastTimeout > 0) {
      this.scheduleTimer(toast.id, toastTimeout);
    }
  }

  /**
   * Close a toast (start exit transition).
   */
  close(id: string): void {
    // Clear timer
    this.clearTimer(id);

    // Get toast for callback
    const toast = this.toastsInternal().find((t) => t.id === id);
    if (toast?.onClose) {
      toast.onClose();
    }

    // Start exit transition
    this.toastsInternal.update((toasts) =>
      toasts.map((t) =>
        t.id === id ? { ...t, transitionStatus: 'ending' as const } : t
      )
    );

    // Schedule removal after transition
    setTimeout(() => {
      this.remove(id);
    }, 200); // Match CSS transition duration
  }

  /**
   * Remove a toast completely.
   */
  remove(id: string): void {
    const toast = this.toastsInternal().find((t) => t.id === id);
    if (toast?.onRemove) {
      toast.onRemove();
    }

    this.toastsInternal.update((toasts) => toasts.filter((t) => t.id !== id));

    // Unmark a limited toast if we have capacity
    const currentToasts = this.toastsInternal();
    const visibleCount = currentToasts.filter((t) => !t.limited && t.transitionStatus !== 'ending').length;
    if (visibleCount < this._limit()) {
      const limitedToast = currentToasts.find((t) => t.limited);
      if (limitedToast) {
        this.toastsInternal.update((toasts) =>
          toasts.map((t) =>
            t.id === limitedToast.id ? { ...t, limited: false } : t
          )
        );
      }
    }
  }

  /**
   * Update a toast.
   */
  update(options: ToastUpdateOptions): void {
    const { id, ...updates } = options;

    this.toastsInternal.update((toasts) =>
      toasts.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );

    // Reschedule timer if timeout changed
    if (updates.timeout !== undefined) {
      this.clearTimer(id);
      if (updates.timeout > 0) {
        this.scheduleTimer(id, updates.timeout);
      }
    }
  }

  /**
   * Schedule an auto-dismiss timer.
   */
  private scheduleTimer(id: string, timeout: number): void {
    this.clearTimer(id);

    const timer = setTimeout(() => {
      this.close(id);
    }, timeout);

    this.timers.set(id, timer);
  }

  /**
   * Clear a toast's timer.
   */
  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }

  /**
   * Pause all timers.
   */
  pauseTimers(): void {
    if (this.pausedAt !== null) return;

    this.pausedAt = Date.now();

    // Store remaining time for each toast
    this.toastsInternal.update((toasts) =>
      toasts.map((t) => {
        const timer = this.timers.get(t.id);
        if (timer && t.addedAt && t.timeout) {
          const elapsed = Date.now() - t.addedAt;
          const remaining = Math.max(0, t.timeout - elapsed);
          return { ...t, paused: true, remainingTime: remaining };
        }
        return { ...t, paused: true };
      })
    );

    // Clear all timers
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  /**
   * Resume all timers.
   */
  resumeTimers(): void {
    if (this.pausedAt === null) return;

    this.pausedAt = null;

    // Reschedule timers with remaining time
    const toasts = this.toastsInternal();
    toasts.forEach((toast) => {
      if (toast.remainingTime && toast.remainingTime > 0) {
        this.scheduleTimer(toast.id, toast.remainingTime);
      }
    });

    // Clear paused state
    this.toastsInternal.update((toasts) =>
      toasts.map((t) => ({ ...t, paused: false, remainingTime: undefined }))
    );
  }

  /**
   * Set toast height.
   */
  setToastHeight(id: string, height: number): void {
    this.toastsInternal.update((toasts) =>
      toasts.map((t) => (t.id === id ? { ...t, height } : t))
    );
  }
}

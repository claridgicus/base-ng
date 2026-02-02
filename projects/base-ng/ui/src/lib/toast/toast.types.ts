/**
 * @fileoverview Angular port of Base UI Toast types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast
 */

import { InjectionToken, Signal, TemplateRef } from '@angular/core';

/** Transition status for toast animations */
export type TransitionStatus = 'starting' | 'ending' | undefined;

/** Toast type for styling */
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

/** Toast priority for accessibility */
export type ToastPriority = 'normal' | 'high';

/** Swipe direction for dismissal */
export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Toast data object.
 */
export interface ToastData {
  /** Unique identifier */
  id: string;
  /** Toast title */
  title?: string;
  /** Toast description */
  description?: string;
  /** Toast type for styling */
  type?: ToastType;
  /** Priority level for accessibility */
  priority?: ToastPriority;
  /** Auto-dismiss timeout in milliseconds (0 = no auto-dismiss) */
  timeout?: number;
  /** Callback when toast is closed */
  onClose?: () => void;
  /** Callback when toast is removed from DOM */
  onRemove?: () => void;
  /** Custom data */
  data?: unknown;
}

/**
 * Internal toast object with state.
 */
export interface ToastObject extends ToastData {
  /** Transition status */
  transitionStatus?: TransitionStatus;
  /** Measured height */
  height?: number;
  /** Whether toast is paused */
  paused?: boolean;
  /** Remaining time when paused */
  remainingTime?: number;
  /** Timestamp when toast was added */
  addedAt?: number;
  /** Whether marked as limited (over limit) */
  limited?: boolean;
}

/**
 * Options for adding a toast.
 */
export interface ToastAddOptions extends Omit<ToastData, 'id'> {
  /** Custom ID (auto-generated if not provided) */
  id?: string;
}

/**
 * Options for updating a toast.
 */
export interface ToastUpdateOptions extends Partial<ToastData> {
  /** Toast ID to update */
  id: string;
}

/**
 * Promise toast options.
 */
export interface ToastPromiseOptions<T, E = Error> {
  /** Loading state configuration */
  loading: ToastAddOptions | string;
  /** Success state configuration (receives promise result) */
  success: ToastAddOptions | string | ((result: T) => ToastAddOptions | string);
  /** Error state configuration (receives error) */
  error: ToastAddOptions | string | ((error: E) => ToastAddOptions | string);
}

/**
 * Toast manager event types.
 */
export type ToastManagerEventType = 'add' | 'close' | 'update' | 'promise';

/**
 * Toast manager event.
 */
export interface ToastManagerEvent {
  type: ToastManagerEventType;
  toast?: ToastObject;
  options?: ToastAddOptions | ToastUpdateOptions;
}

/**
 * Toast manager listener function.
 */
export type ToastManagerListener = (event: ToastManagerEvent) => void;

/**
 * Toast manager interface.
 */
export interface ToastManager {
  /** Add a new toast */
  add: (options: ToastAddOptions) => string;
  /** Close a toast */
  close: (id: string) => void;
  /** Update a toast */
  update: (options: ToastUpdateOptions) => void;
  /** Promise-based toast */
  promise: <T, E = Error>(promise: Promise<T>, options: ToastPromiseOptions<T, E>) => Promise<T>;
  /** Subscribe to manager events */
  subscribe: (listener: ToastManagerListener) => () => void;
}

/**
 * Toast provider configuration.
 */
export interface ToastProviderConfig {
  /** Default timeout for toasts (default: 5000) */
  timeout?: number;
  /** Maximum number of visible toasts (default: 3) */
  limit?: number;
  /** Swipe directions that dismiss toasts */
  swipeDirections?: SwipeDirection[];
}

/**
 * State exposed by toast provider.
 */
export interface ToastProviderState {
  readonly toasts: ToastObject[];
  readonly hovering: boolean;
  readonly focused: boolean;
}

/**
 * Context provided by toast provider.
 */
export interface ToastProviderContext {
  /** All toasts */
  toastsSignal: Signal<ToastObject[]>;
  /** Whether viewport is hovered */
  hoveringSignal: Signal<boolean>;
  /** Whether viewport is focused */
  focusedSignal: Signal<boolean>;
  /** Default timeout */
  timeout: number;
  /** Toast limit */
  limit: number;
  /** Swipe directions */
  swipeDirections: SwipeDirection[];
  /** Add a toast */
  add: (options: ToastAddOptions) => string;
  /** Close a toast */
  close: (id: string) => void;
  /** Remove a toast completely */
  remove: (id: string) => void;
  /** Update a toast */
  update: (options: ToastUpdateOptions) => void;
  /** Pause all timers */
  pauseTimers: () => void;
  /** Resume all timers */
  resumeTimers: () => void;
  /** Set hovering state */
  setHovering: (hovering: boolean) => void;
  /** Set focused state */
  setFocused: (focused: boolean) => void;
  /** Update toast height */
  setToastHeight: (id: string, height: number) => void;
}

/**
 * State for individual toast root.
 */
export interface ToastRootState {
  readonly type: ToastType;
  readonly priority: ToastPriority;
  readonly swiping: boolean;
  readonly transitionStatus: TransitionStatus;
}

/**
 * Context provided by toast root.
 */
export interface ToastRootContext {
  toast: ToastObject;
  close: () => void;
  titleId: string;
  descriptionId: string;
}

/**
 * State for toast viewport.
 */
export interface ToastViewportState {
  readonly toastCount: number;
  readonly hovering: boolean;
  readonly focused: boolean;
}

/**
 * Injection token for toast provider context.
 */
export const TOAST_PROVIDER_CONTEXT = new InjectionToken<ToastProviderContext>(
  'TOAST_PROVIDER_CONTEXT'
);

/**
 * Injection token for toast root context.
 */
export const TOAST_ROOT_CONTEXT = new InjectionToken<ToastRootContext>(
  'TOAST_ROOT_CONTEXT'
);

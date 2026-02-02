/**
 * @fileoverview Angular port of Base UI Toast Manager
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toast/createToastManager.ts
 */

import { Injectable } from '@angular/core';
import {
  ToastManager,
  ToastManagerEvent,
  ToastManagerListener,
  ToastAddOptions,
  ToastUpdateOptions,
  ToastPromiseOptions,
  ToastObject,
} from './toast.types';

let toastCounter = 0;

/**
 * Creates a unique toast ID.
 */
function generateToastId(): string {
  return `toast-${++toastCounter}`;
}

/**
 * Toast Manager Service.
 * Provides a centralized way to manage toast notifications from anywhere in the application.
 *
 * @example
 * ```typescript
 * // In a component or service
 * constructor(private toastManager: ToastManagerService) {}
 *
 * showSuccess() {
 *   this.toastManager.add({
 *     title: 'Success!',
 *     description: 'Your action was completed.',
 *     type: 'success',
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ToastManagerService implements ToastManager {
  private listeners: ToastManagerListener[] = [];

  /**
   * Emit an event to all listeners.
   */
  private emit(event: ToastManagerEvent): void {
    this.listeners.forEach((listener) => listener(event));
  }

  /**
   * Add a new toast.
   * @returns The toast ID
   */
  add(options: ToastAddOptions): string {
    const id = options.id ?? generateToastId();
    const toast: ToastObject = {
      ...options,
      id,
      type: options.type ?? 'default',
      priority: options.priority ?? 'normal',
      transitionStatus: 'starting',
      addedAt: Date.now(),
    };

    this.emit({ type: 'add', toast, options });
    return id;
  }

  /**
   * Close a toast.
   */
  close(id: string): void {
    this.emit({
      type: 'close',
      toast: { id } as ToastObject,
    });
  }

  /**
   * Update a toast.
   */
  update(options: ToastUpdateOptions): void {
    this.emit({
      type: 'update',
      options,
    });
  }

  /**
   * Promise-based toast.
   * Shows a loading toast that transitions to success/error based on promise result.
   */
  async promise<T, E = Error>(
    promise: Promise<T>,
    options: ToastPromiseOptions<T, E>
  ): Promise<T> {
    // Create loading toast
    const loadingOptions =
      typeof options.loading === 'string'
        ? { title: options.loading, type: 'loading' as const }
        : { ...options.loading, type: 'loading' as const };

    const id = this.add(loadingOptions);

    try {
      const result = await promise;

      // Update to success state
      const successConfig =
        typeof options.success === 'function'
          ? options.success(result)
          : options.success;

      const successOptions =
        typeof successConfig === 'string'
          ? { title: successConfig, type: 'success' as const }
          : { ...successConfig, type: 'success' as const };

      this.update({ id, ...successOptions });
      return result;
    } catch (error) {
      // Update to error state
      const errorConfig =
        typeof options.error === 'function'
          ? options.error(error as E)
          : options.error;

      const errorOptions =
        typeof errorConfig === 'string'
          ? { title: errorConfig, type: 'error' as const }
          : { ...errorConfig, type: 'error' as const };

      this.update({ id, ...errorOptions });
      throw error;
    }
  }

  /**
   * Subscribe to toast manager events.
   * @returns Unsubscribe function
   */
  subscribe(listener: ToastManagerListener): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

/**
 * Factory function to create a toast manager instance.
 * Useful for creating managers outside of Angular DI.
 */
export function createToastManager(): ToastManager {
  return new ToastManagerService();
}

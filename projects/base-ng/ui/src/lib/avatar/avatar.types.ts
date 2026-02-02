/**
 * @fileoverview Angular port of Base UI Avatar types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/avatar/root/AvatarRoot.tsx
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

/**
 * Image loading status values.
 */
export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Avatar state containing image loading status.
 */
export interface AvatarState {
  imageLoadingStatus: ImageLoadingStatus;
}

/**
 * Context provided by AvatarRoot to child components.
 */
export interface AvatarContext {
  /** Current image loading status */
  imageLoadingStatus: Signal<ImageLoadingStatus>;
  /** Set the image loading status */
  setImageLoadingStatus: (status: ImageLoadingStatus) => void;
}

/**
 * Injection token for AvatarContext.
 */
export const AVATAR_CONTEXT = new InjectionToken<AvatarContext>('AVATAR_CONTEXT');

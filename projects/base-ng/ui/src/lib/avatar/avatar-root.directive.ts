/**
 * @fileoverview Angular port of Base UI AvatarRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/avatar/root/AvatarRoot.tsx
 *
 * Displays a user's profile picture, initials, or fallback icon.
 */

import {
  computed,
  Directive,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import {
  AVATAR_CONTEXT,
  AvatarContext,
  AvatarState,
  ImageLoadingStatus,
} from './avatar.types';

/**
 * Root directive for Avatar component that manages image loading state.
 *
 * @example
 * ```html
 * <span baseUiAvatarRoot>
 *   <img baseUiAvatarImage src="user.jpg" alt="User" />
 *   <span baseUiAvatarFallback>JD</span>
 * </span>
 * ```
 */
@Directive({
  selector: '[baseUiAvatarRoot]',
  standalone: true,
  exportAs: 'avatarRoot',
  providers: [
    {
      provide: AVATAR_CONTEXT,
      useFactory: (directive: AvatarRootDirective) => directive.context,
      deps: [AvatarRootDirective],
    },
  ],
  host: {
    '[attr.data-image-loading-status]': 'imageLoadingStatus()',
    '[class.base-ui-avatar]': 'true',
    '[class.base-ui-avatar-idle]': 'imageLoadingStatus() === "idle"',
    '[class.base-ui-avatar-loading]': 'imageLoadingStatus() === "loading"',
    '[class.base-ui-avatar-loaded]': 'imageLoadingStatus() === "loaded"',
    '[class.base-ui-avatar-error]': 'imageLoadingStatus() === "error"',
  },
})
export class AvatarRootDirective {
  // Internal state
  private readonly _imageLoadingStatus: WritableSignal<ImageLoadingStatus> = signal('idle');

  /**
   * Current image loading status.
   */
  readonly imageLoadingStatus: Signal<ImageLoadingStatus> = this._imageLoadingStatus.asReadonly();

  /**
   * Current state object.
   */
  readonly state: Signal<AvatarState> = computed(() => ({
    imageLoadingStatus: this.imageLoadingStatus(),
  }));

  /**
   * Context provided to child components.
   */
  readonly context: AvatarContext = {
    imageLoadingStatus: this.imageLoadingStatus,
    setImageLoadingStatus: (status: ImageLoadingStatus) => {
      this._imageLoadingStatus.set(status);
    },
  };
}

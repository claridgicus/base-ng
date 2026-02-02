/**
 * @fileoverview Angular port of Base UI AvatarImage
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/avatar/image/AvatarImage.tsx
 *
 * The image element for displaying the avatar picture.
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { AVATAR_CONTEXT, ImageLoadingStatus } from './avatar.types';

/**
 * Image directive that tracks loading status for the avatar.
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
  selector: 'img[baseUiAvatarImage]',
  standalone: true,
  exportAs: 'avatarImage',
  host: {
    '[attr.data-image-loading-status]': 'context.imageLoadingStatus()',
    '[class.base-ui-avatar-image]': 'true',
    '[class.base-ui-avatar-image-loaded]': 'context.imageLoadingStatus() === "loaded"',
    '[class.base-ui-avatar-image-error]': 'context.imageLoadingStatus() === "error"',
    '(load)': 'onLoad()',
    '(error)': 'onError()',
  },
})
export class AvatarImageDirective implements AfterViewInit, OnDestroy {
  protected readonly context = inject(AVATAR_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLImageElement>);

  /**
   * Emitted when loading status changes.
   */
  readonly loadingStatusChange = output<ImageLoadingStatus>();

  ngAfterViewInit(): void {
    const img = this.elementRef.nativeElement;

    // Check if image is already loaded (cached)
    if (img.complete && img.naturalWidth > 0) {
      this.updateStatus('loaded');
    } else if (img.src) {
      this.updateStatus('loading');
    }
  }

  ngOnDestroy(): void {
    // Reset status when image is removed
    this.context.setImageLoadingStatus('idle');
  }

  /**
   * Handle successful image load.
   */
  onLoad(): void {
    this.updateStatus('loaded');
  }

  /**
   * Handle image load error.
   */
  onError(): void {
    this.updateStatus('error');
  }

  /**
   * Update the loading status and emit event.
   */
  private updateStatus(status: ImageLoadingStatus): void {
    this.context.setImageLoadingStatus(status);
    this.loadingStatusChange.emit(status);
  }
}

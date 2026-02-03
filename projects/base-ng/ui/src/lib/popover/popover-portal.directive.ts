/**
 * @fileoverview Angular port of Base UI PopoverPortal
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/popover/portal/PopoverPortal.tsx
 *
 * A portal that moves the popover to a different part of the DOM.
 */

import {
  ApplicationRef,
  booleanAttribute,
  ComponentFactoryResolver,
  Directive,
  effect,
  ElementRef,
  EmbeddedViewRef,
  inject,
  Injector,
  Input,
  OnDestroy,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { POPOVER_CONTEXT } from './popover.types';

/**
 * Portal directive for popovers.
 * Moves the popover content to a specified container in the DOM.
 *
 * @example
 * ```html
 * <div baseUiPopoverRoot>
 *   <button baseUiPopoverTrigger>Open</button>
 *   <ng-template baseUiPopoverPortal>
 *     <div baseUiPopoverPositioner>
 *       <div baseUiPopoverPopup>Content</div>
 *     </div>
 *   </ng-template>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiPopoverPortal]',
  standalone: true,
  exportAs: 'popoverPortal',
})
export class PopoverPortalDirective implements OnDestroy {
  protected readonly context = inject(POPOVER_CONTEXT);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly document = inject(DOCUMENT);

  /**
   * The container element to render the portal content into.
   * Defaults to document.body.
   */
  private readonly _container = signal<HTMLElement | null>(null);
  @Input()
  get container(): HTMLElement | null {
    return this._container();
  }
  set container(value: HTMLElement | null) {
    this._container.set(value);
  }

  /**
   * Whether to keep the portal content mounted when closed.
   * Useful for preserving state.
   */
  private readonly _keepMounted = signal(false);
  @Input({ transform: booleanAttribute })
  get keepMounted(): boolean {
    return this._keepMounted();
  }
  set keepMounted(value: boolean) {
    this._keepMounted.set(value);
  }

  private embeddedView: EmbeddedViewRef<unknown> | null = null;

  constructor() {
    effect(() => {
      const isOpen = this.context.openSignal();
      const keepMounted = this._keepMounted();

      if (isOpen || keepMounted) {
        this.mountPortal();
      } else {
        this.unmountPortal();
      }
    });
  }

  ngOnDestroy(): void {
    this.unmountPortal();
  }

  /**
   * Mount the portal content.
   */
  private mountPortal(): void {
    if (this.embeddedView) {
      return;
    }

    this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.embeddedView.detectChanges();

    const container = this._container() || this.document.body;

    for (const node of this.embeddedView.rootNodes) {
      container.appendChild(node);
    }
  }

  /**
   * Unmount the portal content.
   */
  private unmountPortal(): void {
    if (!this.embeddedView) {
      return;
    }

    // Remove nodes from DOM
    for (const node of this.embeddedView.rootNodes) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }

    this.embeddedView.destroy();
    this.embeddedView = null;
  }
}

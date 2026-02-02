/**
 * @fileoverview Angular port of Base UI Select Portal
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/portal/SelectPortal.tsx
 */

import {
  Directive,
  inject,
  input,
  booleanAttribute,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  OnDestroy,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select Portal directive.
 * Renders the select popup in a different part of the DOM.
 * Note: In Angular, portals are typically handled via CDK Portal or ng-template.
 * This directive provides a simple implementation for rendering to document.body.
 *
 * @example
 * ```html
 * <div baseUiSelectRoot>
 *   <button baseUiSelectTrigger>...</button>
 *   <ng-template baseUiSelectPortal>
 *     <div baseUiSelectPositioner>...</div>
 *   </ng-template>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectPortal]',
  standalone: true,
  exportAs: 'selectPortal',
})
export class SelectPortalDirective implements OnDestroy {
  private readonly rootContext = inject(SELECT_ROOT_CONTEXT);
  private readonly templateRef = inject(TemplateRef<void>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly document = inject(DOCUMENT);

  /**
   * Whether to keep the portal content mounted when closed.
   */
  readonly keepMounted = input(false, { transform: booleanAttribute });

  /**
   * Custom container element for the portal.
   * Defaults to document.body.
   */
  readonly container = input<HTMLElement | null>(null);

  private viewRef: EmbeddedViewRef<void> | null = null;
  private portalElement: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const isOpen = this.rootContext.openSignal();
      const keepMounted = this.keepMounted();

      if (isOpen || keepMounted) {
        this.attach();
      } else {
        this.detach();
      }
    });
  }

  private attach(): void {
    if (this.viewRef) return;

    // Create the embedded view
    this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.viewRef.detectChanges();

    // Get the container
    const containerElement = this.container() || this.document.body;

    // Create a wrapper element for the portal
    this.portalElement = this.document.createElement('div');
    this.portalElement.className = 'base-ui-select-portal';

    // Move the view's nodes into the portal element
    for (const node of this.viewRef.rootNodes) {
      this.portalElement.appendChild(node);
    }

    // Append to container
    containerElement.appendChild(this.portalElement);
  }

  private detach(): void {
    if (this.portalElement && this.portalElement.parentNode) {
      this.portalElement.parentNode.removeChild(this.portalElement);
    }
    this.portalElement = null;

    if (this.viewRef) {
      this.viewRef.destroy();
      this.viewRef = null;
    }
  }

  ngOnDestroy(): void {
    this.detach();
  }
}

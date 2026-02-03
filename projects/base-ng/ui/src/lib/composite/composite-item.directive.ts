/**
 * @fileoverview Angular port of Base UI CompositeItem
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/composite/item/CompositeItem.tsx
 *
 * Represents an item within a composite component.
 */

import {
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  signal,
  type Signal,
} from '@angular/core';
import { COMPOSITE_CONTEXT, CompositeMetadata } from './composite-root.directive';
import { ACTIVE_COMPOSITE_ITEM } from './constants';

/**
 * Directive for items within a composite component.
 *
 * @example
 * ```html
 * <div baseUiCompositeRoot>
 *   <button baseUiCompositeItem>Item 1</button>
 *   <button baseUiCompositeItem [disabled]="true">Item 2 (disabled)</button>
 *   <button baseUiCompositeItem>Item 3</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiCompositeItem]',
  standalone: true,
  exportAs: 'compositeItem',
  host: {
    '[attr.tabindex]': 'tabIndex()',
    '[attr.data-highlighted]': 'isHighlighted() || null',
    '[class.base-ui-composite-item]': 'true',
    '[class.base-ui-composite-item-highlighted]': 'isHighlighted()',
  },
})
export class CompositeItemDirective<T = unknown> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly context = inject(COMPOSITE_CONTEXT, { optional: true });

  // Internal signals
  private readonly _metadata = signal<T | undefined>(undefined);
  private readonly _active = signal<boolean>(false);

  /**
   * Custom metadata to attach to this item.
   */
  @Input()
  set metadata(value: T | undefined) { this._metadata.set(value); }
  get metadata(): T | undefined { return this._metadata(); }

  /**
   * Whether this item should be initially active.
   */
  @Input()
  set active(value: boolean) { this._active.set(value); }
  get active(): boolean { return this._active(); }

  /**
   * Index of this item in the list.
   */
  readonly index: Signal<number> = computed(() => {
    if (!this.context) {
      return -1;
    }
    return this.context.getItemIndex(this.elementRef.nativeElement);
  });

  /**
   * Whether this item is currently highlighted.
   */
  readonly isHighlighted: Signal<boolean> = computed(() => {
    if (!this.context) {
      return false;
    }
    return this.context.highlightedIndex() === this.index();
  });

  /**
   * Tabindex for keyboard navigation.
   */
  readonly tabIndex: Signal<number> = computed(() => {
    // Highlighted item gets tabindex 0, others get -1
    return this.isHighlighted() ? 0 : -1;
  });

  constructor() {
    // Set active attribute if specified
    if (this._active()) {
      this.elementRef.nativeElement.setAttribute(ACTIVE_COMPOSITE_ITEM, '');
    }

    // Register with context
    if (this.context) {
      const compositeMetadata: CompositeMetadata<T> = {
        data: this._metadata(),
      };
      this.context.registerItem(this.elementRef.nativeElement, compositeMetadata);

      this.destroyRef.onDestroy(() => {
        this.context!.unregisterItem(this.elementRef.nativeElement);
      });
    }
  }

  /**
   * Handle mouse enter for hover highlighting.
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.context?.highlightItemOnHover()) {
      const index = this.index();
      if (index !== -1) {
        this.context.setHighlightedIndex(index);
      }
    }
  }

  /**
   * Handle focus events.
   */
  @HostListener('focus')
  onFocus(): void {
    if (this.context) {
      const index = this.index();
      if (index !== -1 && this.context.highlightedIndex() !== index) {
        this.context.setHighlightedIndex(index);
      }
    }
  }

  /**
   * Get the native element.
   */
  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * Focus this item.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /**
   * Highlight this item.
   */
  highlight(scrollIntoView = false): void {
    if (this.context) {
      const index = this.index();
      if (index !== -1) {
        this.context.setHighlightedIndex(index, scrollIntoView);
      }
    }
  }
}

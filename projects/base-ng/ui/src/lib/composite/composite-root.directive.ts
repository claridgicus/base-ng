/**
 * @fileoverview Angular port of Base UI CompositeRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/composite/root/CompositeRoot.tsx
 *
 * Provides keyboard navigation for lists and grids of items.
 */

import {
  computed,
  contentChildren,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  InjectionToken,
  input,
  output,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { DirectionService } from '../direction-provider';
import {
  ALL_KEYS,
  ARROW_DOWN,
  ARROW_KEYS,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  createGridCellMap,
  Dimensions,
  END,
  findNonDisabledListIndex,
  getGridCellIndexOfCorner,
  getGridCellIndices,
  getGridNavigatedIndex,
  getMaxListIndex,
  getMinListIndex,
  HOME,
  HORIZONTAL_KEYS,
  HORIZONTAL_KEYS_WITH_EXTRA_KEYS,
  isElementDisabled,
  isIndexOutOfListBounds,
  isListIndexDisabled,
  isModifierKeySet,
  isNativeInput,
  ModifierKey,
  scrollIntoViewIfNeeded,
  VERTICAL_KEYS,
  VERTICAL_KEYS_WITH_EXTRA_KEYS,
} from './composite';
import { ACTIVE_COMPOSITE_ITEM } from './constants';

/**
 * Metadata that can be attached to composite items.
 */
export interface CompositeMetadata<T = unknown> {
  index?: number | null;
  data?: T;
}

/**
 * Context provided by CompositeRoot to its descendants.
 */
export interface CompositeContext {
  highlightedIndex: Signal<number>;
  setHighlightedIndex: (index: number, scrollIntoView?: boolean) => void;
  highlightItemOnHover: Signal<boolean>;
  registerItem: (element: HTMLElement, metadata?: CompositeMetadata) => void;
  unregisterItem: (element: HTMLElement) => void;
  getItemIndex: (element: HTMLElement) => number;
}

/**
 * Injection token for CompositeContext.
 */
export const COMPOSITE_CONTEXT = new InjectionToken<CompositeContext>('COMPOSITE_CONTEXT');

/**
 * Directive that provides keyboard navigation for lists and grids.
 *
 * @example
 * ```html
 * <div baseUiCompositeRoot
 *      [orientation]="'vertical'"
 *      [loopFocus]="true"
 *      (highlightedIndexChange)="onIndexChange($event)">
 *   <button baseUiCompositeItem>Item 1</button>
 *   <button baseUiCompositeItem>Item 2</button>
 *   <button baseUiCompositeItem>Item 3</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiCompositeRoot]',
  standalone: true,
  exportAs: 'compositeRoot',
  providers: [
    {
      provide: COMPOSITE_CONTEXT,
      useFactory: (directive: CompositeRootDirective) => directive.context,
      deps: [CompositeRootDirective],
    },
  ],
  host: {
    '[attr.aria-orientation]': 'ariaOrientation()',
    class: 'base-ui-composite-root',
  },
})
export class CompositeRootDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly directionService = inject(DirectionService);

  /**
   * The orientation of the composite navigation.
   */
  readonly orientation = input<'horizontal' | 'vertical' | 'both'>('both');

  /**
   * Number of columns for grid layout.
   */
  readonly cols = input<number>(1);

  /**
   * Whether to loop focus when reaching boundaries.
   */
  readonly loopFocus = input<boolean>(true);

  /**
   * Whether to use dense packing for grid items.
   */
  readonly dense = input<boolean>(false);

  /**
   * Item sizes for grid layout (width and height in cells).
   */
  readonly itemSizes = input<Dimensions[]>();

  /**
   * Whether Home and End keys are enabled.
   */
  readonly enableHomeAndEndKeys = input<boolean>(false);

  /**
   * Whether to stop keyboard event propagation.
   */
  readonly stopEventPropagation = input<boolean>(true);

  /**
   * Indices of items that should be considered disabled.
   */
  readonly disabledIndices = input<number[]>([]);

  /**
   * Modifier keys that should be ignored during navigation.
   */
  readonly modifierKeys = input<ModifierKey[]>([]);

  /**
   * Whether to highlight items on hover.
   */
  readonly highlightItemOnHover = input<boolean>(false);

  /**
   * External control of highlighted index.
   */
  readonly highlightedIndexInput = input<number | undefined>(undefined, { alias: 'highlightedIndex' });

  /**
   * Emitted when highlighted index changes.
   */
  readonly highlightedIndexChange = output<number>();

  // Internal state
  private readonly _highlightedIndex: WritableSignal<number> = signal(0);
  private readonly _elements: WritableSignal<HTMLElement[]> = signal([]);
  private readonly _elementMetadata = new Map<HTMLElement, CompositeMetadata>();

  /**
   * Current highlighted index.
   */
  readonly highlightedIndex: Signal<number> = computed(() => {
    const external = this.highlightedIndexInput();
    return external !== undefined ? external : this._highlightedIndex();
  });

  /**
   * Whether this is a grid layout.
   */
  readonly isGrid: Signal<boolean> = computed(() => this.cols() > 1);

  /**
   * ARIA orientation attribute.
   */
  readonly ariaOrientation: Signal<'horizontal' | 'vertical' | undefined> = computed(() => {
    const orient = this.orientation();
    return orient === 'both' ? undefined : orient;
  });

  /**
   * Context provided to child items.
   */
  readonly context: CompositeContext = {
    highlightedIndex: this.highlightedIndex,
    setHighlightedIndex: (index: number, scrollIntoView = false) => {
      this._highlightedIndex.set(index);
      this.highlightedIndexChange.emit(index);
      if (scrollIntoView) {
        const elements = this._elements();
        const element = elements[index];
        scrollIntoViewIfNeeded(
          this.elementRef.nativeElement,
          element,
          this.directionService.direction(),
          this.orientation()
        );
      }
    },
    highlightItemOnHover: computed(() => this.highlightItemOnHover()),
    registerItem: (element: HTMLElement, metadata?: CompositeMetadata) => {
      this._elementMetadata.set(element, metadata || {});
      this.updateElementsList();
    },
    unregisterItem: (element: HTMLElement) => {
      this._elementMetadata.delete(element);
      this.updateElementsList();
    },
    getItemIndex: (element: HTMLElement) => {
      return this._elements().indexOf(element);
    },
  };

  constructor() {
    // Sync external highlighted index
    effect(() => {
      const external = this.highlightedIndexInput();
      if (external !== undefined) {
        this._highlightedIndex.set(external);
      }
    });
  }

  /**
   * Update the sorted elements list.
   */
  private updateElementsList(): void {
    const elements = Array.from(this._elementMetadata.keys())
      .filter((el) => el.isConnected)
      .sort((a, b) => {
        const position = a.compareDocumentPosition(b);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        }
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1;
        }
        return 0;
      });

    // Update metadata indices
    elements.forEach((el, index) => {
      const metadata = this._elementMetadata.get(el);
      if (metadata) {
        metadata.index = index;
      }
    });

    this._elements.set(elements);

    // Set default highlighted index from active item attribute
    if (elements.length > 0 && this._highlightedIndex() === 0) {
      const activeItem = elements.find((el) => el.hasAttribute(ACTIVE_COMPOSITE_ITEM));
      if (activeItem) {
        const activeIndex = elements.indexOf(activeItem);
        if (activeIndex !== -1) {
          this._highlightedIndex.set(activeIndex);
          this.highlightedIndexChange.emit(activeIndex);
        }
      }
    }
  }

  /**
   * Handle keyboard navigation.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const enableHome = this.enableHomeAndEndKeys();
    const RELEVANT_KEYS = enableHome ? ALL_KEYS : ARROW_KEYS;

    if (!RELEVANT_KEYS.has(event.key)) {
      return;
    }

    if (isModifierKeySet(event, this.modifierKeys())) {
      return;
    }

    const elements = this._elements();
    if (elements.length === 0) {
      return;
    }

    const direction = this.directionService.direction();
    const isRtl = direction === 'rtl';
    const orient = this.orientation();
    const disabledIndices = this.disabledIndices();

    // Handle native input navigation
    if (isNativeInput(event.target) && !isElementDisabled(event.target as Element)) {
      const input = event.target as HTMLInputElement | HTMLTextAreaElement;
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;
      const textContent = input.value ?? '';

      if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) {
        return;
      }

      const horizontalForwardKey = isRtl ? ARROW_LEFT : ARROW_RIGHT;
      const horizontalBackwardKey = isRtl ? ARROW_RIGHT : ARROW_LEFT;

      if (event.key !== horizontalBackwardKey && selectionStart < textContent.length) {
        return;
      }
      if (event.key !== horizontalForwardKey && selectionStart > 0) {
        return;
      }
    }

    const currentIndex = this.highlightedIndex();
    let nextIndex = currentIndex;
    const minIndex = getMinListIndex(elements, disabledIndices);
    const maxIndex = getMaxListIndex(elements, disabledIndices);

    const horizontalForwardKey = isRtl ? ARROW_LEFT : ARROW_RIGHT;
    const horizontalBackwardKey = isRtl ? ARROW_RIGHT : ARROW_LEFT;

    if (this.isGrid()) {
      const cols = this.cols();
      const sizes = this.itemSizes() ||
        Array.from({ length: elements.length }, () => ({ width: 1, height: 1 }));
      const cellMap = createGridCellMap(sizes, cols, this.dense());

      const minGridIndex = cellMap.findIndex(
        (index) => index != null && !isListIndexDisabled(elements, index, disabledIndices)
      );
      const maxGridIndex = cellMap.reduce(
        (foundIndex: number, index, cellIndex) =>
          index != null && !isListIndexDisabled(elements, index, disabledIndices)
            ? cellIndex
            : foundIndex,
        -1
      );

      const gridDisabledIndices = getGridCellIndices(
        [
          ...(disabledIndices ||
            elements.map((_, index) =>
              isListIndexDisabled(elements, index) ? index : undefined
            )),
          undefined,
        ],
        cellMap
      );

      const navIndex = getGridNavigatedIndex(elements, {
        event,
        orientation: orient,
        loopFocus: this.loopFocus(),
        cols,
        disabledIndices: gridDisabledIndices,
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getGridCellIndexOfCorner(
          currentIndex > maxIndex ? minIndex : currentIndex,
          sizes,
          cellMap,
          cols,
          event.key === ARROW_DOWN ? 'bl' : event.key === ARROW_RIGHT ? 'tr' : 'tl'
        ),
        rtl: isRtl,
      });

      nextIndex = cellMap[navIndex] as number;
    } else {
      // Handle Home/End keys
      if (enableHome) {
        if (event.key === HOME) {
          nextIndex = minIndex;
        } else if (event.key === END) {
          nextIndex = maxIndex;
        }
      }

      // Handle arrow keys
      const forwardKeys = {
        horizontal: [horizontalForwardKey],
        vertical: [ARROW_DOWN],
        both: [horizontalForwardKey, ARROW_DOWN],
      }[orient];

      const backwardKeys = {
        horizontal: [horizontalBackwardKey],
        vertical: [ARROW_UP],
        both: [horizontalBackwardKey, ARROW_UP],
      }[orient];

      if (nextIndex === currentIndex && (forwardKeys.includes(event.key) || backwardKeys.includes(event.key))) {
        if (this.loopFocus() && nextIndex === maxIndex && forwardKeys.includes(event.key)) {
          nextIndex = minIndex;
        } else if (this.loopFocus() && nextIndex === minIndex && backwardKeys.includes(event.key)) {
          nextIndex = maxIndex;
        } else {
          nextIndex = findNonDisabledListIndex(elements, {
            startingIndex: nextIndex,
            decrement: backwardKeys.includes(event.key),
            disabledIndices,
          });
        }
      }
    }

    // Determine which keys to prevent default on
    const preventedKeys = this.isGrid()
      ? RELEVANT_KEYS
      : {
          horizontal: enableHome ? HORIZONTAL_KEYS_WITH_EXTRA_KEYS : HORIZONTAL_KEYS,
          vertical: enableHome ? VERTICAL_KEYS_WITH_EXTRA_KEYS : VERTICAL_KEYS,
          both: RELEVANT_KEYS,
        }[orient];

    if (nextIndex !== currentIndex && !isIndexOutOfListBounds(elements, nextIndex)) {
      if (this.stopEventPropagation()) {
        event.stopPropagation();
      }

      if (preventedKeys.has(event.key)) {
        event.preventDefault();
      }

      this.context.setHighlightedIndex(nextIndex, true);

      // Focus the new element
      queueMicrotask(() => {
        elements[nextIndex]?.focus();
      });
    }
  }

  /**
   * Handle focus on native input elements.
   */
  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    if (isNativeInput(event.target)) {
      const input = event.target as HTMLInputElement | HTMLTextAreaElement;
      input.setSelectionRange(0, input.value.length ?? 0);
    }
  }

  /**
   * Get all registered elements.
   */
  getElements(): HTMLElement[] {
    return this._elements();
  }

  /**
   * Focus the currently highlighted item.
   */
  focusHighlighted(): void {
    const elements = this._elements();
    const index = this.highlightedIndex();
    elements[index]?.focus();
  }
}

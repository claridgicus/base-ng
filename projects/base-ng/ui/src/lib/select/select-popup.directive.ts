/**
 * @fileoverview Angular port of Base UI Select Popup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/popup/SelectPopup.tsx
 */

import {
  Directive,
  computed,
  inject,
  signal,
  effect,
} from '@angular/core';
import type { TransitionStatus } from '../utils';
import {
  SELECT_ROOT_CONTEXT,
  SELECT_POSITIONER_CONTEXT,
} from './select.types';

/**
 * Select Popup directive.
 * The popup container for the select list.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectPositioner>
 *   <div baseUiSelectPopup>
 *     <div baseUiSelectList>...</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectPopup]',
  standalone: true,
  exportAs: 'selectPopup',
  host: {
    '[class.base-ui-select-popup]': 'true',
    '[class.base-ui-select-popup-open]': 'rootContext.openSignal()',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[attr.data-starting-style]': 'transitionStatus() === "starting" ? "" : null',
    '[attr.data-ending-style]': 'transitionStatus() === "ending" ? "" : null',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class SelectPopupDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
  protected readonly positionerContext = inject(SELECT_POSITIONER_CONTEXT);

  private readonly transitionStatusInternal = signal<TransitionStatus>(undefined);

  /** Transition status */
  readonly transitionStatus = this.transitionStatusInternal.asReadonly();

  constructor() {
    // Track open state for transitions
    effect(() => {
      const isOpen = this.rootContext.openSignal();
      if (isOpen) {
        this.transitionStatusInternal.set('starting');
        // Allow a frame for the starting style to apply
        requestAnimationFrame(() => {
          this.transitionStatusInternal.set(undefined);
        });
      } else {
        this.transitionStatusInternal.set('ending');
      }
    }, { allowSignalWrites: true });
  }

  /**
   * Handle keyboard navigation within the popup.
   */
  handleKeyDown(event: KeyboardEvent): void {
    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightNextItem();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.highlightPreviousItem();
        break;

      case 'Home':
        event.preventDefault();
        this.highlightFirstItem();
        break;

      case 'End':
        event.preventDefault();
        this.highlightLastItem();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectHighlightedItem();
        break;

      case 'Escape':
        event.preventDefault();
        this.rootContext.setOpen(false);
        break;

      case 'Tab':
        // Allow tab to close and move focus
        this.rootContext.setOpen(false);
        break;

      default:
        // Type-ahead search
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          this.handleTypeAhead(event.key);
        }
        break;
    }
  }

  private highlightNextItem(): void {
    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    const currentHighlighted = this.rootContext.highlightedValue();
    const currentIndex = items.findIndex((item) =>
      this.rootContext.valueEquality(item.value, currentHighlighted as any)
    );

    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    this.rootContext.setHighlightedValue(items[nextIndex].value);
  }

  private highlightPreviousItem(): void {
    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    const currentHighlighted = this.rootContext.highlightedValue();
    const currentIndex = items.findIndex((item) =>
      this.rootContext.valueEquality(item.value, currentHighlighted as any)
    );

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    this.rootContext.setHighlightedValue(items[prevIndex].value);
  }

  private highlightFirstItem(): void {
    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    if (items.length > 0) {
      this.rootContext.setHighlightedValue(items[0].value);
    }
  }

  private highlightLastItem(): void {
    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    if (items.length > 0) {
      this.rootContext.setHighlightedValue(items[items.length - 1].value);
    }
  }

  private selectHighlightedItem(): void {
    const highlightedValue = this.rootContext.highlightedValue();
    if (highlightedValue !== null) {
      if (this.rootContext.multipleSignal()) {
        this.rootContext.toggleValue(highlightedValue);
      } else {
        this.rootContext.setValue(highlightedValue);
        this.rootContext.setOpen(false);
      }
    }
  }

  private searchString = '';
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  private handleTypeAhead(char: string): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchString += char.toLowerCase();

    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    const matchingItem = items.find((item) => {
      const label = item.label || this.rootContext.itemToStringLabel(item.value);
      return label.toLowerCase().startsWith(this.searchString);
    });

    if (matchingItem) {
      this.rootContext.setHighlightedValue(matchingItem.value);
    }

    this.searchTimeout = setTimeout(() => {
      this.searchString = '';
    }, 500);
  }
}

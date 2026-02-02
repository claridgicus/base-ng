/**
 * @fileoverview Angular port of Base UI Select Trigger
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/trigger/SelectTrigger.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  booleanAttribute,
  afterNextRender,
} from '@angular/core';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select Trigger directive.
 * A button that opens the select popup.
 * Renders a `<button>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectRoot>
 *   <button baseUiSelectTrigger>
 *     <span baseUiSelectValue placeholder="Choose..."></span>
 *     <span baseUiSelectIcon></span>
 *   </button>
 *   <!-- ... -->
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectTrigger]',
  standalone: true,
  exportAs: 'selectTrigger',
  host: {
    type: 'button',
    role: 'combobox',
    '[attr.id]': 'triggerId',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-expanded]': 'rootContext.openSignal()',
    '[attr.aria-controls]': 'listId',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.aria-readonly]': 'rootContext.readOnlySignal() ? "true" : null',
    '[attr.aria-required]': 'rootContext.requiredSignal() ? "true" : null',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-readonly]': 'rootContext.readOnlySignal() ? "" : null',
    '[attr.data-placeholder]': 'isPlaceholder() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[class.base-ui-select-trigger]': 'true',
    '[class.base-ui-select-trigger-open]': 'rootContext.openSignal()',
    '[class.base-ui-select-trigger-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class SelectTriggerDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);

  /**
   * Whether the trigger is disabled independently.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Trigger element ID */
  readonly triggerId = `${this.rootContext.rootId}-trigger`;

  /** List element ID */
  readonly listId = `${this.rootContext.rootId}-list`;

  /** Whether the trigger is disabled */
  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this.disabled();
  });

  /** Whether showing placeholder */
  readonly isPlaceholder = computed(() => {
    return !this.rootContext.hasSelectedValue();
  });

  constructor() {
    // Register trigger element
    afterNextRender(() => {
      this.rootContext.setTriggerElement(this.elementRef.nativeElement);
    });
  }

  /**
   * Handle click to toggle select.
   */
  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    const isOpen = this.rootContext.openSignal();
    this.rootContext.setOpen(!isOpen, 'mouse');
  }

  /**
   * Handle keyboard navigation.
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const isOpen = this.rootContext.openSignal();

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          this.rootContext.setOpen(true, 'keyboard');
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          this.rootContext.setOpen(true, 'keyboard');
        } else {
          this.highlightNextItem();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          this.rootContext.setOpen(true, 'keyboard');
        } else {
          this.highlightPreviousItem();
        }
        break;

      case 'Home':
        if (isOpen) {
          event.preventDefault();
          this.highlightFirstItem();
        }
        break;

      case 'End':
        if (isOpen) {
          event.preventDefault();
          this.highlightLastItem();
        }
        break;

      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          this.rootContext.setOpen(false);
          this.elementRef.nativeElement.focus();
        }
        break;
    }
  }

  private highlightNextItem(): void {
    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

    const currentHighlighted = this.rootContext.highlightedValue();
    const currentIndex = items.findIndex((item) =>
      this.rootContext.valueEquality(item.value, currentHighlighted as any)
    );

    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    this.rootContext.setHighlightedValue(items[nextIndex].value);
  }

  private highlightPreviousItem(): void {
    const items = this.rootContext.getItems().filter((item) => !item.disabled);
    if (items.length === 0) return;

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
}

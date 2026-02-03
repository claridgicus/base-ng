/**
 * @fileoverview Angular port of Base UI Select Value
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/value/SelectValue.tsx
 */

import {
  Directive,
  Input,
  computed,
  inject,
  signal,
  contentChild,
  TemplateRef,
} from '@angular/core';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select Value directive.
 * Displays the selected value(s) or a placeholder.
 * Renders a `<span>` element.
 *
 * @example
 * ```html
 * <button baseUiSelectTrigger>
 *   <span baseUiSelectValue placeholder="Select an option..."></span>
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiSelectValue]',
  standalone: true,
  exportAs: 'selectValue',
  host: {
    '[class.base-ui-select-value]': 'true',
    '[class.base-ui-select-value-placeholder]': 'isPlaceholder()',
    '[attr.data-placeholder]': 'isPlaceholder() ? "" : null',
  },
})
export class SelectValueDirective<T = unknown> {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);

  // Internal signal for input
  private readonly placeholderSignal = signal<string>('');

  /**
   * Placeholder text when no value is selected.
   */
  @Input()
  get placeholder(): string {
    return this.placeholderSignal();
  }
  set placeholder(value: string) {
    this.placeholderSignal.set(value);
  }

  /**
   * Custom template for rendering the value.
   */
  readonly valueTemplate = contentChild<TemplateRef<{ value: T | T[] | null }>>(
    TemplateRef
  );

  /** Whether showing placeholder */
  readonly isPlaceholder = computed(() => {
    return !this.rootContext.hasSelectedValue();
  });

  /** The display text for the value */
  readonly displayText = computed(() => {
    const value = this.rootContext.valueSignal();
    const placeholder = this.placeholderSignal();

    if (!this.rootContext.hasSelectedValue()) {
      return placeholder;
    }

    if (Array.isArray(value)) {
      return value.map((v) => this.getItemLabel(v)).join(', ');
    }

    return this.getItemLabel(value);
  });

  private getItemLabel(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Try to find the item in registered items
    const items = this.rootContext.getItems();
    const item = items.find((item) =>
      this.rootContext.valueEquality(item.value, value as T)
    );

    if (item?.label) {
      return item.label;
    }

    return this.rootContext.itemToStringLabel(value as T);
  }
}

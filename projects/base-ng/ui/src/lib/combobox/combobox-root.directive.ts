/**
 * @fileoverview Angular port of Base UI Combobox Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/root/ComboboxRoot.tsx
 */

import {
  Directive,
  computed,
  effect,
  input,
  output,
  signal,
  booleanAttribute,
  Signal,
  untracked,
} from '@angular/core';
import {
  COMBOBOX_ROOT_CONTEXT,
  type ComboboxRootContext,
  type ComboboxItemData,
  type ComboboxOpenMethod,
  type ComboboxFilterOptions,
  defaultComboboxFilter,
} from './combobox.types';

let comboboxIdCounter = 0;

/**
 * Combobox Root directive.
 * Groups all parts of the combobox.
 * Doesn't render its own HTML element.
 *
 * @example
 * ```html
 * <div baseUiComboboxRoot>
 *   <input baseUiComboboxInput />
 *   <button baseUiComboboxTrigger>▼</button>
 *   <div baseUiComboboxPositioner>
 *     <div baseUiComboboxPopup>
 *       <div baseUiComboboxList>
 *         <div baseUiComboboxItem [value]="'apple'">Apple</div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiComboboxRoot]',
  standalone: true,
  exportAs: 'comboboxRoot',
  providers: [
    {
      provide: COMBOBOX_ROOT_CONTEXT,
      useFactory: (directive: ComboboxRootDirective) => directive.context,
      deps: [ComboboxRootDirective],
    },
  ],
  host: {
    '[class.base-ui-combobox-root]': 'true',
    '[class.base-ui-combobox-root-open]': 'isOpen()',
    '[class.base-ui-combobox-root-disabled]': 'disabled()',
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class ComboboxRootDirective<T = unknown> {
  private readonly rootId = `base-ui-combobox-${++comboboxIdCounter}`;

  /**
   * Whether the combobox is open.
   */
  readonly open = input(false, { transform: booleanAttribute });

  /**
   * The default open state (uncontrolled).
   */
  readonly defaultOpen = input(false, { transform: booleanAttribute });

  /**
   * The selected value.
   */
  readonly value = input<T | T[] | null>(null);

  /**
   * The default value (uncontrolled).
   */
  readonly defaultValue = input<T | T[] | null>(null);

  /**
   * Whether the combobox is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the combobox is read-only.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /**
   * Whether the combobox is required.
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Whether multiple selection is allowed.
   */
  readonly multiple = input(false, { transform: booleanAttribute });

  /**
   * Filter options.
   */
  readonly filterOptions = input<ComboboxFilterOptions>({});

  /**
   * Whether to auto-highlight the first item when filtering.
   */
  readonly autoHighlight = input(true, { transform: booleanAttribute });

  /**
   * Event emitted when the open state changes.
   */
  readonly openChange = output<boolean>();

  /**
   * Event emitted when the value changes.
   */
  readonly valueChange = output<T | T[] | null>();

  /**
   * Event emitted when the input value changes.
   */
  readonly inputValueChange = output<string>();

  // Internal state signals
  private readonly openInternal = signal(false);
  private readonly valueInternal = signal<T | T[] | null>(null);
  private readonly inputValueInternal = signal('');
  private readonly openMethodInternal = signal<ComboboxOpenMethod>(null);
  private readonly triggerElementInternal = signal<HTMLElement | null>(null);
  private readonly inputElementInternal = signal<HTMLInputElement | null>(null);
  private readonly listElementInternal = signal<HTMLElement | null>(null);
  private readonly highlightedValueInternal = signal<T | null>(null);
  private readonly items = signal<ComboboxItemData<T>[]>([]);

  /** Whether the combobox is open */
  readonly isOpen = computed(() => {
    const openInput = this.open();
    return openInput || this.openInternal();
  });

  /** The current selected value */
  readonly currentValue = computed(() => {
    const valueInput = this.value();
    if (valueInput !== null) {
      return valueInput;
    }
    return this.valueInternal();
  });

  /** The current input value */
  readonly currentInputValue = this.inputValueInternal.asReadonly();

  /** Filtered items based on input value */
  readonly filteredItems = computed(() => {
    const allItems = this.items();
    const inputValue = this.inputValueInternal();
    const options = this.filterOptions();

    return defaultComboboxFilter(
      allItems,
      inputValue,
      this.itemToStringLabel.bind(this),
      options
    );
  });

  /** The context provided to child components */
  readonly context: ComboboxRootContext<T>;

  constructor() {
    // Initialize from defaults
    effect(() => {
      const defaultOpen = this.defaultOpen();
      const defaultValue = this.defaultValue();

      untracked(() => {
        if (defaultOpen) {
          this.openInternal.set(defaultOpen);
        }
        if (defaultValue !== null) {
          this.valueInternal.set(defaultValue);
        }
      });
    }, { allowSignalWrites: true });

    // Auto-highlight first item when filtering
    effect(() => {
      const filtered = this.filteredItems();
      const autoHighlight = this.autoHighlight();
      const isOpen = this.isOpen();

      if (autoHighlight && isOpen && filtered.length > 0) {
        const firstEnabled = filtered.find((item) => !item.disabled);
        if (firstEnabled) {
          untracked(() => {
            this.highlightedValueInternal.set(firstEnabled.value);
          });
        }
      }
    }, { allowSignalWrites: true });

    // Create context with getters
    const self = this;
    this.context = {
      get open() {
        return self.isOpen();
      },
      get value() {
        return self.currentValue();
      },
      get inputValue() {
        return self.inputValueInternal();
      },
      get disabled() {
        return self.disabled();
      },
      get readOnly() {
        return self.readOnly();
      },
      get required() {
        return self.required();
      },
      get multiple() {
        return self.multiple();
      },
      openSignal: this.isOpen,
      valueSignal: this.currentValue,
      inputValueSignal: this.inputValueInternal.asReadonly(),
      disabledSignal: computed(() => this.disabled()) as Signal<boolean>,
      readOnlySignal: computed(() => this.readOnly()) as Signal<boolean>,
      requiredSignal: computed(() => this.required()) as Signal<boolean>,
      multipleSignal: computed(() => this.multiple()) as Signal<boolean>,
      openMethodSignal: this.openMethodInternal.asReadonly(),
      rootId: this.rootId,
      setOpen: this.setOpen.bind(this),
      setValue: this.setValue.bind(this),
      setInputValue: this.setInputValue.bind(this),
      toggleValue: this.toggleValue.bind(this),
      registerItem: this.registerItem.bind(this),
      unregisterItem: this.unregisterItem.bind(this),
      getItems: this.getItems.bind(this),
      getFilteredItems: this.getFilteredItems.bind(this),
      valueEquality: this.valueEquality.bind(this),
      itemToStringLabel: this.itemToStringLabel.bind(this),
      hasSelectedValue: this.hasSelectedValue.bind(this),
      triggerElement: this.triggerElementInternal.asReadonly(),
      setTriggerElement: this.setTriggerElement.bind(this),
      inputElement: this.inputElementInternal.asReadonly(),
      setInputElement: this.setInputElement.bind(this),
      listElement: this.listElementInternal.asReadonly(),
      setListElement: this.setListElement.bind(this),
      highlightedValue: this.highlightedValueInternal.asReadonly(),
      setHighlightedValue: this.setHighlightedValue.bind(this),
      clear: this.clear.bind(this),
    };
  }

  /**
   * Set the open state.
   */
  setOpen(open: boolean, method: ComboboxOpenMethod = null): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    this.openInternal.set(open);
    this.openMethodInternal.set(method);
    this.openChange.emit(open);

    if (!open) {
      this.highlightedValueInternal.set(null);
    }
  }

  /**
   * Set the value.
   */
  setValue(value: T | T[] | null): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    this.valueInternal.set(value);
    this.valueChange.emit(value);

    // Update input value to match selected item in single mode
    if (!this.multiple() && value !== null) {
      const items = this.items();
      const selectedItem = items.find((item) =>
        this.valueEquality(item.value, value as T)
      );
      if (selectedItem) {
        this.setInputValue(selectedItem.label || this.itemToStringLabel(value as T));
      }
    }
  }

  /**
   * Set the input value.
   */
  setInputValue(value: string): void {
    this.inputValueInternal.set(value);
    this.inputValueChange.emit(value);
  }

  /**
   * Toggle a value for multiple selection.
   */
  toggleValue(value: T): void {
    if (!this.multiple()) {
      this.setValue(value);
      return;
    }

    const current = this.currentValue();
    const currentArray = Array.isArray(current) ? current : [];

    const index = currentArray.findIndex((v) => this.valueEquality(v, value));
    if (index === -1) {
      this.setValue([...currentArray, value]);
    } else {
      this.setValue(currentArray.filter((_, i) => i !== index));
    }
  }

  /**
   * Clear value and input.
   */
  clear(): void {
    this.setValue(this.multiple() ? [] : null);
    this.setInputValue('');
    this.highlightedValueInternal.set(null);
  }

  /**
   * Register an item.
   */
  registerItem(data: ComboboxItemData<T>): void {
    this.items.update((items) => {
      const index = items.findIndex((item) =>
        this.valueEquality(item.value, data.value)
      );
      if (index === -1) {
        return [...items, data];
      }
      // Update existing item
      const newItems = [...items];
      newItems[index] = data;
      return newItems;
    });
  }

  /**
   * Unregister an item.
   */
  unregisterItem(value: T): void {
    this.items.update((items) =>
      items.filter((item) => !this.valueEquality(item.value, value))
    );
  }

  /**
   * Get all registered items.
   */
  getItems(): ComboboxItemData<T>[] {
    return this.items();
  }

  /**
   * Get filtered items.
   */
  getFilteredItems(): ComboboxItemData<T>[] {
    return this.filteredItems();
  }

  /**
   * Compare two values for equality.
   */
  valueEquality(a: T, b: T): boolean {
    return a === b;
  }

  /**
   * Convert an item to a string label.
   */
  itemToStringLabel(item: T): string {
    if (item === null || item === undefined) {
      return '';
    }
    if (typeof item === 'string') {
      return item;
    }
    if (typeof item === 'object' && item !== null && 'label' in item) {
      return String((item as unknown as { label: unknown }).label);
    }
    return String(item);
  }

  /**
   * Check if the combobox has a selected value.
   */
  hasSelectedValue(): boolean {
    const value = this.currentValue();
    if (value === null || value === undefined) {
      return false;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return true;
  }

  /**
   * Set the trigger element reference.
   */
  setTriggerElement(element: HTMLElement | null): void {
    this.triggerElementInternal.set(element);
  }

  /**
   * Set the input element reference.
   */
  setInputElement(element: HTMLInputElement | null): void {
    this.inputElementInternal.set(element);
  }

  /**
   * Set the list element reference.
   */
  setListElement(element: HTMLElement | null): void {
    this.listElementInternal.set(element);
  }

  /**
   * Set the highlighted value.
   */
  setHighlightedValue(value: T | null): void {
    this.highlightedValueInternal.set(value);
  }
}

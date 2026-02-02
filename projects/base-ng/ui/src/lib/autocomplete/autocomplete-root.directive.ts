/**
 * @fileoverview Angular port of Base UI Autocomplete Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/autocomplete/root/AutocompleteRoot.tsx
 */

import {
  Directive,
  ElementRef,
  Signal,
  computed,
  inject,
  input,
  output,
  signal,
  booleanAttribute,
} from '@angular/core';
import {
  AUTOCOMPLETE_ROOT_CONTEXT,
  AutocompleteRootContext,
  AutocompleteMode,
  AutocompleteItemData,
  AutocompleteFilterFn,
  AutocompleteFilterOptions,
  AutocompleteChangeDetails,
  AutocompleteHighlightDetails,
  defaultAutocompleteFilter,
} from './autocomplete.types';

let autocompleteCounter = 0;

/**
 * Autocomplete Root directive.
 * The main container that manages autocomplete state and behavior.
 * Supports different modes: list, both, inline, and none.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteRoot mode="list">
 *   <input baseUiAutocompleteInput placeholder="Search..." />
 *   <div baseUiAutocompletePositioner>
 *     <div baseUiAutocompletePopup>
 *       <div baseUiAutocompleteList>
 *         <div baseUiAutocompleteItem [value]="'apple'">Apple</div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompleteRoot]',
  standalone: true,
  exportAs: 'autocompleteRoot',
  providers: [
    {
      provide: AUTOCOMPLETE_ROOT_CONTEXT,
      useFactory: (directive: AutocompleteRootDirective<unknown>) => directive.context,
      deps: [AutocompleteRootDirective],
    },
  ],
  host: {
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-readonly]': 'readOnly() ? "" : null',
    '[attr.data-mode]': 'mode()',
    '[class.base-ui-autocomplete-root]': 'true',
    '[class.base-ui-autocomplete-root-open]': 'isOpen()',
    '[class.base-ui-autocomplete-root-disabled]': 'disabled()',
  },
})
export class AutocompleteRootDirective<T = unknown> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Unique ID for this autocomplete instance */
  readonly rootId = `base-ui-autocomplete-${++autocompleteCounter}`;

  // Inputs
  /**
   * Autocomplete mode:
   * - 'list': Shows filtered items only (default)
   * - 'both': Shows filtered items with inline completion
   * - 'inline': Shows static items with inline completion
   * - 'none': Shows static items without filtering or completion
   */
  readonly mode = input<AutocompleteMode>('list');

  /** Whether the autocomplete is open (controlled) */
  readonly open = input<boolean | undefined>(undefined);

  /** Default open state for uncontrolled mode */
  readonly defaultOpen = input(false);

  /** Selected value (controlled) */
  readonly value = input<T | T[] | null | undefined>(undefined);

  /** Default selected value for uncontrolled mode */
  readonly defaultValue = input<T | T[] | null>(null);

  /** Input value (controlled) */
  readonly inputValue = input<string | undefined>(undefined);

  /** Default input value for uncontrolled mode */
  readonly defaultInputValue = input('');

  /** Whether the autocomplete is disabled */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Whether the autocomplete is read-only */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /** Whether the autocomplete is required */
  readonly required = input(false, { transform: booleanAttribute });

  /** Whether multiple selection is enabled */
  readonly multiple = input(false, { transform: booleanAttribute });

  /** Custom filter function */
  readonly filterFn = input<AutocompleteFilterFn<T>>(
    defaultAutocompleteFilter as AutocompleteFilterFn<T>
  );

  /** Filter options */
  readonly filterOptions = input<AutocompleteFilterOptions>({});

  /** Custom equality function for comparing values */
  readonly valueEqualityFn = input<(a: T, b: T) => boolean>((a, b) => a === b);

  /** Function to convert value to string for display */
  readonly valueToString = input<(value: T) => string>((value) => String(value));

  // Outputs
  /** Emitted when open state changes */
  readonly openChange = output<boolean>();

  /** Emitted when value changes */
  readonly valueChange = output<T | T[] | null>();

  /** Emitted when input value changes */
  readonly inputValueChange = output<string>();

  /** Emitted with change details */
  readonly change = output<AutocompleteChangeDetails<T>>();

  /** Emitted when highlighted value changes */
  readonly highlightChange = output<AutocompleteHighlightDetails<T>>();

  // Internal state
  protected readonly openInternal = signal(false);
  protected readonly valueInternal = signal<T | T[] | null>(null);
  protected readonly inputValueInternal = signal('');
  protected readonly highlightedValueInternal = signal<T | null>(null);
  protected readonly inlineValueInternal = signal('');
  protected readonly itemsInternal = signal<AutocompleteItemData<T>[]>([]);

  // Element references
  protected readonly triggerElementInternal = signal<HTMLElement | null>(null);
  protected readonly inputElementInternal = signal<HTMLInputElement | null>(null);
  protected readonly listElementInternal = signal<HTMLElement | null>(null);

  /** Computed open state */
  readonly isOpen = computed(() => {
    const controlled = this.open();
    return controlled !== undefined ? controlled : this.openInternal();
  });

  /** Computed value */
  readonly currentValue = computed(() => {
    const controlled = this.value();
    return controlled !== undefined ? controlled : this.valueInternal();
  });

  /** Computed input value - considers inline mode */
  readonly currentInputValue = computed(() => {
    const inlineVal = this.inlineValueInternal();
    if (inlineVal) {
      return inlineVal;
    }

    const controlled = this.inputValue();
    return controlled !== undefined ? controlled : this.inputValueInternal();
  });

  /** Filtered items based on mode and input */
  readonly filteredItems = computed(() => {
    const allItems = this.itemsInternal();
    const inputVal = this.currentInputValue();
    const currentMode = this.mode();
    const options = this.filterOptions();

    // In 'inline' or 'none' mode, don't filter the list
    if (currentMode === 'inline' || currentMode === 'none') {
      return allItems;
    }

    // In 'list' or 'both' mode, filter the items
    return this.filterFn()(allItems, inputVal, this.valueToString(), options);
  });

  /** The context object for child components */
  readonly context: AutocompleteRootContext<T>;

  constructor() {
    // Initialize from defaults
    const defaultOpenVal = this.defaultOpen();
    const defaultVal = this.defaultValue();
    const defaultInputVal = this.defaultInputValue();

    if (defaultOpenVal) {
      this.openInternal.set(defaultOpenVal);
    }
    if (defaultVal !== null) {
      this.valueInternal.set(defaultVal);
    }
    if (defaultInputVal) {
      this.inputValueInternal.set(defaultInputVal);
    }

    // Create context with getters
    const self = this;
    this.context = {
      get rootId() {
        return self.rootId;
      },
      get open() {
        return self.isOpen();
      },
      get value() {
        return self.currentValue();
      },
      get inputValue() {
        return self.currentInputValue();
      },
      get highlightedValue() {
        return self.highlightedValueInternal();
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
      get mode() {
        return self.mode();
      },
      get inlineValue() {
        return self.inlineValueInternal();
      },

      openSignal: this.isOpen,
      valueSignal: this.currentValue,
      inputValueSignal: this.currentInputValue,
      highlightedValueSignal: this.highlightedValueInternal.asReadonly(),
      disabledSignal: computed(() => this.disabled()) as Signal<boolean>,
      readOnlySignal: computed(() => this.readOnly()) as Signal<boolean>,
      requiredSignal: computed(() => this.required()) as Signal<boolean>,
      multipleSignal: computed(() => this.multiple()) as Signal<boolean>,
      modeSignal: computed(() => this.mode()) as Signal<AutocompleteMode>,
      inlineValueSignal: this.inlineValueInternal.asReadonly(),

      triggerElement: this.triggerElementInternal.asReadonly(),
      inputElement: this.inputElementInternal.asReadonly(),
      listElement: this.listElementInternal.asReadonly(),

      setOpen: this.setOpen.bind(this),
      setValue: this.setValue.bind(this),
      toggleValue: this.toggleValue.bind(this),
      setInputValue: this.setInputValue.bind(this),
      setHighlightedValue: this.setHighlightedValue.bind(this),
      setInlineValue: this.setInlineValue.bind(this),
      clear: this.clear.bind(this),

      registerItem: this.registerItem.bind(this),
      unregisterItem: this.unregisterItem.bind(this),
      getItems: () => this.itemsInternal(),
      getFilteredItems: () => this.filteredItems(),

      setTriggerElement: (el) => this.triggerElementInternal.set(el),
      setInputElement: (el) => this.inputElementInternal.set(el),
      setListElement: (el) => this.listElementInternal.set(el),

      isSelected: this.isSelected.bind(this),
      valueEquality: (a, b) => this.valueEqualityFn()(a, b),
      hasSelectedValue: this.hasSelectedValue.bind(this),
      getValueString: (value) => this.valueToString()(value),
    };
  }

  /** Set the open state */
  setOpen(open: boolean, _reason?: string): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    if (this.open() === undefined) {
      this.openInternal.set(open);
    }
    this.openChange.emit(open);

    // Clear inline value when closing
    if (!open) {
      this.inlineValueInternal.set('');
    }
  }

  /** Set the selected value */
  setValue(value: T | T[] | null): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    if (this.value() === undefined) {
      this.valueInternal.set(value);
    }
    this.valueChange.emit(value);
    this.change.emit({
      reason: value === null ? 'clear' : 'selectOption',
      value,
    });

    // Update input value to show selected value (single mode)
    if (!this.multiple() && value !== null) {
      const stringValue = this.valueToString()(value as T);
      this.setInputValue(stringValue);
    }
  }

  /** Toggle a value in multiple mode */
  toggleValue(value: T): void {
    if (!this.multiple()) {
      this.setValue(value);
      return;
    }

    const current = (this.currentValue() as T[]) ?? [];
    const isSelected = current.some((v) => this.valueEqualityFn()(v, value));

    if (isSelected) {
      const newValue = current.filter((v) => !this.valueEqualityFn()(v, value));
      this.setValue(newValue);
      this.change.emit({ reason: 'removeOption', value: newValue });
    } else {
      const newValue = [...current, value];
      this.setValue(newValue);
      this.change.emit({ reason: 'selectOption', value: newValue });
    }
  }

  /** Set the input value */
  setInputValue(value: string): void {
    // Clear inline value when user types
    this.inlineValueInternal.set('');

    if (this.inputValue() === undefined) {
      this.inputValueInternal.set(value);
    }
    this.inputValueChange.emit(value);

    // Handle inline completion in 'both' or 'inline' mode
    const currentMode = this.mode();
    if (currentMode === 'both' || currentMode === 'inline') {
      this.updateInlineCompletion(value);
    }
  }

  /** Update inline completion based on input */
  private updateInlineCompletion(inputVal: string): void {
    if (!inputVal) {
      this.inlineValueInternal.set('');
      return;
    }

    const items = this.itemsInternal();
    const matchingItem = items.find((item) => {
      const itemString = item.textValue ?? item.label ?? this.valueToString()(item.value);
      return itemString.toLowerCase().startsWith(inputVal.toLowerCase());
    });

    if (matchingItem) {
      const itemString =
        matchingItem.textValue ?? matchingItem.label ?? this.valueToString()(matchingItem.value);
      // Only set inline value if it would extend the current input
      if (itemString.length > inputVal.length) {
        this.inlineValueInternal.set(itemString);
        this.setHighlightedValue(matchingItem.value);
      }
    } else {
      this.inlineValueInternal.set('');
    }
  }

  /** Set the highlighted value */
  setHighlightedValue(value: T | null): void {
    this.highlightedValueInternal.set(value);
    this.highlightChange.emit({
      reason: 'auto',
      value,
    });
  }

  /** Set the inline value for completion */
  setInlineValue(value: string): void {
    this.inlineValueInternal.set(value);
  }

  /** Clear the selection and input */
  clear(): void {
    this.setValue(null);
    this.setInputValue('');
    this.inlineValueInternal.set('');
    this.highlightedValueInternal.set(null);
    this.change.emit({ reason: 'clear', value: null });
  }

  /** Register an item */
  registerItem(item: AutocompleteItemData<T>): void {
    this.itemsInternal.update((items) => {
      const exists = items.some((i) => this.valueEqualityFn()(i.value, item.value));
      if (exists) {
        return items.map((i) => (this.valueEqualityFn()(i.value, item.value) ? item : i));
      }
      return [...items, item];
    });
  }

  /** Unregister an item */
  unregisterItem(value: T): void {
    this.itemsInternal.update((items) =>
      items.filter((i) => !this.valueEqualityFn()(i.value, value))
    );
  }

  /** Check if a value is selected */
  isSelected(value: T): boolean {
    const current = this.currentValue();
    if (current === null) {
      return false;
    }

    if (this.multiple()) {
      return (current as T[]).some((v) => this.valueEqualityFn()(v, value));
    }

    return this.valueEqualityFn()(current as T, value);
  }

  /** Check if there's any selected value */
  hasSelectedValue(): boolean {
    const current = this.currentValue();
    if (current === null) {
      return false;
    }

    if (this.multiple()) {
      return (current as T[]).length > 0;
    }

    return true;
  }

  /** Get string representation of value for item lookup */
  private itemToStringLabel(value: T): string {
    const item = this.itemsInternal().find((i) => this.valueEqualityFn()(i.value, value));
    return item?.textValue ?? item?.label ?? this.valueToString()(value);
  }
}

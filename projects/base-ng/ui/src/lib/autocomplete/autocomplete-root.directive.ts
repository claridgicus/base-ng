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
  Input,
  Output,
  EventEmitter,
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
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-readonly]': '_readOnly() ? "" : null',
    '[attr.data-mode]': '_mode()',
    '[class.base-ui-autocomplete-root]': 'true',
    '[class.base-ui-autocomplete-root-open]': 'isOpen()',
    '[class.base-ui-autocomplete-root-disabled]': '_disabled()',
  },
})
export class AutocompleteRootDirective<T = unknown> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Unique ID for this autocomplete instance */
  readonly rootId = `base-ui-autocomplete-${++autocompleteCounter}`;

  // Internal signals for inputs
  readonly _mode = signal<AutocompleteMode>('list');
  private readonly _open = signal<boolean | undefined>(undefined);
  private readonly _defaultOpen = signal(false);
  private readonly _value = signal<T | T[] | null | undefined>(undefined);
  private readonly _defaultValue = signal<T | T[] | null>(null);
  private readonly _inputValue = signal<string | undefined>(undefined);
  private readonly _defaultInputValue = signal('');
  readonly _disabled = signal(false);
  readonly _readOnly = signal(false);
  private readonly _required = signal(false);
  private readonly _multiple = signal(false);
  private readonly _filterFn = signal<AutocompleteFilterFn<T>>(
    defaultAutocompleteFilter as AutocompleteFilterFn<T>
  );
  private readonly _filterOptions = signal<AutocompleteFilterOptions>({});
  private readonly _valueEqualityFn = signal<(a: T, b: T) => boolean>((a, b) => a === b);
  private readonly _valueToString = signal<(value: T) => string>((value) => String(value));

  /**
   * Autocomplete mode:
   * - 'list': Shows filtered items only (default)
   * - 'both': Shows filtered items with inline completion
   * - 'inline': Shows static items with inline completion
   * - 'none': Shows static items without filtering or completion
   */
  @Input()
  get mode(): AutocompleteMode {
    return this._mode();
  }
  set mode(value: AutocompleteMode) {
    this._mode.set(value);
  }

  /** Whether the autocomplete is open (controlled) */
  @Input()
  get open(): boolean | undefined {
    return this._open();
  }
  set open(value: boolean | undefined) {
    this._open.set(value);
  }

  /** Default open state for uncontrolled mode */
  @Input()
  get defaultOpen(): boolean {
    return this._defaultOpen();
  }
  set defaultOpen(value: boolean) {
    this._defaultOpen.set(value);
  }

  /** Selected value (controlled) */
  @Input()
  get value(): T | T[] | null | undefined {
    return this._value();
  }
  set value(val: T | T[] | null | undefined) {
    this._value.set(val);
  }

  /** Default selected value for uncontrolled mode */
  @Input()
  get defaultValue(): T | T[] | null {
    return this._defaultValue();
  }
  set defaultValue(value: T | T[] | null) {
    this._defaultValue.set(value);
  }

  /** Input value (controlled) */
  @Input()
  get inputValue(): string | undefined {
    return this._inputValue();
  }
  set inputValue(value: string | undefined) {
    this._inputValue.set(value);
  }

  /** Default input value for uncontrolled mode */
  @Input()
  get defaultInputValue(): string {
    return this._defaultInputValue();
  }
  set defaultInputValue(value: string) {
    this._defaultInputValue.set(value);
  }

  /** Whether the autocomplete is disabled */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }

  /** Whether the autocomplete is read-only */
  @Input({ transform: booleanAttribute })
  get readOnly(): boolean {
    return this._readOnly();
  }
  set readOnly(value: boolean) {
    this._readOnly.set(value);
  }

  /** Whether the autocomplete is required */
  @Input({ transform: booleanAttribute })
  get required(): boolean {
    return this._required();
  }
  set required(value: boolean) {
    this._required.set(value);
  }

  /** Whether multiple selection is enabled */
  @Input({ transform: booleanAttribute })
  get multiple(): boolean {
    return this._multiple();
  }
  set multiple(value: boolean) {
    this._multiple.set(value);
  }

  /** Custom filter function */
  @Input()
  get filterFn(): AutocompleteFilterFn<T> {
    return this._filterFn();
  }
  set filterFn(value: AutocompleteFilterFn<T>) {
    this._filterFn.set(value);
  }

  /** Filter options */
  @Input()
  get filterOptions(): AutocompleteFilterOptions {
    return this._filterOptions();
  }
  set filterOptions(value: AutocompleteFilterOptions) {
    this._filterOptions.set(value);
  }

  /** Custom equality function for comparing values */
  @Input()
  get valueEqualityFn(): (a: T, b: T) => boolean {
    return this._valueEqualityFn();
  }
  set valueEqualityFn(value: (a: T, b: T) => boolean) {
    this._valueEqualityFn.set(value);
  }

  /** Function to convert value to string for display */
  @Input()
  get valueToString(): (value: T) => string {
    return this._valueToString();
  }
  set valueToString(value: (value: T) => string) {
    this._valueToString.set(value);
  }

  // Outputs
  /** Emitted when open state changes */
  @Output() readonly openChange = new EventEmitter<boolean>();

  /** Emitted when value changes */
  @Output() readonly valueChange = new EventEmitter<T | T[] | null>();

  /** Emitted when input value changes */
  @Output() readonly inputValueChange = new EventEmitter<string>();

  /** Emitted with change details */
  @Output() readonly change = new EventEmitter<AutocompleteChangeDetails<T>>();

  /** Emitted when highlighted value changes */
  @Output() readonly highlightChange = new EventEmitter<AutocompleteHighlightDetails<T>>();

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
    const controlled = this._open();
    return controlled !== undefined ? controlled : this.openInternal();
  });

  /** Computed value */
  readonly currentValue = computed(() => {
    const controlled = this._value();
    return controlled !== undefined ? controlled : this.valueInternal();
  });

  /** Computed input value - considers inline mode */
  readonly currentInputValue = computed(() => {
    const inlineVal = this.inlineValueInternal();
    if (inlineVal) {
      return inlineVal;
    }

    const controlled = this._inputValue();
    return controlled !== undefined ? controlled : this.inputValueInternal();
  });

  /** Filtered items based on mode and input */
  readonly filteredItems = computed(() => {
    const allItems = this.itemsInternal();
    const inputVal = this.currentInputValue();
    const currentMode = this._mode();
    const options = this._filterOptions();

    // In 'inline' or 'none' mode, don't filter the list
    if (currentMode === 'inline' || currentMode === 'none') {
      return allItems;
    }

    // In 'list' or 'both' mode, filter the items
    return this._filterFn()(allItems, inputVal, this._valueToString(), options);
  });

  /** The context object for child components */
  readonly context: AutocompleteRootContext<T>;

  constructor() {
    // Initialize from defaults
    const defaultOpenVal = this._defaultOpen();
    const defaultVal = this._defaultValue();
    const defaultInputVal = this._defaultInputValue();

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
        return self._disabled();
      },
      get readOnly() {
        return self._readOnly();
      },
      get required() {
        return self._required();
      },
      get multiple() {
        return self._multiple();
      },
      get mode() {
        return self._mode();
      },
      get inlineValue() {
        return self.inlineValueInternal();
      },

      openSignal: this.isOpen,
      valueSignal: this.currentValue,
      inputValueSignal: this.currentInputValue,
      highlightedValueSignal: this.highlightedValueInternal.asReadonly(),
      disabledSignal: this._disabled.asReadonly(),
      readOnlySignal: this._readOnly.asReadonly(),
      requiredSignal: this._required.asReadonly(),
      multipleSignal: this._multiple.asReadonly(),
      modeSignal: this._mode.asReadonly(),
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
      valueEquality: (a, b) => this._valueEqualityFn()(a, b),
      hasSelectedValue: this.hasSelectedValue.bind(this),
      getValueString: (value) => this._valueToString()(value),
    };
  }

  /** Set the open state */
  setOpen(open: boolean, _reason?: string): void {
    if (this._disabled() || this._readOnly()) {
      return;
    }

    if (this._open() === undefined) {
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
    if (this._disabled() || this._readOnly()) {
      return;
    }

    if (this._value() === undefined) {
      this.valueInternal.set(value);
    }
    this.valueChange.emit(value);
    this.change.emit({
      reason: value === null ? 'clear' : 'selectOption',
      value,
    });

    // Update input value to show selected value (single mode)
    if (!this._multiple() && value !== null) {
      const stringValue = this._valueToString()(value as T);
      this.setInputValue(stringValue);
    }
  }

  /** Toggle a value in multiple mode */
  toggleValue(value: T): void {
    if (!this._multiple()) {
      this.setValue(value);
      return;
    }

    const current = (this.currentValue() as T[]) ?? [];
    const isSelected = current.some((v) => this._valueEqualityFn()(v, value));

    if (isSelected) {
      const newValue = current.filter((v) => !this._valueEqualityFn()(v, value));
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

    if (this._inputValue() === undefined) {
      this.inputValueInternal.set(value);
    }
    this.inputValueChange.emit(value);

    // Handle inline completion in 'both' or 'inline' mode
    const currentMode = this._mode();
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
      const itemString = item.textValue ?? item.label ?? this._valueToString()(item.value);
      return itemString.toLowerCase().startsWith(inputVal.toLowerCase());
    });

    if (matchingItem) {
      const itemString =
        matchingItem.textValue ?? matchingItem.label ?? this._valueToString()(matchingItem.value);
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
      const exists = items.some((i) => this._valueEqualityFn()(i.value, item.value));
      if (exists) {
        return items.map((i) => (this._valueEqualityFn()(i.value, item.value) ? item : i));
      }
      return [...items, item];
    });
  }

  /** Unregister an item */
  unregisterItem(value: T): void {
    this.itemsInternal.update((items) =>
      items.filter((i) => !this._valueEqualityFn()(i.value, value))
    );
  }

  /** Check if a value is selected */
  isSelected(value: T): boolean {
    const current = this.currentValue();
    if (current === null) {
      return false;
    }

    if (this._multiple()) {
      return (current as T[]).some((v) => this._valueEqualityFn()(v, value));
    }

    return this._valueEqualityFn()(current as T, value);
  }

  /** Check if there's any selected value */
  hasSelectedValue(): boolean {
    const current = this.currentValue();
    if (current === null) {
      return false;
    }

    if (this._multiple()) {
      return (current as T[]).length > 0;
    }

    return true;
  }

  /** Get string representation of value for item lookup */
  private itemToStringLabel(value: T): string {
    const item = this.itemsInternal().find((i) => this._valueEqualityFn()(i.value, value));
    return item?.textValue ?? item?.label ?? this._valueToString()(value);
  }
}

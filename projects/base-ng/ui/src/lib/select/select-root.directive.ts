/**
 * @fileoverview Angular port of Base UI Select Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/root/SelectRoot.tsx
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
  SELECT_ROOT_CONTEXT,
  type SelectRootContext,
  type SelectItemData,
  type SelectOpenMethod,
} from './select.types';

let selectIdCounter = 0;

/**
 * Select Root directive.
 * Groups all parts of the select.
 * Doesn't render its own HTML element.
 *
 * @example
 * ```html
 * <div baseUiSelectRoot>
 *   <button baseUiSelectTrigger>
 *     <span baseUiSelectValue placeholder="Select an option..."></span>
 *     <span baseUiSelectIcon></span>
 *   </button>
 *   <div baseUiSelectPositioner>
 *     <div baseUiSelectPopup>
 *       <div baseUiSelectList>
 *         <div baseUiSelectItem [value]="'apple'">Apple</div>
 *         <div baseUiSelectItem [value]="'banana'">Banana</div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectRoot]',
  standalone: true,
  exportAs: 'selectRoot',
  providers: [
    {
      provide: SELECT_ROOT_CONTEXT,
      useFactory: (directive: SelectRootDirective) => directive.context,
      deps: [SelectRootDirective],
    },
  ],
  host: {
    '[class.base-ui-select-root]': 'true',
    '[class.base-ui-select-root-open]': 'isOpen()',
    '[class.base-ui-select-root-disabled]': 'disabled()',
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class SelectRootDirective<T = unknown> {
  private readonly rootId = `base-ui-select-${++selectIdCounter}`;

  /**
   * Whether the select is open.
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
   * Whether the select is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the select is read-only.
   */
  readonly readOnly = input(false, { transform: booleanAttribute });

  /**
   * Whether the select is required.
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Whether multiple selection is allowed.
   */
  readonly multiple = input(false, { transform: booleanAttribute });

  /**
   * Event emitted when the open state changes.
   */
  readonly openChange = output<boolean>();

  /**
   * Event emitted when the value changes.
   */
  readonly valueChange = output<T | T[] | null>();

  // Internal state signals
  private readonly openInternal = signal(false);
  private readonly valueInternal = signal<T | T[] | null>(null);
  private readonly openMethodInternal = signal<SelectOpenMethod>(null);
  private readonly triggerElementInternal = signal<HTMLElement | null>(null);
  private readonly listElementInternal = signal<HTMLElement | null>(null);
  private readonly highlightedValueInternal = signal<T | null>(null);
  private readonly items = signal<SelectItemData<T>[]>([]);

  /** Whether the select is open */
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

  /** The context provided to child components */
  readonly context: SelectRootContext<T>;

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

    // Create context with getters
    const self = this;
    this.context = {
      get open() {
        return self.isOpen();
      },
      get value() {
        return self.currentValue();
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
      disabledSignal: computed(() => this.disabled()) as Signal<boolean>,
      readOnlySignal: computed(() => this.readOnly()) as Signal<boolean>,
      requiredSignal: computed(() => this.required()) as Signal<boolean>,
      multipleSignal: computed(() => this.multiple()) as Signal<boolean>,
      openMethodSignal: this.openMethodInternal.asReadonly(),
      rootId: this.rootId,
      setOpen: this.setOpen.bind(this),
      setValue: this.setValue.bind(this),
      toggleValue: this.toggleValue.bind(this),
      registerItem: this.registerItem.bind(this),
      unregisterItem: this.unregisterItem.bind(this),
      getItems: this.getItems.bind(this),
      valueEquality: this.valueEquality.bind(this),
      itemToStringLabel: this.itemToStringLabel.bind(this),
      hasSelectedValue: this.hasSelectedValue.bind(this),
      triggerElement: this.triggerElementInternal.asReadonly(),
      setTriggerElement: this.setTriggerElement.bind(this),
      listElement: this.listElementInternal.asReadonly(),
      setListElement: this.setListElement.bind(this),
      highlightedValue: this.highlightedValueInternal.asReadonly(),
      setHighlightedValue: this.setHighlightedValue.bind(this),
    };
  }

  /**
   * Set the open state.
   */
  setOpen(open: boolean, method: SelectOpenMethod = null): void {
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
   * Register an item.
   */
  registerItem(data: SelectItemData<T>): void {
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
  getItems(): SelectItemData<T>[] {
    return this.items();
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
   * Check if the select has a selected value.
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

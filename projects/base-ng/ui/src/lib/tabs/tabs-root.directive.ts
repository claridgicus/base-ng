/**
 * @fileoverview Angular port of Base UI TabsRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/root/TabsRoot.tsx
 *
 * Groups the tabs and the corresponding panels.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  TABS_CONTEXT,
  type TabActivationDirection,
  type TabsChangeEventDetails,
  type TabsContext,
  type TabsOrientation,
  type TabValue,
} from './tabs.types';

let tabsIdCounter = 0;

/**
 * Root directive for tabs.
 * Groups the tabs and the corresponding panels.
 *
 * @example
 * ```html
 * <div baseUiTabsRoot [(value)]="selectedTab">
 *   <div baseUiTabsList>
 *     <button baseUiTab value="tab1">Tab 1</button>
 *     <button baseUiTab value="tab2">Tab 2</button>
 *   </div>
 *   <div baseUiTabsPanel value="tab1">Content 1</div>
 *   <div baseUiTabsPanel value="tab2">Content 2</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiTabsRoot]',
  standalone: true,
  exportAs: 'tabsRoot',
  host: {
    '[id]': 'rootId',
    '[attr.data-orientation]': '_orientation()',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[class.base-ui-tabs]': 'true',
    '[class.base-ui-tabs-horizontal]': '_orientation() === "horizontal"',
    '[class.base-ui-tabs-vertical]': '_orientation() === "vertical"',
    '[class.base-ui-tabs-disabled]': '_disabled()',
  },
  providers: [
    {
      provide: TABS_CONTEXT,
      useFactory: (directive: TabsRootDirective) => directive.context,
      deps: [TabsRootDirective],
    },
  ],
})
export class TabsRootDirective {
  /** Unique ID for the tabs root */
  readonly rootId = `base-ui-tabs-${tabsIdCounter++}`;

  /**
   * The controlled value of the selected tab.
   */
  readonly _value = signal<TabValue | undefined>(undefined);

  @Input()
  set value(val: TabValue | undefined) {
    this._value.set(val);
  }
  get value(): TabValue | undefined {
    return this._value();
  }

  /**
   * The default value when uncontrolled.
   */
  readonly _defaultValue = signal<TabValue | undefined>(undefined);

  @Input()
  set defaultValue(val: TabValue | undefined) {
    this._defaultValue.set(val);
  }
  get defaultValue(): TabValue | undefined {
    return this._defaultValue();
  }

  /**
   * Orientation of the tabs.
   */
  readonly _orientation = signal<TabsOrientation>('horizontal');

  @Input()
  set orientation(val: TabsOrientation) {
    this._orientation.set(val);
  }
  get orientation(): TabsOrientation {
    return this._orientation();
  }

  /**
   * Whether the tabs are disabled.
   */
  readonly _disabled = signal<boolean>(false);

  @Input({ transform: booleanAttribute })
  set disabled(val: boolean) {
    this._disabled.set(val);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Emits when the selected tab changes (for two-way binding).
   */
  @Output() readonly valueChange = new EventEmitter<TabValue | undefined>();

  /**
   * Emits when the selected tab changes (with details).
   */
  @Output() readonly valueChanged = new EventEmitter<TabsChangeEventDetails>();

  /** Internal value signal */
  private readonly internalValue = signal<TabValue | undefined>(undefined);

  /** Track registered panels */
  private readonly registeredPanels = signal<Set<TabValue>>(new Set());

  /** Activation direction */
  private readonly activationDirection = signal<TabActivationDirection>('none');

  /** Computed value - uses model if set, otherwise internal */
  readonly computedValue = computed(() => {
    const modelValue = this._value();
    return modelValue !== undefined ? modelValue : this.internalValue();
  });

  /** Context provided to children */
  readonly context: TabsContext = {
    value: this.computedValue(),
    valueSignal: this.computedValue,
    orientation: this._orientation(),
    orientationSignal: this._orientation,
    disabled: this._disabled(),
    disabledSignal: this._disabled,
    tabActivationDirection: this.activationDirection(),
    activationDirectionSignal: this.activationDirection,
    selectTab: (value: TabValue) => this.selectTab(value),
    getPanelId: (value: TabValue) => this.getPanelId(value),
    getTriggerId: (value: TabValue) => this.getTriggerId(value),
    registerPanel: (value: TabValue) => this.registerPanel(value),
    unregisterPanel: (value: TabValue) => this.unregisterPanel(value),
    rootId: this.rootId,
  };

  constructor() {
    // Initialize with default value
    effect(() => {
      const defaultVal = this._defaultValue();
      if (defaultVal !== undefined && this.internalValue() === undefined) {
        this.internalValue.set(defaultVal);
      }
    });

    // Sync model to internal
    effect(() => {
      const modelVal = this._value();
      if (modelVal !== undefined) {
        this.internalValue.set(modelVal);
      }
    });
  }

  /**
   * Get panel ID for a tab value.
   */
  getPanelId(value: TabValue): string {
    return `${this.rootId}-panel-${value}`;
  }

  /**
   * Get trigger ID for a tab value.
   */
  getTriggerId(value: TabValue): string {
    return `${this.rootId}-tab-${value}`;
  }

  /**
   * Register a panel.
   */
  registerPanel(value: TabValue): void {
    this.registeredPanels.update(panels => {
      const newPanels = new Set(panels);
      newPanels.add(value);
      return newPanels;
    });
  }

  /**
   * Unregister a panel.
   */
  unregisterPanel(value: TabValue): void {
    this.registeredPanels.update(panels => {
      const newPanels = new Set(panels);
      newPanels.delete(value);
      return newPanels;
    });
  }

  /**
   * Select a tab by value.
   */
  selectTab(newValue: TabValue): void {
    if (this._disabled()) {
      return;
    }

    const currentValue = this.computedValue();
    if (newValue === currentValue) {
      return;
    }

    // Determine activation direction (simplified)
    let direction: TabActivationDirection = 'none';
    if (currentValue !== undefined && newValue !== undefined) {
      // For simplicity, use left/right for horizontal, up/down for vertical
      // In a real implementation, this would be based on DOM position
      if (typeof currentValue === 'number' && typeof newValue === 'number') {
        if (this._orientation() === 'horizontal') {
          direction = newValue > currentValue ? 'right' : 'left';
        } else {
          direction = newValue > currentValue ? 'down' : 'up';
        }
      } else if (typeof currentValue === 'string' && typeof newValue === 'string') {
        if (this._orientation() === 'horizontal') {
          direction = newValue > currentValue ? 'right' : 'left';
        } else {
          direction = newValue > currentValue ? 'down' : 'up';
        }
      }
    }

    this.activationDirection.set(direction);
    this.internalValue.set(newValue);
    this._value.set(newValue);

    // Emit for two-way binding
    this.valueChange.emit(newValue);

    // Emit with details
    this.valueChanged.emit({
      value: newValue,
      previousValue: currentValue,
      activationDirection: direction,
    });
  }
}

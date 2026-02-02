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
  input,
  model,
  output,
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
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class.base-ui-tabs]': 'true',
    '[class.base-ui-tabs-horizontal]': 'orientation() === "horizontal"',
    '[class.base-ui-tabs-vertical]': 'orientation() === "vertical"',
    '[class.base-ui-tabs-disabled]': 'disabled()',
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
  readonly value = model<TabValue | undefined>(undefined);

  /**
   * The default value when uncontrolled.
   */
  readonly defaultValue = input<TabValue | undefined>(undefined);

  /**
   * Orientation of the tabs.
   */
  readonly orientation = input<TabsOrientation>('horizontal');

  /**
   * Whether the tabs are disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Emits when the selected tab changes.
   */
  readonly valueChanged = output<TabsChangeEventDetails>();

  /** Internal value signal */
  private readonly internalValue = signal<TabValue | undefined>(undefined);

  /** Track registered panels */
  private readonly registeredPanels = signal<Set<TabValue>>(new Set());

  /** Activation direction */
  private readonly activationDirection = signal<TabActivationDirection>('none');

  /** Computed value - uses model if set, otherwise internal */
  readonly computedValue = computed(() => {
    const modelValue = this.value();
    return modelValue !== undefined ? modelValue : this.internalValue();
  });

  /** Context provided to children */
  readonly context: TabsContext = {
    value: this.computedValue(),
    valueSignal: this.computedValue,
    orientation: this.orientation(),
    orientationSignal: this.orientation,
    disabled: this.disabled(),
    disabledSignal: this.disabled,
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
      const defaultVal = this.defaultValue();
      if (defaultVal !== undefined && this.internalValue() === undefined) {
        this.internalValue.set(defaultVal);
      }
    });

    // Sync model to internal
    effect(() => {
      const modelVal = this.value();
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
    if (this.disabled()) {
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
        if (this.orientation() === 'horizontal') {
          direction = newValue > currentValue ? 'right' : 'left';
        } else {
          direction = newValue > currentValue ? 'down' : 'up';
        }
      } else if (typeof currentValue === 'string' && typeof newValue === 'string') {
        if (this.orientation() === 'horizontal') {
          direction = newValue > currentValue ? 'right' : 'left';
        } else {
          direction = newValue > currentValue ? 'down' : 'up';
        }
      }
    }

    this.activationDirection.set(direction);
    this.internalValue.set(newValue);
    this.value.set(newValue);

    this.valueChanged.emit({
      value: newValue,
      previousValue: currentValue,
      activationDirection: direction,
    });
  }
}

/**
 * @fileoverview Angular port of Base UI Tabs types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/root/TabsRootContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';

/**
 * Orientation of the tabs.
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * Activation direction when switching tabs.
 */
export type TabActivationDirection = 'none' | 'left' | 'right' | 'up' | 'down';

/**
 * Value type for tabs - can be string or number.
 */
export type TabValue = string | number;

/**
 * State of the tabs root.
 */
export interface TabsState {
  /** Currently selected tab value */
  value: TabValue | undefined;
  /** Orientation of the tabs */
  orientation: TabsOrientation;
  /** Whether the tabs are disabled */
  disabled: boolean;
  /** Direction of the last tab activation */
  tabActivationDirection: TabActivationDirection;
}

/**
 * Event details for tab change.
 */
export interface TabsChangeEventDetails {
  /** New selected value */
  value: TabValue;
  /** Previous selected value */
  previousValue: TabValue | undefined;
  /** Activation direction */
  activationDirection: TabActivationDirection;
}

/**
 * Context provided by the tabs root.
 */
export interface TabsContext extends TabsState {
  /** Signal for value changes */
  valueSignal: Signal<TabValue | undefined>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Signal for orientation */
  orientationSignal: Signal<TabsOrientation>;
  /** Signal for activation direction */
  activationDirectionSignal: Signal<TabActivationDirection>;
  /** Select a tab by value */
  selectTab: (value: TabValue) => void;
  /** Get panel ID for a tab value */
  getPanelId: (value: TabValue) => string;
  /** Get trigger ID for a tab value */
  getTriggerId: (value: TabValue) => string;
  /** Register a panel */
  registerPanel: (value: TabValue) => void;
  /** Unregister a panel */
  unregisterPanel: (value: TabValue) => void;
  /** Root element ID */
  rootId: string;
}

/**
 * State of the tabs list.
 */
export interface TabsListState {
  /** Orientation of the tabs */
  orientation: TabsOrientation;
  /** Activation direction */
  tabActivationDirection: TabActivationDirection;
}

/**
 * Context provided by the tabs list.
 */
export interface TabsListContext {
  /** Whether to activate tab on focus */
  activateOnFocus: boolean;
  /** Currently highlighted tab index */
  highlightedTabIndex: number;
  /** Set highlighted tab index */
  setHighlightedTabIndex: (index: number) => void;
  /** Tabs list element */
  tabsListElement: HTMLElement | null;
  /** Current value */
  value: TabValue | undefined;
  /** Callback for tab activation */
  onTabActivation: (value: TabValue) => void;
}

/**
 * State of an individual tab.
 */
export interface TabState {
  /** Whether the tab is selected */
  selected: boolean;
  /** Whether the tab is disabled */
  disabled: boolean;
  /** Orientation */
  orientation: TabsOrientation;
  /** Whether the tab is highlighted */
  highlighted: boolean;
}

/**
 * State of a tab panel.
 */
export interface TabPanelState {
  /** Whether the panel is hidden */
  hidden: boolean;
  /** Orientation */
  orientation: TabsOrientation;
}

/**
 * Injection token for tabs context.
 */
export const TABS_CONTEXT = new InjectionToken<TabsContext>('TABS_CONTEXT');

/**
 * Injection token for tabs list context.
 */
export const TABS_LIST_CONTEXT = new InjectionToken<TabsListContext>('TABS_LIST_CONTEXT');

/**
 * @fileoverview Public API for tabs component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/index.ts
 */

export { TabsRootDirective } from './tabs-root.directive';
export { TabsListDirective } from './tabs-list.directive';
export { TabsTabDirective } from './tabs-tab.directive';
export { TabsPanelDirective } from './tabs-panel.directive';
export { TabsIndicatorDirective } from './tabs-indicator.directive';
export {
  TABS_CONTEXT,
  TABS_LIST_CONTEXT,
  type TabsContext,
  type TabsListContext,
  type TabsState,
  type TabsListState,
  type TabState,
  type TabPanelState,
  type TabsOrientation,
  type TabActivationDirection,
  type TabValue,
  type TabsChangeEventDetails,
} from './tabs.types';

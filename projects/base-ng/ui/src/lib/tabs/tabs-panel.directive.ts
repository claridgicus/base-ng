/**
 * @fileoverview Angular port of Base UI TabsPanel
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/panel/TabsPanel.tsx
 *
 * A panel displayed when the corresponding tab is active.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  type Signal,
} from '@angular/core';
import { TABS_CONTEXT, type TabValue } from './tabs.types';

/**
 * Panel directive for tab content.
 * Displays content when the corresponding tab is active.
 *
 * @example
 * ```html
 * <div baseUiTabsPanel value="tab1">
 *   Content for Tab 1
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiTabsPanel]',
  standalone: true,
  exportAs: 'tabsPanel',
  host: {
    role: 'tabpanel',
    '[id]': 'panelId()',
    '[attr.aria-labelledby]': 'triggerId()',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.data-hidden]': '!isSelected() ? "" : null',
    '[attr.data-orientation]': 'context.orientationSignal()',
    '[attr.hidden]': 'isHidden() ? "" : null',
    '[class.base-ui-tabs-panel]': 'true',
    '[class.base-ui-tabs-panel-selected]': 'isSelected()',
    '[class.base-ui-tabs-panel-hidden]': '!isSelected()',
    '[style.display]': 'shouldShow() ? null : "none"',
    '[attr.tabindex]': 'isSelected() ? 0 : -1',
  },
})
export class TabsPanelDirective implements OnInit, OnDestroy {
  protected readonly context = inject(TABS_CONTEXT);

  /**
   * The value that identifies this panel.
   * Must match a corresponding tab's value.
   */
  readonly _value = signal<TabValue>('' as TabValue);

  @Input({ required: true })
  set value(val: TabValue) {
    this._value.set(val);
  }
  get value(): TabValue {
    return this._value();
  }

  /**
   * Whether to keep the panel mounted when not selected.
   */
  readonly _keepMounted = signal<boolean>(false);

  @Input({ transform: booleanAttribute })
  set keepMounted(val: boolean) {
    this._keepMounted.set(val);
  }
  get keepMounted(): boolean {
    return this._keepMounted();
  }

  /**
   * Computed panel ID.
   */
  readonly panelId = computed(() => this.context.getPanelId(this._value()));

  /**
   * Computed trigger ID.
   */
  readonly triggerId = computed(() => this.context.getTriggerId(this._value()));

  /**
   * Whether this panel's tab is selected.
   */
  readonly isSelected = computed(() => {
    return this.context.valueSignal() === this._value();
  });

  /**
   * Whether the panel is hidden.
   */
  readonly isHidden: Signal<boolean> = computed(() => {
    return !this.isSelected() && !this._keepMounted();
  });

  /**
   * Whether the panel should be visible.
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    return this.isSelected();
  });

  ngOnInit(): void {
    this.context.registerPanel(this._value());
  }

  ngOnDestroy(): void {
    this.context.unregisterPanel(this._value());
  }
}

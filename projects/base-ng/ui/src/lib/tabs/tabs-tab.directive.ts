/**
 * @fileoverview Angular port of Base UI TabsTab
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/tab/TabsTab.tsx
 *
 * A tab trigger that activates its corresponding panel.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
} from '@angular/core';
import { TABS_CONTEXT, type TabValue } from './tabs.types';

/**
 * Tab directive for individual tabs.
 * A button that activates its corresponding panel.
 *
 * @example
 * ```html
 * <button baseUiTab value="tab1">Tab 1</button>
 * ```
 */
@Directive({
  selector: '[baseUiTab]',
  standalone: true,
  exportAs: 'tab',
  host: {
    type: 'button',
    role: 'tab',
    '[id]': 'triggerId()',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-controls]': 'panelId()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'isSelected() ? 0 : -1',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-orientation]': 'context.orientationSignal()',
    '[attr.data-value]': 'value()',
    '[class.base-ui-tab]': 'true',
    '[class.base-ui-tab-selected]': 'isSelected()',
    '[class.base-ui-tab-disabled]': 'isDisabled()',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class TabsTabDirective {
  protected readonly context = inject(TABS_CONTEXT);

  /**
   * The value that identifies this tab.
   * Must match a corresponding panel's value.
   */
  readonly value = input.required<TabValue>();

  /**
   * Whether this tab is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Computed trigger ID.
   */
  readonly triggerId = computed(() => this.context.getTriggerId(this.value()));

  /**
   * Computed panel ID.
   */
  readonly panelId = computed(() => this.context.getPanelId(this.value()));

  /**
   * Whether this tab is selected.
   */
  readonly isSelected = computed(() => {
    return this.context.valueSignal() === this.value();
  });

  /**
   * Whether this tab is disabled.
   */
  readonly isDisabled = computed(() => {
    return this.disabled() || this.context.disabledSignal();
  });

  /**
   * Handle click events.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    this.context.selectTab(this.value());
  }

  /**
   * Handle keyboard events.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    // Enter and Space activate the tab
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.context.selectTab(this.value());
    }
  }
}

/**
 * @fileoverview Angular port of Base UI TabsIndicator
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/indicator/TabsIndicator.tsx
 *
 * A visual indicator that tracks the active tab position.
 */

import {
  afterNextRender,
  computed,
  Directive,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { TABS_CONTEXT } from './tabs.types';

/**
 * Indicator directive for tabs.
 * A visual element that tracks the active tab's position.
 *
 * @example
 * ```html
 * <div baseUiTabsList>
 *   <button baseUiTab value="tab1">Tab 1</button>
 *   <button baseUiTab value="tab2">Tab 2</button>
 *   <span baseUiTabsIndicator></span>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiTabsIndicator]',
  standalone: true,
  exportAs: 'tabsIndicator',
  host: {
    '[attr.data-orientation]': 'context.orientationSignal()',
    '[attr.data-activation-direction]': 'context.activationDirectionSignal()',
    '[class.base-ui-tabs-indicator]': 'true',
    '[style.--indicator-left.px]': 'indicatorStyle().left',
    '[style.--indicator-top.px]': 'indicatorStyle().top',
    '[style.--indicator-width.px]': 'indicatorStyle().width',
    '[style.--indicator-height.px]': 'indicatorStyle().height',
    '[style.display]': 'isReady() ? null : "none"',
  },
})
export class TabsIndicatorDirective {
  protected readonly context = inject(TABS_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Whether the indicator position has been calculated */
  private readonly isReady = signal(false);

  /** Indicator position and size */
  private readonly position = signal({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  /** Computed indicator style */
  readonly indicatorStyle = computed(() => this.position());

  constructor() {
    afterNextRender(() => {
      this.updatePosition();
    });
  }

  /**
   * Update indicator position based on active tab.
   */
  private updatePosition(): void {
    const value = this.context.valueSignal();
    if (value === undefined) {
      this.isReady.set(false);
      return;
    }

    // Find the tabs list element
    const tabsList = this.elementRef.nativeElement.closest('[baseUiTabsList]');
    if (!tabsList) {
      this.isReady.set(false);
      return;
    }

    // Find the active tab
    const activeTab = tabsList.querySelector(
      `[baseUiTab][data-value="${value}"]`
    ) as HTMLElement;
    if (!activeTab) {
      this.isReady.set(false);
      return;
    }

    const tabRect = activeTab.getBoundingClientRect();
    const listRect = tabsList.getBoundingClientRect();

    this.position.set({
      left: tabRect.left - listRect.left,
      top: tabRect.top - listRect.top,
      width: tabRect.width,
      height: tabRect.height,
    });

    this.isReady.set(true);
  }
}

/**
 * @fileoverview Angular port of Base UI TabsList
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/tabs/list/TabsList.tsx
 *
 * A container for tab triggers with keyboard navigation.
 */

import {
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  TABS_CONTEXT,
  TABS_LIST_CONTEXT,
  type TabsListContext,
  type TabValue,
} from './tabs.types';

/**
 * List directive for tabs.
 * Contains the tab triggers with keyboard navigation support.
 *
 * @example
 * ```html
 * <div baseUiTabsList>
 *   <button baseUiTab value="tab1">Tab 1</button>
 *   <button baseUiTab value="tab2">Tab 2</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiTabsList]',
  standalone: true,
  exportAs: 'tabsList',
  host: {
    role: 'tablist',
    '[attr.aria-orientation]':
      'context.orientationSignal() === "vertical" ? "vertical" : null',
    '[attr.data-orientation]': 'context.orientationSignal()',
    '[class.base-ui-tabs-list]': 'true',
    '[class.base-ui-tabs-list-horizontal]':
      'context.orientationSignal() === "horizontal"',
    '[class.base-ui-tabs-list-vertical]':
      'context.orientationSignal() === "vertical"',
    '(keydown)': 'handleKeyDown($event)',
  },
  providers: [
    {
      provide: TABS_LIST_CONTEXT,
      useFactory: (directive: TabsListDirective) => directive.listContext,
      deps: [TabsListDirective],
    },
  ],
})
export class TabsListDirective {
  protected readonly context = inject(TABS_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Whether to activate tabs on focus (arrow key navigation).
   * If false, tabs are only activated on click/Enter/Space.
   */
  readonly activateOnFocus = input(false, { transform: booleanAttribute });

  /**
   * Whether keyboard focus should loop from last to first tab and vice versa.
   */
  readonly loopFocus = input(true, { transform: booleanAttribute });

  /** Currently highlighted tab index */
  private readonly highlightedIndex = signal(0);

  /**
   * Get tab elements (not a computed since it needs fresh DOM state).
   */
  private getTabElements(): HTMLElement[] {
    const element = this.elementRef.nativeElement;
    const allTabs = element.querySelectorAll('[baseUiTab]');
    return Array.from(allTabs as NodeListOf<HTMLElement>).filter(
      (tab: HTMLElement) => !tab.hasAttribute('disabled')
    );
  }

  /** Context provided to tab children */
  readonly listContext: TabsListContext = {
    activateOnFocus: this.activateOnFocus(),
    highlightedTabIndex: this.highlightedIndex(),
    setHighlightedTabIndex: (index: number) => this.highlightedIndex.set(index),
    tabsListElement: this.elementRef.nativeElement,
    value: this.context.valueSignal(),
    onTabActivation: (value: TabValue) => this.context.selectTab(value),
  };

  /**
   * Handle keyboard navigation.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    const tabs = this.getTabElements();
    if (tabs.length === 0) return;

    const isHorizontal = this.context.orientationSignal() === 'horizontal';

    // Get current index from the actually focused element
    const focusedElement = document.activeElement as HTMLElement;
    let currentIndex = tabs.indexOf(focusedElement);
    if (currentIndex < 0) {
      currentIndex = this.highlightedIndex();
    }

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, tabs.length, 1);
        }
        break;

      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, tabs.length, -1);
        }
        break;

      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, tabs.length, 1);
        }
        break;

      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, tabs.length, -1);
        }
        break;

      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    if (newIndex !== currentIndex) {
      this.highlightedIndex.set(newIndex);
      const tab = tabs[newIndex];
      tab?.focus();

      // If activateOnFocus is enabled, activate the tab
      if (this.activateOnFocus()) {
        const value = tab?.getAttribute('data-value');
        if (value !== null && value !== undefined) {
          this.context.selectTab(value);
        }
      }
    }
  }

  /**
   * Get the next index with optional looping.
   */
  private getNextIndex(
    current: number,
    total: number,
    direction: 1 | -1
  ): number {
    const next = current + direction;

    if (this.loopFocus()) {
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    }

    return Math.max(0, Math.min(total - 1, next));
  }
}

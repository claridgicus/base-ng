/**
 * @fileoverview Angular port of Base UI Toolbar Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toolbar/root/ToolbarRoot.tsx
 */

import {
  Directive,
  Input,
  computed,
  inject,
  signal,
  booleanAttribute,
  type Signal,
} from '@angular/core';
import {
  TOOLBAR_ROOT_CONTEXT,
  type ToolbarRootContext,
} from './toolbar.types';
import type { Orientation } from '../types';

let toolbarIdCounter = 0;

/**
 * Toolbar Root directive.
 * A container for grouping a set of controls, such as buttons, toggle groups, or menus.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiToolbarRoot>
 *   <button baseUiToolbarButton>Bold</button>
 *   <button baseUiToolbarButton>Italic</button>
 *   <div baseUiToolbarSeparator></div>
 *   <button baseUiToolbarButton>Link</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToolbarRoot]',
  standalone: true,
  exportAs: 'toolbarRoot',
  host: {
    role: 'toolbar',
    '[attr.aria-orientation]': '_orientation()',
    '[attr.aria-disabled]': '_disabled() ? "true" : null',
    '[attr.data-orientation]': '_orientation()',
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[class.base-ui-toolbar-root]': 'true',
    '[class.base-ui-toolbar-root-horizontal]': '_orientation() === "horizontal"',
    '[class.base-ui-toolbar-root-vertical]': '_orientation() === "vertical"',
    '[class.base-ui-toolbar-root-disabled]': '_disabled()',
    '(keydown)': 'handleKeydown($event)',
  },
  providers: [
    {
      provide: TOOLBAR_ROOT_CONTEXT,
      useFactory: () => {
        const directive = inject(ToolbarRootDirective);
        return directive.context;
      },
    },
  ],
})
export class ToolbarRootDirective {
  private readonly rootId = `base-ui-toolbar-${toolbarIdCounter++}`;

  /** Internal signal for disabled state */
  readonly _disabled = signal<boolean>(false);

  /** Internal signal for orientation state */
  readonly _orientation = signal<Orientation>('horizontal');

  /** Internal signal for loop state */
  private readonly _loop = signal<boolean>(true);

  /**
   * Whether the toolbar is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * The orientation of the toolbar.
   */
  @Input()
  set orientation(value: Orientation) {
    this._orientation.set(value);
  }
  get orientation(): Orientation {
    return this._orientation();
  }

  /**
   * Whether to loop focus when navigating with keyboard.
   */
  @Input({ transform: booleanAttribute })
  set loop(value: boolean) {
    this._loop.set(value);
  }
  get loop(): boolean {
    return this._loop();
  }

  /** Registered toolbar items for keyboard navigation */
  private registeredItems: HTMLElement[] = [];

  /** Currently focused index */
  private focusedIndex = signal(-1);

  /**
   * The context provided to child components.
   */
  readonly context: ToolbarRootContext;

  constructor() {
    const self = this;

    this.context = {
      get disabled() {
        return self._disabled();
      },
      get orientation() {
        return self._orientation();
      },
      disabledSignal: this._disabled,
      orientationSignal: this._orientation,
      rootId: this.rootId,
    };
  }

  /**
   * Handle keydown events for keyboard navigation.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this._disabled()) return;

    const isHorizontal = this._orientation() === 'horizontal';
    const items = this.getToolbarItems();

    if (items.length === 0) return;

    const currentIndex = items.findIndex(
      (item) => item === document.activeElement,
    );

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, items.length, 1);
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, items.length, -1);
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, items.length, 1);
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextIndex(currentIndex, items.length, -1);
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
    }

    if (newIndex !== currentIndex && items[newIndex]) {
      items[newIndex].focus();
      this.focusedIndex.set(newIndex);
    }
  }

  /**
   * Get the next index for keyboard navigation.
   */
  private getNextIndex(
    currentIndex: number,
    length: number,
    direction: 1 | -1,
  ): number {
    if (currentIndex === -1) {
      return direction === 1 ? 0 : length - 1;
    }

    let newIndex = currentIndex + direction;

    if (this._loop()) {
      if (newIndex < 0) {
        newIndex = length - 1;
      } else if (newIndex >= length) {
        newIndex = 0;
      }
    } else {
      newIndex = Math.max(0, Math.min(newIndex, length - 1));
    }

    return newIndex;
  }

  /**
   * Get all focusable toolbar items.
   */
  private getToolbarItems(): HTMLElement[] {
    // Query for toolbar buttons, links, and inputs
    const selector =
      '[baseUiToolbarButton]:not([disabled]), [baseUiToolbarLink], [baseUiToolbarInput]:not([disabled])';
    const nativeElement = document.querySelector(
      `[data-toolbar-id="${this.rootId}"]`,
    );

    if (!nativeElement) {
      // Fallback to querying from the current element context
      const items = Array.from(
        document.querySelectorAll(
          `.base-ui-toolbar-root [baseUiToolbarButton]:not([disabled]), .base-ui-toolbar-root [baseUiToolbarLink], .base-ui-toolbar-root [baseUiToolbarInput]:not([disabled])`,
        ),
      ) as HTMLElement[];
      return items;
    }

    return Array.from(nativeElement.querySelectorAll(selector)) as HTMLElement[];
  }
}

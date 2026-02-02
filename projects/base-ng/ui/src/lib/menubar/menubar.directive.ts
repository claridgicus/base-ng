/**
 * @fileoverview Angular port of Base UI Menubar
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menubar/Menubar.tsx
 *
 * A horizontal or vertical bar containing menu triggers.
 */

import {
  Directive,
  computed,
  inject,
  input,
  signal,
  booleanAttribute,
  type Signal,
} from '@angular/core';
import {
  MENUBAR_CONTEXT,
  type MenubarContext,
  type MenubarOrientation,
} from './menubar.types';

let menubarIdCounter = 0;

/**
 * Menubar directive for creating menu bars.
 * A container for menu triggers that supports keyboard navigation.
 *
 * @example
 * ```html
 * <div baseUiMenubar>
 *   <div baseUiMenuRoot>
 *     <button baseUiMenuTrigger>File</button>
 *     <div baseUiMenuPositioner>
 *       <div baseUiMenuPopup>
 *         <div baseUiMenuItem>New</div>
 *         <div baseUiMenuItem>Open</div>
 *       </div>
 *     </div>
 *   </div>
 *   <div baseUiMenuRoot>
 *     <button baseUiMenuTrigger>Edit</button>
 *     ...
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMenubar]',
  standalone: true,
  exportAs: 'menubar',
  host: {
    role: 'menubar',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class.base-ui-menubar]': 'true',
    '[class.base-ui-menubar-horizontal]': 'orientation() === "horizontal"',
    '[class.base-ui-menubar-vertical]': 'orientation() === "vertical"',
    '[class.base-ui-menubar-disabled]': 'disabled()',
    '(keydown)': 'handleKeydown($event)',
  },
  providers: [
    {
      provide: MENUBAR_CONTEXT,
      useFactory: () => {
        const directive = inject(MenubarDirective);
        return directive.context;
      },
    },
  ],
})
export class MenubarDirective {
  private readonly rootId = `base-ui-menubar-${menubarIdCounter++}`;

  /**
   * The orientation of the menubar.
   */
  readonly orientation = input<MenubarOrientation>('horizontal');

  /**
   * Whether the menubar is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether to loop focus when navigating with keyboard.
   */
  readonly loop = input(true, { transform: booleanAttribute });

  /** Whether any menu is open */
  private hasOpenMenu = signal(false);

  /** Currently active menu ID */
  private activeMenuId = signal<string | null>(null);

  /** Registered menu IDs in order */
  private registeredMenus: string[] = [];

  /**
   * The context provided to child components.
   * Uses getters to read directly from input signals, avoiding effect() sync issues.
   */
  readonly context: MenubarContext;

  constructor() {
    // Create context with getters that read from signals
    // This avoids the need for effects and prevents NG0100 errors
    const self = this;
    this.context = {
      get hasOpenMenu() {
        return self.hasOpenMenu();
      },
      set hasOpenMenu(_: boolean) {
        // Setter is a no-op, use setHasOpenMenu instead
      },
      get orientation() {
        return self.orientation();
      },
      set orientation(_: MenubarOrientation) {
        // Setter is a no-op, read from input signal
      },
      get disabled() {
        return self.disabled();
      },
      set disabled(_: boolean) {
        // Setter is a no-op, read from input signal
      },
      hasOpenMenuSignal: this.hasOpenMenu.asReadonly(),
      orientationSignal: this.orientation as Signal<MenubarOrientation>,
      disabledSignal: computed(() => this.disabled()) as Signal<boolean>,
      setHasOpenMenu: (hasOpen) => {
        this.hasOpenMenu.set(hasOpen);
      },
      get activeMenuId() {
        return self.activeMenuId();
      },
      set activeMenuId(_: string | null) {
        // Setter is a no-op, use setActiveMenuId instead
      },
      activeMenuIdSignal: this.activeMenuId.asReadonly(),
      setActiveMenuId: (id) => {
        this.activeMenuId.set(id);
      },
      rootId: this.rootId,
      registerMenu: (id) => {
        if (!this.registeredMenus.includes(id)) {
          this.registeredMenus.push(id);
        }
      },
      unregisterMenu: (id) => {
        const index = this.registeredMenus.indexOf(id);
        if (index !== -1) {
          this.registeredMenus.splice(index, 1);
        }
      },
      navigateToNextMenu: () => this.navigateMenu(1),
      navigateToPreviousMenu: () => this.navigateMenu(-1),
    };
  }

  /**
   * Handle keydown events for keyboard navigation.
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const isHorizontal = this.orientation() === 'horizontal';

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          this.navigateMenu(1);
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          this.navigateMenu(-1);
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          this.navigateMenu(1);
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          this.navigateMenu(-1);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.navigateToFirst();
        break;
      case 'End':
        event.preventDefault();
        this.navigateToLast();
        break;
    }
  }

  /**
   * Navigate to next/previous menu.
   */
  private navigateMenu(direction: 1 | -1): void {
    if (this.registeredMenus.length === 0) return;

    const currentId = this.activeMenuId();
    const currentIndex = currentId ? this.registeredMenus.indexOf(currentId) : -1;

    let newIndex: number;
    if (currentIndex === -1) {
      newIndex = direction === 1 ? 0 : this.registeredMenus.length - 1;
    } else {
      newIndex = currentIndex + direction;

      if (this.loop()) {
        if (newIndex < 0) {
          newIndex = this.registeredMenus.length - 1;
        } else if (newIndex >= this.registeredMenus.length) {
          newIndex = 0;
        }
      } else {
        newIndex = Math.max(0, Math.min(newIndex, this.registeredMenus.length - 1));
      }
    }

    const newId = this.registeredMenus[newIndex];
    this.context.setActiveMenuId(newId);
  }

  /**
   * Navigate to first menu.
   */
  private navigateToFirst(): void {
    if (this.registeredMenus.length > 0) {
      this.context.setActiveMenuId(this.registeredMenus[0]);
    }
  }

  /**
   * Navigate to last menu.
   */
  private navigateToLast(): void {
    if (this.registeredMenus.length > 0) {
      this.context.setActiveMenuId(this.registeredMenus[this.registeredMenus.length - 1]);
    }
  }
}

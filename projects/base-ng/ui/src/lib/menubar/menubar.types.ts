/**
 * @fileoverview Angular port of Base UI Menubar types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menubar/MenubarContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';

/**
 * Orientation of the menubar.
 */
export type MenubarOrientation = 'horizontal' | 'vertical';

/**
 * State of the menubar.
 */
export interface MenubarState {
  /** Whether any menu is open */
  hasOpenMenu: boolean;
  /** Current orientation */
  orientation: MenubarOrientation;
  /** Whether the menubar is disabled */
  disabled: boolean;
}

/**
 * Context provided by the menubar root.
 */
export interface MenubarContext extends MenubarState {
  /** Signal for open menu state */
  hasOpenMenuSignal: Signal<boolean>;
  /** Signal for orientation */
  orientationSignal: Signal<MenubarOrientation>;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Set open menu state */
  setHasOpenMenu: (hasOpen: boolean) => void;
  /** Currently active menu ID */
  activeMenuId: string | null;
  /** Active menu ID signal */
  activeMenuIdSignal: Signal<string | null>;
  /** Set active menu ID */
  setActiveMenuId: (id: string | null) => void;
  /** Root ID */
  rootId: string;
  /** Register menu */
  registerMenu: (id: string) => void;
  /** Unregister menu */
  unregisterMenu: (id: string) => void;
  /** Navigate to next menu */
  navigateToNextMenu: () => void;
  /** Navigate to previous menu */
  navigateToPreviousMenu: () => void;
}

/**
 * Injection token for menubar context.
 */
export const MENUBAR_CONTEXT = new InjectionToken<MenubarContext>('MENUBAR_CONTEXT');

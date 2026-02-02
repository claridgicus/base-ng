/**
 * @fileoverview Angular port of Base UI Toolbar types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toolbar/root/ToolbarRootContext.ts
 */

import { InjectionToken, type Signal } from '@angular/core';
import type { Orientation } from '../types';

/**
 * State of the toolbar.
 */
export interface ToolbarState {
  /** Whether the toolbar is disabled */
  disabled: boolean;
  /** Orientation of the toolbar */
  orientation: Orientation;
}

/**
 * Context provided by the toolbar root.
 */
export interface ToolbarRootContext extends ToolbarState {
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
  /** Signal for orientation */
  orientationSignal: Signal<Orientation>;
  /** Root ID for generating unique IDs */
  rootId: string;
}

/**
 * Context for toolbar group.
 */
export interface ToolbarGroupContext {
  /** Whether the group is disabled */
  disabled: boolean;
  /** Signal for disabled state */
  disabledSignal: Signal<boolean>;
}

/**
 * State of toolbar button.
 */
export interface ToolbarButtonState extends ToolbarState {
  /** Whether the button is disabled */
  disabled: boolean;
  /** Whether the button is focusable when disabled */
  focusable: boolean;
}

/**
 * Injection token for toolbar root context.
 */
export const TOOLBAR_ROOT_CONTEXT = new InjectionToken<ToolbarRootContext>('TOOLBAR_ROOT_CONTEXT');

/**
 * Injection token for toolbar group context.
 */
export const TOOLBAR_GROUP_CONTEXT = new InjectionToken<ToolbarGroupContext>(
  'TOOLBAR_GROUP_CONTEXT',
);

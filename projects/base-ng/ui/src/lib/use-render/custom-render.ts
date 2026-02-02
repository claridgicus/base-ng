/**
 * @fileoverview Angular port of Base UI custom render patterns
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/use-render/useRender.ts
 *
 * This module provides utilities for implementing render prop patterns in Angular
 * using ng-template and TemplateRef.
 */

import { InjectionToken, TemplateRef, type Type } from '@angular/core';

/**
 * Context passed to render templates.
 */
export interface RenderContext<State extends Record<string, unknown>> {
  /**
   * The current component state.
   */
  $implicit: State;

  /**
   * The current component state (alias for $implicit).
   */
  state: State;

  /**
   * Data attributes computed from state.
   */
  dataAttributes: Record<string, string>;
}

/**
 * Type for a custom render function in Angular.
 * Returns either a TemplateRef or a component type.
 */
export type CustomRenderFn<State extends Record<string, unknown>> =
  | TemplateRef<RenderContext<State>>
  | Type<unknown>;

/**
 * Configuration for custom rendering.
 */
export interface CustomRenderConfig<State extends Record<string, unknown>> {
  /**
   * The template or component to render.
   */
  render?: CustomRenderFn<State>;

  /**
   * Whether rendering is enabled.
   */
  enabled?: boolean;

  /**
   * The component state.
   */
  state: State;

  /**
   * Additional context to pass to the template.
   */
  context?: Record<string, unknown>;
}

/**
 * Injection token for providing custom render functions.
 */
export const CUSTOM_RENDER = new InjectionToken<CustomRenderFn<Record<string, unknown>>>(
  'BaseUI Custom Render',
);

/**
 * Creates a render context object for use with ng-template.
 *
 * @param state - The component state
 * @param dataAttributes - Pre-computed data attributes
 * @param additionalContext - Additional context properties
 * @returns The render context object
 */
export function createRenderContext<State extends Record<string, unknown>>(
  state: State,
  dataAttributes: Record<string, string>,
  additionalContext?: Record<string, unknown>,
): RenderContext<State> & Record<string, unknown> {
  return {
    $implicit: state,
    state,
    dataAttributes,
    ...additionalContext,
  };
}

/**
 * Type guard to check if a value is a TemplateRef.
 */
export function isTemplateRef<T>(value: unknown): value is TemplateRef<T> {
  return value instanceof TemplateRef;
}

/**
 * Type guard to check if a value is a component type.
 */
export function isComponentType(value: unknown): value is Type<unknown> {
  return typeof value === 'function' && value.prototype !== undefined;
}

/**
 * @fileoverview Angular port of Base UI use-render functionality
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/use-render/useRender.ts
 *
 * In Angular, the React `useRender` hook patterns are achieved through:
 * - Directives for element rendering behavior
 * - Signal-based state management
 * - HostBinding for dynamic attributes
 * - ng-template and TemplateRef for render prop patterns
 */

import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  type Signal,
} from '@angular/core';
import {
  getStateAttributes,
  type StateAttributesMapping,
} from '../utils/get-state-attributes';

/**
 * Configuration for the render element directive.
 */
export interface RenderElementConfig<State extends Record<string, unknown>> {
  /**
   * The component state to convert to data attributes.
   */
  state: State | Signal<State>;

  /**
   * Optional custom mapping for specific state properties.
   */
  stateAttributesMapping?: StateAttributesMapping<State>;

  /**
   * Additional CSS classes to add.
   */
  className?: string | Signal<string | undefined>;

  /**
   * Additional styles to apply.
   */
  style?: Partial<CSSStyleDeclaration> | Signal<Partial<CSSStyleDeclaration> | undefined>;
}

/**
 * Directive that applies Base UI state attributes to an element.
 * This is the Angular equivalent of the React useRender hook's attribute application.
 *
 * @example
 * ```html
 * <button [baseUiState]="buttonState" [stateMapping]="customMapping">
 *   Click me
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiState]',
  standalone: true,
})
export class RenderElementDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  /**
   * The state object to convert to data attributes.
   */
  readonly state = input.required<Record<string, unknown>>({ alias: 'baseUiState' });

  /**
   * Optional custom mapping for state to attributes.
   */
  readonly stateMapping = input<StateAttributesMapping<Record<string, unknown>>>();

  /**
   * Computed data attributes from state.
   */
  readonly dataAttributes = computed(() => {
    const state = this.state();
    const mapping = this.stateMapping();
    return getStateAttributes(state, mapping);
  });

  constructor() {
    // Effect to apply data attributes when state changes
    effect(() => {
      const attributes = this.dataAttributes();
      const element = this.elementRef.nativeElement;

      // Remove old data attributes (that start with 'data-')
      const existingAttrs = Array.from(element.attributes) as Attr[];
      for (const attr of existingAttrs) {
        if (attr.name.startsWith('data-') && !(attr.name in attributes)) {
          this.renderer.removeAttribute(element, attr.name);
        }
      }

      // Apply new data attributes
      for (const [key, value] of Object.entries(attributes)) {
        this.renderer.setAttribute(element, key, value);
      }
    });
  }
}

/**
 * Utility function to compute state attributes.
 * Can be used in components that need more control over attribute application.
 *
 * @param state - The state object
 * @param mapping - Optional custom mapping
 * @returns Record of attribute name to value
 */
export function computeStateAttributes<State extends Record<string, unknown>>(
  state: State,
  mapping?: StateAttributesMapping<State>,
): Record<string, string> {
  return getStateAttributes(state, mapping);
}

/**
 * Utility function to apply state attributes to an element.
 * Useful for programmatic attribute management.
 *
 * @param element - The target HTML element
 * @param state - The state object
 * @param mapping - Optional custom mapping
 * @param renderer - Angular Renderer2 instance
 */
export function applyStateAttributes<State extends Record<string, unknown>>(
  element: HTMLElement,
  state: State,
  mapping?: StateAttributesMapping<State>,
  renderer?: Renderer2,
): void {
  const attributes = getStateAttributes(state, mapping);

  for (const [key, value] of Object.entries(attributes)) {
    if (renderer) {
      renderer.setAttribute(element, key, value);
    } else {
      element.setAttribute(key, value);
    }
  }
}

/**
 * Utility function to remove state attributes from an element.
 *
 * @param element - The target HTML element
 * @param state - The state object (to know which attributes to remove)
 * @param mapping - Optional custom mapping
 * @param renderer - Angular Renderer2 instance
 */
export function removeStateAttributes<State extends Record<string, unknown>>(
  element: HTMLElement,
  state: State,
  mapping?: StateAttributesMapping<State>,
  renderer?: Renderer2,
): void {
  const attributes = getStateAttributes(state, mapping);

  for (const key of Object.keys(attributes)) {
    if (renderer) {
      renderer.removeAttribute(element, key);
    } else {
      element.removeAttribute(key);
    }
  }
}

/**
 * @fileoverview Angular port of Base UI style resolution utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/resolveStyle.ts
 */

/**
 * CSS style properties type (Angular equivalent of React.CSSProperties)
 */
export type CSSStyleProperties = Partial<CSSStyleDeclaration> & Record<string, string | number | undefined>;

/**
 * Resolves a style that can be either an object or a function that returns a style object.
 *
 * @param style - A style object or a function that returns a style object based on state
 * @param state - The current state to pass to the style function
 * @returns The resolved style object
 */
export function resolveStyle<State>(
  style: CSSStyleProperties | ((state: State) => CSSStyleProperties | undefined) | undefined,
  state: State,
): CSSStyleProperties | undefined {
  return typeof style === 'function' ? style(state) : style;
}

/**
 * @fileoverview Angular port of Base UI class name resolution utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/resolveClassName.ts
 */

/**
 * Resolves a className that can be either a string or a function that returns a string.
 *
 * @param className - A string className or a function that returns a className based on state
 * @param state - The current state to pass to the className function
 * @returns The resolved className string
 */
export function resolveClassName<State>(
  className: string | ((state: State) => string | undefined) | undefined,
  state: State,
): string | undefined {
  return typeof className === 'function' ? className(state) : className;
}

/**
 * @fileoverview Angular port of Base UI state attributes utilities
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/getStateAttributesProps.ts
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/stateAttributesMapping.ts
 */

/**
 * Mapping type for converting state properties to data attributes.
 */
export type StateAttributesMapping<State> = {
  [Property in keyof State]?: (state: State[Property]) => Record<string, string> | null;
};

/**
 * Converts component state into HTML data attributes.
 *
 * @param state - The component state object
 * @param customMapping - Optional custom mapping for specific state properties
 * @returns An object containing data attributes
 */
export function getStateAttributes<State extends Record<string, unknown>>(
  state: State,
  customMapping?: StateAttributesMapping<State>,
): Record<string, string> {
  const props: Record<string, string> = {};

  for (const key in state) {
    const value = state[key];

    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key]!(value);
      if (customProps != null) {
        Object.assign(props, customProps);
      }

      continue;
    }

    if (value === true) {
      props[`data-${key.toLowerCase()}`] = '';
    } else if (value) {
      props[`data-${key.toLowerCase()}`] = String(value);
    }
  }

  return props;
}

/**
 * Transition status values
 */
export type TransitionStatus = 'starting' | 'ending' | undefined;

/**
 * Data attributes for transition status.
 */
export enum TransitionStatusDataAttributes {
  /**
   * Present when the component is animating in.
   */
  startingStyle = 'data-starting-style',
  /**
   * Present when the component is animating out.
   */
  endingStyle = 'data-ending-style',
}

const STARTING_HOOK: Record<string, string> = { [TransitionStatusDataAttributes.startingStyle]: '' };
const ENDING_HOOK: Record<string, string> = { [TransitionStatusDataAttributes.endingStyle]: '' };

/**
 * Mapping for transition status to data attributes.
 */
export const transitionStatusMapping: StateAttributesMapping<{ transitionStatus: TransitionStatus }> = {
  transitionStatus(value): Record<string, string> | null {
    if (value === 'starting') {
      return STARTING_HOOK;
    }
    if (value === 'ending') {
      return ENDING_HOOK;
    }
    return null;
  },
};

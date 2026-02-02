/**
 * @fileoverview Angular port of Base UI merge-props utility
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/merge-props/mergeProps.ts
 */

/**
 * Symbol used to mark an event as having its Base UI handler prevented.
 */
const BASE_UI_HANDLER_PREVENTED = Symbol('baseUIHandlerPrevented');

/**
 * Extended event type that can be marked as prevented.
 */
export interface PreventableEvent extends Event {
  [BASE_UI_HANDLER_PREVENTED]?: boolean;
  preventBaseUIHandler?: () => void;
  baseUIHandlerPrevented?: boolean;
}

/**
 * Props type that can be either an object or a function that returns props.
 */
export type MergeableProps<T extends Record<string, unknown> = Record<string, unknown>> =
  | T
  | ((mergedProps: T) => T)
  | undefined
  | null;

/**
 * Checks if a property name is an event handler (starts with 'on' followed by uppercase letter).
 * Uses character code comparison for performance.
 */
function isEventHandler(key: string): boolean {
  if (key.length < 3) {
    return false;
  }
  const firstChar = key.charCodeAt(0);
  const secondChar = key.charCodeAt(1);
  const thirdChar = key.charCodeAt(2);

  // 'o' = 111, 'n' = 110, uppercase letters = 65-90
  return firstChar === 111 && secondChar === 110 && thirdChar >= 65 && thirdChar <= 90;
}

/**
 * Makes an event preventable by adding the preventBaseUIHandler method.
 */
function makeEventPreventable<T extends Event>(event: T): T & PreventableEvent {
  const preventableEvent = event as T & PreventableEvent;

  if (!preventableEvent.preventBaseUIHandler) {
    preventableEvent.preventBaseUIHandler = () => {
      preventableEvent[BASE_UI_HANDLER_PREVENTED] = true;
    };

    Object.defineProperty(preventableEvent, 'baseUIHandlerPrevented', {
      get() {
        return preventableEvent[BASE_UI_HANDLER_PREVENTED] === true;
      },
      configurable: true,
    });
  }

  return preventableEvent;
}

/**
 * Merges multiple event handlers into a single handler.
 * Handlers are called in reverse order (rightmost first).
 */
function mergeEventHandlers<T extends Event>(
  ...handlers: Array<((event: T) => void) | undefined | null>
): (event: T) => void {
  return (event: T) => {
    const preventableEvent = makeEventPreventable(event);

    // Call handlers in reverse order (right to left)
    for (let i = handlers.length - 1; i >= 0; i--) {
      const handler = handlers[i];
      if (handler && !preventableEvent[BASE_UI_HANDLER_PREVENTED]) {
        handler(preventableEvent);
      }
    }
  };
}

/**
 * Merges two prop objects into the target (mutates target).
 */
function mutablyMergeInto<T extends Record<string, unknown>>(
  target: T,
  source: T | undefined | null,
): T {
  if (!source) {
    return target;
  }

  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      continue;
    }

    const sourceValue = source[key];
    const targetValue = target[key];

    // Skip undefined values
    if (sourceValue === undefined) {
      continue;
    }

    // Handle event handlers
    if (isEventHandler(key)) {
      if (typeof targetValue === 'function' || typeof sourceValue === 'function') {
        (target as Record<string, unknown>)[key] = mergeEventHandlers(
          targetValue as ((event: Event) => void) | undefined,
          sourceValue as ((event: Event) => void) | undefined,
        );
        continue;
      }
    }

    // Handle className concatenation
    if (key === 'className' || key === 'class') {
      const targetClass = targetValue as string | undefined;
      const sourceClass = sourceValue as string | undefined;

      if (targetClass && sourceClass) {
        (target as Record<string, unknown>)[key] = `${sourceClass} ${targetClass}`;
      } else {
        (target as Record<string, unknown>)[key] = sourceClass || targetClass;
      }
      continue;
    }

    // Handle style merging
    if (key === 'style') {
      const targetStyle = targetValue as Record<string, unknown> | undefined;
      const sourceStyle = sourceValue as Record<string, unknown> | undefined;

      if (targetStyle && sourceStyle) {
        (target as Record<string, unknown>)[key] = { ...targetStyle, ...sourceStyle };
      } else {
        (target as Record<string, unknown>)[key] = sourceStyle || targetStyle;
      }
      continue;
    }

    // Default: rightmost value wins
    (target as Record<string, unknown>)[key] = sourceValue;
  }

  return target;
}

/**
 * Resolves props that can be either an object or a function.
 */
function resolveProps<T extends Record<string, unknown>>(
  props: MergeableProps<T>,
  mergedProps: T,
): T | undefined | null {
  if (typeof props === 'function') {
    return props(mergedProps);
  }
  return props;
}

/**
 * Merges a single props object into the accumulator.
 */
function mergeOne<T extends Record<string, unknown>>(
  accumulated: T,
  props: MergeableProps<T>,
): T {
  const resolved = resolveProps(props, accumulated);
  return mutablyMergeInto(accumulated, resolved);
}

/**
 * Generic props type for merge operations.
 */
export type GenericProps = Record<string, unknown>;

/**
 * Merges multiple props objects.
 *
 * The rightmost object's fields overwrite the conflicting ones from others.
 * Event handlers are merged and called in right-to-left order.
 * className values are concatenated with rightmost classes appearing first.
 * style objects are merged with rightmost styles taking precedence.
 *
 * @example
 * ```ts
 * const merged = mergeProps(
 *   { onClick: handleClick1, className: 'base' },
 *   { onClick: handleClick2, className: 'override' },
 * );
 * // Result: { onClick: mergedHandler, className: 'override base' }
 * ```
 */
export function mergeProps<
  T1 extends GenericProps = GenericProps,
  T2 extends GenericProps = GenericProps,
  T3 extends GenericProps = GenericProps,
  T4 extends GenericProps = GenericProps,
  T5 extends GenericProps = GenericProps,
>(
  props1?: MergeableProps<T1> | null,
  props2?: MergeableProps<T2> | null,
  props3?: MergeableProps<T3> | null,
  props4?: MergeableProps<T4> | null,
  props5?: MergeableProps<T5> | null,
): T1 & T2 & T3 & T4 & T5 {
  let result = {} as GenericProps;

  result = mergeOne(result, props1 as MergeableProps<GenericProps>);
  result = mergeOne(result, props2 as MergeableProps<GenericProps>);
  result = mergeOne(result, props3 as MergeableProps<GenericProps>);
  result = mergeOne(result, props4 as MergeableProps<GenericProps>);
  result = mergeOne(result, props5 as MergeableProps<GenericProps>);

  return result as T1 & T2 & T3 & T4 & T5;
}

/**
 * Merges an array of props objects.
 * Has slightly lower performance than mergeProps but accepts arbitrary number of props.
 *
 * @example
 * ```ts
 * const merged = mergePropsN([props1, props2, props3, props4, props5, props6]);
 * ```
 */
export function mergePropsN<T extends GenericProps = GenericProps>(
  propsArray: Array<MergeableProps<GenericProps> | null>,
): T {
  let result = {} as GenericProps;

  for (const props of propsArray) {
    result = mergeOne(result, props);
  }

  return result as T;
}

/**
 * Utility to prevent Base UI handlers from being called on an event.
 * Can be called in an event handler to stop earlier (leftmost) handlers from executing.
 */
export function preventBaseUIHandler(event: Event): void {
  const preventableEvent = event as PreventableEvent;
  if (preventableEvent.preventBaseUIHandler) {
    preventableEvent.preventBaseUIHandler();
  } else {
    (preventableEvent as PreventableEvent)[BASE_UI_HANDLER_PREVENTED] = true;
  }
}

/**
 * Checks if Base UI handlers have been prevented on an event.
 * Useful for custom event handlers that need to check prevention status.
 */
export function isBaseUIHandlerPrevented(event: Event): boolean {
  const preventableEvent = event as PreventableEvent;
  return preventableEvent[BASE_UI_HANDLER_PREVENTED] === true;
}

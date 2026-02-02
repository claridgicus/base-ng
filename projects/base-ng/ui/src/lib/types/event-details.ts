/**
 * @fileoverview Angular port of Base UI event details types and utilities
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/createBaseUIEventDetails.ts
 */

import { EMPTY_OBJECT } from './constants';
import { REASONS } from './reasons';

/**
 * Maps reason strings to their corresponding native event types.
 */
interface ReasonToEventMap {
  [REASONS.none]: Event;

  [REASONS.triggerPress]: MouseEvent | PointerEvent | TouchEvent | KeyboardEvent;
  [REASONS.triggerHover]: MouseEvent;
  [REASONS.triggerFocus]: FocusEvent;

  [REASONS.outsidePress]: MouseEvent | PointerEvent | TouchEvent;
  [REASONS.itemPress]: MouseEvent | KeyboardEvent | PointerEvent;
  [REASONS.closePress]: MouseEvent | KeyboardEvent | PointerEvent;
  [REASONS.linkPress]: MouseEvent | PointerEvent;
  [REASONS.clearPress]: PointerEvent | MouseEvent | KeyboardEvent;
  [REASONS.chipRemovePress]: PointerEvent | MouseEvent | KeyboardEvent;
  [REASONS.trackPress]: PointerEvent | MouseEvent | TouchEvent;
  [REASONS.incrementPress]: PointerEvent | MouseEvent | TouchEvent;
  [REASONS.decrementPress]: PointerEvent | MouseEvent | TouchEvent;

  [REASONS.inputChange]: InputEvent | Event;
  [REASONS.inputClear]: InputEvent | FocusEvent | Event;
  [REASONS.inputBlur]: FocusEvent;
  [REASONS.inputPaste]: ClipboardEvent;

  [REASONS.focusOut]: FocusEvent | KeyboardEvent;
  [REASONS.escapeKey]: KeyboardEvent;
  [REASONS.listNavigation]: KeyboardEvent;
  [REASONS.keyboard]: KeyboardEvent;

  [REASONS.pointer]: PointerEvent;
  [REASONS.drag]: PointerEvent | TouchEvent;
  [REASONS.wheel]: WheelEvent;
  [REASONS.scrub]: PointerEvent;

  [REASONS.cancelOpen]: MouseEvent;
  [REASONS.siblingOpen]: Event;
  [REASONS.disabled]: Event;
  [REASONS.imperativeAction]: Event;

  [REASONS.windowResize]: UIEvent;
}

/**
 * Maps a change `reason` string to the corresponding native event type.
 */
export type ReasonToEvent<Reason extends string> = Reason extends keyof ReasonToEventMap
  ? ReasonToEventMap[Reason]
  : Event;

/**
 * Internal type for change event details.
 */
type BaseUIChangeEventDetail<Reason extends string, CustomProperties extends object> = {
  /**
   * The reason for the event.
   */
  reason: Reason;
  /**
   * The native event associated with the custom event.
   */
  event: ReasonToEvent<Reason>;
  /**
   * Cancels Base UI from handling the event.
   */
  cancel: () => void;
  /**
   * Allows the event to propagate in cases where Base UI will stop the propagation.
   */
  allowPropagation: () => void;
  /**
   * Indicates whether the event has been canceled.
   */
  isCanceled: boolean;
  /**
   * Indicates whether the event is allowed to propagate.
   */
  isPropagationAllowed: boolean;
  /**
   * The element that triggered the event, if applicable.
   */
  trigger: Element | undefined;
} & CustomProperties;

/**
 * Details of custom change events emitted by Base UI components.
 */
export type BaseUIChangeEventDetails<
  Reason extends string,
  CustomProperties extends object = object,
> = Reason extends string ? BaseUIChangeEventDetail<Reason, CustomProperties> : never;

/**
 * Internal type for generic event details.
 */
type BaseUIGenericEventDetail<Reason extends string, CustomProperties extends object> = {
  /**
   * The reason for the event.
   */
  reason: Reason;
  /**
   * The native event associated with the custom event.
   */
  event: ReasonToEvent<Reason>;
} & CustomProperties;

/**
 * Details of custom generic events emitted by Base UI components.
 */
export type BaseUIGenericEventDetails<
  Reason extends string,
  CustomProperties extends object = object,
> = Reason extends string ? BaseUIGenericEventDetail<Reason, CustomProperties> : never;

/**
 * Creates a Base UI change event details object with the given reason and utilities
 * for preventing Base UI's internal event handling.
 *
 * @param reason - The reason for the event
 * @param event - The native event that triggered this
 * @param trigger - The element that triggered the event
 * @param customProperties - Additional custom properties to include
 * @returns A BaseUIChangeEventDetails object
 */
export function createChangeEventDetails<
  Reason extends string,
  CustomProperties extends object = object,
>(
  reason: Reason,
  event?: ReasonToEvent<Reason>,
  trigger?: HTMLElement,
  customProperties?: CustomProperties,
): BaseUIChangeEventDetails<Reason, CustomProperties> {
  let canceled = false;
  let propagationAllowed = false;
  const custom = customProperties ?? (EMPTY_OBJECT as CustomProperties);
  const details: BaseUIChangeEventDetail<Reason, CustomProperties> = {
    reason,
    event: (event ?? new Event('base-ui')) as ReasonToEvent<Reason>,
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      propagationAllowed = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return propagationAllowed;
    },
    trigger,
    ...custom,
  };
  return details as BaseUIChangeEventDetails<Reason, CustomProperties>;
}

/**
 * Creates a Base UI generic event details object with the given reason.
 *
 * @param reason - The reason for the event
 * @param event - The native event that triggered this
 * @param customProperties - Additional custom properties to include
 * @returns A BaseUIGenericEventDetails object
 */
export function createGenericEventDetails<
  Reason extends string,
  CustomProperties extends object = object,
>(
  reason: Reason,
  event?: ReasonToEvent<Reason>,
  customProperties?: CustomProperties,
): BaseUIGenericEventDetails<Reason, CustomProperties> {
  const custom = customProperties ?? (EMPTY_OBJECT as CustomProperties);
  const details: BaseUIGenericEventDetail<Reason, CustomProperties> = {
    reason,
    event: (event ?? new Event('base-ui')) as ReasonToEvent<Reason>,
    ...custom,
  };
  return details as BaseUIGenericEventDetails<Reason, CustomProperties>;
}

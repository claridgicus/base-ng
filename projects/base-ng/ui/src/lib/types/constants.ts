/**
 * @fileoverview Angular port of Base UI shared constants
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/constants.ts
 */

/**
 * Empty object constant to avoid creating new object references.
 */
export const EMPTY_OBJECT: Record<string, never> = Object.freeze({}) as Record<string, never>;

/**
 * Empty array constant to avoid creating new array references.
 */
export const EMPTY_ARRAY: readonly never[] = Object.freeze([]) as readonly never[];

/**
 * Milliseconds to wait before resetting typeahead buffer.
 */
export const TYPEAHEAD_RESET_MS = 500;

/**
 * Threshold in milliseconds for detecting patient/intentional clicks.
 */
export const PATIENT_CLICK_THRESHOLD = 500;

/**
 * Style object to disable CSS transitions.
 */
export const DISABLED_TRANSITIONS_STYLE = { style: { transition: 'none' } };

/**
 * Data attribute identifier for click triggers.
 */
export const CLICK_TRIGGER_IDENTIFIER = 'data-base-ui-click-trigger';

/**
 * Collision avoidance settings for dropdown components.
 * Used for dropdowns that usually strictly prefer top/bottom placements and
 * use `var(--available-height)` to limit their height.
 */
export const DROPDOWN_COLLISION_AVOIDANCE = {
  fallbackAxisSide: 'none',
} as const;

/**
 * Collision avoidance settings for popup components.
 * Used by regular popups that usually aren't scrollable and are allowed to
 * freely flip to any axis of placement.
 */
export const POPUP_COLLISION_AVOIDANCE = {
  fallbackAxisSide: 'end',
} as const;

/**
 * Special visually hidden styles for the aria-owns owner element to ensure owned element
 * accessibility in iOS/Safari/VoiceControl.
 * The owner element is an empty span, so most of the common visually hidden styles are not needed.
 * @see https://github.com/floating-ui/floating-ui/issues/3403
 */
export const OWNER_VISUALLY_HIDDEN: Partial<CSSStyleDeclaration> = {
  clipPath: 'inset(50%)',
  position: 'fixed',
  top: '0',
  left: '0',
};

/**
 * @fileoverview Angular port of Base UI event reason constants
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/reason-parts.ts
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/reasons.ts
 */

/**
 * Event reason constants for Base UI components.
 * These are used to identify the source/type of events in the component system.
 */
export const REASONS = {
  // Base
  none: 'none',

  // Trigger events
  triggerPress: 'trigger-press',
  triggerHover: 'trigger-hover',
  triggerFocus: 'trigger-focus',

  // Press/interaction events
  outsidePress: 'outside-press',
  itemPress: 'item-press',
  closePress: 'close-press',
  linkPress: 'link-press',
  clearPress: 'clear-press',
  chipRemovePress: 'chip-remove-press',
  trackPress: 'track-press',
  incrementPress: 'increment-press',
  decrementPress: 'decrement-press',

  // Input events
  inputChange: 'input-change',
  inputClear: 'input-clear',
  inputBlur: 'input-blur',
  inputPaste: 'input-paste',

  // Navigation/keyboard events
  focusOut: 'focus-out',
  escapeKey: 'escape-key',
  listNavigation: 'list-navigation',
  keyboard: 'keyboard',

  // Pointer/motion events
  pointer: 'pointer',
  drag: 'drag',
  wheel: 'wheel',
  scrub: 'scrub',

  // State events
  cancelOpen: 'cancel-open',
  siblingOpen: 'sibling-open',
  disabled: 'disabled',
  imperativeAction: 'imperative-action',

  // Window events
  windowResize: 'window-resize',
} as const;

/**
 * Type representing all possible Base UI event reasons.
 */
export type BaseUIEventReasons = typeof REASONS;

/**
 * Union type of all individual Base UI event reason values.
 */
export type BaseUIEventReason = BaseUIEventReasons[keyof BaseUIEventReasons];

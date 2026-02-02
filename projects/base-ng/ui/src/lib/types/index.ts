/**
 * @fileoverview Angular port of Base UI shared types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/types/index.ts
 */

// Event details types and utilities
export type {
  BaseUIChangeEventDetails,
  BaseUIGenericEventDetails,
  ReasonToEvent,
} from './event-details';

export { createChangeEventDetails, createGenericEventDetails } from './event-details';

// Event reason constants and types
export { REASONS } from './reasons';
export type { BaseUIEventReason, BaseUIEventReasons } from './reasons';

// Shared constants
export {
  CLICK_TRIGGER_IDENTIFIER,
  DISABLED_TRANSITIONS_STYLE,
  DROPDOWN_COLLISION_AVOIDANCE,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  OWNER_VISUALLY_HIDDEN,
  PATIENT_CLICK_THRESHOLD,
  POPUP_COLLISION_AVOIDANCE,
  TYPEAHEAD_RESET_MS,
} from './constants';

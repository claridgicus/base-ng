/**
 * @fileoverview Angular port of Base UI Input types
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/input/Input.tsx
 */

/**
 * Input state containing validation and focus status.
 */
export interface InputState {
  disabled: boolean;
  focused: boolean;
  filled: boolean;
  invalid: boolean;
}

/**
 * Change event details for input changes.
 */
export interface InputChangeEventDetails {
  value: string;
  event: Event | InputEvent;
}

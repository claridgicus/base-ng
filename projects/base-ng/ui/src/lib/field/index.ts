/**
 * @fileoverview Angular port of Base UI Field component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/field/index.ts
 */

// Types
export {
  DEFAULT_VALIDITY_DATA,
  FIELD_CONTEXT,
  type FieldContext,
  type FieldState,
  type FieldValidationMode,
  type FieldValidityData,
} from './field.types';

// Components
export { FieldRootDirective } from './field-root.directive';
export { FieldLabelDirective } from './field-label.directive';
export { FieldControlDirective } from './field-control.directive';
export { FieldDescriptionDirective } from './field-description.directive';
export { FieldErrorDirective, type ValidityStateKey } from './field-error.directive';

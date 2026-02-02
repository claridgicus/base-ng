/**
 * @fileoverview Angular port of Base UI Select Arrow
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/arrow/SelectArrow.tsx
 */

import {
  Directive,
  computed,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';
import {
  SELECT_ROOT_CONTEXT,
  SELECT_POSITIONER_CONTEXT,
} from './select.types';

/**
 * Select Arrow directive.
 * Displays an element positioned against the select popup anchor.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiSelectPopup>
 *   <div baseUiSelectArrow></div>
 *   <div baseUiSelectList>...</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectArrow]',
  standalone: true,
  exportAs: 'selectArrow',
  host: {
    '[class.base-ui-select-arrow]': 'true',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[attr.data-uncentered]': 'uncentered() ? "" : null',
    '[style.display]': 'shouldHide() ? "none" : null',
  },
})
export class SelectArrowDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
  protected readonly positionerContext = inject(SELECT_POSITIONER_CONTEXT);

  /**
   * Whether the arrow is uncentered from the anchor.
   */
  readonly uncentered = input(false, { transform: booleanAttribute });

  /**
   * Hide when item alignment with trigger is active.
   */
  readonly shouldHide = computed(() => {
    return this.positionerContext.alignItemWithTriggerActive;
  });
}

/**
 * @fileoverview Angular port of Base UI SwitchThumb
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/switch/thumb/SwitchThumb.tsx
 *
 * The movable part of the switch that indicates whether the switch is on or off.
 */

import { Directive, inject } from '@angular/core';
import { SWITCH_CONTEXT } from './switch.types';

/**
 * Thumb directive that provides the visual toggle indicator.
 *
 * @example
 * ```html
 * <button baseUiSwitchRoot [(checked)]="isEnabled">
 *   <span baseUiSwitchThumb></span>
 * </button>
 * ```
 */
@Directive({
  selector: '[baseUiSwitchThumb]',
  standalone: true,
  exportAs: 'switchThumb',
  host: {
    '[attr.data-checked]': 'context.checked() ? "" : null',
    '[attr.data-unchecked]': '!context.checked() ? "" : null',
    '[attr.data-disabled]': 'context.disabled() ? "" : null',
    '[attr.data-readonly]': 'context.readOnly() ? "" : null',
    '[class.base-ui-switch-thumb]': 'true',
    '[class.base-ui-switch-thumb-checked]': 'context.checked()',
    '[class.base-ui-switch-thumb-unchecked]': '!context.checked()',
    '[class.base-ui-switch-thumb-disabled]': 'context.disabled()',
  },
})
export class SwitchThumbDirective {
  protected readonly context = inject(SWITCH_CONTEXT);
}

/**
 * @fileoverview Angular port of Base UI Toolbar Button
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toolbar/button/ToolbarButton.tsx
 */

import {
  Directive,
  computed,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';
import {
  TOOLBAR_ROOT_CONTEXT,
  TOOLBAR_GROUP_CONTEXT,
} from './toolbar.types';

/**
 * Toolbar Button directive.
 * A button that can be used as-is or as a trigger for other components.
 * Renders a `<button>` element.
 *
 * @example
 * ```html
 * <div baseUiToolbarRoot>
 *   <button baseUiToolbarButton>Bold</button>
 *   <button baseUiToolbarButton>Italic</button>
 *   <button baseUiToolbarButton [disabled]="true">Disabled</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToolbarButton]',
  standalone: true,
  exportAs: 'toolbarButton',
  host: {
    type: 'button',
    '[attr.disabled]': 'isDisabled() && !focusableWhenDisabled() ? "" : null',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[attr.tabindex]': 'isDisabled() && !focusableWhenDisabled() ? -1 : 0',
    '[class.base-ui-toolbar-button]': 'true',
    '[class.base-ui-toolbar-button-disabled]': 'isDisabled()',
  },
})
export class ToolbarButtonDirective {
  protected readonly rootContext = inject(TOOLBAR_ROOT_CONTEXT);
  private readonly groupContext = inject(TOOLBAR_GROUP_CONTEXT, { optional: true });

  /**
   * Whether the button is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether the button remains focusable when disabled.
   */
  readonly focusableWhenDisabled = input(true, { transform: booleanAttribute });

  /** Whether this button is disabled (combines all disabled states) */
  readonly isDisabled = computed(() => {
    return (
      this.rootContext.disabledSignal() ||
      this.groupContext?.disabledSignal() ||
      this.disabled()
    );
  });
}

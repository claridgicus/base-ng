/**
 * @fileoverview Angular port of Base UI Toolbar Input
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toolbar/input/ToolbarInput.tsx
 */

import {
  Directive,
  Input,
  computed,
  inject,
  signal,
  booleanAttribute,
} from '@angular/core';
import {
  TOOLBAR_ROOT_CONTEXT,
  TOOLBAR_GROUP_CONTEXT,
} from './toolbar.types';

/**
 * Toolbar Input directive.
 * An input element within the toolbar.
 * Renders an `<input>` element.
 *
 * @example
 * ```html
 * <div baseUiToolbarRoot>
 *   <button baseUiToolbarButton>Bold</button>
 *   <input baseUiToolbarInput type="text" placeholder="Search..." />
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToolbarInput]',
  standalone: true,
  exportAs: 'toolbarInput',
  host: {
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[class.base-ui-toolbar-input]': 'true',
    '[class.base-ui-toolbar-input-disabled]': 'isDisabled()',
  },
})
export class ToolbarInputDirective {
  protected readonly rootContext = inject(TOOLBAR_ROOT_CONTEXT);
  private readonly groupContext = inject(TOOLBAR_GROUP_CONTEXT, { optional: true });

  /** Internal signal for disabled state */
  private readonly _disabled = signal<boolean>(false);

  /**
   * Whether the input is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /** Whether this input is disabled (combines all disabled states) */
  readonly isDisabled = computed(() => {
    return (
      this.rootContext.disabledSignal() ||
      this.groupContext?.disabledSignal() ||
      this._disabled()
    );
  });
}

/**
 * @fileoverview Angular port of Base UI Toolbar Group
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/toolbar/group/ToolbarGroup.tsx
 */

import {
  Directive,
  Input,
  computed,
  inject,
  signal,
  booleanAttribute,
  type Signal,
} from '@angular/core';
import {
  TOOLBAR_ROOT_CONTEXT,
  TOOLBAR_GROUP_CONTEXT,
  type ToolbarGroupContext,
} from './toolbar.types';

/**
 * Toolbar Group directive.
 * Groups several toolbar items or toggles.
 * Renders a `<div>` element.
 *
 * @example
 * ```html
 * <div baseUiToolbarRoot>
 *   <div baseUiToolbarGroup>
 *     <button baseUiToolbarButton>Bold</button>
 *     <button baseUiToolbarButton>Italic</button>
 *   </div>
 *   <div baseUiToolbarSeparator></div>
 *   <div baseUiToolbarGroup>
 *     <button baseUiToolbarButton>Left</button>
 *     <button baseUiToolbarButton>Center</button>
 *     <button baseUiToolbarButton>Right</button>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiToolbarGroup]',
  standalone: true,
  exportAs: 'toolbarGroup',
  host: {
    role: 'group',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-orientation]': 'rootContext.orientationSignal()',
    '[class.base-ui-toolbar-group]': 'true',
    '[class.base-ui-toolbar-group-disabled]': 'isDisabled()',
  },
  providers: [
    {
      provide: TOOLBAR_GROUP_CONTEXT,
      useFactory: () => {
        const directive = inject(ToolbarGroupDirective);
        return directive.groupContext;
      },
    },
  ],
})
export class ToolbarGroupDirective {
  protected readonly rootContext = inject(TOOLBAR_ROOT_CONTEXT);

  /** Internal signal for disabled state */
  private readonly _disabled = signal<boolean>(false);

  /**
   * Whether the group is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /** Whether this group is disabled (combines root and group disabled state) */
  readonly isDisabled = computed(() => {
    return this.rootContext.disabledSignal() || this._disabled();
  });

  /**
   * The context provided to child components.
   */
  readonly groupContext: ToolbarGroupContext;

  constructor() {
    const self = this;

    this.groupContext = {
      get disabled() {
        return self.isDisabled();
      },
      disabledSignal: this.isDisabled,
    };
  }
}

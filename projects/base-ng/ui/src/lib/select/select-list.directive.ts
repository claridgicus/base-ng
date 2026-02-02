/**
 * @fileoverview Angular port of Base UI Select List
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/select/list/SelectList.tsx
 */

import {
  Directive,
  ElementRef,
  computed,
  inject,
  afterNextRender,
} from '@angular/core';
import { SELECT_ROOT_CONTEXT } from './select.types';

/**
 * Select List directive.
 * Container for select items.
 * Renders a `<div>` element with listbox role.
 *
 * @example
 * ```html
 * <div baseUiSelectPopup>
 *   <div baseUiSelectList>
 *     <div baseUiSelectItem [value]="'apple'">Apple</div>
 *     <div baseUiSelectItem [value]="'banana'">Banana</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiSelectList]',
  standalone: true,
  exportAs: 'selectList',
  host: {
    role: 'listbox',
    '[attr.id]': 'listId',
    '[attr.aria-multiselectable]': 'rootContext.multipleSignal() || undefined',
    '[class.base-ui-select-list]': 'true',
  },
})
export class SelectListDirective {
  protected readonly rootContext = inject(SELECT_ROOT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** List element ID */
  readonly listId = `${this.rootContext.rootId}-list`;

  constructor() {
    // Register list element
    afterNextRender(() => {
      this.rootContext.setListElement(this.elementRef.nativeElement);
    });
  }
}

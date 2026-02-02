/**
 * @fileoverview Angular port of Base UI Combobox Popup
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/popup/ComboboxPopup.tsx
 */

import {
  Directive,
  computed,
  inject,
  signal,
  effect,
} from '@angular/core';
import type { TransitionStatus } from '../utils';
import { COMBOBOX_ROOT_CONTEXT, COMBOBOX_POSITIONER_CONTEXT } from './combobox.types';

@Directive({
  selector: '[baseUiComboboxPopup]',
  standalone: true,
  exportAs: 'comboboxPopup',
  host: {
    '[class.base-ui-combobox-popup]': 'true',
    '[class.base-ui-combobox-popup-open]': 'rootContext.openSignal()',
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-side]': 'positionerContext.side',
    '[attr.data-align]': 'positionerContext.align',
    '[attr.data-starting-style]': 'transitionStatus() === "starting" ? "" : null',
    '[attr.data-ending-style]': 'transitionStatus() === "ending" ? "" : null',
  },
})
export class ComboboxPopupDirective {
  protected readonly rootContext = inject(COMBOBOX_ROOT_CONTEXT);
  protected readonly positionerContext = inject(COMBOBOX_POSITIONER_CONTEXT);

  private readonly transitionStatusInternal = signal<TransitionStatus>(undefined);
  readonly transitionStatus = this.transitionStatusInternal.asReadonly();

  constructor() {
    effect(() => {
      const isOpen = this.rootContext.openSignal();
      if (isOpen) {
        this.transitionStatusInternal.set('starting');
        requestAnimationFrame(() => {
          this.transitionStatusInternal.set(undefined);
        });
      } else {
        this.transitionStatusInternal.set('ending');
      }
    }, { allowSignalWrites: true });
  }
}

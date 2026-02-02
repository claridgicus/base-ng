/**
 * @fileoverview Angular port of Base UI Autocomplete Positioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/positioner/ComboboxPositioner.tsx
 */

import { Directive, computed, inject, input } from '@angular/core';
import { AUTOCOMPLETE_ROOT_CONTEXT, AUTOCOMPLETE_POSITIONER_CONTEXT } from './autocomplete.types';

export type AutocompleteSide = 'top' | 'bottom';
export type AutocompleteAlign = 'start' | 'center' | 'end';

/**
 * Autocomplete Positioner directive.
 * Positions the autocomplete popup relative to the input.
 *
 * @example
 * ```html
 * <div baseUiAutocompleteRoot>
 *   <input baseUiAutocompleteInput />
 *   <div baseUiAutocompletePositioner>
 *     <div baseUiAutocompletePopup>
 *       <!-- content -->
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAutocompletePositioner]',
  standalone: true,
  exportAs: 'autocompletePositioner',
  providers: [
    {
      provide: AUTOCOMPLETE_POSITIONER_CONTEXT,
      useFactory: (directive: AutocompletePositionerDirective) => ({
        side: directive.currentSide,
        align: directive.currentAlign,
      }),
      deps: [AutocompletePositionerDirective],
    },
  ],
  host: {
    '[attr.data-open]': 'rootContext.openSignal() ? "" : null',
    '[attr.data-side]': 'currentSide()',
    '[attr.data-align]': 'currentAlign()',
    '[style.position]': '"absolute"',
    '[style.top]': 'topStyle()',
    '[style.left]': 'leftStyle()',
    '[style.minWidth]': 'minWidthStyle()',
    '[style.display]': 'rootContext.openSignal() ? "block" : "none"',
    '[class.base-ui-autocomplete-positioner]': 'true',
  },
})
export class AutocompletePositionerDirective {
  protected readonly rootContext = inject(AUTOCOMPLETE_ROOT_CONTEXT);

  /** Preferred side for the popup */
  readonly side = input<AutocompleteSide>('bottom');

  /** Preferred alignment for the popup */
  readonly align = input<AutocompleteAlign>('start');

  /** Offset from the anchor in pixels */
  readonly sideOffset = input(4);

  /** Alignment offset in pixels */
  readonly alignOffset = input(0);

  /** Current side after positioning - computed from preferred side */
  readonly currentSide = computed<AutocompleteSide>(() => {
    // In a full implementation, this would flip based on available space
    return this.side();
  });

  /** Current alignment after positioning - computed from preferred align */
  readonly currentAlign = computed<AutocompleteAlign>(() => {
    // In a full implementation, this would adjust based on available space
    return this.align();
  });

  /** Top position style */
  readonly topStyle = computed(() => {
    const input = this.rootContext.inputElement();
    if (!input || !this.rootContext.openSignal()) {
      return '0px';
    }

    const rect = input.getBoundingClientRect();
    const offset = this.sideOffset();
    const preferredSide = this.side();

    // Simple positioning - in a real implementation, would use floating-ui
    let top: number;
    if (preferredSide === 'top') {
      top = -offset; // Will be positioned above
    } else {
      top = rect.height + offset;
    }

    return `${top}px`;
  });

  /** Left position style */
  readonly leftStyle = computed(() => {
    const input = this.rootContext.inputElement();
    if (!input || !this.rootContext.openSignal()) {
      return '0px';
    }

    const alignOffsetVal = this.alignOffset();

    // Simple positioning
    const left = alignOffsetVal;

    return `${left}px`;
  });

  /** Min width style */
  readonly minWidthStyle = computed(() => {
    const input = this.rootContext.inputElement();
    if (!input || !this.rootContext.openSignal()) {
      return 'auto';
    }

    const rect = input.getBoundingClientRect();
    return `${rect.width}px`;
  });
}

/**
 * @fileoverview Angular port of Base UI Autocomplete Positioner
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/combobox/positioner/ComboboxPositioner.tsx
 */

import { Directive, computed, inject, Input, signal } from '@angular/core';
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

  // Internal signals for inputs
  private readonly _side = signal<AutocompleteSide>('bottom');
  private readonly _align = signal<AutocompleteAlign>('start');
  private readonly _sideOffset = signal(4);
  private readonly _alignOffset = signal(0);

  /** Preferred side for the popup */
  @Input()
  get side(): AutocompleteSide {
    return this._side();
  }
  set side(value: AutocompleteSide) {
    this._side.set(value);
  }

  /** Preferred alignment for the popup */
  @Input()
  get align(): AutocompleteAlign {
    return this._align();
  }
  set align(value: AutocompleteAlign) {
    this._align.set(value);
  }

  /** Offset from the anchor in pixels */
  @Input()
  get sideOffset(): number {
    return this._sideOffset();
  }
  set sideOffset(value: number) {
    this._sideOffset.set(value);
  }

  /** Alignment offset in pixels */
  @Input()
  get alignOffset(): number {
    return this._alignOffset();
  }
  set alignOffset(value: number) {
    this._alignOffset.set(value);
  }

  /** Current side after positioning - computed from preferred side */
  readonly currentSide = computed<AutocompleteSide>(() => {
    // In a full implementation, this would flip based on available space
    return this._side();
  });

  /** Current alignment after positioning - computed from preferred align */
  readonly currentAlign = computed<AutocompleteAlign>(() => {
    // In a full implementation, this would adjust based on available space
    return this._align();
  });

  /** Top position style */
  readonly topStyle = computed(() => {
    const input = this.rootContext.inputElement();
    if (!input || !this.rootContext.openSignal()) {
      return '0px';
    }

    const rect = input.getBoundingClientRect();
    const offset = this._sideOffset();
    const preferredSide = this._side();

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

    const alignOffsetVal = this._alignOffset();

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

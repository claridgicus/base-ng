/**
 * @component BuiSeparator
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/separator/Separator.tsx
 * @reactDocs https://base-ui.com/react/components/separator
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A separator element accessible to screen readers.
 * Renders a `<div>` element with proper ARIA attributes.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  signal,
} from '@angular/core';
import type { Orientation } from '../types';

/**
 * A separator element accessible to screen readers.
 * Renders a `<div>` element with proper ARIA attributes.
 *
 * @example
 * ```html
 * <!-- Horizontal separator (default) -->
 * <base-ui-separator></base-ui-separator>
 *
 * <!-- Vertical separator -->
 * <base-ui-separator orientation="vertical"></base-ui-separator>
 *
 * <!-- With custom styling -->
 * <base-ui-separator class="my-separator"></base-ui-separator>
 * ```
 */
@Component({
  selector: 'base-ui-separator, [baseUiSeparator]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'separator',
    '[attr.aria-orientation]': '_orientation()',
    '[attr.data-orientation]': '_orientation()',
    '[class.base-ui-separator]': 'true',
    '[class.base-ui-separator-horizontal]': 'isHorizontal()',
    '[class.base-ui-separator-vertical]': 'isVertical()',
  },
})
export class SeparatorComponent {
  // Internal signal for reactive updates
  readonly _orientation = signal<Orientation>('horizontal');

  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  @Input()
  set orientation(value: Orientation) {
    this._orientation.set(value);
  }
  get orientation(): Orientation {
    return this._orientation();
  }

  /**
   * Whether the separator is horizontal.
   */
  readonly isHorizontal = computed(() => this._orientation() === 'horizontal');

  /**
   * Whether the separator is vertical.
   */
  readonly isVertical = computed(() => this._orientation() === 'vertical');
}

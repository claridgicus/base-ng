/**
 * @fileoverview Angular port of Base UI Separator component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/separator/Separator.tsx
 *
 * A separator element accessible to screen readers.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  type Signal,
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
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    '[class.base-ui-separator]': 'true',
    '[class.base-ui-separator-horizontal]': 'isHorizontal()',
    '[class.base-ui-separator-vertical]': 'isVertical()',
  },
})
export class SeparatorComponent {
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  readonly orientation = input<Orientation>('horizontal');

  /**
   * Whether the separator is horizontal.
   */
  readonly isHorizontal: Signal<boolean> = computed(() => this.orientation() === 'horizontal');

  /**
   * Whether the separator is vertical.
   */
  readonly isVertical: Signal<boolean> = computed(() => this.orientation() === 'vertical');
}

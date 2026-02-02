/**
 * @fileoverview Angular port of Base UI AccordionRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/root/AccordionRoot.tsx
 *
 * An accordion container for expandable items.
 */

import {
  booleanAttribute,
  Directive,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  ACCORDION_CONTEXT,
  AccordionChangeEventDetails,
  AccordionContext,
  AccordionOrientation,
} from './accordion.types';

/**
 * Root directive for accordion component.
 * Groups multiple accordion items together.
 *
 * @example
 * ```html
 * <div baseUiAccordionRoot [(value)]="expandedItems">
 *   <div baseUiAccordionItem value="item1">
 *     <h3 baseUiAccordionHeader>
 *       <button baseUiAccordionTrigger>Section 1</button>
 *     </h3>
 *     <div baseUiAccordionPanel>Content 1</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAccordionRoot]',
  standalone: true,
  exportAs: 'accordionRoot',
  providers: [
    {
      provide: ACCORDION_CONTEXT,
      useFactory: (directive: AccordionRootDirective): AccordionContext => ({
        value: directive.value(),
        disabled: directive.disabled(),
        orientation: directive.orientation(),
        multiple: directive.multiple(),
        valueSignal: directive.value,
        disabledSignal: directive.disabled,
        orientationSignal: directive.orientation,
        isExpanded: directive.isExpanded.bind(directive),
        toggle: directive.toggle.bind(directive),
        expand: directive.expand.bind(directive),
        collapse: directive.collapse.bind(directive),
      }),
      deps: [AccordionRootDirective],
    },
  ],
  host: {
    role: 'region',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-orientation]': 'orientation()',
    '[class.base-ui-accordion]': 'true',
    '[class.base-ui-accordion-disabled]': 'disabled()',
    '[class.base-ui-accordion-horizontal]': 'orientation() === "horizontal"',
    '[class.base-ui-accordion-vertical]': 'orientation() === "vertical"',
  },
})
export class AccordionRootDirective {
  /**
   * Array of expanded item values.
   */
  readonly value = model<string[]>([]);

  /**
   * Whether the accordion is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Accordion orientation.
   */
  readonly orientation = input<AccordionOrientation>('vertical');

  /**
   * Whether multiple items can be expanded simultaneously.
   */
  readonly multiple = input(false, { transform: booleanAttribute });

  /**
   * Event emitted when expanded items change.
   */
  readonly valueChanged = output<AccordionChangeEventDetails>();

  /**
   * Check if an item is expanded.
   */
  isExpanded(itemValue: string): boolean {
    return this.value().includes(itemValue);
  }

  /**
   * Toggle an item.
   */
  toggle(itemValue: string): void {
    if (this.disabled()) return;

    if (this.isExpanded(itemValue)) {
      this.collapse(itemValue);
    } else {
      this.expand(itemValue);
    }
  }

  /**
   * Expand an item.
   */
  expand(itemValue: string): void {
    if (this.disabled()) return;
    if (this.isExpanded(itemValue)) return;

    let newValue: string[];
    if (this.multiple()) {
      newValue = [...this.value(), itemValue];
    } else {
      newValue = [itemValue];
    }

    this.value.set(newValue);
    this.valueChanged.emit({
      value: newValue,
      changedItem: itemValue,
      action: 'expand',
    });
  }

  /**
   * Collapse an item.
   */
  collapse(itemValue: string): void {
    if (this.disabled()) return;
    if (!this.isExpanded(itemValue)) return;

    const newValue = this.value().filter(v => v !== itemValue);
    this.value.set(newValue);
    this.valueChanged.emit({
      value: newValue,
      changedItem: itemValue,
      action: 'collapse',
    });
  }
}

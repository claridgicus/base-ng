/**
 * @fileoverview Angular port of Base UI AccordionItem
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/item/AccordionItem.tsx
 *
 * An individual accordion item.
 */

import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  type Signal,
} from '@angular/core';
import {
  ACCORDION_CONTEXT,
  ACCORDION_ITEM_CONTEXT,
  AccordionItemContext,
} from './accordion.types';

let nextId = 0;

/**
 * Item directive for accordion component.
 * Groups a header and panel together.
 *
 * @example
 * ```html
 * <div baseUiAccordionItem value="item1">
 *   <h3 baseUiAccordionHeader>
 *     <button baseUiAccordionTrigger>Section 1</button>
 *   </h3>
 *   <div baseUiAccordionPanel>Content 1</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiAccordionItem]',
  standalone: true,
  exportAs: 'accordionItem',
  providers: [
    {
      provide: ACCORDION_ITEM_CONTEXT,
      useFactory: (directive: AccordionItemDirective): AccordionItemContext => ({
        value: directive.value(),
        open: directive.isOpen(),
        disabled: directive.effectiveDisabled(),
        openSignal: directive.isOpen,
        disabledSignal: directive.effectiveDisabled,
        toggle: directive.toggle.bind(directive),
        panelId: directive.panelId,
        triggerId: directive.triggerId,
      }),
      deps: [AccordionItemDirective],
    },
  ],
  host: {
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-closed]': '!isOpen() ? "" : null',
    '[attr.data-disabled]': 'effectiveDisabled() ? "" : null',
    '[class.base-ui-accordion-item]': 'true',
    '[class.base-ui-accordion-item-open]': 'isOpen()',
    '[class.base-ui-accordion-item-closed]': '!isOpen()',
    '[class.base-ui-accordion-item-disabled]': 'effectiveDisabled()',
  },
})
export class AccordionItemDirective {
  private readonly accordionContext = inject(ACCORDION_CONTEXT);

  private readonly id = nextId++;

  /**
   * Unique ID for the panel.
   */
  readonly panelId = `base-ui-accordion-panel-${this.id}`;

  /**
   * Unique ID for the trigger.
   */
  readonly triggerId = `base-ui-accordion-trigger-${this.id}`;

  /**
   * Item value/identifier.
   */
  readonly value = input.required<string>();

  /**
   * Whether this item is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Whether this item is open/expanded.
   */
  readonly isOpen: Signal<boolean> = computed(() => {
    return this.accordionContext.isExpanded(this.value());
  });

  /**
   * Effective disabled state (from accordion or item).
   */
  readonly effectiveDisabled: Signal<boolean> = computed(() => {
    return this.disabled() || this.accordionContext.disabledSignal();
  });

  /**
   * Toggle this item.
   */
  toggle(): void {
    if (this.effectiveDisabled()) return;
    this.accordionContext.toggle(this.value());
  }
}

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
  Input,
  signal,
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
        value: directive._value(),
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
   * Internal signal for item value/identifier.
   */
  readonly _value = signal<string>('');

  /**
   * Item value/identifier.
   */
  @Input({ required: true })
  set value(v: string) {
    this._value.set(v);
  }
  get value(): string {
    return this._value();
  }

  /**
   * Internal signal for disabled state.
   */
  readonly _disabled = signal<boolean>(false);

  /**
   * Whether this item is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(v: boolean) {
    this._disabled.set(v);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Whether this item is open/expanded.
   */
  readonly isOpen: Signal<boolean> = computed(() => {
    return this.accordionContext.isExpanded(this._value());
  });

  /**
   * Effective disabled state (from accordion or item).
   */
  readonly effectiveDisabled: Signal<boolean> = computed(() => {
    return this._disabled() || this.accordionContext.disabledSignal();
  });

  /**
   * Toggle this item.
   */
  toggle(): void {
    if (this.effectiveDisabled()) return;
    this.accordionContext.toggle(this._value());
  }
}

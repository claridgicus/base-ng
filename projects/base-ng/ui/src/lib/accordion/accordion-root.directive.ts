/**
 * @fileoverview Angular port of Base UI AccordionRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/accordion/root/AccordionRoot.tsx
 *
 * An accordion container for expandable items.
 */

import {
  booleanAttribute,
  Directive,
  Input,
  Output,
  EventEmitter,
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
        value: directive._value(),
        disabled: directive._disabled(),
        orientation: directive._orientation(),
        multiple: directive._multiple(),
        valueSignal: directive._value,
        disabledSignal: directive._disabled,
        orientationSignal: directive._orientation,
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
    '[attr.data-disabled]': '_disabled() ? "" : null',
    '[attr.data-orientation]': '_orientation()',
    '[class.base-ui-accordion]': 'true',
    '[class.base-ui-accordion-disabled]': '_disabled()',
    '[class.base-ui-accordion-horizontal]': '_orientation() === "horizontal"',
    '[class.base-ui-accordion-vertical]': '_orientation() === "vertical"',
  },
})
export class AccordionRootDirective {
  /**
   * Internal signal for expanded item values.
   */
  readonly _value = signal<string[]>([]);

  /**
   * Array of expanded item values.
   */
  @Input()
  set value(v: string[]) {
    this._value.set(v);
  }
  get value(): string[] {
    return this._value();
  }

  /**
   * Internal signal for disabled state.
   */
  readonly _disabled = signal<boolean>(false);

  /**
   * Whether the accordion is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(v: boolean) {
    this._disabled.set(v);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Internal signal for orientation.
   */
  readonly _orientation = signal<AccordionOrientation>('vertical');

  /**
   * Accordion orientation.
   */
  @Input()
  set orientation(v: AccordionOrientation) {
    this._orientation.set(v);
  }
  get orientation(): AccordionOrientation {
    return this._orientation();
  }

  /**
   * Internal signal for multiple mode.
   */
  readonly _multiple = signal<boolean>(false);

  /**
   * Whether multiple items can be expanded simultaneously.
   */
  @Input({ transform: booleanAttribute })
  set multiple(v: boolean) {
    this._multiple.set(v);
  }
  get multiple(): boolean {
    return this._multiple();
  }

  /**
   * Event emitted when expanded items change.
   */
  @Output() readonly valueChanged = new EventEmitter<AccordionChangeEventDetails>();

  /**
   * Event emitter for two-way binding support.
   */
  @Output() readonly valueChange = new EventEmitter<string[]>();

  /**
   * Check if an item is expanded.
   */
  isExpanded(itemValue: string): boolean {
    return this._value().includes(itemValue);
  }

  /**
   * Toggle an item.
   */
  toggle(itemValue: string): void {
    if (this._disabled()) return;

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
    if (this._disabled()) return;
    if (this.isExpanded(itemValue)) return;

    let newValue: string[];
    if (this._multiple()) {
      newValue = [...this._value(), itemValue];
    } else {
      newValue = [itemValue];
    }

    this._value.set(newValue);
    this.valueChange.emit(newValue);
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
    if (this._disabled()) return;
    if (!this.isExpanded(itemValue)) return;

    const newValue = this._value().filter(v => v !== itemValue);
    this._value.set(newValue);
    this.valueChange.emit(newValue);
    this.valueChanged.emit({
      value: newValue,
      changedItem: itemValue,
      action: 'collapse',
    });
  }
}

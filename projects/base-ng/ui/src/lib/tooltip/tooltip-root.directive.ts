/**
 * @directive TooltipRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/tooltip/root/TooltipRoot.tsx
 * @reactDocs https://base-ui.com/react/components/tooltip
 * @visualSource https://base-ui.com/react/components/tooltip
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * Groups all parts of the tooltip. Manages open state and provides context.
 */

import {
  booleanAttribute,
  Directive,
  effect,
  input,
  model,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import {
  TOOLTIP_CONTEXT,
  type TooltipContext,
  type TooltipOpenChangeEventDetails,
  type TooltipOpenChangeReason,
} from './tooltip.types';

let tooltipIdCounter = 0;

/**
 * Root directive for tooltips.
 * Groups all parts and manages open state.
 *
 * @example
 * ```html
 * <div baseUiTooltipRoot>
 *   <button baseUiTooltipTrigger>Hover me</button>
 *   <div baseUiTooltipPositioner>
 *     <div baseUiTooltipPopup>Tooltip content</div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiTooltipRoot]',
  standalone: true,
  exportAs: 'tooltipRoot',
  host: {
    '[class.base-ui-tooltip-root]': 'true',
  },
  providers: [
    {
      provide: TOOLTIP_CONTEXT,
      useFactory: (directive: TooltipRootDirective) => directive.context,
      deps: [TooltipRootDirective],
    },
  ],
})
export class TooltipRootDirective {
  /** Unique ID for the tooltip */
  readonly rootId = `base-ui-tooltip-${tooltipIdCounter++}`;

  /**
   * The controlled open state of the tooltip.
   */
  readonly open = model<boolean>(false);

  /**
   * The default open state when uncontrolled.
   */
  readonly defaultOpen = input(false, { transform: booleanAttribute });

  /**
   * Whether the tooltip is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Delay before opening the tooltip (ms).
   */
  readonly delay = input(600, { transform: numberAttribute });

  /**
   * Delay before closing the tooltip (ms).
   */
  readonly closeDelay = input(0, { transform: numberAttribute });

  /**
   * Emits when the open state changes with detailed event info.
   */
  readonly openChanged = output<TooltipOpenChangeEventDetails>();

  /** Internal open state */
  private readonly internalOpen = signal(false);

  /** Trigger element */
  private readonly triggerElement = signal<HTMLElement | null>(null);

  /** Popup element */
  private readonly popupElement = signal<HTMLElement | null>(null);

  /** Context provided to children */
  readonly context: TooltipContext = {
    open: this.internalOpen(),
    openSignal: this.internalOpen,
    disabled: this.disabled(),
    disabledSignal: this.disabled,
    delay: this.delay(),
    delaySignal: this.delay,
    closeDelay: this.closeDelay(),
    closeDelaySignal: this.closeDelay,
    openTooltip: (reason?: TooltipOpenChangeReason) => this.setOpen(true, reason),
    closeTooltip: (reason?: TooltipOpenChangeReason) => this.setOpen(false, reason),
    toggleTooltip: (reason?: TooltipOpenChangeReason) =>
      this.setOpen(!this.internalOpen(), reason),
    setOpen: (open: boolean, reason?: TooltipOpenChangeReason) =>
      this.setOpen(open, reason),
    triggerElement: this.triggerElement(),
    setTriggerElement: (element: HTMLElement | null) =>
      this.triggerElement.set(element),
    popupElement: this.popupElement(),
    setPopupElement: (element: HTMLElement | null) =>
      this.popupElement.set(element),
    rootId: this.rootId,
    getTriggerId: () => `${this.rootId}-trigger`,
    getPopupId: () => `${this.rootId}-popup`,
  };

  constructor() {
    // Initialize with default open
    effect(() => {
      if (this.defaultOpen() && !this.internalOpen()) {
        this.internalOpen.set(true);
      }
    });

    // Sync model to internal state
    effect(() => {
      this.internalOpen.set(this.open());
    });

    // Close tooltip when disabled becomes true
    effect(() => {
      if (this.disabled() && this.internalOpen()) {
        this.setOpen(false, 'imperative');
      }
    });
  }

  /**
   * Get trigger ID.
   */
  getTriggerId(): string {
    return `${this.rootId}-trigger`;
  }

  /**
   * Get popup ID.
   */
  getPopupId(): string {
    return `${this.rootId}-popup`;
  }

  /**
   * Set the open state with a reason.
   */
  setOpen(open: boolean, reason: TooltipOpenChangeReason = 'imperative'): void {
    // Only prevent OPENING when disabled - closing should always be allowed
    if (this.disabled() && open) {
      return;
    }

    if (open === this.internalOpen()) {
      return;
    }

    this.internalOpen.set(open);
    this.open.set(open);

    this.openChanged.emit({
      open,
      reason,
    });
  }
}

/**
 * @fileoverview Angular port of Base UI ContextMenuRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/context-menu/root/ContextMenuRoot.tsx
 *
 * A context menu that opens on right-click or long-press.
 */

import {
  Directive,
  effect,
  inject,
  model,
  output,
  signal,
  DOCUMENT,
  OnDestroy,
} from '@angular/core';
import {
  CONTEXT_MENU_CONTEXT,
  type ContextMenuContext,
  type ContextMenuOpenChangeEventDetails,
  type ContextMenuOpenChangeReason,
} from './context-menu.types';

let contextMenuIdCounter = 0;

/**
 * Root directive for context menus.
 * Manages context menu state and provides context to child components.
 *
 * @example
 * ```html
 * <div baseUiContextMenuRoot>
 *   <div baseUiContextMenuTrigger>Right-click me</div>
 *   <div baseUiContextMenuPositioner>
 *     <div baseUiContextMenuPopup>
 *       <div baseUiMenuItem>Cut</div>
 *       <div baseUiMenuItem>Copy</div>
 *       <div baseUiMenuItem>Paste</div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiContextMenuRoot]',
  standalone: true,
  exportAs: 'contextMenuRoot',
  host: {
    '[class.base-ui-context-menu-root]': 'true',
    '[attr.data-state]': 'openSignal() ? "open" : "closed"',
  },
  providers: [
    {
      provide: CONTEXT_MENU_CONTEXT,
      useFactory: () => {
        const directive = inject(ContextMenuRootDirective);
        return directive.context;
      },
    },
  ],
})
export class ContextMenuRootDirective implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly rootId = `base-ui-context-menu-${contextMenuIdCounter++}`;

  /** Two-way binding for open state */
  readonly open = model<boolean>(false);

  /** Emitted when open state changes */
  readonly openChanged = output<ContextMenuOpenChangeEventDetails>();

  /** Internal open state signal */
  readonly openSignal = signal(false);

  /** Anchor X position */
  private anchorX = signal<number>(0);

  /** Anchor Y position */
  private anchorY = signal<number>(0);

  /** Trigger element */
  private triggerElement = signal<HTMLElement | null>(null);

  /** Popup element */
  private popupElement = signal<HTMLElement | null>(null);

  /** Highlighted item index */
  private highlightedIndex = signal<number>(-1);

  /** Active item ID */
  private activeItemId = signal<string | null>(null);

  /** Map of registered items */
  private registeredItems = new Map<string, HTMLElement>();

  /** Document click listener cleanup */
  private documentClickCleanup: (() => void) | null = null;

  /** Document keydown listener cleanup */
  private documentKeydownCleanup: (() => void) | null = null;

  /**
   * The context provided to child components.
   */
  readonly context: ContextMenuContext = {
    open: false,
    openSignal: this.openSignal.asReadonly(),
    openContextMenu: (x, y, reason = 'context-menu') => this.openAtPosition(x, y, reason),
    closeContextMenu: (reason = 'imperative') => this.setOpenState(false, reason),
    setOpen: (open, reason = 'imperative') => this.setOpenState(open, reason),
    anchorX: 0,
    anchorXSignal: this.anchorX.asReadonly(),
    anchorY: 0,
    anchorYSignal: this.anchorY.asReadonly(),
    triggerElement: null,
    setTriggerElement: (element) => {
      this.triggerElement.set(element);
      this.context.triggerElement = element;
    },
    popupElement: null,
    setPopupElement: (element) => {
      this.popupElement.set(element);
      this.context.popupElement = element;
    },
    rootId: this.rootId,
    getPopupId: () => `${this.rootId}-popup`,
    highlightedIndex: -1,
    highlightedIndexSignal: this.highlightedIndex.asReadonly(),
    setHighlightedIndex: (index) => {
      this.highlightedIndex.set(index);
      this.context.highlightedIndex = index;
      // Update active item ID
      const items = Array.from(this.registeredItems.entries());
      if (index >= 0 && index < items.length) {
        this.activeItemId.set(items[index][0]);
        this.context.activeItemId = items[index][0];
      } else {
        this.activeItemId.set(null);
        this.context.activeItemId = null;
      }
    },
    activeItemId: null,
    activeItemIdSignal: this.activeItemId.asReadonly(),
    setActiveItemId: (id) => {
      this.activeItemId.set(id);
      this.context.activeItemId = id;
    },
    registerItem: (id, element) => {
      this.registeredItems.set(id, element);
    },
    unregisterItem: (id) => {
      this.registeredItems.delete(id);
    },
    navigateToItem: (direction) => this.navigateToItem(direction),
  };

  constructor() {
    // Sync model to internal signal
    effect(() => {
      const modelValue = this.open();
      if (this.openSignal() !== modelValue) {
        this.openSignal.set(modelValue);
        this.context.open = modelValue;
      }
    });

    // Handle open/close side effects
    effect(() => {
      const isOpen = this.openSignal();
      if (isOpen) {
        this.onOpen();
      } else {
        this.onClose();
      }
    });
  }

  ngOnDestroy(): void {
    this.cleanupDocumentListeners();
  }

  /**
   * Open context menu at a position.
   */
  private openAtPosition(x: number, y: number, reason: ContextMenuOpenChangeReason): void {
    this.anchorX.set(x);
    this.anchorY.set(y);
    this.context.anchorX = x;
    this.context.anchorY = y;
    this.setOpenState(true, reason);
  }

  /**
   * Set open state with reason.
   */
  private setOpenState(open: boolean, reason: ContextMenuOpenChangeReason): void {
    if (this.openSignal() === open) return;

    this.openSignal.set(open);
    this.context.open = open;
    this.open.set(open);
    this.openChanged.emit({ open, reason });
  }

  /**
   * Called when context menu opens.
   */
  private onOpen(): void {
    this.setupDocumentListeners();
    // Reset highlighted index
    this.highlightedIndex.set(0);
    this.context.highlightedIndex = 0;
  }

  /**
   * Called when context menu closes.
   */
  private onClose(): void {
    this.cleanupDocumentListeners();
    // Reset highlighted index
    this.highlightedIndex.set(-1);
    this.context.highlightedIndex = -1;
    this.activeItemId.set(null);
    this.context.activeItemId = null;
  }

  /**
   * Set up document event listeners.
   */
  private setupDocumentListeners(): void {
    // Click outside handler
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      const popup = this.popupElement();

      if (popup && popup.contains(target)) {
        return;
      }

      this.setOpenState(false, 'outside-press');
    };

    // Keydown handler
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.setOpenState(false, 'escape-key');
      }
    };

    // Prevent default context menu
    const contextMenuHandler = (event: MouseEvent) => {
      const trigger = this.triggerElement();
      if (trigger && trigger.contains(event.target as Node)) {
        // Allow our custom context menu
        return;
      }
      // Close on contextmenu outside
      if (this.openSignal()) {
        this.setOpenState(false, 'outside-press');
      }
    };

    this.document.addEventListener('click', clickHandler);
    this.document.addEventListener('keydown', keydownHandler);
    this.document.addEventListener('contextmenu', contextMenuHandler);

    this.documentClickCleanup = () => {
      this.document.removeEventListener('click', clickHandler);
      this.document.removeEventListener('contextmenu', contextMenuHandler);
    };
    this.documentKeydownCleanup = () => {
      this.document.removeEventListener('keydown', keydownHandler);
    };
  }

  /**
   * Clean up document event listeners.
   */
  private cleanupDocumentListeners(): void {
    this.documentClickCleanup?.();
    this.documentKeydownCleanup?.();
    this.documentClickCleanup = null;
    this.documentKeydownCleanup = null;
  }

  /**
   * Navigate to a menu item.
   */
  private navigateToItem(direction: 'next' | 'previous' | 'first' | 'last'): void {
    const items = Array.from(this.registeredItems.entries());
    if (items.length === 0) return;

    const currentIndex = this.highlightedIndex();
    let newIndex: number;

    switch (direction) {
      case 'first':
        newIndex = 0;
        break;
      case 'last':
        newIndex = items.length - 1;
        break;
      case 'next':
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'previous':
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
    }

    this.context.setHighlightedIndex(newIndex);

    // Focus the item
    const [, element] = items[newIndex];
    element?.focus();
  }
}

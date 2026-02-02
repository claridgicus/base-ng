/**
 * @fileoverview Angular port of Base UI MenuRoot
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/menu/root/MenuRoot.tsx
 *
 * The root component for a menu. Manages state and provides context.
 */

import {
  Directive,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  DOCUMENT,
  OnDestroy,
} from '@angular/core';
import {
  MENU_CONTEXT,
  type MenuContext,
  type MenuOpenChangeEventDetails,
  type MenuOpenChangeReason,
} from './menu.types';

let menuIdCounter = 0;

/**
 * Root directive for menus.
 * Manages menu state and provides context to child components.
 *
 * @example
 * ```html
 * <div baseUiMenuRoot>
 *   <button baseUiMenuTrigger>Open Menu</button>
 *   <div baseUiMenuPositioner>
 *     <div baseUiMenuPopup>
 *       <div baseUiMenuItem>Item 1</div>
 *       <div baseUiMenuItem>Item 2</div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiMenuRoot]',
  standalone: true,
  exportAs: 'menuRoot',
  host: {
    '[class.base-ui-menu-root]': 'true',
    '[attr.data-state]': 'openSignal() ? "open" : "closed"',
  },
  providers: [
    {
      provide: MENU_CONTEXT,
      useFactory: () => {
        const directive = inject(MenuRootDirective);
        return directive.context;
      },
    },
  ],
})
export class MenuRootDirective implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly rootId = `base-ui-menu-${menuIdCounter++}`;

  /** Two-way binding for open state */
  readonly open = model<boolean>(false);

  /** Default open state when uncontrolled */
  readonly defaultOpen = input<boolean>(false);

  /** Emitted when open state changes */
  readonly openChanged = output<MenuOpenChangeEventDetails>();

  /** Internal open state signal */
  readonly openSignal = signal(false);

  /** Trigger element */
  private triggerElement = signal<HTMLElement | null>(null);

  /** Popup element */
  private popupElement = signal<HTMLElement | null>(null);

  /** Title ID */
  private titleId = signal<string | null>(null);

  /** Description ID */
  private descriptionId = signal<string | null>(null);

  /** Highlighted item index */
  private highlightedIndex = signal<number>(-1);

  /** Active item ID */
  private activeItemId = signal<string | null>(null);

  /** Map of registered items */
  private registeredItems = new Map<string, HTMLElement>();

  /** Previous focused element for restoration */
  private previouslyFocusedElement: HTMLElement | null = null;

  /** Document click listener cleanup */
  private documentClickCleanup: (() => void) | null = null;

  /** Document keydown listener cleanup */
  private documentKeydownCleanup: (() => void) | null = null;

  /**
   * The context provided to child components.
   */
  readonly context: MenuContext = {
    open: false,
    openSignal: this.openSignal.asReadonly(),
    openMenu: (reason = 'imperative') => this.setOpenState(true, reason),
    closeMenu: (reason = 'imperative') => this.setOpenState(false, reason),
    setOpen: (open, reason = 'imperative') => this.setOpenState(open, reason),
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
    titleId: null,
    titleIdSignal: this.titleId.asReadonly(),
    setTitleId: (id) => {
      this.titleId.set(id);
      this.context.titleId = id;
    },
    descriptionId: null,
    descriptionIdSignal: this.descriptionId.asReadonly(),
    setDescriptionId: (id) => {
      this.descriptionId.set(id);
      this.context.descriptionId = id;
    },
    rootId: this.rootId,
    getTriggerId: () => `${this.rootId}-trigger`,
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

    // Initialize from defaultOpen
    if (this.defaultOpen()) {
      this.openSignal.set(true);
      this.context.open = true;
    }

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
    // Restore body scroll if needed
    this.document.body.style.overflow = '';
  }

  /**
   * Set open state with reason.
   */
  private setOpenState(open: boolean, reason: MenuOpenChangeReason): void {
    if (this.openSignal() === open) return;

    this.openSignal.set(open);
    this.context.open = open;
    this.open.set(open);
    this.openChanged.emit({ open, reason });
  }

  /**
   * Called when menu opens.
   */
  private onOpen(): void {
    this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
    this.setupDocumentListeners();
    // Reset highlighted index
    this.highlightedIndex.set(0);
    this.context.highlightedIndex = 0;
  }

  /**
   * Called when menu closes.
   */
  private onClose(): void {
    this.cleanupDocumentListeners();
    // Reset highlighted index
    this.highlightedIndex.set(-1);
    this.context.highlightedIndex = -1;
    this.activeItemId.set(null);
    this.context.activeItemId = null;
    // Restore focus
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  /**
   * Set up document event listeners.
   */
  private setupDocumentListeners(): void {
    // Click outside handler
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      const trigger = this.triggerElement();
      const popup = this.popupElement();

      if (trigger && trigger.contains(target)) {
        return;
      }

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
      } else if (event.key === 'Tab') {
        this.setOpenState(false, 'tab-key');
      }
    };

    this.document.addEventListener('click', clickHandler);
    this.document.addEventListener('keydown', keydownHandler);

    this.documentClickCleanup = () => {
      this.document.removeEventListener('click', clickHandler);
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

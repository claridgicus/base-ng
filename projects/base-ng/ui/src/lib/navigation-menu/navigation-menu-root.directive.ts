/**
 * @fileoverview Angular port of Base UI Navigation Menu Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/root/NavigationMenuRoot.tsx
 */

import {
  Directive,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  booleanAttribute,
  numberAttribute,
  type Signal,
  ElementRef,
} from '@angular/core';
import {
  NAVIGATION_MENU_ROOT_CONTEXT,
  type NavigationMenuRootContext,
  type NavigationMenuOrientation,
  type NavigationMenuActivationDirection,
  type NavigationMenuChangeEventDetails,
} from './navigation-menu.types';
import type { TransitionStatus } from '../utils';

let navigationMenuIdCounter = 0;

/**
 * Navigation Menu Root directive.
 * Groups all parts of the navigation menu.
 * Renders as a `<nav>` element.
 *
 * @example
 * ```html
 * <nav baseUiNavigationMenuRoot>
 *   <ul baseUiNavigationMenuList>
 *     <li baseUiNavigationMenuItem value="products">
 *       <button baseUiNavigationMenuTrigger>Products</button>
 *       <div baseUiNavigationMenuContent>
 *         <a baseUiNavigationMenuLink href="/products/a">Product A</a>
 *       </div>
 *     </li>
 *   </ul>
 *   <div baseUiNavigationMenuViewport></div>
 * </nav>
 * ```
 */
@Directive({
  selector: '[baseUiNavigationMenuRoot]',
  standalone: true,
  exportAs: 'navigationMenuRoot',
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-open]': 'openSignal() ? "" : null',
    '[class.base-ui-navigation-menu-root]': 'true',
    '[class.base-ui-navigation-menu-root-open]': 'openSignal()',
  },
  providers: [
    {
      provide: NAVIGATION_MENU_ROOT_CONTEXT,
      useFactory: () => {
        const directive = inject(NavigationMenuRootDirective);
        return directive.context;
      },
    },
  ],
})
export class NavigationMenuRootDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly rootId = `base-ui-navigation-menu-${navigationMenuIdCounter++}`;

  /**
   * The default value (which item is initially active).
   */
  readonly defaultValue = input<string | null>(null);

  /**
   * The controlled value (which item is active).
   */
  readonly value = input<string | null>(null);

  /**
   * Orientation of the navigation menu.
   */
  readonly orientation = input<NavigationMenuOrientation>('horizontal');

  /**
   * Delay before opening a menu on hover (in ms).
   */
  readonly delay = input(50, { transform: numberAttribute });

  /**
   * Delay before closing a menu (in ms).
   */
  readonly closeDelay = input(50, { transform: numberAttribute });

  /**
   * Whether the navigation menu is disabled.
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Event emitted when the value changes.
   */
  readonly valueChange = output<{
    value: string | null;
    details: NavigationMenuChangeEventDetails;
  }>();

  /**
   * Event emitted when open/close animation completes.
   */
  readonly openChangeComplete = output<boolean>();

  // Internal state signals
  private readonly valueInternal = signal<string | null>(null);
  private readonly mountedInternal = signal(false);
  private readonly transitionStatusInternal = signal<TransitionStatus>(undefined);
  private readonly positionerElementInternal = signal<HTMLElement | null>(null);
  private readonly popupElementInternal = signal<HTMLElement | null>(null);
  private readonly viewportElementInternal = signal<HTMLElement | null>(null);
  private readonly viewportTargetElementInternal = signal<HTMLElement | null>(null);
  private readonly activationDirectionInternal =
    signal<NavigationMenuActivationDirection>(null);
  private readonly viewportInertInternal = signal(false);

  /** Registered item values */
  private registeredItems: string[] = [];

  /** Computed open state */
  readonly openSignal = computed(() => this.valueInternal() !== null);

  /**
   * The context provided to child components.
   */
  readonly context: NavigationMenuRootContext;

  constructor() {
    const self = this;

    // Initialize with defaultValue
    const initialValue = this.defaultValue();
    if (initialValue !== null) {
      this.valueInternal.set(initialValue);
    }

    // Sync controlled value to internal state
    effect(() => {
      const controlledValue = this.value();
      if (controlledValue !== null) {
        this.valueInternal.set(controlledValue);
      }
    });

    // Update mounted state when open changes
    effect(() => {
      const isOpen = this.openSignal();
      if (isOpen) {
        this.mountedInternal.set(true);
        this.transitionStatusInternal.set('starting');
        // After a tick, clear the starting status
        requestAnimationFrame(() => {
          this.transitionStatusInternal.set(undefined);
        });
      }
    });

    // Reset viewport inert when value changes
    effect(() => {
      const _value = this.valueInternal();
      this.viewportInertInternal.set(false);
    });

    this.context = {
      get open() {
        return self.openSignal();
      },
      get value() {
        return self.valueInternal();
      },
      get mounted() {
        return self.mountedInternal();
      },
      get transitionStatus() {
        return self.transitionStatusInternal();
      },
      openSignal: this.openSignal,
      valueSignal: this.valueInternal.asReadonly(),
      mountedSignal: this.mountedInternal.asReadonly(),
      transitionStatusSignal: this.transitionStatusInternal.asReadonly(),
      setValue: (value, details = {}) => {
        const currentValue = this.valueInternal();
        if (value !== currentValue) {
          this.valueChange.emit({ value, details });
        }

        if (details.isCanceled) {
          return;
        }

        if (!value) {
          // Closing
          this.activationDirectionInternal.set(null);
          this.transitionStatusInternal.set('ending');

          // Complete unmount after animation
          requestAnimationFrame(() => {
            this.transitionStatusInternal.set(undefined);
            this.mountedInternal.set(false);
            this.openChangeComplete.emit(false);
          });
        }

        this.valueInternal.set(value);
      },
      setMounted: (mounted) => {
        this.mountedInternal.set(mounted);
      },
      get positionerElement() {
        return self.positionerElementInternal();
      },
      setPositionerElement: (element) => {
        this.positionerElementInternal.set(element);
      },
      get popupElement() {
        return self.popupElementInternal();
      },
      setPopupElement: (element) => {
        this.popupElementInternal.set(element);
      },
      get viewportElement() {
        return self.viewportElementInternal();
      },
      setViewportElement: (element) => {
        this.viewportElementInternal.set(element);
      },
      get viewportTargetElement() {
        return self.viewportTargetElementInternal();
      },
      setViewportTargetElement: (element) => {
        this.viewportTargetElementInternal.set(element);
      },
      get activationDirection() {
        return self.activationDirectionInternal();
      },
      activationDirectionSignal: this.activationDirectionInternal.asReadonly(),
      setActivationDirection: (direction) => {
        this.activationDirectionInternal.set(direction);
      },
      nested: false,
      get rootRef() {
        return self.elementRef.nativeElement;
      },
      get orientation() {
        return self.orientation();
      },
      orientationSignal: this.orientation as Signal<NavigationMenuOrientation>,
      get delay() {
        return self.delay();
      },
      get closeDelay() {
        return self.closeDelay();
      },
      get viewportInert() {
        return self.viewportInertInternal();
      },
      setViewportInert: (inert) => {
        this.viewportInertInternal.set(inert);
      },
      rootId: this.rootId,
      registerItem: (value) => {
        if (!this.registeredItems.includes(value)) {
          this.registeredItems.push(value);
        }
      },
      unregisterItem: (value) => {
        const index = this.registeredItems.indexOf(value);
        if (index !== -1) {
          this.registeredItems.splice(index, 1);
        }
      },
    };
  }
}

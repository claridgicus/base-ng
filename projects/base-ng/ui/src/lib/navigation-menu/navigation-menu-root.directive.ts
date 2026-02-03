/**
 * @fileoverview Angular port of Base UI Navigation Menu Root
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/navigation-menu/root/NavigationMenuRoot.tsx
 */

import {
  Directive,
  computed,
  effect,
  inject,
  Input,
  Output,
  EventEmitter,
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
    '[attr.data-orientation]': '_orientation()',
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

  // Internal signals for inputs
  private readonly _defaultValue = signal<string | null>(null);
  private readonly _value = signal<string | null>(null);
  readonly _orientation = signal<NavigationMenuOrientation>('horizontal');
  private readonly _delay = signal<number>(50);
  private readonly _closeDelay = signal<number>(50);
  private readonly _disabled = signal<boolean>(false);

  /**
   * The default value (which item is initially active).
   */
  @Input()
  set defaultValue(value: string | null) { this._defaultValue.set(value); }
  get defaultValue(): string | null { return this._defaultValue(); }

  /**
   * The controlled value (which item is active).
   */
  @Input()
  set value(value: string | null) { this._value.set(value); }
  get value(): string | null { return this._value(); }

  /**
   * Orientation of the navigation menu.
   */
  @Input()
  set orientation(value: NavigationMenuOrientation) { this._orientation.set(value); }
  get orientation(): NavigationMenuOrientation { return this._orientation(); }

  /**
   * Delay before opening a menu on hover (in ms).
   */
  @Input({ transform: numberAttribute })
  set delay(value: number) { this._delay.set(value); }
  get delay(): number { return this._delay(); }

  /**
   * Delay before closing a menu (in ms).
   */
  @Input({ transform: numberAttribute })
  set closeDelay(value: number) { this._closeDelay.set(value); }
  get closeDelay(): number { return this._closeDelay(); }

  /**
   * Whether the navigation menu is disabled.
   */
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) { this._disabled.set(value); }
  get disabled(): boolean { return this._disabled(); }

  /**
   * Event emitted when the value changes.
   */
  @Output() readonly valueChange = new EventEmitter<{
    value: string | null;
    details: NavigationMenuChangeEventDetails;
  }>();

  /**
   * Event emitted when open/close animation completes.
   */
  @Output() readonly openChangeComplete = new EventEmitter<boolean>();

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
    const initialValue = this._defaultValue();
    if (initialValue !== null) {
      this.valueInternal.set(initialValue);
    }

    // Sync controlled value to internal state
    effect(() => {
      const controlledValue = this._value();
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
        return self._orientation();
      },
      orientationSignal: this._orientation.asReadonly(),
      get delay() {
        return self._delay();
      },
      get closeDelay() {
        return self._closeDelay();
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

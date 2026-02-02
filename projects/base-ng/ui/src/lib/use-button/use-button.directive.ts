/**
 * @fileoverview Angular port of Base UI useButton hook
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/use-button/useButton.ts
 *
 * Provides button functionality with keyboard accessibility and proper event handling.
 */

import {
  computed,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  type Signal,
} from '@angular/core';

/**
 * Configuration options for the button behavior.
 */
export interface UseButtonOptions {
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button can be focused when disabled.
   * @default false
   */
  focusableWhenDisabled?: boolean;

  /**
   * The tabindex of the button.
   */
  tabIndex?: number;

  /**
   * Whether the host element is a native button element.
   * @default true
   */
  native?: boolean;
}

/**
 * Return type for button props getter.
 */
export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  tabIndex?: number;
  role?: string;
  'aria-disabled'?: boolean | 'true' | 'false';
}

/**
 * Directive that provides button functionality with keyboard accessibility.
 * Can be applied to any element to make it behave like a button.
 *
 * @example
 * ```html
 * <!-- On native button -->
 * <button baseUiButton [disabled]="isDisabled" (buttonClick)="handleClick()">
 *   Click me
 * </button>
 *
 * <!-- On custom element -->
 * <div baseUiButton [native]="false" (buttonClick)="handleClick()">
 *   Custom button
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiButton]',
  standalone: true,
  host: {
    '[attr.type]': 'buttonType()',
    '[attr.disabled]': 'nativeDisabled()',
    '[attr.tabindex]': 'effectiveTabIndex()',
    '[attr.role]': 'role()',
    '[attr.aria-disabled]': 'ariaDisabled()',
    '[class.base-ui-button]': 'true',
    '[class.base-ui-button-disabled]': 'disabled()',
  },
})
export class UseButtonDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Whether the button is disabled.
   */
  readonly disabled = input<boolean>(false);

  /**
   * Whether the button can be focused when disabled.
   */
  readonly focusableWhenDisabled = input<boolean>(false);

  /**
   * Custom tabindex for the button.
   */
  readonly tabIndex = input<number | undefined>(undefined);

  /**
   * Whether the element is a native button.
   */
  readonly native = input<boolean>(true);

  /**
   * Button type attribute (for native buttons only).
   */
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /**
   * Emitted when the button is clicked (keyboard or mouse).
   */
  readonly buttonClick = output<MouseEvent | KeyboardEvent>();

  /**
   * Emitted when the button is pressed down.
   */
  readonly buttonPress = output<MouseEvent | KeyboardEvent>();

  /**
   * Emitted when the button is released.
   */
  readonly buttonRelease = output<MouseEvent | KeyboardEvent>();

  /**
   * Computed button type attribute.
   */
  readonly buttonType: Signal<'button' | 'submit' | 'reset' | null> = computed(() => {
    if (this.native()) {
      return this.type();
    }
    return null;
  });

  /**
   * Native disabled attribute (only for native buttons when not focusableWhenDisabled).
   */
  readonly nativeDisabled: Signal<boolean | null> = computed(() => {
    if (this.native() && this.disabled() && !this.focusableWhenDisabled()) {
      return true;
    }
    return null;
  });

  /**
   * Computed tabindex.
   */
  readonly effectiveTabIndex: Signal<number | null> = computed(() => {
    const customTabIndex = this.tabIndex();
    if (customTabIndex !== undefined) {
      return customTabIndex;
    }

    // Disabled and not focusable = -1
    if (this.disabled() && !this.focusableWhenDisabled()) {
      return -1;
    }

    // Non-native elements need tabindex 0 to be focusable
    if (!this.native()) {
      return 0;
    }

    return null;
  });

  /**
   * Role attribute for non-native buttons.
   */
  readonly role: Signal<string | null> = computed(() => {
    if (!this.native()) {
      return 'button';
    }
    return null;
  });

  /**
   * aria-disabled attribute for accessibility.
   */
  readonly ariaDisabled: Signal<'true' | 'false' | null> = computed(() => {
    if (this.disabled()) {
      return 'true';
    }
    // Only set false explicitly for non-native elements
    if (!this.native()) {
      return 'false';
    }
    return null;
  });

  /**
   * Handle click events.
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.buttonClick.emit(event);
  }

  /**
   * Handle keyboard events for non-native buttons.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      // Prevent default for Space and Enter when disabled
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
      }
      return;
    }

    // For non-native elements, handle Enter and Space
    if (!this.native()) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.buttonPress.emit(event);
        this.buttonClick.emit(event);
        this.buttonRelease.emit(event);
      } else if (event.key === ' ') {
        // Space triggers on keyup, but we prevent default on keydown
        event.preventDefault();
        this.buttonPress.emit(event);
      }
    }
  }

  /**
   * Handle keyup for Space key on non-native buttons.
   */
  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (!this.native() && event.key === ' ') {
      event.preventDefault();
      this.buttonClick.emit(event);
      this.buttonRelease.emit(event);
    }
  }

  /**
   * Handle pointer down events.
   */
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.buttonPress.emit(event);
  }

  /**
   * Handle pointer up events.
   */
  @HostListener('pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (this.disabled()) {
      return;
    }
    this.buttonRelease.emit(event);
  }

  /**
   * Focus the button element.
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /**
   * Blur the button element.
   */
  blur(): void {
    this.elementRef.nativeElement.blur();
  }

  /**
   * Get props object for the button.
   * Useful for programmatic usage.
   */
  getButtonProps(): ButtonProps {
    const props: ButtonProps = {};

    if (this.native()) {
      props.type = this.type();
      if (this.disabled() && !this.focusableWhenDisabled()) {
        props.disabled = true;
      }
    } else {
      props.role = 'button';
    }

    const tabIndex = this.effectiveTabIndex();
    if (tabIndex !== null) {
      props.tabIndex = tabIndex;
    }

    if (this.disabled()) {
      props['aria-disabled'] = true;
    }

    return props;
  }
}

/**
 * Utility function to determine if an element is a native button.
 */
export function isNativeButton(element: Element): element is HTMLButtonElement {
  const tagName = element.tagName.toLowerCase();
  return tagName === 'button' || (tagName === 'input' && (element as HTMLInputElement).type === 'button');
}

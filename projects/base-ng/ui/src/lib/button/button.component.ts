/**
 * @fileoverview Angular port of Base UI Button component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/button/Button.tsx
 *
 * A button component that can be used to trigger actions.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  type Signal,
} from '@angular/core';
import { UseButtonDirective } from '../use-button';

/**
 * Data attributes for the button component.
 */
export enum ButtonDataAttributes {
  /**
   * Present when the button is disabled.
   */
  disabled = 'data-disabled',
}

/**
 * A button component that can be used to trigger actions.
 * Renders a `<button>` element with proper accessibility.
 *
 * @example
 * ```html
 * <base-ui-button (buttonClick)="handleClick($event)">
 *   Click me
 * </base-ui-button>
 *
 * <base-ui-button [disabled]="true">
 *   Disabled button
 * </base-ui-button>
 *
 * <base-ui-button [focusableWhenDisabled]="true" [disabled]="true">
 *   Focusable when disabled
 * </base-ui-button>
 * ```
 */
@Component({
  selector: 'base-ui-button, [baseUiButton]',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.type]': 'buttonType()',
    '[attr.disabled]': 'nativeDisabled()',
    '[attr.tabindex]': 'effectiveTabIndex()',
    '[attr.aria-disabled]': 'ariaDisabled()',
    '[attr.data-disabled]': 'dataDisabled()',
    '[class.base-ui-button]': 'true',
    '[class.base-ui-button-disabled]': 'disabled()',
  },
})
export class ButtonComponent {
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
   * Button type attribute.
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
  readonly buttonType: Signal<'button' | 'submit' | 'reset'> = computed(() => this.type());

  /**
   * Native disabled attribute.
   */
  readonly nativeDisabled: Signal<boolean | null> = computed(() => {
    if (this.disabled() && !this.focusableWhenDisabled()) {
      return true;
    }
    return null;
  });

  /**
   * Computed tabindex.
   */
  readonly effectiveTabIndex: Signal<number | null> = computed(() => {
    if (this.disabled() && !this.focusableWhenDisabled()) {
      return -1;
    }
    return null;
  });

  /**
   * ARIA disabled attribute.
   */
  readonly ariaDisabled: Signal<'true' | null> = computed(() => {
    if (this.disabled()) {
      return 'true';
    }
    return null;
  });

  /**
   * Data disabled attribute.
   */
  readonly dataDisabled: Signal<'' | null> = computed(() => {
    if (this.disabled()) {
      return '';
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
   * Handle keyboard events.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
      }
      return;
    }
  }

  /**
   * Handle keyup for Space key.
   */
  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
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
}

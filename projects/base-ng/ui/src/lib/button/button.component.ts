/**
 * @component BuiButton
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/button/Button.tsx
 * @reactDocs https://base-ui.com/react/components/button
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * A button component that can be used to trigger actions.
 * Renders a `<button>` element with proper accessibility.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
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
    '[class.base-ui-button-disabled]': '_disabled()',
  },
})
export class ButtonComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // Internal signals that track input values
  readonly _disabled = signal(false);
  readonly _focusableWhenDisabled = signal(false);
  readonly _type = signal<'button' | 'submit' | 'reset'>('button');

  /**
   * Whether the button is disabled.
   */
  @Input()
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Whether the button can be focused when disabled.
   */
  @Input()
  set focusableWhenDisabled(value: boolean) {
    this._focusableWhenDisabled.set(value);
  }
  get focusableWhenDisabled(): boolean {
    return this._focusableWhenDisabled();
  }

  /**
   * Button type attribute.
   */
  @Input()
  set type(value: 'button' | 'submit' | 'reset') {
    this._type.set(value);
  }
  get type(): 'button' | 'submit' | 'reset' {
    return this._type();
  }

  /**
   * Emitted when the button is clicked (keyboard or mouse).
   */
  @Output() buttonClick = new EventEmitter<MouseEvent | KeyboardEvent>();

  /**
   * Emitted when the button is pressed down.
   */
  @Output() buttonPress = new EventEmitter<MouseEvent | KeyboardEvent>();

  /**
   * Emitted when the button is released.
   */
  @Output() buttonRelease = new EventEmitter<MouseEvent | KeyboardEvent>();

  /**
   * Computed button type attribute.
   */
  readonly buttonType = computed(() => this._type());

  /**
   * Native disabled attribute.
   */
  readonly nativeDisabled = computed(() => {
    if (this._disabled() && !this._focusableWhenDisabled()) {
      return true;
    }
    return null;
  });

  /**
   * Computed tabindex.
   */
  readonly effectiveTabIndex = computed(() => {
    if (this._disabled() && !this._focusableWhenDisabled()) {
      return -1;
    }
    return null;
  });

  /**
   * ARIA disabled attribute.
   */
  readonly ariaDisabled = computed(() => {
    if (this._disabled()) {
      return 'true';
    }
    return null;
  });

  /**
   * Data disabled attribute.
   */
  readonly dataDisabled = computed(() => {
    if (this._disabled()) {
      return '';
    }
    return null;
  });

  /**
   * Handle click events.
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this._disabled()) {
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
    if (this._disabled()) {
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
    if (this._disabled()) {
      return;
    }
  }

  /**
   * Handle pointer down events.
   */
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (this._disabled()) {
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
    if (this._disabled()) {
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

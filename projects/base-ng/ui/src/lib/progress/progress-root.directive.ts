/**
 * @component BuiProgressRoot
 * @reactSource https://raw.githubusercontent.com/mui/base-ui/master/packages/react/src/progress/root/ProgressRoot.tsx
 * @reactDocs https://base-ui.com/react/components/progress
 * @lastScraped 2026-02-03
 * @styling Tailwind CSS 4 only
 * @parity EXACT - Ported from React Base UI
 *
 * Groups all parts of the progress bar and provides task completion status to screen readers.
 */

import {
  computed,
  Directive,
  Input,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import {
  PROGRESS_CONTEXT,
  ProgressContext,
  ProgressFormatOptions,
  ProgressState,
  ProgressStatus,
} from './progress.types';

/**
 * Formats a number value for display using Intl.NumberFormat.
 */
function formatNumberValue(
  value: number | null,
  locale?: string,
  formatOptions?: ProgressFormatOptions
): string | null {
  if (value === null || !Number.isFinite(value)) {
    return null;
  }
  const formatter = new Intl.NumberFormat(locale, formatOptions);
  return formatter.format(value);
}

/**
 * Default function to generate aria-valuetext.
 */
function getDefaultAriaValueText(formattedValue: string | null, value: number | null): string | undefined {
  if (formattedValue !== null) {
    return formattedValue;
  }
  if (value !== null) {
    return String(value);
  }
  return undefined;
}

/**
 * Root directive for Progress component that provides context to child components.
 *
 * @example
 * ```html
 * <div baseUiProgressRoot [value]="progress" [max]="100">
 *   <div baseUiProgressTrack>
 *     <div baseUiProgressIndicator></div>
 *   </div>
 *   <span baseUiProgressValue></span>
 * </div>
 * ```
 */
@Directive({
  selector: '[baseUiProgressRoot]',
  standalone: true,
  exportAs: 'progressRoot',
  providers: [
    {
      provide: PROGRESS_CONTEXT,
      useFactory: (directive: ProgressRootDirective) => directive.context,
      deps: [ProgressRootDirective],
    },
  ],
  host: {
    role: 'progressbar',
    '[attr.aria-labelledby]': 'labelId()',
    '[attr.aria-valuemax]': '_max()',
    '[attr.aria-valuemin]': '_min()',
    '[attr.aria-valuenow]': '_value()',
    '[attr.aria-valuetext]': 'ariaValueText()',
    '[attr.data-status]': 'status()',
    '[class.base-ui-progress]': 'true',
    '[class.base-ui-progress-indeterminate]': 'status() === "indeterminate"',
    '[class.base-ui-progress-progressing]': 'status() === "progressing"',
    '[class.base-ui-progress-complete]': 'status() === "complete"',
  },
})
export class ProgressRootDirective {
  // Internal signals for reactive updates
  readonly _value = signal<number | null>(null);
  readonly _min = signal<number>(0);
  readonly _max = signal<number>(100);
  readonly _format = signal<ProgressFormatOptions | undefined>(undefined);
  readonly _locale = signal<string | undefined>(undefined);
  readonly _getAriaValueText = signal<
    (formattedValue: string | null, value: number | null) => string | undefined
  >(getDefaultAriaValueText);

  /**
   * Current progress value. Set to null for indeterminate progress.
   */
  @Input()
  set value(val: number | null) {
    this._value.set(val);
  }
  get value(): number | null {
    return this._value();
  }

  /**
   * Minimum progress value.
   * @default 0
   */
  @Input()
  set min(val: number) {
    this._min.set(val);
  }
  get min(): number {
    return this._min();
  }

  /**
   * Maximum progress value.
   * @default 100
   */
  @Input()
  set max(val: number) {
    this._max.set(val);
  }
  get max(): number {
    return this._max();
  }

  /**
   * Intl.NumberFormat options for formatting the progress value.
   */
  @Input()
  set format(val: ProgressFormatOptions | undefined) {
    this._format.set(val);
  }
  get format(): ProgressFormatOptions | undefined {
    return this._format();
  }

  /**
   * BCP 47 locale for number formatting.
   */
  @Input()
  set locale(val: string | undefined) {
    this._locale.set(val);
  }
  get locale(): string | undefined {
    return this._locale();
  }

  /**
   * Custom function to generate aria-valuetext.
   */
  @Input()
  set getAriaValueText(
    val: (formattedValue: string | null, value: number | null) => string | undefined
  ) {
    this._getAriaValueText.set(val);
  }
  get getAriaValueText(): (formattedValue: string | null, value: number | null) => string | undefined {
    return this._getAriaValueText();
  }

  // Internal state
  private readonly _labelId: WritableSignal<string | undefined> = signal(undefined);

  /**
   * Current label ID for aria-labelledby.
   */
  readonly labelId: Signal<string | undefined> = this._labelId.asReadonly();

  /**
   * Current progress status.
   */
  readonly status: Signal<ProgressStatus> = computed(() => {
    const val = this._value();
    const maxVal = this._max();

    if (val === null || !Number.isFinite(val)) {
      return 'indeterminate';
    }
    return val >= maxVal ? 'complete' : 'progressing';
  });

  /**
   * Progress state object.
   */
  readonly state: Signal<ProgressState> = computed(() => ({
    status: this.status(),
  }));

  /**
   * Formatted value for display.
   */
  readonly formattedValue: Signal<string | null> = computed(() => {
    return formatNumberValue(this._value(), this._locale(), this._format());
  });

  /**
   * Aria value text for screen readers.
   */
  readonly ariaValueText: Signal<string | undefined> = computed(() => {
    const fn = this._getAriaValueText();
    return fn(this.formattedValue(), this._value());
  });

  /**
   * Progress percentage (0-100).
   */
  readonly percentage: Signal<number | null> = computed(() => {
    const val = this._value();
    const minVal = this._min();
    const maxVal = this._max();

    if (val === null || !Number.isFinite(val)) {
      return null;
    }

    const range = maxVal - minVal;
    if (range === 0) {
      return 0;
    }

    return ((val - minVal) / range) * 100;
  });

  /**
   * Context provided to child components.
   */
  readonly context: ProgressContext = {
    formattedValue: this.formattedValue,
    max: this._max,
    min: this._min,
    value: this._value,
    status: this.status,
    state: this.state,
    setLabelId: (id: string | undefined) => {
      this._labelId.set(id);
    },
  };
}

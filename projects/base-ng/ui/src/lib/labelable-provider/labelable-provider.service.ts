/**
 * @fileoverview Angular port of Base UI labelable provider
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/labelable-provider/LabelableContext.ts
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/labelable-provider/useLabelableId.ts
 *
 * Provides infrastructure for associating labels and descriptions with form controls,
 * implementing WCAG accessibility standards for "labelable elements".
 */

import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';

/**
 * Counter for generating unique IDs.
 */
let idCounter = 0;

/**
 * Generate a unique ID for accessibility purposes.
 * @param prefix - Optional prefix for the ID
 * @returns A unique string ID
 */
export function generateId(prefix = 'base-ui'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Configuration for labelable context.
 */
export interface LabelableConfig {
  /**
   * The ID of the form control.
   */
  controlId?: string | null;

  /**
   * The ID of the label element.
   */
  labelId?: string | null;

  /**
   * IDs of description/message elements.
   */
  messageIds?: string[];
}

/**
 * Injection token for labelable configuration.
 */
export const LABELABLE_CONFIG = new InjectionToken<LabelableConfig>('BaseUI Labelable Configuration');

/**
 * Service for managing accessible form element labeling.
 * Connects labels, descriptions, and form controls with proper ARIA attributes.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [LabelableService],
 * })
 * export class FormFieldComponent {
 *   private labelable = inject(LabelableService);
 *
 *   // Use in template
 *   getControlId() {
 *     return this.labelable.controlId();
 *   }
 * }
 * ```
 */
@Injectable()
export class LabelableService {
  private readonly config = inject(LABELABLE_CONFIG, { optional: true });

  /**
   * The ID of the form control.
   */
  readonly controlId: WritableSignal<string | null>;

  /**
   * The ID of the label element.
   */
  readonly labelId: WritableSignal<string | null>;

  /**
   * IDs of description/message elements.
   */
  readonly messageIds: WritableSignal<string[]>;

  /**
   * Computed aria-describedby attribute value.
   */
  readonly ariaDescribedBy: Signal<string | undefined>;

  /**
   * Computed aria-labelledby attribute value.
   */
  readonly ariaLabelledBy: Signal<string | undefined>;

  constructor() {
    // Initialize with config or generate defaults
    const defaultControlId = generateId('control');
    const defaultLabelId = generateId('label');

    this.controlId = signal(this.config?.controlId ?? defaultControlId);
    this.labelId = signal(this.config?.labelId ?? defaultLabelId);
    this.messageIds = signal(this.config?.messageIds ?? []);

    // Computed ARIA attributes
    this.ariaDescribedBy = computed(() => {
      const ids = this.messageIds();
      return ids.length > 0 ? ids.join(' ') : undefined;
    });

    this.ariaLabelledBy = computed(() => {
      const id = this.labelId();
      return id ?? undefined;
    });
  }

  /**
   * Set the control ID.
   * @param id - The new control ID
   */
  setControlId(id: string | null): void {
    this.controlId.set(id);
  }

  /**
   * Set the label ID.
   * @param id - The new label ID
   */
  setLabelId(id: string | null): void {
    this.labelId.set(id);
  }

  /**
   * Add a message/description ID.
   * @param id - The message ID to add
   */
  addMessageId(id: string): void {
    this.messageIds.update((ids) => {
      if (!ids.includes(id)) {
        return [...ids, id];
      }
      return ids;
    });
  }

  /**
   * Remove a message/description ID.
   * @param id - The message ID to remove
   */
  removeMessageId(id: string): void {
    this.messageIds.update((ids) => ids.filter((messageId) => messageId !== id));
  }

  /**
   * Clear all message IDs.
   */
  clearMessageIds(): void {
    this.messageIds.set([]);
  }

  /**
   * Get props to apply to the control element.
   * @returns Object with id and aria attributes
   */
  getControlProps(): Record<string, string | undefined> {
    return {
      id: this.controlId() ?? undefined,
      'aria-labelledby': this.ariaLabelledBy(),
      'aria-describedby': this.ariaDescribedBy(),
    };
  }

  /**
   * Get props to apply to the label element.
   * @returns Object with id and for attributes
   */
  getLabelProps(): Record<string, string | undefined> {
    return {
      id: this.labelId() ?? undefined,
      for: this.controlId() ?? undefined,
    };
  }

  /**
   * Get props to apply to a description/message element.
   * @param id - The specific message ID (or generate one)
   * @returns Object with id attribute
   */
  getDescriptionProps(id?: string): Record<string, string> {
    const messageId = id ?? generateId('message');
    // Auto-register the message ID
    if (!this.messageIds().includes(messageId)) {
      this.addMessageId(messageId);
    }
    return { id: messageId };
  }

  /**
   * Check if the control is within an implicit label.
   * @param element - The control element to check
   * @returns true if the element is within a label
   */
  isImplicitlyLabeled(element: HTMLElement): boolean {
    return element.closest('label') !== null;
  }

  /**
   * Get the resolved control ID based on implicit/explicit labeling.
   * @param options - Configuration options
   * @returns The resolved control ID
   */
  resolveControlId(options?: {
    id?: string;
    implicit?: boolean;
    element?: HTMLElement;
  }): string {
    const { id, implicit = false, element } = options ?? {};

    // If explicit ID provided, use it
    if (id) {
      this.setControlId(id);
      return id;
    }

    // Check for implicit labeling
    if (implicit && element && this.isImplicitlyLabeled(element)) {
      // For implicit labels, we might not need an ID
      return this.controlId() ?? generateId('control');
    }

    // Use or generate control ID
    const controlId = this.controlId() ?? generateId('control');
    this.setControlId(controlId);
    return controlId;
  }
}

/**
 * Factory provider for creating a new LabelableService instance.
 * Use this when you need an isolated labelable context.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [provideLabelable()],
 * })
 * export class FormFieldComponent {}
 * ```
 */
export function provideLabelable(config?: LabelableConfig) {
  const providers = [LabelableService];

  if (config) {
    providers.unshift({
      provide: LABELABLE_CONFIG,
      useValue: config,
    } as never);
  }

  return providers;
}

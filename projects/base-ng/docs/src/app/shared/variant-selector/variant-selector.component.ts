import { Component, model, output, signal } from '@angular/core';

export type StyleVariant = 'css' | 'tailwind';

@Component({
  selector: 'docs-variant-selector',
  template: `
    <div class="variant-selector" role="radiogroup" aria-label="Style variant">
      @for (variant of variants; track variant.id) {
        <button
          type="button"
          role="radio"
          class="variant-btn"
          [class.active]="selected() === variant.id"
          [attr.aria-checked]="selected() === variant.id"
          (click)="selectVariant(variant.id)"
        >
          {{ variant.label }}
        </button>
      }
    </div>
  `,
  styles: `
    .variant-selector {
      display: inline-flex;
      gap: 0.125rem;
      padding: 0.125rem;
      background: var(--docs-bg-secondary);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
    }

    .variant-btn {
      padding: 0.25rem 0.625rem;
      font-size: 0.75rem;
      font-weight: 500;
      background: transparent;
      border: none;
      border-radius: 0.25rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
      transition: all 0.15s;

      &:hover:not(.active) {
        color: var(--docs-text);
      }

      &.active {
        background: var(--docs-bg);
        color: var(--docs-text);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
    }
  `,
})
export class VariantSelectorComponent {
  readonly selected = model<StyleVariant>('css');
  readonly variantChange = output<StyleVariant>();

  protected readonly variants: { id: StyleVariant; label: string }[] = [
    { id: 'css', label: 'CSS' },
    { id: 'tailwind', label: 'Tailwind' },
  ];

  protected selectVariant(variant: StyleVariant): void {
    this.selected.set(variant);
    this.variantChange.emit(variant);
  }
}

import { Component, Input, signal, computed } from '@angular/core';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { VariantSelectorComponent, type StyleVariant } from '../variant-selector/variant-selector.component';

@Component({
  selector: 'docs-demo',
  imports: [CodeBlockComponent, VariantSelectorComponent],
  template: `
    <div class="demo-container">
      <div class="demo-preview">
        <ng-content />
      </div>
      <div class="demo-toolbar">
        <button
          class="toolbar-btn"
          [class.active]="showCode()"
          (click)="showCode.set(!showCode())"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          {{ showCode() ? 'Hide' : 'Show' }} code
        </button>
        @if (tailwindCode) {
          <docs-variant-selector [(selected)]="selectedVariant" />
        }
        @if (stackblitzUrl) {
          <a
            [href]="stackblitzUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="toolbar-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Open in StackBlitz
          </a>
        }
      </div>
      @if (showCode()) {
        <div class="demo-code">
          <docs-code-block [code]="displayCode()" [language]="language" />
        </div>
      }
    </div>
  `,
  styles: `
    .demo-container {
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      overflow: hidden;
      margin: 1.5rem 0;
    }

    .demo-preview {
      padding: 2rem;
      background: var(--docs-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 120px;
    }

    .demo-toolbar {
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: var(--docs-bg-secondary);
      border-top: 1px solid var(--docs-border);
    }

    .toolbar-btn {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.8125rem;
      font-weight: 500;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s;

      &:hover {
        color: var(--docs-text);
        background: var(--docs-bg);
        text-decoration: none;
      }

      &.active {
        background: var(--docs-accent);
        border-color: var(--docs-accent);
        color: white;
      }
    }

    .demo-code {
      border-top: 1px solid var(--docs-border);

      docs-code-block ::ng-deep .code-block {
        margin: 0;
        border: none;
        border-radius: 0;
      }
    }
  `,
})
export class DemoComponent {
  @Input() code = '';
  @Input() tailwindCode?: string;
  @Input() language = 'typescript';
  @Input() stackblitzUrl?: string;

  protected readonly showCode = signal(false);
  protected readonly selectedVariant = signal<StyleVariant>('css');

  protected readonly displayCode = computed(() => {
    if (this.selectedVariant() === 'tailwind' && this.tailwindCode) {
      return this.tailwindCode;
    }
    return this.code;
  });
}

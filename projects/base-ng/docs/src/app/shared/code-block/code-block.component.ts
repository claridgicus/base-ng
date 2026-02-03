import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'docs-code-block',
  template: `
    <div class="code-block" [class.with-filename]="filename">
      @if (filename) {
        <div class="code-header">
          <span class="filename">{{ filename }}</span>
          <button class="copy-btn" (click)="copyCode()" [attr.aria-label]="copyLabel()">
            @if (copied()) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            }
          </button>
        </div>
      }
      <div class="code-content">
        @if (!filename) {
          <button class="copy-btn floating" (click)="copyCode()" [attr.aria-label]="copyLabel()">
            @if (copied()) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            }
          </button>
        }
        @if (highlightedCode()) {
          <pre [innerHTML]="highlightedCode()"></pre>
        } @else {
          <pre><code>{{ code }}</code></pre>
        }
      </div>
    </div>
  `,
  styles: `
    .code-block {
      position: relative;
      border-radius: 0.5rem;
      border: 1px solid var(--docs-border);
      overflow: hidden;
      margin: 1rem 0;

      &.with-filename {
        .code-content {
          border-radius: 0;
        }
      }
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      background: var(--docs-bg-secondary);
      border-bottom: 1px solid var(--docs-border);
    }

    .filename {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--docs-muted);
    }

    .code-content {
      position: relative;
      background: var(--docs-code-bg);
      overflow-x: auto;

      pre {
        margin: 0;
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 0.875rem;
        background: transparent;
        border: none;

        code {
          background: transparent;
          padding: 0;
        }
      }
    }

    .copy-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        color: var(--docs-text);
        background: var(--docs-bg-secondary);
      }

      &.floating {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 1;
      }
    }

    :host ::ng-deep .shiki {
      padding: 1rem;
      margin: 0;

      code {
        display: block;
        background: transparent;
        padding: 0;
      }

      .line {
        display: block;
        min-height: 0.875rem;
      }
    }
  `,
})
export class CodeBlockComponent implements OnInit {
  @Input() code = '';
  @Input() language = 'typescript';
  @Input() filename?: string;

  private readonly sanitizer = inject(DomSanitizer);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly copied = signal(false);
  protected readonly highlightedCode = signal<SafeHtml | null>(null);

  protected readonly copyLabel = computed(() => (this.copied() ? 'Copied!' : 'Copy code'));

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.highlightCode();
    }
  }

  private async highlightCode(): Promise<void> {
    try {
      const { codeToHtml } = await import('shiki');
      const html = await codeToHtml(this.code.trim(), {
        lang: this.language,
        theme: 'github-dark',
      });
      this.highlightedCode.set(this.sanitizer.bypassSecurityTrustHtml(html));
    } catch {
      // Fallback to plain text if highlighting fails
      this.highlightedCode.set(null);
    }
  }

  copyCode(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.code.trim());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}

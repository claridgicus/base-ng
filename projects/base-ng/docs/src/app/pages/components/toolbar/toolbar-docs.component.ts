import { Component, signal } from '@angular/core';
import {
  ToolbarButtonDirective,
  ToolbarGroupDirective,
  ToolbarRootDirective,
  ToolbarSeparatorDirective,
} from '@copied/base-ng';
import {
  CodeBlockComponent,
  DemoComponent,
  EditOnGitHubComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-toolbar',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    ToolbarRootDirective,
    ToolbarGroupDirective,
    ToolbarButtonDirective,
    ToolbarSeparatorDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Toolbar</h1>
        <p class="docs-description">
          A container for grouping a set of controls, such as buttons, toggle groups, or menus.
          Provides keyboard navigation between items and proper accessibility roles.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode">
          <div baseUiToolbarRoot class="demo-toolbar">
            <!-- Text formatting group -->
            <div baseUiToolbarGroup class="demo-toolbar-group">
              <button
                baseUiToolbarButton
                class="demo-toolbar-btn"
                [class.active]="isBold()"
                (click)="toggleBold()"
              >
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path
                    d="M4 2h5a3 3 0 0 1 0 6H4V2zm0 6h6a3 3 0 0 1 0 6H4V8z"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                  />
                </svg>
              </button>
              <button
                baseUiToolbarButton
                class="demo-toolbar-btn"
                [class.active]="isItalic()"
                (click)="toggleItalic()"
              >
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path
                    d="M6 2h6M4 14h6M10 2L6 14"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <button
                baseUiToolbarButton
                class="demo-toolbar-btn"
                [class.active]="isUnderline()"
                (click)="toggleUnderline()"
              >
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path
                    d="M4 2v6a4 4 0 0 0 8 0V2M3 14h10"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
            </div>

            <div baseUiToolbarSeparator class="demo-toolbar-separator"></div>

            <!-- Alignment group -->
            <div baseUiToolbarGroup class="demo-toolbar-group">
              <button
                baseUiToolbarButton
                class="demo-toolbar-btn"
                [class.active]="alignment() === 'left'"
                (click)="alignment.set('left')"
              >
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path
                    d="M2 3h12M2 6h8M2 9h12M2 12h6"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <button
                baseUiToolbarButton
                class="demo-toolbar-btn"
                [class.active]="alignment() === 'center'"
                (click)="alignment.set('center')"
              >
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path
                    d="M2 3h12M4 6h8M2 9h12M5 12h6"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <button
                baseUiToolbarButton
                class="demo-toolbar-btn"
                [class.active]="alignment() === 'right'"
                (click)="alignment.set('right')"
              >
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path
                    d="M2 3h12M6 6h8M2 9h12M8 12h6"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
            </div>

            <div baseUiToolbarSeparator class="demo-toolbar-separator"></div>

            <!-- Action buttons -->
            <button baseUiToolbarButton class="demo-toolbar-btn" (click)="handleAction('link')">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <path
                  d="M6.5 9.5l3-3M9 5h2a2 2 0 0 1 0 4h-1M7 7H5a2 2 0 0 0 0 4h2"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="1.5"
                />
              </svg>
            </button>
            <button baseUiToolbarButton class="demo-toolbar-btn" (click)="handleAction('image')">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" fill="none" />
                <circle cx="5.5" cy="6.5" r="1.5" fill="currentColor" />
                <path d="M2 11l3-3 2 2 4-4 3 3" stroke="currentColor" fill="none" />
              </svg>
            </button>
          </div>
        </docs-demo>
      </section>

      <!-- Import -->
      <section class="docs-section">
        <h2 class="docs-section-title">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Toolbar can contain buttons, groups, separators, links, and inputs:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic toolbar</h3>
        <p class="docs-paragraph">A simple toolbar with action buttons.</p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Text editor toolbar</h3>
        <p class="docs-paragraph">A rich text editor toolbar with formatting options.</p>
        <docs-code-block [code]="editorDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">With toggle groups</h3>
        <p class="docs-paragraph">Combine toolbar with toggle groups for exclusive selections.</p>
        <docs-code-block [code]="toggleDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With groups</h3>
        <p class="docs-paragraph">Group related buttons together with separators.</p>
        <docs-code-block [code]="groupDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Vertical orientation</h3>
        <p class="docs-paragraph">Create a vertical toolbar for sidebars or floating panels.</p>
        <docs-code-block [code]="verticalDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With inputs</h3>
        <p class="docs-paragraph">Include input fields in the toolbar.</p>
        <docs-code-block [code]="inputDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">Disable the entire toolbar or individual items.</p>
        <docs-code-block [code]="disabledDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">Style the Toolbar and its elements using CSS:</p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">Style with Tailwind utilities:</p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Button Inputs" [props]="buttonInputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table [props]="dataAttributes" />
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS classes</h2>
        <docs-props-table [props]="cssClasses" />
      </section>

      <!-- Keyboard Navigation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Keyboard navigation</h2>
        <docs-props-table [props]="keyboardShortcuts" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">Toolbar follows WAI-ARIA guidelines for toolbars:</p>
        <ul class="docs-list">
          <li>
            Uses <code>role="toolbar"</code> with proper
            <code>aria-orientation</code>
          </li>
          <li>Arrow keys navigate between focusable items</li>
          <li>Home/End keys navigate to first/last item</li>
          <li><code>aria-disabled</code> set on toolbar when disabled</li>
          <li>Focus is managed using roving tabindex</li>
          <li>
            <strong>Loop behavior:</strong> By default, navigation wraps from last to first and vice
            versa
          </li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/toolbar/toolbar-docs.component.ts"
        />
      </footer>
    </article>
  `,
  styles: `
    .docs-list {
      margin: 1rem 0;
      padding-left: 1.5rem;
      color: var(--docs-text-secondary);

      li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
      }
    }

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }

    /* Demo styles */
    .demo-toolbar {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem;
      background: var(--docs-bg-hover);
      border: 1px solid var(--docs-border);
      border-radius: 8px;
    }

    .demo-toolbar-group {
      display: flex;
      gap: 0.125rem;
    }

    .demo-toolbar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 4px;
      color: var(--docs-text);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .demo-toolbar-btn:hover {
      background: var(--docs-bg);
    }

    .demo-toolbar-btn.active {
      background: var(--docs-accent);
      color: white;
    }

    .demo-toolbar-btn:focus-visible {
      outline: 2px solid var(--docs-accent);
      outline-offset: 2px;
    }

    .demo-toolbar-separator {
      width: 1px;
      height: 24px;
      background: var(--docs-border);
      margin: 0 0.25rem;
    }
  `,
})
export class ToolbarDocsComponent {
  protected readonly isBold = signal(false);
  protected readonly isItalic = signal(false);
  protected readonly isUnderline = signal(false);
  protected readonly alignment = signal<'left' | 'center' | 'right'>('left');

  protected toggleBold(): void {
    this.isBold.update((v) => !v);
  }

  protected toggleItalic(): void {
    this.isItalic.update((v) => !v);
  }

  protected toggleUnderline(): void {
    this.isUnderline.update((v) => !v);
  }

  protected handleAction(action: string): void {
    console.log(`Action: ${action}`);
  }

  protected readonly importCode = `import {
  ToolbarRootDirective,
  ToolbarGroupDirective,
  ToolbarButtonDirective,
  ToolbarSeparatorDirective,
  ToolbarLinkDirective,
  ToolbarInputDirective,
} from '@copied/base-ng';

@Component({
  imports: [
    ToolbarRootDirective,
    ToolbarGroupDirective,
    ToolbarButtonDirective,
    ToolbarSeparatorDirective,
    ToolbarLinkDirective,
    ToolbarInputDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiToolbarRoot>
  <!-- Toolbar buttons -->
  <button baseUiToolbarButton>Action 1</button>
  <button baseUiToolbarButton>Action 2</button>

  <!-- Separator -->
  <div baseUiToolbarSeparator></div>

  <!-- Group of related items -->
  <div baseUiToolbarGroup>
    <button baseUiToolbarButton>Group Action 1</button>
    <button baseUiToolbarButton>Group Action 2</button>
  </div>

  <!-- Link -->
  <a baseUiToolbarLink href="/help">Help</a>

  <!-- Input -->
  <input baseUiToolbarInput type="search" placeholder="Search..." />
</div>`;

  protected readonly basicDemoCode = `<div baseUiToolbarRoot class="toolbar">
  <button baseUiToolbarButton class="toolbar-btn">
    <span class="icon">📄</span>
    New
  </button>
  <button baseUiToolbarButton class="toolbar-btn">
    <span class="icon">📂</span>
    Open
  </button>
  <button baseUiToolbarButton class="toolbar-btn">
    <span class="icon">💾</span>
    Save
  </button>

  <div baseUiToolbarSeparator class="separator"></div>

  <button baseUiToolbarButton class="toolbar-btn">
    <span class="icon">↩️</span>
    Undo
  </button>
  <button baseUiToolbarButton class="toolbar-btn">
    <span class="icon">↪️</span>
    Redo
  </button>
</div>`;

  protected readonly editorDemoCode = `@Component({
  template: \`
    <div baseUiToolbarRoot class="editor-toolbar">
      <!-- Text formatting -->
      <div baseUiToolbarGroup class="toolbar-group">
        <button
          baseUiToolbarButton
          [class.active]="isBold()"
          (click)="toggleBold()"
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          baseUiToolbarButton
          [class.active]="isItalic()"
          (click)="toggleItalic()"
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          baseUiToolbarButton
          [class.active]="isUnderline()"
          (click)="toggleUnderline()"
          title="Underline (Ctrl+U)"
        >
          <span style="text-decoration: underline">U</span>
        </button>
        <button
          baseUiToolbarButton
          [class.active]="isStrike()"
          (click)="toggleStrike()"
        >
          <span style="text-decoration: line-through">S</span>
        </button>
      </div>

      <div baseUiToolbarSeparator></div>

      <!-- Alignment -->
      <div baseUiToolbarGroup class="toolbar-group">
        <button
          baseUiToolbarButton
          [class.active]="alignment() === 'left'"
          (click)="setAlignment('left')"
        >
          ⬅️
        </button>
        <button
          baseUiToolbarButton
          [class.active]="alignment() === 'center'"
          (click)="setAlignment('center')"
        >
          ↔️
        </button>
        <button
          baseUiToolbarButton
          [class.active]="alignment() === 'right'"
          (click)="setAlignment('right')"
        >
          ➡️
        </button>
      </div>

      <div baseUiToolbarSeparator></div>

      <!-- Lists -->
      <div baseUiToolbarGroup class="toolbar-group">
        <button baseUiToolbarButton (click)="insertBulletList()">
          • List
        </button>
        <button baseUiToolbarButton (click)="insertNumberedList()">
          1. List
        </button>
      </div>

      <div baseUiToolbarSeparator></div>

      <!-- Insert -->
      <button baseUiToolbarButton (click)="insertLink()">
        🔗 Link
      </button>
      <button baseUiToolbarButton (click)="insertImage()">
        🖼️ Image
      </button>
    </div>
  \`,
})
export class EditorToolbarComponent {
  readonly isBold = signal(false);
  readonly isItalic = signal(false);
  readonly isUnderline = signal(false);
  readonly isStrike = signal(false);
  readonly alignment = signal<'left' | 'center' | 'right'>('left');

  toggleBold(): void { this.isBold.update(v => !v); }
  toggleItalic(): void { this.isItalic.update(v => !v); }
  toggleUnderline(): void { this.isUnderline.update(v => !v); }
  toggleStrike(): void { this.isStrike.update(v => !v); }
  setAlignment(align: 'left' | 'center' | 'right'): void {
    this.alignment.set(align);
  }
  insertBulletList(): void { console.log('Bullet list'); }
  insertNumberedList(): void { console.log('Numbered list'); }
  insertLink(): void { console.log('Insert link'); }
  insertImage(): void { console.log('Insert image'); }
}`;

  protected readonly toggleDemoCode = `<div baseUiToolbarRoot class="toolbar">
  <!-- Font size -->
  <div baseUiToggleGroupRoot [(value)]="fontSize" class="toggle-group">
    <button baseUiToggleRoot value="12">12</button>
    <button baseUiToggleRoot value="14">14</button>
    <button baseUiToggleRoot value="16">16</button>
    <button baseUiToggleRoot value="18">18</button>
  </div>

  <div baseUiToolbarSeparator></div>

  <!-- View mode -->
  <div baseUiToggleGroupRoot [(value)]="viewMode" class="toggle-group">
    <button baseUiToggleRoot value="edit">Edit</button>
    <button baseUiToggleRoot value="preview">Preview</button>
    <button baseUiToggleRoot value="split">Split</button>
  </div>
</div>`;

  protected readonly groupDemoCode = `<div baseUiToolbarRoot class="toolbar">
  <!-- File operations -->
  <div baseUiToolbarGroup class="toolbar-group">
    <button baseUiToolbarButton>New</button>
    <button baseUiToolbarButton>Open</button>
    <button baseUiToolbarButton>Save</button>
  </div>

  <div baseUiToolbarSeparator></div>

  <!-- Edit operations -->
  <div baseUiToolbarGroup class="toolbar-group">
    <button baseUiToolbarButton>Cut</button>
    <button baseUiToolbarButton>Copy</button>
    <button baseUiToolbarButton>Paste</button>
  </div>

  <div baseUiToolbarSeparator></div>

  <!-- Format operations -->
  <div baseUiToolbarGroup class="toolbar-group">
    <button baseUiToolbarButton>Bold</button>
    <button baseUiToolbarButton>Italic</button>
    <button baseUiToolbarButton>Underline</button>
  </div>
</div>`;

  protected readonly verticalDemoCode = `<!-- Vertical toolbar for drawing app -->
<div baseUiToolbarRoot orientation="vertical" class="vertical-toolbar">
  <button baseUiToolbarButton class="tool-btn" title="Select">
    <span class="icon">🔲</span>
  </button>
  <button baseUiToolbarButton class="tool-btn" title="Move">
    <span class="icon">✋</span>
  </button>

  <div baseUiToolbarSeparator></div>

  <button baseUiToolbarButton class="tool-btn" title="Pencil">
    <span class="icon">✏️</span>
  </button>
  <button baseUiToolbarButton class="tool-btn" title="Brush">
    <span class="icon">🖌️</span>
  </button>
  <button baseUiToolbarButton class="tool-btn" title="Eraser">
    <span class="icon">🧹</span>
  </button>

  <div baseUiToolbarSeparator></div>

  <button baseUiToolbarButton class="tool-btn" title="Rectangle">
    <span class="icon">⬜</span>
  </button>
  <button baseUiToolbarButton class="tool-btn" title="Circle">
    <span class="icon">⭕</span>
  </button>
  <button baseUiToolbarButton class="tool-btn" title="Line">
    <span class="icon">📏</span>
  </button>

  <div baseUiToolbarSeparator></div>

  <button baseUiToolbarButton class="tool-btn" title="Text">
    <span class="icon">🔤</span>
  </button>
</div>`;

  protected readonly inputDemoCode = `<div baseUiToolbarRoot class="toolbar">
  <button baseUiToolbarButton>Search</button>

  <input
    baseUiToolbarInput
    type="search"
    placeholder="Search documents..."
    class="toolbar-search"
  />

  <div baseUiToolbarSeparator></div>

  <label class="toolbar-label">
    Zoom:
    <input
      baseUiToolbarInput
      type="range"
      min="50"
      max="200"
      [value]="zoom"
      (input)="updateZoom($event)"
      class="toolbar-slider"
    />
    <span>{{ zoom }}%</span>
  </label>
</div>`;

  protected readonly disabledDemoCode = `<!-- Disable entire toolbar -->
<div baseUiToolbarRoot [disabled]="isLocked()" class="toolbar">
  <button baseUiToolbarButton>Edit</button>
  <button baseUiToolbarButton>Save</button>
  <button baseUiToolbarButton>Delete</button>
</div>

<!-- Disable individual buttons -->
<div baseUiToolbarRoot class="toolbar">
  <button baseUiToolbarButton>Cut</button>
  <button baseUiToolbarButton>Copy</button>
  <button baseUiToolbarButton [disabled]="clipboardEmpty()">
    Paste
  </button>

  <div baseUiToolbarSeparator></div>

  <button baseUiToolbarButton [disabled]="!canUndo()">Undo</button>
  <button baseUiToolbarButton [disabled]="!canRedo()">Redo</button>
</div>`;

  protected readonly stylingCode = `/* Toolbar container */
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* Vertical toolbar */
[baseUiToolbarRoot][data-orientation="vertical"] {
  flex-direction: column;
  width: fit-content;
}

/* Toolbar button */
.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: none;
  background: transparent;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.toolbar-btn:hover {
  background: #e5e7eb;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}

.toolbar-btn.active {
  background: #0066ff;
  color: white;
}

.toolbar-btn[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Separator */
.separator {
  width: 1px;
  height: 1.5rem;
  background: #d1d5db;
  margin: 0 0.25rem;
}

[data-orientation="vertical"] .separator {
  width: 100%;
  height: 1px;
  margin: 0.25rem 0;
}

/* Toolbar group */
.toolbar-group {
  display: flex;
  gap: 0.125rem;
}

[data-orientation="vertical"] .toolbar-group {
  flex-direction: column;
}

/* Toolbar input */
.toolbar-search {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* Disabled toolbar */
[baseUiToolbarRoot][data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}`;

  protected readonly tailwindCode = `<div
  baseUiToolbarRoot
  class="flex items-center gap-1 p-2 bg-gray-100 border border-gray-200
         rounded-lg data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
>
  <button
    baseUiToolbarButton
    class="flex items-center gap-1 px-3 py-2 rounded text-sm text-gray-700
           hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-blue-600
           focus-visible:outline-offset-2
           data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
  >
    <span>📄</span>
    New
  </button>

  <button
    baseUiToolbarButton
    class="flex items-center gap-1 px-3 py-2 rounded text-sm text-gray-700
           hover:bg-gray-200"
  >
    <span>📂</span>
    Open
  </button>

  <button
    baseUiToolbarButton
    class="flex items-center gap-1 px-3 py-2 rounded text-sm text-gray-700
           hover:bg-gray-200"
  >
    <span>💾</span>
    Save
  </button>

  <div
    baseUiToolbarSeparator
    class="w-px h-6 bg-gray-300 mx-1"
  ></div>

  <div baseUiToolbarGroup class="flex gap-0.5">
    <button
      baseUiToolbarButton
      class="px-3 py-2 rounded text-sm font-bold
             hover:bg-gray-200 data-[pressed]:bg-blue-600 data-[pressed]:text-white"
    >
      B
    </button>
    <button
      baseUiToolbarButton
      class="px-3 py-2 rounded text-sm italic
             hover:bg-gray-200"
    >
      I
    </button>
    <button
      baseUiToolbarButton
      class="px-3 py-2 rounded text-sm underline
             hover:bg-gray-200"
    >
      U
    </button>
  </div>

  <div baseUiToolbarSeparator class="w-px h-6 bg-gray-300 mx-1"></div>

  <input
    baseUiToolbarInput
    type="search"
    placeholder="Search..."
    class="px-3 py-1.5 border border-gray-300 rounded text-sm
           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  />
</div>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the toolbar is disabled.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'The orientation of the toolbar.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'Whether to loop focus when navigating with keyboard (wrap from last to first).',
    },
  ];

  protected readonly buttonInputProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'The orientation of the toolbar.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the toolbar or button is disabled.',
    },
    {
      name: 'data-pressed',
      type: 'string',
      description: 'Present on toggle buttons when pressed.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-toolbar-root',
      type: 'class',
      description: 'Applied to the toolbar container.',
    },
    {
      name: 'base-ui-toolbar-root-horizontal',
      type: 'class',
      description: 'Applied when orientation is horizontal.',
    },
    {
      name: 'base-ui-toolbar-root-vertical',
      type: 'class',
      description: 'Applied when orientation is vertical.',
    },
    {
      name: 'base-ui-toolbar-root-disabled',
      type: 'class',
      description: 'Applied when the toolbar is disabled.',
    },
    {
      name: 'base-ui-toolbar-group',
      type: 'class',
      description: 'Applied to toolbar groups.',
    },
    {
      name: 'base-ui-toolbar-button',
      type: 'class',
      description: 'Applied to toolbar buttons.',
    },
    {
      name: 'base-ui-toolbar-separator',
      type: 'class',
      description: 'Applied to separators.',
    },
    {
      name: 'base-ui-toolbar-link',
      type: 'class',
      description: 'Applied to links.',
    },
    {
      name: 'base-ui-toolbar-input',
      type: 'class',
      description: 'Applied to inputs.',
    },
  ];

  protected readonly keyboardShortcuts: PropDefinition[] = [
    {
      name: 'ArrowRight',
      type: 'key',
      description: 'Move focus to the next item (horizontal).',
    },
    {
      name: 'ArrowLeft',
      type: 'key',
      description: 'Move focus to the previous item (horizontal).',
    },
    {
      name: 'ArrowDown',
      type: 'key',
      description: 'Move focus to the next item (vertical).',
    },
    {
      name: 'ArrowUp',
      type: 'key',
      description: 'Move focus to the previous item (vertical).',
    },
    {
      name: 'Home',
      type: 'key',
      description: 'Move focus to the first item.',
    },
    {
      name: 'End',
      type: 'key',
      description: 'Move focus to the last item.',
    },
    {
      name: 'Enter / Space',
      type: 'key',
      description: 'Activate the focused button or toggle.',
    },
  ];
}

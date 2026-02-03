import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  ContextMenuRootDirective,
  ContextMenuTriggerDirective,
  ContextMenuPopupDirective,
  ContextMenuItemDirective,
  ContextMenuSeparatorDirective,
} from '@base-ng/ui';

@Component({
  selector: 'docs-context-menu',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    ContextMenuRootDirective,
    ContextMenuTriggerDirective,
    ContextMenuPopupDirective,
    ContextMenuItemDirective,
    ContextMenuSeparatorDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Context Menu</h1>
        <p class="docs-description">
          A menu that opens on right-click or long-press, positioned at the
          cursor location. Commonly used for providing contextual actions on
          elements like files, images, or text selections.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <h2 class="docs-section-title">Live Demo</h2>
        <docs-demo [code]="basicDemoCode">
          <div baseUiContextMenuRoot [(open)]="isOpen" class="demo-context-menu">
            <div baseUiContextMenuTrigger class="trigger-area">
              <svg viewBox="0 0 24 24" width="24" height="24" class="trigger-icon">
                <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" fill="currentColor"/>
              </svg>
              <span>Right-click anywhere in this area</span>
              <span class="hint">or long-press on touch devices</span>
            </div>

            <div baseUiContextMenuPopup class="context-popup">
              <div baseUiContextMenuItem class="context-item" (itemClick)="handleAction('cut')">
                <svg viewBox="0 0 16 16" width="14" height="14">
                  <path d="M4 1.5a2.5 2.5 0 1 0 1.7 4.3L7.9 8l-2.2 2.2A2.5 2.5 0 1 0 4 14.5a2.5 2.5 0 0 0 1.7-4.3L8 8l5.5 5.5.7-.7-5.5-5.5L14.5 2l-.7-.7-5.5 5.5-2.2-2.2A2.5 2.5 0 0 0 4 1.5zM3 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" fill="currentColor"/>
                </svg>
                Cut
                <span class="shortcut">Ctrl+X</span>
              </div>
              <div baseUiContextMenuItem class="context-item" (itemClick)="handleAction('copy')">
                <svg viewBox="0 0 16 16" width="14" height="14">
                  <path d="M5 3H3v10h8v-2H5V3zm0 0V1h10v10h-2V3H5z" stroke="currentColor" fill="none"/>
                </svg>
                Copy
                <span class="shortcut">Ctrl+C</span>
              </div>
              <div baseUiContextMenuItem class="context-item" (itemClick)="handleAction('paste')">
                <svg viewBox="0 0 16 16" width="14" height="14">
                  <path d="M4 2v1H2v11h10V3h-2V2H4zm1 1h4v1H5V3zm-2 2h8v8H3V5z" fill="currentColor"/>
                </svg>
                Paste
                <span class="shortcut">Ctrl+V</span>
              </div>
              <div baseUiContextMenuSeparator class="context-separator"></div>
              <div baseUiContextMenuItem class="context-item context-item-danger" (itemClick)="handleAction('delete')">
                <svg viewBox="0 0 16 16" width="14" height="14">
                  <path d="M3 4h10M6 4V2h4v2M5 4v9h6V4" stroke="currentColor" fill="none"/>
                </svg>
                Delete
              </div>
            </div>
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
          The Context Menu uses a composition pattern with multiple directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic context menu</h3>
        <p class="docs-paragraph">
          Right-click on an element to open the context menu.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">File browser context menu</h3>
        <p class="docs-paragraph">
          A typical file browser context menu with common actions.
        </p>
        <docs-code-block [code]="fileDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">With groups and labels</h3>
        <p class="docs-paragraph">
          Organize menu items into labeled groups.
        </p>
        <docs-code-block [code]="groupDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With checkbox items</h3>
        <p class="docs-paragraph">
          Use checkbox items for togglable options.
        </p>
        <docs-code-block [code]="checkboxDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">With radio items</h3>
        <p class="docs-paragraph">
          Use radio items for single-selection options.
        </p>
        <docs-code-block [code]="radioDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Disabled items</h3>
        <p class="docs-paragraph">
          Disable items that are not currently available.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Text selection context menu</h3>
        <p class="docs-paragraph">
          Show a context menu for text selections.
        </p>
        <docs-code-block [code]="textSelectionDemoCode" language="typescript" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Context Menu parts using CSS:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Root Outputs" [props]="rootOutputProps" />
        <docs-props-table title="Positioner Inputs" [props]="positionerProps" />
        <docs-props-table title="Item Inputs" [props]="itemInputProps" />
        <docs-props-table title="Item Outputs" [props]="itemOutputProps" />
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
        <p class="docs-paragraph">
          Context Menu follows WAI-ARIA guidelines for menus:
        </p>
        <ul class="docs-list">
          <li>
            Popup has <code>role="menu"</code> with proper
            <code>aria-labelledby</code>
          </li>
          <li>
            Items have <code>role="menuitem"</code> with
            <code>aria-disabled</code> when disabled
          </li>
          <li>Opens on right-click or long-press (500ms) for touch devices</li>
          <li>Closes on Escape, outside click, or item selection</li>
          <li>Arrow keys navigate between items</li>
          <li>Enter/Space activates the highlighted item</li>
          <li>
            <strong>Touch support:</strong> Long-press on touch devices triggers
            the menu after 500ms
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/context-menu/context-menu-docs.component.ts"
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
    .demo-context-menu {
      display: block;
    }

    .trigger-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 3rem 2rem;
      background: var(--docs-bg-hover);
      border: 2px dashed var(--docs-border);
      border-radius: 12px;
      cursor: context-menu;
      text-align: center;
      color: var(--docs-text-secondary);
      transition: all 0.15s ease;
    }

    .trigger-area:hover {
      background: var(--docs-bg);
      border-color: var(--docs-accent);
    }

    .trigger-icon {
      opacity: 0.5;
    }

    .hint {
      font-size: 0.75rem;
      opacity: 0.6;
    }

    .context-popup {
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      padding: 0.25rem;
      min-width: 200px;
      outline: none;
      animation: contextIn 0.15s ease;
    }

    @keyframes contextIn {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .context-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      font-size: 0.875rem;
      color: var(--docs-text);
      transition: background 0.1s ease;
    }

    .context-item:hover,
    .context-item[data-highlighted] {
      background: var(--docs-bg-hover);
    }

    .context-item svg {
      opacity: 0.6;
    }

    .context-item-danger {
      color: #dc2626;
    }

    .context-item-danger:hover,
    .context-item-danger[data-highlighted] {
      background: rgba(220, 38, 38, 0.1);
    }

    .shortcut {
      margin-left: auto;
      font-size: 0.75rem;
      color: var(--docs-text-tertiary);
    }

    .context-separator {
      height: 1px;
      background: var(--docs-border);
      margin: 0.25rem 0;
    }
  `,
})
export class ContextMenuDocsComponent {
  protected readonly isOpen = signal(false);

  protected handleAction(action: string): void {
    console.log(`Action: ${action}`);
    this.isOpen.set(false);
  }

  protected readonly importCode = `import {
  ContextMenuRootDirective,
  ContextMenuTriggerDirective,
  ContextMenuPopupDirective,
  ContextMenuItemDirective,
  ContextMenuSeparatorDirective,
} from '@base-ng/ui';

@Component({
  imports: [
    ContextMenuRootDirective,
    ContextMenuTriggerDirective,
    ContextMenuPopupDirective,
    ContextMenuItemDirective,
    ContextMenuSeparatorDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiContextMenuRoot>
  <!-- Trigger area (right-click zone) -->
  <div baseUiContextMenuTrigger>
    Right-click me
  </div>

  <!-- Positioner (positions at cursor) -->
  <div baseUiContextMenuPositioner>
    <!-- Popup container -->
    <div baseUiContextMenuPopup role="menu">
      <div baseUiContextMenuItem>Cut</div>
      <div baseUiContextMenuItem>Copy</div>
      <div baseUiContextMenuItem>Paste</div>
      <div baseUiContextMenuSeparator></div>
      <div baseUiContextMenuItem>Delete</div>
    </div>
  </div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiContextMenuRoot class="context-menu-container">
  <div baseUiContextMenuTrigger class="trigger-area">
    Right-click anywhere in this area
  </div>

  <div baseUiContextMenuPositioner>
    <div baseUiContextMenuPopup role="menu" class="context-menu">
      <div baseUiContextMenuItem (itemClick)="cut()" class="menu-item">
        <span class="icon">✂️</span>
        Cut
        <span class="shortcut">Ctrl+X</span>
      </div>
      <div baseUiContextMenuItem (itemClick)="copy()" class="menu-item">
        <span class="icon">📋</span>
        Copy
        <span class="shortcut">Ctrl+C</span>
      </div>
      <div baseUiContextMenuItem (itemClick)="paste()" class="menu-item">
        <span class="icon">📄</span>
        Paste
        <span class="shortcut">Ctrl+V</span>
      </div>
    </div>
  </div>
</div>`;

  protected readonly fileDemoCode = `@Component({
  template: \`
    <div baseUiContextMenuRoot>
      <div baseUiContextMenuTrigger class="file-item">
        <span class="file-icon">📁</span>
        <span>{{ file.name }}</span>
      </div>

      <div baseUiContextMenuPositioner>
        <div baseUiContextMenuPopup role="menu" class="context-menu">
          <div baseUiContextMenuItem (itemClick)="open()">
            Open
          </div>
          <div baseUiContextMenuItem (itemClick)="openWith()">
            Open with...
          </div>

          <div baseUiContextMenuSeparator></div>

          <div baseUiContextMenuItem (itemClick)="cut()">Cut</div>
          <div baseUiContextMenuItem (itemClick)="copy()">Copy</div>

          <div baseUiContextMenuSeparator></div>

          <div baseUiContextMenuItem (itemClick)="rename()">
            Rename
          </div>
          <div
            baseUiContextMenuItem
            (itemClick)="delete()"
            class="danger-item"
          >
            Delete
          </div>

          <div baseUiContextMenuSeparator></div>

          <div baseUiContextMenuItem (itemClick)="properties()">
            Properties
          </div>
        </div>
      </div>
    </div>
  \`,
})
export class FileContextMenuComponent {
  file = { name: 'Documents' };

  open(): void { console.log('Opening file'); }
  openWith(): void { console.log('Open with...'); }
  cut(): void { console.log('Cut'); }
  copy(): void { console.log('Copy'); }
  rename(): void { console.log('Rename'); }
  delete(): void { console.log('Delete'); }
  properties(): void { console.log('Properties'); }
}`;

  protected readonly groupDemoCode = `<div baseUiContextMenuRoot>
  <div baseUiContextMenuTrigger>Right-click me</div>

  <div baseUiContextMenuPositioner>
    <div baseUiContextMenuPopup role="menu" class="context-menu">
      <!-- Edit actions group -->
      <div baseUiContextMenuGroup>
        <div baseUiContextMenuGroupLabel>Edit</div>
        <div baseUiContextMenuItem>Cut</div>
        <div baseUiContextMenuItem>Copy</div>
        <div baseUiContextMenuItem>Paste</div>
      </div>

      <div baseUiContextMenuSeparator></div>

      <!-- View actions group -->
      <div baseUiContextMenuGroup>
        <div baseUiContextMenuGroupLabel>View</div>
        <div baseUiContextMenuItem>Zoom In</div>
        <div baseUiContextMenuItem>Zoom Out</div>
        <div baseUiContextMenuItem>Reset Zoom</div>
      </div>
    </div>
  </div>
</div>`;

  protected readonly checkboxDemoCode = `@Component({
  template: \`
    <div baseUiContextMenuRoot>
      <div baseUiContextMenuTrigger class="view-options-trigger">
        View Options (right-click)
      </div>

      <div baseUiContextMenuPositioner>
        <div baseUiContextMenuPopup role="menu" class="context-menu">
          <div baseUiContextMenuGroupLabel>Show</div>

          <div
            baseUiContextMenuCheckboxItem
            [checked]="showHidden()"
            (checkedChange)="showHidden.set($event)"
          >
            Hidden Files
          </div>
          <div
            baseUiContextMenuCheckboxItem
            [checked]="showExtensions()"
            (checkedChange)="showExtensions.set($event)"
          >
            File Extensions
          </div>
          <div
            baseUiContextMenuCheckboxItem
            [checked]="showThumbnails()"
            (checkedChange)="showThumbnails.set($event)"
          >
            Thumbnails
          </div>
        </div>
      </div>
    </div>
  \`,
})
export class ViewOptionsContextMenuComponent {
  readonly showHidden = signal(false);
  readonly showExtensions = signal(true);
  readonly showThumbnails = signal(true);
}`;

  protected readonly radioDemoCode = `@Component({
  template: \`
    <div baseUiContextMenuRoot>
      <div baseUiContextMenuTrigger>Sort Options (right-click)</div>

      <div baseUiContextMenuPositioner>
        <div baseUiContextMenuPopup role="menu" class="context-menu">
          <div baseUiContextMenuGroupLabel>Sort By</div>

          <div baseUiContextMenuRadioGroup [(value)]="sortBy">
            <div baseUiContextMenuRadioItem value="name">Name</div>
            <div baseUiContextMenuRadioItem value="date">Date Modified</div>
            <div baseUiContextMenuRadioItem value="size">Size</div>
            <div baseUiContextMenuRadioItem value="type">Type</div>
          </div>

          <div baseUiContextMenuSeparator></div>

          <div baseUiContextMenuRadioGroup [(value)]="sortOrder">
            <div baseUiContextMenuRadioItem value="asc">Ascending</div>
            <div baseUiContextMenuRadioItem value="desc">Descending</div>
          </div>
        </div>
      </div>
    </div>
  \`,
})
export class SortContextMenuComponent {
  readonly sortBy = signal('name');
  readonly sortOrder = signal('asc');
}`;

  protected readonly disabledDemoCode = `<div baseUiContextMenuRoot>
  <div baseUiContextMenuTrigger>Right-click me</div>

  <div baseUiContextMenuPositioner>
    <div baseUiContextMenuPopup role="menu" class="context-menu">
      <div baseUiContextMenuItem>Cut</div>
      <div baseUiContextMenuItem>Copy</div>
      <!-- Disabled when clipboard is empty -->
      <div baseUiContextMenuItem [disabled]="clipboardEmpty()">
        Paste
      </div>

      <div baseUiContextMenuSeparator></div>

      <!-- Disabled for read-only files -->
      <div baseUiContextMenuItem [disabled]="file.readOnly">
        Rename
      </div>
      <div baseUiContextMenuItem [disabled]="file.readOnly">
        Delete
      </div>
    </div>
  </div>
</div>`;

  protected readonly textSelectionDemoCode = `@Component({
  template: \`
    <div baseUiContextMenuRoot>
      <div
        baseUiContextMenuTrigger
        class="text-content"
        (mouseup)="checkSelection()"
      >
        Select some text in this paragraph and right-click to see
        text-specific options. The context menu will show different
        actions based on whether text is selected.
      </div>

      <div baseUiContextMenuPositioner>
        <div baseUiContextMenuPopup role="menu" class="context-menu">
          @if (hasSelection()) {
            <div baseUiContextMenuItem (itemClick)="copySelection()">
              Copy Selection
            </div>
            <div baseUiContextMenuItem (itemClick)="searchSelection()">
              Search "{{ getSelectionText() }}"
            </div>
            <div baseUiContextMenuSeparator></div>
          }

          <div baseUiContextMenuItem (itemClick)="selectAll()">
            Select All
          </div>
        </div>
      </div>
    </div>
  \`,
})
export class TextSelectionContextMenuComponent {
  readonly hasSelection = signal(false);
  private selectionText = '';

  checkSelection(): void {
    const selection = window.getSelection();
    this.selectionText = selection?.toString() || '';
    this.hasSelection.set(this.selectionText.length > 0);
  }

  getSelectionText(): string {
    return this.selectionText.slice(0, 20) + (this.selectionText.length > 20 ? '...' : '');
  }

  copySelection(): void {
    navigator.clipboard.writeText(this.selectionText);
  }

  searchSelection(): void {
    window.open(\`https://www.google.com/search?q=\${encodeURIComponent(this.selectionText)}\`);
  }

  selectAll(): void {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.text-content')!);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}`;

  protected readonly stylingCode = `/* Trigger area */
.trigger-area {
  padding: 2rem;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: context-menu;
  text-align: center;
  color: #6b7280;
}

/* Context menu popup */
.context-menu {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  min-width: 180px;
}

/* Menu item */
.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #111827;
}

/* Highlighted item */
[baseUiContextMenuItem][data-highlighted] {
  background: #f3f4f6;
  outline: none;
}

/* Disabled item */
[baseUiContextMenuItem][data-disabled] {
  color: #9ca3af;
  cursor: not-allowed;
}

/* Danger item */
.danger-item {
  color: #ef4444;
}

.danger-item[data-highlighted] {
  background: #fef2f2;
}

/* Icon and shortcut */
.icon {
  width: 1rem;
  text-align: center;
}

.shortcut {
  margin-left: auto;
  color: #9ca3af;
  font-size: 0.75rem;
}

/* Separator */
[baseUiContextMenuSeparator] {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}

/* Group label */
[baseUiContextMenuGroupLabel] {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`;

  protected readonly tailwindCode = `<div baseUiContextMenuRoot>
  <div
    baseUiContextMenuTrigger
    class="p-8 bg-gray-100 border-2 border-dashed border-gray-300
           rounded-lg cursor-context-menu text-center text-gray-500"
  >
    Right-click anywhere in this area
  </div>

  <div baseUiContextMenuPositioner>
    <div
      baseUiContextMenuPopup
      role="menu"
      class="bg-white rounded-lg shadow-xl p-1 min-w-[180px]"
    >
      <div
        baseUiContextMenuItem
        class="flex items-center gap-2 px-3 py-2 rounded text-sm
               text-gray-900 cursor-pointer
               data-[highlighted]:bg-gray-100
               data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed"
      >
        <span class="w-4">✂️</span>
        Cut
        <span class="ml-auto text-xs text-gray-400">Ctrl+X</span>
      </div>

      <div
        baseUiContextMenuItem
        class="flex items-center gap-2 px-3 py-2 rounded text-sm
               text-gray-900 cursor-pointer
               data-[highlighted]:bg-gray-100"
      >
        <span class="w-4">📋</span>
        Copy
        <span class="ml-auto text-xs text-gray-400">Ctrl+C</span>
      </div>

      <div
        baseUiContextMenuItem
        class="flex items-center gap-2 px-3 py-2 rounded text-sm
               text-gray-900 cursor-pointer
               data-[highlighted]:bg-gray-100"
      >
        <span class="w-4">📄</span>
        Paste
        <span class="ml-auto text-xs text-gray-400">Ctrl+V</span>
      </div>

      <div
        baseUiContextMenuSeparator
        class="h-px bg-gray-200 my-1"
      ></div>

      <div
        baseUiContextMenuItem
        class="flex items-center gap-2 px-3 py-2 rounded text-sm
               text-red-500 cursor-pointer
               data-[highlighted]:bg-red-50"
      >
        <span class="w-4">🗑️</span>
        Delete
      </div>
    </div>
  </div>
</div>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Controlled open state. Supports two-way binding.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<ContextMenuOpenChangeEventDetails>',
      description:
        'Emitted when the open state changes. Includes reason (context-menu, long-press, escape-key, outside-press, item-press).',
    },
  ];

  protected readonly positionerProps: PropDefinition[] = [
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
      description: 'The side of the anchor where the menu appears.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      default: "'start'",
      description: 'The alignment of the menu relative to the anchor.',
    },
    {
      name: 'sideOffset',
      type: 'number',
      default: '0',
      description: 'Offset from the anchor along the side axis.',
    },
    {
      name: 'alignOffset',
      type: 'number',
      default: '0',
      description: 'Offset from the anchor along the align axis.',
    },
  ];

  protected readonly itemInputProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the item is disabled.',
    },
    {
      name: 'closeOnClick',
      type: 'boolean',
      default: 'true',
      description: 'Whether clicking the item closes the menu.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Label for keyboard navigation (typeahead).',
    },
  ];

  protected readonly itemOutputProps: PropDefinition[] = [
    {
      name: 'itemClick',
      type: 'EventEmitter<MouseEvent>',
      description: 'Emitted when the item is clicked.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-state',
      type: "'open' | 'closed'",
      description: 'The open state of the context menu.',
    },
    {
      name: 'data-side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      description: 'The side where the menu is positioned.',
    },
    {
      name: 'data-align',
      type: "'start' | 'center' | 'end'",
      description: 'The alignment of the menu.',
    },
    {
      name: 'data-highlighted',
      type: 'string',
      description: 'Present on the currently highlighted item.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present on disabled items.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-context-menu-root',
      type: 'class',
      description: 'Applied to the root container.',
    },
    {
      name: 'base-ui-context-menu-trigger',
      type: 'class',
      description: 'Applied to the trigger area.',
    },
    {
      name: 'base-ui-context-menu-positioner',
      type: 'class',
      description: 'Applied to the positioner element.',
    },
    {
      name: 'base-ui-context-menu-popup',
      type: 'class',
      description: 'Applied to the popup container.',
    },
    {
      name: 'base-ui-context-menu-item',
      type: 'class',
      description: 'Applied to menu items.',
    },
    {
      name: 'base-ui-context-menu-item-highlighted',
      type: 'class',
      description: 'Applied to the highlighted item.',
    },
    {
      name: 'base-ui-context-menu-item-disabled',
      type: 'class',
      description: 'Applied to disabled items.',
    },
    {
      name: 'base-ui-context-menu-separator',
      type: 'class',
      description: 'Applied to separator elements.',
    },
  ];

  protected readonly keyboardShortcuts: PropDefinition[] = [
    {
      name: 'ArrowDown',
      type: 'key',
      description: 'Move focus to the next menu item.',
    },
    {
      name: 'ArrowUp',
      type: 'key',
      description: 'Move focus to the previous menu item.',
    },
    {
      name: 'Home',
      type: 'key',
      description: 'Move focus to the first menu item.',
    },
    {
      name: 'End',
      type: 'key',
      description: 'Move focus to the last menu item.',
    },
    {
      name: 'Enter / Space',
      type: 'key',
      description: 'Activate the highlighted menu item.',
    },
    {
      name: 'Escape',
      type: 'key',
      description: 'Close the context menu.',
    },
  ];
}

import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-menubar',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Menubar</h1>
        <p class="docs-description">
          A horizontal or vertical bar containing menu triggers. Commonly used
          for application navigation with dropdown menus, similar to the menu
          bar in desktop applications.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Menubar and Menu directives from the package:
        </p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Menubar contains multiple Menu components, each with its own
          trigger and popup:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic menubar</h3>
        <p class="docs-paragraph">
          A horizontal menubar with multiple dropdown menus.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Application menubar</h3>
        <p class="docs-paragraph">
          A full-featured application menubar with File, Edit, View menus.
        </p>
        <docs-code-block [code]="appDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Vertical orientation</h3>
        <p class="docs-paragraph">
          Create a vertical menubar for sidebar navigation.
        </p>
        <docs-code-block [code]="verticalDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With icons and shortcuts</h3>
        <p class="docs-paragraph">
          Add icons and keyboard shortcuts to menu items.
        </p>
        <docs-code-block [code]="iconsDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With submenus</h3>
        <p class="docs-paragraph">
          Nest menus for hierarchical navigation.
        </p>
        <docs-code-block [code]="submenuDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Disable the entire menubar or individual menus.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Menubar and its menus using CSS:
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
        <docs-props-table title="Menubar Inputs" [props]="menubarInputProps" />
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
          Menubar follows WAI-ARIA guidelines for menubars:
        </p>
        <ul class="docs-list">
          <li>
            Uses <code>role="menubar"</code> with proper
            <code>aria-orientation</code>
          </li>
          <li>
            Child menus use <code>role="menu"</code> with
            <code>role="menuitem"</code> items
          </li>
          <li>Arrow keys navigate between menu triggers</li>
          <li>
            Opening a menu while another is open automatically closes the
            previous menu
          </li>
          <li>
            Focus follows the active menu trigger for seamless keyboard
            navigation
          </li>
          <li>
            <code>aria-disabled</code> set when disabled
          </li>
          <li>
            <strong>Loop behavior:</strong> By default, navigation wraps from
            last to first and vice versa
          </li>
        </ul>
      </section>
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
  `,
})
export class MenubarDocsComponent {
  protected readonly importCode = `import {
  MenubarDirective,
  MenuRootDirective,
  MenuTriggerDirective,
  MenuPositionerDirective,
  MenuPopupDirective,
  MenuItemDirective,
  MenuSeparatorDirective,
  MenuGroupDirective,
  MenuGroupLabelDirective,
} from '@base-ng/ui/menubar';

@Component({
  imports: [
    MenubarDirective,
    MenuRootDirective,
    MenuTriggerDirective,
    MenuPositionerDirective,
    MenuPopupDirective,
    MenuItemDirective,
    MenuSeparatorDirective,
    MenuGroupDirective,
    MenuGroupLabelDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<nav baseUiMenubar>
  <!-- First menu -->
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger>File</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu">
        <div baseUiMenuItem>New</div>
        <div baseUiMenuItem>Open</div>
        <div baseUiMenuItem>Save</div>
      </div>
    </div>
  </div>

  <!-- Second menu -->
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger>Edit</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu">
        <div baseUiMenuItem>Undo</div>
        <div baseUiMenuItem>Redo</div>
        <div baseUiMenuItem>Cut</div>
      </div>
    </div>
  </div>
</nav>`;

  protected readonly basicDemoCode = `<nav baseUiMenubar class="menubar">
  <!-- File menu -->
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">File</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem class="menu-item">New File</div>
        <div baseUiMenuItem class="menu-item">Open File</div>
        <div baseUiMenuItem class="menu-item">Save</div>
        <div baseUiMenuSeparator class="menu-separator"></div>
        <div baseUiMenuItem class="menu-item">Exit</div>
      </div>
    </div>
  </div>

  <!-- Edit menu -->
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">Edit</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem class="menu-item">Undo</div>
        <div baseUiMenuItem class="menu-item">Redo</div>
        <div baseUiMenuSeparator class="menu-separator"></div>
        <div baseUiMenuItem class="menu-item">Cut</div>
        <div baseUiMenuItem class="menu-item">Copy</div>
        <div baseUiMenuItem class="menu-item">Paste</div>
      </div>
    </div>
  </div>

  <!-- View menu -->
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">View</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem class="menu-item">Zoom In</div>
        <div baseUiMenuItem class="menu-item">Zoom Out</div>
        <div baseUiMenuItem class="menu-item">Reset Zoom</div>
      </div>
    </div>
  </div>
</nav>`;

  protected readonly appDemoCode = `@Component({
  template: \`
    <nav baseUiMenubar class="menubar">
      <!-- File menu -->
      <div baseUiMenuRoot>
        <button baseUiMenuTrigger class="menu-trigger">File</button>
        <div baseUiMenuPositioner>
          <div baseUiMenuPopup role="menu" class="menu-popup">
            <div baseUiMenuItem (itemClick)="newFile()">New File</div>
            <div baseUiMenuItem (itemClick)="newWindow()">New Window</div>
            <div baseUiMenuSeparator></div>
            <div baseUiMenuItem (itemClick)="openFile()">Open...</div>
            <div baseUiMenuItem (itemClick)="openRecent()">Open Recent</div>
            <div baseUiMenuSeparator></div>
            <div baseUiMenuItem (itemClick)="save()">Save</div>
            <div baseUiMenuItem (itemClick)="saveAs()">Save As...</div>
            <div baseUiMenuSeparator></div>
            <div baseUiMenuItem (itemClick)="exit()">Exit</div>
          </div>
        </div>
      </div>

      <!-- Edit menu -->
      <div baseUiMenuRoot>
        <button baseUiMenuTrigger class="menu-trigger">Edit</button>
        <div baseUiMenuPositioner>
          <div baseUiMenuPopup role="menu" class="menu-popup">
            <div baseUiMenuItem (itemClick)="undo()" [disabled]="!canUndo()">
              Undo
            </div>
            <div baseUiMenuItem (itemClick)="redo()" [disabled]="!canRedo()">
              Redo
            </div>
            <div baseUiMenuSeparator></div>
            <div baseUiMenuItem (itemClick)="cut()">Cut</div>
            <div baseUiMenuItem (itemClick)="copy()">Copy</div>
            <div baseUiMenuItem (itemClick)="paste()">Paste</div>
            <div baseUiMenuSeparator></div>
            <div baseUiMenuItem (itemClick)="selectAll()">Select All</div>
          </div>
        </div>
      </div>

      <!-- View menu -->
      <div baseUiMenuRoot>
        <button baseUiMenuTrigger class="menu-trigger">View</button>
        <div baseUiMenuPositioner>
          <div baseUiMenuPopup role="menu" class="menu-popup">
            <div baseUiMenuCheckboxItem
              [checked]="showToolbar()"
              (checkedChange)="showToolbar.set($event)"
            >
              Toolbar
            </div>
            <div baseUiMenuCheckboxItem
              [checked]="showStatusBar()"
              (checkedChange)="showStatusBar.set($event)"
            >
              Status Bar
            </div>
            <div baseUiMenuSeparator></div>
            <div baseUiMenuItem (itemClick)="zoomIn()">Zoom In</div>
            <div baseUiMenuItem (itemClick)="zoomOut()">Zoom Out</div>
            <div baseUiMenuItem (itemClick)="resetZoom()">Reset Zoom</div>
          </div>
        </div>
      </div>

      <!-- Help menu -->
      <div baseUiMenuRoot>
        <button baseUiMenuTrigger class="menu-trigger">Help</button>
        <div baseUiMenuPositioner>
          <div baseUiMenuPopup role="menu" class="menu-popup">
            <div baseUiMenuItem (itemClick)="showDocs()">Documentation</div>
            <div baseUiMenuItem (itemClick)="showShortcuts()">
              Keyboard Shortcuts
            </div>
            <div baseUiMenuSeparator></div>
            <div baseUiMenuItem (itemClick)="showAbout()">About</div>
          </div>
        </div>
      </div>
    </nav>
  \`,
})
export class AppMenubarComponent {
  readonly canUndo = signal(false);
  readonly canRedo = signal(false);
  readonly showToolbar = signal(true);
  readonly showStatusBar = signal(true);

  newFile(): void { console.log('New file'); }
  newWindow(): void { console.log('New window'); }
  openFile(): void { console.log('Open file'); }
  openRecent(): void { console.log('Open recent'); }
  save(): void { console.log('Save'); }
  saveAs(): void { console.log('Save as'); }
  exit(): void { console.log('Exit'); }
  undo(): void { console.log('Undo'); }
  redo(): void { console.log('Redo'); }
  cut(): void { console.log('Cut'); }
  copy(): void { console.log('Copy'); }
  paste(): void { console.log('Paste'); }
  selectAll(): void { console.log('Select all'); }
  zoomIn(): void { console.log('Zoom in'); }
  zoomOut(): void { console.log('Zoom out'); }
  resetZoom(): void { console.log('Reset zoom'); }
  showDocs(): void { console.log('Documentation'); }
  showShortcuts(): void { console.log('Shortcuts'); }
  showAbout(): void { console.log('About'); }
}`;

  protected readonly verticalDemoCode = `<!-- Vertical menubar for sidebar navigation -->
<nav baseUiMenubar orientation="vertical" class="menubar vertical">
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">
      <span class="icon">📁</span>
      File
    </button>
    <div baseUiMenuPositioner side="right">
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem>New</div>
        <div baseUiMenuItem>Open</div>
        <div baseUiMenuItem>Save</div>
      </div>
    </div>
  </div>

  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">
      <span class="icon">✏️</span>
      Edit
    </button>
    <div baseUiMenuPositioner side="right">
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem>Undo</div>
        <div baseUiMenuItem>Redo</div>
      </div>
    </div>
  </div>

  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">
      <span class="icon">⚙️</span>
      Settings
    </button>
    <div baseUiMenuPositioner side="right">
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem>Preferences</div>
        <div baseUiMenuItem>Theme</div>
      </div>
    </div>
  </div>
</nav>`;

  protected readonly iconsDemoCode = `<nav baseUiMenubar class="menubar">
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">File</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem class="menu-item">
          <span class="icon">📄</span>
          <span class="label">New File</span>
          <span class="shortcut">Ctrl+N</span>
        </div>
        <div baseUiMenuItem class="menu-item">
          <span class="icon">📂</span>
          <span class="label">Open</span>
          <span class="shortcut">Ctrl+O</span>
        </div>
        <div baseUiMenuItem class="menu-item">
          <span class="icon">💾</span>
          <span class="label">Save</span>
          <span class="shortcut">Ctrl+S</span>
        </div>
        <div baseUiMenuSeparator></div>
        <div baseUiMenuItem class="menu-item">
          <span class="icon">📤</span>
          <span class="label">Export</span>
          <span class="shortcut">Ctrl+E</span>
        </div>
      </div>
    </div>
  </div>

  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">Edit</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem class="menu-item">
          <span class="icon">↩️</span>
          <span class="label">Undo</span>
          <span class="shortcut">Ctrl+Z</span>
        </div>
        <div baseUiMenuItem class="menu-item">
          <span class="icon">↪️</span>
          <span class="label">Redo</span>
          <span class="shortcut">Ctrl+Y</span>
        </div>
        <div baseUiMenuSeparator></div>
        <div baseUiMenuItem class="menu-item">
          <span class="icon">✂️</span>
          <span class="label">Cut</span>
          <span class="shortcut">Ctrl+X</span>
        </div>
        <div baseUiMenuItem class="menu-item">
          <span class="icon">📋</span>
          <span class="label">Copy</span>
          <span class="shortcut">Ctrl+C</span>
        </div>
        <div baseUiMenuItem class="menu-item">
          <span class="icon">📄</span>
          <span class="label">Paste</span>
          <span class="shortcut">Ctrl+V</span>
        </div>
      </div>
    </div>
  </div>
</nav>`;

  protected readonly submenuDemoCode = `<nav baseUiMenubar class="menubar">
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger class="menu-trigger">File</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu" class="menu-popup">
        <div baseUiMenuItem>New File</div>

        <!-- Nested submenu for "Open Recent" -->
        <div baseUiMenuRoot>
          <div baseUiMenuTrigger class="submenu-trigger">
            Open Recent
            <span class="arrow">▸</span>
          </div>
          <div baseUiMenuPositioner side="right">
            <div baseUiMenuPopup role="menu" class="menu-popup">
              <div baseUiMenuItem>document.txt</div>
              <div baseUiMenuItem>project.json</div>
              <div baseUiMenuItem>notes.md</div>
              <div baseUiMenuSeparator></div>
              <div baseUiMenuItem>Clear Recent Files</div>
            </div>
          </div>
        </div>

        <div baseUiMenuSeparator></div>

        <!-- Nested submenu for "Export" -->
        <div baseUiMenuRoot>
          <div baseUiMenuTrigger class="submenu-trigger">
            Export
            <span class="arrow">▸</span>
          </div>
          <div baseUiMenuPositioner side="right">
            <div baseUiMenuPopup role="menu" class="menu-popup">
              <div baseUiMenuItem>Export as PDF</div>
              <div baseUiMenuItem>Export as HTML</div>
              <div baseUiMenuItem>Export as Markdown</div>
            </div>
          </div>
        </div>

        <div baseUiMenuSeparator></div>
        <div baseUiMenuItem>Exit</div>
      </div>
    </div>
  </div>
</nav>`;

  protected readonly disabledDemoCode = `<!-- Disable entire menubar -->
<nav baseUiMenubar [disabled]="isReadOnly()" class="menubar">
  <div baseUiMenuRoot>
    <button baseUiMenuTrigger>File</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu">
        <div baseUiMenuItem>New</div>
        <div baseUiMenuItem>Open</div>
        <div baseUiMenuItem>Save</div>
      </div>
    </div>
  </div>

  <div baseUiMenuRoot>
    <button baseUiMenuTrigger>Edit</button>
    <div baseUiMenuPositioner>
      <div baseUiMenuPopup role="menu">
        <!-- Disable individual items -->
        <div baseUiMenuItem [disabled]="!hasUndo()">Undo</div>
        <div baseUiMenuItem [disabled]="!hasRedo()">Redo</div>
        <div baseUiMenuSeparator></div>
        <div baseUiMenuItem [disabled]="!hasSelection()">Cut</div>
        <div baseUiMenuItem [disabled]="!hasSelection()">Copy</div>
        <div baseUiMenuItem [disabled]="!hasClipboard()">Paste</div>
      </div>
    </div>
  </div>
</nav>`;

  protected readonly stylingCode = `/* Menubar container */
.menubar {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #f8f9fa;
  padding: 0.25rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

/* Vertical menubar */
.menubar.vertical {
  flex-direction: column;
  align-items: stretch;
  width: 180px;
}

/* Menu trigger button */
.menu-trigger {
  padding: 0.5rem 0.75rem;
  border: none;
  background: transparent;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s;
}

.menu-trigger:hover,
.menu-trigger[data-state="open"] {
  background: #e5e7eb;
}

.menu-trigger:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}

/* Menu popup */
.menu-popup {
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
  font-size: 0.875rem;
  color: #111827;
  cursor: pointer;
}

.menu-item[data-highlighted] {
  background: #f3f4f6;
}

.menu-item[data-disabled] {
  color: #9ca3af;
  cursor: not-allowed;
}

/* Menu item elements */
.icon {
  width: 1rem;
  text-align: center;
}

.label {
  flex: 1;
}

.shortcut {
  margin-left: auto;
  color: #9ca3af;
  font-size: 0.75rem;
}

/* Menu separator */
.menu-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}

/* Submenu trigger */
.submenu-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
}

.submenu-trigger .arrow {
  margin-left: auto;
  color: #9ca3af;
}

/* Disabled menubar */
[baseUiMenubar][data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}`;

  protected readonly tailwindCode = `<nav
  baseUiMenubar
  class="flex items-center gap-1 bg-gray-100 p-1 rounded-md border border-gray-200"
>
  <div baseUiMenuRoot>
    <button
      baseUiMenuTrigger
      class="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-200
             data-[state=open]:bg-gray-200 focus-visible:outline-2
             focus-visible:outline-blue-600 focus-visible:outline-offset-2"
    >
      File
    </button>
    <div baseUiMenuPositioner>
      <div
        baseUiMenuPopup
        role="menu"
        class="bg-white rounded-lg shadow-xl p-1 min-w-[180px]"
      >
        <div
          baseUiMenuItem
          class="flex items-center gap-2 px-3 py-2 rounded text-sm
                 text-gray-900 cursor-pointer
                 data-[highlighted]:bg-gray-100"
        >
          <span class="w-4">📄</span>
          <span class="flex-1">New File</span>
          <span class="text-xs text-gray-400">Ctrl+N</span>
        </div>
        <div
          baseUiMenuItem
          class="flex items-center gap-2 px-3 py-2 rounded text-sm
                 text-gray-900 cursor-pointer
                 data-[highlighted]:bg-gray-100"
        >
          <span class="w-4">📂</span>
          <span class="flex-1">Open</span>
          <span class="text-xs text-gray-400">Ctrl+O</span>
        </div>
        <div class="h-px bg-gray-200 my-1"></div>
        <div
          baseUiMenuItem
          class="flex items-center gap-2 px-3 py-2 rounded text-sm
                 text-gray-900 cursor-pointer
                 data-[highlighted]:bg-gray-100"
        >
          <span class="w-4">💾</span>
          <span class="flex-1">Save</span>
          <span class="text-xs text-gray-400">Ctrl+S</span>
        </div>
      </div>
    </div>
  </div>

  <div baseUiMenuRoot>
    <button
      baseUiMenuTrigger
      class="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-200
             data-[state=open]:bg-gray-200"
    >
      Edit
    </button>
    <div baseUiMenuPositioner>
      <div
        baseUiMenuPopup
        role="menu"
        class="bg-white rounded-lg shadow-xl p-1 min-w-[180px]"
      >
        <div
          baseUiMenuItem
          class="flex items-center gap-2 px-3 py-2 rounded text-sm
                 text-gray-900 cursor-pointer
                 data-[highlighted]:bg-gray-100
                 data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed"
        >
          Undo
        </div>
        <div
          baseUiMenuItem
          class="flex items-center gap-2 px-3 py-2 rounded text-sm
                 text-gray-900 cursor-pointer
                 data-[highlighted]:bg-gray-100"
        >
          Redo
        </div>
      </div>
    </div>
  </div>
</nav>`;

  protected readonly menubarInputProps: PropDefinition[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'The orientation of the menubar.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the menubar is disabled.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description:
        'Whether to loop focus when navigating with keyboard (wrap from last to first).',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'The orientation of the menubar.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the menubar is disabled.',
    },
    {
      name: 'data-state',
      type: "'open' | 'closed'",
      description: 'On menu triggers, indicates if the menu is open.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-menubar',
      type: 'class',
      description: 'Applied to the menubar container.',
    },
    {
      name: 'base-ui-menubar-horizontal',
      type: 'class',
      description: 'Applied when orientation is horizontal.',
    },
    {
      name: 'base-ui-menubar-vertical',
      type: 'class',
      description: 'Applied when orientation is vertical.',
    },
    {
      name: 'base-ui-menubar-disabled',
      type: 'class',
      description: 'Applied when the menubar is disabled.',
    },
  ];

  protected readonly keyboardShortcuts: PropDefinition[] = [
    {
      name: 'ArrowRight',
      type: 'key',
      description:
        'Move focus to the next menu trigger (horizontal) or open submenu.',
    },
    {
      name: 'ArrowLeft',
      type: 'key',
      description:
        'Move focus to the previous menu trigger (horizontal) or close submenu.',
    },
    {
      name: 'ArrowDown',
      type: 'key',
      description:
        'Open menu (horizontal) or move to next trigger (vertical).',
    },
    {
      name: 'ArrowUp',
      type: 'key',
      description:
        'Close menu (horizontal) or move to previous trigger (vertical).',
    },
    {
      name: 'Home',
      type: 'key',
      description: 'Move focus to the first menu trigger.',
    },
    {
      name: 'End',
      type: 'key',
      description: 'Move focus to the last menu trigger.',
    },
    {
      name: 'Enter / Space',
      type: 'key',
      description: 'Open the focused menu.',
    },
    {
      name: 'Escape',
      type: 'key',
      description: 'Close the open menu.',
    },
  ];
}

import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-menu',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Menu</h1>
        <p class="docs-description">
          A dropdown menu component for displaying a list of actions. Features
          keyboard navigation, focus management, and support for checkboxes,
          radio groups, and separators.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">Import the Menu directives:</p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Menu uses a directive-based composition pattern:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          A simple dropdown menu with actions:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With groups</h3>
        <p class="docs-paragraph">
          Organize items into labeled groups:
        </p>
        <docs-code-block [code]="groupsDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With separators</h3>
        <p class="docs-paragraph">
          Add visual dividers between menu sections:
        </p>
        <docs-code-block [code]="separatorsDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Checkbox items</h3>
        <p class="docs-paragraph">
          Add checkable menu items:
        </p>
        <docs-code-block [code]="checkboxDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Radio group</h3>
        <p class="docs-paragraph">
          Create mutually exclusive options:
        </p>
        <docs-code-block [code]="radioDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled items</h3>
        <p class="docs-paragraph">
          Disable individual menu items:
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Keep open on click</h3>
        <p class="docs-paragraph">
          Prevent menu from closing when an item is clicked:
        </p>
        <docs-code-block [code]="keepOpenDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Controlled menu</h3>
        <p class="docs-paragraph">
          Use <code>[(open)]</code> to control the menu state:
        </p>
        <docs-code-block [code]="controlledDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes to style different menu states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="MenuRoot Inputs" [props]="rootInputProps" />
        <docs-props-table title="MenuRoot Outputs" [props]="rootOutputProps" />
        <docs-props-table title="MenuItem Inputs" [props]="itemInputProps" />
        <docs-props-table title="MenuItem Outputs" [props]="itemOutputProps" />
        <docs-props-table
          title="MenuCheckboxItem Inputs"
          [props]="checkboxInputProps"
        />
        <docs-props-table
          title="MenuRadioGroup Inputs"
          [props]="radioGroupInputProps"
        />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table
          title="MenuRoot / MenuPopup"
          [props]="rootDataAttributes"
        />
        <docs-props-table title="MenuItem" [props]="itemDataAttributes" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Menu component follows WAI-ARIA Menu pattern:
        </p>
        <ul class="docs-list">
          <li>Popup has <code>role="menu"</code></li>
          <li>Items have <code>role="menuitem"</code></li>
          <li>Checkbox items have <code>role="menuitemcheckbox"</code></li>
          <li>Radio items have <code>role="menuitemradio"</code></li>
          <li>Groups have <code>role="group"</code></li>
          <li>Arrow keys navigate between items</li>
          <li>Home/End jump to first/last item</li>
          <li>Enter or Space activates the focused item</li>
          <li>Escape closes the menu</li>
          <li>Type-ahead search to jump to items</li>
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
export class MenuDocsComponent {
  protected readonly importCode = `import {
  MenuRootDirective,
  MenuTriggerDirective,
  MenuPositionerDirective,
  MenuPopupDirective,
  MenuItemDirective,
  MenuGroupDirective,
  MenuGroupLabelDirective,
  MenuSeparatorDirective,
  MenuCheckboxItemDirective,
  MenuRadioGroupDirective,
  MenuRadioItemDirective,
  MenuArrowDirective
} from '@base-ng/ui/menu';

@Component({
  imports: [
    MenuRootDirective,
    MenuTriggerDirective,
    MenuPositionerDirective,
    MenuPopupDirective,
    MenuItemDirective,
    // ... and other directives as needed
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiMenuRoot [(open)]="isOpen">
  <!-- Trigger button -->
  <button baseUiMenuTrigger>Open Menu</button>

  <!-- Positioner (handles placement) -->
  <div baseUiMenuPositioner>
    <!-- Menu popup -->
    <div baseUiMenuPopup>
      <div baseUiMenuItem (itemClick)="handleAction()">Action 1</div>
      <div baseUiMenuItem (itemClick)="handleAction()">Action 2</div>
      <div baseUiMenuSeparator></div>
      <div baseUiMenuItem>Action 3</div>
    </div>
  </div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiMenuRoot>
  <button baseUiMenuTrigger class="menu-trigger">
    Actions
    <svg class="chevron" viewBox="0 0 16 16" width="12" height="12">
      <path d="M4 6l4 4 4-4" stroke="currentColor" fill="none"/>
    </svg>
  </button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup class="menu-popup">
      <div baseUiMenuItem (itemClick)="edit()">Edit</div>
      <div baseUiMenuItem (itemClick)="duplicate()">Duplicate</div>
      <div baseUiMenuItem (itemClick)="share()">Share</div>
      <div baseUiMenuItem (itemClick)="delete()">Delete</div>
    </div>
  </div>
</div>`;

  protected readonly groupsDemoCode = `<div baseUiMenuRoot>
  <button baseUiMenuTrigger>File</button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <div baseUiMenuGroup>
        <div baseUiMenuGroupLabel>Documents</div>
        <div baseUiMenuItem>New Document</div>
        <div baseUiMenuItem>Open...</div>
        <div baseUiMenuItem>Save</div>
      </div>

      <div baseUiMenuSeparator></div>

      <div baseUiMenuGroup>
        <div baseUiMenuGroupLabel>Export</div>
        <div baseUiMenuItem>Export as PDF</div>
        <div baseUiMenuItem>Export as Word</div>
        <div baseUiMenuItem>Print...</div>
      </div>
    </div>
  </div>
</div>`;

  protected readonly separatorsDemoCode = `<div baseUiMenuRoot>
  <button baseUiMenuTrigger>Options</button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <div baseUiMenuItem>Undo</div>
      <div baseUiMenuItem>Redo</div>
      <div baseUiMenuSeparator></div>
      <div baseUiMenuItem>Cut</div>
      <div baseUiMenuItem>Copy</div>
      <div baseUiMenuItem>Paste</div>
      <div baseUiMenuSeparator></div>
      <div baseUiMenuItem>Delete</div>
    </div>
  </div>
</div>`;

  protected readonly checkboxDemoCode = `<div baseUiMenuRoot>
  <button baseUiMenuTrigger>View Options</button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <div baseUiMenuCheckboxItem [(checked)]="showLineNumbers">
        <span class="checkbox-indicator">
          @if (showLineNumbers) {
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path d="M3 8l3 3 7-7" stroke="currentColor" fill="none"/>
            </svg>
          }
        </span>
        Show Line Numbers
      </div>

      <div baseUiMenuCheckboxItem [(checked)]="wordWrap">
        <span class="checkbox-indicator">
          @if (wordWrap) {
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path d="M3 8l3 3 7-7" stroke="currentColor" fill="none"/>
            </svg>
          }
        </span>
        Word Wrap
      </div>

      <div baseUiMenuCheckboxItem [(checked)]="minimap">
        <span class="checkbox-indicator">
          @if (minimap) {
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path d="M3 8l3 3 7-7" stroke="currentColor" fill="none"/>
            </svg>
          }
        </span>
        Show Minimap
      </div>
    </div>
  </div>
</div>

<!-- In component class -->
showLineNumbers = true;
wordWrap = false;
minimap = true;`;

  protected readonly radioDemoCode = `<div baseUiMenuRoot>
  <button baseUiMenuTrigger>Theme</button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <div baseUiMenuRadioGroup [(value)]="selectedTheme">
        <div baseUiMenuRadioItem value="light">
          <span class="radio-indicator">
            @if (selectedTheme === 'light') {
              <span class="radio-dot"></span>
            }
          </span>
          Light
        </div>
        <div baseUiMenuRadioItem value="dark">
          <span class="radio-indicator">
            @if (selectedTheme === 'dark') {
              <span class="radio-dot"></span>
            }
          </span>
          Dark
        </div>
        <div baseUiMenuRadioItem value="system">
          <span class="radio-indicator">
            @if (selectedTheme === 'system') {
              <span class="radio-dot"></span>
            }
          </span>
          System
        </div>
      </div>
    </div>
  </div>
</div>

<!-- In component class -->
selectedTheme = 'system';`;

  protected readonly disabledDemoCode = `<div baseUiMenuRoot>
  <button baseUiMenuTrigger>Edit</button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <div baseUiMenuItem>Cut</div>
      <div baseUiMenuItem>Copy</div>
      <div baseUiMenuItem [disabled]="!hasClipboard">Paste</div>
      <div baseUiMenuSeparator></div>
      <div baseUiMenuItem disabled>
        Delete (no permission)
      </div>
    </div>
  </div>
</div>`;

  protected readonly keepOpenDemoCode = `<div baseUiMenuRoot>
  <button baseUiMenuTrigger>Settings</button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <!-- closeOnClick=false keeps menu open -->
      <div baseUiMenuCheckboxItem
        [(checked)]="notificationsEnabled"
        [closeOnClick]="false">
        Enable notifications
      </div>
      <div baseUiMenuCheckboxItem
        [(checked)]="soundEnabled"
        [closeOnClick]="false">
        Sound effects
      </div>
      <div baseUiMenuSeparator></div>
      <div baseUiMenuItem>
        Apply and Close
      </div>
    </div>
  </div>
</div>`;

  protected readonly controlledDemoCode = `<div baseUiMenuRoot [(open)]="isMenuOpen" (openChanged)="handleOpenChange($event)">
  <button baseUiMenuTrigger>
    {{ isMenuOpen ? 'Menu Open' : 'Menu Closed' }}
  </button>

  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <div baseUiMenuItem>Action 1</div>
      <div baseUiMenuItem>Action 2</div>
    </div>
  </div>
</div>

<button (click)="isMenuOpen = !isMenuOpen">
  Toggle from outside
</button>

<!-- In component class -->
isMenuOpen = false;

handleOpenChange(event: { open: boolean; reason: string }) {
  console.log('Menu changed:', event.reason);
  this.isMenuOpen = event.open;
}`;

  protected readonly stylingCode = `/* Menu trigger */
[baseUiMenuTrigger] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
}

[baseUiMenuTrigger][data-state="open"] {
  background: #f5f5f5;
}

/* Menu popup */
[baseUiMenuPopup] {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.25rem;
  min-width: 180px;
  outline: none;
}

/* Open animation */
[baseUiMenuPopup][data-state="open"] {
  animation: menuIn 0.15s ease;
}

@keyframes menuIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

/* Menu item */
[baseUiMenuItem],
[baseUiMenuCheckboxItem],
[baseUiMenuRadioItem] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  font-size: 0.875rem;
}

/* Highlighted state (keyboard focus or hover) */
[baseUiMenuItem][data-highlighted],
[baseUiMenuCheckboxItem][data-highlighted],
[baseUiMenuRadioItem][data-highlighted] {
  background: #f5f5f5;
}

/* Disabled state */
[baseUiMenuItem][data-disabled],
[baseUiMenuCheckboxItem][data-disabled],
[baseUiMenuRadioItem][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Group label */
[baseUiMenuGroupLabel] {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Separator */
[baseUiMenuSeparator] {
  height: 1px;
  background: #e5e5e5;
  margin: 0.25rem 0;
}

/* Checkbox/Radio indicators */
.checkbox-indicator,
.radio-indicator {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-indicator {
  border: 2px solid #ccc;
  border-radius: 50%;
}

.radio-dot {
  width: 8px;
  height: 8px;
  background: #0066ff;
  border-radius: 50%;
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description:
        'The controlled open state of the menu. Supports two-way binding with [(open)].',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'The default open state when uncontrolled.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<MenuOpenChangeEventDetails>',
      description:
        'Emitted when the open state changes. Includes open boolean and reason (trigger-press, item-press, outside-press, escape-key, tab-key, imperative).',
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
      description:
        'Label for keyboard navigation (type-ahead). Defaults to text content.',
    },
  ];

  protected readonly itemOutputProps: PropDefinition[] = [
    {
      name: 'itemClick',
      type: 'EventEmitter<MouseEvent>',
      description: 'Emitted when the item is clicked.',
    },
  ];

  protected readonly checkboxInputProps: PropDefinition[] = [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the checkbox is checked. Supports two-way binding with [(checked)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the checkbox item is disabled.',
    },
    {
      name: 'closeOnClick',
      type: 'boolean',
      default: 'false',
      description:
        'Whether clicking closes the menu. Defaults to false for checkbox items.',
    },
  ];

  protected readonly radioGroupInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      description:
        'The selected value. Supports two-way binding with [(value)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether all radio items are disabled.',
    },
  ];

  protected readonly rootDataAttributes: PropDefinition[] = [
    {
      name: 'data-state',
      type: '"open" | "closed"',
      description: 'The current state of the menu.',
    },
  ];

  protected readonly itemDataAttributes: PropDefinition[] = [
    {
      name: 'data-highlighted',
      type: 'string',
      description:
        'Present when the item is highlighted (focused via keyboard or hover).',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the item is disabled.',
    },
  ];
}

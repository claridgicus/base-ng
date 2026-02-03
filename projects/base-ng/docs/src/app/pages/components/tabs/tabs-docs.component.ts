import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-tabs',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Tabs</h1>
        <p class="docs-description">
          A set of layered sections of content known as tab panels, displayed
          one at a time. Features keyboard navigation, ARIA support, and
          animated indicators.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">Import the Tabs directives:</p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Tabs component uses a directive-based composition pattern:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Use <code>[(value)]</code> to control which tab is selected:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Default selected tab</h3>
        <p class="docs-paragraph">
          Set an initial value to have a tab selected by default:
        </p>
        <docs-code-block [code]="defaultSelectedCode" language="html" />

        <h3 class="docs-section-subtitle">Vertical orientation</h3>
        <p class="docs-paragraph">
          Use <code>orientation="vertical"</code> for vertical tabs:
        </p>
        <docs-code-block [code]="verticalDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With animated indicator</h3>
        <p class="docs-paragraph">
          Add <code>baseUiTabsIndicator</code> for a sliding active indicator:
        </p>
        <docs-code-block [code]="indicatorDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Activate on focus</h3>
        <p class="docs-paragraph">
          Enable <code>activateOnFocus</code> on the list to activate tabs
          immediately when navigating with arrow keys:
        </p>
        <docs-code-block [code]="activateOnFocusCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled tabs</h3>
        <p class="docs-paragraph">
          Disable individual tabs or the entire tab group:
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Keep panels mounted</h3>
        <p class="docs-paragraph">
          Use <code>keepMounted</code> on panels to preserve their state when
          not selected:
        </p>
        <docs-code-block [code]="keepMountedCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes and CSS custom properties to style tabs:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="TabsRoot Inputs" [props]="rootInputProps" />
        <docs-props-table title="TabsRoot Outputs" [props]="rootOutputProps" />
        <docs-props-table title="TabsList Inputs" [props]="listInputProps" />
        <docs-props-table title="Tab Inputs" [props]="tabInputProps" />
        <docs-props-table title="TabsPanel Inputs" [props]="panelInputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table
          title="TabsRoot / TabsList"
          [props]="rootDataAttributes"
        />
        <docs-props-table title="Tab" [props]="tabDataAttributes" />
        <docs-props-table title="TabsPanel" [props]="panelDataAttributes" />
        <docs-props-table
          title="TabsIndicator"
          [props]="indicatorDataAttributes"
        />
      </section>

      <!-- CSS Custom Properties -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Custom Properties</h2>
        <p class="docs-paragraph">
          The TabsIndicator exposes CSS custom properties for styling:
        </p>
        <docs-props-table [props]="cssCustomProperties" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Tabs component follows WAI-ARIA Tabs pattern:
        </p>
        <ul class="docs-list">
          <li>TabsList has <code>role="tablist"</code></li>
          <li>Tab buttons have <code>role="tab"</code></li>
          <li>Panels have <code>role="tabpanel"</code></li>
          <li>
            <code>aria-selected</code> indicates the active tab
          </li>
          <li>
            <code>aria-controls</code> and <code>aria-labelledby</code> link
            tabs to panels
          </li>
          <li>Arrow keys navigate between tabs (respects orientation)</li>
          <li>Home/End keys jump to first/last tab</li>
          <li>Enter or Space activates the focused tab</li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/tabs/tabs-docs.component.ts"
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
    }`,
})
export class TabsDocsComponent {
  protected readonly importCode = `import {
  TabsRootDirective,
  TabsListDirective,
  TabsTabDirective,
  TabsPanelDirective,
  TabsIndicatorDirective
} from '@base-ng/ui/tabs';

@Component({
  imports: [
    TabsRootDirective,
    TabsListDirective,
    TabsTabDirective,
    TabsPanelDirective,
    TabsIndicatorDirective
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiTabsRoot [(value)]="selectedTab">
  <div baseUiTabsList>
    <button baseUiTab value="tab1">Tab 1</button>
    <button baseUiTab value="tab2">Tab 2</button>
    <button baseUiTab value="tab3">Tab 3</button>
  </div>
  <div baseUiTabsPanel value="tab1">Content 1</div>
  <div baseUiTabsPanel value="tab2">Content 2</div>
  <div baseUiTabsPanel value="tab3">Content 3</div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiTabsRoot [(value)]="selectedTab">
  <div baseUiTabsList>
    <button baseUiTab value="account">Account</button>
    <button baseUiTab value="password">Password</button>
    <button baseUiTab value="settings">Settings</button>
  </div>

  <div baseUiTabsPanel value="account">
    <h3>Account Settings</h3>
    <p>Manage your account details here.</p>
  </div>

  <div baseUiTabsPanel value="password">
    <h3>Change Password</h3>
    <p>Update your password securely.</p>
  </div>

  <div baseUiTabsPanel value="settings">
    <h3>App Settings</h3>
    <p>Configure application preferences.</p>
  </div>
</div>

<!-- In component class -->
selectedTab = 'account';`;

  protected readonly defaultSelectedCode = `<!-- Method 1: Using value binding -->
<div baseUiTabsRoot [value]="'overview'">
  ...
</div>

<!-- Method 2: Using defaultValue (uncontrolled) -->
<div baseUiTabsRoot defaultValue="overview">
  ...
</div>`;

  protected readonly verticalDemoCode = `<div baseUiTabsRoot orientation="vertical" [(value)]="selectedTab">
  <div class="tabs-layout">
    <div baseUiTabsList>
      <button baseUiTab value="general">General</button>
      <button baseUiTab value="privacy">Privacy</button>
      <button baseUiTab value="notifications">Notifications</button>
    </div>

    <div class="panels">
      <div baseUiTabsPanel value="general">General settings content</div>
      <div baseUiTabsPanel value="privacy">Privacy settings content</div>
      <div baseUiTabsPanel value="notifications">Notification settings</div>
    </div>
  </div>
</div>

<!-- CSS for vertical layout -->
<style>
  .tabs-layout {
    display: flex;
    gap: 1rem;
  }

  [baseUiTabsList][data-orientation="vertical"] {
    flex-direction: column;
    border-right: 1px solid #e5e5e5;
    padding-right: 1rem;
  }
</style>`;

  protected readonly indicatorDemoCode = `<div baseUiTabsRoot [(value)]="selectedTab">
  <div baseUiTabsList class="tabs-list-with-indicator">
    <button baseUiTab value="tab1">Tab 1</button>
    <button baseUiTab value="tab2">Tab 2</button>
    <button baseUiTab value="tab3">Tab 3</button>
    <!-- Animated indicator -->
    <span baseUiTabsIndicator class="tabs-indicator"></span>
  </div>
  <div baseUiTabsPanel value="tab1">Content 1</div>
  <div baseUiTabsPanel value="tab2">Content 2</div>
  <div baseUiTabsPanel value="tab3">Content 3</div>
</div>

<!-- CSS for animated indicator -->
<style>
  .tabs-list-with-indicator {
    position: relative;
  }

  .tabs-indicator {
    position: absolute;
    bottom: 0;
    height: 2px;
    background: #0066ff;
    left: var(--indicator-left);
    width: var(--indicator-width);
    transition: left 0.2s, width 0.2s;
  }
</style>`;

  protected readonly activateOnFocusCode = `<!-- Tabs activate immediately on arrow key navigation -->
<div baseUiTabsRoot [(value)]="selectedTab">
  <div baseUiTabsList activateOnFocus>
    <button baseUiTab value="tab1">Tab 1</button>
    <button baseUiTab value="tab2">Tab 2</button>
    <button baseUiTab value="tab3">Tab 3</button>
  </div>
  ...
</div>

<!-- By default, arrow keys only move focus.
     Enter/Space is needed to activate.
     With activateOnFocus, tabs activate on focus. -->`;

  protected readonly disabledDemoCode = `<!-- Disable entire tabs -->
<div baseUiTabsRoot disabled>
  <div baseUiTabsList>
    <button baseUiTab value="tab1">Tab 1</button>
    <button baseUiTab value="tab2">Tab 2</button>
  </div>
  ...
</div>

<!-- Disable individual tab -->
<div baseUiTabsRoot>
  <div baseUiTabsList>
    <button baseUiTab value="tab1">Active</button>
    <button baseUiTab value="tab2" disabled>Disabled</button>
    <button baseUiTab value="tab3">Active</button>
  </div>
  ...
</div>`;

  protected readonly keepMountedCode = `<div baseUiTabsRoot [(value)]="selectedTab">
  <div baseUiTabsList>
    <button baseUiTab value="form">Form</button>
    <button baseUiTab value="preview">Preview</button>
  </div>

  <!-- Form state is preserved when switching tabs -->
  <div baseUiTabsPanel value="form" keepMounted>
    <form>
      <input [(ngModel)]="formData.name" name="name" />
      <textarea [(ngModel)]="formData.content" name="content"></textarea>
    </form>
  </div>

  <div baseUiTabsPanel value="preview">
    <h3>{{ formData.name }}</h3>
    <p>{{ formData.content }}</p>
  </div>
</div>`;

  protected readonly stylingCode = `/* Tabs container */
[baseUiTabsRoot] {
  display: flex;
  flex-direction: column;
}

/* Tabs list */
[baseUiTabsList] {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e5e5e5;
}

/* Vertical orientation */
[baseUiTabsList][data-orientation="vertical"] {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid #e5e5e5;
}

/* Individual tab */
[baseUiTab] {
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #666;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

[baseUiTab]:hover:not([data-disabled]) {
  color: #000;
  background: #f5f5f5;
}

/* Selected state */
[baseUiTab][data-selected] {
  color: #0066ff;
  box-shadow: inset 0 -2px 0 0 currentColor;
}

/* Disabled state */
[baseUiTab][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
[baseUiTab]:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: -2px;
}

/* Tab panel */
[baseUiTabsPanel] {
  padding: 1rem;
}

/* Animated indicator (when used) */
[baseUiTabsIndicator] {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #0066ff;
  /* Use CSS custom properties for position */
  left: var(--indicator-left);
  top: var(--indicator-top);
  width: var(--indicator-width);
  transition: all 0.2s ease;
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string | number',
      description:
        'The controlled value of the selected tab. Supports two-way binding with [(value)].',
    },
    {
      name: 'defaultValue',
      type: 'string | number',
      description: 'The default value for uncontrolled mode.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'The orientation of the tabs.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether all tabs are disabled.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'valueChanged',
      type: 'EventEmitter<TabsChangeEventDetails>',
      description:
        'Emitted when the selected tab changes. Includes value, previousValue, and activationDirection.',
    },
  ];

  protected readonly listInputProps: PropDefinition[] = [
    {
      name: 'activateOnFocus',
      type: 'boolean',
      default: 'false',
      description:
        'Whether to activate tabs when they receive focus during keyboard navigation.',
    },
    {
      name: 'loopFocus',
      type: 'boolean',
      default: 'true',
      description:
        'Whether keyboard focus should loop from last to first tab and vice versa.',
    },
  ];

  protected readonly tabInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string | number',
      required: true,
      description:
        'The unique value that identifies this tab. Must match a panel value.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether this tab is disabled.',
    },
  ];

  protected readonly panelInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string | number',
      required: true,
      description:
        'The value that identifies this panel. Must match a tab value.',
    },
    {
      name: 'keepMounted',
      type: 'boolean',
      default: 'false',
      description:
        'Whether to keep the panel mounted when not selected. Useful for preserving form state.',
    },
  ];

  protected readonly rootDataAttributes: PropDefinition[] = [
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'The orientation of the tabs.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the tabs are disabled.',
    },
  ];

  protected readonly tabDataAttributes: PropDefinition[] = [
    {
      name: 'data-selected',
      type: 'string',
      description: 'Present when the tab is selected.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the tab is disabled.',
    },
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'The orientation inherited from the root.',
    },
    {
      name: 'data-value',
      type: 'string',
      description: "The tab's value attribute.",
    },
  ];

  protected readonly panelDataAttributes: PropDefinition[] = [
    {
      name: 'data-selected',
      type: 'string',
      description: 'Present when the panel is visible (its tab is selected).',
    },
    {
      name: 'data-hidden',
      type: 'string',
      description: 'Present when the panel is hidden.',
    },
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'The orientation inherited from the root.',
    },
  ];

  protected readonly indicatorDataAttributes: PropDefinition[] = [
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'The orientation inherited from the root.',
    },
    {
      name: 'data-activation-direction',
      type: "'left' | 'right' | 'up' | 'down' | 'none'",
      description:
        'The direction of tab activation. Useful for directional animations.',
    },
  ];

  protected readonly cssCustomProperties: PropDefinition[] = [
    {
      name: '--indicator-left',
      type: 'number (px)',
      description:
        'The left position of the indicator relative to the tabs list.',
    },
    {
      name: '--indicator-top',
      type: 'number (px)',
      description:
        'The top position of the indicator relative to the tabs list.',
    },
    {
      name: '--indicator-width',
      type: 'number (px)',
      description: "The width of the indicator (matches active tab's width).",
    },
    {
      name: '--indicator-height',
      type: 'number (px)',
      description:
        "The height of the indicator (matches active tab's height).",
    },
  ];
}

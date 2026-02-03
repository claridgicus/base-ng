import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import { SwitchRootDirective, SwitchThumbDirective } from '@base-ng/ui';

@Component({
  selector: 'docs-switch',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    SwitchRootDirective,
    SwitchThumbDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Switch</h1>
        <p class="docs-description">
          A toggle switch component for binary choices. Features keyboard
          navigation, form integration, and accessible markup.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-switch-container">
            <button
              baseUiSwitchRoot
              [(checked)]="isEnabled"
              class="demo-switch"
            >
              <span baseUiSwitchThumb class="demo-switch-thumb"></span>
            </button>
            <span class="demo-switch-label">
              {{ isEnabled() ? 'On' : 'Off' }}
            </span>
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
          The Switch component uses a directive-based composition pattern with a
          root and thumb:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Use the <code>disabled</code> attribute to disable the switch:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div class="demo-row">
            <div class="demo-switch-container">
              <button baseUiSwitchRoot [checked]="true" disabled class="demo-switch">
                <span baseUiSwitchThumb class="demo-switch-thumb"></span>
              </button>
              <span class="demo-switch-label demo-disabled">Checked (disabled)</span>
            </div>
            <div class="demo-switch-container">
              <button baseUiSwitchRoot [checked]="false" disabled class="demo-switch">
                <span baseUiSwitchThumb class="demo-switch-thumb"></span>
              </button>
              <span class="demo-switch-label demo-disabled">Unchecked (disabled)</span>
            </div>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Settings example</h3>
        <p class="docs-paragraph">
          Common pattern for application settings:
        </p>
        <docs-demo [code]="settingsDemoCode" language="html">
          <div class="demo-settings">
            <div class="demo-setting">
              <div class="demo-setting-info">
                <span class="demo-setting-label">Dark mode</span>
                <span class="demo-setting-desc">Use dark theme</span>
              </div>
              <button baseUiSwitchRoot [(checked)]="darkMode" class="demo-switch">
                <span baseUiSwitchThumb class="demo-switch-thumb"></span>
              </button>
            </div>
            <div class="demo-setting">
              <div class="demo-setting-info">
                <span class="demo-setting-label">Notifications</span>
                <span class="demo-setting-desc">Receive push notifications</span>
              </div>
              <button baseUiSwitchRoot [(checked)]="notifications" class="demo-switch">
                <span baseUiSwitchThumb class="demo-switch-thumb"></span>
              </button>
            </div>
          </div>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes and CSS to style the switch states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="SwitchRoot Inputs" [props]="rootInputProps" />
        <docs-props-table title="SwitchRoot Outputs" [props]="rootOutputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table
          title="SwitchRoot"
          [props]="rootDataAttributes"
        />
        <docs-props-table
          title="SwitchThumb"
          [props]="thumbDataAttributes"
        />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Switch component follows WAI-ARIA Switch pattern:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="switch"</code> for proper semantics</li>
          <li>
            <code>aria-checked</code> reflects the current toggle state
          </li>
          <li>Keyboard navigation with Space and Enter keys</li>
          <li>Focus visible styling support</li>
          <li>
            Disabled and read-only states announced via ARIA attributes
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/switch/switch-docs.component.ts"
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
    .demo-switch-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .demo-row {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .demo-switch {
      position: relative;
      width: 44px;
      height: 24px;
      background: var(--docs-border);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s;
      padding: 0;

      &[data-checked] {
        background: var(--docs-accent, #0066ff);
      }

      &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }
    }

    .demo-switch-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);

      &[data-checked] {
        transform: translateX(20px);
      }
    }

    .demo-switch-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);

      &.demo-disabled {
        color: var(--docs-text-secondary);
      }
    }

    .demo-settings {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 320px;
    }

    .demo-setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: var(--docs-bg-secondary);
      border-radius: 0.5rem;
    }

    .demo-setting-info {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .demo-setting-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
    }

    .demo-setting-desc {
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
    }
  `,
})
export class SwitchDocsComponent {
  protected readonly isEnabled = signal(true);
  protected readonly darkMode = signal(false);
  protected readonly notifications = signal(true);
  protected readonly importCode = `import {
  SwitchRootDirective,
  SwitchThumbDirective
} from '@base-ng/ui/switch';

@Component({
  imports: [SwitchRootDirective, SwitchThumbDirective],
  // ...
})`;

  protected readonly anatomyCode = `<button baseUiSwitchRoot>
  <span baseUiSwitchThumb></span>
</button>`;

  protected readonly basicDemoCode = `<button baseUiSwitchRoot [(checked)]="isEnabled">
  <span baseUiSwitchThumb></span>
</button>

<p>Switch is {{ isEnabled ? 'on' : 'off' }}</p>`;

  protected readonly formDemoCode = `<!-- Template-driven forms -->
<button baseUiSwitchRoot [(ngModel)]="settings.darkMode" name="darkMode">
  <span baseUiSwitchThumb></span>
</button>

<!-- Reactive forms -->
<button baseUiSwitchRoot [formControl]="darkModeControl">
  <span baseUiSwitchThumb></span>
</button>`;

  protected readonly disabledDemoCode = `<button baseUiSwitchRoot [checked]="true" disabled>
  <span baseUiSwitchThumb></span>
</button>`;

  protected readonly readOnlyDemoCode = `<button baseUiSwitchRoot [checked]="true" readOnly>
  <span baseUiSwitchThumb></span>
</button>`;

  protected readonly settingsDemoCode = `<div class="settings">
  <div class="setting">
    <span>Dark mode</span>
    <button baseUiSwitchRoot [(checked)]="darkMode">
      <span baseUiSwitchThumb></span>
    </button>
  </div>
  <div class="setting">
    <span>Notifications</span>
    <button baseUiSwitchRoot [(checked)]="notifications">
      <span baseUiSwitchThumb></span>
    </button>
  </div>
</div>`;

  protected readonly stylingCode = `/* Base switch styles */
[baseUiSwitchRoot] {
  position: relative;
  width: 44px;
  height: 24px;
  background: #e5e5e5;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

/* Checked state */
[baseUiSwitchRoot][data-checked] {
  background: #0066ff;
}

/* Disabled state */
[baseUiSwitchRoot][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
[baseUiSwitchRoot]:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}

/* Thumb styles */
[baseUiSwitchThumb] {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

/* Thumb checked state */
[baseUiSwitchThumb][data-checked] {
  transform: translateX(20px);
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is checked. Supports two-way binding.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is disabled.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is required.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name attribute for form submission.',
    },
    {
      name: 'value',
      type: 'string',
      default: "'on'",
      description: 'Value when switch is checked (for form submission).',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'checkedChange',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the checked state changes.',
    },
  ];

  protected readonly rootDataAttributes: PropDefinition[] = [
    {
      name: 'data-checked',
      type: 'string',
      description: 'Present when the switch is checked.',
    },
    {
      name: 'data-unchecked',
      type: 'string',
      description: 'Present when the switch is unchecked.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the switch is disabled.',
    },
    {
      name: 'data-readonly',
      type: 'string',
      description: 'Present when the switch is read-only.',
    },
  ];

  protected readonly thumbDataAttributes: PropDefinition[] = [
    {
      name: 'data-checked',
      type: 'string',
      description: 'Present when the switch is checked.',
    },
    {
      name: 'data-unchecked',
      type: 'string',
      description: 'Present when the switch is unchecked.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the switch is disabled.',
    },
  ];
}

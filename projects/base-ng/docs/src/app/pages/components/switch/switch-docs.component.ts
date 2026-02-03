import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-switch',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Switch</h1>
        <p class="docs-description">
          A toggle switch component for binary choices. Features keyboard
          navigation, form integration, and accessible markup.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">Import the Switch directives:</p>
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

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Use two-way binding with <code>[(checked)]</code> to control the
          switch state:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Form integration</h3>
        <p class="docs-paragraph">
          The Switch supports Angular forms with <code>ngModel</code> and
          Reactive Forms:
        </p>
        <docs-code-block [code]="formDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Use the <code>disabled</code> attribute to disable the switch:
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Read-only state</h3>
        <p class="docs-paragraph">
          Use <code>readOnly</code> to make the switch non-interactive while
          still showing its value:
        </p>
        <docs-code-block [code]="readOnlyDemoCode" language="html" />
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
    }`,
})
export class SwitchDocsComponent {
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

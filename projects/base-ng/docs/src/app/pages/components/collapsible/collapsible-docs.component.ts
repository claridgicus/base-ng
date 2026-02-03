import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  CollapsibleRootDirective,
  CollapsibleTriggerDirective,
  CollapsiblePanelDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-collapsible',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    CollapsibleRootDirective,
    CollapsibleTriggerDirective,
    CollapsiblePanelDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Collapsible</h1>
        <p class="docs-description">
          A component that expands and collapses a section of content.
          The simplest form of disclosure, suitable for FAQ sections, spoilers,
          and expandable details.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div
            baseUiCollapsibleRoot
            [(open)]="isOpen"
            class="demo-collapsible"
          >
            <button baseUiCollapsibleTrigger class="demo-trigger">
              <span>Show more details</span>
              <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
              </svg>
            </button>
            <div baseUiCollapsiblePanel [keepMounted]="true" class="demo-panel">
              <div class="demo-panel-content">
                <p>This content can be shown or hidden by clicking the button above.</p>
                <p>Use collapsibles for FAQ sections, additional details, or any content that doesn't need to be visible by default.</p>
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
          The Collapsible uses a directive-based composition pattern:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Use <code>[(open)]</code> to control the collapsible state:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Default open</h3>
        <p class="docs-paragraph">
          Set initial open state with a default value:
        </p>
        <docs-code-block [code]="defaultOpenCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Use <code>disabled</code> to prevent the collapsible from toggling:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div class="demo-container">
            <div
              baseUiCollapsibleRoot
              [(open)]="disabledOpen"
              [disabled]="isDisabled()"
              class="demo-collapsible"
            >
              <button baseUiCollapsibleTrigger class="demo-trigger">
                <span>Toggle content</span>
                <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
                </svg>
              </button>
              <div baseUiCollapsiblePanel [keepMounted]="true" class="demo-panel">
                <div class="demo-panel-content">
                  This content cannot be toggled when disabled.
                </div>
              </div>
            </div>
            <label class="demo-toggle">
              <input type="checkbox" [checked]="isDisabled()" (change)="toggleDisabled()" />
              Disabled
            </label>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Keep panel mounted</h3>
        <p class="docs-paragraph">
          Use <code>keepMounted</code> on the panel to keep its content in the
          DOM when collapsed:
        </p>
        <docs-code-block [code]="keepMountedCode" language="html" />

        <h3 class="docs-section-subtitle">With animation</h3>
        <p class="docs-paragraph">
          Apply CSS transitions for smooth expand/collapse animations:
        </p>
        <docs-code-block [code]="animationDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Controlled programmatically</h3>
        <p class="docs-paragraph">
          Open and close the collapsible from code:
        </p>
        <docs-code-block [code]="controlledDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes to style different collapsible states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table
          title="CollapsibleRoot Inputs"
          [props]="rootInputProps"
        />
        <docs-props-table
          title="CollapsibleRoot Outputs"
          [props]="rootOutputProps"
        />
        <docs-props-table
          title="CollapsiblePanel Inputs"
          [props]="panelInputProps"
        />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table
          title="CollapsibleRoot / CollapsibleTrigger / CollapsiblePanel"
          [props]="dataAttributes"
        />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Collapsible component follows WAI-ARIA disclosure pattern:
        </p>
        <ul class="docs-list">
          <li>
            Trigger has <code>aria-expanded</code> to indicate open state
          </li>
          <li>
            <code>aria-controls</code> links trigger to its panel
          </li>
          <li>Panel has <code>role="region"</code></li>
          <li>Keyboard activation with Enter or Space on trigger</li>
          <li>Disabled state announced via <code>aria-disabled</code></li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/collapsible/collapsible-docs.component.ts"
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
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .demo-collapsible {
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      overflow: hidden;
      width: 100%;
      max-width: 360px;

      &[data-disabled] {
        opacity: 0.5;
      }
    }

    .demo-trigger {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--docs-bg);
      border: none;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
      cursor: pointer;
      transition: background 0.15s;

      &:hover:not([data-disabled]) {
        background: var(--docs-bg-hover, rgba(0, 0, 0, 0.05));
      }

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: -2px;
      }

      &[data-disabled] {
        cursor: not-allowed;
      }
    }

    .demo-chevron {
      transition: transform 0.2s;

      [data-open] & {
        transform: rotate(180deg);
      }
    }

    .demo-panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.2s ease;
      background: var(--docs-bg-muted, rgba(0, 0, 0, 0.02));
      border-top: 1px solid var(--docs-border);

      &[data-open] {
        grid-template-rows: 1fr;
      }
    }

    .demo-panel-content {
      overflow: hidden;
      padding: 0 1rem;
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      line-height: 1.6;

      [data-open] & {
        padding: 1rem;
      }

      p {
        margin: 0 0 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .demo-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
    }
  `,
})
export class CollapsibleDocsComponent {
  // Demo state
  protected readonly isOpen = signal(false);
  protected readonly disabledOpen = signal(false);
  protected readonly isDisabled = signal(false);

  protected toggleDisabled(): void {
    this.isDisabled.update((v) => !v);
  }

  protected readonly importCode = `import {
  CollapsibleRootDirective,
  CollapsibleTriggerDirective,
  CollapsiblePanelDirective,
} from '@copied/base-ng';

@Component({
  imports: [
    CollapsibleRootDirective,
    CollapsibleTriggerDirective,
    CollapsiblePanelDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiCollapsibleRoot [(open)]="isOpen">
  <button baseUiCollapsibleTrigger>
    Toggle content
  </button>
  <div baseUiCollapsiblePanel>
    Collapsible content here
  </div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiCollapsibleRoot [(open)]="isOpen">
  <button baseUiCollapsibleTrigger class="collapsible-trigger">
    <span>Show more details</span>
    <svg class="chevron" viewBox="0 0 24 24" width="16" height="16">
      <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
    </svg>
  </button>
  <div baseUiCollapsiblePanel class="collapsible-panel">
    <p>This content can be shown or hidden by clicking the button above.</p>
    <p>Use collapsibles for FAQ sections, additional details, or any content
    that doesn't need to be visible by default.</p>
  </div>
</div>

<!-- In component class -->
isOpen = false;`;

  protected readonly defaultOpenCode = `<div baseUiCollapsibleRoot [open]="true">
  <button baseUiCollapsibleTrigger>
    Starts expanded
  </button>
  <div baseUiCollapsiblePanel>
    This content is visible by default.
  </div>
</div>`;

  protected readonly disabledDemoCode = `<div baseUiCollapsibleRoot disabled>
  <button baseUiCollapsibleTrigger>
    Cannot toggle (disabled)
  </button>
  <div baseUiCollapsiblePanel>
    This content cannot be toggled.
  </div>
</div>

<!-- Conditionally disabled -->
<div baseUiCollapsibleRoot [disabled]="isLoading">
  <button baseUiCollapsibleTrigger>
    {{ isLoading ? 'Loading...' : 'Toggle content' }}
  </button>
  <div baseUiCollapsiblePanel>
    Content that should not toggle while loading.
  </div>
</div>`;

  protected readonly keepMountedCode = `<div baseUiCollapsibleRoot>
  <button baseUiCollapsibleTrigger>Toggle form</button>
  <div baseUiCollapsiblePanel keepMounted>
    <!-- Form state is preserved when collapsed -->
    <form>
      <input [(ngModel)]="formData.name" name="name" placeholder="Name" />
      <input [(ngModel)]="formData.email" name="email" placeholder="Email" />
    </form>
  </div>
</div>

<!-- Without keepMounted, form values would reset when collapsed -->`;

  protected readonly animationDemoCode = `<div baseUiCollapsibleRoot [(open)]="isOpen">
  <button baseUiCollapsibleTrigger>Animated toggle</button>
  <div baseUiCollapsiblePanel class="animated-panel">
    <div class="panel-content">
      Content with smooth height animation.
    </div>
  </div>
</div>

<style>
  .animated-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
  }

  .animated-panel[data-open] {
    grid-template-rows: 1fr;
  }

  .panel-content {
    overflow: hidden;
  }
</style>`;

  protected readonly controlledDemoCode = `<div baseUiCollapsibleRoot [open]="isExpanded" (openChanged)="handleOpenChange($event)">
  <button baseUiCollapsibleTrigger>Controlled collapsible</button>
  <div baseUiCollapsiblePanel>
    Controlled from outside the component.
  </div>
</div>

<button (click)="isExpanded = true">Expand</button>
<button (click)="isExpanded = false">Collapse</button>
<button (click)="isExpanded = !isExpanded">Toggle</button>

<!-- In component class -->
isExpanded = false;

handleOpenChange(event: { open: boolean; reason: string }) {
  console.log('Collapsible changed:', event.reason);
  this.isExpanded = event.open;
}`;

  protected readonly stylingCode = `/* Collapsible container */
[baseUiCollapsibleRoot] {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

/* Trigger button */
[baseUiCollapsibleTrigger] {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
}

[baseUiCollapsibleTrigger]:hover {
  background: #f5f5f5;
}

/* Chevron rotation */
[baseUiCollapsibleTrigger] .chevron {
  transition: transform 0.2s;
}

[baseUiCollapsibleTrigger][data-open] .chevron {
  transform: rotate(180deg);
}

/* Disabled state */
[baseUiCollapsibleTrigger][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
[baseUiCollapsibleTrigger]:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: -2px;
}

/* Panel content */
[baseUiCollapsiblePanel] {
  padding: 1rem;
  background: #fafafa;
  border-top: 1px solid #e5e5e5;
}

/* Animated panel using CSS Grid */
[baseUiCollapsiblePanel] {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
  padding: 0;
}

[baseUiCollapsiblePanel][data-open] {
  grid-template-rows: 1fr;
}

[baseUiCollapsiblePanel] > * {
  overflow: hidden;
  padding: 0 1rem;
}

[baseUiCollapsiblePanel][data-open] > * {
  padding: 1rem;
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the collapsible is open. Supports two-way binding with [(open)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the collapsible is disabled.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<CollapsibleChangeEventDetails>',
      description:
        'Emitted when the open state changes. Includes open boolean and reason (trigger-press, programmatic).',
    },
  ];

  protected readonly panelInputProps: PropDefinition[] = [
    {
      name: 'keepMounted',
      type: 'boolean',
      default: 'false',
      description:
        'Whether to keep the panel in the DOM when collapsed. Useful for preserving form state.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-open',
      type: 'string',
      description: 'Present when the collapsible is expanded.',
    },
    {
      name: 'data-closed',
      type: 'string',
      description: 'Present when the collapsible is collapsed.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the collapsible is disabled.',
    },
  ];
}

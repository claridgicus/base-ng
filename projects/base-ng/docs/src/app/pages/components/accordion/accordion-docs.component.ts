import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  AccordionRootDirective,
  AccordionItemDirective,
  AccordionHeaderDirective,
  AccordionTriggerDirective,
  AccordionPanelDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-accordion',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    AccordionRootDirective,
    AccordionItemDirective,
    AccordionHeaderDirective,
    AccordionTriggerDirective,
    AccordionPanelDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Accordion</h1>
        <p class="docs-description">
          A vertically stacked set of interactive headings that each reveal an
          associated section of content. Supports single or multiple expanded
          sections with keyboard navigation.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div baseUiAccordionRoot [(value)]="expandedItems" class="demo-accordion">
            <div baseUiAccordionItem value="faq-1" class="demo-item">
              <h3 baseUiAccordionHeader>
                <button baseUiAccordionTrigger class="demo-trigger">
                  <span>What is Base UI Angular?</span>
                  <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
                  </svg>
                </button>
              </h3>
              <div baseUiAccordionPanel [keepMounted]="true" class="demo-panel">
                <div class="demo-panel-content">
                  Base UI Angular is a collection of unstyled, accessible UI components
                  for Angular applications.
                </div>
              </div>
            </div>
            <div baseUiAccordionItem value="faq-2" class="demo-item">
              <h3 baseUiAccordionHeader>
                <button baseUiAccordionTrigger class="demo-trigger">
                  <span>How do I install it?</span>
                  <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
                  </svg>
                </button>
              </h3>
              <div baseUiAccordionPanel [keepMounted]="true" class="demo-panel">
                <div class="demo-panel-content">
                  Run <code>npm install &#64;base-ng/ui</code> and import the components you need.
                </div>
              </div>
            </div>
            <div baseUiAccordionItem value="faq-3" class="demo-item">
              <h3 baseUiAccordionHeader>
                <button baseUiAccordionTrigger class="demo-trigger">
                  <span>Is it accessible?</span>
                  <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
                  </svg>
                </button>
              </h3>
              <div baseUiAccordionPanel [keepMounted]="true" class="demo-panel">
                <div class="demo-panel-content">
                  Yes! All components follow WAI-ARIA guidelines and support keyboard navigation.
                </div>
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
          The Accordion uses a directive-based composition pattern with multiple
          nested parts:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Use <code>[(value)]</code> to control which items are expanded:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Multiple expanded items</h3>
        <p class="docs-paragraph">
          Enable <code>multiple</code> to allow more than one item to be
          expanded at a time:
        </p>
        <docs-demo [code]="multipleDemoCode" language="html">
          <div baseUiAccordionRoot [(value)]="multipleItems" [multiple]="true" class="demo-accordion">
            <div baseUiAccordionItem value="section-1" class="demo-item">
              <h3 baseUiAccordionHeader>
                <button baseUiAccordionTrigger class="demo-trigger">
                  <span>Section 1</span>
                  <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
                  </svg>
                </button>
              </h3>
              <div baseUiAccordionPanel [keepMounted]="true" class="demo-panel">
                <div class="demo-panel-content">Content for section 1</div>
              </div>
            </div>
            <div baseUiAccordionItem value="section-2" class="demo-item">
              <h3 baseUiAccordionHeader>
                <button baseUiAccordionTrigger class="demo-trigger">
                  <span>Section 2</span>
                  <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
                  </svg>
                </button>
              </h3>
              <div baseUiAccordionPanel [keepMounted]="true" class="demo-panel">
                <div class="demo-panel-content">Content for section 2</div>
              </div>
            </div>
            <div baseUiAccordionItem value="section-3" class="demo-item">
              <h3 baseUiAccordionHeader>
                <button baseUiAccordionTrigger class="demo-trigger">
                  <span>Section 3</span>
                  <svg class="demo-chevron" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
                  </svg>
                </button>
              </h3>
              <div baseUiAccordionPanel [keepMounted]="true" class="demo-panel">
                <div class="demo-panel-content">Content for section 3</div>
              </div>
            </div>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Default expanded</h3>
        <p class="docs-paragraph">
          Initialize <code>value</code> to expand items by default:
        </p>
        <docs-code-block [code]="defaultExpandedCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Disable the entire accordion or individual items:
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Keep panel mounted</h3>
        <p class="docs-paragraph">
          Use <code>keepMounted</code> on the panel to keep content in the DOM
          when collapsed (useful for SEO or form state preservation):
        </p>
        <docs-code-block [code]="keepMountedCode" language="html" />

        <h3 class="docs-section-subtitle">With chevron indicator</h3>
        <p class="docs-paragraph">
          Add a rotating chevron icon to indicate open/closed state:
        </p>
        <docs-code-block [code]="chevronDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes to style different accordion states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table
          title="AccordionRoot Inputs"
          [props]="rootInputProps"
        />
        <docs-props-table
          title="AccordionRoot Outputs"
          [props]="rootOutputProps"
        />
        <docs-props-table
          title="AccordionItem Inputs"
          [props]="itemInputProps"
        />
        <docs-props-table
          title="AccordionPanel Inputs"
          [props]="panelInputProps"
        />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table title="AccordionRoot" [props]="rootDataAttributes" />
        <docs-props-table
          title="AccordionItem / AccordionHeader / AccordionTrigger"
          [props]="itemDataAttributes"
        />
        <docs-props-table title="AccordionPanel" [props]="panelDataAttributes" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Accordion component follows WAI-ARIA Accordion pattern:
        </p>
        <ul class="docs-list">
          <li>
            Triggers use <code>aria-expanded</code> to indicate open state
          </li>
          <li>
            <code>aria-controls</code> links trigger to its associated panel
          </li>
          <li>
            Panels use <code>role="region"</code> with
            <code>aria-labelledby</code>
          </li>
          <li>Keyboard navigation with Tab to focus triggers</li>
          <li>Enter or Space to toggle the focused item</li>
          <li>Disabled items are announced via <code>aria-disabled</code></li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/accordion/accordion-docs.component.ts"
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
    .demo-accordion {
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      overflow: hidden;
      width: 100%;
      max-width: 400px;
    }

    .demo-item {
      border-bottom: 1px solid var(--docs-border);

      &:last-child {
        border-bottom: none;
      }
    }

    h3[baseUiAccordionHeader] {
      margin: 0;
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

      &[data-open] {
        background: var(--docs-bg-muted, rgba(0, 0, 0, 0.02));
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

      code {
        background: var(--docs-bg-code, rgba(0, 0, 0, 0.05));
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.8125rem;
      }
    }
  `,
})
export class AccordionDocsComponent {
  // Demo state
  protected readonly expandedItems = signal<string[]>([]);
  protected readonly multipleItems = signal<string[]>([]);

  protected readonly importCode = `import {
  AccordionRootDirective,
  AccordionItemDirective,
  AccordionHeaderDirective,
  AccordionTriggerDirective,
  AccordionPanelDirective,
} from '@copied/base-ng';

@Component({
  imports: [
    AccordionRootDirective,
    AccordionItemDirective,
    AccordionHeaderDirective,
    AccordionTriggerDirective,
    AccordionPanelDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiAccordionRoot [(value)]="expandedItems">
  <div baseUiAccordionItem value="item-1">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Section 1</button>
    </h3>
    <div baseUiAccordionPanel>
      Content for section 1
    </div>
  </div>
  <div baseUiAccordionItem value="item-2">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Section 2</button>
    </h3>
    <div baseUiAccordionPanel>
      Content for section 2
    </div>
  </div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiAccordionRoot [(value)]="expandedItems">
  <div baseUiAccordionItem value="faq-1">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>
        What is Base UI Angular?
      </button>
    </h3>
    <div baseUiAccordionPanel>
      Base UI Angular is a collection of unstyled, accessible UI components
      for Angular applications.
    </div>
  </div>

  <div baseUiAccordionItem value="faq-2">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>
        How do I install it?
      </button>
    </h3>
    <div baseUiAccordionPanel>
      Run npm install @copied/base-ng and import the components you need.
    </div>
  </div>
</div>

<!-- In component class -->
expandedItems: string[] = [];`;

  protected readonly multipleDemoCode = `<div baseUiAccordionRoot [(value)]="expandedItems" multiple>
  <div baseUiAccordionItem value="section-1">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Section 1</button>
    </h3>
    <div baseUiAccordionPanel>Content 1</div>
  </div>
  <div baseUiAccordionItem value="section-2">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Section 2</button>
    </h3>
    <div baseUiAccordionPanel>Content 2</div>
  </div>
  <div baseUiAccordionItem value="section-3">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Section 3</button>
    </h3>
    <div baseUiAccordionPanel>Content 3</div>
  </div>
</div>

<!-- Multiple items can now be open simultaneously -->`;

  protected readonly defaultExpandedCode = `<div baseUiAccordionRoot [value]="['intro']">
  <div baseUiAccordionItem value="intro">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Introduction (expanded by default)</button>
    </h3>
    <div baseUiAccordionPanel>
      This section is expanded when the component loads.
    </div>
  </div>
  <div baseUiAccordionItem value="details">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Details</button>
    </h3>
    <div baseUiAccordionPanel>
      This section starts collapsed.
    </div>
  </div>
</div>`;

  protected readonly disabledDemoCode = `<!-- Disable entire accordion -->
<div baseUiAccordionRoot disabled>
  <div baseUiAccordionItem value="item-1">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Disabled section</button>
    </h3>
    <div baseUiAccordionPanel>Cannot be toggled</div>
  </div>
</div>

<!-- Disable individual item -->
<div baseUiAccordionRoot>
  <div baseUiAccordionItem value="item-1">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Enabled</button>
    </h3>
    <div baseUiAccordionPanel>This works normally</div>
  </div>
  <div baseUiAccordionItem value="item-2" disabled>
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Disabled</button>
    </h3>
    <div baseUiAccordionPanel>This item cannot be toggled</div>
  </div>
</div>`;

  protected readonly keepMountedCode = `<div baseUiAccordionRoot>
  <div baseUiAccordionItem value="form">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Form Section</button>
    </h3>
    <div baseUiAccordionPanel keepMounted>
      <!-- Form state is preserved even when collapsed -->
      <form>
        <input [(ngModel)]="formData.name" name="name" />
        <input [(ngModel)]="formData.email" name="email" />
      </form>
    </div>
  </div>
</div>`;

  protected readonly chevronDemoCode = `<div baseUiAccordionRoot>
  <div baseUiAccordionItem value="section-1">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger class="trigger-with-chevron">
        <span>Section title</span>
        <svg class="chevron" viewBox="0 0 24 24" width="16" height="16">
          <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
      </button>
    </h3>
    <div baseUiAccordionPanel>Content here</div>
  </div>
</div>

<!-- CSS for rotating chevron -->
<style>
  .trigger-with-chevron {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .chevron {
    transition: transform 0.2s;
  }

  [baseUiAccordionTrigger][data-open] .chevron {
    transform: rotate(180deg);
  }
</style>`;

  protected readonly stylingCode = `/* Accordion container */
[baseUiAccordionRoot] {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

/* Accordion item */
[baseUiAccordionItem] {
  border-bottom: 1px solid #e5e5e5;
}

[baseUiAccordionItem]:last-child {
  border-bottom: none;
}

/* Header wrapper */
[baseUiAccordionHeader] {
  margin: 0;
}

/* Trigger button */
[baseUiAccordionTrigger] {
  display: flex;
  width: 100%;
  padding: 1rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

[baseUiAccordionTrigger]:hover {
  background: #f5f5f5;
}

/* Open state */
[baseUiAccordionTrigger][data-open] {
  background: #f0f0f0;
}

/* Disabled state */
[baseUiAccordionTrigger][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
[baseUiAccordionTrigger]:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: -2px;
}

/* Panel content */
[baseUiAccordionPanel] {
  padding: 1rem;
  background: #fafafa;
}

/* Panel animation */
[baseUiAccordionPanel][data-open] {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string[]',
      default: '[]',
      description:
        'Array of expanded item values. Supports two-way binding with [(value)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the entire accordion is disabled.',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'The orientation of the accordion.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Whether multiple items can be expanded simultaneously.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'valueChanged',
      type: 'EventEmitter<AccordionChangeEventDetails>',
      description:
        'Emitted when expanded items change. Includes value array, changedItem, and action ("expand" or "collapse").',
    },
  ];

  protected readonly itemInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Unique identifier for this accordion item.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether this specific item is disabled.',
    },
  ];

  protected readonly panelInputProps: PropDefinition[] = [
    {
      name: 'keepMounted',
      type: 'boolean',
      default: 'false',
      description:
        'Whether to keep the panel in the DOM when collapsed. Useful for preserving form state or SEO.',
    },
  ];

  protected readonly rootDataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the accordion is disabled.',
    },
    {
      name: 'data-orientation',
      type: "'vertical' | 'horizontal'",
      description: 'The orientation of the accordion.',
    },
  ];

  protected readonly itemDataAttributes: PropDefinition[] = [
    {
      name: 'data-open',
      type: 'string',
      description: 'Present when the item is expanded.',
    },
    {
      name: 'data-closed',
      type: 'string',
      description: 'Present when the item is collapsed.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the item is disabled.',
    },
  ];

  protected readonly panelDataAttributes: PropDefinition[] = [
    {
      name: 'data-open',
      type: 'string',
      description: 'Present when the panel is visible.',
    },
    {
      name: 'data-closed',
      type: 'string',
      description: 'Present when the panel is hidden.',
    },
  ];
}

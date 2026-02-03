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
          <div class="flex min-h-36 flex-col justify-center">
            <div
              baseUiCollapsibleRoot
              [(open)]="isOpen"
              class="min-w-48"
            >
              <button
                baseUiCollapsibleTrigger
                class="group flex w-full items-center gap-2 rounded-sm bg-gray-100 px-2 py-1 text-sm font-medium hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  class="size-3 transition-all ease-out group-data-[panel-open]:rotate-90"
                >
                  <path d="M3.5 9L7.5 5L3.5 1" stroke="currentColor" />
                </svg>
                Recovery keys
              </button>
              <div
                baseUiCollapsiblePanel
                [keepMounted]="true"
                class="flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden text-sm transition-all duration-150 ease-out data-[closed]:h-0"
                style="--collapsible-panel-height: auto;"
              >
                <div class="mt-1 flex w-full cursor-text flex-col gap-2 rounded-sm bg-gray-100 py-2 pl-7">
                  <div class="text-gray-900 dark:text-gray-100">alien-bean-pasta</div>
                  <div class="text-gray-900 dark:text-gray-100">wild-irish-burrito</div>
                  <div class="text-gray-900 dark:text-gray-100">horse-battery-staple</div>
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
          <div class="flex flex-col gap-3">
            <div class="flex w-56 flex-col justify-center">
              <div
                baseUiCollapsibleRoot
                [(open)]="disabledOpen"
                [disabled]="isDisabled()"
                class="data-[disabled]:opacity-50"
              >
                <button
                  baseUiCollapsibleTrigger
                  class="group flex items-center gap-2 rounded-sm bg-gray-100 px-2 py-1 text-sm font-medium hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-gray-100"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    class="size-3 transition-all ease-out group-data-[panel-open]:rotate-90"
                  >
                    <path d="M3.5 9L7.5 5L3.5 1" stroke="currentColor" />
                  </svg>
                  Toggle content
                </button>
                <div
                  baseUiCollapsiblePanel
                  [keepMounted]="true"
                  class="h-[var(--collapsible-panel-height)] overflow-hidden text-sm transition-all duration-150 ease-out data-[closed]:h-0"
                  style="--collapsible-panel-height: auto;"
                >
                  <div class="py-2 px-5 text-gray-700">
                    This content cannot be toggled when disabled.
                  </div>
                </div>
              </div>
            </div>
            <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
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

  protected readonly basicDemoCode = `<div class="flex min-h-36 flex-col justify-center">
  <div baseUiCollapsibleRoot [(open)]="isOpen" class="w-fit">
    <button
      baseUiCollapsibleTrigger
      class="group flex w-full items-center gap-2 rounded-sm bg-gray-100 px-2 py-1
             text-sm font-medium hover:bg-gray-200 focus-visible:outline"
    >
      <svg
        width="10" height="10" viewBox="0 0 10 10" fill="none"
        class="size-3 transition-all ease-out group-data-[panel-open]:rotate-90"
      >
        <path d="M3.5 9L7.5 5L3.5 1" stroke="currentColor" />
      </svg>
      Recovery keys
    </button>
    <div
      baseUiCollapsiblePanel
      [keepMounted]="true"
      class="flex h-[var(--collapsible-panel-height)] flex-col justify-end
             overflow-hidden text-sm transition-all duration-150 ease-out
             data-[closed]:h-0"
      style="--collapsible-panel-height: auto;"
    >
      <div class="mt-1 flex w-full cursor-text flex-col gap-2 rounded-sm bg-gray-100 py-2 pl-7">
        <div class="text-gray-900 dark:text-gray-100">alien-bean-pasta</div>
        <div class="text-gray-900 dark:text-gray-100">wild-irish-burrito</div>
        <div class="text-gray-900 dark:text-gray-100">horse-battery-staple</div>
      </div>
    </div>
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

  protected readonly stylingCode = `<!-- Tailwind CSS 4 Collapsible styling -->

<!-- Trigger with icon rotation on open -->
<button
  baseUiCollapsibleTrigger
  class="group flex items-center gap-2 rounded-sm bg-gray-100 px-2 py-1
         text-sm font-medium hover:bg-gray-200 focus-visible:outline
         data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
>
  <svg class="size-3 transition-all ease-out group-data-[panel-open]:rotate-90">
    <!-- icon -->
  </svg>
  Trigger text
</button>

<!-- Panel with height animation -->
<div
  baseUiCollapsiblePanel
  class="h-[var(--collapsible-panel-height)] overflow-hidden
         transition-all duration-150 ease-out data-[closed]:h-0"
  style="--collapsible-panel-height: auto;"
>
  <!-- Content -->
</div>

<!-- Key Tailwind classes used:
- group / group-data-[panel-open]:rotate-90 - Icon rotation
- data-[closed]:h-0 - Collapse animation
- data-[disabled]:opacity-50 - Disabled state
- transition-all duration-150 ease-out - Smooth animations
-->`;

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

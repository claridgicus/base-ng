import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import { ToggleGroupDirective, ToggleDirective } from '@base-ng/ui';

@Component({
  selector: 'docs-toggle-group',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    ToggleGroupDirective,
    ToggleDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Toggle Group</h1>
        <p class="docs-description">
          A container that provides shared state to a series of toggle buttons.
          Use Toggle Group for mutually exclusive or multi-select options like
          text alignment, view modes, or formatting toolbars.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="singleDemoCode" language="html">
          <div class="demo-container">
            <div baseUiToggleGroup [(value)]="viewMode" class="demo-toggle-group">
              <button baseUiToggle value="list" class="demo-toggle">📋 List</button>
              <button baseUiToggle value="grid" class="demo-toggle">⊞ Grid</button>
              <button baseUiToggle value="table" class="demo-toggle">▦ Table</button>
            </div>
            <span class="demo-status">Selected: {{ viewMode()[0] || 'none' }}</span>
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
          The Toggle Group wraps multiple Toggle buttons and coordinates their state:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Multiple selection</h3>
        <p class="docs-paragraph">
          Set <code>multiple="true"</code> to allow multiple toggles to be
          pressed simultaneously:
        </p>
        <docs-demo [code]="multipleDemoCode" language="html">
          <div class="demo-container">
            <div baseUiToggleGroup [(value)]="formats" [multiple]="true" class="demo-toggle-group">
              <button baseUiToggle value="bold" class="demo-toggle"><strong>B</strong></button>
              <button baseUiToggle value="italic" class="demo-toggle"><em>I</em></button>
              <button baseUiToggle value="underline" class="demo-toggle"><u>U</u></button>
            </div>
            <span class="demo-status">Selected: {{ formats().join(', ') || 'none' }}</span>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Text alignment</h3>
        <p class="docs-paragraph">
          Single selection for mutually exclusive options like text alignment:
        </p>
        <docs-demo [code]="alignmentDemoCode" language="html">
          <div class="demo-container">
            <div baseUiToggleGroup [(value)]="alignment" class="demo-toggle-group">
              <button baseUiToggle value="left" class="demo-toggle" aria-label="Align left">⇤</button>
              <button baseUiToggle value="center" class="demo-toggle" aria-label="Align center">⇔</button>
              <button baseUiToggle value="right" class="demo-toggle" aria-label="Align right">⇥</button>
            </div>
            <span class="demo-status">Alignment: {{ alignment()[0] || 'none' }}</span>
          </div>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Toggle Group is unstyled by default. Style the container and
          individual toggles based on orientation and state:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Toggle Group with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Inputs" [props]="inputProps" />
        <docs-props-table title="Outputs" [props]="outputProps" />
        <docs-props-table title="Methods" [props]="methods" />
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

      <!-- Context -->
      <section class="docs-section">
        <h2 class="docs-section-title">Context</h2>
        <p class="docs-paragraph">
          The Toggle Group provides context to child Toggle components via
          dependency injection. Toggle components automatically detect when
          they're inside a group and coordinate their state accordingly.
        </p>
        <docs-code-block [code]="contextCode" language="typescript" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Toggle Group follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="group"</code> for semantic grouping</li>
          <li>
            Sets <code>aria-orientation</code> to communicate layout to
            assistive technologies
          </li>
          <li>
            Supports keyboard navigation with arrow keys when
            <code>loopFocus</code> is enabled
          </li>
          <li>
            Individual toggles automatically set <code>aria-pressed</code>
            based on group state
          </li>
          <li>
            Add <code>aria-label</code> to icon-only toggles for accessibility
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/toggle-group/toggle-group-docs.component.ts"
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
      align-items: flex-start;
      gap: 0.75rem;
    }

    .demo-toggle-group {
      display: inline-flex;
      gap: 0.25rem;
      padding: 0.25rem;
      background: var(--docs-bg-secondary);
      border-radius: 0.5rem;
    }

    .demo-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      padding: 0 0.75rem;
      background: transparent;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
      transition: all 0.15s;

      &:hover:not([data-disabled]) {
        background: rgba(0, 0, 0, 0.05);
      }

      &[data-pressed] {
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }
    }

    .demo-status {
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
    }
  `,
})
export class ToggleGroupDocsComponent {
  protected readonly viewMode = signal<string[]>(['list']);
  protected readonly formats = signal<string[]>([]);
  protected readonly alignment = signal<string[]>(['left']);
  protected readonly importCode = `import { ToggleGroupDirective } from '@base-ng/ui/toggle-group';
import { ToggleDirective } from '@base-ng/ui/toggle';

@Component({
  imports: [ToggleGroupDirective, ToggleDirective],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiToggleGroup [(value)]="selectedValues">
  <button baseUiToggle value="option1">Option 1</button>
  <button baseUiToggle value="option2">Option 2</button>
  <button baseUiToggle value="option3">Option 3</button>
</div>`;

  protected readonly singleDemoCode = `<!-- Single selection mode (default) -->
<div baseUiToggleGroup [(value)]="viewMode">
  <button baseUiToggle value="list" aria-label="List view">
    List
  </button>
  <button baseUiToggle value="grid" aria-label="Grid view">
    Grid
  </button>
  <button baseUiToggle value="table" aria-label="Table view">
    Table
  </button>
</div>

// viewMode will be ['list'], ['grid'], ['table'], or []`;

  protected readonly multipleDemoCode = `<!-- Multiple selection mode -->
<div baseUiToggleGroup [(value)]="selectedFormats" [multiple]="true">
  <button baseUiToggle value="bold">Bold</button>
  <button baseUiToggle value="italic">Italic</button>
  <button baseUiToggle value="underline">Underline</button>
</div>

// selectedFormats can be ['bold'], ['bold', 'italic'], etc.`;

  protected readonly alignmentDemoCode = `<div baseUiToggleGroup [(value)]="alignment" class="alignment-toolbar">
  <button baseUiToggle value="left" aria-label="Align left">
    <svg><!-- left align icon --></svg>
  </button>
  <button baseUiToggle value="center" aria-label="Align center">
    <svg><!-- center align icon --></svg>
  </button>
  <button baseUiToggle value="right" aria-label="Align right">
    <svg><!-- right align icon --></svg>
  </button>
  <button baseUiToggle value="justify" aria-label="Justify">
    <svg><!-- justify icon --></svg>
  </button>
</div>`;

  protected readonly formattingDemoCode = `<div
  baseUiToggleGroup
  [(value)]="textFormats"
  [multiple]="true"
  class="format-toolbar"
>
  <button baseUiToggle value="bold" aria-label="Bold">
    <strong>B</strong>
  </button>
  <button baseUiToggle value="italic" aria-label="Italic">
    <em>I</em>
  </button>
  <button baseUiToggle value="underline" aria-label="Underline">
    <u>U</u>
  </button>
  <button baseUiToggle value="strikethrough" aria-label="Strikethrough">
    <s>S</s>
  </button>
</div>`;

  protected readonly verticalDemoCode = `<div
  baseUiToggleGroup
  [(value)]="selectedTool"
  orientation="vertical"
  class="tool-palette"
>
  <button baseUiToggle value="select" aria-label="Select tool">
    <svg><!-- cursor icon --></svg>
  </button>
  <button baseUiToggle value="pen" aria-label="Pen tool">
    <svg><!-- pen icon --></svg>
  </button>
  <button baseUiToggle value="eraser" aria-label="Eraser tool">
    <svg><!-- eraser icon --></svg>
  </button>
</div>`;

  protected readonly disabledDemoCode = `<div
  baseUiToggleGroup
  [(value)]="selectedOption"
  [disabled]="isLocked()"
>
  <button baseUiToggle value="a">Option A</button>
  <button baseUiToggle value="b">Option B</button>
  <button baseUiToggle value="c">Option C</button>
</div>`;

  protected readonly programmaticDemoCode = `@Component({
  template: \`
    <div baseUiToggleGroup #toggleGroup="toggleGroup" [(value)]="formats">
      <button baseUiToggle value="bold">Bold</button>
      <button baseUiToggle value="italic">Italic</button>
    </div>

    <button (click)="selectAll()">Select All</button>
    <button (click)="toggleGroup.clear()">Clear All</button>
  \`,
})
export class MyComponent {
  readonly formats = signal<string[]>([]);

  @ViewChild('toggleGroup') toggleGroup!: ToggleGroupDirective;

  selectAll(): void {
    this.toggleGroup.select('bold');
    this.toggleGroup.select('italic');
  }
}`;

  protected readonly stylingCode = `/* Toggle Group container */
[baseUiToggleGroup] {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
}

/* Vertical orientation */
[baseUiToggleGroup][data-orientation="vertical"] {
  flex-direction: column;
}

/* Disabled group */
[baseUiToggleGroup][data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

/* Toggle buttons inside group */
[baseUiToggleGroup] [baseUiToggle] {
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s;
}

[baseUiToggleGroup] [baseUiToggle]:hover:not([data-disabled]) {
  background: rgba(0, 0, 0, 0.05);
}

[baseUiToggleGroup] [baseUiToggle][data-pressed] {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`;

  protected readonly tailwindCode = `<div
  baseUiToggleGroup
  [(value)]="viewMode"
  class="inline-flex gap-1 p-1 bg-gray-100 rounded-lg"
>
  <button
    baseUiToggle
    value="list"
    class="px-3 py-2 rounded-md text-sm font-medium
           hover:bg-gray-200
           data-[pressed]:bg-white data-[pressed]:shadow-sm
           transition-all duration-150"
  >
    List
  </button>
  <button
    baseUiToggle
    value="grid"
    class="px-3 py-2 rounded-md text-sm font-medium
           hover:bg-gray-200
           data-[pressed]:bg-white data-[pressed]:shadow-sm
           transition-all duration-150"
  >
    Grid
  </button>
</div>`;

  protected readonly contextCode = `import { inject } from '@angular/core';
import { TOGGLE_GROUP_CONTEXT } from '@base-ng/ui/toggle-group';

@Directive({
  selector: '[myCustomToggle]',
})
export class MyCustomToggle {
  // Inject context (optional - null if not in a group)
  private groupContext = inject(TOGGLE_GROUP_CONTEXT, { optional: true });

  // Access group state
  get isInGroup(): boolean {
    return !!this.groupContext;
  }

  get selectedValues(): string[] {
    return this.groupContext?.value() ?? [];
  }
}`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string[]',
      default: '[]',
      description:
        'Currently selected toggle values. Supports two-way binding with [(value)].',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description:
        'Whether multiple toggles can be selected simultaneously.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the entire toggle group is disabled.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Layout orientation for accessibility and styling.',
    },
    {
      name: 'loopFocus',
      type: 'boolean',
      default: 'true',
      description:
        'Whether keyboard focus wraps when reaching the ends of the group.',
    },
  ];

  protected readonly outputProps: PropDefinition[] = [
    {
      name: 'valueChange',
      type: 'EventEmitter<string[]>',
      description: 'Emitted when the selected values change.',
    },
    {
      name: 'valueChangeDetails',
      type: 'EventEmitter<{value: string[], details: ToggleChangeEventDetails}>',
      description: 'Emitted with full event details when values change.',
    },
  ];

  protected readonly methods: PropDefinition[] = [
    {
      name: 'isSelected(value: string)',
      type: 'boolean',
      description: 'Check if a toggle value is currently selected.',
    },
    {
      name: 'select(value: string)',
      type: 'void',
      description: 'Programmatically select a toggle value.',
    },
    {
      name: 'deselect(value: string)',
      type: 'void',
      description: 'Programmatically deselect a toggle value.',
    },
    {
      name: 'clear()',
      type: 'void',
      description: 'Clear all selections.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'Indicates the current orientation.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the group is disabled.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-toggle-group',
      type: 'class',
      description: 'Applied to all toggle group instances.',
    },
    {
      name: 'base-ui-toggle-group-horizontal',
      type: 'class',
      description: 'Applied when orientation is horizontal.',
    },
    {
      name: 'base-ui-toggle-group-vertical',
      type: 'class',
      description: 'Applied when orientation is vertical.',
    },
    {
      name: 'base-ui-toggle-group-disabled',
      type: 'class',
      description: 'Applied when the group is disabled.',
    },
  ];
}

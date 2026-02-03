import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  RadioGroupDirective,
  RadioRootDirective,
  RadioIndicatorDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-radio-group',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    RadioGroupDirective,
    RadioRootDirective,
    RadioIndicatorDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Radio Group</h1>
        <p class="docs-description">
          A container that manages the state of multiple radio buttons, enforcing
          single selection. Provides shared context for child radios and supports
          Angular forms integration.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-container">
            <div baseUiRadioGroup [(value)]="selectedOption" class="demo-radio-group">
              @for (option of options; track option.value) {
                <button baseUiRadioRoot [value]="option.value" class="demo-radio">
                  <span baseUiRadioIndicator [keepMounted]="true" class="demo-indicator"></span>
                  {{ option.label }}
                </button>
              }
            </div>
            <span class="demo-status">Selected: {{ selectedOption() }}</span>
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
          Wrap Radio components in a Radio Group:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Horizontal layout</h3>
        <p class="docs-paragraph">
          Radio groups can be arranged horizontally:
        </p>
        <docs-demo [code]="horizontalDemoCode" language="html">
          <div baseUiRadioGroup [(value)]="selectedAlignment" class="demo-radio-group demo-horizontal">
            @for (align of alignments; track align.value) {
              <button baseUiRadioRoot [value]="align.value" class="demo-radio">
                <span baseUiRadioIndicator [keepMounted]="true" class="demo-indicator"></span>
                {{ align.label }}
              </button>
            }
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Disabled group</h3>
        <p class="docs-paragraph">
          Disable all radios in the group:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div class="demo-container">
            <div baseUiRadioGroup [(value)]="disabledSelection" [disabled]="isDisabled()" class="demo-radio-group">
              <button baseUiRadioRoot value="a" class="demo-radio">
                <span baseUiRadioIndicator [keepMounted]="true" class="demo-indicator"></span>
                Option A
              </button>
              <button baseUiRadioRoot value="b" class="demo-radio">
                <span baseUiRadioIndicator [keepMounted]="true" class="demo-indicator"></span>
                Option B
              </button>
              <button baseUiRadioRoot value="c" class="demo-radio">
                <span baseUiRadioIndicator [keepMounted]="true" class="demo-indicator"></span>
                Option C
              </button>
            </div>
            <label class="demo-toggle">
              <input type="checkbox" [checked]="isDisabled()" (change)="toggleDisabled()" />
              Disabled
            </label>
          </div>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Radio Group using CSS:
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
        <docs-props-table title="Inputs" [props]="inputProps" />
        <docs-props-table title="Outputs" [props]="outputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table [props]="dataAttributes" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Radio Group follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="radiogroup"</code> for proper semantics</li>
          <li>Manages focus and selection state for child radios</li>
          <li>
            <strong>Required:</strong> Provide a group label using Fieldset or
            <code>aria-labelledby</code>
          </li>
          <li>
            Disabled state sets <code>aria-disabled</code> on group and children
          </li>
          <li>
            Tab navigation enters group, Arrow keys move between radios
          </li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/radio-group/radio-group-docs.component.ts"
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

    .demo-radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &[data-disabled] {
        opacity: 0.5;
      }
    }

    .demo-horizontal {
      flex-direction: row;
      gap: 1.5rem;
    }

    .demo-radio {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--docs-text);

      &:focus-visible .demo-indicator {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }

      &[data-disabled] {
        cursor: not-allowed;
      }
    }

    .demo-indicator {
      width: 20px;
      height: 20px;
      border: 2px solid var(--docs-border);
      border-radius: 50%;
      position: relative;
      transition: all 0.15s;

      &::after {
        content: '';
        position: absolute;
        inset: 3px;
        background: var(--docs-accent, #0066ff);
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.15s;
      }

      [data-checked] & {
        border-color: var(--docs-accent, #0066ff);

        &::after {
          transform: scale(1);
        }
      }
    }

    .demo-status {
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
    }

    .demo-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
      margin-top: 0.5rem;
    }
  `,
})
export class RadioGroupDocsComponent {
  // Basic demo
  protected readonly options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  protected readonly selectedOption = signal('option1');

  // Horizontal demo
  protected readonly alignments = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];
  protected readonly selectedAlignment = signal('center');

  // Disabled demo
  protected readonly disabledSelection = signal('a');
  protected readonly isDisabled = signal(false);

  protected toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }

  protected readonly importCode = `import {
  RadioGroupDirective,
  RadioRootDirective,
  RadioIndicatorDirective,
} from '@copied/base-ng';

@Component({
  imports: [
    RadioGroupDirective,
    RadioRootDirective,
    RadioIndicatorDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiRadioGroup [(value)]="selected">
  <button baseUiRadioRoot value="option1">
    <span baseUiRadioIndicator></span>
    Option 1
  </button>
  <button baseUiRadioRoot value="option2">
    <span baseUiRadioIndicator></span>
    Option 2
  </button>
</div>`;

  protected readonly basicDemoCode = `<div baseUiRadioGroup [(value)]="selectedOption" class="radio-group">
  @for (option of options; track option.value) {
    <button baseUiRadioRoot [value]="option.value" class="radio">
      <span baseUiRadioIndicator class="radio-indicator"></span>
      {{ option.label }}
    </button>
  }
</div>

<p>Selected: {{ selectedOption() }}</p>`;

  protected readonly horizontalDemoCode = `<div
  baseUiRadioGroup
  [(value)]="alignment"
  class="radio-group horizontal"
>
  <button baseUiRadioRoot value="left" class="radio">
    <span baseUiRadioIndicator></span>
    Left
  </button>
  <button baseUiRadioRoot value="center" class="radio">
    <span baseUiRadioIndicator></span>
    Center
  </button>
  <button baseUiRadioRoot value="right" class="radio">
    <span baseUiRadioIndicator></span>
    Right
  </button>
</div>`;

  protected readonly disabledDemoCode = `<div
  baseUiRadioGroup
  [(value)]="selected"
  [disabled]="isDisabled"
>
  <button baseUiRadioRoot value="a">Option A</button>
  <button baseUiRadioRoot value="b">Option B</button>
  <button baseUiRadioRoot value="c">Option C</button>
</div>`;

  protected readonly stylingCode = `/* Radio group container */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-group.horizontal {
  flex-direction: row;
  gap: 1.5rem;
}

/* Disabled group */
[baseUiRadioGroup][data-disabled] {
  opacity: 0.5;
}

/* Radio styling - see Radio documentation */`;

  protected readonly tailwindCode = `<div
  baseUiRadioGroup
  [(value)]="selected"
  class="flex flex-col gap-2 data-[disabled]:opacity-50"
>
  @for (option of options; track option.value) {
    <button
      baseUiRadioRoot
      [value]="option.value"
      class="inline-flex items-center gap-2"
    >
      <span
        baseUiRadioIndicator
        [keepMounted]="true"
        class="w-5 h-5 border-2 border-gray-300 rounded-full
               data-[checked]:border-blue-600
               after:absolute after:inset-[3px] after:rounded-full
               after:bg-blue-600 after:scale-0
               data-[checked]:after:scale-100"
      ></span>
      {{ option.label }}
    </button>
  }
</div>`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Currently selected value. Supports two-way binding.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name for form submission.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable the entire radio group.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Make the entire group read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Mark the group as required.',
    },
  ];

  protected readonly outputProps: PropDefinition[] = [
    {
      name: 'valueChanged',
      type: 'EventEmitter<RadioGroupChangeEventDetails>',
      description: 'Emitted when the selected value changes.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the group is disabled.',
    },
    {
      name: 'data-readonly',
      type: 'string',
      description: 'Present when the group is read-only.',
    },
    {
      name: 'data-required',
      type: 'string',
      description: 'Present when the group is required.',
    },
  ];
}

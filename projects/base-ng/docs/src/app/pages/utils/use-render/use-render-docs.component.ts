import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-use-render',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <div class="docs-page">
      <header class="docs-header">
        <h1>useRender</h1>
        <p>
          Utilities for applying state-based data attributes to elements and
          implementing render prop patterns in Angular.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2>Installation</h2>
        <docs-package-selector
          packageName="@base-ng/ui"
          importName="RenderElementDirective, computeStateAttributes, applyStateAttributes, createRenderContext"
        />
      </section>

      <!-- Overview -->
      <section class="docs-section">
        <h2>Overview</h2>
        <p>
          Base UI components use data attributes to expose component state for
          CSS styling. The useRender utilities help you:
        </p>
        <ul>
          <li>Apply data attributes based on component state</li>
          <li>Compute attribute values from state objects</li>
          <li>Create render contexts for custom templates</li>
          <li>Enable state-based CSS styling patterns</li>
        </ul>
      </section>

      <!-- State Directive -->
      <section class="docs-section">
        <h2>RenderElementDirective</h2>
        <p>
          Apply state attributes declaratively using the
          <code>baseUiState</code> directive.
        </p>
        <docs-code-block [code]="directiveUsageCode" language="html" />
      </section>

      <!-- Computed Attributes -->
      <section class="docs-section">
        <h2>Computing State Attributes</h2>
        <p>
          Use <code>computeStateAttributes</code> to generate data attributes
          from a state object.
        </p>
        <docs-code-block [code]="computeAttributesCode" language="typescript" />
      </section>

      <!-- State Mapping -->
      <section class="docs-section">
        <h2>Custom State Mapping</h2>
        <p>
          Customize how state properties are converted to data attributes.
        </p>
        <docs-code-block [code]="stateMappingCode" language="typescript" />
      </section>

      <!-- Programmatic Application -->
      <section class="docs-section">
        <h2>Programmatic Attribute Application</h2>
        <p>
          Use <code>applyStateAttributes</code> and
          <code>removeStateAttributes</code> for manual control.
        </p>
        <docs-code-block [code]="programmaticCode" language="typescript" />
      </section>

      <!-- Render Context -->
      <section class="docs-section">
        <h2>Render Context for Templates</h2>
        <p>
          Create render contexts for ng-template based customization.
        </p>
        <docs-code-block [code]="renderContextCode" language="typescript" />
      </section>

      <!-- Styling with Attributes -->
      <section class="docs-section">
        <h2>Styling with Data Attributes</h2>
        <p>
          Use the generated data attributes in CSS for state-based styling.
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- Real World Example -->
      <section class="docs-section">
        <h2>Real World Example</h2>
        <p>
          Building a custom component with state attributes.
        </p>
        <docs-code-block [code]="realWorldCode" language="typescript" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2>API Reference</h2>

        <h3>RenderElementDirective</h3>
        <p><code>baseUiState</code> - Directive for applying state attributes.</p>
        <docs-props-table [props]="directiveInputs" title="Inputs" />

        <h3>computeStateAttributes</h3>
        <docs-props-table [props]="computeFunc" title="Parameters" />

        <h3>applyStateAttributes</h3>
        <docs-props-table [props]="applyFunc" title="Parameters" />

        <h3>createRenderContext</h3>
        <docs-props-table [props]="renderContextFunc" title="Parameters" />
      </section>

      <!-- Attribute Conventions -->
      <section class="docs-section">
        <h2>Attribute Conventions</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>State Type</th>
              <th>Attribute Format</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Boolean (true)</td>
              <td><code>data-[name]</code> (empty string)</td>
              <td><code>data-disabled=""</code></td>
            </tr>
            <tr>
              <td>Boolean (false)</td>
              <td>Not rendered</td>
              <td>-</td>
            </tr>
            <tr>
              <td>String</td>
              <td><code>data-[name]="[value]"</code></td>
              <td><code>data-state="open"</code></td>
            </tr>
            <tr>
              <td>Number</td>
              <td><code>data-[name]="[value]"</code></td>
              <td><code>data-count="5"</code></td>
            </tr>
            <tr>
              <td>Null/undefined</td>
              <td>Not rendered</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/utils/use-render/use-render-docs.component.ts"
        />
      </footer>
    </div>
    `,
  styles: `
    .docs-page {
      max-width: 48rem;
    }

    .docs-header {
      margin-bottom: 2rem;
    }

    .docs-header h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .docs-header p {
      color: #6b7280;
      font-size: 1.125rem;
    }

    .docs-section {
      margin-bottom: 2.5rem;
    }

    .docs-section h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .docs-section h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .docs-section p {
      margin-bottom: 1rem;
      color: #374151;
      line-height: 1.7;
    }

    .docs-section ul {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      color: #374151;
    }

    .docs-section li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }

    .docs-section code {
      background: #f3f4f6;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }

    .docs-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .docs-table th,
    .docs-table td {
      border: 1px solid #e5e7eb;
      padding: 0.75rem;
      text-align: left;
    }

    .docs-table th {
      background: #f9fafb;
      font-weight: 600;
    }
  

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }`,
})
export class UseRenderDocsComponent {
  directiveUsageCode = `<!-- Apply state as data attributes -->
<button [baseUiState]="buttonState">
  Click me
</button>

<!-- With custom mapping -->
<div [baseUiState]="state" [stateMapping]="customMapping">
  Content
</div>

<!-- Example: buttonState = { disabled: true, pressed: false, variant: 'primary' } -->
<!-- Renders: <button data-disabled data-variant="primary">Click me</button> -->`;

  computeAttributesCode = `import { computed, signal } from '@angular/core';
import { computeStateAttributes } from '@base-ng/ui';

// Define component state
const state = signal({
  open: true,
  disabled: false,
  size: 'large',
  count: 3,
});

// Compute data attributes
const attrs = computed(() => computeStateAttributes(state()));
// Result: { 'data-open': '', 'data-size': 'large', 'data-count': '3' }

// Use in template
// [attr.data-open]="attrs()['data-open']"
// [attr.data-size]="attrs()['data-size']"`;

  stateMappingCode = `import { computeStateAttributes, type StateAttributesMapping } from '@base-ng/ui';

interface ButtonState {
  isPressed: boolean;
  isDisabled: boolean;
  variant: 'primary' | 'secondary';
}

// Custom mapping to rename or transform attributes
const mapping: StateAttributesMapping<ButtonState> = {
  // Rename 'isPressed' to 'pressed'
  isPressed: 'pressed',

  // Rename 'isDisabled' to 'disabled'
  isDisabled: 'disabled',

  // Keep 'variant' as is (or use a function)
  variant: (value) => ({ 'data-variant': value }),
};

const state: ButtonState = {
  isPressed: true,
  isDisabled: false,
  variant: 'primary',
};

const attrs = computeStateAttributes(state, mapping);
// Result: { 'data-pressed': '', 'data-variant': 'primary' }`;

  programmaticCode = `import {
  applyStateAttributes,
  removeStateAttributes,
  computeStateAttributes,
} from '@base-ng/ui';

@Component({
  selector: 'app-custom-element',
  template: \`<div #element>Content</div>\`,
})
export class CustomElementComponent {
  @ViewChild('element') elementRef!: ElementRef<HTMLElement>;

  private renderer = inject(Renderer2);

  state = signal({ active: false, loading: false });

  // Apply attributes when state changes
  updateAttributes() {
    const element = this.elementRef.nativeElement;

    // Remove old attributes
    removeStateAttributes(
      element,
      { active: true, loading: true }, // Previous state
      undefined,
      this.renderer,
    );

    // Apply new attributes
    applyStateAttributes(
      element,
      this.state(),
      undefined,
      this.renderer,
    );
  }

  // Or compute and apply manually
  applyManually() {
    const attrs = computeStateAttributes(this.state());

    for (const [key, value] of Object.entries(attrs)) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        key,
        value,
      );
    }
  }
}`;

  renderContextCode = `import { createRenderContext, type RenderContext } from '@base-ng/ui';

interface TooltipState {
  open: boolean;
  side: 'top' | 'bottom' | 'left' | 'right';
}

// Create context for ng-template
const state: TooltipState = {
  open: true,
  side: 'top',
};

const dataAttributes = {
  'data-open': '',
  'data-side': 'top',
};

const context = createRenderContext(state, dataAttributes);
// Result: {
//   $implicit: { open: true, side: 'top' },
//   state: { open: true, side: 'top' },
//   dataAttributes: { 'data-open': '', 'data-side': 'top' },
// }

// Use in component with ng-template
@Component({
  selector: 'ui-tooltip',
  template: \`
    <ng-container *ngIf="customTemplate; else defaultTemplate">
      <ng-container
        *ngTemplateOutlet="customTemplate; context: renderContext()"
      />
    </ng-container>

    <ng-template #defaultTemplate>
      <div [baseUiState]="state()">
        {{ content() }}
      </div>
    </ng-template>
  \`,
})
export class TooltipComponent {
  customTemplate = input<TemplateRef<RenderContext<TooltipState>>>();
  content = input('');
  state = signal<TooltipState>({ open: false, side: 'top' });

  renderContext = computed(() =>
    createRenderContext(
      this.state(),
      computeStateAttributes(this.state()),
    )
  );
}`;

  stylingCode = `/* Style based on state attributes */
.button {
  background: white;
  color: black;
}

/* Disabled state */
.button[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Pressed state */
.button[data-pressed] {
  transform: scale(0.98);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Variant styles */
.button[data-variant="primary"] {
  background: blue;
  color: white;
}

.button[data-variant="secondary"] {
  background: gray;
  color: white;
}

/* Size styles */
.button[data-size="small"] {
  padding: 4px 8px;
  font-size: 12px;
}

.button[data-size="large"] {
  padding: 12px 24px;
  font-size: 18px;
}

/* Combine states */
.button[data-variant="primary"][data-disabled] {
  background: lightblue;
}

/* Tailwind CSS example */
/* data-[disabled]:opacity-50 data-[variant=primary]:bg-blue-500 */`;

  realWorldCode = `import { Component, input, signal, computed, effect } from '@angular/core';
import {
  RenderElementDirective,
  computeStateAttributes,
  createRenderContext,
} from '@base-ng/ui';

interface ToggleState {
  pressed: boolean;
  disabled: boolean;
}

@Component({
  selector: 'ui-toggle',
  imports: [RenderElementDirective],
  template: \`
    <button
      [baseUiState]="state()"
      [attr.aria-pressed]="state().pressed"
      [attr.aria-disabled]="state().disabled"
      (click)="toggle()"
      class="toggle"
    >
      <ng-content />
    </button>
  \`,
  styles: \`
    .toggle {
      padding: 8px 16px;
      border: 2px solid #ccc;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }

    .toggle[data-pressed] {
      background: #4f46e5;
      color: white;
      border-color: #4f46e5;
    }

    .toggle[data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  \`,
})
export class ToggleComponent {
  readonly pressed = input(false);
  readonly disabled = input(false);

  // Internal state derived from inputs
  state = computed<ToggleState>(() => ({
    pressed: this.pressed(),
    disabled: this.disabled(),
  }));

  toggle() {
    if (this.state().disabled) return;
    // Emit event or update state
  }
}`;

  // API Props
  directiveInputs: PropDefinition[] = [
    {
      name: 'baseUiState',
      type: 'Record<string, unknown>',
      required: true,
      description: 'State object to convert to data attributes.',
    },
    {
      name: 'stateMapping',
      type: 'StateAttributesMapping<T>',
      description: 'Optional custom mapping for state properties to attribute names.',
    },
  ];

  computeFunc: PropDefinition[] = [
    {
      name: 'state',
      type: 'Record<string, unknown>',
      required: true,
      description: 'State object to compute attributes from.',
    },
    {
      name: 'mapping',
      type: 'StateAttributesMapping<T>',
      description: 'Optional custom mapping for state properties.',
    },
    {
      name: 'returns',
      type: 'Record<string, string>',
      description: 'Object of data-* attribute names to values.',
    },
  ];

  applyFunc: PropDefinition[] = [
    {
      name: 'element',
      type: 'HTMLElement',
      required: true,
      description: 'Target element to apply attributes to.',
    },
    {
      name: 'state',
      type: 'Record<string, unknown>',
      required: true,
      description: 'State object to convert to attributes.',
    },
    {
      name: 'mapping',
      type: 'StateAttributesMapping<T>',
      description: 'Optional custom mapping.',
    },
    {
      name: 'renderer',
      type: 'Renderer2',
      description: 'Angular Renderer2 instance for SSR-safe DOM manipulation.',
    },
  ];

  renderContextFunc: PropDefinition[] = [
    {
      name: 'state',
      type: 'T',
      required: true,
      description: 'Component state object.',
    },
    {
      name: 'dataAttributes',
      type: 'Record<string, string>',
      required: true,
      description: 'Pre-computed data attributes.',
    },
    {
      name: 'additionalContext',
      type: 'Record<string, unknown>',
      description: 'Additional properties to include in context.',
    },
    {
      name: 'returns',
      type: 'RenderContext<T>',
      description: 'Context object with $implicit, state, and dataAttributes.',
    },
  ];
}

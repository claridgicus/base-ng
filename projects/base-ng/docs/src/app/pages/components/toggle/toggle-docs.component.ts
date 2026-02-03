import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-toggle',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Toggle</h1>
        <p class="docs-description">
          A two-state button that can be pressed or unpressed. Use Toggle for
          binary options like bold text, favorite status, or feature toggles.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Toggle directive from the package:
        </p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Toggle is a single directive applied to a button element:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Create a simple toggle button with two-way binding.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Controlled state</h3>
        <p class="docs-paragraph">
          Control the toggle state from your component using
          <code>[(pressed)]</code> binding.
        </p>
        <docs-code-block [code]="controlledDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Disabled toggle</h3>
        <p class="docs-paragraph">
          Use the <code>disabled</code> input to prevent user interaction.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Icon toggle</h3>
        <p class="docs-paragraph">
          A common pattern is using icons that change based on pressed state.
        </p>
        <docs-code-block [code]="iconToggleDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Text formatting toolbar</h3>
        <p class="docs-paragraph">
          Multiple toggle buttons for text formatting options.
        </p>
        <docs-code-block [code]="toolbarDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With change event</h3>
        <p class="docs-paragraph">
          Listen to state changes using the <code>pressedChange</code> output.
        </p>
        <docs-code-block [code]="eventDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Toggle directive is unstyled by default. Use CSS to style based
          on data attributes or CSS classes:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Toggle with Tailwind utilities:
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

      <!-- Toggle Group -->
      <section class="docs-section">
        <h2 class="docs-section-title">Toggle Group</h2>
        <p class="docs-paragraph">
          For multiple related toggles, use the Toggle Group component for
          coordinated state management:
        </p>
        <docs-code-block [code]="toggleGroupDemoCode" language="html" />
        <p class="docs-paragraph">
          See the <a href="/angular/components/toggle-group">Toggle Group</a>
          documentation for more details.
        </p>
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Toggle component follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>Uses native <code>&lt;button&gt;</code> element by default</li>
          <li>
            Sets <code>aria-pressed</code> to communicate toggle state to
            screen readers
          </li>
          <li>Supports keyboard activation with Enter and Space keys</li>
          <li>
            Sets <code>disabled</code> attribute when disabled for proper
            accessibility
          </li>
          <li>
            Consider adding <code>aria-label</code> for icon-only toggles
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/toggle/toggle-docs.component.ts"
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
export class ToggleDocsComponent {
  protected readonly importCode = `import { ToggleDirective } from '@base-ng/ui/toggle';

@Component({
  imports: [ToggleDirective],
  // ...
})`;

  protected readonly anatomyCode = `<button baseUiToggle [(pressed)]="isPressed">
  Toggle me
</button>`;

  protected readonly basicDemoCode = `<button baseUiToggle [(pressed)]="isBold" class="toggle-btn">
  Bold
</button>`;

  protected readonly controlledDemoCode = `@Component({
  template: \`
    <button baseUiToggle [(pressed)]="isFavorite">
      {{ isFavorite() ? 'Unfavorite' : 'Add to favorites' }}
    </button>
  \`,
})
export class MyComponent {
  readonly isFavorite = signal(false);
}`;

  protected readonly disabledDemoCode = `<!-- Disabled while pressed -->
<button baseUiToggle [pressed]="true" [disabled]="true">
  Locked On
</button>

<!-- Disabled while not pressed -->
<button baseUiToggle [pressed]="false" [disabled]="true">
  Locked Off
</button>`;

  protected readonly iconToggleDemoCode = `<button
  baseUiToggle
  [(pressed)]="isFavorite"
  aria-label="Add to favorites"
  class="icon-toggle"
>
  @if (isFavorite()) {
    <svg class="filled-heart"><!-- filled heart icon --></svg>
  } @else {
    <svg class="outline-heart"><!-- outline heart icon --></svg>
  }
</button>`;

  protected readonly toolbarDemoCode = `<div class="toolbar">
  <button baseUiToggle [(pressed)]="isBold" aria-label="Bold">
    <strong>B</strong>
  </button>
  <button baseUiToggle [(pressed)]="isItalic" aria-label="Italic">
    <em>I</em>
  </button>
  <button baseUiToggle [(pressed)]="isUnderline" aria-label="Underline">
    <u>U</u>
  </button>
</div>`;

  protected readonly eventDemoCode = `<button
  baseUiToggle
  [(pressed)]="notificationsEnabled"
  (pressedChange)="onToggle($event)"
>
  Notifications {{ notificationsEnabled() ? 'On' : 'Off' }}
</button>

// In component class:
onToggle(pressed: boolean): void {
  console.log('Notifications:', pressed ? 'enabled' : 'disabled');
}`;

  protected readonly stylingCode = `/* Base toggle styles */
[baseUiToggle] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s;
}

/* Hover state */
[baseUiToggle]:hover:not([data-disabled]) {
  background: #eaeaea;
}

/* Pressed state */
[baseUiToggle][data-pressed] {
  background: #0066ff;
  border-color: #0066ff;
  color: white;
}

/* Disabled state */
[baseUiToggle][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus state */
[baseUiToggle]:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}`;

  protected readonly tailwindCode = `<button
  baseUiToggle
  [(pressed)]="isBold"
  class="inline-flex items-center gap-2 px-4 py-2
         bg-gray-100 border border-gray-200 rounded-md
         hover:bg-gray-200
         data-[pressed]:bg-blue-600 data-[pressed]:text-white data-[pressed]:border-blue-600
         data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
         focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
         transition-all duration-150"
>
  Bold
</button>`;

  protected readonly toggleGroupDemoCode = `<div baseUiToggleGroup [(value)]="formats">
  <button baseUiToggle value="bold">Bold</button>
  <button baseUiToggle value="italic">Italic</button>
  <button baseUiToggle value="underline">Underline</button>
</div>`;

  protected readonly inputProps: PropDefinition[] = [
    {
      name: 'pressed',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the toggle is pressed. Supports two-way binding with [(pressed)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the toggle is disabled.',
    },
    {
      name: 'value',
      type: 'string',
      default: 'undefined',
      description:
        'Value identifier for use with toggle groups. Required when used in a group.',
    },
  ];

  protected readonly outputProps: PropDefinition[] = [
    {
      name: 'pressedChange',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the pressed state changes.',
    },
    {
      name: 'pressedChangeDetails',
      type: 'EventEmitter<{pressed: boolean, details: ToggleChangeEventDetails}>',
      description:
        'Emitted with full event details. Use details.cancel() to prevent state change.',
    },
  ];

  protected readonly methods: PropDefinition[] = [
    {
      name: 'toggle()',
      type: 'void',
      description: 'Programmatically toggle the pressed state.',
    },
    {
      name: 'focus()',
      type: 'void',
      description: 'Focus the toggle element.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-pressed',
      type: 'string',
      description:
        'Present when the toggle is pressed. Use for CSS styling of pressed state.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description:
        'Present when the toggle is disabled. Use for CSS styling of disabled state.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-toggle',
      type: 'class',
      description: 'Applied to all toggle instances.',
    },
    {
      name: 'base-ui-toggle-pressed',
      type: 'class',
      description: 'Applied when the toggle is pressed.',
    },
    {
      name: 'base-ui-toggle-disabled',
      type: 'class',
      description: 'Applied when the toggle is disabled.',
    },
  ];
}

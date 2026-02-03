import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import { FieldsetRootDirective, FieldsetLegendDirective } from '@copied/base-ng';
import { InputDirective } from '@copied/base-ng';

@Component({
  selector: 'docs-fieldset',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    FieldsetRootDirective,
    FieldsetLegendDirective,
    InputDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Fieldset</h1>
        <p class="docs-description">
          A semantic grouping component for related form fields with an
          accessible legend. Provides structure for form sections while
          automatically handling ARIA relationships.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <fieldset baseUiFieldsetRoot class="demo-fieldset">
            <div baseUiFieldsetLegend class="demo-legend">
              Personal Information
            </div>
            <div class="demo-fields">
              <label class="demo-label">
                First Name
                <input baseUiInput class="demo-input" placeholder="John" />
              </label>
              <label class="demo-label">
                Last Name
                <input baseUiInput class="demo-input" placeholder="Doe" />
              </label>
            </div>
          </fieldset>
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
          The Fieldset uses a composition pattern with root and legend:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Multiple fieldsets</h3>
        <p class="docs-paragraph">
          Use multiple fieldsets to organize complex forms:
        </p>
        <docs-demo [code]="multipleDemoCode" language="html">
          <div class="demo-form">
            <fieldset baseUiFieldsetRoot class="demo-fieldset">
              <div baseUiFieldsetLegend class="demo-legend">Contact Info</div>
              <input baseUiInput class="demo-input" placeholder="Email" />
            </fieldset>
            <fieldset baseUiFieldsetRoot class="demo-fieldset">
              <div baseUiFieldsetLegend class="demo-legend">Address</div>
              <input baseUiInput class="demo-input" placeholder="Street" />
            </fieldset>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Disabled fieldset</h3>
        <p class="docs-paragraph">
          Disable all fields within a fieldset:
        </p>
        <docs-demo [code]="disabledDemoCode" language="html">
          <div class="demo-container">
            <fieldset baseUiFieldsetRoot [disabled]="isDisabled()" class="demo-fieldset">
              <div baseUiFieldsetLegend class="demo-legend">Account Settings</div>
              <div class="demo-fields">
                <input baseUiInput class="demo-input" placeholder="Username" [disabled]="isDisabled()" />
                <input baseUiInput class="demo-input" placeholder="Email" [disabled]="isDisabled()" />
              </div>
            </fieldset>
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
          The Fieldset is unstyled by default. Style each part using CSS:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Fieldset with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
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

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Fieldset component follows accessibility best practices:
        </p>
        <ul class="docs-list">
          <li>
            Uses semantic <code>&lt;fieldset&gt;</code> element when applied to
            fieldset tags
          </li>
          <li>
            Automatically links legend to fieldset via
            <code>aria-labelledby</code>
          </li>
          <li>
            Legend ID is auto-generated or can use existing <code>id</code>
            attribute
          </li>
          <li>
            Disabled state propagates to all child form elements via native
            behavior
          </li>
          <li>
            Screen readers announce the legend when entering the fieldset group
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/fieldset/fieldset-docs.component.ts"
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
    .demo-form,
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 320px;
    }

    .demo-fieldset {
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      padding: 1rem;
      margin: 0;

      &[data-disabled] {
        opacity: 0.6;
      }
    }

    .demo-legend {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--docs-text);
      margin-bottom: 0.75rem;
      padding: 0 0.25rem;
      margin-left: -0.25rem;

      &[data-disabled] {
        color: var(--docs-text-secondary);
      }
    }

    .demo-fields {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .demo-label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: var(--docs-text);
    }

    .demo-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      color: var(--docs-text);

      &::placeholder {
        color: var(--docs-text-secondary);
      }

      &[data-focused] {
        border-color: var(--docs-accent, #0066ff);
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
      }

      &[data-disabled] {
        background: var(--docs-bg-secondary);
        cursor: not-allowed;
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
export class FieldsetDocsComponent {
  protected readonly isDisabled = signal(false);

  protected toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }
  protected readonly importCode = `import {
  FieldsetRootDirective,
  FieldsetLegendDirective,
} from '@copied/base-ng/fieldset';

@Component({
  imports: [
    FieldsetRootDirective,
    FieldsetLegendDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<fieldset baseUiFieldsetRoot>
  <!-- Legend provides accessible name -->
  <div baseUiFieldsetLegend>Group Label</div>

  <!-- Form fields go here -->
  <input type="text" />
</fieldset>`;

  protected readonly basicDemoCode = `<fieldset baseUiFieldsetRoot class="fieldset">
  <div baseUiFieldsetLegend class="fieldset-legend">
    Personal Information
  </div>

  <label>
    First Name
    <input type="text" />
  </label>

  <label>
    Last Name
    <input type="text" />
  </label>
</fieldset>`;

  protected readonly fieldsDemoCode = `<fieldset baseUiFieldsetRoot class="fieldset">
  <div baseUiFieldsetLegend class="fieldset-legend">
    Contact Details
  </div>

  <div baseUiFieldRoot name="email">
    <label baseUiFieldLabel>Email</label>
    <input baseUiFieldControl type="email" required />
    <span baseUiFieldError>Please enter a valid email.</span>
  </div>

  <div baseUiFieldRoot name="phone">
    <label baseUiFieldLabel>Phone</label>
    <input baseUiFieldControl type="tel" />
    <span baseUiFieldDescription>Optional</span>
  </div>
</fieldset>`;

  protected readonly multipleDemoCode = `<form>
  <fieldset baseUiFieldsetRoot class="fieldset">
    <div baseUiFieldsetLegend>Personal Information</div>
    <input placeholder="Full name" />
    <input type="email" placeholder="Email" />
  </fieldset>

  <fieldset baseUiFieldsetRoot class="fieldset">
    <div baseUiFieldsetLegend>Shipping Address</div>
    <input placeholder="Street address" />
    <input placeholder="City" />
    <input placeholder="Postal code" />
  </fieldset>

  <fieldset baseUiFieldsetRoot class="fieldset">
    <div baseUiFieldsetLegend>Payment Method</div>
    <!-- payment fields -->
  </fieldset>
</form>`;

  protected readonly disabledDemoCode = `<!-- All fields within are disabled -->
<fieldset baseUiFieldsetRoot [disabled]="isProcessing()" class="fieldset">
  <div baseUiFieldsetLegend>Account Settings</div>

  <label>
    Username
    <input type="text" />
  </label>

  <label>
    Email
    <input type="email" />
  </label>

  <button type="submit">Save</button>
</fieldset>`;

  protected readonly divDemoCode = `<!-- Using div instead of fieldset -->
<div baseUiFieldsetRoot role="group" class="fieldset">
  <div baseUiFieldsetLegend class="fieldset-legend">
    Preferences
  </div>

  <label>
    <input type="checkbox" /> Enable notifications
  </label>

  <label>
    <input type="checkbox" /> Dark mode
  </label>
</div>`;

  protected readonly stylingCode = `/* Fieldset container */
.fieldset {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0 0 1.5rem;
}

/* Remove default fieldset border */
fieldset.fieldset {
  border: 1px solid #e5e5e5;
}

/* Legend styling */
.fieldset-legend {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

/* When using native legend element */
fieldset .fieldset-legend {
  margin-left: -0.5rem;
}

/* Disabled state */
[baseUiFieldsetRoot][data-disabled] {
  opacity: 0.6;
}

[baseUiFieldsetLegend][data-disabled] {
  color: #9ca3af;
}`;

  protected readonly tailwindCode = `<fieldset
  baseUiFieldsetRoot
  class="border border-gray-200 rounded-lg p-6 mb-6
         data-[disabled]:opacity-60"
>
  <div
    baseUiFieldsetLegend
    class="text-base font-semibold text-gray-900 mb-4 -ml-2 px-2
           data-[disabled]:text-gray-400"
  >
    Personal Information
  </div>

  <div class="space-y-4">
    <div baseUiFieldRoot name="firstName" class="flex flex-col gap-1">
      <label baseUiFieldLabel class="text-sm font-medium">First Name</label>
      <input baseUiFieldControl class="border border-gray-200 rounded px-3 py-2" />
    </div>

    <div baseUiFieldRoot name="lastName" class="flex flex-col gap-1">
      <label baseUiFieldLabel class="text-sm font-medium">Last Name</label>
      <input baseUiFieldControl class="border border-gray-200 rounded px-3 py-2" />
    </div>
  </div>
</fieldset>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the fieldset is disabled. Disables all child form elements.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the fieldset is disabled.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-fieldset',
      type: 'class',
      description: 'Applied to the root element.',
    },
    {
      name: 'base-ui-fieldset-disabled',
      type: 'class',
      description: 'Applied when the fieldset is disabled.',
    },
    {
      name: 'base-ui-fieldset-legend',
      type: 'class',
      description: 'Applied to the legend element.',
    },
    {
      name: 'base-ui-fieldset-legend-disabled',
      type: 'class',
      description: 'Applied to legend when fieldset is disabled.',
    },
  ];
}

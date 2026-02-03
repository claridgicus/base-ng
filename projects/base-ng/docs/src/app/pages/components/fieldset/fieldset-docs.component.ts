import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-fieldset',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
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

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Fieldset directives from the package:
        </p>
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

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Group related form fields with a descriptive legend.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With Field components</h3>
        <p class="docs-paragraph">
          Combine with Field for complete form field structure.
        </p>
        <docs-code-block [code]="fieldsDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Multiple fieldsets</h3>
        <p class="docs-paragraph">
          Use multiple fieldsets to organize complex forms.
        </p>
        <docs-code-block [code]="multipleDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled fieldset</h3>
        <p class="docs-paragraph">
          Disable all fields within a fieldset.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Non-semantic usage</h3>
        <p class="docs-paragraph">
          Use with <code>div</code> elements when semantic fieldset isn't
          appropriate.
        </p>
        <docs-code-block [code]="divDemoCode" language="html" />
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
  `,
})
export class FieldsetDocsComponent {
  protected readonly importCode = `import {
  FieldsetRootDirective,
  FieldsetLegendDirective,
} from '@base-ng/ui/fieldset';

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

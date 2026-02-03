import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-progress',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Progress</h1>
        <p class="docs-description">
          A progress bar component that displays completion status. Supports
          determinate and indeterminate states with accessible ARIA attributes.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">Import the Progress directives:</p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Progress component consists of a root, track, and indicator:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Set the <code>value</code> input to show progress:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Indeterminate progress</h3>
        <p class="docs-paragraph">
          Set <code>value</code> to <code>null</code> for indeterminate state:
        </p>
        <docs-code-block [code]="indeterminateDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With value display</h3>
        <p class="docs-paragraph">
          Use the value directive to display the formatted progress:
        </p>
        <docs-code-block [code]="valueDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Custom format</h3>
        <p class="docs-paragraph">
          Use Intl.NumberFormat options for custom formatting:
        </p>
        <docs-code-block [code]="formatDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes to style different progress states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="ProgressRoot Inputs" [props]="rootInputProps" />
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
          The Progress component follows WAI-ARIA progressbar pattern:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="progressbar"</code> for proper semantics</li>
          <li>
            <code>aria-valuenow</code>, <code>aria-valuemin</code>, and
            <code>aria-valuemax</code> describe progress
          </li>
          <li>
            <code>aria-valuetext</code> provides human-readable description
          </li>
          <li>
            Supports <code>aria-labelledby</code> for external labels
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/progress/progress-docs.component.ts"
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
export class ProgressDocsComponent {
  protected readonly importCode = `import {
  ProgressRootDirective,
  ProgressTrackDirective,
  ProgressIndicatorDirective,
  ProgressValueDirective
} from '@base-ng/ui/progress';

@Component({
  imports: [
    ProgressRootDirective,
    ProgressTrackDirective,
    ProgressIndicatorDirective,
    ProgressValueDirective
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiProgressRoot [value]="progress">
  <div baseUiProgressTrack>
    <div baseUiProgressIndicator></div>
  </div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiProgressRoot [value]="75" [max]="100">
  <div baseUiProgressTrack>
    <div baseUiProgressIndicator></div>
  </div>
</div>`;

  protected readonly indeterminateDemoCode = `<!-- value=null creates indeterminate state -->
<div baseUiProgressRoot [value]="null">
  <div baseUiProgressTrack>
    <div baseUiProgressIndicator></div>
  </div>
</div>`;

  protected readonly valueDemoCode = `<div baseUiProgressRoot [value]="progress" [max]="100">
  <div baseUiProgressTrack>
    <div baseUiProgressIndicator></div>
  </div>
  <span baseUiProgressValue></span>
</div>

<!-- Displays: "75" (or formatted value) -->`;

  protected readonly formatDemoCode = `<div baseUiProgressRoot
  [value]="0.75"
  [max]="1"
  [format]="{ style: 'percent' }">
  <div baseUiProgressTrack>
    <div baseUiProgressIndicator></div>
  </div>
  <span baseUiProgressValue></span>
</div>

<!-- Displays: "75%" -->`;

  protected readonly stylingCode = `/* Track (background) */
[baseUiProgressTrack] {
  position: relative;
  width: 100%;
  height: 8px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
}

/* Indicator (fill) */
[baseUiProgressIndicator] {
  height: 100%;
  background: #0066ff;
  transition: width 0.3s ease;
  /* Width is set via CSS custom property or inline style */
}

/* Indeterminate animation */
[baseUiProgressRoot][data-status="indeterminate"] [baseUiProgressIndicator] {
  width: 50%;
  animation: indeterminate 1.5s infinite linear;
}

@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

/* Complete state */
[baseUiProgressRoot][data-status="complete"] [baseUiProgressIndicator] {
  background: #22c55e;
}

/* Value display */
[baseUiProgressValue] {
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'number | null',
      default: 'null',
      description:
        'Current progress value. Set to null for indeterminate progress.',
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Minimum progress value.',
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Maximum progress value.',
    },
    {
      name: 'format',
      type: 'Intl.NumberFormatOptions',
      description: 'Options for formatting the progress value.',
    },
    {
      name: 'locale',
      type: 'string',
      description: 'BCP 47 locale for number formatting.',
    },
    {
      name: 'getAriaValueText',
      type: '(formattedValue, value) => string',
      description: 'Custom function to generate aria-valuetext.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-status',
      type: '"indeterminate" | "progressing" | "complete"',
      description:
        'Current progress status. "indeterminate" when value is null, "complete" when value >= max.',
    },
  ];
}

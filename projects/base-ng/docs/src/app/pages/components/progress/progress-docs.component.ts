import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  ProgressRootDirective,
  ProgressTrackDirective,
  ProgressIndicatorDirective,
  ProgressValueDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-progress',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    ProgressRootDirective,
    ProgressTrackDirective,
    ProgressIndicatorDirective,
    ProgressValueDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Progress</h1>
        <p class="docs-description">
          A progress bar component that displays completion status. Supports
          determinate and indeterminate states with accessible ARIA attributes.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-progress-container">
            <div baseUiProgressRoot [value]="progress()" [max]="100" class="demo-progress">
              <div baseUiProgressTrack class="demo-progress-track">
                <div baseUiProgressIndicator class="demo-progress-indicator"></div>
              </div>
              <span baseUiProgressValue class="demo-progress-value"></span>
            </div>
            <div class="demo-controls">
              <button class="demo-btn" (click)="decreaseProgress()">−</button>
              <span class="demo-progress-label">{{ progress() }}%</span>
              <button class="demo-btn" (click)="increaseProgress()">+</button>
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
          The Progress component consists of a root, track, and indicator:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Indeterminate progress</h3>
        <p class="docs-paragraph">
          Set <code>value</code> to <code>null</code> for indeterminate state:
        </p>
        <docs-demo [code]="indeterminateDemoCode" language="html">
          <div baseUiProgressRoot [value]="null" class="demo-progress">
            <div baseUiProgressTrack class="demo-progress-track">
              <div baseUiProgressIndicator class="demo-progress-indicator demo-indeterminate"></div>
            </div>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Complete state</h3>
        <p class="docs-paragraph">
          The progress shows a complete status when value reaches max:
        </p>
        <docs-demo [code]="completeDemoCode" language="html">
          <div baseUiProgressRoot [value]="100" [max]="100" class="demo-progress">
            <div baseUiProgressTrack class="demo-progress-track">
              <div baseUiProgressIndicator class="demo-progress-indicator demo-complete"></div>
            </div>
            <span class="demo-status">✓ Complete</span>
          </div>
        </docs-demo>
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
    }

    /* Demo styles */
    .demo-progress-container {
      width: 100%;
      max-width: 300px;
    }

    .demo-progress {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .demo-progress-track {
      position: relative;
      width: 100%;
      height: 8px;
      background: var(--docs-border);
      border-radius: 4px;
      overflow: hidden;
    }

    .demo-progress-indicator {
      height: 100%;
      background: var(--docs-accent, #0066ff);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .demo-indeterminate {
      width: 40% !important;
      animation: indeterminate 1.5s infinite linear;
    }

    @keyframes indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(350%); }
    }

    .demo-complete {
      background: #22c55e;
    }

    .demo-progress-value {
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
    }

    .demo-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.75rem;
    }

    .demo-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--docs-border);
      border-radius: 4px;
      background: var(--docs-bg);
      color: var(--docs-text);
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: 500;

      &:hover {
        background: var(--docs-bg-secondary);
      }
    }

    .demo-progress-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
      min-width: 40px;
      text-align: center;
    }

    .demo-status {
      font-size: 0.875rem;
      color: #22c55e;
      font-weight: 500;
    }
  `,
})
export class ProgressDocsComponent {
  protected readonly progress = signal(50);

  protected increaseProgress(): void {
    this.progress.update(v => Math.min(100, v + 10));
  }

  protected decreaseProgress(): void {
    this.progress.update(v => Math.max(0, v - 10));
  }
  protected readonly importCode = `import {
  ProgressRootDirective,
  ProgressTrackDirective,
  ProgressIndicatorDirective,
  ProgressValueDirective
} from '@copied/base-ng/progress';

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

  protected readonly completeDemoCode = `<div baseUiProgressRoot [value]="100" [max]="100">
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

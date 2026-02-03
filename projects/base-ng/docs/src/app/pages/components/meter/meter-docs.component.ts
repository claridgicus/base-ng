import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  MeterRootDirective,
  MeterTrackDirective,
  MeterIndicatorDirective,
  MeterLabelDirective,
  MeterValueDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-meter',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    MeterRootDirective,
    MeterTrackDirective,
    MeterIndicatorDirective,
    MeterLabelDirective,
    MeterValueDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Meter</h1>
        <p class="docs-description">
          A graphical display of a numeric value within a known range. Use Meter
          for static measurements like disk usage, battery level, or completion
          percentages.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-meter-container">
            <div baseUiMeterRoot [value]="meterValue()" [max]="100" class="demo-meter">
              <div class="demo-meter-header">
                <span baseUiMeterLabel class="demo-meter-label">Disk Usage</span>
                <span baseUiMeterValue class="demo-meter-value"></span>
              </div>
              <div baseUiMeterTrack class="demo-meter-track">
                <div baseUiMeterIndicator class="demo-meter-indicator"></div>
              </div>
            </div>
            <div class="demo-controls">
              <input
                type="range"
                [value]="meterValue()"
                (input)="onSliderChange($event)"
                min="0"
                max="100"
                class="demo-slider"
              />
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
          The Meter component uses a composition pattern with multiple directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Battery level</h3>
        <p class="docs-paragraph">
          Display battery level with color coding based on value:
        </p>
        <docs-demo [code]="batteryDemoCode" language="html">
          <div baseUiMeterRoot [value]="25" [max]="100" class="demo-meter">
            <div class="demo-meter-header">
              <span baseUiMeterLabel class="demo-meter-label">🔋 Battery</span>
              <span baseUiMeterValue class="demo-meter-value"></span>
            </div>
            <div baseUiMeterTrack class="demo-meter-track">
              <div baseUiMeterIndicator class="demo-meter-indicator demo-battery-low"></div>
            </div>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Storage usage</h3>
        <p class="docs-paragraph">
          A practical example showing disk space usage:
        </p>
        <docs-demo [code]="diskUsageDemoCode" language="html">
          <div baseUiMeterRoot [value]="75" [max]="100" class="demo-meter">
            <div class="demo-meter-header">
              <span baseUiMeterLabel class="demo-meter-label">💾 Storage</span>
              <span class="demo-meter-usage">75 GB / 100 GB</span>
            </div>
            <div baseUiMeterTrack class="demo-meter-track">
              <div baseUiMeterIndicator class="demo-meter-indicator demo-storage"></div>
            </div>
          </div>
        </docs-demo>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Meter component is unstyled by default. Use CSS to style the track
          and indicator based on your design system:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Meter with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>

        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Value Inputs" [props]="valueInputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <p class="docs-paragraph">
          The Meter components don't expose data attributes by default since
          the value is accessible via the percentage context for styling purposes.
        </p>
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
          The <code>MeterRootDirective</code> provides context to child components
          via dependency injection. You can access this context in custom components:
        </p>
        <docs-code-block [code]="contextCode" language="typescript" />
        <docs-props-table title="Context Properties" [props]="contextProps" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Meter component follows WAI-ARIA guidelines for the meter role:
        </p>
        <ul class="docs-list">
          <li>Uses <code>role="meter"</code> for screen reader recognition</li>
          <li>
            Sets <code>aria-valuemin</code>, <code>aria-valuemax</code>, and
            <code>aria-valuenow</code> for the value range
          </li>
          <li>
            Supports <code>aria-valuetext</code> for human-readable value descriptions
          </li>
          <li>
            Automatically associates labels via <code>aria-labelledby</code>
          </li>
          <li>
            Supports number formatting with locale-aware Intl.NumberFormat
          </li>
        </ul>
      </section>

      <!-- Meter vs Progress -->
      <section class="docs-section">
        <h2 class="docs-section-title">Meter vs Progress</h2>
        <p class="docs-paragraph">
          Use <strong>Meter</strong> for static measurements within a known range:
        </p>
        <ul class="docs-list">
          <li>Disk usage (75 GB of 100 GB)</li>
          <li>Battery level (80%)</li>
          <li>Password strength</li>
          <li>Sound volume</li>
        </ul>
        <p class="docs-paragraph">
          Use <strong>Progress</strong> for dynamic tasks with progress over time:
        </p>
        <ul class="docs-list">
          <li>File upload progress</li>
          <li>Loading indicators</li>
          <li>Multi-step form completion</li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/meter/meter-docs.component.ts"
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
    .demo-meter-container {
      width: 100%;
      max-width: 300px;
    }

    .demo-meter {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .demo-meter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .demo-meter-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
    }

    .demo-meter-value {
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
    }

    .demo-meter-usage {
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
    }

    .demo-meter-track {
      position: relative;
      width: 100%;
      height: 8px;
      background: var(--docs-border);
      border-radius: 4px;
      overflow: hidden;
    }

    .demo-meter-indicator {
      height: 100%;
      background: var(--docs-accent, #0066ff);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .demo-battery-low {
      background: #ef4444;
    }

    .demo-storage {
      background: #8b5cf6;
    }

    .demo-controls {
      margin-top: 1rem;
    }

    .demo-slider {
      width: 100%;
      cursor: pointer;
    }
  `,
})
export class MeterDocsComponent {
  protected readonly meterValue = signal(65);

  protected onSliderChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.meterValue.set(parseInt(input.value, 10));
  }
  protected readonly importCode = `import {
  MeterRootDirective,
  MeterTrackDirective,
  MeterIndicatorDirective,
  MeterLabelDirective,
  MeterValueDirective,
} from '@copied/base-ng/meter';

@Component({
  imports: [
    MeterRootDirective,
    MeterTrackDirective,
    MeterIndicatorDirective,
    MeterLabelDirective,
    MeterValueDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiMeterRoot [value]="75" [max]="100">
  <!-- Optional: Accessible label -->
  <span baseUiMeterLabel>Disk Usage</span>

  <!-- Track contains the indicator -->
  <div baseUiMeterTrack>
    <div baseUiMeterIndicator></div>
  </div>

  <!-- Optional: Display the value -->
  <span baseUiMeterValue></span>
</div>`;

  protected readonly basicDemoCode = `<div baseUiMeterRoot [value]="75" [min]="0" [max]="100">
  <div baseUiMeterTrack class="meter-track">
    <div baseUiMeterIndicator class="meter-indicator"></div>
  </div>
</div>`;

  protected readonly batteryDemoCode = `<div baseUiMeterRoot [value]="25" [max]="100">
  <span baseUiMeterLabel>🔋 Battery</span>
  <span baseUiMeterValue></span>
  <div baseUiMeterTrack>
    <div baseUiMeterIndicator class="battery-low"></div>
  </div>
</div>`;

  protected readonly labeledDemoCode = `<div baseUiMeterRoot [value]="diskUsage()" [max]="totalDisk()">
  <div class="meter-header">
    <span baseUiMeterLabel>Disk Usage</span>
    <span baseUiMeterValue></span>
  </div>
  <div baseUiMeterTrack class="meter-track">
    <div baseUiMeterIndicator class="meter-indicator"></div>
  </div>
</div>`;

  protected readonly percentDemoCode = `<!-- Value of 0.75 displayed as "75%" -->
<div baseUiMeterRoot [value]="0.75" [min]="0" [max]="1">
  <span baseUiMeterValue [format]="{ style: 'percent' }"></span>
  <div baseUiMeterTrack>
    <div baseUiMeterIndicator></div>
  </div>
</div>`;

  protected readonly customValueDemoCode = `<div baseUiMeterRoot [value]="batteryLevel()" [max]="100">
  <span
    baseUiMeterValue
    [renderValue]="formatBattery"
  ></span>
  <div baseUiMeterTrack>
    <div baseUiMeterIndicator></div>
  </div>
</div>

// In component class:
formatBattery = (value: number, formattedValue: string) => {
  if (value <= 20) return \`\${formattedValue}% (Low)\`;
  if (value >= 80) return \`\${formattedValue}% (Charged)\`;
  return \`\${formattedValue}%\`;
};`;

  protected readonly diskUsageDemoCode = `<div
  baseUiMeterRoot
  [value]="usedSpace()"
  [max]="totalSpace()"
  [format]="{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }"
>
  <div class="disk-meter">
    <span baseUiMeterLabel>Storage</span>
    <span class="disk-value">
      <span baseUiMeterValue></span> / {{ totalSpace() }} GB
    </span>
  </div>
  <div baseUiMeterTrack class="disk-track">
    <div baseUiMeterIndicator class="disk-indicator"></div>
  </div>
</div>`;

  protected readonly stylingCode = `/* Track: The full range container */
.base-ui-meter-track {
  position: relative;
  width: 100%;
  height: 8px;
  background: #e5e5e5;
  border-radius: 9999px;
  overflow: hidden;
}

/* Indicator: Visual representation of the value */
.base-ui-meter-indicator {
  position: absolute;
  background: #0066ff;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* Label styling */
.base-ui-meter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* Value styling */
.base-ui-meter-value {
  font-size: 0.875rem;
  color: #6b7280;
}`;

  protected readonly tailwindCode = `<div baseUiMeterRoot [value]="75" [max]="100" class="w-full">
  <div class="flex justify-between mb-1">
    <span baseUiMeterLabel class="text-sm font-medium text-gray-700">
      Disk Usage
    </span>
    <span baseUiMeterValue class="text-sm text-gray-500"></span>
  </div>
  <div
    baseUiMeterTrack
    class="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden"
  >
    <div
      baseUiMeterIndicator
      class="absolute bg-blue-600 rounded-full transition-all duration-300"
    ></div>
  </div>
</div>`;

  protected readonly contextCode = `import { inject } from '@angular/core';
import { METER_CONTEXT } from '@copied/base-ng/meter';

@Directive({
  selector: '[myCustomMeterDisplay]',
})
export class MyCustomMeterDisplay {
  private context = inject(METER_CONTEXT);

  // Access meter values
  value = this.context.value;           // Signal<number>
  percentage = this.context.percentage; // Signal<number>
  formattedValue = this.context.formattedValue; // Signal<string>
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'number',
      default: 'required',
      description: 'The current meter value.',
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'The minimum value of the meter range.',
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'The maximum value of the meter range.',
    },
    {
      name: 'format',
      type: 'Intl.NumberFormatOptions',
      default: 'undefined',
      description: 'Number format options for value display.',
    },
    {
      name: 'locale',
      type: 'string',
      default: 'undefined',
      description: 'BCP 47 locale string for number formatting.',
    },
    {
      name: 'getAriaValueText',
      type: '(formatted: string, value: number) => string',
      default: 'identity',
      description: 'Custom function to generate aria-valuetext.',
    },
  ];

  protected readonly valueInputProps: PropDefinition[] = [
    {
      name: 'format',
      type: 'Intl.NumberFormatOptions',
      default: 'undefined',
      description: 'Override format options for this value display.',
    },
    {
      name: 'locale',
      type: 'string',
      default: 'undefined',
      description: 'Override locale for this value display.',
    },
    {
      name: 'renderValue',
      type: '(value: number, formatted: string) => string',
      default: 'undefined',
      description: 'Custom render function for the value text.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-meter',
      type: 'class',
      description: 'Applied to the meter root element.',
    },
    {
      name: 'base-ui-meter-track',
      type: 'class',
      description: 'Applied to the track container.',
    },
    {
      name: 'base-ui-meter-indicator',
      type: 'class',
      description: 'Applied to the indicator element.',
    },
    {
      name: 'base-ui-meter-label',
      type: 'class',
      description: 'Applied to the label element.',
    },
    {
      name: 'base-ui-meter-value',
      type: 'class',
      description: 'Applied to the value display element.',
    },
  ];

  protected readonly contextProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'Signal<number>',
      description: 'Current meter value.',
    },
    {
      name: 'min',
      type: 'Signal<number>',
      description: 'Minimum meter value.',
    },
    {
      name: 'max',
      type: 'Signal<number>',
      description: 'Maximum meter value.',
    },
    {
      name: 'percentage',
      type: 'Signal<number>',
      description: 'Value as a percentage (0-100).',
    },
    {
      name: 'formattedValue',
      type: 'Signal<string>',
      description: 'Internationalized formatted value string.',
    },
    {
      name: 'setLabelId',
      type: '(id: string | undefined) => void',
      description: 'Register a label element for aria-labelledby.',
    },
  ];
}

import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-slider',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Slider</h1>
        <p class="docs-description">
          A range input component for selecting values within a range. Supports
          single values, range selection with multiple thumbs, and both
          horizontal and vertical orientations.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Slider directives from the package:
        </p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Slider uses a composition pattern with multiple directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Create a simple slider with two-way binding.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With min, max, and step</h3>
        <p class="docs-paragraph">
          Configure the range and increment step.
        </p>
        <docs-code-block [code]="configuredDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Range slider</h3>
        <p class="docs-paragraph">
          Create a range slider with multiple thumbs by passing an array value.
        </p>
        <docs-code-block [code]="rangeDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Vertical orientation</h3>
        <p class="docs-paragraph">
          Set <code>orientation="vertical"</code> for vertical sliders.
        </p>
        <docs-code-block [code]="verticalDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With Angular forms</h3>
        <p class="docs-paragraph">
          Slider implements <code>ControlValueAccessor</code> for forms integration.
        </p>
        <docs-code-block [code]="formsDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Disabled state</h3>
        <p class="docs-paragraph">
          Disable the slider using the <code>disabled</code> input.
        </p>
        <docs-code-block [code]="disabledDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Slider is unstyled by default. Style each part using CSS:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Slider with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Root Outputs" [props]="rootOutputProps" />
        <docs-props-table title="Thumb Inputs" [props]="thumbInputProps" />
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

      <!-- Keyboard Navigation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Keyboard navigation</h2>
        <docs-props-table [props]="keyboardNav" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Slider follows WAI-ARIA guidelines:
        </p>
        <ul class="docs-list">
          <li>
            Thumb uses <code>role="slider"</code> with proper ARIA attributes
          </li>
          <li>
            Sets <code>aria-valuemin</code>, <code>aria-valuemax</code>, and
            <code>aria-valuenow</code> for screen readers
          </li>
          <li>
            <code>aria-orientation</code> communicates slider direction
          </li>
          <li>
            Full keyboard navigation support
          </li>
          <li>
            <strong>Required:</strong> Add <code>aria-label</code> or use Field
            component for accessible labeling
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
export class SliderDocsComponent {
  protected readonly importCode = `import {
  SliderRootDirective,
  SliderTrackDirective,
  SliderIndicatorDirective,
  SliderThumbDirective,
} from '@base-ng/ui/slider';

@Component({
  imports: [
    SliderRootDirective,
    SliderTrackDirective,
    SliderIndicatorDirective,
    SliderThumbDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiSliderRoot [(value)]="volume">
  <!-- Track contains the indicator -->
  <div baseUiSliderTrack>
    <div baseUiSliderIndicator></div>
  </div>

  <!-- Draggable thumb -->
  <div baseUiSliderThumb aria-label="Volume"></div>
</div>`;

  protected readonly basicDemoCode = `<div
  baseUiSliderRoot
  [(value)]="volume"
  class="slider"
>
  <div baseUiSliderTrack class="slider-track">
    <div baseUiSliderIndicator class="slider-indicator"></div>
  </div>
  <div baseUiSliderThumb class="slider-thumb" aria-label="Volume"></div>
</div>

<p>Volume: {{ volume() }}</p>`;

  protected readonly configuredDemoCode = `<div
  baseUiSliderRoot
  [(value)]="temperature"
  [min]="0"
  [max]="100"
  [step]="5"
  [largeStep]="20"
>
  <div baseUiSliderTrack>
    <div baseUiSliderIndicator></div>
  </div>
  <div baseUiSliderThumb aria-label="Temperature"></div>
</div>`;

  protected readonly rangeDemoCode = `<!-- Pass an array for range selection -->
<div
  baseUiSliderRoot
  [(value)]="priceRange"
  [min]="0"
  [max]="1000"
>
  <div baseUiSliderTrack>
    <div baseUiSliderIndicator></div>
  </div>
  <!-- One thumb for each value in the array -->
  <div baseUiSliderThumb [index]="0" aria-label="Minimum price"></div>
  <div baseUiSliderThumb [index]="1" aria-label="Maximum price"></div>
</div>

// In component:
readonly priceRange = signal([100, 500]);`;

  protected readonly verticalDemoCode = `<div
  baseUiSliderRoot
  [(value)]="level"
  orientation="vertical"
  class="slider-vertical"
>
  <div baseUiSliderTrack>
    <div baseUiSliderIndicator></div>
  </div>
  <div baseUiSliderThumb aria-label="Level"></div>
</div>`;

  protected readonly formsDemoCode = `@Component({
  template: \`
    <form [formGroup]="form">
      <label>
        Brightness
        <div baseUiSliderRoot formControlName="brightness" [min]="0" [max]="100">
          <div baseUiSliderTrack>
            <div baseUiSliderIndicator></div>
          </div>
          <div baseUiSliderThumb></div>
        </div>
      </label>
    </form>
  \`,
})
export class MyComponent {
  readonly form = new FormGroup({
    brightness: new FormControl(50),
  });
}`;

  protected readonly disabledDemoCode = `<div
  baseUiSliderRoot
  [(value)]="volume"
  [disabled]="true"
>
  <div baseUiSliderTrack>
    <div baseUiSliderIndicator></div>
  </div>
  <div baseUiSliderThumb aria-label="Volume"></div>
</div>`;

  protected readonly stylingCode = `/* Slider container */
.slider {
  position: relative;
  width: 200px;
  height: 24px;
  display: flex;
  align-items: center;
}

/* Track */
.slider-track {
  position: relative;
  width: 100%;
  height: 4px;
  background: #e5e5e5;
  border-radius: 9999px;
  overflow: hidden;
}

/* Indicator (filled portion) */
.slider-indicator {
  position: absolute;
  left: 0;
  height: 100%;
  width: var(--slider-value-percent);
  background: #0066ff;
  border-radius: 9999px;
}

/* Thumb */
.slider-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #0066ff;
  border-radius: 50%;
  cursor: grab;
  transition: transform 0.1s;
}

.slider-thumb:hover {
  transform: translateX(-50%) scale(1.1);
}

.slider-thumb[data-dragging] {
  cursor: grabbing;
  transform: translateX(-50%) scale(1.15);
}

.slider-thumb:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}

/* Disabled state */
[baseUiSliderRoot][data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

/* Vertical slider */
.slider-vertical {
  width: 24px;
  height: 200px;
  flex-direction: column;
}

.slider-vertical .slider-track {
  width: 4px;
  height: 100%;
}`;

  protected readonly tailwindCode = `<div
  baseUiSliderRoot
  [(value)]="volume"
  class="relative w-52 h-6 flex items-center
         data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
>
  <div
    baseUiSliderTrack
    class="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden"
  >
    <div
      baseUiSliderIndicator
      class="absolute left-0 h-full bg-blue-600 rounded-full"
      [style.width.%]="volume()"
    ></div>
  </div>
  <div
    baseUiSliderThumb
    class="w-5 h-5 bg-white border-2 border-blue-600 rounded-full
           cursor-grab hover:scale-110
           data-[dragging]:cursor-grabbing data-[dragging]:scale-115
           focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
           transition-transform duration-100"
    aria-label="Volume"
  ></div>
</div>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'number | number[]',
      default: '0',
      description: 'Current value. Pass an array for range sliders.',
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Minimum value.',
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Maximum value.',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Value increment step.',
    },
    {
      name: 'largeStep',
      type: 'number',
      default: '10',
      description: 'Step for Page Up/Down and Shift+Arrow keys.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the slider is disabled.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Slider orientation.',
    },
    {
      name: 'minStepsBetweenValues',
      type: 'number',
      default: '0',
      description: 'Minimum steps between thumbs in range slider.',
    },
    {
      name: 'thumbCollisionBehavior',
      type: "'push' | 'swap' | 'none'",
      default: "'push'",
      description: 'How thumbs behave when they collide.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'valueChanged',
      type: 'EventEmitter<SliderChangeEventDetails>',
      description: 'Emitted during value changes (while dragging).',
    },
    {
      name: 'valueCommitted',
      type: 'EventEmitter<SliderValueCommittedEventDetails>',
      description: 'Emitted when value is committed (on pointer up).',
    },
  ];

  protected readonly thumbInputProps: PropDefinition[] = [
    {
      name: 'index',
      type: 'number',
      default: '0',
      description: 'Index of this thumb in a multi-thumb slider.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the slider is disabled.',
    },
    {
      name: 'data-dragging',
      type: 'string',
      description: 'Present when a thumb is being dragged.',
    },
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'Indicates the slider orientation.',
    },
    {
      name: 'data-active',
      type: 'string',
      description: 'Present on the thumb that is currently active.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-slider',
      type: 'class',
      description: 'Applied to the slider root.',
    },
    {
      name: 'base-ui-slider-horizontal',
      type: 'class',
      description: 'Applied when orientation is horizontal.',
    },
    {
      name: 'base-ui-slider-vertical',
      type: 'class',
      description: 'Applied when orientation is vertical.',
    },
    {
      name: 'base-ui-slider-track',
      type: 'class',
      description: 'Applied to the track element.',
    },
    {
      name: 'base-ui-slider-indicator',
      type: 'class',
      description: 'Applied to the indicator element.',
    },
    {
      name: 'base-ui-slider-thumb',
      type: 'class',
      description: 'Applied to the thumb element.',
    },
  ];

  protected readonly keyboardNav: PropDefinition[] = [
    {
      name: 'Arrow Right / Arrow Up',
      type: 'key',
      description: 'Increase value by step.',
    },
    {
      name: 'Arrow Left / Arrow Down',
      type: 'key',
      description: 'Decrease value by step.',
    },
    {
      name: 'Shift + Arrow',
      type: 'key',
      description: 'Increase/decrease by large step.',
    },
    {
      name: 'Page Up',
      type: 'key',
      description: 'Increase value by large step.',
    },
    {
      name: 'Page Down',
      type: 'key',
      description: 'Decrease value by large step.',
    },
    {
      name: 'Home',
      type: 'key',
      description: 'Set value to minimum.',
    },
    {
      name: 'End',
      type: 'key',
      description: 'Set value to maximum.',
    },
  ];
}

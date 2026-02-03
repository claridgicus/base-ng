import { Component } from '@angular/core';
import {
  TooltipArrowDirective,
  TooltipPopupDirective,
  TooltipPositionerDirective,
  TooltipRootDirective,
  TooltipTriggerDirective,
} from '@copied/base-ng';
import {
  CodeBlockComponent,
  DemoComponent,
  EditOnGitHubComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-tooltip',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    TooltipRootDirective,
    TooltipTriggerDirective,
    TooltipPositionerDirective,
    TooltipPopupDirective,
    TooltipArrowDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Tooltip</h1>
        <p class="docs-description">
          A popup that displays information related to an element when it receives keyboard focus or
          the mouse hovers over it. Positioned using Floating UI for smart placement.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-container">
            <div baseUiTooltipRoot>
              <button baseUiTooltipTrigger class="demo-button">Hover me</button>
              <div baseUiTooltipPositioner side="top" [sideOffset]="8">
                <div baseUiTooltipPopup class="demo-tooltip">
                  This is a tooltip with helpful information
                  <div baseUiTooltipArrow class="demo-tooltip-arrow"></div>
                </div>
              </div>
            </div>

            <div baseUiTooltipRoot>
              <button baseUiTooltipTrigger class="demo-button">Bottom tooltip</button>
              <div baseUiTooltipPositioner side="bottom" [sideOffset]="8">
                <div baseUiTooltipPopup class="demo-tooltip">
                  Positioned below the trigger
                  <div baseUiTooltipArrow class="demo-tooltip-arrow"></div>
                </div>
              </div>
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
        <p class="docs-paragraph">The Tooltip uses a directive-based composition pattern:</p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">Hover or focus on the trigger to display the tooltip:</p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Controlled tooltip</h3>
        <p class="docs-paragraph">Use <code>[(open)]</code> to control the tooltip state:</p>
        <docs-code-block [code]="controlledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Positioning</h3>
        <p class="docs-paragraph">
          Use <code>side</code> and <code>align</code> inputs on the positioner to control
          placement:
        </p>
        <docs-code-block [code]="positioningDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With arrow</h3>
        <p class="docs-paragraph">Add an arrow that points to the trigger element:</p>
        <docs-code-block [code]="arrowDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Custom delay</h3>
        <p class="docs-paragraph">Customize the open and close delay:</p>
        <docs-code-block [code]="delayDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Offset</h3>
        <p class="docs-paragraph">Adjust the distance between the tooltip and trigger:</p>
        <docs-code-block [code]="offsetDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled tooltip</h3>
        <p class="docs-paragraph">Use <code>disabled</code> to prevent the tooltip from opening:</p>
        <docs-code-block [code]="disabledDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">Use data attributes and CSS to style the tooltip:</p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="TooltipRoot Inputs" [props]="rootInputProps" />
        <docs-props-table title="TooltipRoot Outputs" [props]="rootOutputProps" />
        <docs-props-table title="TooltipPositioner Inputs" [props]="positionerInputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table title="TooltipTrigger / TooltipPopup" [props]="triggerDataAttributes" />
        <docs-props-table
          title="TooltipPositioner / TooltipPopup / TooltipArrow"
          [props]="positionerDataAttributes"
        />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">The Tooltip component follows WAI-ARIA Tooltip pattern:</p>
        <ul class="docs-list">
          <li>Popup has <code>role="tooltip"</code></li>
          <li>Trigger has <code>aria-describedby</code> linking to the tooltip when open</li>
          <li>Opens on both hover and keyboard focus</li>
          <li>Closes on blur and mouse leave</li>
          <li>Arrow is hidden from assistive technology</li>
          <li>Respects reduced motion preferences in animations</li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/tooltip/tooltip-docs.component.ts"
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
      gap: 1rem;
      padding: 2rem;
      justify-content: center;
    }

    .demo-button {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      color: var(--docs-text);
      cursor: pointer;
      transition:
        background 0.15s,
        border-color 0.15s;

      &:hover {
        background: var(--docs-bg-hover, rgba(0, 0, 0, 0.05));
        border-color: var(--docs-accent, #0066ff);
      }

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }
    }

    .demo-tooltip {
      position: relative;
      background: #1f2937;
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.8125rem;
      line-height: 1.4;
      max-width: 200px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: tooltipIn 0.15s ease;
    }

    @keyframes tooltipIn {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .demo-tooltip-arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      transform: rotate(45deg);

      [data-side='top'] & {
        bottom: -4px;
        left: 50%;
        margin-left: -4px;
      }

      [data-side='bottom'] & {
        top: -4px;
        left: 50%;
        margin-left: -4px;
      }

      [data-side='left'] & {
        right: -4px;
        top: 50%;
        margin-top: -4px;
      }

      [data-side='right'] & {
        left: -4px;
        top: 50%;
        margin-top: -4px;
      }
    }
  `,
})
export class TooltipDocsComponent {
  protected readonly importCode = `import {
  TooltipRootDirective,
  TooltipTriggerDirective,
  TooltipPositionerDirective,
  TooltipPopupDirective,
  TooltipArrowDirective,
} from '@copied/base-ng';

@Component({
  imports: [
    TooltipRootDirective,
    TooltipTriggerDirective,
    TooltipPositionerDirective,
    TooltipPopupDirective,
    TooltipArrowDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiTooltipRoot>
  <!-- Trigger element -->
  <button baseUiTooltipTrigger>Hover me</button>

  <!-- Positioner (handles placement) -->
  <div baseUiTooltipPositioner>
    <!-- Tooltip content -->
    <div baseUiTooltipPopup>
      Tooltip text
      <!-- Optional arrow -->
      <div baseUiTooltipArrow></div>
    </div>
  </div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger class="icon-button">
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" stroke="currentColor" fill="none"/>
      <text x="10" y="14" text-anchor="middle" font-size="12">?</text>
    </svg>
  </button>

  <div baseUiTooltipPositioner>
    <div baseUiTooltipPopup class="tooltip">
      Click to learn more about this feature
    </div>
  </div>
</div>`;

  protected readonly controlledDemoCode = `<div baseUiTooltipRoot [(open)]="showTooltip">
  <button baseUiTooltipTrigger>Controlled tooltip</button>

  <div baseUiTooltipPositioner>
    <div baseUiTooltipPopup class="tooltip">
      Tooltip is {{ showTooltip ? 'open' : 'closed' }}
    </div>
  </div>
</div>

<!-- In component class -->
showTooltip = false;`;

  protected readonly positioningDemoCode = `<!-- Top (default) -->
<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Top</button>
  <div baseUiTooltipPositioner side="top">
    <div baseUiTooltipPopup>Top tooltip</div>
  </div>
</div>

<!-- Bottom with start alignment -->
<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Bottom start</button>
  <div baseUiTooltipPositioner side="bottom" align="start">
    <div baseUiTooltipPopup>Bottom-start tooltip</div>
  </div>
</div>

<!-- Right -->
<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Right</button>
  <div baseUiTooltipPositioner side="right">
    <div baseUiTooltipPopup>Right tooltip</div>
  </div>
</div>

<!-- Left with end alignment -->
<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Left end</button>
  <div baseUiTooltipPositioner side="left" align="end">
    <div baseUiTooltipPopup>Left-end tooltip</div>
  </div>
</div>`;

  protected readonly arrowDemoCode = `<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Hover for tooltip</button>

  <div baseUiTooltipPositioner side="top">
    <div baseUiTooltipPopup class="tooltip">
      Tooltip with arrow
      <div baseUiTooltipArrow class="tooltip-arrow"></div>
    </div>
  </div>
</div>

<style>
  .tooltip {
    position: relative;
    background: #1f2937;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .tooltip-arrow {
    width: 8px;
    height: 8px;
    background: #1f2937;
    transform: rotate(45deg);
  }

  /* Arrow positioning by side */
  [baseUiTooltipPositioner][data-side="top"] .tooltip-arrow {
    bottom: -4px;
  }
  [baseUiTooltipPositioner][data-side="bottom"] .tooltip-arrow {
    top: -4px;
  }
  [baseUiTooltipPositioner][data-side="left"] .tooltip-arrow {
    right: -4px;
  }
  [baseUiTooltipPositioner][data-side="right"] .tooltip-arrow {
    left: -4px;
  }
</style>`;

  protected readonly delayDemoCode = `<!-- Instant open, 300ms close delay -->
<div baseUiTooltipRoot [delay]="0" [closeDelay]="300">
  <button baseUiTooltipTrigger>Instant open</button>
  <div baseUiTooltipPositioner>
    <div baseUiTooltipPopup>Opens instantly, closes with delay</div>
  </div>
</div>

<!-- 1 second open delay -->
<div baseUiTooltipRoot [delay]="1000">
  <button baseUiTooltipTrigger>Slow open</button>
  <div baseUiTooltipPositioner>
    <div baseUiTooltipPopup>Opens after 1 second</div>
  </div>
</div>

<!-- No delay (immediate) -->
<div baseUiTooltipRoot [delay]="0" [closeDelay]="0">
  <button baseUiTooltipTrigger>No delay</button>
  <div baseUiTooltipPositioner>
    <div baseUiTooltipPopup>Opens and closes immediately</div>
  </div>
</div>`;

  protected readonly offsetDemoCode = `<!-- More space from trigger -->
<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Large offset</button>
  <div baseUiTooltipPositioner [sideOffset]="16">
    <div baseUiTooltipPopup>16px from trigger</div>
  </div>
</div>

<!-- Shifted horizontally -->
<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Align offset</button>
  <div baseUiTooltipPositioner [alignOffset]="10">
    <div baseUiTooltipPopup>Shifted 10px along alignment axis</div>
  </div>
</div>`;

  protected readonly disabledDemoCode = `<div baseUiTooltipRoot [disabled]="isDisabled">
  <button baseUiTooltipTrigger>
    {{ isDisabled ? 'Tooltip disabled' : 'Tooltip enabled' }}
  </button>
  <div baseUiTooltipPositioner>
    <div baseUiTooltipPopup>This tooltip can be disabled</div>
  </div>
</div>

<button (click)="isDisabled = !isDisabled">
  Toggle tooltip
</button>

<!-- In component class -->
isDisabled = false;`;

  protected readonly stylingCode = `/* Tooltip positioner (handles display) */
[baseUiTooltipPositioner] {
  z-index: 1000;
}

/* Tooltip popup */
[baseUiTooltipPopup] {
  background: #1f2937;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.4;
  max-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Open animation */
[baseUiTooltipPopup][data-state="open"] {
  animation: tooltipIn 0.15s ease;
}

@keyframes tooltipIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Arrow base styles */
[baseUiTooltipArrow] {
  width: 10px;
  height: 10px;
  background: inherit;
  transform: rotate(45deg);
}

/* Arrow position by side */
[baseUiTooltipPositioner][data-side="top"] [baseUiTooltipArrow] {
  bottom: -5px;
}

[baseUiTooltipPositioner][data-side="bottom"] [baseUiTooltipArrow] {
  top: -5px;
}

[baseUiTooltipPositioner][data-side="left"] [baseUiTooltipArrow] {
  right: -5px;
}

[baseUiTooltipPositioner][data-side="right"] [baseUiTooltipArrow] {
  left: -5px;
}

/* Trigger hover state (optional) */
[baseUiTooltipTrigger][data-state="open"] {
  color: #0066ff;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  [baseUiTooltipPopup] {
    animation: none;
  }
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description:
        'The controlled open state of the tooltip. Supports two-way binding with [(open)].',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'The default open state when uncontrolled.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the tooltip is disabled.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '600',
      description:
        'Delay in milliseconds before the tooltip opens on hover. Focus opens immediately.',
    },
    {
      name: 'closeDelay',
      type: 'number',
      default: '0',
      description: 'Delay in milliseconds before the tooltip closes.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<TooltipOpenChangeEventDetails>',
      description:
        'Emitted when the open state changes. Includes open boolean and reason string (trigger-hover, trigger-focus, imperative).',
    },
  ];

  protected readonly positionerInputProps: PropDefinition[] = [
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'top'",
      description: 'The preferred side of the trigger to position the tooltip.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | null",
      default: 'null',
      description: 'The alignment of the tooltip along the side.',
    },
    {
      name: 'sideOffset',
      type: 'number',
      default: '8',
      description: 'The distance in pixels between the tooltip and trigger.',
    },
    {
      name: 'alignOffset',
      type: 'number',
      default: '0',
      description: 'The offset along the alignment axis in pixels.',
    },
  ];

  protected readonly triggerDataAttributes: PropDefinition[] = [
    {
      name: 'data-state',
      type: '"open" | "closed"',
      description: 'The current state of the tooltip.',
    },
  ];

  protected readonly positionerDataAttributes: PropDefinition[] = [
    {
      name: 'data-state',
      type: '"open" | "closed"',
      description: 'The current state of the tooltip.',
    },
    {
      name: 'data-side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      description: 'The actual rendered side (may differ from preferred if flipped).',
    },
    {
      name: 'data-align',
      type: "'start' | 'center' | 'end'",
      description: 'The actual alignment after positioning.',
    },
    {
      name: 'data-uncentered',
      type: 'string',
      description: 'Present on the arrow when it cannot be perfectly centered.',
    },
  ];
}

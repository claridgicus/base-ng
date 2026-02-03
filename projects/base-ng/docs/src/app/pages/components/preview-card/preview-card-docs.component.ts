import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  PreviewCardRootDirective,
  PreviewCardTriggerDirective,
  PreviewCardPositionerDirective,
  PreviewCardPopupDirective,
  PreviewCardArrowDirective,
} from '@base-ng/ui';

@Component({
  selector: 'docs-preview-card',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    PreviewCardRootDirective,
    PreviewCardTriggerDirective,
    PreviewCardPositionerDirective,
    PreviewCardPopupDirective,
    PreviewCardArrowDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Preview Card</h1>
        <p class="docs-description">
          A hover-activated card that displays a preview of linked content. Similar
          to Wikipedia-style link previews, it shows additional information when
          hovering over a trigger element.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <p class="demo-text">
            Read more about the
            <span baseUiPreviewCardRoot>
              <a baseUiPreviewCardTrigger href="#" class="demo-link" (click)="$event.preventDefault()">
                Angular framework
              </a>
              <div baseUiPreviewCardPositioner side="top" [sideOffset]="8">
                <div baseUiPreviewCardPopup class="demo-preview-card">
                  <div class="demo-preview-content">
                    <h3 class="demo-preview-title">Angular</h3>
                    <p class="demo-preview-desc">
                      Angular is a TypeScript-based web application framework led
                      by the Angular Team at Google. It's used to build dynamic,
                      modern web applications.
                    </p>
                    <span class="demo-preview-url">angular.dev</span>
                  </div>
                  <div baseUiPreviewCardArrow class="demo-preview-arrow"></div>
                </div>
              </div>
            </span>
            to learn about building modern web applications.
          </p>
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
          The Preview Card uses a composition pattern with multiple directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic link preview</h3>
        <p class="docs-paragraph">
          Show a preview card when hovering over a link.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With image and content</h3>
        <p class="docs-paragraph">
          Create rich preview cards with images and structured content.
        </p>
        <docs-code-block [code]="richDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Custom delays</h3>
        <p class="docs-paragraph">
          Adjust the open and close delays for better UX.
        </p>
        <docs-code-block [code]="delayDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With arrow</h3>
        <p class="docs-paragraph">
          Add an arrow pointing to the trigger element.
        </p>
        <docs-code-block [code]="arrowDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Controlled state</h3>
        <p class="docs-paragraph">
          Control the open state programmatically.
        </p>
        <docs-code-block [code]="controlledDemoCode" language="typescript" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Preview Card parts using CSS:
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
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Root Outputs" [props]="rootOutputProps" />
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
          The Preview Card follows accessibility best practices:
        </p>
        <ul class="docs-list">
          <li>
            Preview content is supplementary; links remain functional without
            the preview
          </li>
          <li>Closes on Escape key press (configurable)</li>
          <li>Closes on click outside (configurable)</li>
          <li>
            Uses appropriate ARIA attributes to connect trigger and popup
          </li>
          <li>
            <strong>Note:</strong> Preview cards enhance links but shouldn't
            contain essential information only available on hover
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/preview-card/preview-card-docs.component.ts"
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
    .demo-text {
      margin: 0;
      padding: 2rem;
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--docs-text);
      text-align: center;
    }

    .demo-link {
      color: var(--docs-accent, #0066ff);
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 2px;

      &:hover {
        text-decoration-style: solid;
      }
    }

    .demo-preview-card {
      position: relative;
      background: var(--docs-bg, white);
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
      width: 280px;
      overflow: hidden;
      animation: previewIn 0.15s ease-out;
    }

    @keyframes previewIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .demo-preview-content {
      padding: 1rem;
    }

    .demo-preview-title {
      margin: 0 0 0.5rem;
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--docs-text);
    }

    .demo-preview-desc {
      margin: 0 0 0.5rem;
      font-size: 0.8125rem;
      line-height: 1.5;
      color: var(--docs-text-secondary);
    }

    .demo-preview-url {
      font-size: 0.75rem;
      color: var(--docs-text-muted, #999);
    }

    .demo-preview-arrow {
      position: absolute;
      width: 10px;
      height: 10px;
      background: inherit;
      border: inherit;
      transform: rotate(45deg);

      [data-side='top'] & {
        bottom: -6px;
        left: 50%;
        margin-left: -5px;
        border-top: none;
        border-left: none;
      }

      [data-side='bottom'] & {
        top: -6px;
        left: 50%;
        margin-left: -5px;
        border-bottom: none;
        border-right: none;
      }
    }
  `,
})
export class PreviewCardDocsComponent {
  protected readonly importCode = `import {
  PreviewCardRootDirective,
  PreviewCardTriggerDirective,
  PreviewCardPositionerDirective,
  PreviewCardPopupDirective,
  PreviewCardArrowDirective,
} from '@base-ng/ui';

@Component({
  imports: [
    PreviewCardRootDirective,
    PreviewCardTriggerDirective,
    PreviewCardPositionerDirective,
    PreviewCardPopupDirective,
    PreviewCardArrowDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<span baseUiPreviewCardRoot>
  <!-- Trigger (usually a link) -->
  <a baseUiPreviewCardTrigger href="/article">
    Article Title
  </a>

  <!-- Positioner handles placement -->
  <div baseUiPreviewCardPositioner>
    <!-- The preview popup -->
    <div baseUiPreviewCardPopup>
      Preview content here
    </div>
  </div>
</span>`;

  protected readonly basicDemoCode = `<span baseUiPreviewCardRoot>
  <a
    baseUiPreviewCardTrigger
    href="https://en.wikipedia.org/wiki/Angular"
    class="preview-link"
  >
    Angular framework
  </a>

  <div baseUiPreviewCardPositioner>
    <div baseUiPreviewCardPopup class="preview-card">
      <h3 class="preview-title">Angular</h3>
      <p class="preview-text">
        Angular is a TypeScript-based web application framework
        led by the Angular Team at Google.
      </p>
    </div>
  </div>
</span>`;

  protected readonly richDemoCode = `<span baseUiPreviewCardRoot>
  <a baseUiPreviewCardTrigger [href]="article.url" class="article-link">
    {{ article.title }}
  </a>

  <div baseUiPreviewCardPositioner>
    <div baseUiPreviewCardPopup class="preview-card">
      @if (article.image) {
        <img [src]="article.image" [alt]="article.title" class="preview-image" />
      }
      <div class="preview-content">
        <h3 class="preview-title">{{ article.title }}</h3>
        <p class="preview-meta">{{ article.date | date }}</p>
        <p class="preview-excerpt">{{ article.excerpt }}</p>
      </div>
    </div>
  </div>
</span>`;

  protected readonly delayDemoCode = `<!-- Quick preview (300ms open, 100ms close) -->
<span baseUiPreviewCardRoot [delay]="300" [closeDelay]="100">
  <a baseUiPreviewCardTrigger href="#">Quick preview</a>
  <div baseUiPreviewCardPositioner>
    <div baseUiPreviewCardPopup>Preview content</div>
  </div>
</span>

<!-- Slower preview (1000ms open, 500ms close) -->
<span baseUiPreviewCardRoot [delay]="1000" [closeDelay]="500">
  <a baseUiPreviewCardTrigger href="#">Slower preview</a>
  <div baseUiPreviewCardPositioner>
    <div baseUiPreviewCardPopup>Preview content</div>
  </div>
</span>`;

  protected readonly arrowDemoCode = `<span baseUiPreviewCardRoot>
  <a baseUiPreviewCardTrigger href="#">Hover for preview</a>

  <div baseUiPreviewCardPositioner>
    <div baseUiPreviewCardPopup class="preview-card">
      <!-- Arrow pointing to trigger -->
      <div baseUiPreviewCardArrow class="preview-arrow"></div>

      <div class="preview-content">
        <h3>Preview Title</h3>
        <p>Preview description text goes here.</p>
      </div>
    </div>
  </div>
</span>`;

  protected readonly controlledDemoCode = `@Component({
  template: \`
    <span baseUiPreviewCardRoot [(open)]="isPreviewOpen">
      <a
        baseUiPreviewCardTrigger
        href="#"
        (click)="$event.preventDefault()"
      >
        Controlled preview
      </a>

      <div baseUiPreviewCardPositioner>
        <div baseUiPreviewCardPopup>
          <p>Preview is {{ isPreviewOpen() ? 'open' : 'closed' }}</p>
          <button (click)="isPreviewOpen.set(false)">Close</button>
        </div>
      </div>
    </span>

    <button (click)="isPreviewOpen.set(true)">Open Preview</button>
  \`,
})
export class MyComponent {
  readonly isPreviewOpen = signal(false);
}`;

  protected readonly stylingCode = `/* Preview card popup */
.preview-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 320px;
  overflow: hidden;
}

/* Preview image */
.preview-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

/* Preview content */
.preview-content {
  padding: 1rem;
}

.preview-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.preview-text {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Trigger link styling */
.preview-link {
  color: #0066ff;
  text-decoration: underline;
  text-decoration-style: dotted;
}

/* Arrow */
.preview-arrow {
  width: 10px;
  height: 10px;
  background: white;
  transform: rotate(45deg);
  position: absolute;
  box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);
}

/* Animation */
[baseUiPreviewCardPopup] {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

  protected readonly tailwindCode = `<span baseUiPreviewCardRoot>
  <a
    baseUiPreviewCardTrigger
    href="#"
    class="text-blue-600 underline decoration-dotted hover:text-blue-800"
  >
    Angular documentation
  </a>

  <div baseUiPreviewCardPositioner>
    <div
      baseUiPreviewCardPopup
      class="w-80 bg-white rounded-lg shadow-xl overflow-hidden
             animate-in fade-in slide-in-from-bottom-1 duration-150"
    >
      <img
        src="/images/angular-logo.png"
        alt="Angular"
        class="w-full h-40 object-cover"
      />
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 mb-1">
          Angular Framework
        </h3>
        <p class="text-sm text-gray-600 line-clamp-3">
          Angular is a development platform for building mobile and
          desktop web applications using TypeScript/JavaScript.
        </p>
        <span class="text-xs text-gray-400 mt-2 block">
          angular.io
        </span>
      </div>
    </div>
  </div>
</span>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Controlled open state. Supports two-way binding.',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Initial open state for uncontrolled usage.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the preview card is disabled.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '600',
      description: 'Delay in milliseconds before opening.',
    },
    {
      name: 'closeDelay',
      type: 'number',
      default: '300',
      description: 'Delay in milliseconds before closing.',
    },
    {
      name: 'closeOnOutsideClick',
      type: 'boolean',
      default: 'true',
      description: 'Whether to close when clicking outside.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Whether to close when pressing Escape.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<PreviewCardOpenChangeEventDetails>',
      description:
        'Emitted when the open state changes. Includes reason (hover, focus, etc.).',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-open',
      type: 'string',
      description: 'Present when the preview card is open.',
    },
    {
      name: 'data-closed',
      type: 'string',
      description: 'Present when the preview card is closed.',
    },
    {
      name: 'data-disabled',
      type: 'string',
      description: 'Present when the preview card is disabled.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-preview-card-root',
      type: 'class',
      description: 'Applied to the root container.',
    },
    {
      name: 'base-ui-preview-card-trigger',
      type: 'class',
      description: 'Applied to the trigger element.',
    },
    {
      name: 'base-ui-preview-card-positioner',
      type: 'class',
      description: 'Applied to the positioner element.',
    },
    {
      name: 'base-ui-preview-card-popup',
      type: 'class',
      description: 'Applied to the popup element.',
    },
    {
      name: 'base-ui-preview-card-arrow',
      type: 'class',
      description: 'Applied to the arrow element.',
    },
  ];
}

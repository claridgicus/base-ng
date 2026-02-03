import { Component, signal } from '@angular/core';
import {
  CodeBlockComponent,
  EditOnGitHubComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  ScrollAreaRootDirective,
  ScrollAreaViewportDirective,
  ScrollAreaContentDirective,
  ScrollAreaScrollbarDirective,
  ScrollAreaThumbDirective,
} from '@base-ng/ui';

@Component({
  selector: 'docs-scroll-area',
  imports: [
    CodeBlockComponent,
    EditOnGitHubComponent,
    DemoComponent,
    PropsTableComponent,
    ScrollAreaRootDirective,
    ScrollAreaViewportDirective,
    ScrollAreaContentDirective,
    ScrollAreaScrollbarDirective,
    ScrollAreaThumbDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Scroll Area</h1>
        <p class="docs-description">
          A native scroll container with custom scrollbars. Provides fully customizable
          scrollbar appearance while maintaining native scroll behavior and accessibility.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <h2 class="docs-section-title">Live Demo</h2>
        <docs-demo [code]="verticalCode">
          <div baseUiScrollAreaRoot class="demo-scroll-area">
            <div baseUiScrollAreaViewport class="demo-scroll-viewport">
              <div baseUiScrollAreaContent class="demo-scroll-content">
                @for (item of items; track $index) {
                  <div class="demo-scroll-item">
                    <div class="demo-item-number">{{ $index + 1 }}</div>
                    <div class="demo-item-text">
                      <strong>{{ item.title }}</strong>
                      <span>{{ item.description }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div baseUiScrollAreaScrollbar orientation="vertical" class="demo-scrollbar">
              <div baseUiScrollAreaThumb class="demo-scrollbar-thumb"></div>
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
          The Scroll Area uses a directive-based composition pattern with separate parts
          for the viewport, content, scrollbars, and thumb:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic Vertical Scroll</h3>
        <p class="docs-paragraph">
          A basic scrollable area with a custom vertical scrollbar:
        </p>
        <docs-code-block [code]="verticalCode" language="html" />

        <h3 class="docs-section-subtitle">Horizontal Scroll</h3>
        <p class="docs-paragraph">
          Horizontal scrolling with a horizontal scrollbar:
        </p>
        <docs-code-block [code]="horizontalCode" language="html" />

        <h3 class="docs-section-subtitle">Both Scrollbars</h3>
        <p class="docs-paragraph">
          Content that scrolls both horizontally and vertically. Use the Corner
          component to fill the space where scrollbars meet:
        </p>
        <docs-code-block [code]="bothCode" language="html" />

        <h3 class="docs-section-subtitle">Auto-Hide Scrollbars</h3>
        <p class="docs-paragraph">
          Scrollbars can be styled to only appear when hovering or scrolling:
        </p>
        <docs-code-block [code]="autoHideCode" language="css" />

        <h3 class="docs-section-subtitle">Gradient Scroll Fade</h3>
        <p class="docs-paragraph">
          Add fade effects at scroll edges using CSS variables exposed by the component:
        </p>
        <docs-code-block [code]="gradientCode" language="css" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Complete styling example with custom scrollbar appearance:
        </p>
        <docs-code-block [code]="stylingCssCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <docs-code-block [code]="stylingTailwindCode" language="html" />
      </section>

      <!-- CSS Variables -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Variables</h2>
        <p class="docs-paragraph">
          The component exposes CSS variables for advanced styling:
        </p>
        <div class="docs-attribute-table">
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--scroll-area-thumb-height</code></td>
                <td>Height of the vertical thumb (computed based on content)</td>
              </tr>
              <tr>
                <td><code>--scroll-area-thumb-width</code></td>
                <td>Width of the horizontal thumb (computed based on content)</td>
              </tr>
              <tr>
                <td><code>--scroll-area-corner-height</code></td>
                <td>Height of the corner element</td>
              </tr>
              <tr>
                <td><code>--scroll-area-corner-width</code></td>
                <td>Width of the corner element</td>
              </tr>
              <tr>
                <td><code>--scroll-area-overflow-y-start</code></td>
                <td>Distance from top edge (for gradient fade effects)</td>
              </tr>
              <tr>
                <td><code>--scroll-area-overflow-y-end</code></td>
                <td>Distance from bottom edge</td>
              </tr>
              <tr>
                <td><code>--scroll-area-overflow-x-start</code></td>
                <td>Distance from left edge</td>
              </tr>
              <tr>
                <td><code>--scroll-area-overflow-x-end</code></td>
                <td>Distance from right edge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>

        <h3 class="docs-section-subtitle">ScrollAreaRootDirective</h3>
        <p class="docs-paragraph">
          Container that manages scroll state. Selector: <code>[baseUiScrollAreaRoot]</code>
        </p>
        <docs-props-table [props]="rootInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">ScrollAreaViewportDirective</h3>
        <p class="docs-paragraph">
          The scrollable viewport element. Selector: <code>[baseUiScrollAreaViewport]</code>
        </p>

        <h3 class="docs-section-subtitle">ScrollAreaContentDirective</h3>
        <p class="docs-paragraph">
          Wrapper for scrollable content. Selector: <code>[baseUiScrollAreaContent]</code>
        </p>

        <h3 class="docs-section-subtitle">ScrollAreaScrollbarDirective</h3>
        <p class="docs-paragraph">
          The scrollbar track. Selector: <code>[baseUiScrollAreaScrollbar]</code>
        </p>
        <docs-props-table [props]="scrollbarInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">ScrollAreaThumbDirective</h3>
        <p class="docs-paragraph">
          The draggable thumb indicator. Selector: <code>[baseUiScrollAreaThumb]</code>
        </p>

        <h3 class="docs-section-subtitle">ScrollAreaCornerDirective</h3>
        <p class="docs-paragraph">
          Corner element where scrollbars meet. Selector: <code>[baseUiScrollAreaCorner]</code>
        </p>
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data Attributes</h2>
        <p class="docs-paragraph">
          Data attributes for CSS styling based on scroll state:
        </p>
        <div class="docs-attribute-table">
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Applied to</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>data-scrolling</code></td>
                <td>Root</td>
                <td>Present while actively scrolling</td>
              </tr>
              <tr>
                <td><code>data-scrolling-x</code></td>
                <td>Root</td>
                <td>Present while scrolling horizontally</td>
              </tr>
              <tr>
                <td><code>data-scrolling-y</code></td>
                <td>Root</td>
                <td>Present while scrolling vertically</td>
              </tr>
              <tr>
                <td><code>data-has-overflow-x</code></td>
                <td>Viewport</td>
                <td>Present when content overflows horizontally</td>
              </tr>
              <tr>
                <td><code>data-has-overflow-y</code></td>
                <td>Viewport</td>
                <td>Present when content overflows vertically</td>
              </tr>
              <tr>
                <td><code>data-overflow-x-start</code></td>
                <td>Viewport</td>
                <td>Present when scrolled from left edge</td>
              </tr>
              <tr>
                <td><code>data-overflow-x-end</code></td>
                <td>Viewport</td>
                <td>Present when can scroll further right</td>
              </tr>
              <tr>
                <td><code>data-overflow-y-start</code></td>
                <td>Viewport</td>
                <td>Present when scrolled from top edge</td>
              </tr>
              <tr>
                <td><code>data-overflow-y-end</code></td>
                <td>Viewport</td>
                <td>Present when can scroll further down</td>
              </tr>
              <tr>
                <td><code>data-orientation</code></td>
                <td>Scrollbar</td>
                <td>Scrollbar orientation (horizontal/vertical)</td>
              </tr>
              <tr>
                <td><code>data-hovering</code></td>
                <td>Scrollbar</td>
                <td>Present when hovering over scrollbar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Classes</h2>
        <div class="docs-attribute-table">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Applied to</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>.base-ui-scroll-area-root</code></td>
                <td>Root container</td>
              </tr>
              <tr>
                <td><code>.base-ui-scroll-area-viewport</code></td>
                <td>Scrollable viewport</td>
              </tr>
              <tr>
                <td><code>.base-ui-scroll-area-content</code></td>
                <td>Content wrapper</td>
              </tr>
              <tr>
                <td><code>.base-ui-scroll-area-scrollbar</code></td>
                <td>Scrollbar track</td>
              </tr>
              <tr>
                <td><code>.base-ui-scroll-area-scrollbar-vertical</code></td>
                <td>Vertical scrollbar</td>
              </tr>
              <tr>
                <td><code>.base-ui-scroll-area-scrollbar-horizontal</code></td>
                <td>Horizontal scrollbar</td>
              </tr>
              <tr>
                <td><code>.base-ui-scroll-area-thumb</code></td>
                <td>Scrollbar thumb</td>
              </tr>
              <tr>
                <td><code>.base-ui-scroll-area-corner</code></td>
                <td>Corner element</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <ul class="docs-list">
          <li>Uses native scrolling behavior for optimal accessibility</li>
          <li>Keyboard scrolling works natively (arrow keys, Page Up/Down, Home/End)</li>
          <li>Screen readers announce scrollable regions appropriately</li>
          <li>Custom scrollbars are purely visual; actual scrolling is native</li>
          <li>Focus management is handled by the browser</li>
          <li>Touch scrolling works naturally on mobile devices</li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/scroll-area/scroll-area-docs.component.ts"
        />
      </footer>
    </article>
  `,
  styles: `
    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }

    /* Demo styles */
    .demo-scroll-area {
      position: relative;
      height: 250px;
      border: 1px solid var(--docs-border);
      border-radius: 8px;
      background: var(--docs-bg);
    }

    .demo-scroll-viewport {
      height: 100%;
      width: 100%;
      overflow: auto;
    }

    .demo-scroll-content {
      padding: 0.5rem;
    }

    .demo-scroll-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      margin-bottom: 0.25rem;
      background: var(--docs-bg-hover);
      border-radius: 6px;
    }

    .demo-item-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--docs-accent);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .demo-item-text {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .demo-item-text strong {
      font-size: 0.875rem;
      color: var(--docs-text);
    }

    .demo-item-text span {
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
    }

    .demo-scrollbar {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      bottom: 0.5rem;
      width: 8px;
      background: var(--docs-bg-hover);
      border-radius: 4px;
    }

    .demo-scrollbar-thumb {
      width: 100%;
      background: var(--docs-text-tertiary);
      border-radius: 4px;
      transition: background 0.15s ease;
    }

    .demo-scrollbar-thumb:hover {
      background: var(--docs-text-secondary);
    }
  `,
})
export class ScrollAreaDocsComponent {
  protected readonly items = Array.from({ length: 15 }, (_, i) => ({
    title: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}`,
  }));

  importCode = `import {
  ScrollAreaRootDirective,
  ScrollAreaViewportDirective,
  ScrollAreaContentDirective,
  ScrollAreaScrollbarDirective,
  ScrollAreaThumbDirective,
  ScrollAreaCornerDirective,
} from '@base-ng/ui';`;

  anatomyCode = `<div baseUiScrollAreaRoot class="scroll-area">
  <!-- Scrollable viewport -->
  <div baseUiScrollAreaViewport class="scroll-area-viewport">
    <!-- Content wrapper -->
    <div baseUiScrollAreaContent class="scroll-area-content">
      <!-- Your scrollable content here -->
    </div>
  </div>

  <!-- Vertical scrollbar -->
  <div baseUiScrollAreaScrollbar orientation="vertical" class="scroll-area-scrollbar">
    <div baseUiScrollAreaThumb class="scroll-area-thumb"></div>
  </div>

  <!-- Horizontal scrollbar (optional) -->
  <div baseUiScrollAreaScrollbar orientation="horizontal" class="scroll-area-scrollbar">
    <div baseUiScrollAreaThumb class="scroll-area-thumb"></div>
  </div>

  <!-- Corner where scrollbars meet (optional) -->
  <div baseUiScrollAreaCorner class="scroll-area-corner"></div>
</div>`;

  verticalCode = `<div baseUiScrollAreaRoot class="scroll-area" style="height: 300px;">
  <div baseUiScrollAreaViewport class="scroll-area-viewport">
    <div baseUiScrollAreaContent class="scroll-area-content">
      <div class="content-box" *ngFor="let item of items">
        {{ item }}
      </div>
    </div>
  </div>
  <div baseUiScrollAreaScrollbar orientation="vertical" class="scrollbar-y">
    <div baseUiScrollAreaThumb class="scrollbar-thumb"></div>
  </div>
</div>`;

  horizontalCode = `<div baseUiScrollAreaRoot class="scroll-area" style="width: 400px;">
  <div baseUiScrollAreaViewport class="scroll-area-viewport">
    <div baseUiScrollAreaContent class="scroll-area-content horizontal-content">
      <div class="content-item" *ngFor="let item of items">
        {{ item }}
      </div>
    </div>
  </div>
  <div baseUiScrollAreaScrollbar orientation="horizontal" class="scrollbar-x">
    <div baseUiScrollAreaThumb class="scrollbar-thumb"></div>
  </div>
</div>`;

  bothCode = `<div baseUiScrollAreaRoot class="scroll-area" style="width: 400px; height: 300px;">
  <div baseUiScrollAreaViewport class="scroll-area-viewport">
    <div baseUiScrollAreaContent class="scroll-area-content">
      <!-- Large content that scrolls both ways -->
      <div class="large-content" style="width: 800px; height: 600px;">
        <!-- Content here -->
      </div>
    </div>
  </div>

  <!-- Vertical scrollbar -->
  <div baseUiScrollAreaScrollbar orientation="vertical" class="scrollbar-y">
    <div baseUiScrollAreaThumb class="scrollbar-thumb"></div>
  </div>

  <!-- Horizontal scrollbar -->
  <div baseUiScrollAreaScrollbar orientation="horizontal" class="scrollbar-x">
    <div baseUiScrollAreaThumb class="scrollbar-thumb"></div>
  </div>

  <!-- Corner to prevent visual overlap -->
  <div baseUiScrollAreaCorner class="scrollbar-corner"></div>
</div>`;

  autoHideCode = `/* Scrollbar hidden by default, visible on hover or scroll */
.scroll-area-scrollbar {
  opacity: 0;
  transition: opacity 0.2s;
}

/* Show when hovering the scroll area */
.scroll-area:hover .scroll-area-scrollbar {
  opacity: 1;
}

/* Show when actively scrolling */
.scroll-area[data-scrolling] .scroll-area-scrollbar {
  opacity: 1;
}

/* Or use the specific axis attributes */
.scroll-area[data-scrolling-y] .scrollbar-y {
  opacity: 1;
}

.scroll-area[data-scrolling-x] .scrollbar-x {
  opacity: 1;
}`;

  gradientCode = `/* Fade effect at scroll edges */
.scroll-area-viewport {
  position: relative;
}

/* Top fade when scrolled down */
.scroll-area-viewport[data-overflow-y-start]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, white, transparent);
  pointer-events: none;
  z-index: 1;
}

/* Bottom fade when more content below */
.scroll-area-viewport[data-overflow-y-end]::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, white, transparent);
  pointer-events: none;
  z-index: 1;
}`;

  stylingCssCode = `.scroll-area {
  position: relative;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.scroll-area-viewport {
  width: 100%;
  height: 100%;
  overflow: auto;
  /* Hide native scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-area-viewport::-webkit-scrollbar {
  display: none;
}

.scroll-area-content {
  min-width: max-content;
}

/* Vertical scrollbar */
.scrollbar-y {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  padding: 2px;
  background: transparent;
}

/* Horizontal scrollbar */
.scrollbar-x {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 10px;
  width: 100%;
  padding: 2px;
  background: transparent;
}

/* Scrollbar thumb */
.scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 9999px;
  transition: background 0.15s;
}

.scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* Vertical thumb sizing */
.scrollbar-y .scrollbar-thumb {
  width: 100%;
  /* Height and position are set dynamically */
}

/* Horizontal thumb sizing */
.scrollbar-x .scrollbar-thumb {
  height: 100%;
  /* Width and position are set dynamically */
}

/* Corner where scrollbars meet */
.scrollbar-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #f3f4f6;
}`;

  stylingTailwindCode = `<div baseUiScrollAreaRoot
     class="relative overflow-hidden border border-gray-200 rounded-lg h-[300px]">
  <div baseUiScrollAreaViewport
       class="w-full h-full overflow-auto
              [scrollbar-width:none] [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden">
    <div baseUiScrollAreaContent class="min-w-max">
      <!-- Content here -->
      @for (item of items; track item) {
        <div class="p-4 border-b border-gray-100">{{ item }}</div>
      }
    </div>
  </div>

  <!-- Vertical scrollbar -->
  <div baseUiScrollAreaScrollbar
       orientation="vertical"
       class="absolute top-0 right-0 w-2.5 h-full p-0.5">
    <div baseUiScrollAreaThumb
         class="bg-gray-300 rounded-full hover:bg-gray-400 transition-colors w-full"></div>
  </div>

  <!-- Horizontal scrollbar -->
  <div baseUiScrollAreaScrollbar
       orientation="horizontal"
       class="absolute bottom-0 left-0 h-2.5 w-full p-0.5">
    <div baseUiScrollAreaThumb
         class="bg-gray-300 rounded-full hover:bg-gray-400 transition-colors h-full"></div>
  </div>

  <!-- Corner -->
  <div baseUiScrollAreaCorner
       class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-100"></div>
</div>`;

  // API Props
  rootInputProps: PropDefinition[] = [
    { name: 'overflowEdgeThreshold', type: 'number', default: '0', description: 'Threshold in pixels for detecting overflow edges.' },
  ];

  scrollbarInputProps: PropDefinition[] = [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'The scrollbar orientation.' },
    { name: 'keepMounted', type: 'boolean', default: 'false', description: 'Keep scrollbar mounted when not needed.' },
  ];
}

import { Component, signal } from '@angular/core';
import {
  CodeBlockComponent,
  EditOnGitHubComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  SelectRootDirective,
  SelectTriggerDirective,
  SelectValueDirective,
  SelectIconDirective,
  SelectPositionerDirective,
  SelectPopupDirective,
  SelectListDirective,
  SelectItemDirective,
  SelectItemIndicatorDirective,
  SelectItemTextDirective,
} from '@base-ng/ui';

@Component({
  selector: 'docs-select',
  imports: [
    CodeBlockComponent,
    EditOnGitHubComponent,
    DemoComponent,
    PropsTableComponent,
    SelectRootDirective,
    SelectTriggerDirective,
    SelectValueDirective,
    SelectIconDirective,
    SelectPositionerDirective,
    SelectPopupDirective,
    SelectListDirective,
    SelectItemDirective,
    SelectItemIndicatorDirective,
    SelectItemTextDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Select</h1>
        <p class="docs-description">
          A form control for choosing a predefined value from a dropdown menu.
          Features keyboard navigation, type-ahead search, multiple selection,
          and grouped items.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <h2 class="docs-section-title">Live Demo</h2>
        <docs-demo [code]="basicCode">
          <div baseUiSelectRoot [(value)]="selectedFruit" class="demo-select">
            <button baseUiSelectTrigger class="demo-select-trigger">
              <span baseUiSelectValue [placeholder]="'Select a fruit...'">
                {{ selectedFruit() || 'Select a fruit...' }}
              </span>
              <span baseUiSelectIcon class="demo-select-icon">
                <svg viewBox="0 0 12 12" width="12" height="12">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" fill="none" stroke-width="1.5"/>
                </svg>
              </span>
            </button>
            <div baseUiSelectPositioner class="demo-select-positioner">
              <div baseUiSelectPopup class="demo-select-popup">
                <div baseUiSelectList class="demo-select-list">
                  @for (fruit of fruits; track fruit.value) {
                    <div baseUiSelectItem [value]="fruit.value" class="demo-select-item">
                      <span baseUiSelectItemIndicator class="demo-select-indicator">
                        <svg viewBox="0 0 12 12" width="12" height="12">
                          <path d="M2 6l3 3 5-6" stroke="currentColor" fill="none" stroke-width="1.5"/>
                        </svg>
                      </span>
                      <span baseUiSelectItemText>{{ fruit.label }}</span>
                    </div>
                  }
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
        <p class="docs-paragraph">
          The Select uses a directive-based composition pattern with many parts
          that can be combined as needed:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic Select</h3>
        <p class="docs-paragraph">
          A simple select for choosing a single value from a list of options:
        </p>
        <docs-code-block [code]="basicCode" language="html" />

        <h3 class="docs-section-subtitle">Grouped Items</h3>
        <p class="docs-paragraph">
          Items can be organized into groups with labels for better categorization:
        </p>
        <docs-code-block [code]="groupedCode" language="html" />

        <h3 class="docs-section-subtitle">Multiple Selection</h3>
        <p class="docs-paragraph">
          Enable multiple selection with the <code>multiple</code> input:
        </p>
        <docs-code-block [code]="multipleCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled State</h3>
        <p class="docs-paragraph">
          The select or individual items can be disabled:
        </p>
        <docs-code-block [code]="disabledCode" language="html" />

        <h3 class="docs-section-subtitle">Positioning</h3>
        <p class="docs-paragraph">
          Control popup positioning with <code>side</code>, <code>align</code>, and offset inputs:
        </p>
        <docs-code-block [code]="positioningCode" language="html" />

        <h3 class="docs-section-subtitle">Scroll Arrows</h3>
        <p class="docs-paragraph">
          Add scroll arrows to indicate content overflow in long lists:
        </p>
        <docs-code-block [code]="scrollArrowsCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the select using CSS classes and data attributes for state-based styling:
        </p>
        <docs-code-block [code]="stylingCssCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <docs-code-block [code]="stylingTailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>

        <h3 class="docs-section-subtitle">SelectRootDirective</h3>
        <p class="docs-paragraph">
          Container that groups all parts of the select. Apply to any element.
          Selector: <code>[baseUiSelectRoot]</code>
        </p>
        <docs-props-table [props]="rootInputProps" title="Inputs" />
        <docs-props-table [props]="rootOutputProps" title="Outputs" />

        <h3 class="docs-section-subtitle">SelectTriggerDirective</h3>
        <p class="docs-paragraph">
          Button that opens the popup. Apply to a <code>&lt;button&gt;</code> element.
          Selector: <code>[baseUiSelectTrigger]</code>
        </p>
        <docs-props-table [props]="triggerInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">SelectValueDirective</h3>
        <p class="docs-paragraph">
          Displays the selected value or placeholder. Apply to a <code>&lt;span&gt;</code> element.
          Selector: <code>[baseUiSelectValue]</code>
        </p>
        <docs-props-table [props]="valueInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">SelectPositionerDirective</h3>
        <p class="docs-paragraph">
          Positions the popup relative to the trigger. Apply to a <code>&lt;div&gt;</code> element.
          Selector: <code>[baseUiSelectPositioner]</code>
        </p>
        <docs-props-table [props]="positionerInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">SelectItemDirective</h3>
        <p class="docs-paragraph">
          An individual selectable option. Apply to a <code>&lt;div&gt;</code> element.
          Selector: <code>[baseUiSelectItem]</code>
        </p>
        <docs-props-table [props]="itemInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">SelectScrollUpArrowDirective / SelectScrollDownArrowDirective</h3>
        <p class="docs-paragraph">
          Scroll indicators for long lists. Apply to <code>&lt;div&gt;</code> elements.
          Selectors: <code>[baseUiSelectScrollUpArrow]</code>, <code>[baseUiSelectScrollDownArrow]</code>
        </p>
        <docs-props-table [props]="scrollArrowInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">Other Parts</h3>
        <ul class="docs-list">
          <li><code>[baseUiSelectIcon]</code> - Visual indicator for the dropdown</li>
          <li><code>[baseUiSelectPopup]</code> - Popup container</li>
          <li><code>[baseUiSelectList]</code> - Wraps the list of items</li>
          <li><code>[baseUiSelectItemIndicator]</code> - Shows selection status</li>
          <li><code>[baseUiSelectItemText]</code> - Text label of an item</li>
          <li><code>[baseUiSelectGroup]</code> - Groups related items</li>
          <li><code>[baseUiSelectGroupLabel]</code> - Label for a group</li>
          <li><code>[baseUiSelectArrow]</code> - Positioned arrow against the anchor</li>
          <li><code>[baseUiSelectBackdrop]</code> - Overlay beneath the popup</li>
          <li><code>[baseUiSelectPortal]</code> - Moves popup to different DOM location</li>
        </ul>
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data Attributes</h2>
        <p class="docs-paragraph">
          These data attributes are applied for CSS styling based on component state:
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
                <td><code>data-open</code></td>
                <td>Root, Trigger, Popup, Positioner</td>
                <td>Present when the select is open</td>
              </tr>
              <tr>
                <td><code>data-disabled</code></td>
                <td>Root, Trigger, Item</td>
                <td>Present when disabled</td>
              </tr>
              <tr>
                <td><code>data-placeholder</code></td>
                <td>Trigger, Value</td>
                <td>Present when showing placeholder</td>
              </tr>
              <tr>
                <td><code>data-readonly</code></td>
                <td>Trigger</td>
                <td>Present when read-only</td>
              </tr>
              <tr>
                <td><code>data-selected</code></td>
                <td>Item</td>
                <td>Present when the item is selected</td>
              </tr>
              <tr>
                <td><code>data-highlighted</code></td>
                <td>Item</td>
                <td>Present when the item is highlighted via keyboard</td>
              </tr>
              <tr>
                <td><code>data-side</code></td>
                <td>Positioner, Popup</td>
                <td>Indicates positioning side (top, bottom, left, right)</td>
              </tr>
              <tr>
                <td><code>data-align</code></td>
                <td>Positioner, Popup</td>
                <td>Indicates alignment (start, center, end)</td>
              </tr>
              <tr>
                <td><code>data-starting-style</code></td>
                <td>Popup</td>
                <td>Present during opening transition</td>
              </tr>
              <tr>
                <td><code>data-ending-style</code></td>
                <td>Popup</td>
                <td>Present during closing transition</td>
              </tr>
              <tr>
                <td><code>data-visible</code></td>
                <td>ScrollUpArrow, ScrollDownArrow</td>
                <td>Present when scroll arrow is visible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Classes</h2>
        <p class="docs-paragraph">
          Each directive applies CSS classes that can be used for styling:
        </p>
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
                <td><code>.base-ui-select-root</code></td>
                <td>Root container</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-root-open</code></td>
                <td>Root when open</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-root-disabled</code></td>
                <td>Root when disabled</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-trigger</code></td>
                <td>Trigger button</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-trigger-open</code></td>
                <td>Trigger when open</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-value</code></td>
                <td>Value display</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-value-placeholder</code></td>
                <td>Value when showing placeholder</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-positioner</code></td>
                <td>Positioning wrapper</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-popup</code></td>
                <td>Popup container</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-list</code></td>
                <td>List wrapper</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-item</code></td>
                <td>Individual item</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-item-selected</code></td>
                <td>Selected item</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-item-highlighted</code></td>
                <td>Highlighted item</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-item-disabled</code></td>
                <td>Disabled item</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-group</code></td>
                <td>Group container</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-scroll-up-arrow</code></td>
                <td>Scroll up indicator</td>
              </tr>
              <tr>
                <td><code>.base-ui-select-scroll-down-arrow</code></td>
                <td>Scroll down indicator</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Keyboard Navigation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Keyboard Navigation</h2>
        <div class="docs-attribute-table">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd>Enter</kbd> / <kbd>Space</kbd></td>
                <td>When trigger focused: opens the popup. When item highlighted: selects the item.</td>
              </tr>
              <tr>
                <td><kbd>ArrowDown</kbd></td>
                <td>Opens the popup or moves highlight to next item</td>
              </tr>
              <tr>
                <td><kbd>ArrowUp</kbd></td>
                <td>Opens the popup or moves highlight to previous item</td>
              </tr>
              <tr>
                <td><kbd>Home</kbd></td>
                <td>Moves highlight to first item</td>
              </tr>
              <tr>
                <td><kbd>End</kbd></td>
                <td>Moves highlight to last item</td>
              </tr>
              <tr>
                <td><kbd>Escape</kbd></td>
                <td>Closes the popup and returns focus to trigger</td>
              </tr>
              <tr>
                <td><kbd>Tab</kbd></td>
                <td>Closes the popup and moves focus to next focusable element</td>
              </tr>
              <tr>
                <td>Type characters</td>
                <td>Type-ahead search: highlights matching items</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <ul class="docs-list">
          <li>Follows the WAI-ARIA Combobox pattern with Listbox popup</li>
          <li>The trigger has <code>role="combobox"</code> with appropriate ARIA attributes</li>
          <li>Items have <code>role="option"</code> with <code>aria-selected</code> state</li>
          <li>Groups use <code>role="group"</code> with <code>aria-labelledby</code></li>
          <li>Supports full keyboard navigation including type-ahead search</li>
          <li>Use with Field component for proper accessible labeling</li>
          <li>For large lists with filtering needs, consider using Combobox instead</li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/select/select-docs.component.ts"
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

    .docs-attribute-table {
      margin: 1rem 0;
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }

      th, td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid var(--docs-border);
      }

      th {
        font-weight: 600;
        color: var(--docs-text);
      }

      td {
        color: var(--docs-text-secondary);
      }

      code {
        background: var(--docs-code-bg);
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.8125rem;
      }
    }

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }

    /* Demo styles */
    .demo-select {
      position: relative;
      display: inline-block;
    }

    .demo-select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 200px;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--docs-border);
      border-radius: 6px;
      background: var(--docs-bg);
      color: var(--docs-text);
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.15s ease;
    }

    .demo-select-trigger:hover {
      background: var(--docs-bg-hover);
    }

    .demo-select-trigger:focus {
      outline: none;
      border-color: var(--docs-accent);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .demo-select-trigger[data-placeholder] {
      color: var(--docs-text-tertiary);
    }

    .demo-select-icon {
      transition: transform 0.15s ease;
    }

    .demo-select-trigger[data-open] .demo-select-icon {
      transform: rotate(180deg);
    }

    .demo-select-positioner {
      position: absolute;
      z-index: 50;
    }

    .demo-select-popup {
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      animation: selectIn 0.15s ease;
    }

    @keyframes selectIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .demo-select-list {
      padding: 0.25rem;
    }

    .demo-select-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--docs-text);
      transition: background 0.1s ease;
    }

    .demo-select-item:hover,
    .demo-select-item[data-highlighted] {
      background: var(--docs-bg-hover);
    }

    .demo-select-item[data-selected] {
      font-weight: 500;
    }

    .demo-select-indicator {
      width: 16px;
      visibility: hidden;
    }

    .demo-select-item[data-selected] .demo-select-indicator {
      visibility: visible;
      color: var(--docs-accent);
    }
  `,
})
export class SelectDocsComponent {
  protected readonly selectedFruit = signal<string | null>(null);
  protected readonly fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
    { value: 'strawberry', label: 'Strawberry' },
  ];

  importCode = `import {
  SelectRootDirective,
  SelectTriggerDirective,
  SelectValueDirective,
  SelectIconDirective,
  SelectPositionerDirective,
  SelectPopupDirective,
  SelectListDirective,
  SelectItemDirective,
  SelectItemIndicatorDirective,
  SelectItemTextDirective,
  SelectGroupDirective,
  SelectGroupLabelDirective,
  SelectScrollUpArrowDirective,
  SelectScrollDownArrowDirective,
} from '@base-ng/ui';`;

  anatomyCode = `<div baseUiSelectRoot>
  <!-- Trigger button -->
  <button baseUiSelectTrigger>
    <span baseUiSelectValue placeholder="Select..."></span>
    <span baseUiSelectIcon></span>
  </button>

  <!-- Positioned popup -->
  <div baseUiSelectPositioner>
    <div baseUiSelectPopup>
      <!-- Optional scroll indicators -->
      <div baseUiSelectScrollUpArrow></div>

      <!-- List of items -->
      <div baseUiSelectList>
        <!-- Grouped items -->
        <div baseUiSelectGroup>
          <div baseUiSelectGroupLabel>Group</div>
          <div baseUiSelectItem [value]="'item'">
            <span baseUiSelectItemIndicator></span>
            <span baseUiSelectItemText>Item</span>
          </div>
        </div>
      </div>

      <div baseUiSelectScrollDownArrow></div>
    </div>
  </div>
</div>`;

  basicCode = `<div baseUiSelectRoot [(value)]="selectedFruit" class="select">
  <button baseUiSelectTrigger class="select-trigger">
    <span baseUiSelectValue placeholder="Select a fruit...">
      {{ selectedFruit || 'Select a fruit...' }}
    </span>
    <span baseUiSelectIcon class="select-icon">▼</span>
  </button>
  <div baseUiSelectPositioner class="select-positioner">
    <div baseUiSelectPopup class="select-popup">
      <div baseUiSelectList class="select-list">
        <div baseUiSelectItem [value]="'apple'" class="select-item">
          <span baseUiSelectItemIndicator class="select-indicator">✓</span>
          <span baseUiSelectItemText>Apple</span>
        </div>
        <div baseUiSelectItem [value]="'banana'" class="select-item">
          <span baseUiSelectItemIndicator class="select-indicator">✓</span>
          <span baseUiSelectItemText>Banana</span>
        </div>
        <div baseUiSelectItem [value]="'cherry'" class="select-item">
          <span baseUiSelectItemIndicator class="select-indicator">✓</span>
          <span baseUiSelectItemText>Cherry</span>
        </div>
      </div>
    </div>
  </div>
</div>`;

  groupedCode = `<div baseUiSelectRoot [(value)]="selectedFood">
  <button baseUiSelectTrigger class="select-trigger">
    <span baseUiSelectValue placeholder="Select a food..."></span>
    <span baseUiSelectIcon>▼</span>
  </button>
  <div baseUiSelectPositioner>
    <div baseUiSelectPopup class="select-popup">
      <div baseUiSelectList>
        <div baseUiSelectGroup class="select-group">
          <div baseUiSelectGroupLabel class="select-group-label">Fruits</div>
          <div baseUiSelectItem [value]="'apple'" class="select-item">
            <span baseUiSelectItemIndicator>✓</span>
            <span baseUiSelectItemText>Apple</span>
          </div>
          <div baseUiSelectItem [value]="'banana'" class="select-item">
            <span baseUiSelectItemIndicator>✓</span>
            <span baseUiSelectItemText>Banana</span>
          </div>
        </div>
        <div baseUiSelectGroup class="select-group">
          <div baseUiSelectGroupLabel class="select-group-label">Vegetables</div>
          <div baseUiSelectItem [value]="'carrot'" class="select-item">
            <span baseUiSelectItemIndicator>✓</span>
            <span baseUiSelectItemText>Carrot</span>
          </div>
          <div baseUiSelectItem [value]="'broccoli'" class="select-item">
            <span baseUiSelectItemIndicator>✓</span>
            <span baseUiSelectItemText>Broccoli</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

  multipleCode = `<div baseUiSelectRoot [multiple]="true" [(value)]="selectedColors">
  <button baseUiSelectTrigger class="select-trigger">
    <span baseUiSelectValue placeholder="Select colors...">
      {{ selectedColors?.length ? selectedColors.join(', ') : 'Select colors...' }}
    </span>
    <span baseUiSelectIcon>▼</span>
  </button>
  <div baseUiSelectPositioner>
    <div baseUiSelectPopup class="select-popup">
      <div baseUiSelectList>
        @for (color of colors; track color) {
          <div baseUiSelectItem [value]="color" class="select-item">
            <span baseUiSelectItemIndicator>✓</span>
            <span baseUiSelectItemText>{{ color }}</span>
          </div>
        }
      </div>
    </div>
  </div>
</div>`;

  disabledCode = `<!-- Disabled select -->
<div baseUiSelectRoot [disabled]="true">
  <button baseUiSelectTrigger class="select-trigger">
    <span baseUiSelectValue placeholder="Disabled select"></span>
    <span baseUiSelectIcon>▼</span>
  </button>
</div>

<!-- Select with disabled items -->
<div baseUiSelectRoot [(value)]="selectedValue">
  <button baseUiSelectTrigger class="select-trigger">
    <span baseUiSelectValue placeholder="Select an option..."></span>
    <span baseUiSelectIcon>▼</span>
  </button>
  <div baseUiSelectPositioner>
    <div baseUiSelectPopup class="select-popup">
      <div baseUiSelectList>
        <div baseUiSelectItem [value]="'option1'" class="select-item">
          <span baseUiSelectItemText>Option 1</span>
        </div>
        <div baseUiSelectItem [value]="'option2'" [disabled]="true" class="select-item">
          <span baseUiSelectItemText>Option 2 (disabled)</span>
        </div>
        <div baseUiSelectItem [value]="'option3'" class="select-item">
          <span baseUiSelectItemText>Option 3</span>
        </div>
      </div>
    </div>
  </div>
</div>`;

  positioningCode = `<div baseUiSelectRoot [(value)]="value">
  <button baseUiSelectTrigger class="select-trigger">
    <span baseUiSelectValue placeholder="Select..."></span>
    <span baseUiSelectIcon>▼</span>
  </button>
  <div baseUiSelectPositioner
       side="top"
       align="start"
       [sideOffset]="8"
       [alignOffset]="0">
    <div baseUiSelectPopup class="select-popup">
      <div baseUiSelectList>
        <div baseUiSelectItem [value]="'option1'">Option 1</div>
        <div baseUiSelectItem [value]="'option2'">Option 2</div>
      </div>
    </div>
  </div>
</div>`;

  scrollArrowsCode = `<div baseUiSelectRoot [(value)]="selectedCountry">
  <button baseUiSelectTrigger class="select-trigger">
    <span baseUiSelectValue placeholder="Select a country..."></span>
    <span baseUiSelectIcon>▼</span>
  </button>
  <div baseUiSelectPositioner>
    <div baseUiSelectPopup class="select-popup">
      <div baseUiSelectScrollUpArrow class="select-scroll-arrow">▲</div>
      <div baseUiSelectList class="select-list-scroll">
        @for (country of countries; track country) {
          <div baseUiSelectItem [value]="country" class="select-item">
            <span baseUiSelectItemIndicator>✓</span>
            <span baseUiSelectItemText>{{ country }}</span>
          </div>
        }
      </div>
      <div baseUiSelectScrollDownArrow class="select-scroll-arrow">▼</div>
    </div>
  </div>
</div>`;

  stylingCssCode = `.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
}

.select-trigger:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.select-trigger[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.select-trigger[data-placeholder] {
  color: #9ca3af;
}

.select-icon {
  transition: transform 0.15s;
}

.select-trigger[data-open] .select-icon {
  transform: rotate(180deg);
}

.select-positioner {
  position: absolute;
  z-index: 50;
}

.select-popup {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.select-list {
  padding: 0.25rem;
}

.select-list-scroll {
  max-height: 150px;
  overflow-y: auto;
}

.select-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.select-item[data-highlighted] {
  background: #f3f4f6;
}

.select-item[data-selected] {
  font-weight: 500;
}

.select-item[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.select-indicator {
  visibility: hidden;
  width: 1rem;
}

.select-item[data-selected] .select-indicator {
  visibility: visible;
}

.select-group-label {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
}

.select-scroll-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  color: #6b7280;
}`;

  stylingTailwindCode = `<div baseUiSelectRoot [(value)]="value" class="relative inline-block">
  <button baseUiSelectTrigger
    class="flex items-center justify-between min-w-[200px] px-3 py-2
           border border-gray-300 rounded-md bg-white
           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
           data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
           data-[placeholder]:text-gray-400">
    <span baseUiSelectValue placeholder="Select..."></span>
    <span baseUiSelectIcon
          class="transition-transform data-[open]:rotate-180">
      ▼
    </span>
  </button>
  <div baseUiSelectPositioner class="absolute z-50">
    <div baseUiSelectPopup
         class="bg-white border border-gray-200 rounded-md shadow-lg p-1">
      <div baseUiSelectList>
        <div baseUiSelectItem [value]="'option'"
             class="flex items-center gap-2 px-3 py-2 rounded cursor-pointer
                    data-[highlighted]:bg-gray-100
                    data-[selected]:font-medium
                    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed">
          <span baseUiSelectItemIndicator
                class="w-4 invisible data-[selected]:visible">✓</span>
          <span baseUiSelectItemText>Option</span>
        </div>
      </div>
    </div>
  </div>
</div>`;

  // API Props
  rootInputProps: PropDefinition[] = [
    { name: 'value', type: 'T | T[] | null', description: 'The selected value (controlled).' },
    { name: 'defaultValue', type: 'T | T[] | null', description: 'The initial value (uncontrolled).' },
    { name: 'open', type: 'boolean', default: 'false', description: 'Whether the popup is open (controlled).' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Whether the popup is initially open (uncontrolled).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled.' },
    { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the select is read-only.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Whether the select is required.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple selection is allowed.' },
  ];

  rootOutputProps: PropDefinition[] = [
    { name: 'valueChange', type: 'EventEmitter<T | T[] | null>', description: 'Emits when the value changes.' },
    { name: 'openChange', type: 'EventEmitter<boolean>', description: 'Emits when the open state changes.' },
  ];

  triggerInputProps: PropDefinition[] = [
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the trigger is disabled independently.' },
  ];

  valueInputProps: PropDefinition[] = [
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text when no value is selected.' },
  ];

  positionerInputProps: PropDefinition[] = [
    { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'The preferred side for positioning.' },
    { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'The preferred alignment.' },
    { name: 'sideOffset', type: 'number', default: '0', description: 'Offset from trigger along the main axis.' },
    { name: 'alignOffset', type: 'number', default: '0', description: 'Offset from trigger along the cross axis.' },
    { name: 'keepMounted', type: 'boolean', default: 'false', description: 'Whether to keep the popup in DOM when closed.' },
    { name: 'alignItemWithTrigger', type: 'boolean', default: 'true', description: 'Align selected item with trigger (mouse interaction).' },
  ];

  itemInputProps: PropDefinition[] = [
    { name: 'value', type: 'T', required: true, description: 'The value of this item.' },
    { name: 'label', type: 'string', description: 'Optional label (defaults to text content).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the item is disabled.' },
  ];

  scrollArrowInputProps: PropDefinition[] = [
    { name: 'keepMounted', type: 'boolean', default: 'false', description: 'Whether to keep arrow mounted when not visible.' },
  ];
}

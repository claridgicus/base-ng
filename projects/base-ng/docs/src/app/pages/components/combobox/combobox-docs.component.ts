import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  EditOnGitHubComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-combobox',
  imports: [CodeBlockComponent, EditOnGitHubComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Combobox</h1>
        <p class="docs-description">
          An input combined with a list of predefined items, enabling filtering and
          selection. Use when users need to search through options rather than
          scrolling through a long list.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">Import the Combobox directives:</p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Combobox uses a directive-based composition pattern combining an input
          field with a filterable dropdown list:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic Combobox</h3>
        <p class="docs-paragraph">
          A searchable dropdown where users can type to filter available options:
        </p>
        <docs-code-block [code]="basicCode" language="html" />

        <h3 class="docs-section-subtitle">With Trigger Button</h3>
        <p class="docs-paragraph">
          Add a trigger button alongside the input to explicitly open the dropdown:
        </p>
        <docs-code-block [code]="triggerCode" language="html" />

        <h3 class="docs-section-subtitle">Multiple Selection</h3>
        <p class="docs-paragraph">
          Enable multiple selection with the <code>multiple</code> input. Selected
          items can be displayed as chips or tags:
        </p>
        <docs-code-block [code]="multipleCode" language="html" />

        <h3 class="docs-section-subtitle">With Clear Button</h3>
        <p class="docs-paragraph">
          Add a clear button to reset the selection:
        </p>
        <docs-code-block [code]="clearCode" language="html" />

        <h3 class="docs-section-subtitle">Grouped Items</h3>
        <p class="docs-paragraph">
          Organize items into groups with labels:
        </p>
        <docs-code-block [code]="groupedCode" language="html" />

        <h3 class="docs-section-subtitle">Empty State</h3>
        <p class="docs-paragraph">
          Show a message when no items match the filter:
        </p>
        <docs-code-block [code]="emptyCode" language="html" />

        <h3 class="docs-section-subtitle">Custom Filter</h3>
        <p class="docs-paragraph">
          Configure filtering behavior with <code>filterOptions</code>:
        </p>
        <docs-code-block [code]="filterCode" language="html" />

        <h3 class="docs-section-subtitle">Disabled State</h3>
        <p class="docs-paragraph">
          Disable the entire combobox or individual items:
        </p>
        <docs-code-block [code]="disabledCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the combobox using CSS classes and data attributes for state-based styling:
        </p>
        <docs-code-block [code]="stylingCssCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <docs-code-block [code]="stylingTailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>

        <h3 class="docs-section-subtitle">ComboboxRootDirective</h3>
        <p class="docs-paragraph">
          Container that groups all parts of the combobox. Apply to any element.
          Selector: <code>[baseUiComboboxRoot]</code>
        </p>
        <docs-props-table [props]="rootInputProps" title="Inputs" />
        <docs-props-table [props]="rootOutputProps" title="Outputs" />

        <h3 class="docs-section-subtitle">ComboboxInputDirective</h3>
        <p class="docs-paragraph">
          The text input for filtering items. Apply to an <code>&lt;input&gt;</code> element.
          Selector: <code>[baseUiComboboxInput]</code>
        </p>
        <docs-props-table [props]="inputInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">ComboboxTriggerDirective</h3>
        <p class="docs-paragraph">
          Optional button to open the popup. Apply to a <code>&lt;button&gt;</code> element.
          Selector: <code>[baseUiComboboxTrigger]</code>
        </p>
        <docs-props-table [props]="triggerInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">ComboboxPositionerDirective</h3>
        <p class="docs-paragraph">
          Positions the popup relative to the input. Apply to a <code>&lt;div&gt;</code> element.
          Selector: <code>[baseUiComboboxPositioner]</code>
        </p>
        <docs-props-table [props]="positionerInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">ComboboxItemDirective</h3>
        <p class="docs-paragraph">
          An individual selectable option. Apply to a <code>&lt;div&gt;</code> element.
          Selector: <code>[baseUiComboboxItem]</code>
        </p>
        <docs-props-table [props]="itemInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">ComboboxClearDirective</h3>
        <p class="docs-paragraph">
          A button to clear the current value. Apply to a <code>&lt;button&gt;</code> element.
          Selector: <code>[baseUiComboboxClear]</code>
        </p>

        <h3 class="docs-section-subtitle">Other Parts</h3>
        <ul class="docs-list">
          <li><code>[baseUiComboboxPopup]</code> - Popup container</li>
          <li><code>[baseUiComboboxList]</code> - Wraps the list of items</li>
          <li><code>[baseUiComboboxItemIndicator]</code> - Shows selection status</li>
          <li><code>[baseUiComboboxGroup]</code> - Groups related items</li>
          <li><code>[baseUiComboboxGroupLabel]</code> - Label for a group</li>
          <li><code>[baseUiComboboxEmpty]</code> - Shown when no items match filter</li>
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
                <td>Root, Input, Popup, Positioner</td>
                <td>Present when the combobox is open</td>
              </tr>
              <tr>
                <td><code>data-disabled</code></td>
                <td>Root, Input, Item</td>
                <td>Present when disabled</td>
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
                <td><code>data-empty</code></td>
                <td>List, Positioner</td>
                <td>Present when no items match filter</td>
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
                <td><code>.base-ui-combobox-root</code></td>
                <td>Root container</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-root-open</code></td>
                <td>Root when open</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-input</code></td>
                <td>Text input</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-input-open</code></td>
                <td>Input when popup is open</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-positioner</code></td>
                <td>Positioning wrapper</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-popup</code></td>
                <td>Popup container</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-list</code></td>
                <td>List wrapper</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-item</code></td>
                <td>Individual item</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-item-selected</code></td>
                <td>Selected item</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-item-highlighted</code></td>
                <td>Highlighted item</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-item-disabled</code></td>
                <td>Disabled item</td>
              </tr>
              <tr>
                <td><code>.base-ui-combobox-group</code></td>
                <td>Group container</td>
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
                <td><kbd>ArrowDown</kbd></td>
                <td>Opens the popup (if closed) or moves highlight to next item</td>
              </tr>
              <tr>
                <td><kbd>ArrowUp</kbd></td>
                <td>Opens the popup (if closed) or moves highlight to previous item</td>
              </tr>
              <tr>
                <td><kbd>Enter</kbd></td>
                <td>Selects the highlighted item</td>
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
                <td>Closes the popup</td>
              </tr>
              <tr>
                <td><kbd>Tab</kbd></td>
                <td>Closes the popup and moves focus to next element</td>
              </tr>
              <tr>
                <td>Type characters</td>
                <td>Filters items based on input text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- When to Use -->
      <section class="docs-section">
        <h2 class="docs-section-title">When to Use</h2>
        <ul class="docs-list">
          <li><strong>Use Combobox</strong> when selecting from a predefined list with filtering, especially for large datasets</li>
          <li><strong>Use Select</strong> when no text input/filtering is needed</li>
          <li><strong>Use Autocomplete</strong> when free-form text input is allowed alongside suggestions</li>
        </ul>
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <ul class="docs-list">
          <li>Follows the WAI-ARIA Combobox pattern</li>
          <li>The input has <code>role="combobox"</code> with <code>aria-autocomplete="list"</code></li>
          <li>Items have <code>role="option"</code> with <code>aria-selected</code> state</li>
          <li>Groups use <code>role="group"</code> with <code>aria-labelledby</code></li>
          <li>Supports full keyboard navigation</li>
          <li>Auto-highlights first matching item when filtering</li>
          <li>Use with Field component for proper accessible labeling</li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/combobox/combobox-docs.component.ts"
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
  `,
})
export class ComboboxDocsComponent {
  importCode = `import {
  ComboboxRootDirective,
  ComboboxInputDirective,
  ComboboxTriggerDirective,
  ComboboxPositionerDirective,
  ComboboxPopupDirective,
  ComboboxListDirective,
  ComboboxItemDirective,
  ComboboxItemIndicatorDirective,
  ComboboxEmptyDirective,
  ComboboxClearDirective,
  ComboboxGroupDirective,
  ComboboxGroupLabelDirective,
} from '@base-ng/ui';`;

  anatomyCode = `<div baseUiComboboxRoot>
  <!-- Input with optional trigger -->
  <div class="combobox-input-wrapper">
    <input baseUiComboboxInput placeholder="Search..." />
    <button baseUiComboboxTrigger>▼</button>
    <button baseUiComboboxClear>×</button>
  </div>

  <!-- Positioned popup -->
  <div baseUiComboboxPositioner>
    <div baseUiComboboxPopup>
      <!-- List of filterable items -->
      <div baseUiComboboxList>
        <div baseUiComboboxItem [value]="'item'">
          <span baseUiComboboxItemIndicator>✓</span>
          Item Text
        </div>
      </div>

      <!-- Empty state when no matches -->
      <div baseUiComboboxEmpty>No results found</div>
    </div>
  </div>
</div>`;

  basicCode = `<div baseUiComboboxRoot [(value)]="selectedFruit" class="combobox">
  <input baseUiComboboxInput
         placeholder="Search fruits..."
         class="combobox-input" />
  <div baseUiComboboxPositioner class="combobox-positioner">
    <div baseUiComboboxPopup class="combobox-popup">
      <div baseUiComboboxList class="combobox-list">
        @for (fruit of fruits; track fruit) {
          <div baseUiComboboxItem [value]="fruit" class="combobox-item">
            <span baseUiComboboxItemIndicator class="combobox-indicator">✓</span>
            {{ fruit }}
          </div>
        }
      </div>
    </div>
  </div>
</div>`;

  triggerCode = `<div baseUiComboboxRoot [(value)]="selectedItem">
  <div class="combobox-input-wrapper">
    <input baseUiComboboxInput placeholder="Search..." class="combobox-input" />
    <button baseUiComboboxTrigger class="combobox-trigger">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" fill="none"/>
      </svg>
    </button>
  </div>
  <div baseUiComboboxPositioner>
    <div baseUiComboboxPopup class="combobox-popup">
      <div baseUiComboboxList>
        @for (item of items; track item) {
          <div baseUiComboboxItem [value]="item" class="combobox-item">
            {{ item }}
          </div>
        }
      </div>
    </div>
  </div>
</div>`;

  multipleCode = `<div baseUiComboboxRoot [multiple]="true" [(value)]="selectedColors">
  <div class="combobox-input-wrapper">
    <!-- Display selected chips -->
    @for (color of selectedColors; track color) {
      <span class="chip">
        {{ color }}
        <button (click)="removeColor(color)">×</button>
      </span>
    }
    <input baseUiComboboxInput placeholder="Add colors..." class="combobox-input" />
  </div>
  <div baseUiComboboxPositioner>
    <div baseUiComboboxPopup class="combobox-popup">
      <div baseUiComboboxList>
        @for (color of colors; track color) {
          <div baseUiComboboxItem [value]="color" class="combobox-item">
            <span baseUiComboboxItemIndicator>✓</span>
            {{ color }}
          </div>
        }
      </div>
    </div>
  </div>
</div>`;

  clearCode = `<div baseUiComboboxRoot [(value)]="selectedValue">
  <div class="combobox-input-wrapper">
    <input baseUiComboboxInput placeholder="Search..." class="combobox-input" />
    @if (selectedValue) {
      <button baseUiComboboxClear class="combobox-clear">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </button>
    }
    <button baseUiComboboxTrigger class="combobox-trigger">▼</button>
  </div>
  <!-- ... popup ... -->
</div>`;

  groupedCode = `<div baseUiComboboxRoot [(value)]="selectedFood">
  <input baseUiComboboxInput placeholder="Search foods..." />
  <div baseUiComboboxPositioner>
    <div baseUiComboboxPopup class="combobox-popup">
      <div baseUiComboboxList>
        <div baseUiComboboxGroup class="combobox-group">
          <div baseUiComboboxGroupLabel class="combobox-group-label">Fruits</div>
          @for (fruit of fruits; track fruit) {
            <div baseUiComboboxItem [value]="fruit" class="combobox-item">
              <span baseUiComboboxItemIndicator>✓</span>
              {{ fruit }}
            </div>
          }
        </div>
        <div baseUiComboboxGroup class="combobox-group">
          <div baseUiComboboxGroupLabel class="combobox-group-label">Vegetables</div>
          @for (veg of vegetables; track veg) {
            <div baseUiComboboxItem [value]="veg" class="combobox-item">
              <span baseUiComboboxItemIndicator>✓</span>
              {{ veg }}
            </div>
          }
        </div>
      </div>
    </div>
  </div>
</div>`;

  emptyCode = `<div baseUiComboboxRoot [(value)]="selectedItem">
  <input baseUiComboboxInput placeholder="Search..." />
  <div baseUiComboboxPositioner>
    <div baseUiComboboxPopup class="combobox-popup">
      <div baseUiComboboxList>
        @for (item of filteredItems; track item) {
          <div baseUiComboboxItem [value]="item" class="combobox-item">
            {{ item }}
          </div>
        }
      </div>
      <!-- Shown when list is empty -->
      <div baseUiComboboxEmpty class="combobox-empty">
        No results found. Try a different search.
      </div>
    </div>
  </div>
</div>`;

  filterCode = `<!-- Case-sensitive filter matching from start -->
<div baseUiComboboxRoot
     [(value)]="selectedItem"
     [filterOptions]="{ caseSensitive: true, matchFrom: 'start' }">
  <input baseUiComboboxInput placeholder="Search (case-sensitive)..." />
  <!-- ... -->
</div>

<!-- Auto-highlight disabled -->
<div baseUiComboboxRoot
     [(value)]="selectedItem"
     [autoHighlight]="false">
  <input baseUiComboboxInput placeholder="Search..." />
  <!-- ... -->
</div>`;

  disabledCode = `<!-- Disabled combobox -->
<div baseUiComboboxRoot [disabled]="true">
  <input baseUiComboboxInput placeholder="Disabled..." />
</div>

<!-- Combobox with disabled items -->
<div baseUiComboboxRoot [(value)]="selectedItem">
  <input baseUiComboboxInput placeholder="Search..." />
  <div baseUiComboboxPositioner>
    <div baseUiComboboxPopup>
      <div baseUiComboboxList>
        <div baseUiComboboxItem [value]="'option1'">Option 1</div>
        <div baseUiComboboxItem [value]="'option2'" [disabled]="true">
          Option 2 (disabled)
        </div>
        <div baseUiComboboxItem [value]="'option3'">Option 3</div>
      </div>
    </div>
  </div>
</div>`;

  stylingCssCode = `.combobox {
  position: relative;
  display: inline-block;
}

.combobox-input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0 0.5rem;
}

.combobox-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem;
  background: transparent;
}

.combobox-input:focus {
  outline: none;
}

.combobox-input-wrapper:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.combobox-input[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.combobox-trigger,
.combobox-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
}

.combobox-trigger:hover,
.combobox-clear:hover {
  color: #374151;
}

.combobox-positioner {
  position: absolute;
  z-index: 50;
  width: 100%;
}

.combobox-popup {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 0.25rem;
}

.combobox-list {
  padding: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
}

.combobox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.combobox-item[data-highlighted] {
  background: #f3f4f6;
}

.combobox-item[data-selected] {
  font-weight: 500;
}

.combobox-item[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.combobox-indicator {
  visibility: hidden;
  width: 1rem;
}

.combobox-item[data-selected] .combobox-indicator {
  visibility: visible;
}

.combobox-group-label {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
}

.combobox-empty {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  background: #e5e7eb;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.chip button {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}`;

  stylingTailwindCode = `<div baseUiComboboxRoot [(value)]="value" class="relative inline-block">
  <div class="flex items-center border border-gray-300 rounded-md
              focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
    <input baseUiComboboxInput
           placeholder="Search..."
           class="flex-1 px-3 py-2 border-none outline-none bg-transparent
                  data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed" />
    <button baseUiComboboxTrigger
            class="px-2 text-gray-500 hover:text-gray-700">
      ▼
    </button>
  </div>
  <div baseUiComboboxPositioner class="absolute z-50 w-full mt-1">
    <div baseUiComboboxPopup
         class="bg-white border border-gray-200 rounded-md shadow-lg">
      <div baseUiComboboxList class="p-1 max-h-48 overflow-auto">
        <div baseUiComboboxItem [value]="'option'"
             class="flex items-center gap-2 px-3 py-2 rounded cursor-pointer
                    data-[highlighted]:bg-gray-100
                    data-[selected]:font-medium
                    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed">
          <span baseUiComboboxItemIndicator
                class="w-4 invisible data-[selected]:visible">✓</span>
          Option
        </div>
      </div>
      <div baseUiComboboxEmpty
           class="p-4 text-center text-gray-500">
        No results found
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
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the combobox is disabled.' },
    { name: 'readOnly', type: 'boolean', default: 'false', description: 'Whether the combobox is read-only.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Whether the combobox is required.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple selection is allowed.' },
    { name: 'filterOptions', type: 'ComboboxFilterOptions', default: '{}', description: 'Filter configuration: caseSensitive, matchFrom (start|contains).' },
    { name: 'autoHighlight', type: 'boolean', default: 'true', description: 'Whether to auto-highlight first item when filtering.' },
  ];

  rootOutputProps: PropDefinition[] = [
    { name: 'valueChange', type: 'EventEmitter<T | T[] | null>', description: 'Emits when the value changes.' },
    { name: 'openChange', type: 'EventEmitter<boolean>', description: 'Emits when the open state changes.' },
    { name: 'inputValueChange', type: 'EventEmitter<string>', description: 'Emits when the input text changes.' },
  ];

  inputInputProps: PropDefinition[] = [
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled independently.' },
  ];

  triggerInputProps: PropDefinition[] = [
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the trigger is disabled independently.' },
  ];

  positionerInputProps: PropDefinition[] = [
    { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'The preferred side for positioning.' },
    { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'The preferred alignment.' },
    { name: 'sideOffset', type: 'number', default: '0', description: 'Offset from input along the main axis.' },
    { name: 'alignOffset', type: 'number', default: '0', description: 'Offset from input along the cross axis.' },
    { name: 'keepMounted', type: 'boolean', default: 'false', description: 'Whether to keep the popup in DOM when closed.' },
  ];

  itemInputProps: PropDefinition[] = [
    { name: 'value', type: 'T', required: true, description: 'The value of this item.' },
    { name: 'label', type: 'string', description: 'Optional label for filtering (defaults to text content).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the item is disabled.' },
  ];
}

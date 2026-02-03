import { Component, signal } from '@angular/core';
import {
  AutocompleteInputDirective,
  AutocompleteItemDirective,
  AutocompleteListDirective,
  AutocompletePopupDirective,
  AutocompletePositionerDirective,
  AutocompleteRootDirective,
} from '@copied/base-ng';
import {
  CodeBlockComponent,
  DemoComponent,
  EditOnGitHubComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-autocomplete',
  imports: [
    CodeBlockComponent,
    EditOnGitHubComponent,
    DemoComponent,
    PropsTableComponent,
    AutocompleteRootDirective,
    AutocompleteInputDirective,
    AutocompletePositionerDirective,
    AutocompletePopupDirective,
    AutocompleteListDirective,
    AutocompleteItemDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Autocomplete</h1>
        <p class="docs-description">
          An input that suggests options as you type, allowing free-form text entry alongside
          dynamic suggestions. Unlike Combobox, selection is optional and custom text is acceptable.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicCode">
          <div baseUiAutocompleteRoot [(value)]="searchValue" class="demo-autocomplete">
            <input
              baseUiAutocompleteInput
              class="demo-autocomplete-input"
              placeholder="Search cities..."
            />
            <div baseUiAutocompletePositioner class="demo-autocomplete-positioner">
              <div baseUiAutocompletePopup class="demo-autocomplete-popup">
                <div baseUiAutocompleteList class="demo-autocomplete-list">
                  @for (city of cities; track city) {
                    <div baseUiAutocompleteItem [value]="city" class="demo-autocomplete-item">
                      {{ city }}
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
          The Autocomplete uses a directive-based composition pattern similar to Combobox:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic Autocomplete</h3>
        <p class="docs-paragraph">A simple input with suggestions that appear as the user types:</p>
        <docs-code-block [code]="basicCode" language="html" />

        <h3 class="docs-section-subtitle">Autocomplete Modes</h3>
        <p class="docs-paragraph">
          The <code>mode</code> input controls filtering and inline completion behavior:
        </p>
        <ul class="docs-list">
          <li><code>'list'</code> (default) - Filters items dynamically, no inline completion</li>
          <li><code>'inline'</code> - Static items, inline autocompletion fills input</li>
          <li><code>'both'</code> - Dynamic filtering with inline autocompletion</li>
          <li><code>'none'</code> - Static items, no filtering or completion</li>
        </ul>
        <docs-code-block [code]="modesCode" language="html" />

        <h3 class="docs-section-subtitle">Inline Autocomplete</h3>
        <p class="docs-paragraph">
          In <code>'inline'</code> or <code>'both'</code> mode, matching text is auto-filled as the
          user types:
        </p>
        <docs-code-block [code]="inlineCode" language="html" />

        <h3 class="docs-section-subtitle">Multiple Selection</h3>
        <p class="docs-paragraph">
          Enable multiple selection with the <code>multiple</code> input:
        </p>
        <docs-code-block [code]="multipleCode" language="html" />

        <h3 class="docs-section-subtitle">Grouped Items</h3>
        <p class="docs-paragraph">Organize suggestions into groups with labels:</p>
        <docs-code-block [code]="groupedCode" language="html" />

        <h3 class="docs-section-subtitle">Empty State</h3>
        <p class="docs-paragraph">Show a message when no suggestions match:</p>
        <docs-code-block [code]="emptyCode" language="html" />

        <h3 class="docs-section-subtitle">Custom Filter</h3>
        <p class="docs-paragraph">Provide a custom filter function for advanced matching logic:</p>
        <docs-code-block [code]="customFilterCode" language="typescript" />
      </section>

      <!-- When to Use -->
      <section class="docs-section">
        <h2 class="docs-section-title">Autocomplete vs Combobox</h2>
        <div class="docs-attribute-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Autocomplete</th>
                <th>Combobox</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free-form text</td>
                <td>Allowed</td>
                <td>Not allowed</td>
              </tr>
              <tr>
                <td>Selection required</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Best for</td>
                <td>Search, commands, optional hints</td>
                <td>Selecting from predefined list</td>
              </tr>
              <tr>
                <td>Value validation</td>
                <td>Any text accepted</td>
                <td>Must match an option</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="docs-paragraph">
          Use <strong>Autocomplete</strong> when: suggestions are optional and users can enter any
          text (search boxes, command palettes).
        </p>
        <p class="docs-paragraph">
          Use <strong>Combobox</strong> when: value must be from predefined options (form fields
          with strict validation).
        </p>
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">Style the autocomplete using CSS classes and data attributes:</p>
        <docs-code-block [code]="stylingCssCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <docs-code-block [code]="stylingTailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>

        <h3 class="docs-section-subtitle">AutocompleteRootDirective</h3>
        <p class="docs-paragraph">
          Container that manages autocomplete state and behavior. Selector:
          <code>[baseUiAutocompleteRoot]</code>
        </p>
        <docs-props-table [props]="rootInputProps" title="Inputs" />
        <docs-props-table [props]="rootOutputProps" title="Outputs" />

        <h3 class="docs-section-subtitle">AutocompleteInputDirective</h3>
        <p class="docs-paragraph">
          The text input element. Selector: <code>[baseUiAutocompleteInput]</code>
        </p>
        <docs-props-table [props]="inputInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">AutocompletePositionerDirective</h3>
        <p class="docs-paragraph">
          Positions the popup. Selector: <code>[baseUiAutocompletePositioner]</code>
        </p>
        <docs-props-table [props]="positionerInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">AutocompleteItemDirective</h3>
        <p class="docs-paragraph">
          An individual suggestion item. Selector: <code>[baseUiAutocompleteItem]</code>
        </p>
        <docs-props-table [props]="itemInputProps" title="Inputs" />

        <h3 class="docs-section-subtitle">Other Parts</h3>
        <ul class="docs-list">
          <li><code>[baseUiAutocompleteTrigger]</code> - Optional button to open popup</li>
          <li><code>[baseUiAutocompleteValue]</code> - Displays selected value</li>
          <li><code>[baseUiAutocompletePopup]</code> - Popup container</li>
          <li><code>[baseUiAutocompleteList]</code> - Wraps the list of items</li>
          <li><code>[baseUiAutocompleteItemIndicator]</code> - Shows selection status</li>
          <li><code>[baseUiAutocompleteGroup]</code> - Groups related items</li>
          <li><code>[baseUiAutocompleteGroupLabel]</code> - Label for a group</li>
          <li><code>[baseUiAutocompleteEmpty]</code> - Shown when no items match</li>
          <li><code>[baseUiAutocompleteClear]</code> - Button to clear input</li>
        </ul>
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data Attributes</h2>
        <p class="docs-paragraph">Data attributes applied for CSS styling:</p>
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
                <td>Root, Input, Popup</td>
                <td>Present when the popup is open</td>
              </tr>
              <tr>
                <td><code>data-mode</code></td>
                <td>Root</td>
                <td>Current mode (list, inline, both, none)</td>
              </tr>
              <tr>
                <td><code>data-disabled</code></td>
                <td>Root, Input, Item</td>
                <td>Present when disabled</td>
              </tr>
              <tr>
                <td><code>data-readonly</code></td>
                <td>Root</td>
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
                <td>Present when the item is highlighted</td>
              </tr>
              <tr>
                <td><code>data-empty</code></td>
                <td>List</td>
                <td>Present when no items match filter</td>
              </tr>
              <tr>
                <td><code>data-side</code></td>
                <td>Positioner, Popup</td>
                <td>Positioning side (top, bottom, left, right)</td>
              </tr>
              <tr>
                <td><code>data-align</code></td>
                <td>Positioner, Popup</td>
                <td>Alignment (start, center, end)</td>
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
                <td><code>.base-ui-autocomplete-root</code></td>
                <td>Root container</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-root-open</code></td>
                <td>Root when open</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-input</code></td>
                <td>Text input</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-positioner</code></td>
                <td>Positioning wrapper</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-popup</code></td>
                <td>Popup container</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-list</code></td>
                <td>List wrapper</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-item</code></td>
                <td>Individual item</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-item-selected</code></td>
                <td>Selected item</td>
              </tr>
              <tr>
                <td><code>.base-ui-autocomplete-item-highlighted</code></td>
                <td>Highlighted item</td>
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
                <td>Opens popup or moves highlight to next item</td>
              </tr>
              <tr>
                <td><kbd>ArrowUp</kbd></td>
                <td>Opens popup or moves highlight to previous item</td>
              </tr>
              <tr>
                <td><kbd>Enter</kbd></td>
                <td>Selects the highlighted item</td>
              </tr>
              <tr>
                <td><kbd>Tab</kbd></td>
                <td>Accepts inline completion (if available) or closes popup</td>
              </tr>
              <tr>
                <td><kbd>Escape</kbd></td>
                <td>Closes the popup</td>
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
                <td>Type characters</td>
                <td>Filters suggestions; inline completion in appropriate modes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <ul class="docs-list">
          <li>Follows the WAI-ARIA Combobox pattern with <code>aria-autocomplete</code></li>
          <li>The input has <code>role="combobox"</code> with appropriate ARIA attributes</li>
          <li>Items have <code>role="option"</code> with <code>aria-selected</code> state</li>
          <li>Supports full keyboard navigation</li>
          <li>Inline completion is announced to screen readers</li>
          <li>Use with Field component for proper labeling</li>
        </ul>
      </section>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/autocomplete/autocomplete-docs.component.ts"
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
    .demo-autocomplete {
      position: relative;
      display: inline-block;
    }

    .demo-autocomplete-input {
      width: 250px;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--docs-border);
      border-radius: 6px;
      background: var(--docs-bg);
      font-size: 0.875rem;
      color: var(--docs-text);
      outline: none;
      transition: all 0.15s ease;
    }

    .demo-autocomplete-input:focus {
      border-color: var(--docs-accent);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .demo-autocomplete-positioner {
      position: absolute;
      z-index: 50;
      width: 100%;
    }

    .demo-autocomplete-popup {
      margin-top: 0.25rem;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      animation: autocompleteIn 0.15s ease;
    }

    @keyframes autocompleteIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .demo-autocomplete-list {
      padding: 0.25rem;
      max-height: 200px;
      overflow-y: auto;
    }

    .demo-autocomplete-item {
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      color: var(--docs-text);
    }

    .demo-autocomplete-item:hover,
    .demo-autocomplete-item[data-highlighted] {
      background: var(--docs-bg-hover);
    }
  `,
})
export class AutocompleteDocsComponent {
  protected readonly searchValue = signal<string | null>(null);
  protected readonly cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ];

  importCode = `import {
  AutocompleteRootDirective,
  AutocompleteInputDirective,
  AutocompleteTriggerDirective,
  AutocompleteValueDirective,
  AutocompletePositionerDirective,
  AutocompletePopupDirective,
  AutocompleteListDirective,
  AutocompleteItemDirective,
  AutocompleteItemIndicatorDirective,
  AutocompleteEmptyDirective,
  AutocompleteClearDirective,
  AutocompleteGroupDirective,
  AutocompleteGroupLabelDirective,
} from '@copied/base-ng';`;

  anatomyCode = `<div baseUiAutocompleteRoot mode="list">
  <!-- Input -->
  <input baseUiAutocompleteInput placeholder="Search..." />

  <!-- Optional trigger and clear buttons -->
  <button baseUiAutocompleteTrigger>▼</button>
  <button baseUiAutocompleteClear>×</button>

  <!-- Positioned popup -->
  <div baseUiAutocompletePositioner>
    <div baseUiAutocompletePopup>
      <div baseUiAutocompleteList>
        <div baseUiAutocompleteItem [value]="'item'">
          <span baseUiAutocompleteItemIndicator>✓</span>
          Item Text
        </div>
      </div>

      <!-- Empty state -->
      <div baseUiAutocompleteEmpty>No results</div>
    </div>
  </div>
</div>`;

  basicCode = `<div baseUiAutocompleteRoot mode="list" (valueChange)="onSelect($event)">
  <input baseUiAutocompleteInput
         placeholder="Search for a country..."
         class="autocomplete-input" />
  <div baseUiAutocompletePositioner class="autocomplete-positioner">
    <div baseUiAutocompletePopup class="autocomplete-popup">
      <div baseUiAutocompleteList class="autocomplete-list">
        @for (country of filteredCountries; track country) {
          <div baseUiAutocompleteItem
               [value]="country"
               class="autocomplete-item">
            {{ country }}
          </div>
        }
      </div>
    </div>
  </div>
</div>`;

  modesCode = `<!-- 'list' mode (default): Filter items, no inline completion -->
<div baseUiAutocompleteRoot mode="list">
  <input baseUiAutocompleteInput placeholder="Type to filter..." />
  <!-- ... -->
</div>

<!-- 'inline' mode: Static items, inline autocompletion -->
<div baseUiAutocompleteRoot mode="inline">
  <input baseUiAutocompleteInput placeholder="Start typing..." />
  <!-- Input will auto-fill with matching text -->
</div>

<!-- 'both' mode: Filter items + inline autocompletion -->
<div baseUiAutocompleteRoot mode="both">
  <input baseUiAutocompleteInput placeholder="Search with autocomplete..." />
  <!-- Combines filtering with auto-fill -->
</div>

<!-- 'none' mode: Static items, no filtering or completion -->
<div baseUiAutocompleteRoot mode="none">
  <input baseUiAutocompleteInput placeholder="Browse options..." />
  <!-- Shows all items always -->
</div>`;

  inlineCode = `<!-- Inline autocomplete fills the input as you type -->
<div baseUiAutocompleteRoot mode="both">
  <input baseUiAutocompleteInput
         placeholder="Start typing a city..."
         class="autocomplete-input" />
  <div baseUiAutocompletePositioner>
    <div baseUiAutocompletePopup class="autocomplete-popup">
      <div baseUiAutocompleteList>
        <!-- As user types "New", input auto-fills to "New York" -->
        <div baseUiAutocompleteItem [value]="'New York'">New York</div>
        <div baseUiAutocompleteItem [value]="'New Orleans'">New Orleans</div>
        <div baseUiAutocompleteItem [value]="'Newark'">Newark</div>
        <div baseUiAutocompleteItem [value]="'Los Angeles'">Los Angeles</div>
      </div>
    </div>
  </div>
</div>`;

  multipleCode = `<div baseUiAutocompleteRoot [multiple]="true" [(value)]="selectedTags">
  <div class="autocomplete-input-wrapper">
    <!-- Display selected tags -->
    @for (tag of selectedTags; track tag) {
      <span class="tag">
        {{ tag }}
        <button (click)="removeTag(tag)">×</button>
      </span>
    }
    <input baseUiAutocompleteInput placeholder="Add tags..." />
  </div>
  <div baseUiAutocompletePositioner>
    <div baseUiAutocompletePopup class="autocomplete-popup">
      <div baseUiAutocompleteList>
        @for (tag of availableTags; track tag) {
          <div baseUiAutocompleteItem [value]="tag" class="autocomplete-item">
            <span baseUiAutocompleteItemIndicator>✓</span>
            {{ tag }}
          </div>
        }
      </div>
    </div>
  </div>
</div>`;

  groupedCode = `<div baseUiAutocompleteRoot mode="list">
  <input baseUiAutocompleteInput placeholder="Search..." />
  <div baseUiAutocompletePositioner>
    <div baseUiAutocompletePopup class="autocomplete-popup">
      <div baseUiAutocompleteList>
        <div baseUiAutocompleteGroup class="autocomplete-group">
          <div baseUiAutocompleteGroupLabel class="autocomplete-group-label">
            Recent
          </div>
          @for (item of recentItems; track item) {
            <div baseUiAutocompleteItem [value]="item">{{ item }}</div>
          }
        </div>
        <div baseUiAutocompleteGroup class="autocomplete-group">
          <div baseUiAutocompleteGroupLabel class="autocomplete-group-label">
            Suggestions
          </div>
          @for (item of suggestions; track item) {
            <div baseUiAutocompleteItem [value]="item">{{ item }}</div>
          }
        </div>
      </div>
    </div>
  </div>
</div>`;

  emptyCode = `<div baseUiAutocompleteRoot mode="list">
  <input baseUiAutocompleteInput placeholder="Search..." />
  <div baseUiAutocompletePositioner>
    <div baseUiAutocompletePopup class="autocomplete-popup">
      <div baseUiAutocompleteList>
        @for (item of filteredItems; track item) {
          <div baseUiAutocompleteItem [value]="item">{{ item }}</div>
        }
      </div>
      <div baseUiAutocompleteEmpty class="autocomplete-empty">
        No results found. Try a different search term.
      </div>
    </div>
  </div>
</div>`;

  customFilterCode = `// Component class
export class MyComponent {
  // Custom fuzzy filter function
  fuzzyFilter = (items: any[], inputValue: string, valueToString: (v: any) => string) => {
    if (!inputValue) return items;

    const query = inputValue.toLowerCase();
    return items.filter(item => {
      const label = valueToString(item.value).toLowerCase();
      // Simple fuzzy: check if all query chars exist in order
      let queryIndex = 0;
      for (const char of label) {
        if (char === query[queryIndex]) {
          queryIndex++;
          if (queryIndex === query.length) return true;
        }
      }
      return false;
    });
  };
}

// Template
\`<div baseUiAutocompleteRoot
     mode="list"
     [filterFn]="fuzzyFilter">
  <input baseUiAutocompleteInput placeholder="Fuzzy search..." />
  <!-- ... -->
</div>\``;

  stylingCssCode = `.autocomplete-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.autocomplete-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.autocomplete-input[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.autocomplete-positioner {
  position: absolute;
  z-index: 50;
  width: 100%;
}

.autocomplete-popup {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 0.25rem;
}

.autocomplete-list {
  padding: 0.25rem;
  max-height: 250px;
  overflow-y: auto;
}

.autocomplete-item {
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.autocomplete-item[data-highlighted] {
  background: #f3f4f6;
}

.autocomplete-item[data-selected] {
  font-weight: 500;
  color: #3b82f6;
}

.autocomplete-group-label {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
}

.autocomplete-empty {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
}`;

  stylingTailwindCode = `<div baseUiAutocompleteRoot mode="list" class="relative">
  <input baseUiAutocompleteInput
         placeholder="Search..."
         class="w-full px-3 py-2 border border-gray-300 rounded-md
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed" />
  <div baseUiAutocompletePositioner class="absolute z-50 w-full mt-1">
    <div baseUiAutocompletePopup
         class="bg-white border border-gray-200 rounded-md shadow-lg">
      <div baseUiAutocompleteList class="p-1 max-h-60 overflow-auto">
        <div baseUiAutocompleteItem [value]="'option'"
             class="px-3 py-2 rounded cursor-pointer
                    data-[highlighted]:bg-gray-100
                    data-[selected]:font-medium data-[selected]:text-blue-600">
          Option
        </div>
      </div>
      <div baseUiAutocompleteEmpty
           class="p-4 text-center text-gray-500">
        No results found
      </div>
    </div>
  </div>
</div>`;

  // API Props
  rootInputProps: PropDefinition[] = [
    {
      name: 'mode',
      type: "'list' | 'inline' | 'both' | 'none'",
      default: "'list'",
      description: 'Controls filtering and inline completion behavior.',
    },
    { name: 'value', type: 'T | T[] | null', description: 'The selected value (controlled).' },
    {
      name: 'defaultValue',
      type: 'T | T[] | null',
      description: 'The initial value (uncontrolled).',
    },
    { name: 'inputValue', type: 'string', description: 'The input text value (controlled).' },
    {
      name: 'defaultInputValue',
      type: 'string',
      default: "''",
      description: 'The initial input text (uncontrolled).',
    },
    { name: 'open', type: 'boolean', description: 'Whether the popup is open (controlled).' },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Initial open state (uncontrolled).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the autocomplete is disabled.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the autocomplete is read-only.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the autocomplete is required.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Whether multiple selection is allowed.',
    },
    { name: 'filterFn', type: 'AutocompleteFilterFn<T>', description: 'Custom filter function.' },
    {
      name: 'filterOptions',
      type: 'AutocompleteFilterOptions',
      default: '{}',
      description: 'Filter options: caseSensitive, matchFrom.',
    },
    {
      name: 'valueEqualityFn',
      type: '(a: T, b: T) => boolean',
      description: 'Custom equality function.',
    },
    {
      name: 'valueToString',
      type: '(value: T) => string',
      description: 'Function to convert value to display string.',
    },
  ];

  rootOutputProps: PropDefinition[] = [
    {
      name: 'valueChange',
      type: 'EventEmitter<T | T[] | null>',
      description: 'Emits when value changes.',
    },
    {
      name: 'inputValueChange',
      type: 'EventEmitter<string>',
      description: 'Emits when input text changes.',
    },
    {
      name: 'openChange',
      type: 'EventEmitter<boolean>',
      description: 'Emits when open state changes.',
    },
    {
      name: 'change',
      type: 'EventEmitter<AutocompleteChangeDetails<T>>',
      description: 'Emits change details (reason, value).',
    },
    {
      name: 'highlightChange',
      type: 'EventEmitter<AutocompleteHighlightDetails<T>>',
      description: 'Emits when highlight changes.',
    },
  ];

  inputInputProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is disabled independently.',
    },
  ];

  positionerInputProps: PropDefinition[] = [
    {
      name: 'side',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'bottom'",
      description: 'Preferred positioning side.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      default: "'start'",
      description: 'Preferred alignment.',
    },
    { name: 'sideOffset', type: 'number', default: '0', description: 'Offset along main axis.' },
    { name: 'alignOffset', type: 'number', default: '0', description: 'Offset along cross axis.' },
    {
      name: 'keepMounted',
      type: 'boolean',
      default: 'false',
      description: 'Keep popup in DOM when closed.',
    },
  ];

  itemInputProps: PropDefinition[] = [
    { name: 'value', type: 'T', required: true, description: 'The value of this item.' },
    { name: 'label', type: 'string', description: 'Optional label (defaults to text content).' },
    {
      name: 'textValue',
      type: 'string',
      description: 'Text used for filtering and inline completion.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the item is disabled.',
    },
  ];
}

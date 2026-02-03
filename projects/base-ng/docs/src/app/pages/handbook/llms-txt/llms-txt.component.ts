import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../shared';

@Component({
  selector: 'docs-llms-txt',
  imports: [CodeBlockComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">llms.txt</h1>
        <p class="docs-description">
          AI-friendly documentation for Large Language Models. Access Base NG
          documentation in a format optimized for AI assistants.
        </p>
      </header>

      <!-- Overview -->
      <section class="docs-section">
        <h2 class="docs-section-title">Overview</h2>
        <p class="docs-paragraph">
          The <code>llms.txt</code> file provides a standardized way to share
          documentation with AI assistants and Large Language Models. This
          enables tools like Claude, GPT, and Copilot to better understand
          Base NG and provide more accurate code suggestions.
        </p>
        <p class="docs-paragraph">
          Learn more about the <code>llms.txt</code> standard at
          <a href="https://llmstxt.org" target="_blank" rel="noopener">llmstxt.org</a>.
        </p>
      </section>

      <!-- Accessing llms.txt -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessing llms.txt</h2>
        <p class="docs-paragraph">
          The Base NG documentation provides an <code>llms.txt</code> file at:
        </p>
        <docs-code-block [code]="urlCode" language="text" />
        <p class="docs-paragraph">
          You can reference this URL when working with AI assistants to give
          them context about Base NG.
        </p>
      </section>

      <!-- File Format -->
      <section class="docs-section">
        <h2 class="docs-section-title">File Format</h2>
        <p class="docs-paragraph">
          The <code>llms.txt</code> file contains:
        </p>
        <ul class="docs-list">
          <li><strong>Project description</strong> - What Base NG is and does</li>
          <li><strong>Component list</strong> - All available components</li>
          <li><strong>API patterns</strong> - Common usage patterns</li>
          <li><strong>Code examples</strong> - Sample implementations</li>
          <li><strong>Links</strong> - References to detailed documentation</li>
        </ul>
        <docs-code-block [code]="formatExampleCode" language="markdown" />
      </section>

      <!-- Using with AI Assistants -->
      <section class="docs-section">
        <h2 class="docs-section-title">Using with AI Assistants</h2>
        <p class="docs-paragraph">
          When working with AI coding assistants, you can provide the
          <code>llms.txt</code> URL for better context:
        </p>

        <h3 class="docs-section-subtitle">With Claude</h3>
        <docs-code-block [code]="claudeExampleCode" language="text" />

        <h3 class="docs-section-subtitle">In your project</h3>
        <p class="docs-paragraph">
          Add the URL to your project's documentation or README:
        </p>
        <docs-code-block [code]="projectExampleCode" language="markdown" />
      </section>

      <!-- Full Content -->
      <section class="docs-section">
        <h2 class="docs-section-title">Full Content</h2>
        <p class="docs-paragraph">
          Here's the complete <code>llms.txt</code> content:
        </p>
        <docs-code-block [code]="fullContentCode" language="markdown" />
      </section>

      <!-- Benefits -->
      <section class="docs-section">
        <h2 class="docs-section-title">Benefits</h2>
        <ul class="docs-list">
          <li>
            <strong>Better code generation</strong> - AI assistants generate
            more accurate Base NG code with proper patterns.
          </li>
          <li>
            <strong>Consistent examples</strong> - Get code that follows Base NG
            conventions and best practices.
          </li>
          <li>
            <strong>Reduced errors</strong> - AI understands component APIs and
            avoids common mistakes.
          </li>
          <li>
            <strong>Faster development</strong> - Spend less time correcting
            AI-generated code.
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
export class LlmsTxtComponent {
  protected readonly urlCode = `https://base-ng.dev/llms.txt`;

  protected readonly formatExampleCode = `# Base NG

> Unstyled, accessible Angular components for building design systems.

## Components

- Accordion - Expandable content sections
- Button - Clickable action trigger
- Checkbox - Binary selection control
- Dialog - Modal overlay
...

## Usage Patterns

### Basic directive usage
\`\`\`html
<button baseUiButton>Click me</button>
\`\`\`

### Two-way binding
\`\`\`html
<button baseUiSwitchRoot [(checked)]="isEnabled">
  <span baseUiSwitchThumb></span>
</button>
\`\`\``;

  protected readonly claudeExampleCode = `"I'm working with Base NG, an Angular component library.
Documentation: https://base-ng.dev/llms.txt

Help me create a dialog component that..."`;

  protected readonly projectExampleCode = `## AI Assistant Context

When working with AI assistants on this project, provide them with
our component library documentation:

- Base NG: https://base-ng.dev/llms.txt

This helps AI tools generate correct code for our UI components.`;

  protected readonly fullContentCode = `# Base NG

> Unstyled, accessible Angular components for building design systems
> and web applications.

Base NG is an Angular port of Base UI (React), providing unstyled,
accessible primitives that you can style however you want.

## Installation

\`\`\`bash
npm install @base-ng/ui
\`\`\`

## Key Concepts

1. **Unstyled** - Components ship without CSS; style with your own CSS
2. **Accessible** - WAI-ARIA compliant with keyboard navigation
3. **Composable** - Directive-based API for flexible composition
4. **Type-safe** - Full TypeScript support

## Components

### Layout & Navigation
- Accordion - Expandable content panels
- Collapsible - Single expand/collapse section
- Tabs - Tabbed content navigation

### Overlays
- Dialog - Modal dialog with focus trap
- Popover - Positioned popup content
- Tooltip - Hover/focus hint text
- Menu - Dropdown action menu

### Form Controls
- Button - Click action trigger
- Checkbox - Binary selection
- Switch - Toggle on/off
- Input - Text input field
- Slider - Range selection
- Select - Dropdown selection

### Feedback
- Progress - Progress indicator
- Meter - Measured value indicator

## Usage Patterns

### Directive-based composition
\`\`\`html
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Open</button>
  <div baseUiPopoverPopup>Content</div>
</div>
\`\`\`

### Two-way binding
\`\`\`html
<button baseUiSwitchRoot [(checked)]="isOn">
  <span baseUiSwitchThumb></span>
</button>
\`\`\`

### Reactive forms
\`\`\`html
<input baseUiInput [formControl]="nameControl" />
\`\`\`

### Styling with data attributes
\`\`\`css
[baseUiSwitchRoot][data-checked] {
  background: blue;
}
\`\`\`

## Links

- Documentation: https://base-ng.dev
- GitHub: https://github.com/anthropics/base-ng
- npm: https://npmjs.com/package/@base-ng/ui`;
}

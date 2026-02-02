import { Component } from '@angular/core';

@Component({
  selector: 'docs-accessibility',
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Accessibility</h1>
        <p class="docs-description">
          Base UI components are built with accessibility as a core principle,
          following WAI-ARIA guidelines.
        </p>
      </header>

      <section class="docs-section">
        <h2 class="docs-section-title">Standards</h2>
        <p class="docs-paragraph">
          All Base UI components follow the WAI-ARIA Authoring Practices Guide
          (APG) to ensure consistent, predictable behavior for assistive
          technology users. This includes:
        </p>

        <ul class="docs-list">
          <li>Proper ARIA roles and attributes</li>
          <li>Keyboard navigation patterns</li>
          <li>Focus management</li>
          <li>Screen reader announcements</li>
        </ul>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Keyboard navigation</h2>
        <p class="docs-paragraph">
          All interactive components support full keyboard navigation. Common
          patterns include:
        </p>

        <div class="keyboard-table">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd>Tab</kbd></td>
                <td>Move focus to next focusable element</td>
              </tr>
              <tr>
                <td><kbd>Shift + Tab</kbd></td>
                <td>Move focus to previous focusable element</td>
              </tr>
              <tr>
                <td><kbd>Enter</kbd> / <kbd>Space</kbd></td>
                <td>Activate focused element</td>
              </tr>
              <tr>
                <td><kbd>Arrow keys</kbd></td>
                <td>Navigate within composite widgets</td>
              </tr>
              <tr>
                <td><kbd>Escape</kbd></td>
                <td>Close dialogs, menus, popovers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Focus management</h2>
        <p class="docs-paragraph">
          Base UI handles focus management automatically for complex components:
        </p>

        <ul class="docs-list">
          <li>
            <strong>Dialogs</strong> trap focus within the dialog and return
            focus when closed
          </li>
          <li>
            <strong>Menus</strong> move focus to the first item when opened
          </li>
          <li>
            <strong>Tabs</strong> implement roving tabindex for efficient
            navigation
          </li>
        </ul>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Testing</h2>
        <p class="docs-paragraph">
          We recommend testing your implementation with:
        </p>

        <ul class="docs-list">
          <li>Screen readers (VoiceOver, NVDA, JAWS)</li>
          <li>Keyboard-only navigation</li>
          <li>Browser accessibility tools (Lighthouse, axe)</li>
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

      strong {
        color: var(--docs-text);
      }
    }

    .keyboard-table {
      margin-top: 1rem;
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }

      th,
      td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid var(--docs-border);
      }

      th {
        font-weight: 600;
        color: var(--docs-text);
        background: var(--docs-bg-secondary);
      }

      td {
        color: var(--docs-text-secondary);
      }

      kbd {
        display: inline-block;
        padding: 0.125rem 0.375rem;
        font-family: inherit;
        font-size: 0.75rem;
        background: var(--docs-bg-secondary);
        border: 1px solid var(--docs-border);
        border-radius: 0.25rem;
      }
    }
  `,
})
export class AccessibilityComponent {}

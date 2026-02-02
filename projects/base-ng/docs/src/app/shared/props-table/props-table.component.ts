import { Component, Input } from '@angular/core';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

@Component({
  selector: 'docs-props-table',
  template: `
    <div class="props-table-container">
      @if (title) {
        <h3 class="props-title">{{ title }}</h3>
      }
      <div class="props-table-wrapper">
        <table class="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            @for (prop of props; track prop.name) {
              <tr>
                <td class="prop-name">
                  <code>{{ prop.name }}</code>
                  @if (prop.required) {
                    <span class="required">*</span>
                  }
                </td>
                <td class="prop-type">
                  <code>{{ prop.type }}</code>
                </td>
                <td class="prop-default">
                  @if (prop.default) {
                    <code>{{ prop.default }}</code>
                  } @else {
                    <span class="no-default">-</span>
                  }
                </td>
                <td class="prop-description">
                  {{ prop.description }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    .props-table-container {
      margin: 1.5rem 0;
    }

    .props-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
      color: var(--docs-text);
    }

    .props-table-wrapper {
      overflow-x: auto;
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
    }

    .props-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

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
        white-space: nowrap;
      }

      tbody tr:last-child td {
        border-bottom: none;
      }

      tbody tr:hover {
        background: var(--docs-bg-secondary);
      }
    }

    .prop-name {
      white-space: nowrap;

      code {
        font-weight: 600;
        color: var(--docs-accent);
        background: transparent;
        padding: 0;
      }

      .required {
        color: #ef4444;
        margin-left: 0.25rem;
      }
    }

    .prop-type {
      code {
        color: var(--docs-text-secondary);
        background: var(--docs-code-bg);
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.8125rem;
      }
    }

    .prop-default {
      code {
        color: var(--docs-muted);
        background: var(--docs-code-bg);
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.8125rem;
      }

      .no-default {
        color: var(--docs-muted);
      }
    }

    .prop-description {
      color: var(--docs-text-secondary);
      line-height: 1.5;
    }
  `,
})
export class PropsTableComponent {
  @Input() title?: string;
  @Input() props: PropDefinition[] = [];
}

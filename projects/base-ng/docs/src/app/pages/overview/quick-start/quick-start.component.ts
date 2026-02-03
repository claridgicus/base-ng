import { Component } from '@angular/core';
import { EditOnGitHubComponent } from '../../../shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-quick-start',
  imports: [EditOnGitHubComponent, RouterLink],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Quick start</h1>
        <p class="docs-description">
          Get started with Base UI for Angular in just a few steps.
        </p>
      </header>

      <section class="docs-section">
        <h2 class="docs-section-title">Install the library</h2>
        <p class="docs-paragraph">
          Install Base UI for Angular using your preferred package manager. The
          package is tree-shakable, so you only pay for the components you
          actually import.
        </p>

        <div class="install-tabs">
          <div class="tab-list" role="tablist">
            @for (pm of packageManagers; track pm.name; let i = $index) {
              <button
                role="tab"
                class="tab"
                [class.active]="activeTab === i"
                [attr.aria-selected]="activeTab === i"
                (click)="activeTab = i"
              >
                {{ pm.name }}
              </button>
            }
          </div>
          <div class="code-block">
            <pre><code>{{ packageManagers[activeTab].command }}</code></pre>
            <button class="copy-btn" (click)="copyCommand()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Basic usage</h2>
        <p class="docs-paragraph">
          Import components directly from the package. Each component is a
          standalone Angular component that can be used without any module
          setup.
        </p>

        <div class="code-block full">
          <pre><code>{{ basicUsageCode }}</code></pre>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Base UI components are unstyled by default, giving you complete
          control over their appearance. You can use any styling solution you
          prefer:
        </p>

        <ul class="docs-list">
          <li>Plain CSS or SCSS</li>
          <li>Tailwind CSS</li>
          <li>CSS Modules</li>
          <li>CSS-in-JS libraries</li>
        </ul>

        <p class="docs-paragraph">
          Components expose data attributes that reflect their state, making it
          easy to style different states without JavaScript:
        </p>

        <div class="code-block full">
          <pre><code>{{ stylingCode }}</code></pre>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Next steps</h2>
        <p class="docs-paragraph">
          Now that you have Base UI installed, explore the documentation to
          learn more:
        </p>

        <div class="next-steps">
          <a routerLink="/angular/handbook/styling" class="next-step-card">
            <h3>Styling guide</h3>
            <p>Learn different approaches to styling Base UI components</p>
          </a>
          <a routerLink="/angular/components/button" class="next-step-card">
            <h3>Components</h3>
            <p>Browse the component library and see examples</p>
          </a>
          <a routerLink="/angular/overview/accessibility" class="next-step-card">
            <h3>Accessibility</h3>
            <p>Understand how Base UI handles accessibility</p>
          </a>
        </div>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/overview/quick-start/quick-start.component.ts"
        />
      </footer>
    </article>
  `,
  styles: `
    .install-tabs {
      margin-top: 1rem;
    }

    .tab-list {
      display: flex;
      gap: 0.25rem;
      margin-bottom: -1px;
    }

    .tab {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      background: transparent;
      border: 1px solid var(--docs-border);
      border-bottom: none;
      border-radius: 0.375rem 0.375rem 0 0;
      color: var(--docs-text-secondary);
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        color: var(--docs-text);
      }

      &.active {
        background: var(--docs-code-bg);
        color: var(--docs-text);
      }
    }

    .code-block {
      position: relative;
      background: var(--docs-code-bg);
      border-radius: 0 0.5rem 0.5rem 0.5rem;
      border: 1px solid var(--docs-border);

      &.full {
        border-radius: 0.5rem;
        margin-top: 1rem;
      }

      pre {
        margin: 0;
        padding: 1rem;
        overflow-x: auto;
        background: transparent;
        border: none;
      }

      code {
        background: transparent;
        padding: 0;
        font-size: 0.875rem;
      }
    }

    .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.375rem;
      color: var(--docs-text-secondary);
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        color: var(--docs-text);
        background: var(--docs-bg-secondary);
      }
    }

    .docs-list {
      margin: 1rem 0;
      padding-left: 1.5rem;
      color: var(--docs-text-secondary);

      li {
        margin-bottom: 0.5rem;
      }
    }

    .next-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .next-step-card {
      display: block;
      padding: 1.25rem;
      background: var(--docs-bg-secondary);
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      text-decoration: none;
      transition: all 0.15s;

      &:hover {
        border-color: var(--docs-accent);
        text-decoration: none;
      }

      h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--docs-text);
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--docs-text-secondary);
      }
    }
  

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }`,
})
export class QuickStartComponent {
  protected activeTab = 0;

  protected readonly packageManagers = [
    { name: 'npm', command: 'npm install @copied/base-ng' },
    { name: 'yarn', command: 'yarn add @copied/base-ng' },
    { name: 'pnpm', command: 'pnpm add @copied/base-ng' },
  ];

  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { BuiButton } from '@copied/base-ng/button';
import { BuiSwitch, BuiSwitchThumb } from '@copied/base-ng/switch';

@Component({
  selector: 'app-example',
  imports: [BuiButton, BuiSwitch, BuiSwitchThumb],
  template: \`
    <button buiButton>Click me</button>

    <button buiSwitch [(checked)]="enabled">
      <span buiSwitchThumb></span>
    </button>
  \`
})
export class ExampleComponent {
  enabled = false;
}`;

  protected readonly stylingCode = `/* Style switch states using data attributes */
[data-switch] {
  width: 44px;
  height: 24px;
  background: #e5e5e5;
  border-radius: 12px;
  transition: background 0.2s;
}

[data-switch][data-checked] {
  background: #0066ff;
}

[data-switch][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}`;

  copyCommand(): void {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.packageManagers[this.activeTab].command);
    }
  }
}

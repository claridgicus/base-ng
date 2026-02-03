import { Component } from '@angular/core';
import { EditOnGitHubComponent } from '../../../shared';

@Component({
  selector: 'docs-releases',
  imports: [EditOnGitHubComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Releases</h1>
        <p class="docs-description">
          Release history and changelog for Base UI Angular.
        </p>
      </header>

      <section class="docs-section">
        <h2 class="docs-section-title">Current version</h2>
        <p class="docs-paragraph">
          The current stable version is <code>0.1.0</code>.
        </p>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Changelog</h2>

        <div class="release">
          <h3 class="release-version">0.1.0</h3>
          <p class="release-date">Initial Release</p>
          <ul class="release-notes">
            <li>Initial release of Base UI for Angular</li>
            <li>Includes all core components ported from Base UI React</li>
            <li>Full TypeScript support with strict typing</li>
            <li>Comprehensive accessibility support</li>
            <li>Angular signals integration</li>
          </ul>
        </div>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Versioning</h2>
        <p class="docs-paragraph">
          Base UI Angular follows semantic versioning (SemVer). Version numbers
          are formatted as <code>MAJOR.MINOR.PATCH</code>:
        </p>

        <ul class="docs-list">
          <li>
            <strong>MAJOR</strong> - Breaking changes to the API
          </li>
          <li>
            <strong>MINOR</strong> - New features, backwards compatible
          </li>
          <li>
            <strong>PATCH</strong> - Bug fixes, backwards compatible
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/overview/releases/releases.component.ts"
        />
      </footer>
    </article>
  `,
  styles: `
    .release {
      padding: 1.5rem;
      background: var(--docs-bg-secondary);
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      margin-top: 1rem;
    }

    .release-version {
      margin: 0 0 0.25rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--docs-text);
    }

    .release-date {
      margin: 0 0 1rem 0;
      font-size: 0.875rem;
      color: var(--docs-muted);
    }

    .release-notes {
      margin: 0;
      padding-left: 1.25rem;
      color: var(--docs-text-secondary);

      li {
        margin-bottom: 0.375rem;
      }
    }

    .docs-list {
      margin: 1rem 0;
      padding-left: 1.5rem;
      color: var(--docs-text-secondary);

      li {
        margin-bottom: 0.5rem;
      }

      strong {
        color: var(--docs-text);
      }
    }
  

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }`,
})
export class ReleasesComponent {}

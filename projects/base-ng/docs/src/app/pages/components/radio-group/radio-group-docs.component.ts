import { Component } from '@angular/core';
import { EditOnGitHubComponent } from '../../../shared';

@Component({
  selector: 'docs-radio-group',
  imports: [EditOnGitHubComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">RadioGroup</h1>
        <p class="docs-description">
          Documentation coming soon.
        </p>
      </header>

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/radio-group/radio-group-docs.component.ts"
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
export class RadioGroupDocsComponent {}

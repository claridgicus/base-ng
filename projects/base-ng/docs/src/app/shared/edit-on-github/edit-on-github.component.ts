import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'docs-edit-on-github',
  template: `
    <a [href]="githubUrl()" target="_blank" rel="noopener noreferrer" class="edit-link">
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
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      Edit this page on GitHub
    </a>
  `,
  styles: `
    .edit-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      text-decoration: none;
      transition: color 0.15s;

      &:hover {
        color: var(--docs-accent);
        text-decoration: none;
      }

      svg {
        flex-shrink: 0;
      }
    }
  `,
})
export class EditOnGitHubComponent {
  readonly path = input.required<string>();
  readonly repo = input('https://github.com/anthropics/base-ng');
  readonly branch = input('master');

  protected readonly githubUrl = computed(
    () => `${this.repo()}/edit/${this.branch()}/${this.path()}`
  );
}

import { Component, Input, signal } from '@angular/core';
import { CodeBlockComponent } from '../code-block/code-block.component';

interface PackageManager {
  name: string;
  command: string;
}

@Component({
  selector: 'docs-package-selector',
  imports: [CodeBlockComponent],
  template: `
    <div class="package-selector">
      <div class="tab-list" role="tablist">
        @for (pm of packageManagers; track pm.name; let i = $index) {
          <button
            role="tab"
            class="tab"
            [class.active]="activeTab() === i"
            [attr.aria-selected]="activeTab() === i"
            (click)="activeTab.set(i)"
          >
            {{ pm.name }}
          </button>
        }
      </div>
      <docs-code-block
        [code]="packageManagers[activeTab()].command"
        language="bash"
      />
    </div>
  `,
  styles: `
    .package-selector {
      margin: 1rem 0;
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

    docs-code-block {
      display: block;

      ::ng-deep .code-block {
        margin-top: 0;
        border-radius: 0 0.5rem 0.5rem 0.5rem;
      }
    }
  `,
})
export class PackageSelectorComponent {
  @Input() package = '@copied/base-ng';

  protected readonly activeTab = signal(0);

  protected get packageManagers(): PackageManager[] {
    return [
      { name: 'npm', command: `npm install ${this.package}` },
      { name: 'yarn', command: `yarn add ${this.package}` },
      { name: 'pnpm', command: `pnpm add ${this.package}` },
    ];
  }
}

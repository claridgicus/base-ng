import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';

interface SearchItem {
  title: string;
  path: string;
  section: string;
  keywords?: string[];
}

@Component({
  selector: 'docs-search',
  template: `
    <button class="search-trigger" (click)="open()" aria-label="Search documentation">
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
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span class="search-placeholder">Search...</span>
      <kbd class="search-shortcut">
        <span class="search-shortcut-key">{{ modKey }}</span>
        <span class="search-shortcut-key">K</span>
      </kbd>
    </button>

    @if (isOpen()) {
      <div class="search-backdrop" (click)="close()" aria-hidden="true"></div>
      <div class="search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation">
        <div class="search-input-wrapper">
          <svg
            class="search-input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            #searchInput
            type="text"
            class="search-input"
            placeholder="Search documentation..."
            [value]="query()"
            (input)="onInput($event)"
            (keydown)="onKeydown($event)"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          @if (query()) {
            <button class="search-clear" (click)="clearQuery()" aria-label="Clear search">
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          }
        </div>

        <div class="search-results">
          @if (results().length > 0) {
            @for (group of groupedResults(); track group.section) {
              <div class="search-group">
                <div class="search-group-title">{{ group.section }}</div>
                @for (item of group.items; track item.path; let i = $index) {
                  <button
                    class="search-result"
                    [class.selected]="selectedIndex() === getGlobalIndex(group, item)"
                    (click)="navigate(item)"
                    (mouseenter)="selectedIndex.set(getGlobalIndex(group, item))"
                  >
                    <svg
                      class="search-result-icon"
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
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <span class="search-result-title">{{ item.title }}</span>
                    <svg
                      class="search-result-arrow"
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
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                }
              </div>
            }
          } @else if (query()) {
            <div class="search-empty">
              <p>No results found for "{{ query() }}"</p>
            </div>
          } @else {
            <div class="search-empty">
              <p>Type to search the documentation</p>
            </div>
          }
        </div>

        <div class="search-footer">
          <div class="search-footer-hint"><kbd>↑</kbd><kbd>↓</kbd> to navigate</div>
          <div class="search-footer-hint"><kbd>↵</kbd> to select</div>
          <div class="search-footer-hint"><kbd>esc</kbd> to close</div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .search-trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      background-color: transparent;
      color: var(--docs-text-secondary);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.15s;
      min-width: 200px;

      &:hover {
        background-color: var(--docs-bg-secondary);
        border-color: var(--docs-text-secondary);
      }

      @media (max-width: 768px) {
        min-width: auto;
        padding: 0.5rem;

        .search-placeholder,
        .search-shortcut {
          display: none;
        }
      }
    }

    .search-placeholder {
      flex: 1;
      text-align: left;
    }

    .search-shortcut {
      display: flex;
      gap: 0.25rem;
    }

    .search-shortcut-key {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.25rem;
      height: 1.25rem;
      padding: 0 0.25rem;
      font-size: 0.6875rem;
      font-family: inherit;
      background-color: var(--docs-bg-secondary);
      border: 1px solid var(--docs-border);
      border-radius: 0.25rem;
    }

    .search-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 200;
      animation: fadeIn 0.15s ease-out;
    }

    .search-dialog {
      position: fixed;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      width: min(560px, calc(100vw - 32px));
      max-height: 70vh;
      background-color: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 0.75rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      z-index: 201;
      display: flex;
      flex-direction: column;
      animation: scaleIn 0.15s ease-out;
    }

    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--docs-border);
    }

    .search-input-icon {
      flex-shrink: 0;
      color: var(--docs-muted);
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 1rem;
      color: var(--docs-text);
      outline: none;

      &::placeholder {
        color: var(--docs-muted);
      }
    }

    .search-clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      color: var(--docs-muted);
      cursor: pointer;
      border-radius: 0.25rem;
      transition: all 0.15s;

      &:hover {
        background-color: var(--docs-bg-secondary);
        color: var(--docs-text);
      }
    }

    .search-results {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem;
    }

    .search-group {
      margin-bottom: 0.5rem;
    }

    .search-group-title {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--docs-muted);
      padding: 0.5rem 0.75rem;
    }

    .search-result {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: none;
      background: transparent;
      color: var(--docs-text);
      font-size: 0.875rem;
      text-align: left;
      cursor: pointer;
      border-radius: 0.5rem;
      transition: all 0.1s;

      &:hover,
      &.selected {
        background-color: var(--docs-accent);
        color: white;

        .search-result-icon,
        .search-result-arrow {
          color: white;
        }
      }
    }

    .search-result-icon {
      flex-shrink: 0;
      color: var(--docs-muted);
    }

    .search-result-title {
      flex: 1;
    }

    .search-result-arrow {
      flex-shrink: 0;
      color: var(--docs-muted);
      opacity: 0;
      transition: opacity 0.1s;

      .search-result:hover &,
      .search-result.selected & {
        opacity: 1;
      }
    }

    .search-empty {
      padding: 2rem;
      text-align: center;
      color: var(--docs-muted);
    }

    .search-footer {
      display: flex;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--docs-border);
      font-size: 0.75rem;
      color: var(--docs-muted);
    }

    .search-footer-hint {
      display: flex;
      align-items: center;
      gap: 0.375rem;

      kbd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.25rem;
        height: 1.25rem;
        padding: 0 0.25rem;
        font-size: 0.625rem;
        font-family: inherit;
        background-color: var(--docs-bg-secondary);
        border: 1px solid var(--docs-border);
        border-radius: 0.25rem;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: translateX(-50%) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) scale(1);
      }
    }
  `,
})
export class SearchComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly isOpen = signal(false);
  protected readonly query = signal('');
  protected readonly selectedIndex = signal(0);

  protected readonly modKey =
    typeof navigator !== 'undefined' && navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl';

  private readonly searchItems: SearchItem[] = [
    // Overview
    {
      title: 'Quick start',
      path: '/overview/quick-start',
      section: 'Overview',
      keywords: ['getting started', 'install'],
    },
    {
      title: 'Accessibility',
      path: '/overview/accessibility',
      section: 'Overview',
      keywords: ['a11y', 'aria', 'wcag'],
    },
    {
      title: 'Releases',
      path: '/overview/releases',
      section: 'Overview',
      keywords: ['changelog', 'version'],
    },
    { title: 'About', path: '/overview/about', section: 'Overview' },

    // Handbook
    {
      title: 'Styling',
      path: '/handbook/styling',
      section: 'Handbook',
      keywords: ['css', 'tailwind', 'scss'],
    },
    {
      title: 'Animation',
      path: '/handbook/animation',
      section: 'Handbook',
      keywords: ['transition', 'motion'],
    },
    {
      title: 'Composition',
      path: '/handbook/composition',
      section: 'Handbook',
      keywords: ['slots', 'render'],
    },
    {
      title: 'Customization',
      path: '/handbook/customization',
      section: 'Handbook',
      keywords: ['theme', 'custom'],
    },
    {
      title: 'Forms',
      path: '/handbook/forms',
      section: 'Handbook',
      keywords: ['reactive', 'validation'],
    },
    {
      title: 'TypeScript',
      path: '/handbook/typescript',
      section: 'Handbook',
      keywords: ['types', 'generics'],
    },
    {
      title: 'llms.txt',
      path: '/handbook/llms-txt',
      section: 'Handbook',
      keywords: ['ai', 'llm'],
    },

    // Components
    {
      title: 'Accordion',
      path: '/components/accordion',
      section: 'Components',
      keywords: ['expand', 'collapse', 'panel'],
    },
    {
      title: 'Alert Dialog',
      path: '/components/alert-dialog',
      section: 'Components',
      keywords: ['modal', 'confirm'],
    },
    {
      title: 'Autocomplete',
      path: '/components/autocomplete',
      section: 'Components',
      keywords: ['suggest', 'typeahead'],
    },
    {
      title: 'Avatar',
      path: '/components/avatar',
      section: 'Components',
      keywords: ['image', 'profile'],
    },
    {
      title: 'Button',
      path: '/components/button',
      section: 'Components',
      keywords: ['click', 'action'],
    },
    {
      title: 'Checkbox',
      path: '/components/checkbox',
      section: 'Components',
      keywords: ['check', 'tick', 'form'],
    },
    {
      title: 'Checkbox Group',
      path: '/components/checkbox-group',
      section: 'Components',
      keywords: ['multiple', 'selection'],
    },
    {
      title: 'Collapsible',
      path: '/components/collapsible',
      section: 'Components',
      keywords: ['expand', 'toggle'],
    },
    {
      title: 'Combobox',
      path: '/components/combobox',
      section: 'Components',
      keywords: ['select', 'search'],
    },
    {
      title: 'Context Menu',
      path: '/components/context-menu',
      section: 'Components',
      keywords: ['right-click', 'menu'],
    },
    {
      title: 'Dialog',
      path: '/components/dialog',
      section: 'Components',
      keywords: ['modal', 'popup'],
    },
    {
      title: 'Field',
      path: '/components/field',
      section: 'Components',
      keywords: ['form', 'input', 'label'],
    },
    {
      title: 'Fieldset',
      path: '/components/fieldset',
      section: 'Components',
      keywords: ['form', 'group'],
    },
    {
      title: 'Form',
      path: '/components/form',
      section: 'Components',
      keywords: ['submit', 'validation'],
    },
    {
      title: 'Input',
      path: '/components/input',
      section: 'Components',
      keywords: ['text', 'form'],
    },
    {
      title: 'Menu',
      path: '/components/menu',
      section: 'Components',
      keywords: ['dropdown', 'actions'],
    },
    {
      title: 'Menubar',
      path: '/components/menubar',
      section: 'Components',
      keywords: ['navigation', 'horizontal'],
    },
    {
      title: 'Meter',
      path: '/components/meter',
      section: 'Components',
      keywords: ['gauge', 'measurement'],
    },
    {
      title: 'Navigation Menu',
      path: '/components/navigation-menu',
      section: 'Components',
      keywords: ['nav', 'links'],
    },
    {
      title: 'Number Field',
      path: '/components/number-field',
      section: 'Components',
      keywords: ['input', 'numeric'],
    },
    {
      title: 'Popover',
      path: '/components/popover',
      section: 'Components',
      keywords: ['tooltip', 'popup', 'float'],
    },
    {
      title: 'Preview Card',
      path: '/components/preview-card',
      section: 'Components',
      keywords: ['hover', 'preview'],
    },
    {
      title: 'Progress',
      path: '/components/progress',
      section: 'Components',
      keywords: ['loading', 'bar'],
    },
    {
      title: 'Radio',
      path: '/components/radio',
      section: 'Components',
      keywords: ['option', 'form'],
    },
    {
      title: 'Radio Group',
      path: '/components/radio-group',
      section: 'Components',
      keywords: ['select', 'single'],
    },
    {
      title: 'Scroll Area',
      path: '/components/scroll-area',
      section: 'Components',
      keywords: ['scrollbar', 'overflow'],
    },
    {
      title: 'Select',
      path: '/components/select',
      section: 'Components',
      keywords: ['dropdown', 'picker'],
    },
    {
      title: 'Separator',
      path: '/components/separator',
      section: 'Components',
      keywords: ['divider', 'line'],
    },
    {
      title: 'Slider',
      path: '/components/slider',
      section: 'Components',
      keywords: ['range', 'input'],
    },
    {
      title: 'Switch',
      path: '/components/switch',
      section: 'Components',
      keywords: ['toggle', 'on/off'],
    },
    {
      title: 'Tabs',
      path: '/components/tabs',
      section: 'Components',
      keywords: ['panel', 'navigation'],
    },
    {
      title: 'Toast',
      path: '/components/toast',
      section: 'Components',
      keywords: ['notification', 'alert'],
    },
    {
      title: 'Toggle',
      path: '/components/toggle',
      section: 'Components',
      keywords: ['button', 'pressed'],
    },
    {
      title: 'Toggle Group',
      path: '/components/toggle-group',
      section: 'Components',
      keywords: ['button', 'selection'],
    },
    {
      title: 'Toolbar',
      path: '/components/toolbar',
      section: 'Components',
      keywords: ['actions', 'buttons'],
    },
    {
      title: 'Tooltip',
      path: '/components/tooltip',
      section: 'Components',
      keywords: ['hint', 'hover'],
    },

    // Utils
    {
      title: 'CSP Provider',
      path: '/utils/csp-provider',
      section: 'Utils',
      keywords: ['security', 'nonce'],
    },
    {
      title: 'Direction Provider',
      path: '/utils/direction-provider',
      section: 'Utils',
      keywords: ['rtl', 'ltr'],
    },
    {
      title: 'mergeProps',
      path: '/utils/merge-props',
      section: 'Utils',
      keywords: ['combine', 'utility'],
    },
    {
      title: 'useRender',
      path: '/utils/use-render',
      section: 'Utils',
      keywords: ['custom', 'element'],
    },
  ];

  protected readonly results = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return [];

    return this.searchItems.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const sectionMatch = item.section.toLowerCase().includes(q);
      const keywordMatch = item.keywords?.some((k) => k.toLowerCase().includes(q));
      return titleMatch || sectionMatch || keywordMatch;
    });
  });

  protected readonly groupedResults = computed(() => {
    const results = this.results();
    const groups: { section: string; items: SearchItem[] }[] = [];

    const sectionOrder = ['Overview', 'Handbook', 'Components', 'Utils'];

    for (const section of sectionOrder) {
      const items = results.filter((r) => r.section === section);
      if (items.length > 0) {
        groups.push({ section, items });
      }
    }

    return groups;
  });

  constructor() {
    afterNextRender(() => {
      document.addEventListener('keydown', this.handleGlobalKeydown);
    });

    this.destroyRef.onDestroy(() => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', this.handleGlobalKeydown);
      }
    });
  }

  private handleGlobalKeydown = (event: KeyboardEvent): void => {
    // Cmd+K or Ctrl+K to open
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.open();
    }

    // Escape to close
    if (event.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  };

  protected open(): void {
    this.isOpen.set(true);
    this.query.set('');
    this.selectedIndex.set(0);

    // Focus input after render
    setTimeout(() => {
      this.searchInputRef()?.nativeElement.focus();
    }, 0);

    // Prevent body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  protected close(): void {
    this.isOpen.set(false);

    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.selectedIndex.set(0);
  }

  protected clearQuery(): void {
    this.query.set('');
    this.selectedIndex.set(0);
    this.searchInputRef()?.nativeElement.focus();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const results = this.results();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.update((i) => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.update((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (results.length > 0) {
          this.navigate(results[this.selectedIndex()]);
        }
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  protected navigate(item: SearchItem): void {
    this.router.navigateByUrl(item.path);
    this.close();
  }

  protected getGlobalIndex(
    group: { section: string; items: SearchItem[] },
    item: SearchItem,
  ): number {
    const groups = this.groupedResults();
    let index = 0;

    for (const g of groups) {
      if (g.section === group.section) {
        return index + g.items.indexOf(item);
      }
      index += g.items.length;
    }

    return 0;
  }
}

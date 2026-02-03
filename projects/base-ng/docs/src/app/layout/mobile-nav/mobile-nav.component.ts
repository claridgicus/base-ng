import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

interface NavItem {
  label: string;
  path: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'docs-mobile-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <button
      class="HeaderButton"
      (click)="toggle()"
      [attr.aria-expanded]="isOpen()"
      aria-controls="mobile-nav-drawer"
      aria-label="Toggle navigation menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        @if (isOpen()) {
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        } @else {
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        }
      </svg>
    </button>

    @if (isOpen()) {
      <div class="backdrop" (click)="close()" aria-hidden="true"></div>
      <nav id="mobile-nav-drawer" class="drawer" role="navigation" aria-label="Mobile navigation">
        <div class="drawer-header">
          <span class="drawer-title">Navigation</span>
          <button class="close-btn" (click)="close()" aria-label="Close navigation menu">
            <svg
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="drawer-content">
          @for (section of navigation; track section.title) {
            <div class="nav-section">
              <h3 class="nav-section-title">{{ section.title }}</h3>
              <ul class="nav-list">
                @for (item of section.items; track item.path) {
                  <li>
                    <a
                      [routerLink]="item.path"
                      routerLinkActive="active"
                      class="nav-item"
                      (click)="close()"
                    >
                      {{ item.label }}
                      @if (item.badge) {
                        <span class="nav-badge">{{ item.badge }}</span>
                      }
                    </a>
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </nav>
    }
  `,
  styles: `
    :host {
      display: none;

      @media (max-width: 1024px) {
        display: block;
      }
    }

    .HeaderButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--docs-text);
      cursor: pointer;
      border-radius: 0.5rem;
      transition: background-color 0.15s;

      &:hover {
        background-color: var(--docs-bg-secondary);
      }

      &:focus-visible {
        outline: 2px solid var(--docs-accent);
        outline-offset: 2px;
      }
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
      animation: fadeIn 0.2s ease-out;
    }

    .drawer {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: min(320px, calc(100vw - 48px));
      background-color: var(--docs-bg);
      z-index: 101;
      display: flex;
      flex-direction: column;
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.2s ease-out;
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--docs-border);
    }

    .drawer-title {
      font-weight: 600;
      font-size: 1rem;
      color: var(--docs-text);
    }

    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--docs-text-secondary);
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.15s;

      &:hover {
        background-color: var(--docs-bg-secondary);
        color: var(--docs-text);
      }
    }

    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.25rem;
    }

    .nav-section {
      margin-bottom: 1.5rem;
    }

    .nav-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--docs-muted);
      margin: 0 0 0.5rem 0;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 0.75rem;
      font-size: 0.9375rem;
      color: var(--docs-text-secondary);
      text-decoration: none;
      border-radius: 0.375rem;
      transition: all 0.15s;

      &:hover {
        background-color: var(--docs-bg-secondary);
        color: var(--docs-text);
        text-decoration: none;
      }

      &.active {
        background-color: var(--docs-accent);
        color: white;
      }
    }

    .nav-badge {
      font-size: 0.625rem;
      font-weight: 500;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      background-color: var(--docs-accent);
      color: white;
      text-transform: uppercase;

      .active & {
        background-color: rgba(255, 255, 255, 0.2);
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

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `,
})
export class MobileNavComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isOpen = signal(false);

  protected readonly navigation: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Quick start', path: '/overview/quick-start' },
        { label: 'Accessibility', path: '/overview/accessibility' },
        { label: 'Releases', path: '/overview/releases' },
        { label: 'About', path: '/overview/about' },
      ],
    },
    {
      title: 'Handbook',
      items: [
        { label: 'Styling', path: '/handbook/styling' },
        { label: 'Animation', path: '/handbook/animation' },
        { label: 'Composition', path: '/handbook/composition' },
        { label: 'Customization', path: '/handbook/customization' },
        { label: 'Forms', path: '/handbook/forms' },
        { label: 'TypeScript', path: '/handbook/typescript' },
        { label: 'llms.txt', path: '/handbook/llms-txt' },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Accordion', path: '/components/accordion' },
        { label: 'Alert Dialog', path: '/components/alert-dialog' },
        { label: 'Autocomplete', path: '/components/autocomplete' },
        { label: 'Avatar', path: '/components/avatar' },
        { label: 'Button', path: '/components/button' },
        { label: 'Checkbox', path: '/components/checkbox' },
        { label: 'Checkbox Group', path: '/components/checkbox-group' },
        { label: 'Collapsible', path: '/components/collapsible' },
        { label: 'Combobox', path: '/components/combobox' },
        { label: 'Context Menu', path: '/components/context-menu' },
        { label: 'Dialog', path: '/components/dialog' },
        { label: 'Field', path: '/components/field' },
        { label: 'Fieldset', path: '/components/fieldset' },
        { label: 'Form', path: '/components/form' },
        { label: 'Input', path: '/components/input' },
        { label: 'Menu', path: '/components/menu' },
        { label: 'Menubar', path: '/components/menubar' },
        { label: 'Meter', path: '/components/meter' },
        { label: 'Navigation Menu', path: '/components/navigation-menu' },
        { label: 'Number Field', path: '/components/number-field' },
        { label: 'Popover', path: '/components/popover' },
        { label: 'Preview Card', path: '/components/preview-card' },
        { label: 'Progress', path: '/components/progress' },
        { label: 'Radio', path: '/components/radio' },
        { label: 'Radio Group', path: '/components/radio-group' },
        { label: 'Scroll Area', path: '/components/scroll-area' },
        { label: 'Select', path: '/components/select' },
        { label: 'Separator', path: '/components/separator' },
        { label: 'Slider', path: '/components/slider' },
        { label: 'Switch', path: '/components/switch' },
        { label: 'Tabs', path: '/components/tabs' },
        { label: 'Toast', path: '/components/toast' },
        { label: 'Toggle', path: '/components/toggle' },
        { label: 'Toggle Group', path: '/components/toggle-group' },
        { label: 'Toolbar', path: '/components/toolbar' },
        { label: 'Tooltip', path: '/components/tooltip' },
      ],
    },
    {
      title: 'Utils',
      items: [
        { label: 'CSP Provider', path: '/utils/csp-provider', badge: 'New' },
        { label: 'Direction Provider', path: '/utils/direction-provider' },
        { label: 'mergeProps', path: '/utils/merge-props', badge: 'New' },
        { label: 'useRender', path: '/utils/use-render' },
      ],
    },
  ];

  constructor() {
    afterNextRender(() => {
      // Handle escape key
      document.addEventListener('keydown', this.handleKeydown);
    });

    // Close on navigation
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.close();
      });

    this.destroyRef.onDestroy(() => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', this.handleKeydown);
      }
    });
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  };

  protected toggle(): void {
    this.isOpen.update((v) => !v);
    this.updateBodyScroll();
  }

  protected close(): void {
    this.isOpen.set(false);
    this.updateBodyScroll();
  }

  private updateBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    }
  }
}

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  selector: 'docs-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar-nav" aria-label="Documentation navigation">
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
    </nav>
  `,
  styles: `
    :host {
      display: block;
      padding: 1.5rem 1rem;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .nav-section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .nav-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--docs-muted);
      margin: 0 0 0.5rem 0;
      padding: 0 0.75rem;
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
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
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

        .nav-badge {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
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
    }
  `,
})
export class SidebarComponent {
  protected readonly navigation: NavSection[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Quick start', path: '/angular/overview/quick-start' },
        { label: 'Accessibility', path: '/angular/overview/accessibility' },
        { label: 'Releases', path: '/angular/overview/releases' },
        { label: 'About', path: '/angular/overview/about' },
      ],
    },
    {
      title: 'Handbook',
      items: [
        { label: 'Styling', path: '/angular/handbook/styling' },
        { label: 'Animation', path: '/angular/handbook/animation' },
        { label: 'Composition', path: '/angular/handbook/composition' },
        { label: 'Customization', path: '/angular/handbook/customization' },
        { label: 'Forms', path: '/angular/handbook/forms' },
        { label: 'TypeScript', path: '/angular/handbook/typescript' },
        { label: 'llms.txt', path: '/angular/handbook/llms-txt' },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Accordion', path: '/angular/components/accordion' },
        { label: 'Alert Dialog', path: '/angular/components/alert-dialog' },
        { label: 'Autocomplete', path: '/angular/components/autocomplete' },
        { label: 'Avatar', path: '/angular/components/avatar' },
        { label: 'Button', path: '/angular/components/button' },
        { label: 'Checkbox', path: '/angular/components/checkbox' },
        { label: 'Checkbox Group', path: '/angular/components/checkbox-group' },
        { label: 'Collapsible', path: '/angular/components/collapsible' },
        { label: 'Combobox', path: '/angular/components/combobox' },
        { label: 'Context Menu', path: '/angular/components/context-menu' },
        { label: 'Dialog', path: '/angular/components/dialog' },
        { label: 'Field', path: '/angular/components/field' },
        { label: 'Fieldset', path: '/angular/components/fieldset' },
        { label: 'Form', path: '/angular/components/form' },
        { label: 'Input', path: '/angular/components/input' },
        { label: 'Menu', path: '/angular/components/menu' },
        { label: 'Menubar', path: '/angular/components/menubar' },
        { label: 'Meter', path: '/angular/components/meter' },
        { label: 'Navigation Menu', path: '/angular/components/navigation-menu' },
        { label: 'Number Field', path: '/angular/components/number-field' },
        { label: 'Popover', path: '/angular/components/popover' },
        { label: 'Preview Card', path: '/angular/components/preview-card' },
        { label: 'Progress', path: '/angular/components/progress' },
        { label: 'Radio', path: '/angular/components/radio' },
        { label: 'Radio Group', path: '/angular/components/radio-group' },
        { label: 'Scroll Area', path: '/angular/components/scroll-area' },
        { label: 'Select', path: '/angular/components/select' },
        { label: 'Separator', path: '/angular/components/separator' },
        { label: 'Slider', path: '/angular/components/slider' },
        { label: 'Switch', path: '/angular/components/switch' },
        { label: 'Tabs', path: '/angular/components/tabs' },
        { label: 'Toast', path: '/angular/components/toast' },
        { label: 'Toggle', path: '/angular/components/toggle' },
        { label: 'Toggle Group', path: '/angular/components/toggle-group' },
        { label: 'Toolbar', path: '/angular/components/toolbar' },
        { label: 'Tooltip', path: '/angular/components/tooltip' },
      ],
    },
    {
      title: 'Utils',
      items: [
        { label: 'CSP Provider', path: '/angular/utils/csp-provider', badge: 'New' },
        { label: 'Direction Provider', path: '/angular/utils/direction-provider' },
        { label: 'mergeProps', path: '/angular/utils/merge-props', badge: 'New' },
        { label: 'useRender', path: '/angular/utils/use-render' },
      ],
    },
  ];
}

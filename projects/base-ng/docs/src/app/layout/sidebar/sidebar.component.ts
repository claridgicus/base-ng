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
    <nav class="SideNavViewport" aria-label="Main navigation">
      @for (section of navigation; track section.title) {
        <div class="SideNavSection">
          <div class="SideNavHeading">{{ section.title }}</div>
          <ul class="SideNavList">
            @for (item of section.items; track item.path) {
              <li class="SideNavItem">
                <a
                  [routerLink]="item.path"
                  routerLinkActive="active"
                  class="SideNavLink"
                  [attr.data-active]="null"
                  #rla="routerLinkActive"
                  [attr.aria-current]="rla.isActive ? 'true' : null"
                >
                  {{ item.label }}
                  @if (item.badge) {
                    <span class="SideNavBadge">{{ item.badge }}</span>
                  }
                </a>
              </li>
            }
          </ul>
        </div>
      }

      <footer class="SideNavFooter">
        <p class="footer-tagline">An unofficial Angular port of Base UI.</p>
        <p class="footer-tagline">Same great taste, different framework.</p>
        <p class="footer-credit">
          Maintained by
          <a
            href="https://github.com/claridgicus"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            James Claridge
          </a>
        </p>
      </footer>
    </nav>
  `,
  styles: `
    :host {
      display: block;
      padding: 0.75rem 1.5rem 6rem 1.5rem;
    }

    .SideNavViewport {
      display: flex;
      flex-direction: column;
    }

    .SideNavSection {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    .SideNavHeading {
      display: inline-flex;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.00625em;
      color: var(--docs-text);
      margin: 0;
      padding: 0.25rem 0;
    }

    .SideNavList {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    .SideNavItem {
      display: flex;
    }

    .SideNavLink {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-grow: 1;
      height: 2rem;
      padding: 0 0.75rem;
      font-size: 0.875rem;
      color: var(--docs-text-secondary);
      text-decoration: none;
      border-radius: 0.375rem;
      border: 1px solid transparent;
      background-clip: padding-box;
      transition: background-color 0.15s;

      &:hover {
        background-color: var(--docs-bg-hover);
        text-decoration: none;
      }

      &.active,
      &[aria-current='true'] {
        background-color: var(--docs-bg-hover);
        border: none;
        outline: 1px solid var(--docs-border);
        outline-offset: -1px;
        font-weight: 500;
        letter-spacing: 0.00625em;
        color: var(--docs-text);
      }
    }

    .SideNavBadge {
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.035em;
      color: #dc2626;
      text-transform: uppercase;
      padding-inline: 2px;
      transform: translateY(-2px);
    }

    .SideNavFooter {
      margin-top: auto;
      padding-top: 2rem;
      border-top: 1px solid var(--color-gridline);
    }

    .footer-tagline {
      margin: 0;
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
      line-height: 1.5;
    }

    .footer-credit {
      margin: 0.5rem 0 0 0;
      font-size: 0.75rem;
      color: var(--docs-text-secondary);
    }

    .footer-link {
      color: var(--docs-text);
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }
  `,
})
export class SidebarComponent {
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
}

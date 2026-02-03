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

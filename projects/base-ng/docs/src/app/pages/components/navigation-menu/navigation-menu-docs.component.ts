import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  NavigationMenuRootDirective,
  NavigationMenuListDirective,
  NavigationMenuItemDirective,
  NavigationMenuTriggerDirective,
  NavigationMenuContentDirective,
  NavigationMenuLinkDirective,
} from '@base-ng/ui';

@Component({
  selector: 'docs-navigation-menu',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    NavigationMenuRootDirective,
    NavigationMenuListDirective,
    NavigationMenuItemDirective,
    NavigationMenuTriggerDirective,
    NavigationMenuContentDirective,
    NavigationMenuLinkDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Navigation Menu</h1>
        <p class="docs-description">
          A navigation component with animated dropdown menus, commonly used for
          website headers. Supports smooth transitions between menu sections and
          a shared viewport for consistent animations.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <h2 class="docs-section-title">Live Demo</h2>
        <docs-demo [code]="basicDemoCode">
          <nav baseUiNavigationMenuRoot aria-label="Demo navigation" class="demo-nav">
            <ul baseUiNavigationMenuList class="demo-nav-list">
              <!-- Products dropdown -->
              <li baseUiNavigationMenuItem value="products">
                <button baseUiNavigationMenuTrigger class="demo-nav-trigger">
                  Products
                  <svg class="demo-nav-chevron" viewBox="0 0 12 12" width="12" height="12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" fill="none" stroke-width="1.5"/>
                  </svg>
                </button>
                <div baseUiNavigationMenuContent class="demo-nav-content">
                  <ul class="demo-nav-links">
                    <li>
                      <a baseUiNavigationMenuLink href="#analytics" class="demo-nav-link">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path d="M3 13h4v8H3v-8zm7-8h4v16h-4V5zm7 4h4v12h-4V9z" fill="currentColor" opacity="0.6"/>
                        </svg>
                        <div>
                          <strong>Analytics</strong>
                          <p>Track and measure everything</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a baseUiNavigationMenuLink href="#automation" class="demo-nav-link">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 11h-8v-1l1-1v-4l-1-1v-1h5v1l-1 1v3.5l2 .5v2z" fill="currentColor" opacity="0.6"/>
                        </svg>
                        <div>
                          <strong>Automation</strong>
                          <p>Automate your workflow</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <!-- Solutions dropdown -->
              <li baseUiNavigationMenuItem value="solutions">
                <button baseUiNavigationMenuTrigger class="demo-nav-trigger">
                  Solutions
                  <svg class="demo-nav-chevron" viewBox="0 0 12 12" width="12" height="12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" fill="none" stroke-width="1.5"/>
                  </svg>
                </button>
                <div baseUiNavigationMenuContent class="demo-nav-content">
                  <ul class="demo-nav-links">
                    <li>
                      <a baseUiNavigationMenuLink href="#enterprise" class="demo-nav-link">
                        <strong>Enterprise</strong>
                        <p>For large organizations</p>
                      </a>
                    </li>
                    <li>
                      <a baseUiNavigationMenuLink href="#startups" class="demo-nav-link">
                        <strong>Startups</strong>
                        <p>For growing teams</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <!-- Simple link -->
              <li baseUiNavigationMenuItem>
                <a baseUiNavigationMenuLink href="#pricing" class="demo-nav-simple-link">
                  Pricing
                </a>
              </li>

              <!-- Docs link -->
              <li baseUiNavigationMenuItem>
                <a baseUiNavigationMenuLink href="#docs" class="demo-nav-simple-link">
                  Docs
                </a>
              </li>
            </ul>
          </nav>
        </docs-demo>
      </section>

      <!-- Import -->
      <section class="docs-section">
        <h2 class="docs-section-title">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Navigation Menu uses a hierarchical structure with items, triggers,
          and content:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic navigation</h3>
        <p class="docs-paragraph">
          A navigation menu with dropdown content sections.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Website header</h3>
        <p class="docs-paragraph">
          A complete website header with logo, navigation, and actions.
        </p>
        <docs-code-block [code]="headerDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">With viewport</h3>
        <p class="docs-paragraph">
          Use a shared viewport for smooth animations between sections.
        </p>
        <docs-code-block [code]="viewportDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Mega menu layout</h3>
        <p class="docs-paragraph">
          Create rich mega menus with multiple columns and featured content.
        </p>
        <docs-code-block [code]="megaMenuDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Vertical orientation</h3>
        <p class="docs-paragraph">
          Create a vertical navigation menu for sidebars.
        </p>
        <docs-code-block [code]="verticalDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Custom delays</h3>
        <p class="docs-paragraph">
          Adjust open and close delays for better UX.
        </p>
        <docs-code-block [code]="delayDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Navigation Menu parts using CSS:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Root Outputs" [props]="rootOutputProps" />
        <docs-props-table title="Item Inputs" [props]="itemInputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table [props]="dataAttributes" />
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS classes</h2>
        <docs-props-table [props]="cssClasses" />
      </section>

      <!-- Keyboard Navigation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Keyboard navigation</h2>
        <docs-props-table [props]="keyboardShortcuts" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          Navigation Menu follows WAI-ARIA guidelines for navigation:
        </p>
        <ul class="docs-list">
          <li>
            Renders as a <code>&lt;nav&gt;</code> element with proper
            <code>aria-label</code>
          </li>
          <li>
            Menu items are keyboard accessible with Arrow key navigation
          </li>
          <li>Opens on hover with configurable delays for better usability</li>
          <li>Closes on Escape key press or clicking outside</li>
          <li>
            Focus is managed within the menu for seamless keyboard navigation
          </li>
          <li>
            Links within content use <code>role="link"</code> or standard
            <code>&lt;a&gt;</code> elements
          </li>
          <li>
            <strong>Direction indicator:</strong>
            <code>data-activation-direction</code> enables directional
            animations
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/navigation-menu/navigation-menu-docs.component.ts"
        />
      </footer>
    </article>
  `,
  styles: `
    .docs-list {
      margin: 1rem 0;
      padding-left: 1.5rem;
      color: var(--docs-text-secondary);

      li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
      }
    }

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }

    /* Demo styles */
    .demo-nav {
      position: relative;
    }

    .demo-nav-list {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .demo-nav-trigger {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem 0.75rem;
      border: none;
      background: transparent;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .demo-nav-trigger:hover,
    .demo-nav-trigger[data-open] {
      background: var(--docs-bg-hover);
    }

    .demo-nav-chevron {
      transition: transform 0.2s ease;
    }

    .demo-nav-trigger[data-open] .demo-nav-chevron {
      transform: rotate(180deg);
    }

    .demo-nav-content {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 0.5rem;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      padding: 0.75rem;
      min-width: 280px;
      animation: navContentIn 0.15s ease;
    }

    @keyframes navContentIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .demo-nav-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .demo-nav-link {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 8px;
      color: var(--docs-text);
      text-decoration: none;
      transition: background 0.15s ease;
    }

    .demo-nav-link:hover {
      background: var(--docs-bg-hover);
    }

    .demo-nav-link strong {
      display: block;
      font-weight: 600;
      margin-bottom: 0.125rem;
    }

    .demo-nav-link p {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--docs-text-secondary);
    }

    .demo-nav-simple-link {
      display: block;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--docs-text);
      text-decoration: none;
      transition: background 0.15s ease;
    }

    .demo-nav-simple-link:hover {
      background: var(--docs-bg-hover);
    }
  `,
})
export class NavigationMenuDocsComponent {
  protected readonly importCode = `import {
  NavigationMenuRootDirective,
  NavigationMenuListDirective,
  NavigationMenuItemDirective,
  NavigationMenuTriggerDirective,
  NavigationMenuContentDirective,
  NavigationMenuViewportDirective,
  NavigationMenuLinkDirective,
  NavigationMenuBackdropDirective,
} from '@base-ng/ui';

@Component({
  imports: [
    NavigationMenuRootDirective,
    NavigationMenuListDirective,
    NavigationMenuItemDirective,
    NavigationMenuTriggerDirective,
    NavigationMenuContentDirective,
    NavigationMenuViewportDirective,
    NavigationMenuLinkDirective,
    NavigationMenuBackdropDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<nav baseUiNavigationMenuRoot aria-label="Main">
  <!-- Menu list -->
  <ul baseUiNavigationMenuList>
    <!-- Menu item with dropdown -->
    <li baseUiNavigationMenuItem value="products">
      <button baseUiNavigationMenuTrigger>
        Products
        <span baseUiNavigationMenuIcon></span>
      </button>
      <div baseUiNavigationMenuContent>
        <a baseUiNavigationMenuLink href="/products/a">Product A</a>
        <a baseUiNavigationMenuLink href="/products/b">Product B</a>
      </div>
    </li>

    <!-- Simple link (no dropdown) -->
    <li baseUiNavigationMenuItem>
      <a baseUiNavigationMenuLink href="/pricing">Pricing</a>
    </li>
  </ul>

  <!-- Shared viewport for smooth transitions -->
  <div baseUiNavigationMenuViewport></div>
</nav>`;

  protected readonly basicDemoCode = `<nav baseUiNavigationMenuRoot aria-label="Main navigation" class="nav-menu">
  <ul baseUiNavigationMenuList class="nav-list">
    <!-- Products dropdown -->
    <li baseUiNavigationMenuItem value="products">
      <button baseUiNavigationMenuTrigger class="nav-trigger">
        Products
        <svg class="nav-icon" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      <div baseUiNavigationMenuContent class="nav-content">
        <ul class="nav-links">
          <li>
            <a baseUiNavigationMenuLink href="/products/analytics">
              <strong>Analytics</strong>
              <p>Track and measure everything</p>
            </a>
          </li>
          <li>
            <a baseUiNavigationMenuLink href="/products/automation">
              <strong>Automation</strong>
              <p>Automate your workflow</p>
            </a>
          </li>
          <li>
            <a baseUiNavigationMenuLink href="/products/security">
              <strong>Security</strong>
              <p>Protect your data</p>
            </a>
          </li>
        </ul>
      </div>
    </li>

    <!-- Solutions dropdown -->
    <li baseUiNavigationMenuItem value="solutions">
      <button baseUiNavigationMenuTrigger class="nav-trigger">
        Solutions
        <svg class="nav-icon" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      <div baseUiNavigationMenuContent class="nav-content">
        <ul class="nav-links">
          <li>
            <a baseUiNavigationMenuLink href="/solutions/enterprise">
              Enterprise
            </a>
          </li>
          <li>
            <a baseUiNavigationMenuLink href="/solutions/startups">
              Startups
            </a>
          </li>
        </ul>
      </div>
    </li>

    <!-- Simple link -->
    <li baseUiNavigationMenuItem>
      <a baseUiNavigationMenuLink href="/pricing" class="nav-link">
        Pricing
      </a>
    </li>
  </ul>
</nav>`;

  protected readonly headerDemoCode = `@Component({
  template: \`
    <header class="header">
      <div class="logo">
        <a href="/">CompanyName</a>
      </div>

      <nav baseUiNavigationMenuRoot aria-label="Main" class="nav-menu">
        <ul baseUiNavigationMenuList class="nav-list">
          <li baseUiNavigationMenuItem value="products">
            <button baseUiNavigationMenuTrigger>Products</button>
            <div baseUiNavigationMenuContent class="dropdown-content">
              @for (product of products; track product.href) {
                <a
                  baseUiNavigationMenuLink
                  [href]="product.href"
                  class="dropdown-link"
                >
                  <span class="icon">{{ product.icon }}</span>
                  <div>
                    <strong>{{ product.name }}</strong>
                    <p>{{ product.description }}</p>
                  </div>
                </a>
              }
            </div>
          </li>

          <li baseUiNavigationMenuItem value="resources">
            <button baseUiNavigationMenuTrigger>Resources</button>
            <div baseUiNavigationMenuContent class="dropdown-content">
              <a baseUiNavigationMenuLink href="/docs">Documentation</a>
              <a baseUiNavigationMenuLink href="/blog">Blog</a>
              <a baseUiNavigationMenuLink href="/community">Community</a>
            </div>
          </li>

          <li baseUiNavigationMenuItem>
            <a baseUiNavigationMenuLink href="/pricing">Pricing</a>
          </li>
        </ul>

        <div baseUiNavigationMenuViewport class="viewport"></div>
      </nav>

      <div class="header-actions">
        <a href="/login" class="btn-secondary">Log in</a>
        <a href="/signup" class="btn-primary">Sign up</a>
      </div>
    </header>
  \`,
})
export class HeaderComponent {
  products = [
    { name: 'Analytics', description: 'Track everything', href: '/analytics', icon: '📊' },
    { name: 'Automation', description: 'Save time', href: '/automation', icon: '🤖' },
    { name: 'Security', description: 'Stay safe', href: '/security', icon: '🔒' },
  ];
}`;

  protected readonly viewportDemoCode = `<nav baseUiNavigationMenuRoot aria-label="Main" class="nav-menu">
  <ul baseUiNavigationMenuList class="nav-list">
    <li baseUiNavigationMenuItem value="products">
      <button baseUiNavigationMenuTrigger>Products</button>
      <div baseUiNavigationMenuContent>
        <div class="content-grid">
          <a baseUiNavigationMenuLink href="/product-a">Product A</a>
          <a baseUiNavigationMenuLink href="/product-b">Product B</a>
        </div>
      </div>
    </li>

    <li baseUiNavigationMenuItem value="solutions">
      <button baseUiNavigationMenuTrigger>Solutions</button>
      <div baseUiNavigationMenuContent>
        <div class="content-list">
          <a baseUiNavigationMenuLink href="/enterprise">Enterprise</a>
          <a baseUiNavigationMenuLink href="/startups">Startups</a>
        </div>
      </div>
    </li>
  </ul>

  <!-- Viewport renders content with smooth transitions -->
  <div baseUiNavigationMenuViewport class="nav-viewport">
    <!-- Content is portaled here for animation -->
  </div>

  <!-- Optional backdrop -->
  <div baseUiNavigationMenuBackdrop class="nav-backdrop"></div>
</nav>`;

  protected readonly megaMenuDemoCode = `<nav baseUiNavigationMenuRoot aria-label="Main" class="nav-menu">
  <ul baseUiNavigationMenuList>
    <li baseUiNavigationMenuItem value="products">
      <button baseUiNavigationMenuTrigger>Products</button>
      <div baseUiNavigationMenuContent class="mega-menu">
        <div class="mega-menu-grid">
          <!-- Product categories -->
          <div class="mega-menu-column">
            <h3>Analytics</h3>
            <a baseUiNavigationMenuLink href="/analytics/overview">Overview</a>
            <a baseUiNavigationMenuLink href="/analytics/reports">Reports</a>
            <a baseUiNavigationMenuLink href="/analytics/dashboards">Dashboards</a>
          </div>

          <div class="mega-menu-column">
            <h3>Automation</h3>
            <a baseUiNavigationMenuLink href="/automation/workflows">Workflows</a>
            <a baseUiNavigationMenuLink href="/automation/triggers">Triggers</a>
            <a baseUiNavigationMenuLink href="/automation/integrations">Integrations</a>
          </div>

          <div class="mega-menu-column">
            <h3>Developer</h3>
            <a baseUiNavigationMenuLink href="/developer/api">API Reference</a>
            <a baseUiNavigationMenuLink href="/developer/sdks">SDKs</a>
            <a baseUiNavigationMenuLink href="/developer/webhooks">Webhooks</a>
          </div>

          <!-- Featured section -->
          <div class="mega-menu-featured">
            <img src="/images/featured.png" alt="Featured" />
            <h4>New: AI Assistant</h4>
            <p>Supercharge your workflow with AI-powered insights.</p>
            <a baseUiNavigationMenuLink href="/ai">Learn more →</a>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <div baseUiNavigationMenuViewport></div>
</nav>`;

  protected readonly verticalDemoCode = `<!-- Vertical navigation for sidebar -->
<nav
  baseUiNavigationMenuRoot
  orientation="vertical"
  aria-label="Sidebar"
  class="sidebar-nav"
>
  <ul baseUiNavigationMenuList class="sidebar-list">
    <li baseUiNavigationMenuItem value="dashboard">
      <button baseUiNavigationMenuTrigger class="sidebar-trigger">
        <span class="icon">📊</span>
        Dashboard
        <span class="arrow">▸</span>
      </button>
      <div baseUiNavigationMenuContent class="sidebar-content">
        <a baseUiNavigationMenuLink href="/dashboard/overview">Overview</a>
        <a baseUiNavigationMenuLink href="/dashboard/analytics">Analytics</a>
        <a baseUiNavigationMenuLink href="/dashboard/reports">Reports</a>
      </div>
    </li>

    <li baseUiNavigationMenuItem value="settings">
      <button baseUiNavigationMenuTrigger class="sidebar-trigger">
        <span class="icon">⚙️</span>
        Settings
        <span class="arrow">▸</span>
      </button>
      <div baseUiNavigationMenuContent class="sidebar-content">
        <a baseUiNavigationMenuLink href="/settings/profile">Profile</a>
        <a baseUiNavigationMenuLink href="/settings/team">Team</a>
        <a baseUiNavigationMenuLink href="/settings/billing">Billing</a>
      </div>
    </li>

    <li baseUiNavigationMenuItem>
      <a baseUiNavigationMenuLink href="/help" class="sidebar-link">
        <span class="icon">❓</span>
        Help
      </a>
    </li>
  </ul>
</nav>`;

  protected readonly delayDemoCode = `<!-- Fast response (shorter delays) -->
<nav
  baseUiNavigationMenuRoot
  [delay]="100"
  [closeDelay]="150"
  aria-label="Quick nav"
>
  ...
</nav>

<!-- Deliberate navigation (longer delays) -->
<nav
  baseUiNavigationMenuRoot
  [delay]="300"
  [closeDelay]="400"
  aria-label="Careful nav"
>
  ...
</nav>`;

  protected readonly stylingCode = `/* Navigation menu container */
.nav-menu {
  position: relative;
}

/* List of menu items */
.nav-list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Menu trigger button */
.nav-trigger {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s;
}

.nav-trigger:hover,
.nav-trigger[data-open] {
  background: #f3f4f6;
}

/* Chevron icon rotation */
.nav-icon {
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.2s;
}

[data-open] .nav-icon {
  transform: rotate(180deg);
}

/* Dropdown content */
.nav-content {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  padding: 1rem;
  min-width: 200px;
  animation: slideDown 0.15s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Navigation links */
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links a {
  display: block;
  padding: 0.75rem;
  border-radius: 6px;
  color: #111827;
  text-decoration: none;
  transition: background 0.15s;
}

.nav-links a:hover {
  background: #f3f4f6;
}

.nav-links strong {
  display: block;
  font-weight: 600;
}

.nav-links p {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: #6b7280;
}

/* Viewport for smooth transitions */
.nav-viewport {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  transition: width 0.2s ease, height 0.2s ease;
}

/* Backdrop */
.nav-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

/* Mega menu styles */
.mega-menu {
  width: 800px;
  padding: 1.5rem;
}

.mega-menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 200px;
  gap: 2rem;
}

.mega-menu-column h3 {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
}`;

  protected readonly tailwindCode = `<nav
  baseUiNavigationMenuRoot
  aria-label="Main"
  class="relative"
>
  <ul
    baseUiNavigationMenuList
    class="flex items-center gap-1 list-none m-0 p-0"
  >
    <li baseUiNavigationMenuItem value="products">
      <button
        baseUiNavigationMenuTrigger
        class="flex items-center gap-1 px-3 py-2 rounded-md text-sm
               text-gray-700 hover:bg-gray-100 data-[open]:bg-gray-100
               transition-colors"
      >
        Products
        <svg
          class="w-3 h-3 transition-transform duration-200
                 group-data-[open]:rotate-180"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      <div
        baseUiNavigationMenuContent
        class="absolute top-full left-0 bg-white rounded-lg shadow-xl
               p-4 min-w-[240px] animate-in fade-in slide-in-from-top-1
               duration-150"
      >
        <ul class="space-y-1 list-none m-0 p-0">
          <li>
            <a
              baseUiNavigationMenuLink
              href="/analytics"
              class="block px-3 py-2 rounded-md hover:bg-gray-100
                     text-gray-900"
            >
              <strong class="font-semibold">Analytics</strong>
              <p class="text-sm text-gray-500 mt-0.5">
                Track and measure everything
              </p>
            </a>
          </li>
          <li>
            <a
              baseUiNavigationMenuLink
              href="/automation"
              class="block px-3 py-2 rounded-md hover:bg-gray-100
                     text-gray-900"
            >
              <strong class="font-semibold">Automation</strong>
              <p class="text-sm text-gray-500 mt-0.5">
                Automate your workflows
              </p>
            </a>
          </li>
        </ul>
      </div>
    </li>

    <li baseUiNavigationMenuItem>
      <a
        baseUiNavigationMenuLink
        href="/pricing"
        class="px-3 py-2 rounded-md text-sm text-gray-700
               hover:bg-gray-100 transition-colors"
      >
        Pricing
      </a>
    </li>
  </ul>

  <div
    baseUiNavigationMenuViewport
    class="absolute top-full left-1/2 -translate-x-1/2 overflow-hidden
           transition-[width,height] duration-200 ease-out"
  ></div>
</nav>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'defaultValue',
      type: 'string | null',
      default: 'null',
      description: 'The initial active item value for uncontrolled usage.',
    },
    {
      name: 'value',
      type: 'string | null',
      default: 'null',
      description: 'The controlled active item value.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'The orientation of the navigation menu.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '50',
      description: 'Delay in milliseconds before opening a menu on hover.',
    },
    {
      name: 'closeDelay',
      type: 'number',
      default: '50',
      description: 'Delay in milliseconds before closing a menu.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the navigation menu is disabled.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'valueChange',
      type: 'EventEmitter<{ value: string | null; details: NavigationMenuChangeEventDetails }>',
      description:
        'Emitted when the active item changes. Includes reason (hover, click, etc.).',
    },
    {
      name: 'openChangeComplete',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when open/close animation completes.',
    },
  ];

  protected readonly itemInputProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      description:
        'Unique identifier for this item. Required for items with dropdown content.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-orientation',
      type: "'horizontal' | 'vertical'",
      description: 'The orientation of the navigation menu.',
    },
    {
      name: 'data-open',
      type: 'string',
      description: 'Present on root and trigger when the menu is open.',
    },
    {
      name: 'data-activation-direction',
      type: "'left' | 'right' | 'up' | 'down'",
      description:
        'On viewport and content, indicates the direction of navigation for animations.',
    },
    {
      name: 'data-starting',
      type: 'string',
      description: 'Present during the opening transition.',
    },
    {
      name: 'data-ending',
      type: 'string',
      description: 'Present during the closing transition.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-navigation-menu-root',
      type: 'class',
      description: 'Applied to the root nav element.',
    },
    {
      name: 'base-ui-navigation-menu-root-open',
      type: 'class',
      description: 'Applied when any menu item is open.',
    },
    {
      name: 'base-ui-navigation-menu-list',
      type: 'class',
      description: 'Applied to the list container.',
    },
    {
      name: 'base-ui-navigation-menu-item',
      type: 'class',
      description: 'Applied to each menu item.',
    },
    {
      name: 'base-ui-navigation-menu-trigger',
      type: 'class',
      description: 'Applied to trigger buttons.',
    },
    {
      name: 'base-ui-navigation-menu-content',
      type: 'class',
      description: 'Applied to dropdown content.',
    },
    {
      name: 'base-ui-navigation-menu-viewport',
      type: 'class',
      description: 'Applied to the shared viewport.',
    },
    {
      name: 'base-ui-navigation-menu-link',
      type: 'class',
      description: 'Applied to navigation links.',
    },
  ];

  protected readonly keyboardShortcuts: PropDefinition[] = [
    {
      name: 'ArrowDown',
      type: 'key',
      description:
        'Open dropdown (horizontal) or move to next item (vertical).',
    },
    {
      name: 'ArrowUp',
      type: 'key',
      description:
        'Close dropdown (horizontal) or move to previous item (vertical).',
    },
    {
      name: 'ArrowRight',
      type: 'key',
      description:
        'Move to next trigger (horizontal) or open dropdown (vertical).',
    },
    {
      name: 'ArrowLeft',
      type: 'key',
      description:
        'Move to previous trigger (horizontal) or close dropdown (vertical).',
    },
    {
      name: 'Enter / Space',
      type: 'key',
      description: 'Open the dropdown or activate link.',
    },
    {
      name: 'Escape',
      type: 'key',
      description: 'Close the open dropdown.',
    },
    {
      name: 'Tab',
      type: 'key',
      description: 'Move focus to the next focusable element.',
    },
  ];
}

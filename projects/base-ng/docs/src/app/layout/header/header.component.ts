import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'docs-header',
  imports: [RouterLink, MobileNavComponent, SearchComponent],
  template: `
    <header class="Header">
      <div class="HeaderInner">
        <a routerLink="/" class="HeaderLogoLink">
          <svg
            class="Logo"
            width="17"
            height="24"
            viewBox="0 0 17 24"
            fill="currentColor"
            aria-label="Base UI"
          >
            <path d="M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z" />
            <path d="M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z" />
          </svg>
        </a>

        <!-- Desktop: Search + external links -->
        <div class="desktop-nav">
          <docs-search />
          <a
            href="https://github.com/anthropics/base-ng"
            target="_blank"
            rel="noopener noreferrer"
            class="HeaderLink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <!-- Mobile: Search + hamburger -->
        <div class="mobile-nav">
          <docs-search />
          <docs-mobile-nav />
        </div>
      </div>
    </header>
  `,
  styles: `
    :host {
      display: contents;
    }

    .Header {
      position: absolute;
      left: 0;
      top: 0;
      height: var(--header-height);
      width: 100%;
      font-size: 0.875rem;
    }

    .HeaderInner {
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: 1.5rem;
      position: fixed;
      top: 0;
      inset-inline: 0;
      box-shadow: inset 0 -1px var(--color-gridline);
      background-color: var(--color-gray-50);
      z-index: 2;

      @media (min-width: 64rem) {
        position: static;
        box-shadow: none;
        background-color: transparent;
      }
    }

    .HeaderLogoLink {
      display: flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      margin: -0.25rem -0.5rem;
      color: var(--color-foreground);
      text-decoration: none;

      &:active {
        color: var(--color-gray-500);
      }

      &:focus-visible {
        border-radius: 0.375rem;
        outline: 2px solid var(--color-blue);
        outline-offset: -1px;
      }
    }

    .Logo {
      display: block;
    }

    /* Desktop navigation - hidden on mobile */
    .desktop-nav {
      display: none;
      align-items: center;
      gap: 1.5rem;

      @media (min-width: 64rem) {
        display: flex;
      }
    }

    /* Mobile navigation - hidden on desktop */
    .mobile-nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media (min-width: 64rem) {
        display: none;
      }
    }

    .HeaderLink {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.5rem;
      margin: -0.25rem -0.5rem;
      border-radius: 0.375rem;
      color: var(--color-foreground);
      text-decoration: none;
      flex-shrink: 0;

      &:focus-visible {
        z-index: 1;
        outline: 2px solid var(--color-blue);
        outline-offset: -2px;
      }

      & > * {
        flex-shrink: 0;
      }

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--color-gray-500);
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
      }

      @media not (hover: hover) {
        &:active {
          color: var(--color-gray-500);
        }
      }
    }
  `,
})
export class HeaderComponent {
  protected readonly isDark = signal(false);

  toggleTheme(): void {
    this.isDark.update((v) => !v);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.isDark());
    }
  }
}

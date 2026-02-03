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
        <div class="header-left">
          <docs-mobile-nav />
          <a routerLink="/" class="HeaderLogoLink">
            <span class="logo-text">Base UI</span>
            <span class="logo-badge">Angular</span>
          </a>
        </div>

        <nav class="nav-links">
          <a routerLink="/angular/overview/quick-start" class="HeaderLink">Docs</a>
          <a routerLink="/angular/components/accordion" class="HeaderLink">Components</a>
        </nav>

        <docs-search />

        <div class="header-actions">
          <button
            class="HeaderButton"
            (click)="toggleTheme()"
            aria-label="Toggle theme"
          >
            @if (isDark()) {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            }
          </button>

          <a
            href="https://github.com/anthropics/base-ng"
            target="_blank"
            rel="noopener noreferrer"
            class="HeaderButton"
            aria-label="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  `,
  styles: `
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
      left: 0;
      right: 0;
      box-shadow: inset 0 -1px var(--color-gridline);
      background-color: var(--color-gray-50);
      z-index: 2;

      @media (min-width: 64rem) {
        position: static;
        box-shadow: none;
        background-color: transparent;
      }
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .HeaderLogoLink {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.5rem;
      margin: -0.25rem -0.5rem;
      font-weight: 600;
      color: var(--color-foreground);
      text-decoration: none;

      &:active {
        color: var(--color-gray);
      }

      &:focus-visible {
        border-radius: 0.375rem;
        outline: 2px solid var(--color-blue);
        outline-offset: -1px;
      }
    }

    .logo-badge {
      font-size: 0.6875rem;
      font-weight: 500;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      background-color: var(--color-blue);
      color: white;
    }

    .nav-links {
      display: none;
      gap: 0.25rem;

      @media (min-width: 40rem) {
        display: flex;
      }
    }

    .HeaderLink,
    .HeaderButton {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.5rem;
      margin: -0.25rem -0.5rem;
      border-radius: 0.375rem;
      color: var(--color-foreground);
      text-decoration: none;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: inherit;

      &:active {
        color: var(--color-gray);
      }

      &:focus-visible {
        z-index: 1;
        outline: 2px solid var(--color-blue);
        outline-offset: -2px;
      }

      & > * {
        flex-shrink: 0;
      }
    }

    .HeaderLink {
      flex-shrink: 0;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--color-gray);
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
      }
    }

    .HeaderButton {
      @media (hover: hover) {
        &:hover {
          background-color: var(--color-gray-100, rgba(0,0,0,0.06));
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.25rem;
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

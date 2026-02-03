import {
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'docs-toc',
  template: `
    @if (items().length > 0) {
      <nav class="toc-nav" aria-label="Table of contents">
        <h4 class="toc-title">On this page</h4>
        <ul class="toc-list">
          @for (item of items(); track item.id) {
            <li>
              <a
                [href]="'#' + item.id"
                class="toc-link"
                [class.active]="activeId() === item.id"
                [class.toc-link-h3]="item.level === 3"
                (click)="scrollToSection($event, item.id)"
              >
                {{ item.text }}
              </a>
            </li>
          }
        </ul>
      </nav>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }

    .toc-nav {
      border-top: 1px solid var(--docs-border);
      padding-top: 0.75rem;
      padding-bottom: 2.5rem;
    }

    .toc-title {
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: -0.00625em;
      color: var(--docs-text);
      margin: 0;
      padding: 0.25rem 0;
    }

    .toc-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: var(--docs-text-secondary);
    }

    .toc-list .toc-list {
      padding-left: 0.75rem;
    }

    .toc-link {
      display: flex;
      padding: 0.25rem 0.5rem;
      margin-left: -0.25rem;
      font-size: 0.875rem;
      color: inherit;
      text-decoration: none;
      border-radius: 0.375rem;
      transition: color 0.15s;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
        text-decoration-thickness: 1px;
        text-decoration-color: var(--docs-muted);
      }

      &.active {
        color: var(--docs-text);
      }

      &.toc-link-h3 {
        padding-left: 1.25rem;
      }
    }
  `,
})
export class TocComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly items = signal<TocItem[]>([]);
  protected readonly activeId = signal<string>('');

  private observer: IntersectionObserver | null = null;
  private headingElements: HTMLElement[] = [];

  constructor() {
    afterNextRender(() => {
      this.setupToc();

      // Re-scan on navigation
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          // Wait for new content to render
          setTimeout(() => this.setupToc(), 100);
        });
    });

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
    });
  }

  private setupToc(): void {
    this.observer?.disconnect();
    this.scanHeadings();
    this.setupIntersectionObserver();
  }

  private scanHeadings(): void {
    const content = document.querySelector('.docs-content');
    if (!content) {
      this.items.set([]);
      return;
    }

    const headings = content.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];
    this.headingElements = [];

    headings.forEach((heading) => {
      const text = heading.textContent?.trim();
      if (!text) return;

      // Generate ID if not present
      let id = heading.id;
      if (!id) {
        id = this.generateId(text);
        heading.id = id;
      }

      tocItems.push({
        id,
        text,
        level: heading.tagName === 'H3' ? 3 : 2,
      });

      this.headingElements.push(heading as HTMLElement);
    });

    this.items.set(tocItems);
  }

  private generateId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private setupIntersectionObserver(): void {
    if (this.headingElements.length === 0) return;

    const options: IntersectionObserverInit = {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      // Find the topmost visible heading
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by position in document
        const sorted = visibleEntries.sort((a, b) => {
          const aTop = a.boundingClientRect.top;
          const bTop = b.boundingClientRect.top;
          return aTop - bTop;
        });

        const topmost = sorted[0];
        if (topmost.target.id) {
          this.activeId.set(topmost.target.id);
        }
      } else {
        // Check if we're above all headings
        const firstHeading = this.headingElements[0];
        if (firstHeading) {
          const rect = firstHeading.getBoundingClientRect();
          if (rect.top > 100) {
            this.activeId.set('');
          }
        }
      }
    }, options);

    this.headingElements.forEach((heading) => {
      this.observer?.observe(heading);
    });

    // Set initial active based on scroll position
    this.updateActiveOnScroll();
  }

  private updateActiveOnScroll(): void {
    if (this.headingElements.length === 0) return;

    // Find the heading closest to the top of the viewport
    let activeHeading: HTMLElement | null = null;

    for (const heading of this.headingElements) {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 100) {
        activeHeading = heading;
      } else {
        break;
      }
    }

    if (activeHeading?.id) {
      this.activeId.set(activeHeading.id);
    } else if (this.headingElements[0]?.id) {
      // Default to first heading if none are past the viewport top
      this.activeId.set(this.headingElements[0].id);
    }
  }

  protected scrollToSection(event: Event, id: string): void {
    event.preventDefault();

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without scrolling
      history.pushState(null, '', `#${id}`);
      this.activeId.set(id);
    }
  }
}

import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly siteName = 'Base UI for Angular';
  private readonly baseUrl = 'https://base-ng.dev';
  private readonly defaultOgImage = '/assets/og-image.png';

  init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['seo']) {
          this.updateMetaTags(data['seo']);
        }
      });
  }

  updateMetaTags(seo: SeoData): void {
    const fullTitle = `${seo.title} - ${this.siteName}`;

    // Update title
    this.title.setTitle(fullTitle);

    // Update meta description
    this.meta.updateTag({ name: 'description', content: seo.description });

    // Update keywords if provided
    if (seo.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      property: 'og:image',
      content: `${this.baseUrl}${seo.ogImage || this.defaultOgImage}`,
    });
    this.meta.updateTag({
      property: 'og:url',
      content: `${this.baseUrl}${this.router.url}`,
    });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `${this.baseUrl}${seo.ogImage || this.defaultOgImage}`,
    });
  }
}

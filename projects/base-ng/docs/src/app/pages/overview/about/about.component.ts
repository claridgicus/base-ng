import { Component } from '@angular/core';

@Component({
  selector: 'docs-about',
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">About</h1>
        <p class="docs-description">
          Base UI for Angular is an unofficial port of MUI's Base UI library for
          Angular applications.
        </p>
      </header>

      <section class="docs-section">
        <h2 class="docs-section-title">What is Base UI?</h2>
        <p class="docs-paragraph">
          Base UI is a library of unstyled UI components that implement
          accessible, interactive patterns following WAI-ARIA guidelines. Unlike
          traditional component libraries, Base UI provides the behavior and
          accessibility without dictating visual design.
        </p>

        <p class="docs-paragraph">
          This Angular port maintains the same philosophy: providing robust,
          accessible components that you can style however you want.
        </p>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Why unstyled?</h2>
        <p class="docs-paragraph">
          Unstyled components give you complete control over the visual design.
          Benefits include:
        </p>

        <ul class="docs-list">
          <li>
            <strong>Design freedom</strong> - No fighting against default styles
          </li>
          <li>
            <strong>Smaller bundle</strong> - No CSS you don't use
          </li>
          <li>
            <strong>Consistency</strong> - Match your existing design system
          </li>
          <li>
            <strong>Flexibility</strong> - Use any styling solution
          </li>
        </ul>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Angular-first design</h2>
        <p class="docs-paragraph">
          While based on the React version, this port is designed specifically
          for Angular:
        </p>

        <ul class="docs-list">
          <li>
            <strong>Signals</strong> - Uses Angular signals for reactive state
          </li>
          <li>
            <strong>Directives</strong> - Composition via attribute directives
          </li>
          <li>
            <strong>Standalone</strong> - No NgModule boilerplate required
          </li>
          <li>
            <strong>Type safety</strong> - Full TypeScript support
          </li>
        </ul>
      </section>

      <section class="docs-section">
        <h2 class="docs-section-title">Credits</h2>
        <p class="docs-paragraph">
          This project is based on
          <a href="https://base-ui.com/" target="_blank" rel="noopener"
            >Base UI</a
          >
          by MUI. The Angular port adapts the component APIs and behaviors for
          the Angular ecosystem.
        </p>
      </section>
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

      strong {
        color: var(--docs-text);
      }
    }
  `,
})
export class AboutComponent {}

import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-direction-provider',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <div class="docs-page">
      <header class="docs-header">
        <h1>Direction Provider</h1>
        <p>
          Manage text direction (LTR/RTL) for your application. Enables Base UI
          components to correctly adapt layouts for right-to-left languages like
          Arabic and Hebrew.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2>Installation</h2>
        <docs-package-selector
          packageName="@base-ng/ui"
          importName="DirectionService, provideDirection, DIRECTION_CONFIG"
        />
      </section>

      <!-- Overview -->
      <section class="docs-section">
        <h2>Overview</h2>
        <p>
          Base UI components automatically adapt to text direction, mirroring
          layouts and adjusting positioning for RTL languages. The Direction
          Provider allows you to:
        </p>
        <ul>
          <li>Set the application's text direction</li>
          <li>Toggle between LTR and RTL dynamically</li>
          <li>Access direction state from any component</li>
          <li>Get directional helpers like start/end sides</li>
        </ul>
      </section>

      <!-- Basic Usage -->
      <section class="docs-section">
        <h2>Basic Usage</h2>
        <p>
          Configure direction at the application level for RTL applications.
        </p>
        <docs-code-block [code]="basicUsageCode" language="typescript" />
      </section>

      <!-- Auto Detection -->
      <section class="docs-section">
        <h2>Auto Detection</h2>
        <p>
          By default, the Direction Provider auto-detects the direction from the
          HTML document's <code>dir</code> attribute or computed styles.
        </p>
        <docs-code-block [code]="autoDetectCode" language="html" />
      </section>

      <!-- Service Usage -->
      <section class="docs-section">
        <h2>Using the Direction Service</h2>
        <p>
          The <code>DirectionService</code> provides reactive signals for
          direction state and helper methods.
        </p>
        <docs-code-block [code]="serviceUsageCode" language="typescript" />
      </section>

      <!-- Dynamic Direction -->
      <section class="docs-section">
        <h2>Dynamic Direction Switching</h2>
        <p>
          Allow users to switch between LTR and RTL dynamically, for example in
          a language selector.
        </p>
        <docs-code-block [code]="dynamicSwitchCode" language="typescript" />
      </section>

      <!-- Directional Styles -->
      <section class="docs-section">
        <h2>Directional Styling</h2>
        <p>
          Use the direction service helpers to apply directional CSS.
        </p>
        <docs-code-block [code]="directionalStylesCode" language="typescript" />
      </section>

      <!-- Component Override -->
      <section class="docs-section">
        <h2>Component-Level Override</h2>
        <p>
          Override the direction for specific components using providers.
        </p>
        <docs-code-block [code]="componentOverrideCode" language="typescript" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2>API Reference</h2>

        <h3>provideDirection</h3>
        <p>Provider function for direction configuration.</p>
        <docs-props-table [props]="provideDirectionProps" title="Parameters" />

        <h3>DirectionService</h3>
        <p>Injectable service for managing text direction.</p>
        <docs-props-table [props]="serviceProps" title="Properties" />
        <docs-props-table [props]="serviceMethods" title="Methods" />
      </section>

      <!-- Types -->
      <section class="docs-section">
        <h2>Types</h2>
        <docs-code-block [code]="typesCode" language="typescript" />
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/utils/direction-provider/direction-provider-docs.component.ts"
        />
      </footer>
    </div>
    `,
  styles: `
    .docs-page {
      max-width: 48rem;
    }

    .docs-header {
      margin-bottom: 2rem;
    }

    .docs-header h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .docs-header p {
      color: #6b7280;
      font-size: 1.125rem;
    }

    .docs-section {
      margin-bottom: 2.5rem;
    }

    .docs-section h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .docs-section h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .docs-section p {
      margin-bottom: 1rem;
      color: #374151;
      line-height: 1.7;
    }

    .docs-section ul {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      color: #374151;
    }

    .docs-section li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }

    .docs-section code {
      background: #f3f4f6;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }
  

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }`,
})
export class DirectionProviderDocsComponent {
  basicUsageCode = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideDirection } from '@base-ng/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    // Set RTL for Arabic, Hebrew, etc.
    provideDirection('rtl'),
  ],
};`;

  autoDetectCode = `<!-- The Direction Provider reads from the document -->
<!DOCTYPE html>
<html dir="rtl" lang="ar">
  <head>...</head>
  <body>
    <app-root></app-root>
  </body>
</html>

<!-- Or set via CSS -->
<style>
  html {
    direction: rtl;
  }
</style>`;

  serviceUsageCode = `import { Component, inject, computed } from '@angular/core';
import { DirectionService } from '@base-ng/ui';

@Component({
  selector: 'app-layout',
  template: \`
    <div [class]="isRtl() ? 'rtl-layout' : 'ltr-layout'">
      <aside [style.float]="sidebarSide()">Sidebar</aside>
      <main>Content</main>
    </div>
  \`,
})
export class LayoutComponent {
  private directionService = inject(DirectionService);

  // Reactive signals
  isRtl = this.directionService.isRtl;
  direction = this.directionService.direction;

  // Computed property for sidebar position
  sidebarSide = computed(() => this.directionService.getStartSide());
}`;

  dynamicSwitchCode = `import { Component, inject } from '@angular/core';
import { DirectionService } from '@base-ng/ui';

@Component({
  selector: 'app-language-switcher',
  template: \`
    <div class="language-switcher">
      <button (click)="setLanguage('en')">English</button>
      <button (click)="setLanguage('ar')">العربية</button>
      <button (click)="setLanguage('he')">עברית</button>
    </div>
  \`,
})
export class LanguageSwitcherComponent {
  private directionService = inject(DirectionService);

  setLanguage(lang: string) {
    // RTL languages
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    const direction = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';

    this.directionService.setDirection(direction);
  }
}

// Or simply toggle between LTR and RTL
@Component({
  selector: 'app-direction-toggle',
  template: \`
    <button (click)="toggle()">
      Toggle Direction ({{ direction() }})
    </button>
  \`,
})
export class DirectionToggleComponent {
  private directionService = inject(DirectionService);
  direction = this.directionService.direction;

  toggle() {
    this.directionService.toggleDirection();
  }
}`;

  directionalStylesCode = `import { Component, inject, computed } from '@angular/core';
import { DirectionService } from '@base-ng/ui';

@Component({
  selector: 'app-card',
  template: \`
    <div class="card" [style]="cardStyles()">
      <div class="icon" [style.margin-inline-end.rem]="1">
        <img src="icon.svg" />
      </div>
      <div class="content">
        <h3>Title</h3>
        <p>Description text that flows correctly in both directions.</p>
      </div>
    </div>
  \`,
  styles: \`
    .card {
      display: flex;
      padding: 1rem;
    }

    /* Use CSS logical properties for automatic RTL support */
    .icon {
      margin-inline-end: 1rem;  /* Works in both LTR and RTL */
    }

    /* Or use data attributes */
    :host-context([dir="rtl"]) .card {
      flex-direction: row-reverse;
    }
  \`,
})
export class CardComponent {
  private directionService = inject(DirectionService);

  // Programmatic directional styles
  cardStyles = computed(() => ({
    textAlign: this.directionService.getStartSide(),
    paddingInlineStart: '1rem',
  }));
}`;

  componentOverrideCode = `import { Component } from '@angular/core';
import { provideDirection } from '@base-ng/ui';

// Force LTR for a specific component (e.g., code editor)
@Component({
  selector: 'app-code-editor',
  template: \`
    <div class="code-editor">
      <!-- Code is always LTR -->
      <pre><code>{{ code }}</code></pre>
    </div>
  \`,
  providers: [
    provideDirection('ltr'),
  ],
})
export class CodeEditorComponent {
  code = 'const greeting = "Hello, World!";';
}`;

  typesCode = `// Text direction type
type TextDirection = 'ltr' | 'rtl';

// Direction configuration
interface DirectionConfig {
  /**
   * The text direction.
   * @default 'ltr'
   */
  direction: TextDirection;
}`;

  // API Props
  provideDirectionProps: PropDefinition[] = [
    {
      name: 'direction',
      type: "'ltr' | 'rtl'",
      required: true,
      description: "The text direction to set. Use 'ltr' for left-to-right or 'rtl' for right-to-left.",
    },
  ];

  serviceProps: PropDefinition[] = [
    {
      name: 'direction',
      type: "Signal<'ltr' | 'rtl'>",
      description: 'Reactive signal containing the current text direction.',
    },
    {
      name: 'isRtl',
      type: 'Signal<boolean>',
      description: 'Reactive signal that is true when direction is RTL.',
    },
    {
      name: 'isLtr',
      type: 'Signal<boolean>',
      description: 'Reactive signal that is true when direction is LTR.',
    },
  ];

  serviceMethods: PropDefinition[] = [
    {
      name: 'setDirection',
      type: "(direction: 'ltr' | 'rtl') => void",
      description: "Set the text direction. Also updates the document's dir attribute.",
    },
    {
      name: 'toggleDirection',
      type: '() => void',
      description: 'Toggle between LTR and RTL.',
    },
    {
      name: 'getStartSide',
      type: "() => 'left' | 'right'",
      description: "Get the 'start' side based on direction. Returns 'left' for LTR, 'right' for RTL.",
    },
    {
      name: 'getEndSide',
      type: "() => 'left' | 'right'",
      description: "Get the 'end' side based on direction. Returns 'right' for LTR, 'left' for RTL.",
    },
    {
      name: 'getDirectionStyles',
      type: '() => { direction: TextDirection }',
      description: 'Get CSS properties object with the current direction.',
    },
  ];
}

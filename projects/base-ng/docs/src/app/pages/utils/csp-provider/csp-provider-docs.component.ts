import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-csp-provider',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <div class="docs-page">
      <header class="docs-header">
        <h1>CSP Provider</h1>
        <p>
          Configure Content Security Policy settings for Base UI components that
          require inline styles or scripts. Enables compliance with strict CSP
          policies.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2>Installation</h2>
        <docs-package-selector
          packageName="@copied/base-ng"
          importName="CSPService, provideCSP, CSP_CONFIG"
        />
      </section>

      <!-- Overview -->
      <section class="docs-section">
        <h2>Overview</h2>
        <p>
          Some Base UI components dynamically create inline
          <code>&lt;style&gt;</code> elements for animations and positioning.
          When your application enforces a Content Security Policy (CSP), these
          inline styles may be blocked unless you configure a nonce or disable
          them entirely.
        </p>
        <p>
          The CSP Provider allows you to:
        </p>
        <ul>
          <li>Set a nonce value for inline style elements</li>
          <li>Disable inline styles completely</li>
          <li>Access CSP settings from any component</li>
        </ul>
      </section>

      <!-- Basic Usage -->
      <section class="docs-section">
        <h2>Basic Usage</h2>
        <p>
          Configure CSP at the application level using the
          <code>provideCSP</code> function.
        </p>
        <docs-code-block [code]="basicUsageCode" language="typescript" />
      </section>

      <!-- Nonce Configuration -->
      <section class="docs-section">
        <h2>Using a Nonce</h2>
        <p>
          When your CSP requires a nonce for inline styles, provide it through
          the configuration. The nonce is typically generated server-side and
          passed to your Angular application.
        </p>
        <docs-code-block [code]="nonceExampleCode" language="typescript" />
      </section>

      <!-- Disable Styles -->
      <section class="docs-section">
        <h2>Disabling Inline Styles</h2>
        <p>
          If your CSP completely disallows inline styles, you can disable them.
          Base UI will fall back to CSS class-based styling.
        </p>
        <docs-code-block [code]="disableStylesCode" language="typescript" />
      </section>

      <!-- Service Usage -->
      <section class="docs-section">
        <h2>Using the CSP Service</h2>
        <p>
          The <code>CSPService</code> allows you to read and update CSP settings
          at runtime.
        </p>
        <docs-code-block [code]="serviceUsageCode" language="typescript" />
      </section>

      <!-- Dynamic Nonce -->
      <section class="docs-section">
        <h2>Dynamic Nonce Updates</h2>
        <p>
          If your nonce changes (e.g., between page navigations with SSR), you
          can update it dynamically.
        </p>
        <docs-code-block [code]="dynamicNonceCode" language="typescript" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2>API Reference</h2>

        <h3>provideCSP</h3>
        <p>Provider function for CSP configuration.</p>
        <docs-props-table [props]="provideCSPProps" title="Parameters" />

        <h3>CSPService</h3>
        <p>Injectable service for accessing CSP configuration.</p>
        <docs-props-table [props]="serviceMethods" title="Methods" />
        <docs-props-table [props]="serviceProps" title="Properties" />
      </section>

      <!-- CSPConfig Interface -->
      <section class="docs-section">
        <h2>CSPConfig Interface</h2>
        <docs-code-block [code]="interfaceCode" language="typescript" />
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/utils/csp-provider/csp-provider-docs.component.ts"
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
export class CspProviderDocsComponent {
  basicUsageCode = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideCSP } from '@copied/base-ng';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCSP({
      nonce: 'your-csp-nonce-value',
    }),
  ],
};`;

  nonceExampleCode = `// Server-side (e.g., Express middleware)
const crypto = require('crypto');
const nonce = crypto.randomBytes(16).toString('base64');

// Pass to Angular through inline script or transfer state
<script nonce="\${nonce}">
  window.__CSP_NONCE__ = '\${nonce}';
</script>

// app.config.ts
import { provideCSP } from '@copied/base-ng';

const nonce = (window as any).__CSP_NONCE__ || '';

export const appConfig = {
  providers: [
    provideCSP({ nonce }),
  ],
};

// Your CSP header should include:
// Content-Security-Policy: style-src 'nonce-<your-nonce>'`;

  disableStylesCode = `// app.config.ts
import { provideCSP } from '@copied/base-ng';

export const appConfig = {
  providers: [
    provideCSP({
      disableStyleElements: true,
    }),
  ],
};

// When disabled, ensure you include Base UI's CSS files
// to provide fallback styles for animations and transitions`;

  serviceUsageCode = `import { Component, inject } from '@angular/core';
import { CSPService } from '@copied/base-ng';

@Component({
  selector: 'app-custom-style',
  template: \`
    <style [attr.nonce]="cspService.nonce()">
      .custom-animation { /* ... */ }
    </style>
    <div class="custom-animation">Content</div>
  \`,
})
export class CustomStyleComponent {
  cspService = inject(CSPService);
}

// Or for programmatic style creation
@Component({
  selector: 'app-dynamic-style',
  template: \`<div #target>Dynamic content</div>\`,
})
export class DynamicStyleComponent {
  private cspService = inject(CSPService);

  createStyle() {
    const style = document.createElement('style');
    const attrs = this.cspService.getStyleElementAttributes();

    for (const [key, value] of Object.entries(attrs)) {
      style.setAttribute(key, value);
    }

    style.textContent = '.dynamic { color: red; }';
    document.head.appendChild(style);
  }
}`;

  dynamicNonceCode = `import { Component, inject } from '@angular/core';
import { CSPService } from '@copied/base-ng';

@Component({
  selector: 'app-root',
  template: \`<router-outlet />\`,
})
export class AppComponent {
  private cspService = inject(CSPService);

  constructor() {
    // Listen for nonce updates from server
    window.addEventListener('csp-nonce-update', (event: CustomEvent) => {
      this.cspService.setNonce(event.detail.nonce);
    });
  }
}`;

  interfaceCode = `interface CSPConfig {
  /**
   * The nonce to use for inline style and script elements.
   * When set, this value will be added to inline elements to comply with CSP.
   */
  nonce?: string;

  /**
   * When true, Base UI will not render inline \`<style>\` elements.
   * This is useful when CSP disallows inline styles entirely.
   * @default false
   */
  disableStyleElements?: boolean;
}`;

  // API Props
  provideCSPProps: PropDefinition[] = [
    {
      name: 'config',
      type: 'CSPConfig',
      required: true,
      description: 'Configuration object with nonce and/or disableStyleElements options.',
    },
  ];

  serviceMethods: PropDefinition[] = [
    {
      name: 'getConfig',
      type: '() => CSPConfig',
      description: 'Returns the current CSP configuration.',
    },
    {
      name: 'setNonce',
      type: '(value: string | undefined) => void',
      description: 'Updates the nonce value at runtime.',
    },
    {
      name: 'setDisableStyleElements',
      type: '(value: boolean) => void',
      description: 'Enable or disable inline style elements.',
    },
    {
      name: 'canUseInlineStyles',
      type: '() => boolean',
      description: 'Returns true if inline styles are allowed.',
    },
    {
      name: 'getStyleElementAttributes',
      type: '() => Record<string, string>',
      description: 'Returns attributes to apply to inline style elements (e.g., { nonce: "..." }).',
    },
    {
      name: 'getScriptElementAttributes',
      type: '() => Record<string, string>',
      description: 'Returns attributes to apply to inline script elements.',
    },
  ];

  serviceProps: PropDefinition[] = [
    {
      name: 'nonce',
      type: 'Signal<string | undefined>',
      description: 'Reactive signal containing the current nonce value.',
    },
    {
      name: 'disableStyleElements',
      type: 'Signal<boolean>',
      description: 'Reactive signal indicating if inline styles are disabled.',
    },
  ];
}

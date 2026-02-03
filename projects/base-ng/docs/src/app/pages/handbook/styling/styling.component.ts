import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent
} from '../../../shared';

@Component({
  selector: 'docs-styling',
  imports: [EditOnGitHubComponent, CodeBlockComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Styling</h1>
        <p class="docs-description">
          Base NG components are unstyled and don't bundle CSS. They work with
          Tailwind, CSS Modules, plain CSS, or any styling solution you prefer.
        </p>
      </header>

      <!-- Overview -->
      <section class="docs-section">
        <h2 class="docs-section-title">Overview</h2>
        <p class="docs-paragraph">
          Components in <code>&#64;base-ng/ui</code> provide structure and
          behavior without imposing visual design. This gives you complete
          control over how your components look while benefiting from built-in
          accessibility and state management.
        </p>
        <p class="docs-paragraph">
          There are four primary ways to style Base NG components:
        </p>
        <ul class="docs-list">
          <li><strong>CSS Classes</strong> - Apply via class or ngClass</li>
          <li><strong>Data Attributes</strong> - Target component states in CSS</li>
          <li><strong>CSS Variables</strong> - Use exposed custom properties</li>
          <li><strong>Inline Styles</strong> - Apply via style or ngStyle</li>
        </ul>
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Classes</h2>
        <p class="docs-paragraph">
          All Base NG components accept standard Angular class binding. You can
          use static classes, <code>[class]</code> binding, or <code>ngClass</code>
          for conditional styling.
        </p>

        <h3 class="docs-section-subtitle">Static classes</h3>
        <docs-code-block [code]="staticClassCode" language="html" />

        <h3 class="docs-section-subtitle">Dynamic classes with ngClass</h3>
        <p class="docs-paragraph">
          Use <code>ngClass</code> to apply classes based on component state:
        </p>
        <docs-code-block [code]="ngClassCode" language="html" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data Attributes</h2>
        <p class="docs-paragraph">
          Components expose data attributes that reflect their current state.
          This enables pure CSS styling without JavaScript class toggling.
        </p>
        <docs-code-block [code]="dataAttrHtmlCode" language="html" />
        <p class="docs-paragraph">
          Style these states in CSS using attribute selectors:
        </p>
        <docs-code-block [code]="dataAttrCssCode" language="css" />
        <p class="docs-paragraph">
          Common data attributes include:
        </p>
        <ul class="docs-list">
          <li><code>data-checked</code> / <code>data-unchecked</code> - Toggle states</li>
          <li><code>data-disabled</code> - Disabled state</li>
          <li><code>data-readonly</code> - Read-only state</li>
          <li><code>data-open</code> / <code>data-closed</code> - Open/close states</li>
          <li><code>data-pressed</code> - Pressed state for toggles</li>
          <li><code>data-expanded</code> - Expanded state for collapsibles</li>
          <li><code>data-orientation</code> - Horizontal or vertical</li>
        </ul>
      </section>

      <!-- CSS Variables -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Variables</h2>
        <p class="docs-paragraph">
          Some components expose CSS custom properties for dynamic calculations.
          For example, the Popover component exposes positioning variables:
        </p>
        <docs-code-block [code]="cssVarsHtmlCode" language="html" />
        <docs-code-block [code]="cssVarsCssCode" language="css" />
        <p class="docs-paragraph">
          Components may expose variables like:
        </p>
        <ul class="docs-list">
          <li><code>--available-height</code> - Available space for popups</li>
          <li><code>--anchor-width</code> - Width of the anchor element</li>
          <li><code>--progress-value</code> - Current progress percentage</li>
          <li><code>--slider-value</code> - Current slider position</li>
        </ul>
      </section>

      <!-- Inline Styles -->
      <section class="docs-section">
        <h2 class="docs-section-title">Inline Styles</h2>
        <p class="docs-paragraph">
          Apply inline styles using Angular's <code>[style]</code> binding or
          <code>ngStyle</code> directive:
        </p>
        <docs-code-block [code]="inlineStyleCode" language="html" />
        <p class="docs-paragraph">
          Dynamic styles based on component state:
        </p>
        <docs-code-block [code]="dynamicStyleCode" language="html" />
      </section>

      <!-- Tailwind CSS -->
      <section class="docs-section">
        <h2 class="docs-section-title">Tailwind CSS</h2>
        <p class="docs-paragraph">
          Base NG works seamlessly with Tailwind CSS. Apply utility classes
          directly to components:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
        <p class="docs-paragraph">
          Use Tailwind's arbitrary variant syntax for data attribute states:
        </p>
        <docs-code-block [code]="tailwindDataCode" language="html" />
      </section>

      <!-- CSS Modules -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Modules</h2>
        <p class="docs-paragraph">
          For scoped styles, use CSS Modules with Angular's
          <code>ViewEncapsulation</code>:
        </p>
        <docs-code-block [code]="cssModulesComponentCode" language="typescript" />
        <docs-code-block [code]="cssModulesStyleCode" language="css" />
      </section>

      <!-- Global Styles -->
      <section class="docs-section">
        <h2 class="docs-section-title">Global Styles</h2>
        <p class="docs-paragraph">
          For consistent styling across your app, define global component styles
          in your main stylesheet:
        </p>
        <docs-code-block [code]="globalStylesCode" language="scss" />
      </section>

      <!-- Best Practices -->
      <section class="docs-section">
        <h2 class="docs-section-title">Best Practices</h2>
        <ul class="docs-list">
          <li>
            <strong>Prefer data attributes over class toggling</strong> - Let
            components manage their state attributes; style against those.
          </li>
          <li>
            <strong>Use CSS variables for theming</strong> - Define design tokens
            as CSS variables for easy theme switching.
          </li>
          <li>
            <strong>Keep styles close to components</strong> - Co-locate styles
            with their components for maintainability.
          </li>
          <li>
            <strong>Use :host for component root styles</strong> - Angular's
            <code>:host</code> selector targets the component element itself.
          </li>
          <li>
            <strong>Test across states</strong> - Verify your styles work for
            all component states (checked, disabled, focused, etc.).
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/handbook/styling/styling.component.ts"
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
    }`,
})
export class StylingComponent {
  protected readonly staticClassCode = `<button baseUiSwitchRoot class="switch">
  <span baseUiSwitchThumb class="switch-thumb"></span>
</button>`;

  protected readonly ngClassCode = `<button
  baseUiSwitchRoot
  [(checked)]="isEnabled"
  [ngClass]="{
    'switch': true,
    'switch--checked': isEnabled,
    'switch--disabled': isDisabled
  }"
>
  <span baseUiSwitchThumb class="switch-thumb"></span>
</button>`;

  protected readonly dataAttrHtmlCode = `<button baseUiSwitchRoot [(checked)]="isEnabled">
  <span baseUiSwitchThumb></span>
</button>

<!-- When checked, renders as: -->
<button data-checked>
  <span data-checked></span>
</button>

<!-- When unchecked, renders as: -->
<button data-unchecked>
  <span data-unchecked></span>
</button>`;

  protected readonly dataAttrCssCode = `/* Target unchecked state */
[baseUiSwitchRoot] {
  background: #e5e5e5;
}

/* Target checked state */
[baseUiSwitchRoot][data-checked] {
  background: #0066ff;
}

/* Target disabled state */
[baseUiSwitchRoot][data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Combine states */
[baseUiSwitchRoot][data-checked][data-disabled] {
  background: #99c2ff;
}`;

  protected readonly cssVarsHtmlCode = `<div baseUiPopoverPopup class="popover-popup">
  Popover content
</div>`;

  protected readonly cssVarsCssCode = `[baseUiPopoverPopup] {
  /* Use exposed CSS variables for dynamic sizing */
  max-height: var(--available-height);
  min-width: var(--anchor-width);
}`;

  protected readonly inlineStyleCode = `<button
  baseUiSwitchRoot
  [style.width.px]="64"
  [style.height.px]="32"
>
  <span baseUiSwitchThumb></span>
</button>`;

  protected readonly dynamicStyleCode = `<button
  baseUiSwitchRoot
  [(checked)]="isEnabled"
  [ngStyle]="{
    'background-color': isEnabled ? '#0066ff' : '#e5e5e5'
  }"
>
  <span baseUiSwitchThumb></span>
</button>`;

  protected readonly tailwindCode = `<button
  baseUiSwitchRoot
  class="relative w-11 h-6 rounded-full bg-gray-200 transition-colors"
>
  <span
    baseUiSwitchThumb
    class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
  ></span>
</button>`;

  protected readonly tailwindDataCode = `<button
  baseUiSwitchRoot
  class="
    bg-gray-200
    data-[checked]:bg-blue-600
    data-[disabled]:opacity-50
    data-[disabled]:cursor-not-allowed
  "
>
  <span
    baseUiSwitchThumb
    class="
      translate-x-0
      data-[checked]:translate-x-5
    "
  ></span>
</button>`;

  protected readonly cssModulesComponentCode = `import { Component, ViewEncapsulation } from '@angular/core';
import { SwitchRootDirective, SwitchThumbDirective } from '@copied/base-ng/switch';

@Component({
  selector: 'app-custom-switch',
  imports: [SwitchRootDirective, SwitchThumbDirective],
  template: \`
    <button baseUiSwitchRoot class="switch">
      <span baseUiSwitchThumb class="thumb"></span>
    </button>
  \`,
  styleUrl: './custom-switch.component.css',
  encapsulation: ViewEncapsulation.Emulated // Default
})
export class CustomSwitchComponent {}`;

  protected readonly cssModulesStyleCode = `.switch {
  position: relative;
  width: 44px;
  height: 24px;
  background: #e5e5e5;
  border: none;
  border-radius: 12px;
}

.switch[data-checked] {
  background: #0066ff;
}

.thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transform: translateX(2px);
  transition: transform 0.2s;
}

.thumb[data-checked] {
  transform: translateX(22px);
}`;

  protected readonly globalStylesCode = `// styles.scss

// Define your design tokens
:root {
  --switch-bg: #e5e5e5;
  --switch-bg-checked: #0066ff;
  --switch-thumb-bg: white;
  --switch-width: 44px;
  --switch-height: 24px;
}

// Global switch styles
[baseUiSwitchRoot] {
  position: relative;
  width: var(--switch-width);
  height: var(--switch-height);
  background: var(--switch-bg);
  border: none;
  border-radius: calc(var(--switch-height) / 2);
  cursor: pointer;
  transition: background 0.2s ease;

  &[data-checked] {
    background: var(--switch-bg-checked);
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--switch-bg-checked);
    outline-offset: 2px;
  }
}

[baseUiSwitchThumb] {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(var(--switch-height) - 4px);
  height: calc(var(--switch-height) - 4px);
  background: var(--switch-thumb-bg);
  border-radius: 50%;
  transition: transform 0.2s ease;

  &[data-checked] {
    transform: translateX(calc(var(--switch-width) - var(--switch-height)));
  }
}`;
}

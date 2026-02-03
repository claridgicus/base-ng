import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent
} from '../../../shared';

@Component({
  selector: 'docs-composition',
  imports: [EditOnGitHubComponent, CodeBlockComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Composition</h1>
        <p class="docs-description">
          Base NG components are designed for composition, allowing you to
          combine primitives with custom elements, directives, and templates.
        </p>
      </header>

      <!-- Overview -->
      <section class="docs-section">
        <h2 class="docs-section-title">Overview</h2>
        <p class="docs-paragraph">
          Base NG uses Angular's directive-based approach for composition. Each
          component part is an attribute directive that attaches behavior to
          HTML elements. This gives you complete control over the rendered
          markup while benefiting from built-in accessibility and state
          management.
        </p>
        <p class="docs-paragraph">
          Key composition patterns in Base NG:
        </p>
        <ul class="docs-list">
          <li><strong>Attribute Directives</strong> - Apply behavior to any element</li>
          <li><strong>Content Projection</strong> - Use ng-content for flexible layouts</li>
          <li><strong>Template Outlets</strong> - Render custom templates with context</li>
          <li><strong>useRender</strong> - Override the rendered element type</li>
        </ul>
      </section>

      <!-- Directive Composition -->
      <section class="docs-section">
        <h2 class="docs-section-title">Directive Composition</h2>
        <p class="docs-paragraph">
          Base NG components expose attribute directives rather than custom
          elements. This lets you apply component behavior to any HTML element:
        </p>
        <docs-code-block [code]="directiveBasicCode" language="html" />
        <p class="docs-paragraph">
          You can apply directives to native elements or custom components:
        </p>
        <docs-code-block [code]="directiveCustomCode" language="html" />
      </section>

      <!-- Combining Components -->
      <section class="docs-section">
        <h2 class="docs-section-title">Combining Components</h2>
        <p class="docs-paragraph">
          Multiple Base NG directives can be composed on the same element when
          their behaviors are compatible:
        </p>
        <docs-code-block [code]="combiningCode" language="html" />
        <p class="docs-paragraph">
          For complex compositions, wrap components in your own custom component:
        </p>
        <docs-code-block [code]="wrappingCode" language="typescript" />
      </section>

      <!-- Content Projection -->
      <section class="docs-section">
        <h2 class="docs-section-title">Content Projection</h2>
        <p class="docs-paragraph">
          Base NG components use content projection (<code>ng-content</code>) to
          allow flexible child content:
        </p>
        <docs-code-block [code]="contentProjectionCode" language="html" />
        <p class="docs-paragraph">
          Some components support multiple projection slots with select:
        </p>
        <docs-code-block [code]="multiSlotCode" language="html" />
      </section>

      <!-- Template Outlets -->
      <section class="docs-section">
        <h2 class="docs-section-title">Template Outlets</h2>
        <p class="docs-paragraph">
          For dynamic content with state access, use <code>ng-template</code>
          with template variables:
        </p>
        <docs-code-block [code]="templateOutletCode" language="html" />
        <p class="docs-paragraph">
          Templates receive context with the component's current state:
        </p>
        <docs-code-block [code]="templateContextCode" language="html" />
      </section>

      <!-- useRender Directive -->
      <section class="docs-section">
        <h2 class="docs-section-title">useRender Directive</h2>
        <p class="docs-paragraph">
          The <code>useRender</code> directive allows you to change the rendered
          element while preserving all component behavior:
        </p>
        <docs-code-block [code]="useRenderCode" language="html" />
        <p class="docs-paragraph">
          This is useful when you need to render a component part as a different
          element type:
        </p>
        <docs-code-block [code]="useRenderExampleCode" language="html" />
      </section>

      <!-- Structural Patterns -->
      <section class="docs-section">
        <h2 class="docs-section-title">Structural Patterns</h2>
        <p class="docs-paragraph">
          Common composition patterns for building complex UIs:
        </p>

        <h3 class="docs-section-subtitle">Compound Components</h3>
        <p class="docs-paragraph">
          Group related directives that share state through dependency injection:
        </p>
        <docs-code-block [code]="compoundCode" language="html" />

        <h3 class="docs-section-subtitle">Portal Pattern</h3>
        <p class="docs-paragraph">
          Render content outside the component hierarchy (used by Dialog,
          Popover, etc.):
        </p>
        <docs-code-block [code]="portalCode" language="html" />

        <h3 class="docs-section-subtitle">Render Prop Pattern</h3>
        <p class="docs-paragraph">
          Pass state to child templates for conditional rendering:
        </p>
        <docs-code-block [code]="renderPropCode" language="html" />
      </section>

      <!-- Best Practices -->
      <section class="docs-section">
        <h2 class="docs-section-title">Best Practices</h2>
        <ul class="docs-list">
          <li>
            <strong>Use semantic HTML</strong> - Apply directives to
            semantically appropriate elements (buttons for triggers, divs for
            containers, etc.).
          </li>
          <li>
            <strong>Keep compositions simple</strong> - Avoid deeply nested
            directive compositions; wrap in custom components instead.
          </li>
          <li>
            <strong>Forward refs when wrapping</strong> - If your wrapper needs
            to expose the inner element, use <code>&#64;ViewChild</code>.
          </li>
          <li>
            <strong>Respect accessibility</strong> - When composing, ensure ARIA
            relationships (labelledby, describedby, controls) are maintained.
          </li>
          <li>
            <strong>Use dependency injection</strong> - Components in the same
            hierarchy share state through Angular's DI system.
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/handbook/composition/composition.component.ts"
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
export class CompositionComponent {
  protected readonly directiveBasicCode = `<!-- Apply to a native button -->
<button baseUiButton>Click me</button>

<!-- Apply to a native div -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Open</button>
  <div baseUiPopoverPopup>Content</div>
</div>`;

  protected readonly directiveCustomCode = `<!-- Apply to your custom button component -->
<app-icon-button baseUiDialogTrigger>
  <svg>...</svg>
  Open Dialog
</app-icon-button>

<!-- Apply to any element -->
<span baseUiTooltipTrigger class="info-icon">?</span>`;

  protected readonly combiningCode = `<!-- Combine Menu with Tooltip -->
<button baseUiMenuTrigger baseUiTooltipTrigger>
  Actions
</button>

<!-- The tooltip and menu will coordinate automatically -->`;

  protected readonly wrappingCode = `import { Component, input, output } from '@angular/core';
import {
  SwitchRootDirective,
  SwitchThumbDirective
} from '@copied/base-ng/switch';

@Component({
  selector: 'app-labeled-switch',
  imports: [SwitchRootDirective, SwitchThumbDirective],
  template: \`
    <label class="labeled-switch">
      <button
        baseUiSwitchRoot
        [checked]="checked()"
        (checkedChange)="checkedChange.emit($event)"
      >
        <span baseUiSwitchThumb></span>
      </button>
      <span class="label">{{ label() }}</span>
    </label>
  \`
})
export class LabeledSwitchComponent {
  label = input.required<string>();
  checked = input(false);
  checkedChange = output<boolean>();
}`;

  protected readonly contentProjectionCode = `<!-- Dialog projects its content -->
<div baseUiDialogRoot>
  <button baseUiDialogTrigger>Open</button>
  <div baseUiDialogPopup>
    <!-- Your content is projected here -->
    <h2>Dialog Title</h2>
    <p>Dialog content goes here.</p>
    <button baseUiDialogClose>Close</button>
  </div>
</div>`;

  protected readonly multiSlotCode = `<!-- Custom component with multiple slots -->
@Component({
  selector: 'app-card',
  template: \`
    <div class="card">
      <header class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </header>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <footer class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </footer>
    </div>
  \`
})

<!-- Usage -->
<app-card>
  <h3 card-header>Card Title</h3>
  <p>Main card content</p>
  <button card-footer>Action</button>
</app-card>`;

  protected readonly templateOutletCode = `<div baseUiAccordionRoot>
  @for (item of items; track item.id) {
    <div baseUiAccordionItem [value]="item.id">
      <button baseUiAccordionTrigger>
        {{ item.title }}
      </button>
      <div baseUiAccordionPanel>
        <!-- Template with state access -->
        <ng-container
          [ngTemplateOutlet]="itemContent"
          [ngTemplateOutletContext]="{ $implicit: item }"
        />
      </div>
    </div>
  }
</div>

<ng-template #itemContent let-item>
  <p>{{ item.description }}</p>
</ng-template>`;

  protected readonly templateContextCode = `<!-- Collapsible with template context -->
<div baseUiCollapsibleRoot #collapsible="collapsibleRoot">
  <button baseUiCollapsibleTrigger>
    {{ collapsible.open() ? 'Hide' : 'Show' }} content
  </button>
  <div baseUiCollapsiblePanel>
    <ng-container
      [ngTemplateOutlet]="content"
      [ngTemplateOutletContext]="{ open: collapsible.open() }"
    />
  </div>
</div>

<ng-template #content let-open="open">
  <p>Panel is {{ open ? 'visible' : 'hidden' }}</p>
</ng-template>`;

  protected readonly useRenderCode = `import { RenderElementDirective } from '@copied/base-ng/use-render';

@Component({
  imports: [MenuItemDirective, RenderElementDirective],
  template: \`
    <!-- Render MenuItem as an anchor instead of div -->
    <a
      baseUiMenuItem
      [baseUiRender]="'a'"
      href="/settings"
    >
      Settings
    </a>
  \`
})`;

  protected readonly useRenderExampleCode = `<!-- Render Dialog trigger as link -->
<a
  baseUiDialogTrigger
  [baseUiRender]="'a'"
  href="#"
  (click)="$event.preventDefault()"
>
  Open dialog
</a>

<!-- Render Tab as button (default) or link -->
<a
  baseUiTabsTrigger
  [baseUiRender]="'a'"
  [value]="'settings'"
  [routerLink]="'/settings'"
>
  Settings
</a>`;

  protected readonly compoundCode = `<!-- Tabs: Root provides state to children -->
<div baseUiTabsRoot [value]="activeTab()">
  <!-- TabsList injects TabsRoot -->
  <div baseUiTabsList>
    <!-- Each Tab injects TabsRoot for state -->
    <button baseUiTabsTrigger value="one">Tab 1</button>
    <button baseUiTabsTrigger value="two">Tab 2</button>
  </div>

  <!-- Panels inject TabsRoot to know visibility -->
  <div baseUiTabsPanel value="one">Content 1</div>
  <div baseUiTabsPanel value="two">Content 2</div>
</div>`;

  protected readonly portalCode = `<!-- Dialog uses portal to render at document body -->
<div baseUiDialogRoot>
  <button baseUiDialogTrigger>Open</button>

  <!-- Backdrop and Popup render via CDK Portal -->
  <div baseUiDialogBackdrop></div>
  <div baseUiDialogPopup>
    Dialog content renders outside parent hierarchy
  </div>
</div>`;

  protected readonly renderPropCode = `<!-- Accordion with state-aware rendering -->
<div baseUiAccordionRoot>
  <div baseUiAccordionItem #item="accordionItem" value="faq-1">
    <button baseUiAccordionTrigger>
      <span>Question 1</span>
      <!-- Rotate icon based on open state -->
      <svg [class.rotated]="item.open()">▼</svg>
    </button>
    <div baseUiAccordionPanel>
      @if (item.open()) {
        <!-- Only render complex content when open -->
        <app-expensive-content />
      }
    </div>
  </div>
</div>`;
}

import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../shared';

@Component({
  selector: 'docs-typescript',
  imports: [CodeBlockComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">TypeScript</h1>
        <p class="docs-description">
          Base NG is written in TypeScript and provides comprehensive type
          definitions for all components and utilities.
        </p>
      </header>

      <!-- Overview -->
      <section class="docs-section">
        <h2 class="docs-section-title">Overview</h2>
        <p class="docs-paragraph">
          All Base NG components are fully typed with TypeScript. This provides
          autocomplete, type checking, and documentation in your IDE. The
          library exports types for component inputs, outputs, and events.
        </p>
      </section>

      <!-- Importing Types -->
      <section class="docs-section">
        <h2 class="docs-section-title">Importing Types</h2>
        <p class="docs-paragraph">
          Types are exported alongside their components:
        </p>
        <docs-code-block [code]="importTypesCode" language="typescript" />
      </section>

      <!-- Component Types -->
      <section class="docs-section">
        <h2 class="docs-section-title">Component Types</h2>
        <p class="docs-paragraph">
          Each component exports interfaces for its inputs and state:
        </p>
        <docs-code-block [code]="componentTypesCode" language="typescript" />
      </section>

      <!-- Event Types -->
      <section class="docs-section">
        <h2 class="docs-section-title">Event Types</h2>
        <p class="docs-paragraph">
          Event outputs are strongly typed with their payload structure:
        </p>
        <docs-code-block [code]="eventTypesCode" language="typescript" />
      </section>

      <!-- Generic Components -->
      <section class="docs-section">
        <h2 class="docs-section-title">Generic Components</h2>
        <p class="docs-paragraph">
          Some components use generics for type-safe value handling:
        </p>
        <docs-code-block [code]="genericComponentsCode" language="typescript" />
      </section>

      <!-- Utility Types -->
      <section class="docs-section">
        <h2 class="docs-section-title">Utility Types</h2>
        <p class="docs-paragraph">
          Base NG exports utility types for common patterns:
        </p>
        <docs-code-block [code]="utilityTypesCode" language="typescript" />
      </section>

      <!-- Directive References -->
      <section class="docs-section">
        <h2 class="docs-section-title">Directive References</h2>
        <p class="docs-paragraph">
          Access directive instances with proper typing using template references:
        </p>
        <docs-code-block [code]="directiveRefsCode" language="typescript" />
      </section>

      <!-- Custom Component Typing -->
      <section class="docs-section">
        <h2 class="docs-section-title">Custom Component Typing</h2>
        <p class="docs-paragraph">
          When wrapping Base NG components, preserve type safety:
        </p>
        <docs-code-block [code]="customComponentCode" language="typescript" />
      </section>

      <!-- Strict Mode -->
      <section class="docs-section">
        <h2 class="docs-section-title">Strict Mode</h2>
        <p class="docs-paragraph">
          Base NG is designed for TypeScript strict mode. Enable these options
          in your <code>tsconfig.json</code>:
        </p>
        <docs-code-block [code]="strictModeCode" language="json" />
      </section>

      <!-- Tips -->
      <section class="docs-section">
        <h2 class="docs-section-title">TypeScript Tips</h2>
        <ul class="docs-list">
          <li>
            <strong>Use IDE autocomplete</strong> - Hover over component inputs
            to see their types and descriptions.
          </li>
          <li>
            <strong>Check event payloads</strong> - Event outputs are typed;
            destructure with confidence.
          </li>
          <li>
            <strong>Export types from wrappers</strong> - When creating wrapper
            components, re-export relevant types.
          </li>
          <li>
            <strong>Use template type checking</strong> - Angular's strict
            template checking catches type errors in templates.
          </li>
        </ul>
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
    }
  `,
})
export class TypeScriptComponent {
  protected readonly importTypesCode = `// Import component and its types
import {
  SwitchRootDirective,
  type SwitchState,
  type SwitchCheckedChangeEvent
} from '@base-ng/ui/switch';

// Import from types subpath
import type { OpenChangeReason } from '@base-ng/ui/types';`;

  protected readonly componentTypesCode = `import type {
  AccordionState,
  AccordionItemState,
  AccordionValue
} from '@base-ng/ui/accordion';

// State interface provides component state shape
interface AccordionState {
  value: AccordionValue;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
}

// Value can be single or multiple
type AccordionValue = string | string[] | null;

// Item state extends root state
interface AccordionItemState extends AccordionState {
  open: boolean;
  itemValue: string;
}`;

  protected readonly eventTypesCode = `import type {
  OpenChangeEvent,
  ValueChangeEvent,
  CheckedChangeEvent
} from '@base-ng/ui/types';

// Open/close events include reason
interface OpenChangeEvent {
  open: boolean;
  reason: OpenChangeReason;
}

// Possible close reasons
type OpenChangeReason =
  | 'click'
  | 'escape-key'
  | 'outside-press'
  | 'focus-out'
  | 'hover';

// Value change events are generic
interface ValueChangeEvent<T> {
  value: T;
  previousValue: T;
}

// Usage in component
@Component({
  template: \`
    <div
      baseUiPopoverRoot
      (openChange)="handleOpen($event)"
    >
      ...
    </div>
  \`
})
export class MyComponent {
  handleOpen(event: OpenChangeEvent): void {
    // TypeScript knows event shape
    if (event.reason === 'escape-key') {
      // Handle escape specifically
    }
  }
}`;

  protected readonly genericComponentsCode = `import { TabsRootDirective } from '@base-ng/ui/tabs';

// Tabs value can be typed
interface MyTabValue {
  id: string;
  label: string;
}

@Component({
  template: \`
    <div
      baseUiTabsRoot
      [value]="activeTab()"
      (valueChange)="onTabChange($event)"
    >
      <!-- ... -->
    </div>
  \`
})
export class TabsComponent {
  activeTab = signal<string>('home');

  // Event is typed based on value
  onTabChange(event: { value: string }): void {
    this.activeTab.set(event.value);
  }
}`;

  protected readonly utilityTypesCode = `import type {
  Orientation,
  Side,
  Alignment,
  Direction
} from '@base-ng/ui/types';

// Common orientation type
type Orientation = 'horizontal' | 'vertical';

// Positioning types for floating elements
type Side = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'center' | 'end';

// RTL/LTR direction
type Direction = 'ltr' | 'rtl';

// Component using utility types
@Component({
  template: \`
    <div baseUiPopoverRoot [side]="side()" [alignment]="alignment()">
      ...
    </div>
  \`
})
export class MyPopover {
  side = signal<Side>('bottom');
  alignment = signal<Alignment>('center');
}`;

  protected readonly directiveRefsCode = `import { Component, viewChild } from '@angular/core';
import {
  CollapsibleRootDirective,
  type CollapsibleState
} from '@base-ng/ui/collapsible';

@Component({
  template: \`
    <div
      baseUiCollapsibleRoot
      #collapsible="collapsibleRoot"
    >
      <!-- Access typed directive instance -->
      <button (click)="toggle()">
        {{ collapsible.open() ? 'Hide' : 'Show' }}
      </button>
      <div baseUiCollapsiblePanel>Content</div>
    </div>
  \`
})
export class MyComponent {
  // ViewChild with proper type
  private collapsible = viewChild.required(CollapsibleRootDirective);

  toggle(): void {
    // Methods and properties are typed
    const isOpen = this.collapsible().open();
    this.collapsible().setOpen(!isOpen);
  }
}`;

  protected readonly customComponentCode = `import {
  Component,
  input,
  output,
  model
} from '@angular/core';
import {
  SwitchRootDirective,
  SwitchThumbDirective,
  type SwitchState
} from '@base-ng/ui/switch';

// Re-export types for consumers
export type { SwitchState };

// Define wrapper-specific types
export interface LabeledSwitchProps {
  label: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-labeled-switch',
  imports: [SwitchRootDirective, SwitchThumbDirective],
  template: \`
    <div class="labeled-switch">
      <div class="switch-text">
        <span class="label">{{ label() }}</span>
        @if (description()) {
          <span class="description">{{ description() }}</span>
        }
      </div>
      <button
        baseUiSwitchRoot
        [checked]="checked()"
        [disabled]="disabled()"
        (checkedChange)="checkedChange.emit($event)"
      >
        <span baseUiSwitchThumb></span>
      </button>
    </div>
  \`
})
export class LabeledSwitchComponent {
  // Typed inputs using signal inputs
  label = input.required<string>();
  description = input<string>();

  // Two-way binding with model
  checked = model(false);
  disabled = input(false);

  // Typed output
  checkedChange = output<boolean>();
}`;

  protected readonly strictModeCode = `{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "angularCompilerOptions": {
    "strictTemplates": true,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true
  }
}`;
}

import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-merge-props',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <div class="docs-page">
      <header class="docs-header">
        <h1>mergeProps</h1>
        <p>
          Utility for merging multiple props objects with intelligent handling
          of event handlers, classes, and styles.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2>Installation</h2>
        <docs-package-selector
          packageName="@copied/base-ng"
          importName="mergeProps, mergePropsN, preventBaseUIHandler"
        />
      </section>

      <!-- Overview -->
      <section class="docs-section">
        <h2>Overview</h2>
        <p>
          When building component libraries, you often need to merge props from
          different sources: default props, user props, and computed props. The
          <code>mergeProps</code> utility handles this intelligently:
        </p>
        <ul>
          <li>Event handlers are chained (rightmost called first)</li>
          <li>Class names are concatenated</li>
          <li>Style objects are merged</li>
          <li>Other props use rightmost-wins override</li>
        </ul>
      </section>

      <!-- Basic Usage -->
      <section class="docs-section">
        <h2>Basic Usage</h2>
        <p>
          Merge multiple props objects where the rightmost values take
          precedence.
        </p>
        <docs-code-block [code]="basicUsageCode" language="typescript" />
      </section>

      <!-- Event Handler Merging -->
      <section class="docs-section">
        <h2>Event Handler Merging</h2>
        <p>
          When the same event handler appears in multiple prop objects, they are
          chained together. Handlers are called from right to left.
        </p>
        <docs-code-block [code]="eventHandlerCode" language="typescript" />
      </section>

      <!-- Preventing Handlers -->
      <section class="docs-section">
        <h2>Preventing Handlers</h2>
        <p>
          You can prevent earlier handlers from being called using
          <code>preventBaseUIHandler</code>.
        </p>
        <docs-code-block [code]="preventHandlerCode" language="typescript" />
      </section>

      <!-- Class Merging -->
      <section class="docs-section">
        <h2>Class Name Merging</h2>
        <p>
          Class names are concatenated with rightmost classes appearing first.
        </p>
        <docs-code-block [code]="classMergingCode" language="typescript" />
      </section>

      <!-- Style Merging -->
      <section class="docs-section">
        <h2>Style Merging</h2>
        <p>
          Style objects are deeply merged with rightmost styles taking
          precedence.
        </p>
        <docs-code-block [code]="styleMergingCode" language="typescript" />
      </section>

      <!-- Dynamic Props -->
      <section class="docs-section">
        <h2>Dynamic Props Function</h2>
        <p>
          Props can be a function that receives the currently merged props and
          returns additional props.
        </p>
        <docs-code-block [code]="dynamicPropsCode" language="typescript" />
      </section>

      <!-- mergePropsN -->
      <section class="docs-section">
        <h2>Merging Arrays of Props</h2>
        <p>
          Use <code>mergePropsN</code> when you have a dynamic array of prop
          objects.
        </p>
        <docs-code-block [code]="mergePropsNCode" language="typescript" />
      </section>

      <!-- Real World Example -->
      <section class="docs-section">
        <h2>Real World Example</h2>
        <p>
          Using mergeProps in a reusable button component.
        </p>
        <docs-code-block [code]="realWorldCode" language="typescript" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2>API Reference</h2>

        <h3>mergeProps</h3>
        <docs-props-table [props]="mergePropsFunc" title="Parameters" />

        <h3>mergePropsN</h3>
        <docs-props-table [props]="mergePropsNFunc" title="Parameters" />

        <h3>preventBaseUIHandler</h3>
        <docs-props-table [props]="preventFunc" title="Parameters" />

        <h3>isBaseUIHandlerPrevented</h3>
        <docs-props-table [props]="isPreventedFunc" title="Parameters" />
      </section>

      <!-- Merge Rules -->
      <section class="docs-section">
        <h2>Merge Rules Summary</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Property Type</th>
              <th>Merge Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Event handlers (on*)</td>
              <td>Chained, called right-to-left</td>
            </tr>
            <tr>
              <td>className / class</td>
              <td>Concatenated with space</td>
            </tr>
            <tr>
              <td>style</td>
              <td>Object merged, rightmost wins</td>
            </tr>
            <tr>
              <td>Other properties</td>
              <td>Rightmost wins (override)</td>
            </tr>
            <tr>
              <td>undefined values</td>
              <td>Skipped, previous value kept</td>
            </tr>
          </tbody>
        </table>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/utils/merge-props/merge-props-docs.component.ts"
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

    .docs-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .docs-table th,
    .docs-table td {
      border: 1px solid #e5e7eb;
      padding: 0.75rem;
      text-align: left;
    }

    .docs-table th {
      background: #f9fafb;
      font-weight: 600;
    }
  

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }`,
})
export class MergePropsDocsComponent {
  basicUsageCode = `import { mergeProps } from '@copied/base-ng';

const defaultProps = {
  type: 'button',
  disabled: false,
};

const userProps = {
  disabled: true,
  'aria-label': 'Submit form',
};

const merged = mergeProps(defaultProps, userProps);
// Result: { type: 'button', disabled: true, 'aria-label': 'Submit form' }`;

  eventHandlerCode = `import { mergeProps } from '@copied/base-ng';

const internalClick = (event: Event) => {
  console.log('Internal handler');
};

const userClick = (event: Event) => {
  console.log('User handler');
};

const merged = mergeProps(
  { onClick: internalClick },
  { onClick: userClick },
);

// When onClick is called:
// 1. "User handler" logs first (rightmost)
// 2. "Internal handler" logs second

merged.onClick(new MouseEvent('click'));`;

  preventHandlerCode = `import { mergeProps, preventBaseUIHandler } from '@copied/base-ng';

const internalHandler = (event: Event) => {
  console.log('This will NOT run');
};

const userHandler = (event: Event) => {
  console.log('User handler runs');

  // Prevent the internal handler from running
  preventBaseUIHandler(event);
};

const merged = mergeProps(
  { onClick: internalHandler },
  { onClick: userHandler },
);

// Only "User handler runs" is logged
merged.onClick(new MouseEvent('click'));

// You can also check if prevention occurred
import { isBaseUIHandlerPrevented } from '@copied/base-ng';

const anotherHandler = (event: Event) => {
  if (isBaseUIHandlerPrevented(event)) {
    console.log('Handler was prevented');
    return;
  }
  // ... continue with logic
};`;

  classMergingCode = `import { mergeProps } from '@copied/base-ng';

const baseProps = { className: 'btn btn-base' };
const sizeProps = { className: 'btn-lg' };
const variantProps = { className: 'btn-primary' };

const merged = mergeProps(baseProps, sizeProps, variantProps);
// Result: { className: 'btn-primary btn-lg btn btn-base' }

// Works with 'class' property too (Angular style)
const angularMerged = mergeProps(
  { class: 'base-class' },
  { class: 'override-class' },
);
// Result: { class: 'override-class base-class' }`;

  styleMergingCode = `import { mergeProps } from '@copied/base-ng';

const baseStyle = {
  style: {
    padding: '8px',
    backgroundColor: 'white',
    color: 'black',
  },
};

const overrideStyle = {
  style: {
    backgroundColor: 'blue',
    color: 'white',
  },
};

const merged = mergeProps(baseStyle, overrideStyle);
// Result: {
//   style: {
//     padding: '8px',          // kept from base
//     backgroundColor: 'blue', // overridden
//     color: 'white',          // overridden
//   }
// }`;

  dynamicPropsCode = `import { mergeProps } from '@copied/base-ng';

const baseProps = {
  disabled: false,
  className: 'btn',
};

// Function receives currently merged props
const dynamicProps = (merged: typeof baseProps) => ({
  'aria-disabled': merged.disabled,
  className: merged.disabled ? 'btn-disabled' : undefined,
});

const result = mergeProps(baseProps, dynamicProps);
// Result: {
//   disabled: false,
//   className: 'btn',
//   'aria-disabled': false,
// }`;

  mergePropsNCode = `import { mergePropsN } from '@copied/base-ng';

// When you have a dynamic array of props
const propsList = [
  { id: '1', className: 'base' },
  condition ? { className: 'conditional' } : null,
  { className: 'final', onClick: handleClick },
];

const merged = mergePropsN(propsList);

// Useful in directives that collect props from multiple sources
const allProps = mergePropsN([
  defaultProps,
  ...inheritedProps,
  userProps,
]);`;

  realWorldCode = `import { Component, input, computed } from '@angular/core';
import { mergeProps, type GenericProps } from '@copied/base-ng';

@Component({
  selector: 'ui-button',
  template: \`
    <button [class]="mergedProps().className" (click)="handleClick($event)">
      <ng-content />
    </button>
  \`,
})
export class ButtonComponent {
  // User-provided props
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false);
  readonly className = input('');

  // Internal default props
  private readonly baseProps = {
    type: 'button' as const,
    className: 'btn',
  };

  // Computed variant props
  private readonly variantProps = computed(() => ({
    className: \`btn-\${this.variant()}\`,
  }));

  // Computed size props
  private readonly sizeProps = computed(() => ({
    className: \`btn-\${this.size()}\`,
  }));

  // User props
  private readonly userProps = computed(() => ({
    disabled: this.disabled(),
    className: this.className(),
  }));

  // Merge all props
  readonly mergedProps = computed(() =>
    mergeProps(
      this.baseProps,
      this.variantProps(),
      this.sizeProps(),
      this.userProps(),
    )
  );

  handleClick(event: Event) {
    const props = this.mergedProps();
    if (props.disabled) {
      event.preventDefault();
    }
  }
}`;

  // API Props
  mergePropsFunc: PropDefinition[] = [
    {
      name: 'props1...props5',
      type: 'MergeableProps | null | undefined',
      description:
        'Up to 5 prop objects or functions that return props. Rightmost values take precedence.',
    },
    {
      name: 'returns',
      type: 'T1 & T2 & T3 & T4 & T5',
      description: 'Merged props object with combined types.',
    },
  ];

  mergePropsNFunc: PropDefinition[] = [
    {
      name: 'propsArray',
      type: 'Array<MergeableProps | null>',
      description: 'Array of prop objects to merge. Rightmost values take precedence.',
    },
    {
      name: 'returns',
      type: 'T',
      description: 'Merged props object.',
    },
  ];

  preventFunc: PropDefinition[] = [
    {
      name: 'event',
      type: 'Event',
      required: true,
      description: 'The event to mark as prevented. Stops earlier handlers from executing.',
    },
  ];

  isPreventedFunc: PropDefinition[] = [
    {
      name: 'event',
      type: 'Event',
      required: true,
      description: 'The event to check.',
    },
    {
      name: 'returns',
      type: 'boolean',
      description: 'True if preventBaseUIHandler was called on this event.',
    },
  ];
}

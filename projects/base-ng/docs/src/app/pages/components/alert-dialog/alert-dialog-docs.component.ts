import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  AlertDialogRootDirective,
  AlertDialogTriggerDirective,
  AlertDialogBackdropDirective,
  AlertDialogPopupDirective,
  AlertDialogTitleDirective,
  AlertDialogDescriptionDirective,
  AlertDialogCloseDirective,
} from '@base-ng/ui';

@Component({
  selector: 'docs-alert-dialog',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    AlertDialogRootDirective,
    AlertDialogTriggerDirective,
    AlertDialogBackdropDirective,
    AlertDialogPopupDirective,
    AlertDialogTitleDirective,
    AlertDialogDescriptionDirective,
    AlertDialogCloseDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Alert Dialog</h1>
        <p class="docs-description">
          A modal dialog that requires explicit user action to dismiss. Unlike
          regular dialogs, Alert Dialogs cannot be closed by clicking outside or
          pressing Escape. Use for confirmations and destructive actions.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="confirmDemoCode" language="html">
          <div class="demo-container">
            <ng-container baseUiAlertDialogRoot [(open)]="isAlertOpen">
              <button baseUiAlertDialogTrigger class="demo-trigger demo-danger">
                Delete Account
              </button>

              <div baseUiAlertDialogBackdrop class="demo-backdrop"></div>

              <div baseUiAlertDialogPopup role="alertdialog" class="demo-alert-dialog">
                <h2 baseUiAlertDialogTitle class="demo-alert-title">Delete Account?</h2>
                <p baseUiAlertDialogDescription class="demo-alert-desc">
                  This will permanently delete your account and all associated data.
                  This action cannot be undone.
                </p>
                <div class="demo-alert-actions">
                  <button baseUiAlertDialogClose class="demo-btn demo-btn-secondary">Cancel</button>
                  <button (click)="handleDelete()" class="demo-btn demo-btn-danger">Delete Account</button>
                </div>
              </div>
            </ng-container>
          </div>
        </docs-demo>
      </section>

      <!-- Import -->
      <section class="docs-section">
        <h2 class="docs-section-title">Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Alert Dialog uses a composition pattern with multiple directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Confirmation dialog</h3>
        <p class="docs-paragraph">
          Create a confirmation dialog for destructive actions.
        </p>
        <docs-code-block [code]="confirmDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Delete confirmation</h3>
        <p class="docs-paragraph">
          A delete confirmation with explicit action handling.
        </p>
        <docs-code-block [code]="deleteDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Controlled state</h3>
        <p class="docs-paragraph">
          Control the open state programmatically.
        </p>
        <docs-code-block [code]="controlledDemoCode" language="typescript" />

        <h3 class="docs-section-subtitle">Nested content</h3>
        <p class="docs-paragraph">
          Include form inputs or other complex content.
        </p>
        <docs-code-block [code]="nestedDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Style the Alert Dialog parts using CSS:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root Inputs" [props]="rootInputProps" />
        <docs-props-table title="Root Outputs" [props]="rootOutputProps" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table [props]="dataAttributes" />
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS classes</h2>
        <docs-props-table [props]="cssClasses" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          Alert Dialog follows WAI-ARIA guidelines for alert dialogs:
        </p>
        <ul class="docs-list">
          <li>
            Uses <code>role="alertdialog"</code> to indicate urgent information
            requiring user response
          </li>
          <li>
            <strong>Cannot be dismissed</strong> by clicking outside or pressing
            Escape, requiring explicit user action
          </li>
          <li>Focus is trapped within the dialog while open</li>
          <li>
            Sets <code>aria-labelledby</code> and
            <code>aria-describedby</code> automatically
          </li>
          <li>Focus is restored to trigger when closed</li>
          <li>Body scroll is locked while open</li>
          <li>
            <strong>Required:</strong> Include both Cancel and Confirm actions
            for user control
          </li>
        </ul>
      </section>

      <!-- Dialog vs Alert Dialog -->
      <section class="docs-section">
        <h2 class="docs-section-title">When to use Alert Dialog</h2>
        <p class="docs-paragraph">Use Alert Dialog when:</p>
        <ul class="docs-list">
          <li>Confirming destructive actions (delete, remove, etc.)</li>
          <li>Displaying critical warnings that require acknowledgment</li>
          <li>Actions that cannot be undone</li>
          <li>Requiring explicit user consent before proceeding</li>
        </ul>
        <p class="docs-paragraph">
          Use regular Dialog when the user should be able to dismiss easily
          (clicking outside, Escape key).
        </p>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/alert-dialog/alert-dialog-docs.component.ts"
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
    }

    /* Demo styles */
    .demo-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .demo-trigger {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background 0.15s;

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }
    }

    .demo-danger {
      background: #ef4444;
      color: white;

      &:hover {
        background: #dc2626;
      }
    }

    .demo-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 100;
      animation: backdropFadeIn 0.2s ease;
    }

    @keyframes backdropFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .demo-alert-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 101;
      background: var(--docs-bg, white);
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      padding: 1.5rem;
      max-width: 400px;
      width: 90%;
      animation: dialogSlideIn 0.2s ease;
    }

    @keyframes dialogSlideIn {
      from {
        opacity: 0;
        transform: translate(-50%, -48%);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }

    .demo-alert-title {
      margin: 0 0 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--docs-text);
    }

    .demo-alert-desc {
      margin: 0 0 1.25rem;
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--docs-text-secondary);
    }

    .demo-alert-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .demo-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background 0.15s;

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }
    }

    .demo-btn-secondary {
      background: var(--docs-bg-muted, #f5f5f5);
      color: var(--docs-text);
      border: 1px solid var(--docs-border);

      &:hover {
        background: var(--docs-bg-hover, #e5e5e5);
      }
    }

    .demo-btn-danger {
      background: #ef4444;
      color: white;

      &:hover {
        background: #dc2626;
      }
    }
  `,
})
export class AlertDialogDocsComponent {
  // Demo state
  protected readonly isAlertOpen = signal(false);

  protected handleDelete(): void {
    // Simulate deletion
    this.isAlertOpen.set(false);
  }

  protected readonly importCode = `import {
  AlertDialogRootDirective,
  AlertDialogTriggerDirective,
  AlertDialogBackdropDirective,
  AlertDialogPopupDirective,
  AlertDialogCloseDirective,
  AlertDialogTitleDirective,
  AlertDialogDescriptionDirective,
} from '@base-ng/ui';

@Component({
  imports: [
    AlertDialogRootDirective,
    AlertDialogTriggerDirective,
    AlertDialogBackdropDirective,
    AlertDialogPopupDirective,
    AlertDialogCloseDirective,
    AlertDialogTitleDirective,
    AlertDialogDescriptionDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<ng-container baseUiAlertDialogRoot>
  <!-- Trigger button -->
  <button baseUiAlertDialogTrigger>Open Alert</button>

  <!-- Backdrop (clicking does NOT close the dialog) -->
  <div baseUiAlertDialogBackdrop></div>

  <!-- Dialog popup -->
  <div baseUiAlertDialogPopup role="alertdialog">
    <h2 baseUiAlertDialogTitle>Confirm Action</h2>
    <p baseUiAlertDialogDescription>
      This action cannot be undone.
    </p>

    <!-- User must explicitly click a button to close -->
    <button baseUiAlertDialogClose>Cancel</button>
    <button (click)="onConfirm()">Confirm</button>
  </div>
</ng-container>`;

  protected readonly confirmDemoCode = `<ng-container baseUiAlertDialogRoot>
  <button baseUiAlertDialogTrigger class="btn btn-danger">
    Delete Account
  </button>

  <div baseUiAlertDialogBackdrop class="backdrop"></div>

  <div baseUiAlertDialogPopup role="alertdialog" class="alert-dialog">
    <h2 baseUiAlertDialogTitle class="alert-title">
      Delete Account?
    </h2>
    <p baseUiAlertDialogDescription class="alert-description">
      This will permanently delete your account and all associated data.
      This action cannot be undone.
    </p>

    <div class="alert-actions">
      <button baseUiAlertDialogClose class="btn btn-secondary">
        Cancel
      </button>
      <button (click)="deleteAccount()" class="btn btn-danger">
        Delete Account
      </button>
    </div>
  </div>
</ng-container>`;

  protected readonly deleteDemoCode = `@Component({
  template: \`
    <ng-container baseUiAlertDialogRoot [(open)]="isOpen">
      <button baseUiAlertDialogTrigger>Delete Item</button>

      <div baseUiAlertDialogBackdrop></div>

      <div baseUiAlertDialogPopup role="alertdialog">
        <h2 baseUiAlertDialogTitle>Delete "{{ item.name }}"?</h2>
        <p baseUiAlertDialogDescription>
          This item will be permanently removed.
        </p>

        <div class="actions">
          <button baseUiAlertDialogClose>Cancel</button>
          <button (click)="confirmDelete()">Delete</button>
        </div>
      </div>
    </ng-container>
  \`,
})
export class MyComponent {
  readonly isOpen = signal(false);
  item = { id: 1, name: 'Important Document' };

  confirmDelete(): void {
    this.api.delete(this.item.id).subscribe(() => {
      this.isOpen.set(false); // Close after successful delete
      this.toast.success('Item deleted');
    });
  }
}`;

  protected readonly controlledDemoCode = `@Component({
  template: \`
    <ng-container baseUiAlertDialogRoot [(open)]="showWarning">
      <!-- No trigger - opened programmatically -->
      <div baseUiAlertDialogBackdrop></div>

      <div baseUiAlertDialogPopup role="alertdialog">
        <h2 baseUiAlertDialogTitle>Session Expiring</h2>
        <p baseUiAlertDialogDescription>
          Your session will expire in 5 minutes. Would you like to stay signed in?
        </p>

        <button (click)="logout()">Sign Out</button>
        <button (click)="extendSession()">Stay Signed In</button>
      </div>
    </ng-container>
  \`,
})
export class MyComponent {
  readonly showWarning = signal(false);

  ngOnInit(): void {
    // Show warning before session expires
    this.session.onExpiringSoon.subscribe(() => {
      this.showWarning.set(true);
    });
  }

  logout(): void {
    this.showWarning.set(false);
    this.auth.logout();
  }

  extendSession(): void {
    this.showWarning.set(false);
    this.session.extend();
  }
}`;

  protected readonly nestedDemoCode = `<ng-container baseUiAlertDialogRoot>
  <button baseUiAlertDialogTrigger>Transfer Funds</button>

  <div baseUiAlertDialogBackdrop></div>

  <div baseUiAlertDialogPopup role="alertdialog">
    <h2 baseUiAlertDialogTitle>Confirm Transfer</h2>
    <p baseUiAlertDialogDescription>
      Enter your PIN to confirm this transfer of {{ amount | currency }}.
    </p>

    <div class="pin-input">
      <input
        type="password"
        maxlength="4"
        placeholder="PIN"
        [(ngModel)]="pin"
      />
    </div>

    <div class="actions">
      <button baseUiAlertDialogClose>Cancel</button>
      <button
        (click)="confirmTransfer()"
        [disabled]="pin.length !== 4"
      >
        Confirm Transfer
      </button>
    </div>
  </div>
</ng-container>`;

  protected readonly stylingCode = `/* Backdrop */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

/* Alert Dialog */
.alert-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 400px;
  width: 90%;
  z-index: 101;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Title */
.alert-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

/* Description */
.alert-description {
  margin: 0 0 1.5rem;
  color: #6b7280;
  line-height: 1.5;
}

/* Actions */
.alert-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Destructive button */
.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}`;

  protected readonly tailwindCode = `<ng-container baseUiAlertDialogRoot>
  <button
    baseUiAlertDialogTrigger
    class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
  >
    Delete
  </button>

  <div
    baseUiAlertDialogBackdrop
    class="fixed inset-0 bg-black/50 z-[100]"
  ></div>

  <div
    baseUiAlertDialogPopup
    role="alertdialog"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
           bg-white rounded-lg p-6 max-w-md w-[90%] z-[101]
           shadow-2xl"
  >
    <h2
      baseUiAlertDialogTitle
      class="text-lg font-semibold text-gray-900 mb-2"
    >
      Confirm Delete
    </h2>
    <p
      baseUiAlertDialogDescription
      class="text-gray-600 mb-6"
    >
      This action cannot be undone. Are you sure?
    </p>

    <div class="flex justify-end gap-3">
      <button
        baseUiAlertDialogClose
        class="px-4 py-2 border border-gray-300 rounded-md
               hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        (click)="onDelete()"
        class="px-4 py-2 bg-red-600 text-white rounded-md
               hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </div>
</ng-container>`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Controlled open state. Supports two-way binding.',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Initial open state for uncontrolled usage.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<AlertDialogOpenChangeEventDetails>',
      description: 'Emitted when the open state changes. Includes reason.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-open',
      type: 'string',
      description: 'Present when the dialog is open.',
    },
    {
      name: 'data-closed',
      type: 'string',
      description: 'Present when the dialog is closed.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-alert-dialog-root',
      type: 'class',
      description: 'Applied to the root container.',
    },
    {
      name: 'base-ui-alert-dialog-trigger',
      type: 'class',
      description: 'Applied to the trigger button.',
    },
    {
      name: 'base-ui-alert-dialog-backdrop',
      type: 'class',
      description: 'Applied to the backdrop overlay.',
    },
    {
      name: 'base-ui-alert-dialog-popup',
      type: 'class',
      description: 'Applied to the dialog popup.',
    },
    {
      name: 'base-ui-alert-dialog-title',
      type: 'class',
      description: 'Applied to the title element.',
    },
    {
      name: 'base-ui-alert-dialog-description',
      type: 'class',
      description: 'Applied to the description element.',
    },
    {
      name: 'base-ui-alert-dialog-close',
      type: 'class',
      description: 'Applied to close buttons.',
    },
  ];
}

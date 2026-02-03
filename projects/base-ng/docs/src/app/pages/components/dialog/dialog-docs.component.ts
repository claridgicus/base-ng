import { Component } from '@angular/core';
import {
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-dialog',
  imports: [CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Dialog</h1>
        <p class="docs-description">
          A modal dialog window overlaid on the primary content. Features focus
          trapping, keyboard navigation, and automatic ARIA attributes for
          accessibility.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">Import the Dialog directives:</p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Dialog uses a directive-based composition pattern:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Use <code>[(open)]</code> to control the dialog's open state:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Controlled dialog</h3>
        <p class="docs-paragraph">
          Use event binding for full control over open/close behavior:
        </p>
        <docs-code-block [code]="controlledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With backdrop</h3>
        <p class="docs-paragraph">
          Add a backdrop element behind the dialog:
        </p>
        <docs-code-block [code]="backdropDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Non-modal dialog</h3>
        <p class="docs-paragraph">
          Set <code>modal="false"</code> to allow interaction with the page
          behind the dialog:
        </p>
        <docs-code-block [code]="nonModalDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Prevent close on outside click</h3>
        <p class="docs-paragraph">
          Disable closing when clicking outside the dialog:
        </p>
        <docs-code-block [code]="preventCloseCode" language="html" />

        <h3 class="docs-section-subtitle">Confirmation dialog</h3>
        <p class="docs-paragraph">
          A common pattern for destructive actions:
        </p>
        <docs-code-block [code]="confirmationDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Form in dialog</h3>
        <p class="docs-paragraph">
          Handle form submission within a dialog:
        </p>
        <docs-code-block [code]="formDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes and CSS to style different dialog states:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table
          title="DialogRoot Inputs"
          [props]="rootInputProps"
        />
        <docs-props-table
          title="DialogRoot Outputs"
          [props]="rootOutputProps"
        />
        <docs-props-table
          title="DialogClose Inputs"
          [props]="closeInputProps"
        />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table
          title="DialogTrigger / DialogPopup / DialogBackdrop"
          [props]="dataAttributes"
        />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Dialog component follows WAI-ARIA Dialog pattern:
        </p>
        <ul class="docs-list">
          <li>Popup has <code>role="dialog"</code></li>
          <li>
            <code>aria-modal</code> indicates modal dialogs trap focus
          </li>
          <li>
            <code>aria-labelledby</code> links to the DialogTitle element
          </li>
          <li>
            <code>aria-describedby</code> links to the DialogDescription
          </li>
          <li>Focus is automatically moved to the dialog when opened</li>
          <li>Focus is restored to the trigger when closed</li>
          <li>Escape key closes the dialog (configurable)</li>
          <li>Body scroll is locked for modal dialogs</li>
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
export class DialogDocsComponent {
  protected readonly importCode = `import {
  DialogRootDirective,
  DialogTriggerDirective,
  DialogBackdropDirective,
  DialogPopupDirective,
  DialogTitleDirective,
  DialogDescriptionDirective,
  DialogCloseDirective
} from '@base-ng/ui/dialog';

@Component({
  imports: [
    DialogRootDirective,
    DialogTriggerDirective,
    DialogBackdropDirective,
    DialogPopupDirective,
    DialogTitleDirective,
    DialogDescriptionDirective,
    DialogCloseDirective
  ],
  // ...
})`;

  protected readonly anatomyCode = `<ng-container baseUiDialogRoot [(open)]="isOpen">
  <!-- Trigger button -->
  <button baseUiDialogTrigger>Open Dialog</button>

  <!-- Backdrop (optional) -->
  <div baseUiDialogBackdrop></div>

  <!-- Dialog content -->
  <div baseUiDialogPopup>
    <h2 baseUiDialogTitle>Dialog Title</h2>
    <p baseUiDialogDescription>Dialog description text.</p>

    <!-- Dialog content here -->

    <button baseUiDialogClose>Close</button>
  </div>
</ng-container>`;

  protected readonly basicDemoCode = `<ng-container baseUiDialogRoot [(open)]="isDialogOpen">
  <button baseUiDialogTrigger>Open Dialog</button>

  <div baseUiDialogBackdrop class="dialog-backdrop"></div>

  <div baseUiDialogPopup class="dialog-popup">
    <h2 baseUiDialogTitle>Welcome</h2>
    <p baseUiDialogDescription>
      This is a simple dialog example.
    </p>
    <button baseUiDialogClose>Got it</button>
  </div>
</ng-container>

<!-- In component class -->
isDialogOpen = false;`;

  protected readonly controlledDemoCode = `<ng-container baseUiDialogRoot
  [open]="isOpen"
  (openChanged)="handleOpenChange($event)">
  <button baseUiDialogTrigger>Open</button>

  <div baseUiDialogPopup>
    <h2 baseUiDialogTitle>Controlled Dialog</h2>
    <p>Open state is fully controlled by the parent.</p>
    <button baseUiDialogClose>Close</button>
  </div>
</ng-container>

<!-- In component class -->
isOpen = false;

handleOpenChange(event: { open: boolean; reason: string }) {
  console.log('Dialog state changed:', event.reason);

  // You can prevent closing for certain reasons
  if (event.reason === 'escape-key' && this.hasUnsavedChanges) {
    // Don't close if there are unsaved changes
    return;
  }

  this.isOpen = event.open;
}`;

  protected readonly backdropDemoCode = `<ng-container baseUiDialogRoot [(open)]="isOpen">
  <button baseUiDialogTrigger>Open with Backdrop</button>

  <!-- Backdrop renders behind the popup -->
  <div baseUiDialogBackdrop class="dialog-backdrop"></div>

  <div baseUiDialogPopup class="dialog-popup">
    <h2 baseUiDialogTitle>Dialog with Backdrop</h2>
    <p>Click outside or press Escape to close.</p>
    <button baseUiDialogClose>Close</button>
  </div>
</ng-container>

<style>
  .dialog-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .dialog-backdrop[data-state="open"] {
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>`;

  protected readonly nonModalDemoCode = `<!-- Non-modal dialogs don't trap focus or lock scroll -->
<ng-container baseUiDialogRoot [(open)]="isOpen" [modal]="false">
  <button baseUiDialogTrigger>Open Non-Modal</button>

  <div baseUiDialogPopup class="dialog-popup">
    <h2 baseUiDialogTitle>Non-Modal Dialog</h2>
    <p>You can still interact with the page behind this dialog.</p>
    <button baseUiDialogClose>Close</button>
  </div>
</ng-container>`;

  protected readonly preventCloseCode = `<!-- Prevent closing on outside click -->
<ng-container baseUiDialogRoot
  [(open)]="isOpen"
  [closeOnOutsideClick]="false"
  [closeOnEscape]="false">
  <button baseUiDialogTrigger>Open Persistent Dialog</button>

  <div baseUiDialogPopup>
    <h2 baseUiDialogTitle>Persistent Dialog</h2>
    <p>This dialog can only be closed with the close button.</p>
    <button baseUiDialogClose>Close</button>
  </div>
</ng-container>`;

  protected readonly confirmationDemoCode = `<ng-container baseUiDialogRoot [(open)]="confirmDeleteOpen">
  <button baseUiDialogTrigger class="delete-button">
    Delete Account
  </button>

  <div baseUiDialogBackdrop class="dialog-backdrop"></div>

  <div baseUiDialogPopup class="dialog-popup">
    <h2 baseUiDialogTitle>Confirm Deletion</h2>
    <p baseUiDialogDescription>
      Are you sure you want to delete your account?
      This action cannot be undone.
    </p>

    <div class="dialog-actions">
      <button baseUiDialogClose class="cancel-button">Cancel</button>
      <button (click)="deleteAccount()" class="danger-button">
        Yes, Delete
      </button>
    </div>
  </div>
</ng-container>

<!-- In component class -->
confirmDeleteOpen = false;

deleteAccount() {
  // Perform deletion
  this.accountService.delete();
  this.confirmDeleteOpen = false;
}`;

  protected readonly formDemoCode = `<ng-container baseUiDialogRoot [(open)]="isOpen">
  <button baseUiDialogTrigger>Edit Profile</button>

  <div baseUiDialogBackdrop class="dialog-backdrop"></div>

  <div baseUiDialogPopup class="dialog-popup">
    <h2 baseUiDialogTitle>Edit Profile</h2>

    <form (ngSubmit)="saveProfile()">
      <div class="form-field">
        <label for="name">Name</label>
        <input id="name" [(ngModel)]="profile.name" name="name" />
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" [(ngModel)]="profile.email" name="email" type="email" />
      </div>

      <div class="dialog-actions">
        <button type="button" baseUiDialogClose>Cancel</button>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</ng-container>

<!-- In component class -->
profile = { name: '', email: '' };

saveProfile() {
  this.userService.updateProfile(this.profile);
  this.isOpen = false;
}`;

  protected readonly stylingCode = `/* Backdrop styling */
[baseUiDialogBackdrop] {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

/* Backdrop animation */
[baseUiDialogBackdrop][data-state="open"] {
  animation: backdropFadeIn 0.2s ease;
}

@keyframes backdropFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Dialog popup */
[baseUiDialogPopup] {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  background: white;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
}

/* Popup animation */
[baseUiDialogPopup][data-state="open"] {
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

/* Title */
[baseUiDialogTitle] {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

/* Description */
[baseUiDialogDescription] {
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.875rem;
}

/* Close button */
[baseUiDialogClose] {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

[baseUiDialogClose]:hover {
  background: #e5e5e5;
}

/* Focus state */
[baseUiDialogPopup]:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}

/* Trigger button states */
[baseUiDialogTrigger][data-state="open"] {
  background: #e5e5e5;
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description:
        'The controlled open state of the dialog. Supports two-way binding with [(open)].',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'The default open state when uncontrolled.',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      description:
        'Whether the dialog is modal. Modal dialogs trap focus and prevent interaction with the rest of the page.',
    },
    {
      name: 'closeOnOutsideClick',
      type: 'boolean',
      default: 'true',
      description: 'Whether clicking outside the dialog closes it.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Whether pressing the Escape key closes the dialog.',
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<DialogOpenChangeEventDetails>',
      description:
        'Emitted when the open state changes. Includes open boolean and reason string (trigger-press, close-press, outside-press, escape-key, imperative).',
    },
  ];

  protected readonly closeInputProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the close button is disabled.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-state',
      type: '"open" | "closed"',
      description: 'The current state of the dialog.',
    },
  ];
}

import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../shared';

@Component({
  selector: 'docs-customization',
  imports: [CodeBlockComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Customization</h1>
        <p class="docs-description">
          Control component behavior through events, state management, and
          custom handlers in Base NG.
        </p>
      </header>

      <!-- Overview -->
      <section class="docs-section">
        <h2 class="docs-section-title">Overview</h2>
        <p class="docs-paragraph">
          Base NG components provide fine-grained control over their behavior
          through Angular's event system, outputs, and two-way binding. You can
          intercept and customize state changes while keeping components
          accessible.
        </p>
      </section>

      <!-- Event Outputs -->
      <section class="docs-section">
        <h2 class="docs-section-title">Event Outputs</h2>
        <p class="docs-paragraph">
          Base NG components emit events when their state changes. These outputs
          provide details about what triggered the change:
        </p>
        <docs-code-block [code]="eventOutputsCode" language="typescript" />
        <p class="docs-paragraph">
          Common event outputs include:
        </p>
        <ul class="docs-list">
          <li><code>openChange</code> - Dialog, Popover, Collapsible state</li>
          <li><code>valueChange</code> - Tabs, Accordion, Select selection</li>
          <li><code>checkedChange</code> - Switch, Checkbox state</li>
          <li><code>pressedChange</code> - Toggle state</li>
        </ul>
      </section>

      <!-- Controlled Components -->
      <section class="docs-section">
        <h2 class="docs-section-title">Controlled Components</h2>
        <p class="docs-paragraph">
          Components work in both controlled and uncontrolled modes. For
          controlled mode, use two-way binding or separate input/output:
        </p>

        <h3 class="docs-section-subtitle">Two-way binding</h3>
        <docs-code-block [code]="twoWayBindingCode" language="html" />

        <h3 class="docs-section-subtitle">Separate input/output</h3>
        <p class="docs-paragraph">
          For more control, use separate bindings:
        </p>
        <docs-code-block [code]="separateBindingCode" language="html" />
      </section>

      <!-- Preventing State Changes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Preventing State Changes</h2>
        <p class="docs-paragraph">
          Control state updates by handling the event and conditionally updating:
        </p>
        <docs-code-block [code]="preventingChangesCode" language="typescript" />
      </section>

      <!-- Custom Triggers -->
      <section class="docs-section">
        <h2 class="docs-section-title">Custom Triggers</h2>
        <p class="docs-paragraph">
          Programmatically control components without user interaction:
        </p>
        <docs-code-block [code]="customTriggersCode" language="typescript" />
      </section>

      <!-- Event Details -->
      <section class="docs-section">
        <h2 class="docs-section-title">Event Details</h2>
        <p class="docs-paragraph">
          Some events include additional context about what triggered them:
        </p>
        <docs-code-block [code]="eventDetailsCode" language="typescript" />
        <p class="docs-paragraph">
          Common reasons include:
        </p>
        <ul class="docs-list">
          <li><code>click</code> - User clicked the trigger</li>
          <li><code>escape-key</code> - User pressed Escape</li>
          <li><code>outside-press</code> - User clicked outside</li>
          <li><code>focus-out</code> - Focus moved outside</li>
          <li><code>hover</code> - Mouse hover triggered change</li>
        </ul>
      </section>

      <!-- Creating Variants -->
      <section class="docs-section">
        <h2 class="docs-section-title">Creating Variants</h2>
        <p class="docs-paragraph">
          Wrap Base NG components to create pre-configured variants:
        </p>
        <docs-code-block [code]="variantsCode" language="typescript" />
      </section>

      <!-- Default Values -->
      <section class="docs-section">
        <h2 class="docs-section-title">Default Values</h2>
        <p class="docs-paragraph">
          Set initial uncontrolled values with <code>defaultValue</code> or
          <code>defaultChecked</code> props:
        </p>
        <docs-code-block [code]="defaultValuesCode" language="html" />
      </section>

      <!-- Best Practices -->
      <section class="docs-section">
        <h2 class="docs-section-title">Best Practices</h2>
        <ul class="docs-list">
          <li>
            <strong>Prefer uncontrolled when possible</strong> - Let components
            manage their own state unless you need external control.
          </li>
          <li>
            <strong>Use two-way binding for simple cases</strong> - The
            <code>[(value)]</code> syntax simplifies most use cases.
          </li>
          <li>
            <strong>Handle async operations carefully</strong> - When preventing
            changes pending async work, show loading states to users.
          </li>
          <li>
            <strong>Document custom behaviors</strong> - When wrapping components
            with custom logic, document the changes for your team.
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
export class CustomizationComponent {
  protected readonly eventOutputsCode = `@Component({
  template: \`
    <div
      baseUiPopoverRoot
      [open]="isOpen()"
      (openChange)="handleOpenChange($event)"
    >
      <!-- ... -->
    </div>
  \`
})
export class MyComponent {
  isOpen = signal(false);

  handleOpenChange(event: { open: boolean; reason: string }): void {
    console.log('Open changed:', event.open);
    console.log('Reason:', event.reason);
    this.isOpen.set(event.open);
  }
}`;

  protected readonly twoWayBindingCode = `<!-- Two-way binding automatically syncs state -->
<button baseUiSwitchRoot [(checked)]="isEnabled">
  <span baseUiSwitchThumb></span>
</button>

<!-- Accordion with two-way value binding -->
<div baseUiAccordionRoot [(value)]="openItems">
  <!-- ... -->
</div>

<!-- Tabs with two-way value binding -->
<div baseUiTabsRoot [(value)]="activeTab">
  <!-- ... -->
</div>`;

  protected readonly separateBindingCode = `<div
  baseUiPopoverRoot
  [open]="isOpen()"
  (openChange)="onOpenChange($event)"
>
  <button baseUiPopoverTrigger>Open</button>
  <div baseUiPopoverPopup>Content</div>
</div>`;

  protected readonly preventingChangesCode = `@Component({
  template: \`
    <div
      baseUiDialogRoot
      [open]="isOpen()"
      (openChange)="handleOpenChange($event)"
    >
      <button baseUiDialogTrigger>Open</button>
      <div baseUiDialogPopup>
        <p>You have unsaved changes.</p>
        <button (click)="confirmClose()">Discard</button>
        <button (click)="cancelClose()">Keep editing</button>
      </div>
    </div>
  \`
})
export class ConfirmDialogComponent {
  isOpen = signal(false);
  hasUnsavedChanges = signal(false);
  pendingClose = signal(false);

  handleOpenChange(event: { open: boolean; reason: string }): void {
    // Allow opening
    if (event.open) {
      this.isOpen.set(true);
      return;
    }

    // Prevent closing if there are unsaved changes
    if (this.hasUnsavedChanges()) {
      this.pendingClose.set(true);
      // Don't update isOpen - keep dialog open
      return;
    }

    this.isOpen.set(false);
  }

  confirmClose(): void {
    this.hasUnsavedChanges.set(false);
    this.pendingClose.set(false);
    this.isOpen.set(false);
  }

  cancelClose(): void {
    this.pendingClose.set(false);
  }
}`;

  protected readonly customTriggersCode = `@Component({
  template: \`
    <!-- External trigger buttons -->
    <button (click)="openDialog()">Open from external</button>
    <button (click)="closeDialog()">Close from external</button>

    <!-- Controlled dialog -->
    <div baseUiDialogRoot [open]="isDialogOpen()">
      <div baseUiDialogBackdrop></div>
      <div baseUiDialogPopup>
        <p>Dialog content</p>
        <button baseUiDialogClose>Close</button>
      </div>
    </div>
  \`
})
export class ExternalControlComponent {
  isDialogOpen = signal(false);

  openDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
  }

  // Open from code (e.g., after API response)
  async handleSubmit(): Promise<void> {
    await this.apiService.submit();
    this.openDialog(); // Show success dialog
  }
}`;

  protected readonly eventDetailsCode = `@Component({
  template: \`
    <div
      baseUiPopoverRoot
      [open]="isOpen()"
      (openChange)="handleOpenChange($event)"
    >
      <!-- ... -->
    </div>
  \`
})
export class PopoverComponent {
  isOpen = signal(false);

  handleOpenChange(event: { open: boolean; reason: string }): void {
    // Handle different close reasons differently
    if (!event.open) {
      switch (event.reason) {
        case 'escape-key':
          // Allow Escape to always close
          this.isOpen.set(false);
          break;

        case 'outside-press':
          // Confirm before closing on outside click
          if (this.hasUnsavedWork()) {
            this.showConfirmation();
            return; // Don't close yet
          }
          this.isOpen.set(false);
          break;

        default:
          this.isOpen.set(false);
      }
    } else {
      this.isOpen.set(true);
    }
  }
}`;

  protected readonly variantsCode = `// danger-dialog.component.ts
@Component({
  selector: 'app-danger-dialog',
  template: \`
    <div baseUiDialogRoot [open]="open()" (openChange)="openChange.emit($event)">
      <div baseUiDialogBackdrop class="danger-backdrop"></div>
      <div baseUiDialogPopup class="danger-popup">
        <div class="danger-icon">⚠️</div>
        <div baseUiDialogTitle>{{ title() }}</div>
        <div baseUiDialogDescription>{{ description() }}</div>
        <div class="danger-actions">
          <button baseUiDialogClose class="cancel-btn">
            Cancel
          </button>
          <button (click)="onConfirm()" class="confirm-btn">
            {{ confirmText() }}
          </button>
        </div>
      </div>
    </div>
  \`,
  styles: \`
    .danger-popup {
      border-left: 4px solid #dc2626;
    }
    .confirm-btn {
      background: #dc2626;
      color: white;
    }
  \`
})
export class DangerDialogComponent {
  title = input.required<string>();
  description = input<string>('');
  confirmText = input('Confirm');
  open = input(false);
  openChange = output<{ open: boolean; reason: string }>();
  confirm = output<void>();

  onConfirm(): void {
    this.confirm.emit();
    this.openChange.emit({ open: false, reason: 'confirm' });
  }
}

// Usage
<app-danger-dialog
  [open]="showDeleteDialog()"
  (openChange)="showDeleteDialog.set($event.open)"
  title="Delete Account"
  description="This action cannot be undone."
  confirmText="Delete Forever"
  (confirm)="deleteAccount()"
/>`;

  protected readonly defaultValuesCode = `<!-- Uncontrolled with default value -->
<div baseUiAccordionRoot [defaultValue]="['faq-1']">
  <!-- Item 'faq-1' starts expanded -->
</div>

<!-- Uncontrolled with default checked -->
<button baseUiSwitchRoot [defaultChecked]="true">
  <!-- Switch starts on -->
</button>

<!-- Uncontrolled with default open -->
<div baseUiPopoverRoot [defaultOpen]="true">
  <!-- Popover starts open -->
</div>`;
}

import { Component, inject } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  ToastManagerService,
  ToastProviderDirective,
  ToastViewportDirective,
  ToastRootDirective,
  ToastTitleDirective,
  ToastDescriptionDirective,
  ToastCloseDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-toast',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    ToastProviderDirective,
    ToastViewportDirective,
    ToastRootDirective,
    ToastTitleDirective,
    ToastDescriptionDirective,
    ToastCloseDirective,
  ],
  template: `
    <div class="docs-page">
      <header class="docs-header">
        <h1>Toast</h1>
        <p>
          A notification message that temporarily appears on screen to inform
          users of events, with automatic dismissal and swipe-to-dismiss
          support.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <h2>Live Demo</h2>
        <docs-demo [code]="basicExampleCode">
          <div baseUiToastProvider #toastProvider="toastProvider" class="demo-toast-container">
            <div class="demo-toast-buttons">
              <button class="demo-toast-btn" (click)="showDefaultToast()">
                Show Toast
              </button>
              <button class="demo-toast-btn demo-toast-btn-success" (click)="showSuccessToast()">
                Success
              </button>
              <button class="demo-toast-btn demo-toast-btn-error" (click)="showErrorToast()">
                Error
              </button>
            </div>
            <div baseUiToastViewport class="demo-toast-viewport">
              @for (toast of toastProvider.toasts(); track toast.id) {
                <div
                  baseUiToastRoot
                  [toast]="toast"
                  class="demo-toast"
                  [class.demo-toast-success]="toast.type === 'success'"
                  [class.demo-toast-error]="toast.type === 'error'"
                >
                  <div class="demo-toast-content">
                    <div baseUiToastTitle class="demo-toast-title">{{ toast.title }}</div>
                    @if (toast.description) {
                      <div baseUiToastDescription class="demo-toast-description">
                        {{ toast.description }}
                      </div>
                    }
                  </div>
                  <button baseUiToastClose class="demo-toast-close">
                    <svg viewBox="0 0 12 12" width="14" height="14">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    </svg>
                  </button>
                </div>
              }
            </div>
          </div>
        </docs-demo>
      </section>

      <!-- Import -->
      <section class="docs-section">
        <h2>Import</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2>Anatomy</h2>
        <p>
          Toast uses a provider-viewport-root pattern where the provider manages
          state and the viewport contains rendered toasts.
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Basic Example -->
      <section class="docs-section">
        <h2>Basic Example</h2>
        <p>
          The simplest toast setup with a provider, viewport, and the
          ToastManagerService to trigger toasts from anywhere.
        </p>
        <docs-code-block [code]="basicExampleCode" language="html" />
        <docs-code-block [code]="basicExampleTs" language="typescript" />
      </section>

      <!-- Toast Types -->
      <section class="docs-section">
        <h2>Toast Types</h2>
        <p>
          Toasts support different types for semantic styling: default, success,
          error, warning, info, and loading.
        </p>
        <docs-code-block [code]="toastTypesCode" language="typescript" />
      </section>

      <!-- Toast with Actions -->
      <section class="docs-section">
        <h2>Toast with Actions</h2>
        <p>
          Include action buttons within toasts for user interactions like undoing
          an operation.
        </p>
        <docs-code-block [code]="actionExampleCode" language="html" />
        <docs-code-block [code]="actionExampleTs" language="typescript" />
      </section>

      <!-- Promise Toasts -->
      <section class="docs-section">
        <h2>Promise Toasts</h2>
        <p>
          The toast manager provides a promise() method that shows a loading
          toast, then automatically transitions to success or error based on the
          promise result.
        </p>
        <docs-code-block [code]="promiseExampleCode" language="typescript" />
      </section>

      <!-- Pause on Hover/Focus -->
      <section class="docs-section">
        <h2>Pause on Hover</h2>
        <p>
          Toasts automatically pause their auto-dismiss timer when the viewport
          is hovered or focused, giving users time to read or interact.
        </p>
        <docs-code-block [code]="pauseExampleCode" language="css" />
      </section>

      <!-- Swipe to Dismiss -->
      <section class="docs-section">
        <h2>Swipe to Dismiss</h2>
        <p>
          Users can swipe toasts to dismiss them. Configure allowed swipe
          directions on the provider.
        </p>
        <docs-code-block [code]="swipeExampleCode" language="html" />
      </section>

      <!-- Custom Positioning -->
      <section class="docs-section">
        <h2>Custom Positioning</h2>
        <p>
          Position the viewport at different corners of the screen using CSS.
        </p>
        <docs-code-block [code]="positionExampleCode" language="css" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2>Styling</h2>
        <p>Style toasts using data attributes for type and state.</p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- Tailwind -->
      <section class="docs-section">
        <h2>Tailwind CSS</h2>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2>API Reference</h2>

        <h3>ToastManagerService</h3>
        <p>Injectable service to manage toasts from anywhere in the app.</p>
        <docs-props-table [props]="toastManagerMethods" title="Methods" />

        <h3>ToastProviderDirective</h3>
        <p>
          <code>baseUiToastProvider</code> - Container that manages toast state
          and timers.
        </p>
        <docs-props-table [props]="providerInputProps" title="Inputs" />

        <h3>ToastViewportDirective</h3>
        <p>
          <code>baseUiToastViewport</code> - Accessible region for toast
          notifications.
        </p>
        <docs-props-table [props]="viewportInputProps" title="Inputs" />

        <h3>ToastRootDirective</h3>
        <p>
          <code>baseUiToastRoot</code> - Individual toast container with
          swipe-to-dismiss.
        </p>
        <docs-props-table [props]="rootInputProps" title="Inputs" />
        <docs-props-table [props]="rootOutputProps" title="Outputs" />

        <h3>ToastTitleDirective</h3>
        <p><code>baseUiToastTitle</code> - The title text of a toast.</p>

        <h3>ToastDescriptionDirective</h3>
        <p>
          <code>baseUiToastDescription</code> - The description text of a toast.
        </p>

        <h3>ToastCloseDirective</h3>
        <p><code>baseUiToastClose</code> - Button to close the toast.</p>

        <h3>ToastActionDirective</h3>
        <p><code>baseUiToastAction</code> - Action button within a toast.</p>
        <docs-props-table [props]="actionInputProps" title="Inputs" />
        <docs-props-table [props]="actionOutputProps" title="Outputs" />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2>Data Attributes</h2>

        <h3>ToastViewport</h3>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data-hovering</code></td>
              <td>Present when the viewport is hovered</td>
            </tr>
            <tr>
              <td><code>data-focused</code></td>
              <td>Present when the viewport is focused</td>
            </tr>
          </tbody>
        </table>

        <h3>ToastRoot</h3>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data-type</code></td>
              <td>Toast type: default, success, error, warning, info, loading</td>
            </tr>
            <tr>
              <td><code>data-priority</code></td>
              <td>Toast priority: normal or high</td>
            </tr>
            <tr>
              <td><code>data-transition-status</code></td>
              <td>Transition state: starting, ending, or absent</td>
            </tr>
            <tr>
              <td><code>data-swiping</code></td>
              <td>Present when user is swiping the toast</td>
            </tr>
            <tr>
              <td><code>data-limited</code></td>
              <td>Present when toast exceeds the limit and is hidden</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- CSS Classes -->
      <section class="docs-section">
        <h2>CSS Classes</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>.base-ui-toast-provider</code></td>
              <td>Applied to the toast provider container</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-viewport</code></td>
              <td>Applied to the toast viewport</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-root</code></td>
              <td>Applied to each toast</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-root-starting</code></td>
              <td>Applied during enter transition</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-root-ending</code></td>
              <td>Applied during exit transition</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-title</code></td>
              <td>Applied to the toast title</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-description</code></td>
              <td>Applied to the toast description</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-close</code></td>
              <td>Applied to the close button</td>
            </tr>
            <tr>
              <td><code>.base-ui-toast-action</code></td>
              <td>Applied to action buttons</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Keyboard Navigation -->
      <section class="docs-section">
        <h2>Keyboard Navigation</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>F6</code></td>
              <td>Focus the toast viewport and pause timers</td>
            </tr>
            <tr>
              <td><code>Escape</code></td>
              <td>Close the focused toast</td>
            </tr>
            <tr>
              <td><code>Tab</code></td>
              <td>Navigate between interactive elements</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2>Accessibility</h2>
        <ul>
          <li>
            Viewport has <code>role="region"</code> with
            <code>aria-live="polite"</code>
          </li>
          <li>
            Each toast has <code>role="dialog"</code> (or
            <code>alertdialog</code> for high priority)
          </li>
          <li>
            Priority determines aria-live: <code>polite</code> for normal,
            <code>assertive</code> for high
          </li>
          <li>
            Title and description are linked via
            <code>aria-labelledby</code> and <code>aria-describedby</code>
          </li>
          <li>Timers pause on hover and focus for user convenience</li>
          <li>
            Close button has <code>aria-label="Close notification"</code>
          </li>
          <li>F6 key provides quick access to notifications</li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/toast/toast-docs.component.ts"
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

    .docs-section ul,
    .docs-section ol {
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

    .docs-table code {
      background: #f3f4f6;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.8125rem;
    }
  

    .docs-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--docs-border);
    }

    /* Demo styles */
    .demo-toast-container {
      position: relative;
      min-height: 200px;
    }

    .demo-toast-buttons {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .demo-toast-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--docs-border);
      border-radius: 6px;
      background: var(--docs-bg);
      color: var(--docs-text);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .demo-toast-btn:hover {
      background: var(--docs-bg-hover);
    }

    .demo-toast-btn-success {
      background: #10b981;
      border-color: #10b981;
      color: white;
    }

    .demo-toast-btn-success:hover {
      background: #059669;
    }

    .demo-toast-btn-error {
      background: #ef4444;
      border-color: #ef4444;
      color: white;
    }

    .demo-toast-btn-error:hover {
      background: #dc2626;
    }

    .demo-toast-viewport {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 300px;
    }

    .demo-toast {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.875rem;
      background: var(--docs-bg);
      border: 1px solid var(--docs-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      animation: toastIn 0.2s ease;
    }

    @keyframes toastIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .demo-toast-success {
      border-left: 3px solid #10b981;
    }

    .demo-toast-error {
      border-left: 3px solid #ef4444;
    }

    .demo-toast-content {
      flex: 1;
    }

    .demo-toast-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--docs-text);
    }

    .demo-toast-description {
      font-size: 0.8125rem;
      color: var(--docs-text-secondary);
      margin-top: 0.25rem;
    }

    .demo-toast-close {
      padding: 0.25rem;
      border: none;
      background: transparent;
      color: var(--docs-text-tertiary);
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.15s ease;
    }

    .demo-toast-close:hover {
      background: var(--docs-bg-hover);
      color: var(--docs-text);
    }
  `,
})
export class ToastDocsComponent {
  protected readonly toastManager = inject(ToastManagerService);

  protected showDefaultToast(): void {
    this.toastManager.add({
      title: 'Notification',
      description: 'This is a default toast message.',
    });
  }

  protected showSuccessToast(): void {
    this.toastManager.add({
      type: 'success',
      title: 'Success!',
      description: 'Your changes have been saved.',
    });
  }

  protected showErrorToast(): void {
    this.toastManager.add({
      type: 'error',
      title: 'Error',
      description: 'Something went wrong. Please try again.',
    });
  }

  importCode = `import {
  ToastProviderDirective,
  ToastViewportDirective,
  ToastRootDirective,
  ToastTitleDirective,
  ToastDescriptionDirective,
  ToastCloseDirective,
  ToastActionDirective,
  ToastManagerService,
} from '@copied/base-ng';`;

  anatomyCode = `<div baseUiToastProvider>
  <div baseUiToastViewport>
    @for (toast of toasts(); track toast.id) {
      <div baseUiToastRoot [toast]="toast">
        <div baseUiToastTitle>{{ toast.title }}</div>
        <div baseUiToastDescription>{{ toast.description }}</div>
        <button baseUiToastClose>×</button>
      </div>
    }
  </div>
</div>`;

  basicExampleCode = `<!-- app.component.html -->
<div baseUiToastProvider #provider="toastProvider" [timeout]="5000" [limit]="3">
  <button (click)="showToast()">Show Toast</button>

  <div baseUiToastViewport class="toast-viewport">
    @for (toast of provider.toasts(); track toast.id) {
      <div baseUiToastRoot [toast]="toast" class="toast">
        <div class="toast-content">
          <div baseUiToastTitle class="toast-title">{{ toast.title }}</div>
          @if (toast.description) {
            <div baseUiToastDescription class="toast-description">
              {{ toast.description }}
            </div>
          }
        </div>
        <button baseUiToastClose class="toast-close">×</button>
      </div>
    }
  </div>
</div>`;

  basicExampleTs = `import { Component, inject } from '@angular/core';
import {
  ToastProviderDirective,
  ToastViewportDirective,
  ToastRootDirective,
  ToastTitleDirective,
  ToastDescriptionDirective,
  ToastCloseDirective,
  ToastManagerService,
} from '@copied/base-ng';

@Component({
  selector: 'app-root',
  imports: [
    ToastProviderDirective,
    ToastViewportDirective,
    ToastRootDirective,
    ToastTitleDirective,
    ToastDescriptionDirective,
    ToastCloseDirective,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private toastManager = inject(ToastManagerService);

  showToast() {
    this.toastManager.add({
      title: 'Hello!',
      description: 'This is a toast notification.',
    });
  }
}`;

  toastTypesCode = `// Default toast
this.toastManager.add({
  title: 'Note',
  description: 'Something happened.',
  type: 'default',
});

// Success toast
this.toastManager.add({
  title: 'Success!',
  description: 'Your changes have been saved.',
  type: 'success',
});

// Error toast
this.toastManager.add({
  title: 'Error',
  description: 'Something went wrong.',
  type: 'error',
});

// Warning toast
this.toastManager.add({
  title: 'Warning',
  description: 'This action cannot be undone.',
  type: 'warning',
});

// Info toast
this.toastManager.add({
  title: 'Info',
  description: 'New features are available.',
  type: 'info',
});

// Loading toast (typically used with promise())
this.toastManager.add({
  title: 'Loading...',
  type: 'loading',
  timeout: 0, // No auto-dismiss
});`;

  actionExampleCode = `<div baseUiToastRoot [toast]="toast" class="toast">
  <div class="toast-content">
    <div baseUiToastTitle>Item deleted</div>
    <div baseUiToastDescription>The file has been moved to trash.</div>
  </div>
  <div class="toast-actions">
    <button baseUiToastAction (actionClick)="handleUndo(toast)" class="toast-action">
      Undo
    </button>
    <button baseUiToastClose class="toast-close">×</button>
  </div>
</div>`;

  actionExampleTs = `handleUndo(toast: ToastObject) {
  // Perform undo logic
  this.restoreItem(toast.data);

  // Close the toast
  this.toastManager.close(toast.id);

  // Optionally show confirmation
  this.toastManager.add({
    title: 'Restored',
    description: 'Item has been restored.',
    type: 'success',
  });
}`;

  promiseExampleCode = `async saveData() {
  // Show loading → success/error automatically
  await this.toastManager.promise(
    this.dataService.save(this.formData),
    {
      loading: 'Saving...',
      success: 'Data saved successfully!',
      error: 'Failed to save data.',
    }
  );
}

// With dynamic messages based on result/error
async uploadFile(file: File) {
  await this.toastManager.promise(
    this.uploadService.upload(file),
    {
      loading: { title: 'Uploading...', description: file.name },
      success: (result) => ({
        title: 'Upload complete!',
        description: \`Uploaded \${result.filename} (\${result.size})\`,
      }),
      error: (err) => ({
        title: 'Upload failed',
        description: err.message,
      }),
    }
  );
}`;

  pauseExampleCode = `/* Toasts automatically pause on hover */
.toast-viewport:hover .toast {
  /* Indicate paused state */
  opacity: 1;
}

/* Visual indicator when paused */
.toast-viewport[data-hovering] .toast,
.toast-viewport[data-focused] .toast {
  /* Progress bar pauses */
  animation-play-state: paused;
}`;

  swipeExampleCode = `<!-- Allow swiping in specific directions -->
<div baseUiToastProvider [swipeDirections]="['right', 'left']">
  <!-- Toasts can be dismissed by swiping left or right -->
</div>

<!-- Allow vertical swipes too -->
<div baseUiToastProvider [swipeDirections]="['up', 'down', 'left', 'right']">
  <!-- Toasts can be dismissed in any direction -->
</div>`;

  positionExampleCode = `/* Position toasts at bottom-right (default) */
.toast-viewport {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 24rem;
  z-index: 9999;
}

/* Top-right positioning */
.toast-viewport.top-right {
  top: 1rem;
  bottom: auto;
  right: 1rem;
}

/* Top-center positioning */
.toast-viewport.top-center {
  top: 1rem;
  bottom: auto;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}

/* Stack order: newest on top */
.toast-viewport.stack-up {
  flex-direction: column-reverse;
}`;

  stylingCode = `/* Base toast styles */
.toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

/* Enter transition */
.toast[data-transition-status="starting"] {
  opacity: 0;
  transform: translateX(100%);
}

/* Exit transition */
.toast[data-transition-status="ending"] {
  opacity: 0;
  transform: translateX(100%);
}

/* Type-specific styles */
.toast[data-type="success"] {
  border-left: 4px solid #10b981;
}

.toast[data-type="error"] {
  border-left: 4px solid #ef4444;
}

.toast[data-type="warning"] {
  border-left: 4px solid #f59e0b;
}

.toast[data-type="info"] {
  border-left: 4px solid #3b82f6;
}

.toast[data-type="loading"] {
  border-left: 4px solid #6b7280;
}

/* High priority toast */
.toast[data-priority="high"] {
  background: #fef2f2;
  border: 1px solid #ef4444;
}

/* Swiping state */
.toast[data-swiping] {
  cursor: grabbing;
  user-select: none;
}

/* Toast content */
.toast-title {
  font-weight: 600;
  color: #111827;
}

.toast-description {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Close button */
.toast-close {
  padding: 0.25rem;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 0.25rem;
}

.toast-close:hover {
  background: #f3f4f6;
  color: #374151;
}

/* Action button */
.toast-action {
  padding: 0.375rem 0.75rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.toast-action:hover {
  background: #f9fafb;
}`;

  tailwindCode = `<!-- Toast viewport -->
<div baseUiToastViewport
     class="fixed bottom-4 right-4 flex flex-col gap-2 max-w-sm z-50">

  @for (toast of provider.toasts(); track toast.id) {
    <div baseUiToastRoot
         [toast]="toast"
         class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg
                border-l-4 transition-all duration-200 ease-out
                data-[type=success]:border-green-500
                data-[type=error]:border-red-500
                data-[type=warning]:border-amber-500
                data-[type=info]:border-blue-500
                data-[transition-status=starting]:opacity-0
                data-[transition-status=starting]:translate-x-full
                data-[transition-status=ending]:opacity-0
                data-[transition-status=ending]:translate-x-full
                data-[swiping]:cursor-grabbing">

      <div class="flex-1">
        <div baseUiToastTitle class="font-semibold text-gray-900">
          {{ toast.title }}
        </div>
        @if (toast.description) {
          <div baseUiToastDescription class="mt-1 text-sm text-gray-500">
            {{ toast.description }}
          </div>
        }
      </div>

      <button baseUiToastClose
              class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100
                     rounded transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  }
</div>`;

  // API Props
  toastManagerMethods: PropDefinition[] = [
    {
      name: 'add',
      type: '(options: ToastAddOptions) => string',
      description:
        'Add a new toast and returns its ID. Options include title, description, type, priority, timeout, and callbacks.',
    },
    {
      name: 'close',
      type: '(id: string) => void',
      description: 'Close a toast by its ID, triggering the exit transition.',
    },
    {
      name: 'update',
      type: '(options: ToastUpdateOptions) => void',
      description:
        'Update an existing toast. Can change title, description, type, or timeout.',
    },
    {
      name: 'promise',
      type: '<T, E>(promise: Promise<T>, options: ToastPromiseOptions) => Promise<T>',
      description:
        'Show a loading toast that transitions to success/error based on promise result.',
    },
  ];

  providerInputProps: PropDefinition[] = [
    {
      name: 'timeout',
      type: 'number',
      default: '5000',
      description: 'Default timeout in milliseconds for toasts. Set to 0 for no auto-dismiss.',
    },
    {
      name: 'limit',
      type: 'number',
      default: '3',
      description: 'Maximum number of visible toasts. Excess toasts are queued.',
    },
    {
      name: 'swipeDirections',
      type: "SwipeDirection[]",
      default: "['right', 'left']",
      description: "Directions that dismiss toasts when swiped. Options: 'up', 'down', 'left', 'right'.",
    },
  ];

  viewportInputProps: PropDefinition[] = [
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Notifications'",
      description: 'Aria label for the viewport region.',
    },
  ];

  rootInputProps: PropDefinition[] = [
    {
      name: 'toast',
      type: 'ToastObject',
      required: true,
      description: 'The toast data object from the provider.',
    },
  ];

  rootOutputProps: PropDefinition[] = [
    {
      name: 'closed',
      type: 'EventEmitter<void>',
      description: 'Emitted when the toast is closed.',
    },
  ];

  actionInputProps: PropDefinition[] = [
    {
      name: 'altText',
      type: 'string',
      description: 'Alternative text for accessibility.',
    },
  ];

  actionOutputProps: PropDefinition[] = [
    {
      name: 'actionClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the action button is clicked.',
    },
  ];
}

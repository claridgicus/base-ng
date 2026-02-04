import { Component, signal } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  DemoComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';
import {
  PopoverRootDirective,
  PopoverTriggerDirective,
  PopoverPositionerDirective,
  PopoverPopupDirective,
  PopoverArrowDirective,
  PopoverCloseDirective,
  PopoverTitleDirective,
  PopoverDescriptionDirective,
} from '@copied/base-ng';

@Component({
  selector: 'docs-popover',
  imports: [
    EditOnGitHubComponent,
    CodeBlockComponent,
    DemoComponent,
    PropsTableComponent,
    PopoverRootDirective,
    PopoverTriggerDirective,
    PopoverPositionerDirective,
    PopoverPopupDirective,
    PopoverArrowDirective,
    PopoverCloseDirective,
    PopoverTitleDirective,
    PopoverDescriptionDirective,
  ],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Popover</h1>
        <p class="docs-description">
          A popup that displays rich content triggered by a button. Unlike
          tooltips, popovers can contain interactive elements like forms, links,
          and buttons. Positioned using Floating UI.
        </p>
      </header>

      <!-- Live Demo -->
      <section class="docs-section">
        <docs-demo [code]="basicDemoCode" language="html">
          <div class="demo-container">
            <div baseUiPopoverRoot [(open)]="isOpen">
              <button baseUiPopoverTrigger class="demo-trigger">
                Share
              </button>
              <div baseUiPopoverPositioner side="bottom" [sideOffset]="8">
                <div baseUiPopoverPopup class="demo-popover">
                  <div class="demo-popover-header">
                    <h3 baseUiPopoverTitle class="demo-popover-title">Share this page</h3>
                    <button baseUiPopoverClose class="demo-popover-close">
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                  </div>
                  <p baseUiPopoverDescription class="demo-popover-desc">
                    Choose how you want to share
                  </p>
                  <div class="demo-share-buttons">
                    <button class="demo-share-btn">📋 Copy link</button>
                    <button class="demo-share-btn">✉️ Email</button>
                    <button class="demo-share-btn">🐦 Twitter</button>
                  </div>
                  <div baseUiPopoverArrow class="demo-popover-arrow"></div>
                </div>
              </div>
            </div>
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
          The Popover uses a directive-based composition pattern:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Click the trigger to toggle the popover:
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Controlled popover</h3>
        <p class="docs-paragraph">
          Use <code>[(open)]</code> to control the popover state:
        </p>
        <docs-code-block [code]="controlledDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Positioning</h3>
        <p class="docs-paragraph">
          Use <code>side</code> and <code>align</code> on the positioner to
          control placement:
        </p>
        <docs-code-block [code]="positioningDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With arrow</h3>
        <p class="docs-paragraph">
          Add an arrow that points to the trigger:
        </p>
        <docs-code-block [code]="arrowDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With close button</h3>
        <p class="docs-paragraph">
          Add an explicit close button inside the popover:
        </p>
        <docs-code-block [code]="closeButtonDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Form in popover</h3>
        <p class="docs-paragraph">
          Popovers can contain interactive forms:
        </p>
        <docs-code-block [code]="formDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Prevent closing</h3>
        <p class="docs-paragraph">
          Disable closing on outside click or escape key:
        </p>
        <docs-code-block [code]="preventCloseDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Hover trigger</h3>
        <p class="docs-paragraph">
          Open the popover on hover instead of click:
        </p>
        <docs-demo [code]="hoverDemoCode" language="html">
          <div class="demo-container">
            <div baseUiPopoverRoot>
              <button baseUiPopoverTrigger [openOnHover]="true" [delay]="200" class="demo-trigger">
                Hover me
              </button>
              <div baseUiPopoverPositioner side="bottom" [sideOffset]="8">
                <div baseUiPopoverPopup class="demo-popover">
                  <p class="demo-popover-desc">This popover opens on hover!</p>
                </div>
              </div>
            </div>
          </div>
        </docs-demo>

        <h3 class="docs-section-subtitle">Modal popover</h3>
        <p class="docs-paragraph">
          Use <code>[modal]="true"</code> to trap focus within the popover
          and add a backdrop:
        </p>
        <docs-code-block [code]="modalDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Focus management</h3>
        <p class="docs-paragraph">
          Control which element receives focus when opening/closing:
        </p>
        <docs-code-block [code]="focusDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Portal rendering</h3>
        <p class="docs-paragraph">
          Use <code>baseUiPopoverPortal</code> to render the popover
          outside its parent DOM hierarchy:
        </p>
        <docs-code-block [code]="portalDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          Use data attributes and CSS to style the popover:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table
          title="PopoverRoot Inputs"
          [props]="rootInputProps"
        />
        <docs-props-table
          title="PopoverRoot Outputs"
          [props]="rootOutputProps"
        />
        <docs-props-table
          title="PopoverTrigger Inputs"
          [props]="triggerInputProps"
        />
        <docs-props-table
          title="PopoverPositioner Inputs"
          [props]="positionerInputProps"
        />
        <docs-props-table
          title="PopoverPopup Inputs"
          [props]="popupInputProps"
        />
        <docs-props-table
          title="PopoverPortal Inputs"
          [props]="portalInputProps"
        />
      </section>

      <!-- Data Attributes -->
      <section class="docs-section">
        <h2 class="docs-section-title">Data attributes</h2>
        <docs-props-table
          title="PopoverTrigger / PopoverPopup"
          [props]="stateDataAttributes"
        />
        <docs-props-table
          title="PopoverPositioner / PopoverArrow"
          [props]="positionerDataAttributes"
        />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Popover component follows WAI-ARIA Disclosure pattern:
        </p>
        <ul class="docs-list">
          <li>Trigger has <code>aria-expanded</code> to indicate open state</li>
          <li>
            <code>aria-haspopup</code> indicates the trigger opens a popup
          </li>
          <li>
            <code>aria-controls</code> links trigger to popup
          </li>
          <li>
            <code>aria-labelledby</code> and <code>aria-describedby</code>
            provide accessible names
          </li>
          <li>Focus moves to popup when opened</li>
          <li>Escape key closes the popover</li>
          <li>Clicking outside closes the popover (configurable)</li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/popover/popover-docs.component.ts"
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
      background: var(--docs-accent, #0066ff);
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background 0.15s;

      &:hover {
        background: color-mix(in srgb, var(--docs-accent, #0066ff), black 10%);
      }

      &:focus-visible {
        outline: 2px solid var(--docs-accent, #0066ff);
        outline-offset: 2px;
      }

      &[data-state='open'] {
        background: color-mix(in srgb, var(--docs-accent, #0066ff), black 15%);
      }
    }

    .demo-popover {
      position: relative;
      background: var(--docs-bg, white);
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      animation: popoverIn 0.15s ease;
    }

    @keyframes popoverIn {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .demo-popover-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .demo-popover-title {
      margin: 0;
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--docs-text);
    }

    .demo-popover-close {
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: var(--docs-text-secondary);
      border-radius: 0.25rem;

      &:hover {
        background: var(--docs-bg-hover, rgba(0, 0, 0, 0.05));
        color: var(--docs-text);
      }
    }

    .demo-popover-desc {
      margin: 0 0 0.75rem;
      font-size: 0.8125rem;
      color: var(--docs-text-secondary);
    }

    .demo-share-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .demo-share-btn {
      padding: 0.5rem 0.75rem;
      font-size: 0.8125rem;
      background: none;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      text-align: left;
      color: var(--docs-text);

      &:hover {
        background: var(--docs-bg-hover, rgba(0, 0, 0, 0.05));
      }
    }

    .demo-popover-arrow {
      position: absolute;
      width: 10px;
      height: 10px;
      background: inherit;
      border: inherit;
      transform: rotate(45deg);

      [data-side='top'] & {
        bottom: -6px;
        left: 50%;
        margin-left: -5px;
        border-top: none;
        border-left: none;
      }

      [data-side='bottom'] & {
        top: -6px;
        left: 50%;
        margin-left: -5px;
        border-bottom: none;
        border-right: none;
      }
    }
  `,
})
export class PopoverDocsComponent {
  // Demo state
  protected readonly isOpen = signal(false);

  protected readonly importCode = `import {
  PopoverRootDirective,
  PopoverTriggerDirective,
  PopoverPositionerDirective,
  PopoverPopupDirective,
  PopoverArrowDirective,
  PopoverCloseDirective,
  PopoverTitleDirective,
  PopoverDescriptionDirective,
  PopoverBackdropDirective,  // Optional
  PopoverPortalDirective,    // Optional
} from '@copied/base-ng';

@Component({
  imports: [
    PopoverRootDirective,
    PopoverTriggerDirective,
    PopoverPositionerDirective,
    PopoverPopupDirective,
    PopoverArrowDirective,
    PopoverCloseDirective,
    PopoverTitleDirective,
    PopoverDescriptionDirective,
    // PopoverBackdropDirective,  // Optional: for modal popovers
    // PopoverPortalDirective,    // Optional: for rendering in body
  ],
  // ...
})`;

  protected readonly anatomyCode = `<div baseUiPopoverRoot [(open)]="isOpen">
  <!-- Trigger button -->
  <button baseUiPopoverTrigger>Open Popover</button>

  <!-- Positioner (handles placement) -->
  <div baseUiPopoverPositioner>
    <!-- Popup content -->
    <div baseUiPopoverPopup>
      <h3 baseUiPopoverTitle>Popover Title</h3>
      <p baseUiPopoverDescription>Popover description.</p>
      <button baseUiPopoverClose>Close</button>
      <!-- Optional arrow -->
      <div baseUiPopoverArrow></div>
    </div>
  </div>
</div>`;

  protected readonly basicDemoCode = `<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger class="trigger-button">
    Share
  </button>

  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup class="popover">
      <h3 baseUiPopoverTitle>Share this page</h3>
      <div class="share-buttons">
        <button>Copy link</button>
        <button>Email</button>
        <button>Twitter</button>
      </div>
    </div>
  </div>
</div>`;

  protected readonly controlledDemoCode = `<div baseUiPopoverRoot [(open)]="isPopoverOpen">
  <button baseUiPopoverTrigger>
    {{ isPopoverOpen ? 'Close' : 'Open' }} settings
  </button>

  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup class="popover">
      <h3 baseUiPopoverTitle>Settings</h3>
      <p>Configure your preferences</p>
    </div>
  </div>
</div>

<!-- External control -->
<button (click)="isPopoverOpen = !isPopoverOpen">
  Toggle from outside
</button>

<!-- In component class -->
isPopoverOpen = false;`;

  protected readonly positioningDemoCode = `<!-- Bottom (default) -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Bottom</button>
  <div baseUiPopoverPositioner side="bottom">
    <div baseUiPopoverPopup>Below the trigger</div>
  </div>
</div>

<!-- Top with end alignment -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Top End</button>
  <div baseUiPopoverPositioner side="top" align="end">
    <div baseUiPopoverPopup>Above, aligned to end</div>
  </div>
</div>

<!-- Right with custom offset -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Right</button>
  <div baseUiPopoverPositioner side="right" [sideOffset]="16">
    <div baseUiPopoverPopup>16px from trigger</div>
  </div>
</div>`;

  protected readonly arrowDemoCode = `<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>With Arrow</button>

  <div baseUiPopoverPositioner side="top">
    <div baseUiPopoverPopup class="popover">
      <h3 baseUiPopoverTitle>Popover with Arrow</h3>
      <p>The arrow points to the trigger</p>
      <div baseUiPopoverArrow class="popover-arrow"></div>
    </div>
  </div>
</div>

<style>
  .popover {
    position: relative;
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .popover-arrow {
    width: 10px;
    height: 10px;
    background: white;
    border: 1px solid #e5e5e5;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }

  [baseUiPopoverPositioner][data-side="top"] .popover-arrow {
    bottom: -6px;
    transform: rotate(-135deg);
  }
  [baseUiPopoverPositioner][data-side="bottom"] .popover-arrow {
    top: -6px;
    transform: rotate(45deg);
  }
</style>`;

  protected readonly closeButtonDemoCode = `<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Open</button>

  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup class="popover">
      <div class="popover-header">
        <h3 baseUiPopoverTitle>Notifications</h3>
        <button baseUiPopoverClose class="close-button">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>
      <p baseUiPopoverDescription>
        You have 3 unread notifications.
      </p>
    </div>
  </div>
</div>`;

  protected readonly formDemoCode = `<div baseUiPopoverRoot [(open)]="isOpen">
  <button baseUiPopoverTrigger>Add Note</button>

  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup class="popover">
      <h3 baseUiPopoverTitle>Add a note</h3>

      <form (ngSubmit)="saveNote()">
        <textarea
          [(ngModel)]="note"
          name="note"
          placeholder="Type your note..."
          rows="3"
        ></textarea>

        <div class="actions">
          <button type="button" baseUiPopoverClose>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- In component class -->
isOpen = false;
note = '';

saveNote() {
  console.log('Saving note:', this.note);
  this.isOpen = false;
}`;

  protected readonly preventCloseDemoCode = `<!-- Prevent closing on outside click only -->
<div baseUiPopoverRoot [closeOnOutsideClick]="false">
  <button baseUiPopoverTrigger>Click outside won't close</button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup>
      <p>Click outside to test - it won't close!</p>
      <button baseUiPopoverClose>Close manually</button>
    </div>
  </div>
</div>

<!-- Prevent closing on escape key -->
<div baseUiPopoverRoot [closeOnEscape]="false">
  <button baseUiPopoverTrigger>Escape won't close</button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup>
      <p>Press Escape to test - it won't close!</p>
      <button baseUiPopoverClose>Close manually</button>
    </div>
  </div>
</div>

<!-- Prevent all automatic closing -->
<div baseUiPopoverRoot [closeOnOutsideClick]="false" [closeOnEscape]="false">
  <button baseUiPopoverTrigger>Manual close only</button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup>
      <p>Can only close with the button</p>
      <button baseUiPopoverClose>Close</button>
    </div>
  </div>
</div>`;

  protected readonly hoverDemoCode = `<!-- Open on hover with delay -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger [openOnHover]="true" [delay]="200">
    Hover me
  </button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup>
      Opens after 200ms hover!
    </div>
  </div>
</div>

<!-- With close delay (for moving to popover content) -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger [openOnHover]="true" [closeDelay]="150">
    Hover to open
  </button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup>
      Stays open 150ms after mouse leaves trigger
    </div>
  </div>
</div>`;

  protected readonly modalDemoCode = `<!-- Modal popover with focus trap -->
<div baseUiPopoverRoot [modal]="true">
  <button baseUiPopoverTrigger>Open Modal Popover</button>

  <!-- Optional backdrop -->
  <div baseUiPopoverBackdrop class="backdrop"></div>

  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup>
      <h3 baseUiPopoverTitle>Modal Popover</h3>
      <p>Focus is trapped within this popover.</p>
      <p>Tab cycles through focusable elements.</p>
      <button baseUiPopoverClose>Close</button>
    </div>
  </div>
</div>

<!-- Focus trap only (no backdrop blocking) -->
<div baseUiPopoverRoot [modal]="'trap-focus'">
  <button baseUiPopoverTrigger>Focus Trap Only</button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup>
      <p>Focus trapped but no backdrop</p>
      <button baseUiPopoverClose>Close</button>
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
</style>`;

  protected readonly focusDemoCode = `<!-- Focus specific element on open -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Edit Note</button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup [initialFocus]="textareaRef">
      <h3 baseUiPopoverTitle>Edit Note</h3>
      <textarea #textareaRef placeholder="Type here..."></textarea>
      <button baseUiPopoverClose>Done</button>
    </div>
  </div>
</div>

<!-- Focus external element on close -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Open</button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup [finalFocus]="submitButtonRef">
      <p>After closing, focus moves to Submit</p>
      <button baseUiPopoverClose>Close</button>
    </div>
  </div>
</div>
<button #submitButtonRef>Submit</button>

<!-- Using CSS selector for initial focus -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Login</button>
  <div baseUiPopoverPositioner>
    <div baseUiPopoverPopup initialFocus="#username-input">
      <input id="username-input" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button baseUiPopoverClose>Cancel</button>
    </div>
  </div>
</div>`;

  protected readonly portalDemoCode = `<!-- Render popover in document body -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Open Portal Popover</button>

  <ng-template baseUiPopoverPortal>
    <div baseUiPopoverPositioner>
      <div baseUiPopoverPopup>
        <p>Rendered in document.body!</p>
        <p>Useful for overflow:hidden containers.</p>
        <button baseUiPopoverClose>Close</button>
      </div>
    </div>
  </ng-template>
</div>

<!-- Render in specific container -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Custom Container</button>

  <ng-template baseUiPopoverPortal [container]="customContainer">
    <div baseUiPopoverPositioner>
      <div baseUiPopoverPopup>
        Rendered in #modal-container
      </div>
    </div>
  </ng-template>
</div>

<div #customContainer id="modal-container"></div>

<!-- Keep mounted when closed (preserves state) -->
<div baseUiPopoverRoot>
  <button baseUiPopoverTrigger>Form Popover</button>

  <ng-template baseUiPopoverPortal [keepMounted]="true">
    <div baseUiPopoverPositioner>
      <div baseUiPopoverPopup>
        <input [(ngModel)]="formValue" />
        <p>Form state preserved when closed!</p>
      </div>
    </div>
  </ng-template>
</div>`;

  protected readonly stylingCode = `/* Popover positioner */
[baseUiPopoverPositioner] {
  z-index: 100;
}

/* Popover popup */
[baseUiPopoverPopup] {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  max-width: 320px;
}

/* Open animation */
[baseUiPopoverPopup][data-state="open"] {
  animation: popoverIn 0.15s ease;
}

@keyframes popoverIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Title */
[baseUiPopoverTitle] {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

/* Description */
[baseUiPopoverDescription] {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}

/* Close button */
[baseUiPopoverClose] {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #666;
}

[baseUiPopoverClose]:hover {
  color: #000;
}

/* Trigger states */
[baseUiPopoverTrigger][data-state="open"] {
  background: #f0f0f0;
}

/* Arrow styling */
[baseUiPopoverArrow] {
  position: absolute;
  width: 10px;
  height: 10px;
  background: inherit;
  border: inherit;
  transform: rotate(45deg);
}

/* Arrow position by side */
[baseUiPopoverPositioner][data-side="top"] [baseUiPopoverArrow] {
  bottom: -5px;
  border-top: none;
  border-left: none;
}

[baseUiPopoverPositioner][data-side="bottom"] [baseUiPopoverArrow] {
  top: -5px;
  border-bottom: none;
  border-right: none;
}

[baseUiPopoverPositioner][data-side="left"] [baseUiPopoverArrow] {
  right: -5px;
  border-left: none;
  border-bottom: none;
}

[baseUiPopoverPositioner][data-side="right"] [baseUiPopoverArrow] {
  left: -5px;
  border-right: none;
  border-top: none;
}`;

  protected readonly rootInputProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description:
        'The controlled open state of the popover. Supports two-way binding with [(open)].',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'The default open state when uncontrolled.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the popover is disabled.',
    },
    {
      name: 'closeOnOutsideClick',
      type: 'boolean',
      default: 'true',
      description: 'Whether clicking outside the popover closes it.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Whether pressing the Escape key closes the popover.',
    },
    {
      name: 'modal',
      type: "boolean | 'trap-focus'",
      default: 'false',
      description:
        "Whether the popover is modal. Set to true to trap focus and block outside interactions. Set to 'trap-focus' to only trap focus without blocking.",
    },
  ];

  protected readonly rootOutputProps: PropDefinition[] = [
    {
      name: 'openChanged',
      type: 'EventEmitter<PopoverOpenChangeEventDetails>',
      description:
        'Emitted when the open state changes. Includes open boolean and reason (trigger-press, outside-press, escape-key, imperative).',
    },
  ];

  protected readonly positionerInputProps: PropDefinition[] = [
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
      description: 'The preferred side of the trigger to position the popover.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | null",
      default: 'null',
      description: 'The alignment of the popover along the side.',
    },
    {
      name: 'sideOffset',
      type: 'number',
      default: '8',
      description: 'The distance in pixels between the popover and trigger.',
    },
    {
      name: 'alignOffset',
      type: 'number',
      default: '0',
      description: 'The offset along the alignment axis in pixels.',
    },
  ];

  protected readonly stateDataAttributes: PropDefinition[] = [
    {
      name: 'data-state',
      type: '"open" | "closed"',
      description: 'The current state of the popover.',
    },
    {
      name: 'data-open',
      type: 'Present when open',
      description: 'Present when the popover is open (alternative to data-state).',
    },
    {
      name: 'data-closed',
      type: 'Present when closed',
      description: 'Present when the popover is closed (alternative to data-state).',
    },
    {
      name: 'data-popup-open',
      type: 'Present when open',
      description: 'Present on trigger when the associated popup is open.',
    },
    {
      name: 'data-pressed',
      type: 'Present when pressed',
      description: 'Present on trigger while being pressed.',
    },
  ];

  protected readonly positionerDataAttributes: PropDefinition[] = [
    {
      name: 'data-state',
      type: '"open" | "closed"',
      description: 'The current state of the popover.',
    },
    {
      name: 'data-open',
      type: 'Present when open',
      description: 'Present when the popover is open.',
    },
    {
      name: 'data-closed',
      type: 'Present when closed',
      description: 'Present when the popover is closed.',
    },
    {
      name: 'data-side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      description:
        'The actual rendered side (may differ from preferred if flipped).',
    },
    {
      name: 'data-align',
      type: "'start' | 'center' | 'end'",
      description: 'The actual alignment after positioning.',
    },
    {
      name: 'data-anchor-hidden',
      type: 'Present when hidden',
      description: 'Present when the anchor (trigger) is scrolled out of view.',
    },
    {
      name: 'data-uncentered',
      type: 'Present when uncentered',
      description: 'Present on arrow when it cannot be centered.',
    },
  ];

  protected readonly triggerInputProps: PropDefinition[] = [
    {
      name: 'openOnHover',
      type: 'boolean',
      default: 'false',
      description: 'Whether to open the popover on hover instead of click.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '300',
      description: 'The delay in milliseconds before the popover opens on hover.',
    },
    {
      name: 'closeDelay',
      type: 'number',
      default: '0',
      description:
        'The delay in milliseconds before the popover closes on mouse leave. Useful for allowing users to move to the popover content.',
    },
  ];

  protected readonly popupInputProps: PropDefinition[] = [
    {
      name: 'initialFocus',
      type: 'HTMLElement | string | null',
      default: 'null',
      description:
        'Element to focus when the popover opens. Can be an element reference or CSS selector. Defaults to the first focusable element.',
    },
    {
      name: 'finalFocus',
      type: 'HTMLElement | string | null',
      default: 'null',
      description:
        'Element to focus when the popover closes. Defaults to the trigger element.',
    },
  ];

  protected readonly portalInputProps: PropDefinition[] = [
    {
      name: 'container',
      type: 'HTMLElement | null',
      default: 'document.body',
      description: 'The container element to render the portal content into.',
    },
    {
      name: 'keepMounted',
      type: 'boolean',
      default: 'false',
      description:
        'Whether to keep the portal content mounted when the popover is closed. Useful for preserving form state.',
    },
  ];
}

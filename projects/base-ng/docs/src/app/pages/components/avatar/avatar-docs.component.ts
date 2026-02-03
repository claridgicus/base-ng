import { Component } from '@angular/core';
import {
  EditOnGitHubComponent,
  CodeBlockComponent,
  PackageSelectorComponent,
  PropsTableComponent,
  type PropDefinition,
} from '../../../shared';

@Component({
  selector: 'docs-avatar',
  imports: [EditOnGitHubComponent, CodeBlockComponent, PackageSelectorComponent, PropsTableComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Avatar</h1>
        <p class="docs-description">
          Displays a user's profile picture, initials, or fallback icon. The
          Avatar component automatically handles image loading states and shows
          fallback content when the image fails to load.
        </p>
      </header>

      <!-- Installation -->
      <section class="docs-section">
        <h2 class="docs-section-title">Installation</h2>
        <docs-package-selector package="@base-ng/ui" />

        <p class="docs-paragraph">
          Import the Avatar directives from the package:
        </p>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <!-- Anatomy -->
      <section class="docs-section">
        <h2 class="docs-section-title">Anatomy</h2>
        <p class="docs-paragraph">
          The Avatar component uses a composition pattern with three directives:
        </p>
        <docs-code-block [code]="anatomyCode" language="html" />
      </section>

      <!-- Examples -->
      <section class="docs-section">
        <h2 class="docs-section-title">Examples</h2>

        <h3 class="docs-section-subtitle">Basic usage</h3>
        <p class="docs-paragraph">
          Create an avatar with an image and fallback initials.
        </p>
        <docs-code-block [code]="basicDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Fallback only</h3>
        <p class="docs-paragraph">
          Use only the fallback for avatars without images.
        </p>
        <docs-code-block [code]="fallbackOnlyDemoCode" language="html" />

        <h3 class="docs-section-subtitle">With delay</h3>
        <p class="docs-paragraph">
          Use the <code>delay</code> input to prevent a flash of fallback content
          when the image loads quickly.
        </p>
        <docs-code-block [code]="delayDemoCode" language="html" />

        <h3 class="docs-section-subtitle">User list</h3>
        <p class="docs-paragraph">
          Display a list of users with avatars and fallback initials.
        </p>
        <docs-code-block [code]="userListDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Loading status</h3>
        <p class="docs-paragraph">
          Listen to image loading status changes using the
          <code>loadingStatusChange</code> output.
        </p>
        <docs-code-block [code]="statusDemoCode" language="html" />

        <h3 class="docs-section-subtitle">Avatar sizes</h3>
        <p class="docs-paragraph">
          Create different avatar sizes using CSS classes.
        </p>
        <docs-code-block [code]="sizesDemoCode" language="html" />
      </section>

      <!-- Styling -->
      <section class="docs-section">
        <h2 class="docs-section-title">Styling</h2>
        <p class="docs-paragraph">
          The Avatar component is unstyled by default. Style the components
          based on loading status using data attributes:
        </p>
        <docs-code-block [code]="stylingCode" language="css" />

        <h3 class="docs-section-subtitle">Tailwind CSS</h3>
        <p class="docs-paragraph">
          Style the Avatar with Tailwind utilities:
        </p>
        <docs-code-block [code]="tailwindCode" language="html" />
      </section>

      <!-- API Reference -->
      <section class="docs-section">
        <h2 class="docs-section-title">API Reference</h2>
        <docs-props-table title="Root" [props]="rootProps" />
        <docs-props-table title="Image Outputs" [props]="imageOutputProps" />
        <docs-props-table title="Fallback Inputs" [props]="fallbackInputProps" />
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

      <!-- Loading States -->
      <section class="docs-section">
        <h2 class="docs-section-title">Loading states</h2>
        <p class="docs-paragraph">
          The Avatar tracks the image loading lifecycle with these states:
        </p>
        <docs-props-table [props]="loadingStates" />
      </section>

      <!-- Accessibility -->
      <section class="docs-section">
        <h2 class="docs-section-title">Accessibility</h2>
        <p class="docs-paragraph">
          The Avatar component follows accessibility best practices:
        </p>
        <ul class="docs-list">
          <li>Always include <code>alt</code> text on avatar images for screen readers</li>
          <li>Fallback content provides alternative identification when images fail</li>
          <li>
            Consider using <code>aria-hidden="true"</code> on decorative avatars that
            have accompanying text labels
          </li>
          <li>
            For icon-only avatars, ensure the icon conveys meaning or add an
            <code>aria-label</code>
          </li>
        </ul>
      </section>
    

      <footer class="docs-footer">
        <docs-edit-on-github
          path="projects/base-ng/docs/src/app/pages/components/avatar/avatar-docs.component.ts"
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
export class AvatarDocsComponent {
  protected readonly importCode = `import {
  AvatarRootDirective,
  AvatarImageDirective,
  AvatarFallbackDirective,
} from '@base-ng/ui/avatar';

@Component({
  imports: [
    AvatarRootDirective,
    AvatarImageDirective,
    AvatarFallbackDirective,
  ],
  // ...
})`;

  protected readonly anatomyCode = `<span baseUiAvatarRoot>
  <!-- Image that tracks loading status -->
  <img baseUiAvatarImage src="user.jpg" alt="User name" />

  <!-- Fallback shown when image fails or hasn't loaded -->
  <span baseUiAvatarFallback>JD</span>
</span>`;

  protected readonly basicDemoCode = `<span baseUiAvatarRoot class="avatar">
  <img
    baseUiAvatarImage
    src="/avatars/john-doe.jpg"
    alt="John Doe"
  />
  <span baseUiAvatarFallback>JD</span>
</span>`;

  protected readonly fallbackOnlyDemoCode = `<!-- Initials avatar -->
<span baseUiAvatarRoot class="avatar">
  <span baseUiAvatarFallback>JD</span>
</span>

<!-- Icon avatar -->
<span baseUiAvatarRoot class="avatar">
  <span baseUiAvatarFallback>
    <svg><!-- user icon --></svg>
  </span>
</span>`;

  protected readonly delayDemoCode = `<!-- Wait 200ms before showing fallback -->
<span baseUiAvatarRoot class="avatar">
  <img
    baseUiAvatarImage
    src="/avatars/slow-loading.jpg"
    alt="User"
  />
  <span baseUiAvatarFallback [delay]="200">AB</span>
</span>`;

  protected readonly userListDemoCode = `@for (user of users(); track user.id) {
  <div class="user-item">
    <span baseUiAvatarRoot class="avatar">
      <img
        baseUiAvatarImage
        [src]="user.avatar"
        [alt]="user.name"
      />
      <span baseUiAvatarFallback>{{ getInitials(user.name) }}</span>
    </span>
    <span class="user-name">{{ user.name }}</span>
  </div>
}`;

  protected readonly statusDemoCode = `<span baseUiAvatarRoot class="avatar">
  <img
    baseUiAvatarImage
    src="/avatars/user.jpg"
    alt="User"
    (loadingStatusChange)="onStatusChange($event)"
  />
  <span baseUiAvatarFallback>U</span>
</span>

// In component class:
onStatusChange(status: ImageLoadingStatus): void {
  console.log('Avatar image status:', status);
  // 'idle' | 'loading' | 'loaded' | 'error'
}`;

  protected readonly sizesDemoCode = `<!-- Small -->
<span baseUiAvatarRoot class="avatar avatar-sm">
  <img baseUiAvatarImage src="/avatars/user.jpg" alt="User" />
  <span baseUiAvatarFallback>U</span>
</span>

<!-- Medium (default) -->
<span baseUiAvatarRoot class="avatar">
  <img baseUiAvatarImage src="/avatars/user.jpg" alt="User" />
  <span baseUiAvatarFallback>U</span>
</span>

<!-- Large -->
<span baseUiAvatarRoot class="avatar avatar-lg">
  <img baseUiAvatarImage src="/avatars/user.jpg" alt="User" />
  <span baseUiAvatarFallback>U</span>
</span>`;

  protected readonly stylingCode = `/* Avatar container */
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #e5e5e5;
}

/* Avatar image */
.avatar img[baseUiAvatarImage] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hide image when loading or error */
.avatar img[data-image-loading-status="loading"],
.avatar img[data-image-loading-status="error"] {
  display: none;
}

/* Fallback styling */
.avatar [baseUiAvatarFallback] {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  background: #e5e5e5;
}

/* Size variants */
.avatar-sm { width: 32px; height: 32px; font-size: 12px; }
.avatar-lg { width: 56px; height: 56px; font-size: 18px; }`;

  protected readonly tailwindCode = `<span
  baseUiAvatarRoot
  class="relative inline-flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-gray-200"
>
  <img
    baseUiAvatarImage
    src="/avatars/user.jpg"
    alt="User"
    class="w-full h-full object-cover data-[image-loading-status=loading]:hidden data-[image-loading-status=error]:hidden"
  />
  <span
    baseUiAvatarFallback
    class="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600 bg-gray-200"
  >
    JD
  </span>
</span>`;

  protected readonly rootProps: PropDefinition[] = [
    {
      name: 'imageLoadingStatus',
      type: "Signal<'idle' | 'loading' | 'loaded' | 'error'>",
      description: 'Read-only signal exposing the current image loading status.',
    },
    {
      name: 'state',
      type: 'Signal<AvatarState>',
      description: 'Read-only signal exposing the avatar state object.',
    },
  ];

  protected readonly imageOutputProps: PropDefinition[] = [
    {
      name: 'loadingStatusChange',
      type: 'EventEmitter<ImageLoadingStatus>',
      description: 'Emitted when the image loading status changes.',
    },
  ];

  protected readonly fallbackInputProps: PropDefinition[] = [
    {
      name: 'delay',
      type: 'number',
      default: 'undefined',
      description:
        'Milliseconds to wait before showing fallback. Prevents flash of fallback content.',
    },
  ];

  protected readonly dataAttributes: PropDefinition[] = [
    {
      name: 'data-image-loading-status',
      type: "'idle' | 'loading' | 'loaded' | 'error'",
      description: 'Indicates the current image loading status on all parts.',
    },
  ];

  protected readonly cssClasses: PropDefinition[] = [
    {
      name: 'base-ui-avatar',
      type: 'class',
      description: 'Applied to the root element.',
    },
    {
      name: 'base-ui-avatar-idle',
      type: 'class',
      description: 'Applied when no image source is set.',
    },
    {
      name: 'base-ui-avatar-loading',
      type: 'class',
      description: 'Applied while the image is loading.',
    },
    {
      name: 'base-ui-avatar-loaded',
      type: 'class',
      description: 'Applied when the image has loaded successfully.',
    },
    {
      name: 'base-ui-avatar-error',
      type: 'class',
      description: 'Applied when the image failed to load.',
    },
    {
      name: 'base-ui-avatar-image',
      type: 'class',
      description: 'Applied to the image element.',
    },
    {
      name: 'base-ui-avatar-fallback',
      type: 'class',
      description: 'Applied to the fallback element.',
    },
  ];

  protected readonly loadingStates: PropDefinition[] = [
    {
      name: 'idle',
      type: 'state',
      description: 'Initial state before an image source is set.',
    },
    {
      name: 'loading',
      type: 'state',
      description: 'Image is currently loading.',
    },
    {
      name: 'loaded',
      type: 'state',
      description: 'Image has loaded successfully.',
    },
    {
      name: 'error',
      type: 'state',
      description: 'Image failed to load (shows fallback).',
    },
  ];
}

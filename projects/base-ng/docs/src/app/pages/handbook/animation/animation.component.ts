import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../shared';

@Component({
  selector: 'docs-animation',
  imports: [CodeBlockComponent],
  template: `
    <article class="docs-page">
      <header class="docs-header-section">
        <h1 class="docs-title">Animation</h1>
        <p class="docs-description">
          Base NG components support animation through CSS transitions, CSS
          keyframe animations, Angular animations, and JavaScript libraries.
        </p>
      </header>

      <!-- Overview -->
      <section class="docs-section">
        <h2 class="docs-section-title">Overview</h2>
        <p class="docs-paragraph">
          Base NG components expose data attributes that indicate their current
          state, making it easy to animate state changes. Components that show
          and hide content (like Popover, Dialog, and Collapsible) provide
          additional attributes for enter/exit animations.
        </p>
        <p class="docs-paragraph">
          There are three primary approaches to animating Base NG components:
        </p>
        <ul class="docs-list">
          <li><strong>CSS Transitions</strong> - Smooth property changes with automatic cancellation</li>
          <li><strong>CSS Animations</strong> - Keyframe-based animations for complex effects</li>
          <li><strong>Angular Animations</strong> - Programmatic control with TypeScript</li>
        </ul>
      </section>

      <!-- CSS Transitions -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Transitions</h2>
        <p class="docs-paragraph">
          CSS transitions are the simplest approach and are recommended for most
          use cases. They automatically cancel when interrupted, ensuring smooth
          animations even if the user interacts mid-transition.
        </p>
        <p class="docs-paragraph">
          Components expose data attributes to indicate starting and ending states:
        </p>
        <ul class="docs-list">
          <li><code>[data-starting-style]</code> - Applied briefly when entering, defines the "from" state</li>
          <li><code>[data-ending-style]</code> - Applied when exiting, defines the "to" state before removal</li>
          <li><code>[data-open]</code> - Present when the component is visible</li>
          <li><code>[data-closed]</code> - Present when the component is hidden</li>
        </ul>

        <h3 class="docs-section-subtitle">Basic transition example</h3>
        <p class="docs-paragraph">
          Animate a popover with opacity and scale:
        </p>
        <docs-code-block [code]="cssTransitionCode" language="css" />

        <h3 class="docs-section-subtitle">Using starting-style for modern browsers</h3>
        <p class="docs-paragraph">
          Modern browsers support <code>&#64;starting-style</code> for defining
          initial animation states. Base NG components add the
          <code>[data-starting-style]</code> attribute to support older browsers:
        </p>
        <docs-code-block [code]="startingStyleCode" language="css" />
      </section>

      <!-- CSS Animations -->
      <section class="docs-section">
        <h2 class="docs-section-title">CSS Animations</h2>
        <p class="docs-paragraph">
          Use CSS keyframe animations for more complex effects. Apply different
          animations based on <code>[data-open]</code> and <code>[data-closed]</code>
          attributes:
        </p>
        <docs-code-block [code]="cssAnimationCode" language="css" />

        <h3 class="docs-section-subtitle">Animation timing considerations</h3>
        <p class="docs-paragraph">
          Base NG automatically detects when animations complete using the Web
          Animations API. Ensure your exit animations include an opacity change
          (even a small one like <code>0.9999</code> to <code>0</code>) so the
          library can properly detect completion.
        </p>
      </section>

      <!-- Angular Animations -->
      <section class="docs-section">
        <h2 class="docs-section-title">Angular Animations</h2>
        <p class="docs-paragraph">
          For programmatic control, use Angular's animation system. First,
          import <code>BrowserAnimationsModule</code> or
          <code>provideAnimationsAsync()</code> in your app config:
        </p>
        <docs-code-block [code]="angularAnimationsSetup" language="typescript" />

        <h3 class="docs-section-subtitle">Component-level animations</h3>
        <p class="docs-paragraph">
          Define animations in your component using Angular's animation DSL:
        </p>
        <docs-code-block [code]="angularAnimationsComponent" language="typescript" />

        <h3 class="docs-section-subtitle">Using with Collapsible</h3>
        <p class="docs-paragraph">
          Animate height changes for collapsible content:
        </p>
        <docs-code-block [code]="collapsibleAnimationCode" language="typescript" />
      </section>

      <!-- Third-party Libraries -->
      <section class="docs-section">
        <h2 class="docs-section-title">Third-party Libraries</h2>
        <p class="docs-paragraph">
          For advanced animations, you can use libraries like GSAP or
          Animate.css with Base NG components.
        </p>

        <h3 class="docs-section-subtitle">GSAP example</h3>
        <docs-code-block [code]="gsapCode" language="typescript" />

        <h3 class="docs-section-subtitle">Animate.css</h3>
        <p class="docs-paragraph">
          Apply Animate.css classes based on component state:
        </p>
        <docs-code-block [code]="animateCssCode" language="html" />
      </section>

      <!-- Exit Animations -->
      <section class="docs-section">
        <h2 class="docs-section-title">Exit Animations</h2>
        <p class="docs-paragraph">
          Exit animations require special handling because the element needs to
          remain in the DOM until the animation completes. Base NG components
          automatically handle this by:
        </p>
        <ul class="docs-list">
          <li>Applying <code>[data-ending-style]</code> before removal</li>
          <li>Waiting for CSS transitions/animations to complete</li>
          <li>Using <code>element.getAnimations()</code> to detect completion</li>
        </ul>
        <p class="docs-paragraph">
          To ensure proper exit animation detection, your CSS must include an
          opacity change. If your animation doesn't naturally include opacity,
          add a subtle one:
        </p>
        <docs-code-block [code]="exitAnimationCode" language="css" />
      </section>

      <!-- Performance Tips -->
      <section class="docs-section">
        <h2 class="docs-section-title">Performance Tips</h2>
        <ul class="docs-list">
          <li>
            <strong>Use transform and opacity</strong> - These properties are
            GPU-accelerated and don't trigger layout recalculations.
          </li>
          <li>
            <strong>Avoid animating height/width</strong> - Use
            <code>transform: scaleY()</code> or max-height with overflow hidden.
          </li>
          <li>
            <strong>Use will-change sparingly</strong> - Only apply
            <code>will-change</code> to elements that will animate, and remove
            it after animation completes.
          </li>
          <li>
            <strong>Prefer CSS over JavaScript</strong> - CSS animations run on
            the compositor thread and are more performant.
          </li>
          <li>
            <strong>Keep durations short</strong> - 150-300ms is optimal for
            most UI animations.
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
export class AnimationComponent {
  protected readonly cssTransitionCode = `/* Popover popup with fade and scale transition */
[baseUiPopoverPopup] {
  opacity: 1;
  transform: scale(1);
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}

/* Starting state - applied briefly when opening */
[baseUiPopoverPopup][data-starting-style] {
  opacity: 0;
  transform: scale(0.95);
}

/* Ending state - applied before closing */
[baseUiPopoverPopup][data-ending-style] {
  opacity: 0;
  transform: scale(0.95);
}`;

  protected readonly startingStyleCode = `/* Modern browsers with @starting-style support */
[baseUiPopoverPopup] {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 200ms, transform 200ms;

  @starting-style {
    opacity: 0;
    transform: translateY(-8px);
  }
}

/* Exit animation */
[baseUiPopoverPopup][data-ending-style] {
  opacity: 0;
  transform: translateY(-8px);
}`;

  protected readonly cssAnimationCode = `/* Define keyframe animations */
@keyframes fadeScaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeScaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* Apply animations based on state */
[baseUiDialogPopup][data-open] {
  animation: fadeScaleIn 200ms ease-out;
}

[baseUiDialogPopup][data-closed] {
  animation: fadeScaleOut 150ms ease-in;
}

/* Backdrop animations */
[baseUiDialogBackdrop][data-open] {
  animation: fadeIn 200ms ease-out;
}

[baseUiDialogBackdrop][data-closed] {
  animation: fadeOut 150ms ease-in;
}`;

  protected readonly angularAnimationsSetup = `// app.config.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {
  providers: [
    provideAnimationsAsync(),
    // ... other providers
  ]
};`;

  protected readonly angularAnimationsComponent = `import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-animated-dialog',
  template: \`
    <div
      baseUiDialogPopup
      [@dialogAnimation]="isOpen ? 'open' : 'closed'"
    >
      Dialog content
    </div>
  \`,
  animations: [
    trigger('dialogAnimation', [
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.95)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('closed => open', animate('200ms ease-out')),
      transition('open => closed', animate('150ms ease-in'))
    ])
  ]
})
export class AnimatedDialogComponent {
  isOpen = false;
}`;

  protected readonly collapsibleAnimationCode = `import { Component, signal } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-animated-collapsible',
  template: \`
    <div baseUiCollapsibleRoot [(open)]="isExpanded">
      <button baseUiCollapsibleTrigger>
        Toggle content
      </button>
      <div
        baseUiCollapsiblePanel
        [@expandCollapse]="isExpanded() ? 'expanded' : 'collapsed'"
      >
        <div class="content-wrapper">
          Collapsible content goes here.
        </div>
      </div>
    </div>
  \`,
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', animate('250ms ease-in-out'))
    ])
  ]
})
export class AnimatedCollapsibleComponent {
  isExpanded = signal(false);
}`;

  protected readonly gsapCode = `import { Component, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-gsap-popup',
  template: \`
    <div #popup baseUiPopoverPopup>
      Popup content
    </div>
  \`
})
export class GsapPopupComponent {
  private readonly popup = viewChild<ElementRef>('popup');

  constructor() {
    afterNextRender(() => {
      // Initial hidden state
      gsap.set(this.popup()?.nativeElement, {
        opacity: 0,
        scale: 0.95,
        y: -10
      });
    });
  }

  animateIn(): void {
    gsap.to(this.popup()?.nativeElement, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.out'
    });
  }

  animateOut(): void {
    gsap.to(this.popup()?.nativeElement, {
      opacity: 0,
      scale: 0.95,
      y: -10,
      duration: 0.15,
      ease: 'power2.in'
    });
  }
}`;

  protected readonly animateCssCode = `<div
  baseUiPopoverPopup
  [ngClass]="{
    'animate__animated': true,
    'animate__fadeIn': isOpen,
    'animate__fadeOut': !isOpen,
    'animate__faster': true
  }"
>
  Popup content
</div>`;

  protected readonly exitAnimationCode = `/* For animations without natural opacity change,
   add a subtle one for detection */
@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 0.9999; /* Subtle but detectable */
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

[baseUiDialogPopup][data-closed] {
  animation: slideOut 200ms ease-in forwards;
}`;
}

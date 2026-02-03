import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'overview/quick-start', pathMatch: 'full' },
  {
    path: 'overview',
        children: [
          {
            path: 'quick-start',
            loadComponent: () =>
              import('./pages/overview/quick-start/quick-start.component').then(
                (m) => m.QuickStartComponent
              ),
            data: {
              seo: {
                title: 'Quick Start',
                description: 'Get started with Base UI for Angular in minutes. Learn how to install, configure, and use unstyled, accessible UI components in your Angular applications.',
                keywords: 'angular, ui components, quick start, installation, setup, base ui',
              },
            },
          },
          {
            path: 'accessibility',
            loadComponent: () =>
              import(
                './pages/overview/accessibility/accessibility.component'
              ).then((m) => m.AccessibilityComponent),
            data: {
              seo: {
                title: 'Accessibility',
                description: 'Learn how Base UI for Angular components implement WAI-ARIA guidelines, keyboard navigation, and screen reader support for accessible web applications.',
                keywords: 'accessibility, a11y, WAI-ARIA, keyboard navigation, screen reader, angular',
              },
            },
          },
          {
            path: 'releases',
            loadComponent: () =>
              import('./pages/overview/releases/releases.component').then(
                (m) => m.ReleasesComponent
              ),
            data: {
              seo: {
                title: 'Releases',
                description: 'View the changelog and release history for Base UI for Angular. Stay updated with new features, bug fixes, and breaking changes.',
                keywords: 'releases, changelog, version history, updates, angular',
              },
            },
          },
          {
            path: 'about',
            loadComponent: () =>
              import('./pages/overview/about/about.component').then(
                (m) => m.AboutComponent
              ),
            data: {
              seo: {
                title: 'About',
                description: 'Learn about Base UI for Angular - an unofficial port of MUI Base UI providing unstyled, accessible components for Angular applications.',
                keywords: 'about, base ui, angular, unstyled components, mui',
              },
            },
          },
        ],
      },
      {
        path: 'handbook',
        children: [
          {
            path: 'styling',
            loadComponent: () =>
              import('./pages/handbook/styling/styling.component').then(
                (m) => m.StylingComponent
              ),
            data: {
              seo: {
                title: 'Styling',
                description: 'Learn how to style Base UI for Angular components using CSS, Tailwind CSS, or any styling solution. Complete control over component appearance.',
                keywords: 'styling, css, tailwind, scss, theming, angular components',
              },
            },
          },
          {
            path: 'animation',
            loadComponent: () =>
              import('./pages/handbook/animation/animation.component').then(
                (m) => m.AnimationComponent
              ),
            data: {
              seo: {
                title: 'Animation',
                description: 'Add smooth animations to Base UI for Angular components using CSS transitions, Angular animations, or animation libraries.',
                keywords: 'animation, transitions, motion, angular animations, css animations',
              },
            },
          },
          {
            path: 'composition',
            loadComponent: () =>
              import('./pages/handbook/composition/composition.component').then(
                (m) => m.CompositionComponent
              ),
            data: {
              seo: {
                title: 'Composition',
                description: 'Learn the composition patterns used in Base UI for Angular. Build complex UIs by composing simple, reusable component parts.',
                keywords: 'composition, component patterns, directives, angular architecture',
              },
            },
          },
          {
            path: 'customization',
            loadComponent: () =>
              import(
                './pages/handbook/customization/customization.component'
              ).then((m) => m.CustomizationComponent),
            data: {
              seo: {
                title: 'Customization',
                description: 'Customize Base UI for Angular components to match your design system. Override default behaviors and extend component functionality.',
                keywords: 'customization, theming, design system, component customization',
              },
            },
          },
          {
            path: 'forms',
            loadComponent: () =>
              import('./pages/handbook/forms/forms.component').then(
                (m) => m.FormsComponent
              ),
            data: {
              seo: {
                title: 'Forms',
                description: 'Build accessible forms with Base UI for Angular. Integration with Angular forms, validation, and form state management.',
                keywords: 'forms, angular forms, validation, form controls, reactive forms',
              },
            },
          },
          {
            path: 'typescript',
            loadComponent: () =>
              import('./pages/handbook/typescript/typescript.component').then(
                (m) => m.TypeScriptComponent
              ),
            data: {
              seo: {
                title: 'TypeScript',
                description: 'TypeScript integration guide for Base UI for Angular. Type definitions, generic components, and type-safe development.',
                keywords: 'typescript, types, generics, type safety, angular typescript',
              },
            },
          },
          {
            path: 'llms-txt',
            loadComponent: () =>
              import('./pages/handbook/llms-txt/llms-txt.component').then(
                (m) => m.LlmsTxtComponent
              ),
            data: {
              seo: {
                title: 'llms.txt',
                description: 'AI-friendly documentation for Base UI for Angular. Learn about the llms.txt standard for machine-readable documentation.',
                keywords: 'llms.txt, ai, machine learning, documentation, llm',
              },
            },
          },
        ],
      },
      {
        path: 'components',
        children: [
          {
            path: 'accordion',
            loadComponent: () =>
              import(
                './pages/components/accordion/accordion-docs.component'
              ).then((m) => m.AccordionDocsComponent),
            data: {
              seo: {
                title: 'Accordion',
                description: 'Accordion component for Angular. Expandable panels that show and hide content with accessible keyboard navigation.',
                keywords: 'accordion, expandable, collapsible, panels, angular component',
              },
            },
          },
          {
            path: 'alert-dialog',
            loadComponent: () =>
              import(
                './pages/components/alert-dialog/alert-dialog-docs.component'
              ).then((m) => m.AlertDialogDocsComponent),
            data: {
              seo: {
                title: 'Alert Dialog',
                description: 'Alert Dialog component for Angular. Modal dialogs for important alerts that require user acknowledgment.',
                keywords: 'alert dialog, modal, confirmation, angular component, accessible',
              },
            },
          },
          {
            path: 'autocomplete',
            loadComponent: () =>
              import(
                './pages/components/autocomplete/autocomplete-docs.component'
              ).then((m) => m.AutocompleteDocsComponent),
            data: {
              seo: {
                title: 'Autocomplete',
                description: 'Autocomplete component for Angular. Text input with suggestions dropdown for search and filtering.',
                keywords: 'autocomplete, typeahead, search, suggestions, angular component',
              },
            },
          },
          {
            path: 'avatar',
            loadComponent: () =>
              import('./pages/components/avatar/avatar-docs.component').then(
                (m) => m.AvatarDocsComponent
              ),
            data: {
              seo: {
                title: 'Avatar',
                description: 'Avatar component for Angular. Display user profile images with fallback support for initials or icons.',
                keywords: 'avatar, profile image, user image, angular component',
              },
            },
          },
          {
            path: 'button',
            loadComponent: () =>
              import('./pages/components/button/button-docs.component').then(
                (m) => m.ButtonDocsComponent
              ),
            data: {
              seo: {
                title: 'Button',
                description: 'Button component for Angular. Accessible, focusable buttons with support for disabled states and custom styling.',
                keywords: 'button, click, action, angular component, accessible',
              },
            },
          },
          {
            path: 'checkbox',
            loadComponent: () =>
              import(
                './pages/components/checkbox/checkbox-docs.component'
              ).then((m) => m.CheckboxDocsComponent),
            data: {
              seo: {
                title: 'Checkbox',
                description: 'Checkbox component for Angular. Accessible checkbox input with indeterminate state support.',
                keywords: 'checkbox, input, form control, angular component, accessible',
              },
            },
          },
          {
            path: 'checkbox-group',
            loadComponent: () =>
              import(
                './pages/components/checkbox-group/checkbox-group-docs.component'
              ).then((m) => m.CheckboxGroupDocsComponent),
            data: {
              seo: {
                title: 'Checkbox Group',
                description: 'Checkbox Group component for Angular. Group multiple checkboxes with shared state management.',
                keywords: 'checkbox group, multiple selection, form control, angular component',
              },
            },
          },
          {
            path: 'collapsible',
            loadComponent: () =>
              import(
                './pages/components/collapsible/collapsible-docs.component'
              ).then((m) => m.CollapsibleDocsComponent),
            data: {
              seo: {
                title: 'Collapsible',
                description: 'Collapsible component for Angular. Show and hide content with smooth expand/collapse animations.',
                keywords: 'collapsible, expandable, toggle content, angular component',
              },
            },
          },
          {
            path: 'combobox',
            loadComponent: () =>
              import(
                './pages/components/combobox/combobox-docs.component'
              ).then((m) => m.ComboboxDocsComponent),
            data: {
              seo: {
                title: 'Combobox',
                description: 'Combobox component for Angular. Filterable dropdown with text input for searching and selecting options.',
                keywords: 'combobox, dropdown, filterable select, angular component, accessible',
              },
            },
          },
          {
            path: 'context-menu',
            loadComponent: () =>
              import(
                './pages/components/context-menu/context-menu-docs.component'
              ).then((m) => m.ContextMenuDocsComponent),
            data: {
              seo: {
                title: 'Context Menu',
                description: 'Context Menu component for Angular. Right-click menus with keyboard navigation and nested submenus.',
                keywords: 'context menu, right click, popup menu, angular component',
              },
            },
          },
          {
            path: 'dialog',
            loadComponent: () =>
              import('./pages/components/dialog/dialog-docs.component').then(
                (m) => m.DialogDocsComponent
              ),
            data: {
              seo: {
                title: 'Dialog',
                description: 'Dialog component for Angular. Modal windows with focus trapping, backdrop, and accessible keyboard navigation.',
                keywords: 'dialog, modal, popup, overlay, angular component, accessible',
              },
            },
          },
          {
            path: 'field',
            loadComponent: () =>
              import('./pages/components/field/field-docs.component').then(
                (m) => m.FieldDocsComponent
              ),
            data: {
              seo: {
                title: 'Field',
                description: 'Field component for Angular. Form field wrapper with label, description, and error message support.',
                keywords: 'field, form field, label, validation, angular component',
              },
            },
          },
          {
            path: 'fieldset',
            loadComponent: () =>
              import(
                './pages/components/fieldset/fieldset-docs.component'
              ).then((m) => m.FieldsetDocsComponent),
            data: {
              seo: {
                title: 'Fieldset',
                description: 'Fieldset component for Angular. Group related form controls with a legend for accessibility.',
                keywords: 'fieldset, form group, legend, angular component, accessible',
              },
            },
          },
          {
            path: 'form',
            loadComponent: () =>
              import('./pages/components/form/form-docs.component').then(
                (m) => m.FormDocsComponent
              ),
            data: {
              seo: {
                title: 'Form',
                description: 'Form component for Angular. Form wrapper with validation state management and submission handling.',
                keywords: 'form, validation, submit, angular component, reactive forms',
              },
            },
          },
          {
            path: 'input',
            loadComponent: () =>
              import('./pages/components/input/input-docs.component').then(
                (m) => m.InputDocsComponent
              ),
            data: {
              seo: {
                title: 'Input',
                description: 'Input component for Angular. Accessible text input with validation states and form integration.',
                keywords: 'input, text field, form control, angular component, accessible',
              },
            },
          },
          {
            path: 'menu',
            loadComponent: () =>
              import('./pages/components/menu/menu-docs.component').then(
                (m) => m.MenuDocsComponent
              ),
            data: {
              seo: {
                title: 'Menu',
                description: 'Menu component for Angular. Dropdown menus with keyboard navigation, submenus, and checkbox items.',
                keywords: 'menu, dropdown, navigation, angular component, accessible',
              },
            },
          },
          {
            path: 'menubar',
            loadComponent: () =>
              import('./pages/components/menubar/menubar-docs.component').then(
                (m) => m.MenubarDocsComponent
              ),
            data: {
              seo: {
                title: 'Menubar',
                description: 'Menubar component for Angular. Horizontal menu bar with dropdown menus for application navigation.',
                keywords: 'menubar, navigation bar, horizontal menu, angular component',
              },
            },
          },
          {
            path: 'meter',
            loadComponent: () =>
              import('./pages/components/meter/meter-docs.component').then(
                (m) => m.MeterDocsComponent
              ),
            data: {
              seo: {
                title: 'Meter',
                description: 'Meter component for Angular. Display a scalar measurement within a known range, like disk usage.',
                keywords: 'meter, gauge, measurement, progress, angular component',
              },
            },
          },
          {
            path: 'navigation-menu',
            loadComponent: () =>
              import(
                './pages/components/navigation-menu/navigation-menu-docs.component'
              ).then((m) => m.NavigationMenuDocsComponent),
            data: {
              seo: {
                title: 'Navigation Menu',
                description: 'Navigation Menu component for Angular. Site navigation with dropdown panels for links and content.',
                keywords: 'navigation menu, nav, site navigation, angular component',
              },
            },
          },
          {
            path: 'number-field',
            loadComponent: () =>
              import(
                './pages/components/number-field/number-field-docs.component'
              ).then((m) => m.NumberFieldDocsComponent),
            data: {
              seo: {
                title: 'Number Field',
                description: 'Number Field component for Angular. Numeric input with increment/decrement controls and validation.',
                keywords: 'number field, numeric input, spinner, angular component',
              },
            },
          },
          {
            path: 'popover',
            loadComponent: () =>
              import('./pages/components/popover/popover-docs.component').then(
                (m) => m.PopoverDocsComponent
              ),
            data: {
              seo: {
                title: 'Popover',
                description: 'Popover component for Angular. Floating panels anchored to a trigger element with smart positioning.',
                keywords: 'popover, popup, floating panel, angular component',
              },
            },
          },
          {
            path: 'preview-card',
            loadComponent: () =>
              import(
                './pages/components/preview-card/preview-card-docs.component'
              ).then((m) => m.PreviewCardDocsComponent),
            data: {
              seo: {
                title: 'Preview Card',
                description: 'Preview Card component for Angular. Link previews that appear on hover with rich content display.',
                keywords: 'preview card, link preview, hover card, angular component',
              },
            },
          },
          {
            path: 'progress',
            loadComponent: () =>
              import(
                './pages/components/progress/progress-docs.component'
              ).then((m) => m.ProgressDocsComponent),
            data: {
              seo: {
                title: 'Progress',
                description: 'Progress component for Angular. Display task completion progress with determinate and indeterminate modes.',
                keywords: 'progress, progress bar, loading, angular component, accessible',
              },
            },
          },
          {
            path: 'radio',
            loadComponent: () =>
              import('./pages/components/radio/radio-docs.component').then(
                (m) => m.RadioDocsComponent
              ),
            data: {
              seo: {
                title: 'Radio',
                description: 'Radio component for Angular. Radio button input for single selection from a group of options.',
                keywords: 'radio, radio button, form control, angular component',
              },
            },
          },
          {
            path: 'radio-group',
            loadComponent: () =>
              import(
                './pages/components/radio-group/radio-group-docs.component'
              ).then((m) => m.RadioGroupDocsComponent),
            data: {
              seo: {
                title: 'Radio Group',
                description: 'Radio Group component for Angular. Group radio buttons with shared state and keyboard navigation.',
                keywords: 'radio group, option group, form control, angular component',
              },
            },
          },
          {
            path: 'scroll-area',
            loadComponent: () =>
              import(
                './pages/components/scroll-area/scroll-area-docs.component'
              ).then((m) => m.ScrollAreaDocsComponent),
            data: {
              seo: {
                title: 'Scroll Area',
                description: 'Scroll Area component for Angular. Custom scrollbars with cross-platform consistency.',
                keywords: 'scroll area, scrollbar, custom scrollbar, angular component',
              },
            },
          },
          {
            path: 'select',
            loadComponent: () =>
              import('./pages/components/select/select-docs.component').then(
                (m) => m.SelectDocsComponent
              ),
            data: {
              seo: {
                title: 'Select',
                description: 'Select component for Angular. Dropdown for choosing a value from a list with keyboard navigation.',
                keywords: 'select, dropdown, picker, form control, angular component',
              },
            },
          },
          {
            path: 'separator',
            loadComponent: () =>
              import(
                './pages/components/separator/separator-docs.component'
              ).then((m) => m.SeparatorDocsComponent),
            data: {
              seo: {
                title: 'Separator',
                description: 'Separator component for Angular. Visual divider for separating content sections.',
                keywords: 'separator, divider, hr, angular component',
              },
            },
          },
          {
            path: 'slider',
            loadComponent: () =>
              import('./pages/components/slider/slider-docs.component').then(
                (m) => m.SliderDocsComponent
              ),
            data: {
              seo: {
                title: 'Slider',
                description: 'Slider component for Angular. Range input for selecting numeric values with keyboard and touch support.',
                keywords: 'slider, range, input range, angular component, accessible',
              },
            },
          },
          {
            path: 'switch',
            loadComponent: () =>
              import('./pages/components/switch/switch-docs.component').then(
                (m) => m.SwitchDocsComponent
              ),
            data: {
              seo: {
                title: 'Switch',
                description: 'Switch component for Angular. Toggle control for binary on/off states with accessible labeling.',
                keywords: 'switch, toggle, on off, angular component, accessible',
              },
            },
          },
          {
            path: 'tabs',
            loadComponent: () =>
              import('./pages/components/tabs/tabs-docs.component').then(
                (m) => m.TabsDocsComponent
              ),
            data: {
              seo: {
                title: 'Tabs',
                description: 'Tabs component for Angular. Organize content into tabbed panels with keyboard navigation.',
                keywords: 'tabs, tab panel, tabbed interface, angular component, accessible',
              },
            },
          },
          {
            path: 'toast',
            loadComponent: () =>
              import('./pages/components/toast/toast-docs.component').then(
                (m) => m.ToastDocsComponent
              ),
            data: {
              seo: {
                title: 'Toast',
                description: 'Toast component for Angular. Non-blocking notifications that appear temporarily with auto-dismiss.',
                keywords: 'toast, notification, snackbar, alert, angular component',
              },
            },
          },
          {
            path: 'toggle',
            loadComponent: () =>
              import('./pages/components/toggle/toggle-docs.component').then(
                (m) => m.ToggleDocsComponent
              ),
            data: {
              seo: {
                title: 'Toggle',
                description: 'Toggle component for Angular. Button that can be toggled between pressed and unpressed states.',
                keywords: 'toggle, toggle button, pressed, angular component',
              },
            },
          },
          {
            path: 'toggle-group',
            loadComponent: () =>
              import(
                './pages/components/toggle-group/toggle-group-docs.component'
              ).then((m) => m.ToggleGroupDocsComponent),
            data: {
              seo: {
                title: 'Toggle Group',
                description: 'Toggle Group component for Angular. Group toggle buttons for single or multiple selection.',
                keywords: 'toggle group, button group, selection, angular component',
              },
            },
          },
          {
            path: 'toolbar',
            loadComponent: () =>
              import('./pages/components/toolbar/toolbar-docs.component').then(
                (m) => m.ToolbarDocsComponent
              ),
            data: {
              seo: {
                title: 'Toolbar',
                description: 'Toolbar component for Angular. Container for grouping action buttons and controls.',
                keywords: 'toolbar, action bar, button bar, angular component',
              },
            },
          },
          {
            path: 'tooltip',
            loadComponent: () =>
              import('./pages/components/tooltip/tooltip-docs.component').then(
                (m) => m.TooltipDocsComponent
              ),
            data: {
              seo: {
                title: 'Tooltip',
                description: 'Tooltip component for Angular. Contextual information displayed on hover or focus.',
                keywords: 'tooltip, hint, help text, angular component, accessible',
              },
            },
          },
        ],
      },
      {
        path: 'utils',
        children: [
          {
            path: 'csp-provider',
            loadComponent: () =>
              import(
                './pages/utils/csp-provider/csp-provider-docs.component'
              ).then((m) => m.CspProviderDocsComponent),
            data: {
              seo: {
                title: 'CSP Provider',
                description: 'CSP Provider utility for Base UI Angular. Configure Content Security Policy nonce for inline styles.',
                keywords: 'csp, content security policy, nonce, security, angular',
              },
            },
          },
          {
            path: 'direction-provider',
            loadComponent: () =>
              import(
                './pages/utils/direction-provider/direction-provider-docs.component'
              ).then((m) => m.DirectionProviderDocsComponent),
            data: {
              seo: {
                title: 'Direction Provider',
                description: 'Direction Provider utility for Base UI Angular. Support for RTL (right-to-left) text direction.',
                keywords: 'direction, rtl, ltr, internationalization, i18n, angular',
              },
            },
          },
          {
            path: 'merge-props',
            loadComponent: () =>
              import(
                './pages/utils/merge-props/merge-props-docs.component'
              ).then((m) => m.MergePropsDocsComponent),
            data: {
              seo: {
                title: 'mergeProps',
                description: 'mergeProps utility function for Base UI Angular. Combine multiple props objects with proper event handler merging.',
                keywords: 'merge props, utility, props, event handlers, angular',
              },
            },
          },
          {
            path: 'use-render',
            loadComponent: () =>
              import(
                './pages/utils/use-render/use-render-docs.component'
              ).then((m) => m.UseRenderDocsComponent),
            data: {
              seo: {
                title: 'useRender',
                description: 'useRender directive for Base UI Angular. Custom rendering support for component composition.',
                keywords: 'use render, render props, custom rendering, angular directive',
              },
            },
          },
        ],
      },
  { path: '**', redirectTo: 'overview/quick-start' },
];

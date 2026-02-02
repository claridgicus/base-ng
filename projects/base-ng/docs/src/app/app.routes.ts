import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'angular/overview/quick-start', pathMatch: 'full' },
  {
    path: 'angular',
    children: [
      {
        path: 'overview',
        children: [
          {
            path: 'quick-start',
            loadComponent: () =>
              import('./pages/overview/quick-start/quick-start.component').then(
                (m) => m.QuickStartComponent
              ),
          },
          {
            path: 'accessibility',
            loadComponent: () =>
              import(
                './pages/overview/accessibility/accessibility.component'
              ).then((m) => m.AccessibilityComponent),
          },
          {
            path: 'releases',
            loadComponent: () =>
              import('./pages/overview/releases/releases.component').then(
                (m) => m.ReleasesComponent
              ),
          },
          {
            path: 'about',
            loadComponent: () =>
              import('./pages/overview/about/about.component').then(
                (m) => m.AboutComponent
              ),
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
          },
          {
            path: 'animation',
            loadComponent: () =>
              import('./pages/handbook/animation/animation.component').then(
                (m) => m.AnimationComponent
              ),
          },
          {
            path: 'composition',
            loadComponent: () =>
              import('./pages/handbook/composition/composition.component').then(
                (m) => m.CompositionComponent
              ),
          },
          {
            path: 'customization',
            loadComponent: () =>
              import(
                './pages/handbook/customization/customization.component'
              ).then((m) => m.CustomizationComponent),
          },
          {
            path: 'forms',
            loadComponent: () =>
              import('./pages/handbook/forms/forms.component').then(
                (m) => m.FormsComponent
              ),
          },
          {
            path: 'typescript',
            loadComponent: () =>
              import('./pages/handbook/typescript/typescript.component').then(
                (m) => m.TypeScriptComponent
              ),
          },
          {
            path: 'llms-txt',
            loadComponent: () =>
              import('./pages/handbook/llms-txt/llms-txt.component').then(
                (m) => m.LlmsTxtComponent
              ),
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
          },
          {
            path: 'alert-dialog',
            loadComponent: () =>
              import(
                './pages/components/alert-dialog/alert-dialog-docs.component'
              ).then((m) => m.AlertDialogDocsComponent),
          },
          {
            path: 'autocomplete',
            loadComponent: () =>
              import(
                './pages/components/autocomplete/autocomplete-docs.component'
              ).then((m) => m.AutocompleteDocsComponent),
          },
          {
            path: 'avatar',
            loadComponent: () =>
              import('./pages/components/avatar/avatar-docs.component').then(
                (m) => m.AvatarDocsComponent
              ),
          },
          {
            path: 'button',
            loadComponent: () =>
              import('./pages/components/button/button-docs.component').then(
                (m) => m.ButtonDocsComponent
              ),
          },
          {
            path: 'checkbox',
            loadComponent: () =>
              import(
                './pages/components/checkbox/checkbox-docs.component'
              ).then((m) => m.CheckboxDocsComponent),
          },
          {
            path: 'checkbox-group',
            loadComponent: () =>
              import(
                './pages/components/checkbox-group/checkbox-group-docs.component'
              ).then((m) => m.CheckboxGroupDocsComponent),
          },
          {
            path: 'collapsible',
            loadComponent: () =>
              import(
                './pages/components/collapsible/collapsible-docs.component'
              ).then((m) => m.CollapsibleDocsComponent),
          },
          {
            path: 'combobox',
            loadComponent: () =>
              import(
                './pages/components/combobox/combobox-docs.component'
              ).then((m) => m.ComboboxDocsComponent),
          },
          {
            path: 'context-menu',
            loadComponent: () =>
              import(
                './pages/components/context-menu/context-menu-docs.component'
              ).then((m) => m.ContextMenuDocsComponent),
          },
          {
            path: 'dialog',
            loadComponent: () =>
              import('./pages/components/dialog/dialog-docs.component').then(
                (m) => m.DialogDocsComponent
              ),
          },
          {
            path: 'field',
            loadComponent: () =>
              import('./pages/components/field/field-docs.component').then(
                (m) => m.FieldDocsComponent
              ),
          },
          {
            path: 'fieldset',
            loadComponent: () =>
              import(
                './pages/components/fieldset/fieldset-docs.component'
              ).then((m) => m.FieldsetDocsComponent),
          },
          {
            path: 'form',
            loadComponent: () =>
              import('./pages/components/form/form-docs.component').then(
                (m) => m.FormDocsComponent
              ),
          },
          {
            path: 'input',
            loadComponent: () =>
              import('./pages/components/input/input-docs.component').then(
                (m) => m.InputDocsComponent
              ),
          },
          {
            path: 'menu',
            loadComponent: () =>
              import('./pages/components/menu/menu-docs.component').then(
                (m) => m.MenuDocsComponent
              ),
          },
          {
            path: 'menubar',
            loadComponent: () =>
              import('./pages/components/menubar/menubar-docs.component').then(
                (m) => m.MenubarDocsComponent
              ),
          },
          {
            path: 'meter',
            loadComponent: () =>
              import('./pages/components/meter/meter-docs.component').then(
                (m) => m.MeterDocsComponent
              ),
          },
          {
            path: 'navigation-menu',
            loadComponent: () =>
              import(
                './pages/components/navigation-menu/navigation-menu-docs.component'
              ).then((m) => m.NavigationMenuDocsComponent),
          },
          {
            path: 'number-field',
            loadComponent: () =>
              import(
                './pages/components/number-field/number-field-docs.component'
              ).then((m) => m.NumberFieldDocsComponent),
          },
          {
            path: 'popover',
            loadComponent: () =>
              import('./pages/components/popover/popover-docs.component').then(
                (m) => m.PopoverDocsComponent
              ),
          },
          {
            path: 'preview-card',
            loadComponent: () =>
              import(
                './pages/components/preview-card/preview-card-docs.component'
              ).then((m) => m.PreviewCardDocsComponent),
          },
          {
            path: 'progress',
            loadComponent: () =>
              import(
                './pages/components/progress/progress-docs.component'
              ).then((m) => m.ProgressDocsComponent),
          },
          {
            path: 'radio',
            loadComponent: () =>
              import('./pages/components/radio/radio-docs.component').then(
                (m) => m.RadioDocsComponent
              ),
          },
          {
            path: 'radio-group',
            loadComponent: () =>
              import(
                './pages/components/radio-group/radio-group-docs.component'
              ).then((m) => m.RadioGroupDocsComponent),
          },
          {
            path: 'scroll-area',
            loadComponent: () =>
              import(
                './pages/components/scroll-area/scroll-area-docs.component'
              ).then((m) => m.ScrollAreaDocsComponent),
          },
          {
            path: 'select',
            loadComponent: () =>
              import('./pages/components/select/select-docs.component').then(
                (m) => m.SelectDocsComponent
              ),
          },
          {
            path: 'separator',
            loadComponent: () =>
              import(
                './pages/components/separator/separator-docs.component'
              ).then((m) => m.SeparatorDocsComponent),
          },
          {
            path: 'slider',
            loadComponent: () =>
              import('./pages/components/slider/slider-docs.component').then(
                (m) => m.SliderDocsComponent
              ),
          },
          {
            path: 'switch',
            loadComponent: () =>
              import('./pages/components/switch/switch-docs.component').then(
                (m) => m.SwitchDocsComponent
              ),
          },
          {
            path: 'tabs',
            loadComponent: () =>
              import('./pages/components/tabs/tabs-docs.component').then(
                (m) => m.TabsDocsComponent
              ),
          },
          {
            path: 'toast',
            loadComponent: () =>
              import('./pages/components/toast/toast-docs.component').then(
                (m) => m.ToastDocsComponent
              ),
          },
          {
            path: 'toggle',
            loadComponent: () =>
              import('./pages/components/toggle/toggle-docs.component').then(
                (m) => m.ToggleDocsComponent
              ),
          },
          {
            path: 'toggle-group',
            loadComponent: () =>
              import(
                './pages/components/toggle-group/toggle-group-docs.component'
              ).then((m) => m.ToggleGroupDocsComponent),
          },
          {
            path: 'toolbar',
            loadComponent: () =>
              import('./pages/components/toolbar/toolbar-docs.component').then(
                (m) => m.ToolbarDocsComponent
              ),
          },
          {
            path: 'tooltip',
            loadComponent: () =>
              import('./pages/components/tooltip/tooltip-docs.component').then(
                (m) => m.TooltipDocsComponent
              ),
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
          },
          {
            path: 'direction-provider',
            loadComponent: () =>
              import(
                './pages/utils/direction-provider/direction-provider-docs.component'
              ).then((m) => m.DirectionProviderDocsComponent),
          },
          {
            path: 'merge-props',
            loadComponent: () =>
              import(
                './pages/utils/merge-props/merge-props-docs.component'
              ).then((m) => m.MergePropsDocsComponent),
          },
          {
            path: 'use-render',
            loadComponent: () =>
              import(
                './pages/utils/use-render/use-render-docs.component'
              ).then((m) => m.UseRenderDocsComponent),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'angular/overview/quick-start' },
];

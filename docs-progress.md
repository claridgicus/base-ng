# Base UI Angular Documentation Site - Progress Tracker

> Building an Angular documentation site mirroring [Base UI Docs](https://base-ui.com/)
> Source structure: https://github.com/mui/base-ui/tree/master/docs/src

---

## Phase 1: Infrastructure

| #   | Task                                                      | Status | Notes                         |
| --- | --------------------------------------------------------- | ------ | ----------------------------- |
| 1   | Generate Angular application `@base-ng/docs`              | [x]    | `ng generate application`     |
| 2   | Configure routing with lazy loading                       | [x]    | Match Base UI URL structure   |
| 3   | Set up SSR for SEO                                        | [x]    | Already in angular.json       |
| 4   | Configure Tailwind CSS                                    | [x]    | Using plain SCSS for now      |
| 5   | Set up syntax highlighting (Shiki or Prism)               | [x]    | Shiki installed               |

---

## Phase 2: Layout & Navigation

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 6   | Create root layout with header, sidebar, main      | [x]    | `app/layout.tsx`              |
| 7   | Build header component (logo, search, nav links)   | [x]    | `components/Header`           |
| 8   | Build sidebar navigation component                 | [x]    | `components/Sidebar`          |
| 9   | Build table of contents component                  | [x]    | `components/TableOfContents`  |
| 10  | Build mobile navigation (hamburger menu)           | [x]    | Responsive design             |
| 11  | Implement search functionality (Cmd+K)             | [x]    | `components/Search`           |

---

## Phase 3: Documentation Components

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 12  | Create code block component with copy button       | [x]    | `components/CodeBlock`        |
| 13  | Create live demo component with code toggle        | [x]    | `components/Demo`             |
| 14  | Create API reference table component               | [x]    | `components/ApiReference`     |
| 15  | Create props table component                       | [x]    | `components/PropsTable`       |
| 16  | Create example variant selector (CSS/Tailwind)     | [x]    | Variant switcher              |
| 17  | Create package manager selector (npm/yarn/pnpm)    | [x]    | Install command variants      |
| 18  | Create "Open in StackBlitz" integration            | [x]    | External link button          |

---

## Phase 4: Overview Pages

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 19  | Create Quick Start page                            | [x]    | `overview/quick-start`        |
| 20  | Create Accessibility page                          | [x]    | `overview/accessibility`      |
| 21  | Create Releases/Changelog page                     | [x]    | `overview/releases`           |
| 22  | Create About page                                  | [x]    | `overview/about`              |

---

## Phase 5: Handbook Pages

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 23  | Create Styling guide page                          | [x]    | `handbook/styling`            |
| 24  | Create Animation guide page                        | [x]    | `handbook/animation`          |
| 25  | Create Composition guide page                      | [x]    | `handbook/composition`        |
| 26  | Create Customization guide page                    | [x]    | `handbook/customization`      |
| 27  | Create Forms guide page                            | [x]    | `handbook/forms`              |
| 28  | Create TypeScript guide page                       | [x]    | `handbook/typescript`         |
| 29  | Create llms.txt page (AI-friendly docs)            | [x]    | `handbook/llms-txt`           |

---

## Phase 6: Component Documentation - Simple

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 30  | Document Button component                          | [x]    | `components/button`           |
| 31  | Document Separator component                       | [x]    | `components/separator`        |
| 32  | Document Progress component                        | [x]    | `components/progress`         |
| 33  | Document Meter component                           | [x]    | `components/meter`            |
| 34  | Document Switch component                          | [x]    | `components/switch`           |
| 35  | Document Toggle component                          | [x]    | `components/toggle`           |
| 36  | Document Toggle Group component                    | [x]    | `components/toggle-group`     |
| 37  | Document Avatar component                          | [x]    | `components/avatar`           |
| 38  | Document Input component                           | [x]    | `components/input`            |

---

## Phase 7: Component Documentation - Forms

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 39  | Document Field component                           | [x]    | `components/field`            |
| 40  | Document Fieldset component                        | [x]    | `components/fieldset`         |
| 41  | Document Checkbox component                        | [x]    | `components/checkbox`         |
| 42  | Document Checkbox Group component                  | [x]    | `components/checkbox-group`   |
| 43  | Document Radio component                           | [x]    | `components/radio`            |
| 44  | Document Radio Group component                     | [x]    | `components/radio-group`      |
| 45  | Document Slider component                          | [x]    | `components/slider`           |
| 46  | Document Number Field component                    | [x]    | `components/number-field`     |
| 47  | Document Form component                            | [x]    | `components/form`             |

---

## Phase 8: Component Documentation - Disclosure

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 48  | Document Collapsible component                     | [x]    | `components/collapsible`      |
| 49  | Document Accordion component                       | [x]    | `components/accordion`        |
| 50  | Document Tabs component                            | [x]    | `components/tabs`             |

---

## Phase 9: Component Documentation - Overlays

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 51  | Document Tooltip component                         | [x]    | `components/tooltip`          |
| 52  | Document Popover component                         | [x]    | `components/popover`          |
| 53  | Document Preview Card component                    | [x]    | `components/preview-card`     |
| 54  | Document Dialog component                          | [x]    | `components/dialog`           |
| 55  | Document Alert Dialog component                    | [x]    | `components/alert-dialog`     |

---

## Phase 10: Component Documentation - Menus

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 56  | Document Menu component                            | [x]    | `components/menu`             |
| 57  | Document Context Menu component                    | [x]    | `components/context-menu`     |
| 58  | Document Menubar component                         | [x]    | `components/menubar`          |
| 59  | Document Navigation Menu component                 | [x]    | `components/navigation-menu`  |
| 60  | Document Toolbar component                         | [x]    | `components/toolbar`          |

---

## Phase 11: Component Documentation - Selection

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 61  | Document Select component                          | [x]    | `components/select`           |
| 62  | Document Combobox component                        | [x]    | `components/combobox`         |
| 63  | Document Autocomplete component                    | [x]    | `components/autocomplete`     |
| 64  | Document Scroll Area component                     | [x]    | `components/scroll-area`      |

---

## Phase 12: Component Documentation - Notification

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 65  | Document Toast component                           | [x]    | `components/toast`            |

---

## Phase 13: Utils Documentation

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 66  | Document CSP Provider                              | [x]    | `utils/csp-provider`          |
| 67  | Document Direction Provider                        | [x]    | `utils/direction-provider`    |
| 68  | Document mergeProps utility                        | [x]    | `utils/merge-props`           |
| 69  | Document useRender directive                       | [x]    | `utils/use-render`            |

---

## Phase 14: Finalization

| #   | Task                                               | Status | Source Reference              |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 70  | Add version badge and changelog integration        | [x]    | Links to releases page        |
| 71  | Add GitHub edit links to each page                 | [x]    | -                             |
| 72  | Generate llms.txt for AI assistants                | [x]    | -                             |
| 73  | Add SEO metadata to all pages                      | [x]    | SeoService + route data       |
| 74  | Run accessibility audit                            | [x]    | Skip link, focus styles, a11y |
| 75  | Deploy to production                               | [x]    | GH Pages, Vercel, Netlify cfg |

---

## Phase 15: CRITICAL - Live Demos & Cleanup (MANDATORY)

> **⚠️ BLOCKING:** The documentation is NOT complete until these tasks are done.
> Live preview demos MUST render actual `@base-ng/ui` components, not just code blocks.

| #   | Task                                               | Status | Notes                         |
| --- | -------------------------------------------------- | ------ | ----------------------------- |
| 76  | Fix Button docs - add live interactive demo        | [x]    | Use `<docs-demo>` with actual component |
| 77  | Fix Separator docs - add live interactive demo     | [x]    | Use `<docs-demo>` with actual component |
| 78  | Fix Progress docs - add live interactive demo      | [x]    | Use `<docs-demo>` with actual component |
| 79  | Fix Meter docs - add live interactive demo         | [x]    | Use `<docs-demo>` with actual component |
| 80  | Fix Switch docs - add live interactive demo        | [x]    | Use `<docs-demo>` with actual component |
| 81  | Fix Toggle docs - add live interactive demo        | [x]    | Use `<docs-demo>` with actual component |
| 82  | Fix Toggle Group docs - add live interactive demo  | [x]    | Use `<docs-demo>` with actual component |
| 83  | Fix Avatar docs - add live interactive demo        | [x]    | Use `<docs-demo>` with actual component |
| 84  | Fix Input docs - add live interactive demo         | [ ]    | Use `<docs-demo>` with actual component |
| 85  | Fix Field docs - add live interactive demo         | [ ]    | Use `<docs-demo>` with actual component |
| 86  | Fix Fieldset docs - add live interactive demo      | [ ]    | Use `<docs-demo>` with actual component |
| 87  | Fix Checkbox docs - add live interactive demo      | [ ]    | Use `<docs-demo>` with actual component |
| 88  | Fix Checkbox Group docs - add live interactive demo| [ ]    | Use `<docs-demo>` with actual component |
| 89  | Fix Radio docs - add live interactive demo         | [ ]    | Use `<docs-demo>` with actual component |
| 90  | Fix Radio Group docs - add live interactive demo   | [ ]    | Use `<docs-demo>` with actual component |
| 91  | Fix Slider docs - add live interactive demo        | [ ]    | Use `<docs-demo>` with actual component |
| 92  | Fix Number Field docs - add live interactive demo  | [ ]    | Use `<docs-demo>` with actual component |
| 93  | Fix Form docs - add live interactive demo          | [ ]    | Use `<docs-demo>` with actual component |
| 94  | Fix Collapsible docs - add live interactive demo   | [ ]    | Use `<docs-demo>` with actual component |
| 95  | Fix Accordion docs - add live interactive demo     | [ ]    | Use `<docs-demo>` with actual component |
| 96  | Fix Tabs docs - add live interactive demo          | [ ]    | Use `<docs-demo>` with actual component |
| 97  | Fix Tooltip docs - add live interactive demo       | [ ]    | Use `<docs-demo>` with actual component |
| 98  | Fix Popover docs - add live interactive demo       | [ ]    | Use `<docs-demo>` with actual component |
| 99  | Fix Preview Card docs - add live interactive demo  | [ ]    | Use `<docs-demo>` with actual component |
| 100 | Fix Dialog docs - add live interactive demo        | [ ]    | Use `<docs-demo>` with actual component |
| 101 | Fix Alert Dialog docs - add live interactive demo  | [ ]    | Use `<docs-demo>` with actual component |
| 102 | Fix Menu docs - add live interactive demo          | [ ]    | Use `<docs-demo>` with actual component |
| 103 | Fix Context Menu docs - add live interactive demo  | [ ]    | Use `<docs-demo>` with actual component |
| 104 | Fix Menubar docs - add live interactive demo       | [ ]    | Use `<docs-demo>` with actual component |
| 105 | Fix Navigation Menu docs - add live interactive demo| [ ]   | Use `<docs-demo>` with actual component |
| 106 | Fix Toolbar docs - add live interactive demo       | [ ]    | Use `<docs-demo>` with actual component |
| 107 | Fix Select docs - add live interactive demo        | [ ]    | Use `<docs-demo>` with actual component |
| 108 | Fix Combobox docs - add live interactive demo      | [ ]    | Use `<docs-demo>` with actual component |
| 109 | Fix Autocomplete docs - add live interactive demo  | [ ]    | Use `<docs-demo>` with actual component |
| 110 | Fix Scroll Area docs - add live interactive demo   | [ ]    | Use `<docs-demo>` with actual component |
| 111 | Fix Toast docs - add live interactive demo         | [ ]    | Use `<docs-demo>` with actual component |
| 112 | Remove redundant Installation sections from all component pages | [ ] | Keep only on Quick Start |

---

## Documentation Page Structure

Each component page should include:

```
1. Title + Description
2. Live Demo (interactive, with code toggle)
3. Installation snippet
4. Anatomy (minimal code structure)
5. Examples (feature-specific demos)
6. API Reference
   - Props table for each sub-component
   - State attributes (data-* attributes)
   - CSS variables
7. Accessibility notes
```

---

## URL Structure

```
/angular/overview/quick-start
/angular/overview/accessibility
/angular/overview/releases
/angular/overview/about
/angular/handbook/styling
/angular/handbook/animation
/angular/handbook/composition
/angular/handbook/customization
/angular/handbook/forms
/angular/handbook/typescript
/angular/components/accordion
/angular/components/alert-dialog
/angular/components/autocomplete
... (all components)
/angular/utils/csp-provider
/angular/utils/direction-provider
/angular/utils/merge-props
/angular/utils/use-render
```

---

## Progress Summary

- **Total Tasks:** 112
- **Completed:** 83
- **In Progress:** 0
- **Remaining:** 29 (Phase 15 - CRITICAL)

---

## Notes

- Use `@base-ng/ui` components in all demos
- Match Base UI styling conventions
- Support both CSS Modules and Tailwind examples
- Ensure all code examples are copy-pasteable
- Mobile-first responsive design

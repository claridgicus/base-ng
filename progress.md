# Base UI Angular Port - Progress Tracker

> Porting [Base UI](https://base-ui.com/) React components to Angular 21
> Source: https://github.com/mui/base-ui/tree/master/packages/react/src

## File Header Convention

Every file must include a reference to the original React source:

```typescript
/**
 * @fileoverview Angular port of Base UI [Component] component
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/[component]/[File].tsx
 */
```

---

## Phase 1: Infrastructure

| #   | Task                                                                | Status | Source Reference |
| --- | ------------------------------------------------------------------- | ------ | ---------------- |
| 1   | Set up Angular library project structure with `ng generate library` | [x]    | -                |
| 2   | Configure testing with Vitest for Angular library                   | [x]    | -                |

---

## Phase 2: Core Utilities & Providers

| #   | Task                                             | Status | Source Reference                |
| --- | ------------------------------------------------ | ------ | ------------------------------- |
| 3   | Create shared types module                       | [x]    | `src/types/`                    |
| 4   | Create utils module                              | [x]    | `src/utils/`                    |
| 5   | Create merge-props utility                       | [x]    | `src/merge-props/`              |
| 6   | Create use-render directive/service              | [x]    | `src/use-render/`               |
| 7   | Create floating-ui integration service           | [x]    | `src/floating-ui-react/`        |
| 8   | Port csp-provider as Angular service             | [x]    | `src/csp-provider/`             |
| 9   | Port direction-provider as Angular service       | [x]    | `src/direction-provider/`       |
| 10  | Port labelable-provider as Angular service       | [x]    | `src/labelable-provider/`       |
| 11  | Port use-button hook as Angular directive        | [x]    | `src/use-button/`               |
| 12  | Port unstable-use-media-query as Angular service | [x]    | `src/unstable-use-media-query/` |

---

## Phase 3: Simple Components

| #   | Task                        | Status | Source Reference    |
| --- | --------------------------- | ------ | ------------------- |
| 13  | Port composite component    | [x]    | `src/composite/`    |
| 14  | Port button component       | [x]    | `src/button/`       |
| 15  | Port separator component    | [x]    | `src/separator/`    |
| 16  | Port progress component     | [x]    | `src/progress/`     |
| 17  | Port meter component        | [x]    | `src/meter/`        |
| 18  | Port switch component       | [x]    | `src/switch/`       |
| 19  | Port toggle component       | [x]    | `src/toggle/`       |
| 20  | Port toggle-group component | [x]    | `src/toggle-group/` |
| 21  | Port avatar component       | [x]    | `src/avatar/`       |
| 22  | Port input component        | [x]    | `src/input/`        |

---

## Phase 4: Form Components

| #   | Task                          | Status | Source Reference      |
| --- | ----------------------------- | ------ | --------------------- |
| 23  | Port field component          | [x]    | `src/field/`          |
| 24  | Port fieldset component       | [x]    | `src/fieldset/`       |
| 25  | Port checkbox component       | [x]    | `src/checkbox/`       |
| 26  | Port checkbox-group component | [x]    | `src/checkbox-group/` |
| 27  | Port radio component          | [x]    | `src/radio/`          |
| 28  | Port radio-group component    | [x]    | `src/radio-group/`    |
| 29  | Port slider component         | [x]    | `src/slider/`         |
| 30  | Port number-field component   | [x]    | `src/number-field/`   |
| 31  | Port form component           | [x]    | `src/form/`           |

---

## Phase 5: Disclosure Components

| #   | Task                       | Status | Source Reference   |
| --- | -------------------------- | ------ | ------------------ |
| 32  | Port collapsible component | [x]    | `src/collapsible/` |
| 33  | Port accordion component   | [x]    | `src/accordion/`   |
| 34  | Port tabs component        | [x]    | `src/tabs/`        |

---

## Phase 6: Overlay Components

| #   | Task                        | Status | Source Reference    |
| --- | --------------------------- | ------ | ------------------- |
| 35  | Port tooltip component      | [x]    | `src/tooltip/`      |
| 36  | Port popover component      | [x]    | `src/popover/`      |
| 37  | Port preview-card component | [x]    | `src/preview-card/` |
| 38  | Port dialog component       | [x]    | `src/dialog/`       |
| 39  | Port alert-dialog component | [x]    | `src/alert-dialog/` |

---

## Phase 7: Menu Components

| #   | Task                           | Status | Source Reference       |
| --- | ------------------------------ | ------ | ---------------------- |
| 40  | Port menu component            | [x]    | `src/menu/`            |
| 41  | Port context-menu component    | [ ]    | `src/context-menu/`    |
| 42  | Port menubar component         | [ ]    | `src/menubar/`         |
| 43  | Port navigation-menu component | [ ]    | `src/navigation-menu/` |
| 44  | Port toolbar component         | [ ]    | `src/toolbar/`         |

---

## Phase 8: Complex Selection Components

| #   | Task                        | Status | Source Reference    |
| --- | --------------------------- | ------ | ------------------- |
| 45  | Port select component       | [ ]    | `src/select/`       |
| 46  | Port combobox component     | [ ]    | `src/combobox/`     |
| 47  | Port autocomplete component | [ ]    | `src/autocomplete/` |
| 48  | Port scroll-area component  | [ ]    | `src/scroll-area/`  |

---

## Phase 9: Notification

| #   | Task                 | Status | Source Reference |
| --- | -------------------- | ------ | ---------------- |
| 49  | Port toast component | [ ]    | `src/toast/`     |

---

## Phase 10: Finalization

| #   | Task                                    | Status | Source Reference |
| --- | --------------------------------------- | ------ | ---------------- |
| 50  | Create public API exports and module    | [ ]    | `src/index.ts`   |
| 51  | Write comprehensive integration tests   | [ ]    | -                |
| 52  | Create documentation and usage examples | [ ]    | -                |

---

## Testing Scripts

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific component tests
npm run test -- --filter=button
```

---

## Component Architecture Pattern

Each component follows this structure:

```
projects/base-ng/src/lib/[component]/
├── index.ts                    # Public exports
├── [component].ts              # Main component
├── [component].spec.ts         # Unit tests
├── [component]-root.ts         # Root directive (if compound)
├── [component]-[part].ts       # Sub-components (if compound)
└── [component].types.ts        # TypeScript interfaces
```

### Angular-Specific Adaptations

| React Pattern       | Angular Equivalent            |
| ------------------- | ----------------------------- |
| `useState`          | Signals (`signal()`)          |
| `useEffect`         | `effect()` or lifecycle hooks |
| `useContext`        | Dependency Injection          |
| `useRef`            | `viewChild()` / `ElementRef`  |
| `forwardRef`        | Native element access via DI  |
| Custom hooks        | Services or Directives        |
| Render props        | `ng-template` + `TemplateRef` |
| Compound components | Directive composition         |

---

## Progress Summary

- **Total Tasks:** 52
- **Completed:** 40
- **In Progress:** 0
- **Remaining:** 12

---

## Notes

- All components use Angular 21 signals for state management
- Components are standalone (no NgModules required)
- Full accessibility (a11y) support matching Base UI
- SSR compatible with Angular Universal

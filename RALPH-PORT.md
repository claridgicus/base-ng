# Base UI Angular Port - Ralph Loop Prompt

You are porting the Base UI React library to Angular 21.

## Source Repository
https://github.com/mui/base-ui/tree/master/packages/react/src

## Your Task

1. **Read `progress.md`** to see current status
2. **Find the next uncompleted task** (first `[ ]` checkbox)
3. **Fetch the React source** from GitHub for that component
4. **Port it to Angular 21** following the patterns below
5. **Write tests** for the component
6. **Run tests** to verify they pass
7. **Update `progress.md`** - change `[ ]` to `[x]` for completed task
8. **Commit your work** with a descriptive message

## File Header Convention

EVERY file must start with:

```typescript
/**
 * @fileoverview Angular port of Base UI [Component]
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/[component]/[File].tsx
 */
```

## Angular Patterns to Use

| React | Angular 21 |
|-------|------------|
| `useState` | `signal()` |
| `useEffect` | `effect()` |
| `useContext` | `inject()` with injection tokens |
| `useRef` | `viewChild()` / `ElementRef` |
| `useMemo` | `computed()` |
| `useCallback` | Regular methods (signals handle reactivity) |
| Custom hooks | Services or Directives |
| Render props | `ng-template` + `TemplateRef` |
| `forwardRef` | Host element access |
| Compound components | Directive composition with DI |

## Component Structure

```
projects/base-ng/src/lib/[component]/
├── index.ts                    # Public exports
├── [component].ts              # Main component/directive
├── [component].spec.ts         # Unit tests
└── [component].types.ts        # TypeScript interfaces (if needed)
```

## Quality Requirements

- Use standalone components (no NgModules)
- Use signals for all reactive state
- Maintain full accessibility (ARIA attributes, keyboard navigation)
- Support SSR (no direct DOM access outside afterNextRender)
- Write comprehensive tests with Vitest
- Match the Base UI API as closely as possible

## Completion Signal

When ALL 52 tasks in progress.md are marked `[x]`, output:

<promise>BASE-UI-PORT-COMPLETE</promise>

If you cannot complete a task due to a blocker, document it in progress.md under a "## Blockers" section and move to the next task.

## Current Iteration

Check git log to see what was done in previous iterations. Build upon that work.

Now read progress.md and continue porting the next component.

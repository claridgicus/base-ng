# Update From Remote

Synchronize `@base-ng/ui` components and documentation with the latest Base UI React reference.

## Arguments

- `$ARGUMENTS` - Optional component name (e.g., `button`, `dialog`, `accordion`)

If a component name is provided, only process that single component through both loops (one iteration each), then run tests and push.

If no argument is provided, run the full loops until completion.

## Workflow

Execute the following steps in order:

### Step 1: Component Parity Verification (Ralph Loop)

Start the component ralph loop to verify and update components against the remote Base UI repository:

**If `$ARGUMENTS` is provided (single component mode):**
1. Process ONLY the specified component `$ARGUMENTS`
2. Fetch React source from `https://github.com/mui/base-ui/tree/master/packages/react/src/$ARGUMENTS`
3. Fetch React docs from `https://base-ui.com/react/components/$ARGUMENTS`
4. Compare visual and behavioral parity
5. Update component implementation if needed
6. Enhance specs with required test categories
7. Mark progress in `component-parity-progress.md`
8. Stop after this one component (do NOT continue loop)

**If no argument (full loop mode):**
1. Invoke `/ralph-loop:ralph-loop` with the component parity prompt
2. For each component in `component-parity-progress.md`:
   - Fetch the React source from `https://github.com/mui/base-ui`
   - Compare visual and behavioral parity
   - Update component implementation if needed
   - Enhance specs with required test categories
   - Mark progress in `component-parity-progress.md`
3. Continue until `<promise>COMPONENT-PARITY-VERIFIED</promise>` or blocked

### Step 2: Documentation Site Verification (Ralph Loop)

Start the docs ralph loop to update documentation:

**If `$ARGUMENTS` is provided (single component mode):**
1. Process ONLY the documentation for `$ARGUMENTS`
2. Fetch reference from `https://base-ui.com/react/components/$ARGUMENTS`
3. Update the documentation page at `projects/base-ng/docs/src/app/pages/components/$ARGUMENTS/`
4. Ensure live demos work with the updated component
5. Mark progress in `docs-progress.md` for this component only
6. Stop after this one component (do NOT continue loop)

**If no argument (full loop mode):**
1. Invoke `/ralph-loop:ralph-loop` with the docs site prompt
2. For each task in `docs-progress.md`:
   - Fetch reference docs from `https://base-ui.com/`
   - Update documentation pages
   - Ensure live demos work with updated components
   - Mark progress in `docs-progress.md`
3. Continue until `<promise>BASE-UI-DOCS-COMPLETE</promise>` or blocked

### Step 3: Run All Tests

```bash
npx ng test @base-ng/ui --no-watch
npx ng test @base-ng/docs --no-watch
```

All tests must pass before proceeding.

### Step 4: Build Verification

```bash
npx ng build @base-ng/ui
npx ng build @base-ng/docs
```

Ensure both projects build successfully.

### Step 5: Commit and Push

1. Stage all changes: `git add -A`
2. Create a commit summarizing all updates:
   ```
   feat: sync components and docs with Base UI [date]

   - Updated components for parity with React Base UI
   - Enhanced component specs
   - Updated documentation site
   ```
3. Push to remote: `git push`

## Completion

Report summary of:
- Components updated (or single component `$ARGUMENTS` if specified)
- Specs enhanced
- Documentation pages updated
- Test results
- Push status

## Examples

```bash
# Full sync - all components
/update-from-remote

# Single component only
/update-from-remote button
/update-from-remote dialog
/update-from-remote accordion
```

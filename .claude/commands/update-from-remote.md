# Update From Remote

Synchronize `@base-ng/ui` components and documentation with the latest Base UI React reference.

## Workflow

Execute the following steps in order:

### Step 1: Component Parity Verification (Ralph Loop)

Start the component ralph loop to verify and update components against the remote Base UI repository:

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
- Components updated
- Specs enhanced
- Documentation pages updated
- Test results
- Push status

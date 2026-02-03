# Visual Parity Report: accordion

Generated: 2026-02-03T22:49:53.422Z

## Summary

| Metric | Value |
|--------|-------|
| Component | accordion |
| States Compared | 3 |
| Passed | 2 |
| Failed | 1 |
| Skipped | 0 |

## Overall Verdict

❌ **FAIL** - Visual differences detected

## Detailed Results

| State | Status | React | Angular | Pixel Diff | Details |
|-------|--------|-------|---------|------------|---------|
| default | ✅ PASS | 400x300 | 400x300 | 10.99% | 10.99% pixel difference (within threshold) |
| hover | ✅ PASS | 400x300 | 400x300 | 10.68% | 10.68% pixel difference (within threshold) |
| focused | ❌ FAIL | 400x300 | 400x300 | 15.05% | 15.05% pixel difference (exceeds 12% threshold) |

## Files

### React Screenshots
- Location: `.claude/screenshots/react/accordion/`

### Angular Screenshots
- Location: `.claude/screenshots/angular/accordion/`

### Diff Images
- Location: `.claude/screenshots/diff/accordion/`
- `accordion-default-diff.png` - Red pixels indicate differences
- `accordion-hover-diff.png` - Red pixels indicate differences
- `accordion-focused-diff.png` - Red pixels indicate differences

## Next Steps


### Remediation Required


#### focused State
- Issue: 15.05% pixel difference (exceeds 12% threshold)
- Fix: Review the diff image and adjust Tailwind classes to match React styling


### Manual Review Checklist
- [ ] Compare screenshots side-by-side
- [ ] Check Tailwind classes match React demo
- [ ] Verify CSS custom properties are set correctly
- [ ] Check data attribute selectors for state styling
- [ ] Re-run comparison after fixes


# TODO

## GitHub Actions Setup

### Automated Issue Investigation

The workflow `.github/workflows/investigate-issue.yml` automatically investigates component issues when the `investigate` label is added.

**Setup required:**

1. Add `ANTHROPIC_API_KEY` secret to the repository:
   - Go to **Settings → Secrets and variables → Actions**
   - Click **New repository secret**
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key

2. Create the `investigate` label in GitHub Issues (if it doesn't exist)

**Usage:**
- When an issue mentions a component problem, add the `investigate` label
- Claude Code will run tests and post findings as a comment

---

### NPM Publishing

The workflow `.github/workflows/publish-npm.yml` handles automated releases via semantic-release.

**Setup required:**

1. Add `NPM_TOKEN` secret to the repository:
   - Go to **Settings → Secrets and variables → Actions**
   - Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: Your npm access token (create at npmjs.com → Access Tokens)

2. Ensure the `copied` npm organization exists and you have publish access

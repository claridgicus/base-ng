module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature (minor release)
        'fix',      // Bug fix (patch release)
        'docs',     // Documentation only
        'style',    // Code style (formatting, etc)
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf',     // Performance improvement
        'test',     // Adding or updating tests
        'build',    // Build system or external dependencies
        'ci',       // CI configuration
        'chore',    // Other changes that don't modify src or test files
        'revert'    // Reverts a previous commit
      ]
    ],
    'scope-enum': [
      1,
      'always',
      [
        'ui',
        'docs',
        'release',
        'deps',
        'ci'
      ]
    ]
  }
};

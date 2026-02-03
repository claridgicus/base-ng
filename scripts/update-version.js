#!/usr/bin/env node

/**
 * Updates version in library package.json and version.ts
 * Called by semantic-release during prepare phase
 */

const fs = require('fs');
const path = require('path');

const version = process.argv[2];

if (!version) {
  console.error('Version argument required');
  process.exit(1);
}

const LIBRARY_PACKAGE_PATH = path.join(__dirname, '../projects/base-ng/ui/package.json');
const VERSION_TS_PATH = path.join(__dirname, '../projects/base-ng/ui/src/lib/version.ts');

// Update library package.json
const libPackage = JSON.parse(fs.readFileSync(LIBRARY_PACKAGE_PATH, 'utf8'));
libPackage.version = version;
fs.writeFileSync(LIBRARY_PACKAGE_PATH, JSON.stringify(libPackage, null, 2) + '\n');
console.log(`Updated ${LIBRARY_PACKAGE_PATH} to v${version}`);

// Update version.ts if it exists
if (fs.existsSync(VERSION_TS_PATH)) {
  fs.writeFileSync(VERSION_TS_PATH, `export const VERSION = '${version}';\n`);
  console.log(`Updated ${VERSION_TS_PATH} to v${version}`);
}

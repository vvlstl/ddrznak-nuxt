import {existsSync, readdirSync, statSync} from 'node:fs';
import {join} from 'node:path';

const LOG_LEVEL = process.env.LOG_LEVEL || 'INFO';
const outputDir = '.output/public';

const log = {
  DEBUG: (msg) => LOG_LEVEL === 'DEBUG' && console.debug(`[DEBUG] ${msg}`),
  INFO: (msg) => console.info(`[INFO] ${msg}`),
  ERROR: (msg) => console.error(`[ERROR] ${msg}`),
};

function dirExists(path) {
  return existsSync(path) && statSync(path).isDirectory();
}

function fileExists(path) {
  return existsSync(path) && statSync(path).isFile();
}

function dirNotEmpty(path) {
  try {
    const items = readdirSync(path);
    return items.length > 0;
  } catch {
    return false;
  }
}

const checks = [
  {
    name: '.nojekyll exists',
    check: () => fileExists(join(outputDir, '.nojekyll')),
    error: '.nojekyll missing — GitHub Pages deploy will fail',
  },
  {
    name: '_nuxt/ directory exists',
    check: () => dirExists(join(outputDir, '_nuxt')),
    error: '_nuxt/ directory missing — build output is incomplete',
  },
  {
    name: '_nuxt/ not empty',
    check: () => dirNotEmpty(join(outputDir, '_nuxt')),
    error: '_nuxt/ directory is empty',
  },
  {
    name: 'public/ directory exists',
    check: () => dirExists(outputDir),
    error: 'public output directory missing',
  },
];

log.INFO('Starting build verification...');
log.DEBUG(`Output directory: ${outputDir}`);

let allPassed = true;

for (const { name, check, error } of checks) {
  log.DEBUG(`Checking: ${name}`);
  const passed = check();
  if (passed) {
    log.DEBUG(`  ✓ ${name}`);
  } else {
    log.ERROR(`  ✗ ${name}`);
    log.ERROR(`  ${error}`);
    allPassed = false;
  }
}

log.INFO(`Build verification: ${allPassed ? 'PASSED' : 'FAILED'}`);

if (!allPassed) {
  process.exit(1);
}
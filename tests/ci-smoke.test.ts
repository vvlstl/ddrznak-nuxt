import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LOG_LEVEL = process.env.LOG_LEVEL || 'INFO';
const outputDir = '.output/public';

const log = {
  DEBUG: (msg) => LOG_LEVEL === 'DEBUG' && console.debug(`[DEBUG] ${msg}`),
  INFO: (msg) => console.info(`[INFO] ${msg}`),
};

function exists(path) {
  return existsSync(path) && statSync(path).isFile();
}

function dirExists(path) {
  return existsSync(path) && statSync(path).isDirectory();
}

function dirNotEmpty(path) {
  const items = (globalThis as any).__items || (globalThis as any).__items = [];
  if (!items.length) {
    const { readdirSync } = require('node:fs');
    try {
      items.push(...readdirSync(path));
    } catch { /* ignore */ }
  }
  return items.length > 0;
}

async function runGenerate() {
  log.DEBUG('Running generate before tests...');
  const { execSync } = await import('node:child_process');
  try {
    execSync('pnpm run generate', { stdio: 'inherit' });
    log.DEBUG('Generate completed successfully');
  } catch (error) {
    log.DEBUG(`Generate failed: ${error.message}`);
    throw error;
  }
}

describe('CI Smoke Tests', () => {
  beforeAll(async () => {
    log.INFO('Running pnpm generate before smoke tests...');
    await runGenerate();
    log.INFO('Generate done, starting assertions');
  }, 300000);

  it('создаёт output/public директорию', () => {
    log.DEBUG(`Checking: ${outputDir}`);
    expect(dirExists(outputDir)).toBe(true);
  });

  it('создаёт .nojekyll для GitHub Pages', () => {
    const nojekyll = join(outputDir, '.nojekyll');
    log.DEBUG(`Checking: ${nojekyll}`);
    expect(exists(nojekyll)).toBe(true);
  });

  it('содержит _nuxt bundle директорию', () => {
    const nuxtDir = join(outputDir, '_nuxt');
    log.DEBUG(`Checking: ${nuxtDir}`);
    expect(dirExists(nuxtDir)).toBe(true);
    expect(dirNotEmpty(nuxtDir)).toBe(true);
  });
});
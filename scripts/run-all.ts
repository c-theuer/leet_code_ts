// Run every problem file (or those matching an optional filter) and summarize.
// Usage: npm test [-- <filter>]

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const dir = path.join(__dirname, '..', 'problems');
const filter = process.argv[2] ?? '';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && f.includes(filter)).sort();

const failed = files.filter((f) => {
  const { status } = spawnSync(process.execPath, ['--import', 'tsx', path.join(dir, f)], {
    stdio: 'inherit',
  });
  return status !== 0;
});

console.log(`${files.length - failed.length}/${files.length} problem files passed`);
if (failed.length) {
  console.log(`Failed: ${failed.join(', ')}`);
  process.exitCode = 1;
}

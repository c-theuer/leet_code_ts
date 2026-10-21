// Scaffold a new problem file.
// Usage: npm run new -- <number> <title words...>
//   e.g. npm run new -- 15 3Sum   ->  problems/0015-3sum.ts

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [num, ...words] = process.argv.slice(2);
if (!num || !words.length || Number.isNaN(Number(num))) {
  console.error('Usage: npm run new -- <number> <title words...>');
  process.exit(1);
}

const title = words.join(' ');
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fnName = slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()).replace(/^\d/, '_$&');
const file = path.join(__dirname, '..', 'problems', `${num.padStart(4, '0')}-${slug}.ts`);

if (fs.existsSync(file)) {
  console.error(`Already exists: ${path.relative(process.cwd(), file)}`);
  process.exit(1);
}

fs.writeFileSync(
  file,
  `// ${num}. ${title}
// https://leetcode.com/problems/${slug}/

import { run } from '../lib/runner';

// Paste the LeetCode TypeScript starter code here, replacing the function below.
function ${fnName}(): unknown {
  return undefined;
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(${fnName}, [
    // { input: [arg1, arg2], expected: answer },
    { input: [], expected: 'TODO' },
  ]);
}
`,
);

console.log(`Created ${path.relative(process.cwd(), file)}`);
try {
  execFileSync('code', [file], { stdio: 'ignore' });
} catch {
  // VS Code CLI not on PATH; that's fine.
}

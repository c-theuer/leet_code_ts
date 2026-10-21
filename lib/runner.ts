import { isDeepStrictEqual, inspect } from 'node:util';

const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const show = (v: unknown) => inspect(v, { depth: 6, breakLength: Infinity });

export interface Case<A extends unknown[], E> {
  /** the argument list passed to the solution */
  input: A;
  expected: E;
}

export interface RunOptions<A extends unknown[], R, E> {
  /** custom equality (default: deep equal) */
  compare?: (actual: any, expected: E) => boolean;
  /**
   * map the result before comparing, e.g. (_, args) => args[0] for in-place
   * problems, or listToArray for linked lists
   */
  transform?: (result: R, args: A) => unknown;
  /** label to print (default: fn.name) */
  name?: string;
}

/**
 * Run a solution against test cases and print the results.
 * @returns true if every case passed
 */
export function run<A extends unknown[], R, E>(
  fn: (...args: A) => R,
  cases: Case<A, E>[],
  options: RunOptions<A, R, E> = {},
): boolean {
  const compare = options.compare ?? isDeepStrictEqual;
  const transform = options.transform ?? ((result: R) => result);
  let passed = 0;

  console.log(`\n${options.name ?? (fn.name || 'solution')}`);
  cases.forEach(({ input, expected }, i) => {
    // Clone inputs so a solution that mutates them can't affect the printout.
    const args = structuredClone(input);
    const label = `  #${i + 1} ${dim(show(input))}`;
    try {
      const start = performance.now();
      const result = fn(...args);
      const ms = (performance.now() - start).toFixed(3);
      const actual = transform(result, args);
      if (compare(actual, expected)) {
        passed++;
        console.log(`${green('✓')}${label} ${dim(`${ms}ms`)}`);
      } else {
        console.log(`${red('✗')}${label}`);
        console.log(`      expected: ${show(expected)}`);
        console.log(`      actual:   ${show(actual)}`);
      }
    } catch (err) {
      console.log(`${red('✗')}${label}`);
      console.log(red(`      threw: ${err instanceof Error ? err.stack : String(err)}`));
    }
  });

  const ok = passed === cases.length;
  console.log(`${(ok ? green : red)(`  ${passed}/${cases.length} passed`)}\n`);
  if (!ok) process.exitCode = 1;
  return ok;
}

/** Equality that ignores order, for "return the answer in any order" problems. */
export function unordered(actual: unknown, expected: unknown): boolean {
  const sort = (a: unknown[]) => a.map((x) => (Array.isArray(x) ? unorderedKey(x) : x)).sort();
  return (
    Array.isArray(actual) && Array.isArray(expected) && isDeepStrictEqual(sort(actual), sort(expected))
  );
}
const unorderedKey = (arr: unknown[]) => JSON.stringify([...arr].sort());

// 3963. Create Grid With Exactly One Path
// https://leetcode.com/problems/create-grid-with-exactly-one-path/

import { run } from '../lib/runner'

function createGrid (m: number, n: number): string[] {
  let new_grid: string[] = []

  // first row
  new_grid[0] = '.'.repeat(n)

  // rest of rows
  for (let i: number = 1; i < m; i++) {
    new_grid[i] = '#'.repeat(n - 1) + '.'
  }

  return new_grid
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  // Any valid grid is accepted, so check the shape matches the example output
  // and count right/down paths instead of comparing strings.
  const hasExactlyOnePath = (actual: string[], expected: string[]): boolean => {
    const m = expected.length
    const n = expected[0].length
    if (!Array.isArray(actual) || actual.length !== m) return false
    if (!actual.every(row => row.length === n && /^[.#]*$/.test(row)))
      return false
    const paths: number[][] = Array.from({ length: m }, () =>
      new Array(n).fill(0)
    )
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (actual[i][j] === '#') continue
        if (i === 0 && j === 0) paths[i][j] = 1
        else
          paths[i][j] = Math.min(
            2,
            (i > 0 ? paths[i - 1][j] : 0) + (j > 0 ? paths[i][j - 1] : 0)
          )
      }
    }
    return paths[m - 1][n - 1] === 1
  }

  run(
    createGrid,
    [
      { input: [2, 3], expected: ['..#', '#..'] },
      { input: [3, 3], expected: ['..#', '#..', '##.'] },
      { input: [1, 4], expected: ['....'] },
      { input: [1, 1], expected: ['.'] },
      { input: [4, 1], expected: ['.', '.', '.', '.'] },
      {
        input: [25, 25],
        expected: [
          '.'.repeat(25),
          ...Array.from({ length: 24 }, () => '#'.repeat(24) + '.')
        ]
      }
    ],
    { compare: hasExactlyOnePath }
  )
}

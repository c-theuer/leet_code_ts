// 3863. Minimum Operations to Sort a String
// https://leetcode.com/problems/minimum-operations-to-sort-a-string/

import { run } from '../lib/runner'

function minOperations (s: string): number {
  const sorted = s.split('').toSorted().join('')
  const mn = sorted[0]
  const mx = sorted[sorted.length - 1]

  if (s === sorted) {
    return 0
  } else if (mn === s[0] || mx === s[sorted.length - 1]) {
    return 1
  } else if (s.length === 2) {
    return -1
  } else if (
    mn === s[sorted.length - 1] &&
    mx === s[0] &&
    countChar(s, mn) === 1 &&
    countChar(s, mx) === 1
  ) {
    return 3
  }
  return 2
}

const countChar = (str: string, char: string): number => {
  return str.split(char).length - 1
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(minOperations, [
    { input: ['dog'], expected: 1 },
    { input: ['card'], expected: 2 },
    { input: ['gf'], expected: -1 }
  ])
}

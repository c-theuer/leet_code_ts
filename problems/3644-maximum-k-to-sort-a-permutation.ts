// 3644. Maximum K to Sort a Permutation
// https://leetcode.com/problems/maximum-k-to-sort-a-permutation/

import { run } from '../lib/runner'

function sortPermutation (nums: number[]): number {
  return 0
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(sortPermutation, [
    { input: [[0, 3, 2, 1]], expected: 1 },
    { input: [[0, 1, 3, 2]], expected: 2 },
    { input: [[3, 2, 1, 0]], expected: 0 }
  ])
}

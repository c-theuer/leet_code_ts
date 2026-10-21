// 1. Two Sum
// https://leetcode.com/problems/two-sum/

import { run, unordered } from '../lib/runner';

function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  return [];
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(
    twoSum,
    [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
    { compare: unordered },
  );
}

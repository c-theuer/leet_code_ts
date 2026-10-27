// 1254. Number of Closed Islands
// https://leetcode.com/problems/number-of-closed-islands/

import { run } from '../lib/runner'

function closedIsland (grid: number[][]): number {
  return 0
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(closedIsland, [
    {
      input: [
        [
          [1, 1, 1, 1, 1, 1, 1, 0],
          [1, 0, 0, 0, 0, 1, 1, 0],
          [1, 0, 1, 0, 1, 1, 1, 0],
          [1, 0, 0, 0, 0, 1, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 0]
        ]
      ],
      expected: 2
    },
    {
      input: [
        [
          [0, 0, 1, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 1, 1, 1, 0]
        ]
      ],
      expected: 1
    },
    {
      input: [
        [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 1],
          [1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1]
        ]
      ],
      expected: 2
    }
  ])
}

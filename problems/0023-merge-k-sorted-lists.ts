// 23. Merge k Sorted Lists
// https://leetcode.com/problems/merge-k-sorted-lists/

// LeetCode provides ListNode and MinPriorityQueue as globals; locally they come from these imports
import { ListNode, arrayToList, listToArray } from '../lib/structures'
import { MinPriorityQueue } from '@datastructures-js/priority-queue'
import { run } from '../lib/runner'

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const heap = new MinPriorityQueue<ListNode>(node => node.val)

  for (const head of lists) {
    if (head) heap.enqueue(head)
  }

  const dummy = new ListNode()
  let tail: ListNode = dummy

  while (!heap.isEmpty()) {
    const node = heap.dequeue()!
    tail.next = node
    tail = node
    if (node.next) heap.enqueue(node.next)
  }
  return dummy.next
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(
    (lists: number[][]) => mergeKLists(lists.map(arrayToList)),
    [
      {
        input: [
          [
            [1, 4, 5],
            [1, 3, 4],
            [2, 6]
          ]
        ],
        expected: [1, 1, 2, 3, 4, 4, 5, 6]
      },
      { input: [[]], expected: [] },
      { input: [[[]]], expected: [] },
      { input: [[[], [-1, 5, 11], [], [6, 10]]], expected: [-1, 5, 6, 10, 11] },
      { input: [[[2], [1]]], expected: [1, 2] }
    ],
    { name: 'mergeKLists', transform: listToArray }
  )
}

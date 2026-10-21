// 206. Reverse Linked List
// https://leetcode.com/problems/reverse-linked-list/

// LeetCode provides ListNode as a global; locally it comes from this import.
import { ListNode, arrayToList, listToArray } from '../lib/structures';
import { run } from '../lib/runner';

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

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  while (head) {
    const next: ListNode | null = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(
    (arr: number[]) => reverseList(arrayToList(arr)),
    [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] },
      { input: [[]], expected: [] },
    ],
    { name: 'reverseList', transform: listToArray },
  );
}

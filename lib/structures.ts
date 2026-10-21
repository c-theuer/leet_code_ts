// LeetCode's built-in data structures, plus converters to/from the array
// format LeetCode uses in its examples (e.g. [1,2,3] or [3,9,20,null,null,15,7]).

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function arrayToList(arr: number[]): ListNode | null {
  const dummy = new ListNode();
  let cur = dummy;
  for (const val of arr) cur = cur.next = new ListNode(val);
  return dummy.next;
}

export function listToArray(head: ListNode | null | undefined): number[] {
  const out: number[] = [];
  // Cap length so an accidental cycle doesn't hang the runner.
  for (let cur = head; cur && out.length < 1e5; cur = cur.next) out.push(cur.val);
  return out;
}

/** Level-order array (with nulls) -> tree, matching LeetCode's serialization. */
export function arrayToTree(arr: Array<number | null>): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift()!;
    const left = arr[i++];
    if (left != null) queue.push((node.left = new TreeNode(left)));
    const right = arr[i++];
    if (right != null) queue.push((node.right = new TreeNode(right)));
  }
  return root;
}

/** Tree -> level-order array with trailing nulls trimmed. */
export function treeToArray(root: TreeNode | null): Array<number | null> {
  const out: Array<number | null> = [];
  const queue: Array<TreeNode | null> = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      out.push(node.val);
      queue.push(node.left, node.right);
    } else {
      out.push(null);
    }
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

# LeetCode in TypeScript

Run and debug LeetCode problems locally in VS Code, using [tsx](https://tsx.is) to run `.ts` files
directly. Requires Node 20+.

tsx only strips types and does **not** type-check, so code with type errors still runs (handy for
half-finished solutions). Run `npm run typecheck` to check types with `tsc`.

```sh
npm install
```

## Quick start

```sh
npm run new -- 15 3Sum        # creates problems/0015-3sum.ts (opens it in VS Code if `code` is on PATH)
npx tsx problems/0015-3sum.ts # run one problem
npm test                      # run every problem
npm test -- 0206              # run problems whose filename matches
npm run watch problems/0015-3sum.ts   # re-run on save
npm run typecheck             # type-check everything with tsc
```

## Debugging in VS Code

1. Open a problem file and set a breakpoint (click left of a line number).
2. Press **F5** and pick **Debug current problem**.
3. Step with F10 / F11 and inspect variables in the sidebar.

`Cmd+Shift+P` → **Tasks: Run Test Task** runs the current file without the debugger.
The **Watch current problem** task re-runs it on every save.

## Problem file layout

```ts
import { run, unordered } from '../lib/runner';

function twoSum(nums: number[], target: number): number[] { /* paste into LeetCode */ }

if (require.main === module) {
  run(twoSum, [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },  // input = argument list
  ], { compare: unordered });
}
```

Copy the solution (everything between the imports and the `if (require.main === module)` block) into LeetCode.
LeetCode provides `ListNode`, `TreeNode`, and the `@datastructures-js/priority-queue` classes
(`MinPriorityQueue`, `MaxPriorityQueue`, `PriorityQueue`) as globals, so locally they're imported instead.
Test inputs are type-checked against the solution's parameters.

### `run(fn, cases, options)` options

| option      | use                                                                 |
| ----------- | ------------------------------------------------------------------- |
| `compare`   | custom equality, e.g. `unordered` for "return in any order" answers |
| `transform` | map the result before comparing: `listToArray`, `treeToArray`, or `(_, args) => args[0]` for in-place problems |
| `name`      | label to print (useful when `fn` is a wrapper arrow function)       |

Inputs are cloned before each call, so solutions that mutate them are safe.

### Linked lists and trees

`lib/structures.ts` provides `ListNode`, `TreeNode`, and converters to and from LeetCode's array format:
`arrayToList`, `listToArray`, `arrayToTree([3,9,20,null,null,15,7])`, `treeToArray`.
See `problems/0206-reverse-linked-list.ts` for an example, and
`problems/0023-merge-k-sorted-lists.ts` for one using `MinPriorityQueue`.

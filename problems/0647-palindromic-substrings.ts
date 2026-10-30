// 647. Palindromic Substrings
// https://leetcode.com/problems/palindromic-substrings/

import { run } from '../lib/runner'

function countSubstrings (s: string): number {
  // always a single character substring for each letter
  let substrings: number = s.length

  //odd length palindromes
  for (let middle: number = 1; middle < s.length - 1; middle++) {
    let palindrome: boolean = true
    let left: number = middle - 1
    let right: number = middle + 1
    while (left >= 0 && right < s.length && palindrome === true) {
      palindrome = s[left] === s[right]
      if (palindrome) {
        substrings++
      }
      left--
      right++
    }
  }

  //even length palindromes
  for (let middle_left: number = 0; middle_left < s.length - 1; middle_left++) {
    let palindrome: boolean = true
    let left: number = middle_left
    let right: number = middle_left + 1
    while (left >= 0 && right < s.length && palindrome === true) {
      palindrome = s[left] === s[right]
      if (palindrome) {
        substrings++
      }
      left--
      right++
    }
  }

  return substrings
}

// ---- local test harness (not part of the LeetCode submission) ----
if (require.main === module) {
  run(countSubstrings, [
    { input: ['abc'], expected: 3 },
    { input: ['aaa'], expected: 6 }
  ])
}

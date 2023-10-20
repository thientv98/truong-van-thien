/**
 * The function calculates the sum of all numbers from 1 to `n`.
 * @param {number} n - The parameter "n" is a number that represents the upper limit of the sum. The
 * function calculates the sum of all numbers from 1 to "n".
 * @returns the sum of all numbers from 1 to n.
 * @complexity O(1) because it computes the sum directly using the arithmetic series formula. It is the most efficient solution and is not
 * affected by the value of n.
 */
function sum_to_n_a(n: number): number {
  return n > 0 ? (n * (n + 1)) / 2 : 0;
}

/**
 * The function calculates the sum of all numbers from 1 to a given number `n`.
 * @param {number} n - The parameter `n` is a number that represents the upper limit of the range of
 * numbers to sum.
 * @returns the sum of all numbers from 1 to `n`.
 * @complexity O(n) because it uses a for loop to iterate from 1 to n, adding each value to the sum.
 */
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * The function calculates the sum of all numbers from 1 to a given number n recursively.
 * @param {number} n - The parameter "n" is a number that represents the value up to which we want to
 * calculate the sum.
 * @returns the sum of all numbers from 1 to n.
 * @complexity O(n) because uses recursion to compute the sum from n to 1
 */
function sum_to_n_c(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}

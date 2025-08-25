// Formula
var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

// Loop
var sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Recursive
var sum_to_n_c = function (n) {
  if (n <= 1) return n;
  return n + sum_to_n_recursive(n - 1);
};

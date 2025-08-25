// Formula
var sum_to_n_a = function (n) {
  if (n <= 0) {
    return 0;
  }

  if (!Number.isInteger(n)) {
    return "n is not a integer";
  }
  
  return (n * (n + 1)) / 2;
};

// Loop
var sum_to_n_b = function (n) {
  if (n <= 0) {
    return 0;
  }

  if (!Number.isInteger(n)) {
    return "n is not a integer";
  }

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Recursive
var sum_to_n_c = function (n) {
  if (n <= 0) {
    return 0;
  }

  if (!Number.isInteger(n)) {
    return "n is not a integer";
  }

  if (n === 1) {
    return 1;
  }

  return n + sum_to_n_recursive(n - 1);
};

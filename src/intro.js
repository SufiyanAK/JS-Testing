export const max = (a, b) => {
  return a > b ? a : b;
};

export const fizzBuzz = (n) => {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";

  return n.toString();
};

export const calculateAverage = (number) => {
  if (number.length === 0) return NaN;
  // accumulator => total or sum value
  const sum = number.reduce((acc, curr) => acc + curr, 0) / number.length;
  return sum;
};

export const factorial = (fact) => {
  if (fact === 0 || fact === 1) return 1;

  return fact * factorial(fact - 1);
};

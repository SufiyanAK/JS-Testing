export const reverseString = (str) => {
  if (typeof str !== 'string') return 'Invalid input';
  return str.split('').reverse().join('');
};

export const isPrime = (num) => {
  if (typeof num !== 'number' || num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export const findMax = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return 'Invalid input';
  return Math.max(...arr);
};

export const validateUser = (user) => {
  if (
    !user ||
    typeof user.name !== 'string' ||
    user.name.length < 3 ||
    typeof user.age !== 'number' ||
    user.age < 18
  ) {
    return 'Invalid user';
  }
  return 'Valid user';
};

export const isWeekend = (date) => {
  if (!(date instanceof Date)) return 'Invalid input';
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const sortNumbers = (arr) => {
  if (!Array.isArray(arr) || arr.some((n) => typeof n !== 'number'))
    return 'Invalid input';
  return arr.sort((a, b) => a - b);
};

export const toCamelCase = (str) => {
  if (typeof str !== 'string') return 'Invalid input';
  return str
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

export const factorial = (num) => {
  if (typeof num !== 'number' || num < 0) return 'Invalid input';
  return num === 0 ? 1 : num * factorial(num - 1);
};

export const findItem = (arr, item) => {
  if (!Array.isArray(arr)) return 'Invalid input';
  if (!item) return 'Invalid input';

  return arr.includes(item);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

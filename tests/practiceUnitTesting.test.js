import { it, expect, describe } from "vitest";
import {
  factorial,
  findItem,
  findMax,
  isPrime,
  isValidEmail,
  isWeekend,
  reverseString,
  sortNumbers,
  toCamelCase,
  validateUser,
} from "../src/practiceUnitTesting";

describe("Reverse String", () => {
  it("should return an error id input is not string ", () => {
    const input = reverseString(22);

    expect(input).toMatch("Invalid");
  });

  it("should return the reversed string", () => {
    const input = reverseString("mom");

    expect(input).toBe("mom");
  });
});

describe("Check Prime Number", () => {
  it("should return False if input is not a number", () => {
    const input = isPrime("2");

    expect(input).toBeFalsy();
  });

  it("should return False if input is less than 2", () => {
    const input = isPrime(1);

    expect(input).toBeFalsy();
  });

  it("should return False if input is not prime", () => {
    const input = isPrime(6);

    expect(input).toBeFalsy();
  });

  it("should return True if input is prime", () => {
    const input = isPrime(7);

    expect(input).toBeTruthy();
  });
});

describe("Find Max in an Array", () => {
  it("should return an error if input is not an array", () => {
    const input = findMax({ name: "John" });

    expect(input).toMatch("Invalid");
  });

  it("should return an error if array is length is zero", () => {
    const input = findMax([]);

    expect(input).toMatch("Invalid");
  });

  it("should return an array when containing values", () => {
    const input = findMax([1, 5, 3, 7]);

    expect(input).toBe(7);
  });
});

describe("Validate User", () => {
  it("should return an error if user is not provided", () => {
    const input = validateUser();

    expect(input).toMatch("Invalid");
  });

  it("should return an error if name is not string", () => {
    const input = validateUser({ name: 22, age: 22 });

    expect(input).toMatch("Invalid");
  });

  it("should return an error if name length is less than 3", () => {
    const input = validateUser({ name: "22", age: 22 });

    expect(input).toMatch("Invalid");
  });

  it("should return an error if age is not a number", () => {
    const input = validateUser({ name: "Sufiyan", age: "22" });

    expect(input).toMatch("Invalid");
  });

  it("should return an error if age is less than 18", () => {
    const input = validateUser({ name: "sufiyan", age: 17 });

    expect(input).toMatch("Invalid");
  });

  it("should return Success message when both input are correct by type and by limit", () => {
    const input = validateUser({ name: "sufiyan", age: 22 });

    expect(input).toBe("Valid user");
  });
});

describe("Check Is Weekend", () => {
  it("should return an error on invalid input", () => {
    const input = isWeekend("monday");

    expect(input).toMatch("Invalid");
  });

  it("should return an error on invalid input", () => {
    const input = isWeekend(new Date());
    expect(input).toBeFalsy();
  });
});

describe("Sort Numbers", () => {
  it("should return an error when input is not an array", () => {
    const input = sortNumbers({ name: "john" });

    expect(input).toMatch("Invalid");
  });

  it("should return an error when any value in the array is not a number", () => {
    const input = sortNumbers([4, 3, 1, 5, "2"]);

    expect(input).toMatch("Invalid");
  });

  it("should return a sorted array when input is an array of numbers", () => {
    const input = sortNumbers([4, 3, 1, 5, 2]);

    // did not used the toBe method because it will compare the references
    // Used to Equal to check the value in the array
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("Check Camel Case Strings", () => {
  it("should return an error when input is not string", () => {
    const input = toCamelCase(2);

    expect(input).toMatch("Invalid");
  });

  it("should return a camelCase string when input is string", () => {
    const input = toCamelCase("to camel case");

    expect(input).toBe("toCamelCase");
  });
});

describe("Factorial", () => {
  it("should return an error if input is not a number", () => {
    const input = factorial("1");

    expect(input).toMatch("Invalid");
  });

  it("should return an error if input is less than 0", () => {
    const input = factorial(-2);

    expect(input).toMatch("Invalid");
  });

  it("should return 1 if input 0", () => {
    const input = factorial(0);

    expect(input).toBe(1);
  });

  it("should return 120 if input 5", () => {
    const input = factorial(5);

    expect(input).toBe(120);
  });
});

describe("Find Item in An Array", () => {
  it("should return an error when input is not an Array", () => {
    const input = findItem({ age: 22 });

    expect(input).toMatch("Invalid");
  });

  it("should return an error when item is not defined", () => {
    const input = findItem([1, 4, 7, 3]);

    expect(input).toMatch("Invalid");
  });

  it("should return True when item is found successfully", () => {
    const input = findItem([1, 4, 7, 3], 4);

    expect(input).toBeTruthy();
  });
});

describe("Validate Email", () => {
  it("should return True when email is Valid", () => {
    const email = isValidEmail("test@example.com");

    expect(email).toBeTruthy();
  });

  it("should return False when email is not Valid", () => {
    const email = isValidEmail("test@example");

    expect(email).toBeFalsy();
  });
});

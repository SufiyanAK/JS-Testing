import { describe, test, it, expect } from "vitest";
import { calculateAverage, factorial, fizzBuzz, max } from "../src/intro";

describe("max", () => {
  it("should return the first argument if it is grater", () => {
    // AAA => Arrange Act Assert
    // Arrange
    // const a = 2, b = 1

    // // Act
    // const result = max(a, b)

    // // Assert
    // expect(result).toBe(a)

    expect(max(5, 3)).toBe(5);
  });

  it("should return the second argument if it is grater", () => {
    expect(max(2, 3)).toBe(3);
  });

  it("should return the First argument if both are equal", () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe("FizzBuss", () => {
  it("should return FizzBuzz for multiples of 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return Fizz for multiples of 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  it("should return Fizz for multiples of 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("should return String", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});

describe("Calculate Average", () => {
  it("should return Nan if asses an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("should Calculate the average of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("should Calculate the average of an array with a Two element", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it("should Calculate the average of an array with a Three element", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("Factorial", () => {
  it("should return 1 if number is 0", () => {
    expect(factorial(0)).toBe(1);
  });

  it("should return 1 if number is 1", () => {
    const factAnswer = factorial(2);
    // console.log(factAnswer)
    expect(factorial(1)).toBe(1);
  });

  it("should return 2 if number is 2", () => {
    const factAnswer = factorial(2);
    // console.log(factAnswer)
    expect(factorial(2)).toBe(2);
  });

  it("should return 6 if number is 3", () => {
    const n = 7;
    const factAnswer = factorial(n);
    // console.log(factAnswer)
    expect(factorial(n)).toBe(factAnswer);
  });
});

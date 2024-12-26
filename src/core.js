export const getCoupon = () => {
  return [
    {
      code: "SUMMER20",
      discount: 10,
    },
    {
      code: "WINTER20",
      discount: 5,
    },
  ];
};

export const calculateDiscount = (price, discountCode) => {
  if (typeof price !== "number" || price <= 0) {
    return "Invalid price";
  }

  if (typeof discountCode !== "string") {
    return "Invalid discount code";
  }

  let discount = 0;

  if (discountCode === "SAVE10") {
    discount = 0.1;
  } else if (discountCode === "SAVE20") {
    discount = 0.2;
  }

  return price * (1 - discount);
};

export const validateUserInput = (username, age) => {
  let error = [];

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 255
  ) {
    error.push("Invalid username");
  }

  if (typeof age !== "number" || age < 18 || age > 65) {
    error.push("Invalid age");
  }

  return error.length === 0 ? "validation successful" : error.join(", ");
};

// Boundary Testing
export const isPriceInRange = (price, min, max) => {
  return price >= min && price <= max;
};

// Boundary Testing
export const isValidUserName = (userName) => {
  const minLength = 5;
  const maxLength = 15;

  if (typeof userName !== "string") {
    return "Invalid user name";
  }

  if (!userName) {
    return "Invalid, User name cannot be null";
  }

  return userName.length >= minLength && userName.length <= maxLength;
};

export const canDrive = (age, countryCode) => {
  const legalDrivingAge = {
    US: 16,
    UK: 17,
    PK: 18,
  };

  if (typeof age !== "number" || age <= 0) {
    return "Invalid age";
  }

  if (typeof countryCode !== "string" || !legalDrivingAge[countryCode]) {
    return "Invalid country code";
  }

  return age >= legalDrivingAge[countryCode];
};

// Testing Asynchronous Code
export const fetchData = () => {
  // return Promise.reject({ reason: 'Network Error' });
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = ["John", "Doe", "Jane", "Doe"];
      resolve(data);
    });
  });
};

// Setup and Teardown
export class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    this.stack.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.stack.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  clear() {
    this.stack = [];
  }
}

import delay from "delay";

export const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailPattern.test(email);
};

export const sendEmail = async (email, message) => {
  console.log(`Sending email to ${email} with message: ${message}`);

  await delay(3000);
};

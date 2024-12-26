import delay from "delay";

export const charge = async (card, totalAmount) => {
  console.log(`Charging ${totalAmount} to ${card}`);

  await delay(3000);

  return {
    status: "success",
  };
};

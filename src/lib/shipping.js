export const getShippingQuote = (destination) => {
  console.log(`Getting the shipping quote for ${destination}...`);
  return {
    cost: Math.random() * 100,
    days: Math.floor(Math.random() * 10),
  };
};

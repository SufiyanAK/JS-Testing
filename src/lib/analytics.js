import delay from "delay";

export const trackPageView = async (path) => {
  console.log(`Tracking page view for ${path}`);

  await delay(3000);
};

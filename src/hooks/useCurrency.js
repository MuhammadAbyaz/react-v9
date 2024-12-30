const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const priceConvertor = (price) => intl.format(price);
export const useCurrency = (price) => {
  return priceConvertor(price);
};

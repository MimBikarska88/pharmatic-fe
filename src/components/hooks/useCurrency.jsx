import { CurrencyType } from "../../utils/residenceTypes";

const useCurrency = (price, currency, productCurrency) => {
  let calcualtedPrice = 0;

  const exchangeRate = 0.85;

  if (currency === productCurrency) {
    calcualtedPrice = price;
  }
  if (currency === CurrencyType.EU) {
    calcualtedPrice = price / exchangeRate;
  }
  if (currency === CurrencyType.NON_EU) {
    calcualtedPrice = price * exchangeRate;
  }
  return {
    calcualtedPrice,
  };
};
export default useCurrency;

import { CurrencyType } from "../../utils/residenceTypes";

const useCurrency = (price, currency, productCurrency) => {
  calcualtedPrice = 0;

  const exchangeRate = 0.85;

  console.log(typeof currency, typeof productCurrency);
  if (currency === productCurrency) {
    calcualtedPrice = price;
  } else {
    if (currency === CurrencyType.EU) {
      calcualtedPrice = price / exchangeRate;
    }
    if (currency === CurrencyType.NON_EU) {
      calcualtedPrice = price * exchangeRate;
    }
  }

  return {
    calcualtedPrice,
  };
};
export default useCurrency;

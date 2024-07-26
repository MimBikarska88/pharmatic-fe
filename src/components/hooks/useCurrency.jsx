import { CurrencyType } from "../../utils/residenceTypes";

const useCurrency = (currency) => {
  function calculatePrice(price, productCurrency) {
    let calcualtedPrice = 0;

    const exchangeRate = 0.85;

    if (currency === productCurrency) {
      calcualtedPrice = price;
    } else {
      if (
        currency === CurrencyType.EU &&
        productCurrency === CurrencyType.NON_EU
      ) {
        calcualtedPrice = price / exchangeRate;
      }
      if (
        currency === CurrencyType.NON_EU &&
        productCurrency === CurrencyType.EU
      ) {
        calcualtedPrice = price * exchangeRate;
      }
    }
    return calcualtedPrice;
  }

  return {
    calculatePrice,
  };
};
export default useCurrency;

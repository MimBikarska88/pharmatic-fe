import { CurrencyType } from "../../utils/residenceTypes";

const useCurrency = (currency) => {
  function calculatePrice(price, productCurrency) {
    console.log(price, productCurrency);
    let calcualtedPrice = 0;

    const exchangeRate = 0.85;

    if (currency === productCurrency) {
      return price;
    } else if (currency === CurrencyType.EU) {
      calcualtedPrice = price * exchangeRate;
    } else if (currency === CurrencyType.NON_EU) {
      calcualtedPrice = price / exchangeRate;
    }

    console.log(currency, CurrencyType.EU);
    console.log(currency, CurrencyType.NON_EU);
    console.log(calcualtedPrice);
    return calcualtedPrice;
  }

  return {
    calculatePrice,
  };
};
export default useCurrency;

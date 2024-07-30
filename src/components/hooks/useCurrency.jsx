import { CurrencyType } from "../../utils/residenceTypes";

const useCurrency = (currency) => {
  function calculatePrice(price, productCurrency) {
    console.log(price);
    let calcualtedPrice = 0;

    const exchangeRate = 0.85;

    if (currency === productCurrency) {
      return price;
    } else if (currency === CurrencyType.EU) {
      calcualtedPrice = price * exchangeRate;
      console.log(calcualtedPrice / 0.85);
    } else if (currency === CurrencyType.NON_EU) {
      console.log(price * 0.85);
      calcualtedPrice = price / exchangeRate;
    }

    return calcualtedPrice;
  }

  return {
    calculatePrice,
  };
};
export default useCurrency;

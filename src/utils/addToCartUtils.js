import { useUserStore } from "../stores/userStore";
import { CurrencyType } from "./residenceTypes";

export const addProductToCart = (product) => {
  const { _id } = product;
  const { Cart, addItemToCart, increaseItemQuantity } = useUserStore.getState();
  if (!Cart.find((item) => item._id === _id)) {
    addItemToCart({ ...product, quantity: 1 });
  } else {
    increaseItemQuantity(_id);
  }
};

export const calculateTotalPriceEu = () => {
  const { Cart } = useUserStore.getState();
  const itemsEU = Cart.filter((item) => item.currency !== CurrencyType.EU);
  return itemsEU.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0.0);
};
export const calculateTotalPriceNonEu = () => {
  const { Cart } = useUserStore.getState();
  const itemsNonEu = Cart.filter(
    (item) => item.currency !== CurrencyType.NON_EU
  );
  return itemsNonEu.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0.0);
};

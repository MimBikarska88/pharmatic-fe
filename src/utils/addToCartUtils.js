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

export const calculateTotalPriceEu = (items) => {
  const itemsEU = items.filter((item) => item.currency === CurrencyType.EU);
  console.log(itemsEU);
  return itemsEU.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0.0);
};
export const calculateTotalPriceNonEu = (items) => {
  const itemsNonEu = items.filter(
    (item) => item.currency === CurrencyType.NON_EU
  );
  console.log(itemsNonEu);

  return itemsNonEu.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0.0);
};
export const OrderStatus = {
  1: "Created",
  2: "Confirmed",
  3: "Canceled",
  4: "Delivered",
  5: "Completed",
};
export const OrderStatusEnum = {
  Created: 1,
  Confirmed: 2,
  Canceled: 3,
  Delivered: 4,
  Completed: 5,
};

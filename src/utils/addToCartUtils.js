import { useUserStore } from "../stores/userStore";

export const addProductToCart = (product) => {
  const { _id } = product;
  const { Cart, addItemToCart, increaseItemQuantity } = useUserStore.getState();
  if (!Cart.find((item) => item._id === _id)) {
    addItemToCart({ ...product, quantity: 1 });
  } else {
    increaseItemQuantity(_id);
  }
};

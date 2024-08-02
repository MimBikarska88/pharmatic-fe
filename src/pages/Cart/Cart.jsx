import { useEffect, useState } from "react";
import useCurrency from "../../components/hooks/useCurrency";
import PDButton from "../../components/PDButton/PDButton";
import PDTable from "../../components/PDEditableTable/PDTable";
import { useUserStore } from "../../stores/userStore";
import { useModalStore } from "../../stores/modalStore";
import { CurrencyType } from "../../utils/residenceTypes";
import {
  calculateTotalPriceEu,
  calculateTotalPriceNonEu,
} from "../../utils/addToCartUtils";
import useCreateOrderMutation from "../../queries/CreateOrderMutation/useCreateOrderMutation";
import { useNavigate } from "react-router";
const Cart = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { showModal, hideModal, setModal } = useModalStore();
  const {
    Cart,
    increaseItemQuantity,
    decreaseItemQuantity,
    currencyType,
    emptyCart,
  } = useUserStore((state) => state);

  const { calculatePrice } = useCurrency(currencyType);
  const navigate = useNavigate();
  const onCloseModal = () => {
    hideModal();
    setModal({
      modalTitle: "",
      modalText: "",
    });
  };
  const onSuccess = (res) => {
    emptyCart();
    navigate("/orders/customer");
  };
  const onError = (error) => {
    setModal({
      modalTitle: "Error",
      modalText: error.response.data?.Message || "Order processing went wrong!",
      showCancel: false,
      onClose: onCloseModal,
    });
    showModal();
  };
  const createOrderMutation = useCreateOrderMutation(onError, onSuccess);
  useEffect(() => {
    let priceEu = calculateTotalPriceEu();
    let priceNonEu = calculateTotalPriceNonEu();
    if (currencyType === CurrencyType.EU) {
      if (priceNonEu > 0) {
        priceEu = priceEu + priceNonEu * 0.85;
      }
      setTotalPrice(priceEu);
    }
    if (currencyType === CurrencyType.NON_EU) {
      if (priceEu > 0) {
        priceNonEu = priceNonEu + priceEu / 0.85;
      }
      setTotalPrice(priceNonEu);
    }
  }, [Cart, currencyType]);
  return (
    <>
      {Cart.length === 0 ? (
        <h4 className="text-center mt-4">
          <strong>No products in the cart</strong>
        </h4>
      ) : (
        <PDTable
          className="mt-3"
          style={{ fontSize: "medium", fontWeight: "400" }}
        >
          <PDTable.Header>
            <PDTable.Row>
              <PDTable.HeaderCell colspan={5}>Product</PDTable.HeaderCell>
              <PDTable.HeaderCell colspan={2}>Name</PDTable.HeaderCell>
              <PDTable.HeaderCell colspan={2}>Price</PDTable.HeaderCell>
              <PDTable.HeaderCell colspan={3}>Quantity</PDTable.HeaderCell>
            </PDTable.Row>
          </PDTable.Header>
          <PDTable.Body>
            {Cart.map((item) => {
              return (
                <PDTable.Row key={item._id}>
                  <PDTable.Cell colspan={5}>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={`http://localhost:8080/uploads/vendor/drugs/images/${item.photo}`}
                      alt="img"
                      className="img-thumbnail"
                    />
                  </PDTable.Cell>
                  <PDTable.Cell colspan={2}>
                    <strong>{item.medicationName}</strong>
                  </PDTable.Cell>
                  <PDTable.Cell colspan={2}>
                    <strong>
                      {currencyType === CurrencyType.NON_EU ? " $ " : ""}
                      {calculatePrice(item.price, item.currency).toFixed(2)}
                      {currencyType === CurrencyType.EU ? " € " : ""}
                    </strong>
                  </PDTable.Cell>
                  <PDTable.Cell style={{ align: "right" }} colspan={2}>
                    <strong>{item.quantity}</strong>
                  </PDTable.Cell>
                  <PDTable.Cell style={{ align: "right" }} colspan={1}>
                    <PDButton
                      onClick={() => increaseItemQuantity(item._id)}
                      color={"purple"}
                      value={"+"}
                      style={{
                        display: "block",
                        width: "40px",
                        height: "40px",
                        padding: "5px",
                        marginBottom: "10px",
                      }}
                    />
                    <PDButton
                      onClick={() => decreaseItemQuantity(item._id)}
                      value={"-"}
                      color={"purple"}
                      style={{
                        display: "block",
                        width: "40px",
                        padding: "5px",
                        height: "40px",
                      }}
                    />
                  </PDTable.Cell>
                </PDTable.Row>
              );
            })}
          </PDTable.Body>
          <PDTable.Footer style={{ fontSize: "20px", fontWeight: "700" }}>
            <PDTable.Row>
              <PDTable.Cell style={{ align: "center" }} colspan={2}>
                Total Price
              </PDTable.Cell>
              <PDTable.Cell style={{ align: "center" }} colspan={2}>
                {currencyType === CurrencyType.NON_EU ? "$ " : ""}
                {totalPrice.toFixed(2)}
                {currencyType === CurrencyType.EU ? " € " : ""}
              </PDTable.Cell>
              <PDTable.Cell colspan={2}>
                <PDButton
                  color={"purple"}
                  value={"Order now"}
                  onClick={() => {
                    createOrderMutation.mutate({
                      Cart: Cart.map((item) => {
                        return {
                          quantity: item.quantity,
                          _id: item._id,
                        };
                      }),
                    });
                  }}
                />
              </PDTable.Cell>
            </PDTable.Row>
          </PDTable.Footer>
        </PDTable>
      )}
    </>
  );
};
export default Cart;

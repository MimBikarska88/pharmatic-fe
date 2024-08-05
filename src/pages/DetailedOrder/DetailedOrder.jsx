import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import { useModalStore } from "../../stores/modalStore";
import useCurrency from "../../components/hooks/useCurrency";
import useGetCustomerOrderDetailsQuery from "../../queries/GetCustomerOrderDetailsQuery/useGetCustomerOrderDetailsQuery";
import useUpdateOrderStatusMutation from "../../queries/UpdateOrderStatusMutation/UpdateOrderStatusMutation";

import { CurrencyType } from "../../utils/residenceTypes";
import { OrderStatus, OrderStatusEnum } from "../../utils/addToCartUtils";
import PDButton from "../../components/PDButton/PDButton";
import PDTable from "../../components/PDEditableTable/PDTable";
import {
  calculateTotalPriceEu,
  calculateTotalPriceNonEu,
} from "../../utils/addToCartUtils";

const DetailedOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const currencyType = useUserStore((state) => state.currencyType);
  const { calculatePrice } = useCurrency(currencyType);
  const { showModal, hideModal, setModal } = useModalStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const onCloseModal = () => {
    hideModal();
    setModal({
      modalTitle: "",
      modalText: "",
    });
  };

  const onError = () => {
    navigate("/error");
  };
  const onUpdateStatusError = (err) => {
    setModal({
      modalTitle: "Error",
      modalText: err.response.data?.Message || "Order processing went wrong!",
      showCancel: false,
      onClose: onCloseModal,
    });
    showModal();
  };
  const onUpdateStatusSuccess = () => {
    refetchOrder();
  };
  const {
    data: order,
    error: orderError,
    isLoading: isOrderLoading,
    refetch: refetchOrder,
  } = useGetCustomerOrderDetailsQuery(orderId, { onError });

  const updateOrderStatusMutation = useUpdateOrderStatusMutation(
    onUpdateStatusError,
    onUpdateStatusSuccess
  );

  useEffect(() => {
    if (order && Object.keys(order).length > 0) {
      let priceEu = calculateTotalPriceEu(order.items);
      let priceNonEu = calculateTotalPriceNonEu(order.items);
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
    }
  }, [order, currencyType]);

  if (isOrderLoading) {
    return <h3>Loading...</h3>;
  }
  if (orderError) {
    return <h3>Something went wrong</h3>;
  }
  return (
    <>
      <h3 className="text-center mt-4">Order # {order.number} Details</h3>
      <PDTable>
        <PDTable.Header>
          <PDTable.Row>
            <PDTable.HeaderCell colSpan={5}>Product</PDTable.HeaderCell>
            <PDTable.HeaderCell colSpan={2}>Name</PDTable.HeaderCell>
            <PDTable.HeaderCell colSpan={2}>Price</PDTable.HeaderCell>
            <PDTable.HeaderCell colSpan={2}>Quantity</PDTable.HeaderCell>
            <PDTable.HeaderCell colSpan={3}>Vendor</PDTable.HeaderCell>
          </PDTable.Row>
        </PDTable.Header>
        <PDTable.Body>
          {order.items.map((item) => {
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
                <PDTable.Cell colSpan={2}>
                  <strong>{item.medicationName}</strong>
                </PDTable.Cell>
                <PDTable.Cell colSpan={2}>
                  <strong>
                    {currencyType === CurrencyType.NON_EU ? " $ " : ""}
                    {calculatePrice(item.price, item.currency).toFixed(2)}
                    {currencyType === CurrencyType.EU ? " € " : ""}
                  </strong>
                </PDTable.Cell>
                <PDTable.Cell style={{ align: "right" }} colSpan={2}>
                  <strong>{item.quantity}</strong>
                </PDTable.Cell>
                <PDTable.Cell>
                  <strong>{item.vendor.companyName}</strong>
                </PDTable.Cell>
              </PDTable.Row>
            );
          })}
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Order Number</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={3}>
              <strong>{order.number}</strong>
            </PDTable.Cell>
          </PDTable.Row>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Price</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={3}>
              <strong>
                {currencyType === CurrencyType.NON_EU ? "$ " : ""}
                {totalPrice.toFixed(2)}
                {currencyType === CurrencyType.EU ? " € " : ""}
              </strong>
            </PDTable.Cell>
          </PDTable.Row>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Created On</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={3}>
              <strong>{order.createdOn}</strong>
            </PDTable.Cell>
          </PDTable.Row>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Confirmed On</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={3}>
              <strong>{order.confirmedOn ? order.confirmedOn : " - "}</strong>
            </PDTable.Cell>
          </PDTable.Row>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Delivered On</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={3}>
              <strong>{order.deliveredOn ? order.deliveredOn : " - "}</strong>
            </PDTable.Cell>
          </PDTable.Row>{" "}
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Completed On</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={3}>
              <strong>{order.completedOn ? order.completedOn : " - "}</strong>
            </PDTable.Cell>
          </PDTable.Row>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Status</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={3}>
              <strong>{OrderStatus[order.status]}</strong>
            </PDTable.Cell>
          </PDTable.Row>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Address</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={9}>
              <strong>{order.customer.detailedAddress}</strong>
            </PDTable.Cell>
          </PDTable.Row>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              <strong>Contact</strong>
            </PDTable.Cell>
            <PDTable.Cell colSpan={9}>
              <strong>{order.customer.phoneNumber}</strong>
            </PDTable.Cell>
          </PDTable.Row>
        </PDTable.Body>
        <PDTable.Footer>
          <PDTable.Row>
            <PDTable.Cell colSpan={3}>
              {order.status < 4 &&
                order.status !== OrderStatusEnum.Canceled && (
                  <PDButton
                    value="Cancel Order"
                    color="purple"
                    onClick={() => {
                      updateOrderStatusMutation.mutate({
                        orderId: order._id,
                        status: OrderStatusEnum.Canceled,
                      });
                    }}
                  ></PDButton>
                )}
            </PDTable.Cell>
          </PDTable.Row>
        </PDTable.Footer>
      </PDTable>
    </>
  );
};
export default DetailedOrder;

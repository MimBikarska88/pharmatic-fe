import PDButton from "../../components/PDButton/PDButton";
import PDTable from "../../components/PDEditableTable/PDTable";
import { useUserStore } from "../../stores/userStore";
const Cart = (props) => {
  const { Cart, increaseItemQuantity, decreaseItemQuantity } = useUserStore(
    (state) => state
  );

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
                <PDTable.Row>
                  <PDTable.Cell colspan={5}>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={`http://localhost:8080/uploads/vendor/drugs/images/${item.photo}`}
                      alt="img"
                      className="img-thumbnail"
                    />
                  </PDTable.Cell>
                  <PDTable.Cell colspan={2}>{item.medicationName}</PDTable.Cell>
                  <PDTable.Cell colspan={2}>
                    {item.price.toFixed(2)}
                  </PDTable.Cell>
                  <PDTable.Cell style={{ align: "right" }} colspan={2}>
                    {item.quantity}
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
        </PDTable>
      )}
    </>
  );
};
export default Cart;

import { useNavigate } from "react-router";
import { usePagination } from "../../components/hooks/usePagination";
import useGetVendorOrdersQuery from "../../queries/GetVendorOrdersQuery/useGetVendorOrdersQuery";
import PDPagination from "../../components/Pagination/PDpagination";
import PDTable from "../../components/PDEditableTable/PDTable";
import { OrderStatus } from "../../utils/addToCartUtils";
const HEADER_COLS = [
  "#Order",
  "Created",
  "Confirmed",
  "Delivered",
  "Completed",
  "Status",
];
const INITIAL_ENTRIES_PER_PAGE = 6;
const VendorOrders = () => {
  const navigate = useNavigate();

  const onError = () => {
    navigate("/error");
  };

  const {
    data: orderList = [],
    isLoading,
    error,
  } = useGetVendorOrdersQuery({ onError });
  const { page, setPage, displayEntries, pages } = usePagination(
    orderList,
    INITIAL_ENTRIES_PER_PAGE
  );
  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  if (error || orderList.length === 0)
    return (
      <>
        <h4>An error ocurred.</h4>
      </>
    );

  return (
    <>
      <PDTable style={{ marginTop: "2rem" }}>
        <PDTable.Header>
          <PDTable.Row>
            {HEADER_COLS.map((col) => (
              <PDTable.HeaderCell key={col}>{col}</PDTable.HeaderCell>
            ))}
            {
              <PDTable.HeaderCell
                style={{ width: "40px" }}
              ></PDTable.HeaderCell>
            }
          </PDTable.Row>
        </PDTable.Header>
        <PDTable.Body>
          {displayEntries.map((order) => {
            return (
              <PDTable.Row key={order._id} style={{ fontWeight: "500" }}>
                <PDTable.Cell>
                  <a href={`/orders/${order.number}`}>{order.number}</a>
                </PDTable.Cell>
                <PDTable.Cell>{order.createdOn}</PDTable.Cell>
                <PDTable.Cell>
                  {order.confirmedOn ? order.confirmedOn : " - "}
                </PDTable.Cell>
                <PDTable.Cell>
                  {order.deliveredOn ? order.deliveredOn : " - "}
                </PDTable.Cell>
                <PDTable.Cell>
                  {order.completedOn ? order.completedOn : " - "}
                </PDTable.Cell>
                <PDTable.Cell>{OrderStatus[order.status]}</PDTable.Cell>
              </PDTable.Row>
            );
          })}
        </PDTable.Body>
        <PDTable.Footer>
          {orderList.length >= INITIAL_ENTRIES_PER_PAGE && (
            <PDPagination
              pages={pages}
              setPage={setPage}
              entries={orderList}
              entriesPerPage={INITIAL_ENTRIES_PER_PAGE}
              page={page}
              displayEntries={INITIAL_ENTRIES_PER_PAGE}
            />
          )}
        </PDTable.Footer>
      </PDTable>
    </>
  );
};
export default VendorOrders;

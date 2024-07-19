import { useNavigate } from "react-router";
import { usePagination } from "../../components/hooks/usePagination";
import useGetVendorProductsQuery from "../../queries/GetVendorProductsQuery/useGetVendorProductsQuery";
import PDButton from "../../components/PDButton/PDButton";
import PDPagination from "../../components/Pagination/PDpagination";
import Product from "../../components/Product/Product";

const Stock = (props) => {
  const navigate = useNavigate();
  const {
    data: products = [],
    error: productsError,
    isLoading: productsLoading,
  } = useGetVendorProductsQuery({
    onError: () => {
      navigate("/"); // must create error page
    },
    gcTime: 0,
  });

  const INITIAL_ENTRIES_PER_PAGE = 3;
  const { page, setPage, displayEntries, pages } = usePagination(
    products,
    INITIAL_ENTRIES_PER_PAGE
  );

  if (productsError) {
    return <h4>Something went wrong, please contact your admin.</h4>;
  }
  if (productsLoading) {
    return <h4>Loading...</h4>;
  }

  return (
    <>
      {!products || !displayEntries || displayEntries?.length === 0 ? (
        <div className="d-flex flex-column align-items-center mt-5">
          <h3 style={{ color: "#74ab5d" }}>
            <strong>
              There are currently no pharmaceutical products listed.
            </strong>
          </h3>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row justify-content-center">
            {displayEntries.map((p) => (
              <Product {...p} />
            ))}
          </div>
        </div>
      )}
      <div className="d-block text-center m-1">
        {products && products.length >= INITIAL_ENTRIES_PER_PAGE && (
          <PDPagination
            pages={pages}
            setPage={setPage}
            entries={products}
            entriesPerPage={INITIAL_ENTRIES_PER_PAGE}
            page={page}
            displayEntries={INITIAL_ENTRIES_PER_PAGE}
          />
        )}
      </div>
      <div className="d-block text-center m-5">
        <PDButton
          onClick={() => {
            navigate("/stock/create");
          }}
          style={{ width: "200px" }}
          value={"Upload product"}
          color={"purple"}
        />
      </div>
    </>
  );
};
export default Stock;

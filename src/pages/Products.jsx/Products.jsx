import { useUserStore } from "../../stores/userStore";
import { usePagination } from "../../components/hooks/usePagination";
import useGetClassificationQuery from "../../queries/GetClassificationQuery/useGetClassificationQuery";
import PDInput from "../../components/PDInput/PDInput";
import PDPagination from "../../components/Pagination/PDpagination";
import PDSelect from "../../components/PDSelect/PDSelect";
import Product from "../../components/Product/Product";
import styles from "./Products.module.css";
import useGetFilteredProductsQuery from "../../queries/GetFilteredProductsQuery/useGetFilteredProductsQuery";
import PDButton from "../../components/PDButton/PDButton";
import { useEffect } from "react";
const Products = () => {
  const SearchParams = useUserStore((state) => state.SearchParams);
  const Cart = useUserStore((state) => state.Cart);
  const setSearchParams = useUserStore.getState().setSearchParams;

  const { classification, vendor, searchText } = SearchParams;

  const {
    data: classifications = [],
    error: classificationError,
    isLoading: classificationLoading,
  } = useGetClassificationQuery();

  const {
    data: products = [],
    error: productsError,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useGetFilteredProductsQuery(classification, vendor, searchText, {
    enabled: false,
  });
  const INITIAL_ENTRIES_PER_PAGE = 3;
  const { page, setPage, displayEntries, pages } = usePagination(
    products,
    INITIAL_ENTRIES_PER_PAGE
  );

  useEffect(() => {
    refetchProducts();
  }, []);

  if (classificationLoading || productsLoading) {
    return <h4>Loading...</h4>;
  }
  if (classificationError || productsError) {
    return (
      <div>
        Error:
        {classificationError?.message || productsError?.message}
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        <PDSelect
          className={styles["input-field"]}
          options={classifications}
          label="Classification"
          selectedOption={classification}
          onChange={(e) => setSearchParams("classification", e.value)}
        />
        <PDInput
          label="Vendor"
          value={SearchParams.vendor}
          onChange={(e) => setSearchParams("vendor", e.target.value)}
          className={styles["input-field"]}
        />
        <PDInput
          label="Search"
          value={SearchParams.searchText}
          onChange={(e) => setSearchParams("searchText", e.target.value)}
          className={styles["input-field"]}
        />
        <PDButton
          value="Filter"
          color="purple"
          style={{
            height: "min-content",
            alignSelf: "center",
            marginLeft: "1rem",
          }}
          onClick={() => refetchProducts()}
        />
      </div>
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
        <div className="d-flex justify-content-center flex-row  mt-3">
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
      </>
    </>
  );
};
export default Products;

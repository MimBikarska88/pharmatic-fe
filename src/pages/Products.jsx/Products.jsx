import { useEffect, useState } from "react";
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

const Products = () => {
  const { SearchParams, setSearchParams } = useUserStore((state) => ({
    SearchParams: state.SearchParams,
    setSearchParams: state.setSearchParams,
  }));
  const [tempClassification, setTempClassification] = useState(
    SearchParams.classification
  );
  const [tempVendor, setTempVendor] = useState(SearchParams.vendor);
  const [tempSearchText, setTempSearchText] = useState(SearchParams.searchText);

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
  } = useGetFilteredProductsQuery(
    SearchParams.classification,
    SearchParams.vendor,
    SearchParams.searchText,
    {
      enabled: false,
    }
  );
  useEffect(() => {
    refetchProducts();
  }, []);

  const INITIAL_ENTRIES_PER_PAGE = 3;
  const { page, setPage, displayEntries, pages } = usePagination(
    products,
    INITIAL_ENTRIES_PER_PAGE
  );

  if (classificationLoading || productsLoading) {
    return <h4>Loading...</h4>;
  }
  if (classificationError || productsError) {
    return (
      <div>Error: {classificationError?.message || productsError?.message}</div>
    );
  }

  // Handle button click to apply filters
  const handleApplyFilters = () => {
    setSearchParams("classification", tempClassification);
    setSearchParams("vendor", tempVendor);
    setSearchParams("searchText", tempSearchText);
    refetchProducts();
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        <PDSelect
          className={styles["input-field"]}
          options={classifications}
          label="Classification"
          selectedOption={tempClassification}
          onChange={(e) => setTempClassification(e.value)}
        />
        <PDInput
          label="Vendor"
          value={tempVendor}
          onChange={(e) => setTempVendor(e.target.value)}
          className={styles["input-field"]}
        />
        <PDInput
          label="Search"
          value={tempSearchText}
          onChange={(e) => setTempSearchText(e.target.value)}
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
          onClick={handleApplyFilters}
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

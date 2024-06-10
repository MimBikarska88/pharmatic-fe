import PDButton from "../PDButton/PDButton";
import styles from "./PDPagination.module.css";
const PDPagination = (props) => {
  const { page, setPage, entriesPerPage, pages, show = true } = props;

  if (!show) {
    return <></>;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-baseline">
        <div>Page: </div>
        <input
          className={styles["pagination-input"]}
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />
        <div style={{ whiteSpace: "nowrap" }}>out of</div>
        <input
          className={styles["pagination-input"]}
          disabled={true}
          value={pages}
        />
        <div style={{ whiteSpace: "nowrap" }}>| Entries per page: </div>
        <input
          className={styles["pagination-input"]}
          value={entriesPerPage}
          disabled={true}
        />
        {(() => {
          const pages = [];
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              value={"<<"}
              onClick={() => setPage(1)}
            ></PDButton>
          );
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              value={"<"}
              onClick={() => setPage(page - 1)}
            ></PDButton>
          );
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              value={page}
            ></PDButton>
          );
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              value={">"}
              onClick={() => setPage(page + 1)}
            ></PDButton>
          );
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              style={{ marginRight: "1rem" }}
              value={">>"}
              onClick={() => setPage(pages)}
            ></PDButton>
          );
          return pages;
        })()}
      </div>
    </>
  );
};
export default PDPagination;

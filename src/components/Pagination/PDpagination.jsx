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
        Page
        <input
          className={styles["pagination-input"]}
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />
        of{" "}
        <input className={styles["pagination-input"]} readOnly value={pages} />
        entries{" "}
        <input className={styles["pagination-input"]} value={entriesPerPage} />
        {(() => {
          const pages = [];
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              value={"<<"}
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
            ></PDButton>
          );
          return pages;
        })()}
      </div>
    </>
  );
};
export default PDPagination;

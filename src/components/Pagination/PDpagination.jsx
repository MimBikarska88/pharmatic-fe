import PDButton from "../PDButton/PDButton";
import styles from "./PDPagination.module.css";
const PDPagination = (props) => {
  const { pageIndex = 1, pageSize, pageCount, show = true } = props;
  const NUMBER_OF_PAGES_TO_SHOW = 3;

  if (!show) {
    return <></>;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-baseline">
        Page
        <input className={styles["pagination-input"]} />
        of <input className={styles["pagination-input"]} />
        entries <input className={styles["pagination-input"]} />
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
            ></PDButton>
          );
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              value={pageIndex}
            ></PDButton>
          );
          pages.push(
            <PDButton
              color={"purple"}
              className={styles["pagination-button"]}
              value={">"}
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

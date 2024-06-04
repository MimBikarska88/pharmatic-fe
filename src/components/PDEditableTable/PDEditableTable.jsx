import { Fragment } from "react";
import styles from "./PDEditableTable.module.css";
import PDInput from "../PDInput/PDInput";
import PDButton from "../PDButton/PDButton";
import { TableRowType } from "../../utils/tableRowTypes";
export const PDEditableTable = ({
  thead = [[]],
  tbody = [[]],
  mapRowData = () => {},
  onAddRowClick = () => {},
  onRemoveSelected = () => {},
  onRowSelect = () => {},
  hasPagination = false,
  isEdit = false,
}) => {
  return (
    <div className={styles}>
      <div className="table-wrapper">
        <table>
          <thead>
            {thead.map((row) => (
              <tr>
                {row.map((cell) => (
                  <th>{cell}</th>
                ))}
                {isEdit && <th style={{ width: "40px" }}></th>}
              </tr>
            ))}
          </thead>
          <tbody>
            {tbody.map((row) => {
              return (
                <>
                  <tr>
                    {row.map((cell) => (
                      <td>{cell}</td>
                    ))}
                    {isEdit && row.type !== TableRowType.Readonly && (
                      <td style={{ width: "20px" }}>
                        <PDInput type={"checkbox"} />
                      </td>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
          {isEdit && (
            <tfoot>
              {thead.map((row) => (
                <tr>
                  {row.map((cell) => (
                    <td>
                      <PDInput placeholder={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
        {isEdit && (
          <div className="d-flex flex-row-reverse">
            <PDButton
              color={"green"}
              classname={styles["row-button"]}
              value={"Add Row"}
            ></PDButton>
            <PDButton
              color={"red"}
              classname={styles["row-button"]}
              value={"Remove Selected"}
            ></PDButton>
          </div>
        )}
      </div>
    </div>
  );
};
export default PDEditableTable;

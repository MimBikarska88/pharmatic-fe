import { Fragment } from "react";
import styles from "./PDEditableTable.module.css";
import PDInput from "../PDInput/PDInput";
export const PDEditableTable = ({
  className,
  thead = [[]],
  tbody = [[]],
  colspan = {
    Stay: 2,
  },
  hasPagination = false,
}) => {
  return (
    <Fragment className={className}>
      <table className={styles}>
        <thead>
          {thead.map((row) => (
            <tr>
              {row.map((cell) => (
                <th colspan={colspan[`${cell}`]}>{cell}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tbody.map((row) => (
            <tr>
              {row.map((cell) => (
                <td>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <PDInput />
            </td>
            <td>
              <PDInput />
            </td>
            <td>
              <PDInput />
            </td>
            <td>
              <PDInput />
            </td>
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};
export default PDEditableTable;

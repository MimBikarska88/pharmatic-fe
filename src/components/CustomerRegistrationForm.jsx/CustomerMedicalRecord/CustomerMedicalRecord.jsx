import PDInput from "../../PDInput/PDInput";
import PDFileInput from "../../PDFileInput/PDFileInput";
import PDButton from "../../PDButton/PDButton";
import styles from "./CustomerMedicalRecord.module.css";

import PDTable from "../../PDEditableTable/PDTable";

import { roleType } from "../../../utils/roleTypes";
import { TableRowType } from "../../../utils/tableRowTypes";
import { useUserStore } from "../../../stores/userStore";

import { useState } from "react";
import { toBeRequired } from "@testing-library/jest-dom/matchers";

const HEADER_COLS = [
  "Intervention Type",
  "Medical Facility",
  "Admission Date",
  "Leave Date",
];
const CustomerMedicalRecord = () => {
  const Customer = useUserStore((state) => state.Customer);
  const [newRow, setNewRow] = useState({
    medicalFacility: "",
    medicalInterventionType: "",
    arrivalDate: "",
    leaveDate: "",
  });
  const [newRowErrors, setNewRowErrors] = useState({
    medicalFacility: true,
    medicalInterventionType: true,
    arrivalDate: true,
    leaveDate: true,
  });
  const changeNewRow = (fieldName, value) => {
    setNewRow((state) => ({
      ...state,
      [`${fieldName}`]: value,
    }));
    if (fieldName === "arrivalDate" || fieldName === "leaveDate") {
      const isValid = areDatesValid();
      setNewRowErrors((state) => ({
        ...state,
        arrivalDate: isValid,
        leaveDate: isValid,
      }));
    }
    if (
      fieldName === "medicalInterventionType" ||
      fieldName === "medicalInterventionFacility"
    ) {
      setNewRowErrors((state) => ({
        ...state,
        [`${fieldName}`]: value.trim() !== "",
      }));
    }
  };
  const areDatesValid = () => {
    if (newRow.arrivalDate && newRow.leaveDate) {
      const arrivalDate = new Date(newRow.arrivalDate);
      const leaveDate = new Date(newRow.leaveDate);
      return leaveDate < arrivalDate;
    }
    return true;
  };

  const addRow = () => {
    const emptyInputs = Object.entries(newRow).filter(
      (entry) => entry[1].trim() === ""
    );
    if (emptyInputs.length > 0) {
      emptyInputs.forEach((entry) => {
        setNewRowErrors((state) => ({
          ...state,
          [`${entry[0]}`]: false,
        }));
      });
      return;
    }
    if (!areDatesValid) {
      return;
    }
    Customer.medicalRecord.push(newRow);
  };
  return (
    <>
      <div className="container">
        <div className="d-flex flex-row">
          <div className="flex-col auto">
            <PDInput
              label={"General Practitioner"}
              className={`${styles["input-field"]} ${styles["general-practitioner"]}`}
              type={"text"}
            />
          </div>
          <div className="flex-col auto">
            <PDFileInput
              label={"Latest Health Check-up Report"}
              className={`${styles["input-field"]}`}
            />
          </div>
        </div>
        <div className="d-flex flex-row">
          <PDTable style={styles}>
            <PDTable.Header>
              <PDTable.Row>
                {HEADER_COLS.map((col) => (
                  <PDTable.HeaderCell>{col}</PDTable.HeaderCell>
                ))}
                {
                  <PDTable.HeaderCell
                    style={{ width: "40px" }}
                  ></PDTable.HeaderCell>
                }
              </PDTable.Row>
            </PDTable.Header>
            <PDTable.Body>
              {Customer?.medicalRecord.map((el) => {
                return (
                  <PDTable.Row>
                    <PDTable.Cell>{el.medicalInterventionType}</PDTable.Cell>
                    <PDTable.Cell>{el.medicalFacility}</PDTable.Cell>
                    <PDTable.Cell>{el.arrivalDate}</PDTable.Cell>
                    <PDTable.Cell>{el.leaveDate}</PDTable.Cell>
                    {!el._id && (
                      <PDTable.Cell style={{ width: "20px" }}>
                        <PDInput type={"checkbox"} />
                      </PDTable.Cell>
                    )}
                  </PDTable.Row>
                );
              })}
              <PDTable.Row
                style={{ backgroundColor: "snow", paddingTop: "10px" }}
              >
                <PDTable.Cell>
                  <PDInput
                    onChangeFunc={(e) =>
                      changeNewRow("medicalInterventionType", e.target.value)
                    }
                    value={newRow.medicalInterventionType}
                    type={"text"}
                  />
                </PDTable.Cell>
                <PDTable.Cell>
                  <PDInput
                    onChangeFunc={(e) =>
                      changeNewRow("medicalFacility", e.target.value)
                    }
                    value={newRow.medicalFacility}
                    type={"text"}
                  />
                </PDTable.Cell>
                <PDTable.Cell>
                  <PDInput
                    onChangeFunc={(e) =>
                      changeNewRow("arrivalDate", e.target.value)
                    }
                    isValid={newRowErrors.arrivalDate}
                    value={newRow.arrivalDate}
                    type={"date"}
                  />
                </PDTable.Cell>
                <PDTable.Cell>
                  <PDInput
                    onChangeFunc={(e) =>
                      changeNewRow("leaveDate", e.target.value)
                    }
                    value={newRow.leaveDate}
                    isValid={newRowErrors.leaveDate}
                    type={"date"}
                  />
                </PDTable.Cell>
                <PDTable.Cell></PDTable.Cell>
              </PDTable.Row>
            </PDTable.Body>
            <PDTable.Footer>
              <div className="d-flex flex-row-reverse buttons">
                <PDButton
                  color={"green"}
                  value={"Add Row"}
                  style={{ margin: "15px" }}
                  onClick={addRow}
                ></PDButton>
                <PDButton
                  color={"red"}
                  value={"Remove Selected"}
                  style={{ margin: "15px" }}
                ></PDButton>
              </div>
            </PDTable.Footer>
          </PDTable>
        </div>
      </div>
    </>
  );
};
export default CustomerMedicalRecord;

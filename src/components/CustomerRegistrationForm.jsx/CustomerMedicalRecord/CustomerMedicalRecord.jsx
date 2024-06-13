import PDInput from "../../PDInput/PDInput";
import PDFileInput from "../../PDFileInput/PDFileInput";
import PDButton from "../../PDButton/PDButton";
import PDPagination from "../../Pagination/PDpagination";
import PDTable from "../../PDEditableTable/PDTable";
import styles from "./CustomerMedicalRecord.module.css";

import { useUserStore } from "../../../stores/userStore";

import { useState, useRef, useEffect } from "react";
import { isEmptyString } from "../../../utils/basicValidation.util";
import { usePagination } from "../../hooks/usePagination";
import { useCallback } from "react";

const HEADER_COLS = [
  "Intervention Type",
  "Medical Facility",
  "Admission Date",
  "Leave Date",
];
const INITIAL_ENTRIES_PER_PAGE = 5;
const CustomerMedicalRecord = () => {
  const Customer = useUserStore((state) => state.Customer);

  const addRowToUserMedicalRecord =
    useUserStore.getState().addRowToUserMedicalRecord;

  const removeRowsFromCustomerMedicalRecords = useUserStore(
    (state) => state.removeRowsFromCustomerMedicalRecords
  );
  const updateMedicalRecordDeletion = useUserStore(
    (state) => state.updateMedicalRecordDeletion
  );
  const setCustomerUserField = useUserStore(
    (state) => state.setCustomerUserField
  );
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
  const { page, setPage, displayEntries, pages } = usePagination(
    Customer.medicalRecords,
    INITIAL_ENTRIES_PER_PAGE
  );

  const handleFileChange = (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target?.files[0];
    if (file) {
      console.log(file);
      setCustomerUserField("latestMedicalCheckup", file);
    }
  };

  const changeNewRow = (fieldName, value) => {
    setNewRow((state) => ({
      ...state,
      [`${fieldName}`]: value,
    }));

    if (fieldName === "arrivalDate") {
      const isValid = validateDates(value, newRow.leaveDate);
      setNewRowErrors((state) => ({
        ...state,
        arrivalDate: isValid,
        leaveDate: isValid,
      }));
    }
    if (fieldName === "leaveDate") {
      const isValid = validateDates(newRow.arrivalDate, value);
      setNewRowErrors((state) => ({
        ...state,
        arrivalDate: isValid,
        leaveDate: isValid,
      }));
    }
    if (
      fieldName === "medicalInterventionType" ||
      fieldName === "medicalFacility"
    ) {
      setNewRowErrors((state) => ({
        ...state,
        [`${fieldName}`]: !isEmptyString(value),
      }));
    }
  };
  const validateDates = (arrive, leave) => {
    if (arrive && leave) {
      const arriveDate = new Date(arrive);
      const leaveDate = new Date(leave);
      return leaveDate >= arriveDate;
    }
    return true;
  };
  const addRow = () => {
    if (
      isEmptyString(newRow.medicalFacility) ||
      isEmptyString(newRow.medicalInterventionType) ||
      isEmptyString(newRow.arrivalDate) ||
      isEmptyString(newRow.leaveDate)
    ) {
      return;
    }
    if (!validateDates(newRow.arrivalDate, newRow.leaveDate)) {
      return;
    }
    addRowToUserMedicalRecord(newRow);
    setNewRow({
      medicalFacility: "",
      medicalInterventionType: "",
      arrivalDate: "",
      leaveDate: "",
    });
  };

  const deleteSelectedRows = () => {
    removeRowsFromCustomerMedicalRecords();
  };

  const refMedicalCheckup = useCallback((node) => {
    if (!node || !Customer.latestMedicalCheckup) {
      return;
    }
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(Customer.latestMedicalCheckup);
    node.files = dataTransfer.files;
  }, []);
  return (
    <>
      <div className="container">
        <div className="d-flex flex-row">
          <div className="flex-col auto">
            <PDInput
              label={"General Practitioner"}
              className={`${styles["input-field"]} ${styles["general-practitioner"]}`}
              type={"text"}
              value={Customer.gereralPractitioner}
              onChangeFunc={(e) =>
                setCustomerUserField("generalPractitioner", e.target.value)
              }
            />
          </div>
          <div className="flex-col auto">
            <PDFileInput
              ref={refMedicalCheckup}
              label={"Latest Health Check-up Report"}
              required={false}
              onChangeFunc={handleFileChange}
              className={`${styles["input-field"]}`}
            />
          </div>
        </div>

        <PDTable>
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
            {displayEntries.map((el) => {
              return (
                <PDTable.Row>
                  <PDTable.Cell>{el.medicalInterventionType}</PDTable.Cell>
                  <PDTable.Cell>{el.medicalFacility}</PDTable.Cell>
                  <PDTable.Cell>{el.arrivalDate}</PDTable.Cell>
                  <PDTable.Cell>{el.leaveDate}</PDTable.Cell>
                  {!el._id && (
                    <PDTable.Cell style={{ width: "20px" }}>
                      <PDInput
                        type={"checkbox"}
                        checked={el.delete}
                        onChangeFunc={(e) =>
                          updateMedicalRecordDeletion(el, e.target.checked)
                        }
                      />
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
                  isValid={newRowErrors.medicalInterventionType}
                  type={"text"}
                />
              </PDTable.Cell>
              <PDTable.Cell>
                <PDInput
                  onChangeFunc={(e) =>
                    changeNewRow("medicalFacility", e.target.value)
                  }
                  value={newRow.medicalFacility}
                  isValid={newRowErrors.medicalFacility}
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
            {Customer.medicalRecords.length >= INITIAL_ENTRIES_PER_PAGE && (
              <PDPagination
                pages={pages}
                setPage={setPage}
                entries={Customer.medicalRecords}
                entriesPerPage={INITIAL_ENTRIES_PER_PAGE}
                page={page}
                displayEntries={INITIAL_ENTRIES_PER_PAGE}
              />
            )}
            <PDButton
              color={"green"}
              value={"Add Row"}
              style={{ margin: "15px" }}
              onClick={addRow}
            ></PDButton>{" "}
            <PDButton
              color={"red"}
              value={"Remove Selected"}
              style={{ margin: "15px" }}
              onClick={deleteSelectedRows}
            ></PDButton>
          </PDTable.Footer>
        </PDTable>
      </div>
    </>
  );
};
export default CustomerMedicalRecord;

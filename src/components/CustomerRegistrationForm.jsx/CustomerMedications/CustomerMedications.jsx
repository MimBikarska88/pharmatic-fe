import PDInput from "../../PDInput/PDInput";
import PDButton from "../../PDButton/PDButton";
import PDPagination from "../../Pagination/PDpagination";
import PDTable from "../../PDEditableTable/PDTable";

import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { isEmptyString } from "../../../utils/basicValidation.util";
import { useUserStore } from "../../../stores/userStore";
import styles from "./CustomerMedications.module.css";
import PDTextArea from "../../PDTextArea/PDTextArea";
const HEADER_COLS = [
  "Name",
  "Dosage",
  "Frequency",
  "Route of Administration",
  "Duration",
  "Indication",
  "Side Effects",
  "Notes",
];
const INITIAL_ENTRIES_PER_PAGE = 5;

const CustomerMedications = () => {
  const Customer = useUserStore((state) => state.Customer);
  const [newRow, setNewRow] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    roa: "",
    duration: "",
    indication: "",
    sideEffect: "",
    note: "",
    delete: false,
  });
  const [newRowErrors, setNewRowErrors] = useState({
    medicalFacility: true,
    dosage: true,
    frequency: true,
    roa: true,
    duration: true,
    indication: true,
    sideEffect: true,
    note: true,
  });
  const { page, setPage, displayEntries, pages } = usePagination(
    Customer.medications,
    INITIAL_ENTRIES_PER_PAGE
  );
  const addRowToCustomerMedications = useUserStore(
    (state) => state.addRowToCustomerMedications
  );
  const removeRowsFromCustomerMedications = useUserStore(
    (state) => state.removeRowsFromCustomerMedications
  );
  const updateMedicationDeletion = useUserStore(
    (state) => state.updateMedicationDeletion
  );

  const changeNewRow = (fieldName, value) => {
    setNewRow((state) => ({
      ...state,
      [`${fieldName}`]: value,
    }));
  };
  const addRow = () => {
    if (
      isEmptyString(newRow.medicationName) ||
      isEmptyString(newRow.dosage) ||
      isEmptyString(newRow.frequency) ||
      isEmptyString(newRow.roa) ||
      isEmptyString(newRow.duration) ||
      isEmptyString(newRow.indication)
    ) {
      return;
    }

    addRowToCustomerMedications(newRow);
    setNewRow({
      medicationName: "",
      dosage: "",
      frequency: "",
      roa: "",
      duration: "",
      indication: "",
      sideEffect: "",
      note: "",
      delete: false,
    });
  };

  useEffect(() => {
    console.log(Customer.medications);
  }, [Customer.medications]);
  const deleteSelectedRows = () => {
    removeRowsFromCustomerMedications();
  };
  return (
    <>
      <div>
        <p style={{ width: "60%" }}>
          <strong>
            You are not obliged to provide details but they would help when our
            vendors are reviewing medication shipments and different options for
            you.
          </strong>
        </p>
      </div>
      {Customer.medications.length > 0 && (
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
                <>
                  <PDTable.Row>
                    <PDTable.Cell>{el.medicationName}</PDTable.Cell>
                    <PDTable.Cell>{el.dosage}</PDTable.Cell>
                    <PDTable.Cell>{el.frequency}</PDTable.Cell>
                    <PDTable.Cell>{el.roa}</PDTable.Cell>
                    <PDTable.Cell>{el.duration}</PDTable.Cell>
                    <PDTable.Cell>{el.indication}</PDTable.Cell>
                    <PDTable.Cell>{el.sideEffect}</PDTable.Cell>
                    <PDTable.Cell style={{ width: "20px" }}>
                      <PDInput
                        type={"checkbox"}
                        onChangeFunc={(e) =>
                          updateMedicationDeletion(el, e.target.value)
                        }
                      />
                    </PDTable.Cell>
                  </PDTable.Row>
                  {el.note && el.note.trim() !== "" && (
                    <PDTable.Row>
                      <PDTable.Cell>Note: </PDTable.Cell>
                      <PDTable.Cell colspan={6}>{el.note}</PDTable.Cell>
                    </PDTable.Row>
                  )}
                </>
              );
            })}
          </PDTable.Body>
        </PDTable>
      )}
      <div className="d-flex flex-row ">
        <PDInput
          label="Medication name"
          placeholder={"Eg:Metformin (Brand name: Glucophage)"}
          onChangeFunc={(e) => changeNewRow("medicationName", e.target.value)}
          className={styles["input-field"]}
          value={newRow.medicationName}
          isValid={newRowErrors.medicationName}
          type={"text"}
        />{" "}
        <PDInput
          label="Dosage"
          onChangeFunc={(e) => changeNewRow("dosage", e.target.value)}
          value={newRow.dosage}
          placeholder={"500 mg"}
          className={styles["input-field"]}
          isValid={newRowErrors.dosage}
          type={"text"}
        />
        <PDInput
          label="frequency"
          placeholder={"Twice daily"}
          onChangeFunc={(e) => changeNewRow("frequency", e.target.value)}
          isValid={newRowErrors.frequency}
          className={styles["input-field"]}
          value={newRow.frequency}
          type={"text"}
        />{" "}
      </div>
      <div className="d-flex flex-row ">
        <PDInput
          label="Route of administration"
          placeholder={"Orally"}
          onChangeFunc={(e) => changeNewRow("roa", e.target.value)}
          value={newRow.roa}
          isValid={newRowErrors.roa}
          className={styles["input-field"]}
          type={"text"}
        />{" "}
        <PDInput
          label={"Duration"}
          placeholder={"6 months"}
          onChangeFunc={(e) => changeNewRow("duration", e.target.value)}
          value={newRow.duration}
          className={styles["input-field"]}
          isValid={newRowErrors.duration}
          type={"text"}
        />{" "}
        <PDInput
          label="Side effect"
          onChangeFunc={(e) => changeNewRow("sideEffect", e.target.value)}
          value={newRow.sideEffect}
          className={styles["input-field"]}
          isValid={newRowErrors.sideEffect}
          placeholder={"Mild nausea in the first week of treatment"}
          type={"text"}
        />{" "}
      </div>
      <div className="d-flex flex-row ">
        <PDInput
          label="Indication"
          placeholder={"Type 2 diabetes management"}
          onChangeFunc={(e) => changeNewRow("indication", e.target.value)}
          value={newRow.indication}
          className={styles["input-field"]}
          isValid={newRowErrors.indication}
          type={"text"}
        />
        <PDTextArea
          label="Note"
          placeholder={
            "Over-the-counter Vitamin D supplement 1000 IU daily / no missed doses"
          }
          onChangeFunc={(e) => changeNewRow("note", e.target.value)}
          value={newRow.note}
          className={styles["input-field"]}
          isValid={newRowErrors.note}
          rows={3}
          cols={87}
        />
      </div>
      <div className="d-flex flex-row ">
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
      </div>
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
    </>
  );
};
export default CustomerMedications;

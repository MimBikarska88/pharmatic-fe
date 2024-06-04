import PDInput from "../../PDInput/PDInput";
import PDFileInput from "../../PDFileInput/PDFileInput";
import styles from "./CustomerMedicalRecord.module.css";
import PDEditableTable from "../../PDEditableTable/PDEditableTable";

//test data
import testData from "./testData.json";
const CustomerMedicalRecord = () => {
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
          <PDEditableTable
            isEdit={true}
            thead={[
              [
                "Intervention Type",
                "Medical Facility",
                "Admission Date",
                "Leave Date",
              ],
            ]}
            tbody={testData.map((el) => Object.values(el))}
          />
        </div>
      </div>
    </>
  );
};
export default CustomerMedicalRecord;

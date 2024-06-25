import PDInput from "../../PDInput/PDInput";
import styles from "./VendorOrganization.module.css";
const VendorOrganization = () => {
  return (
    <>
      <h3 className="text-center mt-3">Vendor Organization</h3>
      <div className="d-flex mt-5 justify-content-around">
        <div className="flex-column ">
          <div className="d-flex flex-row align-self-end">
            <div className="d-flex flex-column p-1">
              <h6>Primary contact person</h6>
              <PDInput
                label="Name"
                type="text"
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Job Title"
                type="text"
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Phone number"
                type="text"
                className={styles["input-field-person"]}
              />
            </div>
            <div className="d-flex flex-column p-1">
              <h6>Secondary contact person</h6>
              <PDInput
                label="Name"
                type="text"
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Job Title"
                type="text"
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Phone number"
                type="text"
                className={styles["input-field-person"]}
              />
            </div>
          </div>
        </div>
        <div className="flex-column">
          <div className="d-flex flex-column p-1">
            <h6>Vendor</h6>
            <div className="flex-row align-self-end">
              <PDInput
                label="Registered vendor name"
                type="text"
                className={styles["input-field"]}
              />
            </div>
            <div className="flex-row align-self-end">
              <PDInput
                label="Registered vendor email"
                type="text"
                className={styles["input-field"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VendorOrganization;

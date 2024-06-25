import PDFileInput from "../../PDFileInput/PDFileInput";
import PDInput from "../../PDInput/PDInput";
import styles from "./VendorLicenses.module.css";
const VendorLicenses = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <h3 className="text-center mt-3">Vendor Licenses</h3>
      <div className="d-flex mt-3 justify-content-center">
        <div className="mx-2">
          <PDFileInput
            label={`Manufactoring License (${year - 1}/${year})`}
            className="m-1"
          />
          <PDFileInput
            label={`Import / Export License (${year - 1}/${year})`}
            className="m-1"
          />
          <PDFileInput
            className="m-1"
            label={`Special Access Scheme (SAS) Approval License (${
              year - 1
            }/${year})`}
          />{" "}
          <PDFileInput
            className="m-1"
            label={`Clinical Trial Participation Consent License (${
              year - 1
            }/${year})`}
          />
          <PDFileInput
            className="m-1"
            label={`Special Authorization for Controlled Substances (${
              year - 1
            }/${year})`}
          />
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex">
            <PDInput
              className="d-inline-block pl-0 pr-3 py-3"
              type="radio"
              label="EU"
              name="based"
            />
            <PDInput
              className="d-inline-block p-3"
              type="radio"
              label="USA"
              name="based"
            />
          </div>
          <PDInput
            type="text"
            label="EORI Number (Economic Operators Registration and Identification number)"
            className={styles["input-field"]}
          />
          <PDInput
            type="text"
            label="EU VAT Number"
            className={styles["input-field"]}
          />
          <PDInput
            type="text"
            label="FDA Registration Number"
            className={styles["input-field"]}
          />
          <PDInput
            type="text"
            label="FDA Establishment Identifier (FEI) Number"
            className={styles["input-field"]}
            Name={styles["input-field"]}
          />
        </div>
      </div>
    </>
  );
};

export default VendorLicenses;

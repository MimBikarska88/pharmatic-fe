import { useUserStore } from "../../../stores/userStore";
import PDInput from "../../PDInput/PDInput";
import styles from "./VendorOrganization.module.css";
const VendorOrganization = () => {
  const Vendor = useUserStore((state) => state.Vendor);
  const setPrimaryPerson = useUserStore.getState().setPrimaryPerson;
  const setSecondaryPerson = useUserStore.getState().setSecondaryPerson;
  const setVendorField = useUserStore.getState().setVendorField;
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
                value={Vendor.primaryPerson.name}
                onChange={(e) => setPrimaryPerson("name", e.target.value)}
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Job Title"
                type="text"
                value={Vendor.primaryPerson.jobTitle}
                onChange={(e) => setPrimaryPerson("jobTitle", e.target.value)}
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Phone number"
                type="text"
                value={(e) => setPrimaryPerson("phoneNumber", e.target.value)}
                className={styles["input-field-person"]}
              />
            </div>
            <div className="d-flex flex-column p-1">
              <h6>Secondary contact person</h6>
              <PDInput
                label="Name"
                type="text"
                value={Vendor.secondaryPerson.name}
                onChange={(e) => setSecondaryPerson("name", e.target.value)}
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Job Title"
                type="text"
                value={Vendor.secondaryPerson.jobTitle}
                onChange={(e) => setSecondaryPerson("jobTitle", e.target.value)}
                className={styles["input-field-person"]}
              />
              <PDInput
                label="Phone number"
                value={Vendor.secondaryPerson.phoneNumber}
                onChange={(e) =>
                  setSecondaryPerson("phoneNumber", e.target.value)
                }
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
                value={Vendor.companyName}
                onChange={(e) => setVendorField("companyName", e.target.value)}
                className={styles["input-field"]}
              />
            </div>
            <div className="flex-row align-self-end">
              <PDInput
                label="Registered vendor email"
                type="text"
                value={Vendor.email}
                onChange={(e) => setVendorField("email", e.target.value)}
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

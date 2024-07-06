import { useErrorStore } from "../../../stores/errorStore";
import { useUserStore } from "../../../stores/userStore";
import { useValidationStore } from "../../../stores/validationStore";
import {
  validatePrimaryContactField,
  validateSecondaryContactField,
  validateVendorField,
} from "../VendorRegistrationUtil";
import PDInput from "../../PDInput/PDInput";
import styles from "./VendorOrganization.module.css";
import { useEffect } from "react";
const VendorOrganization = () => {
  const Vendor = useUserStore((state) => state.Vendor);
  const setPrimaryContact = useUserStore.getState().setPrimaryContact;
  const setSecondaryContact = useUserStore.getState().setSecondaryContact;
  const setSecondaryPerson = useUserStore.getState().setSecondaryPerson;
  const setVendorField = useUserStore.getState().setVendorField;
  const VendorRegisterErrors = useErrorStore(
    (state) => state.VendorRegisterErrors
  );
  const RegisterVendor = useValidationStore((state) => state.RegisterVendor);
  const onPrimaryContactChange = (field, value) => {
    setPrimaryContact(field, value);
    validatePrimaryContactField(field, value);
  };
  const secondaryPersonChangeHandler = (field, value) => {
    setSecondaryContact(field, value);
    validateSecondaryContactField(field, value);
  };
  const onVendorFieldChange = (fieldName, fieldValue) => {
    setVendorField(fieldName, fieldValue);
    validateVendorField(fieldName, fieldValue);
  };
  useEffect(() => {
    console.log(Vendor);
  }, [Vendor]);
  useEffect(() => {}, [RegisterVendor, VendorRegisterErrors]);
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
                errorMessage={VendorRegisterErrors.primaryContactName}
                value={Vendor.primaryPerson.name}
                onChange={(e) => onPrimaryContactChange("name", e.target.value)}
                className={styles["input-field-person"]}
                isValid={RegisterVendor.primaryContactName}
              />
              <PDInput
                label="Job Title"
                type="text"
                errorMessage={VendorRegisterErrors.primaryContactJobTitle}
                value={Vendor.primaryPerson.jobTitle}
                onChange={(e) =>
                  onPrimaryContactChange("jobTitle", e.target.value)
                }
                className={styles["input-field-person"]}
                isValid={RegisterVendor.primaryContactJobTitle}
              />
              <PDInput
                label="Phone number"
                type="text"
                value={Vendor.primaryPerson.phone}
                errorMessage={VendorRegisterErrors.primaryContactPhone}
                onChange={(e) =>
                  onPrimaryContactChange("phone", e.target.value)
                }
                className={styles["input-field-person"]}
                isValid={RegisterVendor.primaryContactPhone}
              />
            </div>
            <div className="d-flex flex-column p-1">
              <h6>Secondary contact person</h6>
              <PDInput
                label="Name"
                type="text"
                errorMessage={VendorRegisterErrors.secondaryContactName}
                value={Vendor.secondaryPerson.name}
                onChange={(e) =>
                  secondaryPersonChangeHandler("name", e.target.value)
                }
                className={styles["input-field-person"]}
                isValid={RegisterVendor.secondaryContactName}
              />
              <PDInput
                label="Job Title"
                type="text"
                errorMessage={VendorRegisterErrors.secondaryContactJobTitle}
                value={Vendor.secondaryPerson.jobTitle}
                onChange={(e) =>
                  secondaryPersonChangeHandler("jobTitle", e.target.value)
                }
                className={styles["input-field-person"]}
                isValid={RegisterVendor.secondaryContactJobTitle}
              />
              <PDInput
                label="Phone number"
                errorMessage={VendorRegisterErrors.secondaryContactPhone}
                isValid={RegisterVendor.secondaryContactPhone}
                value={Vendor.secondaryPerson.phone}
                onChange={(e) =>
                  secondaryPersonChangeHandler("phone", e.target.value)
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
                isValid={RegisterVendor.companyName}
                value={Vendor.companyName}
                errorMessage={VendorRegisterErrors.companyName}
                onChange={(e) => {
                  setVendorField("companyName", e.target.value);
                  validateVendorField("companyName", e.target.value);
                }}
                className={styles["input-field"]}
              />
            </div>
            <div className="flex-row align-self-end">
              <PDInput
                label="Registered vendor email"
                type="text"
                isValid={RegisterVendor.email}
                errorMessage={VendorRegisterErrors.email}
                value={Vendor.email}
                onChange={(e) => {
                  setVendorField("email", e.target.value);
                  validateVendorField("email", e.target.value);
                }}
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

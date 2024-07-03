import PDFileInput from "../../PDFileInput/PDFileInput";
import PDInput from "../../PDInput/PDInput";
import styles from "./VendorLicenses.module.css";

import { useUserStore } from "../../../stores/userStore";
import { useCallback, useEffect } from "react";
import { ResidenceType } from "../../../utils/residenceTypes";
import {
  changeResidence,
  setVendorLicensesField,
} from "../VendorRegistrationUtil";
import { useErrorStore } from "../../../stores/errorStore";
import { useValidationStore } from "../../../stores/validationStore";

const VendorLicenses = () => {
  const year = new Date().getFullYear();
  const Vendor = useUserStore((state) => state.Vendor);
  const setVendorField = useUserStore((state) => state.setVendorField);

  const { EORI, EUVAT, FDANumber, FEINumber } = useErrorStore(
    (state) => state.VendorRegisterErrors
  );
  const RegisterVendor = useValidationStore((state) => state.RegisterVendor);
  const refManufactoringLicense = useCallback((node) => {
    if (!node || !Vendor.manufactoringLicense) {
      return;
    }
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(Vendor.manufactoringLicense);
    node.files = dataTransfer.files;
  }, []);

  const refImportExportLicense = useCallback((node) => {
    if (!node || !Vendor.importExportLicense) {
      return;
    }
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(Vendor.importExportLicense);
    node.files = dataTransfer.files;
  });
  const refSasApproval = useCallback((node) => {
    if (!node || !Vendor.specialAccessScheme) {
      return;
    }
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(Vendor.specialAccessScheme);
    node.files = dataTransfer.files;
  });
  const refClinicalTrial = useCallback((node) => {
    if (!node || !Vendor.clinicalTrialParticipation) {
      return;
    }
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(Vendor.clinicalTrialParticipation);
    node.files = dataTransfer.files;
  });
  const refSpecialAuthorizationForControlledSubstances = useCallback((node) => {
    if (!node || !Vendor.specialAuthorizationForControlledSubstances) {
      return;
    }
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(Vendor.specialAuthorizationForControlledSubstances);
    node.files = dataTransfer.files;
  });
  const handleFileChange = (event, fieldName) => {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target?.files[0];
    if (file) {
      if (fieldName === "manufacturingLicense") {
        setVendorField("manufacturingLicense", file);
      } else if (fieldName === "importExportLicense") {
        setVendorField("importExportLicense", file);
      } else if (fieldName === "specialAccessScheme") {
        setVendorField("specialAccessScheme", file);
      } else if (fieldName === "clinicalTrialParticipation") {
        setVendorField("clinicalTrialParticipation", file);
      } else if (fieldName === "specialAuthorizationForControlledSubstances") {
        setVendorField("specialAuthorizationForControlledSubstances", file);
      }
    }
  };

  return (
    <>
      <h3 className="text-center mt-3">Vendor Licenses</h3>
      <div className="d-flex mt-3 justify-content-center">
        <div className="mx-2">
          <PDFileInput
            ref={refManufactoringLicense}
            required={true}
            label={`Manufactoring License (${year - 1}/${year})`}
            onChangeFunc={(e) => handleFileChange(e, "manufacturingLicense")}
            className="m-1"
          />
          <PDFileInput
            onChangeFunc={(e) => handleFileChange(e, "importExportLicense")}
            label={`Import / Export License (${year - 1}/${year})`}
            className="m-1"
            ref={refImportExportLicense}
          />
          <PDFileInput
            ref={refSasApproval}
            onChangeFunc={(e) => handleFileChange(e, "specialAccessScheme")}
            className="m-1"
            label={`Special Access Scheme (SAS) Approval License (${
              year - 1
            }/${year})`}
          />{" "}
          <PDFileInput
            ref={refClinicalTrial}
            onChangeFunc={(e) =>
              handleFileChange(e, "clinicalTrialParticipation")
            }
            className="m-1"
            label={`Clinical Trial Participation Consent License (${
              year - 1
            }/${year})`}
          />
          <PDFileInput
            ref={refSpecialAuthorizationForControlledSubstances}
            onChangeFunc={(e) =>
              handleFileChange(e, "specialAuthorizationForControlledSubstances")
            }
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
              onChangeFunc={(e) => {
                setVendorField("residence", ResidenceType.EU);
                changeResidence(ResidenceType.EU);
              }}
              name="based"
            />
            <PDInput
              className="d-inline-block p-3"
              type="radio"
              onChangeFunc={(e) => {
                setVendorField("residence", ResidenceType.NON_EU);
                changeResidence(ResidenceType.NON_EU);
              }}
              label="NON-EU"
              name="based"
            />
          </div>
          <PDInput
            disabled={
              Vendor.residence === "" ||
              Vendor.residence === ResidenceType.NON_EU
            }
            value={Vendor.EORI}
            type="text"
            isValid={RegisterVendor.EORI}
            errorMessage={EORI}
            label="EORI Number (Economic Operators Registration and Identification number)"
            className={styles["input-field"]}
            onChangeFunc={(e) => setVendorLicensesField("EORI", e.target.value)}
          />
          <PDInput
            disabled={
              Vendor.residence === "" ||
              Vendor.residence === ResidenceType.NON_EU
            }
            isValid={RegisterVendor.EUVAT}
            errorMessage={EUVAT}
            type="text"
            label="EU VAT Number"
            value={Vendor.EUVAT}
            onChangeFunc={(e) =>
              setVendorLicensesField("EUVAT", e.target.value)
            }
            className={styles["input-field"]}
          />
          <PDInput
            disabled={
              Vendor.residence === "" || Vendor.residence === ResidenceType.EU
            }
            type="text"
            label="FDA Registration Number"
            value={Vendor.FDANumber}
            onChangeFunc={(e) =>
              setVendorLicensesField("FDANumber", e.target.value)
            }
            isValid={RegisterVendor.FDANumber}
            errorMessage={FDANumber}
            className={styles["input-field"]}
          />
          <PDInput
            disabled={
              Vendor.residence === "" || Vendor.residence === ResidenceType.EU
            }
            type="text"
            isValid={RegisterVendor.FEINumber}
            errorMessage={FEINumber}
            value={Vendor.FEINumber}
            label="FDA Establishment Identifier (FEI) Number"
            onChangeFunc={(e) =>
              setVendorLicensesField("FEINumber", e.target.value)
            }
            className={styles["input-field"]}
            Name={styles["input-field"]}
          />
        </div>
      </div>
    </>
  );
};

export default VendorLicenses;

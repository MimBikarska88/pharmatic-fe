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
  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;

  const {
    EORI,
    EUVAT,
    FDANumber,
    FEINumber,
    importExportLicense,
    manufactoringLicense,
  } = useErrorStore((state) => state.VendorRegisterErrors);
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
      if (fieldName === "manufactoringLicense") {
        setVendorRegisterError(fieldName, "");
        setRegisterVendorFieldValidity(fieldName, true);
        setVendorField("manufactoringLicense", file);
      } else if (fieldName === "importExportLicense") {
        setVendorRegisterError(fieldName, "");
        setRegisterVendorFieldValidity(fieldName, true);
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
            isValid={RegisterVendor.manufactoringLicense}
            label={`Manufactoring License (${year - 1}/${year})`}
            onChangeFunc={(e) => handleFileChange(e, "manufactoringLicense")}
            errorMessage={manufactoringLicense}
            styles={{ height: "100px" }}
          />
          <PDFileInput
            onChangeFunc={(e) => handleFileChange(e, "importExportLicense")}
            isValid={RegisterVendor.importExportLicense}
            label={`Import / Export License (${year - 1}/${year})`}
            styles={{ height: "100px" }}
            errorMessage={importExportLicense}
            required={true}
            ref={refImportExportLicense}
          />
          <PDFileInput
            ref={refSasApproval}
            styles={{ height: "100px" }}
            onChangeFunc={(e) => handleFileChange(e, "specialAccessScheme")}
            label={`Special Access Scheme (SAS) Approval License (${
              year - 1
            }/${year})`}
          />{" "}
          <PDFileInput
            styles={{ height: "100px" }}
            ref={refClinicalTrial}
            onChangeFunc={(e) =>
              handleFileChange(e, "clinicalTrialParticipation")
            }
            label={`Clinical Trial Participation Consent License (${
              year - 1
            }/${year})`}
          />
          <PDFileInput
            styles={{ height: "100px" }}
            ref={refSpecialAuthorizationForControlledSubstances}
            onChangeFunc={(e) =>
              handleFileChange(e, "specialAuthorizationForControlledSubstances")
            }
            label={`Special Authorization for Controlled Substances (${
              year - 1
            }/${year})`}
          />
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex">
            <PDInput
              className={styles["input-field"]}
              type="radio"
              label="EU"
              onChangeFunc={(e) => {
                setVendorField("residence", ResidenceType.EU);
                changeResidence(ResidenceType.EU);
              }}
              name="based"
            />
            <PDInput
              className={styles["input-field"]}
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
            className={`${styles["input-field"]} `}
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
            className={`${styles["input-field"]}  `}
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
            className={`${styles["input-field"]}  `}
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
            className={`${styles["input-field"]}  `}
          />
        </div>
      </div>
    </>
  );
};

export default VendorLicenses;

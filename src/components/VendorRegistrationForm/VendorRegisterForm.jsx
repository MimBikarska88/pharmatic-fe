import PDButton from "../PDButton/PDButton";
import styles from "./VendorRegisterForm.module.css";
import VendorOrganization from "./VendorOrganization/VendorOrganization";
import VendorLicenses from "./VendorLicenses/VendorLicenses";
import VendorAddress from "./VendorAddress/VendorAddress";
import VendorCredentials from "./VendorCredentials/VendorCredentials";

import { useState } from "react";
import { useRegisterVendorMutation } from "../../queries/useRegisterVendorMutation.jsx/useRegisterVendorMutation";
import { useUserStore } from "../../stores/userStore";

const VendorRegisterForm = () => {
  const Vendor = useUserStore((state) => state.Vendor);
  const formType = {
    organization: "VendorOrganization",
    address: "VendorAddress",
    licenses: "VendorLicenses",
    credentials: "VendorCredentials",
  };

  const formTabs = [
    formType.organization,
    formType.licenses,
    formType.address,
    formType.credentials,
  ];

  const mapArray = {
    [formType.organization]: <VendorOrganization />,
    [formType.licenses]: <VendorLicenses />,
    [formType.address]: <VendorAddress />,
    [formType.credentials]: <VendorCredentials />,
  };
  const [index, setIndex] = useState(0);

  const onError = (error) => {
    const { errors, tabName } = error.response?.data;
    setIndex(formTabs.indexOf(tabName));
    //Object.entries(errors).forEach((entry) => {});
  };
  const onSuccess = (res) => {
    /*window.localStorage.setItem("role", JSON.stringify(roleType.customer));
    setRole(roleType.customer);
    navigate("/");*/
    console.log(res.data);
  };
  const registerVendorMutation = useRegisterVendorMutation(onError, onSuccess);

  const submit = () => {
    const json = JSON.stringify(Vendor);
    const formData = new FormData();
    formData.append("manufactoringLicense", Vendor.manufactoringLicense);
    formData.append("importExportLicense", Vendor.importExportLicense);
    formData.append("specialAccessScheme", Vendor.specialAccessScheme);
    formData.append(
      "clinicalTrialParticipation",
      Vendor.clinicalTrialParticipation
    );
    formData.append(
      "specialAuthorizationForControlledSubstances",
      Vendor.specialAuthorizationForControlledSubstances
    );

    formData.append("vendor", json);
    registerVendorMutation.mutateAsync(formData);
  };
  return (
    <>
      <div className={`${styles["step-form"]} d-flex flex-column`}>
        <div
          className={`flex-row flex-grow-1 p-1 ${styles["vendor-form-content"]}`}
        >
          {mapArray[formTabs[index]]}
        </div>
        <div className="flex-row">
          <hr className="flex-row m-2" />
          <div className="m-3 text-center">
            {index > 0 && (
              <PDButton
                value={"Previous"}
                style={{ width: "100px", marginRight: "1rem" }}
                color={"purple"}
                onClick={() => setIndex(index - 1)}
              ></PDButton>
            )}
            {index === Object.values(mapArray).length - 1 && (
              <PDButton
                value={"Submit"}
                style={{ width: "100px", marginRight: "1rem" }}
                color={"green"}
                onClick={submit}
              ></PDButton>
            )}
            {index < Object.values(mapArray).length - 1 && (
              <PDButton
                value={"Next"}
                style={{ width: "100px" }}
                color={"green"}
                onClick={() => setIndex(index + 1)}
              ></PDButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default VendorRegisterForm;

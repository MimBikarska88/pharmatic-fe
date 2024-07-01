import { useState } from "react";
import PDButton from "../PDButton/PDButton";
import styles from "./VendorRegisterForm.module.css";
import VendorOrganization from "./VendorOrganization/VendorOrganization";
import VendorLicenses from "./VendorLicenses/VendorLicenses";
import VendorAddress from "./VendorAddress/VendorAddress";
import VendorCredentials from "./VendorCredentials/VendorCredentials";
import { validateVendorField } from "./VendorRegistrationUtil";
const VendorRegisterForm = () => {
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

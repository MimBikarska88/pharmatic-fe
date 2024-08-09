import { useEffect, useState } from "react";
import CustomerNavTab from "./CustomerNavTab/CustomerNavTab";
import {
  checkAllFirstTabFieldsValid,
  checkAllSecondTabFields,
} from "./CustomerRegistrationUtils";
import CustomerTabForm from "./CustomerTabForm/CustomerTabForm";
import { Mode } from "../../utils/mode";
const CustomerRegistrationForm = ({}) => {
  const [activeTab, setActiveTab] = useState("0");
  const selectTab = (index) => {
    if (Number(activeTab) === 0) {
      if (!checkAllFirstTabFieldsValid()) {
        return;
      }
    }
    if (Number(activeTab) === 1) {
      if (!checkAllSecondTabFields()) {
        return;
      }
    }
    setActiveTab(index);
  };
  return (
    <>
      <CustomerNavTab
        activeTab={activeTab}
        setActiveTab={selectTab}
        mode={Mode.Create}
      />
      <CustomerTabForm activeTab={activeTab} />
    </>
  );
};
export default CustomerRegistrationForm;

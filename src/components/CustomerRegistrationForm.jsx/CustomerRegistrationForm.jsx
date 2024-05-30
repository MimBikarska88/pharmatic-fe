import { useState } from "react";
import CustomerNavTab from "./CustomerNavTab/CustomerNavTab";
import { checkAllFirstTabFieldsValid } from "./CustomerRegistrationUtils";
import CustomerTabForm from "./CustomerTabForm/CustomerTabForm";
const CustomerRegistrationForm = ({}) => {
  const [activeTab, setActiveTab] = useState("0");
  const selectTab = (index) => {
    if (Number(activeTab) === 0) {
      if (!checkAllFirstTabFieldsValid()) {
        return;
      }
    }
    setActiveTab(index);
  };
  return (
    <>
      <CustomerNavTab activeTab={activeTab} setActiveTab={selectTab} />
      <CustomerTabForm activeTab={activeTab} />
    </>
  );
};
export default CustomerRegistrationForm;

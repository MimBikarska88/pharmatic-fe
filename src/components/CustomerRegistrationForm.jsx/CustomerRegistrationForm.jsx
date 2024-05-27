import { useState } from "react";
import CustomerRegistrationNav from "./CustomerRegistrationNav";
import CustomerRegistrationFormFields from "./CustomerRegistrationFormFields";
import { checkFirstTabFields } from "./CustomerRegistrationUtils";
const CustomerRegistrationForm = ({}) => {
  const [activeTab, setActiveTab] = useState("0");
  const selectTab = (index) => {
    if (Number(activeTab) === 0) {
      if (!checkFirstTabFields()) {
        return;
      }
    }
    setActiveTab(index);
  };
  return (
    <>
      <CustomerRegistrationNav activeTab={activeTab} setActiveTab={selectTab} />
      <CustomerRegistrationFormFields activeTab={activeTab} />
    </>
  );
};
export default CustomerRegistrationForm;

import { useUserStore } from "../../stores/userStore";
import { useEffect, useState } from "react";
import { Mode } from "../../utils/mode";
import CustomerNavTab from "../../components/CustomerRegistrationForm.jsx/CustomerNavTab/CustomerNavTab";
import CustomerTabForm from "../../components/CustomerRegistrationForm.jsx/CustomerTabForm/CustomerTabForm";
const CustomerAccount = ({ mode = Mode.View }) => {
  const [activeTab, setActiveTab] = useState("0");
  const Customer = useUserStore((state) => state.Customer);
  console.log(Customer);
  const selectTab = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <CustomerNavTab activeTab={activeTab} setActiveTab={selectTab} />
      <CustomerTabForm activeTab={activeTab} />
    </>
  );
};
export default CustomerAccount;

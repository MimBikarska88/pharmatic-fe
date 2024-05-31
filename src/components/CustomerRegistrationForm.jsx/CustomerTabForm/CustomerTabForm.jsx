import { useEffect } from "react";
import { roleType } from "../../../utils/roleTypes";
import CustomerAddress from "../CustomerAddressTab/CustomerAddressTab";
import CustomerContactTab from "../CustomerContactTab/CustomerContactTab";
import { useUserStore } from "../../../stores/userStore";

const CustomerTabForm = ({ activeTab }) => {
  const setRole = useUserStore.getState().setRole;
  useEffect(() => {
    setRole(roleType.customer);
  }, []);
  return (
    <div className="container-fluid p-3">
      <div className="form w-100">
        {Number(activeTab) === 0 && <CustomerContactTab />}
        {Number(activeTab) === 1 && <CustomerAddress />}
      </div>
    </div>
  );
};
export default CustomerTabForm;
import CustomerAddress from "../CustomerAddressTab/CustomerAddressTab";
import CustomerContactTab from "../CustomerContactTab/CustomerContactTab";
import CustomerMedicalRecord from "../CustomerMedicalRecord/CustomerMedicalRecord";
import CustomerMedications from "../CustomerMedications/CustomerMedications";

const CustomerTabForm = ({ activeTab }) => {
  return (
    <div className="container-fluid p-3">
      <div className="form w-100">
        {Number(activeTab) === 0 && <CustomerContactTab />}
        {Number(activeTab) === 1 && <CustomerAddress />}
        {Number(activeTab) === 2 && <CustomerMedicalRecord />}
        {Number(activeTab) === 3 && <CustomerMedications />}
      </div>
    </div>
  );
};
export default CustomerTabForm;

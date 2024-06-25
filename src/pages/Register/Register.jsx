import { roleType as role } from "../../utils/roleTypes";
import CustomerRegistrationForm from "../../components/CustomerRegistrationForm.jsx/CustomerRegistrationForm";
import VendorRegisterForm from "../../components/VendorRegistrationForm/VendorRegisterForm";
const Register = ({ roleType }) => {
  return (
    <>
      {roleType === role.customer && (
        <CustomerRegistrationForm></CustomerRegistrationForm>
      )}
      {roleType === role.vendor && <VendorRegisterForm></VendorRegisterForm>}
    </>
  );
};
export default Register;

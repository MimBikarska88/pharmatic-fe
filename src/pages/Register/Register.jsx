import { roleType as role } from "../../utils/roleTypes";
import CustomerRegistrationForm from "../../components/CustomerRegistrationForm.jsx/CustomerRegistrationForm";
const Register = ({ roleType }) => {
  return (
    <>
      {roleType === role.customer && (
        <CustomerRegistrationForm></CustomerRegistrationForm>
      )}
    </>
  );
};
export default Register;

import { roleType as role } from "../../utils/roleTypes";
import { useNavigate } from "react-router";
import CustomerRegistrationForm from "../../components/CustomerRegistrationForm.jsx/CustomerRegistrationForm";
import VendorRegisterForm from "../../components/VendorRegistrationForm/VendorRegisterForm";
import PDButton from "../../components/PDButton/PDButton";
const Register = ({ roleType }) => {
  const navigate = useNavigate();
  return (
    <>
      {roleType === role.customer && (
        <CustomerRegistrationForm></CustomerRegistrationForm>
      )}
      {roleType === role.vendor && <VendorRegisterForm></VendorRegisterForm>}
      {!roleType && (
        <div className="d-flex flex-row justify-content-center">
          <PDButton
            color="purple"
            value="Register as Customer"
            className={"m-5 p-3"}
            onClick={() => navigate("/register/customer")}
          ></PDButton>
          <PDButton
            color="green"
            value="Register as Vendor"
            className={"m-5 p-3"}
            onClick={() => navigate("/register/vendor")}
          ></PDButton>
        </div>
      )}
    </>
  );
};
export default Register;
